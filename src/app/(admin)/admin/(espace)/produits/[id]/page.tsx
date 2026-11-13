import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BoutonSupprimer, FormulaireAdmin } from "@/components/admin/formulaire";
import { ChampPhotos } from "@/components/admin/photos";
import { Carte, ChampCase, ChampChoix, ChampTexte, ChampZone } from "@/components/admin/ui";
import { EditeurVariantes } from "@/components/admin/variantes";
import { rayons } from "@/data/association";
import { exigerAdmin } from "@/lib/admin/auth";
import { supabaseEnv } from "@/lib/supabase/env";
import type { Produit } from "@/lib/types";
import { enregistrerProduit, supprimerProduit } from "../actions";

export const metadata: Metadata = { title: "Produit" };

const OPTIONS_RAYON = rayons.map((r) => ({ value: r.id, label: r.titre }));

export default async function EditionProduit({ params }: PageProps<"/admin/produits/[id]">) {
  const { id } = await params;
  const { supabase } = await exigerAdmin();
  const nouveau = id === "nouveau";

  let produit: Produit | null = null;
  if (!nouveau) {
    const { data } = await supabase.from("produits").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    produit = data as Produit;
  }

  const env = supabaseEnv()!;
  const action = enregistrerProduit.bind(null, produit?.id ?? null);

  return (
    <>
      <Link href="/admin/produits" className="text-[15px] font-medium text-bleu-profond hover:underline">
        ← Produits
      </Link>
      <div className="mt-3 mb-8 flex items-end justify-between gap-4">
        <h1 className="text-[2rem] sm:text-[2.4rem]">{nouveau ? "Nouveau produit" : produit!.nom}</h1>
        {produit && (
          <BoutonSupprimer
            action={supprimerProduit.bind(null, produit.id)}
            question={`Supprimer définitivement « ${produit.nom} » ?`}
          />
        )}
      </div>

      <FormulaireAdmin action={action} retour="/admin/produits">
        <Carte className="space-y-5">
          <ChampTexte nom="nom" label="Nom" valeur={produit?.nom} requis />
          <div className="grid gap-5 sm:grid-cols-2">
            <ChampChoix nom="rayon" label="Rayon" valeur={produit?.rayon} options={OPTIONS_RAYON} requis />
            <ChampTexte
              nom="prix"
              label="Prix (€)"
              aide="Laissez vide pour afficher « Prix sur demande »."
              type="number"
              step="0.5"
              min={0}
              valeur={produit?.prix ?? undefined}
            />
          </div>
          <ChampZone
            nom="description"
            label="Description"
            aide="2 ou 3 phrases : matière, usage, message."
            valeur={produit?.description}
            lignes={4}
          />
        </Carte>

        <Carte>
          <ChampPhotos
            nom="photos"
            label="Photos"
            aide="La première photo sert de vignette. Fond clair, plusieurs angles."
            valeur={produit?.photos}
            dossier="produits"
            env={env}
          />
        </Carte>

        <Carte className="space-y-5">
          <EditeurVariantes nom="variantes" valeur={produit?.variantes} />
          <ChampTexte
            nom="stock"
            label="Stock (article sans variante)"
            aide="Laissez vide si vous ne suivez pas le stock. Ignoré si vous avez ajouté des variantes."
            type="number"
            min={0}
            valeur={produit?.stock ?? undefined}
          />
        </Carte>

        <Carte className="grid gap-4 sm:grid-cols-2">
          <ChampCase nom="en_ligne" label="Visible sur le site" aide="Décochez pour masquer l’article." coche={produit?.en_ligne ?? true} />
          <ChampCase nom="en_vedette" label="Mettre en avant" aide="Affiché en premier dans la boutique." coche={produit?.en_vedette ?? false} />
          <ChampTexte
            nom="ordre"
            label="Ordre dans le rayon"
            aide="Plus le nombre est petit, plus l’article apparaît tôt."
            type="number"
            valeur={produit?.ordre ?? 0}
          />
          <div className="sm:col-span-2">
            <ChampTexte
              nom="slug"
              label="Adresse de la page"
              aide="Générée automatiquement à partir du nom si vous la laissez vide."
              valeur={produit?.slug}
            />
          </div>
        </Carte>
      </FormulaireAdmin>
    </>
  );
}
