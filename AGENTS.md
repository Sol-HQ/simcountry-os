# AGENTS.md

## Cursor Cloud specific instructions

SimCountry OS is a single Next.js 14 (App Router) web app. There is only one service.

Standard commands live in `package.json` (`dev`, `build`, `start`, `lint`); see `README.md` for full setup. Package manager is **pnpm**.

Non-obvious notes:

- **No backend/env vars needed to run.** Despite the README mentioning Supabase and Solana, v0 pages render entirely from in-file mock data. `lib/supabase.ts` is **not imported** by any app code, so `pnpm dev`, `pnpm build`, and `pnpm lint` all work with no `.env.local` and no Supabase/Solana credentials. Do not treat missing env vars as a blocker.
- **`pnpm build` prints `Critical dependency: the request of a dependency is an expression` warnings** originating from transitive Solana/`viem`/`ox` packages pulled in via `app/providers.tsx`. These are harmless — the build exits 0 and generates all routes.
- **Lint requires `.eslintrc.json`.** `next lint` is interactive on first run when no ESLint config exists; the committed `.eslintrc.json` (`{ "extends": "next/core-web-vitals" }`) keeps `pnpm lint` non-interactive.
- **Dev server**: `pnpm dev` serves on `http://localhost:3000`. Interactive features (governance voting, citizen claim) are client components with local React state only — votes/claims are not persisted in v0.
