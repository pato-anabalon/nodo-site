import { ArrowLeft } from 'lucide-react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expectNoA11yViolations } from '@/test/a11y';
import { renderWithProviders } from '@/test/render';
import { Button } from './Button';

describe('Button', () => {
  it('should render a link when href is provided', async () => {
    const view = renderWithProviders(<Button href="/contact">Contact Nodo</Button>);

    expect(screen.getByRole('link', { name: /contact nodo/i })).toHaveAttribute('href', '/contact');
    await expectNoA11yViolations(view);
  });

  it('should render a native button and call onClick', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    const view = renderWithProviders(<Button onClick={onClick}>Send</Button>);

    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(onClick).toHaveBeenCalledTimes(1);
    await expectNoA11yViolations(view);
  });

  it('should render a custom icon', () => {
    renderWithProviders(<Button icon={<ArrowLeft aria-hidden="true" data-testid="custom-icon" />}>Back</Button>);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
