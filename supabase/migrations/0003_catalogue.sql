-- Vie Restaurée — catalogue réel (novembre 2026)
-- À exécuter dans Supabase : SQL Editor → coller ce fichier → Run.
-- 1. Les 7 rayons du catalogue de l'association.
-- 2. Prix facultatif : vide = « Prix sur demande » (commande et renseignements par WhatsApp).

alter table public.produits drop constraint if exists produits_rayon_check;

update public.produits set rayon = 'flocage' where rayon = 'vetements';
update public.produits set rayon = 'livres' where rayon = 'livre';

alter table public.produits
  add constraint produits_rayon_check
  check (rayon in ('animations', 'flocage', 'bijoux', 'dessin', 'tissus', 'puzzles', 'livres'));

alter table public.produits alter column prix drop not null;

-- Ordre d'affichage dans un rayon (plus petit = en premier).
alter table public.produits add column if not exists ordre integer not null default 0;

-- Stock facultatif : vide = non suivi (article toujours proposé, la disponibilité se confirme sur WhatsApp).
alter table public.produits alter column stock drop not null;
alter table public.produits alter column stock drop default;
