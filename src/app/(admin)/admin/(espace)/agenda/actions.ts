"use server";

import { redirect } from "next/navigation";
import type { EtatFormulaire } from "@/components/admin/formulaire";
import { exigerAdmin } from "@/lib/admin/auth";
import { json, revaliderSite, texte } from "@/lib/admin/revalider";

/** « 2026-11-20T18:30 » saisi en heure de Paris → instant ISO. */
function dateParis(local: string) {
  const [d, h = "00:00"] = local.split("T");
  // Décalage de Paris à cette date (+01:00 l'hiver, +02:00 l'été).
  const essai = new Date(`${d}T${h}:00Z`);
  const parisUtc = new Date(essai.toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  const utc = new Date(essai.toLocaleString("en-US", { timeZone: "UTC" }));
  return new Date(essai.getTime() - (parisUtc.getTime() - utc.getTime())).toISOString();
}

export async function enregistrerEvenement(id: string | null, _: EtatFormulaire, fd: FormData): Promise<EtatFormulaire> {
  const { supabase } = await exigerAdmin();

  const titre = texte(fd, "titre");
  const date = texte(fd, "date");
  const lieu = texte(fd, "lieu");
  if (!titre || !date || !lieu) return { erreur: "Le titre, la date et le lieu sont obligatoires." };

  const lien = texte(fd, "lien_inscription");
  if (lien && !/^https?:\/\//.test(lien)) return { erreur: "Le lien d’inscription doit commencer par https://" };

  const donnees = {
    titre,
    date: dateParis(date),
    lieu,
    description: texte(fd, "description"),
    lien_inscription: lien,
    image: json<string[]>(fd, "image", [])[0] ?? null,
  };

  const { error } = id
    ? await supabase.from("evenements").update(donnees).eq("id", id)
    : await supabase.from("evenements").insert(donnees);
  if (error) return { erreur: "L’enregistrement a échoué. Réessayez dans un instant." };

  revaliderSite("evenements");
  redirect("/admin/agenda?ok=enregistre");
}

export async function supprimerEvenement(id: string) {
  const { supabase } = await exigerAdmin();
  await supabase.from("evenements").delete().eq("id", id);
  revaliderSite("evenements");
  redirect("/admin/agenda?ok=supprime");
}
