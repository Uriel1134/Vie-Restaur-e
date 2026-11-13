import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Sceau } from "@/components/ui/decor";
import { NOM_CATEGORIE } from "@/lib/admin/constantes";
import type { Actualite } from "@/lib/types";

const partie = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", ...opts }).format(new Date(iso));

/** Couleur de pastille par catégorie (tons de la charte). */
export const TON_CATEGORIE: Record<string, string> = {
  terrain: "bg-ruban text-bleu-nuit",
  temoignage: "bg-bleu-vie text-white",
  evenement: "bg-bleu-nuit text-white",
  communique: "bg-white text-bleu-nuit ring-1 ring-bleu-vie/40",
  boutique: "bg-bleu-profond text-white",
};

/** Visuel de l'article, ou une « page » illustrée du sceau quand il n'y a pas d'image. */
export function VisuelArticle({ actu, sizes, priority = false }: { actu: Actualite; sizes: string; priority?: boolean }) {
  return actu.image ? (
    <Image
      src={actu.image}
      alt=""
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      unoptimized
    />
  ) : (
    <div className="absolute inset-0 overflow-hidden bg-lavande">
      <Sceau plein className="absolute -right-10 -bottom-12 size-64 text-white transition-transform duration-700 group-hover:rotate-12" />
      <span className="absolute top-6 left-6 font-serif text-[5rem] leading-none text-bleu-vie/25 italic">
        {(NOM_CATEGORIE[actu.categorie] ?? "V").charAt(0)}
      </span>
    </div>
  );
}

/** Onglet de date façon intercalaire de carnet. */
export function OngletDate({ iso }: { iso: string }) {
  return (
    <span className="absolute top-0 right-5 z-10 flex flex-col items-center rounded-b-xl bg-white px-3 pt-2 pb-2.5 text-center shadow-douce">
      <span className="font-serif text-2xl leading-none font-semibold text-bleu-nuit">{partie(iso, { day: "numeric" })}</span>
      <span className="mt-0.5 text-[11px] font-semibold tracking-[0.15em] text-bleu-vie uppercase">
        {partie(iso, { month: "short" }).replace(".", "")}
      </span>
    </span>
  );
}

export function CarteArticle({ actu }: { actu: Actualite }) {
  return (
    <article className="group relative flex h-full flex-col">
      <Link href={`/actualites/${actu.slug}`} className="flex h-full flex-col" aria-label={actu.titre}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-carte shadow-douce transition-shadow duration-500 group-hover:shadow-papier">
          <VisuelArticle actu={actu} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" />
          <OngletDate iso={actu.date} />
          <span className={`absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs font-semibold ${TON_CATEGORIE[actu.categorie]}`}>
            {NOM_CATEGORIE[actu.categorie]}
          </span>
        </div>
        <h3 className="mt-5 text-[1.4rem] leading-snug transition-colors group-hover:text-bleu-profond">{actu.titre}</h3>
        {actu.extrait && <p className="mt-2 line-clamp-3 leading-relaxed text-texte/80">{actu.extrait}</p>}
        <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[15px] font-semibold text-bleu-profond">
          Lire l’article
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </article>
  );
}
