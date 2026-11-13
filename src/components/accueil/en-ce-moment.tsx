import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Etiquette, Scotch } from "@/components/ui/decor";
import { NOM_CATEGORIE } from "@/lib/admin/constantes";
import { dateLongue } from "@/lib/format";
import type { Actualite, Evenement } from "@/lib/types";
import { BilletEvenement } from "@/components/billet-evenement";

function DerniereNouvelle({ actu }: { actu: Actualite }) {
  return (
    <article className="apparait relative rotate-[0.8deg]">
      <Scotch className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
      <div className="flex h-full flex-col bg-white p-6 shadow-papier sm:p-8">
        <p className="font-serif text-bleu-vie italic">
          {NOM_CATEGORIE[actu.categorie]} · {dateLongue(actu.date)}
        </p>
        <h3 className="mt-2 text-[1.5rem] leading-snug">{actu.titre}</h3>
        {actu.extrait && <p className="mt-3 line-clamp-4 leading-relaxed">{actu.extrait}</p>}
        <Link href={`/actualites/${actu.slug}`} className="group mt-auto inline-flex items-center gap-2 pt-5 font-semibold text-bleu-profond">
          Lire l’article
          <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

/** « En ce moment » : la preuve que l'association est vivante. Masquée s'il n'y a rien à montrer. */
export function SectionEnCeMoment({ evenement, actualite }: { evenement?: Evenement; actualite?: Actualite }) {
  if (!evenement && !actualite) return null;

  return (
    <section className="bg-lavande py-16 sm:py-24 lg:py-28" aria-labelledby="titre-en-ce-moment">
      <div className="conteneur">
        <Etiquette>En ce moment</Etiquette>
        <h2 id="titre-en-ce-moment" className="mt-4 max-w-2xl text-[2rem] sm:text-[2.6rem]">
          Des nouvelles fraîches de l’association.
        </h2>
        <div className={`mt-14 grid gap-10 ${evenement && actualite ? "lg:grid-cols-[1.2fr_1fr]" : "max-w-3xl"}`}>
          {evenement && <BilletEvenement ev={evenement} lienAgenda />}
          {actualite && <DerniereNouvelle actu={actualite} />}
        </div>
      </div>
    </section>
  );
}
