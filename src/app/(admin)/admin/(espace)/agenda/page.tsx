import type { Metadata } from "next";
import Link from "next/link";
import { Bandeau, BoutonLien, EnTeteAdmin, MESSAGES_OK, Pastille, Vide } from "@/components/admin/ui";
import { exigerAdmin } from "@/lib/admin/auth";
import { dateHeure, estPasse } from "@/lib/format";
import type { Evenement } from "@/lib/types";

export const metadata: Metadata = { title: "Agenda" };

export default async function Agenda({ searchParams }: PageProps<"/admin/agenda">) {
  const { supabase } = await exigerAdmin();
  const { ok } = await searchParams;
  const { data } = await supabase.from("evenements").select("*").order("date", { ascending: false });
  const evenements = (data ?? []) as Evenement[];

  return (
    <>
      <EnTeteAdmin
        titre="Agenda"
        intro="Les prochains rendez-vous, affichés sur la page Actualités."
        action={<BoutonLien href="/admin/agenda/nouveau">+ Nouvel événement</BoutonLien>}
      />
      <Bandeau message={typeof ok === "string" ? MESSAGES_OK[ok] : undefined} />

      {evenements.length === 0 ? (
        <Vide action={<BoutonLien href="/admin/agenda/nouveau">Ajouter un événement</BoutonLien>}>
          Aucun événement programmé. Ajoutez vos collectes, fêtes et rencontres pour que vos soutiens puissent venir.
        </Vide>
      ) : (
        <ul className="divide-y divide-bleu-vie/10 overflow-hidden rounded-carte bg-white shadow-douce">
          {evenements.map((e) => {
            const passe = estPasse(e.date);
            return (
              <li key={e.id}>
                <Link href={`/admin/agenda/${e.id}`} className="flex items-center gap-4 p-4 hover:bg-lavande/50 sm:px-6">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-bleu-nuit">{e.titre}</p>
                    <p className="text-sm text-texte/60 first-letter:uppercase">
                      {dateHeure(e.date)} · {e.lieu}
                    </p>
                  </div>
                  <Pastille ton={passe ? "neutre" : "ok"}>{passe ? "Passé" : "À venir"}</Pastille>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
