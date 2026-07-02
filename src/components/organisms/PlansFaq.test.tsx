import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { trackPlansFaqOpened } from '@/lib/analytics';
import { plansFaq } from '@/lib/content';
import { renderWithProviders } from '@/test/render';
import { PlansFaq } from './PlansFaq';

jest.mock('@/lib/analytics', () => ({
  trackPlansFaqOpened: jest.fn()
}));

describe('PlansFaq', () => {
  it('should toggle questions and track newly opened items', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PlansFaq />);
    const secondQuestion = plansFaq[1].question;

    await user.click(screen.getByRole('button', { name: secondQuestion }));

    expect(screen.getByRole('button', { name: secondQuestion })).toHaveAttribute('aria-expanded', 'true');
    expect(trackPlansFaqOpened).toHaveBeenCalledWith(secondQuestion);

    await user.click(screen.getByRole('button', { name: secondQuestion }));

    expect(screen.getByRole('button', { name: secondQuestion })).toHaveAttribute('aria-expanded', 'false');
  });
});
