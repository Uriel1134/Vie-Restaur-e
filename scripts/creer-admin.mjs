// Crée (ou met à jour) un compte administrateur du dashboard.
// Usage : node --env-file=.env.local scripts/creer-admin.mjs <email> "<Nom affiché>"
// Nécessite SUPABASE_SERVICE_ROLE_KEY dans .env.local (usage local uniquement).
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const [email, nom = "Administratrice"] = process.argv.slice(2);
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const cle = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!email || !url || !cle) {
  console.error("Usage : node --env-file=.env.local scripts/creer-admin.mjs <email> \"<Nom>\"");
  process.exit(1);
}

const supabase = createClient(url, cle, { auth: { persistSession: false, autoRefreshToken: false } });

// Mot de passe provisoire robuste (à changer à la première connexion, page « Mon compte »).
const motDePasse = randomBytes(12).toString("base64url");

let userId;
const { data: cree, error } = await supabase.auth.admin.createUser({
  email,
  password: motDePasse,
  email_confirm: true,
});

if (error) {
  // Le compte existe déjà : on le retrouve et on réinitialise son mot de passe.
  const { data: liste, error: e2 } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  if (e2) throw e2;
  const existant = liste.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (!existant) throw error;
  userId = existant.id;
  const { error: e3 } = await supabase.auth.admin.updateUserById(userId, { password: motDePasse });
  if (e3) throw e3;
  console.log("Compte existant : mot de passe réinitialisé.");
} else {
  userId = cree.user.id;
  console.log("Compte créé.");
}

const { error: e4 } = await supabase.from("admins").upsert({ user_id: userId, nom });
if (e4) throw e4;

console.log(`Accès dashboard accordé à ${email} (${nom}).`);
console.log(`Mot de passe provisoire : ${motDePasse}`);
