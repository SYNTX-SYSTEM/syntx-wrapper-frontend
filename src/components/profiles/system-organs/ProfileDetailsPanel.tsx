// ═══════════════════════════════════════════════════════════════════════════
// 📊 PROFILE DETAILS PANEL - Right Side Container
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import React, { useEffect, useState } from 'react';
import { ProfileHeader } from './ProfileHeader';
import { PatternGrid } from './PatternGrid';
import { DormantIndicator } from './DormantIndicator';
import { getProfile } from '@/lib/api';
import { getProfileUsage, getPatternPulse } from '@/lib/api-profiles';
import type { ProfileUsageData, PatternAnalyticsData } from '@/lib/api-profiles';

interface ProfileDetailsPanelProps {
  profileId: string;
}

export function ProfileDetailsPanel({ profileId }: ProfileDetailsPanelProps) {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [usage, setUsage] = useState<ProfileUsageData | null>(null);
  const [patterns, setPatterns] = useState<PatternAnalyticsData | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [profileRes, usageRes, patternsRes] = await Promise.all([
          getProfile(profileId),
          getProfileUsage(profileId, 7),
          getPatternPulse(profileId, 7, true)
        ]);
        
        setProfileData(profileRes);
        setUsage(usageRes.data);
        setPatterns(patternsRes.data);
      } catch (error) {
        console.error('Failed to load profile data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (profileId) {
      loadData();
    }
  }, [profileId]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 300,
        fontFamily: 'monospace',
        color: '#00d4ff'
      }}>
        LOADING SYSTEM DATA...
      </div>
    );
  }

  if (!profileData || !usage || !patterns) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 300,
        fontFamily: 'monospace',
        color: '#ef4444'
      }}>
        FAILED TO LOAD PROFILE DATA
      </div>
    );
  }

  const mappedPatterns = (Array.isArray(profileData.components) ? profileData.components : []).map((comp: any) => {
    const patternData = patterns.patterns[comp.name] || {};
    return {
      name: comp.name,
      cluster: comp.cluster,
      score: patternData.score || 0,
      state: patternData.state || 'UNBORN',
      stability: patternData.stability || 'UNKNOWN',
      matchCount: patternData.match_count || 0,
      weight: comp.weight
    };
  });

  return (
    <div>
      <ProfileHeader
        profileName={profileData.name || profileId}
        profileId={profileId}
        totalPatterns={mappedPatterns.length}
        lastUsed={usage.last_used}
        status={usage.status}
        totalUses={usage.total_uses}
      />
      
      <PatternGrid patterns={mappedPatterns} />
      
      <DormantIndicator
        message={patterns.message}
        state={patterns.state}
        totalPulses={patterns.total_pulses}
      />
    </div>
  );
}
