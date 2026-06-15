import { del, issueSignedToken } from "@vercel/blob";
import { handleUploadPresigned } from "@vercel/blob/client";
import { validSubmissionId } from "@/test/factories";
import { POST } from "./route";

jest.mock("@vercel/blob", () => ({
  del: jest.fn(),
  issueSignedToken: jest.fn(),
}));

jest.mock("@vercel/blob/client", () => ({
  handleUploadPresigned: jest.fn(),
}));

jest.mock("@/lib/contact-server", () => ({
  checkRateLimit: jest.fn(),
  getClientIp: jest.fn(() => "127.0.0.1"),
  storeContactAttachment: jest.fn(),
  validateUploadedMagicNumber: jest.fn(),
}));

const contactServer = jest.requireMock("@/lib/contact-server");

const validPayload = {
  submissionId: validSubmissionId,
  index: 1,
  originalName: "brief.pdf",
  contentType: "application/pdf",
  size: 1024,
  fileCount: 1,
  totalSize: 1024,
};

describe("/api/contact/upload", () => {
  beforeEach(() => {
    contactServer.checkRateLimit.mockResolvedValue({ limited: false, remaining: 1, configured: false });
    contactServer.validateUploadedMagicNumber.mockResolvedValue(true);
    (issueSignedToken as jest.Mock).mockResolvedValue("signed-token");
  });

  it("should return handleUploadPresigned JSON", async () => {
    (handleUploadPresigned as jest.Mock).mockResolvedValue({ ok: true });

    const response = await POST(new Request("https://nodo.test/api/contact/upload", {
      method: "POST",
      body: JSON.stringify({ type: "blob.generate-client-token" }),
    }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  it("should issue signed tokens for valid upload metadata", async () => {
    (handleUploadPresigned as jest.Mock).mockImplementation(async ({ getSignedToken }) => getSignedToken(
      `contact/2026-06-15/${validSubmissionId}/file-1.pdf`,
      JSON.stringify(validPayload),
    ));

    const response = await POST(new Request("https://nodo.test/api/contact/upload", {
      method: "POST",
      body: JSON.stringify({}),
    }));
    const body = await response.json();

    expect(body.token).toBe("signed-token");
    expect(issueSignedToken).toHaveBeenCalledWith(expect.objectContaining({
      operations: ["put"],
      pathname: `contact/2026-06-15/${validSubmissionId}/file-1.pdf`,
    }));
  });

  it("should reject invalid metadata", async () => {
    (handleUploadPresigned as jest.Mock).mockImplementation(async ({ getSignedToken }) => getSignedToken(
      `contact/2026-06-15/${validSubmissionId}/file-1.pdf`,
      JSON.stringify({ ...validPayload, contentType: "text/plain" }),
    ));

    const response = await POST(new Request("https://nodo.test/api/contact/upload", {
      method: "POST",
      body: JSON.stringify({}),
    }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Invalid upload metadata." });
  });

  it("should delete invalid completed uploads and store validation state", async () => {
    contactServer.validateUploadedMagicNumber.mockResolvedValue(false);
    (handleUploadPresigned as jest.Mock).mockImplementation(async ({ onUploadCompleted }) => {
      await onUploadCompleted({
        blob: {
          url: `https://store.blob.vercel-storage.com/contact/2026-06-15/${validSubmissionId}/file-1.pdf`,
          pathname: `contact/2026-06-15/${validSubmissionId}/file-1.pdf`,
          contentType: "application/pdf",
        },
        tokenPayload: JSON.stringify(validPayload),
      });

      return { ok: true };
    });

    const response = await POST(new Request("https://nodo.test/api/contact/upload", {
      method: "POST",
      body: JSON.stringify({}),
    }));

    expect(response.status).toBe(200);
    expect(del).toHaveBeenCalled();
    expect(contactServer.storeContactAttachment).toHaveBeenCalledWith(expect.objectContaining({ valid: false }));
  });
});
