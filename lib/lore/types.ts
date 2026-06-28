export type DistrictType =
  | 'capital'
  | 'trade'
  | 'culture'
  | 'defense'
  | 'wilderness';

export type CitizenRole =
  | 'founder'
  | 'governor'
  | 'merchant'
  | 'soldier'
  | 'wanderer';

export type LoreCategory =
  | 'history'
  | 'faction'
  | 'symbol'
  | 'geography'
  | 'prophecy';

export type EventType = 'irl' | 'digital' | 'governance' | 'economic';

export interface LoreEntry {
  id: string;
  title: string;
  slug: string;
  category: LoreCategory;
  body: string;
  created_at?: string;
}

export interface Faction {
  id: string;
  name: string;
  motto: string;
  description: string;
  symbol: string;
}

export interface District {
  id: string;
  name: string;
  type: DistrictType;
  population: number;
  lore: string;
  coordinates: { x: number; y: number; z: number };
  nation_id?: string;
}

export interface Nation {
  id: string;
  name: string;
  slug: string;
  lore_summary: string;
  founded_at: string;
  owner_wallet: string | null;
  flag_url: string | null;
  banner_url: string | null;
}

export interface Citizen {
  id: string;
  wallet_address: string;
  nation_id: string | null;
  district_id: string | null;
  role: CitizenRole;
  xp: number;
  joined_at: string;
}

export interface IrlEvent {
  id: string;
  nation_id?: string;
  title: string;
  description: string;
  event_type: EventType;
  scheduled_at: string;
  location_lat: number | null;
  location_lng: number | null;
  reward_xp: number;
}
