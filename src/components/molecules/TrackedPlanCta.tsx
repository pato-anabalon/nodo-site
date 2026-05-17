"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { trackPlansCtaClicked } from "@/lib/analytics";
import type { PlanIntent, PlanSlug } from "@/lib/content";

type TrackedPlanCtaProps = {
  children: ReactNode;
  href: string;
  plan: PlanSlug | "not-selected";
  intent: PlanIntent;
  location: string;
  dataTestId?: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "inverted";
};

export function TrackedPlanCta({
  children,
  href,
  plan,
  intent,
  location,
  dataTestId,
  className,
  variant,
}: TrackedPlanCtaProps) {
  return (
    <Button
      href={href}
      variant={variant}
      dataTestId={dataTestId}
      className={className}
      onClick={() => trackPlansCtaClicked({ plan, intent, location })}
    >
      {children}
    </Button>
  );
}
