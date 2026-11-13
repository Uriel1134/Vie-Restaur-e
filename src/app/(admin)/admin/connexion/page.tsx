import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/brand/logo-horizontal-bleu.png";
import { Sceau } from "@/components/ui/decor";
import { supabaseEnv } from "@/lib/supabase/env";
import { FormulaireConnexion } from "./formulaire";

export const metadata: Metadata = { title: "Connexion" };

const MESSAGES: Record<string, string> = {
  acces: "Ce compte n’a pas accès au dashboard.",
  config: "Le dashboard n’est pas encore relié à Supabase.",
};

export default async function Connexion({ searchParams }: PageProps<"/admin/connexion">) {
  const { erreur } = await searchParams;
  const configure = Boolean(supabaseEnv());
  const message = typeof erreur === "string" ? MESSAGES[erreur] : undefined;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
      <Sceau plein className="absolute -top-40 -right-40 size-[36rem] text-white" />
      <Sceau className="absolute -bottom-48 -left-48 size-[30rem] text-bleu-vie/20" />
      <div className="relative w-full max-w-md">
        <div className="bg-white p-8 shadow-papier sm:p-10">
          <Image src={logo} alt="Vie Restaurée" className="h-12 w-auto" sizes="190px" priority />
          <h1 className="mt-8 text-[2rem]">Bon retour parmi nous.</h1>
          <p className="mt-2 font-serif text-bleu-profond italic">Connectez-vous pour gérer le site.</p>
          <div className="mt-8">
            {configure ? (
              <FormulaireConnexion messageInitial={message} />
            ) : (
              <p className="rounded-xl bg-ruban/20 px-4 py-3 text-[15px] text-bleu-nuit">
                Le dashboard n’est pas encore relié à Supabase. Renseignez <code>NEXT_PUBLIC_SUPABASE_URL</code> et{" "}
                <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> dans <code>.env.local</code>.
              </p>
            )}
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-texte/60">
          <Link href="/" className="hover:underline">
            ← Retour au site
          </Link>
        </p>
      </div>
    </main>
  );
}
