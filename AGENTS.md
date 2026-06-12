# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 App Router site. Routes live in `src/app`, including pages, API routes, `robots.ts`, `sitemap.ts`, and global styles in `globals.css`.

UI follows Atomic Design:

- `src/components/atoms`: primitives such as buttons, logos, containers, and chips.
- `src/components/molecules`: composed UI such as cards, form pieces, and tracked CTAs.
- `src/components/organisms`: full page sections such as `Hero`, `Header`, `Footer`, and `ProcessSection`.
- `src/components/templates`: route-level page compositions.

Shared content and utilities live in `src/lib`, especially `content.ts`, `seo.ts`, and contact helpers. Static assets live in `public`.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the local Next.js development server.
- `npm run lint`: run ESLint using Next.js Core Web Vitals and TypeScript rules.
- `npm run build`: create a production build and validate route compilation.
- `npm run start`: run the production build locally after `npm run build`.

Run `npm run lint` and `npm run build` before pushing code changes.

## Coding Style & Naming Conventions

Use TypeScript strict mode. Prefer aliases such as `@/components/...` and `@/lib/...`. Components use PascalCase filenames and exports, for example `HomeProofSection.tsx`. Utilities and content collections use camelCase.

Follow the existing Tailwind-first styling approach. Keep visible copy in English. Preserve stable `data-testid` attributes when refactoring UI because they support regression checks and documentation.

## Testing Guidelines

There is no formal unit test suite yet. Treat `npm run lint` and `npm run build` as the required verification baseline. For UI changes, inspect mobile and desktop behavior, and confirm GSAP animations respect `prefers-reduced-motion`.

When adding tests, name files after the subject under test, for example `ContactForm.test.tsx`.

## Commit & Pull Request Guidelines

Recent commits use short, imperative, lower-case summaries, for example `add LinkedIn page url`. Keep commits focused and describe the user-visible change.

Pull requests should include a concise summary, verification commands run, screenshots or recordings for visual changes, and notes about SEO, analytics, or indexing impact when relevant.

## Agent-Specific Notes

Start with `README.md`, `NODO_PROJECT_CONTEXT.md`, and `SEO_WORKLOG.md` before broad exploration. Do not invent proof, testimonials, or metrics. Keep `/about` `noIndex` until real content exists, and keep `/plans` focused on `Flow`, `Growth`, and `Nexus` before `Launch`.
