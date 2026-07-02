import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { trackCtaClicked, trackHomepageCtaClicked, trackNotFoundCtaClicked } from '@/lib/analytics';
import { renderWithProviders } from '@/test/render';
import { TrackedCtaButton } from './TrackedCtaButton';

jest.mock('@/lib/analytics', () => ({
  trackCtaClicked: jest.fn(),
  trackHomepageCtaClicked: jest.fn(),
  trackNotFoundCtaClicked: jest.fn()
}));

describe('TrackedCtaButton', () => {
  it('should track general CTA clicks', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <TrackedCtaButton href="/contact" label="Talk" location="services_final" route="/services">
        Talk
      </TrackedCtaButton>
    );

    await user.click(screen.getByRole('link', { name: /talk/i }));

    expect(trackCtaClicked).toHaveBeenCalledWith({
      label: 'Talk',
      location: 'services_final',
      href: '/contact',
      route: '/services'
    });
  });

  it('should track homepage CTA clicks', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <TrackedCtaButton href="/contact" label="Talk" event="homepage" location="hero">
        Talk
      </TrackedCtaButton>
    );

    await user.click(screen.getByRole('link', { name: /talk/i }));

    expect(trackHomepageCtaClicked).toHaveBeenCalledWith({
      label: 'Talk',
      location: 'hero',
      href: '/contact'
    });
  });

  it('should default homepage tracking location', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <TrackedCtaButton href="/contact" label="Talk" event="homepage">
        Talk
      </TrackedCtaButton>
    );

    await user.click(screen.getByRole('link', { name: /talk/i }));

    expect(trackHomepageCtaClicked).toHaveBeenCalledWith({
      label: 'Talk',
      location: 'homepage',
      href: '/contact'
    });
  });

  it('should track 404 CTA clicks', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <TrackedCtaButton href="/" label="Back" event="not-found">
        Back
      </TrackedCtaButton>
    );

    await user.click(screen.getByRole('link', { name: /back/i }));

    expect(trackNotFoundCtaClicked).toHaveBeenCalledWith({ label: 'Back', href: '/' });
  });
});
