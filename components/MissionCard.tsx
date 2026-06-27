import { RewardBadge } from './RewardBadge';

export type MissionStatus = 'active' | 'completed' | 'expired' | 'locked';

interface MissionCardProps {
  title: string;
  description?: string;
  rewardType: string;
  rewardValue: string | number;
  deadline?: string;
  status: MissionStatus;
}

const STATUS_STYLES: Record<MissionStatus, string> = {
  active: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  completed: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  expired: 'text-gray-500 border-white/10 bg-white/5',
  locked: 'text-gray-600 border-white/10 bg-white/5',
};

export function MissionCard({
  title,
  description,
  rewardType,
  rewardValue,
  deadline,
  status,
}: MissionCardProps) {
  const statusStyle = STATUS_STYLES[status];
  const isLocked = status === 'locked';

  return (
    <div
      className={`glass rounded-xl p-5 border border-white/10 flex flex-col gap-3 ${
        isLocked ? 'opacity-50' : ''
      }`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <h3
          className={`font-semibold text-sm ${
            isLocked ? 'text-gray-500' : 'text-white'
          }`}
        >
          {title}
        </h3>
        <span
          className={`shrink-0 text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded border ${statusStyle}`}
        >
          {status}
        </span>
      </div>

      {description && (
        <p className="text-gray-400 text-xs leading-relaxed">{description}</p>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between pt-2 border-t border-white/10">
        <RewardBadge type={rewardType} value={rewardValue} />
        {deadline && (
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">
            Ends {deadline}
          </span>
        )}
      </div>
    </div>
  );
}
