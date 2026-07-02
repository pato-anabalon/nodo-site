import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type AboutClientFocusButtonProps = {
  dataTestId: string;
  icon: LucideIcon;
  isActive: boolean;
  isPaused: boolean;
  label: string;
  onClick: () => void;
  progressDurationMs: number;
};

export function AboutClientFocusButton({
  dataTestId,
  icon: Icon,
  isActive,
  isPaused,
  label,
  onClick,
  progressDurationMs
}: AboutClientFocusButtonProps) {
  return (
    <button
      type="button"
      data-testid={dataTestId}
      aria-label={`Show ${label}`}
      aria-pressed={isActive}
      onClick={onClick}
      className={cn(
        'group relative min-h-16 overflow-hidden rounded-md px-3 py-3 pr-10 text-left text-xs font-bold leading-4 transition-colors duration-200',
        isActive ? 'bg-nodo-black text-white' : 'text-nodo-ink/58 hover:bg-nodo-purple/8 hover:text-nodo-black'
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute -bottom-4 -right-3 inline-flex size-16 items-center justify-center rounded-full border transition duration-200',
          isActive
            ? 'border-nodo-lavender/55 bg-nodo-black text-nodo-lavender shadow-[0_0_20px_rgba(124,58,237,0.78),0_0_46px_rgba(232,48,207,0.34)]'
            : 'border-nodo-purple/28 bg-[#fbf9ff] text-nodo-purple opacity-72 shadow-[0_0_14px_rgba(124,58,237,0.3)] group-hover:border-nodo-purple/50 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.52)]'
        )}
      >
        <Icon className="size-6 -translate-x-1 -translate-y-1" />
      </span>

      <span className="relative z-10">{label}</span>

      {isActive ? (
        <span
          aria-hidden="true"
          className="about-client-progress absolute inset-x-0 bottom-0 h-1 origin-left rounded-b-md bg-gradient-to-r from-nodo-purple via-nodo-lavender to-nodo-pink"
          style={{
            animationDuration: `${progressDurationMs}ms`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        />
      ) : null}
    </button>
  );
}
