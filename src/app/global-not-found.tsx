import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { PageIntrouvable } from "@/components/page-introuvable";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Page introuvable · Vie Restaurée",
  robots: { index: false },
};

/** 404 pour toute URL qui ne correspond à aucune route (le site a deux layouts racines : public et admin). */
export default function GlobalNotFound() {
  return (
    <SiteShell>
      <PageIntrouvable />
    </SiteShell>
  );
}
