"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { trackCtaClicked, trackHomepageCtaClicked, trackNotFoundCtaClicked } from "@/lib/analytics";

type TrackedCtaButtonProps = {
  children: ReactNode;
  href: string;
  label: string;
  event?: "cta" | "homepage" | "not-found";
  location?: string;
  route?: string;
  className?: string;
  dataTestId?: string;
  icon?: ReactNode;
  rel?: string;
  target?: string;
  variant?: "primary" | "secondary" | "ghost" | "inverted";
  surfaceTone?: "dark" | "purple" | "light";
};

export function TrackedCtaButton({
  children,
  href,
  label,
  event = "cta",
  location,
  route,
  ...buttonProps
}: TrackedCtaButtonProps) {
  return (
    <Button
      href={href}
      onClick={() => {
        if (event === "homepage") {
          trackHomepageCtaClicked({
            label,
            location: location ?? "homepage",
            href,
          });
          return;
        }

        if (event === "not-found") {
          trackNotFoundCtaClicked({ label, href });
          return;
        }

        trackCtaClicked({
          label,
          location: location ?? "site",
          href,
          route,
        });
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}
