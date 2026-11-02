import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "principal" | "secondaire" | "contour" | "contour-clair";

const styles: Record<Variant, string> = {
  // Charte : un seul bouton jaune par écran, texte bleu nuit (contraste 6,9:1).
  principal: "bg-ruban text-bleu-nuit hover:bg-ruban-hover",
  secondaire: "bg-bleu-profond text-white hover:bg-bleu-nuit",
  contour: "border-2 border-bleu-vie text-bleu-profond hover:bg-lavande",
  "contour-clair": "border-2 border-white/80 text-white hover:bg-white/10",
};

type Props = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "principal", className = "", ...props }: Props) {
  return (
    <Link
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-[15px] font-semibold transition-colors ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
