import type { LucideIcon } from "lucide-react";

type ProofPointProps = {
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ProofPoint({ label, title, description, icon: Icon }: ProofPointProps) {
  return (
    <article className="proof-point border-l border-white/14 pl-6">
      <span className="mb-5 inline-flex size-11 items-center justify-center rounded-full bg-nodo-purple text-white">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <p className="text-xs font-black uppercase tracking-[0.28em] text-nodo-lavender">{label}</p>
      <h3 className="mt-4 text-2xl font-black leading-tight tracking-normal text-white">
        {title}
      </h3>
      <p className="mt-4 text-base leading-7 text-white/62">{description}</p>
    </article>
  );
}
