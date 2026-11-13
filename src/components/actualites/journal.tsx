"use client";

import { useState, type CSSProperties } from "react";
import { CATEGORIES_ACTU } from "@/lib/admin/constantes";
import type { Actualite } from "@/lib/types";
import { CarteArticle } from "./carte-article";

/** Le journal : filtres par catégorie (seulement celles qui ont des articles) + grille de cartes. */
export function Journal({ articles }: { articles: Actualite[] }) {
  const [filtre, setFiltre] = useState<string | null>(null);
  const presentes = CATEGORIES_ACTU.filter((c) => articles.some((a) => a.categorie === c.value));
  const visibles = filtre ? articles.filter((a) => a.categorie === filtre) : articles;

  const puce = (valeur: string | null, label: string, n: number) => (
    <button
      key={label}
      type="button"
      onClick={() => setFiltre(valeur)}
      aria-pressed={filtre === valeur}
      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-bleu-vie/30 bg-white px-4 text-[15px] font-medium text-bleu-profond transition-colors hover:border-bleu-profond aria-pressed:border-bleu-nuit aria-pressed:bg-bleu-nuit aria-pressed:text-white"
    >
      {label}
      <span className="text-xs opacity-60">{n}</span>
    </button>
  );

  return (
    <>
      {presentes.length > 1 && (
        <div role="group" aria-label="Filtrer par catégorie" className="mt-8 flex flex-wrap gap-2">
          {puce(null, "Tout", articles.length)}
          {presentes.map((c) => puce(c.value, c.label, articles.filter((a) => a.categorie === c.value).length))}
        </div>
      )}
      <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visibles.map((a, i) => (
          <li key={a.id} style={{ "--i": i % 3 } as CSSProperties} className="apparait">
            <CarteArticle actu={a} />
          </li>
        ))}
      </ul>
    </>
  );
}
