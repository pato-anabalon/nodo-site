'use client';

import { SlidersHorizontal } from 'lucide-react';
import { openAnalyticsPreferences } from '@/lib/analytics-consent';

export function AnalyticsPreferencesButton() {
  return (
    <button
      type="button"
      data-testid="analytics-preferences-button"
      onClick={openAnalyticsPreferences}
      className="inline-flex min-h-11 items-center gap-2 text-left text-xs sm:min-h-0 font-semibold uppercase tracking-[0.18em] text-white/60 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nodo-lavender"
    >
      <SlidersHorizontal aria-hidden="true" className="size-3.5" />
      Analytics preferences
    </button>
  );
}
