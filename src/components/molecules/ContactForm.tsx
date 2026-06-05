'use client';

import { useState, type FormEvent } from 'react';
import { uploadPresigned } from '@vercel/blob/client';
import { Paperclip, Send, X } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { TextArea, TextField } from '@/components/atoms/TextField';
import {
  CONTACT_ATTACHMENT_ACCEPT,
  CONTACT_ATTACHMENT_LIMITS,
  formatFileSize,
  getContactAttachmentPathname,
  getNormalizedAttachmentFilename,
  validateContactFiles,
  type ContactAttachment
} from '@/lib/contact-attachments';
import { trackContactFormError, trackContactFormSubmitted } from '@/lib/analytics';
import { allPlanOptions, type PlanIntent } from '@/lib/content';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type ContactFormProps = {
  selectedPlanSlug?: string;
  intent?: string;
  source?: string;
};

const intentLabels: Record<PlanIntent | 'general', string> = {
  'discovery-call': 'Discovery call',
  quote: 'Quote request',
  general: 'General enquiry'
};

const MESSAGE_MAX_LENGTH = 1500;

function normaliseIntent(value?: string): PlanIntent | 'general' {
  return value === 'discovery-call' || value === 'quote' ? value : 'general';
}

function getPlanType(plan: (typeof allPlanOptions)[number] | undefined) {
  if (!plan) {
    return '';
  }

  if ('category' in plan && plan.category === 'Bundle') {
    return 'All-in-One Bundle';
  }

  if ('category' in plan && (plan.category === 'Marketing' || plan.category === 'Branding')) {
    return 'Marketing & Branding';
  }

  return 'Website';
}

export function ContactForm({ selectedPlanSlug, intent, source }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submissionId, setSubmissionId] = useState(() => crypto.randomUUID());
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now().toString());
  const selectedPlan = allPlanOptions.find((plan) => plan.slug === selectedPlanSlug);
  const selectedIntent = normaliseIntent(intent);
  const selectedPlanType = getPlanType(selectedPlan);
  const trackingPlan = selectedPlan?.slug ?? 'not-selected';
  const trackingSource = source ?? 'contact';
  const attachmentTotalSize = selectedFiles.reduce((total, file) => total + file.size, 0);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const incomingFiles = Array.from(event.currentTarget.files ?? []);
    const nextFiles = [...selectedFiles, ...incomingFiles].slice(
      0,
      CONTACT_ATTACHMENT_LIMITS.maxFiles + incomingFiles.length
    );
    const validationMessage = validateContactFiles(nextFiles);

    event.currentTarget.value = '';

    if (validationMessage) {
      setStatus('error');
      setMessage(validationMessage);
      return;
    }

    setSelectedFiles(nextFiles);
    setStatus('idle');
    setMessage('');
  }

  function removeFile(index: number) {
    setSelectedFiles((files) => files.filter((_, fileIndex) => fileIndex !== index));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const validationMessage = validateContactFiles(selectedFiles);

    if (validationMessage) {
      setStatus('error');
      setMessage(validationMessage);
      return;
    }

    try {
      const attachments = await uploadAttachments(selectedFiles, submissionId);
      const payload = {
        ...Object.fromEntries(formData),
        submissionId,
        formStartedAt,
        attachments
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? 'Unable to send your message.');
      }

      form.reset();
      setLeadMessage('');
      setSelectedFiles([]);
      setSubmissionId(crypto.randomUUID());
      setFormStartedAt(Date.now().toString());
      setStatus('success');
      setMessage('Thanks. Nodo will review your message and get back to you soon.');
      trackContactFormSubmitted({
        plan: trackingPlan,
        intent: selectedIntent,
        source: trackingSource
      });
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'Something went wrong.';

      setStatus('error');
      setMessage(reason);
      trackContactFormError({
        plan: trackingPlan,
        intent: selectedIntent,
        source: trackingSource,
        reason
      });
    }
  }

  return (
    <form data-testid="contact-form" onSubmit={handleSubmit} className="grid gap-5">
      <input type="hidden" name="intent" value={selectedIntent} />
      <input type="hidden" name="source" value={trackingSource} />
      <input type="hidden" name="formStartedAt" value={formStartedAt} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
      {selectedPlan ? <input type="hidden" name="plan" value={selectedPlan.slug} /> : null}

      {selectedPlan || selectedIntent !== 'general' ? (
        <div
          data-testid="contact-form-context-card"
          className="rounded-3xl border border-nodo-purple/18 bg-nodo-purple/[0.06] p-4 text-sm leading-6 text-nodo-ink/66"
        >
          {selectedPlan ? (
            <p>
              <span className="font-semibold text-nodo-black">Selected plan:</span> {selectedPlan.name}
            </p>
          ) : null}
          <p>
            <span className="font-semibold text-nodo-black">Inquiry type:</span> {intentLabels[selectedIntent]}
          </p>
        </div>
      ) : null}

      {selectedPlan ? (
        <div data-testid="contact-form-plan-context-fields" className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Plan type"
            name="planType"
            value={selectedPlanType}
            data-testid="contact-form-plan-type-field"
            readOnly
            surfaceTone="light"
          />
          <TextField
            label="Plan selected"
            name="planSelected"
            value={selectedPlan.name}
            data-testid="contact-form-plan-selected-field"
            readOnly
            surfaceTone="light"
          />
        </div>
      ) : null}

      <div data-testid="contact-form-name-row" className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Name"
          name="name"
          autoComplete="given-name"
          data-testid="contact-form-name-field"
          required
          surfaceTone="light"
        />
        <TextField
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
          data-testid="contact-form-last-name-field"
          required
          surfaceTone="light"
        />
      </div>
      <div data-testid="contact-form-contact-row" className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          data-testid="contact-form-email-field"
          required
          surfaceTone="light"
        />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          data-testid="contact-form-phone-field"
          surfaceTone="light"
        />
      </div>
      <div data-testid="contact-form-company-location-row" className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Company"
          name="company"
          autoComplete="organization"
          data-testid="contact-form-company-field"
          surfaceTone="light"
        />
        <TextField
          label="City"
          name="city"
          autoComplete="address-level2"
          data-testid="contact-form-city-field"
          surfaceTone="light"
        />
      </div>
      <TextArea
        label="Message"
        name="message"
        data-testid="contact-form-message-field"
        maxLength={MESSAGE_MAX_LENGTH}
        value={leadMessage}
        onChange={(event) => setLeadMessage(event.currentTarget.value)}
        placeholder={
          selectedPlan
            ? `Tell us what you want to achieve with ${selectedPlan.name}.`
            : 'Tell us about the brand, digital marketing, or website project you want to create or improve.'
        }
        footer={`${leadMessage.length}/${MESSAGE_MAX_LENGTH}`}
        required
        surfaceTone="light"
      />
      <div
        data-testid="contact-form-attachments"
        className="grid gap-3 rounded-2xl border border-black/8 bg-white/70 p-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-nodo-ink/72">Attached files</p>
            <p className="mt-1 text-xs font-medium text-nodo-ink/48">
              Images, PDF or Word. Up to {CONTACT_ATTACHMENT_LIMITS.maxFiles} files and{' '}
              {formatFileSize(CONTACT_ATTACHMENT_LIMITS.maxTotalSize)} total.
            </p>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-nodo-purple/20 bg-white px-4 py-2 text-sm font-bold text-nodo-purple transition hover:border-nodo-purple/45 hover:bg-nodo-purple/[0.06]">
            <Paperclip aria-hidden="true" className="size-4" />
            Add files
            <input
              type="file"
              className="sr-only"
              multiple
              accept={CONTACT_ATTACHMENT_ACCEPT}
              onChange={handleFileChange}
              data-testid="contact-form-file-input"
            />
          </label>
        </div>
        {selectedFiles.length ? (
          <div className="grid gap-2" data-testid="contact-form-attached-file-list">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${file.lastModified}`}
                className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-black/8 bg-[var(--foreground)] px-3 py-2"
                data-testid="contact-form-attached-file"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-nodo-black">{file.name}</p>
                  <p className="text-xs font-medium text-nodo-ink/46">{formatFileSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-black/8 text-nodo-ink/58 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Remove ${file.name}`}
                  data-testid="contact-form-remove-attached-file"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              </div>
            ))}
            <p className="text-xs font-semibold text-nodo-ink/46">
              {selectedFiles.length}/{CONTACT_ATTACHMENT_LIMITS.maxFiles} files, {formatFileSize(attachmentTotalSize)}{' '}
              selected
            </p>
          </div>
        ) : null}
      </div>
      <div data-testid="contact-form-actions" className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          disabled={status === 'submitting'}
          icon={<Send aria-hidden="true" className="size-4" />}
          dataTestId="contact-form-submit-button"
          surfaceTone="light"
        >
          {status === 'submitting' ? 'Sending' : 'Send message'}
        </Button>
        {message ? (
          <p
            className={
              status === 'success' ? 'text-sm font-medium text-nodo-purple' : 'text-sm font-medium text-red-600'
            }
            role="status"
            data-testid="contact-form-status-message"
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

async function uploadAttachments(files: File[], submissionId: string): Promise<ContactAttachment[]> {
  if (!files.length) {
    return [];
  }

  const date = new Date().toISOString().slice(0, 10);
  const totalSize = files.reduce((total, file) => total + file.size, 0);

  return Promise.all(
    files.map(async (file, index) => {
      const fileIndex = index + 1;
      const pathname = getContactAttachmentPathname({
        date,
        submissionId,
        index: fileIndex,
        originalName: file.name
      });
      const filename = getNormalizedAttachmentFilename(fileIndex, file.name);
      const blob = await uploadPresigned(pathname, file, {
        access: 'public',
        handleUploadUrl: '/api/contact/upload',
        clientPayload: JSON.stringify({
          submissionId,
          index: fileIndex,
          originalName: file.name,
          contentType: file.type,
          size: file.size,
          fileCount: files.length,
          totalSize
        })
      });

      return {
        url: blob.url,
        pathname: blob.pathname,
        filename,
        originalName: file.name,
        contentType: blob.contentType || file.type,
        size: file.size
      };
    })
  );
}
