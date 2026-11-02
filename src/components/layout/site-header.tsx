"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "@/assets/brand/logo-horizontal-bleu.png";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { mainNav, site, whatsappLink } from "@/config/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      {/* Barre d'infos pratiques : rassure et donne un moyen de contact immédiat. */}
      <div className="bg-bleu-nuit text-[13px] text-white/85">
        <div className="conteneur flex h-9 items-center justify-between gap-4">
          <p className="truncate">
            <span className="hidden sm:inline">Permanence du lundi au vendredi · </span>9 h 30 – 17 h
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <a href={`mailto:${site.email}`} className="hidden hover:text-white md:inline">
              {site.email}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="font-medium text-ruban hover:underline">
              Écrire sur WhatsApp
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-bleu-nuit/5 bg-white/90 backdrop-blur-md">
        <div className="conteneur flex h-20 items-center justify-between gap-6">
          <Link href="/" onNavigate={close} className="shrink-0" aria-label="Vie Restaurée — accueil">
            {/* Charte : logo complet ≥ 120 px de large. */}
            <Image src={logo} alt="Vie Restaurée" priority className="h-12 w-auto lg:h-14" sizes="190px" />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative py-2 text-[15px] font-medium transition-colors hover:text-bleu-profond ${
                        active ? "text-bleu-nuit" : "text-texte/80"
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-ruban transition-opacity ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/faire-un-don"
              onNavigate={close}
              className="hidden min-h-11 items-center rounded-full bg-bleu-profond px-6 text-[15px] font-semibold text-white transition-colors hover:bg-bleu-nuit sm:inline-flex"
            >
              Faire un don
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="inline-flex size-11 items-center justify-center rounded-full text-bleu-nuit hover:bg-lavande lg:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="menu-mobile" aria-label="Navigation mobile" className="border-t border-lavande bg-white lg:hidden">
            <ul className="conteneur flex flex-col py-4">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onNavigate={close}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="block border-b border-lavande py-3.5 font-serif text-xl font-semibold text-bleu-nuit aria-[current=page]:italic aria-[current=page]:text-bleu-profond"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-5 sm:hidden">
                <Link
                  href="/faire-un-don"
                  onNavigate={close}
                  className="flex min-h-12 items-center justify-center rounded-full bg-bleu-profond font-semibold text-white"
                >
                  Faire un don
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
