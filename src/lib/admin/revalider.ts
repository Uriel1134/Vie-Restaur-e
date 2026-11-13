import { revalidatePath } from "next/cache";

/** Pages publiques à régénérer après une modification dans le dashboard. */
const PAGES: Record<string, string[]> = {
  produits: ["/boutique", "/"],
  actualites: ["/actualites", "/"],
  evenements: ["/actualites", "/"],
  temoignages: ["/"],
  avis: ["/"],
  parametres: ["/"],
};

export function revaliderSite(sujet: keyof typeof PAGES) {
  if (sujet === "parametres") {
    // Les coordonnées apparaissent dans l'en-tête et le pied de page : tout le site.
    revalidatePath("/", "layout");
    return;
  }
  PAGES[sujet].forEach((p) => revalidatePath(p));
}

/** Lit un champ texte d'un formulaire (chaîne vide → null). */
export function texte(fd: FormData, nom: string) {
  const v = String(fd.get(nom) ?? "").trim();
  return v === "" ? null : v;
}

export function nombre(fd: FormData, nom: string) {
  const v = String(fd.get(nom) ?? "").replace(",", ".").trim();
  return v === "" ? null : Number(v);
}

export function json<T>(fd: FormData, nom: string, defaut: T): T {
  try {
    return JSON.parse(String(fd.get(nom) ?? "")) as T;
  } catch {
    return defaut;
  }
}
