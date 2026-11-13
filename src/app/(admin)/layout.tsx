import type { Metadata } from "next";
import { inter, lora } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: { default: "Dashboard · Vie Restaurée", template: "%s · Dashboard Vie Restaurée" },
  robots: { index: false, follow: false },
};

/** Layout racine du dashboard (séparé du site public : pas d'en-tête ni de pied de page du site). */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${lora.variable} h-full antialiased`}>
      <body className="min-h-full bg-lavande">{children}</body>
    </html>
  );
}
