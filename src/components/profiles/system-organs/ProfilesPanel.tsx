// ═══════════════════════════════════════════════════════════════════════════
// 🌊 PROFILES PANEL - Root System Container
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProfileListSidebar } from './ProfileListSidebar';
import { ProfileDetailsPanel } from './ProfileDetailsPanel';
import { getProfiles } from '@/lib/api';
import { getAllProfileAnalytics } from '@/lib/api-profiles';

export function ProfilesPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [profilesRes, analyticsRes] = await Promise.all([
          getProfiles(),
          getAllProfileAnalytics(7)
        ]);
        
        const profileList = Object.keys(profilesRes.profiles || {}).map(id => {
          const profile = profilesRes.profiles[id];
          const analytics = analyticsRes[id] || {
            total_uses: 0,
            avg_score: 0,
            status: 'UNUSED'
          };
          
          return {
            id,
            name: profile.name || id,
            totalUses: analytics.total_uses,
            avgScore: analytics.avg_score,
            status: analytics.status
          };
        });
        
        setProfiles(profileList);
        
        const urlProfile = searchParams.get('profile');
        if (urlProfile && profileList.some(p => p.id === urlProfile)) {
          setSelectedProfileId(urlProfile);
        } else if (profileList.length > 0) {
          setSelectedProfileId(profileList[0].id);
        }
        
      } catch (error) {
        console.error('Failed to load profiles:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [searchParams]);

  const handleSelectProfile = (profileId: string) => {
    setSelectedProfileId(profileId);
    router.push(`?profile=${profileId}`, { scroll: false });
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 400,
        fontFamily: 'monospace',
        color: '#00d4ff'
      }}>
        LOADING SYSTEM ORGANS...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 16, minHeight: 500 }}>
      {/* Left Sidebar */}
      <div style={{ 
        width: 300, 
        background: 'rgba(0,0,0,0.3)', 
        borderRadius: 12, 
        border: '1px solid rgba(0,212,255,0.3)',
        padding: 16
      }}>
        <ProfileListSidebar
          profiles={profiles}
          selectedId={selectedProfileId}
          onSelect={handleSelectProfile}
        />
      </div>

      {/* Right Panel */}
      <div style={{ 
        flex: 1, 
        background: 'rgba(0,0,0,0.3)', 
        borderRadius: 12, 
        border: '1px solid rgba(0,212,255,0.3)',
        padding: 24
      }}>
        {selectedProfileId ? (
          <ProfileDetailsPanel profileId={selectedProfileId} />
        ) : (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: 400,
            fontFamily: 'monospace',
            color: 'rgba(255,255,255,0.4)'
          }}>
            NO PROFILE SELECTED
          </div>
        )}
      </div>
    </div>
  );
}
