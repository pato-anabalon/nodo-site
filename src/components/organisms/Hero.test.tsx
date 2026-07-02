import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/render';
import { Hero } from './Hero';

describe('Hero', () => {
  it('should render home hero content and actions', () => {
    document.documentElement.dataset.nodoPreloaded = 'true';

    renderWithProviders(<Hero />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('nodo');
    expect(screen.getByText(/clarity/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /let.s talk/i })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: /scroll to services/i })).toHaveAttribute('href', '#services');
  });
});
