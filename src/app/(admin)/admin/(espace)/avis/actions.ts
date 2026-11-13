"use server";

import { redirect } from "next/navigation";
import { exigerAdmin } from "@/lib/admin/auth";
import { revaliderSite } from "@/lib/admin/revalider";

export async function changerPublication(id: string, publie: boolean) {
  const { supabase } = await exigerAdmin();
  await supabase.from("avis").update({ publie }).eq("id", id);
  revaliderSite("avis");
  redirect(`/admin/avis?ok=${publie ? "publie" : "masque"}`);
}

export async function supprimerAvis(id: string) {
  const { supabase } = await exigerAdmin();
  await supabase.from("avis").delete().eq("id", id);
  revaliderSite("avis");
  redirect("/admin/avis?ok=supprime");
}
