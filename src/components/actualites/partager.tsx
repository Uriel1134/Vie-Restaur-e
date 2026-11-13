"use client";

import { WhatsAppIcon } from "@/components/icons";

/** Partage WhatsApp avec le lien réel de la page (connu seulement dans le navigateur). */
export function PartagerWhatsApp({ titre }: { titre: string }) {
  return (
    <button
      type="button"
      onClick={() =>
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${titre} — Vie Restaurée\n${window.location.href}`)}`,
          "_blank",
          "noopener",
        )
      }
      className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border-2 border-bleu-vie px-6 text-[15px] whitespace-nowrap font-semibold text-bleu-profond transition-colors hover:bg-lavande"
    >
      <WhatsAppIcon className="size-5" /> Partager sur WhatsApp
    </button>
  );
}
