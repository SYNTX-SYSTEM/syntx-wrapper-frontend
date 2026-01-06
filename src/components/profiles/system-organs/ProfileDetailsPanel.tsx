// ═══════════════════════════════════════════════════════════════════════════
// 📋 PROFILE DETAILS PANEL - Shows selected profile with edit capabilities
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import { ProfileHeader } from './ProfileHeader';
import { ProfileEditView } from './ProfileEditView_v2';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

interface ProfileDetailsPanelProps {
  profileId: string;
}

export function ProfileDetailsPanel({ profileId }: ProfileDetailsPanelProps) {
  const { data: profileData, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/resonanz/profiles/crud/${profileId}`,
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 0,
      dedupingInterval: 0
    }
  );

  // Usage data embedded in profile response
  const usage = profileData ? {
    status: profileData.active ? 'ACTIVE' : 'INACTIVE',
    last_used: profileData.updated_at || null,
    total_uses: 0
  } : null;

  if (error) {
    return (
      <div style={{
        padding: 40,
        textAlign: 'center',
        color: 'rgba(255,255,255,0.5)',
        fontFamily: 'monospace'
      }}>
        ⚠️ ERROR LOADING PROFILE
      </div>
    );
  }

  if (!profileData) {
    return (
      <div style={{
        padding: 40,
        textAlign: 'center',
        color: 'rgba(255,255,255,0.5)',
        fontFamily: 'monospace'
      }}>
        LOADING...
      </div>
    );
  }

  const handleSave = async (data: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/resonanz/profiles/crud/${profileId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    );
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Update failed: ${error}`);
    }
    
    // Trigger revalidation - fetch fresh data from GET endpoint
    await mutate();
  };

  const handleDelete = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/resonanz/profiles/crud/${profileId}`,
      { method: 'DELETE' }
    );
    
    if (response.ok) {
      // Get first profile and navigate to it
      const profilesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resonanz/profiles/crud`);
      const profilesData = await profilesResponse.json();
      const firstProfileId = Object.keys(profilesData.profiles)[0];
      
      if (firstProfileId) {
        window.location.href = `?profile=${firstProfileId}`;
      } else {
        window.location.reload();
      }
    } else {
      throw new Error('Delete failed');
    }
  };

  // Extract profile from API response structure
  const profile = profileData?.profile || profileData;
  const status = (profile?.active ?? true) ? 'ACTIVE' : 'INACTIVE';

  return (
    <div>
      <ProfileHeader
        name={profile.label || profile.name || profileId}
        profileId={profileId}
        status={status}
      />
      
      <ProfileEditView
        profile={profile}
        profileId={profileId}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
