"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { Etiquette, Sceau } from "@/components/ui/decor";

type Geste = {
  id: string;
  onglet: string;
  accroche: string;
  etapes: { titre: string; texte: string }[];
  action: { label: string; href: string };
};

const gestes: Geste[] = [
  {
    id: "acheter",
    onglet: "J’achète",
    accroche: "Un cadeau qui fait deux heureux.",
    etapes: [
      { titre: "Vous choisissez", texte: "un bijou, un tissu, un jouet, un livre…" },
      { titre: "On en parle sur WhatsApp", texte: "modèle, paiement, retrait : simplement." },
      { titre: "Les recettes agissent", texte: "auprès des familles que nous accompagnons." },
    ],
    action: { label: "Voir la boutique", href: "/boutique" },
  },
  {
    id: "donner",
    onglet: "Je donne",
    accroche: "Un petit geste régulier, un grand effet dans la durée.",
    etapes: [
      { titre: "Vous choisissez un montant", texte: "ponctuel ou chaque mois, même modeste." },
      { titre: "Nous pouvons prévoir", texte: "et accompagner une famille dans le temps." },
      { titre: "Une mère se relève", texte: "et toute la famille avec elle." },
    ],
    action: { label: "Faire un don", href: "/faire-un-don" },
  },
  {
    id: "engager",
    onglet: "Je m’engage",
    accroche: "Votre temps et vos talents ont de la valeur.",
    etapes: [
      { titre: "Vous nous écrivez", texte: "vos envies, vos compétences, vos disponibilités." },
      { titre: "On fait connaissance", texte: "autour d’un premier échange, sans engagement." },
      { titre: "Vous trouvez votre place", texte: "boutique, animations, communication, écoute…" },
    ],
    action: { label: "Devenir bénévole", href: "/nous-soutenir" },
  },
];

/**
 * « Votre geste » : on choisit sa façon d'aider, et le chemin jusqu'à l'impact se dessine.
 * Psychologie : un choix guidé (3 options, pas plus), un parcours concret, une seule action.
 */
export function VotreGeste() {
  const [actif, setActif] = useState(gestes[0].id);
  const g = gestes.find((x) => x.id === actif)!;

  return (
    <section className="grain overflow-hidden bg-bleu-profond py-16 text-white sm:py-24 lg:py-32" aria-labelledby="titre-geste">
      <Sceau className="absolute -right-40 -bottom-56 -z-10 size-[36rem] text-white/10" />
      <div className="conteneur">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <Etiquette clair>Nous soutenir</Etiquette>
            <h2 id="titre-geste" className="mt-4 text-[2rem] text-white sm:text-[2.6rem]">
              Et vous, <span className="italic">quel sera votre geste</span> ?
            </h2>
          </div>

          <div role="tablist" aria-label="Choisir une façon d’aider" className="grid w-full grid-cols-3 gap-1 rounded-full bg-white/10 p-1.5 sm:flex sm:w-auto">
            {gestes.map((x) => (
              <button
                key={x.id}
                type="button"
                role="tab"
                id={`onglet-${x.id}`}
                aria-selected={actif === x.id}
                aria-controls="panneau-geste"
                onClick={() => setActif(x.id)}
                className="min-h-11 rounded-full px-2 text-sm font-semibold whitespace-nowrap sm:px-5 sm:text-[15px] text-white/85 transition-colors hover:text-white aria-selected:bg-ruban aria-selected:text-bleu-nuit"
              >
                {x.onglet}
              </button>
            ))}
          </div>
        </div>

        {/* key : rejoue les animations à chaque changement d'onglet */}
        <div key={g.id} id="panneau-geste" role="tabpanel" aria-labelledby={`onglet-${g.id}`} className="mt-12">
          <p className="entree font-serif text-2xl text-ruban italic">{g.accroche}</p>

          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            {g.etapes.map((e, i) => (
              <li
                key={e.titre}
                className="entree relative"
                style={{ "--delai": `${120 + i * 160}ms` } as CSSProperties}
              >
                <div className="flex items-center gap-4">
                  <span className="relative grid size-14 shrink-0 place-items-center">
                    <Sceau plein className="absolute inset-0 text-white" />
                    <span className="relative font-serif text-xl font-semibold text-bleu-profond">{i + 1}</span>
                  </span>
                  {i < g.etapes.length - 1 && (
                    <span
                      aria-hidden
                      className="relie hidden h-0.5 flex-1 rounded-full bg-gradient-to-r from-ruban to-white/20 md:block"
                      style={{ "--delai": `${300 + i * 160}ms` } as CSSProperties}
                    />
                  )}
                </div>
                <p className="mt-5 font-serif text-[1.4rem] font-semibold text-white">{e.titre}</p>
                <p className="mt-1 text-white/85">{e.texte}</p>
              </li>
            ))}
          </ol>

          <Link
            href={g.action.href}
            className="entree group mt-12 inline-flex min-h-12 items-center gap-2 rounded-full bg-ruban px-7 text-[15px] font-semibold text-bleu-nuit transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-ruban-hover"
            style={{ "--delai": "650ms" } as CSSProperties}
          >
            {g.action.label}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
