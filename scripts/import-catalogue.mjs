// Importe le catalogue (scripts/catalogue.mjs) dans Supabase :
// photos optimisées (WebP, 1400 px max) → Storage « medias/catalogue/… », produits → table produits.
// Relançable sans doublon : les produits sont mis à jour par leur slug, les photos écrasées.
//
// Prérequis : migration supabase/migrations/0003_catalogue.sql exécutée.
// Usage : ADMIN_EMAIL=… ADMIN_PASSWORD='…' node --env-file=.env.local scripts/import-catalogue.mjs [--sans-demo] [--rayon=jouets]
//   --sans-demo : supprime aussi les produits de démonstration (slug « demo-… »).
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import { catalogue as complet } from "./catalogue.mjs";

// --rayon=jouets : n'importe que ce rayon (les autres produits ne sont pas touchés).
const filtre = process.argv.find((a) => a.startsWith("--rayon="))?.split("=")[1];
const catalogue = filtre ? complet.filter((p) => p.rayon === filtre) : complet;

const SOURCE = path.resolve("Catalogue_Vie-restauree");
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

if (process.argv.includes("--sans-demo")) {
  const { error } = await supabase.from("produits").delete().like("slug", "demo-%");
  console.log(error ? `Démo : ${error.message}` : "Produits de démonstration supprimés.");
}

let ordreParRayon = {};
let nbPhotos = 0;

for (const p of catalogue) {
  const urls = [];
  for (const [i, fichier] of p.photos.entries()) {
    const brut = await readFile(path.join(SOURCE, fichier));
    const webp = await sharp(brut)
      .rotate()
      .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    const cible = `catalogue/${p.slug}-${i + 1}.webp`;
    const { error } = await supabase.storage
      .from("medias")
      .upload(cible, webp, { contentType: "image/webp", upsert: false, cacheControl: "31536000" });
    // Photo déjà importée lors d'un précédent passage : on la réutilise.
    if (error && !/exists|Duplicate/i.test(error.message)) throw new Error(`${fichier} : ${error.message}`);
    urls.push(supabase.storage.from("medias").getPublicUrl(cible).data.publicUrl);
    nbPhotos++;
  }

  ordreParRayon[p.rayon] = (ordreParRayon[p.rayon] ?? 0) + 1;
  const ligne = {
    slug: p.slug,
    nom: p.nom,
    rayon: p.rayon,
    description: p.description.trim(),
    prix: p.prix ?? null,
    stock: null,
    variantes: [],
    photos: urls,
    ordre: ordreParRayon[p.rayon] * 10,
    en_ligne: true,
    en_vedette: Boolean(p.vedette),
  };
  const { error } = await supabase.from("produits").upsert(ligne, { onConflict: "slug" });
  if (error) throw new Error(`${p.slug} : ${error.message}`);
  console.log(`✓ ${p.nom} (${urls.length} photo${urls.length > 1 ? "s" : ""})`);
}

console.log(`\nImport terminé : ${catalogue.length} produits, ${nbPhotos} photos.`);
