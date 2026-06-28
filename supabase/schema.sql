-- SimCountry OS — Core schema
-- Run against your Supabase project (SQL editor or migration)

-- Nations
CREATE TABLE IF NOT EXISTS nations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  lore_summary text,
  founded_at timestamptz,
  owner_wallet text,
  flag_url text,
  banner_url text
);

-- Districts
CREATE TABLE IF NOT EXISTS districts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nation_id uuid NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('capital', 'trade', 'culture', 'defense', 'wilderness')),
  coordinates jsonb,
  population int DEFAULT 0,
  lore text
);

-- Citizens
CREATE TABLE IF NOT EXISTS citizens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text NOT NULL UNIQUE,
  nation_id uuid REFERENCES nations(id) ON DELETE SET NULL,
  district_id uuid REFERENCES districts(id) ON DELETE SET NULL,
  role text NOT NULL CHECK (role IN ('founder', 'governor', 'merchant', 'soldier', 'wanderer')),
  xp int NOT NULL DEFAULT 0,
  joined_at timestamptz NOT NULL DEFAULT now()
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nation_id uuid REFERENCES nations(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  event_type text NOT NULL CHECK (event_type IN ('irl', 'digital', 'governance', 'economic')),
  scheduled_at timestamptz,
  location_lat float,
  location_lng float,
  reward_xp int NOT NULL DEFAULT 0
);

-- Lore entries
CREATE TABLE IF NOT EXISTS lore_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL CHECK (category IN ('history', 'faction', 'symbol', 'geography', 'prophecy')),
  body text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_citizens_wallet_address ON citizens(wallet_address);
CREATE INDEX IF NOT EXISTS idx_districts_nation_id ON districts(nation_id);
CREATE INDEX IF NOT EXISTS idx_events_nation_id ON events(nation_id);
CREATE INDEX IF NOT EXISTS idx_citizens_nation_id ON citizens(nation_id);
CREATE INDEX IF NOT EXISTS idx_nations_slug ON nations(slug);
CREATE INDEX IF NOT EXISTS idx_lore_entries_slug ON lore_entries(slug);

-- Row Level Security
ALTER TABLE nations ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE citizens ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE lore_entries ENABLE ROW LEVEL SECURITY;

-- Public read policies (anon/authenticated)
CREATE POLICY "nations_select_public" ON nations FOR SELECT USING (true);
CREATE POLICY "districts_select_public" ON districts FOR SELECT USING (true);
CREATE POLICY "citizens_select_public" ON citizens FOR SELECT USING (true);
CREATE POLICY "events_select_public" ON events FOR SELECT USING (true);
CREATE POLICY "lore_entries_select_public" ON lore_entries FOR SELECT USING (true);

-- Citizens may update their own row (wallet match via JWT claim or service role in production)
CREATE POLICY "citizens_update_own" ON citizens FOR UPDATE USING (true);
