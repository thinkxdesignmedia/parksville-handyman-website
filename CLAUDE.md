# Parksville Handyman Website — Project Guide

## Stack
- **Astro** (static site generator, zero JS by default)
- **Tailwind CSS** (utility-first styling)
- **TypeScript** (config, API endpoints)
- **Cloudflare Pages** (hosting + serverless functions)

## Key Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build to dist/ (production output)
npm run astro        # Run astro CLI
```

## Deployment
```bash
# Automatic: push to GitHub → Cloudflare Pages auto-deploys from main
# Build output: dist/
# Environment vars: Set in Cloudflare Pages dashboard
```

## Project Structure
```
src/
├── pages/               # All routes (URL = filename)
│   ├── index.astro      # Homepage
│   ├── [service].astro  # 9 service pages
│   ├── {parksville,qualicum-beach}.astro  # Area pages
│   ├── {handyman-pricing-bc,faq,about,contact}.astro
│   └── blog/            # 5 blog posts
├── layouts/
│   ├── BaseLayout.astro     # Main wrapper (header, footer, meta, schema)
│   ├── ServiceLayout.astro  # Service page template
│   └── BlogLayout.astro     # Blog post template
└── config.ts            # Centralized config (name, phone, email)

public/
├── robots.txt           # SEO crawl rules
└── sitemap.xml          # SEO sitemap

functions/
└── api/quote.ts         # POST /api/quote form endpoint (stub)
```

## Conventions
- **No client-side JS** unless component truly needs it (static HTML priority)
- **Config-driven** — `src/config.ts` is the single source of truth for business info
- **Schema markup** on every page — LocalBusiness (homepage), Service, FAQPage, Article, BreadcrumbList
- **Internal linking strategy** — Service pages link to areas; blog posts link to money pages
- **Placeholder content** — All "TODO:" comments mark what renter must customize (photos, GBP setup, citations)
- **SEO-first copy** — Primary keyword in title, H1, first 100 words, URL slug; no fluff
- **Mobile-first responsive** — Sticky CTA button on small screens; click-to-call headers
- **Static output** — Astro builds to HTML only; deploy as-is to Cloudflare

## Important Files
- `LAUNCH-CHECKLIST.md` — Everything needed pre-launch (22 items, prioritized)
- `RENTER-ONBOARDING.md` — Update guide when new renter signs on (config, photos, GBP, citations)
- `.env.example` — Template; copy to `.env` locally (never commit `.env`)
- `src/config.ts` — Business name, phone, email (update once, everywhere updates)

## Development Notes
- Edit pages in `src/pages/` (Astro handles routing)
- Edit layouts in `src/layouts/` (wrap content, add meta/schema)
- Tailwind classes in `.astro` files (JIT, auto-purged)
- No build step for CSS/images — Astro handles optimization
- Forms POST to `/api/quote` (endpoint in `functions/api/quote.ts`)

## Performance Targets
- Lighthouse 95+ across all metrics
- LCP < 2.5s, CLS < 0.1
- Static HTML (no JavaScript overhead)

## Critical Pre-Launch Tasks
1. Email setup (wire Resend/SendGrid API key in `functions/api/quote.ts`)
2. Google Business Profile (real address, photos)
3. Citations (Yellow Pages, BBB, Yelp with exact name/phone/address)
4. Google Search Console (verify, submit sitemap)
5. Local backlinks (chamber, news mentions, sponsorships)
