# Owner Actions — Deployment & Setup Checklist

Everything you need to do post-build. This is your copy-paste guide.

---

## Phase 1: Cloudflare Pages Setup

### 1.1 Connect GitHub Repo

**Your repo:** https://github.com/thinkxdesignmedia/parksville-handyman-website

**Steps:**
1. Go to https://dash.cloudflare.com → Pages
2. Click "Connect to Git"
3. Authorize GitHub → Select `parksville-handyman-website` repo
4. Build settings (Cloudflare auto-fills if Astro is detected):
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click "Save and Deploy"

Cloudflare will auto-deploy main branch on every push.

### 1.2 Add Environment Variables

**In Cloudflare Pages → Settings → Environment variables:**

Add all of these (even if temp/placeholder values):

```
RESEND_API_KEY = "TODO: Get from Resend dashboard"
NOTIFY_EMAIL = "info@parksvillehandyman.ca"
BACKUP_EMAIL = "backup@parksvillehandyman.ca"
TURNSTILE_SITE_KEY = "TODO: Get from Cloudflare Turnstile dashboard"
TURNSTILE_SECRET_KEY = "TODO: Get from Cloudflare Turnstile dashboard"
GA_MEASUREMENT_ID = "G-XXXXXXXXXX"
```

(Redeploy after adding vars so Functions pick them up.)

### 1.3 Add Custom Domain

**In Cloudflare Pages → Custom domain:**

1. Enter `parksvillehandyman.ca`
2. Cloudflare will verify DNS (step comes next)

---

## Phase 2: Resend Email Setup

### 2.1 Create Resend Account

1. Go to https://resend.com
2. Sign up (free tier: 100 emails/day)
3. Get your **API Key** from dashboard → Settings → API Keys
4. Copy the key

### 2.2 Add Resend Domain

**In Resend dashboard:**

1. Settings → Domains → "Add Domain"
2. Enter `parksvillehandyman.ca`
3. Resend generates **SPF** and **DKIM** records

**Copy these records:** You'll add them to Cloudflare DNS in the next section.

### 2.3 Add SPF/DKIM to Cloudflare DNS

**In Cloudflare → Websites → parksvillehandyman.ca → DNS:**

For each record Resend gave you (SPF and DKIM), create a TXT record:

**Example SPF:**
- Type: TXT
- Name: `@` (or your root domain)
- Content: (the full SPF value from Resend, e.g., `v=spf1 include:resend.com ~all`)

**Example DKIM:**
- Type: CNAME
- Name: `default._domainkey` (or the name Resend specifies)
- Content: (the CNAME value Resend provides, e.g., `default._domainkey.resend.com`)

Resend will show exact names and values—copy them exactly.

### 2.4 Add DMARC Record (Optional but Recommended)

**In Cloudflare DNS:**

- Type: TXT
- Name: `_dmarc`
- Content: `v=DMARC1; p=none; rua=mailto:dmarc@parksvillehandyman.ca`

(Start with `p=none` to monitor. Later tighten to `p=quarantine` or `p=reject` as you gain confidence.)

### 2.5 Verify Domain in Resend

After DNS records are live (10–30 min to propagate):

**In Resend dashboard:**
1. Domains → `parksvillehandyman.ca` → "Verify"
2. Once verified, you can send from `quotes@parksvillehandyman.ca`

### 2.6 Test Email

Send a test via curl or Resend dashboard to confirm delivery. This is critical.

**Save your Resend API Key.** You'll paste it into Cloudflare Pages env vars next.

---

## Phase 3: Cloudflare Turnstile (CAPTCHA)

### 3.1 Create Turnstile Widget

**In Cloudflare → Account Home → Turnstile:**

1. Click "Create Site"
2. **Site name:** `Parksville Handyman`
3. **Domain:** `parksvillehandyman.ca`
4. **Mode:** Managed (recommended)
5. Click "Create"

Cloudflare generates:
- **Site Key** (public, goes in HTML)
- **Secret Key** (private, goes in Functions)

### 3.2 Copy Keys to Cloudflare Pages Env Vars

**In Cloudflare Pages → Settings → Environment variables:**

Paste:
```
TURNSTILE_SITE_KEY = "[copy from Turnstile dashboard]"
TURNSTILE_SECRET_KEY = "[copy from Turnstile dashboard]"
```

Also update the placeholder in the built HTML:

**In dist/index.html** (and any other pages with Turnstile), replace:
```html
data-sitekey="PLACEHOLDER_TURNSTILE_SITE_KEY"
```

with your actual Site Key, e.g.:
```html
data-sitekey="1x12345abcde6789"
```

(Or redeploy from GitHub so the env var gets picked up.)

---

## Phase 4: Cloudflare WAF & Security

### 4.1 Enable WAF Managed Rules

**In Cloudflare → Security → WAF:**

1. Click "Managed Rules"
2. Enable "Cloudflare Managed Ruleset"
3. Enable "Bot Fight Mode" (catches obvious bots)

### 4.2 SSL/TLS Configuration

**In Cloudflare → SSL/TLS:**

1. Minimum TLS version: 1.2 (default is fine)
2. Automatic HTTPS rewrites: Enabled (auto-converts http:// to https://)

---

## Phase 5: Google Analytics 4 (GA4)

### 5.1 Create GA4 Property

**Steps:**
1. Go to https://analytics.google.com
2. Create a new property:
   - **Name:** `Parksville Handyman`
   - **Time zone:** Canada/Pacific
   - **Currency:** CAD
3. Add a web data stream:
   - **URL:** `https://parksvillehandyman.ca`
4. Cloudflare will generate a **Measurement ID** (format: `G-XXXXXXXXXX`)

### 5.2 Add Measurement ID to Config

**In your codebase:**

Edit `src/config.ts`:

```typescript
export const config = {
  // ... other fields ...
  gaPropertyId: 'G-XXXXXXXXXX', // Replace with your Measurement ID
};
```

Redeploy:
```bash
git add src/config.ts
git commit -m "Add GA4 Measurement ID"
git push origin main
```

Cloudflare Pages will redeploy automatically.

### 5.3 Verify GA4 is Receiving Data

After deployment (give it 5–10 min):
1. Go to https://parksvillehandyman.ca
2. Open browser DevTools → Console
3. Type: `dataLayer` (should show array with gtag data)
4. In Google Analytics, check Reports → Real-time to see your session

---

## Phase 6: Google Search Console

### 6.1 Verify Domain

**Steps:**
1. Go to https://search.google.com/search-console
2. Click "Add property" → Select URL prefix method
3. Enter `https://parksvillehandyman.ca`
4. Verify via DNS TXT record:
   - Cloudflare suggests a TXT record
   - Go to Cloudflare DNS → Add TXT record
   - Name: `@`, Content: (Google's verification value)
   - Save
   - Return to GSC, click "Verify"

### 6.2 Submit Sitemap

**In Google Search Console:**

1. Go to Sitemaps (left menu)
2. Enter: `https://parksvillehandyman.ca/sitemap.xml`
3. Click "Submit"

### 6.3 Request Indexing

**For key pages:**
1. In GSC search bar, enter each URL:
   - `https://parksvillehandyman.ca`
   - `https://parksvillehandyman.ca/deck-repair`
   - `https://parksvillehandyman.ca/drywall-repair`
   - etc.
2. Click "Request Indexing"

Google will crawl and index them within 48–72 hours.

---

## Phase 7: Uptime & Error Monitoring

### 7.1 UptimeRobot (Free)

**Steps:**
1. Go to https://uptimerobot.com
2. Sign up (free plan: 50 monitors)
3. Add two monitors:

**Monitor 1: Homepage**
- URL: `https://parksvillehandyman.ca`
- Interval: 5 min
- Notification: Email (your email)

**Monitor 2: Form Endpoint**
- URL: `https://parksvillehandyman.ca/api/quote`
- Method: POST
- Notification: Email

Set alerts to notify you of downtime.

### 7.2 Cloudflare Pages Error Logging

**In Cloudflare Pages:**

Function logs are visible at:
- Pages → parksville-handyman-website → Deployments → (latest) → Real-time logs

Monitor form submissions here to catch delivery failures.

---

## Phase 8: Post-Deployment Tests

**Run these in order after everything is deployed:**

### Test 1: Submit All Forms

1. Go to https://parksvillehandyman.ca
2. Fill out quote form, submit
3. Check your email (`NOTIFY_EMAIL`) — you should receive it within 1 min
4. Repeat on 2–3 service pages to test form submission
5. Check Cloudflare Pages logs to confirm no errors

### Test 2: Email Deliverability

1. Use https://www.mail-tester.com
2. Follow their instructions to send test email to their address
3. Get a score (target: 9+/10)
4. If <9/10, check SPF/DKIM records in Cloudflare DNS (common cause: typos or incomplete propagation)

### Test 3: Google Mobile-Friendly & Rich Results

1. Go to https://search.google.com/test/mobile-friendly
2. Enter `https://parksvillehandyman.ca`
3. Should pass (mobile-friendly)
4. Go to https://search.google.com/test/rich-results
5. Paste homepage HTML (should detect LocalBusiness schema)

### Test 4: Domain & HTTPS

1. Visit both:
   - `https://parksvillehandyman.ca` (should work)
   - `https://www.parksvillehandyman.ca` (should also work)
2. Check for valid SSL certificate (green lock in browser)
3. Check for auto-redirect from http → https

### Test 5: Open Graph Image Share

1. Copy homepage URL: `https://parksvillehandyman.ca`
2. Paste in iMessage, Slack, or Facebook
3. Should show the og-default.svg image with title & description
4. If not, wait a few min (social sites cache) and try again

---

## Phase 9: Domain & DNS Final Steps

### 9.1 Update GoDaddy Nameservers (If Not Done)

**Your domain is registered with GoDaddy.**

**Steps:**
1. Log into GoDaddy → Manage Domains
2. Find `parksvillehandyman.ca`
3. Click → Manage DNS
4. Change nameservers to **Cloudflare's**:
   - `NS` → Cloudflare provides 2 nameservers when you added the domain
   - Replace GoDaddy nameservers with Cloudflare's
   - Save
5. Wait 24–48 hours for propagation

**Verify propagation:**
```bash
nslookup parksvillehandyman.ca
```

Should resolve to Cloudflare IP.

---

## Known Placeholder TODOs (Intentional)

These are in the built output and should be updated by the renter:

1. **Favicon PNG files** — Need to be generated or converted:
   - `/favicon-32.png`
   - `/favicon-16.png`
   - `/apple-touch-icon.png`
   - `/favicon-192.png`
   - `/favicon-512.png`
   
   **Action:** Use a tool like https://convertio.co or https://icoconvert.com to convert `favicon.svg` to PNG sizes, then upload to `public/`.

2. **Image placeholders** — All service pages have "📷 TODO: Real photo of..." sections:
   - Replace with actual before/after photos or process photos
   - Update in `src/pages/[service-name].astro`, rebuild

3. **GA4 Measurement ID** — `G-XXXXXXXXXX` in `src/config.ts`
   - Get from Google Analytics, paste, redeploy

4. **Resend API Key** — In Cloudflare Pages env vars
   - Get from Resend, paste into Cloudflare, redeploy

5. **Turnstile Keys** — Site Key and Secret Key in env vars + HTML
   - Get from Cloudflare Turnstile, paste into env vars, redeploy

---

## Backup & Restore

**For a static Astro site, your backup system is:**
1. **GitHub repo** — All source code, config, content
2. **Cloudflare Pages deploy history** — Every build is archived (24-month retention)

**To restore from a previous deployment:**
1. Go to Cloudflare Pages → Deployments
2. Find the previous working deployment
3. Click "Rollback"
4. Cloudflare redeploys that version instantly

**Form submission data backup:**
1. Every form submission is logged to Cloudflare KV Store (namespace: `QUOTES_KV`)
2. If Resend delivery fails, leads are still in KV
3. Check via Cloudflare API or Pages logs

---

## Troubleshooting

**Forms not working?**
- Check Cloudflare Pages → Real-time logs for `/api/quote` errors
- Verify `RESEND_API_KEY` is set in env vars
- Verify `TURNSTILE_SECRET_KEY` is set
- Test Turnstile widget is present in HTML (check page source)

**Emails not arriving?**
- Check spam/junk folder
- Check Resend dashboard → "Email Activity" for failed sends
- Verify SPF/DKIM records in Cloudflare DNS (run `nslookup -type=TXT default._domainkey.parksvillehandyman.ca`)
- Check KV Store backup (emails logged even if Resend fails)

**GA4 not tracking?**
- Wait 24–48 hours (Google takes time to process)
- In browser console, confirm `window.dataLayer` exists
- Check Google Analytics → Admin → Data Streams → Web → Check measurement tag is `G-XXXXXXXXXX` (must match config)

**Domain not resolving?**
- Run `nslookup parksvillehandyman.ca` — should return Cloudflare IP
- If not, check GoDaddy nameservers are updated to Cloudflare's
- DNS changes can take 24–48 hours to propagate globally

**SSL certificate missing?**
- Cloudflare auto-issues on deployment
- Give it 5 min after adding the domain
- If still no cert, check domain is verified in Cloudflare Pages

---

## Summary Table

| Service | Status | Who Sets Up | Frequency |
|---------|--------|-------------|-----------|
| GitHub Pages Deployment | ✓ Code ready | You → Cloudflare | Automatic on push |
| Resend Email | ⏳ Key required | You → Resend → Cloudflare | One-time |
| Turnstile CAPTCHA | ⏳ Keys required | You → Cloudflare → Pages | One-time |
| Google Analytics 4 | ⏳ ID required | You → Google → Config | One-time |
| Google Search Console | ⏳ Domain verification | You → Google → Cloudflare DNS | One-time |
| Cloudflare WAF | ✓ Enabled | You → Cloudflare | One-time |
| UptimeRobot | ⏳ Setup monitors | You → UptimeRobot | One-time |
| Domain DNS (GoDaddy) | ⏳ Nameservers | You → GoDaddy → Cloudflare | One-time |

**Legend:** ✓ = Done; ⏳ = Your Action Required

---

**Questions?** Refer to CLAUDE.md for architecture, RENTER-ONBOARDING.md for content updates, or the README.md for development notes.
