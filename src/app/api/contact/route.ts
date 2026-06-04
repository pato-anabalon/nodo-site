import { NextResponse } from "next/server";
import {
  CONTACT_ATTACHMENT_LIMITS,
  type ContactAttachment,
  isAllowedFilePair,
} from "@/lib/contact-attachments";
import {
  checkRateLimit,
  getClientIp,
  getStoredContactAttachment,
  hasAttachmentStore,
  sanitizeText,
  validateAttachmentMetadata,
} from "@/lib/contact-server";

type ContactPayload = {
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  city?: string;
  message?: string;
  plan?: string;
  planType?: string;
  planSelected?: string;
  intent?: string;
  source?: string;
  submissionId?: string;
  formStartedAt?: string;
  website?: string;
  attachments?: ContactAttachment[];
};

const MESSAGE_MAX_LENGTH = 1500;
const MIN_FORM_AGE_MS = 1500;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const name = sanitizeText(payload.name, 80);
  const lastName = sanitizeText(payload.lastName, 80);
  const email = sanitizeText(payload.email, 120).toLowerCase();
  const phone = sanitizeText(payload.phone, 60);
  const company = sanitizeText(payload.company, 120);
  const city = sanitizeText(payload.city, 120);
  const message = sanitizeText(payload.message, MESSAGE_MAX_LENGTH + 1);
  const planSlug = sanitizeText(payload.plan, 100);
  const planType = sanitizeText(payload.planType, 100);
  const planSelected = sanitizeText(payload.planSelected, 140);
  const intent = sanitizeText(payload.intent, 80);
  const source = sanitizeText(payload.source, 100);
  const submissionId = sanitizeText(payload.submissionId, 80);
  const formStartedAt = Number(payload.formStartedAt);
  const honeypot = sanitizeText(payload.website, 120);
  const attachments = Array.isArray(payload.attachments) ? payload.attachments : [];
  const ip = getClientIp(request);

  if (
    honeypot ||
    !Number.isFinite(formStartedAt) ||
    Date.now() - formStartedAt < MIN_FORM_AGE_MS ||
    Date.now() - formStartedAt > MAX_FORM_AGE_MS
  ) {
    return NextResponse.json({ error: "Invalid contact request." }, { status: 400 });
  }

  if (!name || !lastName || !email || !message) {
    return NextResponse.json(
      { error: "Name, last name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (message.length > MESSAGE_MAX_LENGTH) {
    return NextResponse.json(
      { error: `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.` },
      { status: 400 },
    );
  }

  const ipRateLimit = await checkRateLimit({
    key: `contact:submit:ip:${ip}`,
    limit: 8,
    windowSeconds: 15 * 60,
  });

  if (ipRateLimit.limited) {
    return NextResponse.json(
      { error: "Too many contact requests. Please try again later." },
      { status: 429 },
    );
  }

  const emailRateLimit = await checkRateLimit({
    key: `contact:submit:email:${email.replace(/[^a-z0-9]/gi, "_")}`,
    limit: 4,
    windowSeconds: 60 * 60,
  });

  if (emailRateLimit.limited) {
    return NextResponse.json(
      { error: "Too many contact requests for this email. Please try again later." },
      { status: 429 },
    );
  }

  const validatedAttachments = await validateAttachments(attachments, submissionId);

  if ("error" in validatedAttachments) {
    return NextResponse.json({ error: validatedAttachments.error }, { status: 400 });
  }

  const lead = {
    name,
    lastName,
    email,
    phone,
    company,
    city,
    message,
    planType,
    planSelected,
    planSlug,
    intent,
    source,
    attachments: validatedAttachments.attachments,
    attachmentCount: validatedAttachments.attachments.length,
    submittedAt: new Date().toISOString(),
  };

  const zapierWebhookUrl = process.env.ZAPIER_CONTACT_WEBHOOK_URL;

  if (zapierWebhookUrl) {
    const zapierResponse = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
    });

    if (!zapierResponse.ok) {
      return NextResponse.json(
        { error: "The lead could not be sent right now. Please try again." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({
    ok: true,
    metadata: {
      planSlug,
      planType,
      planSelected,
      intent,
      source,
      attachmentCount: validatedAttachments.attachments.length,
      zapierForwarded: Boolean(zapierWebhookUrl),
    },
    message:
      "Contact request received. Set ZAPIER_CONTACT_WEBHOOK_URL to forward leads to Zapier.",
  });
}

async function validateAttachments(attachments: ContactAttachment[], submissionId: string) {
  if (attachments.length === 0) {
    return { attachments: [] };
  }

  if (!/^[a-f0-9-]{36}$/i.test(submissionId)) {
    return { error: "Invalid attachment session." };
  }

  if (!hasAttachmentStore()) {
    return { error: "Attachments are not available right now." };
  }

  if (attachments.length > CONTACT_ATTACHMENT_LIMITS.maxFiles) {
    return { error: `Attach up to ${CONTACT_ATTACHMENT_LIMITS.maxFiles} files.` };
  }

  const totalSize = attachments.reduce((total, attachment) => total + Number(attachment.size), 0);

  if (totalSize > CONTACT_ATTACHMENT_LIMITS.maxTotalSize) {
    return { error: "Attachments must be 25 MB total or less." };
  }

  const validated: ContactAttachment[] = [];

  for (const attachment of attachments) {
    if (
      !validateAttachmentMetadata(attachment, submissionId) ||
      !isAllowedFilePair(attachment.originalName, attachment.contentType)
    ) {
      return { error: "One or more attachments are invalid." };
    }

    const stored = await getStoredContactAttachment(submissionId, attachment.pathname);

    if (!stored?.valid) {
      return { error: "One or more attachments did not pass validation." };
    }

    validated.push({
      url: stored.url,
      pathname: stored.pathname,
      filename: stored.filename,
      originalName: stored.originalName,
      contentType: stored.contentType,
      size: stored.size,
    });
  }

  return { attachments: validated };
}
