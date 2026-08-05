ALTER TABLE "journal_entries"
  ADD COLUMN IF NOT EXISTS "mood" text,
  ADD COLUMN IF NOT EXISTS "tags" text[] DEFAULT ARRAY[]::text[] NOT NULL;
