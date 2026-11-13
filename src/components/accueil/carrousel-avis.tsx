"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { Sceau } from "@/components/ui/decor";
import { dateLongue } from "@/lib/format";
import type { Avis } from "@/lib/types";
import { Etoile } from "./formulaire-avis";

const DUREE = 7000;

function Initiale({ nom, actif = false, taille = "size-12" }: { nom: string; actif?: boolean; taille?: string }) {
  return (
    <span className={`relative grid shrink-0 place-items-center ${taille}`}>
      <Sceau plein className={`absolute inset-0 transition-colors duration-300 ${actif ? "text-bleu-profond" : "text-bleu-vie/25"}`} />
      <span className={`relative font-serif text-lg font-semibold ${actif ? "text-white" : "text-bleu-nuit"}`}>
        {nom.charAt(0).toUpperCase()}
      </span>
    </span>
  );
}

/**
 * « Avis à la une » : un avis en grand, qui change seul toutes les 7 s.
 * Pause au survol / au focus, choix direct par les initiales, flèches. Pas de défilement auto si animations réduites.
 */
export function CarrouselAvis({ avis }: { avis: Avis[] }) {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  const [auto, setAuto] = useState(false);

  // Défilement automatique seulement si l'utilisateur n'a pas demandé à réduire les animations.
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const maj = () => setAuto(m.matches && avis.length > 1);
    maj();
    m.addEventListener("change", maj);
    return () => m.removeEventListener("change", maj);
  }, [avis.length]);

  useEffect(() => {
    if (!auto || pause) return;
    const t = window.setTimeout(() => setI((x) => (x + 1) % avis.length), DUREE);
    return () => window.clearTimeout(t);
  }, [auto, pause, i, avis.length]);

  const a = avis[i];
  const aller = (n: number) => setI((n + avis.length) % avis.length);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onFocusCapture={() => setPause(true)}
      onBlurCapture={() => setPause(false)}
    >
      <div className="relative">
      {/* Pile de cartes derrière : profondeur */}
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rotate-[2.5deg] rounded-[22px] bg-white/60" />
      <div aria-hidden className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-[1.2deg] rounded-[22px] bg-white/80" />

      <figure
        aria-roledescription="carrousel"
        aria-label="Avis à la une"
        className="relative flex min-h-[23rem] flex-col overflow-hidden rounded-[22px] bg-white p-7 shadow-papier sm:min-h-[22rem] sm:p-10"
      >
        <span aria-hidden className="pointer-events-none absolute top-1 right-7 font-serif text-[9rem] leading-[0.8] text-ruban/30 select-none">
          ”
        </span>

        {/* key : l'avis entre en fondu à chaque changement */}
        <div key={a.id} className="relative flex flex-1 flex-col" aria-live={auto && !pause ? "off" : "polite"}>
          <span className="avis-entre inline-flex" role="img" aria-label={`${a.note} sur 5`}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Etoile key={n} pleine={n <= a.note} className="size-6 text-bleu-vie/30" />
            ))}
          </span>
          <blockquote
            className="avis-entre mt-5 flex-1 font-serif text-[1.35rem] leading-[1.5] text-bleu-nuit italic sm:text-[1.65rem]"
            style={{ "--delai": "80ms" } as CSSProperties}
          >
            {a.message}
          </blockquote>
          <figcaption className="avis-entre mt-8 flex items-center gap-4" style={{ "--delai": "160ms" } as CSSProperties}>
            <Initiale nom={a.nom} actif />
            <span className="min-w-0">
              <span className="block font-semibold text-bleu-nuit">{a.nom}</span>
              <span className="block truncate text-sm text-texte/60">
                {[a.lieu, dateLongue(a.created_at)].filter(Boolean).join(" · ")}
              </span>
            </span>
          </figcaption>
        </div>

        {/* Progression */}
        {auto && (
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-lavande">
            <span
              key={`${a.id}-${pause}`}
              className="progres block h-full bg-ruban"
              style={{ "--duree": `${DUREE}ms`, animationPlayState: pause ? "paused" : "running" } as CSSProperties}
            />
          </span>
        )}
      </figure>
      </div>

      {avis.length > 1 && (
        <div className="relative mt-8 flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Choisir un avis">
            {avis.map((x, n) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setI(n)}
                aria-label={`Avis de ${x.nom}`}
                aria-current={n === i ? "true" : undefined}
                className="rounded-full transition-transform duration-300 hover:-translate-y-1 aria-[current=true]:-translate-y-1.5"
              >
                <Initiale nom={x.nom} actif={n === i} taille="size-10" />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {[
              { label: "Avis précédent", sens: -1, rot: "rotate-180" },
              { label: "Avis suivant", sens: 1, rot: "" },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                onClick={() => aller(i + b.sens)}
                aria-label={b.label}
                className="grid size-11 place-items-center rounded-full border border-bleu-vie/40 bg-white text-bleu-profond transition-colors hover:border-bleu-profond hover:bg-bleu-profond hover:text-white"
              >
                <ArrowRightIcon className={`size-4 ${b.rot}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
