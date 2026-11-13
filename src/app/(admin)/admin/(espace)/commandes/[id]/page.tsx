import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FormulaireAdmin } from "@/components/admin/formulaire";
import { EditeurLignes } from "@/components/admin/lignes-commande";
import { Bandeau, Carte, ChampChoix, ChampTexte, ChampZone, MESSAGES_OK, Pastille } from "@/components/admin/ui";
import { exigerAdmin } from "@/lib/admin/auth";
import { NOM_STATUT, STATUTS_COMMANDE, tonStatut } from "@/lib/admin/constantes";
import { dateHeure, euros } from "@/lib/format";
import type { Commande } from "@/lib/types";
import { changerStatut, enregistrerCommande } from "../actions";

export const metadata: Metadata = { title: "Commande" };

const MOYENS = [
  { value: "", label: "—" },
  { value: "carte", label: "Carte bancaire" },
  { value: "paypal", label: "PayPal" },
  { value: "virement", label: "Virement" },
  { value: "wero", label: "Wero" },
  { value: "especes", label: "Espèces" },
  { value: "autre", label: "Autre" },
];

const LIVRAISON = [
  { value: "retrait", label: "Retrait sur place" },
  { value: "relais", label: "Point relais" },
];

export default async function FicheCommande({ params, searchParams }: PageProps<"/admin/commandes/[id]">) {
  const { id } = await params;
  const { ok } = await searchParams;
  const { supabase } = await exigerAdmin();
  const nouveau = id === "nouveau";

  let commande: Commande | null = null;
  if (!nouveau) {
    const { data } = await supabase.from("commandes").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    commande = data as Commande;
  }

  const { data: prods } = await supabase.from("produits").select("id, nom, prix").order("nom");
  const produits = (prods ?? []).map((p) => ({ id: p.id as string, nom: p.nom as string, prix: Number(p.prix) }));

  return (
    <>
      <Link href="/admin/commandes" className="text-[15px] font-medium text-bleu-profond hover:underline">
        ← Commandes
      </Link>
      <div className="mt-3 mb-8">
        <h1 className="text-[2rem] sm:text-[2.4rem]">{nouveau ? "Saisir une commande" : `Commande ${commande!.numero}`}</h1>
        {commande && (
          <p className="mt-1 font-serif text-bleu-profond italic first-letter:uppercase">
            Passée le {dateHeure(commande.created_at)} · {euros(Number(commande.total))}
          </p>
        )}
      </div>
      <Bandeau message={typeof ok === "string" ? MESSAGES_OK[ok] : undefined} />

      {/* Changement rapide de statut */}
      {commande && (
        <Carte className="mb-6">
          <form action={changerStatut.bind(null, commande.id)} className="flex flex-wrap items-center gap-3">
            <span className="text-[15px] text-bleu-nuit">Statut actuel :</span>
            <Pastille ton={tonStatut(commande.statut)}>{NOM_STATUT[commande.statut]}</Pastille>
            <span className="text-texte/40">→</span>
            <select
              name="statut"
              defaultValue={commande.statut}
              aria-label="Nouveau statut"
              className="rounded-xl border border-bleu-vie/30 bg-white px-3 py-2 text-[15px]"
            >
              {STATUTS_COMMANDE.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <button type="submit" className="rounded-full bg-bleu-profond px-5 py-2 text-[15px] font-semibold text-white hover:bg-bleu-nuit">
              Mettre à jour
            </button>
          </form>
        </Carte>
      )}

      <FormulaireAdmin action={enregistrerCommande.bind(null, commande?.id ?? null)} retour="/admin/commandes">
        <Carte className="space-y-5">
          <h2 className="text-xl">Client</h2>
          <ChampTexte nom="client_nom" label="Nom" valeur={commande?.client_nom} requis />
          <div className="grid gap-5 sm:grid-cols-2">
            <ChampTexte nom="client_email" label="E-mail" type="email" valeur={commande?.client_email} requis />
            <ChampTexte nom="client_telephone" label="Téléphone" valeur={commande?.client_telephone} />
          </div>
        </Carte>

        <Carte>
          <EditeurLignes nom="lignes" valeur={commande?.lignes} produits={produits} />
        </Carte>

        <Carte className="space-y-5">
          <h2 className="text-xl">Livraison & paiement</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <ChampChoix nom="livraison_mode" label="Mode de livraison" valeur={commande?.livraison_mode} options={LIVRAISON} />
            <ChampTexte nom="livraison_frais" label="Frais de livraison (€)" type="number" step="0.5" min={0} valeur={commande?.livraison_frais ?? 0} />
          </div>
          <ChampZone nom="point_relais" label="Point relais choisi" aide="Seulement pour une livraison en point relais." valeur={commande?.point_relais} lignes={2} />
          <div className="grid gap-5 sm:grid-cols-2">
            <ChampChoix nom="statut" label="Statut" valeur={commande?.statut ?? "attente"} options={STATUTS_COMMANDE} />
            <ChampChoix nom="paiement_moyen" label="Moyen de paiement" valeur={commande?.paiement_moyen ?? ""} options={MOYENS} />
          </div>
          {commande?.paiement_reference && (
            <p className="text-sm text-texte/60">Référence de paiement : {commande.paiement_reference}</p>
          )}
          <ChampZone nom="notes" label="Notes internes" aide="Visibles seulement dans le dashboard." valeur={commande?.notes} lignes={3} />
        </Carte>
      </FormulaireAdmin>
    </>
  );
}
