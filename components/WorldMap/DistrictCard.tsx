import type { DistrictType } from '@/lib/lore/types';
import styles from './WorldMap.module.css';

export interface MapDistrictCardProps {
  name: string;
  type: DistrictType;
  population: number;
  lore: string;
  className?: string;
}

const TYPE_LABELS: Record<DistrictType, string> = {
  capital: 'Capital',
  trade: 'Trade',
  culture: 'Culture',
  defense: 'Defense',
  wilderness: 'Wilderness',
};

const TYPE_COLORS: Record<DistrictType, string> = {
  capital: '#f59e0b',
  trade: '#22c55e',
  culture: '#a855f7',
  defense: '#ef4444',
  wilderness: '#14b8a6',
};

export function MapDistrictCard({
  name,
  type,
  population,
  lore,
  className = '',
}: MapDistrictCardProps) {
  const accent = TYPE_COLORS[type];

  return (
    <div
      className={`glass rounded-lg p-4 min-w-[220px] max-w-[280px] ${className}`}
      style={{
        borderColor: `${accent}66`,
        boxShadow: `0 0 24px ${accent}33, inset 0 0 20px rgba(6, 182, 212, 0.05)`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}
        />
        <span
          className="text-xs uppercase tracking-widest font-medium"
          style={{ color: accent }}
        >
          {TYPE_LABELS[type]}
        </span>
      </div>
      <h3 className="text-white font-semibold text-sm mb-1">{name}</h3>
      <p className="text-xs text-cyan-400/80 mb-2">
        Population: {population.toLocaleString()}
      </p>
      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{lore}</p>
    </div>
  );
}

export { TYPE_COLORS, TYPE_LABELS };
