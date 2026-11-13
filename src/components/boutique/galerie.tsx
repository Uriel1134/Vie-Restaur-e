"use client";

import Image from "next/image";
import { useState } from "react";
import { Sceau } from "@/components/ui/decor";

/** Galerie de la fiche produit : grande photo + vignettes cliquables. */
export function Galerie({ photos, nom }: { photos: string[]; nom: string }) {
  const [active, setActive] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="relative aspect-[4/5] rounded-carte bg-lavande">
        <Sceau plein className="absolute inset-[25%] text-white" />
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-carte bg-lavande shadow-douce">
        {/* key : la nouvelle photo rejoue l'animation d'entrée */}
        <Image
          key={photos[active]}
          src={photos[active]}
          alt={photos.length > 1 ? `${nom} — photo ${active + 1} sur ${photos.length}` : nom}
          fill
          priority
          sizes="(min-width: 1024px) 560px, 100vw"
          className="entree object-contain"
          unoptimized
        />
      </div>
      {photos.length > 1 && (
        <ul className="mt-4 grid grid-cols-5 gap-2 sm:gap-3" aria-label="Autres photos">
          {photos.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Afficher la photo ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                className={`relative block aspect-square w-full overflow-hidden rounded-xl bg-lavande ring-offset-2 transition ${
                  i === active ? "ring-2 ring-bleu-profond" : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="110px" className="object-cover" unoptimized />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
