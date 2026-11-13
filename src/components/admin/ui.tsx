import Link from "next/link";
import type { ReactNode } from "react";

/** Briques d'interface du dashboard (composants serveur). */

export function EnTeteAdmin({ titre, intro, action }: { titre: string; intro?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[2rem] sm:text-[2.4rem]">{titre}</h1>
        {intro && <p className="mt-1 font-serif text-bleu-profond italic">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function BoutonLien({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center justify-center self-start rounded-full bg-bleu-profond px-6 text-[15px] font-semibold text-white transition-colors hover:bg-bleu-nuit"
    >
      {children}
    </Link>
  );
}

export function Carte({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-carte bg-white p-6 shadow-douce sm:p-8 ${className}`}>{children}</section>;
}

export function Vide({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <Carte className="text-center">
      <p className="mx-auto max-w-md font-serif text-lg text-bleu-profond italic">{children}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </Carte>
  );
}

export function Pastille({ children, ton = "neutre" }: { children: ReactNode; ton?: "neutre" | "ok" | "attente" | "alerte" }) {
  const tons = {
    neutre: "bg-lavande text-bleu-profond",
    ok: "bg-emerald-50 text-emerald-800",
    attente: "bg-ruban/25 text-bleu-nuit",
    alerte: "bg-red-50 text-red-800",
  };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tons[ton]}`}>{children}</span>;
}

export function Bandeau({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="status" className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-[15px] font-medium text-emerald-800">
      {message}
    </p>
  );
}

export const MESSAGES_OK: Record<string, string> = {
  enregistre: "Modifications enregistrées. Le site est à jour.",
  supprime: "Élément supprimé.",
};

/* ---------- Champs de formulaire ---------- */

const champ =
  "mt-2 block w-full rounded-xl border border-bleu-vie/30 bg-white px-4 py-2.5 text-texte placeholder:text-texte/40 focus:border-bleu-profond focus:ring-2 focus:ring-bleu-profond/20 focus:outline-none";

type Base = { nom: string; label: string; aide?: string; requis?: boolean };

function Etiquette({ nom, label, requis, aide }: Base) {
  return (
    <>
      <label htmlFor={nom} className="text-[15px] font-medium text-bleu-nuit">
        {label}
        {requis && <span className="text-red-700"> *</span>}
      </label>
      {aide && <p className="mt-0.5 text-sm text-texte/60">{aide}</p>}
    </>
  );
}

export function ChampTexte({
  valeur,
  type = "text",
  ...p
}: Base & { valeur?: string | number | null; type?: string; step?: string; min?: number }) {
  return (
    <div>
      <Etiquette {...p} />
      <input
        id={p.nom}
        name={p.nom}
        type={type}
        defaultValue={valeur ?? ""}
        required={p.requis}
        step={p.step}
        min={p.min}
        className={champ}
      />
    </div>
  );
}

export function ChampZone({ valeur, lignes = 5, ...p }: Base & { valeur?: string | null; lignes?: number; max?: number }) {
  return (
    <div>
      <Etiquette {...p} />
      <textarea
        id={p.nom}
        name={p.nom}
        rows={lignes}
        defaultValue={valeur ?? ""}
        required={p.requis}
        maxLength={p.max}
        className={`${champ} resize-y`}
      />
    </div>
  );
}

export function ChampChoix({
  valeur,
  options,
  ...p
}: Base & { valeur?: string | null; options: readonly { value: string; label: string }[] }) {
  return (
    <div>
      <Etiquette {...p} />
      <select id={p.nom} name={p.nom} defaultValue={valeur ?? options[0]?.value} required={p.requis} className={champ}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ChampCase({ nom, label, aide, coche }: { nom: string; label: string; aide?: string; coche?: boolean }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-bleu-vie/20 bg-white p-4">
      <input type="checkbox" name={nom} defaultChecked={coche} className="mt-1 size-4 accent-bleu-profond" />
      <span>
        <span className="font-medium text-bleu-nuit">{label}</span>
        {aide && <span className="block text-sm text-texte/60">{aide}</span>}
      </span>
    </label>
  );
}
