"use client";

import Link from "next/link";
import { useActionState, type ReactNode } from "react";

export type EtatFormulaire = { erreur?: string };
type Action = (etat: EtatFormulaire, formData: FormData) => Promise<EtatFormulaire>;

/** Formulaire d'édition : affiche l'erreur renvoyée par la Server Action et l'état d'envoi. */
export function FormulaireAdmin({
  action,
  children,
  retour,
  libelle = "Enregistrer",
}: {
  action: Action;
  children: ReactNode;
  retour: string;
  libelle?: string;
}) {
  const [etat, envoyer, enCours] = useActionState<EtatFormulaire, FormData>(action, {});

  return (
    <form action={envoyer} className="space-y-6">
      {children}
      {etat.erreur && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[15px] text-red-800">
          {etat.erreur}
        </p>
      )}
      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-3 border-t border-bleu-vie/15 bg-lavande/95 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:bg-white/90">
        <button
          type="submit"
          disabled={enCours}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-bleu-profond px-7 text-[15px] font-semibold text-white transition-colors hover:bg-bleu-nuit disabled:opacity-60"
        >
          {enCours ? "Enregistrement…" : libelle}
        </button>
        <Link href={retour} className="px-3 text-[15px] font-medium text-bleu-profond hover:underline">
          Annuler
        </Link>
      </div>
    </form>
  );
}

/** Bouton de suppression avec confirmation. */
export function BoutonSupprimer({ action, question }: { action: () => Promise<void>; question: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(question)) e.preventDefault();
      }}
    >
      <button type="submit" className="text-[15px] font-medium text-red-700 hover:underline">
        Supprimer
      </button>
    </form>
  );
}
