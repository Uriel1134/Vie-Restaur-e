import { rayons } from "@/data/association";
import { euros } from "@/lib/format";
import type { Produit } from "@/lib/types";

export const NOM_RAYON: Record<string, string> = Object.fromEntries(rayons.map((r) => [r.id, r.titre]));

/** « 20,00 € », « À partir de 15,00 € » ou « Prix sur demande ». */
export function prixAffiche(p: Pick<Produit, "prix" | "variantes">) {
  const prix = [p.prix, ...p.variantes.map((v) => v.prix ?? p.prix)]
    .filter((x): x is number => x !== null && x !== undefined)
    .map(Number);
  if (prix.length === 0) return "Prix sur demande";
  const min = Math.min(...prix);
  return min < Math.max(...prix) ? `À partir de ${euros(min)}` : euros(min);
}

/** Stock total, ou null si le stock n'est pas suivi. */
export function stockTotal(p: Pick<Produit, "stock" | "variantes">) {
  if (p.variantes.length) return p.variantes.reduce((s, v) => s + (Number(v.stock) || 0), 0);
  return p.stock;
}

export const enRupture = (p: Pick<Produit, "stock" | "variantes">) => stockTotal(p) === 0;

/** Libellés des variantes disponibles (« M · Blanc »), sans les ruptures. */
export function variantesDispo(p: Pick<Produit, "variantes">) {
  return p.variantes.filter((v) => v.stock > 0).map((v) => [v.taille, v.couleur].filter(Boolean).join(" · "));
}

/** Messages WhatsApp pré-remplis : la commande et les renseignements passent par WhatsApp. */
export const messageCommande = (p: Pick<Produit, "nom">) =>
  `Bonjour, je souhaite commander « ${p.nom} » à la boutique Vie Restaurée. Pouvez-vous me dire comment procéder ?`;

export const messageInfo = (p: Pick<Produit, "nom">) =>
  `Bonjour, j’aimerais avoir plus d’informations sur « ${p.nom} » (boutique Vie Restaurée).`;

export const messageRetour = (p: Pick<Produit, "nom">) => `Bonjour, « ${p.nom} » sera-t-il de nouveau disponible ?`;

/** Les ateliers sont des prestations : on « réserve » plutôt qu'on ne « commande ». */
export const estPrestation = (p: Pick<Produit, "rayon">) => p.rayon === "animations" || p.rayon === "dessin";

/** Variantes en stock, au format attendu par le panier (libellé + prix spécifique). */
export function variantesPanier(p: Pick<Produit, "variantes" | "prix">) {
  return p.variantes
    .filter((v) => v.stock > 0)
    .map((v) => ({ label: [v.taille, v.couleur].filter(Boolean).join(" · "), prix: v.prix ?? p.prix }));
}
