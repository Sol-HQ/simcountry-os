interface StatsBarProps {
  treasury: number;
  culture: number;
  trust: number;
}

export function StatsBar({ treasury, culture, trust }: StatsBarProps) {
  return (
    <div className="flex items-center gap-4 text-xs">
      <Stat label="Treasury" value={`${(treasury / 1000).toFixed(1)}k`} color="text-amber-400" />
      <Stat label="Culture" value={`${culture}`} color="text-purple-400" />
      <Stat label="Trust" value={`${trust}%`} color="text-emerald-400" />
    </div>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center leading-tight">
      <span className={`font-semibold tabular-nums ${color}`}>{value}</span>
      <span className="text-gray-500 uppercase tracking-widest text-[9px]">
        {label}
      </span>
    </div>
  );
}
