-- Vie Restaurée — 8e rayon « Jouets d'éveil » (novembre 2026).
-- À exécuter dans Supabase : SQL Editor → coller ce fichier → Run.
alter table public.produits drop constraint if exists produits_rayon_check;
alter table public.produits
  add constraint produits_rayon_check
  check (rayon in ('animations', 'flocage', 'bijoux', 'dessin', 'tissus', 'puzzles', 'livres', 'jouets'));
