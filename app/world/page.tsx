'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with Three.js
const WorldCanvas = dynamic(() => import('@/components/WorldCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
      Loading 3D scene…
    </div>
  ),
});

export default function WorldPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <PageHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Canvas */}
        <div className="lg:col-span-2 glass rounded-xl border border-white/10 overflow-hidden h-[520px]">
          <Suspense fallback={null}>
            <WorldCanvas />
          </Suspense>
        </div>

        {/* District overview sidebar */}
        <div className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            District Grid
          </h2>
          {DISTRICT_OVERVIEW.map((d) => (
            <div
              key={d.name}
              className="glass rounded-lg border border-white/10 px-4 py-3 flex items-center justify-between group hover:border-blue-500/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{d.icon}</span>
                <div>
                  <p className="text-sm text-white font-medium">{d.name}</p>
                  <p className="text-xs text-gray-500">{d.type}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-blue-400 font-semibold">{d.pop}</div>
                <div className="text-[10px] text-gray-500">citizens</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">World View</h1>
        <p className="text-gray-500 text-sm mt-1">
          Live map of the digital nation · Season 0
        </p>
      </div>
      <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-emerald-400/30 text-xs text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        LIVE
      </div>
    </div>
  );
}

const DISTRICT_OVERVIEW = [
  { name: 'Artist Quarter', type: 'Arts', icon: '🎭', pop: 18 },
  { name: 'Council Hall', type: 'Government', icon: '🏛️', pop: 12 },
  { name: 'Market', type: 'Commerce', icon: '🛒', pop: 24 },
  { name: 'Archive', type: 'Knowledge', icon: '📚', pop: 10 },
  { name: 'Port', type: 'Trade', icon: '⚓', pop: 22 },
  { name: 'Temple', type: 'Faith', icon: '🕯️', pop: 8 },
];
