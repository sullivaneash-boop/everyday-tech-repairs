# Maintenance

No website is maintenance-free. This one is designed to need very little, but the tasks below keep it healthy. Tasks marked **Owner** need no technical skill; tasks marked **Developer** do.

## Monthly (Owner, 10 minutes)
- **Test both forms.** Submit a real test on Request a Repair and Sell Your Device (include a photo). Confirm each appears in Formspree and that the notification email arrives. Delete the tests.
- Check Formspree's **Spam** tab for real requests.
- Glance at Formspree usage (submissions this month, storage used).
- Open the website on your phone and make sure it looks right.

## Quarterly (Owner)
- Export and then delete old Formspree submissions you no longer need.
- Confirm business hours, phone, and services are still accurate.
- Check Google Search Console for any reported problems.
- Confirm billing details are current on Vercel and Formspree, and that domain auto-renew is on.

## Twice a year (Developer, about 1–2 hours)
- **Dependency updates.** Run `npm outdated` and `npm audit`. Apply patch and minor updates, then run the checks below. Treat major versions of Next.js, Sanity, and Tailwind as small projects: read the upgrade guides first.
- At the time of handoff, `npm audit` reports advisories in Sanity Studio's build tooling (transitive packages). They affect the editing dashboard's dependencies, not visitor-facing pages. Re-check on each update and apply fixes as Sanity releases them.
- Checks before deploying any update:
  ```bash
  npx tsc --noEmit && npm run lint && npm run build
  ```
  Then test both forms and `/studio` on the Vercel preview URL before merging to `main`.
- Review Vercel usage against the plan's included amounts.

## Monitoring
- **Vercel** emails the account owner about failed deployments and billing problems.
- **Formspree** emails about approaching storage limits.
- Optional: a free uptime monitor (for example UptimeRobot) pointed at the homepage.

## Backup & recovery
| What | Where it lives | Recovery |
|---|---|---|
| Website code | GitHub | Redeploy from GitHub at any time |
| Deployments | Vercel | Roll back from Vercel → Deployments |
| Content & photos | Sanity | Per-document history in the Studio. Full export: `npx sanity dataset export production backup.tar.gz` (Developer) |
| Customer requests | Formspree | Export CSV regularly; Formspree is the only copy |
| Brand source files | This repository (`icon/`, `wordmark/`, `.ai`) | Keep a second copy outside GitHub |

## Third-party checks
- **Sanity webhook:** if published edits stop appearing within a minute, check Sanity → API → Webhooks for failed deliveries, and that `SANITY_REVALIDATE_SECRET` matches in both places. Edits still appear within about an hour without it.
- **Sanity CORS:** if `/studio` can't log in after a domain change, add the new domain under Sanity → API → CORS origins.
- **Formspree:** if you change the domain, update the form's allowed-domain restriction.

## When to call a developer
- The site shows an error page or a deployment fails.
- Forms stop delivering and Formspree's own status is fine.
- You want new pages, new form questions, design changes, or new features.
- Security advisories for Next.js or React are announced.
- Roughly every six months for routine updates.
