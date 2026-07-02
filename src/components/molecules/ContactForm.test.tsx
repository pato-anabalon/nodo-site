import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { uploadPresigned } from '@vercel/blob/client';
import { trackContactFormError, trackContactFormSubmitted } from '@/lib/analytics';
import { createFile } from '@/test/factories';
import { renderWithProviders } from '@/test/render';
import { ContactForm } from './ContactForm';

jest.mock('@vercel/blob/client', () => ({
  uploadPresigned: jest.fn()
}));

jest.mock('@/lib/analytics', () => ({
  trackContactFormError: jest.fn(),
  trackContactFormSubmitted: jest.fn()
}));

const flushSubmitTimers = async () => {
  await act(async () => {
    jest.advanceTimersByTime(2_000);
  });
  await act(async () => {
    jest.advanceTimersByTime(850);
  });
  await act(async () => {
    jest.advanceTimersByTime(700);
  });
};

describe('ContactForm', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-06-15T12:00:00.000Z'));
    jest.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue('123e4567-e89b-12d3-a456-426614174000');
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  const setup = () => renderWithProviders(<ContactForm />);

  async function fillRequiredFields() {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    await user.type(screen.getByLabelText(/^name$/i), 'Pato');
    await user.type(screen.getByLabelText(/last name/i), 'Anabalon');
    await user.type(screen.getByLabelText(/email/i), 'pato@example.com');
    await user.type(screen.getByLabelText(/message/i), 'I need a website redesign.');
  }

  it('should render required fields and attachment rules', () => {
    setup();

    expect(screen.getByLabelText(/^name$/i)).toBeRequired();
    expect(screen.getByLabelText(/last name/i)).toBeRequired();
    expect(screen.getByLabelText(/email/i)).toBeRequired();
    expect(screen.getByLabelText(/message/i)).toBeRequired();
    expect(screen.getByText(/up to 5 files/i)).toBeInTheDocument();
  });

  it('should render selected plan context', () => {
    renderWithProviders(<ContactForm selectedPlanSlug="nodo-flow" intent="quote" source="plans" />);

    expect(screen.getByText(/Nodo Flow/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/plan type/i)).toHaveValue('Website');
    expect(screen.getByText(/quote request/i)).toBeInTheDocument();
  });

  it('should add and remove valid files', () => {
    setup();
    const file = createFile('brief.pdf', 'application/pdf', 2048);

    fireEvent.change(screen.getByTestId('contact-form-file-input'), {
      target: { files: [file] }
    });

    expect(screen.getByText('brief.pdf')).toBeInTheDocument();
    expect(screen.getByText('2 KB')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /remove brief.pdf/i }));

    expect(screen.queryByText('brief.pdf')).not.toBeInTheDocument();
  });

  it('should reject invalid file types', () => {
    setup();

    fireEvent.change(screen.getByTestId('contact-form-file-input'), {
      target: { files: [createFile('notes.txt', 'text/plain')] }
    });

    expect(screen.getByRole('status')).toHaveTextContent('notes.txt is not an accepted file type.');
  });

  it('should submit successfully without attachments', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, metadata: { leadReceived: true } })
    });
    setup();
    await fillRequiredFields();

    fireEvent.submit(screen.getByTestId('contact-form'));
    await flushSubmitTimers();

    await waitFor(() => {
      expect(screen.getByText(/thanks, pato/i)).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }));
    expect(trackContactFormSubmitted).toHaveBeenCalledWith({
      plan: 'not-selected',
      intent: 'general',
      source: 'contact'
    });
  });

  it('should upload attachments before submit', async () => {
    (uploadPresigned as jest.Mock).mockResolvedValue({
      url: 'https://store.blob.vercel-storage.com/contact/2026-06-15/123e4567-e89b-12d3-a456-426614174000/file-1.pdf',
      pathname: 'contact/2026-06-15/123e4567-e89b-12d3-a456-426614174000/file-1.pdf',
      contentType: 'application/pdf'
    });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true })
    });
    setup();
    fireEvent.change(screen.getByTestId('contact-form-file-input'), {
      target: { files: [createFile('brief.pdf', 'application/pdf')] }
    });
    await fillRequiredFields();

    fireEvent.submit(screen.getByTestId('contact-form'));
    await flushSubmitTimers();

    expect(uploadPresigned).toHaveBeenCalledWith(
      'contact/2026-06-15/123e4567-e89b-12d3-a456-426614174000/file-1.pdf',
      expect.any(File),
      expect.objectContaining({
        access: 'public',
        handleUploadUrl: '/api/contact/upload'
      })
    );
  });

  it('should show failure and allow returning to the form', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Please try again.' })
    });
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    setup();
    await fillRequiredFields();

    fireEvent.submit(screen.getByTestId('contact-form'));
    await flushSubmitTimers();

    expect(await screen.findByText(/something interrupted/i)).toBeInTheDocument();
    expect(trackContactFormError).toHaveBeenCalledWith(expect.objectContaining({ reason: 'Please try again.' }));

    await user.click(screen.getByRole('button', { name: /back to form/i }));

    expect(screen.queryByText(/something interrupted/i)).not.toBeInTheDocument();
  });
});
