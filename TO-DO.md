Some ideas:

- INTERACTIVE IN HERO

Add an interactive "Where does it feel stuck?" selector to the existing home hero
(src/components/organisms/Hero.tsx). Keep the current layout, styles, GSAP intro,
ConstellationBackground, HeroMarkGraphic and every existing data-testid. Do not
restyle other sections or shared atoms.

Placement: inside home-hero-content, between home-hero-copy and home-hero-actions.

Content (copy in English):

- Legend: "Where does it feel stuck?"
- Three options, each mapped to a service intent:
  - "We look inconsistent" → intent "branding"
    answer: "Start with the brand: how your business looks, sounds, and is remembered."
    CTA: "Talk about branding"
  - "People don't find us" → intent "marketing"
    answer: "Start with marketing: clearer visibility, so the right people find you and act."
    CTA: "Talk about marketing"
  - "The site brings no enquiries" → intent "website"
    answer: "Start with the website: the place your customers land, decide, and get in touch."
    CTA: "Talk about the website"
- Default answer (nothing selected): "Most businesses need all three pulling the same
  way. Pick one and we'll show you where to start."

Behaviour:

- Options are <button type="button"> inside a <fieldset>/<legend>, using aria-pressed.
  Clicking the active option again clears the selection.
- The answer paragraph uses aria-live="polite" and has a min-height so the layout
  doesn't jump when the text changes.
- The primary hero CTA (home-hero-primary-button) keeps "Let's talk" → /contact by
  default. When an option is selected, it changes label and href to
  /contact?intent=<intent>&source=home-hero. The contact page already reads `intent`
  and `source` and passes them to the lead, so confirm that end to end.
- Keep tracking through TrackedCtaButton (event="homepage", location="home_hero")
  with the dynamic label.
- Optional: highlight one node of HeroMarkGraphic per intent when selected. Only if
  it reads clearly; otherwise skip.

Styling: follow the existing hero style. Use pill buttons that match the current
CTAs: white/10 at rest, white with black text when active, visible focus ring in
nodo-lavender, min touch height 44px. Stack the options vertically on mobile and
lay them out in a row from sm up.

Motion: add the options to the existing intro timeline with a short stagger after
the body copy. In the prefers-reduced-motion branch, set them visible with no movement.

data-testids: home-hero-selector, home-hero-choice-<intent>, home-hero-answer.
Add them to the Home Page list in NODO_PROJECT_CONTEXT.md.

Tests: extend Hero.test.tsx. Clicking an option sets aria-pressed, updates the
answer, and changes the CTA href and label. Clicking it again restores "Let's talk"
→ /contact.

Verify: npm run lint, npm run build, npx jest, and the home case in
e2e/hero-layout.spec.ts. Check mobile (390px) and desktop (1440px).
