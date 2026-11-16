import { Sceau } from "@/components/ui/decor";

/** Les mots de la mission. */
const mission = ["Écouter", "Relever", "Accompagner", "Transmettre", "Depuis 2022", "Dignité", "Espérance", "Haïti"];

/** Les 54 pays d'Afrique. */
const afrique = [
  "Afrique du Sud", "Algérie", "Angola", "Bénin", "Botswana", "Burkina Faso", "Burundi", "Cameroun", "Cap-Vert",
  "Centrafrique", "Comores", "Congo", "RD Congo", "Côte d’Ivoire", "Djibouti", "Égypte", "Érythrée", "Eswatini",
  "Éthiopie", "Gabon", "Gambie", "Ghana", "Guinée", "Guinée-Bissau", "Guinée équatoriale", "Kenya", "Lesotho",
  "Liberia", "Libye", "Madagascar", "Malawi", "Mali", "Maroc", "Maurice", "Mauritanie", "Mozambique", "Namibie",
  "Niger", "Nigeria", "Ouganda", "Rwanda", "São Tomé-et-Principe", "Sénégal", "Seychelles", "Sierra Leone",
  "Somalie", "Soudan", "Soudan du Sud", "Tanzanie", "Tchad", "Togo", "Tunisie", "Zambie", "Zimbabwe",
];

const mots = [...mission, ...afrique];

/** Ruban adhésif jaune qui traverse la page en diagonale et défile : la transition vivante après le héros. */
export function RubanDefilant() {
  const suite = (cle: string) =>
    mots.map((m) => (
      <span key={`${cle}-${m}`} className="flex items-center gap-6 pr-6">
        <span className="font-serif text-xl font-semibold whitespace-nowrap text-bleu-nuit italic sm:text-2xl">{m}</span>
        <Sceau plein className="size-3.5 shrink-0 text-bleu-nuit/40" />
      </span>
    ));

  return (
    <div aria-hidden className="relative z-10 -mt-7 -mb-7 overflow-hidden py-4">
      <div className="-mx-4 -rotate-[1.6deg] bg-ruban py-3.5 shadow-[0_10px_24px_-12px_rgb(46_53_85/0.5)] sm:py-4">
        <div className="defile flex" style={{ ["--duree" as string]: `${mots.length * 5}s` }}>
          {suite("a")}
          {suite("b")}
        </div>
      </div>
    </div>
  );
}
