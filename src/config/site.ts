/**
 * Informations de l'association, centralisées ici.
 * Plus tard, ces valeurs viendront du dashboard (CMS).
 * Les éléments marqués "À CONFIRMER" doivent être validés avec la présidente.
 */
export const site = {
  name: "Vie Restaurée",
  legalName: "Association Vie Restaurée",
  signature: "Parce qu’une personne restaurée peut accomplir de grandes œuvres",
  description:
    "Association loi 1901 qui accompagne les familles monoparentales en Afrique et dans les pays en développement : service social, autonomie financière et sensibilisation.",
  foundedYear: 2022,
  rna: "W451008881",
  registeredIn: "Loiret, France",
  email: "vierestauree2022@gmail.com",
  // À CONFIRMER : numéro WhatsApp principal (le flyer liste 3 numéros sans indicatif).
  whatsapp: "33766450977",
  phoneDisplay: "+33 7 66 45 09 77",
  hours: "Du lundi au vendredi, 9 h 30 – 17 h 00",
  // À FOURNIR : lien de la page de dons HelloAsso une fois l'association inscrite.
  helloassoDonUrl: null as string | null,
  // À COMPLÉTER : adresse postale du siège (Loiret) pour les mentions légales et le retrait sur place.
  adresse: null as string | null,
  social: {
    // À CONFIRMER : le compte « le_salondev » correspond-il bien à l'association ?
    instagram: "https://www.instagram.com/le_salondev/",
    tiktok: null as string | null, // À FOURNIR
    facebook: null as string | null, // À FOURNIR
  },
} as const;

export const mainNav = [
  { href: "/", label: "Accueil" },
  { href: "/qui-sommes-nous", label: "Qui sommes-nous" },
  { href: "/nos-actions", label: "Nos actions" },
  { href: "/boutique", label: "Boutique" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
] as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
