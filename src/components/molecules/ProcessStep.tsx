import type { LucideIcon } from "lucide-react";

type ProcessStepProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ProcessStep({ eyebrow, title, description, icon: Icon }: ProcessStepProps) {
  return (
    <article className="process-step grid gap-5 border-t border-white/14 py-8 sm:grid-cols-[11rem_1fr]">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-white text-nodo-black">
          <Icon aria-hidden="true" className="size-4" />
        </span>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-nodo-lavender">
          {eyebrow}
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-black tracking-normal text-white sm:text-3xl">{title}</h3>
        <p className="mt-3 max-w-2xl text-pretty text-base leading-7 text-white/62">
          {description}
        </p>
      </div>
    </article>
  );
}
