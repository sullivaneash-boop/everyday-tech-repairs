# Decision Log

Significant technical decisions and their tradeoffs, newest last.

**1. Replaced the WordPress starter.** The folder contained a `package.json` for a WordPress block theme (no theme files existed). The brief specifies Next.js + Sanity + Formspree, so it was replaced.

**2. Embedded Studio at `/studio`.** One URL, one deployment, one login for the owner. A standalone Studio offered no operational advantage at this size.

**3. Forms post directly from the browser to Formspree.** No custom backend. Proxying through a Vercel function would add server-side validation, but it would also route customer data and photos through our server and hit Vercel's ~4.5 MB request body limit, which photos exceed. Tradeoff: validation that we control is client-side only; Formspree applies its own checks (email format, spam filtering, file limits). The form IDs are public by design.

**4. Photos are shrunk in the browser before upload.** Formspree allows 25 MB per file and 100 MB per request but times out at 30 seconds. Five untouched phone photos can exceed that on mobile data. Resizing to 2000 px JPEG keeps a typical submission under 3 MB. This is ~60 lines of standard canvas code, with no upload infrastructure.

**5. Five photos maximum, sent as `Photo 1`…`Photo 5` (updated in decision 16).** Formspree's pages disagree on the per-submission cap (5 vs 10); five is safe under both.

**6. Content refresh = cache tag + webhook, with an hourly fallback.** Chosen over Sanity's Live Content API because it ships no extra client JavaScript and has one moving part. Without a working webhook, a request after the hourly revalidation interval triggers a background refresh; there is no guaranteed one-hour publishing deadline.

**7. No draft preview / visual editing.** Sanity's draft-then-publish flow is clear enough for this site, and preview mode needs an API token and extra code paths. Revisit if the owner asks for it.

**8. Plain text fields instead of rich text.** Bio and descriptions use multi-line text (blank line = new paragraph). Simpler for the owner and no formatting to break the design.

**9. Unverified facts are hidden, never filled with placeholders.** Phone, email, hours, service area, and address default to empty and simply don't render. Our Work and Reviews are removed from the navigation and sitemap and marked `noindex` until they contain real entries.

**10. Sanity images use a plain `<img>` with `srcset`.** Sanity's CDN already resizes and serves modern formats; routing them through Vercel image optimization would add cost for no gain.

**11. Accessibility-driven color use.** White text on Electric Cyan fails contrast (≈2.3:1), so cyan buttons use Deep Navy text (≈7.6:1). Brand Blue `#1478ED` on white is 4.3:1, just short of AA for body-size text, so links use a slightly darker derived shade `#0F62C9`. All derived shades are labelled in `globals.css`.

**12. Logo on dark backgrounds.** The supplied files contain only the full-color logo and icon (dark lettering). The header is therefore white with the supplied wordmark. The footer uses the supplied icon plus live Montserrat text arranged like the brand sheet's navy lockup. A designer-exported reversed logo should replace it when available.

**13. "Repair · Buy · Sell" tagline.** The brand sheet's fourth word is excluded from all public copy per the brief's language rule.

**14. Analytics honors GPC/DNT instead of a cookie banner.** Keeps the interface clean for a US local business while respecting browser-level opt-outs. If the business later targets regions requiring opt-in consent, add a consent banner.

**15. Not built (by design):** inventory/product pages, checkout, repair tracking, accounts, scheduling, custom inquiry dashboard. The route-group structure and Sanity schema folder leave room to add them.


**16. Owner-friendly lead payloads (23 November 2026).** Centralized typed payload builders preserve required form/schema keys, lead with contact/device/issue or condition, then address and optional details. Use documented `subject`, exact `email` for Reply-To and readable photo labels. Actual email layout is Formspree-controlled; Business templates and live delivery are unverified. No paid upgrade made.

**17. Keep upload failures explicit.** The reported file-upload rejection is consistent with Formspree's paid-plan requirement. Preserve customer entries and files and explain the failure; never silently omit photos or claim success. Alternative-provider research is documented in PHOTO_UPLOAD_OPTIONS.md; no new storage provider is selected or connected.

**18. Fix Sanity reference projections and bound outages.** Dereference featured arrays before filtering, exclude missing/wrong-type targets and unresolved image assets, and query singletons by fixed IDs. Limit Sanity fetches to eight seconds with no retries; fallback logs contain no arbitrary error payloads. Local regression tests cover all loaders and queries.

**19. Restore CMS control of the headline.** The duplicate headline in Sanity was corrected and verified against the API/local page. Remove main's temporary hardcoded override; a regression test confirms published headlines are used. Only existing business content was published. Other real document types and hosted webhook delivery remain open; see SANITY_SETUP.md.
