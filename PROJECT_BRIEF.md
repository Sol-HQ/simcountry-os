# SimCountry OS — Project Brief

## Mission
Build a living digital nation where AI-driven agent citizens can be claimed and operated by real humans. Citizens earn cultural, treasury, and trust outputs based on their roles and district assignments. Governance happens through council proposals. Missions create narrative-driven engagement loops.

## Core Concept
Every citizen starts as an NPC — an AI-driven placeholder with predefined traits, outputs, and a biography. When a human player claims a citizen (via Solana wallet), they take on that citizen's role in the nation. Claimed citizens can contribute more, vote in governance, and earn rewards from completed missions.

## Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Database | Supabase (Postgres + RLS) |
| Wallet | @solana/wallet-adapter-react |
| 3D View | @react-three/fiber (v0 placeholder) |
| Deploy | Vercel |
| Package manager | pnpm |

## Core Loops

### Loop 1 — Claim & Contribute
1. Browse citizen slots
2. Connect wallet
3. Claim a claimable citizen
4. Citizen output attributed to wallet

### Loop 2 — Governance
1. Council members (claimed citizens) propose resolutions
2. Other council members vote
3. Passed resolutions modify district/nation stats

### Loop 3 — Missions
1. Active missions surface narrative objectives
2. Citizens contribute actions to advance missions
3. Completed missions distribute rewards (CULTURE, TREASURY, TRUST, XP)

### Loop 4 — Nation Evolution
1. Nation-level stats (Treasury, Culture, Trust) aggregate from all activity
2. Thresholds unlock new districts, citizen slots, and mission tiers
3. Season resets introduce new narrative arcs

## Districts
| Name | Type | Role |
|------|------|------|
| Artist Quarter | Arts | Cultural output hub |
| Council Hall | Government | Governance seat |
| Market | Commerce | Treasury generation |
| Archive | Knowledge | Lore and XP output |
| Port | Trade | Cross-district flows |
| Temple | Faith | Trust generation |

## v0 Scope
- Static UI scaffold with mock data
- Wallet connect (identity only — no transactions)
- Supabase schema defined (not wired to UI in v0)
- All pages and components functional with placeholder content
- No real-time, no on-chain logic, no auth flows

## What v0 is NOT
- Not a game engine
- Not a token launchpad
- Not a DAO tooling product
- Not a generic NFT dashboard

## Design Principles
- **Command Center** — feels like infrastructure, not a game
- **Legible** — every number and label tells you something real
- **Restrained** — no rainbow gradients, no cartoon characters
- **Expandable** — every component is designed to receive real data
