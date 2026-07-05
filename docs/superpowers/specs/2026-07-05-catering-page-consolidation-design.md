# Catering Page Consolidation + Jump Nav — Design

**Date:** 2026-07-05
**Scope:** `smoqe-web/src/routes/catering/+page.svelte`, `smoqe-web/src/lib/data/seed.ts`, one new component

## Problem

The catering page states the same facts in up to four places, and two of those
statements contradict each other:

- **Cancellation policy conflict.** The "What we offer" card says cancellations
  within 24 hours incur a 50% charge (`WHAT_WE_OFFER` in seed.ts). The
  "Catering made easy" terms say 100% within 48 hours and 50% within 7 days
  (`CATERING_TERMS`). Likely the card describes drop-off orders and the terms
  describe full-service events, but neither is labeled.
- **Notice conflict.** The card says "48-hour notice"; the FAQ says 2 weeks for
  full-service.
- **Duplicates:** $300 minimum (card + FAQ, near-verbatim); 2-week full-service
  notice (card + FAQ + terms); chafing/paper goods/setup (extras chips +
  packages note + menu footer + 2 FAQs); Veggie Pulled "Pork" (meats list +
  menu footer + dietary FAQ); "contact us for a quote" phrasing (5 places).

Separately, key sections (Packages, FAQs) are easy to miss on a long page; the
user wants in-page wayfinding without crowding the hero (which stays at two
CTAs + the food-truck text link).

## Design

### 1. Jump-link bar — new `PageJumpNav.svelte` component

- Slim horizontal bar rendered directly below the hero.
- Links: **Menu · Packages · What's Included · FAQs**, plus a compact
  **Request a Quote** button aligned right.
- Sticky below the site header (`Nav.svelte` is `sticky top-0 z-50`); the bar
  uses `sticky` with a top offset equal to the header height and a lower
  z-index. Horizontally scrollable on mobile (no wrapping).
- Anchor targets already exist (`#menu`, `#packages`, `#terms`, `#faqs`,
  `#request`). Increase their `scroll-mt-*` values to account for header + bar
  height so jumps land cleanly.
- Component takes a `links: { label: string; href: string }[]` prop plus an
  optional CTA link, so the food-truck page can adopt it later. Wiring it up on
  other pages is **out of scope**.

### 2. Content consolidation — one source of truth per fact

- **Retire the `WHAT_WE_OFFER` card grid** (constant and markup). Rehome its
  unique content:
  - 48-hour drop-off notice merges into the existing "How far in advance?"
    FAQ, scoped: drop-off vs full-service.
  - "Tailor-made menus" + delivery/set-up options become one sentence in the
    menu intro copy.
  - Everything else in the grid is a duplicate and is dropped.
- **Cancellation policy stated once, scoped.** New FAQ "What's the
  cancellation policy?" gives the short version per service type and points to
  the full terms below. `CATERING_TERMS` remains the authoritative legal text.
  - **OPEN — blocks launch:** the drop-off cancellation numbers (currently
    24 hr / 50%) and their relationship to the full-service terms (48 hr /
    100%, 7 day / 50%) must be confirmed with Shon. Until then the new FAQ
    carries the presumed scoping with a `TODO(shon)` comment in seed.ts.
- **Drop the menu footer note** ("Full-service setup, chafing dishes … Veggie
  Pulled 'Pork' …" at the bottom of the menu column) — every fact in it lives
  elsewhere (extras chips, packages note, meats list, dietary FAQ).
- **Trim "contact us for a quote" phrasing** from the menu intro and
  `CATERING_PACKAGES_NOTE`. The hero CTA, per-package buttons, and jump bar
  CTA carry that job.
- The former "What we offer" section header goes away; the terms block keeps
  its own heading and `#terms` id, and the jump bar labels it "What's
  Included".

### 3. Unchanged

Hero (two buttons + truck link), menu structure, packages grid, request form,
FAQ accordion component, testimonials, newsletter band. The FAQ JSON-LD
(`FAQPage` schema) is generated from `CATERING_FAQS` and automatically picks up
the new cancellation FAQ.

## Error handling

No new runtime surfaces: the component is presentational, links are static
anchors. Only failure mode is bad scroll offsets, covered by manual checks.

## Testing

- `npm run build` and type check pass.
- Manual: each jump link lands with the section heading fully visible under
  the sticky bars, at mobile (~375px) and desktop widths.
- Manual: FAQPage JSON-LD still parses (view source) and includes the new
  cancellation question.
- Grep check: each consolidated fact ($300 minimum, cancellation, notice,
  chafing/paper goods, Veggie Pulled "Pork") appears in exactly one prose
  location on the page (menu/package data listings excluded).
