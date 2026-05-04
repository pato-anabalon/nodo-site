import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "inverted";
  icon?: ReactNode;
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
  primary:
    "bg-nodo-white text-nodo-black hover:bg-nodo-lavender focus-visible:outline-nodo-lavender",
  secondary:
    "border border-white/18 bg-white/8 text-nodo-white hover:border-nodo-lavender/70 hover:bg-white/14 focus-visible:outline-nodo-lavender",
  ghost:
    "text-nodo-white hover:bg-white/8 focus-visible:outline-nodo-lavender",
  inverted:
    "bg-nodo-black text-nodo-white hover:bg-nodo-white hover:text-nodo-black focus-visible:outline-nodo-black",
};

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    icon = <ArrowRight aria-hidden="true" className="size-4" />,
    ...rest
  } = props;

  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold leading-none transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variants[variant],
    className,
  );

  if ("href" in rest && rest.href) {
    const linkProps = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

    return (
      <Link className={classes} {...linkProps}>
        <span>{children}</span>
        {icon}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={classes} {...buttonProps}>
      <span>{children}</span>
      {icon}
    </button>
  );
}
