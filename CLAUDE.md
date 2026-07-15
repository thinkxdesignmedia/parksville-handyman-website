# Parksville Handyman — Production Operating Manual

## What This Is

A **rank-and-rent lead-generation website** for handyman services in Parksville, Qualicum Beach, and Oceanside, BC. It's designed to rank organically for local handyman searches, then route qualified leads to the service provider who rents the asset.

**Critical note:** {{BUSINESS_NAME}}, {{PHONE}}, and {{EMAIL}} in config are **intentional renter-swap placeholders**, not bugs. They're centralized in `src/config.ts` so a new renter can be onboarded by updating one file. All references throughout the site derive from that config.

## Stack & Key Commands

- **Astro 4.x** (static site generator — builds to zero-JS HTML by default)
- **Tailwind CSS** (utility-first, JIT)
- **Cloudflare Pages** (hosting + Functions for form endpoint)
- **Resend** (email delivery for quote leads)
- **Cloudflare Turnstile** (CAPTCHA for form spam prevention)

```bash
npm install          # Install dependencies
npm run dev          # Local dev server (localhost:3000)
npm run build        # Build to dist/ (static HTML)
npm run preview      # Preview dist/ locally before deploy
```

## File & Architecture Map

### Config (single source of truth)
- `src/config.ts` — Business name, phone, email, GA4 property ID, year established. Change once; propagates everywhere.

### Pages & Layouts
- `src/pages/` — All routes. Filename = URL slug.
  - 23 pages total: homepage, 9 services, 2 areas, pricing, FAQ, 5 blog posts, about, contact, privacy, terms
- `src/layouts/BaseLayout.astro` — Main wrapper. Header (nav, logo, click-to-call), footer, meta tags, schema markup, GA4, Turnstile script
- `src/layouts/ServiceLayout.astro` — Template for service pages (reposes content, quote form, related services, schema)
- `src/layouts/BlogLayout.astro` — Template for blog posts (date, author, schema)

### Forms & API
- Quote form HTML on: homepage, all service pages, contact page, area pages. Hidden honeypot field (`name="website"`).
- Form submission: client-side fetch to `/api/quote`, captures Turnstile token.
- `functions/api/quote.ts` — Cloudflare Pages Function. Validates: honeypot, email/phone format, Turnstile token. Sends via Resend, stores backup in KV Store (90-day TTL), returns success/error JSON.
- KV Store is QUOTES_KV namespace in Cloudflare (failsafe if primary email delivery fails).

### Static Assets
- `public/favicon.svg` — SVG favicon (modern browsers support it directly)
- `public/site.webmanifest` — PWA manifest (shortcuts for quote/call)
- `public/og-default.svg` — Open Graph default image (1200×630, embedded in meta tags)
- `public/_headers` — Cloudflare cache & security headers (HSTS, CSP, X-Frame-Options, Permissions-Policy)
- `public/robots.txt` — SEO crawl directives
- `public/sitemap.xml` — All 23 pages + canonical URLs

### Design System
- Colors: Charcoal (#1e293b), Safety Orange (#ea580c), Light Gray (#f1f5f9)
- Typography: System fonts (no web fonts = faster)
- Responsive: Mobile-first, Tailwind breakpoints
- Sticky mobile CTA button (click-to-call) on screens < 768px
- Forms use transparent focus states (focus:ring-2 on input)

## SEO Conventions (Preserve These)

**One primary keyword per page** (mapped in config.ts):
- Title tag: primary keyword + brand, 50–60 chars
- Meta description: 150–160 chars, includes CTA ("Free estimates", "Call now", "Learn more")
- H1: unique, contains primary keyword, page-specific
- First 100 words: primary keyword + supporting keywords
- URL slug: primary keyword (slugified)

**Schema markup in use:**
- LocalBusiness (homepage) — name, phone, email, serviceArea (Parksville/Qualicum/Oceanside), priceRange ($$$)
- Service (service pages) — name, description, serviceType
- FAQPage (FAQ page) — mainEntity with Question/Answer pairs
- Article (blog posts) — headline, datePublished, author, publisher
- BreadcrumbList (every page) — schema navigation trail

**Internal linking strategy:**
- Service pages link to area pages (Parksville, Qualicum Beach) with anchor text like "handyman in Parksville"
- Blog posts link back to service/money pages with descriptive anchor text ("Read our deck repair guide")
- Related services section on service pages (cross-links to 3–4 related services)
- Area pages link to relevant services ("Gutter Cleaning popular in Qualicum Beach" → links to /gutter-repair)

**Hard rule: No doorway pages.** We have exactly 2 area pages because they contain genuinely distinct local content (coastal weather, housing stock, seasonal issues). If you add more, ensure each has unique, valuable content; don't auto-generate "handyman in [town]" pages — Google's Helpful Content system penalizes that.

**Canonical tags:** Every page has one. Prevents duplicate-content issues.

## Copy Voice & Tone

- **Plain-spoken, practical, local.** Written as an experienced Island tradesperson would explain their work.
- **Specific over adjective.** Example: "We fix sagging gates, rotten deck boards, and gutters full of fir needles" (not "quality craftsmanship you can trust").
- **Short sentences.** Easier to read, especially on mobile.
- **No AI-sounding filler.** No "unlocking potential," "leveraging synergies," etc.
- **Trust through honesty.** "We'll tell you if you need a licensed contractor" beats "we do everything."
- **Local references matter.** "1,400+ mm of rain annually," "coastal salt spray," "Vancouver Island," "BC" — specificity builds authority.

## Hard Invariants (Never Violate These)

1. **Canonical logic untouched.** Every page must have `<link rel="canonical" href="...">`. It's crucial for duplicate content prevention.
2. **No hardcoded URLs.** Everything derives from the `site:` config in `astro.config.mjs` (currently `https://parksvillehandyman.ca`). Use `Astro.url`, `canonicalUrl`, or template strings.
3. **Never ship lorem, TODO, or `{{` in built output** — except documented config placeholders like "📷 TODO: Real photo of..." which are intentional and go in OWNER-ACTIONS.md.
4. **Maintain Lighthouse ≥95** in all categories. LCP < 2.0s, CLS < 0.1. Performance = ranking + conversion.
5. **Keep Think X Design Media footer credit.** It's non-negotiable (appears in layout + footer).
6. **No tracking bloat.** Only GA4 (privacy defaults: IP anonymization, no personalization signals). No third-party behavioral tracking.

## Project-Specific Rules

- **Renter onboarding:** Update `src/config.ts` (business name, phone, email, year). Replace placeholder photos (`📷 TODO:` divs) with real work. Create new Google Business Profile (can't reuse old one — tied to renter's ownership). Review RENTER-ONBOARDING.md for the full checklist.
- **STAGING flag:** None in use (static site, no env-based branching). Deploy strategy: push to main → Cloudflare auto-deploys dist/. For preview: run `npm run build && npm run preview` locally.
- **Never invent business facts.** "Serving since 2024," "100+ happy customers" — these are renter-specific. The only true statement is "locally operated" (generic enough to apply to any renter).
- **Form flow:** Honeypot + Turnstile for spam. Server validates email/phone format. KV backup prevents lead loss. Monitor Cloudflare Function logs if leads don't arrive.

## Performance Targets

- Static HTML output (no framework JS overhead)
- Minimal inline CSS (Tailwind utility classes, <5KB gzipped)
- WebP images where possible, lazy-loaded
- Long-term caching for /\_astro/* assets (hashed by Astro)
- Short cache for HTML pages (must-revalidate)
- Security headers: HSTS, CSP (GA4 + Turnstile compatible), X-Frame-Options: SAMEORIGIN

## Before You Edit

- **Check canonical logic** if you change any page URLs or structure.
- **Check CSP** if you add third-party scripts (Content-Security-Policy in `public/_headers`).
- **Check schema** if you change page types or purpose.
- **Keep responsive.** Test mobile (375px viewport) after layout changes.
- **Test forms.** Submit a quote request; confirm Resend delivers email AND KV backup captures it.
- **Run build.** `npm run build` must complete with no errors before deployment.

## Deployment

- GitHub repo: https://github.com/thinkxdesignmedia/parksville-handyman-website
- Cloudflare Pages auto-deploys main branch (build: `npm run build`, output: `dist/`)
- Environment variables in Cloudflare Pages settings: `RESEND_API_KEY`, `NOTIFY_EMAIL`, `BACKUP_EMAIL`, `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `GA_MEASUREMENT_ID` (GA4 property ID)
- Custom domain: parksvillehandyman.ca (via GoDaddy DNS → Cloudflare)

## Monitoring & Maintenance

- **Lighthouse score:** Run weekly via `npm run build && npm run preview` or Google PageSpeed Insights (https://pagespeed.web.dev)
- **Lead funnel:** Monitor Cloudflare Function logs for form submission errors. Check KV Store backup if primary email fails.
- **Google Search Console:** Track impressions, clicks, average position for key keywords (handyman parksville, deck repair, etc.)
- **GA4:** Monitor traffic sources, conversion events (form submissions), bounce rate by page.
- **Uptime:** Set a check on homepage + /api/quote endpoint via UptimeRobot or Cloudflare Health Checks.

---

**Last updated:** January 2025  
**By:** Claude Haiku 4.5
