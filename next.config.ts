import type { NextConfig } from "next";

/** En-têtes de sécurité appliqués à toutes les pages. */
const securite = [
  // Interdit d'afficher le site dans une page tierce (anti-« clickjacking »).
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
  // Empêche le navigateur de deviner le type d'un fichier.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Ne transmet que le domaine (pas l'adresse complète) aux sites externes.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Le site n'utilise ni caméra, ni micro, ni géolocalisation.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // HTTPS obligatoire pendant 2 ans (ignoré en local, en HTTP).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  // Photos servies telles quelles (Supabase Storage, déjà optimisées en WebP) : pas de service d’images payant.
  images: { unoptimized: true },
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securite },
      // Le dashboard ne doit jamais être mis en cache par un intermédiaire.
      { source: "/admin/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },
  experimental: {
    // Deux layouts racines (site public + dashboard /admin) : 404 globale dédiée.
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
