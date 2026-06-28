'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { SIMCOUNTRY_LORE } from '@/lib/lore/canon';
import { getCitizenByWallet } from '@/lib/lore/queries';
import type { Citizen, DistrictType } from '@/lib/lore/types';
import { TYPE_COLORS } from '@/components/WorldMap/DistrictCard';

const WorldMap = dynamic(
  () => import('@/components/WorldMap/WorldMap').then((m) => m.WorldMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
        <span className="text-xs uppercase tracking-widest text-cyan-500/60 animate-pulse">
          Initializing world map…
        </span>
      </div>
    ),
  }
);

const ROLE_LABELS: Record<string, string> = {
  founder: 'Founder',
  governor: 'Governor',
  merchant: 'Merchant',
  soldier: 'Soldier',
  wanderer: 'Wanderer',
};

const NAV_LINKS = [
  { href: '/', label: 'Map' },
  { href: '/citizen/1', label: 'Citizens' },
  { href: '/events', label: 'Events' },
  { href: '/lore', label: 'Lore' },
] as const;

function ScrollDistrictCard({
  name,
  type,
  population,
  lore,
}: {
  name: string;
  type: DistrictType;
  population: number;
  lore: string;
}) {
  const accent = TYPE_COLORS[type];

  return (
    <div
      className="glass shrink-0 w-64 rounded-xl p-4 border transition-all hover:scale-[1.02]"
      style={{ borderColor: `${accent}44` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }}
        />
        <span className="text-xs uppercase tracking-widest text-gray-500">
          {type}
        </span>
      </div>
      <h3 className="text-white font-semibold text-sm mb-1">{name}</h3>
      <p className="text-xs text-cyan-400/70 mb-2">
        {population.toLocaleString()} citizens
      </p>
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{lore}</p>
    </div>
  );
}

export function DashboardContent() {
  const { publicKey, connected } = useWallet();
  const [citizen, setCitizen] = useState<Citizen | null>(null);

  useEffect(() => {
    if (!connected || !publicKey) {
      setCitizen(null);
      return;
    }

    const wallet = publicKey.toBase58();
    getCitizenByWallet(wallet)
      .then(setCitizen)
      .catch(() => setCitizen(null));
  }, [connected, publicKey]);

  return (
    <div className="min-h-screen bg-[#050508] flex flex-col">
      <header className="shrink-0 h-14 px-4 md:px-6 flex items-center justify-between border-b border-white/5 bg-[#050508]/90 backdrop-blur-md z-20">
        <Link href="/" className="flex items-baseline gap-1.5 shrink-0">
          <span className="text-lg font-bold tracking-wider bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400 bg-clip-text text-transparent">
            SIMCOUNTRY
          </span>
          <span className="text-cyan-500/60 font-mono text-xs tracking-[0.3em]">
            OS
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-widest text-gray-500 hover:text-cyan-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {connected && citizen && (
            <div className="hidden md:flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-cyan-500/20">
              <span className="text-xs uppercase tracking-widest text-amber-400">
                {ROLE_LABELS[citizen.role] ?? citizen.role}
              </span>
              <span className="text-white/20">|</span>
              <span className="text-xs text-cyan-400 font-mono">
                {citizen.xp.toLocaleString()} XP
              </span>
            </div>
          )}
          {connected && !citizen && (
            <span className="hidden md:inline text-xs uppercase tracking-widest text-gray-600">
              Unregistered
            </span>
          )}
          <WalletMultiButton
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(6,182,212,0.12))',
              border: '1px solid rgba(6,182,212,0.35)',
              borderRadius: '6px',
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '7px 12px',
              height: 'auto',
              color: '#67e8f9',
            }}
          />
        </div>
      </header>

      <div className="h-[60vh] min-h-[320px] relative">
        <WorldMap />
      </div>

      <section className="flex-1 px-4 md:px-6 py-5 border-t border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs uppercase tracking-[0.25em] text-gray-500">
            Genesis Districts
          </h2>
          <span className="text-xs text-cyan-500/50 font-mono">
            {SIMCOUNTRY_LORE.genesisDistricts.length} nodes online
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {SIMCOUNTRY_LORE.genesisDistricts.map((district) => (
            <ScrollDistrictCard
              key={district.id}
              name={district.name}
              type={district.type}
              population={district.population}
              lore={district.lore}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
