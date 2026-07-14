# Production image for smoqe-load (Payload 3 · Next.js 16).
# Multi-stage: install → build → slim runtime. Uses `next start` (NOT Next
# standalone output) on purpose: payload.config dynamically imports the DB
# adapter (`await import('@payloadcms/db-postgres')`), which Next's standalone
# file-tracing can drop from the bundle and break at runtime.

FROM node:22-bookworm-slim AS base
# COREPACK_HOME must be a fixed, world-readable path populated here (as root).
# It defaults to $HOME/.cache/node/corepack, and the runtime user below is a
# --system user with no writable home, so Corepack would EACCES trying to
# re-verify pnpm on every `pnpm` invocation in the runner stage.
ENV PNPM_HOME="/pnpm" \
    COREPACK_HOME="/pnpm/corepack" \
    PATH="/pnpm:$PATH" \
    NEXT_TELEMETRY_DISABLED=1
# ca-certificates/openssl: DB TLS + sharp's glibc runtime deps.
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates openssl \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable \
	&& corepack prepare pnpm@11.12.0 --activate \
	&& chmod -R a+rX /pnpm
WORKDIR /app

# ---- deps (all deps — dev deps are required to build) ----
FROM base AS deps
# Force dev deps to install even if the platform (e.g. Coolify) injects
# NODE_ENV=production at build time — `next build` needs typescript et al.
ENV NODE_ENV=development
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ---- build ----
FROM base AS build
ENV NODE_ENV=production \
	SKIP_ENV_VALIDATION=1
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
# /api/health does a real Payload DB query, so "healthy" means "can serve",
# not just "process is up". node -e because the slim image has no curl/wget.
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 CMD ["node", "-e", "fetch('http://127.0.0.1:3000/api/health').then((r) => process.exit(r.ok ? 0 : 1), () => process.exit(1))"]
# Invoke Next directly rather than via `pnpm start` so the long-running process
# never goes through the Corepack shim at all.
#
# Run migrations as a release step before starting this container. For the
# first empty database only, PAYLOAD_DB_PUSH=true can intentionally create the
# schema; turn it off again immediately afterward.
CMD ["node_modules/.bin/next", "start"]
