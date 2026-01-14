"use client";

import React, { useState } from 'react';
import type { Wrapper } from '@/types/api';

interface WrapperSelectorProps {
  wrappers: Wrapper[];
  selectedWrapper: string;
  onWrapperChange: (name: string) => void;
  loading?: boolean;
}

export function WrapperSelector({ 
  wrappers, 
  selectedWrapper, 
  onWrapperChange,
  loading = false 
}: WrapperSelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = wrappers.find(w => w.name === selectedWrapper);
  const color = '#f59e0b';

  return (
    <div style={{ position: 'relative', zIndex: open ? 500 : 1 }}>
      <div style={{
        fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)',
        marginBottom: 12, letterSpacing: 2,
        display: 'flex', alignItems: 'center', gap: 6
      }}>
        <span className={loading ? 'pulse' : ''}>📦</span> WRAPPER
      </div>

      <button 
        onClick={() => !loading && setOpen(!open)} 
        className="cyber-btn" 
        disabled={loading}
        style={{
          width: '100%', padding: '12px 14px', borderRadius: 12,
          border: `1px solid ${color}50`,
          background: `linear-gradient(135deg, ${color}20, ${color}05)`,
          color, fontFamily: 'monospace', fontSize: 12, 
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: open ? `0 0 30px ${color}30` : `0 0 15px ${color}10`,
          transition: 'all 0.3s ease',
          opacity: loading ? 0.5 : 1,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className={open ? 'pulse' : ''} style={{ fontSize: 8 }}>●</span>
          <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {selectedOption?.name || 'Select...'}
          </span>
        </span>
        <span style={{
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}>▼</span>
      </button>

      {open && (
        <>
          <div 
            onClick={() => setOpen(false)} 
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 499
            }} 
          />
          
          <div className="dropdown-menu" style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            marginTop: 6,
            background: 'linear-gradient(145deg, rgba(10,26,46,0.99), rgba(6,13,24,0.99))',
            border: `1px solid ${color}40`,
            borderRadius: 12,
            overflow: 'hidden',
            zIndex: 510,
            maxHeight: 280,
            overflowY: 'auto',
            boxShadow: `0 15px 50px rgba(0,0,0,0.6), 0 0 30px ${color}15`,
          }}>
            {wrappers.map((wrapper, i) => (
              <button 
                key={wrapper.name} 
                onClick={() => { 
                  onWrapperChange(wrapper.name); 
                  setOpen(false); 
                }} 
                style={{
                  width: '100%', padding: '12px 14px', border: 'none',
                  background: wrapper.name === selectedWrapper
                    ? `linear-gradient(90deg, ${color}25, transparent)`
                    : 'transparent',
                  color: wrapper.name === selectedWrapper ? color : 'rgba(255,255,255,0.7)',
                  fontFamily: 'monospace', fontSize: 11, cursor: 'pointer', textAlign: 'left',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  borderBottom: i < wrappers.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { 
                  if (wrapper.name !== selectedWrapper) 
                    e.currentTarget.style.background = `${color}10`; 
                }}
                onMouseLeave={e => { 
                  if (wrapper.name !== selectedWrapper) 
                    e.currentTarget.style.background = 'transparent'; 
                }}
              >
                <span style={{ 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap' 
                }}>
                  {wrapper.name}
                </span>
                {wrapper.is_active && (
                  <span style={{ fontSize: 9, color: '#10b981', fontWeight: 600 }}>
                    ● AKTIV
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
