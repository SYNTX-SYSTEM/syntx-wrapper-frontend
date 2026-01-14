"use client";

import React from 'react';

export function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '14px 18px', alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 12, height: 12, borderRadius: '50%',
          background: 'linear-gradient(135deg, #00d4ff, #d946ef)',
          animation: `typingBounce 1.4s ease-in-out ${i * 0.15}s infinite`,
          boxShadow: '0 0 15px rgba(0,212,255,0.6)'
        }} />
      ))}
      <span className="glow-text" style={{ 
        marginLeft: 10, fontSize: 12, fontFamily: 'monospace', 
        color: '#00d4ff', letterSpacing: 2 
      }}>
        PROCESSING
      </span>
    </div>
  );
}
