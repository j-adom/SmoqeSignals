# SmoQe Signals — Post-Launch To-Do / Backlog

**Created:** 2026-07-10
**Context:** Items intentionally deferred past the Tuesday 2026-07-14 launch so the hard deadline (site + blog #1 + rub/eBook pre-sale, with forms QA solid) isn't put at risk. Nothing here is launch-critical.

---

## 1. Truck schedule — Events collection + "Upcoming Stops" list

**Decision (2026-07-10):** Host the truck schedule **on Shon's own site**, not an embedded StreetFoodFinder widget. Rationale: an SFF embed's click-throughs push warm traffic into a marketplace that cross-sells competing trucks — which runs against Shon's owned-audience launch strategy. Keeping the schedule on-domain also keeps the brand, the customer relationship, and the SEO (schedule indexes on smoqesignals.com, not SFF) with Shon.

- Shon's **SFF vendor page** (`streetfoodfinder.com/followtheSmoQe`) stays live as a top-of-funnel discovery net; optionally a small "Also find us on StreetFoodFinder" link in the footer. It is **not** featured as the on-site schedule.
- **Hinge to confirm with Shon:** he keeps the schedule current in **one** place — the website dashboard. (If he'll realistically only update the SFF app, revisit; a stale own-calendar is worse than none.)

**Scope for this item — the LIST only (approved 2026-07-10).** Few upcoming events for the near future, so ship a simple list, not a calendar grid.

- **Backend — Payload `events` collection** (`smoqe-load`):
  - `date` (date, required)
  - `startTime`, `endTime` (service window)
  - `venue` (text — e.g. "First Tennessee Park")
  - `address` (text; drives a Google Maps link)
  - `notes` (text, optional — e.g. "Private event", menu note)
  - `link` (text, optional — external event/ticket page)
  - Sort ascending by `date`; frontend surfaces upcoming (`date >= today`).
- **Frontend — "Upcoming Stops" section** on `/food-truck` (`smoqe-web`):
  - Simple list: date · service window · venue · address (map link) · optional note.
  - Empty state (no upcoming dates): friendly fallback — "No dates on the calendar right now" + Book-the-Truck CTA + IG/FB — never a stale "catch our schedule below" with nothing under it.
  - Add a couple of `events` to `seed.ts` fallback so it renders in dev / backend-down.
- **Launch note:** the current `/food-truck` "View Truck Menu" CTA (jumps to the on-page menu) is fine to ship as-is Tuesday; the schedule is a fast-follow.

## 2. Improved calendar feature (front-end) — SPEC LATER

Once the list is live and there's a real volume of events, write a design spec for a richer schedule UI: month/week view, grouping, recurring stops, "add to calendar" (ICS), map view, filtering. Deferred until the list proves out and event volume justifies it.

## 3. Automated eBook digital delivery — SPEC LATER

Launch fulfills the eBook pre-order **manually** (one batch send via listmonk at release, per the 2026-06-16 spec). Shon asked about auto-delivering the file at purchase — feasible *after* release for ongoing sales (pre-orders can't auto-send a file that doesn't exist yet). Post-launch: spec automated digital delivery (secure download link / emailed file on paid order) as a separate project.

## 4. Postgres migrations (replace `push: true`) — POST-LAUNCH HARDENING

Launch bootstraps the DB schema with `push: true` on the Postgres adapter (auto-sync on boot) because no migration files exist yet. Post-launch: generate real migrations (`pnpm payload migrate:create`), commit them, set `push` off, and switch the Docker CMD to `pnpm payload migrate && pnpm start`. Migrations are the safe way to evolve a production schema without risking data.

---

_Update this doc as launch shakes out new deferrals._
