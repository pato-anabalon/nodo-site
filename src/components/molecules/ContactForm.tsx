'use client';

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { uploadPresigned } from '@vercel/blob/client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { AlertTriangle, CheckCircle, Paperclip, RotateCcw, Send, X } from 'lucide-react';
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
import { cn } from '@/lib/utils';

gsap.registerPlugin(useGSAP);

type FlowState = 'idle' | 'launching' | 'covering' | 'inFlight' | 'success' | 'failure';

type ContactFormProps = {
  selectedPlanSlug?: string;
  intent?: string;
  source?: string;
};

type ContactResponse = {
  ok?: boolean;
  error?: string;
  metadata?: {
    leadReceived?: boolean;
    integrations?: Record<string, { ok?: boolean; configured?: boolean }>;
  };
};

const intentLabels: Record<PlanIntent | 'general', string> = {
  'discovery-call': 'Discovery call',
  quote: 'Quote request',
  general: 'General enquiry'
};

const MESSAGE_MAX_LENGTH = 1500;
const LAUNCH_DURATION_MS = 2000;
const COVER_DURATION_MS = 850;
const MIN_FLIGHT_DURATION_MS = 700;

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
  const rootRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const [flowState, setFlowState] = useState<FlowState>('idle');
  const [message, setMessage] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submissionId] = useState(() => crypto.randomUUID());
  const [formStartedAt] = useState(() => Date.now().toString());
  const [submittedName, setSubmittedName] = useState('');
  const [failureReason, setFailureReason] = useState('');
  const selectedPlan = allPlanOptions.find((plan) => plan.slug === selectedPlanSlug);
  const selectedIntent = normaliseIntent(intent);
  const selectedPlanType = getPlanType(selectedPlan);
  const trackingPlan = selectedPlan?.slug ?? 'not-selected';
  const trackingSource = source ?? 'contact';
  const attachmentTotalSize = selectedFiles.reduce((total, file) => total + file.size, 0);
  const isSending = flowState !== 'idle';
  const shouldDimFields = flowState !== 'idle' && flowState !== 'launching';
  const hasClosedForm = flowState === 'success';

  useGSAP(
    () => {
      const button = submitButtonRef.current;
      const cover = coverRef.current;
      const root = rootRef.current;

      if (!button || !cover || !root) {
        return;
      }

      if (flowState === 'idle') {
        gsap.killTweensOf([button, '.contact-submit-plane', '.contact-submit-label', cover]);
        gsap.set(cover, { autoAlpha: 0, scale: 0 });
        gsap.set(button, { clearProps: 'width,paddingLeft,paddingRight,backgroundColor,borderColor,color' });
        gsap.set(['.contact-submit-label', '.contact-submit-plane'], { clearProps: 'all' });
        return;
      }

      if (flowState === 'launching') {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to(button, {
          width: 44,
          paddingLeft: 0,
          paddingRight: 0,
          backgroundColor: 'var(--nodo-purple)',
          borderColor: 'rgba(124,58,237,0.6)',
          color: 'var(--nodo-white)',
          duration: 0.46
        })
          .to('.contact-submit-label', { autoAlpha: 0, width: 0, duration: 0.24 }, '<')
          .to(
            '.contact-submit-plane',
            {
              x: 4,
              y: -3,
              rotation: -18,
              duration: 0.28,
              yoyo: true,
              repeat: 5,
              ease: 'sine.inOut'
            },
            '-=0.05'
          );
      }

      if (flowState === 'covering') {
        const rootRect = root.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const centerX = buttonRect.left + buttonRect.width / 2 - rootRect.left;
        const centerY = buttonRect.top + buttonRect.height / 2 - rootRect.top;
        const maxX = Math.max(centerX, rootRect.width - centerX);
        const maxY = Math.max(centerY, rootRect.height - centerY);
        const radius = Math.hypot(maxX, maxY) + 120;

        gsap.set(cover, {
          autoAlpha: 1,
          width: 48,
          height: 48,
          x: centerX - 24,
          y: centerY - 24,
          scale: 1
        });
        gsap.to(cover, {
          scale: radius / 24,
          duration: COVER_DURATION_MS / 1000,
          ease: 'power3.inOut'
        });
      }
    },
    { scope: rootRef, dependencies: [flowState], revertOnUpdate: false }
  );

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const incomingFiles = Array.from(event.currentTarget.files ?? []);
    const nextFiles = [...selectedFiles, ...incomingFiles].slice(
      0,
      CONTACT_ATTACHMENT_LIMITS.maxFiles + incomingFiles.length
    );
    const validationMessage = validateContactFiles(nextFiles);

    event.currentTarget.value = '';

    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    setSelectedFiles(nextFiles);
    setMessage('');
  }

  function removeFile(index: number) {
    setSelectedFiles((files) => files.filter((_, fileIndex) => fileIndex !== index));
  }

  function resetToForm() {
    setFlowState('idle');
    setFailureReason('');
    setMessage('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSending || hasClosedForm) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const validationMessage = validateContactFiles(selectedFiles);

    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    const firstName = String(formData.get('name') ?? '').trim();

    setMessage('');
    setFailureReason('');
    setSubmittedName(firstName || 'there');
    setFlowState('launching');

    const submission = submitContactLead({
      formData,
      submissionId,
      formStartedAt,
      files: selectedFiles
    });

    await wait(LAUNCH_DURATION_MS);
    setFlowState('covering');
    await wait(COVER_DURATION_MS);
    setFlowState('inFlight');

    const flightStartedAt = Date.now();
    const result = await submission;
    const remainingFlightTime = Math.max(0, MIN_FLIGHT_DURATION_MS - (Date.now() - flightStartedAt));

    if (remainingFlightTime) {
      await wait(remainingFlightTime);
    }

    if (result.ok) {
      setFlowState('success');
      trackContactFormSubmitted({
        plan: trackingPlan,
        intent: selectedIntent,
        source: trackingSource
      });
      return;
    }

    setFailureReason(result.reason);
    setFlowState('failure');
    trackContactFormError({
      plan: trackingPlan,
      intent: selectedIntent,
      source: trackingSource,
      reason: result.reason
    });
  }

  return (
    <form
      ref={rootRef}
      data-testid="contact-form"
      onSubmit={handleSubmit}
      className="relative grid gap-5"
      aria-busy={isSending && flowState !== 'failure'}
    >
      <fieldset
        disabled={isSending}
        className={cn(
          'grid gap-5 transition duration-300',
          shouldDimFields ? 'pointer-events-none select-none opacity-45 blur-[1px]' : null,
          hasClosedForm ? 'opacity-0' : null
        )}
      >
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
                  className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-black/8 bg-white px-3 py-2"
                  data-testid="contact-form-attached-file"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-nodo-black">{file.name}</p>
                    <p className="text-xs font-medium text-nodo-ink/46">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/8 text-nodo-ink/58 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    aria-label={`Remove ${file.name}`}
                    data-testid="contact-form-remove-attached-file"
                  >
                    <X aria-hidden="true" className="size-4" />
                  </button>
                </div>
              ))}
              <p className="text-xs font-semibold text-nodo-ink/46">
                {selectedFiles.length}/{CONTACT_ATTACHMENT_LIMITS.maxFiles} files,{' '}
                {formatFileSize(attachmentTotalSize)} selected
              </p>
            </div>
          ) : null}
        </div>
        <div data-testid="contact-form-actions" className="flex flex-wrap items-center gap-4">
          <button
            ref={submitButtonRef}
            type="submit"
            disabled={isSending}
            className="contact-submit-button inline-flex min-h-11 w-[10.25rem] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border border-[color:var(--cta-light-primary-border)] bg-[var(--cta-light-primary-bg)] px-5 py-2.5 text-sm font-semibold leading-none text-[var(--cta-light-primary-text)] shadow-[0_6px_18px_rgba(5,5,5,0.10)] transition duration-200 hover:-translate-y-0.5 hover:border-[color:var(--cta-light-primary-hover-border)] hover:bg-[var(--cta-light-primary-hover-bg)] hover:text-[var(--cta-light-primary-hover-text)] hover:shadow-[0_12px_28px_rgba(124,58,237,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cta-light-primary-outline)] disabled:cursor-default"
            data-testid="contact-form-submit-button"
          >
            <span className="contact-submit-label whitespace-nowrap">Send message</span>
            <span className="contact-submit-plane inline-flex shrink-0 items-center justify-center">
              <Send aria-hidden="true" className="size-4" />
            </span>
          </button>
          {message ? (
            <p
              className="text-sm font-medium text-red-600"
              role="status"
              data-testid="contact-form-status-message"
            >
              {message}
            </p>
          ) : null}
        </div>
      </fieldset>

      <div
        ref={coverRef}
        className="contact-submit-cover pointer-events-none absolute left-0 top-0 z-10 rounded-full bg-nodo-purple"
        aria-hidden="true"
      />

      {flowState !== 'idle' ? (
        <div
          className={cn(
            'absolute -inset-5 z-20 grid place-items-center overflow-hidden rounded-[2rem] px-5 py-8 text-center text-nodo-white sm:-inset-8',
            flowState === 'launching' || flowState === 'covering' ? 'pointer-events-none' : null
          )}
          data-testid="contact-form-send-flow"
        >
          <ContactFlightCanvas active={flowState === 'inFlight' || flowState === 'failure'} failed={flowState === 'failure'} />
          {flowState === 'inFlight' ? (
            <div className="relative z-10 grid justify-items-center gap-4" role="status" aria-live="polite">
              <div className="inline-flex size-14 items-center justify-center rounded-full border border-white/18 bg-white/10 shadow-[0_18px_70px_rgba(255,255,255,0.16)]">
                <Send aria-hidden="true" className="size-6 -rotate-12" />
              </div>
              <p className="max-w-xs text-balance text-lg font-black leading-tight sm:text-2xl">
                Sending valuable details to Nodo
              </p>
              <p className="max-w-sm text-sm font-medium leading-6 text-white/68">
                Your message, files, and contact details are travelling through the right channels.
              </p>
            </div>
          ) : null}
          {flowState === 'success' ? (
            <div className="relative z-10 grid max-w-md justify-items-center gap-4" role="status" aria-live="polite">
              <div className="inline-flex size-16 items-center justify-center rounded-full border border-white/18 bg-white text-nodo-purple shadow-[0_18px_70px_rgba(255,255,255,0.20)]">
                <CheckCircle aria-hidden="true" className="size-8" />
              </div>
              <p className="text-balance text-2xl font-black leading-tight sm:text-3xl">
                Thanks, {submittedName}. We&apos;ll be in touch soon.
              </p>
              <p className="text-sm font-semibold leading-6 text-white/72">Keep an eye out.</p>
            </div>
          ) : null}
          {flowState === 'failure' ? (
            <div className="relative z-10 grid max-w-md justify-items-center gap-4" role="status" aria-live="polite">
              <div className="inline-flex size-16 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white shadow-[0_18px_70px_rgba(255,255,255,0.12)]">
                <AlertTriangle aria-hidden="true" className="size-8" />
              </div>
              <p className="text-balance text-2xl font-black leading-tight sm:text-3xl">
                Something interrupted the delivery.
              </p>
              <p className="max-w-sm text-sm font-semibold leading-6 text-white/72">
                {failureReason || 'Please try again.'}
              </p>
              <button
                type="button"
                onClick={resetToForm}
                className="mt-2 inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/18 bg-white px-5 py-2.5 text-sm font-bold text-nodo-purple transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                data-testid="contact-form-back-to-form-button"
              >
                <RotateCcw aria-hidden="true" className="size-4" />
                Back to form
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

async function submitContactLead(params: {
  formData: FormData;
  submissionId: string;
  formStartedAt: string;
  files: File[];
}) {
  try {
    const attachments = await uploadAttachments(params.files, params.submissionId);
    const payload = {
      ...Object.fromEntries(params.formData),
      submissionId: params.submissionId,
      formStartedAt: params.formStartedAt,
      attachments
    };

    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responsePayload = (await response.json().catch(() => ({}))) as ContactResponse;

    if (response.ok || responsePayload.metadata?.leadReceived || hasAnySuccessfulIntegration(responsePayload)) {
      return { ok: true, reason: '' };
    }

    return {
      ok: false,
      reason: responsePayload.error ?? 'Please try again.'
    };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : 'Please try again.'
    };
  }
}

function hasAnySuccessfulIntegration(payload: ContactResponse) {
  return Object.values(payload.metadata?.integrations ?? {}).some((integration) => integration.ok);
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

function ContactFlightCanvas({ active, failed }: { active: boolean; failed: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !active) {
      return;
    }

    const canvasElement = canvas;
    const context = canvasElement.getContext('2d');

    if (!context) {
      return;
    }

    const drawingContext = context;
    let frameId = 0;
    let start = performance.now();
    const particles = Array.from({ length: 32 }, (_, index) => ({
      offset: index / 32,
      lane: (index % 7) / 6,
      size: 1.5 + (index % 4) * 0.7,
      speed: 0.12 + (index % 5) * 0.015
    }));

    function resize() {
      const rect = canvasElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvasElement.width = Math.max(1, Math.floor(rect.width * dpr));
      canvasElement.height = Math.max(1, Math.floor(rect.height * dpr));
      drawingContext.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawPlane(x: number, y: number, rotation: number, alpha = 1) {
      drawingContext.save();
      drawingContext.translate(x, y);
      drawingContext.rotate(rotation);
      drawingContext.globalAlpha = alpha;
      drawingContext.fillStyle = '#ffffff';
      drawingContext.beginPath();
      drawingContext.moveTo(18, 0);
      drawingContext.lineTo(-14, -10);
      drawingContext.lineTo(-8, 0);
      drawingContext.lineTo(-14, 10);
      drawingContext.closePath();
      drawingContext.fill();
      drawingContext.strokeStyle = 'rgba(255,255,255,0.42)';
      drawingContext.lineWidth = 1;
      drawingContext.beginPath();
      drawingContext.moveTo(-8, 0);
      drawingContext.lineTo(18, 0);
      drawingContext.stroke();
      drawingContext.restore();
    }

    function draw(now: number) {
      const width = canvasElement.clientWidth;
      const height = canvasElement.clientHeight;
      const elapsed = (now - start) / 1000;

      drawingContext.clearRect(0, 0, width, height);

      const gradient = drawingContext.createRadialGradient(width * 0.72, height * 0.18, 10, width * 0.5, height * 0.5, width);
      gradient.addColorStop(0, 'rgba(196,181,253,0.26)');
      gradient.addColorStop(0.5, 'rgba(124,58,237,0.18)');
      gradient.addColorStop(1, 'rgba(124,58,237,0)');
      drawingContext.fillStyle = gradient;
      drawingContext.fillRect(0, 0, width, height);

      drawingContext.strokeStyle = 'rgba(255,255,255,0.12)';
      drawingContext.lineWidth = 1;
      for (let lane = 0; lane < 4; lane += 1) {
        const y = height * (0.24 + lane * 0.18) + Math.sin(elapsed * 0.8 + lane) * 12;
        drawingContext.beginPath();
        for (let x = -20; x <= width + 20; x += 26) {
          const waveY = y + Math.sin(x * 0.014 + elapsed + lane) * 12;
          if (x === -20) {
            drawingContext.moveTo(x, waveY);
          } else {
            drawingContext.lineTo(x, waveY);
          }
        }
        drawingContext.stroke();
      }

      particles.forEach((particle) => {
        const progress = (particle.offset + elapsed * particle.speed) % 1;
        const x = width * progress;
        const y = height * (0.18 + particle.lane * 0.64) + Math.sin(elapsed * 2 + particle.offset * 10) * 14;

        drawingContext.fillStyle = `rgba(255,255,255,${0.16 + particle.lane * 0.1})`;
        drawingContext.beginPath();
        drawingContext.arc(x, y, particle.size, 0, Math.PI * 2);
        drawingContext.fill();
      });

      if (failed) {
        const fallProgress = Math.min(1, elapsed / 1.45);
        const x = width * (0.22 + fallProgress * 0.5);
        const y = height * (0.2 + fallProgress * 0.62);
        drawPlane(x, y, -0.55 + fallProgress * 2.15, 0.95);
        drawingContext.strokeStyle = 'rgba(255,255,255,0.32)';
        drawingContext.beginPath();
        drawingContext.moveTo(width * 0.18, height * 0.84);
        drawingContext.lineTo(width * 0.82, height * 0.84);
        drawingContext.stroke();
      } else {
        const planeX = width * (0.18 + ((elapsed * 0.11) % 0.64));
        const planeY = height * 0.48 + Math.sin(elapsed * 1.7) * 42;
        drawPlane(planeX, planeY, -0.24 + Math.sin(elapsed * 1.3) * 0.14);
      }

      frameId = window.requestAnimationFrame(draw);
    }

    resize();
    start = performance.now();
    frameId = window.requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [active, failed]);

  return <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />;
}

function wait(duration: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
}
