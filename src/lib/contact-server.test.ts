import { createContactAttachment, validSubmissionId } from '@/test/factories';
import {
  getClientIp,
  hasAttachmentStore,
  isMatchingVercelBlobUrl,
  sanitizeText,
  validateAttachmentMetadata,
  validateUploadedMagicNumber
} from './contact-server';

describe('contact-server', () => {
  it('should read client IP from headers', () => {
    expect(getClientIp(new Request('https://nodo.test', { headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' } }))).toBe(
      '1.2.3.4'
    );
    expect(getClientIp(new Request('https://nodo.test', { headers: { 'x-real-ip': '9.9.9.9' } }))).toBe('9.9.9.9');
    expect(getClientIp(new Request('https://nodo.test'))).toBe('unknown');
  });

  it('should sanitize text', () => {
    expect(sanitizeText('  hi\u0000 there  ', 20)).toBe('hi there');
    expect(sanitizeText(undefined, 5)).toBe('');
    expect(sanitizeText('abcdef', 3)).toBe('abc');
  });

  it('should detect whether attachment store is configured', () => {
    expect(typeof hasAttachmentStore()).toBe('boolean');
  });

  describe('when Redis is configured but unreachable', () => {
    const originalEnv = process.env;

    function loadWithUnreachableRedis() {
      const unreachable = () => Promise.reject(new TypeError('fetch failed'));

      jest.doMock('@upstash/redis', () => ({
        Redis: jest.fn().mockImplementation(() => ({
          incr: unreachable,
          expire: unreachable,
          set: unreachable,
          get: unreachable
        }))
      }));

      return jest.requireActual<typeof import('./contact-server')>('./contact-server');
    }

    beforeEach(() => {
      jest.resetModules();
      jest.spyOn(console, 'error').mockImplementation(() => {});
      process.env = {
        ...originalEnv,
        UPSTASH_REDIS_REST_URL: 'https://unreachable.upstash.io',
        UPSTASH_REDIS_REST_TOKEN: 'token'
      };
    });

    afterEach(() => {
      process.env = originalEnv;
      jest.restoreAllMocks();
      jest.dontMock('@upstash/redis');
    });

    it('should let the submission through instead of throwing', async () => {
      const { checkRateLimit } = loadWithUnreachableRedis();

      await expect(checkRateLimit({ key: 'contact:submit:ip:1.2.3.4', limit: 8 })).resolves.toEqual({
        limited: false,
        remaining: 8,
        configured: false
      });
    });

    it('should degrade the attachment store to on-demand validation', async () => {
      const { getStoredContactAttachment, storeContactAttachment } = loadWithUnreachableRedis();
      const attachment = createContactAttachment();

      await expect(
        storeContactAttachment({
          ...attachment,
          submissionId: validSubmissionId,
          valid: true,
          uploadedAt: new Date().toISOString()
        })
      ).resolves.toBeUndefined();

      await expect(getStoredContactAttachment(validSubmissionId, attachment.pathname)).resolves.toBeNull();
    });
  });

  it('should validate matching Blob URLs and metadata', () => {
    const attachment = createContactAttachment();

    expect(isMatchingVercelBlobUrl(attachment.url, attachment.pathname)).toBe(true);
    expect(isMatchingVercelBlobUrl('http://example.com/file.pdf', attachment.pathname)).toBe(false);
    expect(validateAttachmentMetadata(attachment, validSubmissionId)).toBe(true);
    expect(validateAttachmentMetadata({ ...attachment, size: 0 }, validSubmissionId)).toBe(false);
    expect(validateAttachmentMetadata({ ...attachment, contentType: 'image/png' }, validSubmissionId)).toBe(false);
  });

  it.each([
    ['image/jpeg', [0xff, 0xd8, 0xff], true],
    ['image/png', [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], true],
    ['image/gif', Array.from('GIF89a').map((char) => char.charCodeAt(0)), true],
    ['image/webp', [0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50], true],
    ['application/pdf', Array.from('%PDF').map((char) => char.charCodeAt(0)), true],
    ['application/msword', [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1], true],
    ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', [0x50, 0x4b, 0x03, 0x04], true],
    ['image/png', [1, 2, 3], false]
  ])('should validate magic numbers for %s', async (contentType, bytes, expected) => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: async () => new Uint8Array(bytes).buffer
    });

    await expect(validateUploadedMagicNumber('https://example.com/file', contentType)).resolves.toBe(expected);
  });

  it('should reject magic numbers when fetch fails or content type is unsupported', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });

    await expect(validateUploadedMagicNumber('https://example.com/file', 'image/png')).resolves.toBe(false);
    await expect(validateUploadedMagicNumber('https://example.com/file', 'text/plain')).resolves.toBe(false);
  });
});
