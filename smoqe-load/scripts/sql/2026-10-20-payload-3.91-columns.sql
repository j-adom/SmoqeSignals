-- Payload 3.86.0 -> 3.91.0 schema additions for smoqe-load (PostgreSQL).
--
-- This app has no Payload migrations directory; production runs with
-- `push` disabled (PAYLOAD_DB_PUSH unset/false), so new stored columns are NOT
-- created automatically. Apply this BEFORE deploying the upgraded image —
-- Payload 3.91 selects these columns, and the users table one is read on every
-- auth/login query.
--
--   psql "$DATABASE_URI" -v ON_ERROR_STOP=1 -f scripts/sql/2026-10-20-payload-3.91-columns.sql
--
-- Idempotent and additive only (nullable columns, no defaults, no rewrites),
-- so it is safe to run while 3.86 is still serving and safe to re-run.
--
-- Derived by pushing the schema of 3.86.0 and of 3.91.0 into throwaway
-- Postgres 16 databases (R2/s3Storage enabled, as in production) and diffing
-- `pg_dump --schema-only`. These two columns were the only differences.

BEGIN;

-- Payload 3.90: auth collections track when a password reset was requested.
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS reset_password_requested_at timestamp(3) with time zone;

-- Payload 3.90: @payloadcms/storage-* stores the object key on upload docs.
-- (Only present in the schema when s3Storage is enabled, i.e. R2_ACCESS_KEY_ID set.)
ALTER TABLE public.media
  ADD COLUMN IF NOT EXISTS _objectkey character varying;

COMMIT;
