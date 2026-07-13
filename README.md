# Slim's Smoqe Signals BBQ — Website

A modern rebuild of [smoqesignals.com](https://smoqesignals.com): a Nashville BBQ
food truck + catering business with an online dry-rub shop, blog, catering
requests, and newsletter.

Two apps, mirroring the Alkebu-Lan stack:

| Folder        | What it is | Runs on |
| ------------- | ---------- | ------- |
| **`smoqe-web/`**  | SvelteKit 5 storefront (Tailwind v4, mdsvex) — the public site | **Cloudflare Pages** |
| **`smoqe-load/`** | Payload CMS 3 backend (Next.js 16) — content, shop, orders, inbox, Stripe | **Your VPS** |

During local development without a configured backend, the storefront falls
back to bundled seed data (`smoqe-web/src/lib/data/seed.ts`). Production returns
honest empty/error states when Payload is unavailable.

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
cp .env.example .env
corepack pnpm install
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
  group; writes require the private storefront route and staff can read them.
  New submissions email `STAFF_NOTIFICATION_EMAIL`.
- `media`, `users` + a `siteSettings` global.

**Stripe** — set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and
`STRIPE_AUTOMATIC_TAX=true`.
Point a Stripe webhook at `https://<backend>/api/stripe-webhook` for the
checkout session completed/expired/async payment events plus `charge.refunded`.
Shipping is flat-rate (`FLAT_SHIPPING_RATE` cents), free at/above
`FREE_SHIPPING_THRESHOLD`.

**Images** — local disk in dev. Set the `R2_*` vars to push uploads to
Cloudflare R2 in production (S3-compatible).

**Email** — without SMTP creds, notification emails are logged to the console
(`jsonTransport`). Add `SMTP_*` + `FROM_EMAIL` to send for real (e.g. Amazon SES).

---

## 2. Frontend — `smoqe-web` (SvelteKit)

```bash
cd smoqe-web
cp .env.example .env
corepack pnpm install
pnpm dev                      # http://localhost:5173
```

- `PAYLOAD_API_URL` — base URL of the backend. Leave it unset only for local
  seed-data development.
- `STOREFRONT_API_KEY` — an independent 32+ character secret that exactly
  matches the backend value. It stays server-side on Cloudflare.
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
corepack pnpm install --frozen-lockfile
SKIP_ENV_VALIDATION=1 corepack pnpm build
corepack pnpm start
```

Put it behind Nginx/Caddy with TLS at e.g. `payload.smoqesignals.com`. Set all
production env vars from `smoqe-load/.env.example`, including distinct
`PAYLOAD_SECRET` and `STOREFRONT_API_KEY` values of at least 32 characters,
Postgres, Stripe, SMTP, HTTPS origins, and R2. Register the Stripe webhook.

For the first empty database, start once with `PAYLOAD_DB_PUSH=true`, verify the
schema, then set it back to `false`. Use Payload migrations for later releases.

**Frontend (Cloudflare Pages)** — connect the repo, set build dir to `smoqe-web`:

- Build command: `pnpm build`
- Output directory: `.svelte-kit/cloudflare`
- Environment variables: `PAYLOAD_API_URL=https://payload.smoqesignals.com`,
  `PUBLIC_SITE_URL=https://smoqesignals.com`, and the shared
  `STOREFRONT_API_KEY`

---

## Brand

Flame orange `#d6451a`, smoke charcoal `#14100c`, warm cream `#fbf4e9`, TN-tristar
blue `#5cb8e6`. Display type **Anton**, body **Hanken Grotesk**. Logos and photos
live in `smoqe-web/static/images/`. Tagline: *Nashville Bred · Memphis Approved ·
Tennessee Tradition.*
