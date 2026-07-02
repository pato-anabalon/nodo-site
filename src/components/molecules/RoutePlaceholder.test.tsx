import { screen } from '@testing-library/react';
import { expectNoA11yViolations } from '@/test/a11y';
import { renderWithProviders } from '@/test/render';
import { RoutePlaceholder } from './RoutePlaceholder';

describe('RoutePlaceholder', () => {
  it('should render placeholder page actions', async () => {
    const view = renderWithProviders(
      <RoutePlaceholder
        pageKey="about"
        eyebrow="About"
        title="About Nodo"
        description="This page is coming soon."
        headingLevel="h1"
      />
    );

    expect(screen.getByRole('heading', { level: 1, name: /about nodo/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /let.s talk/i })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
    await expectNoA11yViolations(view);
  });

  it('should default to an h2 heading', () => {
    renderWithProviders(
      <RoutePlaceholder pageKey="draft" eyebrow="Draft" title="Draft page" description="Coming soon." />
    );

    expect(screen.getByRole('heading', { level: 2, name: /draft page/i })).toBeInTheDocument();
  });
});
