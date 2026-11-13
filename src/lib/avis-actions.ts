"use server";

import { createClient } from "@supabase/supabase-js";
import { supabaseEnv } from "@/lib/supabase/env";

export type EtatAvis = { ok?: boolean; erreur?: string; champs?: Record<string, string> };

/**
 * Dépôt d'un avis par un visiteur. L'avis est enregistré « en attente » :
 * il n'apparaît sur le site qu'après validation dans le dashboard.
 * Anti-robots : champ piège invisible + délai minimal de remplissage.
 */
export async function deposerAvis(_: EtatAvis, fd: FormData): Promise<EtatAvis> {
  const champs = {
    nom: String(fd.get("nom") ?? "").trim(),
    lieu: String(fd.get("lieu") ?? "").trim(),
    note: String(fd.get("note") ?? ""),
    message: String(fd.get("message") ?? "").trim(),
  };

  // Robots : champ piège rempli, ou formulaire envoyé en moins de 3 secondes → on fait comme si tout allait bien.
  const debut = Number(fd.get("debut") ?? 0);
  if (String(fd.get("site_web") ?? "") !== "" || !debut || Date.now() - debut < 3000) return { ok: true };

  const note = Number(champs.note);
  if (!Number.isInteger(note) || note < 1 || note > 5) return { erreur: "Choisissez une note de 1 à 5 étoiles.", champs };
  if (champs.nom.length < 2 || champs.nom.length > 60) return { erreur: "Indiquez votre prénom (2 à 60 caractères).", champs };
  if (champs.lieu.length > 60) return { erreur: "La ville doit faire 60 caractères au maximum.", champs };
  if (champs.message.length < 10) return { erreur: "Votre message est un peu court : 10 caractères au minimum.", champs };
  if (champs.message.length > 600) return { erreur: "Votre message doit faire 600 caractères au maximum.", champs };
  if (/https?:\/\/|www\./i.test(champs.message)) return { erreur: "Les liens ne sont pas acceptés dans les avis.", champs };
  if (fd.get("accord") !== "on") return { erreur: "Merci d’accepter la publication de votre avis.", champs };

  const env = supabaseEnv();
  if (!env) return { erreur: "Le dépôt d’avis est momentanément indisponible.", champs };
  const supabase = createClient(env.url, env.key, { auth: { persistSession: false } });

  const { error } = await supabase.from("avis").insert({
    nom: champs.nom,
    lieu: champs.lieu || null,
    note,
    message: champs.message,
    publie: false,
  });
  if (error) return { erreur: "L’envoi a échoué. Réessayez dans un instant.", champs };

  return { ok: true };
}
