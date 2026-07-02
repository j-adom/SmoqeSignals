# eBook Pre-Order Landing Page — Design Spec

**Date:** 2026-06-16
**Source:** Client request (Shon) — market the forthcoming eBook and let people buy it from the site; a QR code will point to the landing page.
**Apps:** `smoqe-web/` (SvelteKit frontend) **and** `smoqe-load/` (Payload + Stripe backend)

## The product

- **Title:** *The Art of Pulled Pork*
- **Subtitle:** *A Pitmaster's Guide*
- **Author:** Shon "Slim" Harmon
- **Brand:** Smoqe Signals BBQ — dark/flame aesthetic, Tristar-in-flames mark, tagline *Nashville Bred · Memphis Approved · Tennessee Tradition*
- **Pre-order price:** **$9.99** (starting point)
- **Status:** Forthcoming — sold as a **pre-order**, delivered at launch.

## Decisions (locked)

- **Availability:** Pre-order now, deliver the file at launch.
- **Cart model:** **One combined cart** — the eBook checks out in the same cart/payment as physical rubs, through the existing Payload → Stripe pipeline.
- **Fulfillment:** **Manual.** No automated digital delivery is built; Shon delivers the file (email/download link) at launch. Automated delivery is a future, separate project.
- **Mixed-order timing:** A single payment may include rubs (ship now) + the pre-order book (delivered at launch); order/confirmation copy states this plainly.
- **URL:** `/ebook` — short and memorable for the QR code.

## Key constraint driving the design

The current checkout (`smoqe-load/src/app/api/checkout/route.ts`) **always** collects a US shipping
address and adds a shipping rate to every order, and prices each item by slug from the `products`
collection. A digital pre-order breaks two assumptions: it has no shipping, and "in stock / ships in
2–5 days" does not apply. The design bends both **without** breaking the physical-goods flow.

## Backend changes (`smoqe-load`)

1. **Products collection** (`src/collections/Products.ts`):
   - Add `eBook` to the `category` select options.
   - Add a `digital` checkbox (default `false`). When true, the item requires no shipping.
   - (Pre-order is surfaced via the existing `tag` text field → `"Pre-Order"`.)
2. **Checkout route** (`src/app/api/checkout/route.ts`):
   - Determine whether the priced cart is **digital-only** (every line item's product has `digital === true`).
   - **Digital-only:** create the Stripe session with **no** `shipping_address_collection` and **no** `shipping_options` (shipping = 0).
   - **Mixed or physical-only:** keep current behavior (address + shipping rate).
   - Stamp `metadata` on the session (and/or order) noting a pre-order item is present, for fulfillment visibility.
3. **Seed/import** (`smoqe-load`): add the eBook product (slug `art-of-pulled-pork-ebook`, price `9.99`, `category: 'eBook'`, `digital: true`, `tag: 'Pre-Order'`, `inStock: true`, cover image) so the live backend can price and check it out.
4. **Orders:** existing line-item capture is sufficient; pre-orders appear in admin for manual fulfillment. (Optional: a small `notes`/flag if helpful — not required for v1.)

## Frontend changes (`smoqe-web`)

1. **Product type** (`src/lib/types.ts`): add optional `digital?: boolean` (and treat `tag === 'Pre-Order'` as the pre-order signal). Mirror the field in the Payload REST mapper (`src/lib/server/payload.ts`).
2. **Seed fallback** (`src/lib/data/seed.ts`): add the eBook product so it renders in dev/fallback and can be added to the cart.
3. **New route `/ebook`** (`src/routes/ebook/+page.svelte`): marketing landing page —
   - Hero with the cover image, title/subtitle/author, brand tagline.
   - Pitch + "what's inside" list.
   - Primary **Pre-Order — $9.99** button → `cart.add(ebook)` (opens the cart drawer → existing checkout).
   - Clear "Pre-order · delivered at launch" / mixed-timing note.
   - SEO: `noindex` until launch is acceptable (preview), or normal meta when live — decide at launch.
4. **Cart drawer** (`src/lib/components/CartDrawer.svelte`): for a `digital`/pre-order line, suppress size/shipping copy and show **"Pre-order · delivered at launch."** Keep the "free shipping over $45" messaging only when a physical item is present.
5. **Discoverability:** add `/ebook` to nav and/or footer (and optionally a home-page teaser) — placement TBD with Shon, not required for v1.
6. **Cover asset:** place the cover image in `static/images/` (e.g. `ebook-cover.png`).

## Testing / verification

- Build + type-check pass in both apps.
- Adding the eBook to an empty cart and checking out (test mode) produces a Stripe session with **no shipping address step**; total = $9.99.
- Adding the eBook **plus** a rub still collects a shipping address and charges shipping on the physical portion.
- `/ebook` renders the cover, $9.99 pre-order CTA, and the delivery-at-launch note.
- Order is recorded in Payload admin with the eBook line item for manual fulfillment.

## Out of scope (v1)

- Automated digital file delivery (manual fulfillment at launch instead).
- Tax handling beyond current behavior.
- Generating the QR code (Shon generates it, pointing at `/ebook`).
- Multi-format/bundle SKUs, discounts, affiliate/external-platform selling.
