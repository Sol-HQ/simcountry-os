'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CANON_LORE_ENTRIES } from '@/lib/lore/canon';
import type { LoreCategory } from '@/lib/lore/types';

const CATEGORIES: { key: LoreCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'history', label: 'History' },
  { key: 'faction', label: 'Factions' },
  { key: 'symbol', label: 'Symbols' },
  { key: 'geography', label: 'Geography' },
  { key: 'prophecy', label: 'Prophecy' },
];

const CATEGORY_COLORS: Record<LoreCategory, string> = {
  history: '#f59e0b',
  faction: '#a855f7',
  symbol: '#22d3ee',
  geography: '#22c55e',
  prophecy: '#f472b6',
};

function truncateBody(body: string, max = 200): string {
  if (body.length <= max) return body;
  return `${body.slice(0, max).trimEnd()}…`;
}

export default function LorePage() {
  const [activeCategory, setActiveCategory] = useState<LoreCategory | 'all'>(
    'all'
  );

  const entries = useMemo(() => {
    if (activeCategory === 'all') return CANON_LORE_ENTRIES;
    return CANON_LORE_ENTRIES.filter((e) => e.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-500/70 mb-2">
          Archives of Genesis
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Nation Lore
        </h1>
        <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
          Histories, factions, symbols, and prophecies inscribed on the Sol
          Protocol. Canon data until live Supabase archives connect.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all border ${
              activeCategory === cat.key
                ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
                : 'glass border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {entries.map((entry) => {
          const accent = CATEGORY_COLORS[entry.category];
          return (
            <article
              key={entry.id}
              className="glass rounded-xl p-5 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col gap-3"
            >
              <span
                className="inline-flex self-start px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium"
                style={{
                  color: accent,
                  backgroundColor: `${accent}18`,
                  border: `1px solid ${accent}44`,
                }}
              >
                {entry.category}
              </span>
              <h2 className="text-white font-semibold text-base leading-snug">
                {entry.title}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed flex-1">
                {truncateBody(entry.body)}
              </p>
              <Link
                href={`/lore#${entry.slug}`}
                className="text-xs uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Read More →
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
