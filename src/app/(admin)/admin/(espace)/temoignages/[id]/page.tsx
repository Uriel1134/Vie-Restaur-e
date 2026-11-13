import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BoutonSupprimer, FormulaireAdmin } from "@/components/admin/formulaire";
import { ChampPhotos } from "@/components/admin/photos";
import { Carte, ChampCase, ChampTexte, ChampZone } from "@/components/admin/ui";
import { exigerAdmin } from "@/lib/admin/auth";
import { supabaseEnv } from "@/lib/supabase/env";
import type { Temoignage } from "@/lib/types";
import { enregistrerTemoignage, supprimerTemoignage } from "../actions";

export const metadata: Metadata = { title: "Témoignage" };

export default async function EditionTemoignage({ params }: PageProps<"/admin/temoignages/[id]">) {
  const { id } = await params;
  const { supabase } = await exigerAdmin();
  const nouveau = id === "nouveau";

  let t: Temoignage | null = null;
  if (!nouveau) {
    const { data } = await supabase.from("temoignages").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    t = data as Temoignage;
  }

  return (
    <>
      <Link href="/admin/temoignages" className="text-[15px] font-medium text-bleu-profond hover:underline">
        ← Témoignages
      </Link>
      <div className="mt-3 mb-8 flex items-end justify-between gap-4">
        <h1 className="text-[2rem] sm:text-[2.4rem]">{nouveau ? "Nouveau témoignage" : `Témoignage de ${t!.auteur}`}</h1>
        {t && <BoutonSupprimer action={supprimerTemoignage.bind(null, t.id)} question="Supprimer ce témoignage ?" />}
      </div>

      <FormulaireAdmin action={enregistrerTemoignage.bind(null, t?.id ?? null)} retour="/admin/temoignages">
        <Carte className="space-y-5">
          <ChampZone
            nom="citation"
            label="Citation"
            aide="Les mots de la personne, courts et sincères (400 caractères maximum). Sans les guillemets."
            valeur={t?.citation}
            lignes={4}
            max={400}
            requis
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <ChampTexte nom="auteur" label="Prénom" aide="Un prénom suffit, avec l’accord de la personne." valeur={t?.auteur} requis />
            <ChampTexte nom="lieu" label="Lieu" aide="Ex. : Douala, Cameroun (facultatif)" valeur={t?.lieu} />
          </div>
        </Carte>
        <Carte>
          <ChampPhotos
            nom="photo"
            label="Photo (facultatif)"
            aide="Uniquement avec l’accord écrit de la personne."
            valeur={t?.photo ? [t.photo] : []}
            multiple={false}
            dossier="temoignages"
            env={supabaseEnv()!}
          />
        </Carte>
        <Carte className="grid gap-5 sm:grid-cols-2">
          <ChampCase nom="publie" label="Publier sur l’accueil" coche={t?.publie ?? false} />
          <ChampTexte
            nom="ordre"
            label="Ordre d’affichage"
            aide="Le plus petit s’affiche en premier."
            type="number"
            valeur={t?.ordre ?? 0}
          />
        </Carte>
      </FormulaireAdmin>
    </>
  );
}
