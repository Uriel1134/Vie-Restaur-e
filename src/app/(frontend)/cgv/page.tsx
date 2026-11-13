import type { Metadata } from "next";
import { ACompleter, PageLegale } from "@/components/page-legale";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente de la boutique solidaire de l’association Vie Restaurée.",
};

export default function CGV() {
  return (
    <PageLegale
      titre="Conditions générales de vente"
      intro="Les règles qui encadrent vos achats à la boutique solidaire, écrites le plus simplement possible."
      miseAJour="novembre 2026"
      sections={[
        {
          id: "vendeur",
          titre: "Le vendeur",
          contenu: (
            <p>
              Les ventes sont réalisées par l’<strong>{site.legalName}</strong>, association loi 1901, RNA {site.rna},
              dont le siège est situé {site.adresse ?? <ACompleter>adresse postale du siège</ACompleter>}. Contact :{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>. Les recettes de la boutique financent les actions de
              l’association.
            </p>
          ),
        },
        {
          id: "articles",
          titre: "Articles et prestations",
          contenu: (
            <p>
              La boutique propose des tissus et tenues africaines, des bijoux en acier inoxydable, des vêtements et
              accessoires floqués, des jouets d’éveil, des livres, des puzzles, ainsi que des ateliers et animations. Les photos sont aussi fidèles que possible ; de
              légères variations de teinte peuvent exister. Les articles sont proposés dans la limite des stocks
              disponibles.
            </p>
          ),
        },
        {
          id: "prix",
          titre: "Prix",
          contenu: (
            <p>
              Les prix sont indiqués en euros. Le prix applicable est celui affiché au moment de la commande. Les
              éventuels frais de livraison en point relais sont précisés avant la validation de la commande ; le
              retrait sur place est gratuit. <ACompleter>régime de TVA applicable à l’association</ACompleter>
            </p>
          ),
        },
        {
          id: "commande",
          titre: "Commande",
          contenu: (
            <p>
              La commande est confirmée après validation du paiement. Vous recevez alors un récapitulatif par e-mail
              ou par message. L’association se réserve le droit d’annuler une commande en cas de litige de paiement
              antérieur ou de rupture de stock ; vous êtes alors intégralement remboursé.
            </p>
          ),
        },
        {
          id: "paiement",
          titre: "Paiement",
          contenu: (
            <p>
              Les commandes se passent par WhatsApp. Le moyen de paiement est convenu avec vous à cette occasion : carte bancaire, PayPal, virement bancaire, Wero ou
              Mobile Money. Les paiements en ligne sont traités par des prestataires sécurisés ; l’association n’a
              jamais accès à vos coordonnées bancaires complètes.
            </p>
          ),
        },
        {
          id: "livraison",
          titre: "Retrait et livraison",
          contenu: (
            <ul>
              <li>
                <strong>Retrait sur place</strong>, pendant la permanence ({site.hours.toLowerCase()}), sur
                rendez-vous.
              </li>
              <li>
                <strong>Livraison en point relais</strong>, dans un délai indiqué lors de la commande.
              </li>
            </ul>
          ),
        },
        {
          id: "retractation",
          titre: "Droit de rétractation",
          contenu: (
            <p>
              Conformément au Code de la consommation, vous disposez de 14 jours à compter de la réception d’un
              article pour vous rétracter, sans avoir à vous justifier. Ce droit ne s’applique pas aux articles
              personnalisés selon vos indications, ni aux prestations d’animation pleinement exécutées.
            </p>
          ),
        },
        {
          id: "retours",
          titre: "Retours et échanges",
          contenu: (
            <p>
              Au-delà de ce minimum légal, l’association accepte les <strong>retours et échanges sous 20 jours</strong>{" "}
              après réception, pour tout article non personnalisé, non porté et dans son état d’origine. Contactez-nous
              avant tout renvoi. Le remboursement intervient dans les 14 jours suivant la réception de l’article
              retourné, par le même moyen de paiement.
            </p>
          ),
        },
        {
          id: "garanties",
          titre: "Garanties légales",
          contenu: (
            <p>
              Tous les articles bénéficient de la garantie légale de conformité (articles L.217-3 et suivants du Code
              de la consommation) et de la garantie des vices cachés (articles 1641 et suivants du Code civil).
            </p>
          ),
        },
        {
          id: "litiges",
          titre: "Réclamations et litiges",
          contenu: (
            <p>
              Pour toute réclamation, écrivez-nous à <a href={`mailto:${site.email}`}>{site.email}</a> : nous
              cherchons toujours une solution amiable. À défaut, vous pouvez recourir gratuitement à un médiateur de la
              consommation : <ACompleter>nom et coordonnées du médiateur</ACompleter>. Les présentes conditions sont
              soumises au droit français.
            </p>
          ),
        },
      ]}
    />
  );
}
