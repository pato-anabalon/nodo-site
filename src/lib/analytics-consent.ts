export const ANALYTICS_CONSENT_STORAGE_KEY = 'nodo:analytics-consent';
export const ANALYTICS_CONSENT_CHANGED_EVENT = 'nodo:analytics-consent-changed';
export const ANALYTICS_PREFERENCES_OPEN_EVENT = 'nodo:analytics-preferences-open';

export type AnalyticsConsentChoice = 'accepted' | 'declined';

export function getAnalyticsConsent(): AnalyticsConsentChoice | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);

  return stored === 'accepted' || stored === 'declined' ? stored : null;
}

export function hasAnalyticsConsent() {
  return getAnalyticsConsent() === 'accepted';
}

export function setAnalyticsConsent(choice: AnalyticsConsentChoice) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, choice);
  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_CHANGED_EVENT, { detail: choice }));
}

export function openAnalyticsPreferences() {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new Event(ANALYTICS_PREFERENCES_OPEN_EVENT));
}
