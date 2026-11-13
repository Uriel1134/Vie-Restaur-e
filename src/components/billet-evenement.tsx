import Link from "next/link";
import type { Evenement } from "@/lib/types";

const partie = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", ...opts }).format(new Date(iso));

/**
 * Billet d'un rendez-vous : talon daté + perforation, comme un ticket d'entrée.
 * `fond` = couleur de la section derrière (pour les encoches de la perforation).
 */
export function BilletEvenement({
  ev,
  etiquette = "Prochain rendez-vous",
  lienAgenda = false,
  fond = "bg-lavande",
  sombre = false,
}: {
  ev: Evenement;
  etiquette?: string;
  lienAgenda?: boolean;
  fond?: string;
  /** Section foncée derrière : talon jaune ruban pour rester lisible. */
  sombre?: boolean;
}) {
  const talon = sombre ? "bg-ruban text-bleu-nuit" : "bg-bleu-nuit text-white";
  const doux = sombre ? "text-bleu-nuit/70" : "text-white/70";
  return (
    <article className="apparait flex h-full overflow-hidden rounded-carte bg-white text-texte shadow-papier">
      <div className={`flex w-24 shrink-0 flex-col items-center justify-center px-3 py-6 text-center sm:w-32 ${talon}`}>
        <span className={`text-sm tracking-[0.2em] uppercase ${doux}`}>{partie(ev.date, { month: "short" })}</span>
        <span className="font-serif text-[2.8rem] leading-none font-semibold sm:text-[3.2rem]">
          {partie(ev.date, { day: "numeric" })}
        </span>
        <span className={`mt-1 text-sm first-letter:uppercase ${doux}`}>{partie(ev.date, { weekday: "short" })}</span>
        <span className={`text-sm ${doux}`}>{partie(ev.date, { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
      <div aria-hidden className="relative w-0 border-l-2 border-dashed border-bleu-vie/30">
        <span className={`absolute -top-3 -left-3 size-6 rounded-full ${fond}`} />
        <span className={`absolute -bottom-3 -left-3 size-6 rounded-full ${fond}`} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-8">
        <p className="font-serif text-bleu-vie italic">{etiquette}</p>
        <h3 className="mt-2 text-[1.35rem] leading-snug sm:text-[1.5rem]">{ev.titre}</h3>
        <p className="mt-1 text-[15px] text-bleu-profond">{ev.lieu}</p>
        {ev.description && <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed">{ev.description}</p>}
        <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-5 text-[15px] font-semibold">
          {ev.lien_inscription && (
            <a href={ev.lien_inscription} target="_blank" rel="noopener" className="text-bleu-profond hover:underline">
              S’inscrire
            </a>
          )}
          {lienAgenda && (
            <Link href="/actualites#agenda" className="text-bleu-profond hover:underline">
              Tout l’agenda
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
