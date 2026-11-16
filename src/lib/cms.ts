import { createClient } from "@supabase/supabase-js";
import { supabaseEnv } from "@/lib/supabase/env";
import type { Actualite, Avis, Evenement, Produit, Temoignage } from "@/lib/types";

/**
 * Lectures publiques des contenus gérés dans le dashboard.
 * Clé publique + règles RLS : seuls les contenus publiés sont lisibles.
 * Sans Supabase configuré, les pages affichent leurs états d'attente.
 */
function client() {
  const env = supabaseEnv();
  return env ? createClient(env.url, env.key, { auth: { persistSession: false } }) : null;
}

export async function getActualites(limit = 20): Promise<Actualite[]> {
  const c = client();
  if (!c) return [];
  const { data } = await c
    .from("actualites")
    .select("*")
    .eq("publie", true)
    .order("date", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getEvenementsAVenir(): Promise<Evenement[]> {
  const c = client();
  if (!c) return [];
  const hier = new Date(Date.now() - 864e5).toISOString();
  const { data } = await c.from("evenements").select("*").gte("date", hier).order("date").limit(10);
  return data ?? [];
}

export async function getTemoignages(limit = 3): Promise<Temoignage[]> {
  const c = client();
  if (!c) return [];
  const { data } = await c
    .from("temoignages")
    .select("*")
    .eq("publie", true)
    .order("ordre")
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getProduitsVedette(limit = 4): Promise<Produit[]> {
  const c = client();
  if (!c) return [];
  const { data } = await c
    .from("produits")
    .select("*")
    .eq("en_ligne", true)
    .eq("en_vedette", true)
    .order("updated_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getProduits(): Promise<Produit[]> {
  const c = client();
  if (!c) return [];
  const { data } = await c.from("produits").select("*").eq("en_ligne", true).order("ordre").order("nom");
  return data ?? [];
}

export async function getProduit(slug: string): Promise<Produit | null> {
  const c = client();
  if (!c) return null;
  const { data } = await c.from("produits").select("*").eq("slug", slug).eq("en_ligne", true).maybeSingle();
  return data;
}

export async function getProduitsDuRayon(rayon: string, sauf: string, limit = 4): Promise<Produit[]> {
  const c = client();
  if (!c) return [];
  const { data } = await c
    .from("produits")
    .select("*")
    .eq("en_ligne", true)
    .eq("rayon", rayon)
    .neq("id", sauf)
    .order("ordre")
    .limit(limit);
  return data ?? [];
}

export async function getActualite(slug: string): Promise<Actualite | null> {
  const c = client();
  if (!c) return null;
  const { data } = await c.from("actualites").select("*").eq("slug", slug).eq("publie", true).maybeSingle();
  return data;
}

export async function getProduitsParSlugs(slugs: string[]): Promise<Produit[]> {
  const c = client();
  if (!c || slugs.length === 0) return [];
  const { data } = await c.from("produits").select("*").eq("en_ligne", true).in("slug", slugs);
  return data ?? [];
}

/** Avis publiés (modérés) + moyenne et répartition des notes (index 0 = 1 étoile … 4 = 5 étoiles). */
export async function getAvis(
  limit = 8,
): Promise<{ avis: Avis[]; total: number; moyenne: number | null; repartition: number[] }> {
  const vide = { avis: [], total: 0, moyenne: null, repartition: [0, 0, 0, 0, 0] };
  const c = client();
  if (!c) return vide;
  const [liste, notes] = await Promise.all([
    c.from("avis").select("*").eq("publie", true).order("created_at", { ascending: false }).limit(limit),
    c.from("avis").select("note").eq("publie", true),
  ]);
  const n = (notes.data ?? []).map((x) => Number(x.note));
  const repartition = [1, 2, 3, 4, 5].map((k) => n.filter((x) => x === k).length);
  return {
    avis: liste.data ?? [],
    total: n.length,
    moyenne: n.length ? n.reduce((s, x) => s + x, 0) / n.length : null,
    repartition,
  };
}

export type BonCommande = {
  numero: string;
  prenom: string;
  date: string;
  statut: string;
  livraison: "retrait" | "relais";
  total: number;
  notes: string | null;
  lignes: {
    slug?: string;
    libelle: string;
    variante?: string | null;
    quantite: number;
    prix_unitaire: number;
    prix_sur_demande?: boolean;
    photo?: string | null;
  }[];
};

/** Bon de commande par son lien secret (fonction sécurisée : ni téléphone ni e-mail). */
export async function getBonCommande(jeton: string): Promise<BonCommande | null> {
  const c = client();
  if (!c || !/^[0-9a-f-]{36}$/i.test(jeton)) return null;
  const { data } = await c.rpc("voir_commande", { p_jeton: jeton });
  return (data as BonCommande | null) ?? null;
}

/** Derniers événements passés (le plus récent d'abord). */
export async function getEvenementsPasses(limit = 6): Promise<Evenement[]> {
  const c = client();
  if (!c) return [];
  const hier = new Date(Date.now() - 864e5).toISOString();
  const { data } = await c.from("evenements").select("*").lt("date", hier).order("date", { ascending: false }).limit(limit);
  return data ?? [];
}
