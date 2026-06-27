import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-6.5rem)] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl gap-8">
        {/* Nation badge */}
        <div className="flex items-center gap-2 glass px-4 py-1.5 rounded-full border border-white/10 text-xs uppercase tracking-widest text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Nation Online · Season 0
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            SIMCOUNTRY
          </h1>
          <div className="text-blue-400 font-mono text-lg tracking-[0.4em] uppercase">
            OPERATING SYSTEM
          </div>
        </div>

        {/* Tagline */}
        <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
          A living digital nation. Claim citizens, govern districts, complete
          missions — and shape the world you inhabit.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link
            href="/world"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-blue-500/20"
          >
            Enter Nation
          </Link>
          <Link
            href="/districts"
            className="px-8 py-3 glass border border-white/20 hover:border-white/40 text-gray-300 text-sm font-semibold uppercase tracking-widest rounded-lg transition-all"
          >
            View Districts
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-8 mt-4 text-center">
          {[
            { label: 'Districts', value: '6' },
            { label: 'Citizen Slots', value: '120' },
            { label: 'Active Missions', value: '4' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500 mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
