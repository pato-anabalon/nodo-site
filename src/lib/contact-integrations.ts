import { formatFileSize, type ContactAttachment } from "@/lib/contact-attachments";

export type ContactLead = {
  submissionId: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  message: string;
  planType: string;
  planSelected: string;
  planSlug: string;
  intent: string;
  source: string;
  attachments: ContactAttachment[];
  attachmentCount: number;
  submittedAt: string;
};

type IntegrationResult = {
  configured: boolean;
  ok: boolean;
  error?: string;
  id?: string;
  url?: string;
};

type TrelloCard = {
  id: string;
  url?: string;
  shortUrl?: string;
};

export type ContactIntegrationResults = {
  trello: IntegrationResult;
  email: IntegrationResult;
  telegram: IntegrationResult;
};

export async function forwardContactLead(lead: ContactLead): Promise<ContactIntegrationResults> {
  const trello = await createTrelloCard(lead);
  const email = await sendLeadEmail(lead, trello.url);
  const telegram = await sendTelegramNotification(lead, trello.url);

  return {
    trello,
    email,
    telegram,
  };
}

export function hasCriticalIntegrationFailure(results: ContactIntegrationResults) {
  if (hasAnyIntegrationSuccess(results)) {
    return false;
  }

  const configuredResults = [results.trello, results.email, results.telegram].filter(
    (result) => result.configured,
  );

  if (configuredResults.length === 0) {
    return false;
  }

  return configuredResults.every((result) => !result.ok);
}

export function hasAnyIntegrationSuccess(results: ContactIntegrationResults) {
  return [results.trello, results.email, results.telegram].some((result) => result.ok);
}

async function createTrelloCard(lead: ContactLead): Promise<IntegrationResult> {
  const key = process.env.TRELLO_API_KEY;
  const token = process.env.TRELLO_API_TOKEN;
  const listId = process.env.TRELLO_LIST_ID;

  if (!key || !token || !listId) {
    return { configured: false, ok: false };
  }

  try {
    const cardPayload = new URLSearchParams({
      key,
      token,
      idList: listId,
      name: getLeadTitle(lead),
      desc: buildTrelloDescription(lead),
      pos: "top",
    });

    const response = await fetch("https://api.trello.com/1/cards", {
      method: "POST",
      body: cardPayload,
    });

    if (!response.ok) {
      return {
        configured: true,
        ok: false,
        error: await response.text(),
      };
    }

    const card = (await response.json()) as TrelloCard;

    await Promise.all(
      lead.attachments.map((attachment) => addTrelloAttachment(card.id, attachment, key, token)),
    );

    return {
      configured: true,
      ok: true,
      id: card.id,
      url: card.url ?? card.shortUrl,
    };
  } catch (error) {
    return {
      configured: true,
      ok: false,
      error: getErrorMessage(error),
    };
  }
}

async function addTrelloAttachment(
  cardId: string,
  attachment: ContactAttachment,
  key: string,
  token: string,
) {
  const payload = new URLSearchParams({
    key,
    token,
    url: attachment.url,
    name: attachment.originalName,
    setCover: "false",
  });

  await fetch(`https://api.trello.com/1/cards/${cardId}/attachments`, {
    method: "POST",
    body: payload,
  });
}

async function sendLeadEmail(lead: ContactLead, trelloUrl?: string): Promise<IntegrationResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_NOTIFICATION_FROM;
  const to = parseRecipients(process.env.CONTACT_NOTIFICATION_TO);

  if (!apiKey || !from || to.length === 0) {
    return { configured: false, ok: false };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: lead.email,
        subject: getLeadTitle(lead),
        html: buildEmailHtml(lead, trelloUrl),
        text: buildPlainTextLeadSummary(lead, trelloUrl),
        tags: [
          { name: "source", value: sanitizeTagValue(lead.source || "contact") },
          { name: "intent", value: sanitizeTagValue(lead.intent || "general") },
        ],
      }),
    });

    if (!response.ok) {
      return {
        configured: true,
        ok: false,
        error: await response.text(),
      };
    }

    const payload = (await response.json()) as { id?: string };

    return {
      configured: true,
      ok: true,
      id: payload.id,
    };
  } catch (error) {
    return {
      configured: true,
      ok: false,
      error: getErrorMessage(error),
    };
  }
}

async function sendTelegramNotification(
  lead: ContactLead,
  trelloUrl?: string,
): Promise<IntegrationResult> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return { configured: false, ok: false };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildTelegramMessage(lead, trelloUrl),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const payload = (await response.json()) as {
      ok?: boolean;
      description?: string;
      result?: { message_id?: number };
    };

    if (!response.ok || !payload.ok) {
      return {
        configured: true,
        ok: false,
        error: payload.description ?? JSON.stringify(payload),
      };
    }

    return {
      configured: true,
      ok: true,
      id: payload.result?.message_id ? String(payload.result.message_id) : undefined,
    };
  } catch (error) {
    return {
      configured: true,
      ok: false,
      error: getErrorMessage(error),
    };
  }
}

function getLeadTitle(lead: ContactLead) {
  const contactName = `${lead.name} ${lead.lastName}`.trim();
  const context = lead.planSelected || lead.intent || "Contact enquiry";
  return `New Nodo lead: ${contactName} - ${context}`;
}

function buildTrelloDescription(lead: ContactLead) {
  return [
    `## Contact`,
    `Name: ${lead.name} ${lead.lastName}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : "",
    lead.company ? `Company: ${lead.company}` : "",
    lead.city ? `City: ${lead.city}` : "",
    "",
    `## Context`,
    lead.intent ? `Intent: ${lead.intent}` : "",
    lead.source ? `Source: ${lead.source}` : "",
    lead.planSelected ? `Plan: ${lead.planSelected}` : "",
    lead.planType ? `Plan type: ${lead.planType}` : "",
    lead.planSlug ? `Plan slug: ${lead.planSlug}` : "",
    "",
    `## Message`,
    lead.message,
    "",
    `## Attachments`,
    lead.attachments.length
      ? lead.attachments
          .map(
            (attachment) =>
              `- [${attachment.originalName}](${attachment.url}) (${formatFileSize(attachment.size)})`,
          )
          .join("\n")
      : "No attachments.",
    "",
    `Submitted: ${lead.submittedAt}`,
    `Submission ID: ${lead.submissionId}`,
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function buildEmailHtml(lead: ContactLead, trelloUrl?: string) {
  const rows = [
    ["Name", `${lead.name} ${lead.lastName}`],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company],
    ["City", lead.city],
    ["Intent", lead.intent],
    ["Source", lead.source],
    ["Plan", lead.planSelected],
    ["Plan type", lead.planType],
    ["Submitted", lead.submittedAt],
  ].filter(([, value]) => value);

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f7f5fb;color:#17141f;font-family:Arial,sans-serif;">
    <div style="max-width:680px;margin:0 auto;padding:32px 20px;">
      <h1 style="font-size:24px;margin:0 0 20px;">New Nodo lead</h1>
      <table style="width:100%;border-collapse:collapse;background:#ffffff;border-radius:12px;overflow:hidden;">
        ${rows
          .map(
            ([label, value]) => `<tr>
          <th style="text-align:left;width:150px;padding:12px 14px;border-bottom:1px solid #eeeaf6;color:#5d566b;font-size:13px;">${escapeHtml(label)}</th>
          <td style="padding:12px 14px;border-bottom:1px solid #eeeaf6;font-size:14px;">${escapeHtml(value)}</td>
        </tr>`,
          )
          .join("")}
      </table>
      <h2 style="font-size:16px;margin:24px 0 10px;">Message</h2>
      <p style="white-space:pre-wrap;background:#ffffff;border-radius:12px;padding:16px;line-height:1.6;">${escapeHtml(lead.message)}</p>
      <h2 style="font-size:16px;margin:24px 0 10px;">Attachments</h2>
      ${buildEmailAttachmentList(lead)}
      ${
        trelloUrl
          ? `<p style="margin-top:24px;"><a href="${escapeHtml(trelloUrl)}" style="color:#6d3ff5;font-weight:700;">Open Trello card</a></p>`
          : ""
      }
    </div>
  </body>
</html>`;
}

function buildEmailAttachmentList(lead: ContactLead) {
  if (!lead.attachments.length) {
    return `<p style="background:#ffffff;border-radius:12px;padding:16px;">No attachments.</p>`;
  }

  return `<ul style="background:#ffffff;border-radius:12px;padding:16px 16px 16px 34px;line-height:1.7;">
    ${lead.attachments
      .map(
        (attachment) =>
          `<li><a href="${escapeHtml(attachment.url)}">${escapeHtml(attachment.originalName)}</a> (${formatFileSize(attachment.size)})</li>`,
      )
      .join("")}
  </ul>`;
}

function buildPlainTextLeadSummary(lead: ContactLead, trelloUrl?: string) {
  return [
    getLeadTitle(lead),
    "",
    `Name: ${lead.name} ${lead.lastName}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : "",
    lead.company ? `Company: ${lead.company}` : "",
    lead.city ? `City: ${lead.city}` : "",
    lead.intent ? `Intent: ${lead.intent}` : "",
    lead.source ? `Source: ${lead.source}` : "",
    lead.planSelected ? `Plan: ${lead.planSelected}` : "",
    "",
    "Message:",
    lead.message,
    "",
    "Attachments:",
    lead.attachments.length
      ? lead.attachments
          .map(
            (attachment) =>
              `${attachment.originalName} (${formatFileSize(attachment.size)}): ${attachment.url}`,
          )
          .join("\n")
      : "No attachments.",
    trelloUrl ? `\nTrello card: ${trelloUrl}` : "",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function buildTelegramMessage(lead: ContactLead, trelloUrl?: string) {
  const lines = [
    `<b>New Nodo lead</b>`,
    `${escapeHtml(lead.name)} ${escapeHtml(lead.lastName)}`,
    "",
    `Email: ${escapeHtml(lead.email)}`,
    lead.phone ? `Phone: ${escapeHtml(lead.phone)}` : "",
    lead.company ? `Company: ${escapeHtml(lead.company)}` : "",
    lead.city ? `City: ${escapeHtml(lead.city)}` : "",
    lead.planSelected ? `Plan: ${escapeHtml(lead.planSelected)}` : "",
    lead.intent ? `Intent: ${escapeHtml(lead.intent)}` : "",
    "",
    escapeHtml(truncate(lead.message, 900)),
    "",
    lead.attachments.length ? `Attachments: ${lead.attachments.length}` : "Attachments: 0",
    trelloUrl ? `<a href="${escapeHtml(trelloUrl)}">Open Trello card</a>` : "",
  ].filter((line) => line !== "");

  return truncate(lines.join("\n"), 3900);
}

function parseRecipients(value?: string) {
  return (
    value
      ?.split(",")
      .map((recipient) => recipient.trim())
      .filter(Boolean) ?? []
  );
}

function sanitizeTagValue(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 256) || "unknown";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncate(value: string, maxLength: number) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 3)}...` : value;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown integration error.";
}
