# Slim's Smoqe Signals BBQ — Website

A modern rebuild of [smoqesignals.com](https://smoqesignals.com): a Nashville BBQ
food truck + catering business with an online dry-rub shop, blog, catering
requests, and newsletter.

Two apps, mirroring the Alkebu-Lan stack:

| Folder        | What it is | Runs on |
| ------------- | ---------- | ------- |
| **`smoqe-web/`**  | SvelteKit 5 storefront (Tailwind v4, mdsvex) — the public site | **Cloudflare Pages** |
| **`smoqe-load/`** | Payload CMS 3 backend (Next.js 15) — content, shop, orders, inbox, Stripe | **Your VPS** |

The storefront reads content from Payload over its REST API and **falls back to
bundled seed data** (`smoqe-web/src/lib/data/seed.ts`) whenever the backend is
unreachable — so the site always renders, even before the backend is deployed.

```
                 REST (products, posts)         Local API
  Browser ──▶ smoqe-web (Cloudflare) ──────▶ smoqe-load (VPS) ──▶ SQLite / Postgres
     ▲             │  forms + checkout            │
     └─────────────┘  proxied server-side         ├──▶ Stripe (hosted checkout)
                                                   └──▶ SMTP (catering / contact alerts)
```

---

## 1. Backend — `smoqe-load` (Payload CMS)

```bash
cd smoqe-load
cp .env.example .env          # set PAYLOAD_SECRET at minimum
pnpm install
pnpm dev                      # http://localhost:3000/admin
pnpm seed                     # optional: admin user + starter catalog & posts
```

- Admin UI: `http://localhost:3000/admin`
- REST API: `http://localhost:3000/api/<collection>` (e.g. `/api/products`, `/api/blogPosts`)
- GraphQL: `http://localhost:3000/api/graphql`
- After changing collections: `pnpm generate:types`

**Database** — SQLite locally (`smoqe.db`), PostgreSQL in production. Just point
`DATABASE_URI` at a `postgres://…` string and the adapter switches automatically.

**Collections**

- `products` — dry rubs, seasonings, sauces, gift sets, gear (the shop)
- `blogPosts` — blog (Lexical rich text, draft/published)
- `orders` — created on checkout, flipped to *paid* by the Stripe webhook
- `cateringRequests`, `contactMessages`, `newsletterSubscribers` — the **Inbox**
  group; public can submit, staff read. New submissions email
  `STAFF_NOTIFICATION_EMAIL`.
- `media`, `users` + a `siteSettings` global.

**Stripe** — set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.
Point a Stripe webhook at `https://<backend>/api/stripe-webhook` for the
`checkout.session.completed` event. Shipping is flat-rate (`FLAT_SHIPPING_RATE`
cents), free at/above `FREE_SHIPPING_THRESHOLD`.

**Images** — local disk in dev. Set the `R2_*` vars to push uploads to
Cloudflare R2 in production (S3-compatible).

**Email** — without SMTP creds, notification emails are logged to the console
(`jsonTransport`). Add `SMTP_*` + `FROM_EMAIL` to send for real (e.g. Amazon SES).

---

## 2. Frontend — `smoqe-web` (SvelteKit)

```bash
cd smoqe-web
cp .env.example .env          # set PAYLOAD_API_URL to your backend
pnpm install
pnpm dev                      # http://localhost:5173
```

- `PAYLOAD_API_URL` — base URL of the backend. **Leave it unset to run purely on
  seed data** (great for design work without the CMS running).
- Forms (newsletter / catering / contact) and checkout are proxied **server-side**
  through SvelteKit (`src/routes/api/*`, `+page.server.ts` actions) to Payload, so
  the browser never talks to the backend directly and no CORS is needed.

**Routes**: `/` · `/shop` · `/shop/[slug]` · `/catering` · `/blog` ·
`/blog/[slug]` · `/about` · `/contact`.

**Build** (Cloudflare adapter): `pnpm build` → output in `.svelte-kit/cloudflare`.

---

## 3. Deploy

**Backend (VPS)** — build a container or run directly:

```bash
cd smoqe-load
pnpm install && pnpm build && pnpm start    # Next.js on :3000 behind your reverse proxy
```

Put it behind Nginx/Caddy with TLS at e.g. `payload.smoqesignals.com`. Set all
production env vars (`DATABASE_URI` → Postgres, `PAYLOAD_SECRET`, Stripe, SMTP,
`FRONTEND_URL=https://smoqesignals.com`). Register the Stripe webhook.

**Frontend (Cloudflare Pages)** — connect the repo, set build dir to `smoqe-web`:

- Build command: `pnpm build`
- Output directory: `.svelte-kit/cloudflare`
- Environment variables: `PAYLOAD_API_URL=https://payload.smoqesignals.com`,
  `PUBLIC_SITE_URL=https://smoqesignals.com`

---

## Brand

Flame orange `#d6451a`, smoke charcoal `#14100c`, warm cream `#fbf4e9`, TN-tristar
blue `#5cb8e6`. Display type **Anton**, body **Hanken Grotesk**. Logos and photos
live in `smoqe-web/static/images/`. Tagline: *Nashville Bred · Memphis Approved ·
Tennessee Tradition.*
