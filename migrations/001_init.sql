-- Second Brain MCP — initial schema
-- Run once in the Neon SQL editor (or psql)

-- pg_trgm enables similarity() for Japanese-friendly full-text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS memos (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  content    TEXT        NOT NULL,
  kind       TEXT        NOT NULL DEFAULT 'memo'
                         CHECK (kind IN ('memo', 'task', 'asset', 'decision')),
  area       TEXT,
  priority   TEXT        CHECK (priority IN ('P0', 'P1', 'P2')),
  status     TEXT        CHECK (status IN ('open', 'done')),
  due_date   DATE
);

-- Trigram index: similarity search + ILIKE acceleration
CREATE INDEX IF NOT EXISTS memos_content_trgm ON memos USING GIN (content gin_trgm_ops);
CREATE INDEX IF NOT EXISTS memos_kind         ON memos (kind);
CREATE INDEX IF NOT EXISTS memos_area         ON memos (area);
CREATE INDEX IF NOT EXISTS memos_status       ON memos (status);
CREATE INDEX IF NOT EXISTS memos_created_at   ON memos (created_at DESC);

CREATE TABLE IF NOT EXISTS links (
  from_id    UUID        NOT NULL REFERENCES memos(id) ON DELETE CASCADE,
  to_id      UUID        NOT NULL REFERENCES memos(id) ON DELETE CASCADE,
  reason     TEXT        NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (from_id, to_id)
);

CREATE INDEX IF NOT EXISTS links_from ON links (from_id);
CREATE INDEX IF NOT EXISTS links_to   ON links (to_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION _brain_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS memos_updated_at ON memos;
CREATE TRIGGER memos_updated_at
  BEFORE UPDATE ON memos
  FOR EACH ROW EXECUTE FUNCTION _brain_set_updated_at();
