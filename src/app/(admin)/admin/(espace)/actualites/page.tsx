import type { Metadata } from "next";
import Link from "next/link";
import { Bandeau, BoutonLien, EnTeteAdmin, MESSAGES_OK, Pastille, Vide } from "@/components/admin/ui";
import { exigerAdmin } from "@/lib/admin/auth";
import { NOM_CATEGORIE } from "@/lib/admin/constantes";
import { dateLongue } from "@/lib/format";
import type { Actualite } from "@/lib/types";

export const metadata: Metadata = { title: "Actualités" };


export default async function Actualites({ searchParams }: PageProps<"/admin/actualites">) {
  const { supabase } = await exigerAdmin();
  const { ok } = await searchParams;
  const { data } = await supabase.from("actualites").select("*").order("date", { ascending: false });
  const actus = (data ?? []) as Actualite[];

  return (
    <>
      <EnTeteAdmin
        titre="Actualités"
        intro="Le carnet de bord : nouvelles du terrain, témoignages, communiqués."
        action={<BoutonLien href="/admin/actualites/nouveau">+ Nouvelle actualité</BoutonLien>}
      />
      <Bandeau message={typeof ok === "string" ? MESSAGES_OK[ok] : undefined} />

      {actus.length === 0 ? (
        <Vide action={<BoutonLien href="/admin/actualites/nouveau">Écrire la première actualité</BoutonLien>}>
          Aucune actualité pour l’instant. Racontez une action, partagez un témoignage, annoncez une nouvelle.
        </Vide>
      ) : (
        <ul className="divide-y divide-bleu-vie/10 overflow-hidden rounded-carte bg-white shadow-douce">
          {actus.map((a) => (
            <li key={a.id}>
              <Link href={`/admin/actualites/${a.id}`} className="flex items-center gap-4 p-4 hover:bg-lavande/50 sm:px-6">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-bleu-nuit">{a.titre}</p>
                  <p className="text-sm text-texte/60">
                    {NOM_CATEGORIE[a.categorie]} · {dateLongue(a.date)}
                  </p>
                </div>
                <Pastille ton={a.publie ? "ok" : "attente"}>{a.publie ? "Publiée" : "Brouillon"}</Pastille>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
