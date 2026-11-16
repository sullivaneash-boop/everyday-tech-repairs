# Everyday Tech Repair: Website

Marketing and inquiry website for **Everyday Tech Repair** (everydaytechrepair.com), built by Peakline Media for handoff to the business owner.

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Cache Components) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 (tokens in `src/app/globals.css`) |
| Content | Sanity CMS; Studio embedded at `/studio` |
| Inquiries | Formspree (two forms, posted directly from the browser) |
| Hosting | Vercel (Pro, since Hobby is non-commercial only) |
| Analytics | Google Analytics 4 (optional, env-gated) |

Related docs: [OWNER_GUIDE](OWNER_GUIDE.md) · [HANDOFF](HANDOFF.md) · [MAINTENANCE](MAINTENANCE.md) · [DECISIONS](DECISIONS.md) · [LAUNCH_CHECKLIST](LAUNCH_CHECKLIST.md) · [COSTS](COSTS.md)

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in values (all optional for a first run)
npm run dev                  # http://localhost:3000
```

The site runs with **no** environment variables: it shows built-in fallback copy, hides unverified contact details, and the forms fail with a clear message. This is intentional so nothing fake is ever published.

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check only |

## Environment variables

Documented in [`.env.example`](.env.example). Set them in `.env.local` locally and in Vercel → Project → Settings → Environment Variables.

| Variable | Secret? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | no | Canonical URLs, sitemap. Defaults to `https://everydaytechrepair.com` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | no | Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | no | Sanity dataset (default `production`) |
| `SANITY_REVALIDATE_SECRET` | **yes** | Verifies the Sanity webhook that refreshes content |
| `NEXT_PUBLIC_FORMSPREE_REPAIR_ID` | no | Formspree form for repair requests |
| `NEXT_PUBLIC_FORMSPREE_SELL_ID` | no | Formspree form for sell-your-device requests |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | no | GA4 ID (`G-…`). Empty = analytics off |

`NEXT_PUBLIC_*` values are compiled into the browser bundle, so changing one requires a redeploy.

## Repository structure

```
sanity.config.ts            Studio configuration (embedded at /studio)
src/
  app/
    layout.tsx              Root layout: fonts, metadata defaults, analytics
    (site)/                 Public pages (share header/footer/sticky bar)
      page.tsx              Homepage
      services/ our-work/ reviews/ about/ contact/ privacy/
      request-service/      Repair inquiry form
      sell-your-device/     Device-selling inquiry form
    studio/[[...tool]]/     Sanity Studio
    api/revalidate/         Sanity webhook → clears cached content
    sitemap.ts robots.ts    SEO files
  components/
    layout/                 Header, mobile nav, footer, sticky action bar
    sections/               Page sections (hero, cards, CTA band, JSON-LD…)
    forms/                  Both forms, field components, photo picker
    gallery/                Our Work gallery + lightbox
    ui/                     Buttons, icons, section wrapper, Sanity image
    analytics/              GA4 loader + click tracking
  config/
    business.ts             Central business config, nav, device categories
    default-content.ts      Fallback copy used until Sanity is filled in
  lib/
    sanity/                 Client, GROQ queries, cached loaders, types
    forms/                  Zod schemas, photo rules, Formspree submit
    analytics.ts seo.ts format.ts
  sanity/                   Schemas + Studio menu structure
public/brand/               Optimized logo + icon
icon/ wordmark/ *.ai        Original brand source files (not served)
```

## How the pieces fit

**Content (Sanity).** `src/lib/sanity/content.ts` holds one cached loader per content type (`"use cache"` + tag `sanity`). When the owner publishes, a Sanity webhook calls `/api/revalidate`, which clears the tag; the next visitor gets fresh content with no redeploy. As a safety net the cache also refreshes about hourly. Every loader falls back to defaults if Sanity is unreachable or empty.

**Inquiries (Formspree).** Forms validate in the browser with Zod (`src/lib/forms/schemas.ts`), shrink photos client-side, then POST `multipart/form-data` straight to `https://formspree.io/f/{id}`. The success screen appears only after Formspree responds OK. No inquiry data touches Vercel or Sanity.

**Analytics.** `src/components/analytics/Analytics.tsx` loads GA4 only when an ID is set and the browser sends no Global Privacy Control / Do Not Track signal. Events: `repair_request_submitted`, `sell_device_submitted`, `phone_click`, `email_click`, `cta_click`. No personal data is sent.

## Setting up the integrations

### Sanity
1. Create a project at sanity.io/manage (owner's account). Dataset: `production`, **public**.
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`.
3. In the project → API → CORS origins, add `http://localhost:3000` and `https://everydaytechrepair.com` with **Allow credentials**.
4. Open `/studio`, sign in, and publish Business Information, Homepage, and About Page.
5. API → Webhooks → create: URL `https://everydaytechrepair.com/api/revalidate`, trigger on Create/Update/Delete, filter empty, secret = `SANITY_REVALIDATE_SECRET`.

### Formspree
1. Create two forms in the owner's account: "Repair Requests" and "Sell Your Device Requests".
2. Copy each form's ID into the matching env var.
3. In each form's settings: set the notification email, restrict submissions to the site's domain, and keep spam filtering on.
4. File uploads require a paid plan (see [COSTS](COSTS.md)).

### Vercel
Import the GitHub repo, add the env vars, add the domain. Every push to `main` deploys to production; other branches get preview URLs (which are automatically `noindex` via `robots.ts`).

## Deployment checks

```bash
npx tsc --noEmit
```
```bash
npm run lint
```
```bash
npm run build
```
