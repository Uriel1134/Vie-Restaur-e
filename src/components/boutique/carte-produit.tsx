import Image from "next/image";
import Link from "next/link";
import { Sceau } from "@/components/ui/decor";
import { whatsappLink } from "@/config/site";
import { enRupture, estPrestation, messageRetour, prixAffiche, variantesDispo, variantesPanier } from "@/lib/produits";
import { AjouterPanierCarte } from "./ajouter-panier";
import type { Produit } from "@/lib/types";

/**
 * Carte produit de la boutique. La commande et les renseignements passent par WhatsApp
 * (message pré-rempli) ; la photo et le nom mènent à la fiche détaillée.
 */
export function CarteProduit({ produit: p }: { produit: Produit }) {
  const rupture = enRupture(p);
  const dispo = variantesDispo(p);
  const fiche = `/boutique/${p.slug}`;

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={fiche}
        className="relative block aspect-[4/5] overflow-hidden rounded-carte bg-lavande transition-shadow duration-500 group-hover:shadow-papier"
        aria-label={`${p.nom} — voir la fiche`}
      >
        {p.photos[0] ? (
          <Image
            src={p.photos[0]}
            alt=""
            fill
            sizes="(min-width: 1024px) 270px, 50vw"
            className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${rupture ? "opacity-60 grayscale" : ""}`}
            unoptimized
          />
        ) : (
          <Sceau plein className="absolute inset-[22%] text-white" />
        )}
        {p.photos.length > 1 && (
          <span className="absolute right-3 bottom-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-bleu-nuit">
            {p.photos.length} photos
          </span>
        )}
        {rupture && (
          <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-bleu-nuit">
            Victime de son succès
          </span>
        )}
      </Link>
      <h3 className="mt-4 text-[1.2rem] leading-snug">
        <Link href={fiche} className="hover:text-bleu-profond">
          {p.nom}
        </Link>
      </h3>
      <p className="mt-1 font-semibold text-bleu-nuit">{prixAffiche(p)}</p>
      {p.description && <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-texte/80">{p.description}</p>}
      {dispo.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Disponible en">
          {dispo.map((v) => (
            <li key={v} className="rounded-full border border-bleu-vie/30 px-2.5 py-0.5 text-xs text-bleu-profond">
              {v}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4">
        {rupture ? (
          <a
            href={whatsappLink(messageRetour(p))}
            target="_blank"
            rel="noopener"
            className="text-[15px] font-semibold text-bleu-profond hover:underline"
          >
            Être prévenu·e du retour
          </a>
        ) : (
          <AjouterPanierCarte
            slug={p.slug}
            nom={p.nom}
            photo={p.photos[0] ?? null}
            rayon={p.rayon}
            prix={p.prix}
            variantes={variantesPanier(p)}
            libelle={estPrestation(p) ? "Réserver" : "Ajouter"}
          />
        )}
        <Link href={fiche} className="text-[15px] font-medium text-bleu-profond underline-offset-4 hover:underline">
          Détails
        </Link>
      </div>
    </article>
  );
}
