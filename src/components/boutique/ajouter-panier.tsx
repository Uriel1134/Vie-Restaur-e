"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { panier } from "@/lib/panier";

type Props = {
  slug: string;
  nom: string;
  photo: string | null;
  rayon: string;
  prix: number | null;
  /** Variantes disponibles : libellé (« M · Blanc ») + prix spécifique éventuel. */
  variantes: { label: string; prix: number | null }[];
  libelle?: string;
};

function SacIcone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8Z" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

function CocheIcone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

/** Retour visuel « Ajouté » pendant 1,8 s. */
function useAjoute() {
  const [ajoute, setAjoute] = useState(false);
  const t = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(t.current), []);
  return [
    ajoute,
    () => {
      setAjoute(true);
      window.clearTimeout(t.current);
      t.current = window.setTimeout(() => setAjoute(false), 1800);
    },
  ] as const;
}

const BASE =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-[background-color,transform,color] duration-200 active:scale-[0.97]";

/** Version carte : ajout direct, ou « Choisir » si l'article a des variantes. */
export function AjouterPanierCarte(p: Props) {
  const [ajoute, marquer] = useAjoute();
  if (p.variantes.length > 1) {
    return (
      <Link href={`/boutique/${p.slug}`} className={`${BASE} bg-bleu-profond text-white hover:bg-bleu-nuit`}>
        <SacIcone className="size-4" /> Choisir
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={() => {
        panier.ajouter({ slug: p.slug, nom: p.nom, photo: p.photo, rayon: p.rayon, variante: p.variantes[0]?.label ?? null, prix: p.variantes[0]?.prix ?? p.prix });
        marquer();
      }}
      className={`${BASE} ${ajoute ? "bg-emerald-600 text-white" : "bg-bleu-profond text-white hover:bg-bleu-nuit"}`}
    >
      {ajoute ? <CocheIcone className="size-4" /> : <SacIcone className="size-4" />}
      <span aria-live="polite">{ajoute ? "Ajouté" : (p.libelle ?? "Ajouter")}</span>
    </button>
  );
}

/** Version fiche produit : choix de la variante, quantité, ajout. */
export function AjouterPanierFiche(p: Props) {
  const [variante, setVariante] = useState<string | null>(p.variantes.length === 1 ? p.variantes[0].label : null);
  const [quantite, setQuantite] = useState(1);
  const [ajoute, marquer] = useAjoute();
  const [manque, setManque] = useState(false);
  const choix = p.variantes.find((v) => v.label === variante);

  return (
    <div>
      {p.variantes.length > 1 && (
        <fieldset>
          <legend className="text-[15px] font-medium text-bleu-nuit">
            Choisissez votre modèle
            {manque && <span className="ml-2 text-sm font-normal text-red-700">← à choisir</span>}
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.variantes.map((v) => (
              <button
                key={v.label}
                type="button"
                aria-pressed={variante === v.label}
                onClick={() => {
                  setVariante(v.label);
                  setManque(false);
                }}
                className="rounded-full border border-bleu-vie/40 bg-white px-4 py-2 text-[15px] text-bleu-profond transition-colors hover:border-bleu-profond aria-pressed:border-bleu-nuit aria-pressed:bg-bleu-nuit aria-pressed:text-white"
              >
                {v.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center rounded-full border border-bleu-vie/40 bg-white" role="group" aria-label="Quantité">
          <button
            type="button"
            onClick={() => setQuantite((q) => Math.max(1, q - 1))}
            aria-label="Diminuer la quantité"
            className="grid size-12 place-items-center rounded-full text-xl text-bleu-profond hover:bg-lavande"
          >
            −
          </button>
          <span className="w-8 text-center font-semibold text-bleu-nuit" aria-live="polite">
            {quantite}
          </span>
          <button
            type="button"
            onClick={() => setQuantite((q) => Math.min(20, q + 1))}
            aria-label="Augmenter la quantité"
            className="grid size-12 place-items-center rounded-full text-xl text-bleu-profond hover:bg-lavande"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            if (p.variantes.length > 1 && !variante) {
              setManque(true);
              return;
            }
            panier.ajouter(
              { slug: p.slug, nom: p.nom, photo: p.photo, rayon: p.rayon, variante, prix: choix?.prix ?? p.prix },
              quantite,
            );
            marquer();
          }}
          className={`${BASE} min-h-13 flex-1 px-7 sm:flex-none ${
            ajoute ? "bg-emerald-600 text-white" : "bg-bleu-profond text-white hover:-translate-y-0.5 hover:bg-bleu-nuit"
          }`}
        >
          {ajoute ? <CocheIcone className="size-5" /> : <SacIcone className="size-5" />}
          <span aria-live="polite">{ajoute ? "Ajouté au panier" : "Ajouter au panier"}</span>
        </button>
      </div>
    </div>
  );
}

export { SacIcone };
