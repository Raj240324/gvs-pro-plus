# AGENTS.md (Project-Specific Rules)

## Project Overview
This repository is a Vite + React + TypeScript single-page application (SPA) for the GVS Controls corporate/marketing website. It uses React Router for navigation, TailwindCSS (with CSS-variable tokens) for styling, and a shadcn/Radix-inspired internal UI component library in `src/components/ui/`. The project deploys to Vercel and includes a Vercel Serverless Function at `api/contact-us.ts` for contact form email delivery via Resend.

## Technology Stack
- **Runtime**: React 18, TypeScript
- **Build**: Vite (SWC React plugin)
- **Routing**: `react-router-dom` (data router via `createBrowserRouter`)
- **Styling**: TailwindCSS + PostCSS + Autoprefixer + CSS variables (shadcn style), limited CSS Modules for special widgets
- **UI Primitives**: Radix UI (`@radix-ui/react-*`), shadcn-like wrappers in `src/components/ui/`
- **Animation**: Framer Motion (primary), GSAP + ScrollTrigger + Lenis (desktop-only smooth scroll via dynamic import), optional three/particles
- **State**: Zustand (UI state like modals), React Query provider available (`@tanstack/react-query`)
- **SEO**: `react-helmet-async` via `src/components/SEO.tsx`
- **Deploy**: Vercel (`vercel.json` SPA rewrites + cache headers), serverless API under `/api/*`

## Folder Structure Rules
- **`src/main.tsx`**: owns router creation. Define/modify routes here.
- **`src/App.tsx`**: global app shell only (providers, header/footer, toasts, scroll helpers, analytics). Keep route content inside `<Outlet />`.
- **`src/pages/`**: route-level screens. Each page should:
  - Render `<SEO ... />` at the top (when appropriate).
  - Be mostly composition of section/components, not huge UI primitives.
- **`src/components/layout/`**: global chrome components (Header/Footer).
- **`src/components/home/`**: home page sections only.
- **`src/components/ui/`**: reusable UI primitives/widgets (Radix wrappers, shadcn-style components, shared UI).
- **`src/hooks/`**: reusable hooks and stores (e.g. Zustand stores).
- **`src/lib/`**: utilities (`cn`), performance gating (`usePerformance`), types, helpers.
- **`api/`**: Vercel serverless functions. Keep them stateless and secure.

## Component Development Rules
- **TypeScript-first**: components are `.tsx`, hooks/utilities `.ts`.
- **Naming**:
  - Components: `PascalCase.tsx`
  - Hooks: `use-*.ts` (existing pattern uses kebab-case filenames).
- **Imports**:
  - Prefer alias imports using `@/` (configured in Vite + TS).
  - Use `cn()` from `src/lib/utils.ts` for class composition.
- **Keep pages lean**: move reusable sections into `src/components/*` rather than copy/pasting.

## Styling Rules
- **Tailwind is the default**. Use CSS Modules only when Tailwind becomes unwieldy (complex 3D/flip animations, specialized effects).
- **Tokens**:
  - Use CSS variables (`--background`, `--foreground`, etc.) and Tailwind semantic colors from `tailwind.config.ts`.
  - Prefer semantic classes (`bg-background`, `text-foreground`, `border-border`) over hardcoded hex unless branding requires it.
- **Shared utilities**:
  - Reuse global utilities defined in `src/index.css` (e.g. `.section-padding`, `.section-title`, gradient helpers) instead of reinventing them.

## Theme (Light/Dark) Rules
- Tailwind dark mode is **class-based** (`darkMode: ["class"]`).
- When building components, ensure styles work under both:
  - default (`:root` tokens)
  - `.dark` token overrides (see `src/index.css`)
- Do not introduce a second theming system unless you wire it end-to-end.
  - If using `next-themes`, a proper provider must exist at the app root.

## Animation Rules
- **Primary**: Framer Motion for UI transitions and viewport-based reveals.
- **Desktop-only smooth scroll**: GSAP + ScrollTrigger + Lenis is initialized in `src/components/SmoothScroll.tsx` via dynamic imports.
  - Do not import GSAP/Lenis statically in page components.
- **Reduced motion**:
  - Respect `prefers-reduced-motion` (global CSS already enforces this).
  - Avoid infinite animations unless guarded by performance flags.

## Performance Rules
- **Route splitting is required**:
  - Keep `Index` and `NotFound` eager.
  - Lazy-load other pages using `React.lazy()` + `Suspense` (follow `src/main.tsx` pattern).
- **Performance gating**:
  - Use `usePerformance()` (`src/lib/usePerformance.ts`) to disable heavy effects on touch/mobile:
    - particles / WebGL / parallax / infinite loops / blur-heavy UI
- **Avoid bundle bloat**:
  - Prefer dynamic imports for heavy optional features.
  - Keep large libraries isolated and only loaded when needed.
- **Keep “desktop never degraded” invariant**:
  - Performance detector explicitly preserves desktop behavior; don’t add logic that reduces desktop effects unintentionally.

## Accessibility Rules
- Preserve the **skip-link** behavior in `App.tsx` and ensure `#main-content` remains present and focusable.
- Use semantic landmarks: `<main>`, `<nav aria-label=...>`, `<footer aria-label=...>`.
- Ensure interactive controls have:
  - visible focus states (Tailwind focus classes)
  - `aria-label` when icon-only
- Images must include meaningful `alt` text unless purely decorative (then `alt=""`).

## Responsive Design Rules
- Mobile-first Tailwind breakpoints.
- Avoid hover-only UX on touch devices.
- For expensive visuals, gate with `usePerformance()` and/or CSS mobile performance rules already in `src/index.css`.

## Asset Usage Rules
- Public, cacheable assets belong in `public/` (e.g. `gvs-logo.png`, catalogue PDFs).
- App-imported images belong in `src/assets/` and must be referenced consistently.
- Prefer modern formats (`webp`) where possible.

## Security Rules
- **Never commit secrets**:
  - API keys, tokens, `.env`, `.env.local` must not be tracked.
  - Use `.env.example` with placeholders and document required variables.

- **Contact API (`api/contact-us.ts`) security pipeline**:
  - Keep the following checks in this order, and update both frontend + backend together when changing them:
    1. **CORS allowlist**: only known origins are allowed; respond correctly to `OPTIONS` preflight.
    2. **User-Agent + Sec-Fetch sanity**: block missing/obviously scripted `User-Agent` and requests without `sec-fetch-site` / `sec-fetch-mode`.
    3. **Payload size limit**: reject JSON bodies larger than ~5KB.
    4. **IP rate limiting**: in-memory rate limit (currently 3 requests / 10 minutes per IP) to slow burst spam; do not weaken without a stronger alternative.
    5. **Honeypot (`bot_honey`)**: if filled, log + return fake success.
    6. **Zod validation**: strict schema for all fields, including `startedAt` and `turnstileToken`, and a max message length of 2000 chars.
    7. **Time trap**: require human-like form fill times (e.g. ≥4s, ≤15min).
    8. **Email normalization + disposable blocking**: normalize email to lowercase, strip control chars, and reject known disposable domains (mailinator, 10minutemail, temp-mail, sharklasers, etc.).
    9. **Turnstile verification**: verify the token with Cloudflare’s siteverify API using `TURNSTILE_SECRET_KEY`.
    10. **Sanitization + email send**: sanitize user content, strip CR/LF from email subjects, then send via Resend.
  - Never expose internal error details (stack traces, provider errors) to clients; log them server-side only.
  - Always keep frontend validation, backend Zod schema, and email templates in sync.

- **Turnstile integration**:
  - Frontend must use `VITE_TURNSTILE_SITE_KEY` and include `startedAt` + `turnstileToken` in contact POST requests.
  - Backend must validate `turnstileToken` and treat missing/invalid tokens as hard failure.
  - After a successful submission, reset the local token so the user must re-verify for another send.

## Debugging Checklist
- Routing:
  - Confirm route exists in `src/main.tsx` and is nested under the `App` shell.
  - Verify Vercel SPA rewrite (`vercel.json`) for deep links.
- Styling:
  - Check Tailwind content globs include changed files.
  - Verify token-based colors in `src/index.css` for light/dark.
- Performance:
  - Confirm heavy effects are gated by `usePerformance()`.
  - Verify `manualChunks` did not regress chunking in `vite.config.ts`.
- Contact form:
  - Ensure `/api/contact-us` works locally and on Vercel.
  - Confirm `RESEND_API_KEY` is set in deployment environment.
  - Validate CORS origin is included when testing on custom domains.
- Analytics:
  - Confirm `VITE_GA_MEASUREMENT_ID` is set and not placeholder.

## Development Commands
- **Install**: `npm install`
- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Build (dev mode)**: `npm run build:dev`
- **Preview**: `npm run preview`
- **Lint**: `npm run lint`
- **Sitemap**: `npm run generate-sitemap`

## Deployment Guidelines (Vercel)
- SPA routing relies on `vercel.json` rewrite to `/index.html`.
- Cache headers are configured for `/assets`, `/catalogue`, etc. Keep these consistent with Vite build output.
- Set environment variables in Vercel:
  - `RESEND_API_KEY`
  - `VITE_GA_MEASUREMENT_ID`

## AI Agent Behavior Rules
- Do not introduce new frameworks (Next.js, Redux, CSS-in-JS) without explicit instruction.
- Follow existing patterns:
  - routes in `src/main.tsx`
  - shell logic in `src/App.tsx`
  - Tailwind + tokens in `src/index.css`
  - Radix/shadcn-style UI in `src/components/ui/`
  - performance gating via `usePerformance()`
- Prefer small, surgical changes over sweeping refactors.
- Never echo or log secret values; if secrets are found, recommend rotation and removal.

