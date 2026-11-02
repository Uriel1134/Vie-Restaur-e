import type { Metadata } from "next";
import { ACompleter, PageLegale } from "@/components/page-legale";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales et politique de confidentialité du site de l’association Vie Restaurée.",
};

export default function MentionsLegales() {
  return (
    <PageLegale
      titre="Mentions légales"
      intro="Qui édite ce site, qui l’héberge, et comment nous protégeons vos données."
      miseAJour="novembre 2026"
      sections={[
        {
          id: "editeur",
          titre: "Éditeur du site",
          contenu: (
            <>
              <p>
                Le site est édité par l’<strong>{site.legalName}</strong>, association régie par la loi du 1er juillet
                1901, déclarée sous le numéro RNA <strong>{site.rna}</strong> ({site.registeredIn}).
              </p>
              <ul>
                <li>Siège social : {site.adresse ?? <ACompleter>adresse postale du siège</ACompleter>}</li>
                <li>
                  E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>Téléphone : {site.phoneDisplay}</li>
                <li>Directrice de la publication : Joelle Tchankou, présidente</li>
              </ul>
            </>
          ),
        },
        {
          id: "hebergeur",
          titre: "Hébergement",
          contenu: (
            <p>
              <ACompleter>nom, adresse et téléphone de l’hébergeur, une fois choisi</ACompleter>
            </p>
          ),
        },
        {
          id: "propriete",
          titre: "Propriété intellectuelle",
          contenu: (
            <p>
              Les textes, logos, photographies et éléments graphiques de ce site appartiennent à l’association Vie
              Restaurée ou sont utilisés avec l’accord de leurs auteurs. Toute reproduction sans autorisation écrite
              préalable est interdite. Les personnes photographiées ont donné leur accord pour la diffusion de leur
              image.
            </p>
          ),
        },
        {
          id: "donnees",
          titre: "Données personnelles",
          contenu: (
            <>
              <p>
                Les formulaires du site ne stockent aucune donnée : ils préparent un message que vous envoyez vous-même
                depuis votre messagerie ou WhatsApp. Les informations que vous nous transmettez (nom, coordonnées,
                message, commande) servent uniquement à vous répondre, à traiter votre commande ou votre engagement
                bénévole. Elles ne sont jamais vendues ni cédées.
              </p>
              <p>
                Elles sont conservées le temps nécessaire à ces finalités, et au plus trois ans après notre dernier
                échange, sauf obligation légale (par exemple comptable pour les commandes).
              </p>
              <p>
                Conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et
                Libertés, vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition et de
                portabilité. Pour l’exercer, écrivez à <a href={`mailto:${site.email}`}>{site.email}</a>. Vous pouvez
                également adresser une réclamation à la CNIL (cnil.fr).
              </p>
            </>
          ),
        },
        {
          id: "cookies",
          titre: "Cookies",
          contenu: (
            <p>
              Ce site n’utilise aucun cookie publicitaire ni outil de mesure d’audience. Les polices de caractères sont
              hébergées sur notre propre serveur : aucune donnée n’est transmise à des tiers lors de votre visite. Si
              cela venait à changer, un bandeau vous demanderait votre consentement.
            </p>
          ),
        },
        {
          id: "liens",
          titre: "Liens externes",
          contenu: (
            <p>
              Le site contient des liens vers des services tiers (WhatsApp, Instagram, plateforme de dons). Leur
              utilisation est soumise à leurs propres conditions et politiques de confidentialité.
            </p>
          ),
        },
      ]}
    />
  );
}
