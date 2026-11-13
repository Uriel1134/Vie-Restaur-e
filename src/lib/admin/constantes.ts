export const CATEGORIES_ACTU = [
  { value: "terrain", label: "Nouvelles du terrain" },
  { value: "temoignage", label: "Témoignage" },
  { value: "evenement", label: "Événement" },
  { value: "communique", label: "Communiqué" },
  { value: "boutique", label: "La boutique" },
] as const;

export const NOM_CATEGORIE: Record<string, string> = Object.fromEntries(CATEGORIES_ACTU.map((c) => [c.value, c.label]));

export const STATUTS_COMMANDE = [
  { value: "attente", label: "En attente de paiement" },
  { value: "payee", label: "Payée — à préparer" },
  { value: "prete", label: "Prête / expédiée" },
  { value: "livree", label: "Retirée / livrée" },
  { value: "annulee", label: "Annulée" },
  { value: "remboursee", label: "Remboursée" },
] as const;

export const NOM_STATUT: Record<string, string> = Object.fromEntries(STATUTS_COMMANDE.map((s) => [s.value, s.label]));

export function tonStatut(s: string): "neutre" | "ok" | "attente" | "alerte" {
  return s === "payee" ? "attente" : s === "attente" ? "alerte" : s === "livree" ? "ok" : "neutre";
}
