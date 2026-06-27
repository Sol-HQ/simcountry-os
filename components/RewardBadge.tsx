interface RewardBadgeProps {
  type: string;
  value: string | number;
}

const TYPE_COLORS: Record<string, string> = {
  CULTURE: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  TREASURY: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  TRUST: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  XP: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  NFT: 'text-pink-400 bg-pink-400/10 border-pink-400/30',
};

export function RewardBadge({ type, value }: RewardBadgeProps) {
  const colorClass =
    TYPE_COLORS[type.toUpperCase()] ??
    'text-gray-400 bg-white/5 border-white/10';

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded border ${colorClass}`}
    >
      <span className="text-[10px] uppercase tracking-widest opacity-70">
        {type}
      </span>
      <span>+{value}</span>
    </span>
  );
}
