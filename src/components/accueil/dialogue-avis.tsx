"use client";

import { useRef } from "react";
import { CloseIcon } from "@/components/icons";
import { FormulaireAvis } from "./formulaire-avis";

/** Bouton « Laisser un avis » + fenêtre (dialog natif : Échap, focus et accessibilité gérés par le navigateur). */
export function DialogueAvis({ libelle = "Laisser un avis", className = "" }: { libelle?: string; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" onClick={() => ref.current?.showModal()} className={className}>
        {libelle}
      </button>
      <dialog
        ref={ref}
        aria-label="Laisser un avis"
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        className="dialogue-avis m-auto w-[calc(100%-2rem)] max-w-3xl overflow-visible bg-transparent p-0 backdrop:bg-transparent"
      >
        <div className="relative">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Fermer"
            className="absolute -top-4 -right-2 z-10 grid size-11 place-items-center rounded-full bg-white text-bleu-nuit shadow-papier transition-transform hover:rotate-90 sm:-right-4"
          >
            <CloseIcon className="size-5" />
          </button>
          <div className="max-h-[calc(100dvh-3rem)] overflow-y-auto">
            <FormulaireAvis />
          </div>
        </div>
      </dialog>
    </>
  );
}
