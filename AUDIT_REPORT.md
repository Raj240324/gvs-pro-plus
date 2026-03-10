SITE REVERSE ENGINEERING REPORT
================================
Site: GVS Controls Website
Analyzed: 2026-03-10
Analyst Mode: Full Spectrum Audit

### 1. 🧭 SITE IDENTITY & PURPOSE
- **What is this website?** A corporate/marketing single-page application (SPA) portfolio and service showcase for GVS Controls.
- **Who is the target audience?** B2B clients, industrial businesses, engineers, and firms seeking electrical, instrumentation, and automation solutions.
- **What is the primary goal of the site?** Lead generation (contact form), brand awareness, service showcasing, and credibility building.
- **What is the brand tone?** Professional, technical, reliable, modern, and industrial/corporate.
- **What is the unique value proposition communicated?** Comprehensive solutions encompassing Electrical, Instrumentation, and Automation engineering services.
- **What problem does this site solve for the visitor?** Provides a clear portfolio of capabilities, past projects, and a direct, secure line of communication to request services or quotes.

---

### 2. 🗺️ SITE STRUCTURE & INFORMATION ARCHITECTURE
- **Pages and routes:** 
  - `/` (Home / Index)
  - `/about` (About)
  - `/services` (Services)
  - `/manufacturing-supply` (Manufacturing & Supply)
  - `/projects` (Projects)
  - `/clients` (Clients)
  - `/why-us` (Why Us)
  - `/gallery` (Gallery)
  - `/contact` (Contact)
  - `/privacy-policy` (Privacy Policy)
  - `/terms-of-service` (Terms of Service)
  - `/*` (404 Not Found)
- **Navigation structure:** 
  - Primary Nav: Header (sticky) with links to Home, About, Services, Projects, Clients, Why Us, Gallery, Contact.
  - Mobile Nav: Hamburger menu using a Sheet drawer component.
  - Footer Nav: Quick links to pages, legal links (Privacy, Terms), social links.
- **Hidden pages:** 404 (NotFound). No admin or auth pages found.
- **Anchor links:** Used for smooth scrolling (`SmoothScroll.tsx`).
- **URL patterns:** Standard static routes. React Router DOM `createBrowserRouter` is used.
- **Breadcrumb structure:** A `Breadcrumb` component exists in `src/components/ui/breadcrumb.tsx`, likely used on inner pages.
- **Multi-language:** Not present. English only.

---

### 3. 📐 LAYOUT & PAGE-BY-PAGE BREAKDOWN
- **Home (`Index.tsx`):**
  - **Layout:** Vertical sections composition.
  - **UI Blocks:** 
    1. `Hero.tsx` (Full-screen, video or layered parallax background, animations)
    2. `Highlights.tsx` (Key features/stats)
    3. `FeaturedClients.tsx` (Client logos marquee/grid)
    4. `Testimonials.tsx` (Client reviews carousel/grid)
    5. Contact CTA / Footer.
- **Shared Chrome:**
  - `Header.tsx` (Sticky, responsive with mobile drawer).
  - `Footer.tsx` (Multi-column: Logo/About, Quick Links, Contact Info, Copyright).
  - Floating Elements: `BackToTop.tsx`, `FloatingWhatsApp.tsx`, `CookieConsentBanner.tsx`.
- **Column/grid structure:** Tailwind CSS grid heavily utilized (e.g., `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for galleries and cards).
- **Sticky elements:** Main Header, Floating WhatsApp button, Back to Top button.

---

### 4. 🧩 COMPONENTS & UI ELEMENTS INVENTORY
Extensive use of Radix UI primitives wrapped via shadcn/ui.
- **Navigation bar:** Sticky, translucent (glassmorphic), hamburger menu on mobile (`Sheet`).
- **Hero section:** Full-screen, heavily animated (Framer Motion).
- **Buttons:** Radix/shadcn `Button` (primary, ghost, destructive, outline), Floating WhatsApp button, Back to Top button, Ripple effect buttons (`SendButton`).
- **Cards:** `ProjectCard.tsx`, `ProjectStatusCard.tsx`, `ServiceCard.tsx`, `InfoCard.tsx`, `TiltedCard.tsx`. Hover scale and flip effects (`FlipCard`, `RollingFlipCard`).
- **Forms:** React Hook Form + Zod, in `Contact.tsx` and `ContactModal.tsx`. Fields: Name, Email, Phone, Subject, Message. Uses Radix `Input`, `Textarea`, `Label`.
- **Modals:** Radix `Dialog`, `AlertDialog`. `ContactModal.tsx` for quick contact.
- **Sliders/Carousels:** Embla Carousel (`carousel.tsx`) used for testimonials/images (`ImageSlider.tsx`).
- **Accordions:** `accordion.tsx`, `accordion-faq.tsx` (FAQ section).
- **Tabs:** `tabs.tsx` for categorization (Projects/Gallery).
- **Notification banners:** Radix `Toast` and `Sonner` (both present).
- **Loading:** `Preloader.tsx` (initial app load spinner with logo), `skeleton.tsx`.
- **Social proof:** `FeaturedClients.tsx` (Marquee of logos), `Testimonials.tsx`.
- **Cookie consent:** `CookieConsentBanner.tsx` and `react-cookie-consent`.
- **Data Display:** `Timeline.tsx` (company history/process), `BentoGrid.tsx` (feature layout), `Chart.tsx` (Recharts integration).
- **Other:** `TurnstileWidget.tsx` (Cloudflare CAPTCHA).

---

### 5. 🎨 DESIGN SYSTEM EXTRACTION
- **Colors (CSS Variables & Tailwind tokens):**
  - Brand Palette: Primary Green (`#4CAF50`), Red (`#E57373`), Yellow (`#FFD54F`), Blue (`#42A5F5`).
  - Grays: Light (`#F5F5F5`), Dark (`#212121`).
  - Semantic variables: `--background`, `--foreground`, `--primary`, `--border`, `--muted`, `--accent`, `--destructive`.
- **Typography:** 
  - Headings: Inter, Montserrat.
  - Body: Poppins.
  - Accents: Lato, Futura.
- **Spacing:** Tailwind defaults, with custom `.section-padding` (`py-16 md:py-20 lg:py-24`).
- **Border radius:** Defined via `--radius`, generally `0.5rem` (`rounded-lg`).
- **Shadows:** Neumorphic light/dark (`shadow-neumorphic-light`, `shadow-neumorphic-dark`), Glassmorphic shadows (`shadow-glass`).
- **Icons:** Lucide React (Exclusively — consolidated for bundle size optimization).
- **Imagery style:** Parallax images, modern layout, SVG particles, 3D Canvas elements.
- **Dark mode:** Supported (class-based `.dark`). Toggled via `next-themes`.
- **Motion & Animations:** 
  - Framer Motion (page transitions, scroll reveals).
  - GSAP (`gsap`, `lenis` for smooth scrolling).
  - Custom Tailwind keyframes: `accordion-down`, `fade-in`, `slide-up`, `pulse`, `float`, `tilt`, `ripple`.
  - Three.js / TSParticles applied to backgrounds.
- **Visual patterns:** Glassmorphism (`.glassmorphic`), custom gradients (`gradient-bg`), particle backgrounds.

---

### 6. ⚙️ TECHNICAL STACK IDENTIFICATION
- **Frontend framework:** React 18 with Vite (SWC plugin). SPA architecture.
- **CSS approach:** Tailwind CSS + PostCSS + Autoprefixer + pure CSS tokens (`index.css`). Limited CSS Modules used for custom flips (`FlipCard.module.css`).
- **State management:** Zustand (`zustand`), React Query (`@tanstack/react-query`).
- **Routing:** React Router v6 (`createBrowserRouter`, Data Router). Setup in `src/main.tsx`.
- **Animations library:** Framer Motion, GSAP, Lenis (smooth scroll).
- **Form handling:** React Hook Form + Zod.
- **Backend / API:** Vercel Serverless Functions (`api/*.ts`).
- **CMS:** None explicitly detected. Content is hardcoded in components.
- **Auth:** Not present for end-users. Admin not visible.
- **Analytics:** Google Analytics 4 (`react-ga4`).
- **Third-party embeds:** None direct. Contact form emails via Resend. Cloudflare Turnstile for CAPTCHA.
- **CDN / Hosting:** Vercel (`vercel.json` present).
- **Performance features:** React `lazy()` for all non-homepage routes, custom chunking in `vite.config.ts`, `usePerformance` hook to disable heavy effects automatically on low-end devices, ETag/Cache middleware for images.

---

### 7. 📝 FULL CONTENT INVENTORY
- **Headings:** Range from "GVS CONTROLS" branding, to section headers ("Our Services", "Featured Projects", "Why Choose Us").
- **CTA buttons:** "Get a Quote", "Contact Us", "View Services", "Send Message".
- **Navigation:** Home, About Us, Services, Manufacturing, Projects, Clients, Gallery, Contact.
- **Forms:** Name, Email, Phone, Subject, Message. CAPTCHA widget.
- **Error/Success Messages:** Toast popups via Sonner ("Message sent successfully!", validations via Zod).
- **Footer:** Address (+91 73388 80027, projects@gvscontrols.com), quick links, "Electrical • Instrumentation • Automation".
*(Note: Full exact text strings are embedded deeply in 12 long page components. The above summarizes the critical semantic labels).*

---

### 8. 🔄 USER FLOWS & INTERACTIONS
- **Primary user flow:** Landing (Home) → Scroll through services/stats → View Projects/Clients → Contact Us.
- **Lead capture flow:** User clicks "Contact Us" or Floating WhatsApp. Contact uses Turnstile, validates payload, API rate-limits, inserts to Supabase DB, and triggers Resend emails (Owner Alert + Auto-Reply). Toast notification shows success.
- **Purchase/Login/Search flow:** Not present.
- **Mobile navigation flow:** Hamburger click → Sheet slides in from right → User clicks link → Drawer closes → Page transitions.
- **Scroll events:** Lenis smooth scrolling. Navbar becomes sticky/solid on scroll. Animations trigger via Framer Motion `whileInView` or Intersection Observer. Back-to-top button fades in.

---

### 9. 📱 RESPONSIVE BEHAVIOR
- **Layout shifts:** Desktop grid (3-col) collapses to tablet (2-col) and mobile (1-col).
- **Mobile overrides:**
  - `usePerformance.ts` detects mobile/touch and strips heavy particles/3D elements to maintain 60FPS.
  - Hamburger menu replaces desktop links.
  - Hover effects disabled on touch screens via media queries.
  - `lenis` scroll config accommodates mobile overflow.
- **Tables/Data:** Grid layouts used, auto-reflow.

---

### 10. 🔐 FUNCTIONAL FEATURES & BUSINESS LOGIC
- **User auth / Dashboard:** Not present.
- **E-commerce:** Not present.
- **Blog:** Not present.
- **Form System (API):**
  - `/api/contact-us.ts`: Accepts POST. Validates Zod payload + Turnstile. Time trap (rejects < 4s fill time). Blocks disposable emails. Inserts to `contact_submissions` table in Supabase. Triggers Resend notification and auto-responder.
- **System Monitoring (API & Actions):**
  - `/api/system-health.ts`: Pings Supabase, Contact API, and public site. Reports JSON status. Alerts owner via Resend if failed.
  - `/api/heartbeat.ts`: Keeps Supabase instance awake.
  - UptimeRobot pings endpoints every 5 minutes (replaced hourly GitHub Actions cron).
- **Error Tracking:**
  - Sentry configured for React Router v6 capturing client-side crashes and routing errors.
- **Dark Mode logic:** Toggleable via `next-themes` and stored in localStorage.


---

### 11. 🌐 SEO & METADATA SIGNALS
- **SEO Framework:** Implemented using `react-helmet-async` for client-side tag management. `SEO.tsx` component injected globally.
- **Sitemap:** A node script (`scripts/generate-sitemap.js`) handles XML sitemap generation.
- **Prerendering:** Vercel SPA handling implies either serverless prerendering or static headers. Given the lazy-loaded routes and a previous user chat about "react-snap", pre-rendering for crawlers is highly likely in production.
- **Canonical URLs & OG Tags:** Standard implementations assumed inside `SEO.tsx`.

---

### 12. 🚀 PERFORMANCE & ACCESSIBILITY OBSERVATIONS
- **Code Splitting (⚠️ PERF STRATEGY):** Heavy usage of `React.lazy()` + `Suspense` in `src/main.tsx`. 10 out of 12 pages are lazy-loaded, ensuring a minimal initial Time to Interactive (TTI).
- **Asset Optimization:** Custom Vite plugin (`CacheHeadersPlugin`) handles `Cache-Control` max-age headers for local images to prevent layout parsing delays.
- **Accessibility (🟢 A11Y):**
  - "Skip to main content" link present in `App.tsx` with high-contrast focus rings.
  - Radix UI wrappers (`src/components/ui/*.tsx`) provide robust ARIA roles, keyboard navigation, and focus management automatically.
- **Performance Hook:** `usePerformance.ts` detects mobile/touch environments to gracefully degrade animations (e.g., removing Three.js particles on weak hardware).
- **Fonts:** Optimized non-blocking font loading via `<link rel="preload">` + `onload` swap in `index.html`. Eliminates FOIT with `font-display: swap` and `system-ui` fallback stacks in Tailwind.

---

### 13. 💼 BUSINESS & MARKETING INTELLIGENCE
- **Monetization:** Lead generation. The business operates via B2B contracts. The goal is to collect solid MQLs (Marketing Qualified Leads).
- **Tracking:** `react-ga4` captures page views continuously upon route transitions automatically in `App.tsx`.
- **Conversion Mechanisms:** 
  - Sticky "Get a Quote" / "Contact" links.
  - Floating WhatsApp widget (`FloatingWhatsApp.tsx`) for instant queries.
  - Contact Form heavily optimized against spam to preserve sales team time.
- **Trust Elements:** Featured Clients (Marquee carousel), Portfolio showcase, robust Testimonials.

---

### 14. 🐛 ISSUES, GAPS & ANOMALIES
- **⚠️ PERF ISSUE (Mitigated):** Heavy 3D/animation bundles have been offset by consolidating all icon libraries to `lucide-react` (reducing `ui-vendor` chunk size) and aggressive mobile capability detection via `usePerformance`.
- **Infrastructure:** Previous monitoring gaps have been resolved via Sentry integration and 5-minute UptimeRobot pings.
- **Consistency:** Highly consistent codebase enforced via `AGENTS.md`. Minimal anomalies found.

---

### 15. 🔐 SECURITY & INFRASTRUCTURE ANALYSIS
- **🚨 ARCHITECTURE SECURITY:** Exceptionally high standard. The `/api/contact-us.ts` is fortified via **10 explicit layers**:
  1. Origin Allowlist (CORS limit).
  2. Sec-Fetch & Agent validation against simple bots.
  3. JSON Payload hard cap (~5KB).
  4. In-Memory IP Rate Limit (5 reqs / 1 min).
  5. Honeypot traps (`bot_honey`).
  6. Strict Zod Validation (type-checks, length constraints).
  7. Time Traps (`startedAt` — blocks instant scripting submission; <4s or >15m rejection).
  8. Obvious Disposable Email Blocking (`mailinator`, etc.).
  9. Cloudflare Turnstile token verification server-side.
  10. Deep payload sanitization before injection into HTML emails.
- **CSP Headers:** Defined strictly inside `vercel.json`, allowing specific Cloudflare constraints and Font domains.
- **Secrets Management:** `process.env.TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, etc. handled cleanly without logging parameters to the client.

---

### 16. 🌐 NETWORK REQUEST & API BEHAVIOR
- **Internal APIs:**
  - `POST /api/contact-us`: Endpoint for leads. Returns `{ success: true, method: 'db' | 'email' }` or structured `400/429/500` error limits.
  - `GET /api/system-health`: Internal health check (Ping DB, ping Contact API, ping Homepage).
  - `GET /api/heartbeat`: DB keep-alive.
- **External Connections:**
  - **Supabase JS Client:** Communicates with the PostgreSQL instance.
  - **Resend Node SDK:** Dispatches owner-alert + auto-reply emails.
  - **Cloudflare Challenges API:** Validates Turnstile tokens.
- **Client Fetching:** React Query config is established in `App.tsx` but standard `fetch` is heavily used in Edge functions.

---

### 17. 🧱 CODEBASE ARCHITECTURE
- **Build System:** Vite + SWC + TypeScript. `vite.config.ts` includes extensive `manualChunks` separation. Icon libraries consolidated to minimize JS bundle payload.
- **Folders:**
  - `api/`: Vercel Serverless NodeJS Functions.
  - `src/components/ui/`: Contains 80+ isolated, reusable UI wrappers (Radix/shadcn).
  - `src/components/home/`: Page-specific vertical sections.
  - `src/components/layout/`: Global chrome (Header, Footer, Preloader).
  - `src/hooks/`: Modularized business logic (Toasts, Mobile checks, Outside Clicks).
  - `src/lib/`: Custom utilities (`cn`, performance detector logic).
- **State Mgmt:** Zustand stores mapped for modular UI behaviors.
- **Styling:** Tailored semantic classes and CSS variables located in `src/index.css` paired with `tailwind.config.ts`. Extends base shadcn tokens. 

---

### 18. ⚡ PERFORMANCE ENGINEERING ANALYSIS
- **Bundling Cost:** Due to heavy 3D and animation reliance, `chunkSizeWarningLimit: 1600` is explicitly set in Vite config to ignore standard 500kb limits.
- **Rendering Strategy:** Single Page Application strictly CSR (Client Side Rendered), augmented via lazy-imports. 
- **Tree Shaking:** Lucide React and other libraries are imported systematically.
- **Asset Cost:** Custom Node middleware is manually augmenting `E-tag` and `304 Not Modified` on image loads to preserve data during transitions.

---

### 19. 🗄️ DATA STORAGE & DATABASE ARCHITECTURE
- **Identity:** Relational DB (PostgreSQL) managed by Supabase.
- **Tables:** Primary entity is `contact_submissions`.
  - Schema inferred: `id`, `name`, `email`, `phone`, `subject`, `message`, `ip`.
- **Fault Tolerance Strategy:** `/api/contact-us.ts` specifically uses the database as layer 1, and resiliently falls back to sending direct emails via Resend if Supabase connection fails.

---

### 20. 🛠️ DEVOPS & DEPLOYMENT PIPELINE
- **Hosting Provider:** Vercel automatically manages deployment via standard push configs. Edge API routes mapped using Vercel NodeJS Runtime.
- **Routing Overrides:** `vercel.json` intercepts `/(.*)` to `index.html` preventing React Router 404s on hard refresh.
- **CI/CD & Monitoring:**
  - `system-monitor.yml` GitHub Action has been intentionally disabled in favor of UptimeRobot's 5-minute interval monitoring.
  - `.github/workflows/supabase-heartbeat.yml`: Every 30 mins hits `/api/heartbeat` to prevent aggressive Supabase Free Tier pausing.
  - **Sentry** integrated for real-time frontend exception monitoring.

---

### 🌟 SUMMARY: GVS Controls Audit Findings
**5 Key Strengths:**
1. **Exceptional Form Security:** The 10-layer contact backend ensures completely clean, high-intent lead delivery free from spam/bots.
2. **Modular Architecture:** Usage of Radix primitives and lazy-loading components yields extremely maintainable structure.
3. **Resilient Failovers:** API correctly gracefully degrades (e.g., if Supabase goes offline, the email still executes).
4. **Mobile Performance Awareness:** Specific logic explicitly halts high-end frame-hungry JS (Particles/ThreeJS) on weak hardware via the `usePerformance` hook.
5. **Polished Brand Interface:** Seamless animations via Framer/GSAP build significant industrial credibility.

**Recent Production Upgrades (Implemented 2026-03-10):**
1. **Infrastructure:** Replaced hourly cron with 5-minute UptimeRobot pings for real-time downtime detection.
2. **Performance:** Eliminated render-blocking Google Fonts using `<link rel="preload">` swap strategies.
3. **Bundle Optimization:** Consolidated UI icon packages (Phosphor, Tabler, React Icons) entirely to Lucide React.
4. **Error Tracking:** Integrated Sentry DSN into the React router to catch client-side unhandled promise rejections and boundary failures.
5. **Future Opportunity:** Upgrade React 18 `lazy` CSR patterns using Next.js 15+ if SEO requires strict SSR/ISR capabilities for sub-pages.

**Overall Assessment:** 
A highly sophisticated, secure, and structurally sound SPA. The engineering is vastly superior to the average corporate portfolio, relying on deep React structural patterns, aggressive form safeguards, and modular UI compositions. The project successfully isolates complex logic into hooks, protects serverless APIs via intensive checks, and scales component reuse effortlessly.

================================
[END OF REPORT]
