"use client";

import { useState } from "react";
import type { Variante } from "@/lib/types";

/** Éditeur des variantes d'un produit (taille, couleur, stock, prix spécifique). */
export function EditeurVariantes({ nom, valeur = [] }: { nom: string; valeur?: Variante[] }) {
  const [lignes, setLignes] = useState<Variante[]>(valeur);

  const maj = (i: number, champ: keyof Variante, v: string) =>
    setLignes((ls) =>
      ls.map((l, j) =>
        j !== i
          ? l
          : {
              ...l,
              [champ]: champ === "stock" ? Math.max(0, Number(v) || 0) : champ === "prix" ? (v === "" ? null : Number(v)) : v,
            },
      ),
    );

  const champ =
    "block w-full rounded-lg border border-bleu-vie/30 bg-white px-3 py-2 text-[15px] focus:border-bleu-profond focus:outline-none";

  return (
    <div>
      <p className="text-[15px] font-medium text-bleu-nuit">Variantes</p>
      <p className="mt-0.5 text-sm text-texte/60">
        Tailles, couleurs ou modèles, chacun avec son stock. Laissez vide si l’article est unique.
      </p>
      <input type="hidden" name={nom} value={JSON.stringify(lignes)} />

      {lignes.length > 0 && (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[15px]">
            <thead className="text-sm text-texte/60">
              <tr>
                <th className="pb-2 font-medium">Taille</th>
                <th className="pb-2 font-medium">Couleur / modèle</th>
                <th className="pb-2 font-medium">Stock</th>
                <th className="pb-2 font-medium">Prix spécifique (€)</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {lignes.map((l, i) => (
                <tr key={i}>
                  <td className="py-1 pr-2">
                    <input aria-label="Taille" value={l.taille ?? ""} onChange={(e) => maj(i, "taille", e.target.value)} className={champ} />
                  </td>
                  <td className="py-1 pr-2">
                    <input aria-label="Couleur" value={l.couleur ?? ""} onChange={(e) => maj(i, "couleur", e.target.value)} className={champ} />
                  </td>
                  <td className="w-24 py-1 pr-2">
                    <input aria-label="Stock" type="number" min={0} value={l.stock} onChange={(e) => maj(i, "stock", e.target.value)} className={champ} />
                  </td>
                  <td className="w-36 py-1 pr-2">
                    <input
                      aria-label="Prix spécifique"
                      type="number"
                      min={0}
                      step="0.5"
                      value={l.prix ?? ""}
                      placeholder="—"
                      onChange={(e) => maj(i, "prix", e.target.value)}
                      className={champ}
                    />
                  </td>
                  <td className="py-1 text-right">
                    <button
                      type="button"
                      onClick={() => setLignes((ls) => ls.filter((_, j) => j !== i))}
                      className="text-sm text-red-700 hover:underline"
                    >
                      Retirer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        type="button"
        onClick={() => setLignes((ls) => [...ls, { taille: "", couleur: "", stock: 0, prix: null }])}
        className="mt-3 rounded-full border-2 border-bleu-vie px-5 py-2 text-[15px] font-semibold text-bleu-profond hover:bg-lavande"
      >
        + Ajouter une variante
      </button>
    </div>
  );
}
