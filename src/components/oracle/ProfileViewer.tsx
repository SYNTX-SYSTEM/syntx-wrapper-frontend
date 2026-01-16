'use client';

import React, { useState, useEffect } from 'react';
import { ORACLE_COLORS } from './constants';

type Props = {
  profileId: string | null;
  format: string | null;
};

export function ProfileViewer({ profileId, format }: Props) {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (format && profileId) {
      loadProfile(format);
    } else {
      setProfileData(null);
    }
  }, [format, profileId]);

  const loadProfile = async (formatName: string) => {
    setLoading(true);
    try {
      const AUTH = btoa('syntx:ekv2xp73zdEUEH5u9fVu');
      
      const response = await fetch(
        `https://dev.syntx-system.com/scoring/bindings/get_binding_by_format/${formatName}`,
        {
          headers: { 'Authorization': `Basic ${AUTH}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProfileData(data.profile_complete || null);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  };

  if (!format || !profileId) {
    return (
      <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 400,
        maxHeight: 500,
        background: ORACLE_COLORS.bgLight,
        borderRadius: 14,
        border: `2px solid ${ORACLE_COLORS.tertiary}60`,
        padding: 20,
      }}>
        <div style={{
          fontSize: 12,
          color: ORACLE_COLORS.textDim,
          fontFamily: 'monospace',
          textAlign: 'center',
        }}>
          Select format & profile to view scoring data
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      width: 400,
      maxHeight: 500,
      background: `linear-gradient(135deg, ${ORACLE_COLORS.bgLight}f0, ${ORACLE_COLORS.bg}f0)`,
      borderRadius: 14,
      border: `2px solid ${ORACLE_COLORS.tertiary}80`,
      boxShadow: `0 0 30px ${ORACLE_COLORS.tertiary}20`,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: 16,
        borderBottom: `1px solid ${ORACLE_COLORS.tertiary}40`,
      }}>
        <div style={{
          fontSize: 12,
          fontWeight: 800,
          color: ORACLE_COLORS.tertiary,
          letterSpacing: 2,
          fontFamily: 'monospace',
          marginBottom: 4,
        }}>
          SCORING PROFILE
        </div>
        <div style={{
          fontSize: 9,
          color: ORACLE_COLORS.textDim,
          fontFamily: 'monospace',
          letterSpacing: 1,
        }}>
          {profileData?.profile_name || 'Loading...'}
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: 16,
      }}>
        {loading ? (
          <div style={{
            textAlign: 'center',
            color: ORACLE_COLORS.textDim,
            fontSize: 11,
            fontFamily: 'monospace',
          }}>
            Loading...
          </div>
        ) : profileData ? (
          <pre style={{
            margin: 0,
            fontSize: 9,
            fontFamily: 'monospace',
            color: ORACLE_COLORS.text,
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {JSON.stringify(profileData, null, 2)}
          </pre>
        ) : (
          <div style={{
            textAlign: 'center',
            color: ORACLE_COLORS.textDim,
            fontSize: 11,
            fontFamily: 'monospace',
          }}>
            No profile data
          </div>
        )}
      </div>
    </div>
  );
}
