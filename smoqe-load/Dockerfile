# Production image for smoqe-load (Payload 3 · Next.js 15).
# Multi-stage: install → build → slim runtime. Uses `next start` (NOT Next
# standalone output) on purpose: payload.config dynamically imports the DB
# adapter (`await import('@payloadcms/db-postgres')`), which Next's standalone
# file-tracing can drop from the bundle and break at runtime.

FROM node:22-bookworm-slim AS base
ENV PNPM_HOME="/pnpm" \
    PATH="/pnpm:$PATH" \
    NEXT_TELEMETRY_DISABLED=1
# ca-certificates/openssl: DB TLS + sharp's glibc runtime deps.
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates openssl \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable \
    && corepack prepare pnpm@9 --activate
WORKDIR /app

# ---- deps (all deps — dev deps are required to build) ----
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- build ----
FROM base AS build
# Real secrets are injected at runtime by Coolify. This placeholder only keeps
# config loading happy during `next build`; it is not present in the final image.
ENV NODE_ENV=production \
    PAYLOAD_SECRET=build-time-placeholder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ---- runtime ----
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000
RUN useradd --system --uid 1001 nodejs
COPY --from=build --chown=nodejs:nodejs /app ./
USER nodejs
EXPOSE 3000
# Schema is auto-synced on boot via the adapter's `push` (see payload.config.ts).
# Once you generate migration files post-launch, switch this to:
#   CMD ["sh", "-c", "pnpm payload migrate && pnpm start"]
CMD ["pnpm", "start"]
