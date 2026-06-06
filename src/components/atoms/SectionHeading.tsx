import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  headingLevel?: "h1" | "h2";
  children?: ReactNode;
  className?: string;
  surfaceTone?: "dark" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  headingLevel = "h2",
  children,
  className,
  surfaceTone = "dark",
}: SectionHeadingProps) {
  const isLight = surfaceTone === "light";
  const HeadingTag = headingLevel;

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className={cn("mb-4 text-sm font-semibold uppercase tracking-[0.22em]", isLight ? "text-nodo-purple" : "text-nodo-lavender")}>
        {eyebrow}
      </p>
      <HeadingTag className={cn("text-balance text-4xl font-black leading-[0.95] tracking-normal sm:text-5xl lg:text-6xl", isLight ? "text-nodo-black" : "text-white")}>
        {title}
      </HeadingTag>
      {description ? (
        <p className={cn("mt-5 text-pretty text-lg leading-8", isLight ? "text-nodo-ink/68" : "text-white/68")}>{description}</p>
      ) : null}
      {children}
    </div>
  );
}
