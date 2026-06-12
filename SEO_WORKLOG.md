# Nodo SEO And UX Worklog

This file summarizes the SEO, UX writing, content, and visual-system work done during the current Nodo site improvement cycle. Use it as the handoff point when starting a new chat or reducing active context.

## Current Goal

Improve Nodo's organic search visibility and conversion clarity while keeping the site premium, clear, and easy for non-technical Auckland/New Zealand business owners to understand.

Key working rules:

- Keep visible copy in English.
- Avoid overusing abstract or technical language such as "systems" when the customer may read it as expensive or complex.
- Prefer business outcomes, decision clarity, and next-step confidence over internal technical language.
- Keep `/plans` retainer-first, with `Flow`, `Growth`, and `Nexus` leading over `Launch`.
- Skip undeveloped sections during SEO audits until they are ready to be indexed.

## Skills And Review Lenses Used

- `.codex/skills/seo-mastery/SKILL.md` for SEO audits, indexability, metadata, structured data, sitemap, Search Console guidance, and route-level search strategy.
- `.codex/skills/ui-ux-pro-max/SKILL.md` for layout, visual hierarchy, conversion clarity, content density, and component-level UI decisions.
- GSAP skills for motion patterns, scroll-triggered behavior, reduced-motion support, and animation debugging.
- React/Next.js best-practice checks after multi-component TSX edits.

## SEO Baseline Implemented

Core SEO implementation now centers around:

- `src/lib/seo.ts`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- route-level `metadata` through `createPageMetadata`
- route-level JSON-LD where relevant

Implemented baseline:

- Added/confirmed `robots.txt`.
- Added/confirmed `sitemap.xml`.
- Centralized route metadata in `src/lib/seo.ts`.
- Added canonical URL support.
- Added Open Graph and Twitter metadata support.
- Added global organization/local business structured data for Nodo.
- Added breadcrumb structured data on relevant routes.
- Added `/case-studies` as an indexable route once the page had enough real content.
- Removed `/about` from the sitemap because it is not developed yet.
- Set `/about` to `noIndex` while hidden/unfinished.

Search Console status:

- Property verification using a personal Gmail account is acceptable.
- `https://www.nodo.co.nz/sitemap.xml` was submitted successfully.
- Search Console reported the sitemap as successful.
- After removing `/about`, Google showed 7 submitted pages.
- The new `/services/website-design-auckland` landing page should add another indexable URL after deployment and sitemap refresh.

## Structured Data Details

Business data provided by the user:

- Public/legal name: `Nodo Limited`
- Street address: `19 Marywil Crescent, Hauraki`
- City: `Auckland`
- Region: `Auckland`
- Postal code: `0627`
- Country: `New Zealand`
- NZBN: `9429053399663`
- Public email: `contact@nodo.co.nz`
- Public phone: `+64 27 742 3001`
- Instagram: `https://www.instagram.com/nodo.co.nz/`
- Facebook: `https://www.facebook.com/nodo.co.nz`
- LinkedIn: `https://www.linkedin.com/company/nodonz/`

Implemented in `src/lib/seo.ts`:

- Organization/local business identity.
- NZBN as a business identifier.
- Address and contact fields.
- Social profile structure with `sameAs`.

Recommended future profiles:

- Google Business Profile.
- LinkedIn company page.
- Facebook page.
- Instagram.
- Optional YouTube/TikTok only if Nodo will publish video content consistently.

## Home Page Work

Main direction:

- Removed the "systems" positioning because it can sound expensive, complex, or too technical for small/growing businesses.
- Reframed messaging around sharper brands, smarter marketing, websites, clarity, speed, results, and business growth.

Footer:

- Added more visible contact information.
- Added icon-based contact/social structure.
- Added visible social data/components for Instagram, Facebook, and LinkedIn URLs.
- Improved icon hover animation.
- Reworked layout into three columns:
  - left: Nodo logo and tagline
  - center: contact details
  - right: footer navigation
- Removed duplicate "Built in Auckland, New Zealand" from the descriptive sentence.
- Changed the footer tagline animation several times.
- Final direction: word entrance/exit animation without shine or energy line, with subtle Nodo purple blur shadow for depth.

Home hero/title visual issue:

- Several clipped letters were traced to wrappers with `overflow-hidden` and insufficient descender padding.
- This matters for words with descenders such as `g` and `y`.
- Any future title animation should preserve enough bottom padding and avoid clipping text during transforms.

Home process section:

- Reduced dense explanatory copy.
- Reworked the section for clearer, more direct UX writing.
- Removed/abandoned the desktop `home-process-orbit` direction because it added visual complexity without enough informational value.
- Temporarily replaced the right-side output panel with `public/videos/how-we-work.mp4` on desktop.
- Rebalanced the layout so the intro text starts at the top of the intro column and the desktop video sits below it.
- The process video is intentionally not rendered below the `lg` breakpoint so mobile does not load `how-we-work.mp4`.
- Fixed the scroll interaction so the active step, number, tag, and connecting line illuminate again while scrolling.

Home results section:

- Reworked wording because phrases like "fewer clicks" could be misread by non-technical customers as "users will interact less with my website".
- Reduced cognitive load by simplifying the hierarchy and making outcomes clearer.
- Direction: communicate more enquiries, clearer trust, faster decisions, and easier next steps instead of interaction mechanics.

## Services Page Work

Main direction:

- Reviewed `/services` from a UX writing perspective.
- Improved wording so services are easier to understand for business owners.
- Made the value of each service more concrete and less abstract.
- Improved CTA clarity on service showcase cards.
- Added hover behavior so hovering a service card also makes the related CTA feel actionable.

## Plans Work

Main direction:

- Reviewed `/plans` as a key conversion page.
- Improved wording to make the plan model easier to understand.
- Kept `Flow`, `Growth`, and `Nexus` as the primary recurring partnership options.
- Kept `Launch` as the secondary one-off website option.
- Reduced ambiguity around what each plan is for and when a customer should choose it.

Important content strategy:

- `/plans` should help the user decide, not just compare features.
- Copy should reduce buyer anxiety and show the intended fit for each plan.
- Avoid making plans sound overly technical or agency-internal.

## Case Studies Work

Current route:

- `/case-studies`
- Main template: `src/components/templates/CaseStudiesPage.tsx`
- Content source: `src/lib/content.ts`

Current status:

- `/case-studies` is now considered ready enough to be indexable.
- Built the page around the real PlasterPro Solution website redesign.
- Created a hero with stronger proof instead of a generic portfolio placeholder.
- Added a before/after proof panel using PlasterPro visuals.
- Implemented a 3D-style carousel motion where before/after cards rotate forward and backward.
- Fixed the carousel opacity bug where the "before" card stayed too transparent when moving to the front.
- Moved the hero proof panel upward so it appears better in the first viewport.
- Replaced before/after screenshot slots in the featured PlasterPro section with videos:
  - `/videos/plasterpro-old-site-480.mp4`
  - `/videos/plasterpro-new-site-480.mp4`
- Temporarily hidden `case-studies-selected-work-section` with `showSelectedWorkSection = false` so the page can ship before all client material is ready.

Current case study content:

- Featured client: `PlasterPro Solution`
- Work: complete website redesign from old Wix site to the new custom Nodo-built site.
- Other client areas planned:
  - social media management such as PISNCO
  - video content pieces for other clients

Outstanding materials to request from user:

- Desktop screenshot(s) of the old Wix PlasterPro site.
- One mobile screenshot of the old Wix PlasterPro site.
- Two to four current PlasterPro screenshots if we want additional proof beyond the videos.
- PISNCO social media examples and any performance/context details.
- Video-content client examples.
- Any testimonials, client quotes, or measurable outcomes that can be used honestly.

## Website Design Auckland Landing Page

Current route:

- `/services/website-design-auckland`
- Page file: `src/app/services/website-design-auckland/page.tsx`
- Template: `src/components/templates/WebsiteDesignAucklandPage.tsx`
- Content source: `websiteDesignAucklandPageContent` in `src/lib/content.ts`

Purpose:

- Create an indexable SEO landing page for website design in Auckland.
- Target search intent around custom website design, website redesigns, and service-business websites in Auckland.
- Use PlasterPro proof to support trust without overloading the page.

Implemented:

- Route metadata.
- Breadcrumb structured data.
- FAQ structured data.
- Hero section refined after first version was too large.
- Hero proof panel moved up so it does not feel cut off on page load.
- Intro section redesigned with more attractive decision-point cards.
- Process section redesigned with animated/gradient cards and large background numbers.
- Included section redesigned with stronger Nodo visual treatment.
- FAQ section redesigned as horizontal reveal cards with Nodo logo watermark.
- Adjusted FAQ watermark opacity and position so the logo supports the card without dominating it.

Important visual note:

- CTA buttons and chips/tags were too similar.
- A reusable `MetaChip` atom was created to make informational chips visually distinct from buttons.

## Reusable UI Components Added Or Changed

### `MetaChip`

File:

```bash
src/components/atoms/MetaChip.tsx
```

Purpose:

- Display non-clickable metadata/highlight chips.
- Avoid confusion with CTA buttons.
- Support visual variation through props.

Props:

- `tone`: `dark`, `light`, or `purple`
- `accent`: `purple`, `lavender`, `pink`, or `white`
- `className`
- `dataTestId`

Applied to hero highlights in:

- `src/components/templates/WebsiteDesignAucklandPage.tsx`
- `src/components/templates/WebsitePlansPage.tsx`
- `src/components/templates/PlansHubPage.tsx`
- `src/components/templates/MarketingBrandingPlansPage.tsx`
- `src/components/templates/CaseStudiesPage.tsx`

Design rationale:

- Smaller height than CTA buttons.
- Rounded-xl instead of rounded-full.
- Muted background and border.
- Small colored dot for visual interest.
- No arrow.
- No hover/cursor treatment.

## Search Console And Indexing Next Steps

Recommended next actions:

1. Deploy the latest changes.
2. Open `https://www.nodo.co.nz/sitemap.xml`.
3. Confirm `/services/website-design-auckland` appears.
4. Submit or refresh the sitemap in Search Console.
5. Use URL Inspection for:
   - `https://www.nodo.co.nz/`
   - `https://www.nodo.co.nz/services`
   - `https://www.nodo.co.nz/plans`
   - `https://www.nodo.co.nz/plans/websites`
   - `https://www.nodo.co.nz/plans/marketing-branding`
   - `https://www.nodo.co.nz/case-studies`
   - `https://www.nodo.co.nz/services/website-design-auckland`
6. Request indexing for the most important pages after deployment.

## Known Pending Items

- Create/complete a Google Business Profile.
- Finish `/about` before making it indexable.
- Complete and re-enable the hidden selected-work section in `/case-studies`.
- Gather missing PlasterPro/PISNCO/video client material.
- Gather testimonials, client quotes, reviews, or measurable outcomes that can be used honestly.
- Continue building social proof through active Instagram/Facebook/LinkedIn content once the content direction is ready.
- Consider adding more SEO landing pages only after the current `/services/website-design-auckland` page is deployed and indexed.
- Planned next SEO landing pages:
  - `/services/website-redesign-auckland`
  - `/services/digital-marketing-auckland`
  - `/services/branding-auckland`
- Suggested landing page priority:
  - `website-redesign-auckland` first, because PlasterPro already gives strong redesign proof.
  - `digital-marketing-auckland` second, once there is enough social/content proof to support the page.
  - `branding-auckland` third, unless Nodo has brand identity examples ready sooner.
- Re-check visual QA in browser after each design-heavy change.

## Audit360 And 90-Day Plan To-Do

These items are intentionally parked until the business/content material is ready. Do not implement placeholder proof, fake metrics, or thin content just to satisfy the audit.

### Waiting On Business Or Content Inputs

- Google Business Profile:
  - Create/complete the Nodo GBP.
  - Add the public profile/map URL to the project only after it exists and is confirmed.
  - Start collecting real reviews after the GBP is ready.
- Founder-led `/about`:
  - Gather founder/person details, photo or approved visual direction, story, credibility points, and what Nodo stands for.
  - Build `/about` as a real trust page.
  - Keep `/about` `noIndex` until it is complete.
- Case studies and proof:
  - Strengthen PlasterPro with testimonials, project details, extra screenshots, before/after material, or measurable outcomes if available.
  - Gather PISNCO social media examples and context before re-enabling the selected-work section.
  - Gather video-content client examples before showing video work.
  - Re-enable `case-studies-selected-work-section` only when there is enough honest material.
- Testimonials and reviews:
  - Collect approved client quotes.
  - Add testimonials near high-intent CTAs once available.
  - Avoid invented numbers or unsupported performance claims.
- Social content:
  - Publish enough real activity on Instagram/Facebook/LinkedIn before treating social presence as a strong trust signal.
  - Consider short-form behind-the-scenes or work-process content when Nodo has a repeatable format.

### Later SEO Moat

- Blog/content engine:
  - Keep `/blog` as the custom 404 for now.
  - Build `/blog` only when there are multiple ready articles and a sustainable content angle.
- Backlinks and authority:
  - Pursue real local/business mentions, partner links, directories, and client/project references.
  - Prioritize quality and relevance over volume.
- Future SEO landing pages:
  - `/services/website-redesign-auckland`
  - `/services/digital-marketing-auckland`
  - `/services/branding-auckland`

### Documentation Cleanup Completed

- `README.md` and `NODO_PROJECT_CONTEXT.md` no longer describe `/case-studies` as a placeholder.
- `README.md` and `NODO_PROJECT_CONTEXT.md` include `/services/website-design-auckland`.
- `NODO_PROJECT_CONTEXT.md` documents the new `HomeProofSection`, `TrackedCtaButton`, `home-proof-*` selectors, and current `home-result-card-*` selectors.
- The only current `RoutePlaceholder` route documented is `/about`; `/case-studies` is documented as a custom `CaseStudiesPage`.

## Verification Commands

Use these before deploy:

```bash
npm run lint
npm run build
```

Latest validation after the `MetaChip` implementation:

- `npm run lint`: passed
- `npm run build`: passed

## Important Local Notes

- The user may run the local site at `http://localhost:3000`.
- Browser automation was not available in the latest environment.
- `playwright` was not installed in the tool environment.
- When browser tooling is unavailable, rely on `npm run lint`, `npm run build`, source inspection, and manual local review.
