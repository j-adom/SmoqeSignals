# smoqesignals.com Site Updates — Design Spec

**Date:** 2026-06-16
**Source:** Client comments from Shon (5 items)
**App:** `smoqe-web/` — SvelteKit, content rendered from `src/lib/data/seed.ts` (fallback when Payload CMS is unreachable)

## Goal

Implement five client-requested changes to the Smoqe Signals BBQ site: tagline addition,
fleshed-out catering terms for legal protection, separation of truck booking from catering,
removal of menu prices, and an always-on holiday-meats promotion.

## Decisions (locked)

- **Truck vs catering:** Two separate pages — new `/food-truck` and a slimmed `/catering`.
- **Tagline order:** Keep `Nashville Bred · Memphis Approved · Tennessee Tradition`. Only add the
  "Tennessee Tradition" line to hero headings that currently stop at "Memphis approved".
- **Prices:** Remove menu prices from **both** pages (fully contact-to-quote). Fee/policy facts
  (service fee, minimums, trash fee, etc.) remain as *terms* — they are not menu pricing.
- **Holiday promo:** Always-on section on the home page, live immediately.
- **Terms layout:** Highlight cards on top + readable prose terms below (matches live-site structure).

## Architecture

Most changes are **data edits in `seed.ts`** plus **one new route** and a **shared form component**.

### New / changed routes
- `src/routes/food-truck/+page.svelte` (new) — truck menu + truck booking form.
- `src/routes/food-truck/+page.server.ts` (new) — `submit` action (mirrors catering, shared validation helper).
- `src/routes/catering/+page.svelte` — slimmed to catering-only: catering menu, "What We Offer" + terms, catering request form.
- `src/routes/catering/+page.server.ts` — refactored to use shared validation helper.

### Shared component (refactor "as we go")
- `src/lib/components/RequestForm.svelte` (new) — extract the inline catering form. Props:
  - `context: 'truck' | 'catering'` — drives heading/copy.
  - `serviceStyles: string[]` — page-specific options.
  - `form` — the action result passthrough.
- Shared server validation helper in `src/lib/server/` (or `src/lib/utils.ts`) consumed by both `+page.server.ts` actions to avoid duplicated logic.

## Item-by-item

### 1. Tagline — add "Tennessee Tradition"
- About hero `<h1>` at `src/routes/about/+page.svelte:35` — append the "Tennessee Tradition" line to "Nashville bred, Memphis approved".
- Home hero already renders full `BIZ.tagline` (`src/routes/+page.svelte:70`) — verify, no change needed.
- No tagline-order changes anywhere.

### 2. "What We Offer" / catering terms (legal protection)
Replace the thin 4-card `CATERING_REQS` with two data blocks, rendered on `/catering`:
- **`WHAT_WE_OFFER`** (highlight bullets): $300 order minimum (~20 people), 48-hr notice,
  cancellation policy (24-hr window → 50% within 24 hrs), full-service 1-week notice,
  delivery options ("Delivery Only" / "Set Up and Serve"), tailor-made menus.
- **`CATERING_TERMS`** (prose paragraphs, "Catering Made Easy"):
  - Full-service: 2-week (14-day) advance notice; final details confirmed 2 weeks out; lead time
    for tastings/site visits/insurance.
  - Signed contract on file + card on file; full-service **$1,000** food/drink minimum (before
    service fees, gratuity, tax).
  - Cancellation tiers: **100%** within 48 hrs of arrival; **50%** within 1 week but before 48 hrs.
  - Minimum **2** team members for full-service events.
  - Cleanup scope: buffet/prep area + pre-bussing; rental scraping/stacking (no washing/sanitizing).
  - Trash: buffet/prep trash included; full event-trash removal optional at **$450**.
  - Other facts: **15%** service fee on food + beverage; paper-goods set **$1.75/person**
    (plates, cups, wet naps, culinary set, dinner napkin); wire chafing sets **$15/set**;
    food delivered in disposable aluminum trays; **$300** delivery minimum before tax & fee.
- Layout: highlight cards (numbered/icon) on top, terms prose below.

### 3. Separate truck booking from catering
Split `MENU` into:
- **`TRUCK_MENU`** — walk-up/event style: Pulled Pork Plate, Beef Brisket Plate, Smoked Wing
  Basket, Veggie Pulled "Pork", plus sides. Rendered on `/food-truck`.
- **`CATERING_MENU`** — by-the-pound meats + sides (+ optional package framing for buffets/
  full-service). Rendered on `/catering`.
- Nav (`src/lib/components/Nav.svelte`): add **"Catering"** link; repoint **"Book the Truck"** → `/food-truck`.
- Repoint other "Book the Truck" CTAs: home (`src/routes/+page.svelte:73`), About (`src/routes/about/+page.svelte:91`).
- Footer (`src/lib/components/Footer.svelte`): update `/catering#requirements` and add/adjust links for the new structure.
- FAQs split: truck space/power FAQs → `/food-truck`; deposit/dietary/booking FAQs → `/catering`.
  (Implement as `TRUCK_FAQS` / `CATERING_FAQS` or a tag field on `FAQS`.)

### 4. Remove prices (both pages)
- Stop rendering `price` (`$/lb`, `$/pt`, `$/ea`) on truck and catering menus.
- Remove the "50% deposit secures your date" figure line under the catering form.
- Keep fee/policy facts in the Terms block (they are terms, not menu pricing).
- `price` fields may be dropped from the menu data or simply left unrendered — prefer removing from data for cleanliness.

### 5. Holiday meats promotion (always-on home section)
- New **`HOLIDAY_MEATS`** data: Turkeys (Deep-Fried or Smoqed), Double Smoqed Honey Hams — each
  with a short description; section-level CTA to contact/pre-order.
- New home-page section styled to match existing home sections, placed after the services row
  in `src/routes/+page.svelte`.

## Testing / verification

- Build passes (`npm run build` / type-check) — no broken imports after the form refactor.
- `/food-truck` and `/catering` render with their respective menus and no prices.
- All "Book the Truck" links resolve to `/food-truck`; "Catering" nav link resolves to `/catering`.
- Both request forms submit successfully (success state renders) via their `+page.server.ts` actions.
- Holiday section visible on home; About/home hero headings show the Tennessee line.
- No leftover `$`-prefixed menu prices on either page.

## Out of scope

- No Payload CMS schema changes (working from `seed.ts` fallback; CMS can mirror later).
- No unrelated refactors beyond the form extraction.
- No real payment/deposit processing changes.
