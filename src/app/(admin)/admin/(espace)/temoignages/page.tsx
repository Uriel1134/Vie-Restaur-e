import type { Metadata } from "next";
import Link from "next/link";
import { Bandeau, BoutonLien, EnTeteAdmin, MESSAGES_OK, Pastille, Vide } from "@/components/admin/ui";
import { exigerAdmin } from "@/lib/admin/auth";
import type { Temoignage } from "@/lib/types";

export const metadata: Metadata = { title: "Témoignages" };

export default async function Temoignages({ searchParams }: PageProps<"/admin/temoignages">) {
  const { supabase } = await exigerAdmin();
  const { ok } = await searchParams;
  const { data } = await supabase.from("temoignages").select("*").order("ordre").order("created_at", { ascending: false });
  const temoignages = (data ?? []) as Temoignage[];
  const publies = temoignages.filter((t) => t.publie).length;

  return (
    <>
      <EnTeteAdmin
        titre="Témoignages"
        intro="Les 3 premiers témoignages publiés apparaissent sur la page d’accueil."
        action={<BoutonLien href="/admin/temoignages/nouveau">+ Nouveau témoignage</BoutonLien>}
      />
      <Bandeau message={typeof ok === "string" ? MESSAGES_OK[ok] : undefined} />

      {temoignages.length === 0 ? (
        <Vide action={<BoutonLien href="/admin/temoignages/nouveau">Ajouter un témoignage</BoutonLien>}>
          Les mots d’une maman accompagnée, d’un bénévole ou d’un partenaire touchent plus que n’importe quel texte.
          Demandez toujours l’accord de la personne avant de publier.
        </Vide>
      ) : (
        <>
          {publies > 3 && (
            <p className="mb-4 text-[15px] text-texte/70">
              {publies} témoignages publiés : seuls les 3 premiers (ordre le plus petit) s’affichent sur l’accueil.
            </p>
          )}
          <ul className="divide-y divide-bleu-vie/10 overflow-hidden rounded-carte bg-white shadow-douce">
            {temoignages.map((t) => (
              <li key={t.id}>
                <Link href={`/admin/temoignages/${t.id}`} className="flex items-center gap-4 p-4 hover:bg-lavande/50 sm:px-6">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-bleu-nuit italic">« {t.citation} »</p>
                    <p className="text-sm text-texte/60">
                      {t.auteur}
                      {t.lieu && ` · ${t.lieu}`} · ordre {t.ordre}
                    </p>
                  </div>
                  <Pastille ton={t.publie ? "ok" : "attente"}>{t.publie ? "Publié" : "Brouillon"}</Pastille>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
