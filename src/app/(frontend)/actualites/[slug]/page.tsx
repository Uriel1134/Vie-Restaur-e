import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { CarteArticle, TON_CATEGORIE } from "@/components/actualites/carte-article";
import { ContenuArticle } from "@/components/actualites/contenu-article";
import { PartagerWhatsApp } from "@/components/actualites/partager";
import { ArrowRightIcon } from "@/components/icons";
import { Etiquette, Sceau, Scotch } from "@/components/ui/decor";
import { site } from "@/config/site";
import { NOM_CATEGORIE } from "@/lib/admin/constantes";
import { analyserContenu, slugsProduits, tempsDeLecture } from "@/lib/article";
import { getActualite, getActualites, getProduitsParSlugs } from "@/lib/cms";
import { dateLongue } from "@/lib/format";

export const revalidate = 300;

const d = (ms: number) => ({ "--delai": `${ms}ms` }) as CSSProperties;

export async function generateMetadata({ params }: PageProps<"/actualites/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = await getActualite(slug);
  if (!a) return { title: "Article introuvable" };
  return {
    title: a.titre,
    description: a.extrait ?? undefined,
    openGraph: { type: "article", images: a.image ? [a.image] : undefined },
  };
}

export default async function Article({ params }: PageProps<"/actualites/[slug]">) {
  const { slug } = await params;
  const a = await getActualite(slug);
  if (!a) notFound();

  const blocs = analyserContenu(a.contenu);
  const [produits, recents] = await Promise.all([getProduitsParSlugs(slugsProduits(blocs)), getActualites(4)]);
  const parSlug = new Map(produits.map((p) => [p.slug, p]));
  const autres = recents.filter((x) => x.id !== a.id).slice(0, 3);
  const minutes = tempsDeLecture(a.extrait, a.contenu);

  return (
    <>
      {/* Progression de lecture */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-1">
        <div className="progression-lecture h-full bg-ruban" />
      </div>

      <article>
        <header className="relative overflow-hidden bg-lavande pt-[calc(var(--entete)+2.5rem)] pb-16 sm:pt-[calc(var(--entete)+4rem)] sm:pb-24">
          <Sceau plein className="absolute -top-24 -right-40 size-[30rem] text-white/70" />
          <Sceau className="absolute -bottom-48 left-1/4 size-[24rem] text-bleu-vie/15" />

          <div className="conteneur relative">
            <Link href="/actualites" className="entree inline-flex items-center gap-2 text-[15px] font-medium text-bleu-profond hover:underline">
              <ArrowRightIcon className="size-4 rotate-180" /> Le carnet de bord
            </Link>

            <div className={`mt-8 grid gap-12 ${a.image ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16" : "max-w-3xl"}`}>
              <div>
                <div className="entree flex flex-wrap items-center gap-3" style={d(80)}>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${TON_CATEGORIE[a.categorie]}`}>
                    {NOM_CATEGORIE[a.categorie]}
                  </span>
                  <time dateTime={a.date} className="font-serif text-bleu-vie italic">
                    {dateLongue(a.date)}
                  </time>
                </div>
                <h1 className="entree mt-5 text-[2.3rem] leading-[1.08] sm:text-[3.3rem]" style={d(160)}>
                  {a.titre}
                </h1>
                {a.extrait && (
                  <p className="entree mt-6 font-serif text-xl leading-relaxed text-bleu-profond italic sm:text-[1.4rem]" style={d(240)}>
                    {a.extrait}
                  </p>
                )}
                <div className="entree mt-8 flex items-center gap-3 border-t border-dashed border-bleu-vie/40 pt-6 text-[15px]" style={d(320)}>
                  <span className="relative grid size-10 shrink-0 place-items-center">
                    <Sceau plein className="absolute inset-0 text-bleu-vie" />
                    <span className="relative font-serif text-sm font-semibold text-white italic">V</span>
                  </span>
                  <span>
                    <span className="block font-semibold text-bleu-nuit">L’équipe Vie Restaurée</span>
                    <span className="text-texte/70">{minutes} min de lecture</span>
                  </span>
                </div>
              </div>

              {a.image && (
                <figure className="entree-note relative mx-auto w-full max-w-md rotate-[1.2deg]" style={d(420)}>
                  <Scotch className="-top-3 left-1/2 z-10 -translate-x-1/2 -rotate-3" />
                  <div className="bg-white p-3 pb-12 shadow-papier sm:p-4 sm:pb-14">
                    <div className="relative aspect-[4/5] overflow-hidden bg-lavande">
                      <Image src={a.image} alt="" fill priority sizes="(min-width: 1024px) 450px, 100vw" className="object-cover" unoptimized />
                    </div>
                  </div>
                  <figcaption className="absolute right-0 bottom-3 left-0 text-center font-serif text-bleu-vie italic sm:bottom-4">
                    Vie Restaurée · {dateLongue(a.date)}
                  </figcaption>
                </figure>
              )}
            </div>
          </div>
        </header>

        <div className="conteneur max-w-[42rem] py-14 sm:py-20">
          {blocs.length > 0 ? (
            <ContenuArticle blocs={blocs} produits={parSlug} />
          ) : (
            <p className="font-serif text-lg text-bleu-profond italic">Le récit complet arrive bientôt.</p>
          )}

          {/* Signature */}
          <footer className="mt-16 rounded-carte border border-bleu-vie/25 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Sceau plein className="mt-1 size-8 shrink-0 text-ruban" />
              <p className="font-serif text-lg leading-snug text-bleu-nuit italic">« {site.signature}. »</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 border-t border-dashed border-bleu-vie/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[15px] text-texte/80">Cette page vous a touché·e ? Faites-la circuler.</p>
              <PartagerWhatsApp titre={a.titre} />
            </div>
          </footer>
        </div>
      </article>

      {autres.length > 0 && (
        <section className="bg-lavande py-16 sm:py-24" aria-labelledby="titre-autres">
          <div className="conteneur">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Etiquette>Dans le carnet</Etiquette>
                <h2 id="titre-autres" className="mt-4 text-[2rem]">
                  À lire aussi
                </h2>
              </div>
              <Link href="/actualites" className="font-semibold text-bleu-profond hover:underline">
                Tout le carnet de bord →
              </Link>
            </div>
            <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {autres.map((x) => (
                <li key={x.id}>
                  <CarteArticle actu={x} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
