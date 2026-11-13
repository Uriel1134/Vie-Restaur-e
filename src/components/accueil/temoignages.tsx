import Image from "next/image";
import { Etiquette, Sceau, Scotch } from "@/components/ui/decor";
import type { Temoignage } from "@/lib/types";

const ROTATIONS = [-1.6, 1.2, -0.8];

/** Témoignages publiés depuis le dashboard. La section n'apparaît pas tant qu'il n'y en a aucun. */
export function SectionTemoignages({ temoignages }: { temoignages: Temoignage[] }) {
  if (temoignages.length === 0) return null;

  return (
    <section className="grain overflow-hidden bg-bleu-nuit py-24 text-white lg:py-32" aria-labelledby="titre-temoignages">
      <Sceau className="absolute -top-48 -left-40 -z-10 size-[34rem] text-white/[0.07]" />
      <div className="conteneur">
        <div className="max-w-2xl">
          <Etiquette clair>Ils et elles témoignent</Etiquette>
          <h2 id="titre-temoignages" className="mt-4 text-[2rem] text-white sm:text-[2.6rem]">
            Ce sont eux qui en parlent <span className="italic">le mieux</span>.
          </h2>
        </div>

        {temoignages.length > 1 && (
          <p className="mt-8 font-serif text-sm text-white/70 italic sm:hidden" aria-hidden>
            Faites glisser pour lire les autres témoignages →
          </p>
        )}
        {/* Mobile : carrousel à faire glisser · tablette et ordinateur : grille */}
        <ul
          className={`apparait -mx-4 mt-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pt-6 pb-8 [scrollbar-width:none] sm:mx-0 sm:mt-16 sm:grid sm:gap-10 sm:overflow-visible sm:p-0 ${temoignages.length === 1 ? "sm:max-w-2xl" : temoignages.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
        >
          {temoignages.map((t, i) => (
            <li key={t.id} className={`shrink-0 snap-center sm:w-auto ${temoignages.length > 1 ? "w-[86%]" : "w-full"}`}>
              <figure className="relative h-full" style={{ transform: `rotate(${ROTATIONS[i % 3]}deg)` }}>
                <Scotch className={`-top-3 ${i % 2 ? "right-10 rotate-6" : "left-10 -rotate-6"}`} />
                <div className="flex h-full flex-col bg-white p-8 text-texte shadow-papier">
                  <span aria-hidden className="font-serif text-[4.5rem] leading-[0.6] text-ruban">“</span>
                  <blockquote className="mt-2 flex-1 font-serif text-[1.25rem] leading-relaxed text-bleu-nuit italic">
                    {t.citation}
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-dashed border-bleu-vie/30 pt-5">
                    {t.photo && (
                      <Image
                        src={t.photo}
                        alt=""
                        width={56}
                        height={56}
                        className="size-14 shrink-0 rounded-full object-cover"
                        unoptimized
                      />
                    )}
                    <span>
                      <span className="block font-semibold text-bleu-nuit">{t.auteur}</span>
                      {t.lieu && <span className="text-[15px] text-bleu-profond">{t.lieu}</span>}
                    </span>
                  </figcaption>
                </div>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
