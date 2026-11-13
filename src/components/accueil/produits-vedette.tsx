import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Etiquette, EtiquetteSuspendue, Sceau } from "@/components/ui/decor";
import { rayons } from "@/data/association";
import { NOM_RAYON, prixAffiche } from "@/lib/produits";
import { MurPolaroids } from "./mur-polaroids";
import type { Produit } from "@/lib/types";


/**
 * Boutique sur l'accueil : de vrais produits (cochés « Mettre en avant » dans le dashboard),
 * sinon les rayons en étiquettes.
 */
export function SectionBoutique({ produits, mur = [] }: { produits: Produit[]; mur?: Produit[] }) {
  return (
    <section className="py-16 sm:py-24 lg:py-32" aria-labelledby="titre-boutique">
      <div className="conteneur">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <Etiquette>La boutique solidaire</Etiquette>
            <h2 id="titre-boutique" className="mt-4 text-[2rem] sm:text-[2.6rem]">
              Acheter ici, c’est déjà <span className="italic">agir</span>.
            </h2>
          </div>
          <p className="max-w-sm text-bleu-profond lg:text-right">
            Chaque création est choisie avec soin, et chaque achat soutient directement les familles.
          </p>
        </div>

        {mur.length >= 6 ? (
          <MurPolaroids produits={mur} />
        ) : produits.length > 0 ? (
          <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {produits.map((p, i) => (
              <li key={p.id} style={{ "--i": i } as CSSProperties} className="apparait">
                <Link href={`/boutique/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-carte bg-lavande transition-shadow duration-500 group-hover:shadow-papier">
                    {p.photos[0] ? (
                      <Image
                        src={p.photos[0]}
                        alt={p.nom}
                        fill
                        sizes="(min-width: 1024px) 270px, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        unoptimized
                      />
                    ) : (
                      <Sceau plein className="absolute inset-[22%] text-white" />
                    )}
                  </div>
                  <p className="mt-4 text-sm text-bleu-vie">{NOM_RAYON[p.rayon]}</p>
                  <h3 className="mt-1 text-[1.2rem] leading-snug group-hover:text-bleu-profond">{p.nom}</h3>
                  <p className="mt-1 font-semibold text-bleu-nuit">{prixAffiche(p)}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
            {rayons.map((r) => (
              <li key={r.id}>
                <Link href={`/boutique#${r.id}`} className="apparait block rounded-sm" aria-label={`${r.titre} — voir dans la boutique`}>
                  <EtiquetteSuspendue titre={r.titre} texte={r.court} rotation={r.rotation} />
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-14 flex flex-col gap-6 border-t border-bleu-vie/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-bleu-profond">
            <li>Retrait sur place ou en point relais</li>
            <li>Retour ou échange sous 20 jours</li>
            <li>Commande simple par WhatsApp</li>
          </ul>
          <ButtonLink href="/boutique" variant="secondaire" className="self-start sm:self-auto">
            Entrer dans la boutique
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
