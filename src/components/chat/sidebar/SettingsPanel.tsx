"use client";

import React from 'react';

interface SettingsPanelProps {
  maxTokens: number;
  onMaxTokensChange: (value: number) => void;
  loading?: boolean;
}

export function SettingsPanel({ 
  maxTokens, 
  onMaxTokensChange, 
  loading = false 
}: SettingsPanelProps) {
  return (
    <div>
      <div style={{
        fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)',
        marginBottom: 12, letterSpacing: 2,
        display: 'flex', alignItems: 'center', gap: 6
      }}>
        ⚙️ SETTINGS
      </div>
      
      <div style={{ 
        fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 8 
      }}>
        Max Tokens: <span style={{ color: '#00d4ff', fontWeight: 700 }}>{maxTokens}</span>
      </div>
      
      <input
        type="range" 
        min={50} 
        max={2000} 
        value={maxTokens}
        onChange={(e) => onMaxTokensChange(parseInt(e.target.value))}
        disabled={loading}
        style={{ 
          width: '100%', 
          accentColor: '#00d4ff', 
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.5 : 1,
        }}
      />
    </div>
  );
}
