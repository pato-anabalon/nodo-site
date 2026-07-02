'use client';

import { track } from '@vercel/analytics';
import { hasAnalyticsConsent } from '@/lib/analytics-consent';
import type { PlanIntent, PlanSlug } from '@/lib/content';

type NullablePlan = PlanSlug | 'not-selected';
type TrackingSource = 'plans' | 'plans-hero' | 'plans-final' | 'contact' | string;
type DataLayerValue = string | number | boolean | null | undefined;
type DataLayerEvent = Record<string, DataLayerValue>;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

function pushGtmEvent(event: string, params: DataLayerEvent) {
  if (typeof window === 'undefined' || !hasAnalyticsConsent() || !Array.isArray(window.dataLayer)) {
    return;
  }

  window.dataLayer.push({ event, ...params });
}

export function trackPlansCtaClicked({
  plan,
  intent,
  location,
  href,
  label
}: {
  plan: NullablePlan;
  intent: PlanIntent;
  location: string;
  href?: string;
  label?: string;
}) {
  track('Plans CTA Clicked', { plan, intent, location });
  pushGtmEvent('nodo_cta_click', { plan, intent, location, href, label });
}

export function trackCtaClicked({
  label,
  location,
  href,
  route
}: {
  label: string;
  location: string;
  href: string;
  route?: string;
}) {
  track('CTA Clicked', { label, location, href, route });
  pushGtmEvent('nodo_cta_click', { label, location, href, route });
}

export function trackPlansComparisonViewed() {
  track('Plans Comparison Viewed', { location: 'plans_comparison' });
}

export function trackPlansFaqOpened(question: string) {
  track('Plans FAQ Opened', { question });
}

export function trackContactFormSubmitted({
  plan,
  intent,
  source
}: {
  plan: NullablePlan;
  intent: PlanIntent | 'general';
  source: TrackingSource;
}) {
  track('Contact Form Submitted', { plan, intent, source });
  pushGtmEvent('generate_lead', { plan, intent, source, form_id: 'contact' });
}

export function trackContactFormError({
  plan,
  intent,
  source,
  reason
}: {
  plan: NullablePlan;
  intent: PlanIntent | 'general';
  source: TrackingSource;
  reason: string;
}) {
  track('Contact Form Error', { plan, intent, source, reason });
}

export function trackHomepageCtaClicked({ label, location, href }: { label: string; location: string; href: string }) {
  track('Homepage CTA Clicked', { label, location, href });
  pushGtmEvent('nodo_cta_click', { label, location, href });
}

export function trackNotFoundCtaClicked({ label, href }: { label: string; href: string }) {
  track('404 CTA Clicked', { label, href });
}
