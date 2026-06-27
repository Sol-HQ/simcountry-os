import Link from 'next/link';

interface DistrictCardProps {
  id: string;
  name: string;
  type: string;
  occupancy: number;
  cultureOutput: number;
}

const TYPE_ICONS: Record<string, string> = {
  arts: '🎭',
  government: '🏛️',
  commerce: '🛒',
  knowledge: '📚',
  trade: '⚓',
  faith: '🕯️',
};

export function DistrictCard({
  id,
  name,
  type,
  occupancy,
  cultureOutput,
}: DistrictCardProps) {
  const icon = TYPE_ICONS[type] ?? '🏗️';
  const pct = Math.min(100, Math.max(0, occupancy));

  return (
    <Link href={`/districts`}>
      <div className="glass rounded-xl p-5 border border-white/10 hover:border-blue-500/40 transition-all group cursor-pointer flex flex-col gap-4 h-full">
        {/* Icon + Name */}
        <div className="flex items-start gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">
              {name}
            </h3>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-0.5">
              {type}
            </p>
          </div>
        </div>

        {/* Occupancy bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Occupancy</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Culture output */}
        <div className="mt-auto border-t border-white/10 pt-3">
          <p className="text-xs text-gray-500">
            Culture output:{' '}
            <span className="text-purple-400 font-semibold">
              +{cultureOutput}/cycle
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
