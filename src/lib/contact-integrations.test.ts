import type { ContactLead } from './contact-integrations';
import { forwardContactLead, hasAnyIntegrationSuccess, hasCriticalIntegrationFailure } from './contact-integrations';

const originalEnv = process.env;

function createLead(overrides: Partial<ContactLead> = {}): ContactLead {
  return {
    submissionId: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Pato',
    lastName: 'Anabalon',
    email: 'pato@example.com',
    phone: '+64 27 742 3001',
    company: 'Nodo',
    city: 'Auckland',
    message: '<strong>Hello</strong>',
    planType: 'Website',
    planSelected: 'Flow',
    planSlug: 'flow',
    intent: 'quote',
    source: 'plans',
    attachments: [],
    attachmentCount: 0,
    submittedAt: '2026-06-15T12:00:00.000Z',
    ...overrides
  };
}

describe('contact-integrations', () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
    global.fetch = jest.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should report unconfigured integrations without network calls', async () => {
    delete process.env.TRELLO_API_KEY;
    delete process.env.RESEND_API_KEY;
    delete process.env.TELEGRAM_BOT_TOKEN;

    await expect(forwardContactLead(createLead())).resolves.toEqual({
      trello: { configured: false, ok: false },
      email: { configured: false, ok: false },
      telegram: { configured: false, ok: false }
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should forward a lead to configured channels', async () => {
    Object.assign(process.env, {
      TRELLO_API_KEY: 'key',
      TRELLO_API_TOKEN: 'token',
      TRELLO_LIST_ID: 'list',
      RESEND_API_KEY: 'resend',
      CONTACT_NOTIFICATION_FROM: 'Nodo <contact@nodo.co.nz>',
      CONTACT_NOTIFICATION_TO: 'pato@example.com, team@example.com',
      TELEGRAM_BOT_TOKEN: 'bot',
      TELEGRAM_CHAT_ID: 'chat'
    });
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 'card', url: 'https://trello.test/card' })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 'email' })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ok: true, result: { message_id: 10 } })
      });

    const result = await forwardContactLead(createLead());

    expect(result.trello).toEqual(expect.objectContaining({ configured: true, ok: true, id: 'card' }));
    expect(result.email).toEqual(expect.objectContaining({ configured: true, ok: true, id: 'email' }));
    expect(result.telegram).toEqual(expect.objectContaining({ configured: true, ok: true, id: '10' }));
  });

  it('should detect critical failures only when every configured channel fails', () => {
    expect(
      hasAnyIntegrationSuccess({
        trello: { configured: true, ok: false },
        email: { configured: true, ok: true },
        telegram: { configured: false, ok: false }
      })
    ).toBe(true);

    expect(
      hasCriticalIntegrationFailure({
        trello: { configured: true, ok: false },
        email: { configured: true, ok: false },
        telegram: { configured: false, ok: false }
      })
    ).toBe(true);

    expect(
      hasCriticalIntegrationFailure({
        trello: { configured: false, ok: false },
        email: { configured: false, ok: false },
        telegram: { configured: false, ok: false }
      })
    ).toBe(false);
  });
});
