import type { Metadata } from "next";
import { FormulaireAdmin } from "@/components/admin/formulaire";
import { Bandeau, Carte, ChampTexte, EnTeteAdmin, MESSAGES_OK } from "@/components/admin/ui";
import { exigerAdmin } from "@/lib/admin/auth";
import { changerMotDePasse } from "./actions";

export const metadata: Metadata = { title: "Mon compte" };

export default async function Compte({ searchParams }: PageProps<"/admin/compte">) {
  const { user } = await exigerAdmin();
  const { ok } = await searchParams;

  return (
    <>
      <EnTeteAdmin titre="Mon compte" intro={`Connectée avec ${user.email}`} />
      <Bandeau message={ok === "enregistre" ? "Mot de passe modifié." : typeof ok === "string" ? MESSAGES_OK[ok] : undefined} />
      <FormulaireAdmin action={changerMotDePasse} retour="/admin" libelle="Changer le mot de passe">
        <Carte className="max-w-xl space-y-5">
          <h2 className="text-xl">Changer de mot de passe</h2>
          <ChampTexte nom="actuel" label="Mot de passe actuel" type="password" requis />
          <ChampTexte nom="nouveau" label="Nouveau mot de passe" aide="10 caractères minimum. Une phrase courte est idéale." type="password" requis />
          <ChampTexte nom="confirmation" label="Confirmer le nouveau mot de passe" type="password" requis />
        </Carte>
      </FormulaireAdmin>
    </>
  );
}
