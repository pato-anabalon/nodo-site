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
    <article
      data-testid={`home-result-card-${slug}`}
      className="proof-point flex h-full min-h-72 flex-col rounded-[1.75rem] border border-white/12 bg-white/[0.055] p-6 transition duration-300 hover:-translate-y-1 hover:border-nodo-purple/55 hover:bg-white/[0.08] hover:shadow-[0_18px_44px_rgba(124,58,237,0.18)]"
    >
      <span data-testid={`home-result-card-${slug}-icon`} className="mb-7 inline-flex size-12 items-center justify-center rounded-full bg-nodo-purple text-white">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <p data-testid={`home-result-card-${slug}-label`} className="text-xs font-black uppercase tracking-[0.24em] text-nodo-lavender">{label}</p>
      <h3 data-testid={`home-result-card-${slug}-title`} className="mt-4 text-3xl font-black leading-tight tracking-normal text-white">
        {title}
      </h3>
      <p data-testid={`home-result-card-${slug}-description`} className="mt-5 text-base leading-7 text-white/62">{description}</p>
    </article>
  );
}
