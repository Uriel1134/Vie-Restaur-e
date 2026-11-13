import { NavigationAdmin } from "@/components/admin/navigation";
import { RafraichirSession } from "@/components/admin/rafraichir-session";
import { exigerAdmin } from "@/lib/admin/auth";
import { supabaseEnv } from "@/lib/supabase/env";
import { seDeconnecter } from "../connexion/actions";

// Zone authentifiée : toujours rendue à la requête, jamais mise en cache.
export const dynamic = "force-dynamic";

/** Espace protégé du dashboard : toute page ici exige une administratrice connectée. */
export default async function EspaceAdmin({ children }: { children: React.ReactNode }) {
  const { nom } = await exigerAdmin();
  const env = supabaseEnv()!;

  return (
    <div className="lg:flex">
      <RafraichirSession url={env.url} cle={env.key} />
      <NavigationAdmin nom={nom} deconnexion={seDeconnecter} />
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
