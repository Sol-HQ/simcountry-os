import { DistrictCard } from '@/components/DistrictCard';

const DISTRICTS = [
  {
    id: 'artist-quarter',
    name: 'Artist Quarter',
    type: 'arts',
    occupancy: 75,
    cultureOutput: 18,
  },
  {
    id: 'council-hall',
    name: 'Council Hall',
    type: 'government',
    occupancy: 100,
    cultureOutput: 8,
  },
  {
    id: 'market',
    name: 'Market',
    type: 'commerce',
    occupancy: 90,
    cultureOutput: 12,
  },
  {
    id: 'archive',
    name: 'Archive',
    type: 'knowledge',
    occupancy: 50,
    cultureOutput: 22,
  },
  {
    id: 'port',
    name: 'Port',
    type: 'trade',
    occupancy: 83,
    cultureOutput: 9,
  },
  {
    id: 'temple',
    name: 'Temple',
    type: 'faith',
    occupancy: 40,
    cultureOutput: 14,
  },
];

export default function DistrictsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Districts</h1>
        <p className="text-gray-500 text-sm mt-1">
          Six zones that define the shape of the nation
        </p>
      </div>

      {/* Nation-level culture summary */}
      <div className="glass rounded-xl border border-white/10 px-6 py-4 flex items-center gap-8">
        <div>
          <div className="text-xs uppercase tracking-widest text-gray-500">
            Total Culture Output
          </div>
          <div className="text-2xl font-bold text-purple-400 mt-0.5">
            +83 / cycle
          </div>
        </div>
        <div className="h-10 w-px bg-white/10" />
        <div>
          <div className="text-xs uppercase tracking-widest text-gray-500">
            Districts Active
          </div>
          <div className="text-2xl font-bold text-white mt-0.5">6 / 6</div>
        </div>
        <div className="h-10 w-px bg-white/10" />
        <div>
          <div className="text-xs uppercase tracking-widest text-gray-500">
            Avg Occupancy
          </div>
          <div className="text-2xl font-bold text-blue-400 mt-0.5">73%</div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DISTRICTS.map((d) => (
          <DistrictCard key={d.id} {...d} />
        ))}
      </div>

      <p className="text-xs text-gray-600 text-center">
        District interactions and expansion available in v1
      </p>
    </div>
  );
}
