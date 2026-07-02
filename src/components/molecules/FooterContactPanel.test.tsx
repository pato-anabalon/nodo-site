import { screen } from '@testing-library/react';
import { contactEmail, contactPhone, socialLinks } from '@/lib/seo';
import { expectNoA11yViolations } from '@/test/a11y';
import { renderWithProviders } from '@/test/render';
import { FooterContactPanel } from './FooterContactPanel';

describe('FooterContactPanel', () => {
  it('should render contact and social links', async () => {
    const view = renderWithProviders(<FooterContactPanel />);

    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute('href', `mailto:${contactEmail}`);
    expect(screen.getByRole('link', { name: /phone/i })).toHaveAttribute(
      'href',
      `tel:${contactPhone.replace(/\s+/g, '')}`
    );

    for (const link of socialLinks) {
      expect(screen.getByLabelText(link.label)).toHaveAttribute('href', link.href);
    }

    await expectNoA11yViolations(view);
  });
});
