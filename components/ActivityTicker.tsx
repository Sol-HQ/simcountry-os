'use client';

const FEED_ITEMS = [
  '🏛️ Council Hall passed Resolution #12: Cultural output +5%',
  '👤 Citizen #0047 "Archivist Vey" claimed by @solwarden',
  '⚔️ Mission "The Lost Ledger" completed — 220 $CULTURE rewarded',
  '🏗️ Market District reached 90% occupancy',
  '📜 New mission unlocked: "Forge the City Charter"',
  '🎭 Artist Quarter hosted the Midnight Exhibition — Trust +3',
  '⚓ Port District received trade vessel from District-9',
  '🗳️ Governance vote open: Expand the Temple grounds?',
  '💎 Citizen #0003 "The Merchant" now claimable — rare role',
  '🌐 Treasury crossed 140k — Nation level 2 unlocked',
];

export function ActivityTicker() {
  const doubled = [...FEED_ITEMS, ...FEED_ITEMS];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-10 glass border-t border-white/10 overflow-hidden flex items-center">
      <div className="w-12 shrink-0 px-3 text-xs uppercase tracking-widest text-accent font-semibold border-r border-white/10 h-full flex items-center">
        LIVE
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="ticker-inner flex whitespace-nowrap gap-10 text-xs text-gray-400 py-0">
          {doubled.map((item, i) => (
            <span key={i} className="shrink-0">
              {item}
              <span className="mx-5 text-white/20">·</span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
