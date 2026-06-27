export type CitizenStatus = 'npc' | 'claimable' | 'claimed';

interface CitizenSlotCardProps {
  id: string | number;
  status: CitizenStatus;
  role: string;
  name: string;
  output: string;
  onClick?: () => void;
}

const STATUS_CONFIG: Record<
  CitizenStatus,
  { label: string; dotColor: string; borderColor: string }
> = {
  npc: {
    label: 'NPC',
    dotColor: 'bg-gray-500',
    borderColor: 'border-white/10',
  },
  claimable: {
    label: 'CLAIMABLE',
    dotColor: 'bg-amber-400',
    borderColor: 'border-amber-400/40',
  },
  claimed: {
    label: 'CLAIMED',
    dotColor: 'bg-emerald-400',
    borderColor: 'border-emerald-400/30',
  },
};

export function CitizenSlotCard({
  id,
  status,
  role,
  name,
  output,
  onClick,
}: CitizenSlotCardProps) {
  const cfg = STATUS_CONFIG[status];

  return (
    <div
      onClick={onClick}
      className={`glass rounded-lg p-4 border ${cfg.borderColor} flex flex-col gap-3 cursor-pointer hover:bg-white/[0.08] transition-all group`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-gray-500 font-mono text-xs">
          #{String(id).padStart(4, '0')}
        </span>
        <span className={`flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-gray-400`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotColor}`} />
          {cfg.label}
        </span>
      </div>

      {/* Name + Role */}
      <div>
        <p className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">
          {name}
        </p>
        <p className="text-gray-400 text-xs uppercase tracking-widest mt-0.5">
          {role}
        </p>
      </div>

      {/* Output */}
      <div className="mt-auto pt-2 border-t border-white/10">
        <p className="text-xs text-gray-500">
          Output:{' '}
          <span className="text-amber-400 font-semibold">{output}</span>
        </p>
      </div>
    </div>
  );
}
