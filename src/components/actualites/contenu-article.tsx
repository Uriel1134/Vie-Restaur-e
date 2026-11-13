import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { Sceau } from "@/components/ui/decor";
import { whatsappLink } from "@/config/site";
import type { Bloc } from "@/lib/article";
import { NOM_RAYON, enRupture, estPrestation, messageCommande, messageRetour, prixAffiche } from "@/lib/produits";
import type { Produit } from "@/lib/types";

/** Fiche produit insérée dans un article : on lit, on voit, on commande sans quitter la page. */
function FicheInseree({ p }: { p: Produit }) {
  const rupture = enRupture(p);
  return (
    <article className="group flex h-full overflow-hidden rounded-carte sm:flex-col bg-white shadow-douce ring-1 ring-bleu-vie/10 transition-shadow hover:shadow-papier">
      <Link href={`/boutique/${p.slug}`} className="relative block w-28 shrink-0 overflow-hidden bg-lavande sm:aspect-[4/3] sm:w-auto">
        {p.photos[0] ? (
          <Image
            src={p.photos[0]}
            alt={p.nom}
            fill
            sizes="(min-width: 768px) 340px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            unoptimized
          />
        ) : (
          <Sceau plein className="absolute inset-[25%] text-white" />
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs font-semibold tracking-[0.12em] text-bleu-vie uppercase">{NOM_RAYON[p.rayon]}</p>
        <h3 className="mt-1.5 font-serif text-[1.2rem] leading-snug font-semibold text-bleu-nuit">
          <Link href={`/boutique/${p.slug}`} className="hover:text-bleu-profond">
            {p.nom}
          </Link>
        </h3>
        <p className="mt-1 text-[15px] text-bleu-profond">{prixAffiche(p)}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 text-[15px] font-semibold">
          <a
            href={whatsappLink(rupture ? messageRetour(p) : messageCommande(p))}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-bleu-profond hover:underline"
          >
            <WhatsAppIcon className="size-4" />
            {rupture ? "Être prévenu·e" : estPrestation(p) ? "Réserver" : "Commander"}
          </a>
          <Link href={`/boutique/${p.slug}`} className="text-texte/70 hover:text-bleu-nuit">
            Voir la fiche
          </Link>
        </div>
      </div>
    </article>
  );
}

const LETTRINE =
  "flow-root first-letter:float-left first-letter:mt-1.5 first-letter:mr-3 first-letter:font-serif first-letter:text-[4.4rem] first-letter:leading-[0.8] first-letter:font-semibold first-letter:text-bleu-vie";

export function ContenuArticle({ blocs, produits }: { blocs: Bloc[]; produits: Map<string, Produit> }) {
  const iPremier = blocs.findIndex((b) => b.type === "paragraphe");

  return (
    <div className="text-[1.125rem] leading-[1.85] text-texte">
      {blocs.map((b, i) => {
        switch (b.type) {
          case "intertitre":
            return (
              <h2 key={i} className="mt-14 mb-5 flex items-center gap-3 text-[1.65rem] leading-snug sm:text-[1.9rem]">
                <Sceau plein className="size-4 shrink-0 text-ruban" />
                {b.texte}
              </h2>
            );
          case "citation":
            return (
              <blockquote key={i} className="relative my-12 py-2 pl-8 sm:-mx-10 sm:pl-12">
                <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 rounded-full bg-ruban" />
                <span aria-hidden className="absolute -top-7 left-6 font-serif text-[5rem] leading-none text-bleu-vie/20 sm:left-10">
                  “
                </span>
                <p className="font-serif text-[1.6rem] leading-[1.4] font-semibold text-bleu-nuit italic sm:text-[1.9rem]">{b.texte}</p>
              </blockquote>
            );
          case "produits": {
            const liste = b.slugs.map((s) => produits.get(s)).filter((p): p is Produit => Boolean(p));
            if (liste.length === 0) return null;
            return (
              <aside key={i} aria-label="À retrouver à la boutique" className="my-12 rounded-carte bg-lavande p-5 sm:-mx-10 sm:p-8">
                <p className="mb-5 flex items-center gap-3 font-serif text-bleu-vie italic">
                  <span aria-hidden className="h-px w-8 bg-bleu-vie/50" />À retrouver à la boutique solidaire
                </p>
                <div className={`grid gap-5 ${liste.length === 1 ? "sm:max-w-sm" : liste.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
                  {liste.map((p) => (
                    <FicheInseree key={p.id} p={p} />
                  ))}
                </div>
              </aside>
            );
          }
          default: {
            const lettrine = i === iPremier;
            return (
              <p key={i} className={`mt-6 whitespace-pre-line first:mt-0 ${lettrine ? LETTRINE : ""}`}>
                {b.texte}
              </p>
            );
          }
        }
      })}
    </div>
  );
}
