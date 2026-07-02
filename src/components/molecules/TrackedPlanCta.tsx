'use client';

import type { ReactNode } from 'react';
import { Button } from '@/components/atoms/Button';
import { trackPlansCtaClicked } from '@/lib/analytics';
import type { PlanIntent, PlanSlug } from '@/lib/content';

type TrackedPlanCtaProps = {
  children: ReactNode;
  href: string;
  plan: PlanSlug | 'not-selected';
  intent: PlanIntent;
  location: string;
  dataTestId?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverted';
  surfaceTone?: 'dark' | 'purple' | 'light';
};

function trackingLabel(children: ReactNode) {
  return typeof children === 'string' ? children : 'Plan CTA';
}

export function TrackedPlanCta({
  children,
  href,
  plan,
  intent,
  location,
  dataTestId,
  className,
  variant,
  surfaceTone
}: TrackedPlanCtaProps) {
  return (
    <Button
      href={href}
      variant={variant}
      surfaceTone={surfaceTone}
      dataTestId={dataTestId}
      className={className}
      onClick={() => trackPlansCtaClicked({ plan, intent, location, href, label: trackingLabel(children) })}
    >
      {children}
    </Button>
  );
}
