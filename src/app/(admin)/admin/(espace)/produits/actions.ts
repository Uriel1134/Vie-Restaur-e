"use server";

import { redirect } from "next/navigation";
import type { EtatFormulaire } from "@/components/admin/formulaire";
import { exigerAdmin } from "@/lib/admin/auth";
import { json, nombre, revaliderSite, texte } from "@/lib/admin/revalider";
import { rayons } from "@/data/association";
import { slugifier } from "@/lib/format";
import type { Variante } from "@/lib/types";

const RAYONS: string[] = rayons.map((r) => r.id);

export async function enregistrerProduit(id: string | null, _: EtatFormulaire, fd: FormData): Promise<EtatFormulaire> {
  const { supabase } = await exigerAdmin();

  const nom = texte(fd, "nom");
  const prix = nombre(fd, "prix");
  const rayon = texte(fd, "rayon");
  if (!nom) return { erreur: "Le nom du produit est obligatoire." };
  if (prix !== null && (Number.isNaN(prix) || prix < 0)) return { erreur: "Indiquez un prix valide (en euros), ou laissez vide pour « Prix sur demande »." };
  if (!rayon || !RAYONS.includes(rayon)) return { erreur: "Choisissez un rayon." };

  const variantes = json<Variante[]>(fd, "variantes", [])
    .filter((v) => v.taille?.trim() || v.couleur?.trim())
    .map((v) => ({
      taille: v.taille?.trim() || undefined,
      couleur: v.couleur?.trim() || undefined,
      stock: Math.max(0, Math.floor(Number(v.stock) || 0)),
      prix: v.prix === null || v.prix === undefined || Number.isNaN(Number(v.prix)) ? null : Number(v.prix),
    }));

  const donnees = {
    nom,
    slug: slugifier(texte(fd, "slug") ?? nom),
    rayon,
    prix,
    description: texte(fd, "description"),
    photos: json<string[]>(fd, "photos", []),
    variantes,
    stock: (() => {
      const s = nombre(fd, "stock");
      return s === null || Number.isNaN(s) ? null : Math.max(0, Math.floor(s));
    })(),
    ordre: Math.floor(nombre(fd, "ordre") ?? 0) || 0,
    en_ligne: fd.get("en_ligne") === "on",
    en_vedette: fd.get("en_vedette") === "on",
  };

  const { error } = id
    ? await supabase.from("produits").update(donnees).eq("id", id)
    : await supabase.from("produits").insert(donnees);

  if (error) {
    return {
      erreur:
        error.code === "23505"
          ? "Un autre produit utilise déjà cette adresse de page. Modifiez le nom ou l’adresse."
          : "L’enregistrement a échoué. Réessayez dans un instant.",
    };
  }

  revaliderSite("produits");
  redirect("/admin/produits?ok=enregistre");
}

export async function supprimerProduit(id: string) {
  const { supabase } = await exigerAdmin();
  await supabase.from("produits").delete().eq("id", id);
  revaliderSite("produits");
  redirect("/admin/produits?ok=supprime");
}
