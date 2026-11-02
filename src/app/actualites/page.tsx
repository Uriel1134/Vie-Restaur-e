import type { Metadata } from "next";
import { BandeauContact } from "@/components/bandeau-contact";
import { EnTetePage } from "@/components/en-tete-page";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { Etiquette, Scotch, Sceau } from "@/components/ui/decor";
import { site, whatsappLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Les nouvelles, les événements et les témoignages de l’association Vie Restaurée.",
};

/**
 * Les articles et événements seront gérés depuis le dashboard (CMS).
 * Tant qu'ils sont vides, la page affiche des états d'attente soignés.
 */
type Article = { titre: string; date: string; extrait: string; categorie: string };
type Evenement = { titre: string; date: string; lieu: string };

const articles: Article[] = [];
const evenements: Evenement[] = [];

export default function Actualites() {
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
      />

      <section className="py-24 lg:py-28" aria-labelledby="titre-articles">
        <div className="conteneur grid gap-16 lg:grid-cols-[1.4fr_0.6fr] lg:gap-20">
          <div>
            <Etiquette>Dernières nouvelles</Etiquette>
            <h2 id="titre-articles" className="mt-4 text-[2rem] sm:text-[2.6rem]">
              Nouvelles du terrain
            </h2>

            {articles.length === 0 ? (
              <div className="relative mt-12 -rotate-[0.6deg]">
                <Scotch className="-top-3 left-12 -rotate-6" />
                <div className="relative overflow-hidden bg-lavande p-8 sm:p-12">
                  <Sceau plein className="absolute -right-16 -bottom-16 size-56 text-white" />
                  <p className="relative font-serif text-lg text-bleu-vie italic">Première page à venir</p>
                  <p className="relative mt-3 max-w-lg font-serif text-[1.6rem] leading-snug font-semibold text-bleu-nuit">
                    Nos premiers récits arrivent très bientôt. En attendant, c’est sur Instagram que tout se passe.
                  </p>
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
            ) : (
              <ul className="mt-12 divide-y divide-bleu-vie/20 border-y border-bleu-vie/20">
                {articles.map((a) => (
                  <li key={a.titre} className="py-8">
                    <p className="text-sm text-bleu-vie">
                      {a.categorie} · {a.date}
                    </p>
                    <h3 className="mt-2 text-[1.6rem]">{a.titre}</h3>
                    <p className="mt-2">{a.extrait}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Agenda */}
          <aside aria-labelledby="titre-agenda">
            <Etiquette>Agenda</Etiquette>
            <h2 id="titre-agenda" className="mt-4 text-[2rem]">
              Prochains rendez-vous
            </h2>
            {evenements.length === 0 ? (
              <div className="mt-8 border-t-2 border-ruban pt-6">
                <p className="leading-relaxed">
                  Aucun événement programmé pour le moment. Vous organisez une fête, une kermesse ou une collecte et
                  souhaitez nous associer ?
                </p>
                <a
                  href={whatsappLink("Bonjour, je souhaite vous proposer un événement.")}
                  target="_blank"
                  rel="noopener"
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-bleu-profond hover:underline"
                >
                  <WhatsAppIcon className="size-5" /> Proposer un événement
                </a>
              </div>
            ) : (
              <ul className="mt-8 space-y-5">
                {evenements.map((e) => (
                  <li key={e.titre} className="border-t-2 border-ruban pt-4">
                    <p className="font-serif text-lg text-bleu-vie italic">{e.date}</p>
                    <p className="font-semibold text-bleu-nuit">{e.titre}</p>
                    <p className="text-[15px]">{e.lieu}</p>
                  </li>
                ))}
              </ul>
            )}
          </aside>
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
