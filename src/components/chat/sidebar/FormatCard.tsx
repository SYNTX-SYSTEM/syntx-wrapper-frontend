"use client";

import React from 'react';
import type { FormatDetails } from '@/lib/api-wrapper-config-panel';
import { GlassCard } from './GlassCard';

interface FormatCardProps {
  selectedFormat: string;
  formatDetails: FormatDetails | null;
  profileWeight?: number;
  profileId?: string;
  scoringId?: string;  // ← NEU!
  loading?: boolean;
  onOpenModal: () => void;
}

export function FormatCard({ 
  selectedFormat, 
  formatDetails, 
  profileWeight,
  profileId,
  scoringId,  // ← NEU!
  loading = false,
  onOpenModal 
}: FormatCardProps) {
  const color = '#d946ef';
  const totalFieldWeight = formatDetails?.fields?.reduce((sum, f) => sum + (f.weight || 0), 0) || 0;
  const totalWeight = (profileWeight || 0) + totalFieldWeight;

  return (
    <GlassCard 
      style={{ padding: 16, position: 'relative' }} 
      glowColor={color}
    >
      {/* HEADER mit Icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{
          fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)',
          letterSpacing: 2,
          display: 'flex', alignItems: 'center', gap: 6
        }}>
          📋 FORMAT
        </div>
        
        {/* CLICK ICON */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal();
          }}
          style={{
            fontSize: 20,
            color: color,
            cursor: 'pointer',
            transition: 'all 0.3s',
            filter: 'drop-shadow(0 0 8px rgba(217,70,239,0.6))',
          }}
          className="float pulse"
        >
          🔍
        </div>
      </div>

      {loading ? (
        <div style={{ 
          textAlign: 'center', padding: 20, 
          color: 'rgba(255,255,255,0.3)', fontSize: 11 
        }}>
          Loading...
        </div>
      ) : !formatDetails ? (
        <div style={{ 
          textAlign: 'center', padding: 20, 
          color: 'rgba(255,255,255,0.3)', fontSize: 11 
        }}>
          Kein Format
        </div>
      ) : (
        <>
          {/* FORMAT NAME */}
          <div style={{
            fontSize: 16, fontWeight: 800, color: color,
            marginBottom: 8, fontFamily: 'monospace', textTransform: 'uppercase',
            letterSpacing: 1,
            textShadow: `0 0 10px ${color}`
          }}
          className="glow-text"
          >
            {selectedFormat}
          </div>

          {/* DESCRIPTION */}
          {formatDetails.description?.de && (
            <div style={{
              fontSize: 11, color: 'rgba(255,255,255,0.6)',
              marginBottom: 16, lineHeight: 1.5
            }}>
              {formatDetails.description.de}
            </div>
          )}

          {/* GEWICHTUNG - MEGA VERSION! */}
          <div style={{
            position: 'relative',
            background: 'linear-gradient(145deg, rgba(217,70,239,0.15), rgba(0,212,255,0.05))',
            border: '2px solid rgba(217,70,239,0.4)',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            overflow: 'hidden',
            boxShadow: '0 0 20px rgba(217,70,239,0.2), inset 0 0 30px rgba(217,70,239,0.1)'
          }}>
            {/* Animated Border - DISABLED */}
            {/* <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, transparent, #d946ef, transparent)',
              animation: 'shimmer 2s infinite',
              opacity: 0.8
            }} /> */}
            
            {/* Neural Background Pattern */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'radial-gradient(circle at 30% 50%, rgba(217,70,239,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(0,212,255,0.1) 0%, transparent 50%)',
              animation: 'pulse 3s ease-in-out infinite',
              pointerEvents: 'none'
            }} />

            {/* HEADER mit IDs */}
            <div style={{
              fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)',
              marginBottom: 12, letterSpacing: 2, fontWeight: 700,
              textTransform: 'uppercase',
              position: 'relative', zIndex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 8
            }}>
              <span>⚡ GEWICHTUNG</span>
              
              {/* PROFILE ID BADGE */}
              {scoringId && (
                <span className="float" style={{
                  fontSize: 9,
                  color: 'rgba(0,212,255,0.9)',
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))',
                  padding: '3px 8px',
                  borderRadius: 6,
                  border: '1px solid rgba(0,212,255,0.4)',
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  boxShadow: '0 0 10px rgba(0,212,255,0.3)',
                  textShadow: '0 0 8px rgba(0,212,255,0.5)'
                }}>
                  📊 {scoringId}
                </span>
              )}
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: profileWeight !== undefined ? '1fr 1fr' : '1fr', 
              gap: 12,
              position: 'relative',
              zIndex: 1,
              marginBottom: 12
            }}>
              {profileWeight !== undefined && (
                <div className="float" style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))',
                  border: '1px solid rgba(16,185,129,0.5)',
                  borderRadius: 10,
                  padding: '12px 8px',
                  boxShadow: '0 0 15px rgba(16,185,129,0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(circle at center, rgba(16,185,129,0.2) 0%, transparent 70%)',
                    animation: 'pulse 2s ease-in-out infinite'
                  }} />
                  <div style={{ 
                    fontSize: 28, fontWeight: 900, color: '#10b981', 
                    fontFamily: 'monospace',
                    textShadow: '0 0 20px rgba(16,185,129,0.8)',
                    position: 'relative',
                    zIndex: 1
                  }}
                  className="glow-text"
                  >
                    {profileWeight}
                  </div>
                  <div style={{ 
                    fontSize: 9, color: 'rgba(255,255,255,0.5)', 
                    marginTop: 4, letterSpacing: 1,
                    fontWeight: 600,
                    position: 'relative',
                    zIndex: 1
                  }}>
                    PROFILE
                  </div>
                </div>
              )}
              
              <div className="float" style={{ 
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(217,70,239,0.2), rgba(217,70,239,0.05))',
                border: '1px solid rgba(217,70,239,0.5)',
                borderRadius: 10,
                padding: '12px 8px',
                boxShadow: '0 0 15px rgba(217,70,239,0.3)',
                position: 'relative',
                overflow: 'hidden',
                animationDelay: '0.1s'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'radial-gradient(circle at center, rgba(217,70,239,0.2) 0%, transparent 70%)',
                  animation: 'pulse 2s ease-in-out infinite',
                  animationDelay: '0.5s'
                }} />
                <div style={{ 
                  fontSize: 28, fontWeight: 900, color: color, 
                  fontFamily: 'monospace',
                  textShadow: '0 0 20px rgba(217,70,239,0.8)',
                  position: 'relative',
                  zIndex: 1
                }}
                className="glow-text"
                >
                  {totalFieldWeight}
                </div>
                <div style={{ 
                  fontSize: 9, color: 'rgba(255,255,255,0.5)', 
                  marginTop: 4, letterSpacing: 1,
                  fontWeight: 600,
                  position: 'relative',
                  zIndex: 1
                }}>
                  FIELDS
                </div>
              </div>
            </div>

            {/* TOTAL GEWICHTUNG */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: 12,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                fontSize: 11,
                fontFamily: 'monospace',
                color: 'rgba(255,255,255,0.6)',
                fontWeight: 600,
                letterSpacing: 1
              }}>
                GESAMT
              </div>
              <div style={{
                fontSize: 24,
                fontWeight: 900,
                color: '#f59e0b',
                fontFamily: 'monospace',
                textShadow: '0 0 20px rgba(245,158,11,0.8)'
              }}
              className="glow-text"
              >
                {totalWeight}
              </div>
            </div>
          </div>

          {/* FIELDS COUNT */}
          <div 
            onClick={onOpenModal}
            style={{
              fontSize: 11, color: 'rgba(255,255,255,0.6)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              cursor: 'pointer',
              padding: '8px 12px',
              background: 'rgba(217,70,239,0.05)',
              borderRadius: 8,
              border: '1px solid rgba(217,70,239,0.2)',
              transition: 'all 0.3s'
            }}
            className="cyber-btn"
          >
            <span>Fields: {formatDetails.fields?.length || 0}</span>
            <span style={{ color: color, fontSize: 14, fontWeight: 700 }}>→</span>
          </div>
        </>
      )}
    </GlassCard>
  );
}
