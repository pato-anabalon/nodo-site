import { fireEvent, screen } from '@testing-library/react';
import { trackPlanFinderCompleted, trackPlanFinderOpened } from '@/lib/analytics';
import { PLAN_FINDER_STORAGE_KEY } from '@/lib/plan-finder';
import { expectNoA11yViolations } from '@/test/a11y';
import { renderWithProviders } from '@/test/render';
import { PlanFinderButton } from './PlanFinder';

jest.mock('@/lib/analytics', () => ({
  trackPlanFinderOpened: jest.fn(),
  trackPlanFinderAnswered: jest.fn(),
  trackPlanFinderCompleted: jest.fn(),
  trackPlanFinderCtaClicked: jest.fn()
}));

function choose(testId: string) {
  fireEvent.click(screen.getByTestId(testId));
}

describe('PlanFinder', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('should open the dialog and walk to a recommendation', async () => {
    const view = renderWithProviders(<PlanFinderButton location="test" />);

    fireEvent.click(screen.getByRole('button', { name: 'Help me choose a plan' }));

    expect(trackPlanFinderOpened).toHaveBeenCalledWith('test');
    expect(screen.getByTestId('plan-finder-dialog')).toHaveAttribute('open');
    expect(screen.getByTestId('plan-finder-question')).toHaveTextContent('What frustrates you most right now?');
    expect(screen.getByText('Plan finder · 1 of 4')).toBeInTheDocument();
    await expectNoA11yViolations(view);

    choose('plan-finder-option-focus-website');
    expect(screen.getByText('Plan finder · 2 of 5')).toBeInTheDocument();
    choose('plan-finder-option-website-rebuild');
    choose('plan-finder-option-care-nodo');
    choose('plan-finder-option-local-priority');
    choose('plan-finder-option-budget-500-1500');

    expect(screen.getByTestId('plan-finder-result-plan')).toHaveTextContent('Nodo Growth');
    expect(trackPlanFinderCompleted).toHaveBeenCalledWith({ plan: 'nodo-growth', alternative: 'nodo-flow' });
    expect(screen.getByTestId('plan-finder-view-plan-button')).toHaveAttribute('href', '/plans/websites#nodo-growth');
    expect(screen.getByTestId('plan-finder-contact-button')).toHaveAttribute(
      'href',
      '/contact?plan=nodo-growth&intent=quote&source=plan-finder'
    );
  }, 15000);

  it('should go back and keep the previous answer selected', () => {
    renderWithProviders(<PlanFinderButton location="test" />);

    fireEvent.click(screen.getByRole('button', { name: 'Help me choose a plan' }));
    choose('plan-finder-option-focus-brand');
    fireEvent.click(screen.getByTestId('plan-finder-back-button'));

    expect(screen.getByTestId('plan-finder-option-focus-brand')).toHaveAttribute('aria-pressed', 'true');
  });

  it('should store the answers summary when choosing to talk about the plan', () => {
    renderWithProviders(<PlanFinderButton location="test" />);

    fireEvent.click(screen.getByRole('button', { name: 'Help me choose a plan' }));
    choose('plan-finder-option-focus-brand');
    choose('plan-finder-option-website-improve');
    choose('plan-finder-option-brand-none');
    choose('plan-finder-option-budget-unsure');
    fireEvent.click(screen.getByTestId('plan-finder-contact-button'));

    expect(window.sessionStorage.getItem(PLAN_FINDER_STORAGE_KEY)).toContain('Recommended plan: Brand Starter');
    expect(screen.getByTestId('plan-finder-dialog')).not.toHaveAttribute('open');
  });

  it('should reset when closed', () => {
    renderWithProviders(<PlanFinderButton location="test" />);

    fireEvent.click(screen.getByRole('button', { name: 'Help me choose a plan' }));
    choose('plan-finder-option-focus-website');
    fireEvent.click(screen.getByTestId('plan-finder-close-button'));
    fireEvent.click(screen.getByRole('button', { name: 'Help me choose a plan' }));

    expect(screen.getByTestId('plan-finder-question')).toHaveTextContent('What frustrates you most right now?');
  });
});
