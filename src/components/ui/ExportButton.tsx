"use client";

import React, { useState } from 'react';

interface ExportButtonProps {
  onExportJSON: () => void;
  onExportCSV: () => void;
  disabled?: boolean;
  color?: string;
}

export default function ExportButton({ onExportJSON, onExportCSV, disabled, color = '#00d4ff' }: ExportButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        disabled={disabled}
        style={{
          padding: '8px 14px',
          borderRadius: 8,
          border: `1px solid ${color}40`,
          background: color + '10',
          color: color,
          fontFamily: 'monospace',
          fontSize: 11,
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        📤 EXPORT ▼
      </button>

      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: 4,
            background: 'linear-gradient(135deg, #0a1a2e, #050b14)',
            border: `1px solid ${color}40`,
            borderRadius: 10,
            overflow: 'hidden',
            zIndex: 101,
            minWidth: 140,
            boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${color}20`,
          }}>
            <button
              onClick={() => { onExportJSON(); setOpen(false); }}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: 11,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>📋</span>
              Export JSON
            </button>
            <button
              onClick={() => { onExportCSV(); setOpen(false); }}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: 11,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>📊</span>
              Export CSV
            </button>
          </div>
        </>
      )}
    </div>
  );
}
