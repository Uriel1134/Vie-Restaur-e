import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { site } from "@/config/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — association d’aide aux familles`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    locale: "fr_FR",
    type: "website",
  },
};

export default function FrontendLayout({ children }: LayoutProps<"/">) {
  return <SiteShell>{children}</SiteShell>;
}
