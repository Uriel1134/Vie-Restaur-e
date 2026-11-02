import type { ReactNode } from "react";
import { EnTetePage } from "@/components/en-tete-page";

export type SectionLegale = { id: string; titre: string; contenu: ReactNode };

/** Gabarit des pages légales : sommaire collant + texte lisible. */
export function PageLegale({
  titre,
  intro,
  miseAJour,
  sections,
}: {
  titre: string;
  intro: string;
  miseAJour: string;
  sections: SectionLegale[];
}) {
  return (
    <>
      <EnTetePage etiquette="Informations légales" titre={titre} intro={intro} />
      <section className="py-20 lg:py-24">
        <div className="conteneur grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-20">
          <nav aria-label="Sommaire" className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-serif text-lg text-bleu-vie italic">Sommaire</p>
            <ol className="mt-4 space-y-2 border-l border-bleu-vie/25 text-[15px]">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 hover:border-bleu-profond hover:text-bleu-profond">
                    {i + 1}. {s.titre}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-3xl">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-bleu-vie/15 py-8 first:pt-0 last:border-0">
                <h2 className="text-[1.6rem]">
                  <span className="mr-2 font-serif text-bleu-vie italic">{i + 1}.</span>
                  {s.titre}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed [&_a]:font-medium [&_a]:text-bleu-profond [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-bleu-nuit">
                  {s.contenu}
                </div>
              </section>
            ))}
            <p className="mt-10 text-sm text-texte/60">Dernière mise à jour : {miseAJour}</p>
          </div>
        </div>
      </section>
    </>
  );
}

/** Repère visuel pour une information encore à fournir par l'association. */
export function ACompleter({ children }: { children: ReactNode }) {
  return <mark className="rounded bg-ruban/30 px-1.5 py-0.5 text-bleu-nuit">[À compléter : {children}]</mark>;
}
