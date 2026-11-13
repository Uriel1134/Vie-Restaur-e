import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BoutonImprimer } from "@/components/boutique/bouton-imprimer";
import { Cachet, Sceau } from "@/components/ui/decor";
import { site } from "@/config/site";
import { getBonCommande } from "@/lib/cms";
import { NOM_STATUT } from "@/lib/admin/constantes";
import { dateHeure, euros } from "@/lib/format";

// Toujours à jour (le statut évolue) et jamais indexé : c'est un document privé.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/commande/[jeton]">): Promise<Metadata> {
  const { jeton } = await params;
  const b = await getBonCommande(jeton);
  if (!b) return { title: "Bon de commande", robots: { index: false, follow: false } };
  const nb = b.lignes.reduce((s, l) => s + l.quantite, 0);
  const photo = b.lignes.find((l) => l.photo)?.photo;
  return {
    title: `Bon de commande ${b.numero}`,
    description: `${nb} article${nb > 1 ? "s" : ""} · ${b.lignes.map((l) => l.libelle).join(", ")}`,
    robots: { index: false, follow: false },
    // Aperçu WhatsApp : la photo du premier article.
    openGraph: { title: `Bon de commande ${b.numero} — Vie Restaurée`, images: photo ? [photo] : undefined },
  };
}

export default async function BonDeCommande({ params }: PageProps<"/commande/[jeton]">) {
  const { jeton } = await params;
  const b = await getBonCommande(jeton);
  if (!b) notFound();

  const nb = b.lignes.reduce((s, l) => s + l.quantite, 0);
  const surDemande = b.lignes.some((l) => l.prix_sur_demande);

  return (
    <section className="bg-lavande pt-[calc(var(--entete)+2.5rem)] pb-20 print:bg-white print:p-0">
      <div className="conteneur max-w-4xl print:max-w-none print:px-0">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <p className="font-serif text-lg text-bleu-profond italic">Votre bon de commande</p>
          <BoutonImprimer />
        </div>

        <article className="entree-note relative overflow-hidden bg-white shadow-papier print:shadow-none">
          {/* Liseré « par avion » */}
          <div
            aria-hidden
            className="h-2.5 bg-[repeating-linear-gradient(135deg,var(--color-ruban)_0_14px,transparent_14px_28px,var(--color-bleu-vie)_28px_42px,transparent_42px_56px)] [print-color-adjust:exact]"
          />
          <Sceau plein className="absolute -right-24 -bottom-24 size-72 text-lavande/60 print:hidden" />

          <div className="relative p-6 sm:p-10">
            {/* En-tête du bon */}
            <header className="flex flex-col gap-6 border-b border-dashed border-bleu-vie/40 pb-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="relative grid size-12 place-items-center [print-color-adjust:exact]">
                  <Sceau plein className="absolute inset-0 text-bleu-vie" />
                  <span className="relative font-serif text-lg font-semibold text-white italic">V</span>
                </span>
                <div>
                  <p className="font-serif text-xl font-semibold text-bleu-nuit">Vie restaurée</p>
                  <p className="text-xs tracking-[0.15em] text-bleu-vie uppercase">Boutique solidaire</p>
                </div>
              </div>
              <div className="sm:text-right">
                <p className="text-xs font-semibold tracking-[0.2em] text-bleu-vie uppercase">Bon de commande</p>
                <p className="mt-1 font-serif text-[1.7rem] leading-none font-semibold text-bleu-nuit">{b.numero}</p>
                <p className="mt-2 text-sm text-texte/70 first-letter:uppercase">{dateHeure(b.date)}</p>
              </div>
            </header>

            <dl className="grid gap-4 border-b border-dashed border-bleu-vie/40 py-6 text-[15px] sm:grid-cols-3">
              <div>
                <dt className="text-texte/60">Au nom de</dt>
                <dd className="font-semibold text-bleu-nuit">{b.prenom}</dd>
              </div>
              <div>
                <dt className="text-texte/60">Réception</dt>
                <dd className="font-semibold text-bleu-nuit">{b.livraison === "relais" ? "Envoi en point relais" : "Retrait sur place"}</dd>
              </div>
              <div>
                <dt className="text-texte/60">Statut</dt>
                <dd className="font-semibold text-bleu-nuit">{NOM_STATUT[b.statut] ?? b.statut}</dd>
              </div>
            </dl>

            {/* Articles */}
            <ul className="divide-y divide-bleu-vie/15">
              {b.lignes.map((l, i) => (
                <li key={i} className="flex items-center gap-5 py-5 break-inside-avoid">
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-lavande sm:size-28 [print-color-adjust:exact]">
                    {l.photo && <Image src={l.photo} alt={l.libelle} fill sizes="112px" loading="eager" className="object-cover" unoptimized />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-[1.15rem] leading-snug font-semibold text-bleu-nuit">{l.libelle}</p>
                    {l.variante && <p className="text-sm text-texte/60">{l.variante}</p>}
                    <p className="mt-1 text-sm text-texte/70">Quantité : {l.quantite}</p>
                  </div>
                  <p className="shrink-0 text-right font-semibold text-bleu-nuit">
                    {l.prix_sur_demande ? (
                      <span className="text-sm font-normal text-bleu-profond italic">Prix à confirmer</span>
                    ) : (
                      euros(l.prix_unitaire * l.quantite)
                    )}
                  </p>
                </li>
              ))}
            </ul>

            {/* Total */}
            <div className="mt-2 flex flex-col gap-1 border-t-2 border-bleu-nuit pt-5 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="text-texte/70">
                {nb} article{nb > 1 ? "s" : ""}
              </p>
              <p className="font-serif text-2xl font-semibold text-bleu-nuit">
                {Number(b.total) > 0 ? `${surDemande ? "À partir de " : "Total : "}${euros(Number(b.total))}` : "Prix à confirmer"}
              </p>
            </div>
            {surDemande && (
              <p className="mt-2 text-sm text-texte/60 sm:text-right">Les prix « à confirmer » vous seront communiqués sur WhatsApp.</p>
            )}

            {b.notes && (
              <div className="mt-8 rounded-xl bg-lavande/70 p-5 [print-color-adjust:exact]">
                <p className="text-sm font-semibold text-bleu-nuit">Message du client</p>
                <p className="mt-1 whitespace-pre-line">{b.notes}</p>
              </div>
            )}

            <footer className="mt-10 flex flex-col gap-6 border-t border-dashed border-bleu-vie/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm leading-relaxed text-texte/70">
                Merci ! Le paiement et le retrait se règlent avec vous sur WhatsApp. Chaque achat soutient directement les familles
                accompagnées par {site.legalName} (RNA {site.rna}).
              </p>
              <Cachet className="size-24 shrink-0 rotate-[-12deg] self-end text-bleu-profond/60 sm:self-auto [print-color-adjust:exact]" />
            </footer>
          </div>
        </article>
      </div>
    </section>
  );
}
