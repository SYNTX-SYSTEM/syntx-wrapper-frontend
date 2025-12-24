"use client";

import React, { useState, useEffect } from 'react';
import { Wrapper } from '@/lib/api';

// ═══════════════════════════════════════════════════════════════
// 🌊 WRAPPER CARD - INDIVIDUAL WRAPPER WITH MEGA STATS
// ═══════════════════════════════════════════════════════════════

interface WrapperStats {
  requests?: number;
  average_latency_ms?: number;
  success_rate?: number;
}

interface WrapperCardProps {
  wrapper: Wrapper;
  isDefault: boolean;
  onSetDefault: () => void;
  getStats: (name: string) => Promise<WrapperStats | null>;
}

export function WrapperCard({ 
  wrapper, 
  isDefault, 
  onSetDefault,
  getStats 
}: WrapperCardProps) {
  const [stats, setStats] = useState<WrapperStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats(wrapper.name)
      .then(setStats)
      .finally(() => setLoading(false));
  }, [wrapper.name, getStats]);

  const displayName = wrapper.name.replace('syntex_wrapper_', '').toUpperCase();
  
  const getColor = () => {
    if (wrapper.name.includes('human')) return '#10b981';
    if (wrapper.name.includes('sigma')) return '#f59e0b';
    if (wrapper.name.includes('deepsweep')) return '#d946ef';
    if (wrapper.name.includes('true_raw')) return '#ef4444';
    return '#00d4ff';
  };
  
  const color = getColor();
  const isHighLatency = stats?.average_latency_ms && stats.average_latency_ms > 5000;
  
  return (
    <div style={{
      background: isHighLatency 
        ? 'linear-gradient(135deg, rgba(239,68,68,0.25), rgba(239,68,68,0.1))'
        : `linear-gradient(135deg, ${color}08, ${color}03)`,
      border: isHighLatency 
        ? '2px solid rgba(239,68,68,0.7)' 
        : `1px solid ${color}30`,
      borderRadius: 16,
      padding: 20,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: isHighLatency ? '0 0 25px rgba(239,68,68,0.4)' : 'none',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = `0 10px 30px ${color}30`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = isHighLatency ? '0 0 25px rgba(239,68,68,0.4)' : 'none';
    }}
    >
      {/* Animated background blob */}
      <div style={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}20, transparent)`,
        animation: 'float 6s ease-in-out infinite'
      }} />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-10px, -10px); }
        }
      `}</style>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
        position: 'relative',
        zIndex: 1
      }}>
        {/* Status indicator */}
        <div style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: wrapper.is_active ? color : 'rgba(255,255,255,0.2)',
          boxShadow: wrapper.is_active ? `0 0 12px ${color}` : 'none',
          animation: wrapper.is_active ? 'pulse 2s ease-in-out infinite' : 'none'
        }} />
        
        <span style={{
          fontFamily: 'monospace',
          fontSize: 14,
          color,
          fontWeight: 700,
          letterSpacing: 1,
          textShadow: `0 0 10px ${color}80`
        }}>
          {displayName}
        </span>
        
        {/* Badges */}
        {isDefault && (
          <span style={{
            padding: '3px 8px',
            borderRadius: 6,
            fontSize: 9,
            fontFamily: 'monospace',
            background: 'rgba(0,212,255,0.2)',
            color: '#00d4ff',
            border: '1px solid rgba(0,212,255,0.3)'
          }}>
            DEFAULT
          </span>
        )}
        
        {wrapper.is_active && (
          <span style={{
            padding: '3px 8px',
            borderRadius: 6,
            fontSize: 9,
            fontFamily: 'monospace',
            background: 'rgba(16,185,129,0.2)',
            color: '#10b981',
            border: '1px solid rgba(16,185,129,0.3)'
          }}>
            ACTIVE
          </span>
        )}
        
        {isHighLatency && (
          <span style={{ fontSize: 12 }}>⚠️</span>
        )}
        
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(0.9); }
          }
        `}</style>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: 12,
          textAlign: 'center',
          padding: 20,
          fontFamily: 'monospace'
        }}>
          Loading stats...
        </div>
      ) : stats ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          position: 'relative',
          zIndex: 1
        }}>
          {/* Requests */}
          <div style={{
            textAlign: 'center',
            padding: 12,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 10,
            border: `1px solid ${color}20`
          }}>
            <div style={{
              fontSize: 24,
              fontWeight: 700,
              color,
              fontFamily: 'monospace',
              textShadow: `0 0 10px ${color}80`
            }}>
              {stats.requests || 0}
            </div>
            <div style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
              marginTop: 4
            }}>
              REQUESTS
            </div>
          </div>
          
          {/* Latency */}
          <div style={{
            textAlign: 'center',
            padding: 12,
            background: isHighLatency ? 'rgba(239,68,68,0.15)' : 'rgba(0,0,0,0.3)',
            borderRadius: 10,
            border: isHighLatency ? '1px solid rgba(239,68,68,0.4)' : `1px solid ${color}20`
          }}>
            <div style={{
              fontSize: 24,
              fontWeight: 700,
              color: isHighLatency ? '#ef4444' : '#f59e0b',
              fontFamily: 'monospace',
              textShadow: `0 0 10px ${isHighLatency ? '#ef4444' : '#f59e0b'}80`
            }}>
              {stats.average_latency_ms ? (stats.average_latency_ms / 1000).toFixed(1) : '0'}s
            </div>
            <div style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
              marginTop: 4
            }}>
              AVG LATENCY
            </div>
          </div>
          
          {/* Success Rate */}
          <div style={{
            textAlign: 'center',
            padding: 12,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 10,
            border: `1px solid ${color}20`
          }}>
            <div style={{
              fontSize: 24,
              fontWeight: 700,
              color: '#10b981',
              fontFamily: 'monospace',
              textShadow: '0 0 10px #10b98180'
            }}>
              {stats.success_rate && stats.success_rate !== 100 ? `${stats.success_rate}%` : '✓'}
            </div>
            <div style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
              marginTop: 4
            }}>
              SUCCESS
            </div>
          </div>
          
          {/* Size */}
          <div style={{
            textAlign: 'center',
            padding: 12,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 10,
            border: `1px solid ${color}20`
          }}>
            <div style={{
              fontSize: 24,
              fontWeight: 700,
              color: '#d946ef',
              fontFamily: 'monospace',
              textShadow: '0 0 10px #d946ef80'
            }}>
              {wrapper.size_human || '?'}
            </div>
            <div style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
              marginTop: 4
            }}>
              SIZE
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: 12,
          textAlign: 'center',
          fontFamily: 'monospace'
        }}>
          No stats available
        </div>
      )}

      {/* Set Default Button */}
      {!isDefault && (
        <button
          onClick={onSetDefault}
          style={{
            marginTop: 16,
            width: '100%',
            padding: '10px 16px',
            borderRadius: 10,
            border: `1px solid ${color}40`,
            background: `linear-gradient(135deg, ${color}15, ${color}05)`,
            color: color,
            fontFamily: 'monospace',
            fontSize: 11,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            zIndex: 1,
            fontWeight: 600,
            letterSpacing: 0.5
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${color}25, ${color}10)`;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 4px 15px ${color}30`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${color}15, ${color}05)`;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          SET AS DEFAULT
        </button>
      )}
    </div>
  );
}
