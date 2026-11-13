"use server";

import { redirect } from "next/navigation";
import type { EtatFormulaire } from "@/components/admin/formulaire";
import { exigerAdmin } from "@/lib/admin/auth";

export async function changerMotDePasse(_: EtatFormulaire, fd: FormData): Promise<EtatFormulaire> {
  const { supabase, user } = await exigerAdmin();

  const actuel = String(fd.get("actuel") ?? "");
  const nouveau = String(fd.get("nouveau") ?? "");
  const confirmation = String(fd.get("confirmation") ?? "");

  if (nouveau.length < 10) return { erreur: "Le nouveau mot de passe doit faire au moins 10 caractères." };
  if (nouveau !== confirmation) return { erreur: "Les deux nouveaux mots de passe ne correspondent pas." };

  // Vérifie le mot de passe actuel avant tout changement.
  const { error: e1 } = await supabase.auth.signInWithPassword({ email: user.email!, password: actuel });
  if (e1) return { erreur: "Le mot de passe actuel est incorrect." };

  const { error } = await supabase.auth.updateUser({ password: nouveau });
  if (error) return { erreur: "Le changement a échoué. Choisissez un mot de passe différent et réessayez." };

  redirect("/admin/compte?ok=enregistre");
}
