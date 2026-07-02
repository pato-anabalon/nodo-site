import { Search } from 'lucide-react';
import { screen } from '@testing-library/react';
import { expectNoA11yViolations } from '@/test/a11y';
import { renderWithProviders } from '@/test/render';
import { ProcessStep } from './ProcessStep';

describe('ProcessStep', () => {
  const defaultProps = {
    eyebrow: 'Discover',
    title: 'Understand the business',
    description: 'Clarify what matters.',
    output: 'Direction',
    icon: Search,
    index: 0,
    isActive: true,
    isLast: false
  };

  it('should render an active process step', async () => {
    const view = renderWithProviders(<ProcessStep {...defaultProps} />);

    expect(screen.getByRole('heading', { name: /understand the business/i })).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('Direction')).toBeInTheDocument();
    await expectNoA11yViolations(view);
  });

  it('should not render the connector for the last step', () => {
    const { container } = renderWithProviders(<ProcessStep {...defaultProps} isLast />);

    expect(container.querySelector("[data-testid$='-line']")).not.toBeInTheDocument();
  });
});
