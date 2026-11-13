"use client";

import { useSyncExternalStore } from "react";

/** Un article du panier (données d'affichage ; les prix réels sont recalculés par la base à la commande). */
export type LignePanier = {
  slug: string;
  nom: string;
  photo: string | null;
  rayon: string;
  variante: string | null;
  quantite: number;
  prix: number | null;
};

const CLE = "vr-panier";
const MAX_QUANTITE = 20;
const ecouteurs = new Set<() => void>();
let cache: LignePanier[] | null = null;
const VIDE: LignePanier[] = [];

function lire(): LignePanier[] {
  if (cache) return cache;
  try {
    const brut = JSON.parse(window.localStorage.getItem(CLE) ?? "[]");
    cache = Array.isArray(brut) ? brut : [];
  } catch {
    cache = [];
  }
  return cache;
}

function ecrire(lignes: LignePanier[]) {
  cache = lignes;
  try {
    window.localStorage.setItem(CLE, JSON.stringify(lignes));
  } catch {
    /* navigation privée : le panier vit le temps de la page */
  }
  ecouteurs.forEach((f) => f());
}

function abonner(f: () => void) {
  ecouteurs.add(f);
  const autreOnglet = (e: StorageEvent) => {
    if (e.key === CLE) {
      cache = null;
      f();
    }
  };
  window.addEventListener("storage", autreOnglet);
  return () => {
    ecouteurs.delete(f);
    window.removeEventListener("storage", autreOnglet);
  };
}

const memeLigne = (a: Pick<LignePanier, "slug" | "variante">, b: Pick<LignePanier, "slug" | "variante">) =>
  a.slug === b.slug && (a.variante ?? null) === (b.variante ?? null);

export const panier = {
  ajouter(l: Omit<LignePanier, "quantite">, quantite = 1) {
    const lignes = lire();
    const existe = lignes.find((x) => memeLigne(x, l));
    ecrire(
      existe
        ? lignes.map((x) => (x === existe ? { ...x, quantite: Math.min(MAX_QUANTITE, x.quantite + quantite) } : x))
        : [...lignes, { ...l, quantite: Math.min(MAX_QUANTITE, quantite) }],
    );
    window.dispatchEvent(new CustomEvent("vr-panier-ajout", { detail: l.nom }));
  },
  quantite(l: Pick<LignePanier, "slug" | "variante">, q: number) {
    ecrire(
      q <= 0
        ? lire().filter((x) => !memeLigne(x, l))
        : lire().map((x) => (memeLigne(x, l) ? { ...x, quantite: Math.min(MAX_QUANTITE, q) } : x)),
    );
  },
  retirer(l: Pick<LignePanier, "slug" | "variante">) {
    ecrire(lire().filter((x) => !memeLigne(x, l)));
  },
  vider() {
    ecrire([]);
  },
};

/** Le panier, réactif (côté serveur : vide). */
export function usePanier() {
  return useSyncExternalStore(abonner, lire, () => VIDE);
}

export const nombreArticles = (lignes: LignePanier[]) => lignes.reduce((s, l) => s + l.quantite, 0);
