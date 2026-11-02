import Image from "next/image";
import Link from "next/link";
import logoBlanc from "@/assets/brand/logo-blanc.png";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "@/components/icons";
import { Sceau } from "@/components/ui/decor";
import { mainNav, site, whatsappLink } from "@/config/site";

const legalNav = [
  { href: "/nous-soutenir", label: "Devenir bénévole ou partenaire" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "Conditions générales de vente" },
];

export function SiteFooter() {
  return (
    <footer className="grain overflow-hidden bg-bleu-nuit text-white/80">
      <Sceau className="absolute -top-64 -left-48 -z-10 size-[40rem] text-white/[0.07]" />

      {/* La signature, en grand : ce que l'on retient en quittant le site. */}
      <div className="conteneur border-b border-white/10 pt-20 pb-16">
        <p className="max-w-4xl font-serif text-[2rem] leading-[1.2] font-semibold text-white italic sm:text-5xl">
          Parce qu’une personne restaurée peut accomplir de <span className="text-ruban">grandes œuvres</span>.
        </p>
      </div>

      <div className="conteneur grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Image src={logoBlanc} alt="Vie Restaurée" className="h-20 w-auto" sizes="200px" />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed">
            Association loi 1901 au service des familles monoparentales, en Afrique et dans les pays en
            développement.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg text-white italic">Nous trouver</h2>
          <p className="mt-4 text-[15px] leading-relaxed">
            Permanence du lundi au vendredi
            <br />
            9 h 30 – 17 h 00
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-white/60">En dehors de ces horaires, sur rendez-vous.</p>
        </div>

        <div>
          <h2 className="font-serif text-lg text-white italic">Nous écrire</h2>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li>
              <a href={whatsappLink()} className="flex items-center gap-3 hover:text-white" target="_blank" rel="noopener">
                <WhatsAppIcon className="size-5 shrink-0" />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-white">
                <MailIcon className="size-5 shrink-0" />
                <span className="break-all">{site.email}</span>
              </a>
            </li>
            {site.social.instagram && (
              <li>
                <a href={site.social.instagram} className="flex items-center gap-3 hover:text-white" target="_blank" rel="noopener">
                  <InstagramIcon className="size-5 shrink-0" />
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-lg text-white italic">Le site</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            {[...mainNav.slice(1), ...legalNav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="conteneur flex flex-col gap-1 py-6 text-[13px] text-white/60 sm:flex-row sm:justify-between">
          <span>
            © {site.legalName} · RNA {site.rna} · {site.registeredIn}
          </span>
          <span>Fait avec soin, pour les familles.</span>
        </p>
      </div>
    </footer>
  );
}
