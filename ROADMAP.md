# SimCountry OS — Roadmap

## v0 — Foundation (current)
**Goal**: Functional UI scaffold, wallet identity, Supabase schema defined.

- [x] Next.js 14 App Router with TypeScript and Tailwind CSS
- [x] Dark premium theme (bg #0a0a0f, glass panels)
- [x] All 6 pages: `/`, `/world`, `/districts`, `/citizen/[id]`, `/governance`, `/missions`
- [x] Shared layout: NavBar + ActivityTicker
- [x] Components: CitizenSlotCard, DistrictCard, MissionCard, RewardBadge, StatsBar
- [x] Solana wallet adapter wired (identity only)
- [x] Supabase schema defined (`supabase/schema.sql`)
- [x] `.env.example`, `PROJECT_BRIEF.md`, `ROADMAP.md`, `.cursorrules`
- [x] Mock data throughout — no live DB calls

---

## v1 — Live Data + Auth
**Goal**: Real Supabase data, wallet-gated claims, real-time activity feed.

- [ ] Wire all pages to Supabase (districts, citizen_slots, missions)
- [ ] Wallet-based auth: insert user row on first connect
- [ ] Claim flow: sign message → insert claim record → update slot status
- [ ] Real-time activity feed via Supabase Realtime subscriptions
- [ ] Citizen detail pages load from DB with dynamic params
- [ ] Governance proposals stored in Supabase
- [ ] Voting records (off-chain signatures in v1)
- [ ] Mission progress tracking
- [ ] User profile page `/profile/[wallet]`

---

## v2 — On-Chain Identity + Rewards
**Goal**: NFT-backed citizens, on-chain reward distribution, staking.

- [ ] Citizen slots as compressed NFTs (Metaplex Bubblegum or similar)
- [ ] Claim flow executes on-chain Solana transaction
- [ ] Reward token ($CULTURE / $TRUST) minting on mission completion
- [ ] Staking mechanic: lock tokens to boost district output
- [ ] Wallet portfolio view: claimed citizens, rewards held
- [ ] On-chain governance votes (token-weighted)
- [ ] Cross-district trade transactions

---

## v3 — World Expansion + Seasons
**Goal**: Season resets, player-driven events, multi-nation.

- [ ] Season system with narrative arcs and time-bounded mission chains
- [ ] Nation-level unlock thresholds trigger district expansions
- [ ] New citizen archetypes unlocked by season events
- [ ] Cross-nation interactions (trade routes, diplomacy)
- [ ] Leaderboard: top citizens by output, top wallets by contribution
- [ ] Public API for third-party integrations
- [ ] Mobile-responsive improvements + PWA support
- [ ] Full 3D city scene with district zones (React Three Fiber)

---

## Future Considerations
- AI agent citizens generating in-world content autonomously
- Agent-to-human handoff mechanics
- IPFS/Arweave for citizen lore and artifacts
- DAO structure for nation constitutional changes
