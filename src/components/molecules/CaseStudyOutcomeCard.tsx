import type { LucideIcon } from 'lucide-react';

type CaseStudyOutcomeCardProps = {
  icon: LucideIcon;
  index: number;
  outcome: string;
};

export function CaseStudyOutcomeCard({ icon: Icon, index, outcome }: CaseStudyOutcomeCardProps) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <article className="group relative min-h-44 overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] p-5 transition duration-300 hover:border-nodo-purple/50 hover:shadow-[0_20px_56px_rgba(124,58,237,0.18)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-nodo-purple via-nodo-lavender to-nodo-pink opacity-72 transition-opacity duration-300 group-hover:opacity-100" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-3 text-[6rem] font-black leading-none text-white/[0.045]"
      >
        {number}
      </div>
      <div className="pointer-events-none absolute -bottom-14 -right-10 size-36 rounded-full bg-nodo-purple/14 blur-2xl transition duration-300 group-hover:bg-nodo-purple/22" />

      <span className="relative z-10 inline-flex size-11 items-center justify-center rounded-full border border-nodo-lavender/25 bg-nodo-purple/18 text-nodo-lavender shadow-[0_0_28px_rgba(124,58,237,0.28)]">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <p className="relative z-10 mt-8 max-w-[15rem] text-lg font-black leading-6 text-white">{outcome}</p>
    </article>
  );
}
