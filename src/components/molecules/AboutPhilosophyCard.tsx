import type { AboutPhilosophyStep } from "@/lib/content";
import { testIdSlug } from "@/lib/utils";

type AboutPhilosophyCardProps = {
  index: number;
  step: AboutPhilosophyStep;
};

export function AboutPhilosophyCard({ index, step }: AboutPhilosophyCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      data-testid={`about-philosophy-${testIdSlug(step.word)}`}
      className="relative h-full overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_18%_18%,rgba(124,58,237,0.28),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.105),rgba(255,255,255,0.035))] p-5 lg:min-h-72 lg:p-6"
    >
      <p className="relative z-10 hidden text-sm font-black uppercase tracking-[0.18em] text-nodo-lavender lg:block">
        {number}
      </p>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 top-1 text-[7rem] font-black leading-none text-white/[0.055] lg:text-[9rem]"
      >
        {number}
      </div>
      <h3 className="relative z-10 text-4xl font-black leading-none text-white lg:mt-20 lg:text-5xl">
        {step.word}
      </h3>
      <p className="relative z-10 mt-3 max-w-[85%] text-sm leading-6 text-white/64 lg:mt-5 lg:max-w-none lg:text-base lg:leading-7">
        {step.line}
      </p>
    </article>
  );
}
