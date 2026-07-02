import { del, issueSignedToken } from '@vercel/blob';
import { handleUploadPresigned, type HandleUploadPresignedBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import {
  CONTACT_ALLOWED_CONTENT_TYPES,
  CONTACT_ATTACHMENT_LIMITS,
  getNormalizedAttachmentFilename,
  isAllowedFilePair,
  isExpectedContactPathname,
  type ContactAttachment
} from '@/lib/contact-attachments';
import { checkRateLimit, getClientIp, storeContactAttachment, validateUploadedMagicNumber } from '@/lib/contact-server';

type UploadClientPayload = {
  submissionId?: string;
  index?: number;
  originalName?: string;
  contentType?: string;
  size?: number;
  fileCount?: number;
  totalSize?: number;
};

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadPresignedBody;
  const ip = getClientIp(request);

  try {
    const jsonResponse = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname, clientPayload) => {
        const rateLimit = await checkRateLimit({
          key: `contact:upload-token:${ip}`,
          limit: 30,
          windowSeconds: 15 * 60
        });

        if (rateLimit.limited) {
          throw new Error('Too many upload attempts. Please try again later.');
        }

        const payload = parseClientPayload(clientPayload);

        if (!payload) {
          throw new Error('Invalid upload metadata.');
        }

        const filename = getNormalizedAttachmentFilename(payload.index, payload.originalName);

        if (!filename || pathname.split('/').at(-1) !== filename) {
          throw new Error('Invalid upload pathname.');
        }

        if (!isExpectedContactPathname(pathname, payload.submissionId)) {
          throw new Error('Invalid upload pathname.');
        }

        if (!isAllowedFilePair(payload.originalName, payload.contentType)) {
          throw new Error('This file type is not accepted.');
        }

        return {
          token: await issueSignedToken({
            pathname,
            operations: ['put'],
            allowedContentTypes: [...CONTACT_ALLOWED_CONTENT_TYPES],
            maximumSizeInBytes: CONTACT_ATTACHMENT_LIMITS.maxSingleFileSize,
            validUntil: Date.now() + 5 * 60 * 1000
          }),
          urlOptions: {
            allowedContentTypes: [...CONTACT_ALLOWED_CONTENT_TYPES],
            addRandomSuffix: true,
            maximumSizeInBytes: CONTACT_ATTACHMENT_LIMITS.maxSingleFileSize,
            tokenPayload: JSON.stringify(payload)
          }
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const payload = parseClientPayload(tokenPayload ?? null);

        if (!payload) {
          await del(blob.url);
          return;
        }

        const attachment: ContactAttachment = {
          url: blob.url,
          pathname: blob.pathname,
          filename: getNormalizedAttachmentFilename(payload.index, payload.originalName),
          originalName: payload.originalName,
          contentType: blob.contentType || payload.contentType,
          size: payload.size
        };

        const isValid =
          isExpectedContactPathname(blob.pathname, payload.submissionId) &&
          isAllowedFilePair(payload.originalName, attachment.contentType) &&
          (await validateUploadedMagicNumber(blob.url, attachment.contentType));

        if (!isValid) {
          await del(blob.url);
        }

        await storeContactAttachment({
          ...attachment,
          submissionId: payload.submissionId,
          valid: isValid,
          uploadedAt: new Date().toISOString()
        });
      }
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

function parseClientPayload(value: string | null): Required<UploadClientPayload> | null {
  if (!value) {
    return null;
  }

  try {
    const payload = JSON.parse(value) as UploadClientPayload;
    const submissionId = typeof payload.submissionId === 'string' ? payload.submissionId : '';
    const index = Number(payload.index);
    const originalName = typeof payload.originalName === 'string' ? payload.originalName : '';
    const contentType = typeof payload.contentType === 'string' ? payload.contentType : '';
    const size = Number(payload.size);
    const fileCount = Number(payload.fileCount);
    const totalSize = Number(payload.totalSize);

    if (!/^[a-f0-9-]{36}$/i.test(submissionId)) {
      return null;
    }

    if (!Number.isInteger(index) || index < 1 || index > CONTACT_ATTACHMENT_LIMITS.maxFiles) {
      return null;
    }

    if (!Number.isInteger(fileCount) || fileCount < 1 || fileCount > CONTACT_ATTACHMENT_LIMITS.maxFiles) {
      return null;
    }

    if (
      !Number.isFinite(size) ||
      size <= 0 ||
      size > CONTACT_ATTACHMENT_LIMITS.maxSingleFileSize ||
      !Number.isFinite(totalSize) ||
      totalSize <= 0 ||
      totalSize > CONTACT_ATTACHMENT_LIMITS.maxTotalSize
    ) {
      return null;
    }

    if (!originalName || !contentType || !isAllowedFilePair(originalName, contentType)) {
      return null;
    }

    return {
      submissionId,
      index,
      originalName,
      contentType,
      size,
      fileCount,
      totalSize
    };
  } catch {
    return null;
  }
}
