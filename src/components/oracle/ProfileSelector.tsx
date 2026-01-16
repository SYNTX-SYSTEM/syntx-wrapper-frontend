'use client';

import React, { useState, useEffect } from 'react';
import { ORACLE_COLORS } from './constants';

type Entity = {
  entity_id: string;
  entity_name?: string;
  weight: number;
  priority: number;
  enabled: boolean;
};

type Props = {
  format: string | null;
  activeProfile: string | null;
  onChange: (profileId: string) => void;
  loading: boolean;
};

export function ProfileSelector({ format, activeProfile, onChange, loading }: Props) {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loadingEntities, setLoadingEntities] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string>('');

  useEffect(() => {
    if (format) {
      loadEntitiesForFormat(format);
    } else {
      setEntities([]);
      setError(null);
    }
  }, [format]);

  const loadEntitiesForFormat = async (formatName: string) => {
    setLoadingEntities(true);
    setError(null);
    
    try {
      const AUTH = btoa('syntx:ekv2xp73zdEUEH5u9fVu');
      
      const response = await fetch(
        `https://dev.syntx-system.com/scoring/bindings/get_binding_by_format/${formatName}`,
        {
          headers: { 'Authorization': `Basic ${AUTH}` },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || 'No binding found');
        setEntities([]);
        return;
      }

      const data = await response.json();
      
      // Extract entities from entities_complete
      const entitiesList: Entity[] = (data.entities_complete || []).map((e: any) => ({
        entity_id: e.entity.entity_id,
        entity_name: e.entity.entity_name || e.entity.entity_id,
        weight: e.weight,
        priority: e.priority,
        enabled: e.enabled,
      }));

      setEntities(entitiesList);
      setProfileName(data.profile_complete?.profile_name || '');
      
      // Auto-select first enabled entity
      const firstEnabled = entitiesList.find(e => e.enabled);
      if (firstEnabled && !activeProfile) {
        onChange(firstEnabled.entity_id);
      }
      
    } catch (err) {
      console.error('Failed to load entities:', err);
      setError('Connection failed');
      setEntities([]);
    } finally {
      setLoadingEntities(false);
    }
  };

  const getEntityColor = (entity: Entity) => {
    const id = entity.entity_id.toLowerCase();
    if (id.includes('gpt')) return ORACLE_COLORS.primary;
    if (id.includes('claude')) return ORACLE_COLORS.secondary;
    if (id.includes('gemini')) return ORACLE_COLORS.tertiary;
    if (id.includes('pattern')) return '#00ff88';
    return ORACLE_COLORS.primary;
  };

  if (!format) {
    return (
      <div style={{
        padding: 20,
        background: ORACLE_COLORS.bgLight,
        borderRadius: 14,
        border: `1px solid ${ORACLE_COLORS.secondary}40`,
        marginTop: 20,
      }}>
        <div style={{
          fontSize: 14,
          fontWeight: 800,
          color: ORACLE_COLORS.secondary,
          marginBottom: 12,
          letterSpacing: 2,
          fontFamily: 'monospace',
        }}>
          ENTITY SELECTOR
        </div>
        <div style={{
          padding: 12,
          background: `${ORACLE_COLORS.secondary}10`,
          borderRadius: 8,
          fontSize: 11,
          color: ORACLE_COLORS.textDim,
          fontFamily: 'monospace',
          textAlign: 'center',
        }}>
          Select a format first
        </div>
      </div>
    );
  }

  // 🔴 NO BINDING - RED WARNING WITH MOVEMENT
  if (error) {
    return (
      <div style={{
        padding: 20,
        background: `linear-gradient(135deg, #ff0000f0, #cc0000f0)`,
        borderRadius: 14,
        border: `2px solid #ff0000`,
        marginTop: 20,
        boxShadow: `0 0 30px #ff000080`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          animation: 'slide 2s infinite',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 12,
          }}>
            <div style={{
              fontSize: 24,
              animation: 'pulse 1s infinite',
            }}>
              ⚠️
            </div>
            <div>
              <div style={{
                fontSize: 14,
                fontWeight: 900,
                color: '#fff',
                letterSpacing: 2,
                fontFamily: 'monospace',
              }}>
                NO BINDING FOUND
              </div>
              <div style={{
                fontSize: 10,
                color: '#ffcccc',
                letterSpacing: 1,
                fontFamily: 'monospace',
              }}>
                Format: {format}
              </div>
            </div>
          </div>

          <div style={{
            padding: 12,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 8,
            fontSize: 11,
            color: '#fff',
            fontFamily: 'monospace',
            lineHeight: 1.6,
          }}>
            This format has no scoring configuration.
            <br />
            Available formats: <strong>sigma, ultra130, backend, frontend</strong>
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }
          @keyframes slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      padding: 20,
      background: `linear-gradient(135deg, ${ORACLE_COLORS.bgLight}f0, ${ORACLE_COLORS.bg}f0)`,
      borderRadius: 14,
      border: `2px solid ${ORACLE_COLORS.secondary}80`,
      marginTop: 20,
      boxShadow: `0 0 30px ${ORACLE_COLORS.secondary}20`,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ORACLE_COLORS.secondary}60, ${ORACLE_COLORS.secondary}20)`,
          border: `2px solid ${ORACLE_COLORS.secondary}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          boxShadow: `0 0 20px ${ORACLE_COLORS.secondary}80`,
        }}>
          👤
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 14,
            fontWeight: 900,
            color: ORACLE_COLORS.secondary,
            letterSpacing: 2,
            fontFamily: 'monospace',
          }}>
            ENTITY SELECTOR
          </div>
          <div style={{
            fontSize: 9,
            color: ORACLE_COLORS.textDim,
            letterSpacing: 1,
            fontFamily: 'monospace',
          }}>
            {profileName || 'Loading...'}
          </div>
        </div>
      </div>

      {loadingEntities ? (
        <div style={{
          padding: 20,
          textAlign: 'center',
          color: ORACLE_COLORS.textDim,
          fontSize: 12,
          fontFamily: 'monospace',
        }}>
          <div style={{
            display: 'inline-block',
            animation: 'pulse 2s ease-in-out infinite',
          }}>
            ⚡ Loading entities...
          </div>
        </div>
      ) : entities.length === 0 ? (
        <div style={{
          padding: 12,
          background: `${ORACLE_COLORS.secondary}10`,
          borderRadius: 8,
          fontSize: 11,
          color: ORACLE_COLORS.textDim,
          fontFamily: 'monospace',
          textAlign: 'center',
        }}>
          No entities found
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {entities.map(entity => {
            const isActive = entity.entity_id === activeProfile;
            const color = getEntityColor(entity);

            return (
              <button
                key={entity.entity_id}
                onClick={() => onChange(entity.entity_id)}
                disabled={loading || !entity.enabled}
                style={{
                  padding: '12px 16px',
                  background: isActive 
                    ? `linear-gradient(90deg, ${color}30, ${color}10)` 
                    : entity.enabled ? `${ORACLE_COLORS.bg}80` : `${ORACLE_COLORS.bg}40`,
                  border: `2px solid ${isActive ? color : entity.enabled ? `${color}40` : '#333'}`,
                  borderRadius: 10,
                  cursor: loading || !entity.enabled ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: entity.enabled ? 1 : 0.5,
                }}
                onMouseEnter={(e) => {
                  if (!loading && !isActive && entity.enabled) {
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.background = `${color}10`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = entity.enabled ? `${color}40` : '#333';
                    e.currentTarget.style.background = entity.enabled ? `${ORACLE_COLORS.bg}80` : `${ORACLE_COLORS.bg}40`;
                  }
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(90deg, transparent, ${color}20, transparent)`,
                    animation: 'slide 2s infinite',
                  }} />
                )}

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: isActive ? color : entity.enabled ? ORACLE_COLORS.text : ORACLE_COLORS.textDim,
                    fontFamily: 'monospace',
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}>
                    {entity.entity_name}
                    {!entity.enabled && ' (Disabled)'}
                  </div>

                  <div style={{
                    fontSize: 10,
                    color: ORACLE_COLORS.textDim,
                    fontFamily: 'monospace',
                  }}>
                    Weight: <span style={{ color, fontWeight: 700 }}>
                      {(entity.weight * 100).toFixed(0)}%
                    </span>
                    {' • '}
                    Priority: <span style={{ fontWeight: 700 }}>
                      {entity.priority}
                    </span>
                  </div>
                </div>

                {isActive && (
                  <div style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 16,
                  }}>
                    ⚡
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
