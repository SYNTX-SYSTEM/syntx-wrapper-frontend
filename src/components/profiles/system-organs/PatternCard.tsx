// ═══════════════════════════════════════════════════════════════════════════
// 💎 PATTERN CARD - GLOWING RESONANZKÖRPER
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState } from 'react';

interface PatternCardProps {
  name: string;
  cluster?: string;
  score: number;
  state: 'ACTIVE' | 'DORMANT' | 'TENSIONED' | 'UNBORN';
  stability: string;
  matchCount: number;
  weight?: number;
}

export function PatternCard({
  name,
  cluster,
  score,
  state,
  stability,
  matchCount,
  weight
}: PatternCardProps) {
  
  const [hover, setHover] = useState(false);
  
  const stateConfig = {
    ACTIVE: { icon: '🟢', label: 'ACTIVE', color: '#10b981', glow: 'rgba(16,185,129,0.4)' },
    DORMANT: { icon: '⚪', label: 'DORMANT', color: '#6b7280', glow: 'rgba(107,114,128,0.2)' },
    TENSIONED: { icon: '🔴', label: 'TENSIONED', color: '#ef4444', glow: 'rgba(239,68,68,0.4)' },
    UNBORN: { icon: '⚪', label: 'UNBORN', color: '#6b7280', glow: 'rgba(107,114,128,0.2)' }
  };
  
  const { icon, label, color, glow } = stateConfig[state] || stateConfig.UNBORN;
  
  return (
    <div 
      style={{
        position: 'relative',
        transform: hover ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* GLOW EFFECT */}
      {hover && (
        <div style={{
          position: 'absolute',
          top: -10,
          left: -10,
          right: -10,
          bottom: -10,
          background: `radial-gradient(circle at center, ${glow} 0%, transparent 70%)`,
          filter: 'blur(20px)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
      )}
      
      <div style={{
        position: 'relative',
        background: hover ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)',
        border: hover ? `1px solid ${color}60` : '1px solid rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 18,
        cursor: 'pointer',
        boxShadow: hover ? `0 8px 32px ${glow}, 0 0 0 1px ${color}30` : 'none',
        overflow: 'hidden'
      }}>
        
        {/* TOP ACCENT */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
          opacity: hover ? 1 : 0.3,
          transition: 'opacity 0.3s'
        }} />
        
        {/* HEADER */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: 12 
        }}>
          <span style={{ 
            color: hover ? '#00d4ff' : 'rgba(0,212,255,0.8)', 
            fontFamily: 'monospace', 
            fontSize: 13, 
            fontWeight: 700,
            transition: 'color 0.3s',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {name}
          </span>
          <span 
            style={{ 
              fontSize: 18,
              filter: hover ? `drop-shadow(0 0 8px ${color})` : 'none',
              transition: 'filter 0.3s'
            }} 
            title={label}
          >
            {icon}
          </span>
        </div>
        
        {/* CLUSTER */}
        {cluster && (
          <div style={{ 
            fontSize: 10, 
            color: 'rgba(255,255,255,0.4)', 
            marginBottom: 12, 
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {cluster}
          </div>
        )}
        
        {/* SCORE */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ 
            fontSize: 32, 
            fontWeight: 900, 
            background: `linear-gradient(135deg, ${color} 0%, #d946ef 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'monospace',
            lineHeight: 1
          }}>
            {Math.round(score)}%
          </div>
          <div style={{ 
            fontSize: 10, 
            color: 'rgba(255,255,255,0.4)', 
            marginTop: 4,
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            {label}
          </div>
        </div>
        
        {/* PROGRESS BAR */}
        <div style={{
          height: 4,
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 2,
          overflow: 'hidden',
          marginBottom: 12
        }}>
          <div style={{
            height: '100%',
            width: `${score}%`,
            background: `linear-gradient(90deg, ${color} 0%, #d946ef 100%)`,
            boxShadow: `0 0 8px ${glow}`,
            transition: 'width 0.5s ease-out'
          }} />
        </div>
        
        {/* METADATA */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 10,
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'monospace'
        }}>
          <span>MATCHES: {matchCount}</span>
          {weight !== undefined && <span>W: {(weight * 100).toFixed(0)}%</span>}
        </div>
      </div>
    </div>
  );
}
