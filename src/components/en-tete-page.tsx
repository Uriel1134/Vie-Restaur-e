import type { CSSProperties, ReactNode } from "react";
import { Etiquette, Sceau } from "@/components/ui/decor";

/** En-tête commun des pages intérieures. */
export function EnTetePage({
  etiquette,
  titre,
  intro,
  children,
}: {
  etiquette?: string;
  titre: ReactNode;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-lavande">
      <Sceau plein className="absolute -top-24 -right-40 size-[28rem] text-white/70 sm:-right-24" />
      <Sceau className="absolute -bottom-40 left-1/3 size-[22rem] text-bleu-vie/15" />
      <div className="conteneur relative pt-[calc(var(--entete)+3.5rem)] pb-16 sm:pt-[calc(var(--entete)+5rem)] sm:pb-24">
        {etiquette && (
          <div className="entree">
            <Etiquette>{etiquette}</Etiquette>
          </div>
        )}
        <h1 style={{ "--delai": "120ms" } as CSSProperties} className="entree mt-4 max-w-4xl text-[2.5rem] leading-[1.08] sm:text-6xl">{titre}</h1>
        {intro && <p style={{ "--delai": "260ms" } as CSSProperties} className="entree mt-6 max-w-2xl font-serif text-xl leading-relaxed text-bleu-profond italic">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
