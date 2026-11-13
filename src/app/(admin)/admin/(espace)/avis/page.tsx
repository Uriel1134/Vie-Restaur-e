import type { Metadata } from "next";
import { BoutonSupprimer } from "@/components/admin/formulaire";
import { Bandeau, EnTeteAdmin, MESSAGES_OK, Pastille, Vide } from "@/components/admin/ui";
import { exigerAdmin } from "@/lib/admin/auth";
import { dateLongue } from "@/lib/format";
import type { Avis } from "@/lib/types";
import { changerPublication, supprimerAvis } from "./actions";

export const metadata: Metadata = { title: "Avis" };

const MESSAGES: Record<string, string> = {
  ...MESSAGES_OK,
  publie: "Avis publié : il apparaît maintenant sur la page d’accueil.",
  masque: "Avis masqué : il n’apparaît plus sur le site.",
};

export default async function AvisAdmin({ searchParams }: PageProps<"/admin/avis">) {
  const { supabase } = await exigerAdmin();
  const { ok } = await searchParams;
  const { data } = await supabase.from("avis").select("*").order("publie").order("created_at", { ascending: false });
  const avis = (data ?? []) as Avis[];
  const enAttente = avis.filter((a) => !a.publie).length;

  return (
    <>
      <EnTeteAdmin
        titre="Avis"
        intro="Les avis laissés par les visiteurs. Rien n’apparaît sur le site avant que vous ne le publiiez."
      />
      <Bandeau message={typeof ok === "string" ? MESSAGES[ok] : undefined} />

      {enAttente > 0 && (
        <p className="mb-4 font-medium text-bleu-nuit">
          {enAttente} avis en attente de relecture.
        </p>
      )}

      {avis.length === 0 ? (
        <Vide>Aucun avis pour l’instant. Ils arriveront ici dès qu’un visiteur en laissera un sur la page d’accueil.</Vide>
      ) : (
        <ul className="space-y-4">
          {avis.map((a) => (
            <li key={a.id} className="rounded-carte bg-white p-5 shadow-douce sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold text-bleu-nuit">
                  {"★".repeat(a.note)}
                  <span className="text-bleu-vie/30">{"★".repeat(5 - a.note)}</span>
                  <span className="ml-3">{a.nom}</span>
                  {a.lieu && <span className="font-normal text-texte/60"> · {a.lieu}</span>}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-texte/50">{dateLongue(a.created_at)}</span>
                  <Pastille ton={a.publie ? "ok" : "attente"}>{a.publie ? "Publié" : "En attente"}</Pastille>
                </div>
              </div>
              <p className="mt-3 leading-relaxed whitespace-pre-line">{a.message}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-bleu-vie/10 pt-4">
                <form action={changerPublication.bind(null, a.id, !a.publie)}>
                  <button
                    type="submit"
                    className={`rounded-full px-5 py-2 text-[15px] font-semibold ${
                      a.publie ? "border-2 border-bleu-vie text-bleu-profond hover:bg-lavande" : "bg-bleu-profond text-white hover:bg-bleu-nuit"
                    }`}
                  >
                    {a.publie ? "Masquer" : "Publier"}
                  </button>
                </form>
                <BoutonSupprimer action={supprimerAvis.bind(null, a.id)} question={`Supprimer l’avis de ${a.nom} ?`} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
