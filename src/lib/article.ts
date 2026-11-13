/**
 * Mise en forme simple du texte d'une actualité (saisi dans le dashboard).
 * Blocs séparés par une ligne vide :
 *   ## Un intertitre
 *   > Une citation mise en exergue
 *   [[produits:slug-1,slug-2]]   → fiches produits de la boutique insérées dans l'article
 *   tout le reste                → paragraphe
 */
export type Bloc =
  | { type: "paragraphe"; texte: string }
  | { type: "intertitre"; texte: string }
  | { type: "citation"; texte: string }
  | { type: "produits"; slugs: string[] };

const PRODUITS = /^\[\[produits?:\s*([^\]]+)\]\]$/i;

export function analyserContenu(contenu: string | null): Bloc[] {
  return (contenu ?? "")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b): Bloc => {
      const p = b.match(PRODUITS);
      if (p) return { type: "produits", slugs: p[1].split(",").map((s) => s.trim()).filter(Boolean) };
      if (b.startsWith("## ")) return { type: "intertitre", texte: b.slice(3).trim() };
      if (b.startsWith("> ")) return { type: "citation", texte: b.replace(/^>\s?/gm, "").trim() };
      return { type: "paragraphe", texte: b };
    });
}

export const slugsProduits = (blocs: Bloc[]) =>
  [...new Set(blocs.flatMap((b) => (b.type === "produits" ? b.slugs : [])))];

/** Temps de lecture estimé (≈ 220 mots par minute), au moins 1 minute. */
export function tempsDeLecture(...textes: (string | null | undefined)[]) {
  const mots = textes.join(" ").replace(/\[\[[^\]]*\]\]/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(mots / 220));
}
