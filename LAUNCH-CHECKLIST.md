# Launch Checklist for Parksville Handyman Website

This checklist covers everything needed to take the site from working code to a ranking, lead-generating asset. Code is ready. The following steps require manual action outside the repository.

## Pre-Launch: Update Configuration

### 1. Update Business Config
**File:** `src/config.ts`

- [ ] Replace `BUSINESS_NAME` with actual business name
- [ ] Replace `PHONE` with correct phone number (with area code)
- [ ] Replace `EMAIL` with business email
- [ ] Update `YEAR_ESTABLISHED` to current or founding year
- [ ] Update service area names if serving different towns

**Why:** These placeholders appear throughout the site. Get them right once.

### 2. Wire Up Email Service
**File:** `functions/api/quote.ts`

This is critical. Forms won't work without email.

**Steps:**
1. Choose an email service:
   - **Resend** (recommended) — $0.20/email, simple API
   - **SendGrid** — Free tier available, more features
   - **Mailgun** — $1/month + $0.50/1000 emails
   - **AWS SES** — $0.10/1000 emails, but more complex setup

2. Create account and get API key

3. Add API key to environment variables (in Cloudflare Pages dashboard):
   - `RESEND_API_KEY` (if using Resend)
   - Or equivalent for your service

4. Uncomment and complete the email sending code in `functions/api/quote.ts`

5. Test with a form submission before going live

**Why:** Without this, quote forms submit silently and you lose all leads.

## Deployment to Cloudflare Pages

### 3. Deploy to Cloudflare Pages

**Steps:**
1. Connect your GitHub repo to Cloudflare Pages
   - Go to https://dash.cloudflare.com → Pages → Connect to Git
   - Select GitHub, authorize, choose this repository
   - Build command: `npm run build`
   - Build output directory: `dist`

2. Add environment variables in Cloudflare Pages settings:
   - Add `RESEND_API_KEY` (and any others from `.env`)

3. Deploy and test all pages load correctly

4. Test form submissions — you should receive email

**Why:** Cloudflare Pages is fast, free, and handles serverless functions out of the box.

### 4. Set Up Custom Domain

**Steps:**
1. Add `parksvillehandyman.ca` in Cloudflare Pages settings
2. Point domain registrar DNS to Cloudflare (or use Cloudflare registrar)
3. Wait for DNS to propagate (15–60 minutes)
4. Verify HTTPS is enabled (automatic with Cloudflare)

**Why:** Without a proper domain, search engines and customers won't trust you.

## SEO & Search Visibility

### 5. Google Search Console Setup

**Steps:**
1. Go to https://search.google.com/search-console
2. Add property: `https://parksvillehandyman.ca`
3. Verify ownership via Cloudflare (recommended):
   - Follow GSC prompts to add DNS TXT record
   - Cloudflare will manage this
4. Submit sitemap: `https://parksvillehandyman.ca/sitemap.xml`
5. Request indexing for homepage and key pages

**Why:** Without GSC, Google won't know about your site. You can't see search performance, keywords, or issues.

### 6. Google Analytics Setup

**Steps:**
1. Create Google Analytics 4 property (GA4): https://analytics.google.com
2. Add data stream for web
3. Get Measurement ID (format: G-XXXXXXXXXX)
4. Add to site header (update `src/layouts/BaseLayout.astro` with GA script)
5. Verify data is flowing (check Analytics after 24 hours)

**Why:** You need to measure traffic, users, and conversion rate. GA is free and standard.

### 7. Bing Webmaster Tools (Bonus)

**Steps:**
1. Go to https://www.bing.com/webmasters/about
2. Add site and verify
3. Submit sitemap
4. Monitor for crawl errors

**Why:** Bing has 5–10% market share, especially in Canada. Worth 20 minutes of setup.

## Local SEO: The #1 Ranking Factor

### 8. Google Business Profile (GBP) Creation

**This is critical for local search rankings. Skip this and you won't rank in the map pack.**

**Steps:**
1. Go to https://business.google.com
2. Create profile:
   - Business name: `Parksville Handyman Services` (or actual name)
   - Category: **Home Repair Service** (pick this, not "Handyman")
   - Service areas: Parksville, Qualicum Beach, Oceanside
   - Phone: Your business phone
   - Website: https://parksvillehandyman.ca
3. **Address:** You must have a real address (not a PO box):
   - Can be a residential address if operating from home (check local bylaws)
   - Or a commercial address
   - This address is *critical* for local rankings — Google uses it for "near me" searches
4. Verify ownership (Google will mail a postcard or allow phone verification)
5. Add high-quality photos (exterior, team, example work, before/after)
6. Fill out every field: hours, services, website, description
7. Add 10+ high-quality photos

**Why:** GBP is the #1 factor for "handyman near me" searches. Without it, you won't appear in the map pack or local results.

**Photos matter:** Real photos of your work rank better than stock images. Before/after photos are gold.

### 9. Citation Building (Local Directory Listings)

**Steps:**
Build citations (mentions of your business with consistent name, phone, address) in these directories:

1. **Google Business Profile** (done above)
2. **Yelp** — https://biz.yelp.com
   - Create business profile
   - Add photos, hours, services
3. **Yellow Pages Canada** — https://www.yellowpages.ca
4. **BBB (Better Business Bureau)** — https://www.bbb.org
   - Builds trust and links to your site
5. **HomeAdvisor** — https://www.homeadvisor.com (optional, leads may cost)
6. **ServiceMaster/Local.com** — https://www.local.com
7. **Facebook Business Page** — https://facebook.com/business
   - Add basic info, hours, CTA
8. **Local Chamber of Commerce** (Parksville, Qualicum, Oceanside)
   - List in member directories
   - Sponsorship links (if applicable)

**Consistency matters:** Name, phone, address must be exactly the same everywhere. Inconsistencies confuse Google.

**Timeline:** Complete these within 1–2 weeks of launch.

**Why:** Citations signal to Google that you're a real, established local business. They also drive direct traffic and trust.

## Content & Trust Building

### 10. Replace Placeholder Images

**File:** Service pages and area pages

Current placeholders:
- "TODO: Real photo of [service]"
- "TODO: Before/after photo"

**Steps:**
1. Take photos of your work (or hire photographer for 2–3 hours):
   - Deck repair (before/after)
   - Gutter cleaning
   - Fence repair
   - Drywall patching results
2. Upload high-resolution images (JPEG or WebP, 800–1200px wide)
3. Compress with tools like TinyPNG before uploading
4. Add descriptive alt text (e.g., "rotten deck board replaced with pressure-treated lumber")

**Why:** Real photos of your work rank better than stock images. They also build trust with potential customers.

### 11. Gather and Add Real Reviews

**Steps:**
1. Ask past customers to leave reviews on:
   - Google Business Profile (most important)
   - Yelp
   - BBB
2. Create simple review request template (email or text)
3. Make it easy: provide direct links to review pages
4. Add testimonial quote to site (with permission)

**Timeline:** Start requesting reviews immediately. Aim for 10+ on GBP by month 1.

**Why:** Reviews are a ranking factor. They also convert — people trust reviews from real customers.

### 12. Build Local Backlinks

**Steps:**
Target backlinks from trusted local sites:

1. **Parksville & Area Chamber of Commerce**
   - Get listed in member directory
   - Sponsor events (press release link)
2. **Local news sites**
   - Parksville Qualicum News
   - Submit local news story: "New local handyman service launches"
3. **Community sites**
   - Parksville.ca events/directory
   - Qualicum Beach community pages
   - Oceanside Facebook groups
4. **Local sponsorships**
   - Little League, seniors' programs, festivals
   - Get link in sponsorship mention
5. **Contractor directories**
   - HomeAdvisor (may lead to paid ads)
   - BuildFax (homeowner reviews for contractors)

**Quality > quantity:** One link from Parksville.ca is worth 100 links from low-quality directories.

**Timeline:** Aim for 5–10 local backlinks by month 3.

**Why:** Local backlinks tell Google you're an established, trusted part of the community.

## Technical Verification

### 13. Performance Audit

**Steps:**
1. Run Lighthouse audit (built into Chrome DevTools):
   - Open each page
   - DevTools → Lighthouse → Analyze
   - Target: 95+ on Performance, Accessibility, Best Practices, SEO
2. Run PageSpeed Insights: https://pagespeed.web.dev
3. Fix any issues (usually image optimization or slow third-party scripts)

**Current targets:**
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1
- FID (First Input Delay): < 100ms

**Why:** Page speed is a ranking factor. It also affects conversion (slow sites = lost customers).

### 14. Mobile Testing

**Steps:**
1. Test on actual phones (iOS and Android) if possible
2. Use Chrome DevTools device emulation
3. Check:
   - Click-to-call button works
   - Forms are easy to fill on small screens
   - Images load correctly
   - No horizontal scroll

**Why:** 70%+ of handyman searches happen on mobile. A broken mobile experience loses leads.

### 15. Form Testing

**Steps:**
1. Fill out quote form on each service page
2. Verify you receive email with all data
3. Test with and without optional fields (email)
4. Test with special characters in description

**Why:** Forms are your lead generation engine. A broken form = zero leads.

## Post-Launch Monitoring

### 16. Monitor Search Console

**Ongoing (weekly):**
- Check for crawl errors
- Monitor impressions and clicks for key keywords
- Watch for indexing issues
- Request indexing for new blog posts

**Why:** Search Console is your window into how Google sees your site.

### 17. Monitor Analytics

**Ongoing (weekly):**
- Traffic trends
- Bounce rate by page (high = content/UX issue)
- Conversion rate (form submissions)
- Device/browser breakdown

**Why:** You can't improve what you don't measure.

### 18. Monitor Google Business Profile

**Ongoing (weekly):**
- Respond to all reviews (thank customers, address complaints)
- Track "direction" and "call" clicks
- Post updates weekly (storm season prep, seasonal tips, etc.)
- Keep photos and hours current

**Why:** Active GBP profiles rank higher and convert better.

### 19. Monthly Content Updates

**Ongoing (monthly):**
- Update blog with seasonal content (winter prep, spring maintenance, etc.)
- Add new service pages if needed
- Update pricing if rates change
- Add testimonials/reviews

**Why:** Fresh content signals to Google that the site is active and current.

## Content Marketing (Months 1–3)

### 20. Publish Blog Posts on a Schedule

**Timeline:**
- Week 1: Publish all 5 seed posts (already written)
- Week 2–4: Publish 1 additional post (seasonal, local, question-based)
- Ongoing: 1 post per month minimum

**Topics to consider:**
- "5 Questions to Ask Before Hiring a Handyman" (Q&A, high intent)
- "How Long Does Gutter Cleaning Take?" (FAQ, long-tail)
- "Deck Winterization Checklist" (seasonal, local)
- "Why Your Drywall Keeps Cracking (and how to fix it)" (problem/solution)
- "Electrical Work: When You Need a Licensed Electrician" (educational, trust-building)

**Why:** Blog posts build topical authority, capture long-tail keywords, and establish trust.

## Lead Nurturing (Post-Launch)

### 21. Set Up Email Follow-Up (Optional but Recommended)

**Steps:**
1. Get an email marketing platform (Mailchimp free tier is fine)
2. Create simple automation:
   - Quote request received → auto-reply with confirmation + FAQ link
   - No response within 2 days → reminder email
   - Signed customer → add to newsletter for seasonal tips

**Why:** Follow-up doubles conversion rates. Most leads need to be contacted multiple times.

### 22. Create Simple CRM (Optional)

**Steps:**
If you get 3+ inquiries per week, use a simple CRM:
- Airtable (free)
- Notion (free)
- HubSpot (free tier)

Track:
- Lead name, phone, email
- Service requested
- Date inquired
- Status (new, contacted, booked, lost)
- Win/loss reason

**Why:** CRM helps you nurture leads, spot patterns, and improve your process.

## Timeline

**Before Launch:**
- [ ] Update config (2 hours)
- [ ] Wire up email (2–4 hours)

**Week 1:**
- [ ] Deploy to Cloudflare Pages (1 hour)
- [ ] Set up domain (1 hour)
- [ ] Google Search Console (1 hour)
- [ ] Google Analytics (1 hour)
- [ ] Google Business Profile (3–4 hours, includes photo taking)
- [ ] Performance audit (1 hour)

**Week 2–3:**
- [ ] Citation building (4–6 hours, spread across days)
- [ ] Local backlink outreach (2–3 hours)
- [ ] Request initial reviews (1 hour)
- [ ] Test forms and mobile (1 hour)

**Month 1 Ongoing:**
- [ ] Monitor GSC/Analytics (15 min/week)
- [ ] Respond to inquiries and reviews (as they come)
- [ ] Add real photos (4–8 hours)

**Month 2–3:**
- [ ] Publish blog content (2 posts)
- [ ] Local backlink follow-up
- [ ] Expand review requests
- [ ] Analyze what's working, optimize

## Success Metrics

**By Month 1:**
- Site is indexed in Google
- 10+ local backlinks
- 10+ Google Business Profile reviews
- 20+ organic sessions/month

**By Month 3:**
- Ranking #1–5 for "handyman parksville" and similar
- 100+ organic sessions/month
- 3–5 quote form submissions/month
- 15+ Google Business Profile reviews

**By Month 6:**
- Ranking #1 for primary keywords
- 300+ organic sessions/month
- 10+ quote form submissions/month
- 25+ Google Business Profile reviews
- 1–2 customers/month from organic search

## Notes for Renter

When a new renter signs on:
1. Update `src/config.ts` with their name, phone, email
2. Replace photos with their real work photos
3. Clear Google Business Profile reviews (GBP is tied to the business, not the site)
4. Create new GBP profile under renter's business name
5. Update all citations with new name/phone
6. Keep blog and content as-is (it's evergreen and ranks for questions, not branded terms)

---

**Questions?**
- Google Search Console help: https://support.google.com/webmasters
- Cloudflare Pages docs: https://developers.cloudflare.com/pages/
- Local SEO guide: https://moz.com/local-seo
