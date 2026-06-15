import {
  CONTACT_ATTACHMENT_LIMITS,
  formatFileSize,
  getContactAttachmentPathname,
  getFileExtension,
  getNormalizedAttachmentFilename,
  isAllowedFilePair,
  isAllowedContentType,
  isAllowedExtension,
  isExpectedContactPathname,
  validateContactFiles,
} from "./contact-attachments";

describe("contact-attachments", () => {
  it.each([
    [1024, "1 KB"],
    [1536, "2 KB"],
    [2.5 * 1024 * 1024, "2.5 MB"],
    [12 * 1024 * 1024, "12 MB"],
  ])("should format %s bytes", (size, expected) => {
    expect(formatFileSize(size)).toBe(expected);
  });

  it("should normalize allowed extensions", () => {
    expect(getFileExtension("Brief.PDF")).toBe("pdf");
    expect(getFileExtension("archive.zip")).toBe("");
    expect(getNormalizedAttachmentFilename(2, "photo.jpeg")).toBe("file-2.jpeg");
    expect(getContactAttachmentPathname({
      date: "2026-06-15",
      submissionId: "abc",
      index: 1,
      originalName: "brief.pdf",
    })).toBe("contact/2026-06-15/abc/file-1.pdf");
  });

  it("should validate filename and content-type pairs", () => {
    expect(isAllowedFilePair("photo.jpg", "image/jpeg")).toBe(true);
    expect(isAllowedFilePair("photo.jpg", "image/png")).toBe(false);
    expect(isAllowedFilePair("photo.exe", "image/jpeg")).toBe(false);
    expect(isAllowedContentType("image/png")).toBe(true);
    expect(isAllowedContentType("text/plain")).toBe(false);
    expect(isAllowedExtension("png")).toBe(true);
    expect(isAllowedExtension("exe")).toBe(false);
  });

  it("should validate contact file lists", () => {
    const file = new File(["x"], "brief.pdf", { type: "application/pdf" });

    expect(validateContactFiles([file])).toBe("");
    expect(validateContactFiles([new File(["x"], "brief.pdf", { type: "application/pdf" })])).toBe("");
    expect(validateContactFiles(Array.from({ length: CONTACT_ATTACHMENT_LIMITS.maxFiles + 1 }, () => file))).toBe(
      "Attach up to 5 files.",
    );
    const oversized = new File(["x"], "brief.pdf", { type: "application/pdf" });
    Object.defineProperty(oversized, "size", { value: CONTACT_ATTACHMENT_LIMITS.maxTotalSize + 1 });
    expect(validateContactFiles([oversized])).toBe("Attachments must be 25 MB total or less.");
    expect(validateContactFiles([new File(["x"], "notes.txt", { type: "text/plain" })])).toBe(
      "notes.txt is not an accepted file type.",
    );
  });

  it("should validate expected Blob pathnames", () => {
    const submissionId = "123e4567-e89b-12d3-a456-426614174000";

    expect(isExpectedContactPathname(`contact/2026-06-15/${submissionId}/file-1.pdf`, submissionId)).toBe(true);
    expect(isExpectedContactPathname(`contact/2026-06-15/${submissionId}/file-6.pdf`, submissionId)).toBe(false);
  });
});
