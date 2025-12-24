"use client";

import React, { useState, useEffect } from 'react';
import { Wrapper } from '@/lib/api';

// ═══════════════════════════════════════════════════════════════
// 🌊 WRAPPER CARD - ULTRA CYBER EDITION v2.0
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
  const isCriticalLatency = stats?.average_latency_ms && stats.average_latency_ms > 30000;
  
  return (
    <div style={{
      background: isCriticalLatency
        ? 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(239,68,68,0.15))'
        : isHighLatency 
          ? 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(245,158,11,0.1))'
          : `linear-gradient(135deg, ${color}12, ${color}05)`,
      border: isCriticalLatency
        ? '2px solid rgba(239,68,68,0.8)'
        : isHighLatency 
          ? '2px solid rgba(245,158,11,0.6)' 
          : `1px solid ${color}40`,
      borderRadius: 16,
      padding: 20,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: isCriticalLatency 
        ? '0 0 30px rgba(239,68,68,0.5)' 
        : isHighLatency 
          ? '0 0 25px rgba(245,158,11,0.4)' 
          : 'none',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
      e.currentTarget.style.boxShadow = isCriticalLatency 
        ? '0 10px 40px rgba(239,68,68,0.6)'
        : `0 10px 30px ${color}50`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = isCriticalLatency 
        ? '0 0 30px rgba(239,68,68,0.5)' 
        : isHighLatency 
          ? '0 0 25px rgba(245,158,11,0.4)' 
          : 'none';
    }}
    >
      {/* Animated background patterns */}
      <div style={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}25, transparent 70%)`,
        animation: 'float 8s ease-in-out infinite',
        filter: 'blur(20px)'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}15, transparent 70%)`,
        animation: 'float 6s ease-in-out infinite reverse',
        filter: 'blur(15px)'
      }} />
      
      {/* Hexagon corner decorations */}
      <div style={{
        position: 'absolute',
        top: 8,
        right: 8,
        width: 24,
        height: 24,
        opacity: 0.15,
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        background: color,
        animation: 'spin 20s linear infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: 8,
        left: 8,
        width: 18,
        height: 18,
        opacity: 0.12,
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        background: color,
        animation: 'spin 15s linear infinite reverse'
      }} />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -10px) rotate(120deg); }
          66% { transform: translate(-10px, 10px) rotate(240deg); }
        }
        @keyframes dataStream {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200%); opacity: 0; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes scanLine {
          0% { top: 0; opacity: 0; }
          50% { opacity: 0.3; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes matrixRain {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `}</style>
      
      {/* Scan line effect */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
        animation: 'scanLine 3s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      
      {/* Data stream on active */}
      {wrapper.is_active && (
        <>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${color}, ${color}, transparent)`,
            animation: 'dataStream 2s linear infinite'
          }} />
          
          {/* Matrix rain effect */}
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              position: 'absolute',
              left: `${20 + i * 30}%`,
              width: 1,
              height: 20,
              background: `linear-gradient(180deg, transparent, ${color}80, transparent)`,
              animation: `matrixRain ${2 + i * 0.5}s linear infinite`,
              animationDelay: `${i * 0.7}s`,
              pointerEvents: 'none'
            }} />
          ))}
        </>
      )}
      
      {/* Corner accents */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        borderTop: `2px solid ${color}30`,
        borderLeft: `2px solid ${color}30`,
        borderTopLeftRadius: 16
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderBottom: `2px solid ${color}30`,
        borderRight: `2px solid ${color}30`,
        borderBottomRightRadius: 16
      }} />
      
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
        position: 'relative',
        zIndex: 1,
        flexWrap: 'wrap'
      }}>
        {/* Status indicator with ring */}
        <div style={{ position: 'relative', width: 14, height: 14 }}>
          <div style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: wrapper.is_active ? color : 'rgba(255,255,255,0.2)',
            boxShadow: wrapper.is_active ? `0 0 15px ${color}` : 'none',
            animation: wrapper.is_active ? 'pulse 2s ease-in-out infinite' : 'none'
          }} />
          {wrapper.is_active && (
            <div style={{
              position: 'absolute',
              inset: -3,
              borderRadius: '50%',
              border: `1px solid ${color}`,
              opacity: 0.3,
              animation: 'statusRing 2s ease-in-out infinite'
            }} />
          )}
        </div>
        
        <span style={{
          fontFamily: 'monospace',
          fontSize: 13,
          color,
          fontWeight: 700,
          letterSpacing: 1.2,
          textShadow: `0 0 15px ${color}80, 0 0 25px ${color}40`,
          flex: 1,
          minWidth: 100
        }}>
          {displayName}
        </span>
        
        {/* Badges with MEGA styling */}
        {isDefault && (
          <span style={{
            padding: '5px 12px',
            borderRadius: 10,
            fontSize: 9,
            fontFamily: 'monospace',
            background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,212,255,0.15))',
            color: '#00d4ff',
            border: '1px solid rgba(0,212,255,0.5)',
            fontWeight: 700,
            letterSpacing: 0.8,
            textShadow: '0 0 10px rgba(0,212,255,0.8)',
            boxShadow: '0 0 15px rgba(0,212,255,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              animation: 'shimmer 2s infinite'
            }} />
            <span style={{ position: 'relative', zIndex: 1 }}>📦 DEFAULT</span>
            <style>{`
              @keyframes shimmer {
                0% { left: -100%; }
                100% { left: 100%; }
              }
            `}</style>
          </span>
        )}
        
        {wrapper.is_active && (
          <span style={{
            padding: '5px 12px',
            borderRadius: 10,
            fontSize: 9,
            fontFamily: 'monospace',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.15))',
            color: '#10b981',
            border: '1px solid rgba(16,185,129,0.5)',
            fontWeight: 700,
            letterSpacing: 0.8,
            textShadow: '0 0 10px rgba(16,185,129,0.8)',
            boxShadow: '0 0 15px rgba(16,185,129,0.3)',
            animation: 'badgePulse 2s ease-in-out infinite'
          }}>
            ⚡ ACTIVE
            <style>{`
              @keyframes badgePulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
              }
            `}</style>
          </span>
        )}
        
        {isCriticalLatency && (
          <span style={{
            padding: '5px 12px',
            borderRadius: 10,
            fontSize: 9,
            fontFamily: 'monospace',
            background: 'linear-gradient(135deg, rgba(239,68,68,0.4), rgba(239,68,68,0.2))',
            color: '#ef4444',
            border: '1px solid rgba(239,68,68,0.6)',
            fontWeight: 700,
            letterSpacing: 0.8,
            textShadow: '0 0 10px rgba(239,68,68,0.8)',
            boxShadow: '0 0 15px rgba(239,68,68,0.4)',
            animation: 'criticalPulse 1s ease-in-out infinite'
          }}>
            🔥 CRITICAL
            <style>{`
              @keyframes criticalPulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.05); opacity: 0.8; }
              }
              @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(0.95); }
              }
              @keyframes statusRing {
                0%, 100% { transform: scale(1); opacity: 0.3; }
                50% { transform: scale(1.4); opacity: 0; }
              }
            `}</style>
          </span>
        )}
        
        {isHighLatency && !isCriticalLatency && (
          <span style={{
            padding: '5px 12px',
            borderRadius: 10,
            fontSize: 9,
            fontFamily: 'monospace',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(245,158,11,0.15))',
            color: '#f59e0b',
            border: '1px solid rgba(245,158,11,0.5)',
            fontWeight: 700,
            letterSpacing: 0.8,
            textShadow: '0 0 10px rgba(245,158,11,0.8)',
            boxShadow: '0 0 15px rgba(245,158,11,0.3)'
          }}>
            ⚠️ SLOW
          </span>
        )}
      </div>

      {/* Stats Grid with ULTRA effects */}
      {loading ? (
        <div style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: 12,
          textAlign: 'center',
          padding: 30,
          fontFamily: 'monospace'
        }}>
          <div style={{
            display: 'inline-block',
            width: 30,
            height: 30,
            border: `3px solid ${color}20`,
            borderTop: `3px solid ${color}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            boxShadow: `0 0 20px ${color}50`
          }} />
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
            padding: 16,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))',
            borderRadius: 12,
            border: `1px solid ${color}30`,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `inset 0 0 20px ${color}10`
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${color}60, transparent)`
            }} />
            <div style={{
              fontSize: 28,
              fontWeight: 900,
              color,
              fontFamily: 'monospace',
              textShadow: `0 0 20px ${color}, 0 0 30px ${color}50`,
              marginBottom: 6,
              letterSpacing: 1
            }}>
              {stats.requests || 0}
            </div>
            <div style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: 1.5
            }}>
              REQUESTS
            </div>
          </div>
          
          {/* Latency */}
          <div style={{
            textAlign: 'center',
            padding: 16,
            background: isCriticalLatency 
              ? 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(239,68,68,0.2))' 
              : isHighLatency 
                ? 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(245,158,11,0.15))' 
                : 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))',
            borderRadius: 12,
            border: isCriticalLatency 
              ? '1px solid rgba(239,68,68,0.5)' 
              : isHighLatency
                ? '1px solid rgba(245,158,11,0.4)'
                : `1px solid ${color}30`,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isCriticalLatency
              ? 'inset 0 0 20px rgba(239,68,68,0.2), 0 0 15px rgba(239,68,68,0.3)'
              : isHighLatency
                ? 'inset 0 0 20px rgba(245,158,11,0.15)'
                : `inset 0 0 20px ${color}10`
          }}>
            {isCriticalLatency && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(239,68,68,0.1) 10px, rgba(239,68,68,0.1) 20px)'
              }} />
            )}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: isCriticalLatency
                ? 'linear-gradient(90deg, transparent, #ef444460, transparent)'
                : isHighLatency
                  ? 'linear-gradient(90deg, transparent, #f59e0b60, transparent)'
                  : `linear-gradient(90deg, transparent, ${color}60, transparent)`
            }} />
            <div style={{
              fontSize: 28,
              fontWeight: 900,
              color: isCriticalLatency ? '#ef4444' : isHighLatency ? '#f59e0b' : '#10b981',
              fontFamily: 'monospace',
              textShadow: isCriticalLatency
                ? '0 0 20px #ef4444, 0 0 30px #ef444450'
                : isHighLatency
                  ? '0 0 20px #f59e0b, 0 0 30px #f59e0b50'
                  : '0 0 20px #10b981, 0 0 30px #10b98150',
              marginBottom: 6,
              letterSpacing: 1,
              position: 'relative',
              zIndex: 1
            }}>
              {stats.average_latency_ms ? (stats.average_latency_ms / 1000).toFixed(1) : '0'}s
            </div>
            <div style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: 1.5,
              position: 'relative',
              zIndex: 1
            }}>
              AVG LATENCY
            </div>
          </div>
          
          {/* Success Rate */}
          <div style={{
            textAlign: 'center',
            padding: 16,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))',
            borderRadius: 12,
            border: `1px solid ${color}30`,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `inset 0 0 20px ${color}10`
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #10b98160, transparent)'
            }} />
            <div style={{
              fontSize: 28,
              fontWeight: 900,
              color: '#10b981',
              fontFamily: 'monospace',
              textShadow: '0 0 20px #10b981, 0 0 30px #10b98150',
              marginBottom: 6,
              letterSpacing: 1
            }}>
              {stats.success_rate && stats.success_rate !== 100 ? `${stats.success_rate}%` : '✓'}
            </div>
            <div style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: 1.5
            }}>
              SUCCESS
            </div>
          </div>
          
          {/* Size */}
          <div style={{
            textAlign: 'center',
            padding: 16,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))',
            borderRadius: 12,
            border: `1px solid ${color}30`,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `inset 0 0 20px ${color}10`
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #d946ef60, transparent)'
            }} />
            <div style={{
              fontSize: 28,
              fontWeight: 900,
              color: '#d946ef',
              fontFamily: 'monospace',
              textShadow: '0 0 20px #d946ef, 0 0 30px #d946ef50',
              marginBottom: 6,
              letterSpacing: 1
            }}>
              {wrapper.size_human || '?'}
            </div>
            <div style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: 1.5
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
          fontFamily: 'monospace',
          padding: 20
        }}>
          No stats available
        </div>
      )}

      {/* Set Default Button - MEGA CYBER */}
      {!isDefault && (
        <button
          onClick={onSetDefault}
          style={{
            marginTop: 16,
            width: '100%',
            padding: '14px 20px',
            borderRadius: 12,
            border: `1px solid ${color}50`,
            background: `linear-gradient(135deg, ${color}20, ${color}08)`,
            color: color,
            fontFamily: 'monospace',
            fontSize: 11,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            zIndex: 1,
            fontWeight: 700,
            letterSpacing: 1,
            textShadow: `0 0 10px ${color}80`,
            overflow: 'hidden'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${color}30, ${color}15)`;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 6px 20px ${color}40, inset 0 0 30px ${color}20`;
            e.currentTarget.style.borderColor = `${color}80`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${color}20, ${color}08)`;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = `${color}50`;
          }}
        >
          {/* Button shimmer effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'buttonShimmer 3s infinite'
          }} />
          
          <span style={{ position: 'relative', zIndex: 1 }}>
            📦 SET AS DEFAULT
          </span>
          
          <style>{`
            @keyframes buttonShimmer {
              0% { left: -100%; }
              50%, 100% { left: 100%; }
            }
          `}</style>
        </button>
      )}
    </div>
  );
}
