// ═══════════════════════════════════════════════════════════════════════════
// 📋 PROFILE LIST SIDEBAR - Left Side List
// ═══════════════════════════════════════════════════════════════════════════

import React from 'react';

interface ProfileItem {
  id: string;
  name: string;
  totalUses: number;
  avgScore: number;
  status: 'ACTIVE' | 'UNUSED';
}

interface ProfileListSidebarProps {
  profiles: ProfileItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProfileListSidebar({ 
  profiles, 
  selectedId, 
  onSelect 
}: ProfileListSidebarProps) {
  
  if (profiles.length === 0) {
    return (
      <div style={{ 
        padding: 24, 
        textAlign: 'center', 
        color: 'rgba(255,255,255,0.4)', 
        fontFamily: 'monospace', 
        fontSize: 12 
      }}>
        NO PROFILES FOUND
      </div>
    );
  }
  
  return (
    <div>
      <div style={{ 
        padding: '12px 0', 
        marginBottom: 12, 
        borderBottom: '1px solid rgba(0,212,255,0.2)' 
      }}>
        <h3 style={{ 
          fontSize: 11, 
          fontWeight: 600, 
          color: 'rgba(255,255,255,0.6)', 
          fontFamily: 'monospace', 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em' 
        }}>
          Profiles ({profiles.length})
        </h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => onSelect(profile.id)}
            style={{
              width: '100%',
              padding: 12,
              textAlign: 'left',
              background: selectedId === profile.id ? 'rgba(0,212,255,0.15)' : 'transparent',
              border: selectedId === profile.id ? '1px solid rgba(0,212,255,0.5)' : '1px solid rgba(255,255,255,0.05)',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'monospace',
              borderLeft: selectedId === profile.id ? '3px solid #00d4ff' : 'none'
            }}
            onMouseEnter={(e) => {
              if (selectedId !== profile.id) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedId !== profile.id) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: 6 
            }}>
              <div style={{ 
                fontSize: 12, 
                color: '#00d4ff', 
                fontWeight: 600 
              }}>
                {profile.name}
              </div>
              <div style={{ 
                fontSize: 10, 
                padding: '2px 6px', 
                borderRadius: 4, 
                background: profile.status === 'ACTIVE' ? 'rgba(16,185,129,0.2)' : 'rgba(128,128,128,0.2)',
                color: profile.status === 'ACTIVE' ? '#10b981' : 'rgba(255,255,255,0.4)' 
              }}>
                {profile.status}
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 12, 
              fontSize: 10, 
              color: 'rgba(255,255,255,0.4)' 
            }}>
              <span>USES: {profile.totalUses}</span>
              <span>SCORE: {Math.round(profile.avgScore)}%</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
