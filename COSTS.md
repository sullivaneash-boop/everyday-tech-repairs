# Costs & Subscriptions

Prices were checked on the providers' public pricing pages on **16 November 2026**. Prices change; confirm on each provider's site before subscribing. No subscriptions have been purchased yet. All accounts should be created under, and billed to, the business owner.

## Summary

| Service | Needed plan | Listed price | Required? |
|---|---|---|---|
| Vercel (hosting) | Pro | $20 / month per developer seat | Yes |
| Formspree (inquiries) | Personal | $10 / month | Yes, for photo uploads |
| Sanity (content) | Free | $0 | Yes |
| Domain name | n/a | Varies by registrar (yearly) | Yes |
| Google Analytics 4 | Free | $0 | Optional |
| Google Search Console | Free | $0 | Recommended |

Expected baseline: **about $30 / month plus the yearly domain renewal.**

## Vercel
- **Why Pro:** Vercel's terms limit the free Hobby plan to personal, non-commercial use. A business site needs Pro.
- **Pro:** $20/month per developer seat, including a $20 monthly usage credit, 1 TB data transfer, and 10M CDN requests. A site this size should stay well inside that.
- **Overages:** pay-as-you-go beyond the included amounts. Set a spend limit in Vercel → Settings → Billing.
- **If a payment fails:** Vercel emails the account owner and may pause the site until billing is fixed.

## Formspree
| Plan | Listed price | Submissions / month | Photo storage | Notes |
|---|---|---|---|---|
| Free | $0 | 50 | none | **No file uploads**; dashboard keeps 30 days; no export |
| Personal | $10 / month | 200 | 1 GB | Uploads, unlimited archive, CSV/JSON export |
| Professional | $20 / month | 2,000 | 5 GB | 2 team members, advanced spam control |

- **Recommended: Personal.** The Sell Your Device form requires a photo, and file uploads are not available on Free.
- **Pricing caveat:** the plans page showed $10/$20/$60 in its visible text but $15/$30/$90 in its page metadata. Confirm the real price at checkout.
- **Limits:** 25 MB per file, 100 MB per submission. The website shrinks photos before upload (typically under 1 MB each), so 1 GB holds a large number of submissions.
- **When storage is full:** Formspree deletes the oldest files first. Clean up periodically.
- **Over the submission limit:** Formspree's pricing page does not state what happens. Confirm with Formspree; upgrade if volume approaches 200/month.
- Both forms count toward one account's monthly limit.

## Sanity
- **Free plan:** up to 20 seats (Administrator and Viewer roles), 2 public datasets, 10,000 documents, 100 GB assets, 100 GB bandwidth/month, 250k API requests/month.
- A public dataset is appropriate: it holds only content meant for the public website.
- **No overages on Free.** If a limit were ever reached, the next step is Growth at $15 per seat/month. This site should not come close.

## Domain
- Registrar, renewal date, and price: **to be filled in at handoff** (see HANDOFF.md).
- Turn on auto-renew. An expired domain takes the website and any email on that domain offline.

## Optional upgrades (not needed now)
- Formspree Professional if inquiries exceed 200/month or a second team member needs access.
- Sanity Growth for extra editor roles or private datasets.
- A repair-shop management system if you later need repair status tracking or customer history (see DECISIONS.md #15).
