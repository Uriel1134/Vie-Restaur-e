import type { Metadata } from "next";
import { BandeauContact } from "@/components/bandeau-contact";
import { EnTetePage } from "@/components/en-tete-page";
import { Etiquette, PuceSceau, Scotch, Timbre } from "@/components/ui/decor";
import { missions, projetAnnee, publics, terrain } from "@/data/association";

export const metadata: Metadata = {
  title: "Nos actions",
  description:
    "Service social et sensibilisation : comment Vie Restaurée accompagne les familles monoparentales, au Congo, en Haïti, au Cameroun et ailleurs.",
};

export default function NosActions() {
  return (
    <>
      <EnTetePage
        etiquette="Nos actions"
        titre={
          <>
            Deux façons d’agir, <span className="italic">un même cap</span> : la dignité.
          </>
        }
        intro="Aider aujourd’hui, prévenir pour demain : nos actions se répondent, du soutien d’urgence à l’autonomie."
      >
        <nav aria-label="Dans cette page" className="mt-10 flex flex-wrap gap-3">
          {missions.map((m) => (
            <a
              key={m.id}
              href={`#${m.id}`}
              className="rounded-full border border-bleu-vie/40 bg-white/70 px-5 py-2.5 text-[15px] font-medium text-bleu-profond transition-colors hover:bg-white"
            >
              {m.numero} · {m.titre}
            </a>
          ))}
          <a
            href="#terrain"
            className="rounded-full border border-bleu-vie/40 bg-white/70 px-5 py-2.5 text-[15px] font-medium text-bleu-profond transition-colors hover:bg-white"
          >
            Sur le terrain
          </a>
        </nav>
      </EnTetePage>

      {missions.map((m, i) => (
        <section
          key={m.id}
          id={m.id}
          className={`scroll-mt-28 py-24 lg:py-32 ${i % 2 === 1 ? "bg-lavande" : ""}`}
          aria-labelledby={`titre-${m.id}`}
        >
          <div className="conteneur grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="relative pt-16 sm:pt-20">
                <span
                  aria-hidden
                  className="absolute top-0 -left-1 font-serif text-[8rem] leading-none font-semibold text-bleu-vie/15 italic select-none sm:text-[10rem]"
                >
                  {m.numero}
                </span>
                <h2 id={`titre-${m.id}`} className="relative text-[2.2rem] sm:text-[2.8rem]">
                  {m.titre}
                </h2>
              </div>
              <p className="mt-4 font-serif text-xl leading-relaxed text-bleu-profond italic">{m.accroche}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {m.details.map((d) => (
                <article
                  key={d.titre}
                  className={`apparait rounded-carte p-7 ${i % 2 === 1 ? "bg-white" : "bg-lavande"}`}
                >
                  <div className="flex gap-3">
                    <PuceSceau className="mt-2" />
                    <h3 className="text-[1.3125rem]">{d.titre}</h3>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed">{d.texte}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Publics */}
      <section className="py-24 lg:py-32" aria-labelledby="titre-publics">
        <div className="conteneur">
          <Etiquette>Auprès de qui</Etiquette>
          <h2 id="titre-publics" className="mt-4 max-w-2xl text-[2rem] sm:text-[2.6rem]">
            Là où se trouvent les familles.
          </h2>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-carte bg-bleu-vie/20 sm:grid-cols-2 lg:grid-cols-4">
            {publics.map((p) => (
              <li key={p.titre} className="bg-white p-7">
                <p className="font-serif text-[1.4rem] font-semibold text-bleu-nuit">{p.titre}</p>
                <p className="mt-2 text-[15px] leading-relaxed">{p.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Terrain */}
      <section id="terrain" className="scroll-mt-28 bg-lavande py-24 lg:py-32" aria-labelledby="titre-terrain">
        <div className="conteneur">
          <Etiquette>Sur le terrain</Etiquette>
          <h2 id="titre-terrain" className="mt-4 max-w-2xl text-[2rem] sm:text-[2.6rem]">
            Ce que nous avons déjà accompli.
          </h2>
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {terrain.map((t) => (
              <div key={t.pays} className="apparait">
                <Timbre pays={t.pays} code={t.code} rotation={t.rotation}>
                  {t.texte}
                </Timbre>
              </div>
            ))}
          </div>
          <p className="mt-14 text-center font-serif text-xl text-bleu-profond italic">
            Et, partout où c’est nécessaire, une aide financière directe à des familles.
          </p>

          <div className="apparait relative mx-auto mt-16 max-w-3xl">
            <Scotch className="-top-3 -left-4 -rotate-[24deg]" />
            <Scotch className="-right-4 -bottom-3 -rotate-[24deg]" />
            <div className="grid gap-4 bg-bleu-nuit p-8 text-white shadow-papier sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8 sm:p-10">
              <p className="font-serif text-xl text-ruban italic">Cette année</p>
              <p className="font-serif text-[1.5rem] leading-snug font-semibold text-white">{projetAnnee}</p>
            </div>
          </div>
        </div>
      </section>

      <BandeauContact
        titre="Vous connaissez une famille qui a besoin d’aide ?"
        texte="Parlez-nous de sa situation, en toute confidentialité. Nous verrons ensemble comment l’accompagner."
        action="Nous écrire"
      />
    </>
  );
}
