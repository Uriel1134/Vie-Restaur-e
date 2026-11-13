"use client";

import { useState } from "react";
import { euros } from "@/lib/format";
import type { LigneCommande } from "@/lib/types";

type Option = { id: string; nom: string; prix: number };

/** Éditeur des articles d'une commande saisie à la main (ex. commande reçue sur WhatsApp). */
export function EditeurLignes({ nom, valeur = [], produits }: { nom: string; valeur?: LigneCommande[]; produits: Option[] }) {
  const [lignes, setLignes] = useState<LigneCommande[]>(
    valeur.length ? valeur : [{ libelle: "", quantite: 1, prix_unitaire: 0 }],
  );

  const maj = (i: number, patch: Partial<LigneCommande>) => setLignes((ls) => ls.map((l, j) => (j === i ? { ...l, ...patch } : l)));

  const choisir = (i: number, id: string) => {
    const p = produits.find((x) => x.id === id);
    maj(i, p ? { produit_id: p.id, libelle: p.nom, prix_unitaire: p.prix } : { produit_id: undefined });
  };

  const sousTotal = lignes.reduce((s, l) => s + l.quantite * l.prix_unitaire, 0);
  const champ = "block w-full rounded-lg border border-bleu-vie/30 bg-white px-3 py-2 text-[15px] focus:border-bleu-profond focus:outline-none";

  return (
    <div>
      <p className="text-[15px] font-medium text-bleu-nuit">Articles</p>
      <input type="hidden" name={nom} value={JSON.stringify(lignes)} />
      <div className="mt-3 space-y-3">
        {lignes.map((l, i) => (
          <div key={i} className="grid gap-2 rounded-xl border border-bleu-vie/15 p-3 sm:grid-cols-[1.4fr_1fr_5rem_7rem_auto] sm:items-center">
            <select aria-label="Produit" value={l.produit_id ?? ""} onChange={(e) => choisir(i, e.target.value)} className={champ}>
              <option value="">— Article libre —</option>
              {produits.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nom}
                </option>
              ))}
            </select>
            <input aria-label="Libellé" placeholder="Libellé" value={l.libelle} onChange={(e) => maj(i, { libelle: e.target.value })} className={champ} />
            <input
              aria-label="Quantité"
              type="number"
              min={1}
              value={l.quantite}
              onChange={(e) => maj(i, { quantite: Math.max(1, Number(e.target.value) || 1) })}
              className={champ}
            />
            <input
              aria-label="Prix unitaire"
              type="number"
              min={0}
              step="0.5"
              value={l.prix_unitaire}
              onChange={(e) => maj(i, { prix_unitaire: Math.max(0, Number(e.target.value) || 0) })}
              className={champ}
            />
            <button
              type="button"
              onClick={() => setLignes((ls) => (ls.length > 1 ? ls.filter((_, j) => j !== i) : ls))}
              className="text-sm text-red-700 hover:underline"
            >
              Retirer
            </button>
            <input
              aria-label="Variante"
              placeholder="Variante (ex. M · Bleu) — facultatif"
              value={l.variante ?? ""}
              onChange={(e) => maj(i, { variante: e.target.value })}
              className={`${champ} sm:col-span-5`}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setLignes((ls) => [...ls, { libelle: "", quantite: 1, prix_unitaire: 0 }])}
          className="rounded-full border-2 border-bleu-vie px-5 py-2 text-[15px] font-semibold text-bleu-profond hover:bg-lavande"
        >
          + Ajouter un article
        </button>
        <p className="text-[15px]">
          Sous-total : <strong className="text-bleu-nuit">{euros(sousTotal)}</strong>
        </p>
      </div>
    </div>
  );
}
