"use client";

import React from 'react';

// ═══════════════════════════════════════════════════════════════
// 🌊 HEALTH PANEL - SYSTEM STATUS WITH MEGA EFFECTS
// ═══════════════════════════════════════════════════════════════

interface SystemHealth {
  status: string;
  service: string;
  version: string;
  format_loader: string;
  last_response?: any;
}

interface HealthPanelProps {
  health: SystemHealth | null;
  loading: boolean;
  error: string | null;
}

function StatusIndicator({ 
  status, 
  size = 12 
}: { 
  status: 'online' | 'offline' | 'warning'; 
  size?: number;
}) {
  const colors = { 
    online: '#10b981', 
    offline: '#ef4444', 
    warning: '#f59e0b' 
  };
  
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Main dot */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        borderRadius: '50%', 
        background: colors[status],
        animation: status === 'online' ? 'statusPulse 2s ease-in-out infinite' : 'none',
        boxShadow: `0 0 ${size}px ${colors[status]}80`
      }} />
      
      {/* Outer ring */}
      <div style={{ 
        position: 'absolute', 
        inset: -4, 
        borderRadius: '50%', 
        border: `2px solid ${colors[status]}`, 
        opacity: 0.3,
        animation: status === 'online' ? 'statusRing 2s ease-in-out infinite' : 'none'
      }} />
      
      <style>{`
        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.9); }
        }
        @keyframes statusRing {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function MetricRow({ 
  label, 
  value, 
  color = '#00d4ff', 
  icon 
}: { 
  label: string; 
  value: string | number; 
  color?: string; 
  icon?: string;
}) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 12, 
      padding: '14px 16px',
      background: `linear-gradient(90deg, ${color}08, transparent)`,
      borderRadius: 12, 
      marginBottom: 8,
      border: `1px solid ${color}20`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Shimmer effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: `linear-gradient(90deg, transparent, ${color}15, transparent)`,
        animation: 'shimmer 3s infinite'
      }} />
      
      {icon && <span style={{ fontSize: 18, position: 'relative', zIndex: 1 }}>{icon}</span>}
      <span style={{ 
        flex: 1, 
        fontFamily: 'monospace', 
        fontSize: 12, 
        color: 'rgba(255,255,255,0.6)', 
        letterSpacing: 1,
        position: 'relative',
        zIndex: 1
      }}>
        {label}
      </span>
      <span style={{ 
        fontFamily: 'monospace', 
        fontSize: 14, 
        color, 
        fontWeight: 700,
        textShadow: `0 0 10px ${color}80`,
        position: 'relative',
        zIndex: 1
      }}>
        {value}
      </span>
      
      <style>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}

export function HealthPanel({ health, loading, error }: HealthPanelProps) {
  const systemStatus = health?.status?.includes('AKTIV') ? 'online' 
    : health ? 'warning' 
    : 'offline';
  
  return (
    <div style={{
      position: 'relative',
      borderRadius: 20,
      background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden'
    }}>
      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
        animation: 'glowPulse 3s ease-in-out infinite'
      }} />
      
      {/* Header */}
      <div style={{
        padding: '18px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'rgba(0,0,0,0.2)'
      }}>
        <span style={{ fontSize: 24 }}>💚</span>
        <h3 style={{
          margin: 0,
          flex: 1,
          fontFamily: 'monospace',
          fontSize: 14,
          color: '#10b981',
          letterSpacing: 2
        }}>
          SYSTEM HEALTH
        </h3>
        <StatusIndicator status={systemStatus} size={16} />
      </div>
      
      {/* Content */}
      <div style={{ padding: 24 }}>
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: 20, 
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'monospace'
          }}>
            Loading...
          </div>
        ) : error ? (
          <div style={{ 
            textAlign: 'center', 
            padding: 20, 
            color: '#ef4444',
            fontFamily: 'monospace'
          }}>
            {error}
          </div>
        ) : health ? (
          <>
            {/* Status Display */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              padding: 24,
              background: systemStatus === 'online' 
                ? 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))'
                : 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))',
              borderRadius: 16,
              marginBottom: 20,
              border: `1px solid ${systemStatus === 'online' ? '#10b98130' : '#ef444430'}`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Animated background */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: `radial-gradient(circle, ${systemStatus === 'online' ? '#10b981' : '#ef4444'}20, transparent 70%)`,
                animation: 'rotate 20s linear infinite'
              }} />
              
              <StatusIndicator status={systemStatus} size={24} />
              <span style={{
                fontFamily: 'monospace',
                fontSize: 28,
                fontWeight: 700,
                color: systemStatus === 'online' ? '#10b981' : '#ef4444',
                letterSpacing: 3,
                textShadow: `0 0 20px ${systemStatus === 'online' ? '#10b981' : '#ef4444'}80`,
                position: 'relative',
                zIndex: 1
              }}>
                {health.status?.toUpperCase() || 'UNKNOWN'}
              </span>
              
              <style>{`
                @keyframes rotate {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                @keyframes glowPulse {
                  0%, 100% { opacity: 0.8; }
                  50% { opacity: 1; }
                }
              `}</style>
            </div>
            
            {/* Metrics */}
            <MetricRow 
              label="SERVICE" 
              value={health.service || 'SYNTX'} 
              icon="🔧" 
              color="#00d4ff" 
            />
            <MetricRow 
              label="VERSION" 
              value={health.version || 'N/A'} 
              icon="📦" 
              color="#d946ef" 
            />
            <MetricRow 
              label="FORMAT LOADER" 
              value={health.format_loader || 'N/A'} 
              icon="🔥" 
              color="#10b981" 
            />
            
            {/* Last Response Info */}
            {health.last_response && (
              <MetricRow 
                label="LAST LATENCY" 
                value={`${(health.last_response.latency_ms / 1000).toFixed(2)}s`}
                icon="⚡" 
                color="#f59e0b" 
              />
            )}
          </>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: 20, 
            color: '#ef4444',
            fontFamily: 'monospace'
          }}>
            Failed to load
          </div>
        )}
      </div>
    </div>
  );
}
