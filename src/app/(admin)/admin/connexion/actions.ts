"use server";

import { redirect } from "next/navigation";
import { supabaseServeur } from "@/lib/supabase/server";

export type EtatConnexion = { erreur?: string };

export async function seConnecter(_: EtatConnexion, formData: FormData): Promise<EtatConnexion> {
  const supabase = await supabaseServeur();
  if (!supabase) return { erreur: "Le dashboard n’est pas encore relié à Supabase." };

  const email = String(formData.get("email") ?? "").trim();
  const motDePasse = String(formData.get("motDePasse") ?? "");
  if (!email || !motDePasse) return { erreur: "Saisissez votre e-mail et votre mot de passe." };

  const { error } = await supabase.auth.signInWithPassword({ email, password: motDePasse });
  if (error) return { erreur: "E-mail ou mot de passe incorrect." };

  redirect("/admin");
}

export async function seDeconnecter() {
  const supabase = await supabaseServeur();
  await supabase?.auth.signOut();
  redirect("/admin/connexion");
}
