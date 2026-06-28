import Link from 'next/link';
import { FALLBACK_EVENTS } from '@/lib/lore/canon';
import type { EventType, IrlEvent } from '@/lib/lore/types';

const TYPE_STYLES: Record<
  EventType,
  { label: string; color: string; bg: string }
> = {
  irl: { label: 'IRL', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  digital: { label: 'Digital', color: '#22d3ee', bg: 'rgba(34,211,238,0.12)' },
  governance: {
    label: 'Governance',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.12)',
  },
  economic: {
    label: 'Economic',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.12)',
  },
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date(iso));
}

function formatLocation(event: IrlEvent): string | null {
  if (event.location_lat == null || event.location_lng == null) return null;
  return `${event.location_lat.toFixed(4)}°, ${event.location_lng.toFixed(4)}°`;
}

export default function EventsPage() {
  const events = FALLBACK_EVENTS.filter(
    (e) => new Date(e.scheduled_at) >= new Date()
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 mb-2">
          Nation Calendar
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Upcoming Events
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
          IRL gatherings, digital summits, and governance sessions across the
          Genesis Nation. Earn XP by participating.
        </p>
      </header>

      <div className="space-y-4">
        {events.map((event) => {
          const style = TYPE_STYLES[event.event_type];
          const location = formatLocation(event);

          return (
            <article
              key={event.id}
              className="glass rounded-xl p-5 md:p-6 border border-white/10 hover:border-amber-500/20 transition-all"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium"
                    style={{
                      color: style.color,
                      backgroundColor: style.bg,
                      border: `1px solid ${style.color}44`,
                    }}
                  >
                    {style.label}
                  </span>
                  <time
                    className="text-xs text-gray-500 font-mono"
                    dateTime={event.scheduled_at}
                  >
                    {formatDate(event.scheduled_at)}
                  </time>
                </div>
                <span className="text-sm font-mono text-amber-400">
                  +{event.reward_xp} XP
                </span>
              </div>

              <h2 className="text-lg font-semibold text-white mb-2">
                {event.title}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">
                {event.description}
              </p>

              {location && (
                <p className="text-xs text-cyan-400/80 uppercase tracking-widest">
                  Location: {location}
                </p>
              )}
            </article>
          );
        })}
      </div>

      <p className="mt-8 text-center">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-gray-500 hover:text-cyan-400 transition-colors"
        >
          ← Return to World Map
        </Link>
      </p>
    </div>
  );
}
