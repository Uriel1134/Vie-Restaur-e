"use client";

import { useEffect } from "react";
import { supabaseNavigateur } from "@/lib/supabase/browser";

/**
 * Garde la session du dashboard valide : le client navigateur rafraîchit le jeton
 * et réécrit les cookies (le site n'utilise pas de proxy/middleware, pour rester léger sur Cloudflare).
 */
export function RafraichirSession({ url, cle }: { url: string; cle: string }) {
  useEffect(() => {
    const supabase = supabaseNavigateur(url, cle);
    void supabase.auth.getSession();
    const { data } = supabase.auth.onAuthStateChange(() => {});
    return () => data.subscription.unsubscribe();
  }, [url, cle]);
  return null;
}
