import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ANALYTICS_CONSENT_STORAGE_KEY, openAnalyticsPreferences } from '@/lib/analytics-consent';
import { AnalyticsConsentManager } from './AnalyticsConsentManager';

jest.mock('@next/third-parties/google', () => ({
  GoogleTagManager: ({ gtmId }: { gtmId: string }) => <div data-testid="google-tag-manager" data-gtm-id={gtmId} />
}));

describe('AnalyticsConsentManager', () => {
  const originalGtmId = process.env.NEXT_PUBLIC_GTM_ID;

  beforeEach(() => {
    window.localStorage.clear();
    process.env.NEXT_PUBLIC_GTM_ID = 'GTM-NODO';
  });

  afterAll(() => {
    process.env.NEXT_PUBLIC_GTM_ID = originalGtmId;
  });

  it('should show the consent banner when GTM is configured and no choice is stored', async () => {
    render(<AnalyticsConsentManager />);

    expect(await screen.findByTestId('analytics-consent-banner')).toBeInTheDocument();
    expect(screen.queryByTestId('google-tag-manager')).not.toBeInTheDocument();
  });

  it('should store consent and render GTM after accepting analytics', async () => {
    render(<AnalyticsConsentManager />);

    fireEvent.click(await screen.findByTestId('analytics-consent-accept-button'));

    await waitFor(() => {
      expect(screen.queryByTestId('analytics-consent-banner')).not.toBeInTheDocument();
    });
    expect(window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)).toBe('accepted');
    expect(screen.getByTestId('google-tag-manager')).toHaveAttribute('data-gtm-id', 'GTM-NODO');
  });

  it('should store a declined choice without rendering GTM', async () => {
    render(<AnalyticsConsentManager />);

    fireEvent.click(await screen.findByTestId('analytics-consent-decline-button'));

    await waitFor(() => {
      expect(screen.queryByTestId('analytics-consent-banner')).not.toBeInTheDocument();
    });
    expect(window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)).toBe('declined');
    expect(screen.queryByTestId('google-tag-manager')).not.toBeInTheDocument();
  });

  it('should reopen preferences from the global preferences event', async () => {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, 'declined');

    render(<AnalyticsConsentManager />);

    await waitFor(() => {
      expect(screen.queryByTestId('analytics-consent-banner')).not.toBeInTheDocument();
    });

    openAnalyticsPreferences();

    expect(await screen.findByTestId('analytics-consent-banner')).toBeInTheDocument();
  });

  it('should not render the banner when GTM is not configured', async () => {
    process.env.NEXT_PUBLIC_GTM_ID = '';

    render(<AnalyticsConsentManager />);

    await waitFor(() => {
      expect(screen.queryByTestId('analytics-consent-banner')).not.toBeInTheDocument();
    });
    expect(screen.queryByTestId('google-tag-manager')).not.toBeInTheDocument();
  });
});
