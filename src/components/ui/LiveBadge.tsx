"use client";

import React from 'react';

interface LiveBadgeProps {
  isLive: boolean;
  pulse?: boolean;
  lastUpdate?: Date | null;
  newCount?: number;
}

export default function LiveBadge({ isLive, pulse, lastUpdate, newCount }: LiveBadgeProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    }}>
      {/* Live Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 14px',
        background: isLive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
        border: `1px solid ${isLive ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
        borderRadius: 20,
        transition: 'all 0.3s ease',
        animation: pulse ? 'livePulse 0.5s ease' : 'none',
      }}>
        <div style={{
          position: 'relative',
          width: 8,
          height: 8,
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: isLive ? '#10b981' : '#ef4444',
            animation: isLive ? 'blink 1.5s ease-in-out infinite' : 'none',
          }} />
          {isLive && (
            <div style={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              border: '2px solid #10b981',
              opacity: 0.4,
              animation: 'ring 1.5s ease-in-out infinite',
            }} />
          )}
        </div>
        <span style={{
          fontSize: 10,
          fontFamily: 'monospace',
          fontWeight: 700,
          color: isLive ? '#10b981' : '#ef4444',
          letterSpacing: 2,
        }}>
          {isLive ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>

      {/* New Event Counter */}
      {newCount && newCount > 0 && (
        <div style={{
          padding: '4px 10px',
          background: 'rgba(0,212,255,0.15)',
          border: '1px solid rgba(0,212,255,0.3)',
          borderRadius: 12,
          fontSize: 10,
          fontFamily: 'monospace',
          color: '#00d4ff',
          animation: 'popIn 0.3s ease',
        }}>
          +{newCount} NEW
        </div>
      )}

      {/* Last Update */}
      {lastUpdate && (
        <span style={{
          fontSize: 9,
          fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.3)',
        }}>
          {lastUpdate.toLocaleTimeString('de-DE')}
        </span>
      )}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes ring {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes livePulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(16,185,129,0.4); }
          100% { transform: scale(1); }
        }
        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
