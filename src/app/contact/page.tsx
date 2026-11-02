import type { Metadata } from "next";
import { EnTetePage } from "@/components/en-tete-page";
import { FormulaireMessage } from "@/components/formulaire-message";
import { ClockIcon, InstagramIcon, MailIcon, WhatsAppIcon } from "@/components/icons";
import { Etiquette, Scotch } from "@/components/ui/decor";
import { site, whatsappLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l’association Vie Restaurée par WhatsApp, par e-mail ou via le formulaire.",
};

export default function ContactPage() {
  return (
    <>
      <EnTetePage
        etiquette="Contact"
        titre={
          <>
            Parlons-en, <span className="italic">simplement</span>.
          </>
        }
        intro="Une question, une demande d’aide, une commande ou l’envie de nous rejoindre ? Nous vous répondons avec plaisir."
      />

      <section className="py-24 lg:py-28">
        <div className="conteneur grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Coordonnées : carte scotchée */}
          <div>
            <div className="relative rotate-[-0.8deg]">
              <Scotch className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
              <div className="space-y-7 bg-white p-8 shadow-papier sm:p-10">
                <div className="flex gap-4">
                  <ClockIcon className="mt-1 size-6 shrink-0 text-bleu-vie" />
                  <div>
                    <p className="font-serif text-[1.3125rem] font-semibold text-bleu-nuit">Permanence</p>
                    <p className="mt-1">{site.hours}</p>
                    <p className="mt-1 text-[15px] text-texte/70">En dehors de ces horaires, sur rendez-vous.</p>
                  </div>
                </div>
                <a href={whatsappLink()} target="_blank" rel="noopener" className="group flex gap-4">
                  <WhatsAppIcon className="mt-1 size-6 shrink-0 text-bleu-vie" />
                  <div>
                    <p className="font-serif text-[1.3125rem] font-semibold text-bleu-nuit">WhatsApp</p>
                    <p className="mt-1 font-medium text-bleu-profond group-hover:underline">{site.phoneDisplay}</p>
                  </div>
                </a>
                <a href={`mailto:${site.email}`} className="group flex gap-4">
                  <MailIcon className="mt-1 size-6 shrink-0 text-bleu-vie" />
                  <div className="min-w-0">
                    <p className="font-serif text-[1.3125rem] font-semibold text-bleu-nuit">E-mail</p>
                    <p className="mt-1 font-medium break-all text-bleu-profond group-hover:underline">{site.email}</p>
                  </div>
                </a>
                {site.social.instagram && (
                  <a href={site.social.instagram} target="_blank" rel="noopener" className="group flex gap-4">
                    <InstagramIcon className="mt-1 size-6 shrink-0 text-bleu-vie" />
                    <div>
                      <p className="font-serif text-[1.3125rem] font-semibold text-bleu-nuit">Instagram</p>
                      <p className="mt-1 font-medium text-bleu-profond group-hover:underline">Suivre nos actions</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
            <p className="mt-10 font-serif text-lg leading-relaxed text-bleu-profond italic">
              Vous traversez une situation difficile ? Écrivez-nous en toute confiance : chaque message est lu avec
              attention et reste confidentiel.
            </p>
          </div>

          <div>
            <Etiquette>Nous écrire</Etiquette>
            <h2 className="mt-4 mb-10 text-[2rem] sm:text-[2.6rem]">Votre message</h2>
            <FormulaireMessage
              sujets={[
                "J’ai une question",
                "J’ai besoin d’aide",
                "Je souhaite commander un article",
                "Je souhaite réserver une animation",
                "Je souhaite devenir bénévole",
                "Je souhaite proposer un partenariat",
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
