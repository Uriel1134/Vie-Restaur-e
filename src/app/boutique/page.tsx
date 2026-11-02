import type { Metadata } from "next";
import Link from "next/link";
import { EnTetePage } from "@/components/en-tete-page";
import { WhatsAppIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { Etiquette, EtiquetteSuspendue, Sceau, Scotch } from "@/components/ui/decor";
import { whatsappLink } from "@/config/site";
import { rayons } from "@/data/association";

export const metadata: Metadata = {
  title: "Boutique solidaire",
  description:
    "Vêtements personnalisés, bijoux, livre et animations : chaque achat à la boutique Vie Restaurée finance l’accompagnement des familles.",
};

const garanties = [
  { titre: "Retrait sur place", texte: "ou en point relais, selon ce qui vous arrange." },
  { titre: "20 jours", texte: "pour retourner ou échanger un article." },
  { titre: "Paiement sécurisé", texte: "carte bancaire, PayPal, virement, Wero, Mobile Money." },
  { titre: "100 % solidaire", texte: "les recettes financent directement nos actions." },
];

export default function Boutique() {
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
                <p className="font-serif text-lg text-bleu-vie italic">Le catalogue arrive</p>
                <p className="mt-1 font-semibold text-bleu-nuit">
                  Les articles seront bientôt en ligne. En attendant, commandez directement par WhatsApp.
                </p>
              </div>
              <a
                href={whatsappLink("Bonjour, je souhaite commander un article de la boutique Vie Restaurée.")}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-bleu-profond px-6 text-[15px] font-semibold text-white transition-colors hover:bg-bleu-nuit"
              >
                <WhatsAppIcon className="size-5" /> Commander
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Rayons */}
      <section className="py-24 lg:py-28" aria-labelledby="titre-rayons">
        <div className="conteneur">
          <Etiquette>Nos rayons</Etiquette>
          <h2 id="titre-rayons" className="mt-4 max-w-2xl text-[2rem] sm:text-[2.6rem]">
            Quatre façons de faire plaisir, et de faire du bien.
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
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

      {/* Détail des rayons */}
      <section className="bg-lavande py-24 lg:py-28" aria-label="Détail des rayons">
        <div className="conteneur space-y-6">
          {rayons.map((r, i) => (
            <article
              key={r.id}
              id={r.id}
              className="apparait grid scroll-mt-28 gap-8 overflow-hidden rounded-carte bg-white md:grid-cols-[0.8fr_1.2fr]"
            >
              <div className="relative flex min-h-56 items-end overflow-hidden bg-bleu-nuit p-8">
                <Sceau plein className="absolute -top-16 -right-16 size-64 text-white/[0.07]" />
                <span aria-hidden className="absolute top-6 left-8 font-serif text-[5rem] leading-none text-white/15 italic">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative text-[1.9rem] text-white">{r.titre}</h3>
              </div>
              <div className="flex flex-col justify-center gap-6 p-8 pt-0 md:pt-8 md:pr-10">
                <p className="text-lg leading-relaxed">{r.texte}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={whatsappLink(`Bonjour, je suis intéressé·e par le rayon « ${r.titre} » de la boutique Vie Restaurée.`)}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 font-semibold text-bleu-profond hover:underline"
                  >
                    <WhatsAppIcon className="size-5" /> Demander les modèles disponibles
                  </a>
                  <span className="text-sm text-texte/60">Catalogue en ligne très bientôt</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Garanties */}
      <section className="py-24 lg:py-28" aria-labelledby="titre-garanties">
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
