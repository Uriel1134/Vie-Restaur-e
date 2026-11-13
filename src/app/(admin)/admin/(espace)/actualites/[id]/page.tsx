import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BoutonSupprimer, FormulaireAdmin } from "@/components/admin/formulaire";
import { ChampPhotos } from "@/components/admin/photos";
import { Carte, ChampCase, ChampChoix, ChampTexte, ChampZone } from "@/components/admin/ui";
import { exigerAdmin } from "@/lib/admin/auth";
import { CATEGORIES_ACTU } from "@/lib/admin/constantes";
import { supabaseEnv } from "@/lib/supabase/env";
import type { Actualite } from "@/lib/types";
import { enregistrerActualite, supprimerActualite } from "../actions";

export const metadata: Metadata = { title: "Actualité" };

export default async function EditionActualite({ params }: PageProps<"/admin/actualites/[id]">) {
  const { id } = await params;
  const { supabase } = await exigerAdmin();
  const nouveau = id === "nouveau";

  let actu: Actualite | null = null;
  if (!nouveau) {
    const { data } = await supabase.from("actualites").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    actu = data as Actualite;
  }

  const aujourdhui = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Link href="/admin/actualites" className="text-[15px] font-medium text-bleu-profond hover:underline">
        ← Actualités
      </Link>
      <div className="mt-3 mb-8 flex items-end justify-between gap-4">
        <h1 className="text-[2rem] sm:text-[2.4rem]">{nouveau ? "Nouvelle actualité" : actu!.titre}</h1>
        {actu && (
          <BoutonSupprimer action={supprimerActualite.bind(null, actu.id)} question={`Supprimer « ${actu.titre} » ?`} />
        )}
      </div>

      <FormulaireAdmin action={enregistrerActualite.bind(null, actu?.id ?? null)} retour="/admin/actualites">
        <Carte className="space-y-5">
          <ChampTexte nom="titre" label="Titre" valeur={actu?.titre} requis />
          <div className="grid gap-5 sm:grid-cols-2">
            <ChampTexte nom="date" label="Date" type="date" valeur={actu?.date ?? aujourdhui} requis />
            <ChampChoix nom="categorie" label="Catégorie" valeur={actu?.categorie} options={CATEGORIES_ACTU} requis />
          </div>
          <ChampZone
            nom="extrait"
            label="Résumé"
            aide="Deux phrases maximum (280 caractères), affichées dans la liste des actualités."
            valeur={actu?.extrait}
            lignes={3}
            max={280}
          />
          <ChampZone
            nom="contenu"
            label="Texte complet"
            aide="Ligne vide entre deux paragraphes. Mise en forme : « ## » en début de ligne pour un intertitre, « > » pour une citation, et [[produits:adresse-1,adresse-2]] pour insérer des articles de la boutique (adresse = fin du lien de la fiche, ex. tissus-wax)."
            valeur={actu?.contenu}
            lignes={12}
          />
        </Carte>

        <Carte>
          <ChampPhotos
            nom="image"
            label="Image principale"
            valeur={actu?.image ? [actu.image] : []}
            multiple={false}
            dossier="actualites"
            env={supabaseEnv()!}
          />
        </Carte>

        <Carte className="space-y-5">
          <ChampCase
            nom="publie"
            label="Publier sur le site"
            aide="Laissez décoché pour garder l’actualité en brouillon."
            coche={actu?.publie ?? false}
          />
          <ChampTexte nom="slug" label="Adresse de la page" aide="Générée automatiquement à partir du titre." valeur={actu?.slug} />
        </Carte>
      </FormulaireAdmin>
    </>
  );
}
