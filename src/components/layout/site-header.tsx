"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import iconeBlanc from "@/assets/brand/icone-blanc.png";
import { ArrowRightIcon, CloseIcon, WhatsAppIcon } from "@/components/icons";
import { Panier } from "@/components/boutique/panier";
import { Sceau } from "@/components/ui/decor";
import { mainNav, site, whatsappLink } from "@/config/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Marque-page qui pend du haut de l'écran et porte le sceau (icône officielle, non recomposée). */
function MarquePage({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onNavigate={onNavigate}
      aria-label="Vie Restaurée — accueil"
      className="marque-page group absolute -top-3 left-4 z-10 flex h-[calc(100%+2.6rem)] w-14 justify-center sm:left-6 lg:left-7 lg:w-16"
    >
      <span className="absolute inset-0 bg-bleu-vie shadow-[0_10px_18px_-8px_rgb(46_53_85/0.55)] transition-transform duration-300 ease-out [clip-path:polygon(0_0,100%_0,100%_100%,50%_84%,0_100%)] group-hover:translate-y-1.5" />
      {/* couture */}
      <span className="pointer-events-none absolute inset-y-0 left-1.5 border-l border-dashed border-white/35 transition-transform duration-300 group-hover:translate-y-1.5" />
      <span className="pointer-events-none absolute inset-y-0 right-1.5 border-r border-dashed border-white/35 transition-transform duration-300 group-hover:translate-y-1.5" />
      <Image
        src={iconeBlanc}
        alt=""
        priority
        sizes="48px"
        className="relative mt-auto mb-[1.35rem] size-10 transition-transform duration-500 ease-out group-hover:translate-y-1.5 group-hover:rotate-[14deg] lg:size-11"
      />
    </Link>
  );
}

/** Nom de l'association en texte (le logo officiel reste réservé aux usages prévus par la charte). */
function Nom({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/" onNavigate={onNavigate} className="flex flex-col leading-none" tabIndex={-1} aria-hidden>
      <span className="font-serif text-[1.05rem] font-semibold tracking-[0.01em] whitespace-nowrap text-bleu-nuit min-[380px]:text-[1.2rem] lg:text-[1.3rem]">
        Vie restaurée
      </span>
      <span className="mt-1 hidden text-[11px] font-medium tracking-[0.18em] whitespace-nowrap text-bleu-vie uppercase sm:block">
        Association · depuis {site.foundedYear}
      </span>
    </Link>
  );
}

/** Trait manuscrit sous la page active. */
function Gribouillis() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      className="absolute -bottom-1.5 left-0 h-2.5 w-full overflow-visible"
    >
      <path
        d="M2 8 C 25 3, 50 2, 72 5 S 108 10, 118 4"
        fill="none"
        stroke="var(--color-ruban)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeDasharray={130}
        style={{ "--longueur": 130 } as CSSProperties}
        className="animate-[trait_0.7s_0.1s_cubic-bezier(0.65,0,0.35,1)_both]"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const fermer = () => setOuvert(false);
  const boutonFermer = useRef<HTMLButtonElement>(null);

  // Menu mobile : bloque le défilement de la page, Échap pour fermer, focus sur « Fermer ».
  useEffect(() => {
    if (!ouvert) return;
    const html = document.documentElement;
    const avant = html.style.overflow;
    html.style.overflow = "hidden";
    boutonFermer.current?.focus();
    const echap = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", echap);
    return () => {
      html.style.overflow = avant;
      window.removeEventListener("keydown", echap);
    };
  }, [ouvert]);

  return (
    <>
      {/* Barre d'infos pratiques : rassure et donne un moyen de contact immédiat. */}
      <div className="bg-bleu-nuit text-[13px] text-white/85 print:hidden">
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

      {/*
        Bande de papier flottante, collante en haut de l'écran.
        -mb-[--entete] : le contenu de la page passe dessous (les héros réservent cet espace).
      */}
      <header className="sticky top-0 z-40 -mb-[var(--entete)] h-[var(--entete)] px-3 pt-3 sm:px-4 print:hidden">
        <div className="ombre-defilement relative mx-auto flex h-16 max-w-[1200px] items-center gap-2 rounded-full bg-white/90 pr-1.5 pl-[5.5rem] sm:gap-4 sm:pr-2 sm:pl-[6rem] shadow-[0_10px_30px_-18px_rgb(46_53_85/0.45)] ring-1 ring-bleu-nuit/[0.06] backdrop-blur-md lg:h-[4.25rem] lg:pl-[7.25rem]">
          <MarquePage onNavigate={fermer} />
          <Nom />

          <nav aria-label="Navigation principale" className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {mainNav.map((item) => {
                const actif = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={actif ? "page" : undefined}
                      className={`lien-nav relative mx-2.5 inline-block py-1 text-[15px] font-medium transition-colors ${
                        actif ? "text-bleu-nuit" : "text-texte/75 hover:text-bleu-nuit"
                      }`}
                    >
                      {item.label}
                      {actif && <Gribouillis key={pathname} />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:ml-0">
            <Panier />
            <Link
              href="/faire-un-don"
              className="group hidden min-h-12 items-center gap-2.5 rounded-full bg-bleu-profond py-1.5 pr-5 pl-1.5 text-[15px] font-semibold text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-bleu-nuit active:scale-[0.98] sm:inline-flex"
            >
              <span className="relative grid size-9 place-items-center">
                <Sceau plein className="absolute inset-0 text-ruban transition-transform duration-700 ease-out group-hover:rotate-[72deg]" />
                <svg aria-hidden viewBox="0 0 24 24" className="relative size-[1.05rem] text-bleu-nuit" fill="currentColor">
                  <path d="M12 20.3 4.7 13.4a4.6 4.6 0 0 1 6.5-6.6l.8.8.8-.8a4.6 4.6 0 0 1 6.5 6.6Z" />
                </svg>
              </span>
              Faire un don
            </Link>
            <button
              type="button"
              onClick={() => setOuvert(true)}
              aria-expanded={ouvert}
              aria-controls="menu-mobile"
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full px-3 text-[15px] sm:gap-3 sm:px-4 font-semibold text-bleu-nuit transition-colors hover:bg-lavande lg:hidden"
            >
              <span className="max-[389px]:sr-only">Menu</span>
              <span aria-hidden className="flex w-5 flex-col gap-[5px]">
                <span className="h-0.5 w-full rounded bg-current" />
                <span className="h-0.5 w-3/4 self-end rounded bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile : une page de carnet plein écran. */}
      {ouvert && (
        <div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="deroulement fixed inset-0 z-[60] flex flex-col overflow-x-hidden overflow-y-auto overscroll-contain bg-lavande lg:hidden"
        >
          <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
            <Sceau plein className="absolute -right-40 -bottom-40 size-[28rem] text-white" />
          </div>
          <div className="relative px-3 pt-3 sm:px-4">
            <div className="relative flex h-16 items-center rounded-full bg-white pr-2 pl-[6rem] shadow-[0_10px_30px_-18px_rgb(46_53_85/0.45)]">
              <MarquePage onNavigate={fermer} />
              <Nom onNavigate={fermer} />
              <button
                ref={boutonFermer}
                type="button"
                onClick={fermer}
                className="ml-auto inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-[15px] font-semibold text-bleu-nuit hover:bg-lavande"
              >
                Fermer <CloseIcon className="size-5" />
              </button>
            </div>
          </div>

          <nav aria-label="Navigation mobile" className="relative flex-1 px-6 pt-14 pb-8">
            <ol className="space-y-1">
              {mainNav.map((item, i) => {
                const actif = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="entree" style={{ "--delai": `${80 + i * 55}ms` } as CSSProperties}>
                    <Link
                      href={item.href}
                      onNavigate={fermer}
                      aria-current={actif ? "page" : undefined}
                      className="group flex items-baseline gap-4 border-b border-bleu-vie/15 py-3.5"
                    >
                      <span className="w-7 font-serif text-sm text-bleu-vie italic">{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className={`font-serif text-[1.65rem] leading-tight font-semibold sm:text-[1.9rem] transition-colors ${
                          actif ? "text-bleu-profond italic" : "text-bleu-nuit group-hover:text-bleu-profond"
                        }`}
                      >
                        {item.label}
                      </span>
                      <ArrowRightIcon className="ml-auto size-5 self-center text-bleu-vie opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="entree relative grid gap-3 px-6 pb-8 sm:grid-cols-2" style={{ "--delai": "450ms" } as CSSProperties}>
            <Link
              href="/faire-un-don"
              onNavigate={fermer}
              className="flex min-h-14 items-center justify-center rounded-full bg-ruban text-[15px] font-semibold text-bleu-nuit"
            >
              Faire un don
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener"
              className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-bleu-profond text-[15px] font-semibold text-white"
            >
              <WhatsAppIcon className="size-5" /> Écrire sur WhatsApp
            </a>
            <p className="text-center text-sm text-texte/70 sm:col-span-2">Permanence du lundi au vendredi, 9 h 30 – 17 h</p>
          </div>
        </div>
      )}
    </>
  );
}
