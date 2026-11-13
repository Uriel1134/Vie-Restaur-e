import { redirect } from "next/navigation";
import { supabaseServeur } from "@/lib/supabase/server";

/**
 * Garde d'accès du dashboard : utilisateur connecté ET présent dans la table `admins`.
 * Renvoie le client Supabase authentifié, prêt pour les lectures/écritures protégées par RLS.
 */
export async function exigerAdmin() {
  const supabase = await supabaseServeur();
  if (!supabase) redirect("/admin/connexion?erreur=config");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/connexion");

  const { data: admin } = await supabase.from("admins").select("nom").eq("user_id", user.id).maybeSingle();
  if (!admin) {
    await supabase.auth.signOut();
    redirect("/admin/connexion?erreur=acces");
  }

  return { supabase, user, nom: (admin.nom as string | null) ?? user.email ?? "Administratrice" };
}
