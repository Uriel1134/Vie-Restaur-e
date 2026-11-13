import type { Metadata } from "next";
import Link from "next/link";
import { Carte, Pastille } from "@/components/admin/ui";
import { Etiquette } from "@/components/ui/decor";
import { exigerAdmin } from "@/lib/admin/auth";
import { NOM_STATUT, tonStatut } from "@/lib/admin/constantes";
import { dateCourte, euros } from "@/lib/format";
import type { Commande, Produit } from "@/lib/types";

export const metadata: Metadata = { title: "Tableau de bord" };

export default async function TableauDeBord() {
  const { supabase, nom } = await exigerAdmin();

  const [aPreparer, recentes, produits, avisAttente] = await Promise.all([
    supabase.from("commandes").select("id", { count: "exact", head: true }).eq("statut", "payee"),
    supabase.from("commandes").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("produits").select("id, nom, stock, variantes, en_ligne"),
    supabase.from("avis").select("id", { count: "exact", head: true }).eq("publie", false),
  ]);

  const commandes = (recentes.data ?? []) as Commande[];
  const listeProduits = (produits.data ?? []) as Pick<Produit, "id" | "nom" | "stock" | "variantes" | "en_ligne">[];
  const ruptures = listeProduits.filter(
    (p) => p.en_ligne && (p.variantes.length ? p.variantes.some((v) => v.stock === 0) : p.stock === 0),
  );
  const prenom = nom.split(/[\s@]/)[0];

  const chiffres = [
    { valeur: aPreparer.count ?? 0, label: "commandes à préparer", href: "/admin/commandes?statut=payee" },
    { valeur: listeProduits.filter((p) => p.en_ligne).length, label: "produits en ligne", href: "/admin/produits" },
    { valeur: ruptures.length, label: "articles en rupture", href: "/admin/produits" },
    { valeur: avisAttente.count ?? 0, label: "avis à relire", href: "/admin/avis" },
  ];

  return (
    <>
      <Etiquette>Tableau de bord</Etiquette>
      <h1 className="mt-3 text-[2.2rem] sm:text-[2.8rem]">
        Bonjour {prenom}, <span className="italic">voici où en est le site.</span>
      </h1>

      <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {chiffres.map((c) => (
          <li key={c.label}>
            <Link href={c.href} className="block h-full rounded-carte bg-white p-5 shadow-douce transition-shadow hover:shadow-papier">
              <p className="font-serif text-[2.6rem] leading-none font-semibold text-bleu-nuit">{c.valeur}</p>
              <p className="mt-2 text-[15px] text-texte/70">{c.label}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Carte>
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Dernières commandes</h2>
            <Link href="/admin/commandes" className="text-[15px] font-medium text-bleu-profond hover:underline">
              Tout voir
            </Link>
          </div>
          {commandes.length === 0 ? (
            <p className="mt-4 text-texte/60">Aucune commande pour l’instant.</p>
          ) : (
            <ul className="mt-4 divide-y divide-bleu-vie/10">
              {commandes.map((c) => (
                <li key={c.id}>
                  <Link href={`/admin/commandes/${c.id}`} className="flex items-center justify-between gap-3 py-3 hover:text-bleu-profond">
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-bleu-nuit">{c.client_nom}</span>
                      <span className="text-sm text-texte/60">
                        {c.numero} · {dateCourte(c.created_at)} · {euros(Number(c.total))}
                      </span>
                    </span>
                    <Pastille ton={tonStatut(c.statut)}>{NOM_STATUT[c.statut]}</Pastille>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Carte>

        <Carte>
          <h2 className="text-xl">Raccourcis</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            {[
              ["/admin/produits/nouveau", "Ajouter un produit"],
              ["/admin/actualites/nouveau", "Écrire une actualité"],
              ["/admin/agenda/nouveau", "Programmer un événement"],
              ["/admin/temoignages/nouveau", "Ajouter un témoignage"],
              ["/admin/commandes/nouveau", "Saisir une commande WhatsApp"],
              ["/admin/parametres", "Modifier les coordonnées"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="font-medium text-bleu-profond hover:underline">
                  → {label}
                </Link>
              </li>
            ))}
          </ul>
          {ruptures.length > 0 && (
            <div className="mt-6 rounded-xl bg-ruban/20 p-4 text-[15px]">
              <p className="font-semibold text-bleu-nuit">À réapprovisionner</p>
              <p className="mt-1">{ruptures.map((p) => p.nom).join(", ")}</p>
            </div>
          )}
        </Carte>
      </div>
    </>
  );
}
