# Handoff

Everything needed to transfer this website to the business owner so it runs without Peakline Media. **No passwords or secrets are stored in this repository or these documents.**

## 1. Account ownership checklist

Each account should be created with the owner's email, or transferred to it. Tick when the owner is the account owner *and* the billing contact.

| ☐ | Service | What it does | Owner | Transfer method |
|---|---|---|---|---|
| ☐ | Domain registrar | Owns everydaytechrepair.com | _to confirm_ | Registrar account transfer / change of registrant |
| ☐ | DNS | Points the domain at Vercel | _to confirm (registrar or Vercel)_ | Same as registrar unless moved |
| ☐ | GitHub repository | Stores the website code | _to create_ | Settings → Transfer ownership |
| ☐ | Vercel | Hosts the website | _to create_ | Create team under owner; or Project → Settings → Transfer |
| ☐ | Sanity | Content dashboard | _to create_ | Project → Members: add owner as Administrator, then remove developer |
| ☐ | Formspree | Stores customer requests | _to create_ | Best created directly by the owner; otherwise change account email |
| ☐ | Google Analytics 4 | Visitor statistics | _to create_ | Admin → Access management: add owner as Administrator |
| ☐ | Google Search Console | Google search health | _to create_ | Settings → Users: add owner as Owner |

**Preferred approach:** the owner creates each account and invites the developer as a temporary collaborator. After launch, remove developer access (section 5).

## 2. Domain & DNS
- Domain: `everydaytechrepair.com`
- Registrar: **_to be filled in_** · Renewal date: **_to be filled in_** · Auto-renew: **_confirm ON_**
- DNS records needed (shown in Vercel → Project → Settings → Domains):
  - Apex `everydaytechrepair.com` → Vercel's A record
  - `www` → Vercel's CNAME, redirecting to the apex
- If the business uses email on this domain, **do not remove existing MX/TXT records** when editing DNS.

## 3. Hosting & deployment
- Vercel builds and deploys automatically whenever code is pushed to the `main` branch on GitHub. HTTPS certificates are issued and renewed automatically.
- Content edits in Sanity do **not** need a deploy.
- Environment variables live in Vercel → Project → Settings → Environment Variables (list in README.md).
- Roll back a bad deploy: Vercel → Deployments → pick the last good one → Promote to Production.

## 4. Credential transfer procedure
1. Owner creates accounts with their own email and a password manager; enable two-factor authentication on each.
2. Owner invites the developer where setup help is needed. Never share passwords by email or text.
3. `SANITY_REVALIDATE_SECRET` is generated fresh, entered in Vercel and in the Sanity webhook, and stored nowhere else.
4. After launch, the owner removes the developer from every service.

## 5. Post-launch cleanup (developer removal)
- ☐ GitHub: remove collaborator
- ☐ Vercel: remove team member
- ☐ Sanity: remove project member
- ☐ Formspree: confirm no developer access or forwarding address
- ☐ Google Analytics / Search Console: remove user
- ☐ Rotate `SANITY_REVALIDATE_SECRET` if the developer ever saw it

## 6. Outstanding work and known limitations

**Blocked on information from the owner**
- Verified phone, email, service area, business hours (and whether to show an address).
- Confirmed service list and any "common issues" per service.
- Owner name, bio, photo; real project photos; real customer reviews; Google reviews link.
- Review and approval of the Privacy Policy draft (`/privacy`).
- Final approval of the visual design.

**Blocked on accounts**
- Sanity project not yet created: Studio login, content editing, and publish-to-live have **not** been tested end to end.
- Formspree forms not yet created: real submission storage, email notifications, photo delivery, and export have **not** been tested end to end. (Validation, photo handling, duplicate-submit prevention, failure handling, and the success screen were tested locally, including a real request to Formspree using a non-existent form ID.)
- Vercel, GA4, and Search Console are not yet connected.

**To verify once Formspree is live**
- Whether uploaded-photo links require a Formspree login. Formspree's documentation does not say. Until confirmed, treat the links in notification emails as private and do not forward them.
- Behavior when the monthly submission limit is exceeded.

**Design notes**
- The supplied brand files include only the full-color logo and icon. A reversed (light) logo for dark backgrounds would improve the footer (DECISIONS.md #12).

**Not in scope for this release:** product inventory, online checkout, repair status tracking, customer accounts, appointment scheduling.
