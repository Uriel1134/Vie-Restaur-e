import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Etiquette,
  EtiquetteSuspendue,
  PuceSceau,
  Ruban,
  Sceau,
  Scotch,
  Timbre,
  TraitManuscrit,
} from "@/components/ui/decor";
import { site } from "@/config/site";
import { missions, projetAnnee, rayons, terrain } from "@/data/association";

const etapesAchat = [
  { titre: "Vous choisissez", texte: "un article ou une prestation." },
  { titre: "Nos bénévoles préparent", texte: "votre commande, avec soin." },
  { titre: "Les recettes agissent", texte: "auprès des familles que nous accompagnons." },
];

export default function Home() {
  return (
    <>
      {/* ───────────── Héros ───────────── */}
      <section className="grain overflow-hidden bg-ardoise text-white">
        <Sceau className="absolute -top-40 -right-56 -z-10 size-[44rem] text-white/[0.09] sm:-right-40 lg:-right-24" />
        <Sceau className="absolute -bottom-72 -left-64 -z-10 size-[34rem] text-white/[0.06]" />

        <div className="conteneur grid items-center gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:pt-24 lg:pb-28">
          <div>
            <Ruban />
            <h1 className="mt-9 text-[2.35rem] leading-[1.08] text-white sm:text-6xl lg:text-[4.1rem]">
              <span className="block">Une mère relevée.</span>
              <span className="block">Un enfant gardé.</span>
              <span className="mt-1 block italic">
                Une vie <TraitManuscrit>restaurée.</TraitManuscrit>
              </span>
            </h1>
            <p className="mt-9 max-w-xl text-lg leading-relaxed text-white">
              Depuis {site.foundedYear}, nous accompagnons les familles monoparentales en Afrique et dans les pays en
              développement : un soutien moral, une aide matérielle, et un vrai chemin vers l’autonomie.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Nous contacter</ButtonLink>
              <ButtonLink href="/nos-actions" variant="contour-clair">
                Découvrir nos actions
              </ButtonLink>
            </div>
          </div>

          {/* Note scotchée : la conviction + les preuves de confiance */}
          <aside className="relative mx-auto w-full max-w-md rotate-[1.5deg] lg:mx-0 lg:justify-self-end">
            <Scotch className="-top-3 left-1/2 -translate-x-1/2 -rotate-[3deg]" />
            <div className="bg-white p-8 text-texte shadow-papier sm:p-10">
              <p className="font-serif text-sm italic text-bleu-vie">Ce qui nous fait avancer</p>
              <blockquote className="mt-3 font-serif text-[1.6rem] leading-snug font-semibold text-bleu-nuit italic">
                « {site.signature}. »
              </blockquote>
              <dl className="mt-8 space-y-3 border-t border-dashed border-bleu-vie/40 pt-6 text-[15px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-bleu-profond">Créée en</dt>
                  <dd className="font-semibold text-bleu-nuit">{site.foundedYear}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-bleu-profond">Sur le terrain</dt>
                  <dd className="text-right font-semibold text-bleu-nuit">Congo · Haïti · Cameroun</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-bleu-profond">Association loi 1901</dt>
                  <dd className="font-semibold text-bleu-nuit">RNA {site.rna}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* ───────────── Pourquoi nous existons ───────────── */}
      <section className="bg-lavande py-24 lg:py-32" aria-labelledby="titre-pourquoi">
        <div className="conteneur grid gap-8 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <div className="lg:pt-3">
            <Etiquette>Pourquoi nous existons</Etiquette>
          </div>
          <div className="apparait">
            <h2 id="titre-pourquoi" className="sr-only">
              Pourquoi nous existons
            </h2>
            <p className="font-serif text-[1.55rem] leading-[1.45] font-semibold text-bleu-nuit sm:text-[2.1rem]">
              Trop d’enfants abandonnés. Trop de jeunes filles emportées par une grossesse précoce ou un avortement
              clandestin. Trop de mères contraintes de survivre comme elles le peuvent. Vie Restaurée est née de ce
              constat, et d’une conviction :{" "}
              <span className="surligne">quand on relève une personne, c’est toute une famille qui se remet debout.</span>
            </p>
            <Link
              href="/qui-sommes-nous"
              className="group mt-10 inline-flex items-center gap-2 font-semibold text-bleu-profond"
            >
              <span className="border-b border-bleu-profond/30 pb-0.5 transition-colors group-hover:border-bleu-profond">
                Lire notre histoire
              </span>
              <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── Deux façons d'agir ───────────── */}
      <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="titre-missions">
        <Sceau plein className="absolute top-20 -right-72 size-[36rem] text-lavande" />
        <div className="conteneur relative">
          <div className="max-w-2xl">
            <Etiquette>Nos actions</Etiquette>
            <h2 id="titre-missions" className="mt-4 text-[2rem] sm:text-[2.6rem]">
              Deux façons d’agir, un même cap : la dignité.
            </h2>
          </div>

          <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-10 lg:gap-20">
            {missions.map((m, i) => (
              <article key={m.numero} className={`apparait ${i === 1 ? "md:mt-24" : ""}`}>
                <div className="relative pt-16 sm:pt-20">
                  <span
                    aria-hidden
                    className="absolute top-0 -left-1 font-serif text-[7.5rem] leading-none font-semibold text-bleu-vie/15 italic select-none sm:text-[9.5rem]"
                  >
                    {m.numero}
                  </span>
                  <h3 className="relative text-[1.75rem] sm:text-[2rem]">{m.titre}</h3>
                </div>
                <p className="mt-3 font-serif text-lg text-bleu-profond italic">{m.accroche}</p>
                <ul className="mt-6 space-y-3 border-t border-bleu-vie/25 pt-6">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <PuceSceau />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Sur le terrain : carnet de timbres ───────────── */}
      <section className="bg-lavande py-24 lg:py-32" aria-labelledby="titre-terrain">
        <div className="conteneur">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <Etiquette>Sur le terrain</Etiquette>
              <h2 id="titre-terrain" className="mt-4 text-[2rem] sm:text-[2.6rem]">
                Des actions qui ont déjà voyagé.
              </h2>
            </div>
            <p className="max-w-sm text-bleu-profond lg:text-right">
              Et partout où c’est nécessaire, une aide financière directe à des familles.
            </p>
          </div>

          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {terrain.map((t) => (
              <div key={t.pays} className="apparait">
                <Timbre pays={t.pays} code={t.code} rotation={t.rotation}>
                  {t.texte}
                </Timbre>
              </div>
            ))}
          </div>

          {/* La prochaine étape, comme une lettre épinglée */}
          <div className="apparait relative mx-auto mt-20 max-w-3xl">
            <Scotch className="-top-3 -left-4 -rotate-[24deg]" />
            <Scotch className="-right-4 -bottom-3 -rotate-[24deg]" />
            <div className="grid gap-4 bg-bleu-nuit p-8 text-white shadow-papier sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8 sm:p-10">
              <p className="font-serif text-xl text-ruban italic">Cette année</p>
              <p className="font-serif text-[1.5rem] leading-snug font-semibold text-white">{projetAnnee}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Boutique solidaire ───────────── */}
      <section className="py-24 lg:py-32" aria-labelledby="titre-boutique">
        <div className="conteneur grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Etiquette>La boutique solidaire</Etiquette>
            <h2 id="titre-boutique" className="mt-4 text-[2rem] sm:text-[2.6rem]">
              Acheter ici, c’est déjà <span className="italic">agir</span>.
            </h2>

            <ol className="mt-10 space-y-6">
              {etapesAchat.map((e, i) => (
                <li key={e.titre} className="flex items-baseline gap-5">
                  <span className="w-8 shrink-0 font-serif text-3xl leading-none text-bleu-vie italic">{i + 1}.</span>
                  <p>
                    <span className="font-semibold text-bleu-nuit">{e.titre}</span> {e.texte}
                  </p>
                </li>
              ))}
            </ol>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-bleu-vie/25 pt-6 text-[15px] text-bleu-profond">
              <li>Retrait sur place ou en point relais</li>
              <li>Retour ou échange sous 20 jours</li>
              <li>Paiement sécurisé</li>
            </ul>

            <ButtonLink href="/boutique" variant="secondaire" className="mt-10">
              Entrer dans la boutique
            </ButtonLink>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:gap-x-8">
            {rayons.map((r, i) => (
              <Link
                key={r.titre}
                href={`/boutique#${r.id}`}
                className={`apparait block rounded-sm ${i % 2 === 1 ? "translate-y-10" : ""}`}
                aria-label={`${r.titre} — voir dans la boutique`}
              >
                <EtiquetteSuspendue titre={r.titre} texte={r.court} rotation={r.rotation} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Nous soutenir ───────────── */}
      <section className="grain overflow-hidden bg-bleu-profond py-24 text-white lg:py-32" aria-labelledby="titre-soutenir">
        <Sceau className="absolute -right-40 -bottom-56 -z-10 size-[36rem] text-white/10" />
        <div className="conteneur">
          <div className="max-w-2xl">
            <Etiquette clair>Nous soutenir</Etiquette>
            <h2 id="titre-soutenir" className="mt-4 text-[2rem] text-white sm:text-[2.6rem]">
              Il y a mille façons d’être là. En voici deux.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="apparait flex flex-col rounded-carte bg-white p-8 text-texte sm:p-10">
              <h3 className="text-[1.6rem]">Donner chaque mois</h3>
              <p className="mt-3 flex-1">
                Un don régulier, même modeste, nous permet de prévoir — et donc d’accompagner une famille dans la
                durée, pas seulement le temps d’une urgence.
              </p>
              <ButtonLink href="/faire-un-don" className="mt-8 self-start">
                Je donne chaque mois
              </ButtonLink>
            </div>
            <div className="apparait flex flex-col rounded-carte border border-white/30 p-8 sm:p-10">
              <h3 className="text-[1.6rem] text-white">Donner de son temps</h3>
              <p className="mt-3 flex-1 text-white">
                Préparation des commandes, animations, communication, accompagnement : chaque compétence trouve sa
                place parmi nos bénévoles.
              </p>
              <ButtonLink href="/nous-soutenir" variant="contour-clair" className="mt-8 self-start">
                Je deviens bénévole
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
