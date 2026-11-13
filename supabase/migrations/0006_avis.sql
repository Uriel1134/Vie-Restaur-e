-- Vie Restaurée — avis laissés par les visiteurs (novembre 2026).
-- À exécuter dans Supabase : SQL Editor → coller ce fichier → Run.
--
-- Sécurité :
--  • tout visiteur peut DÉPOSER un avis, mais il arrive toujours « en attente » (publie = false) ;
--  • seuls les avis publiés par l'administratrice sont lisibles publiquement ;
--  • les longueurs sont bornées par la base elle-même (anti-abus).

create table if not exists public.avis (
  id uuid primary key default gen_random_uuid(),
  nom text not null check (char_length(btrim(nom)) between 2 and 60),
  lieu text check (lieu is null or char_length(lieu) <= 60),
  note smallint not null check (note between 1 and 5),
  message text not null check (char_length(btrim(message)) between 10 and 600),
  publie boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists avis_publies on public.avis (publie, created_at desc);

alter table public.avis enable row level security;

create policy "avis: lecture publique des avis publiés" on public.avis
  for select using (publie or public.est_admin());

-- Dépôt public : uniquement des avis non publiés.
create policy "avis: dépôt public en attente de modération" on public.avis
  for insert to anon, authenticated with check (publie = false);

create policy "avis: modération admin" on public.avis
  for update using (public.est_admin()) with check (public.est_admin());

create policy "avis: suppression admin" on public.avis
  for delete using (public.est_admin());
