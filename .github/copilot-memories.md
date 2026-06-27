# SimCountry OS Copilot Memory

## Product vision
SimCountry OS is a digital nation sandbox where participants engage with governance, missions, and districts through a web experience backed by Solana wallet identity and Supabase data.

## User types
- Citizens: participants exploring districts, missions, and governance
- Claimants: users claiming NFT-backed citizen slots
- Council participants: users proposing and reviewing governance actions
- Builders/operators: contributors maintaining product infrastructure and content

## Core loops
- Explore world and districts, then inspect claimable or claimed citizen slots
- Connect wallet for identity and interact with claimable roles
- Engage in governance by reviewing and proposing council actions
- Complete missions to drive recurring engagement

## Tech stack
- Next.js 14 App Router
- TypeScript (strict mode)
- Tailwind CSS v3
- Supabase (PostgreSQL + RLS)
- Solana wallet adapter stack (`@solana/wallet-adapter-react`, `WalletMultiButton`)
- React Three Fiber + Drei for 3D placeholders
- pnpm package manager

## File structure
- `app/`: App Router pages and layouts (server components by default)
- `components/`: reusable UI components
- `lib/supabase.ts`: Supabase client and shared Supabase types
- `supabase/`: database and platform-related assets
- `.github/`: automation, templates, and repository metadata

## Naming conventions
- Components use PascalCase filenames and named exports
- Pages use default exports inside App Router structure
- Hooks use `use` prefix in `hooks/`
- Supabase tables use `snake_case`
- TypeScript model names use PascalCase matching entities (for example `District`, `CitizenSlot`)

## Component patterns
- Prefer server components; add `'use client'` only for hooks, wallet APIs, or browser-only logic
- Keep reusable UI in `components/`
- Keep components under 200 lines where practical
- Avoid barrel exports; import directly from source files
- Handle loading/error states for Supabase data access

## DB schema summary
- Supabase/PostgreSQL with RLS policies enabled
- Core entities include district- and citizen-related records supporting claim states
- Citizen slot status values are constrained to: `npc`, `claimable`, `claimed`
- Service role key must never be exposed client-side

## Environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SOLANA_NETWORK`
- `NEXT_PUBLIC_SOLANA_RPC_URL`
- `NEXT_PUBLIC_NATION_NAME`
- `NEXT_PUBLIC_APP_URL`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
