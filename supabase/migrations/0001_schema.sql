-- Vie Restaurée — schéma initial
-- À exécuter dans Supabase : SQL Editor → coller ce fichier → Run.
-- Principe de sécurité : lecture publique des seuls contenus publiés,
-- écriture réservée aux comptes listés dans la table `admins` (RLS).

-- ─────────────────────────────────────────────────────────────
-- Administrateurs
-- ─────────────────────────────────────────────────────────────
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  nom text,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create or replace function public.est_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

create policy "admins: lecture par un admin" on public.admins
  for select using (public.est_admin());

-- Mise à jour automatique de updated_at
create or replace function public.maj_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ─────────────────────────────────────────────────────────────
-- Produits (boutique)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.produits (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  slug text not null unique,
  rayon text not null check (rayon in ('vetements', 'bijoux', 'livre', 'animations')),
  description text,
  prix numeric(10, 2) not null check (prix >= 0),
  photos text[] not null default '{}',
  -- [{ "taille": "M", "couleur": "Bleu", "stock": 5, "prix": null }]
  variantes jsonb not null default '[]'::jsonb,
  stock integer not null default 0 check (stock >= 0),
  en_ligne boolean not null default true,
  en_vedette boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger produits_updated_at before update on public.produits
  for each row execute function public.maj_updated_at();

alter table public.produits enable row level security;

create policy "produits: lecture publique des articles en ligne" on public.produits
  for select using (en_ligne or public.est_admin());
create policy "produits: écriture admin" on public.produits
  for all using (public.est_admin()) with check (public.est_admin());

-- ─────────────────────────────────────────────────────────────
-- Commandes (données personnelles : admin uniquement)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.commandes (
  id uuid primary key default gen_random_uuid(),
  numero text not null unique
    default ('VR-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(md5(random()::text), 1, 4))),
  statut text not null default 'attente'
    check (statut in ('attente', 'payee', 'prete', 'livree', 'annulee', 'remboursee')),
  client_nom text not null,
  client_email text not null,
  client_telephone text,
  -- [{ "produit_id": "...", "libelle": "...", "variante": "M · Bleu", "quantite": 1, "prix_unitaire": 20 }]
  lignes jsonb not null default '[]'::jsonb,
  livraison_mode text not null default 'retrait' check (livraison_mode in ('retrait', 'relais')),
  livraison_frais numeric(10, 2) not null default 0,
  point_relais text,
  total numeric(10, 2) not null default 0,
  paiement_moyen text,
  paiement_reference text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger commandes_updated_at before update on public.commandes
  for each row execute function public.maj_updated_at();

alter table public.commandes enable row level security;

-- Les commandes sont créées côté serveur (clé secrète, après paiement Stripe) ;
-- aucune lecture ni écriture publique.
create policy "commandes: accès admin" on public.commandes
  for all using (public.est_admin()) with check (public.est_admin());

-- ─────────────────────────────────────────────────────────────
-- Actualités
-- ─────────────────────────────────────────────────────────────
create table if not exists public.actualites (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  slug text not null unique,
  date date not null default current_date,
  categorie text not null default 'terrain'
    check (categorie in ('terrain', 'temoignage', 'evenement', 'communique')),
  image text,
  extrait text check (char_length(extrait) <= 280),
  contenu text,
  publie boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger actualites_updated_at before update on public.actualites
  for each row execute function public.maj_updated_at();

alter table public.actualites enable row level security;

create policy "actualites: lecture publique des articles publiés" on public.actualites
  for select using (publie or public.est_admin());
create policy "actualites: écriture admin" on public.actualites
  for all using (public.est_admin()) with check (public.est_admin());

-- ─────────────────────────────────────────────────────────────
-- Agenda
-- ─────────────────────────────────────────────────────────────
create table if not exists public.evenements (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  date timestamptz not null,
  lieu text not null,
  description text,
  lien_inscription text,
  image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger evenements_updated_at before update on public.evenements
  for each row execute function public.maj_updated_at();

alter table public.evenements enable row level security;

create policy "evenements: lecture publique" on public.evenements for select using (true);
create policy "evenements: écriture admin" on public.evenements
  for all using (public.est_admin()) with check (public.est_admin());

-- ─────────────────────────────────────────────────────────────
-- Paramètres du site (une seule ligne, id = 1)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.parametres (
  id smallint primary key default 1 check (id = 1),
  email text not null default 'vierestauree2022@gmail.com',
  whatsapp text not null default '33766450977',
  telephone_affiche text not null default '+33 7 66 45 09 77',
  horaires text not null default 'Du lundi au vendredi, 9 h 30 – 17 h 00',
  adresse text,
  instagram text default 'https://www.instagram.com/le_salondev/',
  tiktok text,
  facebook text,
  helloasso_don_url text,
  updated_at timestamptz not null default now()
);

insert into public.parametres (id) values (1) on conflict (id) do nothing;

create trigger parametres_updated_at before update on public.parametres
  for each row execute function public.maj_updated_at();

alter table public.parametres enable row level security;

create policy "parametres: lecture publique" on public.parametres for select using (true);
create policy "parametres: modification admin" on public.parametres
  for update using (public.est_admin()) with check (public.est_admin());

-- ─────────────────────────────────────────────────────────────
-- Stockage des photos (bucket public en lecture)
-- ─────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('medias', 'medias', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "medias: envoi par un admin" on storage.objects
  for insert with check (bucket_id = 'medias' and public.est_admin());
create policy "medias: modification par un admin" on storage.objects
  for update using (bucket_id = 'medias' and public.est_admin());
create policy "medias: suppression par un admin" on storage.objects
  for delete using (bucket_id = 'medias' and public.est_admin());
