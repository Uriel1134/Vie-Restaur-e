"use server";

import { createClient } from "@supabase/supabase-js";
import { supabaseEnv } from "@/lib/supabase/env";

export type ResultatCommande = { ok: true; numero: string; jeton: string } | { ok: false; erreur: string };

/**
 * Enregistre la commande via la fonction sécurisée de la base (prix recalculés côté serveur).
 * Le client n'envoie que des identifiants d'articles, des quantités et ses coordonnées.
 */
export async function creerCommande(donnees: {
  nom: string;
  telephone: string;
  livraison: "retrait" | "relais";
  notes: string;
  lignes: { slug: string; variante: string | null; quantite: number }[];
}): Promise<ResultatCommande> {
  const nom = donnees.nom.trim();
  const telephone = donnees.telephone.trim();
  if (nom.length < 2) return { ok: false, erreur: "Indiquez votre prénom." };
  if (!/^[0-9 +().-]{6,30}$/.test(telephone)) return { ok: false, erreur: "Indiquez un numéro de téléphone valide." };
  if (!donnees.lignes.length) return { ok: false, erreur: "Votre panier est vide." };

  const env = supabaseEnv();
  if (!env) return { ok: false, erreur: "La commande en ligne est momentanément indisponible." };
  const supabase = createClient(env.url, env.key, { auth: { persistSession: false } });

  const { data, error } = await supabase.rpc("creer_commande", {
    p_nom: nom,
    p_telephone: telephone,
    p_livraison: donnees.livraison === "relais" ? "relais" : "retrait",
    p_notes: donnees.notes.slice(0, 500),
    p_lignes: donnees.lignes.slice(0, 30).map((l) => ({
      slug: String(l.slug),
      variante: l.variante,
      quantite: Math.max(1, Math.min(20, Math.floor(Number(l.quantite) || 1))),
    })),
  });

  const ligne = Array.isArray(data) ? data[0] : null;
  if (error || !ligne) {
    return {
      ok: false,
      erreur: error?.message.includes("trop de commandes")
        ? "Beaucoup de commandes en ce moment : réessayez dans quelques minutes."
        : "L’envoi de la commande a échoué. Réessayez dans un instant.",
    };
  }
  return { ok: true, numero: ligne.numero, jeton: ligne.jeton };
}
