"use server";

import { CATEGORIES_ACTU } from "@/lib/admin/constantes";
import { redirect } from "next/navigation";
import type { EtatFormulaire } from "@/components/admin/formulaire";
import { exigerAdmin } from "@/lib/admin/auth";
import { json, revaliderSite, texte } from "@/lib/admin/revalider";
import { slugifier } from "@/lib/format";

const CATEGORIES: string[] = CATEGORIES_ACTU.map((c) => c.value);

export async function enregistrerActualite(id: string | null, _: EtatFormulaire, fd: FormData): Promise<EtatFormulaire> {
  const { supabase } = await exigerAdmin();

  const titre = texte(fd, "titre");
  const date = texte(fd, "date");
  const categorie = texte(fd, "categorie");
  if (!titre) return { erreur: "Le titre est obligatoire." };
  if (!date) return { erreur: "Indiquez une date." };
  if (!categorie || !CATEGORIES.includes(categorie)) return { erreur: "Choisissez une catégorie." };

  const extrait = texte(fd, "extrait");
  if (extrait && extrait.length > 280) return { erreur: "Le résumé doit faire 280 caractères au maximum." };

  const donnees = {
    titre,
    slug: slugifier(texte(fd, "slug") ?? titre),
    date,
    categorie,
    extrait,
    contenu: texte(fd, "contenu"),
    image: json<string[]>(fd, "image", [])[0] ?? null,
    publie: fd.get("publie") === "on",
  };

  const { error } = id
    ? await supabase.from("actualites").update(donnees).eq("id", id)
    : await supabase.from("actualites").insert(donnees);

  if (error) {
    return {
      erreur:
        error.code === "23505"
          ? "Une autre actualité utilise déjà cette adresse de page. Modifiez le titre ou l’adresse."
          : "L’enregistrement a échoué. Réessayez dans un instant.",
    };
  }

  revaliderSite("actualites");
  redirect("/admin/actualites?ok=enregistre");
}

export async function supprimerActualite(id: string) {
  const { supabase } = await exigerAdmin();
  await supabase.from("actualites").delete().eq("id", id);
  revaliderSite("actualites");
  redirect("/admin/actualites?ok=supprime");
}
