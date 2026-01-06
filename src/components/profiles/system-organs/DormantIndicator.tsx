// ═══════════════════════════════════════════════════════════════════════════
// 🌊 DORMANT INDICATOR - System State Message
// ═══════════════════════════════════════════════════════════════════════════

import React from 'react';

interface DormantIndicatorProps {
  message?: string;
  state: string;
  totalPulses: number;
}

export function DormantIndicator({ 
  message = "Feld wurde nie aktiviert. Keine Erinnerungen.",
  state,
  totalPulses 
}: DormantIndicatorProps) {
  
  if (state !== 'UNBORN' && totalPulses > 0) {
    return null;
  }
  
  return (
    <div style={{ 
      marginTop: 24, 
      background: 'rgba(234,179,8,0.1)', 
      border: '1px solid rgba(234,179,8,0.3)', 
      borderRadius: 10, 
      padding: 16 
    }}>
      <div style={{ display: 'flex', alignItems: 'start', gap: 12 }}>
        <span style={{ fontSize: 20 }}>⚪</span>
        <div>
          <div style={{ 
            fontSize: 12, 
            fontWeight: 600, 
            color: '#eab308', 
            marginBottom: 4,
            fontFamily: 'monospace'
          }}>
            SYSTEM STATUS: {state}
          </div>
          <div style={{ 
            fontSize: 13, 
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'monospace'
          }}>
            {message}
          </div>
          <div style={{ 
            fontSize: 10, 
            color: 'rgba(255,255,255,0.4)', 
            marginTop: 8,
            fontFamily: 'monospace'
          }}>
            Total Pulses: {totalPulses}
          </div>
        </div>
      </div>
    </div>
  );
}
