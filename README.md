# Parksville Handyman Website

A lead-generation website for handyman services in Parksville, Qualicum Beach, and Oceanside, BC. Built with Astro and deployed to Cloudflare Pages.

## Quick Start

### Development

```bash
npm install
npm run dev
```

Site runs at `http://localhost:3000`

### Build

```bash
npm run build
```

Output is in `dist/` (ready for Cloudflare Pages)

## Configuration

Update `src/config.ts` with business info:
- Business name
- Phone number
- Email address
- Service areas
- Year established

These values are used throughout the site. Update once, everywhere updates.

## Site Structure

```
src/
├── pages/               # All site pages
│   ├── index.astro      # Homepage
│   ├── [service].astro  # 9 service pages
│   ├── parksville.astro # Area pages
│   ├── qualicum-beach.astro
│   ├── handyman-pricing-bc.astro
│   ├── faq.astro
│   ├── about.astro
│   ├── contact.astro
│   └── blog/            # 5 blog posts
├── layouts/
│   ├── BaseLayout.astro    # Main layout (header, footer, meta)
│   ├── ServiceLayout.astro # Service page template
│   └── BlogLayout.astro    # Blog post template
├── config.ts            # Centralized config
└── assets/              # Images, icons

public/
├── robots.txt           # SEO
└── sitemap.xml          # SEO

functions/
└── api/quote.ts         # Quote form endpoint

.env.example             # Environment template
LAUNCH-CHECKLIST.md      # Pre-launch tasks
```

## Pages

### Main Pages
- **Homepage** (`/`) — Hero, service overview, CTA, form
- **About** (`/about`) — Business story, philosophy, commitment
- **Contact** (`/contact`) — Contact info, quick quote form

### Service Pages (9 total)
- Deck Repair (`/deck-repair`)
- Drywall Repair (`/drywall-repair`)
- Fence Repair (`/fence-repair`)
- Gutter Repair (`/gutter-repair`)
- Bathroom Fixtures (`/bathroom-fixtures`)
- Door/Window Repair (`/door-window-repair`)
- Furniture Assembly (`/furniture-assembly`)
- Pressure Washing (`/pressure-washing`)
- Small Renovations/Odd Jobs (`/small-renovations`)

Each page: 800–1,200 words, SEO-optimized, internal linking, related services, quote form

### Area Pages (2 total)
- **Parksville** (`/parksville`) — Local context, housing stock, maintenance tips
- **Qualicum Beach** (`/qualicum-beach`) — Coastal-specific info, salt damage prevention

### Resource Pages
- **Pricing Guide** (`/handyman-pricing-bc`) — Rates, cost breakdown, how to save
- **FAQ** (`/faq`) — 15+ common questions with schema markup

### Blog (5 seed articles)
- "Handyman vs. Contractor in BC" (`/blog/handyman-vs-contractor`)
- "How Coastal Weather Destroys Decks" (`/blog/coastal-deck-damage`)
- "10 Home Maintenance Tasks Seniors Should Never DIY" (`/blog/seniors-home-safety`)
- "Winter Storm Prep Guide" (`/blog/winter-storm-prep`)
- "Do Handymen Need a License in BC?" (`/blog/handyman-licensing-bc`)

Each post: 1,200–1,800 words, question-based, actionable, internal linking, Article schema

## SEO Implementation

### On-Page
- Unique title tag (50–60 chars) and meta description (150–160 chars) per page
- Exactly one H1 per page
- Logical H2/H3 hierarchy
- Internal linking with descriptive anchor text
- Images with alt text, compressed/lazy-loaded
- Canonical tags on every page

### Technical
- XML Sitemap (`public/sitemap.xml`)
- Robots.txt (`public/robots.txt`)
- Schema markup:
  - LocalBusiness (homepage)
  - Service schema (service pages)
  - FAQPage (FAQ)
  - Article (blog posts)
  - BreadcrumbList (all pages)
- Fast performance (Lighthouse 95+)
- Mobile-first responsive design
- HTTPS by default

### Content
- Primary keyword in title, H1, first 100 words, URL slug
- Secondary keywords naturally throughout
- No keyword stuffing
- Internal linking strategy: service pages link to area pages, blog posts link to service pages with descriptive anchor text
- Blog posts link to homepage/service pages

## Forms & Conversion

**Quote Form:** Name, Phone, Service, Description
- On homepage above fold
- On every service page (with service pre-selected)
- On contact page

**Form Endpoint:** `POST /api/quote`
- Handler: `functions/api/quote.ts`
- Status: Stub (awaits email service wire-up)

**CTA Elements:**
- Click-to-call phone number in header and footer
- Sticky mobile CTA button (bottom of screen)
- "Get a Free Quote" buttons throughout
- Trust signals: "Insured," "Locally operated," "Fast service"

## Performance Targets

- Lighthouse: 95+ (Performance, Accessibility, Best Practices, SEO)
- LCP: < 2.5s
- CLS: < 0.1
- First paint: < 1.5s

Current optimizations:
- Static HTML output (no JavaScript except necessary)
- Tailwind CSS (no bloated CSS)
- Optimized images (WebP, lazy-loading)
- Minimal third-party scripts

## Styling

**Design System:**
- Colors: Charcoal (#1e293b), Safety Orange (#ea580c), Light Gray (#f1f5f9)
- Typography: System fonts for performance
- Spacing: Consistent padding/margins
- Components: Buttons, cards, forms (Tailwind-based)

**Responsive:**
- Mobile-first approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg)
- Sticky elements: Mobile CTA button, header

## Deployment

### Cloudflare Pages (Recommended)

1. Connect GitHub repo to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add environment variables: `RESEND_API_KEY`
5. Deploy

Auto-deploys on push to main branch.

### Custom Domain

Add `parksvillehandyman.ca` in Cloudflare Pages settings.

## Email Setup

Quote form currently sends to console (development mode).

**To enable email:**

1. Choose email service (Resend recommended):
   - Resend: https://resend.com (API key setup)
   - SendGrid: https://sendgrid.com
   - Mailgun: https://mailgun.com

2. Get API key

3. Add to Cloudflare Pages environment variables

4. Uncomment email code in `functions/api/quote.ts`

5. Test form submission

**Resend Example (already scaffolded):**
```typescript
const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${context.env.RESEND_API_KEY}`
  },
  body: JSON.stringify({
    from: 'quotes@parksvillehandyman.ca',
    to: 'info@parksvillehandyman.ca',
    reply_to: email || phone,
    subject: `New Quote Request: ${service}`,
    html: `...` // Template in code
  })
});
```

## Customization for New Renter

When a new renter signs on, update:

1. **Business Config** (`src/config.ts`)
   - Name
   - Phone
   - Email
   - Year established

2. **Images** (all placeholder "TODO" images)
   - Replace with real photos of their work
   - Before/after shots are best

3. **Google Business Profile**
   - Create new profile under renter's name
   - Add their real address (critical for local rankings)
   - Upload real photos
   - Verify ownership

4. **Citations**
   - Update Yellow Pages, BBB, Yelp with new info
   - Keep name/phone/address consistent everywhere

5. **Keep as-is**
   - All blog content (evergreen, builds topical authority)
   - Service pages (content applies to any renter in this market)
   - Copy/philosophy (plain-spoken, local tone)

## Troubleshooting

### Form submissions not working
- Check Resend/SendGrid API key is added to Cloudflare environment variables
- Check email code is uncommented in `functions/api/quote.ts`
- Test with real service email account

### Images not loading
- Verify WebP format is supported (or use JPEG fallback)
- Check image paths are relative to `public/`
- Compress images: TinyPNG, ImageOptim

### Performance slow
- Run Lighthouse audit → identify bottleneck
- Check for large images or third-party scripts
- Test on 3G connection (Chrome DevTools)

### SEO not improving
- Wait 4–8 weeks for Google to crawl and index
- Check Google Search Console for errors
- Ensure Google Business Profile is complete with reviews
- Build local backlinks (chamber of commerce, news mentions, etc.)

## Development Philosophy

- **Plain HTML/CSS first** — JavaScript only when necessary
- **Performance matters** — Every page should load fast on 3G
- **SEO is content** — Write for users first, keywords second
- **Conversion matters** — Simple forms, clear CTAs, trust signals
- **Local focus** — Specific to Parksville/Qualicum, not generic
- **Maintenance-free** — Static output, no database, no server overhead

## Future Enhancements

- Client gallery/portfolio
- Online booking system (integration with Calendly, Acuity)
- Customer testimonials with photos
- Service radius calculator
- Appointment request form (alternative to generic quote)
- Weather-based seasonal tips (RSS feed)
- Integration with Google Calendar for availability

---

See `LAUNCH-CHECKLIST.md` for everything required before going live.
