import type { CSSProperties } from "react";
import { Etiquette, Sceau, Scotch } from "@/components/ui/decor";
import type { Avis } from "@/lib/types";
import { CarrouselAvis } from "./carrousel-avis";
import { DialogueAvis } from "./dialogue-avis";
import { Etoile } from "./formulaire-avis";

const BOUTON =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-bleu-profond px-7 text-[15px] font-semibold text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-bleu-nuit active:scale-[0.98]";

/** Synthèse : note moyenne + répartition des notes en barres animées. */
function Synthese({ total, moyenne, repartition }: { total: number; moyenne: number; repartition: number[] }) {
  const max = Math.max(...repartition, 1);
  return (
    <div className="apparait rounded-[22px] bg-white p-6 shadow-douce sm:p-8">
      <div className="flex items-end gap-4">
        <p className="font-serif text-[4.2rem] leading-[0.85] font-semibold text-bleu-nuit">
          {moyenne.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
        </p>
        <div className="pb-1">
          <span className="inline-flex" role="img" aria-label={`Note moyenne : ${moyenne.toFixed(1)} sur 5`}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Etoile key={n} pleine={n <= Math.round(moyenne)} className="size-5 text-bleu-vie/30" />
            ))}
          </span>
          <p className="mt-1 text-sm text-texte/60">
            sur 5 · {total} avis
          </p>
        </div>
      </div>

      <ul className="mt-7 space-y-2.5" aria-label="Répartition des notes">
        {[5, 4, 3, 2, 1].map((n, i) => {
          const nb = repartition[n - 1];
          return (
            <li key={n} className="flex items-center gap-3 text-sm">
              <span className="w-8 shrink-0 text-texte/70">
                {n}
                <span aria-hidden className="ml-0.5 text-ruban">★</span>
                <span className="sr-only"> étoiles</span>
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-lavande">
                <span
                  className="barre-note block h-full rounded-full bg-ruban"
                  style={{ width: `${(nb / max) * 100}%`, "--delai": `${i * 90}ms` } as CSSProperties}
                />
              </span>
              <span className="w-5 shrink-0 text-right text-texte/60">{nb}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Vos avis : à gauche, l'invitation + la synthèse des notes ; à droite, l'avis à la une (carrousel).
 * Le formulaire carte postale s'ouvre dans une fenêtre. Les avis n'apparaissent qu'après modération.
 */
export function SectionAvis({
  avis,
  total,
  moyenne,
  repartition,
}: {
  avis: Avis[];
  total: number;
  moyenne: number | null;
  repartition: number[];
}) {
  return (
    <section id="avis" className="relative scroll-mt-28 overflow-hidden bg-lavande py-16 sm:py-24 lg:py-28" aria-labelledby="titre-avis">
      <Sceau plein className="absolute -top-32 -left-40 size-[30rem] text-white/70" />

      <div className="conteneur relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <div>
          <Etiquette>Vos avis</Etiquette>
          <h2 id="titre-avis" className="mt-4 text-[2rem] sm:text-[2.6rem]">
            Un mot pour nous, <span className="italic">un élan pour d’autres</span>.
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            Un achat, un atelier, une rencontre ? Votre retour nous aide à progresser, et rassure celles et ceux qui
            hésitent encore à pousser notre porte.
          </p>

          {moyenne !== null && (
            <div className="mt-10">
              <Synthese total={total} moyenne={moyenne} repartition={repartition} />
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <DialogueAvis className={BOUTON} />
            <span className="text-sm text-texte/60">Publié après une rapide relecture.</span>
          </div>
        </div>

        {avis.length > 0 ? (
          <CarrouselAvis avis={avis} />
        ) : (
          /* Aucun avis : une carte d'invitation */
          <div className="apparait relative mx-auto w-full max-w-lg rotate-[1.2deg]">
            <Scotch className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
            <div className="relative overflow-hidden bg-white p-10 text-center shadow-papier">
              <Sceau plein className="absolute -right-14 -bottom-14 size-48 text-lavande" />
              <span aria-hidden className="relative font-serif text-[5rem] leading-none text-ruban">“</span>
              <p className="relative font-serif text-[1.6rem] leading-snug font-semibold text-bleu-nuit">
                Le premier avis pourrait être le vôtre.
              </p>
              <p className="relative mt-3 text-texte/80">Quelques mots suffisent : ils comptent énormément pour nous.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
