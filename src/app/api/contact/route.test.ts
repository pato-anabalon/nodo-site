import { createContactAttachment, createContactPayload } from "@/test/factories";
import { POST } from "./route";

jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: ResponseInit) => Response.json(body, init),
  },
}));

jest.mock("@/lib/contact-server", () => ({
  checkRateLimit: jest.fn(),
  getClientIp: jest.fn(() => "127.0.0.1"),
  getStoredContactAttachment: jest.fn(),
  hasAttachmentStore: jest.fn(),
  sanitizeText: jest.requireActual("@/lib/contact-server").sanitizeText,
  storeContactAttachment: jest.fn(),
  validateAttachmentMetadata: jest.fn(),
  validateUploadedMagicNumber: jest.fn(),
}));

jest.mock("@/lib/contact-integrations", () => ({
  forwardContactLead: jest.fn(),
  hasAnyIntegrationSuccess: jest.requireActual("@/lib/contact-integrations").hasAnyIntegrationSuccess,
  hasCriticalIntegrationFailure: jest.requireActual("@/lib/contact-integrations").hasCriticalIntegrationFailure,
}));

const contactServer = jest.requireMock("@/lib/contact-server");
const contactIntegrations = jest.requireMock("@/lib/contact-integrations");

async function json(response: Response) {
  return response.json();
}

describe("/api/contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    contactServer.checkRateLimit.mockResolvedValue({ limited: false, remaining: 1, configured: false });
    contactServer.hasAttachmentStore.mockReturnValue(true);
    contactServer.getStoredContactAttachment.mockResolvedValue(null);
    contactServer.validateAttachmentMetadata.mockReturnValue(true);
    contactServer.validateUploadedMagicNumber.mockResolvedValue(true);
    contactIntegrations.forwardContactLead.mockResolvedValue({
      trello: { configured: false, ok: false },
      email: { configured: true, ok: true },
      telegram: { configured: false, ok: false },
    });
  });

  it("should reject invalid JSON", async () => {
    const response = await POST(new Request("https://nodo.test/api/contact", { method: "POST", body: "{" }));

    expect(response.status).toBe(400);
    await expect(json(response)).resolves.toEqual({ error: "Invalid request payload." });
  });

  it("should reject honeypot and too-fast submissions", async () => {
    const response = await POST(new Request("https://nodo.test/api/contact", {
      method: "POST",
      body: JSON.stringify(createContactPayload({ website: "bot" })),
    }));

    expect(response.status).toBe(400);
    await expect(json(response)).resolves.toEqual({ error: "Invalid contact request." });
  });

  it("should reject missing required fields and invalid email", async () => {
    const missing = await POST(new Request("https://nodo.test/api/contact", {
      method: "POST",
      body: JSON.stringify(createContactPayload({ email: "" })),
    }));
    const invalidEmail = await POST(new Request("https://nodo.test/api/contact", {
      method: "POST",
      body: JSON.stringify(createContactPayload({ email: "bad-email" })),
    }));

    expect(missing.status).toBe(400);
    expect(invalidEmail.status).toBe(400);
  });

  it("should rate limit by IP and email", async () => {
    contactServer.checkRateLimit
      .mockResolvedValueOnce({ limited: true, remaining: 0, configured: true })
      .mockResolvedValueOnce({ limited: false, remaining: 1, configured: true });

    const ipLimited = await POST(new Request("https://nodo.test/api/contact", {
      method: "POST",
      body: JSON.stringify(createContactPayload()),
    }));

    contactServer.checkRateLimit.mockReset();
    contactServer.checkRateLimit
      .mockResolvedValueOnce({ limited: false, remaining: 1, configured: true })
      .mockResolvedValueOnce({ limited: true, remaining: 0, configured: true });

    const emailLimited = await POST(new Request("https://nodo.test/api/contact", {
      method: "POST",
      body: JSON.stringify(createContactPayload()),
    }));

    expect(ipLimited.status).toBe(429);
    expect(emailLimited.status).toBe(429);
  });

  it("should accept a valid lead without attachments", async () => {
    const response = await POST(new Request("https://nodo.test/api/contact", {
      method: "POST",
      body: JSON.stringify(createContactPayload()),
    }));
    const payload = await json(response);

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload.metadata.leadReceived).toBe(true);
    expect(contactIntegrations.forwardContactLead).toHaveBeenCalledWith(expect.objectContaining({
      email: "pato@example.com",
      attachmentCount: 0,
    }));
  });

  it("should validate attachments", async () => {
    const attachment = createContactAttachment();
    const response = await POST(new Request("https://nodo.test/api/contact", {
      method: "POST",
      body: JSON.stringify(createContactPayload({ attachments: [attachment] })),
    }));

    expect(response.status).toBe(200);
    expect(contactServer.storeContactAttachment).toHaveBeenCalledWith(expect.objectContaining({
      pathname: attachment.pathname,
      valid: true,
    }));
  });

  it("should return 502 when every configured integration fails", async () => {
    contactIntegrations.forwardContactLead.mockResolvedValueOnce({
      trello: { configured: true, ok: false },
      email: { configured: true, ok: false },
      telegram: { configured: false, ok: false },
    });

    const response = await POST(new Request("https://nodo.test/api/contact", {
      method: "POST",
      body: JSON.stringify(createContactPayload()),
    }));

    expect(response.status).toBe(502);
  });
});
