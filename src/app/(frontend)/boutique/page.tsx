import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { EnTetePage } from "@/components/en-tete-page";
import { WhatsAppIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { Etiquette, EtiquetteSuspendue, Sceau, Scotch } from "@/components/ui/decor";
import { whatsappLink } from "@/config/site";
import { CarteProduit } from "@/components/boutique/carte-produit";
import { rayons } from "@/data/association";
import { getProduits } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Boutique solidaire",
  description:
    "Vêtements personnalisés, bijoux, livre et animations : chaque achat à la boutique Vie Restaurée finance l’accompagnement des familles.",
};

const garanties = [
  { titre: "Retrait sur place", texte: "ou en point relais, selon ce qui vous arrange." },
  { titre: "20 jours", texte: "pour retourner ou échanger un article." },
  { titre: "Panier + WhatsApp", texte: "votre bon de commande illustré part en un geste, et on s’organise ensemble." },
  { titre: "100 % solidaire", texte: "les recettes financent directement nos actions." },
];

// Catalogue géré dans le dashboard : page régénérée au plus toutes les 5 min (et aussitôt après une modification).
export const revalidate = 300;

export default async function Boutique() {
  const produits = await getProduits();

  return (
    <>
      <EnTetePage
        etiquette="La boutique solidaire"
        titre={
          <>
            Acheter ici, c’est déjà <span className="italic">agir</span>.
          </>
        }
        intro="Chaque article est préparé par nos bénévoles, et chaque euro dépensé ici rejoint directement les familles que nous accompagnons."
      />

      {/* Annonce d'ouverture : honnête et utile */}
      <section className="relative z-10 -mt-10">
        <div className="conteneur">
          <div className="relative mx-auto max-w-3xl -rotate-[0.6deg]">
            <Scotch className="-top-3 left-10 -rotate-6" />
            <div className="flex flex-col gap-6 bg-white p-7 shadow-papier sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="font-serif text-lg text-bleu-vie italic">Commander, c’est simple</p>
                <p className="mt-1 font-semibold text-bleu-nuit">
                  Ajoutez vos coups de cœur au panier, puis envoyez votre bon de commande illustré sur WhatsApp. Nous organisons ensemble le paiement et le retrait.
                </p>
              </div>
              <a
                href="#rayons"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-bleu-profond px-6 text-[15px] font-semibold text-white transition-colors hover:bg-bleu-nuit"
              >
                Voir les articles
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Rayons */}
      <section id="rayons" className="scroll-mt-28 py-16 sm:py-24 lg:py-28" aria-labelledby="titre-rayons">
        <div className="conteneur">
          <Etiquette>Nos rayons</Etiquette>
          <h2 id="titre-rayons" className="mt-4 max-w-2xl text-[2rem] sm:text-[2.6rem]">
            Huit rayons pour faire plaisir, et faire du bien.
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4">
            {rayons.map((r) => (
              <li key={r.id}>
                <a href={`#${r.id}`} className="block rounded-sm" aria-label={`Aller au rayon ${r.titre}`}>
                  <EtiquetteSuspendue titre={r.titre} texte={r.court} rotation={r.rotation} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Rayons et produits (gérés dans le dashboard) */}
      <section className="bg-lavande py-16 sm:py-24 lg:py-28" aria-label="Les articles par rayon">
        <div className="conteneur space-y-20">
          {rayons.map((r, i) => {
            const articles = produits.filter((p) => p.rayon === r.id);
            return (
              <article key={r.id} id={r.id} className="scroll-mt-28">
                <div className="grid gap-4 border-b border-bleu-vie/25 pb-6 md:grid-cols-[auto_1fr] md:items-end md:gap-8">
                  <span aria-hidden className="font-serif text-[4.5rem] leading-none text-bleu-vie/25 italic">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.9rem] sm:text-[2.2rem]">{r.titre}</h3>
                    <p className="mt-1 max-w-2xl text-bleu-profond">{r.texte}</p>
                  </div>
                </div>
                {articles.length > 0 ? (
                  <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
                    {articles.map((p, j) => (
                      <li key={p.id} style={{ "--i": j } as CSSProperties} className="apparait">
                        <CarteProduit produit={p} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <span className="font-serif text-bleu-profond italic">Les articles de ce rayon arrivent bientôt.</span>
                    <a
                      href={whatsappLink(`Bonjour, je suis intéressé·e par le rayon « ${r.titre} » de la boutique Vie Restaurée.`)}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-2 font-semibold text-bleu-profond hover:underline"
                    >
                      <WhatsAppIcon className="size-5" /> Demander les modèles disponibles
                    </a>
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Garanties */}
      <section className="py-16 sm:py-24 lg:py-28" aria-labelledby="titre-garanties">
        <div className="conteneur">
          <Etiquette>Commander en confiance</Etiquette>
          <h2 id="titre-garanties" className="mt-4 max-w-2xl text-[2rem] sm:text-[2.6rem]">
            Simple, sûr, et sans mauvaise surprise.
          </h2>
          <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {garanties.map((g) => (
              <div key={g.titre} className="border-t-2 border-ruban pt-5">
                <dt className="font-serif text-[1.45rem] font-semibold text-bleu-nuit">{g.titre}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed">{g.texte}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-12 text-[15px] text-texte/70">
            Les conditions détaillées sont précisées dans nos{" "}
            <Link href="/cgv" className="font-medium text-bleu-profond underline underline-offset-4">
              conditions générales de vente
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="grain overflow-hidden bg-bleu-profond text-white">
        <Sceau className="absolute -top-32 -right-32 -z-10 size-[30rem] text-white/10" />
        <div className="conteneur grid gap-8 py-20 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-[2rem] text-white sm:text-[2.4rem]">Une animation pour votre événement ?</h2>
            <p className="mt-4 text-white">
              Anniversaire, fête d’entreprise, kermesse : réservez une animation, et faites de votre événement un
              geste solidaire.
            </p>
          </div>
          <ButtonLink href="/contact" className="self-start md:self-auto">
            Demander un devis
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
