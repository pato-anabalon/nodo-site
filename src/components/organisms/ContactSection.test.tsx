import { screen } from '@testing-library/react';
import { contactEmail, contactPhone } from '@/lib/seo';
import { renderWithProviders } from '@/test/render';
import { ContactSection } from './ContactSection';

describe('ContactSection', () => {
  it('should render contact details and form', () => {
    renderWithProviders(<ContactSection selectedPlanSlug="flow" intent="quote" source="plans" />);

    expect(screen.getByRole('heading', { level: 1, name: /tell us what you want/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: new RegExp(contactEmail) })).toHaveAttribute(
      'href',
      `mailto:${contactEmail}`
    );
    expect(screen.getByRole('link', { name: new RegExp(contactPhone.replace(/[+]/g, '\\+')) })).toHaveAttribute(
      'href',
      `tel:${contactPhone.replace(/\s+/g, '')}`
    );
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });
});
