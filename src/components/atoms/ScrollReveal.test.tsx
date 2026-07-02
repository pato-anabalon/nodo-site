import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/render';
import { ScrollReveal } from './ScrollReveal';

describe('ScrollReveal', () => {
  it('should render children', () => {
    renderWithProviders(
      <ScrollReveal>
        <p>Reveal me</p>
      </ScrollReveal>
    );

    expect(screen.getByText('Reveal me')).toBeInTheDocument();
  });
});
