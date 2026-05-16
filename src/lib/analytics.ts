"use client";

import { track } from "@vercel/analytics";
import type { PlanIntent, PlanSlug } from "@/lib/content";

type NullablePlan = PlanSlug | "not-selected";
type TrackingSource = "plans" | "plans-hero" | "plans-final" | "contact" | string;

export function trackPlansCtaClicked({
  plan,
  intent,
  location,
}: {
  plan: NullablePlan;
  intent: PlanIntent;
  location: string;
}) {
  track("Plans CTA Clicked", { plan, intent, location });
}

export function trackPlansComparisonViewed() {
  track("Plans Comparison Viewed", { location: "plans_comparison" });
}

export function trackPlansFaqOpened(question: string) {
  track("Plans FAQ Opened", { question });
}

export function trackContactFormSubmitted({
  plan,
  intent,
  source,
}: {
  plan: NullablePlan;
  intent: PlanIntent | "general";
  source: TrackingSource;
}) {
  track("Contact Form Submitted", { plan, intent, source });
}

export function trackContactFormError({
  plan,
  intent,
  source,
  reason,
}: {
  plan: NullablePlan;
  intent: PlanIntent | "general";
  source: TrackingSource;
  reason: string;
}) {
  track("Contact Form Error", { plan, intent, source, reason });
}
