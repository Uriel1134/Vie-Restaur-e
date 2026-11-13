/** Types des tables Supabase (voir supabase/migrations). */

export type Rayon = "tissus" | "bijoux" | "flocage" | "livres" | "puzzles" | "animations" | "dessin" | "jouets";

export type Variante = { taille?: string; couleur?: string; stock: number; prix?: number | null };

export type Produit = {
  id: string;
  nom: string;
  slug: string;
  rayon: Rayon;
  description: string | null;
  /** null = « Prix sur demande » */
  prix: number | null;
  photos: string[];
  variantes: Variante[];
  /** null = stock non suivi */
  stock: number | null;
  ordre: number;
  en_ligne: boolean;
  en_vedette: boolean;
  created_at: string;
};

export type StatutCommande = "attente" | "payee" | "prete" | "livree" | "annulee" | "remboursee";

export type LigneCommande = { produit_id?: string; libelle: string; variante?: string; quantite: number; prix_unitaire: number };

export type Commande = {
  id: string;
  numero: string;
  statut: StatutCommande;
  client_nom: string;
  client_email: string;
  client_telephone: string | null;
  lignes: LigneCommande[];
  livraison_mode: "retrait" | "relais";
  livraison_frais: number;
  point_relais: string | null;
  total: number;
  paiement_moyen: string | null;
  paiement_reference: string | null;
  notes: string | null;
  created_at: string;
};

export type CategorieActu = "terrain" | "temoignage" | "evenement" | "communique" | "boutique";

export type Actualite = {
  id: string;
  titre: string;
  slug: string;
  date: string;
  categorie: CategorieActu;
  image: string | null;
  extrait: string | null;
  contenu: string | null;
  publie: boolean;
};

export type Evenement = {
  id: string;
  titre: string;
  date: string;
  lieu: string;
  description: string | null;
  lien_inscription: string | null;
  image: string | null;
};

export type Temoignage = {
  id: string;
  citation: string;
  auteur: string;
  lieu: string | null;
  photo: string | null;
  publie: boolean;
  ordre: number;
};

export type Parametres = {
  email: string;
  whatsapp: string;
  telephone_affiche: string;
  horaires: string;
  adresse: string | null;
  instagram: string | null;
  tiktok: string | null;
  facebook: string | null;
  helloasso_don_url: string | null;
};

export type Avis = {
  id: string;
  nom: string;
  lieu: string | null;
  note: number;
  message: string;
  publie: boolean;
  created_at: string;
};
