import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BoutonSupprimer, FormulaireAdmin } from "@/components/admin/formulaire";
import { ChampPhotos } from "@/components/admin/photos";
import { Carte, ChampTexte, ChampZone } from "@/components/admin/ui";
import { exigerAdmin } from "@/lib/admin/auth";
import { supabaseEnv } from "@/lib/supabase/env";
import type { Evenement } from "@/lib/types";
import { enregistrerEvenement, supprimerEvenement } from "../actions";

export const metadata: Metadata = { title: "Événement" };

/** Instant ISO → valeur « AAAA-MM-JJTHH:MM » en heure de Paris, pour le champ datetime-local. */
function versChampLocal(iso: string) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("fr-FR", {
      timeZone: "Europe/Paris",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date(iso))
      .map((x) => [x.type, x.value]),
  );
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

export default async function EditionEvenement({ params }: PageProps<"/admin/agenda/[id]">) {
  const { id } = await params;
  const { supabase } = await exigerAdmin();
  const nouveau = id === "nouveau";

  let ev: Evenement | null = null;
  if (!nouveau) {
    const { data } = await supabase.from("evenements").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    ev = data as Evenement;
  }

  return (
    <>
      <Link href="/admin/agenda" className="text-[15px] font-medium text-bleu-profond hover:underline">
        ← Agenda
      </Link>
      <div className="mt-3 mb-8 flex items-end justify-between gap-4">
        <h1 className="text-[2rem] sm:text-[2.4rem]">{nouveau ? "Nouvel événement" : ev!.titre}</h1>
        {ev && <BoutonSupprimer action={supprimerEvenement.bind(null, ev.id)} question={`Supprimer « ${ev.titre} » ?`} />}
      </div>

      <FormulaireAdmin action={enregistrerEvenement.bind(null, ev?.id ?? null)} retour="/admin/agenda">
        <Carte className="space-y-5">
          <ChampTexte nom="titre" label="Titre" valeur={ev?.titre} requis />
          <div className="grid gap-5 sm:grid-cols-2">
            <ChampTexte
              nom="date"
              label="Date et heure"
              aide="Heure de Paris."
              type="datetime-local"
              valeur={ev ? versChampLocal(ev.date) : undefined}
              requis
            />
            <ChampTexte nom="lieu" label="Lieu" valeur={ev?.lieu} requis />
          </div>
          <ChampZone nom="description" label="Description" valeur={ev?.description} lignes={4} />
          <ChampTexte
            nom="lien_inscription"
            label="Lien d’inscription"
            aide="Par exemple la page HelloAsso de l’événement (facultatif)."
            type="url"
            valeur={ev?.lien_inscription}
          />
        </Carte>
        <Carte>
          <ChampPhotos
            nom="image"
            label="Image"
            valeur={ev?.image ? [ev.image] : []}
            multiple={false}
            dossier="agenda"
            env={supabaseEnv()!}
          />
        </Carte>
      </FormulaireAdmin>
    </>
  );
}
