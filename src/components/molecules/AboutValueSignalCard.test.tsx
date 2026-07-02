import { Target } from 'lucide-react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/render';
import { AboutValueSignalCard } from './AboutValueSignalCard';

describe('AboutValueSignalCard', () => {
  it('renders the value content and mobile constellation layer', () => {
    renderWithProviders(
      <AboutValueSignalCard
        index={0}
        total={7}
        value={{
          name: 'Results',
          description: 'Good design has to create movement.',
          icon: Target
        }}
      />
    );

    expect(screen.getByTestId('about-value-results')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Results' })).toBeInTheDocument();
    expect(screen.getByText('01 / 07')).toBeInTheDocument();
  });
});
