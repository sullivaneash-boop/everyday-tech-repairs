# Launch Checklist

Status at handoff of the codebase (16 November 2026). ✅ = verified · ☐ = still to do.

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
- ☐ GitHub repository created and code pushed
- ☐ Vercel Pro project created; environment variables set
- ☐ Sanity project created; CORS origins added; owner is Administrator
- ☐ Formspree paid plan active; two forms created; IDs set in Vercel
- ☐ Domain connected in Vercel; HTTPS active; `www` redirects to apex
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
