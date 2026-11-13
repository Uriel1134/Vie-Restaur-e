"use client";

import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | null = null;

/** Client Supabase du navigateur (dashboard) : envoi des photos, rafraîchissement de session. */
export function supabaseNavigateur(url: string, key: string) {
  client ??= createBrowserClient(url, key);
  return client;
}
