import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bandeau, BoutonLien, EnTeteAdmin, MESSAGES_OK, Pastille, Vide } from "@/components/admin/ui";
import { rayons } from "@/data/association";
import { exigerAdmin } from "@/lib/admin/auth";
import { prixAffiche, stockTotal } from "@/lib/produits";
import type { Produit } from "@/lib/types";

export const metadata: Metadata = { title: "Produits" };

const NOM_RAYON = Object.fromEntries(rayons.map((r) => [r.id, r.titre]));


export default async function Produits({ searchParams }: PageProps<"/admin/produits">) {
  const { supabase } = await exigerAdmin();
  const { ok } = await searchParams;
  const { data } = await supabase.from("produits").select("*").order("rayon").order("ordre").order("nom");
  const produits = (data ?? []) as Produit[];

  return (
    <>
      <EnTeteAdmin
        titre="Produits"
        intro="Les articles et prestations de la boutique solidaire."
        action={<BoutonLien href="/admin/produits/nouveau">+ Nouveau produit</BoutonLien>}
      />
      <Bandeau message={typeof ok === "string" ? MESSAGES_OK[ok] : undefined} />

      {produits.length === 0 ? (
        <Vide action={<BoutonLien href="/admin/produits/nouveau">Ajouter le premier produit</BoutonLien>}>
          Votre boutique est vide pour l’instant. Ajoutez vos articles un par un : photos, prix, tailles et stock.
        </Vide>
      ) : (
        <ul className="divide-y divide-bleu-vie/10 overflow-hidden rounded-carte bg-white shadow-douce">
          {produits.map((p) => {
            const stock = stockTotal(p);
            return (
              <li key={p.id}>
                <Link href={`/admin/produits/${p.id}`} className="flex items-center gap-4 p-4 transition-colors hover:bg-lavande/50 sm:px-6">
                  <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-lavande">
                    {p.photos[0] && (
                      <Image src={p.photos[0]} alt="" width={64} height={64} className="size-full object-cover" unoptimized />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-bleu-nuit">{p.nom}</p>
                    <p className="text-sm text-texte/60">{NOM_RAYON[p.rayon] ?? p.rayon}</p>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className="font-semibold text-bleu-nuit">{prixAffiche(p)}</p>
                    <p className={`text-sm ${stock === 0 ? "text-red-700" : "text-texte/60"}`}>
                      {stock === null ? "Stock non suivi" : stock === 0 ? "Rupture de stock" : `${stock} en stock`}
                    </p>
                  </div>
                  <Pastille ton={p.en_ligne ? "ok" : "neutre"}>{p.en_ligne ? "En ligne" : "Masqué"}</Pastille>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
