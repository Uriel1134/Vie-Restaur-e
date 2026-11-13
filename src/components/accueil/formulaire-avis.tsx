"use client";

import { useActionState, useRef, useState } from "react";
import { Cachet, Sceau } from "@/components/ui/decor";
import { deposerAvis, type EtatAvis } from "@/lib/avis-actions";

export function Etoile({ pleine, className = "" }: { pleine: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        d="M12 2.8l2.83 5.73 6.33.92-4.58 4.46 1.08 6.3L12 17.24l-5.66 2.97 1.08-6.3L2.84 9.45l6.33-.92z"
        fill={pleine ? "var(--color-ruban)" : "none"}
        stroke={pleine ? "var(--color-ruban)" : "currentColor"}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const LIBELLES = ["", "Décevant", "Moyen", "Bien", "Très bien", "Excellent"];

/** Choix de la note : 5 boutons radio habillés en étoiles. */
function ChoixNote({ defaut }: { defaut?: number }) {
  const [note, setNote] = useState(defaut ?? 0);
  const [survol, setSurvol] = useState(0);
  const affichee = survol || note;
  return (
    <fieldset>
      <legend className="text-[15px] font-medium text-bleu-nuit">Votre note</legend>
      <div className="mt-2 flex items-center gap-3" onMouseLeave={() => setSurvol(0)}>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="cursor-pointer p-0.5" onMouseEnter={() => setSurvol(n)}>
              <input
                type="radio"
                name="note"
                value={n}
                checked={note === n}
                onChange={() => setNote(n)}
                className="peer sr-only"
                required
              />
              <span className="sr-only">
                {n} étoile{n > 1 ? "s" : ""}
              </span>
              <Etoile
                pleine={n <= affichee}
                className="size-9 text-bleu-vie/50 transition-transform duration-150 peer-focus-visible:scale-110 hover:scale-110"
              />
            </label>
          ))}
        </div>
        <span className="font-serif text-bleu-profond italic" aria-live="polite">
          {LIBELLES[affichee]}
        </span>
      </div>
    </fieldset>
  );
}

const champ =
  "block w-full border-0 border-b border-dashed border-bleu-vie/50 bg-transparent px-0 py-2 text-texte placeholder:text-texte/40 focus:border-solid focus:border-bleu-profond focus:ring-0 focus:outline-none";

/** Formulaire d'avis en forme de carte postale : message à gauche, adresse et timbre à droite. */
export function FormulaireAvis() {
  const [etat, action, envoi] = useActionState<EtatAvis, FormData>(deposerAvis, {});
  // Heure de la première interaction : un robot qui poste directement n'en a pas.
  const debut = useRef<HTMLInputElement>(null);
  const marquerDebut = () => {
    if (debut.current && !debut.current.value) debut.current.value = String(Date.now());
  };

  if (etat.ok) {
    return (
      <div className="entree-note relative overflow-hidden bg-white p-8 text-center shadow-papier sm:p-12">
        <Sceau plein className="absolute -right-16 -bottom-16 size-56 text-lavande" />
        <Cachet className="relative mx-auto size-24 rotate-[-10deg] text-bleu-profond/70" />
        <p className="relative mt-6 font-serif text-[1.7rem] font-semibold text-bleu-nuit">Merci, votre carte est bien partie !</p>
        <p className="relative mx-auto mt-3 max-w-md leading-relaxed">
          Votre avis sera publié après une rapide relecture par l’association. Il compte beaucoup pour nous.
        </p>
      </div>
    );
  }

  const c = etat.champs ?? {};

  return (
    <form action={action} onFocusCapture={marquerDebut} onPointerDownCapture={marquerDebut} className="relative bg-white shadow-papier">
      {/* Liseré « par avion » */}
      <div
        aria-hidden
        className="h-2.5 bg-[repeating-linear-gradient(135deg,var(--color-ruban)_0_14px,transparent_14px_28px,var(--color-bleu-vie)_28px_42px,transparent_42px_56px)]"
      />
      <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1.15fr_0.85fr] md:gap-0">
        {/* Côté message */}
        <div className="md:border-r md:border-bleu-vie/25 md:pr-8">
          <p className="font-serif text-lg text-bleu-vie italic">Chère équipe de Vie Restaurée,</p>
          <label htmlFor="avis-message" className="sr-only">
            Votre message
          </label>
          <textarea
            id="avis-message"
            name="message"
            required
            minLength={10}
            maxLength={600}
            rows={6}
            defaultValue={c.message}
            placeholder="Racontez-nous votre expérience : un achat, un atelier, un accompagnement…"
            className="mt-3 block w-full resize-none border-0 bg-[repeating-linear-gradient(transparent_0_2.05rem,rgb(106_115_158/0.25)_2.05rem_2.1rem)] bg-local px-0 text-lg leading-[2.1rem] text-texte placeholder:text-texte/40 focus:ring-0 focus:outline-none"
          />
        </div>

        {/* Côté adresse + timbre */}
        <div className="flex flex-col gap-5 md:pl-8">
          <div className="flex items-start justify-between gap-4">
            <ChoixNote defaut={Number(c.note) || undefined} />
            <div aria-hidden className="hidden shrink-0 rotate-3 border-[5px] border-dotted border-lavande bg-white p-1 shadow-douce sm:block">
              <div className="grid size-16 place-items-center bg-bleu-vie">
                <Sceau plein className="size-9 text-white" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="avis-nom" className="text-sm font-medium text-bleu-nuit">
              Votre prénom
            </label>
            <input id="avis-nom" name="nom" required minLength={2} maxLength={60} autoComplete="given-name" defaultValue={c.nom} className={champ} />
          </div>
          <div>
            <label htmlFor="avis-lieu" className="text-sm font-medium text-bleu-nuit">
              Votre ville <span className="font-normal text-texte/60">(facultatif)</span>
            </label>
            <input id="avis-lieu" name="lieu" maxLength={60} autoComplete="address-level2" defaultValue={c.lieu} className={champ} />
          </div>

          {/* Anti-robots : champ invisible + heure d'ouverture */}
          <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
            <label>
              Site web
              <input name="site_web" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <input ref={debut} type="hidden" name="debut" defaultValue="" />

          <label className="flex items-start gap-3 text-sm leading-snug text-texte/80">
            <input type="checkbox" name="accord" required className="mt-0.5 size-4 shrink-0 accent-bleu-profond" />
            J’accepte que mon avis (prénom, ville, note et message) soit publié sur le site après relecture.
          </label>

          {etat.erreur && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-800">
              {etat.erreur}
            </p>
          )}

          <button
            type="submit"
            disabled={envoi}
            className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-bleu-profond px-7 text-[15px] font-semibold text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-bleu-nuit disabled:opacity-60"
          >
            {envoi ? "Envoi…" : "Poster mon avis"}
          </button>
        </div>
      </div>
    </form>
  );
}
