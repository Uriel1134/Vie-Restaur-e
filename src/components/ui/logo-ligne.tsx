import Image from "next/image";
import iconeBlanc from "@/assets/brand/icone-blanc.png";

/**
 * Logo sur une seule ligne pour les fonds foncés : icône officielle (non modifiée) + nom de l'association.
 * Remplace la version empilée (logo-blanc.png), illisible en petit.
 */
export function LogoLigne({ taille = "md", sousTitre = true }: { taille?: "sm" | "md"; sousTitre?: boolean }) {
  const icone = taille === "sm" ? "size-9" : "size-12";
  const nom = taille === "sm" ? "text-[1.15rem]" : "text-[1.5rem]";
  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap">
      <Image src={iconeBlanc} alt="" className={`${icone} shrink-0`} sizes="48px" />
      <span className="flex flex-col leading-none">
        <span className={`font-serif font-semibold text-white ${nom}`}>Vie restaurée</span>
        {sousTitre && (
          <span className="mt-1.5 text-[11px] font-medium tracking-[0.18em] text-white/60 uppercase">Association · depuis 2022</span>
        )}
      </span>
    </span>
  );
}
