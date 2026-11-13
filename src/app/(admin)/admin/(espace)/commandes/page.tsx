import type { Metadata } from "next";
import Link from "next/link";
import { Bandeau, BoutonLien, EnTeteAdmin, MESSAGES_OK, Pastille, Vide } from "@/components/admin/ui";
import { exigerAdmin } from "@/lib/admin/auth";
import { NOM_STATUT, STATUTS_COMMANDE, tonStatut } from "@/lib/admin/constantes";
import { dateCourte, euros } from "@/lib/format";
import type { Commande } from "@/lib/types";

export const metadata: Metadata = { title: "Commandes" };

export default async function Commandes({ searchParams }: PageProps<"/admin/commandes">) {
  const { supabase } = await exigerAdmin();
  const { ok, statut } = await searchParams;
  const filtre = typeof statut === "string" ? statut : undefined;

  let requete = supabase.from("commandes").select("*").order("created_at", { ascending: false }).limit(200);
  if (filtre) requete = requete.eq("statut", filtre);
  const { data } = await requete;
  const commandes = (data ?? []) as Commande[];

  const onglet = (valeur: string | undefined, label: string) => (
    <Link
      key={label}
      href={valeur ? `/admin/commandes?statut=${valeur}` : "/admin/commandes"}
      aria-current={filtre === valeur ? "page" : undefined}
      className="rounded-full px-4 py-2 text-sm font-medium text-bleu-profond hover:bg-white aria-[current=page]:bg-bleu-profond aria-[current=page]:text-white"
    >
      {label}
    </Link>
  );

  return (
    <>
      <EnTeteAdmin
        titre="Commandes"
        intro="Mettez à jour le statut au fil de la préparation."
        action={<BoutonLien href="/admin/commandes/nouveau">+ Saisir une commande</BoutonLien>}
      />
      <Bandeau message={typeof ok === "string" ? MESSAGES_OK[ok] : undefined} />

      <nav aria-label="Filtrer par statut" className="mb-6 flex flex-wrap gap-1">
        {onglet(undefined, "Toutes")}
        {STATUTS_COMMANDE.map((s) => onglet(s.value, s.label))}
      </nav>

      {commandes.length === 0 ? (
        <Vide>
          {filtre
            ? "Aucune commande avec ce statut."
            : "Aucune commande pour l’instant. Les commandes de la boutique en ligne arriveront ici ; vous pouvez aussi saisir celles reçues par WhatsApp."}
        </Vide>
      ) : (
        <div className="overflow-x-auto rounded-carte bg-white shadow-douce">
          <table className="w-full min-w-[640px] text-left text-[15px]">
            <thead className="border-b border-bleu-vie/15 text-sm text-texte/60">
              <tr>
                <th className="px-6 py-3 font-medium">Commande</th>
                <th className="px-3 py-3 font-medium">Client</th>
                <th className="px-3 py-3 font-medium">Date</th>
                <th className="px-3 py-3 text-right font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bleu-vie/10">
              {commandes.map((c) => (
                <tr key={c.id} className="hover:bg-lavande/50">
                  <td className="px-6 py-3">
                    <Link href={`/admin/commandes/${c.id}`} className="font-semibold text-bleu-profond hover:underline">
                      {c.numero}
                    </Link>
                  </td>
                  <td className="px-3 py-3">{c.client_nom}</td>
                  <td className="px-3 py-3 text-texte/70">{dateCourte(c.created_at)}</td>
                  <td className="px-3 py-3 text-right font-semibold text-bleu-nuit">{euros(Number(c.total))}</td>
                  <td className="px-6 py-3">
                    <Pastille ton={tonStatut(c.statut)}>{NOM_STATUT[c.statut]}</Pastille>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
