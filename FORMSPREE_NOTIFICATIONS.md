# Lead notification emails

Audit: 16 November 2026. Repair form: `mvkakjvv`. Sell form: `mwloldwa`.

## What can be changed without a subscription change

`src/lib/forms/payloads.ts` supplies both forms' labelled fields, ordering, subject, photo labels, and multipart data. The browser still sends directly to Formspree. No inquiry data or photos pass through the website server, Sanity, or another service.

- Contact first: first name, last name, phone, `email`.
- Device and issue/condition next, followed by address and optional details.
- Subjects identify request type, brand/model (or category/other description), first name and surname initial. Subject fragments are bounded, single-line, and stripped of template braces.
- `email` stays lowercase because Formspree uses it for Reply-To. The documented `subject` field replaces `_subject`.
- Empty optional fields are omitted. `Photos Included` gives the count; files use `Photo 1` through `Photo 5`. Form inputs, validation keys, required values, ownership confirmation and photo requirements are unchanged.
- Formspree controls the final email layout, ordering, link rendering and delivery. Payload order is verified locally; inbox ordering, clickable phone/email, Reply-To and photo-link access still need an actual delivery check. Local CSS cannot style these emails.

## Custom templates and cost gate

[Formspree's template documentation](https://help.formspree.io/articles/advanced-features/setting-custom-email-templates) requires **Business**, and forms must belong to a project. Templates are Mustache HTML with a required `{{_unsubscribe}}` link. Upload fields are lists of URLs. A template-level subject overrides the form's subject.

[Published pricing](https://formspree.io/plans), checked 16 November 2026: **Business $90/month, or $720/year ($60/month equivalent)**. Personal is $15/month or $120/year; Professional is $30/month or $240/year. File uploads start at Personal, while custom templates start at Business.

The current account plan was **not verified**: the available browser session required login, and the owner then requested stopping Formspree browser work. No template was installed, no subscription changed, and no live submission was sent. Do not describe the notification emails as visually branded or end-to-end tested.

If Business is already active, prepare separate repair/sell notification templates in that project's Templates tab, preview them, then apply to the matching forms. Use tables, inline styles, Deep Navy `#07182E`, Cyan `#08B8F5`, Blue `#1478ED`, Off-White `#F4F7FB`, Montserrat/Arial headings and Inter/Arial body text. Lead with contact/device/issue, use `tel:`/`mailto:` links, and iterate each `Photo N` field as URL links. Keep the unsubscribe link and use `{{subject}}` for the template subject. Never put raw/unescaped submitted text into HTML.

If Business is not active, stop for the owner's cost decision before any upgrade. The repository-side improvements above do not require an upgrade. There is no alternative email service or backend.

## Delivery checklist (still open)

Use only owner-controlled synthetic contact details for an explicitly authorized test, sent to Formspree only. Check both form inbox entries and received notifications, subject, field order, Reply-To, all five photo links, phone/email tap targets, optional blanks, spam behavior, and upload-plan limits. Do not copy customer submissions into repository fixtures or logs.

Sources: [subject on all plans](https://help.formspree.io/articles/building-your-form/email-subject-line/), [special fields](https://help.formspree.io/articles/building-your-form/special-fields), [templates](https://help.formspree.io/articles/advanced-features/setting-custom-email-templates), [pricing](https://formspree.io/plans).

## Upload investigation — 23 November 2026

The reported “File Uploads Not Permitted” response is consistent with the documented paid upload entitlement. Pricing above was rechecked; the account's actual plan remains unverified. The submit handler now explains this failure and preserves inputs/photos without silent resubmission. Mocked regression tests cover both error response shapes, intact multipart files and successful/rate-limited responses. This does not enable uploads. See [PHOTO_UPLOAD_OPTIONS.md](PHOTO_UPLOAD_OPTIONS.md) for the requested owner-friendly alternatives and approval decisions.
