# SimCountry OS — Copilot Instructions

## Project Overview
SimCountry OS is a digital nation sandbox. Citizens are claimable NFT-backed roles. Districts are interactive zones. Governance uses council proposals. Missions drive engagement. The stack is Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase, and Solana.

## Stack
- **Framework**: Next.js 14 App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3
- **Database**: Supabase (PostgreSQL + RLS)
- **Wallet**: @solana/wallet-adapter-react + WalletMultiButton
- **3D**: @react-three/fiber + @react-three/drei (placeholder in v0)
- **Package manager**: pnpm

## Architecture Rules
- All pages in `app/` using App Router conventions
- Server components by default; add `'use client'` only when needed (hooks, browser APIs, wallet)
- All reusable UI in `components/`
- All Supabase types and client in `lib/supabase.ts`
- Keep components under 200 lines
- No barrel exports (`index.ts`) — import directly from file

## UI / Theme Rules
- Background: `#0a0a0f`
- Panels: `rgba(255,255,255,0.06)` with `backdrop-filter: blur(12px)` → use `.glass` class
- Primary accent: `#3b82f6` (blue-500)
- Secondary accent: `#f59e0b` (amber-400) for claimable/reward states
- Text hierarchy: white → gray-300 → gray-400 → gray-500
- Labels: uppercase, tracking-widest, text-xs or text-[10px]
- Do NOT use generic card shadows or rounded-2xl everywhere — keep it sharp and architectural

## TypeScript Rules
- All props typed via interfaces (not `type` unless union required)
- No `any` types
- Use strict null checks — handle undefined from Supabase gracefully
- All route params typed: `{ params: { id: string } }`

## Naming Conventions
- Components: PascalCase files, named exports
- Pages: default exports, camelCase file inside `app/`
- Hooks: `use` prefix in `hooks/` directory (v1+)
- Supabase tables: snake_case
- TypeScript types: PascalCase matching table (e.g. `District`, `CitizenSlot`)

## Data Layer
- Use Supabase client from `lib/supabase.ts` — never re-initialize
- Always handle loading and error states
- Use RLS policies — never expose service role key on the client
- Citizen slot `status` must always be: `'npc' | 'claimable' | 'claimed'`

## v0 Constraints (do not add unless explicitly tasked)
- No on-chain simulation — wallet is identity only
- No tokenomics or real token minting
- No real-time subscriptions (v1)
- No user auth beyond wallet connect (v1)
- No image uploads or IPFS (v1)
