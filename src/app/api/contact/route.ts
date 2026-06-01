import { NextResponse } from "next/server";

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
};

const MESSAGE_MAX_LENGTH = 1500;

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

  const name = payload.name?.trim() ?? "";
  const lastName = payload.lastName?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const company = payload.company?.trim() ?? "";
  const city = payload.city?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const planSlug = payload.plan?.trim() ?? "";
  const planType = payload.planType?.trim() ?? "";
  const planSelected = payload.planSelected?.trim() ?? "";
  const intent = payload.intent?.trim() ?? "";
  const source = payload.source?.trim() ?? "";

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
      zapierForwarded: Boolean(zapierWebhookUrl),
    },
    message:
      "Contact request received. Set ZAPIER_CONTACT_WEBHOOK_URL to forward leads to Zapier.",
  });
}
