-- Vie Restaurée — témoignages affichés sur l'accueil
-- À exécuter dans Supabase : SQL Editor → coller ce fichier → Run (après 0001_schema.sql).

create table if not exists public.temoignages (
  id uuid primary key default gen_random_uuid(),
  citation text not null check (char_length(citation) <= 400),
  auteur text not null,           -- un prénom suffit
  lieu text,                      -- ex. « Douala, Cameroun »
  photo text,
  publie boolean not null default false,
  ordre integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger temoignages_updated_at before update on public.temoignages
  for each row execute function public.maj_updated_at();

alter table public.temoignages enable row level security;

create policy "temoignages: lecture publique des témoignages publiés" on public.temoignages
  for select using (publie or public.est_admin());
create policy "temoignages: écriture admin" on public.temoignages
  for all using (public.est_admin()) with check (public.est_admin());
