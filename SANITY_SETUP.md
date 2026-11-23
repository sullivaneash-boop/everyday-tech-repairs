# Sanity connection, publishing, and verification

Audit began 16 November 2026; verification updated 23 November 2026. Existing project **everyday-tech-repairs**, ID **`d7zg1vqo`**, in the **Peakline Media LLC** organization. Dataset **`production`** is public. This project was found in the owner's open Sanity dashboard; no project or account was created by this work. On 16 November the dashboard displayed a 30-day trial notice. Billing/ownership after the trial needs owner confirmation; no plan was changed.

Only publish website content here. Never store inquiries, customer contact details, customer addresses, or customer-uploaded photos. Reviews must be genuine and authorized for public display; completed-work photos must be approved public portfolio assets, not inquiry attachments.

## Connection

Set the public, non-secret values below in `.env.local` and the applicable Vercel environments, then redeploy after changing browser-visible variables:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=d7zg1vqo
NEXT_PUBLIC_SANITY_DATASET=production
```

The local ignored `.env.local` was connected during this audit. The website uses an unauthenticated, published-perspective client with Sanity CDN bypassed, an 8-second request timeout, and no retries. Studio uses the editor's own Sanity login. No read/write API token is required by this implementation. Never put tokens or the webhook secret in `NEXT_PUBLIC_*` variables.

## CORS and target URLs

Sanity Manage → project → API → CORS origins. Use origins only, without `/studio` or other paths. Allow credentials for each trusted origin that hosts Studio. Do not use a platform-wide `*.vercel.app` wildcard.

| Environment | Origin | Webhook target | Audit status |
|---|---|---|---|
| Local | `http://localhost:3000` | Local `/api/revalidate` cannot be reached directly by Sanity | Credentialed CORS already present; Studio login verified |
| Existing local Studio default | `http://localhost:3333` | Not used by this embedded Studio | Credentialed CORS already present |
| Current Vercel site | `https://everyday-tech-repairs.vercel.app` | `https://everyday-tech-repairs.vercel.app/api/revalidate` | CORS absent in inspected list |
| PR #1 branch preview | `https://everyday-tech-repairs-git-co-440f1e-sullivaneash-2433s-projects.vercel.app` | That origin + `/api/revalidate` | Add this exact trusted origin for Studio; keep environment/secret separate; deployment protection applies |
| Production domain | `https://everydaytechrepair.com` | `https://everydaytechrepair.com/api/revalidate` | CORS absent in inspected list; domain listed in Vercel; Studio access not verified |

Add `https://www.everydaytechrepair.com` only if Studio is served there instead of redirecting to the apex. CORS governs browser access; it does not configure server-to-server webhook delivery. A protected preview webhook must also pass Vercel's deployment protection using an owner-approved setup; a redirect to login is not successful revalidation.

For local webhook testing, send a synthetic signed POST directly to the local server. A real Sanity delivery to localhost needs a separately approved public tunnel; no tunnel or extra service was added.

## Webhook setup (not yet configured)

The dashboard showed **0 webhooks**. `SANITY_REVALIDATE_SECRET` is not configured locally. Set a strong random secret in the target Vercel environment and enter the same value into Sanity's webhook Secret field. It must stay server-side and out of Git. Do not place it in the target URL, projection, client config or logs.

- Dataset: `production`; method: POST; Create, Update and Delete enabled.
- Keep triggers for drafts and release versions disabled.
- Filter:

```groq
_type in ["siteSettings", "homePage", "aboutPage", "service", "project", "review", "sanity.imageAsset"]
```

- Minimal projection: `{_id, _type}`. Asset events cover changed/removed images used by published content.
- Destination: appropriate environment's `/api/revalidate` from the table above.
- Inspect Sanity delivery attempts for HTTP 200, then request the affected page again. A webhook expires cache entries; it does not proactively rebuild every page or refresh an already-open browser tab.

The handler uses `parseBody(request, secret, true)` to verify the raw-body signature and wait for Content Lake consistency, then `revalidateTag("sanity", { expire: 0 })`. Missing secret returns 500, absent/incorrect signature 401, malformed payload/signature 400. No rejected request invalidates content. Local tests exercise both the real signing library and a running production Next.js server.

All six loaders use `"use cache"`, tag `sanity`, and `cacheLife("hours")`. The hourly interval means the next request after an hour triggers background refresh; it is not a guaranteed one-hour publishing SLA. Failed/empty reads use fallback content. A failed read can cache that fallback until revalidation or another refresh.

## Schema/query/type audit

`sanity.config.ts` uses `/studio`, all six schema types and the custom desk. `siteSettings`, `homePage`, and `aboutPage` use fixed IDs matching their type names. The global creation templates exclude them; their actions permit publish/discard/restore and exclude duplicate/delete. No schema rename or content migration is required.

| Schema | Projection and frontend contract |
|---|---|
| siteSettings | All editable fields projected: name, phone, email, serviceArea, publicAddress, hours, contactNote, googleReviewsUrl, socialLinks. `SiteSettings.tagline` and `description` are intentionally derived from business config, not CMS fields. |
| homePage | All headline/text/image and featured-reference fields projected into `HomeContent`. References now dereference the array before filtering, preserve editor order, and exclude missing/hidden/wrong-type targets. |
| aboutPage | All owner/bio/background/values/photos fields projected into `AboutContent`; optional text/images nullable, arrays default empty. |
| service | Display fields projected into `Service`; `_id` becomes `id`, `visible` filters, `order` sorts. Missing icon/CTA/arrays default safely. |
| project | Display fields projected into `Project`; `_id` becomes `id`, `completedDate` sorts. Projects require a resolvable main image. Optional image fields and gallery omit broken asset references. |
| review | Display fields projected into `Review`; `_id` becomes `id`, `visible` filters, `date` sorts. Optional rating/source/date nullable, featured defaults false. |

Images resolve asset URL, dimensions and LQIP, plus schema alt/hotspot. Query result types describe these projections, not raw stored Sanity documents; control fields used only for filtering/sorting are intentionally omitted from frontend types.

## Verification record

- `npm test`: synthetic, local-only tests for both form payloads, all six GROQ queries, homepage reference resolution, broken image assets, empty/rejected loader reads, and signed/invalid/malformed webhook requests. No synthetic test fixture is uploaded to Sanity or Formspree.
- Actual public API: the existing `production` dataset returned zero published documents before Studio publishing tests. On 23 November, all six final queries succeeded: settings/home returned published documents, about was empty, and services/projects/reviews returned empty arrays. The restored homepage headline matched exactly.
- Actual local Studio login succeeded with the existing owner session; Business Information and Homepage editors loaded. The verified business name was published successfully.
- Owner-approved homepage test: published “Repair. Buy. Sell.” and observed it via the public API and local homepage. On 23 November restored the exact original “Tech trouble? Let's get it working again.” and independently verified both outputs. Removed the temporary main-branch hardcoded headline workaround.
- No-project production build: Home, Services, About, Our Work, Reviews and `/studio` returned 200; Studio displayed its setup message.
- Isolated production runtime: unsigned webhook rejected; synthetic correctly signed webhook returned 200 using the real Next.js cache runtime. This is not a Sanity-originated delivery.

Still required: publishing/editing aboutPage, service, project and review with genuine approved content and checking corresponding site output; broader siteSettings fields; homepage reference selection against real service/project documents, actual asset upload/crop rendering, real unpublish/delete handling, deployed Studio authentication/CORS, Sanity-originated webhook delivery to each target environment, and cache freshness on Vercel. Genuine review and completed-work content must come from the owner before those document types can be published. Detailed final audit outcomes are in HANDOFF.md.

Sources: [Sanity CORS](https://www.sanity.io/docs/content-lake/cors), [webhook best practices](https://www.sanity.io/docs/content-lake/webhook-best-practices), [Next.js webhook integration](https://www.sanity.io/docs/nextjs/validating-sanity-webhooks-nextjs). Cache behavior was also checked against the installed Next.js 16.4.6 guides under `node_modules/next/dist/docs/`.

PR #1 preview verification: Vercel built commit `9e498910974772fa3b5beaf356bef7a92abb6c46` successfully. Authenticated HTTP checks returned 200 for Home, Request a Repair and Sell Your Device; the homepage headline was the exact restored value. Preview robots.txt disallows indexing. This did not submit either form or test deployed Studio login.
