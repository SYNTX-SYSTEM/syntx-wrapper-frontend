'use client';

import React, { useState, useEffect } from 'react';
import { DraggableProperty } from './DraggableProperty';
import { ORACLE_COLORS } from './constants';

type Props = {
  format: string | null;
  profileId: string | null;
  onDragStart: (name: string, value: number) => void;
};

export function PropertyPanel({ format, profileId, onDragStart }: Props) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (format && profileId) {
      loadProfile(format);
    } else {
      setProfile(null);
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
        setProfile(data.profile_complete || null);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  if (!format || !profileId) {
    return (
      <div style={{
        padding: 20,
        background: ORACLE_COLORS.bgLight,
        borderRadius: 14,
        border: `2px solid ${ORACLE_COLORS.secondary}40`,
        marginTop: 20,
      }}>
        <div style={{
          fontSize: 12,
          color: ORACLE_COLORS.textDim,
          fontFamily: 'monospace',
          textAlign: 'center',
        }}>
          Select format & profile
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        padding: 20,
        background: ORACLE_COLORS.bgLight,
        borderRadius: 14,
        border: `2px solid ${ORACLE_COLORS.secondary}40`,
        marginTop: 20,
      }}>
        <div style={{
          fontSize: 12,
          color: ORACLE_COLORS.textDim,
          fontFamily: 'monospace',
          textAlign: 'center',
        }}>
          Loading properties...
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div style={{
      padding: 20,
      background: `linear-gradient(135deg, ${ORACLE_COLORS.bgLight}f0, ${ORACLE_COLORS.bg}f0)`,
      borderRadius: 14,
      border: `2px solid ${ORACLE_COLORS.secondary}80`,
      boxShadow: `0 0 30px ${ORACLE_COLORS.secondary}20`,
      marginTop: 20,
    }}>
      {/* Header */}
      <div style={{
        fontSize: 14,
        fontWeight: 900,
        color: ORACLE_COLORS.secondary,
        letterSpacing: 2,
        fontFamily: 'monospace',
        marginBottom: 16,
      }}>
        DRAGGABLE PROPERTIES
      </div>

      {/* Entity Weights */}
      {profile.entity_weights && (
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontSize: 11,
            color: ORACLE_COLORS.textDim,
            fontFamily: 'monospace',
            marginBottom: 8,
            letterSpacing: 1,
          }}>
            Entity Weights
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.entries(profile.entity_weights).map(([name, value]) => (
              <DraggableProperty
                key={name}
                name={name.replace(/_/g, ' ')}
                value={value as number}
                color={ORACLE_COLORS.primary}
                onDragStart={onDragStart}
              />
            ))}
          </div>
        </div>
      )}

      {/* Thresholds */}
      {profile.thresholds && (
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontSize: 11,
            color: ORACLE_COLORS.textDim,
            fontFamily: 'monospace',
            marginBottom: 8,
            letterSpacing: 1,
          }}>
            Thresholds
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.entries(profile.thresholds).map(([name, value]) => (
              <DraggableProperty
                key={name}
                name={name}
                value={value as number}
                color={ORACLE_COLORS.secondary}
                onDragStart={onDragStart}
              />
            ))}
          </div>
        </div>
      )}

      {/* Field Scoring Methods */}
      {profile.field_scoring_methods && (
        <div>
          <div style={{
            fontSize: 11,
            color: ORACLE_COLORS.textDim,
            fontFamily: 'monospace',
            marginBottom: 8,
            letterSpacing: 1,
          }}>
            Field Scoring Weights
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.entries(profile.field_scoring_methods).map(([name, method]: [string, any]) => (
              <DraggableProperty
                key={name}
                name={name.replace(/_/g, ' ')}
                value={method.weight}
                color={ORACLE_COLORS.tertiary}
                onDragStart={onDragStart}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
