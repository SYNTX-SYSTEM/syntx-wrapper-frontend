'use client';

import useSWR from 'swr';
import { SystemSnapshot } from '@/types/profile-organ';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';

async function fetchSystemSnapshot(): Promise<SystemSnapshot> {
  const profilesRes = await fetch(`${BASE_URL}/resonanz/profiles/crud`);
  if (!profilesRes.ok) throw new Error('Failed to fetch profiles');
  const profilesData = await profilesRes.json();
  
  const formatsRes = await fetch(`${BASE_URL}/resonanz/formats`);
  if (!formatsRes.ok) throw new Error('Failed to fetch formats');
  const formatsData = await formatsRes.json();
  
  const profiles = Object.entries(profilesData.profiles || {}).map(([id, data]: [string, any]) => ({
    id,
    name: data.name || id,
    label: data.label || id,
    active: data.active ?? true,
    weight: data.weight ?? 1,
    tags: data.tags || [],
    patterns: data.patterns || [],
    updated_at: data.updated_at || new Date().toISOString(),
  }));
  
  const formats = (formatsData.formats || []).map((f: any) => ({
    name: f.name,
    fields: f.fields?.map((field: any) => field.name || field) || [],
    profile_reference: f.profile_reference,
  }));
  
  const bindings = formats
    .filter((f: any) => f.profile_reference)
    .map((f: any) => ({
      profileId: f.profile_reference,
      formatName: f.name,
    }));
  
  return {
    profiles,
    formats,
    bindings,
    timestamp: Date.now(),
  };
}

export function useSystemSnapshot() {
  return useSWR<SystemSnapshot>('system-snapshot', fetchSystemSnapshot, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
  });
}
