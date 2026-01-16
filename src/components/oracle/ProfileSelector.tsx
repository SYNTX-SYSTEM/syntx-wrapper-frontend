// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   👤 PROFILE SELECTOR - ENTITY SWITCHING                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { ORACLE_COLORS } from './constants';

type Profile = {
  name: string;
  entity_id: string;
  description?: string;
  color?: string;
};

type Props = {
  activeProfile: string | null;
  onChange: (profileName: string) => void;
  loading: boolean;
};

export function ProfileSelector({ activeProfile, onChange, loading }: Props) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    setLoadingProfiles(true);
    try {
      const response = await api.getProfiles();
      setProfiles(response.profiles || []);
    } catch (error) {
      console.error('Failed to load profiles:', error);
      // Fallback profiles
      setProfiles([
        { name: 'GPT-4', entity_id: 'gpt-4', color: ORACLE_COLORS.primary },
        { name: 'Claude 3 Opus', entity_id: 'claude-3-opus', color: ORACLE_COLORS.secondary },
        { name: 'Gemini 1.5 Pro', entity_id: 'gemini-1.5-pro', color: ORACLE_COLORS.tertiary },
      ]);
    } finally {
      setLoadingProfiles(false);
    }
  };

  const getProfileColor = (profile: Profile) => {
    if (profile.color) return profile.color;
    
    // Default colors based on name
    if (profile.name.includes('GPT')) return ORACLE_COLORS.primary;
    if (profile.name.includes('Claude')) return ORACLE_COLORS.secondary;
    if (profile.name.includes('Gemini')) return ORACLE_COLORS.tertiary;
    return ORACLE_COLORS.primary;
  };

  return (
    <div style={{
      padding: 20,
      background: ORACLE_COLORS.bgLight,
      borderRadius: 14,
      border: `1px solid ${ORACLE_COLORS.secondary}40`,
      marginTop: 20,
    }}>
      {/* Header */}
      <div style={{
        fontSize: 14,
        fontWeight: 800,
        color: ORACLE_COLORS.secondary,
        marginBottom: 12,
        letterSpacing: 2,
        fontFamily: 'monospace',
      }}>
        PROFILE SELECTOR
      </div>

      {loadingProfiles ? (
        <div style={{
          color: ORACLE_COLORS.textDim,
          fontSize: 12,
          fontFamily: 'monospace',
        }}>
          Loading profiles...
        </div>
      ) : (
        <>
          {/* Dropdown Mode */}
          <select
            value={activeProfile || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: ORACLE_COLORS.bg,
              border: `2px solid ${ORACLE_COLORS.secondary}60`,
              borderRadius: 8,
              color: ORACLE_COLORS.text,
              fontSize: 13,
              fontFamily: 'monospace',
              fontWeight: 600,
              cursor: loading ? 'wait' : 'pointer',
              outline: 'none',
              marginBottom: 12,
            }}
          >
            <option value="">Select Profile...</option>
            {profiles.map(profile => (
              <option key={profile.entity_id} value={profile.name}>
                {profile.name}
              </option>
            ))}
          </select>

          {/* Chip Mode (Alternative) */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
          }}>
            {profiles.map(profile => {
              const isActive = profile.name === activeProfile;
              const color = getProfileColor(profile);

              return (
                <button
                  key={profile.entity_id}
                  onClick={() => onChange(profile.name)}
                  disabled={loading}
                  style={{
                    padding: '8px 12px',
                    background: isActive 
                      ? `${color}30` 
                      : `${ORACLE_COLORS.bg}80`,
                    border: `2px solid ${isActive ? color : `${color}40`}`,
                    borderRadius: 8,
                    color: isActive ? color : ORACLE_COLORS.textDim,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: loading ? 'wait' : 'pointer',
                    fontFamily: 'monospace',
                    letterSpacing: 1,
                    transition: 'all 0.2s',
                    opacity: loading ? 0.5 : 1,
                    boxShadow: isActive ? `0 0 15px ${color}40` : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && !isActive) {
                      e.currentTarget.style.borderColor = color;
                      e.currentTarget.style.color = color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = `${color}40`;
                      e.currentTarget.style.color = ORACLE_COLORS.textDim;
                    }
                  }}
                >
                  {profile.name}
                </button>
              );
            })}
          </div>

          {/* Active Profile Display */}
          {activeProfile && (
            <div style={{
              marginTop: 12,
              padding: 12,
              background: `${ORACLE_COLORS.secondary}10`,
              borderRadius: 8,
              fontSize: 11,
              color: ORACLE_COLORS.textDim,
              fontFamily: 'monospace',
            }}>
              Active: <span style={{
                color: ORACLE_COLORS.secondary,
                fontWeight: 700,
              }}>
                {activeProfile}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
