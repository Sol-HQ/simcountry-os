import { MissionCard } from '@/components/MissionCard';

const MISSIONS = [
  {
    id: 1,
    title: 'Forge the City Charter',
    description:
      'Draft the founding document of the nation. Requires contributions from 3 citizens across different districts.',
    rewardType: 'CULTURE',
    rewardValue: 350,
    deadline: 'Cycle 15',
    status: 'active' as const,
  },
  {
    id: 2,
    title: 'The Lost Ledger',
    description:
      'Recover the missing treasury records from before the nation\'s founding. The Archive holds the key.',
    rewardType: 'TREASURY',
    rewardValue: 800,
    deadline: 'Cycle 14',
    status: 'active' as const,
  },
  {
    id: 3,
    title: 'Night of the Midnight Exhibition',
    description:
      'Coordinate a cultural showcase across Artist Quarter and Temple. Trust threshold must reach 70.',
    rewardType: 'TRUST',
    rewardValue: 15,
    deadline: 'Cycle 16',
    status: 'active' as const,
  },
  {
    id: 4,
    title: 'Open Trade Route Alpha',
    description:
      'Establish the first inter-district trade route through the Port. Requires Market and Port at 80% occupancy.',
    rewardType: 'TREASURY',
    rewardValue: 1200,
    deadline: 'Cycle 17',
    status: 'active' as const,
  },
  {
    id: 5,
    title: 'Codex of Laws — Volume I',
    description:
      'Council must pass 5 resolutions to unlock the Codex. Governance XP reward.',
    rewardType: 'XP',
    rewardValue: 500,
    deadline: 'Cycle 20',
    status: 'locked' as const,
  },
  {
    id: 6,
    title: 'The Awakening Protocol',
    description:
      'Transform 10 NPC citizens into claimable slots. Unlocks Season 1 content.',
    rewardType: 'NFT',
    rewardValue: 1,
    deadline: 'Season 1',
    status: 'locked' as const,
  },
];

export default function MissionsPage() {
  const active = MISSIONS.filter((m) => m.status === 'active');
  const locked = MISSIONS.filter((m) => m.status === 'locked');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Missions
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Active quests shaping the nation&apos;s history
        </p>
      </div>

      {/* Active */}
      <section className="space-y-4">
        <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Active ({active.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {active.map((m) => (
            <MissionCard key={m.id} {...m} />
          ))}
        </div>
      </section>

      {/* Locked */}
      <section className="space-y-4">
        <h2 className="text-xs uppercase tracking-widest text-gray-600 font-semibold">
          Locked ({locked.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {locked.map((m) => (
            <MissionCard key={m.id} {...m} />
          ))}
        </div>
      </section>

      <p className="text-xs text-gray-600 text-center">
        Mission generation and on-chain rewards available in v1
      </p>
    </div>
  );
}
