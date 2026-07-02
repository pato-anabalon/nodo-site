import type { LucideIcon } from 'lucide-react';
import { cn, testIdSlug } from '@/lib/utils';

type ProcessStepProps = {
  eyebrow: string;
  title: string;
  description: string;
  output: string;
  icon: LucideIcon;
  index: number;
  isActive: boolean;
  isLast: boolean;
};

export function ProcessStep({
  eyebrow,
  title,
  description,
  output,
  icon: Icon,
  index,
  isActive,
  isLast
}: ProcessStepProps) {
  const slug = testIdSlug(title);
  const stepNumber = String(index + 1).padStart(2, '0');

  return (
    <article
      data-testid={`home-process-step-${slug}`}
      className={cn(
        'process-step relative grid flex-1 gap-5 rounded-[1.35rem] px-1 py-5 transition duration-300 sm:grid-cols-[5rem_1fr] sm:gap-6 sm:px-0 lg:py-6',
        isActive && 'process-step-active'
      )}
    >
      <div data-testid={`home-process-step-${slug}-meta`} className="relative flex items-start gap-3 sm:block">
        <span
          data-testid={`home-process-step-${slug}-number`}
          className="process-step-number inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/[0.055] text-sm font-black text-white/54 transition duration-300"
        >
          {stepNumber}
        </span>
        <span className="process-step-icon absolute -right-1 top-8 hidden size-9 items-center justify-center rounded-full border border-white/12 bg-nodo-black text-white/58 shadow-[0_10px_28px_rgba(0,0,0,0.24)] transition duration-300 sm:inline-flex">
          <Icon aria-hidden="true" className="size-4" />
        </span>
        {!isLast ? (
          <span
            data-testid={`home-process-step-${slug}-line`}
            className="process-step-line absolute left-6 top-14 hidden h-[calc(100%+1.25rem)] w-px bg-white/12 transition duration-300 sm:block"
            aria-hidden="true"
          />
        ) : null}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <p
            data-testid={`home-process-step-${slug}-eyebrow`}
            className="text-sm font-black uppercase tracking-[0.2em] text-nodo-lavender"
          >
            {eyebrow}
          </p>
          <span
            data-testid={`home-process-step-${slug}-output`}
            className="process-step-output rounded-full border border-white/12 bg-white/[0.055] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white/46 transition duration-300"
          >
            {output}
          </span>
        </div>
        <h3
          data-testid={`home-process-step-${slug}-title`}
          className="mt-3 text-2xl font-black tracking-normal text-white sm:text-3xl"
        >
          {title}
        </h3>
        <p
          data-testid={`home-process-step-${slug}-description`}
          className="mt-3 max-w-2xl text-pretty text-base leading-7 text-white/62"
        >
          {description}
        </p>
      </div>
    </article>
  );
}
