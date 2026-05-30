import type { LucideIcon } from "lucide-react";
import { testIdSlug } from "@/lib/utils";

type ProofPointProps = {
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ProofPoint({ label, title, description, icon: Icon }: ProofPointProps) {
  const slug = testIdSlug(title);

  return (
    <article data-testid={`home-proof-point-${slug}`} className="proof-point border-l border-white/14 pl-6">
      <span data-testid={`home-proof-point-${slug}-icon`} className="mb-5 inline-flex size-11 items-center justify-center rounded-full bg-nodo-purple text-white">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <p data-testid={`home-proof-point-${slug}-label`} className="text-xs font-black uppercase tracking-[0.28em] text-nodo-lavender">{label}</p>
      <h3 data-testid={`home-proof-point-${slug}-title`} className="mt-4 text-2xl font-black leading-tight tracking-normal text-white">
        {title}
      </h3>
      <p data-testid={`home-proof-point-${slug}-description`} className="mt-4 text-base leading-7 text-white/62">{description}</p>
    </article>
  );
}
