"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition, type CSSProperties } from "react";
import { CloseIcon, WhatsAppIcon } from "@/components/icons";
import { Sceau } from "@/components/ui/decor";
import { whatsappLink } from "@/config/site";
import { creerCommande } from "@/lib/commande-actions";
import { euros } from "@/lib/format";
import { nombreArticles, panier, usePanier, type LignePanier } from "@/lib/panier";
import { SacIcone } from "./ajouter-panier";

type Etape = "panier" | "coordonnees" | "envoye";

function messageWhatsApp(numero: string, lignes: LignePanier[], lien: string, prenom: string, livraison: string) {
  const articles = lignes
    .map((l) => `• ${l.nom}${l.variante ? ` (${l.variante})` : ""} × ${l.quantite}`)
    .join("\n");
  return [
    "Bonjour Vie Restaurée ! Je souhaite passer commande 😊",
    "",
    `Commande n° ${numero}`,
    articles,
    "",
    `Mon bon de commande illustré : ${lien}`,
    "",
    `${livraison === "relais" ? "Envoi en point relais" : "Retrait sur place"} · ${prenom}`,
  ].join("\n");
}

const champ =
  "mt-1.5 block w-full rounded-xl border border-bleu-vie/30 bg-white px-4 py-3 text-texte placeholder:text-texte/40 focus:border-bleu-profond focus:ring-2 focus:ring-bleu-profond/20 focus:outline-none";

/** Bouton panier (en-tête) + tiroir latéral : panier → coordonnées → envoi WhatsApp. */
export function Panier() {
  const lignes = usePanier();
  const nb = nombreArticles(lignes);
  const ref = useRef<HTMLDialogElement>(null);
  const [etape, setEtape] = useState<Etape>("panier");
  const [secoue, setSecoue] = useState(0);
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoi, demarrer] = useTransition();
  const [envoyee, setEnvoyee] = useState<{ numero: string; lien: string } | null>(null);
  const [form, setForm] = useState({ nom: "", telephone: "", livraison: "retrait" as "retrait" | "relais", notes: "" });

  // L'icône du panier « sautille » à chaque ajout.
  useEffect(() => {
    const f = () => setSecoue((n) => n + 1);
    window.addEventListener("vr-panier-ajout", f);
    return () => window.removeEventListener("vr-panier-ajout", f);
  }, []);

  const ouvrir = () => {
    if (etape === "envoye" && lignes.length > 0) setEtape("panier");
    ref.current?.showModal();
  };
  const fermer = () => ref.current?.close();

  const totalConnu = lignes.reduce((s, l) => s + (l.prix ?? 0) * l.quantite, 0);
  const surDemande = lignes.some((l) => l.prix === null);

  function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    const copie = lignes;
    demarrer(async () => {
      const r = await creerCommande({
        ...form,
        lignes: copie.map((l) => ({ slug: l.slug, variante: l.variante, quantite: l.quantite })),
      });
      if (!r.ok) {
        setErreur(r.erreur);
        return;
      }
      const lien = `${window.location.origin}/commande/${r.jeton}`;
      const url = whatsappLink(messageWhatsApp(r.numero, copie, lien, form.nom.trim(), form.livraison));
      setEnvoyee({ numero: r.numero, lien: url });
      setEtape("envoye");
      panier.vider();
      // Ouverture directe de WhatsApp (le bouton de l'écran suivant sert de secours si le navigateur bloque).
      window.open(url, "_blank", "noopener");
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={ouvrir}
        aria-label={`Panier : ${nb} article${nb > 1 ? "s" : ""}`}
        className="relative grid size-11 shrink-0 place-items-center rounded-full text-bleu-nuit sm:size-12 transition-colors hover:bg-lavande"
      >
        <span key={secoue} className={secoue ? "secousse" : ""}>
          <SacIcone className="size-6" />
        </span>
        {nb > 0 && (
          <span
            key={`n-${nb}`}
            className="pastille-panier absolute top-1 right-0.5 grid min-w-5 place-items-center rounded-full bg-ruban px-1 text-[11px] font-bold text-bleu-nuit"
          >
            {nb}
          </span>
        )}
      </button>

      <dialog
        ref={ref}
        aria-label="Votre panier"
        onClick={(e) => e.target === ref.current && fermer()}
        className="tiroir-panier fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-full max-w-md bg-transparent p-0"
      >
        <div className="flex h-full flex-col bg-white shadow-2xl">
          {/* En-tête du tiroir */}
          <div className="flex items-center justify-between border-b border-bleu-vie/15 px-6 py-5">
            <div>
              <p className="font-serif text-[1.5rem] font-semibold text-bleu-nuit">
                {etape === "coordonnees" ? "Vos coordonnées" : etape === "envoye" ? "Commande prête" : "Votre panier"}
              </p>
              {etape !== "envoye" && (
                <ol className="mt-1 flex gap-2 text-xs font-medium text-texte/50" aria-label="Étapes">
                  <li className={etape === "panier" ? "text-bleu-profond" : ""}>1. Panier</li>
                  <li aria-hidden>→</li>
                  <li className={etape === "coordonnees" ? "text-bleu-profond" : ""}>2. Coordonnées</li>
                  <li aria-hidden>→</li>
                  <li>3. WhatsApp</li>
                </ol>
              )}
            </div>
            <button type="button" onClick={fermer} aria-label="Fermer" className="grid size-11 place-items-center rounded-full hover:bg-lavande">
              <CloseIcon className="size-5" />
            </button>
          </div>

          {/* ───── Étape 1 : le panier ───── */}
          {etape === "panier" &&
            (lignes.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="relative grid size-24 place-items-center">
                  <Sceau plein className="absolute inset-0 text-lavande" />
                  <SacIcone className="relative size-10 text-bleu-vie" />
                </span>
                <p className="mt-6 font-serif text-xl font-semibold text-bleu-nuit">Votre panier est vide</p>
                <p className="mt-2 text-texte/70">Bijoux, tissus, jouets, livres… chaque achat soutient les familles.</p>
                <Link href="/boutique" onClick={fermer} className="mt-6 rounded-full bg-bleu-profond px-6 py-3 text-[15px] font-semibold text-white hover:bg-bleu-nuit">
                  Découvrir la boutique
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-bleu-vie/10 overflow-y-auto px-6">
                  {lignes.map((l, i) => (
                    <li key={`${l.slug}-${l.variante}`} className="ligne-panier flex gap-4 py-4" style={{ "--delai": `${i * 50}ms` } as CSSProperties}>
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-lavande">
                        {l.photo && <Image src={l.photo} alt="" fill sizes="80px" className="object-cover" unoptimized />}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="font-serif font-semibold leading-snug text-bleu-nuit">{l.nom}</p>
                        {l.variante && <p className="text-sm text-texte/60">{l.variante}</p>}
                        <p className="text-sm text-bleu-profond">{l.prix === null ? "Prix sur demande" : euros(l.prix)}</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="inline-flex items-center rounded-full border border-bleu-vie/30" role="group" aria-label={`Quantité de ${l.nom}`}>
                            <button type="button" onClick={() => panier.quantite(l, l.quantite - 1)} aria-label="Diminuer" className="grid size-8 place-items-center rounded-full hover:bg-lavande">
                              −
                            </button>
                            <span className="w-6 text-center text-sm font-semibold">{l.quantite}</span>
                            <button type="button" onClick={() => panier.quantite(l, l.quantite + 1)} aria-label="Augmenter" className="grid size-8 place-items-center rounded-full hover:bg-lavande">
                              +
                            </button>
                          </div>
                          <button type="button" onClick={() => panier.retirer(l)} className="text-sm text-texte/60 underline-offset-4 hover:text-red-700 hover:underline">
                            Retirer
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-bleu-vie/15 bg-lavande/50 px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-texte/70">
                      {nb} article{nb > 1 ? "s" : ""}
                    </span>
                    <span className="font-serif text-xl font-semibold text-bleu-nuit">
                      {totalConnu > 0 ? `${surDemande ? "à partir de " : ""}${euros(totalConnu)}` : "Prix sur demande"}
                    </span>
                  </div>
                  {surDemande && <p className="mt-1 text-xs text-texte/60">Certains prix vous seront confirmés sur WhatsApp.</p>}
                  <button
                    type="button"
                    onClick={() => setEtape("coordonnees")}
                    className="mt-4 flex min-h-13 w-full items-center justify-center rounded-full bg-bleu-profond text-[15px] font-semibold text-white transition-colors hover:bg-bleu-nuit"
                  >
                    Valider mon panier
                  </button>
                </div>
              </>
            ))}

          {/* ───── Étape 2 : coordonnées ───── */}
          {etape === "coordonnees" && (
            <form onSubmit={envoyer} className="flex flex-1 flex-col overflow-y-auto">
              <div className="flex-1 space-y-5 px-6 py-6">
                <p className="text-texte/80">Juste de quoi vous répondre : la suite (paiement, retrait) se règle avec vous sur WhatsApp.</p>
                <label className="block text-[15px] font-medium text-bleu-nuit">
                  Prénom
                  <input required minLength={2} maxLength={60} autoComplete="given-name" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} className={champ} />
                </label>
                <label className="block text-[15px] font-medium text-bleu-nuit">
                  Téléphone (WhatsApp)
                  <input required type="tel" autoComplete="tel" pattern="[0-9 +().\-]{6,30}" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} className={champ} placeholder="06 12 34 56 78" />
                </label>
                <fieldset>
                  <legend className="text-[15px] font-medium text-bleu-nuit">Je préfère</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {(
                      [
                        ["retrait", "Retrait sur place"],
                        ["relais", "Point relais"],
                      ] as const
                    ).map(([v, label]) => (
                      <label
                        key={v}
                        className="flex cursor-pointer items-center justify-center rounded-xl border border-bleu-vie/30 px-3 py-3 text-center text-[15px] text-bleu-profond transition-colors has-checked:border-bleu-nuit has-checked:bg-bleu-nuit has-checked:text-white"
                      >
                        <input type="radio" name="livraison" value={v} checked={form.livraison === v} onChange={() => setForm({ ...form, livraison: v })} className="sr-only" />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="block text-[15px] font-medium text-bleu-nuit">
                  Un mot à ajouter <span className="font-normal text-texte/60">(facultatif)</span>
                  <textarea rows={3} maxLength={500} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={`${champ} resize-none`} placeholder="Taille, couleur, date souhaitée…" />
                </label>
                {erreur && (
                  <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
                    {erreur}
                  </p>
                )}
              </div>
              <div className="space-y-3 border-t border-bleu-vie/15 bg-lavande/50 px-6 py-5">
                <button
                  type="submit"
                  disabled={envoi}
                  className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#1f9e55] text-[15px] font-semibold text-white transition-colors hover:bg-[#188647] disabled:opacity-60"
                >
                  <WhatsAppIcon className="size-5" />
                  {envoi ? "Préparation…" : "Envoyer ma commande sur WhatsApp"}
                </button>
                <button type="button" onClick={() => setEtape("panier")} className="w-full text-center text-sm text-texte/70 hover:text-bleu-nuit">
                  ← Revenir au panier
                </button>
              </div>
            </form>
          )}

          {/* ───── Étape 3 : envoyée ───── */}
          {etape === "envoye" && envoyee && (
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <span className="entree-ruban relative grid size-24 place-items-center">
                <Sceau plein className="absolute inset-0 text-[#1f9e55]" />
                <svg viewBox="0 0 24 24" className="relative size-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              <p className="entree mt-6 font-serif text-2xl font-semibold text-bleu-nuit">Commande n° {envoyee.numero}</p>
              <p className="entree mt-2 text-texte/80" style={{ "--delai": "100ms" } as CSSProperties}>
                Votre bon de commande est prêt. Il ne reste qu’à appuyer sur <strong>« Envoyer »</strong> dans WhatsApp : nous vous
                répondons rapidement.
              </p>
              <a
                href={envoyee.lien}
                target="_blank"
                rel="noopener"
                className="entree mt-8 inline-flex min-h-13 items-center gap-2 rounded-full bg-[#1f9e55] px-7 text-[15px] font-semibold text-white hover:bg-[#188647]"
                style={{ "--delai": "200ms" } as CSSProperties}
              >
                <WhatsAppIcon className="size-5" /> WhatsApp ne s’est pas ouvert ?
              </a>
              <button type="button" onClick={fermer} className="mt-4 text-sm text-texte/70 hover:text-bleu-nuit">
                Continuer mes achats
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
