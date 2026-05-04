import { cn } from "@/lib/utils";

type NodoLogoProps = {
  className?: string;
  markOnly?: boolean;
  inverted?: boolean;
};

export function NodoLogo({ className, markOnly = false, inverted = false }: NodoLogoProps) {
  const main = inverted ? "text-white" : "text-black";
  const secondary = inverted ? "text-white" : "text-black";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-black tracking-normal",
        main,
        className,
      )}
      aria-label="Nodo"
    >
      <svg
        className="h-10 w-11 shrink-0 overflow-visible"
        viewBox="0 0 120 128"
        fill="none"
        aria-hidden="true"
      >
        <path
          className={secondary}
          d="M20 58L58 54L96 48M58 54L77 14M58 54L31 112"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="20" cy="58" r="14" className={secondary} fill="currentColor" />
        <circle cx="58" cy="54" r="11" className={secondary} fill="currentColor" />
        <circle cx="96" cy="48" r="14" className={secondary} fill="currentColor" />
        <circle cx="77" cy="14" r="14" className={secondary} fill="currentColor" />
        <circle cx="31" cy="112" r="18" fill="var(--nodo-purple)" />
      </svg>
      {!markOnly ? (
        <span className="text-[2rem] leading-none">
          nodo<span className="text-nodo-purple">.</span>
        </span>
      ) : null}
    </span>
  );
}
