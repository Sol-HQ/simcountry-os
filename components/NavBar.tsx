'use client';

import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { StatsBar } from './StatsBar';

export function NavBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-accent font-bold tracking-widest uppercase text-sm">
            SimCountry
          </span>
          <span className="text-white/40 font-mono text-xs">OS</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-gray-400">
          <Link href="/world" className="hover:text-white transition-colors">
            World
          </Link>
          <Link href="/districts" className="hover:text-white transition-colors">
            Districts
          </Link>
          <Link href="/governance" className="hover:text-white transition-colors">
            Council
          </Link>
          <Link href="/missions" className="hover:text-white transition-colors">
            Missions
          </Link>
        </nav>

        {/* Live stats */}
        <div className="hidden lg:block">
          <StatsBar treasury={142500} culture={78} trust={64} />
        </div>

        {/* Wallet */}
        <div className="shrink-0">
          <WalletMultiButton
            style={{
              background: 'rgba(59,130,246,0.15)',
              border: '1px solid rgba(59,130,246,0.4)',
              borderRadius: '6px',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '8px 14px',
              height: 'auto',
              color: '#93c5fd',
            }}
          />
        </div>
      </div>
    </header>
  );
}
