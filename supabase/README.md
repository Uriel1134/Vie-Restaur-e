# Mise en place de Supabase

1. **Créer le schéma** : Supabase → *SQL Editor* → coller `migrations/0001_schema.sql` → *Run*,
   puis faire de même avec `migrations/0002_temoignages.sql`.
   Cela crée les tables (produits, commandes, actualités, agenda, paramètres), les règles de sécurité (RLS)
   et le bucket public `medias` pour les photos.
2. **Fermer les inscriptions** : *Authentication → Sign In / Providers* → désactiver « Allow new users to sign up ».
3. **Créer le compte de la présidente** : *Authentication → Users → Add user* (e-mail + mot de passe, « Auto Confirm »).
4. **Lui donner l'accès au dashboard** : dans *SQL Editor*, en remplaçant l'e-mail :

   ```sql
   insert into public.admins (user_id, nom)
   select id, 'Joelle Tchankou' from auth.users where email = 'vierestauree2022@gmail.com';
   ```

5. **Variables d'environnement** : *Project Settings → API* → copier l'URL du projet et la clé
   *publishable* (ou *anon*) dans `.env.local` (voir `.env.example`).

La clé publishable peut être exposée côté navigateur : la sécurité repose sur les règles RLS du schéma.
Ne jamais mettre la clé `service_role` / *secret* dans une variable `NEXT_PUBLIC_`.
