import { Redis } from '@upstash/redis';
import {
  CONTACT_ATTACHMENT_LIMITS,
  type ContactAttachment,
  getFileExtension,
  isAllowedContentType,
  isAllowedFilePair,
  isExpectedContactPathname
} from '@/lib/contact-attachments';

type StoredAttachment = ContactAttachment & {
  submissionId: string;
  valid: boolean;
  uploadedAt: string;
};

const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.UPSTASH_REDIS_KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.UPSTASH_REDIS_KV_REST_API_TOKEN;

const redis =
  redisUrl && redisToken
    ? new Redis({
        url: redisUrl,
        token: redisToken
      })
    : null;

const ATTACHMENT_TTL_SECONDS = 60 * 60;
const RATE_LIMIT_TTL_SECONDS = 15 * 60;

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() ?? 'unknown';
  }

  return request.headers.get('x-real-ip') ?? request.headers.get('cf-connecting-ip') ?? 'unknown';
}

export async function checkRateLimit(params: { key: string; limit: number; windowSeconds?: number }) {
  if (!redis) {
    return { limited: false, remaining: params.limit, configured: false };
  }

  const count = await redis.incr(params.key);

  if (count === 1) {
    await redis.expire(params.key, params.windowSeconds ?? RATE_LIMIT_TTL_SECONDS);
  }

  return {
    limited: count > params.limit,
    remaining: Math.max(0, params.limit - count),
    configured: true
  };
}

export function hasAttachmentStore() {
  return Boolean(redis);
}

export async function storeContactAttachment(attachment: StoredAttachment) {
  if (!redis) {
    return;
  }

  await redis.set(getAttachmentKey(attachment.submissionId, attachment.pathname), attachment, {
    ex: ATTACHMENT_TTL_SECONDS
  });
}

export async function getStoredContactAttachment(submissionId: string, pathname: string) {
  if (!redis) {
    return null;
  }

  return redis.get<StoredAttachment>(getAttachmentKey(submissionId, pathname));
}

export function sanitizeText(value: unknown, maxLength: number) {
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

export function validateAttachmentMetadata(attachment: ContactAttachment, submissionId: string) {
  if (!attachment.url || !attachment.pathname || !attachment.filename || !attachment.originalName) {
    return false;
  }

  if (!Number.isFinite(attachment.size) || attachment.size <= 0) {
    return false;
  }

  if (attachment.size > CONTACT_ATTACHMENT_LIMITS.maxSingleFileSize) {
    return false;
  }

  if (!isExpectedContactPathname(attachment.pathname, submissionId)) {
    return false;
  }

  if (!isAllowedFilePair(attachment.originalName, attachment.contentType)) {
    return false;
  }

  const pathnameExtension = getFileExtension(attachment.pathname);
  const filenameExtension = getFileExtension(attachment.filename);

  return Boolean(
    pathnameExtension &&
    filenameExtension &&
    pathnameExtension === filenameExtension &&
    isMatchingVercelBlobUrl(attachment.url, attachment.pathname)
  );
}

export function isMatchingVercelBlobUrl(url: string, pathname: string) {
  try {
    const parsedUrl = new URL(url);
    const urlPathname = decodeURIComponent(parsedUrl.pathname.replace(/^\/+/, ''));

    return (
      parsedUrl.protocol === 'https:' &&
      parsedUrl.hostname.endsWith('.blob.vercel-storage.com') &&
      urlPathname === pathname
    );
  } catch {
    return false;
  }
}

export async function validateUploadedMagicNumber(url: string, contentType: string) {
  if (!isAllowedContentType(contentType)) {
    return false;
  }

  const response = await fetch(url, {
    headers: {
      Range: 'bytes=0-15'
    }
  });

  if (!response.ok) {
    return false;
  }

  const bytes = new Uint8Array(await response.arrayBuffer());

  if (contentType === 'image/jpeg') {
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }

  if (contentType === 'image/png') {
    return matches(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  }

  if (contentType === 'image/gif') {
    return text(bytes, 0, 6) === 'GIF87a' || text(bytes, 0, 6) === 'GIF89a';
  }

  if (contentType === 'image/webp') {
    return text(bytes, 0, 4) === 'RIFF' && text(bytes, 8, 4) === 'WEBP';
  }

  if (contentType === 'application/pdf') {
    return text(bytes, 0, 4) === '%PDF';
  }

  if (contentType === 'application/msword') {
    return matches(bytes, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
  }

  if (contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return matches(bytes, [0x50, 0x4b, 0x03, 0x04]);
  }

  return false;
}

function getAttachmentKey(submissionId: string, pathname: string) {
  return `contact:attachment:${submissionId}:${pathname}`;
}

function matches(bytes: Uint8Array, signature: number[]) {
  return signature.every((value, index) => bytes[index] === value);
}

function text(bytes: Uint8Array, start: number, length: number) {
  return String.fromCharCode(...bytes.slice(start, start + length));
}
