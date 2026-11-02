"use client";

import { useId, useState, type FormEvent } from "react";
import { MailIcon, WhatsAppIcon } from "@/components/icons";
import { site } from "@/config/site";

type Champ = { nom: string; email: string; telephone: string; sujet: string; message: string };

/**
 * Formulaire qui prépare le message et l'ouvre dans la messagerie (e-mail ou WhatsApp) du visiteur.
 * Aucune donnée n'est stockée par le site. Sera remplacé par un envoi serveur (Brevo) avec le dashboard.
 */
export function FormulaireMessage({
  sujets,
  sujetParDefaut,
  placeholder = "Dites-nous en quelques mots ce qui vous amène…",
  intitule = "Votre message",
}: {
  sujets: string[];
  sujetParDefaut?: string;
  placeholder?: string;
  intitule?: string;
}) {
  const id = useId();
  const [champ, setChamp] = useState<Champ>({
    nom: "",
    email: "",
    telephone: "",
    sujet: sujetParDefaut ?? sujets[0],
    message: "",
  });
  const [envoye, setEnvoye] = useState<null | "email" | "whatsapp">(null);

  const maj = (k: keyof Champ) => (e: { target: { value: string } }) => setChamp((c) => ({ ...c, [k]: e.target.value }));

  function corps() {
    const signature = [champ.nom.trim(), champ.email.trim(), champ.telephone.trim() && `Tél. : ${champ.telephone.trim()}`]
      .filter(Boolean)
      .join("\n");
    return `${champ.message.trim()}\n\n—\n${signature}`;
  }

  function envoyer(canal: "email" | "whatsapp") {
    if (canal === "email") {
      const url = `mailto:${site.email}?subject=${encodeURIComponent(`[Site] ${champ.sujet}`)}&body=${encodeURIComponent(corps())}`;
      window.location.href = url;
    } else {
      const texte = `Bonjour, ${champ.sujet.toLowerCase()} :\n\n${corps()}`;
      window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texte)}`, "_blank", "noopener");
    }
    setEnvoye(canal);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const canal = (e.nativeEvent as SubmitEvent).submitter?.getAttribute("value") === "whatsapp" ? "whatsapp" : "email";
    envoyer(canal);
  }

  const champClasse =
    "mt-2 block w-full rounded-xl border border-bleu-vie/30 bg-white px-4 py-3 text-texte placeholder:text-texte/45 transition-colors focus:border-bleu-profond focus:outline-none focus:ring-2 focus:ring-bleu-profond/20";
  const labelClasse = "text-[15px] font-medium text-bleu-nuit";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-sujet`} className={labelClasse}>
          Vous nous écrivez pour…
        </label>
        <select id={`${id}-sujet`} value={champ.sujet} onChange={maj("sujet")} className={champClasse}>
          {sujets.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-nom`} className={labelClasse}>
          Prénom et nom
        </label>
        <input id={`${id}-nom`} required autoComplete="name" value={champ.nom} onChange={maj("nom")} className={champClasse} />
      </div>
      <div>
        <label htmlFor={`${id}-email`} className={labelClasse}>
          E-mail
        </label>
        <input
          id={`${id}-email`}
          type="email"
          required
          autoComplete="email"
          value={champ.email}
          onChange={maj("email")}
          className={champClasse}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-tel`} className={labelClasse}>
          Téléphone <span className="font-normal text-texte/60">(facultatif)</span>
        </label>
        <input
          id={`${id}-tel`}
          type="tel"
          autoComplete="tel"
          value={champ.telephone}
          onChange={maj("telephone")}
          className={champClasse}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className={labelClasse}>
          {intitule}
        </label>
        <textarea
          id={`${id}-message`}
          required
          rows={6}
          value={champ.message}
          onChange={maj("message")}
          placeholder={placeholder}
          className={`${champClasse} resize-y`}
        />
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <button
          type="submit"
          value="email"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-bleu-profond px-7 text-[15px] font-semibold text-white transition-colors hover:bg-bleu-nuit"
        >
          <MailIcon className="size-5" /> Envoyer par e-mail
        </button>
        <button
          type="submit"
          value="whatsapp"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-bleu-vie px-7 text-[15px] font-semibold text-bleu-profond transition-colors hover:bg-lavande"
        >
          <WhatsAppIcon className="size-5" /> Envoyer sur WhatsApp
        </button>
      </div>

      <p className="text-sm text-texte/70 sm:col-span-2" aria-live="polite">
        {envoye
          ? `Votre ${envoye === "email" ? "messagerie" : "application WhatsApp"} s’est ouverte avec votre message prêt à partir. Il ne vous reste qu’à l’envoyer.`
          : "Votre message s’ouvrira, prêt à envoyer, dans votre messagerie ou sur WhatsApp. Nous n’enregistrons aucune donnée sur ce site."}
      </p>
    </form>
  );
}
