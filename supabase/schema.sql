-- SimCountry OS — Supabase Schema v0
-- Run this in the Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────
-- Districts
-- ─────────────────────────────────────────
create table if not exists districts (
  id            text primary key,              -- e.g. 'artist-quarter'
  name          text not null,
  type          text not null,                 -- arts, government, commerce, knowledge, trade, faith
  occupancy     integer not null default 0,    -- percentage 0–100
  culture_output integer not null default 0,
  created_at    timestamptz not null default now()
);

-- Seed districts
insert into districts (id, name, type, occupancy, culture_output) values
  ('artist-quarter', 'Artist Quarter', 'arts',       75, 18),
  ('council-hall',   'Council Hall',   'government', 100, 8),
  ('market',         'Market',         'commerce',   90, 12),
  ('archive',        'Archive',        'knowledge',  50, 22),
  ('port',           'Port',           'trade',      83,  9),
  ('temple',         'Temple',         'faith',      40, 14)
on conflict do nothing;

-- ─────────────────────────────────────────
-- Citizen Slots
-- ─────────────────────────────────────────
create table if not exists citizen_slots (
  id            serial primary key,
  name          text not null,
  role          text not null,
  status        text not null default 'npc'    -- npc | claimable | claimed
                check (status in ('npc', 'claimable', 'claimed')),
  district_id   text references districts(id) on delete set null,
  output_label  text not null default '',
  biography     text,
  created_at    timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- Users
-- ─────────────────────────────────────────
create table if not exists users (
  id             uuid primary key default uuid_generate_v4(),
  wallet_address text unique not null,
  username       text,
  created_at     timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- Claims
-- ─────────────────────────────────────────
create table if not exists claims (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references users(id) on delete cascade,
  citizen_slot_id  integer not null references citizen_slots(id) on delete cascade,
  claimed_at       timestamptz not null default now(),
  tx_signature     text,                       -- Solana transaction signature
  unique (citizen_slot_id)                     -- one claim per citizen slot
);

-- ─────────────────────────────────────────
-- Missions
-- ─────────────────────────────────────────
create table if not exists missions (
  id             serial primary key,
  title          text not null,
  description    text not null,
  reward_type    text not null,                -- CULTURE | TREASURY | TRUST | XP | NFT
  reward_value   integer not null default 0,
  deadline_cycle integer,                      -- null = no deadline
  status         text not null default 'active'
                 check (status in ('active', 'completed', 'expired', 'locked')),
  created_at     timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- Rewards
-- ─────────────────────────────────────────
create table if not exists rewards (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references users(id) on delete cascade,
  mission_id    integer references missions(id) on delete set null,
  type          text not null,
  value         integer not null,
  granted_at    timestamptz not null default now(),
  tx_signature  text                           -- Solana tx when on-chain rewards land
);

-- ─────────────────────────────────────────
-- Row Level Security (RLS)
-- ─────────────────────────────────────────
alter table districts     enable row level security;
alter table citizen_slots enable row level security;
alter table users         enable row level security;
alter table claims        enable row level security;
alter table missions      enable row level security;
alter table rewards       enable row level security;

-- Public read policies
create policy "Districts are publicly readable"
  on districts for select using (true);

create policy "Citizen slots are publicly readable"
  on citizen_slots for select using (true);

create policy "Missions are publicly readable"
  on missions for select using (true);

-- Users can read/write own row
create policy "Users can read own record"
  on users for select using (auth.uid() = id);

create policy "Users can insert own record"
  on users for insert with check (auth.uid() = id);

-- Claims: public read, authenticated write
create policy "Claims are publicly readable"
  on claims for select using (true);

create policy "Authenticated users can claim"
  on claims for insert with check (auth.uid() = user_id);

-- Rewards: users can read their own
create policy "Users can read own rewards"
  on rewards for select using (auth.uid() = user_id);
