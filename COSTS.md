# Costs & Subscriptions

Prices were checked on the providers' public pricing pages on **16 November 2026**. Prices change; confirm on each provider's site before subscribing. No subscriptions were purchased or upgraded by this audit; existing account billing is unverified. All accounts should be created under, and billed to, the business owner.

## Summary

| Service | Needed plan | Listed price | Required? |
|---|---|---|---|
| Vercel (hosting) | Pro | $20 / month per developer seat | Yes |
| Formspree (inquiries) | Personal | $15/month or $120/year | If retaining Formspree photo uploads |
| Sanity (content) | Free | $0 | Yes |
| Domain name | n/a | Varies by registrar (yearly) | Yes |
| Google Analytics 4 | Free | $0 | Optional |
| Google Search Console | Free | $0 | Recommended |

With the listed hosting allowance, Formspree totals approximately **$35/month**, or **$30/month equivalent with annual Formspree billing**, plus domain renewal. Photo-provider alternatives are in [PHOTO_UPLOAD_OPTIONS.md](PHOTO_UPLOAD_OPTIONS.md).

## Vercel
- **Why Pro:** Vercel's terms limit the free Hobby plan to personal, non-commercial use. A business site needs Pro.
- **Pro:** $20/month per developer seat, including a $20 monthly usage credit, 1 TB data transfer, and 10M CDN requests. A site this size should stay well inside that.
- **Overages:** pay-as-you-go beyond the included amounts. Set a spend limit in Vercel → Settings → Billing.
- **If a payment fails:** Vercel emails the account owner and may pause the site until billing is fixed.

## Formspree
Rechecked [official pricing](https://formspree.io/plans) on **23 November 2026**. Earlier $10/$20/$60 figures are annual-billing monthly equivalents, not monthly-billing prices.

| Plan | Monthly billing | Annual billing | Submissions/month | Upload storage |
|---|---|---|---|---|
| Free | $0 | $0 | 50 | None |
| Personal | $15 | $120 | 200 | 1 GB |
| Professional | $30 | $240 | 2,000 | 5 GB |
| Business | $90 | $720 | 20,000 | 10 GB |

Personal is the lowest plan with uploads; custom notification templates require Business. The current account plan was not verified, and no upgrade was made. The reported upload rejection remains unresolved until the owner enables uploads or selects a different provider. Both forms share account limits. Confirm storage retention, over-limit behavior and photo-link access before launch. See FORMSPREE_NOTIFICATIONS.md.

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
