export type ContactAttachment = {
  url: string;
  pathname: string;
  filename: string;
  originalName: string;
  contentType: string;
  size: number;
};

export const CONTACT_ATTACHMENT_LIMITS = {
  maxFiles: 5,
  maxTotalSize: 25 * 1024 * 1024,
  maxSingleFileSize: 25 * 1024 * 1024,
} as const;

export const CONTACT_ATTACHMENT_ACCEPT =
  "image/jpeg,image/png,image/webp,image/gif,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.doc,.docx";

export const CONTACT_ALLOWED_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const CONTACT_ALLOWED_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "pdf",
  "doc",
  "docx",
] as const;

export type ContactAllowedContentType = (typeof CONTACT_ALLOWED_CONTENT_TYPES)[number];
export type ContactAllowedExtension = (typeof CONTACT_ALLOWED_EXTENSIONS)[number];

const extensionToContentTypes: Record<ContactAllowedExtension, ContactAllowedContentType[]> = {
  jpg: ["image/jpeg"],
  jpeg: ["image/jpeg"],
  png: ["image/png"],
  webp: ["image/webp"],
  gif: ["image/gif"],
  pdf: ["application/pdf"],
  doc: ["application/msword"],
  docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
};

export function formatFileSize(size: number) {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(size >= 10 * 1024 * 1024 ? 0 : 1)} MB`;
  }

  return `${Math.max(1, Math.round(size / 1024))} KB`;
}

export function getFileExtension(filename: string) {
  const extension = filename.toLowerCase().split(".").pop() ?? "";
  return CONTACT_ALLOWED_EXTENSIONS.includes(extension as ContactAllowedExtension)
    ? (extension as ContactAllowedExtension)
    : "";
}

export function isAllowedContentType(value: string): value is ContactAllowedContentType {
  return CONTACT_ALLOWED_CONTENT_TYPES.includes(value as ContactAllowedContentType);
}

export function isAllowedExtension(value: string): value is ContactAllowedExtension {
  return CONTACT_ALLOWED_EXTENSIONS.includes(value as ContactAllowedExtension);
}

export function isAllowedFilePair(filename: string, contentType: string) {
  const extension = getFileExtension(filename);

  if (!extension || !isAllowedContentType(contentType)) {
    return false;
  }

  return extensionToContentTypes[extension].includes(contentType);
}

export function getNormalizedAttachmentFilename(index: number, originalName: string) {
  const extension = getFileExtension(originalName);
  return extension ? `file-${index}.${extension}` : "";
}

export function getContactAttachmentPathname(params: {
  date: string;
  submissionId: string;
  index: number;
  originalName: string;
}) {
  const filename = getNormalizedAttachmentFilename(params.index, params.originalName);
  return filename ? `contact/${params.date}/${params.submissionId}/${filename}` : "";
}

export function validateContactFiles(files: File[]) {
  if (files.length > CONTACT_ATTACHMENT_LIMITS.maxFiles) {
    return `Attach up to ${CONTACT_ATTACHMENT_LIMITS.maxFiles} files.`;
  }

  const totalSize = files.reduce((total, file) => total + file.size, 0);

  if (totalSize > CONTACT_ATTACHMENT_LIMITS.maxTotalSize) {
    return `Attachments must be ${formatFileSize(CONTACT_ATTACHMENT_LIMITS.maxTotalSize)} total or less.`;
  }

  const invalidFile = files.find((file) => !isAllowedFilePair(file.name, file.type));

  if (invalidFile) {
    return `${invalidFile.name} is not an accepted file type.`;
  }

  return "";
}

export function isExpectedContactPathname(pathname: string, submissionId: string) {
  const escapedSubmissionId = submissionId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `^contact/\\d{4}-\\d{2}-\\d{2}/${escapedSubmissionId}/file-[1-5](?:-[a-zA-Z0-9]+)?\\.(?:${CONTACT_ALLOWED_EXTENSIONS.join("|")})$`,
  );

  return pattern.test(pathname);
}
