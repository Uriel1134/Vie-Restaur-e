"use server";

import { redirect } from "next/navigation";
import type { EtatFormulaire } from "@/components/admin/formulaire";
import { exigerAdmin } from "@/lib/admin/auth";
import { STATUTS_COMMANDE } from "@/lib/admin/constantes";
import { json, nombre, texte } from "@/lib/admin/revalider";
import type { LigneCommande } from "@/lib/types";

const STATUTS = STATUTS_COMMANDE.map((s) => s.value as string);

/** Création manuelle (commande reçue par WhatsApp, sur un stand…) ou modification complète. */
export async function enregistrerCommande(id: string | null, _: EtatFormulaire, fd: FormData): Promise<EtatFormulaire> {
  const { supabase } = await exigerAdmin();

  const client_nom = texte(fd, "client_nom");
  const client_email = texte(fd, "client_email");
  if (!client_nom || !client_email) return { erreur: "Le nom et l’e-mail du client sont obligatoires." };

  const statut = texte(fd, "statut") ?? "attente";
  if (!STATUTS.includes(statut)) return { erreur: "Statut invalide." };

  const lignes = json<LigneCommande[]>(fd, "lignes", [])
    .filter((l) => l.libelle?.trim())
    .map((l) => ({
      produit_id: l.produit_id || undefined,
      libelle: l.libelle.trim(),
      variante: l.variante?.trim() || undefined,
      quantite: Math.max(1, Math.floor(Number(l.quantite) || 1)),
      prix_unitaire: Math.max(0, Number(l.prix_unitaire) || 0),
    }));
  if (!lignes.length) return { erreur: "Ajoutez au moins un article." };

  const livraison_mode = texte(fd, "livraison_mode") === "relais" ? "relais" : "retrait";
  const livraison_frais = Math.max(0, nombre(fd, "livraison_frais") ?? 0);
  const total = lignes.reduce((s, l) => s + l.quantite * l.prix_unitaire, 0) + livraison_frais;

  const donnees = {
    client_nom,
    client_email,
    client_telephone: texte(fd, "client_telephone"),
    statut,
    lignes,
    livraison_mode,
    livraison_frais,
    point_relais: livraison_mode === "relais" ? texte(fd, "point_relais") : null,
    total,
    paiement_moyen: texte(fd, "paiement_moyen"),
    notes: texte(fd, "notes"),
  };

  const { error } = id
    ? await supabase.from("commandes").update(donnees).eq("id", id)
    : await supabase.from("commandes").insert(donnees);
  if (error) return { erreur: "L’enregistrement a échoué. Réessayez dans un instant." };

  redirect("/admin/commandes?ok=enregistre");
}

/** Changement rapide de statut depuis la liste ou la fiche. */
export async function changerStatut(id: string, fd: FormData) {
  const { supabase } = await exigerAdmin();
  const statut = String(fd.get("statut") ?? "");
  if (STATUTS.includes(statut)) await supabase.from("commandes").update({ statut }).eq("id", id);
  redirect(`/admin/commandes/${id}?ok=enregistre`);
}
