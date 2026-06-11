"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { trackHomepageCtaClicked, trackNotFoundCtaClicked } from "@/lib/analytics";

type TrackedCtaButtonProps = {
  children: ReactNode;
  href: string;
  label: string;
  event: "homepage" | "not-found";
  location?: string;
  className?: string;
  dataTestId?: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "inverted";
  surfaceTone?: "dark" | "purple" | "light";
};

export function TrackedCtaButton({
  children,
  href,
  label,
  event,
  location,
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

        trackNotFoundCtaClicked({ label, href });
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}
