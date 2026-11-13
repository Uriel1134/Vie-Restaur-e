// Données de DÉMONSTRATION pour visualiser le design (produits, actualités, agenda, témoignages).
// Tout est marqué « exemple » : adresses en « demo-… », témoignages « Exemple · à remplacer ».
//
// Ajouter    : node --env-file=.env.local scripts/demo.mjs
// Supprimer  : node --env-file=.env.local scripts/demo.mjs --supprimer
//
// Variables requises : ADMIN_EMAIL et ADMIN_PASSWORD (compte admin du dashboard),
// passées en ligne de commande, jamais enregistrées dans un fichier.
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const cle = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const email = process.env.ADMIN_EMAIL;
const motDePasse = process.env.ADMIN_PASSWORD;
if (!url || !cle || !email || !motDePasse) {
  console.error("Il manque NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY / ADMIN_EMAIL / ADMIN_PASSWORD.");
  process.exit(1);
}

const supabase = createClient(url, cle, { auth: { persistSession: false } });
const { error: eAuth } = await supabase.auth.signInWithPassword({ email, password: motDePasse });
if (eAuth) {
  console.error("Connexion admin impossible :", eAuth.message);
  process.exit(1);
}

const MARQUE_TEMOIGNAGE = "Exemple · à remplacer";
const MARQUE_EVENEMENT = "[Exemple]";

async function supprimer() {
  const r = await Promise.all([
    supabase.from("produits").delete().like("slug", "demo-%"),
    supabase.from("actualites").delete().like("slug", "demo-%"),
    supabase.from("evenements").delete().like("description", `${MARQUE_EVENEMENT}%`),
    supabase.from("temoignages").delete().eq("lieu", MARQUE_TEMOIGNAGE),
  ]);
  r.forEach((x) => x.error && console.error(x.error.message));
  console.log("Données de démonstration supprimées.");
}

if (process.argv.includes("--supprimer")) {
  await supprimer();
  process.exit(0);
}

await supprimer(); // repartir propre si le script est relancé

// Photos d'illustration neutres (Picsum, libres de droits), à remplacer par les vraies photos.
const photo = (graine, l = 800, h = 1000) => `https://picsum.photos/seed/vr-${graine}/${l}/${h}`;

const produits = [
  {
    nom: "T-shirt « Vie restaurée »",
    rayon: "flocage",
    prix: 20,
    description: "Article d’exemple. Coton doux, sérigraphie du sceau de l’association. Coupe unisexe.",
    photos: [photo("tshirt-1"), photo("tshirt-2")],
    variantes: [
      { taille: "S", couleur: "Blanc", stock: 4, prix: null },
      { taille: "M", couleur: "Blanc", stock: 6, prix: null },
      { taille: "L", couleur: "Bleu", stock: 3, prix: null },
      { taille: "XL", couleur: "Bleu", stock: 0, prix: 22 },
    ],
    en_vedette: true,
  },
  {
    nom: "Bracelet pierre naturelle",
    rayon: "bijoux",
    prix: 15,
    description: "Article d’exemple. Perles de pierre naturelle montées sur fil élastique, fermoir en acier inoxydable.",
    photos: [photo("bracelet")],
    variantes: [
      { couleur: "Améthyste", stock: 5, prix: null },
      { couleur: "Œil de tigre", stock: 2, prix: null },
    ],
    en_vedette: true,
  },
  {
    nom: "Le livre de l’association",
    rayon: "livres",
    prix: 12,
    description: "Article d’exemple. Un récit pour prolonger la mission et la faire connaître autour de vous.",
    photos: [photo("livre")],
    variantes: [],
    stock: 15,
    en_vedette: true,
  },
  {
    nom: "Animation d’événement",
    rayon: "animations",
    prix: 80,
    description: "Prestation d’exemple. Animation pour anniversaires, fêtes et kermesses, au profit de l’association.",
    photos: [photo("animation")],
    variantes: [],
    stock: 10,
    en_vedette: true,
  },
  {
    nom: "Tote bag brodé",
    rayon: "flocage",
    prix: 14,
    description: "Article d’exemple. Toile épaisse, broderie « Vie restaurée ».",
    photos: [photo("totebag")],
    variantes: [],
    stock: 8,
    en_vedette: false,
  },
  {
    nom: "Collier acier inoxydable",
    rayon: "bijoux",
    prix: 18,
    description: "Article d’exemple. Chaîne fine et pendentif sceau, en acier inoxydable.",
    photos: [photo("collier")],
    variantes: [],
    stock: 0,
    en_vedette: false,
  },
].map((p, i) => ({ stock: 0, en_ligne: true, ...p, slug: `demo-produit-${i + 1}` }));

const aujourdHui = new Date();
const jour = (decalage) => {
  const d = new Date(aujourdHui);
  d.setDate(d.getDate() + decalage);
  return d;
};

const actualites = [
  {
    titre: "Une distribution alimentaire réussie",
    categorie: "terrain",
    date: jour(-6),
    extrait: "Exemple d’actualité : retour en images sur une journée de distribution aux familles accompagnées.",
    image: photo("actu-1", 1200, 800),
  },
  {
    titre: "Ouverture prochaine d’un bureau au Cameroun",
    categorie: "communique",
    date: jour(-20),
    extrait: "Exemple d’actualité : point d’étape sur le projet d’implantation dans le Nord, l’Ouest et à Douala.",
    image: photo("actu-2", 1200, 800),
  },
  {
    titre: "Paroles de bénévoles",
    categorie: "temoignage",
    date: jour(-35),
    extrait: "Exemple d’actualité : trois bénévoles racontent pourquoi ils ont rejoint l’association.",
    image: null,
  },
].map((a, i) => ({
  ...a,
  date: a.date.toISOString().slice(0, 10),
  slug: `demo-actualite-${i + 1}`,
  contenu: "Ceci est un texte d’exemple.\n\nIl sera remplacé par le vrai récit de l’association.",
  publie: true,
}));

const evenements = [
  { titre: "Vente solidaire de fin d’année", date: jour(12), lieu: "Orléans (Loiret)", heure: 14 },
  { titre: "Collecte de fournitures scolaires", date: jour(30), lieu: "Douala, Cameroun", heure: 10 },
].map(({ heure, ...e }) => {
  e.date.setUTCHours(heure - 1, 0, 0, 0);
  return {
    ...e,
    date: e.date.toISOString(),
    description: `${MARQUE_EVENEMENT} Venez nous rencontrer : stands, boutique solidaire et moments de partage.`,
    lien_inscription: null,
  };
});

const temoignages = [
  {
    citation: "Quand je suis arrivée, je ne voyais plus d’issue. On m’a écoutée, aidée, et aujourd’hui je fais vivre ma petite activité.",
    auteur: "Aminata",
    ordre: 1,
  },
  {
    citation: "Donner quelques heures par mois, c’est peu. Voir une maman reprendre confiance, c’est énorme.",
    auteur: "Paul, bénévole",
    ordre: 2,
  },
  {
    citation: "Une association discrète, sérieuse et présente. Nos actions communes ont changé des vies.",
    auteur: "Un partenaire",
    ordre: 3,
  },
].map((t) => ({ ...t, lieu: MARQUE_TEMOIGNAGE, publie: true }));

const resultats = await Promise.all([
  supabase.from("produits").insert(produits),
  supabase.from("actualites").insert(actualites),
  supabase.from("evenements").insert(evenements),
  supabase.from("temoignages").insert(temoignages),
]);
const erreurs = resultats.filter((r) => r.error).map((r) => r.error.message);
if (erreurs.length) {
  console.error("Erreurs :", erreurs);
  process.exit(1);
}
console.log(
  `Ajouté : ${produits.length} produits, ${actualites.length} actualités, ${evenements.length} événements, ${temoignages.length} témoignages.`,
);
