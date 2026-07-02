import { screen } from '@testing-library/react';
import { expectNoA11yViolations } from '@/test/a11y';
import { renderWithProviders } from '@/test/render';
import { TextArea, TextField } from './TextField';

describe('TextField', () => {
  it('should render an accessible input', async () => {
    const view = renderWithProviders(<TextField label="Email" name="email" type="email" required />);

    expect(screen.getByLabelText(/email/i)).toBeRequired();
    await expectNoA11yViolations(view);
  });
});

describe('TextArea', () => {
  it('should render an accessible textarea with footer content', async () => {
    const view = renderWithProviders(<TextArea label="Message" name="message" footer="0/1500" />);

    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByText('0/1500')).toBeInTheDocument();
    await expectNoA11yViolations(view);
  });

  it('should render a textarea without footer content', () => {
    renderWithProviders(<TextArea label="Notes" name="notes" />);

    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
    expect(screen.queryByText('0/1500')).not.toBeInTheDocument();
  });
});
