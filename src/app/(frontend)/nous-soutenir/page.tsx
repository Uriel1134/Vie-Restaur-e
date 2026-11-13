import type { Metadata } from "next";
import { EnTetePage } from "@/components/en-tete-page";
import { FormulaireMessage } from "@/components/formulaire-message";
import { Etiquette, PuceSceau } from "@/components/ui/decor";

export const metadata: Metadata = {
  title: "Devenir bénévole ou partenaire",
  description:
    "Rejoignez Vie Restaurée comme bénévole ou devenez partenaire : votre temps et vos compétences aident directement les familles.",
};

const missionsBenevoles = [
  { titre: "Boutique & commandes", texte: "Préparer les commandes, tenir le stock, accueillir au retrait." },
  { titre: "Animations & événements", texte: "Animer, organiser, tenir un stand lors de nos événements." },
  { titre: "Communication", texte: "Photos, réseaux sociaux, rédaction : faire connaître nos actions." },
  { titre: "Accompagnement", texte: "Écoute, conseil, aide administrative auprès des familles." },
];

const partenariats = [
  "Associations qui agissent sur le terrain, en Afrique ou ailleurs",
  "Entreprises qui souhaitent soutenir un projet concret",
  "Écoles, hôpitaux et institutions pour nos actions de sensibilisation",
];

export default function NousSoutenir() {
  return (
    <>
      <EnTetePage
        etiquette="Nous rejoindre"
        titre={
          <>
            Votre temps peut <span className="italic">restaurer une vie</span>.
          </>
        }
        intro="Quelques heures par mois ou un engagement plus régulier : chacun trouve sa place parmi nos bénévoles."
      />

      <section className="py-16 sm:py-24 lg:py-28" aria-labelledby="titre-benevolat">
        <div className="conteneur">
          <Etiquette>Devenir bénévole</Etiquette>
          <h2 id="titre-benevolat" className="mt-4 max-w-2xl text-[2rem] sm:text-[2.6rem]">
            Quatre façons de donner un coup de main.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {missionsBenevoles.map((m, i) => (
              <div key={m.titre} className="apparait relative overflow-hidden rounded-carte bg-lavande p-7">
                <span aria-hidden className="absolute -top-3 right-4 font-serif text-[4.5rem] leading-none text-bleu-vie/15 italic">
                  {i + 1}
                </span>
                <h3 className="relative text-[1.3125rem]">{m.titre}</h3>
                <p className="relative mt-2 text-[15px] leading-relaxed">{m.texte}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl font-serif text-lg text-bleu-profond italic">
            Pas besoin d’expérience : de la bienveillance, un peu de disponibilité, et l’envie d’être utile suffisent.
          </p>
        </div>
      </section>

      <section className="bg-lavande py-16 sm:py-24 lg:py-28" aria-labelledby="titre-partenaires">
        <div className="conteneur grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Etiquette>Devenir partenaire</Etiquette>
            <h2 id="titre-partenaires" className="mt-4 text-[2rem] sm:text-[2.6rem]">
              Allons plus loin, ensemble.
            </h2>
            <p className="mt-5 text-lg leading-relaxed">
              Nous avons déjà soutenu La Ligue des orphelins au Congo et Les Précurseurs en Haïti. Nous cherchons des
              partenaires qui partagent notre cap : la dignité des familles.
            </p>
          </div>
          <ul className="space-y-4">
            {partenariats.map((p) => (
              <li key={p} className="flex gap-4 rounded-carte bg-white p-5 shadow-douce">
                <PuceSceau />
                <span className="font-medium text-bleu-nuit">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-28" aria-labelledby="titre-candidature">
        <div className="conteneur grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Etiquette>Candidature</Etiquette>
            <h2 id="titre-candidature" className="mt-4 text-[2rem] sm:text-[2.6rem]">
              Faisons connaissance.
            </h2>
            <p className="mt-5 leading-relaxed">
              Dites-nous qui vous êtes, ce que vous aimez faire et vos disponibilités. Nous vous recontactons pour un
              premier échange, sans engagement.
            </p>
          </div>
          <div className="rounded-carte bg-lavande p-6 sm:p-10">
            <FormulaireMessage
              sujets={["Je souhaite devenir bénévole", "Je souhaite proposer un partenariat"]}
              intitule="Parlez-nous de vous"
              placeholder="Vos compétences, ce qui vous motive, vos disponibilités…"
            />
          </div>
        </div>
      </section>
    </>
  );
}
