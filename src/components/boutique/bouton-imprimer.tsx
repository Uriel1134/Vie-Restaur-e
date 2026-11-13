"use client";

/** « Télécharger en PDF » : la fenêtre d'impression du navigateur permet « Enregistrer au format PDF ». */
export function BoutonImprimer() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-bleu-vie bg-white px-5 text-[15px] font-semibold text-bleu-profond transition-colors hover:bg-lavande"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-5">
        <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />
      </svg>
      Télécharger en PDF
    </button>
  );
}
