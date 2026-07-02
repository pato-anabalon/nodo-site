import { CheckCircle } from 'lucide-react';
import { screen } from '@testing-library/react';
import { expectNoA11yViolations } from '@/test/a11y';
import { renderWithProviders } from '@/test/render';
import { ProofPoint } from './ProofPoint';

describe('ProofPoint', () => {
  it('should render proof content', async () => {
    const view = renderWithProviders(
      <ProofPoint
        label="Trust"
        title="Clearer enquiries"
        description="Customers understand the next step."
        icon={CheckCircle}
      />
    );

    expect(screen.getByRole('heading', { name: /clearer enquiries/i })).toBeInTheDocument();
    expect(screen.getByText('Trust')).toBeInTheDocument();
    expect(screen.getByText('Customers understand the next step.')).toBeInTheDocument();
    await expectNoA11yViolations(view);
  });
});
