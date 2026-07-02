import { track } from '@vercel/analytics';
import { ANALYTICS_CONSENT_STORAGE_KEY } from '@/lib/analytics-consent';
import {
  trackCtaClicked,
  trackContactFormError,
  trackContactFormSubmitted,
  trackHomepageCtaClicked,
  trackNotFoundCtaClicked,
  trackPlansComparisonViewed,
  trackPlansCtaClicked,
  trackPlansFaqOpened
} from './analytics';

describe('analytics', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.dataLayer = undefined;
  });

  it('should forward tracking events to Vercel Analytics', () => {
    trackPlansCtaClicked({ plan: 'flow', intent: 'quote', location: 'plans' });
    trackPlansComparisonViewed();
    trackPlansFaqOpened('Question?');
    trackContactFormSubmitted({ plan: 'not-selected', intent: 'general', source: 'contact' });
    trackContactFormError({ plan: 'not-selected', intent: 'general', source: 'contact', reason: 'failed' });
    trackCtaClicked({ label: 'Talk', location: 'services_final', href: '/contact', route: '/services' });
    trackHomepageCtaClicked({ label: 'Talk', location: 'hero', href: '/contact' });
    trackNotFoundCtaClicked({ label: 'Home', href: '/' });

    expect(track).toHaveBeenCalledTimes(8);
    expect(track).toHaveBeenCalledWith('Plans CTA Clicked', {
      plan: 'flow',
      intent: 'quote',
      location: 'plans'
    });
    expect(track).toHaveBeenCalledWith('CTA Clicked', {
      label: 'Talk',
      location: 'services_final',
      href: '/contact',
      route: '/services'
    });
  });

  it('should skip GTM events before analytics consent', () => {
    window.dataLayer = [];

    trackContactFormSubmitted({ plan: 'not-selected', intent: 'general', source: 'contact' });
    trackCtaClicked({ label: 'Talk', location: 'services_final', href: '/contact', route: '/services' });
    trackHomepageCtaClicked({ label: 'Talk', location: 'hero', href: '/contact' });

    expect(window.dataLayer).toEqual([]);
  });

  it('should skip GTM events before dataLayer is available', () => {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, 'accepted');

    trackContactFormSubmitted({ plan: 'not-selected', intent: 'general', source: 'contact' });

    expect(window.dataLayer).toBeUndefined();
  });

  it('should push selected conversion and CTA events to GTM after consent', () => {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, 'accepted');
    window.dataLayer = [];

    trackContactFormSubmitted({ plan: 'flow', intent: 'quote', source: 'plans' });
    trackPlansCtaClicked({
      plan: 'growth',
      intent: 'quote',
      location: 'plans_grid',
      href: '/contact?plan=growth',
      label: 'Start with Growth'
    });
    trackHomepageCtaClicked({ label: "Let's talk", location: 'hero', href: '/contact' });
    trackCtaClicked({
      label: 'Book a discovery call',
      location: 'plans_hub_final',
      href: '/contact?source=plans',
      route: '/plans'
    });
    trackPlansFaqOpened('Question?');

    expect(window.dataLayer).toEqual([
      {
        event: 'generate_lead',
        plan: 'flow',
        intent: 'quote',
        source: 'plans',
        form_id: 'contact'
      },
      {
        event: 'nodo_cta_click',
        plan: 'growth',
        intent: 'quote',
        location: 'plans_grid',
        href: '/contact?plan=growth',
        label: 'Start with Growth'
      },
      {
        event: 'nodo_cta_click',
        label: "Let's talk",
        location: 'hero',
        href: '/contact'
      },
      {
        event: 'nodo_cta_click',
        label: 'Book a discovery call',
        location: 'plans_hub_final',
        href: '/contact?source=plans',
        route: '/plans'
      }
    ]);
  });
});
