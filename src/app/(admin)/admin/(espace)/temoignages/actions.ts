"use server";

import { redirect } from "next/navigation";
import type { EtatFormulaire } from "@/components/admin/formulaire";
import { exigerAdmin } from "@/lib/admin/auth";
import { json, nombre, revaliderSite, texte } from "@/lib/admin/revalider";

export async function enregistrerTemoignage(id: string | null, _: EtatFormulaire, fd: FormData): Promise<EtatFormulaire> {
  const { supabase } = await exigerAdmin();

  const citation = texte(fd, "citation");
  const auteur = texte(fd, "auteur");
  if (!citation || !auteur) return { erreur: "La citation et le prénom sont obligatoires." };
  if (citation.length > 400) return { erreur: "La citation doit faire 400 caractères au maximum." };

  const donnees = {
    citation,
    auteur,
    lieu: texte(fd, "lieu"),
    photo: json<string[]>(fd, "photo", [])[0] ?? null,
    publie: fd.get("publie") === "on",
    ordre: Math.floor(nombre(fd, "ordre") ?? 0),
  };

  const { error } = id
    ? await supabase.from("temoignages").update(donnees).eq("id", id)
    : await supabase.from("temoignages").insert(donnees);
  if (error) return { erreur: "L’enregistrement a échoué. Réessayez dans un instant." };

  revaliderSite("temoignages");
  redirect("/admin/temoignages?ok=enregistre");
}

export async function supprimerTemoignage(id: string) {
  const { supabase } = await exigerAdmin();
  await supabase.from("temoignages").delete().eq("id", id);
  revaliderSite("temoignages");
  redirect("/admin/temoignages?ok=supprime");
}
