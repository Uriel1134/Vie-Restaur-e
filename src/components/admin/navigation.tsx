"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { LogoLigne } from "@/components/ui/logo-ligne";

const liens = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/commandes", label: "Commandes" },
  { href: "/admin/produits", label: "Produits" },
  { href: "/admin/actualites", label: "Actualités" },
  { href: "/admin/agenda", label: "Agenda" },
  { href: "/admin/temoignages", label: "Témoignages" },
  { href: "/admin/avis", label: "Avis" },
  { href: "/admin/parametres", label: "Coordonnées & liens" },
  { href: "/admin/compte", label: "Mon compte" },
];

function actif(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

export function NavigationAdmin({ nom, deconnexion }: { nom: string; deconnexion: () => Promise<void> }) {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);

  const contenu = (
    <>
      <nav aria-label="Dashboard" className="flex-1">
        <ul className="space-y-1">
          {liens.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onNavigate={() => setOuvert(false)}
                aria-current={actif(pathname, l.href) ? "page" : undefined}
                className="block rounded-xl px-4 py-2.5 text-[15px] font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white aria-[current=page]:bg-white aria-[current=page]:text-bleu-nuit"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8 border-t border-white/15 pt-6 text-sm text-white/70">
        <p className="truncate">Connectée : {nom}</p>
        <div className="mt-3 flex gap-4">
          <a href="/" target="_blank" className="hover:text-white hover:underline">
            Voir le site ↗
          </a>
          <form action={deconnexion}>
            <button type="submit" className="hover:text-white hover:underline">
              Se déconnecter
            </button>
          </form>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between bg-bleu-nuit px-4 lg:hidden">
        <LogoLigne taille="sm" sousTitre={false} />
        <button
          type="button"
          onClick={() => setOuvert((o) => !o)}
          aria-expanded={ouvert}
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          className="inline-flex size-11 items-center justify-center rounded-full text-white hover:bg-white/10"
        >
          {ouvert ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {ouvert && <div className="flex flex-col bg-bleu-nuit px-4 pb-6 lg:hidden">{contenu}</div>}

      {/* Bureau */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col bg-bleu-nuit p-6 lg:flex">
        <span className="mb-10 self-start">
          <LogoLigne taille="sm" />
        </span>
        {contenu}
      </aside>
    </>
  );
}
