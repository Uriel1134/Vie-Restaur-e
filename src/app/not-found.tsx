import { ButtonLink } from "@/components/ui/button-link";
import { Sceau } from "@/components/ui/decor";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-lavande">
      <Sceau plein className="absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 text-white" />
      <div className="conteneur relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-serif text-lg text-bleu-vie italic">Erreur 404</p>
        <h1 className="mt-4 max-w-2xl text-[2.5rem] sm:text-6xl">
          Cette page s’est <span className="italic">égarée</span>.
        </h1>
        <p className="mt-6 max-w-md text-lg">
          Pas d’inquiétude : on vous raccompagne. Tout ce que vous cherchez commence sur la page d’accueil.
        </p>
        <ButtonLink href="/" variant="secondaire" className="mt-10">
          Revenir à l’accueil
        </ButtonLink>
      </div>
    </section>
  );
}
