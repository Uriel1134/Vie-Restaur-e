-- Vie Restaurée — panier et bon de commande envoyé par WhatsApp (novembre 2026).
-- À exécuter dans Supabase : SQL Editor → coller ce fichier → Run.
--
-- Principe de sécurité :
--  • le visiteur ne touche JAMAIS directement la table commandes (RLS : admin uniquement) ;
--  • il passe par la fonction creer_commande(), qui vérifie tout et RECALCULE les prix depuis la base ;
--  • chaque commande reçoit un jeton secret (UUID) : seul ce lien permet d'afficher le bon de commande,
--    via voir_commande(), qui ne renvoie ni téléphone ni e-mail.

alter table public.commandes alter column client_email drop not null;
alter table public.commandes add column if not exists jeton uuid not null default gen_random_uuid();
create unique index if not exists commandes_jeton on public.commandes (jeton);

create or replace function public.creer_commande(
  p_nom text,
  p_telephone text,
  p_livraison text,
  p_notes text,
  p_lignes jsonb
)
returns table (numero text, jeton uuid)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_nom text := btrim(coalesce(p_nom, ''));
  v_tel text := btrim(coalesce(p_telephone, ''));
  v_notes text := nullif(left(btrim(coalesce(p_notes, '')), 500), '');
  v_lignes jsonb := '[]'::jsonb;
  v_total numeric := 0;
  l jsonb;
  p record;
  v_q int;
  v_var text;
  v_prix numeric;
begin
  if char_length(v_nom) not between 2 and 60 then raise exception 'nom invalide'; end if;
  if v_tel !~ '^[0-9 +().-]{6,30}$' then raise exception 'telephone invalide'; end if;
  if p_livraison not in ('retrait', 'relais') then raise exception 'livraison invalide'; end if;
  if jsonb_typeof(p_lignes) <> 'array' or jsonb_array_length(p_lignes) not between 1 and 30 then
    raise exception 'panier invalide';
  end if;

  -- Anti-inondation : au plus 30 commandes par tranche de 10 minutes sur tout le site.
  if (select count(*) from commandes where created_at > now() - interval '10 minutes') >= 30 then
    raise exception 'trop de commandes, réessayez plus tard';
  end if;

  for l in select * from jsonb_array_elements(p_lignes) loop
    select id, nom, slug, prix, photos, variantes into p
      from produits where slug = l ->> 'slug' and en_ligne;
    continue when not found;

    v_q := least(greatest(coalesce((l ->> 'quantite')::int, 1), 1), 20);
    v_var := nullif(left(btrim(coalesce(l ->> 'variante', '')), 60), '');

    -- Prix : celui de la variante choisie s'il existe, sinon celui du produit (null = sur demande).
    v_prix := p.prix;
    if v_var is not null then
      select coalesce((v ->> 'prix')::numeric, p.prix) into v_prix
        from jsonb_array_elements(p.variantes) v
        where concat_ws(' · ', nullif(v ->> 'taille', ''), nullif(v ->> 'couleur', '')) = v_var
        limit 1;
      v_prix := coalesce(v_prix, p.prix);
    end if;

    v_lignes := v_lignes || jsonb_build_object(
      'produit_id', p.id,
      'slug', p.slug,
      'libelle', p.nom,
      'variante', v_var,
      'quantite', v_q,
      'prix_unitaire', coalesce(v_prix, 0),
      'prix_sur_demande', v_prix is null,
      'photo', p.photos[1]
    );
    v_total := v_total + coalesce(v_prix, 0) * v_q;
  end loop;

  if jsonb_array_length(v_lignes) = 0 then raise exception 'panier vide'; end if;

  insert into commandes (client_nom, client_telephone, lignes, livraison_mode, total, notes, statut)
  values (v_nom, v_tel, v_lignes, p_livraison, v_total, v_notes, 'attente')
  returning commandes.numero, commandes.jeton into numero, jeton;
  return next;
end;
$$;

-- Lecture d'un bon de commande par son lien secret (sans données de contact).
create or replace function public.voir_commande(p_jeton uuid)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'numero', numero,
    'prenom', client_nom,
    'date', created_at,
    'statut', statut,
    'livraison', livraison_mode,
    'lignes', lignes,
    'total', total,
    'notes', notes
  )
  from commandes
  where jeton = p_jeton;
$$;

revoke all on function public.creer_commande(text, text, text, text, jsonb) from public;
revoke all on function public.voir_commande(uuid) from public;
grant execute on function public.creer_commande(text, text, text, text, jsonb) to anon, authenticated;
grant execute on function public.voir_commande(uuid) to anon, authenticated;
