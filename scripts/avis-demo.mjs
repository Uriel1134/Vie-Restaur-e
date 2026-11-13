// Avis FICTIFS pour visualiser la section « Vos avis » pendant la conception.
// ⚠ À SUPPRIMER AVANT LA MISE EN LIGNE : publier de faux avis est une pratique commerciale trompeuse
//   (Code de la consommation, art. L121-4) et nuirait à la confiance dans l'association.
//
// Ajouter   : ADMIN_EMAIL=… ADMIN_PASSWORD='…' node --env-file=.env.local scripts/avis-demo.mjs
// Supprimer : ADMIN_EMAIL=… ADMIN_PASSWORD='…' node --env-file=.env.local scripts/avis-demo.mjs --supprimer
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

const jours = (n) => new Date(Date.now() - n * 864e5).toISOString();

const avis = [
  {
    nom: "Clarisse",
    lieu: "Orléans",
    note: 5,
    message:
      "J’ai offert une parure dorée à ma sœur pour son anniversaire : elle l’adore. Commande simple sur WhatsApp, réponse rapide et très chaleureuse.",
    created_at: jours(3),
  },
  {
    nom: "Moussa",
    lieu: "Montargis",
    note: 5,
    message:
      "Le tableau d’activités lumineux a conquis mon fils de deux ans. Et savoir que l’achat soutient des familles, ça donne encore plus de sens au cadeau.",
    created_at: jours(9),
  },
  {
    nom: "Sandrine",
    lieu: "Amilly",
    note: 4,
    message:
      "Atelier dessin très réussi avec ma fille : une animatrice patiente et bienveillante. Seul regret, c’est passé trop vite !",
    created_at: jours(16),
  },
  {
    nom: "Aïcha",
    lieu: "Douala",
    note: 5,
    message:
      "Merci pour votre écoute à un moment où je me sentais très seule avec mes enfants. On m’a aidée sans jamais me juger.",
    created_at: jours(24),
  },
  {
    nom: "Thomas",
    lieu: null,
    note: 5,
    message:
      "Sweat « Meilleur mari » reçu pour la fête des pères : impression soignée, tissu agréable. Je recommande la boutique solidaire.",
    created_at: jours(31),
  },
];

// Suppression ciblée : uniquement ces avis-là (même prénom + même message).
async function supprimer() {
  for (const a of avis) {
    const { error } = await supabase.from("avis").delete().eq("nom", a.nom).eq("message", a.message);
    if (error) console.error(a.nom, error.message);
  }
  console.log("Avis fictifs supprimés.");
}

await supprimer();
if (process.argv.includes("--supprimer")) process.exit(0);

// Même pour l'admin, un avis entre « en attente » (règle de la base), puis il est publié : comme une vraie modération.
const { data: crees, error } = await supabase.from("avis").insert(avis.map((a) => ({ ...a, publie: false }))).select("id");
if (!error) {
  const { error: e2 } = await supabase.from("avis").update({ publie: true }).in("id", crees.map((c) => c.id));
  if (e2) console.error("Publication impossible :", e2.message);
}
if (error) {
  console.error("Ajout impossible :", error.message);
  process.exit(1);
}
console.log(`${avis.length} avis fictifs ajoutés et publiés (moyenne ${(avis.reduce((s, a) => s + a.note, 0) / avis.length).toFixed(1)}/5).`);
