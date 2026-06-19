# Nodo Site Project Context

This document summarizes the current architecture and implementation details of the Nodo website so another chat, agent, or contributor can continue safely.

## Project Goal

Nodo is an Auckland, New Zealand based company focused on branding, digital marketing, and website design/development for growing businesses.

The site should feel premium, polished, animated, modern, and commercially sharp. Visible website copy and code naming should stay in English.

Core brand message used across the site:

- `Nodo.`
- `Clarity. Speed. Results.`
- `Brand, marketing, and websites for growing businesses`

## Repository

Local project path:

```bash
/Users/patricioanabalon/Workspace/nodo/nodo-site
```

GitHub remote:

```bash
git@github.com:pato-anabalon/nodo-site.git
```

Main working branch used in recent work:

```bash
develop
```

## Stack

- Next.js `16.x` App Router
- React `19.x`
- TypeScript
- Tailwind CSS `4.x`
- GSAP `3.13`
- `@gsap/react`
- `lucide-react`
- `@vercel/blob`
- `@upstash/redis`
- Vercel Analytics
- Google Tag Manager for Google Ads/GA4 campaign measurement
- Font: Inter via `next/font/google`

Useful scripts:

```bash
npm run dev
npm run lint
npm run build
npm run start
```

Before pushing, run:

```bash
npm run lint
npm run build
```

## App Shell

Root layout:

```bash
src/app/layout.tsx
```

The shell renders:

1. `PagePreloader`
2. `Header`
3. route content
4. `Footer`
5. Vercel `Analytics`
6. GTM consent manager when `NEXT_PUBLIC_GTM_ID` is configured

Global metadata lives in `layout.tsx`. The canonical metadata base is:

```text
https://www.nodo.co.nz
```

Global styles and design tokens live in:

```bash
src/app/globals.css
```

Important global tokens:

- `--nodo-black`
- `--nodo-white`
- `--nodo-purple`
- `--nodo-violet`
- `--nodo-lavender`
- `--nodo-pink`
- `--nodo-ink`
- CTA tone variables for dark, purple, and light surfaces
- header geometry variables

Tailwind CSS 4 is configured through CSS with `@theme inline`. Shared utility classes include `.text-balance`, `.text-pretty`, `.nodo-noise`, and header surface helpers.

## Routes

Implemented routes:

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

Route files:

```bash
src/app/page.tsx
src/app/services/page.tsx
src/app/services/website-design-auckland/page.tsx
src/app/about/page.tsx
src/app/case-studies/page.tsx
src/app/contact/page.tsx
src/app/plans/page.tsx
src/app/plans/websites/page.tsx
src/app/plans/marketing-branding/page.tsx
src/app/api/contact/route.ts
src/app/api/contact/upload/route.ts
```

`/about` has a custom Nodo story page, is indexable, and is included in the sitemap. `/case-studies` has a custom PlasterPro-focused page, is indexable, and is included in the sitemap.

## Component Architecture

The project follows an Atomic Design style:

```text
src/components/atoms
src/components/molecules
src/components/organisms
src/components/templates
```

### Atoms

- `Button.tsx`: shared CTA component. Can render a Next `Link` or native `button`. Accepts `surfaceTone`, `variant`, `icon`, and `dataTestId`.
- `Container.tsx`: central max-width wrapper using `max-w-7xl` and responsive horizontal padding.
- `ConstellationBackground.tsx`: reusable canvas background used by hero, preloader, and contact page.
- `NodoLogo.tsx`: reusable logo/mark rendering.
- `ScrollReveal.tsx`: GSAP + ScrollTrigger reveal wrapper with reduced-motion support.
- `SectionHeading.tsx`: shared section title/copy treatment.
- `TextField.tsx`: shared `TextField` and `TextArea` with dark/light surface tones.

### Molecules

- `AboutClientFocusButton.tsx`: reusable client selector with off-side neon icon, active state, and timed progress bar.
- `AboutPhilosophyCard.tsx`: reusable Nodo philosophy card with compact mobile and editorial desktop layouts.
- `AboutValueSignalCard.tsx`: reusable value card with mobile constellation treatment and desktop scroll-signal composition.
- `ContactForm.tsx`: contact form, attachment UI, submission animation, upload orchestration, and contact API call.
- `FooterLinkColumn.tsx`: footer column and link rendering.
- `ProcessStep.tsx`: home process step row.
- `ProofPoint.tsx`: home results proof card.
- `RoutePlaceholder.tsx`: temporary placeholder page layout.
- `ServiceCard.tsx`: home service card.
- `TrackedCtaButton.tsx`: shared CTA wrapper for Vercel Analytics events on homepage and 404 CTAs.
- `TrackedPlanCta.tsx`: plan CTA link with analytics query metadata.
- `AnalyticsConsentManager.tsx`: client-side Google Tag Manager consent banner and loader.
- `AnalyticsPreferencesButton.tsx`: footer control for reopening analytics preferences.

### Organisms

- `Header.tsx`: desktop and mobile site navigation.
- `Footer.tsx`: site footer with link columns and legal row.
- `Hero.tsx`: home hero with GSAP intro and constellation background.
- `PagePreloader.tsx`: one-time session preloader.
- `ContactSection.tsx`: contact page layout and animation wrapper.
- `HomeProofSection.tsx`: compact home proof band linking the PlasterPro transformation to `/case-studies`.
- `ServicesSection.tsx`, `ProcessSection.tsx`, `ResultsSection.tsx`, `AboutSection.tsx`, `CTASection.tsx`: home sections.
- `ServicesPageShowcase.tsx`: services detail cards.
- `PlansGrid.tsx`, `PlansComparison.tsx`, `PlansFaq.tsx`: plan page UI blocks.

### Templates

- `LandingPage.tsx`: home page composition.
- `ServicesPage.tsx`: full services page.
- `PlansHubPage.tsx`: `/plans` hub.
- `WebsitePlansPage.tsx`: `/plans/websites`.
- `MarketingBrandingPlansPage.tsx`: `/plans/marketing-branding`.
- `AboutPage.tsx`: `/about` Nodo story, values, clients, and final CTA page.

Content is centralized mostly in:

```bash
src/lib/content.ts
```

Shared utilities live in:

```bash
src/lib/utils.ts
```

## Desktop vs Mobile Layout

Responsive behavior is mostly Tailwind breakpoint-driven:

- Base classes target mobile first.
- `sm`, `md`, `lg`, and `xl` progressively enhance layout density.
- Desktop-specific navigation and large visual elements generally start at `lg`.
- Repeated patterns use responsive grids such as `sm:grid-cols-2`, `md:grid-cols-3`, `lg:grid-cols-*`, and `xl:grid-cols-3`.

### Header

File:

```bash
src/components/organisms/Header.tsx
```

Desktop header:

- Visible only on `lg` and up.
- Uses a fixed shell with `pointer-events-none` at the header root and `pointer-events-auto` on interactive surfaces.
- Has a left logo surface, centered pill navbar, and right contact CTA surface.
- The navbar reveals when:
  - page is near the top,
  - user scrolls up enough,
  - pointer is inside the top hover zone.
- Active/hover item indicator is calculated from DOM rects and moved via inline `left`, `width`, and `opacity`.
- GSAP handles reveal/hide behavior and has separate reduced-motion handling.

Mobile header:

- Visible below `lg`.
- Uses a fixed top bar with logo and wordmark.
- Menu button is fixed top-right and animates between hamburger and close states.
- Mobile nav is a shaped panel that slides from the right.
- Backdrop closes the menu.
- Escape key closes the menu.
- Clicking logo or any mobile nav link closes the menu.
- Mobile nav includes `Home` plus the shared `navigation` array.

### Footer

File:

```bash
src/components/organisms/Footer.tsx
```

- Uses a full-width dark footer with a rounded main panel.
- Desktop uses a two-column brand/navigation layout with `md:grid-cols-[70%_30%]`.
- Mobile stacks brand, description, navigation, and legal rows.

### Plans Comparison

File:

```bash
src/components/organisms/PlansComparison.tsx
```

- Desktop uses a table behind `plans-comparison-desktop`.
- Mobile uses per-plan cards behind `plans-comparison-mobile`.
- The desktop table is hidden below `md`; the mobile cards are hidden from `md` up.

### Hero

File:

```bash
src/components/organisms/Hero.tsx
```

- Mobile keeps the `Nodo.` wordmark and mark inline in the heading.
- Desktop hides the inline mark and shows a larger right-side mark visual.
- Main layout switches to `lg:grid-cols-[0.92fr_1.08fr]`.

### Contact Page

File:

```bash
src/components/organisms/ContactSection.tsx
```

- Main section uses `lg:grid-cols-[0.8fr_1fr]`.
- Intro and details stack above the form on mobile.
- The form card is `relative overflow-hidden`; this is required by the send animation expanding from the submit button across the whole card.

## Animation Architecture

GSAP is used for choreography and scroll reveals. Client components that use GSAP register plugins locally.

Reduced-motion support is important:

- `ScrollReveal` only animates under `prefers-reduced-motion: no-preference`.
- `Header` has a reduced-motion path that uses direct state updates instead of animated timelines.
- `PagePreloader`, `Hero`, contact form send flow, and other animated sections should keep reduced-motion behavior in mind when changed.

### Page Preloader

File:

```bash
src/components/organisms/PagePreloader.tsx
```

Behavior:

- Shows only once per browser session.
- Uses `sessionStorage` key `nodo:preloader-seen`.
- Waits for window load, fonts, and a short minimum duration.
- Emits `nodo:preloader-complete`.
- Sets `document.documentElement.dataset.nodoPreloaded = "true"`.
- First render returns `null` on server and client to avoid hydration mismatch.

### Constellation Background

File:

```bash
src/components/atoms/ConstellationBackground.tsx
```

Canvas animation with:

- moving nodes,
- connected lines,
- purple/lavender accents,
- pointer interaction,
- reduced-motion support.

Used in:

- Hero
- Contact page
- Preloader

## UI/UX Skill Reference

There is a local Codex skill for UI/UX design guidance:

```bash
.codex/skills/ui-ux-pro-max/SKILL.md
```

Do not copy the full skill content into this project context. Treat it as an agent workflow and searchable design reference, not as site architecture.

Use the skill when a task involves:

- designing or redesigning a page,
- improving visual hierarchy,
- reviewing responsive UI,
- choosing patterns, palettes, typography, or effects,
- checking interaction and accessibility quality.

For this project, preserve these distilled UI rules:

- Use Lucide/SVG icons, not emoji icons, for interface elements.
- Keep hover states stable and avoid layout-shifting transforms.
- All clickable elements should have visible feedback and `cursor-pointer` where appropriate.
- Keep transitions smooth and generally within 150-300ms unless part of a deliberate animation sequence.
- Preserve visible focus states for keyboard navigation.
- Respect `prefers-reduced-motion` for major motion and GSAP timelines.
- Verify mobile widths around 375px and desktop widths around 1024px and 1440px.
- Avoid horizontal scroll on mobile.
- Keep glass/light cards readable with sufficient background opacity, visible borders, and strong text contrast.
- Keep shared layout widths consistent with `Container` unless a section intentionally needs full-bleed treatment.

## Contact Form Architecture

Main files:

```bash
src/components/organisms/ContactSection.tsx
src/components/molecules/ContactForm.tsx
src/app/api/contact/route.ts
src/app/api/contact/upload/route.ts
src/lib/contact-attachments.ts
src/lib/contact-server.ts
src/lib/contact-integrations.ts
```

### Client Behavior

`ContactForm.tsx` handles:

- required fields,
- optional plan context,
- attachment selection/removal,
- max 5 files,
- max 25 MB total,
- accepted images, PDF, `.doc`, and `.docx`,
- normalized attachment pathnames,
- upload-on-submit,
- success/failure animation states,
- analytics events.

The flow states are:

```ts
'idle' | 'launching' | 'covering' | 'inFlight' | 'success' | 'failure'
```

Submission animation:

1. The submit button compresses into a purple circle with the paper plane icon.
2. Purple cover expands from the button to fill `contact-page-form-card`.
3. Canvas flight animation runs while the request is pending.
4. Success closes the form permanently until reload.
5. Failure shows a fall state and a `Back to form` button, preserving the typed values and selected files.

Important current temporary testing flag:

```ts
const TEMP_FORCE_FAILURE_TEST = true;
```

When this is `true`, the form does not upload files and does not call `/api/contact`; it waits about 15 seconds and simulates failure. Set it to `false` to restore the real submission flow.

The `submissionId` uses `crypto.randomUUID()` when available and falls back to a UUID v4 generator. This is needed for mobile LAN testing over `http://192.x.x.x`, where `crypto.randomUUID` may be unavailable.

### Attachment Storage

Attachment rules live in:

```bash
src/lib/contact-attachments.ts
```

Limits:

- Max files: `5`
- Max total size: `25 MB`
- Max single file size: `25 MB`

Allowed content types:

- `image/jpeg`
- `image/png`
- `image/webp`
- `image/gif`
- `application/pdf`
- `application/msword`
- `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

Blob path format:

```text
contact/YYYY-MM-DD/<submission-id>/file-1.ext
```

Vercel Blob adds a random suffix on upload, so stored paths can become:

```text
contact/YYYY-MM-DD/<submission-id>/file-1-<suffix>.ext
```

### Upload API

Route:

```bash
src/app/api/contact/upload/route.ts
```

This route:

- uses `handleUploadPresigned`,
- issues signed upload tokens with `issueSignedToken`,
- rate-limits upload token requests by IP,
- validates client payload,
- validates pathname, content type, extension, size, file count, and total size,
- allows only `put`,
- limits token validity,
- validates uploaded magic numbers in `onUploadCompleted`,
- deletes invalid blobs,
- stores attachment validation state in Redis.

### Contact API

Route:

```bash
src/app/api/contact/route.ts
```

This route:

- accepts JSON only,
- sanitizes text input,
- validates required fields,
- validates email,
- enforces message length,
- checks honeypot and form age,
- rate-limits by IP and email,
- validates attachment count and total size,
- validates attachment metadata and Redis/on-demand upload validation,
- forwards the lead to direct integrations.

The API treats the lead as received when any configured integration succeeds. If at least one configured channel succeeds, the response can still be `200` even if another integration fails.

### Direct Integrations

File:

```bash
src/lib/contact-integrations.ts
```

Current integrations:

- Trello card creation
- Resend email notification
- Telegram lead notification

Trello:

- Uses `TRELLO_API_KEY`, `TRELLO_API_TOKEN`, and `TRELLO_LIST_ID`.
- Creates a card at the top of the target list.
- Adds Blob attachment URLs to the Trello card.

Resend:

- Uses `RESEND_API_KEY`, `CONTACT_NOTIFICATION_FROM`, and `CONTACT_NOTIFICATION_TO`.
- `CONTACT_NOTIFICATION_TO` can contain multiple recipients, parsed by the app.
- Sends HTML and plain text versions.
- Sets `reply_to` to the lead email.

Telegram:

- Uses `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
- Sends an HTML-formatted message with lead summary and optional Trello URL.

Required storage/integration environment variables:

```text
NEXT_PUBLIC_GTM_ID
BLOB_READ_WRITE_TOKEN
BLOB_STORE_ID
BLOB_WEBHOOK_PUBLIC_KEY
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
TRELLO_API_KEY
TRELLO_API_TOKEN
TRELLO_LIST_ID
RESEND_API_KEY
CONTACT_NOTIFICATION_FROM
CONTACT_NOTIFICATION_TO
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
```

For local Vercel Blob callback validation, `VERCEL_BLOB_CALLBACK_URL` may be needed if `onUploadCompleted` cannot determine the callback URL.

## Test IDs

The project uses `data-testid` extensively to make browser verification and regression checks stable. Prefer keeping these stable when refactoring.

### Site Shell

- `site-header`
- `site-header-contact-button`
- `site-header-mobile-bar`
- `site-header-mobile-logo`
- `site-header-mobile-logo-wordmark`
- `site-header-mobile-menu-backdrop`
- `site-header-mobile-menu`
- `site-header-mobile-menu-link-home`
- `site-header-mobile-menu-link-services`
- `site-header-mobile-menu-link-plans`
- `site-header-mobile-menu-link-case-studies`
- `site-header-mobile-menu-link-contact`
- `site-header-mobile-menu-button`
- `site-preloader`
- `site-footer`
- `site-footer-main-panel`
- `site-footer-brand-block`
- `site-footer-tagline`
- `site-footer-description`
- `site-footer-navigation-row`
- `site-footer-navigation`
- `site-footer-legal-row`
- `site-footer-location`
- `site-footer-copyright`
- `analytics-preferences-button`
- `analytics-consent-banner`
- `analytics-consent-accept-button`
- `analytics-consent-decline-button`

Footer dynamic test IDs:

- `site-footer-column-<column-slug>`
- `site-footer-column-<column-slug>-title`
- `site-footer-column-<column-slug>-list`
- `site-footer-link-<column-and-link-slug>`

### Home Page

- `home-page-main`
- `home-hero-section`
- `home-hero-content`
- `home-hero-eyebrow`
- `home-hero-title`
- `home-hero-tagline`
- `home-hero-copy`
- `home-hero-actions`
- `home-hero-mark`
- `home-hero-scroll-button`
- `home-proof-section`
- `home-proof-layout`
- `home-proof-content`
- `home-proof-eyebrow`
- `home-proof-title`
- `home-proof-copy`
- `home-proof-points`
- `home-proof-case-study-button`
- `home-proof-visual`
- `home-services-section`
- `home-services-card-grid`
- `home-process-section`
- `home-process-layout`
- `home-process-intro-column`
- `home-process-intro-panel`
- `home-process-eyebrow`
- `home-process-title`
- `home-process-description`
- `home-process-orbit`
- `home-process-steps-panel`
- `home-process-steps-list`
- `home-results-section`
- `home-results-card-grid`
- `home-about-section`
- `home-about-layout`
- `home-about-supporting-copy`
- `home-about-video-card`
- `home-about-video`
- `home-cta-section`
- `home-cta-layout`
- `home-cta-eyebrow`
- `home-cta-title`

Home dynamic test IDs:

- `home-service-card-<service-slug>`
- `home-service-card-<service-slug>-index`
- `home-service-card-<service-slug>-icon`
- `home-service-card-<service-slug>-eyebrow`
- `home-service-card-<service-slug>-title`
- `home-service-card-<service-slug>-description`
- `home-process-step-<step-slug>`
- `home-process-step-<step-slug>-meta`
- `home-process-step-<step-slug>-eyebrow`
- `home-process-step-<step-slug>-title`
- `home-process-step-<step-slug>-description`
- `home-result-card-<result-slug>`
- `home-result-card-<result-slug>-icon`
- `home-result-card-<result-slug>-label`
- `home-result-card-<result-slug>-title`
- `home-result-card-<result-slug>-description`

### Services Page

- `services-page-main`
- `services-page-hero-section`
- `services-page-hero-content`
- `services-page-hero-eyebrow`
- `services-page-hero-title`
- `services-page-hero-subtitle`
- `services-page-hero-copy`
- `services-page-hero-actions`
- `services-page-hero-visual`
- `services-page-hero-video`
- `services-page-hero-video-caption`
- `services-page-positioning-section`
- `services-page-positioning-layout`
- `services-page-positioning-video-card`
- `services-page-positioning-video`
- `services-page-positioning-video-caption`
- `services-page-positioning-content`
- `services-page-positioning-eyebrow`
- `services-page-positioning-title`
- `services-page-positioning-copy`
- `services-page-positioning-pillars`
- `services-page-breakdown-section`
- `services-page-breakdown-showcase`
- `services-page-final-cta-section`
- `services-page-final-cta-layout`
- `services-page-final-cta-eyebrow`
- `services-page-final-cta-title`
- `services-page-final-cta-copy`
- `services-showcase-list`

Services dynamic test IDs:

- `services-page-positioning-pillar-<pillar-slug>`
- `services-showcase-card-<service-slug>`
- `services-showcase-card-<service-slug>-content`
- `services-showcase-card-<service-slug>-number`
- `services-showcase-card-<service-slug>-eyebrow`
- `services-showcase-card-<service-slug>-title`
- `services-showcase-card-<service-slug>-icon`
- `services-showcase-card-<service-slug>-description`
- `services-showcase-card-<service-slug>-highlight`
- `services-showcase-card-<service-slug>-deliverables`

### Contact Page And Form

- `contact-page-main`
- `contact-page-form-section`
- `contact-page-intro`
- `contact-page-details`
- `contact-page-form-card`
- `contact-form`
- `contact-form-context-card`
- `contact-form-plan-context-fields`
- `contact-form-plan-type-field`
- `contact-form-plan-selected-field`
- `contact-form-name-row`
- `contact-form-name-field`
- `contact-form-last-name-field`
- `contact-form-contact-row`
- `contact-form-email-field`
- `contact-form-phone-field`
- `contact-form-company-location-row`
- `contact-form-company-field`
- `contact-form-city-field`
- `contact-form-message-field`
- `contact-form-attachments`
- `contact-form-file-input`
- `contact-form-attached-file-list`
- `contact-form-attached-file`
- `contact-form-remove-attached-file`
- `contact-form-actions`
- `contact-form-submit-button`
- `contact-form-status-message`
- `contact-form-send-flow`
- `contact-form-back-to-form-button`

### Plans Pages

Shared/main:

- `plans-page-main`
- `plans-grid`
- `plans-grid-growth-partnership-cards`
- `plans-grid-pricing-note`
- `plans-launch-card`
- `plans-launch-card-type-tag`
- `plans-launch-card-title`
- `plans-launch-card-summary`
- `plans-launch-card-pricing`
- `plans-launch-card-included`
- `plans-launch-card-excluded`
- `plans-comparison`
- `plans-comparison-desktop`
- `plans-comparison-table`
- `plans-comparison-mobile`
- `plans-faq-list`

Plans hub:

- `plans-hub-hero-section`
- `plans-hub-hero-content`
- `plans-hub-hero-eyebrow`
- `plans-hub-hero-title`
- `plans-hub-hero-copy`
- `plans-hub-hero-highlights`
- `plans-hub-hero-video-card`
- `plans-hub-hero-video`
- `plans-hub-positioning-section`
- `plans-hub-path-rail`
- `plans-hub-card-grid`
- `plans-hub-final-cta-section`

Website plans:

- `plans-page-hero-section`
- `website-plans-hero-content`
- `website-plans-hero-eyebrow`
- `website-plans-hero-title`
- `website-plans-hero-subtitle`
- `website-plans-hero-copy`
- `website-plans-hero-highlights`
- `plans-page-positioning-section`
- `plans-page-positioning-video`
- `plans-page-grid-section`
- `plans-page-launch-alternative-section`
- `plans-page-comparison-section`
- `plans-page-purchase-option-section`
- `plans-page-final-cta-section`

Marketing and branding plans:

- `marketing-branding-plans-page-main`
- `marketing-branding-plans-hero-section`
- `marketing-branding-hero-content`
- `marketing-branding-hero-eyebrow`
- `marketing-branding-hero-title`
- `marketing-branding-hero-copy`
- `marketing-branding-hero-highlights`
- `bundle-plans-section`
- `bundle-plans-cards-grid`
- `bundle-plans-pricing-note`
- `marketing-branding-plans-final-cta-section`

Plans dynamic test IDs:

- `plans-grid-<plan-slug>-card`
- `plans-grid-<plan-slug>-type-tag`
- `plans-grid-<plan-slug>-badge-row`
- `plans-grid-<plan-slug>-badge`
- `plans-grid-<plan-slug>-title`
- `plans-grid-<plan-slug>-label`
- `plans-grid-<plan-slug>-pricing`
- `plans-grid-<plan-slug>-price`
- `plans-grid-<plan-slug>-summary`
- `plans-grid-<plan-slug>-features`
- `plans-comparison-row-<feature-slug>`
- `plans-comparison-mobile-card-<plan-slug>`
- `plans-faq-item-<faq-slug>`
- `plans-faq-toggle-<faq-slug>`
- `plans-faq-panel-<faq-slug>`
- `plans-hub-hero-highlight-<highlight-slug>`
- `plans-hub-path-node-<card-slug>`
- `plans-hub-card-<card-slug>`
- `website-plans-hero-highlight-<highlight-slug>`
- `marketing-branding-hero-highlight-<highlight-slug>`

### Placeholder Pages

`RoutePlaceholder` creates:

- `<pageKey>-page-main`
- `<pageKey>-page-hero-section`

Currently used by:

- `/about`

`/case-studies` previously used placeholder UI. It now renders a custom `CaseStudiesPage`.

## Data And Content Model

Primary content source:

```bash
src/lib/content.ts
```

It includes:

- main navigation,
- services,
- process steps,
- outcomes,
- proof points,
- placeholder page copy,
- services page content,
- plan slugs and plan content,
- pricing/comparison data,
- FAQ content.

Commercial hierarchy for `/plans`:

- Primary Digital Growth Partnership offers: `Flow`, `Growth`, `Nexus`.
- `Launch` is a secondary one-off website alternative.

## Local Development Notes

The project has a local `.npmrc`:

```ini
registry=https://registry.npmjs.org/
```

This prevents installs from using an older corporate Artifactory registry in the lockfile history.

For testing from a phone on the local network, `next.config.ts` currently allows:

```ts
allowedDevOrigins: ["192.168.1.33"]
```

If the local IP changes, update this value and restart the dev server.

When testing mobile through `http://192.x.x.x`, browser APIs that require secure contexts may differ from desktop `localhost`. The contact form already handles `crypto.randomUUID` with a fallback.

## Brand Assets

Reference assets live in:

```bash
documents/
```

Public brand assets include:

```bash
public/brand/nodo-logo-black.png
```

Generated app icon:

```bash
src/app/icon.svg
```

Open Graph image referenced by metadata:

```bash
public/og/nodo-og-image.png
```

## Verification Checklist

For ordinary code changes:

```bash
npm run lint
npm run build
```

For frontend or animation changes:

- Check desktop and mobile widths.
- Check reduced-motion behavior when relevant.
- Verify that visible text does not overflow cards, buttons, or panels.
- Verify that `data-testid` hooks remain stable.
- Use `npm run qa:visual -- /about --name about` or another route/name pair for controlled Playwright screenshots. The script skips the preloader, hides the analytics consent banner for the QA session, scrolls to trigger reveal animations, and writes desktop/mobile screenshots to `/private/tmp`.
- For pinned sections, add `--focus-test-id <test-id> --scroll-progress <0-1>` to capture a viewport at a specific point in the scroll-linked animation.

For contact form changes:

- Test 0 attachments.
- Test 1 to 5 valid attachments.
- Test 6 attachments.
- Test total size over 25 MB.
- Test invalid type.
- Test success and failure animation states.
- Verify Trello, Resend, and Telegram metadata in `/api/contact` response when the real flow is active.
- Turn off `TEMP_FORCE_FAILURE_TEST` before production use.
