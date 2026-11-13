-- Vie Restaurée — catégorie d'actualité « La boutique » (articles qui présentent les créations).
-- À exécuter dans Supabase : SQL Editor → coller ce fichier → Run.
alter table public.actualites drop constraint if exists actualites_categorie_check;
alter table public.actualites
  add constraint actualites_categorie_check
  check (categorie in ('terrain', 'temoignage', 'evenement', 'communique', 'boutique'));
