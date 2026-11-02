import { ButtonLink } from "@/components/ui/button-link";
import { Sceau } from "@/components/ui/decor";

/** Bandeau de fin de page : une seule action, claire. */
export function BandeauContact({
  titre = "Une question ? Parlons-en simplement.",
  texte = "Notre permanence vous répond du lundi au vendredi, de 9 h 30 à 17 h. En dehors de ces horaires, écrivez-nous : nous revenons vers vous rapidement.",
  action = "Nous contacter",
  href = "/contact",
}: {
  titre?: string;
  texte?: string;
  action?: string;
  href?: string;
}) {
  // Bleu profond plutôt qu'ardoise : texte blanc courant lisible (contraste 6,8:1).
  return (
    <section className="grain overflow-hidden bg-bleu-profond text-white">
      <Sceau className="absolute -top-32 -right-32 -z-10 size-[30rem] text-white/10" />
      <div className="conteneur grid gap-8 py-20 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-2xl">
          <h2 className="text-[2rem] text-white sm:text-[2.4rem]">{titre}</h2>
          <p className="mt-4 text-white">{texte}</p>
        </div>
        <ButtonLink href={href} className="self-start md:self-auto">
          {action}
        </ButtonLink>
      </div>
    </section>
  );
}
