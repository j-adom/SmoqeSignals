# Shon Round-2 Notes — Certain Updates (Design)

**Date:** 2026-07-07
**Source:** Shon's second round of website rework notes (July 7), reconciled against the live implementation. This spec covers only the items that are *not* blocked on Shon's pending answers/assets (see `docs/2026-07-07-shon-launch-brief.md` for the blocked list). Approved by Jordan for immediate implementation and deploy to the demo Cloudflare site.

## Deferred (blocked on Shon)

- Contact-page truck-at-ballpark photo block with IG/FB overlay (needs photo + FB URL)
- Shop catalog prune to 2 products + eBook product creation (needs rub confirmation + thumbnails)
- Home SmoQe Shop rub/eBook thumbnail tiles (needs thumbnails; section renames now, keeps featured grid)
- StreetFoodFinder schedule embed on truck page (needs vendor account)
- holidays@ email routing (backend/mailbox decision)
- Payments provider wiring (Square vs Stripe — question out)

## Routes

- `/contact` → **`/contact-us`**; `/about` → **`/the-history`**. Folder renames plus 301 redirects from the old paths (SvelteKit `redirect(301)` in a `+page.server.ts` at the old path — old URLs are indexed/sitemapped). Nav, Footer, sitemap, and internal links updated.

## Contact Us (`/contact-us`)

- Tab title "Contact Us"; hero eyebrow "Contact Us", H1 "Get in Touch".
- Phone / email / PO Box collapse from three cards into **one box**.
- New closing paragraph (verbatim from Shon): "SmoQe Signals food truck is located in Nashville, TN since 2012. Whether it's booking the truck, planning a catering order, or just a question — we read every message and get back to you fast."
- Add prominent links out to `/catering` and `/food-truck` (our reading of "unfold" — cheap to adjust if Shon means otherwise).
- Contact form: add **Holiday Pre-Order** to the `inquiryType` dropdown; support `?inquiry=holiday` (and other values) pre-selection via query param for the home-page "Join the List" CTA.

## The History (`/the-history`)

- Eyebrow under Tristar: "The History". Remove "West Tennessee taught us the fire…" subhead.
- Founding story replaced with Shon's three-part copy (Bridgestone origin / Warrior AL smoker + clubs + "FoodTruck" / West TN tradition + booking close).
- Pitmaster section: new Slim bio (Paris TN merger, cookbook Late Summer 2026, journey book Fall 2027, Project 1410 Spring 2027).
- New blockquote: the Facebook Live smoke-signals origin quote, attributed "— Slim, from The Art of Pulled Pork (available Late Summer 2026)".
- Stats boxes → 2012 porch / 2016 first truck / 2027 flagship.
- "Patience over shortcuts" keeps title; body becomes the fundamentals quote from the book. CTA stays "Book the Truck".

## Catering (`/catering`)

- Hero: title "Catering and Events"; intro = Shon's "Elevate your event…" copy.
- Jump nav labels: Menu / Packages→**Packages** anchor now targets the new features section renamed appropriately (label "What We Offer" per Shon: Menu / Packages / What We Offer / FAQs / Request a Quote). "What We Offer" targets `#terms` ("Catering Made Easy").
- Menu: "The spread" title removed; list **centered**, **no descriptions**, **no desserts**; new categories Pork / Beef / Poultry / Vegetarian / Seafood with Shon's items verbatim; Sides = BBQ Baked Beans, Cole Slaw, Potato Salad, Green Beans, Mac & Cheese (Pint/Quart/Full Pan; vegetarian friendly unless specified); Extras = BBQ Sauce, Buns, Paper Goods, Chafing Dishes, Set Up, Cups, Ice.
- Packages section replaced by three feature cards: Whole Hog (feeds 125–150, market price), Wings (25/50/100, 8 sauces, last three mild-or-hot), Tailgate.
- Terms: "Before we roll up" → "**Catering Made Easy**", structured as **Standard & Delivery Orders** + **Full-Service Events** bullet groups, Shon's copy verbatim. This locks the previously-TODO drop-off deposit numbers (24 hr = 50% deposit forfeit; day-of non-refundable).
- FAQs replaced with Shon's set (adds "What is the Full-Service setup?", merges cancellation into deposits FAQ, drops per-person paper-goods pricing).
- Request form moves from sticky right column to **full-width section at the very bottom**; menu becomes single centered column.

## Food Truck (`/food-truck`)

- Hero: H1 "The food truck that turns any event into a cookout." / small line "Nashville Bred, Memphis Approved, Tennessee Tradition." / Shon's subhead.
- Menu head: "Fresh Off the Smoker" + Shon's sub copy (walk up or order ahead / reverse-flow smoker / event pricing).
- "Plates & Baskets" → **Smoked Meats**: Pulled Pork, Beef Brisket, Smoked Sliced Turkey Breast, Veggie Pulled Pork (vegetarian option).
- Sides → Smoked BBQ Beans, Creamy Cole Slaw, Golden French Fries. Specialty unchanged (BBQ Fries, Mega Fries, BBQ Nachos, Mega Nachos, Smack'n Mac'n Cheese).
- Wings: 6/12/18; sauces BBQ, Honey Gold, Honey Hot, Honey Hot Lemon Pepper, BBQ Lemon Pepper, Hot, Buffalo, Lime Pepper (as written; differs from catering intentionally-pending-confirmation).
- Form moves to bottom, full width. "View Truck Menu" CTA stays until the StreetFoodFinder account exists.

## Request form (shared)

New optional fields on `RequestForm`, parsed and forwarded by `handleRequestSubmit` → Payload `cateringRequests` (backend tolerates extra fields; fallback mode queues):

- **Event time** (`eventTime`, time input)
- **Location / delivery address** (`location`, text — one field serves both asks, labeled "Event location or delivery address")
- **Budget** (`budget`, text)
- **How did you hear of us?** (`hearAbout`, select: Google/Search, Instagram, Facebook, Word of Mouth, Saw the Truck, Other)

## Home (`/`)

- Hero sub → "Authentic West TN BBQ, {years} years running — book the truck for your event, or shop the dry rubs and seasonings we built it on." with years computed from `BIZ.founded`. **One CTA**: Book the Truck.
- Section: eyebrow → "Nashville Bred, Memphis Approved, Tennessee Tradition."; title → "Follow the Smoqe"; sub → the drive-out-of-your-way quote attributed to Shon "Slim" Harmon, *The Art of Pulled Pork: A Pitmaster's Guide* (out Late Summer 2026).
- Instagram section retitled to keep "Follow us on the gram" ownership clear (no duplicate "Follow the SmoQe" headings).
- 3 boxes → "225°F. Patience Does the Rest." / "Real Wood. No Shortcuts." / "Food Truck Service" with Shon's bodies.
- Holiday: blurb → "Make the holidays easy — let us handle the centerpiece. Spots go fast. Join the list and we'll reach out with pre-order details as soon as they open."; primary CTA **"Join the List"** → `/contact-us?inquiry=holiday`; "Call 615-429-4851" stays.
- Shop section: eyebrow → "The SmoQe Shop" (featured grid stays until thumbnails arrive).
- Pitmaster: title "Slim, the Man Behind the Smoke"; Shon's new copy + book quote; closing line "The menu is Nashville Bred, Memphis Approved, Tennessee Tradition."
- Blog section untouched (Shon renames with first post).

## Shop (`/shop`)

- Eyebrow "The SmoQe Shop"; H1 "Everything you need to bring the SmoQe home."; sub "All natural dry rubs, seasonings, small batch sauces, and recipe eBooks to master the craft."; tab title updated.
- Value boxes → All Natural ("No MSG, no gluten. Just spices, salt, and smoke.") / Pit-Tested ("Every blend earns its place on the truck before it hits the shelf.") / Small Batch ("Nashville bred, mixed in small batches with Slim's own secret blend of hand-picked spices.").
- Catalog untouched this round (prune deferred).

## Verification

`svelte-check` clean, production build passes, manual spot-check of the six pages + both redirects, then deploy via `wrangler pages deploy` to the demo project.
