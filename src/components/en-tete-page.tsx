import type { ReactNode } from "react";
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
      <div className="conteneur relative py-16 sm:py-24">
        {etiquette && <Etiquette>{etiquette}</Etiquette>}
        <h1 className="mt-4 max-w-4xl text-[2.5rem] leading-[1.08] sm:text-6xl">{titre}</h1>
        {intro && <p className="mt-6 max-w-2xl font-serif text-xl leading-relaxed text-bleu-profond italic">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
