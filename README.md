# Nodo Site
Landing page for Nodo, an Auckland-based digital systems company.
Created by Pato Anabalón.

## Stack

- Next.js 16 LTS
- TypeScript
- Tailwind CSS
- GSAP with `@gsap/react`
- Atomic design component structure

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Routes

- `/`
- `/services`
- `/about`
- `/case-studies`
- `/contact`

## Contact Form Integrations

The contact form can forward validated leads directly from `/api/contact` without Zapier.

Required for file attachments:

```bash
BLOB_STORE_ID=
BLOB_WEBHOOK_PUBLIC_KEY=
# Local OIDC token from `vercel env pull`; auto-injected on Vercel.
VERCEL_OIDC_TOKEN=
# Legacy Blob stores may use this instead of OIDC.
BLOB_READ_WRITE_TOKEN=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
# Vercel may generate these names when using a custom Upstash prefix.
UPSTASH_REDIS_KV_REST_API_URL=
UPSTASH_REDIS_KV_REST_API_TOKEN=
```

Optional lead delivery channels:

```bash
TRELLO_API_KEY=
TRELLO_API_TOKEN=
TRELLO_LIST_ID=

RESEND_API_KEY=
CONTACT_NOTIFICATION_FROM=
CONTACT_NOTIFICATION_TO=

TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

`CONTACT_NOTIFICATION_TO` accepts one or more comma-separated email addresses. Telegram is non-blocking; Trello and Resend are treated as critical channels when configured.
