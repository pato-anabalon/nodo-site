# Nodo Site

Premium marketing site for **Nodo**, an Auckland-based company focused on branding, digital marketing, and website design/development for growing businesses.

Created by Pato Anabalon.

## Quick Links

- Deep project context: [`NODO_PROJECT_CONTEXT.md`](./NODO_PROJECT_CONTEXT.md)
- Main content model: [`src/lib/content.ts`](./src/lib/content.ts)
- Contact form UI: [`src/components/molecules/ContactForm.tsx`](./src/components/molecules/ContactForm.tsx)
- Contact API: [`src/app/api/contact/route.ts`](./src/app/api/contact/route.ts)
- Upload API: [`src/app/api/contact/upload/route.ts`](./src/app/api/contact/upload/route.ts)

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP with `@gsap/react`
- Lucide icons
- Vercel Analytics
- Vercel Blob for contact form attachments
- Upstash Redis for rate limiting and upload validation state
- Trello, Resend, and Telegram direct contact form integrations

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Verify before pushing:

```bash
npm run lint
npm run build
```

Production-like local run:

```bash
npm run build
npm run start
```

## Routes

- `/`
- `/services`
- `/services/website-design-auckland`
- `/about`
- `/case-studies`
- `/contact`
- `/plans`
- `/plans/websites`
- `/plans/marketing-branding`
- `/api/contact`
- `/api/contact/upload`

`/about` currently uses placeholder page UI and is kept out of the index until it is ready. `/case-studies` has a custom PlasterPro-focused page and is included in the sitemap.

## Architecture

The component structure follows Atomic Design:

```text
src/components/atoms
src/components/molecules
src/components/organisms
src/components/templates
```

The app shell is defined in [`src/app/layout.tsx`](./src/app/layout.tsx) and renders:

1. `PagePreloader`
2. `Header`
3. route content
4. `Footer`
5. Vercel `Analytics`

Global styles and design tokens live in [`src/app/globals.css`](./src/app/globals.css).

## UI And Responsive Notes

- The site is mobile-first and uses Tailwind breakpoints for layout changes.
- Desktop navigation is shown from `lg` up.
- Mobile navigation uses a fixed top bar, animated menu button, backdrop, and right-side shaped panel.
- Major sections use stable `data-testid` hooks for browser verification and regression checks.
- GSAP animations should respect `prefers-reduced-motion`.
- The local UI/UX skill lives at `.codex/skills/ui-ux-pro-max/SKILL.md`; use it for design reviews, layout improvements, visual hierarchy, and accessibility checks.

See [`NODO_PROJECT_CONTEXT.md`](./NODO_PROJECT_CONTEXT.md) for the full `data-testid` map and responsive architecture notes.

## Contact Form

The contact form sends leads directly from the Next.js app without Zapier.

Current flow:

1. The user fills the form and optionally attaches files.
2. Attachments are validated client-side.
3. On submit, files upload to Vercel Blob through `/api/contact/upload`.
4. `/api/contact` validates the full lead and attachment metadata.
5. The app forwards the lead to Trello, Resend, and Telegram when configured.

Attachment rules:

- Max 5 files.
- Max 25 MB total per submission.
- Accepted types: JPEG, PNG, WebP, GIF, PDF, `.doc`, `.docx`.
- Blob paths use:

```text
contact/YYYY-MM-DD/<submission-id>/file-1.ext
```

Vercel Blob may add a random suffix to the stored object name.

## Required Environment Variables

File attachments and upload validation:

```bash
BLOB_STORE_ID=
BLOB_WEBHOOK_PUBLIC_KEY=
BLOB_READ_WRITE_TOKEN=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

The app also supports the Vercel Marketplace generated Upstash names:

```bash
UPSTASH_REDIS_KV_REST_API_URL=
UPSTASH_REDIS_KV_REST_API_TOKEN=
```

Lead delivery channels:

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

`CONTACT_NOTIFICATION_TO` accepts one or more comma-separated email addresses.

For local Blob callback testing, set this if Vercel Blob cannot determine the callback URL:

```bash
VERCEL_BLOB_CALLBACK_URL=
```

## Local Network Testing

When testing from a phone on the same network, update `allowedDevOrigins` in [`next.config.ts`](./next.config.ts) with the local IP shown by Next.js, then restart the dev server.

Example:

```ts
allowedDevOrigins: ["192.168.1.33"]
```

The contact form includes a fallback for `crypto.randomUUID()` because some mobile browsers do not expose it over LAN `http://192.x.x.x` development URLs.

## Temporary Test Flags

The contact form currently includes a temporary failure simulation flag:

```ts
const TEMP_FORCE_FAILURE_TEST = true;
```

When enabled, the form does not upload files and does not call `/api/contact`; it waits around 15 seconds and then shows the failure state. Set it to `false` before testing or deploying the real submission flow.

## Deployment Notes

- Vercel framework: Next.js
- Build command: `npm run build`
- Install command: default or `npm install`
- The repo includes `.npmrc` pointing to the public npm registry.

Before deploying, confirm:

- all required env vars are configured in Vercel,
- `TEMP_FORCE_FAILURE_TEST` is disabled,
- `npm run lint` passes,
- `npm run build` passes.
