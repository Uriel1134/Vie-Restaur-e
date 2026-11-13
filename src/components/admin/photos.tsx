"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { supabaseNavigateur } from "@/lib/supabase/browser";

/**
 * Envoi de photos directement du navigateur vers Supabase Storage (bucket « medias »).
 * Les URLs publiques sont transmises au formulaire via un champ caché (JSON).
 */
export function ChampPhotos({
  nom,
  label,
  aide,
  valeur = [],
  multiple = true,
  dossier,
  env,
}: {
  nom: string;
  label: string;
  aide?: string;
  valeur?: string[];
  multiple?: boolean;
  dossier: string;
  env: { url: string; key: string };
}) {
  const id = useId();
  const [photos, setPhotos] = useState<string[]>(valeur);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string>();

  async function ajouter(fichiers: FileList | null) {
    if (!fichiers?.length) return;
    setEnvoi(true);
    setErreur(undefined);
    const supabase = supabaseNavigateur(env.url, env.key);
    const urls: string[] = [];
    for (const f of Array.from(fichiers)) {
      if (f.size > 5 * 1024 * 1024) {
        setErreur(`« ${f.name} » dépasse 5 Mo. Réduisez la photo avant de l’envoyer.`);
        continue;
      }
      const ext = f.name.split(".").pop()?.toLowerCase() || "jpg";
      const chemin = `${dossier}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("medias").upload(chemin, f, { contentType: f.type });
      if (error) {
        setErreur("L’envoi a échoué. Vérifiez votre connexion et réessayez.");
        continue;
      }
      urls.push(supabase.storage.from("medias").getPublicUrl(chemin).data.publicUrl);
    }
    setPhotos((p) => (multiple ? [...p, ...urls] : urls.slice(0, 1)));
    setEnvoi(false);
  }

  const deplacer = (i: number, d: -1 | 1) =>
    setPhotos((p) => {
      const n = [...p];
      [n[i], n[i + d]] = [n[i + d], n[i]];
      return n;
    });

  return (
    <div>
      <p className="text-[15px] font-medium text-bleu-nuit">{label}</p>
      {aide && <p className="mt-0.5 text-sm text-texte/60">{aide}</p>}
      <input type="hidden" name={nom} value={JSON.stringify(photos)} />

      {photos.length > 0 && (
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {photos.map((url, i) => (
            <li key={url} className="group relative overflow-hidden rounded-xl bg-lavande">
              <Image src={url} alt="" width={240} height={240} className="aspect-square w-full object-cover" unoptimized />
              {i === 0 && multiple && (
                <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-bleu-nuit">
                  Principale
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-bleu-nuit/80 px-2 py-1.5 text-xs text-white">
                <span className="flex gap-2">
                  {multiple && i > 0 && (
                    <button type="button" onClick={() => deplacer(i, -1)} aria-label="Avancer">
                      ←
                    </button>
                  )}
                  {multiple && i < photos.length - 1 && (
                    <button type="button" onClick={() => deplacer(i, 1)} aria-label="Reculer">
                      →
                    </button>
                  )}
                </span>
                <button type="button" onClick={() => setPhotos((p) => p.filter((x) => x !== url))}>
                  Retirer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <label
        htmlFor={id}
        className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-bleu-vie/35 bg-white px-4 py-6 text-center transition-colors hover:border-bleu-profond hover:bg-lavande/50"
      >
        <span className="font-medium text-bleu-profond">
          {envoi ? "Envoi en cours…" : multiple ? "Ajouter des photos" : photos.length ? "Remplacer la photo" : "Ajouter une photo"}
        </span>
        <span className="mt-1 text-sm text-texte/60">JPG, PNG ou WebP · 5 Mo maximum</span>
        <input
          id={id}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple={multiple}
          disabled={envoi}
          onChange={(e) => {
            void ajouter(e.target.files);
            e.target.value = "";
          }}
          className="sr-only"
        />
      </label>
      {erreur && <p className="mt-2 text-sm text-red-700">{erreur}</p>}
    </div>
  );
}
