import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { Etiquette, PuceSceau, Sceau, Scotch } from "@/components/ui/decor";
import { site, whatsappLink } from "@/config/site";

const aides = [
  "Vous écouter, sans jugement",
  "Vous orienter vers les bons interlocuteurs",
  "Vous aider matériellement en cas d’urgence",
  "Vous accompagner vers l’autonomie",
];

/**
 * Pour les personnes qui ont besoin de l'association (et pas seulement pour ceux qui veulent l'aider).
 * Ton : doux, direct, confidentiel. Un seul geste à faire : écrire.
 */
export function SectionBesoinAide() {
  return (
    <section className="py-16 sm:py-24 lg:py-28" aria-labelledby="titre-besoin-aide">
      <div className="conteneur">
        <div className="relative overflow-hidden rounded-carte border border-bleu-vie/25 bg-white px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
          <Sceau plein className="absolute -right-24 -bottom-28 size-80 text-lavande" />
          <div className="relative grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <Etiquette>Vous traversez une période difficile ?</Etiquette>
              <h2 id="titre-besoin-aide" className="mt-4 text-[2rem] sm:text-[2.6rem]">
                Vous n’avez pas à affronter cela <span className="italic">seul·e</span>.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed">
                Vous élevez seul·e vos enfants, vous êtes enceinte et inquiète, ou vous connaissez quelqu’un dans cette
                situation ? Écrivez-nous. Votre message est lu avec attention et reste confidentiel.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink("Bonjour, j’aurais besoin d’aide. Puis-je vous parler ?")}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-bleu-profond px-7 text-[15px] font-semibold text-white transition-colors hover:bg-bleu-nuit"
                >
                  <WhatsAppIcon className="size-5" /> Nous écrire sur WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-bleu-vie px-7 text-[15px] font-semibold text-bleu-profond transition-colors hover:bg-lavande"
                >
                  Envoyer un message
                </Link>
              </div>
              <p className="mt-5 text-[15px] text-texte/70">Permanence {site.hours.charAt(0).toLowerCase() + site.hours.slice(1)}.</p>
            </div>

            <div className="relative mx-auto w-full max-w-sm -rotate-[1.5deg]">
              <Scotch className="-top-3 left-8 -rotate-6" />
              <div className="bg-lavande p-7 shadow-papier">
                <p className="font-serif text-lg text-bleu-vie italic">Ce que nous pouvons faire</p>
                <ul className="mt-4 space-y-3">
                  {aides.map((a) => (
                    <li key={a} className="flex gap-3 font-medium text-bleu-nuit">
                      <PuceSceau />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
