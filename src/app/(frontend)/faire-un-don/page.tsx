import type { Metadata } from "next";
import { BandeauContact } from "@/components/bandeau-contact";
import { EnTetePage } from "@/components/en-tete-page";
import { ButtonLink } from "@/components/ui/button-link";
import { Etiquette, PuceSceau, Scotch } from "@/components/ui/decor";
import { site, whatsappLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Faire un don",
  description:
    "Soutenez Vie Restaurée par un don mensuel : un soutien régulier permet d’accompagner les familles dans la durée.",
};

const raisons = [
  {
    titre: "Prévoir",
    texte: "Un don régulier nous permet de planifier nos actions au lieu de courir après l’urgence.",
  },
  {
    titre: "Accompagner dans la durée",
    texte: "Sortir de la précarité prend des mois. Votre fidélité permet de suivre une famille jusqu’au bout.",
  },
  {
    titre: "Ouvrir de nouveaux bureaux",
    texte: "Cette année, nous voulons nous implanter dans le Nord, l’Ouest et à Douala, au Cameroun.",
  },
];

const autresFacons = [
  { titre: "Par virement", texte: "Demandez-nous nos coordonnées bancaires, nous vous les transmettons sous 24 h." },
  { titre: "En nature", texte: "Vêtements, fournitures, matériel : écrivez-nous avant, pour que votre don serve vraiment." },
  { titre: "En achetant", texte: "Chaque article de la boutique solidaire finance nos actions." },
];

export default function FaireUnDon() {
  const lienDon = site.helloassoDonUrl;

  return (
    <>
      <EnTetePage
        etiquette="Faire un don"
        titre={
          <>
            Un petit geste chaque mois, <span className="italic">une grande différence</span> chaque jour.
          </>
        }
        intro="Votre soutien régulier, même modeste, permet d’accompagner une famille dans la durée, et pas seulement le temps d’une urgence."
      />

      <section className="py-16 sm:py-24 lg:py-32">
        <div className="conteneur grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
          <div>
            <Etiquette>Pourquoi donner chaque mois</Etiquette>
            <h2 className="mt-4 text-[2rem] sm:text-[2.6rem]">La régularité change tout.</h2>
            <ol className="mt-10 space-y-8">
              {raisons.map((r, i) => (
                <li key={r.titre} className="apparait flex gap-5">
                  <span className="w-8 shrink-0 font-serif text-3xl leading-none text-bleu-vie italic">{i + 1}.</span>
                  <div>
                    <p className="font-serif text-[1.35rem] font-semibold text-bleu-nuit">{r.titre}</p>
                    <p className="mt-1 leading-relaxed">{r.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Carte de don */}
          <div className="relative lg:sticky lg:top-32">
            <Scotch className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
            <div className="bg-white p-8 shadow-papier sm:p-10">
              <p className="font-serif text-lg text-bleu-vie italic">Je deviens donateur régulier</p>
              <p className="mt-3 font-serif text-[1.7rem] leading-snug font-semibold text-bleu-nuit">
                Choisissez le montant qui vous ressemble. Vous pouvez l’arrêter à tout moment.
              </p>
              <ul className="mt-6 space-y-3 text-[15px]">
                {["Paiement sécurisé", "Modifiable ou résiliable quand vous le souhaitez", "Des nouvelles régulières de nos actions"].map(
                  (t) => (
                    <li key={t} className="flex gap-3">
                      <PuceSceau />
                      {t}
                    </li>
                  ),
                )}
              </ul>
              {lienDon ? (
                <ButtonLink href={lienDon} className="mt-8 w-full" target="_blank" rel="noopener">
                  Je donne chaque mois
                </ButtonLink>
              ) : (
                <>
                  <ButtonLink
                    href={whatsappLink("Bonjour, je souhaite faire un don mensuel à Vie Restaurée.")}
                    className="mt-8 w-full"
                    target="_blank"
                    rel="noopener"
                  >
                    Je donne chaque mois
                  </ButtonLink>
                  <p className="mt-4 text-center text-sm text-texte/70">
                    Notre plateforme de don en ligne ouvre très bientôt. D’ici là, écrivez-nous et nous vous guidons.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lavande py-16 sm:py-24 lg:py-28" aria-labelledby="titre-autres">
        <div className="conteneur">
          <Etiquette>D’autres façons d’aider</Etiquette>
          <h2 id="titre-autres" className="mt-4 max-w-2xl text-[2rem] sm:text-[2.6rem]">
            Chaque forme de générosité compte.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {autresFacons.map((a) => (
              <div key={a.titre} className="apparait rounded-carte bg-white p-7 shadow-douce">
                <h3 className="text-[1.3125rem]">{a.titre}</h3>
                <p className="mt-2 text-[15px] leading-relaxed">{a.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BandeauContact
        titre="Vous préférez donner de votre temps ?"
        texte="Nos bénévoles sont le cœur de l’association. Rejoignez-les, selon vos disponibilités."
        action="Devenir bénévole"
        href="/nous-soutenir"
      />
    </>
  );
}
