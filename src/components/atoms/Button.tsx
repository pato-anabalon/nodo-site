import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "inverted";
  icon?: ReactNode;
  surfaceTone?: "dark" | "purple" | "light";
  dataTestId?: string;
};

type LinkButtonProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

const variants = {
  dark: {
    primary:
      "bg-[var(--cta-dark-primary-bg)] text-[var(--cta-dark-primary-text)] shadow-[0_6px_18px_rgba(5,5,5,0.14)] hover:-translate-y-0.5 hover:bg-[var(--cta-dark-primary-hover-bg)] hover:text-[var(--cta-dark-primary-hover-text)] hover:shadow-[0_12px_28px_rgba(196,181,253,0.16)] focus-visible:outline-[var(--cta-dark-primary-outline)]",
    secondary:
      "border border-[color:var(--cta-dark-secondary-border)] bg-[var(--cta-dark-secondary-bg)] text-[var(--cta-dark-secondary-text)] shadow-[0_4px_14px_rgba(5,5,5,0.08)] hover:-translate-y-0.5 hover:border-[color:var(--cta-dark-secondary-hover-border)] hover:bg-[var(--cta-dark-secondary-hover-bg)] hover:text-[var(--cta-dark-secondary-hover-text)] hover:shadow-[0_12px_28px_rgba(196,181,253,0.12)] focus-visible:outline-[var(--cta-dark-secondary-outline)]",
  },
  purple: {
    primary:
      "bg-[var(--cta-purple-primary-bg)] text-[var(--cta-purple-primary-text)] hover:bg-[var(--cta-purple-primary-hover-bg)] hover:text-[var(--cta-purple-primary-hover-text)] focus-visible:outline-[var(--cta-purple-primary-outline)]",
    secondary:
      "border border-[color:var(--cta-purple-secondary-border)] bg-[var(--cta-purple-secondary-bg)] text-[var(--cta-purple-secondary-text)] shadow-[0_4px_14px_rgba(5,5,5,0.06)] hover:-translate-y-0.5 hover:border-[color:var(--cta-purple-secondary-hover-border)] hover:bg-[var(--cta-purple-secondary-hover-bg)] hover:text-[var(--cta-purple-secondary-hover-text)] hover:shadow-[0_14px_30px_rgba(17,12,28,0.18)] focus-visible:outline-[var(--cta-purple-secondary-outline)]",
  },
  light: {
    primary:
      "border border-[color:var(--cta-light-primary-border)] bg-[var(--cta-light-primary-bg)] text-[var(--cta-light-primary-text)] shadow-[0_6px_18px_rgba(5,5,5,0.10)] hover:-translate-y-0.5 hover:border-[color:var(--cta-light-primary-hover-border)] hover:bg-[var(--cta-light-primary-hover-bg)] hover:text-[var(--cta-light-primary-hover-text)] hover:shadow-[0_12px_28px_rgba(124,58,237,0.16)] focus-visible:outline-[var(--cta-light-primary-outline)]",
    secondary:
      "border border-[color:var(--cta-light-secondary-border)] bg-[var(--cta-light-secondary-bg)] text-[var(--cta-light-secondary-text)] shadow-[0_4px_14px_rgba(5,5,5,0.04)] hover:-translate-y-0.5 hover:border-[color:var(--cta-light-secondary-hover-border)] hover:bg-[var(--cta-light-secondary-hover-bg)] hover:text-[var(--cta-light-secondary-hover-text)] hover:shadow-[0_12px_28px_rgba(124,58,237,0.10)] focus-visible:outline-[var(--cta-light-secondary-outline)]",
  },
  ghost:
    "text-nodo-white hover:bg-white/8 focus-visible:outline-nodo-lavender",
  inverted:
    "border border-black/8 bg-nodo-black text-nodo-white shadow-[0_6px_18px_rgba(5,5,5,0.10)] hover:-translate-y-0.5 hover:border-nodo-purple/55 hover:bg-nodo-white hover:text-nodo-black hover:shadow-[0_12px_28px_rgba(124,58,237,0.14)] focus-visible:outline-nodo-black",
};

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    icon = <ArrowRight aria-hidden="true" className="size-4" />,
    surfaceTone = "dark",
    dataTestId,
    ...rest
  } = props;

  const variantClasses =
    variant === "ghost" || variant === "inverted"
      ? variants[variant]
      : variants[surfaceTone][variant];

  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold leading-none transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variantClasses,
    className,
  );

  if ("href" in rest && rest.href) {
    const linkProps = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

    return (
      <Link className={classes} data-testid={dataTestId} {...linkProps}>
        <span>{children}</span>
        {icon}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={classes} data-testid={dataTestId} {...buttonProps}>
      <span>{children}</span>
      {icon}
    </button>
  );
}
