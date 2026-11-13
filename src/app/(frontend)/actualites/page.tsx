import type { Metadata } from "next";
import Link from "next/link";
import { OngletDate, TON_CATEGORIE, VisuelArticle } from "@/components/actualites/carte-article";
import { Journal } from "@/components/actualites/journal";
import { BandeauContact } from "@/components/bandeau-contact";
import { BilletEvenement } from "@/components/billet-evenement";
import { EnTetePage } from "@/components/en-tete-page";
import { ArrowRightIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { Etiquette, Sceau, Scotch } from "@/components/ui/decor";
import { site, whatsappLink } from "@/config/site";
import { NOM_CATEGORIE } from "@/lib/admin/constantes";
import { getActualites, getEvenementsAVenir } from "@/lib/cms";
import { dateLongue } from "@/lib/format";

// Contenus du dashboard : page régénérée au plus toutes les 5 min (et aussitôt après une modification).
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Actualités",
  description: "Le carnet de bord de l’association Vie Restaurée : nouvelles du terrain, témoignages et prochains rendez-vous.",
};

const sommaire = [
  { href: "#a-la-une", label: "À la une" },
  { href: "#journal", label: "Le journal" },
  { href: "#agenda", label: "L’agenda" },
];

/** Articles et événements gérés depuis le dashboard ; états d'attente soignés tant qu'ils sont vides. */
export default async function Actualites() {
  const [articles, evenements] = await Promise.all([getActualites(30), getEvenementsAVenir()]);
  const [une, ...suite] = articles;

  return (
    <>
      <EnTetePage
        etiquette="Actualités"
        titre={
          <>
            Le <span className="italic">carnet de bord</span> de l’association.
          </>
        }
        intro="Nos nouvelles du terrain, nos prochains rendez-vous et les mots de celles et ceux que nous accompagnons."
      >
        <nav aria-label="Dans cette page" className="entree mt-10 flex flex-wrap gap-3" style={{ "--delai": "380ms" } as React.CSSProperties}>
          {sommaire.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="rounded-full border border-bleu-vie/40 bg-white/70 px-5 py-2.5 text-[15px] font-medium text-bleu-profond transition-colors hover:bg-white"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </EnTetePage>

      {/* ───────── À la une ───────── */}
      <section id="a-la-une" className="scroll-mt-28 py-16 sm:py-24" aria-labelledby="titre-une">
        <div className="conteneur">
          <Etiquette>À la une</Etiquette>
          {une ? (
            <article className="group relative mt-8">
              <Link
                href={`/actualites/${une.slug}`}
                className="grid overflow-hidden rounded-carte bg-white shadow-papier lg:grid-cols-[1.15fr_0.85fr]"
              >
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[26rem]">
                  <VisuelArticle actu={une} sizes="(min-width: 1024px) 640px, 100vw" priority />
                  <OngletDate iso={une.date} />
                </div>
                <div className="relative flex flex-col p-7 sm:p-10 lg:p-12">
                  <Scotch className="-top-3 left-10 -rotate-6 lg:-left-6 lg:top-10 lg:-rotate-[70deg]" />
                  <span className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${TON_CATEGORIE[une.categorie]}`}>
                    {NOM_CATEGORIE[une.categorie]}
                  </span>
                  <h2 id="titre-une" className="mt-5 text-[1.9rem] leading-[1.15] transition-colors group-hover:text-bleu-profond sm:text-[2.4rem]">
                    {une.titre}
                  </h2>
                  <p className="mt-2 font-serif text-bleu-vie italic">{dateLongue(une.date)}</p>
                  {une.extrait && <p className="mt-5 text-lg leading-relaxed">{une.extrait}</p>}
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-bleu-profond">
                    <span className="border-b border-bleu-profond/30 pb-0.5 group-hover:border-bleu-profond">Lire l’article</span>
                    <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </article>
          ) : (
            <div className="relative mt-8 max-w-3xl -rotate-[0.6deg]">
              <Scotch className="-top-3 left-12 -rotate-6" />
              <div className="relative overflow-hidden bg-lavande p-8 sm:p-12">
                <Sceau plein className="absolute -right-16 -bottom-16 size-56 text-white" />
                <p className="relative font-serif text-lg text-bleu-vie italic">Première page à venir</p>
                <h2 id="titre-une" className="relative mt-3 max-w-lg text-[1.6rem] leading-snug">
                  Nos premiers récits arrivent très bientôt. En attendant, c’est sur Instagram que tout se passe.
                </h2>
                {site.social.instagram && (
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener"
                    className="relative mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-bleu-profond px-6 text-[15px] font-semibold text-white transition-colors hover:bg-bleu-nuit"
                  >
                    <InstagramIcon className="size-5" /> Suivre sur Instagram
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ───────── Le journal ───────── */}
      {suite.length > 0 && (
        <section id="journal" className="scroll-mt-28 bg-lavande py-16 sm:py-24" aria-labelledby="titre-journal">
          <div className="conteneur">
            <Etiquette>Le journal</Etiquette>
            <h2 id="titre-journal" className="mt-4 max-w-2xl text-[2rem] sm:text-[2.6rem]">
              Les pages précédentes du carnet.
            </h2>
            <Journal articles={suite} />
          </div>
        </section>
      )}

      {/* ───────── L'agenda ───────── */}
      <section
        id="agenda"
        className="grain scroll-mt-28 overflow-hidden bg-bleu-nuit py-16 text-white sm:py-24"
        aria-labelledby="titre-agenda"
      >
        <Sceau className="absolute -top-40 -right-40 -z-10 size-[34rem] text-white/[0.07]" />
        <div className="conteneur">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Etiquette clair>L’agenda</Etiquette>
              <h2 id="titre-agenda" className="mt-4 max-w-2xl text-[2rem] text-white sm:text-[2.6rem]">
                Venez nous <span className="italic">rencontrer</span>.
              </h2>
            </div>
            <p className="max-w-sm text-white/80 lg:text-right">
              Ventes solidaires, collectes, ateliers : chaque rendez-vous est une occasion de se voir en vrai.
            </p>
          </div>

          <ul className="mt-12 grid gap-8 lg:grid-cols-2">
            {evenements.map((e, i) => (
              <li key={e.id}>
                <BilletEvenement ev={e} etiquette={i === 0 ? "Prochain rendez-vous" : "Rendez-vous"} fond="bg-bleu-nuit" sombre />
              </li>
            ))}
            {/* Proposer un événement : toujours présent, en billet « vierge » */}
            <li className={evenements.length % 2 === 0 ? "lg:col-span-2" : ""}>
              <a
                href={whatsappLink("Bonjour, je souhaite vous proposer un événement.")}
                target="_blank"
                rel="noopener"
                className="group flex h-full flex-col justify-center gap-4 rounded-carte border-2 border-dashed border-white/30 p-7 transition-colors hover:border-ruban hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between sm:p-8"
              >
                <span>
                  <span className="block font-serif text-[1.4rem] font-semibold text-white">
                    {evenements.length === 0 ? "Aucun rendez-vous programmé pour le moment." : "Votre événement ici ?"}
                  </span>
                  <span className="mt-1 block text-white/80">
                    Vous organisez une fête, une kermesse ou une collecte et souhaitez nous associer ?
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-2 font-semibold text-ruban">
                  <WhatsAppIcon className="size-5" /> Proposer un événement
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <BandeauContact
        titre="Vous avez une histoire à partager ?"
        texte="Bénéficiaire, bénévole ou partenaire : votre témoignage peut donner du courage à d’autres familles."
        action="Nous écrire"
      />
    </>
  );
}
