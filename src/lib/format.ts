export const euros = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

export const dateCourte = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Paris" }).format(
    new Date(iso),
  );

export const dateLongue = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" }).format(
    new Date(iso),
  );

export const dateHeure = (iso: string) =>
  moisSeulement(iso)
    ? new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "Europe/Paris" }).format(new Date(iso))
    : new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  }).format(new Date(iso));

export function slugifier(valeur: string) {
  return valeur
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Vrai si la date est déjà passée (évaluée au moment de la requête). */
export const estPasse = (iso: string) => new Date(iso).getTime() < Date.now();

/**
 * Événement dont seul le mois est connu : saisi le 1er du mois à 00:00 (heure de Paris).
 * Le site affiche alors « janvier 2027 » au lieu d'un jour et d'une heure.
 */
export function moisSeulement(iso: string) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(new Date(iso))
      .map((x) => [x.type, x.value]),
  );
  return p.day === "1" && p.hour === "00" && p.minute === "00";
}
