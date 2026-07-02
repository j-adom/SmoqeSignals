# Site Migration Gap — Triage & Backlog

**Date:** 2026-07-01
**Source:** `Smoqe_Signals_Gap_Analysis.pdf` (auditor: another Claude, for Shon) + our own cross-reference.
**Architecture (locked):** Keep the Payload backend (`smoqe-load`) + SvelteKit frontend (`smoqe-web`). Chosen over a single-app/markdown model because Shon will self-manage products and blog posts and the shop needs structured product/order data + Stripe.

## Decisions locked
- **Catering pricing:** Contact-to-quote — port all package/menu structure with **no prices** ("Contact for a quote" / "Call for inquiries"). Overrides the audit's push to show prices. (Shon's standing instruction.)
- **Full-service lead time:** standardized on **2 weeks** (audit's "What We Offer" bullet says 1 week; the detailed terms say 2 weeks — 2 weeks is the protective/legal figure).

## Corrections to the audit
- **Audit reflects our recent work** (food-truck split, "What We Offer", Collard Greens, current meat list, new FAQ questions) — several "gaps" are already built in the working tree.
- **Gap #7 (FAQ answers "missing"):** our `CATERING_FAQS`/`TRUCK_FAQS` contain full answers; the auditor likely read collapsed accordions. **Verify post-deploy, do not rebuild.**
- **Pricing push (audit priority #1):** conflicts with Shon's decision — declined per above.

---

## Phase 0 — Deploy to clear already-done items
- [ ] Redeploy `smoqe-web`; confirm these now show correctly: catering/food-truck split, "What We Offer" + terms, catering & truck FAQ **answers**, "Tennessee Tradition" motto.

## Phase 1 — Launch blockers (technical/SEO) ✅ DONE (except GSC, a launch-day action)
- [x] Fix `robots.txt` — replaced static file with a domain-aware `/robots.txt` endpoint.
- [x] Generate a real `sitemap.xml` — dynamic `/sitemap.xml` endpoint (static routes + shop + blog).
- [x] Open Graph + Twitter Card meta tags site-wide (root layout).
- [x] Structured data: LocalBusiness/Restaurant (layout), Product (shop pages), FAQPage (catering + food-truck).
- [ ] Submit new domain to Google Search Console at launch. *(manual, launch day)*

## Phase 2 — Content ports (seed.ts + markup; contact-to-quote, no prices) ✅ DONE
**Catering**
- [x] Catering Packages section: Meat & 3, Lunch, Dinner, Tailgate Wings, Whole Hog — structure + inclusions, no prices; "Request a Quote."
- [x] Expand catering meats: Chopped Chicken, Pork Ribs (Half/Full), Pork Rib Tips, Turkey Tips, Whole Hog ("call for inquiries"), Beef Sausage Links, Veggie Pulled "Pork" as selectable.
- [x] Desserts: Banana Pudding, Seasonal Cobbler.
- [x] Sides & extras: added Green Beans **and** kept Collard Greens (Shon: both), portion note (Pint/Quart/Full Pan), itemized extras (BBQ Sauce, Buns, Paper Goods, Chafing Dishes, Cups, Ice, Set Up).

**Food Truck**
- [x] Specialty/loaded items: BBQ Fries, Mega Fries, BBQ Nachos, Mega Nachos, Smack'n Mac'n Cheese, plus Fries side.
- [x] Wings detail: deep-fried, 6/12/18-piece, seven sauces (BBQ, Honey Gold, Honey Hot, Lemon Pepper, Buffalo Lemon Pepper, Honey Hot Lemon Pepper, BBQ Lemon Pepper).
- [x] Hero copy: "Some of the best BBQ in town" + cruisin'/schedule framing.

**About**
- [x] Restored verbatim founder bio (Shon "Slim" Harmon, Paris TN, uncles Clyde & Clay, Pee Wee origin), "Follow the SmoQe" tagline, reverse-flow smoker + Hickory/Oak/Cherry-Apple wood detail, locally-sourced sides line.

## Phase 3 — Features / embeds (mostly done)
- [x] Contact **inquiry-type dropdown** (General / Booking The Truck / Catering) — wired end-to-end (form → server action → Payload `inquiryType` field → admin + email subject/row).
- [x] Google Map embed on Contact (Nashville service area, keyless `output=embed`).
- [x] Social links in footer — Facebook + Instagram (Twitter omitted; no active account per Shon).
- [~] Instagram on home — built a "Follow us on the gram" section (our photos → Instagram). NOTE: not a live auto-updating feed; that needs a widget (Behold/SnapWidget) or the IG Graph API.
- [ ] Truck schedule/location tracker (larger — calendar or map of upcoming stops). *(deferred)*

## Phase 4 — Legal / trust (mostly done)
- [x] Privacy Policy page (`/privacy-policy`) — drafted from actual setup. **Needs attorney review before launch.**
- [x] Terms of Service page (`/terms`) — drafted. **Needs attorney review before launch.**
- [x] Shipping & Returns page (`/shipping-returns`) — drafted (US, flat $6.50 / free >$45, consumable-food return stance, digital final). **Needs attorney review.**
- [~] Reviews/testimonials — section + component built (data-driven, self-hides while empty). **Awaiting Shon's real quotes** (add to `TESTIMONIALS` in seed.ts, or wire a Payload collection so he self-manages).

## Phase 5 — Growth (post-launch)
- [ ] Newsletter incentive ("$5 off first rub order") + welcome flow.
- [ ] Content engine (recipes, pit tips, Nashville-vs-Memphis).
- [ ] Press/about-for-media page (West TN roots, 12-yr story, Black-owned).
- [ ] Shop CRO: product reviews/ratings, multi-rub bundle, post-purchase upsell.
- [ ] Felicia St "Visit Us" page (VERIFY location current).

## Verify with Shon
- [x] Catering pricing — RESOLVED: contact-to-quote (no prices).
- [x] Green Beans / Collard Greens — RESOLVED: include both.
- [x] Twitter/X — RESOLVED: no active account; add social links later (Facebook + Instagram only for now).
- [ ] Felicia St "Grab & Go" location + extra items (pulled chicken, ribs by piece, catfish, crawfish boils) — real or stale aggregator data?

## Not porting (intentional)
- Old "Site Designed by UrVoyce" credit (previous dev's).
- Old copyright typo "SmoQe Signals BBS" (already corrected).
- Old broken `/about-us/` "History" link (was broken on old site too).
