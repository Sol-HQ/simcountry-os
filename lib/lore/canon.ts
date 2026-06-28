import type {
  District,
  Faction,
  IrlEvent,
  LoreEntry,
  Nation,
} from './types';

export const SIMCOUNTRY_LORE = {
  originStory:
    'In the age before nations, the Sol Protocol emerged from the void — a lattice of light woven from consensus itself. No king commanded it; no empire owned it. Only those who dared to sign the chain could claim a place in the new world. From that first block, seven districts rose like constellations around the Sol Seal, and the Genesis Nation was born. Every wallet that connects is a citizen arriving at the frontier. Every district is a story waiting to be written.',

  factions: [
    {
      id: 'architects',
      name: 'The Architects',
      motto: 'We build what endures.',
      description:
        'Masters of infrastructure and governance design. The Architects laid the hexagonal grid of Genesis and inscribed the first laws into immutable code. They believe nations are systems — elegant, scalable, and worthy of centuries.',
      symbol: 'Compass Rose',
    },
    {
      id: 'merchant-guild',
      name: 'The Merchant Guild',
      motto: 'Trade is the pulse of nations.',
      description:
        'Caravans of digital commerce flow through their districts. The Guild controls the trade routes between nations, sets exchange rates for cultural goods, and funds expeditions into uncharted wilderness tiles.',
      symbol: 'Twin Scales',
    },
    {
      id: 'sentinel-order',
      name: 'The Sentinel Order',
      motto: 'Vigilance is sovereignty.',
      description:
        'Warriors and strategists who guard the borders of Genesis. The Sentinels maintain defense districts, train citizen-soldiers, and respond to threats from rival chains and corrupted nodes.',
      symbol: 'Trident Shield',
    },
    {
      id: 'wanderers',
      name: 'The Wanderers',
      motto: 'No district holds us.',
      description:
        'Nomadic explorers who map the wilderness between nations. Wanderers discover new lore fragments, scout event locations, and carry messages across the Sol Protocol when governance channels fail.',
      symbol: 'Open Road',
    },
    {
      id: 'prophets',
      name: 'The Prophets',
      motto: 'The chain remembers what we forget.',
      description:
        'Keepers of prophecy and sacred symbols. The Prophets interpret omens in block timestamps, maintain the lore archives, and speak of an Infinite Loop that will one day reunite all fractured nations.',
      symbol: 'All-Seeing Seal',
    },
  ] satisfies Faction[],

  symbols: [
    {
      name: 'SolSeal',
      description:
        'The sacred geometry at the heart of Genesis — a circle of twelve radiating lines representing the original validator nodes. Citizens touch the SolSeal in ceremony when founding new districts.',
    },
    {
      name: 'The Trident Chain',
      description:
        'Three interlocked triangles forming a trident, symbol of the Sentinel Order and the defense of sovereign consensus. Forged during the First Fork Wars.',
    },
    {
      name: 'The Infinite Loop',
      description:
        'A möbius strip rendered in cyan light, prophesied by the Prophets to appear when all seven Genesis districts achieve perfect harmony. None have witnessed it — yet.',
    },
  ],

  genesisDistricts: [
    {
      id: 'genesis-capital',
      name: 'Sol Crown',
      type: 'capital',
      population: 12400,
      lore: 'The seat of Genesis governance. The Sol Seal rotates eternally above the council amphitheater.',
      coordinates: { x: 0, y: 0.3, z: 0 },
    },
    {
      id: 'genesis-trade-east',
      name: 'Merchant\'s Reach',
      type: 'trade',
      population: 8200,
      lore: 'Eastern trade hub where Guild caravans exchange cultural tokens and rare artifacts.',
      coordinates: { x: 4, y: 0.2, z: 0 },
    },
    {
      id: 'genesis-trade-west',
      name: 'Harbor of Echoes',
      type: 'trade',
      population: 6100,
      lore: 'Western port district where chain messages arrive from distant nations.',
      coordinates: { x: -4, y: 0.2, z: 0 },
    },
    {
      id: 'genesis-culture',
      name: 'Luminarch Quarter',
      type: 'culture',
      population: 9300,
      lore: 'Arts and archives district. Prophets maintain the lore vault beneath the violet spires.',
      coordinates: { x: 2, y: 0.2, z: 3.5 },
    },
    {
      id: 'genesis-defense',
      name: 'Sentinel Bastion',
      type: 'defense',
      population: 5400,
      lore: 'Fortified redoubt of the Sentinel Order. Training grounds for citizen-soldiers.',
      coordinates: { x: -2, y: 0.2, z: 3.5 },
    },
    {
      id: 'genesis-wilderness-north',
      name: 'The Shattered Expanse',
      type: 'wilderness',
      population: 1200,
      lore: 'Uncharted northern tiles where Wanderers discover prophecy fragments.',
      coordinates: { x: 0, y: 0.15, z: 5 },
    },
    {
      id: 'genesis-wilderness-south',
      name: 'Void Margin',
      type: 'wilderness',
      population: 800,
      lore: 'Southern edge of Genesis where the hex grid fades into unmapped darkness.',
      coordinates: { x: 0, y: 0.15, z: -5 },
    },
  ] satisfies District[],

  genesisNation: {
    id: 'genesis-nation',
    name: 'Genesis Nation',
    slug: 'genesis',
    lore_summary:
      'The first nation forged on the Sol Protocol. Seven districts orbit the eternal Sol Seal.',
    founded_at: '2024-01-01T00:00:00Z',
    owner_wallet: null,
    flag_url: null,
    banner_url: null,
  } satisfies Nation,
} as const;

export const CANON_LORE_ENTRIES: LoreEntry[] = [
  {
    id: 'lore-origin',
    title: 'The Emergence of Sol Protocol',
    slug: 'emergence-of-sol-protocol',
    category: 'history',
    body: SIMCOUNTRY_LORE.originStory,
  },
  ...SIMCOUNTRY_LORE.factions.map((f) => ({
    id: `lore-faction-${f.id}`,
    title: f.name,
    slug: f.id,
    category: 'faction' as const,
    body: `${f.motto}\n\n${f.description}`,
  })),
  ...SIMCOUNTRY_LORE.symbols.map((s, i) => ({
    id: `lore-symbol-${i}`,
    title: s.name,
    slug: s.name.toLowerCase().replace(/\s+/g, '-'),
    category: 'symbol' as const,
    body: s.description,
  })),
  ...SIMCOUNTRY_LORE.genesisDistricts.map((d) => ({
    id: `lore-geo-${d.id}`,
    title: d.name,
    slug: d.id,
    category: 'geography' as const,
    body: d.lore,
  })),
  {
    id: 'lore-prophecy-loop',
    title: 'The Infinite Loop Prophecy',
    slug: 'infinite-loop-prophecy',
    category: 'prophecy',
    body: 'When all seven districts of Genesis achieve perfect harmony — capital crowned, trade flowing, culture thriving, defense unbroken, wilderness mapped — the Infinite Loop shall manifest at the Sol Seal. The Prophets say it will reunite every fractured nation into a single chain of light. No block timestamp has yet matched the omen.',
  },
];

export const FALLBACK_EVENTS: IrlEvent[] = [
  {
    id: 'event-genesis-conclave',
    title: 'Genesis Governance Conclave',
    description:
      'Annual assembly of district governors to ratify the Season 1 charter and allocate treasury rewards.',
    event_type: 'governance',
    scheduled_at: '2026-07-15T18:00:00Z',
    location_lat: null,
    location_lng: null,
    reward_xp: 500,
  },
  {
    id: 'event-solstice-gathering',
    title: 'Solstice IRL Gathering — Austin',
    description:
      'Citizens meet at the Sol Seal monument for a founding ceremony, district showcases, and wallet onboarding.',
    event_type: 'irl',
    scheduled_at: '2026-08-21T14:00:00Z',
    location_lat: 30.2672,
    location_lng: -97.7431,
    reward_xp: 1000,
  },
  {
    id: 'event-trade-summit',
    title: 'Cross-Chain Trade Summit',
    description:
      'Digital summit hosted in Merchant\'s Reach. Live auctions, Guild contracts, and economic policy votes.',
    event_type: 'economic',
    scheduled_at: '2026-09-03T20:00:00Z',
    location_lat: null,
    location_lng: null,
    reward_xp: 350,
  },
];
