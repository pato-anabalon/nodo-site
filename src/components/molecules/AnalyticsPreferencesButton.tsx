"use client";

import { SlidersHorizontal } from "lucide-react";
import { openAnalyticsPreferences } from "@/lib/analytics-consent";

export function AnalyticsPreferencesButton() {
  return (
    <button
      type="button"
      data-testid="analytics-preferences-button"
      onClick={openAnalyticsPreferences}
      className="inline-flex items-center gap-2 text-left text-xs font-semibold uppercase tracking-[0.18em] text-white/34 transition hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nodo-lavender"
    >
      <SlidersHorizontal aria-hidden="true" className="size-3.5" />
      Analytics preferences
    </button>
  );
}
