import { supabase } from '@/lib/supabase';
import {
  CANON_LORE_ENTRIES,
  FALLBACK_EVENTS,
  SIMCOUNTRY_LORE,
} from './canon';
import type {
  Citizen,
  District,
  IrlEvent,
  LoreCategory,
  LoreEntry,
  Nation,
} from './types';

export async function getNationBySlug(slug: string): Promise<Nation | null> {
  const { data, error } = await supabase
    .from('nations')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    if (slug === 'genesis') {
      return SIMCOUNTRY_LORE.genesisNation;
    }
    return null;
  }

  return data as Nation;
}

export async function getDistrictsByNation(
  nationId: string
): Promise<District[]> {
  const { data, error } = await supabase
    .from('districts')
    .select('*')
    .eq('nation_id', nationId);

  if (error || !data?.length) {
    if (nationId === 'genesis-nation' || nationId === 'genesis') {
      return [...SIMCOUNTRY_LORE.genesisDistricts];
    }
    return [];
  }

  return data.map((row) => ({
    id: row.id as string,
    name: row.name as string,
    type: row.type as District['type'],
    population: (row.population as number) ?? 0,
    lore: (row.lore as string) ?? '',
    coordinates: (row.coordinates as District['coordinates']) ?? {
      x: 0,
      y: 0,
      z: 0,
    },
    nation_id: row.nation_id as string,
  }));
}

export async function getCitizenByWallet(
  walletAddress: string
): Promise<Citizen | null> {
  const { data, error } = await supabase
    .from('citizens')
    .select('*')
    .eq('wallet_address', walletAddress)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as Citizen;
}

export async function getLoreByCategory(
  category: LoreCategory
): Promise<LoreEntry[]> {
  const { data, error } = await supabase
    .from('lore_entries')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error || !data?.length) {
    return CANON_LORE_ENTRIES.filter((entry) => entry.category === category);
  }

  return data as LoreEntry[];
}

export async function getUpcomingEvents(
  nationId?: string
): Promise<IrlEvent[]> {
  const now = new Date().toISOString();
  let query = supabase
    .from('events')
    .select('*')
    .gte('scheduled_at', now)
    .order('scheduled_at', { ascending: true });

  if (nationId) {
    query = query.eq('nation_id', nationId);
  }

  const { data, error } = await query;

  if (error || !data?.length) {
    return FALLBACK_EVENTS.filter(
      (event) => new Date(event.scheduled_at) >= new Date(now)
    );
  }

  return data as IrlEvent[];
}
