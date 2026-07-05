# Catering Page Consolidation + Jump Nav Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** De-duplicate the catering page's policy copy (one source of truth per fact) and add a sticky jump-link bar under the hero so Packages/FAQs are never missed.

**Architecture:** A new presentational `PageJumpNav.svelte` component sticks below the 74px site header. Content consolidation happens in `seed.ts` (retire `WHAT_WE_OFFER`, scope the cancellation/notice facts into `CATERING_FAQS`) with matching markup removal in the catering route.

**Tech Stack:** SvelteKit (Svelte 5 runes), Tailwind, TypeScript. No unit-test framework in this repo — verification is `svelte-check`, `vite build`, lint, and grep assertions.

**Spec:** `docs/superpowers/specs/2026-07-05-catering-page-consolidation-design.md`

## Global Constraints

- Site header (`Nav.svelte`) is `sticky top-0 z-50` with height `h-[74px]` — the jump bar must use a lower z-index and `top-[74px]`.
- Anchor sections currently use `scroll-mt-24` (96px); they must become `scroll-mt-32` (128px ≈ 74px header + ~50px bar).
- The hero keeps exactly two buttons + the food-truck text link — do not add hero CTAs.
- The drop-off cancellation numbers are UNCONFIRMED — the new FAQ ships with a `TODO(shon)` code comment and must not be reworded as settled fact elsewhere.
- Source files use tabs for indentation (match Prettier config).
- All commands run from `smoqe-web/` unless noted; commits run from the repo root.

---

### Task 1: PageJumpNav component + wiring into the catering page

**Files:**
- Create: `smoqe-web/src/lib/components/PageJumpNav.svelte`
- Modify: `smoqe-web/src/routes/catering/+page.svelte` (insert bar after hero `</section>`; change five `scroll-mt-24` → `scroll-mt-32`)

**Interfaces:**
- Produces: `PageJumpNav` with props `links: { label: string; href: string }[]` and optional `cta: { label: string; href: string }`. Task 2 relies on the anchor ids `#menu`, `#packages`, `#terms`, `#faqs`, `#request` staying stable.

- [ ] **Step 1: Create the component**

Create `smoqe-web/src/lib/components/PageJumpNav.svelte`:

```svelte
<script lang="ts">
	let {
		links,
		cta
	}: {
		links: { label: string; href: string }[];
		cta?: { label: string; href: string };
	} = $props();
</script>

<nav
	aria-label="On this page"
	class="sticky top-[74px] z-40 border-b border-paper-line bg-paper/85 backdrop-blur-md"
>
	<div class="container-wide flex items-center gap-1 overflow-x-auto py-2">
		{#each links as l (l.href)}
			<a
				href={l.href}
				class="whitespace-nowrap rounded px-3.5 py-2 text-[13.5px] font-bold text-char transition-colors hover:text-flame"
			>
				{l.label}
			</a>
		{/each}
		{#if cta}
			<a href={cta.href} class="btn btn-primary btn-sm ml-auto whitespace-nowrap">{cta.label}</a>
		{/if}
	</div>
</nav>
```

- [ ] **Step 2: Wire it into the catering page**

In `smoqe-web/src/routes/catering/+page.svelte`, add the import alongside the other component imports:

```ts
	import PageJumpNav from '$lib/components/PageJumpNav.svelte';
```

Immediately after the hero section's closing `</section>` (the hero is the block containing `<h1 class="display ...">Great BBQ for any occasion</h1>`), insert:

```svelte
	<PageJumpNav
		links={[
			{ label: 'Menu', href: '#menu' },
			{ label: 'Packages', href: '#packages' },
			{ label: "What's Included", href: '#terms' },
			{ label: 'FAQs', href: '#faqs' }
		]}
		cta={{ label: 'Request a Quote', href: '#request' }}
	/>
```

- [ ] **Step 3: Fix scroll offsets**

In the same file, replace every `scroll-mt-24` with `scroll-mt-32` (five occurrences: `#menu`, `#request`, `#packages`, the `#offer` section, `#terms`).

- [ ] **Step 4: Verify**

Run from `smoqe-web/`:
```bash
npm run check && npm run build
```
Expected: 0 errors from svelte-check; build succeeds.

Then `npm run dev` and manually confirm at desktop and ~375px width: the bar sticks under the header while scrolling, each link lands with the section heading fully visible, and the bar scrolls horizontally on mobile without wrapping.

- [ ] **Step 5: Commit**

```bash
git add smoqe-web/src/lib/components/PageJumpNav.svelte smoqe-web/src/routes/catering/+page.svelte
git commit -m "Add sticky jump nav to catering page

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Content consolidation (seed.ts + catering page markup)

**Files:**
- Modify: `smoqe-web/src/lib/data/seed.ts` (~lines 328–433: `CATERING_PACKAGES_NOTE`, `CATERING_FAQS`, delete `WHAT_WE_OFFER`)
- Modify: `smoqe-web/src/routes/catering/+page.svelte` (menu intro, menu footer note, "what we offer + terms" section)

**Interfaces:**
- Consumes: anchor ids from Task 1 (`#terms` must survive the section restructure).
- Produces: `CATERING_FAQS` gains one entry (feeds the FAQPage JSON-LD automatically); `WHAT_WE_OFFER` no longer exists — nothing else imports it (verified: only the catering route uses it).

- [ ] **Step 1: Update the advance-notice FAQ in seed.ts**

In `CATERING_FAQS`, replace the first entry's answer:

```ts
	{
		q: 'How far in advance do I need to book?',
		a: 'We ask for at least 2 weeks notice on full-service events so we have the supplies and meats ready for the long smoking process. For drop-off and delivery orders, 48 hours notice lets us craft your feast to perfection — reach out and we will tell you straight what is possible.'
	},
```

- [ ] **Step 2: Add the scoped cancellation FAQ in seed.ts**

Insert after the `'How do deposits work?'` entry (end of `CATERING_FAQS`):

```ts
	// TODO(shon): confirm drop-off cancellation window/charge and how it relates
	// to the full-service terms (48 hr / 100%, 7 day / 50%) before launch.
	{
		q: 'What is the cancellation policy?',
		a: 'For drop-off and delivery orders, please allow at least 24 hours for cancellations — within 24 hours of your scheduled delivery, a 50% charge applies. Full-service events follow the cancellation terms in the "Catering made easy" section on this page.'
	}
```

- [ ] **Step 3: Trim the quote phrasing from the packages note**

In `CATERING_PACKAGES_NOTE`, change the final sentence

`Servers, additional meats, sides, and desserts are available on request — contact us for a quote.`

to

`Servers, additional meats, sides, and desserts are available on request.`

- [ ] **Step 4: Delete WHAT_WE_OFFER from seed.ts**

Remove the constant and its leading comment entirely:

```ts
// Highlight bullets for the "What We Offer" block on the catering page.
export const WHAT_WE_OFFER = [ ... ];   // delete the whole block
```

- [ ] **Step 5: Update the catering page markup**

In `smoqe-web/src/routes/catering/+page.svelte`:

a. Remove `WHAT_WE_OFFER` from the seed import list.

b. Replace the menu intro paragraph body (currently "Build your event around our meats and sides. We confirm the final menu and pricing after we review your details — contact us for a quote.") with:

```
Build your event around our meats and sides. Menus can be tailored to your
preferences, dietary needs, and budget — delivered drop-off, or set up and
served full-service. We confirm the final menu and pricing after we review
your details.
```

c. Delete the menu footer note — the whole `<p class="mt-6 border-t ...">Full-service setup, chafing dishes, utensils, and disposables available on request. Our Veggie Pulled "Pork" keeps vegetarians in on the BBQ.</p>` element.

d. Replace the entire `<!-- what we offer + terms -->` section (the `<section id="offer" ...>` block) with:

```svelte
	<!-- terms -->
	<section id="terms" class="scroll-mt-32 border-t border-paper-line bg-paper-2 py-[88px]">
		<div class="container-wide">
			<SectionHead eyebrow="Before we roll up" title="Catering made easy" />
			<div class="mt-8 max-w-3xl space-y-4 text-[15px] leading-relaxed text-ink-soft">
				{#each CATERING_TERMS as p (p)}
					<p>{p}</p>
				{/each}
			</div>
		</div>
	</section>
```

(The `#offer` id disappears; nothing links to it. The jump bar's "What's Included" link targets `#terms`, which now lives on the section element itself.)

- [ ] **Step 6: Verify single-source-of-truth**

Run from the repo root:
```bash
grep -rn "WHAT_WE_OFFER" smoqe-web/src
```
Expected: no matches.

```bash
grep -cn "contact us for a quote" smoqe-web/src/lib/data/seed.ts smoqe-web/src/routes/catering/+page.svelte
```
Expected: 1 match at most (the `CATERING_MENU` intro in seed.ts if present; zero in the route).

Confirm each fact now appears in exactly one prose location on the page: $300 minimum (FAQ only), cancellation (FAQ + authoritative terms, scoped), 48-hour/2-week notice (FAQ only), Veggie Pulled "Pork" (meats list + dietary FAQ only).

- [ ] **Step 7: Build, check, lint**

Run from `smoqe-web/`:
```bash
npm run check && npm run build && npm run lint
```
Expected: all pass. Then in `npm run dev`, view page source and confirm the FAQPage JSON-LD includes "What is the cancellation policy?".

- [ ] **Step 8: Commit**

```bash
git add smoqe-web/src/lib/data/seed.ts smoqe-web/src/routes/catering/+page.svelte
git commit -m "Consolidate catering policy copy to single sources of truth

Retires the WHAT_WE_OFFER grid (facts rehomed into scoped FAQs),
drops duplicate menu footer note, trims repeated quote CTAs.
Drop-off cancellation numbers flagged TODO(shon) pending confirmation.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```
