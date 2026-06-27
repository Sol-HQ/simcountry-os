'use client';

import { useState } from 'react';

interface Proposal {
  id: number;
  title: string;
  description: string;
  yea: number;
  nay: number;
  abstain: number;
  status: 'active' | 'passed' | 'rejected';
  deadline: string;
}

const PROPOSALS: Proposal[] = [
  {
    id: 12,
    title: 'Resolution #12: Cultural Output Bonus',
    description:
      'Allocate 500 treasury tokens to boost Artist Quarter cultural output by 5% for the next 3 cycles.',
    yea: 14,
    nay: 3,
    abstain: 2,
    status: 'passed',
    deadline: 'Ended',
  },
  {
    id: 13,
    title: 'Resolution #13: Expand Temple Grounds',
    description:
      'Expand the Temple district boundary to allow 4 additional citizen slots. Estimated cost: 800 treasury.',
    yea: 7,
    nay: 8,
    abstain: 1,
    status: 'active',
    deadline: 'Cycle 14',
  },
  {
    id: 14,
    title: 'Resolution #14: Open Port to External Trade',
    description:
      'Allow cross-nation trade routes through the Port district, generating passive treasury income.',
    yea: 11,
    nay: 2,
    abstain: 3,
    status: 'active',
    deadline: 'Cycle 15',
  },
];

export default function GovernancePage() {
  const [votes, setVotes] = useState<Record<number, string>>({});

  function castVote(id: number, choice: string) {
    setVotes((prev) => ({ ...prev, [id]: choice }));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Council Hall
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Governance proposals · Cycle 13
          </p>
        </div>
        <div className="glass px-4 py-2 rounded-lg border border-white/10 text-xs text-gray-400 uppercase tracking-widest">
          Council Seats: 19 / 20
        </div>
      </div>

      {/* Proposals */}
      <div className="space-y-4">
        {PROPOSALS.map((p) => (
          <ProposalCard
            key={p.id}
            proposal={p}
            userVote={votes[p.id]}
            onVote={castVote}
          />
        ))}
      </div>

      <p className="text-xs text-gray-600 text-center">
        On-chain governance and token-weighted voting available in v1
      </p>
    </div>
  );
}

function ProposalCard({
  proposal,
  userVote,
  onVote,
}: {
  proposal: Proposal;
  userVote?: string;
  onVote: (id: number, choice: string) => void;
}) {
  const total = proposal.yea + proposal.nay + proposal.abstain;
  const yeaPct = total > 0 ? Math.round((proposal.yea / total) * 100) : 0;

  const statusColors: Record<string, string> = {
    active: 'text-emerald-400 border-emerald-400/30',
    passed: 'text-blue-400 border-blue-400/30',
    rejected: 'text-red-400 border-red-400/30',
  };

  return (
    <div className="glass rounded-xl border border-white/10 p-6 space-y-4">
      {/* Title row */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-white font-semibold">{proposal.title}</h3>
        <span
          className={`shrink-0 text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded border ${
            statusColors[proposal.status]
          }`}
        >
          {proposal.status}
        </span>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed">
        {proposal.description}
      </p>

      {/* Vote bar */}
      <div className="space-y-2">
        <div className="flex gap-0.5 h-2 rounded-full overflow-hidden bg-white/5">
          <div
            className="bg-emerald-500 transition-all"
            style={{ width: `${yeaPct}%` }}
          />
          <div
            className="bg-red-500 transition-all"
            style={{ width: total > 0 ? `${Math.round((proposal.nay / total) * 100)}%` : '0%' }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-wider">
          <span className="text-emerald-400">Yea {proposal.yea}</span>
          <span className="text-gray-500">Abstain {proposal.abstain}</span>
          <span className="text-red-400">Nay {proposal.nay}</span>
        </div>
      </div>

      {/* Vote buttons */}
      {proposal.status === 'active' && (
        <div className="flex gap-2 pt-1">
          {['yea', 'abstain', 'nay'].map((choice) => (
            <button
              key={choice}
              onClick={() => onVote(proposal.id, choice)}
              disabled={!!userVote}
              className={`flex-1 py-2 rounded-lg text-xs uppercase tracking-widest font-semibold border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                userVote === choice
                  ? choice === 'yea'
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                    : choice === 'nay'
                    ? 'bg-red-500/20 border-red-500/50 text-red-400'
                    : 'bg-white/10 border-white/20 text-gray-400'
                  : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
              }`}
            >
              {choice}
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-between text-xs text-gray-600">
        <span>Deadline: {proposal.deadline}</span>
        {userVote && (
          <span className="text-gray-400">You voted: {userVote}</span>
        )}
      </div>
    </div>
  );
}
