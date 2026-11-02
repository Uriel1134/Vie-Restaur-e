import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/config/site";

/** Bouton WhatsApp flottant — toujours visible sur mobile (charte). */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Bonjour, je vous contacte depuis le site de Vie Restaurée.")}
      target="_blank"
      rel="noopener"
      aria-label="Nous écrire sur WhatsApp"
      className="fixed right-4 bottom-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#1f9e55] text-white shadow-lg transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
