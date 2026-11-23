# Launch Checklist

Status updated 23 November 2026. ✅ = verified · ☐ = still to do.

## Built and verified locally
- ✅ All pages implemented: Home, Services, Request a Repair, Sell Your Device, Our Work, Reviews, About, Contact, Privacy, 404
- ✅ `npx tsc --noEmit`, `npm run lint`, `npm run build` all pass
- ✅ Brand palette, Montserrat/Inter, supplied logo and icon applied
- ✅ Required-field validation on both forms, with field-level messages and an error summary
- ✅ Invalid email, ZIP, and phone rejected; "Other" device type requires a description
- ✅ Sell form requires at least one photo and the ownership confirmation
- ✅ Photo picker: previews, remove, 5-photo cap, unsupported type rejected, large image shrunk
- ✅ Duplicate submission prevented (three rapid submits produced one request)
- ✅ Failure state keeps the visitor's entries (tested against Formspree with a non-existent form ID)
- ✅ Success screen shown only after an OK response (tested with a simulated response)
- ✅ No horizontal scrolling at 375 px; mobile menu and sticky action bar work
- ✅ Unique titles, descriptions, canonical URLs, Open Graph tags; sitemap.xml and robots.txt generated
- ✅ Empty Our Work / Reviews pages are `noindex` and left out of the menu and sitemap
- ✅ No use of the restricted word in any public copy

## Accounts (owner-owned; see HANDOFF.md)
- ✅ GitHub repository exists and initial code is pushed
- ☐ Vercel Pro project created; environment variables set
- ✅ Existing Sanity project identified and connected locally; Studio login verified
- ☐ Deployed Studio CORS, owner Administrator/billing and webhook configuration confirmed
- ☐ Formspree paid plan active; two forms created; IDs set in Vercel
- ✅ Custom domains assigned to production; HTTPS pages load; apex currently redirects to `www`
- ☐ Confirm preferred canonical host and align NEXT_PUBLIC_SITE_URL with the observed redirect
- ☐ GA4 property created; ID set (optional)
- ☐ Search Console verified; sitemap submitted

## Content (from the owner)
- ☐ Phone, email, service area, and hours entered and published
- ☐ Services reviewed and confirmed accurate
- ☐ About page: owner name, bio, photo
- ☐ At least a few real projects with photos (or accept the page staying hidden)
- ☐ Real reviews entered (or accept the page staying hidden); Google reviews link added
- ☐ Homepage headline and text reviewed
- ☐ Privacy Policy reviewed and approved
- ☐ Visual design approved

## End-to-end tests on the live site
- ☐ Repair form: real submission appears in Formspree; notification email arrives; reply-to is the customer
- ☐ Sell form: submission with 5 photos appears; every photo opens
- ☐ Check whether photo links open without a Formspree login; record the result in HANDOFF.md
- ☐ Formspree export works
- ☐ Spam: a submission with the hidden field filled in is discarded
- ☐ Sanity: edit and publish a field; change is visible on the site within a minute (webhook)
- ☐ Sanity: publish a project and a review; pages and menu links appear
- ☐ Tap-to-call and email links work on a phone
- ☐ GA4 real-time view shows `repair_request_submitted`, `sell_device_submitted`, `phone_click`, `email_click`, `cta_click`
- ☐ Test on a real iPhone and a real Android phone, including taking a photo from the camera

## Quality review on the live site
- ☐ Lighthouse / PageSpeed Insights on Home and Request a Repair (performance, accessibility, SEO)
- ☐ Keyboard-only pass through both forms
- ☐ Rich Results Test on the homepage (LocalBusiness data)
- ☐ Preview deployments are not indexed (robots.txt shows `Disallow: /` there)

## After launch
- ☐ Remove developer access everywhere (HANDOFF.md section 5)
- ☐ Owner walkthrough of OWNER_GUIDE.md completed
- ☐ First monthly form test scheduled


## Integration audit verification (23 November 2026)
- ✅ Final audit checks: 15 tests, TypeScript, ESLint and production build passed
- ✅ Human-readable form payloads and useful subjects; required validation and files retained
- ✅ Upload entitlement error is explicit; mocked tests confirm no silent retry or dropped attachments
- ✅ All six GROQ projections, featured-reference ordering/filtering, missing assets and loader fallbacks tested locally
- ✅ Signed webhook verification exercised with the real signing library; local production runtime accepts signed and rejects unsigned requests
- ✅ Actual local Studio: business name published; homepage test published, observed in API/page, and restored exactly
- ✅ Temporary hardcoded headline override removed after restoring stored content
- ☐ Actual Formspree plan, premium notification template availability and inbox delivery verified
- ☐ Owner selects photo-upload approach and approves any new provider/cost (PHOTO_UPLOAD_OPTIONS.md)
- ☐ About/service/project/review publishing and real image/reference handling tested with approved content
- ☐ Real Sanity webhook and production cache refresh tested; localhost test does not establish this

- ✅ PR #1 merged; Vercel production READY on `f3fa298`; seven public pages and original homepage headline checked
