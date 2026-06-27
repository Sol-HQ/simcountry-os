# SimCountry OS

A digital nation sandbox where agent citizens become human-driven contributors, earn rewards, and unlock real-world events.

## Overview

SimCountry OS is a living digital nation built on Next.js 14, Supabase, and Solana. Citizens start as AI-driven NPCs. Humans claim them via wallet connect, take on civic roles, contribute to district outputs, vote in governance, and complete missions to earn on-chain rewards.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Database | Supabase (Postgres + RLS) |
| Wallet | @solana/wallet-adapter-react |
| 3D View | @react-three/fiber (placeholder) |
| Deploy | Vercel |
| Package manager | pnpm |

---

## Project Structure

```
simcountry-os/
├── app/
│   ├── layout.tsx            # Root layout — NavBar, ActivityTicker, Providers
│   ├── page.tsx              # / Landing page
│   ├── providers.tsx         # Solana WalletProvider (client)
│   ├── globals.css           # Base styles, .glass utility, ticker animation
│   ├── world/page.tsx        # /world — 3D city canvas + district grid
│   ├── districts/page.tsx    # /districts — District card grid
│   ├── citizen/[id]/page.tsx # /citizen/:id — Citizen profile + claim
│   ├── governance/page.tsx   # /governance — Council proposals + voting
│   └── missions/page.tsx     # /missions — Active and locked missions
├── components/
│   ├── NavBar.tsx            # Fixed top nav with wallet button + live stats
│   ├── ActivityTicker.tsx    # Fixed bottom scrolling activity feed
│   ├── CitizenSlotCard.tsx   # Citizen card (npc/claimable/claimed)
│   ├── DistrictCard.tsx      # District card with occupancy bar
│   ├── MissionCard.tsx       # Mission card with reward + deadline
│   ├── RewardBadge.tsx       # Inline reward type+value badge
│   ├── StatsBar.tsx          # Treasury / Culture / Trust stat display
│   └── WorldCanvas.tsx       # Three.js city placeholder (dynamic import)
├── lib/
│   └── supabase.ts           # Supabase client + TypeScript row types
├── supabase/
│   └── schema.sql            # Full DB schema with RLS policies + seed data
├── .env.example              # All required environment variables listed
├── .cursorrules              # Cursor IDE conventions
├── .github/
│   └── copilot-instructions.md
├── PROJECT_BRIEF.md
├── ROADMAP.md
└── README.md
```

---

## Setup

### 1. Clone and install

```bash
git clone https://github.com/your-org/simcountry-os.git
cd simcountry-os
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your values:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side service role key (never expose to client) |
| `NEXT_PUBLIC_SOLANA_NETWORK` | `mainnet-beta`, `devnet`, or `testnet` |
| `NEXT_PUBLIC_SOLANA_RPC_URL` | Optional custom RPC endpoint |

### 3. Set up Supabase

1. Create a new [Supabase](https://supabase.com) project
2. Open the SQL editor and run `supabase/schema.sql`
3. This creates all tables, seed data, and RLS policies

### 4. Run dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — Enter Nation CTA |
| `/world` | 3D city placeholder + district grid overview |
| `/districts` | Six district cards with occupancy and culture output |
| `/citizen/[id]` | Citizen profile, stats, and wallet-gated claim button |
| `/governance` | Council proposals with yea/nay/abstain voting |
| `/missions` | Active and locked mission list with reward display |

---

## Deploy to Vercel

This project is Vercel-ready.

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Deploy

---

## v0 Scope — What's intentionally left for v1+

- **Live Supabase data** — all pages use mock data in v0
- **Wallet auth** — wallet connect works but no session/user row created
- **Claim transactions** — UI is wired but no on-chain tx in v0
- **Real-time activity feed** — ticker is static in v0
- **Full 3D city** — Three.js canvas shows placeholder buildings only
- **User profiles** — no `/profile/[wallet]` route yet
- **Mission progress tracking** — missions are display-only in v0

See [ROADMAP.md](./ROADMAP.md) for the full v1–v3 plan.

---

## Contributing

See [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) and [`.cursorrules`](./.cursorrules) for coding conventions.
