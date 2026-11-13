import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { inter, lora } from "@/lib/fonts";

/** Document HTML complet du site public (partagé par le layout et la 404 globale). */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${lora.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}
