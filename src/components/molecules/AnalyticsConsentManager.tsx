'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import { Button } from '@/components/atoms/Button';
import {
  ANALYTICS_CONSENT_CHANGED_EVENT,
  ANALYTICS_PREFERENCES_OPEN_EVENT,
  getAnalyticsConsent,
  setAnalyticsConsent,
  type AnalyticsConsentChoice
} from '@/lib/analytics-consent';

type AnalyticsConsentSnapshot = AnalyticsConsentChoice | 'unset' | 'unknown';

function getConsentSnapshot(): AnalyticsConsentSnapshot {
  return getAnalyticsConsent() ?? 'unset';
}

function getServerConsentSnapshot(): AnalyticsConsentSnapshot {
  return 'unknown';
}

function subscribeToConsentChanges(callback: () => void) {
  window.addEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, callback);

  return () => {
    window.removeEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, callback);
  };
}

export function AnalyticsConsentManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const consent = useSyncExternalStore(subscribeToConsentChanges, getConsentSnapshot, getServerConsentSnapshot);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  useEffect(() => {
    const handlePreferencesOpen = () => {
      if (gtmId) {
        setIsPreferencesOpen(true);
      }
    };

    window.addEventListener(ANALYTICS_PREFERENCES_OPEN_EVENT, handlePreferencesOpen);

    return () => {
      window.removeEventListener(ANALYTICS_PREFERENCES_OPEN_EVENT, handlePreferencesOpen);
    };
  }, [gtmId]);

  if (!gtmId || consent === 'unknown') {
    return null;
  }

  const isBannerOpen = consent === 'unset' || isPreferencesOpen;
  const updateConsent = (choice: AnalyticsConsentChoice) => {
    setAnalyticsConsent(choice);
    setIsPreferencesOpen(false);
  };

  return (
    <>
      {consent === 'accepted' ? <GoogleTagManager gtmId={gtmId} /> : null}
      {isBannerOpen ? (
        <section
          data-testid="analytics-consent-banner"
          aria-label="Analytics preferences"
          className="fixed inset-x-3 bottom-3 z-[80] rounded-[1.25rem] border border-white/12 bg-nodo-black/94 p-4 text-white shadow-[0_22px_70px_rgba(0,0,0,0.42)] backdrop-blur md:inset-x-auto md:right-5 md:max-w-xl md:p-5"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-nodo-lavender">Analytics preferences</p>
              <p className="mt-2 text-sm leading-6 text-white/68">
                We use Google analytics tags to understand campaign performance and improve Nodo ads. Vercel Analytics
                stays active for basic site insights.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <Button
                type="button"
                dataTestId="analytics-consent-accept-button"
                onClick={() => updateConsent('accepted')}
                className="min-h-10 px-4"
              >
                Accept analytics
              </Button>
              <Button
                type="button"
                dataTestId="analytics-consent-decline-button"
                onClick={() => updateConsent('declined')}
                variant="secondary"
                className="min-h-10 px-4"
              >
                Decline
              </Button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
