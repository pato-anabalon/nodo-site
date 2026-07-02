import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type MetaChipTone = 'dark' | 'light' | 'purple';
type MetaChipAccent = 'purple' | 'lavender' | 'pink' | 'white';

type MetaChipProps = {
  children: ReactNode;
  className?: string;
  tone?: MetaChipTone;
  accent?: MetaChipAccent;
  dataTestId?: string;
};

const toneClasses: Record<MetaChipTone, string> = {
  dark: 'border-white/10 bg-white/[0.035] text-white/58',
  light: 'border-black/8 bg-black/[0.025] text-nodo-ink/62',
  purple: 'border-white/12 bg-white/[0.075] text-white/64'
};

const dotClasses: Record<MetaChipAccent, string> = {
  purple: 'bg-nodo-purple shadow-[0_0_12px_rgba(124,58,237,0.5)]',
  lavender: 'bg-nodo-lavender shadow-[0_0_12px_rgba(196,181,253,0.42)]',
  pink: 'bg-nodo-pink shadow-[0_0_12px_rgba(232,48,207,0.42)]',
  white: 'bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.28)]'
};

export function MetaChip({ children, className, tone = 'dark', accent = 'purple', dataTestId }: MetaChipProps) {
  return (
    <span
      data-testid={dataTestId}
      className={cn(
        'inline-flex min-h-8 select-none items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-black uppercase leading-none tracking-[0.14em]',
        toneClasses[tone],
        className
      )}
    >
      <span aria-hidden="true" className={cn('size-1.5 shrink-0 rounded-full', dotClasses[accent])} />
      <span>{children}</span>
    </span>
  );
}
