import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { Etiquette, Sceau, Scotch } from "@/components/ui/decor";
import { site, whatsappLink } from "@/config/site";

type Question = { q: string; r: React.ReactNode; texte: string };

/** Réponses fondées sur le brief, les CGV et le fonctionnement réel (commandes par WhatsApp). */
const themes: { titre: string; questions: Question[] }[] = [
  {
    titre: "L’association",
    questions: [
      {
        q: "À qui s’adresse Vie Restaurée ?",
        texte:
          "En priorité aux familles monoparentales, et en particulier aux mères seules, qui ont besoin d’un soutien moral, matériel ou d’un accompagnement vers l’autonomie.",
        r: (
          <>
            En priorité aux <strong>familles monoparentales</strong>, et en particulier aux mères seules, qui ont besoin
            d’un soutien moral, matériel ou d’un accompagnement vers l’autonomie.
          </>
        ),
      },
      {
        q: "Comment demander de l’aide ?",
        texte:
          "Écrivez-nous sur WhatsApp ou via la page Contact. Votre message est lu avec attention et reste confidentiel.",
        r: (
          <>
            Écrivez-nous sur WhatsApp ou via la page <Link href="/contact">Contact</Link>. Votre message est lu avec
            attention et reste <strong>confidentiel</strong>. Notre permanence répond {site.hours.charAt(0).toLowerCase() + site.hours.slice(1)}.
          </>
        ),
      },
      {
        q: "Où agissez-vous ?",
        texte:
          "Nous sommes déjà intervenus au Congo, en Haïti et au Cameroun, et nous aidons directement des familles partout où c’est nécessaire.",
        r: (
          <>
            Nous sommes déjà intervenus au <strong>Congo, en Haïti et au Cameroun</strong>, et nous aidons directement des
            familles partout où c’est nécessaire. Notre projet : ouvrir des bureaux dans le Nord, l’Ouest et à Douala, au
            Cameroun.
          </>
        ),
      },
    ],
  },
  {
    titre: "La boutique",
    questions: [
      {
        q: "Comment commander un article ?",
        texte:
          "Appuyez sur « Commander » sur la fiche de l’article : WhatsApp s’ouvre avec un message prêt. Nous organisons ensuite avec vous le modèle, le paiement et le retrait.",
        r: (
          <>
            Appuyez sur <strong>« Commander »</strong> sur la fiche de l’article : WhatsApp s’ouvre avec un message prêt.
            Nous organisons ensuite avec vous le modèle, le paiement et le retrait.
          </>
        ),
      },
      {
        q: "Pourquoi « Prix sur demande » ?",
        texte:
          "Certaines créations existent en plusieurs modèles ou se personnalisent : nous vous donnons le prix exact sur WhatsApp, sans engagement.",
        r: "Certaines créations existent en plusieurs modèles ou se personnalisent : nous vous donnons le prix exact sur WhatsApp, sans engagement.",
      },
      {
        q: "Comment payer et recevoir ma commande ?",
        texte:
          "Le moyen de paiement est convenu avec vous : carte bancaire, PayPal, virement, Wero ou Mobile Money. Retrait sur place ou envoi en point relais.",
        r: (
          <>
            Le moyen de paiement est convenu avec vous : carte bancaire, PayPal, virement, Wero ou Mobile Money. Ensuite,
            <strong> retrait sur place</strong> ou envoi en <strong>point relais</strong>.
          </>
        ),
      },
      {
        q: "Puis-je retourner ou échanger un article ?",
        texte:
          "Oui, sous 20 jours après réception, pour tout article non personnalisé, non porté et dans son état d’origine.",
        r: (
          <>
            Oui, <strong>sous 20 jours</strong> après réception, pour tout article non personnalisé, non porté et dans son
            état d’origine. Le détail figure dans nos <Link href="/cgv">conditions générales de vente</Link>.
          </>
        ),
      },
    ],
  },
  {
    titre: "Nous aider",
    questions: [
      {
        q: "Comment faire un don ?",
        texte: "Rendez-vous sur la page Faire un don : un don ponctuel ou mensuel, même modeste, nous aide à accompagner les familles dans la durée.",
        r: (
          <>
            Rendez-vous sur la page <Link href="/faire-un-don">Faire un don</Link> : un don ponctuel ou mensuel, même
            modeste, nous aide à accompagner les familles dans la durée.
          </>
        ),
      },
      {
        q: "Comment devenir bénévole ?",
        texte:
          "Remplissez le formulaire de la page Nous soutenir : vos envies, vos compétences, vos disponibilités. Nous vous recontactons pour un premier échange, sans engagement.",
        r: (
          <>
            Remplissez le formulaire de la page <Link href="/nous-soutenir">Nous soutenir</Link> : vos envies, vos
            compétences, vos disponibilités. Nous vous recontactons pour un premier échange, sans engagement.
          </>
        ),
      },
      {
        q: "Puis-je réserver un atelier ou une animation ?",
        texte:
          "Oui : ateliers créatifs, dessin, animations pour écoles et événements. Indiquez-nous la date, le lieu et le nombre de participants sur WhatsApp.",
        r: (
          <>
            Oui : ateliers créatifs, dessin, animations pour écoles et événements. Indiquez-nous la date, le lieu et le
            nombre de participants sur WhatsApp, ou voyez le rayon <Link href="/boutique#animations">Ateliers &amp; animations</Link>.
          </>
        ),
      },
    ],
  },
];

/** Données structurées FAQ (meilleure présentation dans Google). Contenu statique, échappé. */
function DonneesStructurees() {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: themes.flatMap((t) =>
      t.questions.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.texte } })),
    ),
  };
  return (
    <script
      type="application/ld+json"
      // Contenu statique défini ci-dessus : aucune donnée saisie par un visiteur.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }}
    />
  );
}

/** FAQ en accordéon (une seule question ouverte à la fois), regroupée par thème. */
export function SectionFaq() {
  const debuts = themes.map((_, i) => themes.slice(0, i).reduce((n, t) => n + t.questions.length, 0));
  return (
    <section className="py-16 sm:py-24 lg:py-28" aria-labelledby="titre-faq">
      <DonneesStructurees />
      <div className="conteneur grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Etiquette>Questions fréquentes</Etiquette>
          <h2 id="titre-faq" className="mt-4 text-[2rem] sm:text-[2.6rem]">
            Vous vous demandez <span className="italic">peut-être</span>…
          </h2>
          <p className="mt-4 text-lg leading-relaxed">Les réponses aux questions qu’on nous pose le plus souvent.</p>

          <div className="relative mt-10 rotate-[-1deg]">
            <Scotch className="-top-3 left-8 -rotate-6" />
            <div className="relative overflow-hidden bg-bleu-nuit p-7 text-white shadow-papier">
              <Sceau plein className="absolute -right-12 -bottom-12 size-40 text-white/[0.07]" />
              <p className="relative font-serif text-xl font-semibold">Une autre question ?</p>
              <p className="relative mt-2 text-white/85">Écrivez-nous, on vous répond simplement et rapidement.</p>
              <a
                href={whatsappLink("Bonjour, j’ai une question :")}
                target="_blank"
                rel="noopener"
                className="relative mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-ruban px-6 text-[15px] font-semibold text-bleu-nuit transition-colors hover:bg-ruban-hover"
              >
                <WhatsAppIcon className="size-5" /> Poser ma question
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {themes.map((t, ti) => (
            <div key={t.titre}>
              <p className="flex items-center gap-3 font-serif text-lg text-bleu-vie italic">
                <Sceau plein className="size-3.5 text-ruban" />
                {t.titre}
              </p>
              <div className="mt-4 divide-y divide-bleu-vie/20 border-y border-bleu-vie/20">
                {t.questions.map((x, qi) => {
                  const numero = debuts[ti] + qi + 1;
                  return (
                    <details key={x.q} name="faq" className="faq group">
                      <summary className="flex cursor-pointer list-none items-center gap-4 py-5 [&::-webkit-details-marker]:hidden">
                        <span className="w-7 shrink-0 font-serif text-sm text-bleu-vie italic">{String(numero).padStart(2, "0")}</span>
                        <span className="flex-1 font-serif text-[1.2rem] leading-snug font-semibold text-bleu-nuit transition-colors group-hover:text-bleu-profond sm:text-[1.3rem]">
                          {x.q}
                        </span>
                        <span
                          aria-hidden
                          className="relative grid size-9 shrink-0 place-items-center rounded-full border border-bleu-vie/40 transition-colors group-open:border-ruban group-open:bg-ruban"
                        >
                          <span className="absolute h-0.5 w-3.5 rounded bg-bleu-nuit" />
                          <span className="absolute h-3.5 w-0.5 rounded bg-bleu-nuit transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                        </span>
                      </summary>
                      <div className="pr-12 pb-6 pl-11 leading-relaxed text-texte/85 [&_a]:font-medium [&_a]:text-bleu-profond [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-bleu-nuit">
                        {x.r}
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
