// Publie trois articles qui présentent des créations de la boutique, illustrés avec leurs photos.
// Relançable : mise à jour par slug. Supprime aussi les actualités de démonstration (slug « demo-… »).
// Catégorie « boutique » si la migration 0004 est passée, sinon « communique ».
//
// Usage : ADMIN_EMAIL=… ADMIN_PASSWORD='…' node --env-file=.env.local scripts/articles-boutique.mjs
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const cle = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const { ADMIN_EMAIL: email, ADMIN_PASSWORD: motDePasse } = process.env;
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

/** Première photo d'un produit de la boutique (l'image de couverture de l'article). */
async function photo(slug, index = 0) {
  const { data } = await supabase.from("produits").select("photos").eq("slug", slug).single();
  return data?.photos?.[index] ?? null;
}

const articles = [
  {
    slug: "des-messages-qui-relevent-a-porter-sur-soi",
    titre: "Des messages qui relèvent, à porter sur soi",
    date: "2026-11-09",
    image: await photo("sweat-je-suis-merveilleuse"),
    extrait:
      "« Je suis merveilleuse », « Je suis joyeuse » : nos sweats, t-shirts et mugs floqués portent des mots qui redonnent confiance. Et chaque achat soutient les familles que nous accompagnons.",
    contenu: `Il y a des phrases que l’on aimerait entendre plus souvent. Des phrases simples, qui rappellent à chacun sa valeur, surtout dans les moments où l’on doute. Avec notre collection de vêtements et d’accessoires floqués, nous avons choisi de les écrire noir sur blanc… et de les porter.

## Se le dire, chaque matin

Notre sweat rose « Je suis merveilleuse » existe avec plusieurs personnages, pour que chacune puisse s’y reconnaître. À ses côtés, le sweat « Je suis joyeuse » et le t-shirt « Je sais que je suis une créature merveilleuse » prolongent le même message.

[[produits:sweat-je-suis-merveilleuse,sweat-je-suis-joyeuse,t-shirt-creature-merveilleuse]]

> Parce qu’une personne restaurée peut accomplir de grandes œuvres, et que cela commence souvent par un regard bienveillant sur soi-même.

## Des cadeaux qui ont du sens

Un mug pour le café du matin, une peluche à offrir, un tablier « Tout est bon chez moi » pour celui ou celle qui régale toute la famille, un sac « Bonnes fêtes » pour emballer vos présents : nos objets personnalisés sont pensés pour faire plaisir, et pour transmettre.

[[produits:mugs-personnalises,peluches-personnalisees,tablier-tout-est-bon-chez-moi]]

## Comment commander

Tout se passe sur WhatsApp : choisissez un article, appuyez sur « Commander », et nous organisons ensemble la taille, le modèle, le paiement et le retrait. Les recettes de la boutique solidaire financent directement l’accompagnement des familles.`,
  },
  {
    slug: "wax-et-bogolan-des-tissus-qui-racontent",
    titre: "Wax et bogolan : des tissus qui racontent",
    date: "2026-11-06",
    image: await photo("tissus-wax"),
    extrait:
      "Motifs éclatants du wax, signes graphiques du bogolan : découvrez les tissus et créations de notre rayon « Tissus & tenues africaines ».",
    contenu: `Un tissu africain ne se contente pas d’habiller. Il colore une maison, accompagne une fête, se transmet d’une génération à l’autre. Notre rayon « Tissus & tenues africaines » réunit des étoffes et des créations qui portent cette mémoire vivante.

## Le wax, l’éclat des couleurs

Plumes, cercles, fleurs… Les motifs du wax se reconnaissent au premier coup d’œil. Nous proposons plusieurs motifs, à choisir pour vos propres créations ou pour vos tenues.

[[produits:tissus-wax,robes-kimono-wax,ensembles-wax]]

## Le bogolan, des signes qui parlent

Originaire du Mali, le bogolan se distingue par ses motifs graphiques aux tons ocre, noir et blanc. On le retrouve chez nous en tissu, mais aussi sur des rideaux qui donnent du caractère à une pièce.

[[produits:tissu-bogolan,rideaux-bogolan]]

> Habiller sa maison et ses proches de ces couleurs, c’est garder un lien avec ses racines, où que l’on vive.

## Pour la maison et les grandes occasions

Parure de lit en wax, ensemble pour homme, tenues pour les mariages et les baptêmes : le rayon s’adresse à toute la famille.

[[produits:parure-de-lit-wax,ensemble-homme,tenues-de-ceremonie]]

Un motif vous plaît ? Écrivez-nous sur WhatsApp : nous vous envoyons les modèles disponibles et organisons la commande avec vous.`,
  },
  {
    slug: "des-livres-pour-transmettre",
    titre: "Des livres pour transmettre",
    date: "2026-11-03",
    image: await photo("livre-bangangte"),
    extrait:
      "Écrire, illustrer, raconter : à la boutique solidaire, nos livres prolongent la mission de l’association, des adultes aux plus petits.",
    contenu: `Certaines histoires méritent d’être racontées, puis relues, puis transmises. C’est le sens du rayon « Livres » de notre boutique solidaire : des ouvrages qui font réfléchir, rêver, et parfois guérir un peu.

## Deux livres signés Joëlle Tchankou

« Je suis noir(e) et j’aime les fleurs » et « Bangangté » sont deux livres de Joëlle Tchankou, disponibles à la boutique.

[[produits:livre-je-suis-noire-et-j-aime-les-fleurs,livre-bangangte]]

> Un livre, c’est une main tendue qui reste dans la maison longtemps après qu’on l’a refermé.

## Pour les plus jeunes

Nos livres jeunesse illustrés mettent en scène des familles, des émotions et des petits héros du quotidien. Des histoires à lire ensemble, le soir, pour parler de ce qui compte.

[[produits:livres-jeunesse-illustres,livre-amour-veritable]]

## Et pour prolonger en famille

Nos puzzles illustrés de scènes de vie africaine sont une autre façon de raconter : on assemble, on observe, on discute.

[[produits:puzzles-scenes-africaines]]

Pour commander un livre ou poser une question, un message sur WhatsApp suffit : nous vous répondons rapidement.`,
  },
];

// Les produits cités doivent exister (sinon la fiche n'apparaît simplement pas).
const cites = [...new Set(articles.flatMap((a) => [...a.contenu.matchAll(/\[\[produits:([^\]]+)\]\]/g)].flatMap((m) => m[1].split(","))))];
const { data: existants } = await supabase.from("produits").select("slug").in("slug", cites);
const manquants = cites.filter((s) => !existants?.some((e) => e.slug === s));
if (manquants.length) console.warn("Produits introuvables :", manquants.join(", "));

const { error: eDemo } = await supabase.from("actualites").delete().like("slug", "demo-%");
console.log(eDemo ? `Démo : ${eDemo.message}` : "Actualités de démonstration supprimées.");

for (const a of articles) {
  let ligne = { ...a, categorie: "boutique", publie: true };
  let { error } = await supabase.from("actualites").upsert(ligne, { onConflict: "slug" });
  if (error && /categorie/i.test(error.message)) {
    ligne = { ...ligne, categorie: "communique" };
    ({ error } = await supabase.from("actualites").upsert(ligne, { onConflict: "slug" }));
  }
  if (error) throw new Error(`${a.slug} : ${error.message}`);
  console.log(`✓ ${a.titre} (${ligne.categorie})`);
}
