"use server";

import { redirect } from "next/navigation";
import type { EtatFormulaire } from "@/components/admin/formulaire";
import { exigerAdmin } from "@/lib/admin/auth";
import { revaliderSite, texte } from "@/lib/admin/revalider";

const URL_VALIDE = /^https:\/\//;

export async function enregistrerParametres(_: EtatFormulaire, fd: FormData): Promise<EtatFormulaire> {
  const { supabase } = await exigerAdmin();

  const email = texte(fd, "email");
  const whatsapp = (texte(fd, "whatsapp") ?? "").replace(/[^\d]/g, "");
  if (!email) return { erreur: "L’e-mail est obligatoire." };
  if (whatsapp.length < 8) return { erreur: "Numéro WhatsApp invalide : indiquez-le avec l’indicatif, ex. 33766450977." };

  const liens = ["instagram", "tiktok", "facebook", "helloasso_don_url"] as const;
  for (const l of liens) {
    const v = texte(fd, l);
    if (v && !URL_VALIDE.test(v)) return { erreur: "Les liens doivent commencer par https://" };
  }

  const { error } = await supabase
    .from("parametres")
    .update({
      email,
      whatsapp,
      telephone_affiche: texte(fd, "telephone_affiche") ?? "",
      horaires: texte(fd, "horaires") ?? "",
      adresse: texte(fd, "adresse"),
      instagram: texte(fd, "instagram"),
      tiktok: texte(fd, "tiktok"),
      facebook: texte(fd, "facebook"),
      helloasso_don_url: texte(fd, "helloasso_don_url"),
    })
    .eq("id", 1);
  if (error) return { erreur: "L’enregistrement a échoué. Réessayez dans un instant." };

  revaliderSite("parametres");
  redirect("/admin/parametres?ok=enregistre");
}
