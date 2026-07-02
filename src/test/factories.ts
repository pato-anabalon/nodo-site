import type { ContactAttachment } from '@/lib/contact-attachments';

export const validSubmissionId = '123e4567-e89b-12d3-a456-426614174000';

export function createFile(name = 'brief.pdf', type = 'application/pdf', size = 1024) {
  return new File(['x'.repeat(size)], name, { type });
}

export function createContactAttachment(overrides: Partial<ContactAttachment> = {}): ContactAttachment {
  const pathname = `contact/2026-06-15/${validSubmissionId}/file-1.pdf`;

  return {
    url: `https://store.blob.vercel-storage.com/${pathname}`,
    pathname,
    filename: 'file-1.pdf',
    originalName: 'brief.pdf',
    contentType: 'application/pdf',
    size: 1024,
    ...overrides
  };
}

export function createContactPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Pato',
    lastName: 'Anabalon',
    email: 'pato@example.com',
    message: 'I need a website redesign.',
    submissionId: validSubmissionId,
    formStartedAt: String(Date.now() - 2_000),
    attachments: [],
    ...overrides
  };
}
