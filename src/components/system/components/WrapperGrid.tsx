"use client";

import React from 'react';
import { Wrapper } from '@/lib/api';
import { WrapperCard } from './WrapperCard';

// ═══════════════════════════════════════════════════════════════
// 🌊 WRAPPER GRID - STATS OVERVIEW WITH NEURAL EFFECTS
// ═══════════════════════════════════════════════════════════════

interface WrapperStats {
  requests?: number;
  average_latency_ms?: number;
  success_rate?: number;
}

interface WrapperGridProps {
  wrappers: Wrapper[];
  defaultWrapper: string | null;
  onSetDefault: (name: string) => void;
  getStats: (name: string) => Promise<WrapperStats | null>;
}

export function WrapperGrid({ 
  wrappers, 
  defaultWrapper,
  onSetDefault,
  getStats 
}: WrapperGridProps) {
  if (wrappers.length === 0) {
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
          background: 'linear-gradient(90deg, transparent, #d946ef, transparent)'
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
          <span style={{ fontSize: 24 }}>📊</span>
          <h3 style={{
            margin: 0,
            flex: 1,
            fontFamily: 'monospace',
            fontSize: 14,
            color: '#d946ef',
            letterSpacing: 2
          }}>
            WRAPPER STATISTICS
          </h3>
        </div>
        
        {/* Empty state */}
        <div style={{
          padding: 60,
          textAlign: 'center',
          color: 'rgba(255,255,255,0.3)',
          fontFamily: 'monospace',
          fontSize: 14
        }}>
          <div style={{ fontSize: 60, marginBottom: 20, opacity: 0.3 }}>📦</div>
          <div>No wrappers available</div>
        </div>
      </div>
    );
  }
  
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
        background: 'linear-gradient(90deg, transparent, #d946ef, transparent)',
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
        <span style={{ fontSize: 24 }}>📊</span>
        <h3 style={{
          margin: 0,
          flex: 1,
          fontFamily: 'monospace',
          fontSize: 14,
          color: '#d946ef',
          letterSpacing: 2
        }}>
          WRAPPER STATISTICS
        </h3>
        
        {/* Wrapper count badge */}
        <div style={{
          padding: '6px 12px',
          borderRadius: 12,
          background: 'rgba(217,70,239,0.15)',
          border: '1px solid rgba(217,70,239,0.3)',
          fontFamily: 'monospace',
          fontSize: 11,
          color: '#d946ef',
          fontWeight: 600
        }}>
          {wrappers.length} WRAPPERS
        </div>
      </div>
      
      {/* Cards Grid */}
      <div style={{ padding: 24 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20
        }}>
          {wrappers.map(wrapper => (
            <WrapperCard
              key={wrapper.name}
              wrapper={wrapper}
              isDefault={defaultWrapper === wrapper.name}
              onSetDefault={() => onSetDefault(wrapper.name)}
              getStats={getStats}
            />
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
