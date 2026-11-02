import type { CSSProperties, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Sceau ondulé — forme dérivée du sceau du logo, utilisée comme motif */
/* (jamais comme logo : le logo officiel reste le PNG fourni).        */
/* ------------------------------------------------------------------ */

function cheminSceau(lobes = 10, amplitude = 0.055, pas = 360) {
  const points: string[] = [];
  for (let i = 0; i <= pas; i++) {
    const t = (i / pas) * Math.PI * 2;
    const r = 0.5 - amplitude + amplitude * Math.cos(lobes * t);
    const x = 0.5 + r * Math.cos(t);
    const y = 0.5 + r * Math.sin(t);
    points.push(`${(x * 100).toFixed(2)},${(y * 100).toFixed(2)}`);
  }
  return `M${points.join("L")}Z`;
}

const SCEAU = cheminSceau();

export function Sceau({
  className = "",
  plein = false,
  style,
}: {
  className?: string;
  plein?: boolean;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className} style={style}>
      <path
        d={SCEAU}
        fill={plein ? "currentColor" : "none"}
        stroke={plein ? "none" : "currentColor"}
        strokeWidth={plein ? 0 : 0.35}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Petite puce en forme de sceau, pour les listes. */
export function PuceSceau({ className = "" }: { className?: string }) {
  return <Sceau plein className={`mt-[0.45em] size-3 shrink-0 text-bleu-vie ${className}`} />;
}

/* ------------------------------------------------------------------ */
/* Ruban & scotch                                                     */
/* ------------------------------------------------------------------ */

/** Ruban jaune « Association » — un seul par page maximum (charte). */
export function Ruban({ children = "Association", className = "" }: { children?: string; className?: string }) {
  return (
    <span className={`inline-block -rotate-[4deg] drop-shadow-[2px_4px_5px_rgb(0_0_0/0.18)] ${className}`}>
      <span className="bord-dechire block bg-ruban px-7 py-2 font-serif text-xl text-white">{children}</span>
    </span>
  );
}

/** Morceau de scotch translucide pour « coller » une carte. */
export function Scotch({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <span
      aria-hidden
      style={style}
      className={`bord-dechire pointer-events-none absolute block z-10 h-7 w-28 bg-ruban/85 ${className}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Trait manuscrit sous un mot                                        */
/* ------------------------------------------------------------------ */

export function TraitManuscrit({ children, couleur = "var(--color-ruban)" }: { children: ReactNode; couleur?: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className="absolute -bottom-[0.18em] left-[-2%] h-[0.32em] w-[104%] overflow-visible"
      >
        <path
          d="M3 15 C 60 6, 120 4, 180 9 S 270 17, 297 7"
          fill="none"
          stroke={couleur}
          strokeWidth="5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          className="animate-trait"
        />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Étiquette de section — italique manuscrit plutôt qu'un sur-titre   */
/* ------------------------------------------------------------------ */

export function Etiquette({ children, clair = false }: { children: ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 font-serif text-lg italic ${clair ? "text-white/85" : "text-bleu-vie"}`}>
      <span aria-hidden className={`h-px w-10 ${clair ? "bg-white/50" : "bg-bleu-vie/60"}`} />
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Timbre & cachet postal — pour les pays d'intervention              */
/* ------------------------------------------------------------------ */

export function Cachet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className={className}>
      <defs>
        <path id="cachet-cercle" d="M60 60 m-41 0 a41 41 0 1 1 82 0 a41 41 0 1 1 -82 0" />
      </defs>
      <g fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="60" cy="60" r="52" />
        <circle cx="60" cy="60" r="31" />
      </g>
      <text fill="currentColor" fontSize="10.5" letterSpacing="3.2" fontFamily="var(--font-inter)" fontWeight="600">
        <textPath href="#cachet-cercle">VIE RESTAURÉE · DEPUIS 2022 ·</textPath>
      </text>
      <text x="60" y="66" textAnchor="middle" fill="currentColor" fontSize="17" fontFamily="var(--font-lora)" fontStyle="italic">
        V.R.
      </text>
    </svg>
  );
}

export function Timbre({
  pays,
  code,
  children,
  rotation = 0,
  couleurFond = "var(--color-lavande)",
}: {
  pays: string;
  code: string;
  children: ReactNode;
  rotation?: number;
  couleurFond?: string;
}) {
  return (
    <figure
      className="group relative transition-transform duration-500 ease-out hover:rotate-0"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div
        className="bg-white p-3 shadow-papier"
        style={{ border: `9px dotted ${couleurFond}`, backgroundClip: "padding-box" }}
      >
        <div className="relative flex min-h-64 flex-col justify-between overflow-hidden border border-bleu-vie/40 p-6">
          <Sceau className="absolute -right-10 -bottom-10 size-40 text-bleu-vie/15" plein />
          <span className="font-sans text-xs font-semibold tracking-[0.25em] text-bleu-vie">{code}</span>
          <div className="relative">
            <p className="font-serif text-[2rem] leading-none font-semibold text-bleu-nuit">{pays}</p>
            <figcaption className="mt-3 text-[15px] leading-relaxed">{children}</figcaption>
          </div>
        </div>
      </div>
      <Cachet className="absolute -top-8 -right-6 size-24 rotate-[-14deg] text-bleu-profond/55 transition-transform duration-500 group-hover:rotate-[-4deg]" />
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Étiquette suspendue — pour les rayons de la boutique               */
/* ------------------------------------------------------------------ */

export function EtiquetteSuspendue({
  titre,
  texte,
  rotation = 0,
  delai = 0,
}: {
  titre: string;
  texte: string;
  rotation?: number;
  delai?: number;
}) {
  return (
    <div className="flex flex-col items-center">
      {/* ficelle */}
      <svg aria-hidden viewBox="0 0 40 80" className="relative z-10 h-20 w-10 text-bleu-vie/70">
        <path d="M20 0 C 8 22, 32 40, 20 72" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <div
        className="relative -mt-[30px] w-full origin-top transition-transform duration-500 ease-out hover:rotate-0"
        style={{ transform: `rotate(${rotation}deg)`, transitionDelay: `${delai}ms` }}
      >
        <div
          className="bg-lavande px-5 pt-12 pb-6 text-center shadow-papier"
          style={{ clipPath: "polygon(22% 0, 78% 0, 100% 14%, 100% 100%, 0 100%, 0 14%)" }}
        >
          <span aria-hidden className="absolute top-4 left-1/2 size-4 -translate-x-1/2 rounded-full border-2 border-bleu-vie/50 bg-white" />
          <p className="font-serif text-xl leading-snug font-semibold text-bleu-nuit">{titre}</p>
          <p className="mt-2 text-[15px] leading-snug">{texte}</p>
        </div>
      </div>
    </div>
  );
}
