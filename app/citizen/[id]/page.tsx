'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { CitizenSlotCard, CitizenStatus } from '@/components/CitizenSlotCard';
import { StatsBar } from '@/components/StatsBar';

interface CitizenData {
  id: number;
  name: string;
  role: string;
  status: CitizenStatus;
  output: string;
  district: string;
  biography: string;
  stats: { label: string; value: string }[];
}

// Mock citizen data — replace with Supabase fetch
const CITIZEN: CitizenData = {
  id: 47,
  name: 'Archivist Vey',
  role: 'Archivist',
  status: 'claimable',
  output: '+22 Culture/cycle',
  district: 'Archive',
  biography:
    'Keeper of the nation\'s institutional memory. Vey catalogs every decree, treaty, and cultural event. Their records form the backbone of governance.',
  stats: [
    { label: 'Knowledge', value: '94' },
    { label: 'Influence', value: '61' },
    { label: 'Loyalty', value: '88' },
    { label: 'Productivity', value: '77' },
  ],
};

export default function CitizenPage() {
  const { connected } = useWallet();
  const citizen = CITIZEN;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb */}
      <p className="text-xs text-gray-500 uppercase tracking-widest">
        Citizens / #{String(citizen.id).padStart(4, '0')}
      </p>

      {/* Hero card */}
      <div className="glass rounded-xl border border-amber-400/30 p-6 space-y-5">
        <div className="flex items-start justify-between gap-4">
          {/* Identity */}
          <div>
            <h1 className="text-2xl font-bold text-white">{citizen.name}</h1>
            <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
              {citizen.role} · {citizen.district}
            </p>
          </div>

          {/* Status */}
          <CitizenSlotCard
            id={citizen.id}
            status={citizen.status}
            role={citizen.role}
            name={citizen.name}
            output={citizen.output}
          />
        </div>

        {/* Biography */}
        <p className="text-gray-300 text-sm leading-relaxed">
          {citizen.biography}
        </p>

        {/* Stat grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {citizen.stats.map((s) => (
            <div
              key={s.label}
              className="glass rounded-lg border border-white/10 px-3 py-3 text-center"
            >
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Claim action */}
        {citizen.status === 'claimable' && (
          <div className="pt-2 border-t border-white/10">
            {connected ? (
              <button className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm uppercase tracking-widest rounded-lg transition-all">
                Claim Citizen
              </button>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs text-gray-500">
                  Connect your wallet to claim this citizen
                </p>
                <WalletMultiButton />
              </div>
            )}
          </div>
        )}

        {citizen.status === 'claimed' && (
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Claimed — this citizen is active
            </div>
          </div>
        )}
      </div>

      {/* Output stats */}
      <div className="glass rounded-xl border border-white/10 px-6 py-4">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
          Contribution
        </p>
        <StatsBar treasury={0} culture={22} trust={3} />
      </div>
    </div>
  );
}
