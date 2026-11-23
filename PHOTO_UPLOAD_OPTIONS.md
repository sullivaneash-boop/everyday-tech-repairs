# Photo uploads: options for the business owner

Research checked 23 November 2026. This is a proposal, not a connected integration. No new account, storage destination or subscription was added. The existing forms still send only to Formspree; Sanity remains public website content only.

## Why the current upload fails

The reported “File Uploads Not Permitted” response is consistent with Formspree withholding the file-upload entitlement. Its [official upload guide](https://help.formspree.io/articles/building-your-form/file-uploads) requires Personal, Professional or Business. The current account plan could not be verified because the owner requested stopping Formspree browser work. The multipart request already sends actual files correctly without overriding the browser's boundary. Compressing images further or renaming fields will not unlock a missing entitlement.

The site now gives a clearer failure message and retains the entries/photos in the current page. It does not silently submit without photos or claim success. No new live submission was made during this investigation.

## Compare by the owner's daily workflow

| Option | Owner workflow | Cost / limits | Change required |
|---|---|---|---|
| Keep Formspree, enable Personal | Receive inquiry email; open photo links; use the existing submission dashboard | $15/month or $120/year; 200 submissions/month; 1 GB uploads | Account plan decision; no new provider or form rebuild |
| Replace inquiry collection with Tally Free | Receive all answers and clickable photo links by email; review the submission and files together in one dashboard | Free subject to fair use; 10 MB per file; standard notification/branding | Rebuild both forms and embed them; move inquiry storage to Tally; update privacy disclosures |
| Layer Cloudinary uploads into current forms | Receive Formspree email with Cloudinary photo links; two services to administer | Image and Video API free tier: 25 monthly credits shared across usage; paid capacity may become necessary | Direct browser upload followed by Formspree link submission; access control, abuse prevention, deletion and failed-submission cleanup required |

Sources: [Formspree pricing](https://formspree.io/plans), [Tally uploads](https://tally.so/help/file-uploads), [Tally owner emails](https://tally.so/help/self-email-notifications), [Tally pricing](https://tally.so/help/plans-and-pricing), [Cloudinary pricing](https://cloudinary.com/pricing).

## Recommendation

For the easiest free owner workflow, evaluate **Tally Free** first. A single submission keeps contact details, device condition and photos together, with an email notification and a dashboard. Customers do not need a Tally account to upload. This replaces the forms with embedded Tally forms; it is not a drop-in upload endpoint for the current custom React forms. Tally Pro is $29/month if removing its branding or customizing notification emails becomes necessary. Do not promise the exact branded HTML design until the editor capabilities and a delivered email are tested.

Keeping Formspree Personal remains the smallest implementation change and keeps the existing interface. Cloudinary is technically suitable as an upload layer, but a second storage system adds operational work and privacy decisions. It is not the first choice for a straightforward owner handoff.

## Access and privacy decisions before implementation

- The owner must select the provider and authorize any customer-data destination beyond Formspree. Exploring options does not authorize migrating customer records or creating paid services.
- Tally dashboard downloads require the owner's login. Tally documents that exported/integration file URLs contain access tokens and can be opened without login until the submission is deleted. Treat those links as private. Test actual notification links on the owner's phone before promising their login behavior.
- Cloudinary public URLs are not authenticated access. A secure design needs a deliberate choice of private/authenticated delivery and upload authorization; never place API secrets in browser variables. An unrestricted unsigned upload preset is not an acceptable default. See [Cloudinary upload documentation](https://cloudinary.com/documentation/upload_images#unsigned_upload).
- Keep inquiry photos out of Sanity, Git, logs and analytics. Update the privacy policy and owner deletion/retention instructions for the selected service.

## Acceptance test for the chosen option

Use owner-controlled test details and non-customer images. Verify both forms' required fields, required sell photo and ownership confirmation; five phone photos; mobile camera/file selection; duplicate prevention; failed uploads; submission limits; and successful storage plus email receipt. From the owner's normal phone, open every photo, reply to the customer address, find the same record in the dashboard and delete it. Confirm whether forwarded links retain access. Record actual outcomes before calling the integration complete.

No alternative has been tested end to end or selected yet.
