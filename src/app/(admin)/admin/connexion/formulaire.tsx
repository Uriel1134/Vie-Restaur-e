"use client";

import { useActionState } from "react";
import { seConnecter, type EtatConnexion } from "./actions";

export function FormulaireConnexion({ messageInitial }: { messageInitial?: string }) {
  const [etat, action, enCours] = useActionState<EtatConnexion, FormData>(seConnecter, {
    erreur: messageInitial,
  });

  const champ =
    "mt-2 block w-full rounded-xl border border-bleu-vie/30 bg-white px-4 py-3 focus:border-bleu-profond focus:ring-2 focus:ring-bleu-profond/20 focus:outline-none";

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="email" className="text-[15px] font-medium text-bleu-nuit">
          E-mail
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className={champ} />
      </div>
      <div>
        <label htmlFor="motDePasse" className="text-[15px] font-medium text-bleu-nuit">
          Mot de passe
        </label>
        <input
          id="motDePasse"
          name="motDePasse"
          type="password"
          autoComplete="current-password"
          required
          className={champ}
        />
      </div>
      {etat.erreur && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[15px] text-red-800">
          {etat.erreur}
        </p>
      )}
      <button
        type="submit"
        disabled={enCours}
        className="flex min-h-12 w-full items-center justify-center rounded-full bg-bleu-profond font-semibold text-white transition-colors hover:bg-bleu-nuit disabled:opacity-60"
      >
        {enCours ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
