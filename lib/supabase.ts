import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type exports for table rows
export type District = {
  id: string;
  name: string;
  type: string;
  occupancy: number;
  culture_output: number;
  created_at: string;
};

export type CitizenSlot = {
  id: number;
  name: string;
  role: string;
  status: 'npc' | 'claimable' | 'claimed';
  district_id: string;
  output_label: string;
  biography: string | null;
  created_at: string;
};

export type User = {
  id: string;
  wallet_address: string;
  username: string | null;
  created_at: string;
};

export type Claim = {
  id: string;
  user_id: string;
  citizen_slot_id: number;
  claimed_at: string;
  tx_signature: string | null;
};

export type Mission = {
  id: number;
  title: string;
  description: string;
  reward_type: string;
  reward_value: number;
  deadline_cycle: number | null;
  status: 'active' | 'completed' | 'expired' | 'locked';
  created_at: string;
};

export type Reward = {
  id: string;
  user_id: string;
  mission_id: number | null;
  type: string;
  value: number;
  granted_at: string;
  tx_signature: string | null;
};
