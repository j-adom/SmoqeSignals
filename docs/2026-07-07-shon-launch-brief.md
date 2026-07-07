# SmoQe Signals Website — Launch Brief for Shon

**Date:** July 7, 2026
**From:** Jordan
**Re:** Your rework notes — what's happening with them, what we need from you, and how the site actually works behind the scenes.

---

## 1. Where things stand

Your full set of notes is in and every item is going into the site — Contact, The History, Catering, Food Truck, Shop, and Home. Nothing was cut. A few things you asked for are **already built**:

- **The catering jump nav** (Menu / Packages / What We Offer / FAQs / Request a Quote) went in last week — exactly the quick-access bar your SEO advice called for.
- **Single-page catering** with all the legal/policy info on one page (no separate legal page) is already how it's structured, for the same indexing reason.
- Your **Catering Made Easy** copy settled the one open policy question we'd been holding: the drop-off deposit rule (cancel within 24 hours = forfeit 50% of deposit, day-of = non-refundable) is now the official language on the site.

The work rolls out in batches: Catering first, then the request forms, Food Truck, The History, Contact Us, and Home + Shop together. You'll get a new preview link to review when done.

---

## 2. Questions we need you to answer

Quick ones — reply inline, a sentence each is plenty.

1. **"Unfold the catering page and food truck page"** (from your Contact notes) — we read this as *add clear links from the Contact page out to the Catering and Food Truck pages*. Is that right, or did you mean something else?
2. **The shop launches with 2 products: one dry rub + the eBook.** Which rub is *the* rub — Slim's Original Shake-A-Rub, or a different blend?
3. **Wing sauces differ between the two pages.** Catering lists: BBQ, Honey Gold, Lemon Pepper, BBQ Lemon Pepper, Lime Pepper, Honey Hot, Buffalo Lemon Pepper, Honey Hot Lemon Pepper (last three mild or hot). Truck lists: BBQ, Honey Gold, Honey Hot, Honey Hot Lemon Pepper, BBQ Lemon Pepper, Hot, Buffalo, Lime Pepper. Intentional, or should they match?
4. **Wood list.** Your History copy says "hickory, oak, and fruit woods like cherry and Georgia peach"; your Home box says "hickory, oak, cherry, and apple." Fine to leave each as written, or pick one canonical list?
5. **Facebook.** We have Instagram (@smoqesignalsbbq). What's the exact Facebook page URL for the Contact page photo overlay? Do you have any other social links?
6. **Online payments — Square or Stripe?** Do you already run Square on the truck? If so, we can plug the website's checkout into your existing Square account, so truck sales and web sales land in one place with one set of reports. Otherwise (or if you prefer to keep them separate), we set up a Stripe account — the standard for online stores, about a 5-minute signup, payouts straight to your bank. Fees are nearly identical either way (~2.9% + 30¢ per online sale, no monthly cost). Tell us which, and if Square, we'll need you to add Jordan as a developer/team member on the account to wire it up.

---

## 3. Assets to send us

- [ ] **The food truck photo at the ballpark** — the one from the old contact page, highest resolution you've got. We'll rebuild that block with Instagram + Facebook overlaid, below the map.
- [ ] **Dry rub thumbnail** — you said it's ready. Square works best, 1200×1200px or larger, JPG or PNG.
- [ ] **eBook cover/thumbnail** — same specs.
- [ ] **The first blog post** — text plus any photos, whenever you're ready to send it, along with the new name for the blog section.

---

## 4. Accounts & setup on your side

- [ ] **StreetFoodFinder.** For the truck schedule you asked about — yes, we can embed it. StreetFoodFinder gives vendors a calendar widget we can drop straight into the Food Truck page, and you update your schedule in their app and it shows on our site automatically. **You need to claim/create the SmoQe Signals vendor account there.** Once you have it, send us the account/page name.
- [ ] **holidays@smoqesignals.com** — does this mailbox exist yet? Here's the thing though: you may not need it. Every form submission (holiday pre-orders included) lands in the site's dashboard automatically, tagged by type, so nothing lives or dies by an inbox. If you still want holiday inquiries forwarded to a dedicated address, Jordan can create the mailbox and we'll wire the notification.
- [ ] **The eBook file itself** — *not* needed for launch. It sells as a pre-order with manual delivery, so we just need the cover art now and the final file whenever it's done (Late Summer, per your copy).

---

## 5. How the site works (please read — saves you money)

The only accounts you may need to touch are StreetFoodFinder and the payment account from question 6. Everything else is already running. Here's the stack in plain terms:

**The website itself is custom-built.** No WordPress, no Squarespace, no Wix. It runs on Cloudflare's global network, which means it loads fast everywhere and there are no plugins to break or monthly page-builder fees. Search engines get clean, fast pages — which is the whole reason your SEO advice (single catering page, one URL per topic) works here.

**Content lives in a dashboard (Payload CMS).** Payload is professional open-source software that Jordan hosts — it does the same job as a WordPress admin, minus the plugin roulette and subscription fees. It holds:

- **Blog posts** — you can write and publish yourself, or send copy to Jordan.
- **Shop products** — names, prices, descriptions, photos, and stock status are editable by you.
- **Every form submission** — catering requests, truck bookings, contact messages, holiday pre-order inquiries — each tagged by type. When someone fills out a form at 11pm, it's sitting there in the morning, not buried in an email thread.
- **Newsletter signups and shop orders** — same place.

You'll get a login and a walkthrough. One honest boundary so there are no surprises: things that change often (posts, products, incoming requests) are self-serve in the dashboard. Page copy, menus, prices on the catering/truck pages, and policy text are built into the site itself — that's what makes it fast and index well — so those changes go through Jordan. Send an edit, it's typically live same-day.

**Newsletter: do NOT set up Mailchimp.** The "Join the Newsletter" signups on the site are collected automatically and feed into **listmonk**, a mailing platform Jordan already runs. It does everything Mailchimp does — subscriber lists, campaigns, send tracking — with no per-subscriber monthly fee. When you want to send a newsletter, that happens from listmonk; you'll get access and a walkthrough. Signing up for Mailchimp would just create a second list the website doesn't talk to.

**Shop checkout and payments.** The cart on the site hands customers to a secure hosted payment page powered by whichever account we land on in question 6 (your Square, or a new Stripe). The card details never touch our site — the payment provider handles security, and you issue any refunds from their dashboard. Completed orders land in the Payload dashboard alongside everything else. With the 2-product store (rub + eBook pre-order), fulfillment is manual and simple: rub ships, eBook gets delivered by email when it's out.

**No third-party software subscriptions.** No Mailchimp, no Wix, no plugin fees — the dashboard, newsletter platform, and hosting all run on Jordan's infrastructure. The only per-transaction cost is the card-processing fee every business pays.

---

## 6. Running it day to day — what you're committing to

This is the honest picture of what operating the site looks like after launch, so you can decide now if it's how you want to run things. None of it is heavy, but your own copy promises *"we read every message and get back to you fast"* — the site delivers the messages; the "fast" part is you.

**A catering or truck request comes in.** It lands in the dashboard, tagged by type, with the customer's name, contact info, date, guest count, budget, and how they heard of you. The site never auto-books anything — every request is a lead, and closing it (quote, deposit, contract) happens between you and the customer by phone or email. **Your commitment: check the dashboard (or the notification email) daily and respond within a day.** A catering lead that waits three days books someone else.

**A shop order comes in.** You get a notification and the order appears in the dashboard. A rub order means you pack and ship it — you set the shipping expectation, we print it on the site. An eBook pre-order means *nothing to do* until release day; then we email the file to every buyer in one send through listmonk. Refunds, if ever needed, are a button in your Square/Stripe dashboard.

**Holiday pre-orders.** "Join the List" on the home page files people into the dashboard under Holiday Pre-Order. When your holiday menu and prices are set, you tell us (or the list directly, via listmonk) and we announce it. The earlier you lock the menu, the more the list is worth.

**Publishing a blog post.** Log into the dashboard, write, hit publish — or send Jordan the text and photos and it goes up for you. Either path works; pick whichever you'll actually do.

**Sending a newsletter.** From listmonk. Realistic cadence beats ambitious cadence — one good email a month beats four you never send.

**Updating the truck schedule.** In the StreetFoodFinder app, same as you'd update it for their audience — the website reflects it automatically. A stale schedule on a page that says "catch our schedule below" is worse than no schedule, so this only ships if you'll keep it current.

**Changing menus, prices, or page copy.** Send it to Jordan — typically live same-day. Products and blog posts you can change yourself in the dashboard.

If any of these flows doesn't match how you want to operate — say, you'd rather requests go straight to email and skip the dashboard, or you want someone else on your team handling orders — say so now and we'll wire it that way before launch instead of after.

---

## 7. TL;DR — your to-do list

| # | Item | Blocking what |
|---|------|---------------|
| 1 | Answer the 6 questions in section 2 | Catering, Truck, Contact, Shop batches |
| 2 | Square or Stripe decision (question 6) | Shop checkout going live |
| 3 | Send ballpark truck photo | Contact page photo block |
| 4 | Send rub + eBook thumbnails | Shop + Home |
| 5 | Claim StreetFoodFinder vendor account | Truck schedule section |
| 6 | Decide on holidays@ mailbox (optional) | Holiday notification routing |
| 7 | First blog post + blog section name | Blog launch |
| 8 | Read section 6 and flag anything that doesn't fit how you want to operate | Final wiring before launch |

Everything else is on us. Send what you've got as you've got it — batches ship in the meantime with placeholders where assets are pending.
