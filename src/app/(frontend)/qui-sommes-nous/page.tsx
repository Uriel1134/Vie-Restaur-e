import type { Metadata } from "next";
import { BandeauContact } from "@/components/bandeau-contact";
import { EnTetePage } from "@/components/en-tete-page";
import { Etiquette, Scotch, Sceau } from "@/components/ui/decor";
import { site } from "@/config/site";
import { valeurs } from "@/data/association";

export const metadata: Metadata = {
  title: "Qui sommes-nous",
  description:
    "Vie Restaurée, association loi 1901 créée en 2022, accompagne les familles monoparentales en Afrique et dans les pays en développement.",
};

export default function QuiSommesNous() {
  return (
    <>
      <EnTetePage
        etiquette="Qui sommes-nous"
        titre={
          <>
            Née d’un <span className="italic">refus</span>, portée par l’<span className="italic">espérance</span>.
          </>
        }
        intro="Depuis 2022, Vie Restaurée se tient aux côtés des familles monoparentales, en Afrique et dans les pays en développement."
      />

      {/* Histoire — mise en page éditoriale */}
      <section className="py-16 sm:py-24 lg:py-32" aria-labelledby="titre-histoire">
        <div className="conteneur grid gap-12 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <div className="lg:pt-2">
            <Etiquette>Notre histoire</Etiquette>
          </div>
          <div className="max-w-3xl">
            <h2 id="titre-histoire" className="text-[2rem] sm:text-[2.6rem]">
              Tout est parti d’un constat que nous ne pouvions plus accepter.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed">
              <p>
                <span className="float-left mt-1.5 mr-3 font-serif text-[4.2rem] leading-[0.8] font-semibold text-bleu-vie">
                  E
                </span>
                n Afrique, trop d’enfants sont encore abandonnés : dans des orphelinats, parfois même dans la rue. Trop
                de jeunes filles meurent des suites d’une grossesse précoce ou d’un avortement clandestin. Et trop de
                mères, laissées seules, n’ont d’autre choix que des solutions qui les mettent en danger pour nourrir
                leurs enfants.
              </p>
              <p>
                Vie Restaurée a été créée en {site.foundedYear} pour répondre à cela. Pas avec de grands discours, mais
                avec une présence : écouter, aider concrètement, et accompagner chaque parent vers une vie plus stable
                et plus libre.
              </p>
              <p className="surligne inline font-serif text-xl font-semibold text-bleu-nuit">
                Parce que lorsqu’on relève une personne, c’est toute une famille qui se remet debout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & vision — deux cartes « notes » */}
      <section className="bg-lavande py-16 sm:py-24 lg:py-32" aria-labelledby="titre-mission">
        <div className="conteneur">
          <Etiquette>Mission & vision</Etiquette>
          <h2 id="titre-mission" className="mt-4 max-w-2xl text-[2rem] sm:text-[2.6rem]">
            Ce que nous faisons, et ce vers quoi nous allons.
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div className="apparait relative -rotate-1">
              <Scotch className="-top-3 left-8 -rotate-6" />
              <div className="h-full bg-white p-8 shadow-papier sm:p-10">
                <p className="font-serif text-lg text-bleu-vie italic">Notre mission</p>
                <p className="mt-4 font-serif text-[1.45rem] leading-snug font-semibold text-bleu-nuit">
                  Apporter un soutien social, moral et matériel aux familles monoparentales, et prévenir les drames
                  qui les fragilisent.
                </p>
              </div>
            </div>
            <div className="apparait relative rotate-1 md:mt-12">
              <Scotch className="-top-3 right-8 rotate-6" />
              <div className="h-full bg-bleu-nuit p-8 text-white shadow-papier sm:p-10">
                <p className="font-serif text-lg text-ruban italic">Notre vision</p>
                <p className="mt-4 font-serif text-[1.45rem] leading-snug font-semibold text-white">
                  Des familles debout et autonomes, capables à leur tour d’accomplir de grandes œuvres, en Afrique et
                  dans tous les pays en difficulté.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32" aria-labelledby="titre-valeurs">
        <Sceau plein className="absolute top-24 -left-72 size-[34rem] text-lavande" />
        <div className="conteneur relative">
          <Etiquette>Nos valeurs</Etiquette>
          <h2 id="titre-valeurs" className="mt-4 max-w-2xl text-[2rem] sm:text-[2.6rem]">
            Quatre mots qui guident chacune de nos décisions.
          </h2>
          <dl className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {valeurs.map((v, i) => (
              <div key={v.titre} className="apparait border-t border-bleu-vie/30 pt-6">
                <dt className="flex items-baseline gap-4">
                  <span className="font-serif text-lg text-bleu-vie italic">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-[2rem] font-semibold text-bleu-nuit">{v.titre}</span>
                </dt>
                <dd className="mt-3 max-w-md pl-10">{v.texte}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Équipe & identité */}
      <section className="bg-lavande py-16 sm:py-24 lg:py-32" aria-labelledby="titre-equipe">
        <div className="conteneur grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <Etiquette>L’équipe</Etiquette>
            <h2 id="titre-equipe" className="mt-4 text-[2rem] sm:text-[2.6rem]">
              Des bénévoles, et une présidente engagée.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed">
              Vie Restaurée est portée par sa présidente, Joelle Tchankou, et par une équipe de bénévoles qui
              préparent les actions, gèrent la boutique et accompagnent les familles. Chacun donne de son temps, avec
              ses compétences.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed">
              Envie de nous rejoindre ? Il y a forcément une place pour vous.
            </p>
          </div>

          <div className="relative rotate-[1.2deg]">
            <Scotch className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
            <dl className="space-y-4 bg-white p-8 text-[15px] shadow-papier sm:p-10">
              <p className="font-serif text-lg text-bleu-vie italic">Fiche d’identité</p>
              {[
                ["Nom", site.legalName],
                ["Statut", "Association loi 1901"],
                ["N° RNA", site.rna],
                ["Siège", site.registeredIn],
                ["Création", String(site.foundedYear)],
                ["Présidente", "Joelle Tchankou"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-dashed border-bleu-vie/30 pb-3">
                  <dt className="text-bleu-profond">{k}</dt>
                  <dd className="text-right font-semibold text-bleu-nuit">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <BandeauContact
        titre="Envie d’agir avec nous ?"
        texte="Bénévolat, partenariat, compétences à partager : écrivez-nous, nous vous dirons comment vous pouvez aider."
        action="Devenir bénévole"
        href="/nous-soutenir"
      />
    </>
  );
}
