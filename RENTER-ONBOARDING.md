# Renter Onboarding Guide

This guide covers what to update when a new renter signs on to use the website.

## Step 1: Update Business Configuration (5 minutes)

**File:** `src/config.ts`

Update these values in the `config` object:
- `businessName` — Legal business name
- `phone` — Phone number (keep format: (250) 555-0000)
- `email` — Business email address
- `yearEstablished` — Year they started or current year

**Example:**
```typescript
export const config = {
  businessName: 'Island Home Repairs Ltd.',
  phone: '(250) 555-0123',
  email: 'quotes@islandrepairs.ca',
  yearEstablished: 2024,
  // ... rest of config
};
```

These values are used site-wide in headers, footers, CTAs, and forms.

## Step 2: Replace Photos (2–4 hours)

Current photos are placeholders with "TODO: Real photo" messages.

**Photos to Replace:**
1. **Service pages** (9 pages)
   - Each has a placeholder area
   - Replace with before/after photos of their work
   - Or process photos (them working, finished result)
   
2. **Blog posts**
   - Optional; stock images are fine for blog
   - But real photos rank better

3. **Homepage**
   - Add hero image (optional; can keep gradient background)

**Photo Guidelines:**
- Size: 800–1200px wide
- Format: JPEG or WebP (WebP preferred for performance)
- Compress: Use TinyPNG or similar before uploading
- Alt text: Descriptive, e.g., "rotten deck board replaced with pressure-treated lumber"

**Where to Store:**
Add images to `public/images/` folder (create if doesn't exist).

Reference in Astro:
```astro
<img src="/images/deck-repair-after.jpg" alt="Deck repair complete" loading="lazy" />
```

## Step 3: Create Google Business Profile (4–6 hours)

**Critical for local rankings. Don't skip this.**

### Setup:
1. Go to https://business.google.com
2. Create new profile (or claim if business exists)
3. Fill in:
   - Business name (must match exactly on site and all citations)
   - Category: **Home Repair Service** (not generic "Handyman")
   - Phone number
   - Website: https://parksvillehandyman.ca
   - Service areas: Parksville, Qualicum Beach, Oceanside

### Address:
**You must provide a real address.**
- Can be residential if operating from home (check local bylaws)
- Can be commercial address
- **This is critical** — Google uses it for "near me" searches and map rankings

### Verification:
- Google will mail a postcard with a verification code
- Or allow phone verification (faster, 1–2 days)

### Photos:
Upload 10+ high-quality photos:
- Exterior of home/office
- Team photos (if applicable)
- Example work photos (before/after)
- Tools or equipment
- Van/truck with branding

**Photos matter more than text.** Real photos of their work rank better than written descriptions.

### Complete Every Field:
- Hours of operation
- Services offered
- Website link
- Description (write it naturally, not marketing-speak)
- Payment options
- Attributes (licensed, insured, etc.)

### Address the Profile Every Month:
- Post updates (seasonal tips, promotions, etc.)
- Respond to all reviews (thank positive, professionally address negative)
- Keep hours and phone current

## Step 4: Update Online Listings (3–4 hours)

Business name, phone, and address must be **exactly consistent** everywhere.

**Update These Directories:**

1. **Google Business Profile** (done in Step 3)
2. **Yellow Pages Canada** — https://www.yellowpages.ca
3. **BBB** — https://www.bbb.org
4. **Yelp** — https://biz.yelp.com
5. **Local.com** — https://www.local.com
6. **Facebook Business Page** — https://facebook.com/business
7. **Parksville/Qualicum Chamber of Commerce** (if applicable)

**What to Enter:**
- Business name (exactly as GBP)
- Phone (exactly as GBP)
- Address (exactly as GBP)
- Website: https://parksvillehandyman.ca
- Service description
- Hours
- Photos (especially for Yelp)

**Why This Matters:**
Inconsistent name/phone/address confuses Google's algorithm. It thinks these are different businesses. Citations build local authority.

**Timeline:** Complete within 2 weeks of launch.

## Step 5: Set Up Email Notifications (1 hour)

Quote form submissions go to the email address in `src/config.ts`.

**Verify Email Service:**

1. Check `functions/api/quote.ts` — email sending code should be active
2. Check Cloudflare Pages environment variables — `RESEND_API_KEY` (or your service's key) should be set
3. Test form submission:
   - Fill out quote form on website
   - You should receive email within 1 minute
   - If not, check:
     - API key is correct
     - Email service account is active
     - Spam folder

**Email Content:**
- Includes name, phone, service, description
- Has reply-to set to customer's email (if provided)
- You can reply directly and it reaches them

## Step 6: Request Initial Reviews (1–2 hours)

Don't wait for organic reviews. Actively request them.

**Ask Previous Customers:**
Send email or text:
> "Hi [Name],
>
> We'd love to hear about your experience. Would you take 2 minutes to leave a review? It helps us grow and helps other homeowners decide.
>
> [Link to Google Business Profile review page]
>
> Thanks for your business!"

**Where to Ask:**
1. **Google Business Profile** (most important)
2. **Yelp**
3. **BBB**

**Target:** 5–10 reviews in first month. Each review is a ranking signal and builds trust.

## Step 7: Update Google Search Console & Analytics (1 hour)

If this is a new renter, update ownership of tracking accounts.

**Google Search Console:**
1. Go to https://search.google.com/search-console
2. Add/verify property: `https://parksvillehandyman.ca`
3. Submit sitemap: `https://parksvillehandyman.ca/sitemap.xml`
4. Check for indexing errors

**Google Analytics:**
1. Go to https://analytics.google.com
2. Ensure property exists for domain
3. Monitor traffic, form submissions, conversion rate

**Why:** Search Console shows which keywords drive traffic. Analytics shows where users come from and what they do on the site.

## Step 8: Build Local Backlinks (2–3 hours)

Local backlinks (links from trusted Island sites) boost rankings significantly.

**Targets:**
1. **Parksville & Qualicum Chamber of Commerce** — Get listed, sponsor events
2. **Local news** — Submit story: "New handyman service launches in Parksville"
3. **Community sites** — Parksville.ca, Qualicum Beach directories
4. **Sponsorships** — Local Little League, seniors' programs, festivals
   - Sponsor, ask for link in sponsor mention

**Timeline:** Aim for 5 backlinks by month 3.

## Step 9: What NOT to Change

Keep the following as-is:

- **All blog content** — 5 seed articles are evergreen and rank for question keywords. They drive traffic and build topical authority. They're not branded to any specific renter.
- **Service page content** — Written to apply to any handyman in this market. Details are realistic but generic enough to be true for any renter.
- **Site structure/navigation** — Already optimized for SEO and UX.
- **Design** — Proven colors, layout, and typography. Changing it requires re-optimization.

## Step 10: Ongoing Maintenance (Monthly)

After launch, spend ~30 minutes per month on:

### Google Business Profile
- Respond to reviews (all of them)
- Post 1 update/week (tip, seasonal maintenance, photo, etc.)
- Keep hours/phone current

### Google Search Console
- Check for errors
- Monitor keyword impressions
- Request indexing for new content

### Analytics
- Check traffic and conversions
- Identify high-performing pages
- Spot issues (high bounce rate, etc.)

### Review Requests
- Ask happy customers to review
- Aim for 1 new review every 1–2 weeks

## Common Updates

### Season Changes
- **Spring:** Update homepage CTA and blog to spring maintenance themes
- **Summer:** Focus on deck staining, pressure washing, outdoor projects
- **Fall:** Storm prep, gutter cleaning, winterization
- **Winter:** Urgent repairs, snow/ice damage

### Price Changes
Update in:
- `src/config.ts` if using dynamic pricing
- Service page text (e.g., "from $75/hour")
- Pricing guide page
- FAQ (if rates mentioned)

### New Services
Add new service pages if needed:
1. Create new file in `src/pages/`
2. Use ServiceLayout template
3. Write 800–1,200 words
4. Add to config, sitemap, internal links
5. Deploy

### New Blog Posts
Add 1–2 posts monthly:
1. Create new file in `src/pages/blog/`
2. Use BlogLayout template
3. Publish and submit to Google Search Console
4. Share on social media (if applicable)

## Questions or Issues?

Refer to:
- `README.md` — Project structure and development
- `LAUNCH-CHECKLIST.md` — Pre-launch and deployment steps
- Cloudflare Docs: https://developers.cloudflare.com/pages/
- Google Business Profile Help: https://support.google.com/business/
