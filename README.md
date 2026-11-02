# Vie Restaurée — site & boutique

Site vitrine, boutique solidaire et (à venir) dashboard d'administration de l'association **Vie Restaurée**.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm run lint
npm run typecheck
```

## Stack

- **Next.js 16** (App Router, `cacheComponents` + `partialPrefetching` activés) — lire la doc embarquée dans `node_modules/next/dist/docs/` avant d'utiliser une API (voir `AGENTS.md`).
- **Tailwind CSS v4** : les couleurs, polices, rayons et ombres de la charte sont définis dans `src/app/globals.css` (`bg-ardoise`, `text-bleu-nuit`, `bg-ruban`, `rounded-carte`, `shadow-douce`, utilitaire `conteneur`…).
- Polices **Lora** (titres) et **Inter** (texte) via `next/font`.

## Organisation

| Chemin | Rôle |
| --- | --- |
| `src/config/site.ts` | Coordonnées, réseaux, navigation (valeurs « À CONFIRMER » à valider) |
| `src/components/layout/` | En-tête, pied de page, bouton WhatsApp flottant |
| `src/components/ui/` | Boutons (`ButtonLink`), ruban « Association » |
| `src/app/` | Pages ; celles non construites utilisent `PageEnPreparation` |
| `src/assets/brand/` | Logos officiels (ne pas recomposer) |
| `_brief/` | Brief client et charte graphique (non versionné) |

## Règles de la charte à respecter

- Un seul bouton jaune (`variant="principal"`) par écran, toujours avec du texte bleu nuit.
- Un seul ruban « Association » par page.
- Texte blanc sur ardoise uniquement pour les titres ≥ 24 px.
- Contenu max 1160 px, alternance de sections blanc / lavande / ardoise, bouton WhatsApp visible sur mobile.

## Feuille de route

1. ~~Socle Next.js, charte, en-tête/pied, accueil~~
2. Dashboard : Payload CMS + Postgres (produits, variantes, stock, commandes, actualités, événements, galerie)
3. Boutique : catalogue, panier, paiement Stripe, retrait / point relais
4. Dons récurrents et événements (HelloAsso)
5. Newsletter (Brevo), formulaires contact / bénévolat
6. Pages légales, SEO, mise en ligne
