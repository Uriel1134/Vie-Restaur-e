import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CarteProduit } from "@/components/boutique/carte-produit";
import { AjouterPanierFiche } from "@/components/boutique/ajouter-panier";
import { Galerie } from "@/components/boutique/galerie";
import { WhatsAppIcon } from "@/components/icons";
import { Etiquette, PuceSceau } from "@/components/ui/decor";
import { whatsappLink } from "@/config/site";
import { getProduit, getProduitsDuRayon } from "@/lib/cms";
import {
  NOM_RAYON,
  enRupture,
  estPrestation,
  messageInfo,
  messageRetour,
  prixAffiche,
  variantesPanier,
} from "@/lib/produits";

// Catalogue géré dans le dashboard : page régénérée au plus toutes les 5 min.
export const revalidate = 300;

export async function generateMetadata({ params }: PageProps<"/boutique/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduit(slug);
  if (!p) return { title: "Article introuvable" };
  return {
    title: p.nom,
    description: p.description ?? `${p.nom} — ${NOM_RAYON[p.rayon]}, boutique solidaire Vie Restaurée.`,
    openGraph: p.photos[0] ? { images: [p.photos[0]] } : undefined,
  };
}

export default async function FicheProduit({ params }: PageProps<"/boutique/[slug]">) {
  const { slug } = await params;
  const p = await getProduit(slug);
  if (!p) notFound();

  const autres = await getProduitsDuRayon(p.rayon, p.id);
  const rupture = enRupture(p);
  const prestation = estPrestation(p);

  return (
    <>
      <section className="bg-lavande pt-[calc(var(--entete)+2.5rem)] pb-16 sm:pt-[calc(var(--entete)+3.5rem)] sm:pb-24">
        <div className="conteneur">
          <nav aria-label="Fil d’Ariane" className="entree text-[15px] text-bleu-profond">
            <Link href="/boutique" className="hover:underline">
              Boutique
            </Link>
            <span className="mx-2 text-texte/40">/</span>
            <Link href={`/boutique#${p.rayon}`} className="hover:underline">
              {NOM_RAYON[p.rayon]}
            </Link>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Galerie photos={p.photos} nom={p.nom} />

            <div className="lg:pt-4">
              <Etiquette>{NOM_RAYON[p.rayon]}</Etiquette>
              <h1 className="entree mt-4 text-[2.2rem] leading-[1.1] sm:text-[2.8rem]">{p.nom}</h1>
              <p className="mt-4 font-serif text-2xl font-semibold text-bleu-nuit">{prixAffiche(p)}</p>
              {rupture && <p className="mt-2 font-medium text-red-700">Victime de son succès : bientôt de retour.</p>}

              {p.description && <p className="mt-6 text-lg leading-relaxed whitespace-pre-line">{p.description}</p>}

              <div className="mt-8">
                {rupture ? (
                  <a
                    href={whatsappLink(messageRetour(p))}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-bleu-profond px-7 py-3 text-[15px] font-semibold text-white hover:bg-bleu-nuit"
                  >
                    <WhatsAppIcon className="size-5" /> Être prévenu·e du retour
                  </a>
                ) : (
                  <AjouterPanierFiche
                    slug={p.slug}
                    nom={p.nom}
                    photo={p.photos[0] ?? null}
                    rayon={p.rayon}
                    prix={p.prix}
                    variantes={variantesPanier(p)}
                  />
                )}
                <a
                  href={whatsappLink(messageInfo(p))}
                  target="_blank"
                  rel="noopener"
                  className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-bleu-profond underline-offset-4 hover:underline"
                >
                  <WhatsAppIcon className="size-4" /> Une question sur cet article ?
                </a>
              </div>

              <ul className="mt-10 space-y-3 border-t border-bleu-vie/25 pt-6 text-[15px]">
                {(prestation
                  ? [
                      "Dites-nous la date, le lieu et le nombre de participants : nous vous répondons rapidement.",
                      "Les recettes soutiennent directement les actions de l’association.",
                    ]
                  : [
                      "Ajoutez au panier, puis envoyez votre bon de commande sur WhatsApp : nous réglons ensemble le paiement et le retrait.",
                      "Retrait sur place ou envoi en point relais.",
                      "Retour ou échange sous 20 jours.",
                      "Les recettes soutiennent directement les actions de l’association.",
                    ]
                ).map((t) => (
                  <li key={t} className="flex gap-3">
                    <PuceSceau />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {autres.length > 0 && (
        <section className="py-16 sm:py-24" aria-labelledby="titre-autres">
          <div className="conteneur">
            <Etiquette>Dans le même rayon</Etiquette>
            <h2 id="titre-autres" className="mt-4 text-[2rem]">
              Vous aimerez aussi
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
              {autres.map((a) => (
                <li key={a.id}>
                  <CarteProduit produit={a} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
