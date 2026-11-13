// Catalogue initial de la boutique, construit à partir du dossier Catalogue_Vie-restauree (novembre 2026).
// Noms et descriptions rédigés d'après les photos : À FAIRE VALIDER par la présidente.
// Aucun prix fourni : prix = null → « Prix sur demande » (commande et renseignements par WhatsApp).
// Les photos sont indiquées par leur nom dans le dossier de leur rayon.

const D = {
  animations: "01_Ateliers-animations-evenementiels/Ateliers-animations-evenementiels",
  flocage: "02_Flocage-vetements-et-accessoires/Flocage-vetements-et-accessoires",
  bijoux: "03_Bijoux-acier-inoxydable/Bijoux-acier-inoxydable",
  dessin: "04_Ateliers-dessin-manuel-et-numerique/Ateliers-dessin-manuel-et-numerique",
  tissus: "05_Tissu-et-tenues-africaines/Tissu-et-tenues-africaines",
  puzzles: "06_Puzzles/Puzzles",
  livres: "07_Livres/Livres",
  jouets: "08_Jouets-eveil/Jouets-eveil",
};
const ph = (rayon, ...n) => n.map((i) => `${D[rayon]}_${String(i).padStart(2, "0")}.jpeg`);

export const catalogue = [
  // ── Tissus & tenues africaines ─────────────────────────────
  { slug: "tissus-wax", rayon: "tissus", vedette: true, nom: "Tissus wax", photos: ph("tissus", 12, 11, 13, 7, 2),
    description: "Tissus wax aux motifs éclatants, pour vos créations, tenues et décorations. Plusieurs motifs disponibles : demandez-nous les modèles du moment." },
  { slug: "tissu-bogolan", rayon: "tissus", nom: "Tissu bogolan", photos: ph("tissus", 8),
    description: "Tissu aux motifs bogolan, ocre, noir et blanc." },
  { slug: "rideaux-bogolan", rayon: "tissus", nom: "Rideaux motif bogolan", photos: ph("tissus", 9),
    description: "Rideaux blancs à bande imprimée de motifs bogolan, pour habiller une pièce aux couleurs de l’Afrique." },
  { slug: "parure-de-lit-wax", rayon: "tissus", nom: "Parure de lit wax", photos: ph("tissus", 14),
    description: "Parure de lit en tissu wax, bleu et blanc." },
  { slug: "robes-kimono-wax", rayon: "tissus", nom: "Robes kimono en wax", photos: ph("tissus", 1, 5),
    description: "Robes amples à manches kimono en tissu wax, avec turban assorti." },
  { slug: "ensembles-wax", rayon: "tissus", nom: "Ensembles et pyjamas en wax", photos: ph("tissus", 4, 6, 3),
    description: "Ensembles chemise et pantalon en wax, pour le quotidien ou la maison." },
  { slug: "ensemble-homme", rayon: "tissus", nom: "Ensemble homme", photos: ph("tissus", 10),
    description: "Ensemble chemise manches courtes et pantalon aux motifs africains." },
  { slug: "tenues-de-ceremonie", rayon: "tissus", nom: "Tenues de cérémonie", photos: ph("tissus", 15, 16),
    description: "Tenues pour mariages, baptêmes et grandes occasions." },

  // ── Bijoux en acier inoxydable ─────────────────────────────
  { slug: "parure-filigrane-doree", rayon: "bijoux", vedette: true, nom: "Parures dorées filigrane", photos: ph("bijoux", 11, 12, 10, 5),
    description: "Parures collier et boucles d’oreilles dorées, travaillées en filigrane." },
  { slug: "parure-maille-doree", rayon: "bijoux", nom: "Parure maille dorée", photos: ph("bijoux", 9, 13),
    description: "Parure collier, boucles d’oreilles et bracelet en maille dorée." },
  { slug: "bagues", rayon: "bijoux", nom: "Bagues", photos: ph("bijoux", 14, 6, 3, 4),
    description: "Bagues dorées, serties ou ajourées, à porter seules ou à accumuler." },
  { slug: "boucles-oreilles-geometriques", rayon: "bijoux", nom: "Boucles d’oreilles géométriques", photos: ph("bijoux", 15, 8),
    description: "Boucles d’oreilles dorées aux formes graphiques." },
  { slug: "sautoir-et-pendantes", rayon: "bijoux", nom: "Sautoir et boucles pendantes", photos: ph("bijoux", 7),
    description: "Sautoir à franges et boucles d’oreilles pendantes assorties." },
  { slug: "bracelets", rayon: "bijoux", nom: "Bracelets", photos: ph("bijoux", 1),
    description: "Bracelets dorés et argentés, joncs, mailles et chaînes." },
  { slug: "colliers-et-assortiments", rayon: "bijoux", nom: "Colliers et assortiments", photos: ph("bijoux", 2),
    description: "Un large choix de colliers et d’assortiments : demandez-nous les modèles disponibles." },

  // ── Flocage vêtements & accessoires ────────────────────────
  { slug: "sweat-je-suis-merveilleuse", rayon: "flocage", vedette: true, nom: "Sweat « Je suis merveilleuse »", photos: ph("flocage", 2, 6, 14, 15),
    description: "Sweat rose floqué « Je suis merveilleuse », avec un personnage au choix." },
  { slug: "sweat-je-suis-joyeuse", rayon: "flocage", nom: "Sweat « Je suis joyeuse »", photos: ph("flocage", 3),
    description: "Sweat gris floqué « Je suis joyeuse »." },
  { slug: "t-shirt-creature-merveilleuse", rayon: "flocage", nom: "T-shirt « Créature merveilleuse »", photos: ph("flocage", 4),
    description: "T-shirt blanc floqué « Je sais que je suis une créature merveilleuse »." },
  { slug: "sweat-jesus", rayon: "flocage", nom: "Sweat « Jésus »", photos: ph("flocage", 1),
    description: "Sweat gris floqué « Jésus, Seigneur de tout ». " },
  { slug: "sweat-jesus-noel", rayon: "flocage", nom: "Sweat de Noël « Jésus »", photos: ph("flocage", 9, 8),
    description: "Sweat de fêtes floqué « Jésus », en rouge ou en crème." },
  { slug: "sweat-meilleur-mari", rayon: "flocage", nom: "Sweat « Meilleur mari »", photos: ph("flocage", 7),
    description: "Sweat blanc floqué d’un cœur « Meilleur mari »." },
  { slug: "tablier-tout-est-bon-chez-moi", rayon: "flocage", nom: "Tablier « Tout est bon chez moi »", photos: ph("flocage", 5),
    description: "Tablier de cuisine floqué « Tout est bon chez moi »." },
  { slug: "mugs-personnalises", rayon: "flocage", nom: "Mugs personnalisés", photos: ph("flocage", 10, 11),
    description: "Mugs illustrés de messages qui encouragent, à offrir." },
  { slug: "peluches-personnalisees", rayon: "flocage", nom: "Peluches personnalisées", photos: ph("flocage", 12, 13),
    description: "Peluches floquées d’un message ou d’un prénom." },
  { slug: "sac-bonnes-fetes", rayon: "flocage", nom: "Sac « Bonnes fêtes »", photos: ph("flocage", 16),
    description: "Sac floqué « Bonnes fêtes », idéal pour vos cadeaux." },

  // ── Livres ────────────────────────────────────────────────
  { slug: "livre-je-suis-noire-et-j-aime-les-fleurs", rayon: "livres", vedette: true, nom: "« Je suis noir(e) et j’aime les fleurs »", photos: ph("livres", 2),
    description: "Un livre de Joëlle Tchankou." },
  { slug: "livre-bangangte", rayon: "livres", nom: "« Bangangté »", photos: ph("livres", 3),
    description: "Un livre de Joëlle Tchankou." },
  { slug: "livre-amour-veritable", rayon: "livres", nom: "« Amour véritable »", photos: ph("livres", 1),
    description: "Un livre disponible à la boutique solidaire." },
  { slug: "livres-jeunesse-illustres", rayon: "livres", nom: "Livres jeunesse illustrés", photos: ph("livres", 4, 5, 6, 7, 8),
    description: "Des histoires illustrées pour les enfants : aperçu de quelques pages." },

  // ── Puzzles ───────────────────────────────────────────────
  { slug: "puzzles-scenes-africaines", rayon: "puzzles", nom: "Puzzles illustrés « Scènes de vie »", photos: ph("puzzles", 2, 1, 3),
    description: "Puzzles illustrés de scènes de la vie en Afrique : le pilage, la fête au village… À assembler en famille." },

  // ── Ateliers & animations ─────────────────────────────────
  { slug: "animations-evenementielles", rayon: "animations", nom: "Animations événementielles", photos: ph("animations", 2, 1),
    description: "Animations musicales et créatives pour vos événements, écoles et fêtes. Dites-nous la date, le lieu et le nombre de participants." },

  // ── Ateliers dessin manuel & numérique ────────────────────
  { slug: "ateliers-dessin", rayon: "dessin", nom: "Ateliers dessin manuel et numérique", photos: ph("dessin", 1, 4, 2, 3),
    description: "Ateliers de dessin à la main et sur tablette, et activités créatives, pour enfants et adultes." },
  // ── Jouets d'éveil (photos du 13/11/2026) ─────────────────
  { slug: "kit-eveil-bebe-4-en-1", rayon: "jouets", vedette: true, nom: "Kit d’éveil bébé 4 en 1", photos: ph("jouets", 16, 21, 6),
    description: "Cube sensoriel à élastiques, anneaux à empiler, cubes souples et toupie à ventouse, en silicone : de quoi éveiller les tout-petits." },
  { slug: "coffret-montessori-4-en-1", rayon: "jouets", nom: "Coffret Montessori 4 en 1", photos: ph("jouets", 4, 1),
    description: "Boîte de permanence de l’objet, récolte des carottes, tirelire à jetons et jeu de frappe réunis dans un coffret en bois." },
  { slug: "boite-permanence-objet", rayon: "jouets", nom: "Boîte de permanence de l’objet", photos: ph("jouets", 13),
    description: "La balle disparaît… et réapparaît dans le tiroir : un grand classique Montessori, en bois." },
  { slug: "boite-a-formes-tiroirs", rayon: "jouets", nom: "Boîte à formes à tiroirs", photos: ph("jouets", 11),
    description: "Glisser chaque forme dans le bon trou, puis la retrouver dans son tiroir. En bois." },
  { slug: "recolte-carottes-tri-formes", rayon: "jouets", nom: "Récolte des carottes et tri des formes", photos: ph("jouets", 17),
    description: "Planter et récolter les carottes, trier les formes et les couleurs : un jouet en bois à plusieurs activités." },
  { slug: "cylindres-a-boutons", rayon: "jouets", nom: "Cylindres à boutons", photos: ph("jouets", 3),
    description: "Quatre blocs de cylindres à encastrer, du plus grand au plus petit, pour affiner la perception des tailles." },
  { slug: "planche-chiffres-formes", rayon: "jouets", nom: "Planche des chiffres et des formes", photos: ph("jouets", 2),
    description: "Chiffres de 1 à 10, anneaux à compter et formes à encastrer : pour apprendre à compter en manipulant." },
  { slug: "jeu-enfilage-formes-couleurs", rayon: "jouets", nom: "Jeu d’enfilage formes et couleurs", photos: ph("jouets", 18, 5),
    description: "Enfiler les perles en bois selon les modèles des cartes : formes, couleurs et concentration." },
  { slug: "tour-de-tri-geometrique", rayon: "jouets", nom: "Tour de tri géométrique", photos: ph("jouets", 22),
    description: "Empiler les formes en bois sur les bons picots, du cercle au pentagone." },
  { slug: "puzzles-a-encastrer", rayon: "jouets", nom: "Puzzles à encastrer en bois", photos: ph("jouets", 9, 15, 8),
    description: "Puzzles à boutons : lettres, chiffres, animaux, véhicules, formes… Plusieurs modèles disponibles." },
  { slug: "puzzles-bois-3d", rayon: "jouets", nom: "Puzzles en bois à thème", photos: ph("jouets", 10, 12),
    description: "Fruits à découper, véhicules, animaux marins, formes géométriques : des puzzles épais et colorés." },
  { slug: "jeu-tri-couleurs", rayon: "jouets", nom: "Jeu de tri des couleurs", photos: ph("jouets", 23, 7),
    description: "Ranger chaque balle dans le gobelet de sa couleur, avec la cuillère : pour reconnaître les couleurs et exercer la main." },
  { slug: "jeu-peche-abeilles", rayon: "jouets", nom: "Jeu de pêche aux abeilles", photos: ph("jouets", 14),
    description: "Attraper les abeilles avec la pince ou la canne, puis les trier par couleur." },
  { slug: "perles-et-pinces", rayon: "jouets", nom: "Perles et pinces", photos: ph("jouets", 19),
    description: "Reproduire les modèles en déplaçant les perles avec les pinces : motricité fine, couleurs et patience." },
  { slug: "cube-activites", rayon: "jouets", nom: "Cube d’activités", photos: ph("jouets", 20),
    description: "Un cube à tourner, tirer, appuyer et découvrir, à emporter partout." },
  { slug: "tableau-activites-lumineux", rayon: "jouets", nom: "Tableau d’activités lumineux", photos: ph("jouets", 24),
    description: "Interrupteurs, boutons lumineux et sons sur une planche en bois : les enfants adorent appuyer sur tout !" },
];
