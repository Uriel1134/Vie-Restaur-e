import Image from "next/image";
import Link from "next/link";
import { NOM_RAYON } from "@/lib/produits";
import type { Produit } from "@/lib/types";

const ROTATIONS = [-3, 2, -1.5, 3, -2.5, 1.5, -1, 2.5];

function Polaroid({ p, i }: { p: Produit; i: number }) {
  return (
    <Link
      href={`/boutique/${p.slug}`}
      className="group block w-44 shrink-0 bg-white p-2.5 pb-3 shadow-papier transition-transform duration-500 ease-out hover:z-10 hover:scale-[1.06] hover:rotate-0 focus-visible:rotate-0 sm:w-56"
      style={{ transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)` }}
    >
      <div className="relative aspect-square overflow-hidden bg-lavande">
        <Image src={p.photos[0]} alt="" fill sizes="224px" className="object-cover" unoptimized />
      </div>
      <p className="mt-2.5 truncate font-serif text-[15px] font-semibold text-bleu-nuit italic">{p.nom}</p>
      <p className="truncate text-xs text-bleu-vie">{NOM_RAYON[p.rayon]}</p>
    </Link>
  );
}

/** Une rangée qui défile ; la piste est dupliquée pour une boucle sans couture. */
function Rangee({ produits, sens, duree }: { produits: Produit[]; sens: "normal" | "reverse"; duree: string }) {
  return (
    <div className="pause-survol overflow-hidden py-6">
      <ul
        className="defile flex gap-6 sm:gap-8"
        style={{ ["--duree" as string]: duree, ["--sens" as string]: sens }}
      >
        {[...produits, ...produits].map((p, i) => (
          <li key={`${p.id}-${i}`} aria-hidden={i >= produits.length ? true : undefined}>
            <Polaroid p={p} i={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Mur de polaroïds des vraies créations : deux rangées qui défilent en sens contraire.
 * Pause au survol ; chaque photo mène à sa fiche. Immobile si l'utilisateur réduit les animations.
 */
export function MurPolaroids({ produits }: { produits: Produit[] }) {
  if (produits.length < 6) return null;
  const moitie = Math.ceil(produits.length / 2);
  return (
    <div className="-mx-4 mt-10 sm:mx-0">
      <div className="relative left-1/2 w-screen -translate-x-1/2 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <Rangee produits={produits.slice(0, moitie)} sens="normal" duree="70s" />
        <Rangee produits={produits.slice(moitie)} sens="reverse" duree="80s" />
      </div>
    </div>
  );
}

/** Choisit une sélection variée : produits mis en avant d'abord, puis un tour par rayon. */
export function selectionMur(produits: Produit[], max = 18): Produit[] {
  const avecPhoto = produits.filter((p) => p.photos[0]);
  const vedettes = avecPhoto.filter((p) => p.en_vedette);
  const parRayon = new Map<string, Produit[]>();
  for (const p of avecPhoto.filter((p) => !p.en_vedette)) {
    parRayon.set(p.rayon, [...(parRayon.get(p.rayon) ?? []), p]);
  }
  const files = [...parRayon.values()];
  const melange: Produit[] = [...vedettes];
  while (melange.length < max && files.some((f) => f.length)) {
    for (const f of files) {
      const p = f.shift();
      if (p && melange.length < max) melange.push(p);
    }
  }
  return melange;
}
