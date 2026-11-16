# Owner Guide

A plain-language guide to running your website. No technical background needed.

Your website has two separate "back offices":

- **The content dashboard** (Sanity Studio) is where you change what the website *says and shows*.
- **Formspree** is where customer requests *arrive and are stored*.

---

## Part 1: Changing your website

### Open the dashboard
1. Go to **everydaytechrepair.com/studio**
2. Sign in with the account you were given at handoff.

The menu on the left lists everything you can edit: Business Information, Homepage, About Page, Services, Completed Work, and Customer Reviews.

### How saving works
- Changes save automatically as a **draft**. Drafts are not public.
- Click the green **Publish** button (bottom right) to make a change live.
- Published changes appear on the website within about a minute. If you don't see one, refresh the page. In rare cases it can take up to an hour.

### Change your phone number, email, hours, or service area
1. Click **Business Information**.
2. Edit the fields. Hours are under the **Hours & Area** tab.
3. Click **Publish**.

Anything you leave empty is simply hidden on the website. A street address only appears if you fill in "Public address".

### Add repair photos / create a portfolio entry
1. Click **Completed Work**, then the **+** (pencil) icon at the top of the list.
2. Fill in the title, device type, brand, and model, and describe the work.
3. Open the **Photos** tab. Drag in a **Main photo** (required). Optionally add **Before** and **After** photos and extra photos.
4. Give each photo a short description (helps Google and people using screen readers).
5. Turn on **Feature this project** if you want it eligible for the homepage.
6. Click **Publish**.

Before uploading, check that no personal information is visible: lock screens, names, addresses, serial numbers. Never mention a customer by name.

The "Our Work" page and its menu link appear automatically once you publish your first project.

### Publish a customer review
1. Click **Customer Reviews**, then **+**.
2. Enter the customer's display name (for example "Jordan M.") and paste their real words.
3. Add a star rating only if they gave one. Choose where the review came from.
4. Turn on **Feature on homepage** for your best ones.
5. Click **Publish**.

Only publish genuine reviews. To hide one without deleting it, turn off **Show on website** and publish.

### Edit services
1. Click **Services**, then the one you want to change (or **+** for a new one).
2. Edit the name, description, device types, and icon.
3. Under **Common issues**, list only problems you actually fix.
4. **Display order**: lower numbers appear first.
5. **Show on website**: turn off to hide a service.
6. Click **Publish**.

Avoid listing prices or promising turnaround times unless you can always honor them.

### Edit homepage or About text
Click **Homepage** or **About Page**, change the text, and click **Publish**. On the About page, leave a blank line between paragraphs.

---

## Part 2: Customer requests

### See repair requests and device-selling submissions
1. Go to **formspree.io** and sign in.
2. You'll see two forms: **Repair Requests** and **Sell Your Device Requests**.
3. Click a form, then **Submissions**. Newest are at the top.

You also get an email for each new request. Replying to that email replies straight to the customer.

### Find customer photos
Photos are attached to each submission in Formspree. Open the submission and click the file links (shown as photo_1, photo_2, and so on). The notification email contains links to the photos rather than the photos themselves.

### Export submissions
Open a form → **Submissions** → **Export**, then choose CSV (opens in Excel or Google Sheets). Exporting requires a paid Formspree plan.

### Keep things tidy
- Your Formspree plan has a monthly submission limit and a photo storage limit (see COSTS.md). If storage fills up, Formspree deletes the **oldest** photos first.
- Every few months, export what you want to keep and delete old submissions you no longer need. This also protects your customers' privacy.
- Check the **Spam** tab occasionally in case a real request landed there.

---

## Part 3: Getting help

| Problem | Who to contact |
|---|---|
| Can't log into the content dashboard | Sanity: sanity.io/help |
| Requests not arriving, or Formspree billing | Formspree: help.formspree.io |
| Website is down, or hosting billing | Vercel: vercel.com/help |
| Domain name renewal or email on your domain | Your domain registrar (see HANDOFF.md) |
| Visitor statistics | Google Analytics: support.google.com/analytics |

**You can do yourself:** all text, photos, services, reviews, hours, contact details; reading and exporting requests.

**Needs a developer:** new pages or features, design changes, changing the questions on the forms, fixing errors, and software updates (see MAINTENANCE.md). Any web developer familiar with Next.js can do this; you are not tied to Peakline Media.
