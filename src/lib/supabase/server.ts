import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseEnv } from "./env";

/** Client Supabase lié à la session de l'utilisateur (cookies) — pour le dashboard. */
export async function supabaseServeur() {
  const env = supabaseEnv();
  if (!env) return null;
  const store = await cookies();
  return createServerClient(env.url, env.key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (aEcrire) => {
        try {
          aEcrire.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Appel depuis un Server Component : les cookies ne peuvent pas y être écrits.
          // La session est rafraîchie côté navigateur (RafraichirSession) et par les Server Actions.
        }
      },
    },
  });
}
