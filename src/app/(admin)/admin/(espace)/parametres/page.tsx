import type { Metadata } from "next";
import { FormulaireAdmin } from "@/components/admin/formulaire";
import { Bandeau, Carte, ChampTexte, ChampZone, EnTeteAdmin, MESSAGES_OK } from "@/components/admin/ui";
import { exigerAdmin } from "@/lib/admin/auth";
import type { Parametres } from "@/lib/types";
import { enregistrerParametres } from "./actions";

export const metadata: Metadata = { title: "Coordonnées & liens" };

export default async function PageParametres({ searchParams }: PageProps<"/admin/parametres">) {
  const { supabase } = await exigerAdmin();
  const { ok } = await searchParams;
  const { data } = await supabase.from("parametres").select("*").eq("id", 1).maybeSingle();
  const p = (data ?? {}) as Partial<Parametres>;

  return (
    <>
      <EnTeteAdmin titre="Coordonnées & liens" intro="Les informations de contact affichées partout sur le site." />
      <Bandeau message={typeof ok === "string" ? MESSAGES_OK[ok] : undefined} />

      <FormulaireAdmin action={enregistrerParametres} retour="/admin">
        <Carte className="space-y-5">
          <h2 className="text-xl">Contact</h2>
          <ChampTexte nom="email" label="E-mail" type="email" valeur={p.email} requis />
          <div className="grid gap-5 sm:grid-cols-2">
            <ChampTexte
              nom="whatsapp"
              label="Numéro WhatsApp"
              aide="Avec l’indicatif, sans + ni espaces. Ex. : 33766450977"
              valeur={p.whatsapp}
              requis
            />
            <ChampTexte nom="telephone_affiche" label="Téléphone affiché" aide="Tel qu’il apparaît sur le site." valeur={p.telephone_affiche} />
          </div>
          <ChampTexte nom="horaires" label="Horaires de permanence" valeur={p.horaires} />
          <ChampZone nom="adresse" label="Adresse du siège" aide="Affichée dans les mentions légales et pour le retrait sur place." valeur={p.adresse} lignes={3} />
        </Carte>

        <Carte className="space-y-5">
          <h2 className="text-xl">Réseaux sociaux</h2>
          <ChampTexte nom="instagram" label="Instagram" type="url" valeur={p.instagram} />
          <ChampTexte nom="tiktok" label="TikTok" type="url" valeur={p.tiktok} />
          <ChampTexte nom="facebook" label="Facebook" type="url" valeur={p.facebook} />
        </Carte>

        <Carte className="space-y-5">
          <h2 className="text-xl">Dons</h2>
          <ChampTexte
            nom="helloasso_don_url"
            label="Lien de la page de don HelloAsso"
            aide="Le bouton « Je donne chaque mois » pointera vers ce lien."
            type="url"
            valeur={p.helloasso_don_url}
          />
        </Carte>
      </FormulaireAdmin>
    </>
  );
}
