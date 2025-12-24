"use client";

import React from 'react';

// ═══════════════════════════════════════════════════════════════
// 🌊 CONFIG PANEL - SYSTEM CONFIGURATION WITH EFFECTS
// ═══════════════════════════════════════════════════════════════

interface SystemConfig {
  active_wrapper: string;
  exists: boolean;
  path: string;
  source: string;
}

interface ConfigPanelProps {
  config: SystemConfig | null;
  wrapperCount: number;
  activeWrapperName: string | null;
  loading: boolean;
  onRefresh: () => void;
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
      {/* Data stream effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `repeating-linear-gradient(
          90deg,
          transparent,
          transparent 10px,
          ${color}05 10px,
          ${color}05 20px
        )`,
        animation: 'dataFlow 20s linear infinite'
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
        @keyframes dataFlow {
          0% { background-position: 0 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>
    </div>
  );
}

export function ConfigPanel({ 
  config, 
  wrapperCount, 
  activeWrapperName,
  loading, 
  onRefresh 
}: ConfigPanelProps) {
  const formatWrapperName = (name: string | null) => {
    if (!name) return 'NONE';
    return name.replace('syntex_wrapper_', '').toUpperCase();
  };
  
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
        background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)',
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
        <span style={{ fontSize: 24 }}>⚙️</span>
        <h3 style={{
          margin: 0,
          flex: 1,
          fontFamily: 'monospace',
          fontSize: 14,
          color: '#f59e0b',
          letterSpacing: 2
        }}>
          CONFIGURATION
        </h3>
        
        {/* Rotating gear animation */}
        <div style={{
          width: 20,
          height: 20,
          border: '2px solid #f59e0b40',
          borderTop: '2px solid #f59e0b',
          borderRadius: '50%',
          animation: 'spin 3s linear infinite'
        }} />
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes glowPulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
        `}</style>
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
        ) : (
          <>
            <MetricRow 
              label="DEFAULT WRAPPER" 
              value={formatWrapperName(config?.active_wrapper || null)}
              icon="📦" 
              color="#f59e0b" 
            />
            <MetricRow 
              label="TOTAL WRAPPERS" 
              value={wrapperCount}
              icon="📚" 
              color="#d946ef" 
            />
            <MetricRow 
              label="ACTIVE WRAPPER" 
              value={formatWrapperName(activeWrapperName)}
              icon="✅" 
              color="#10b981" 
            />
            <MetricRow 
              label="API BASE" 
              value="dev.syntx-system.com"
              icon="🌐" 
              color="#00d4ff" 
            />
            
            {/* Config Source Badge */}
            {config?.source && (
              <div style={{
                marginTop: 16,
                padding: '10px 14px',
                borderRadius: 10,
                background: 'rgba(0,212,255,0.1)',
                border: '1px solid rgba(0,212,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <span style={{ fontSize: 12 }}>💾</span>
                <span style={{
                  fontSize: 11,
                  fontFamily: 'monospace',
                  color: 'rgba(255,255,255,0.5)'
                }}>
                  SOURCE:
                </span>
                <span style={{
                  fontSize: 11,
                  fontFamily: 'monospace',
                  color: '#00d4ff',
                  fontWeight: 600
                }}>
                  {config.source.toUpperCase()}
                </span>
              </div>
            )}
            
            {/* Refresh Button */}
            <button 
              onClick={onRefresh}
              disabled={loading}
              style={{
                marginTop: 16,
                width: '100%',
                padding: '12px 20px',
                borderRadius: 12,
                border: '1px solid rgba(0,212,255,0.3)',
                background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))',
                color: '#00d4ff',
                fontFamily: 'monospace',
                fontSize: 12,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={e => {
                if (!loading) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.25), rgba(0,212,255,0.1))';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,212,255,0.3)';
                }
              }}
              onMouseLeave={e => {
                if (!loading) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {/* Shimmer effect on hover */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                animation: loading ? 'none' : 'buttonShimmer 2s infinite'
              }} />
              
              <span style={{ 
                position: 'relative', 
                zIndex: 1,
                animation: loading ? 'spin 1s linear infinite' : 'none'
              }}>
                ↻
              </span>
              <span style={{ position: 'relative', zIndex: 1, fontWeight: 700, letterSpacing: 1 }}>
                {loading ? 'REFRESHING...' : 'REFRESH'}
              </span>
              
              <style>{`
                @keyframes buttonShimmer {
                  0% { left: -100%; }
                  50%, 100% { left: 100%; }
                }
              `}</style>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
