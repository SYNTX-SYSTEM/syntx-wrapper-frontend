"use client";

import React, { useState } from 'react';

interface LivePromptPreviewProps {
  wrapperContent: string;
  loading?: boolean;
}

export function LivePromptPreview({ wrapperContent, loading = false }: LivePromptPreviewProps) {
  const [expanded, setExpanded] = useState(true);
  
  const lineCount = wrapperContent.split('\n').length;
  const charCount = wrapperContent.length;
  const tokenEstimate = Math.round(charCount / 4);

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3))',
      borderRadius: 12,
      overflow: 'hidden',
      border: '1px solid rgba(0,212,255,0.3)'
    }}>
      <button 
        onClick={() => setExpanded(!expanded)} 
        className="cyber-btn" 
        disabled={loading}
        style={{
          width: '100%', padding: '12px 14px', border: 'none',
          background: 'linear-gradient(90deg, rgba(0,212,255,0.15), transparent)',
          color: '#00d4ff', fontFamily: 'monospace', fontSize: 11, 
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          opacity: loading ? 0.5 : 1,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className={loading ? 'pulse' : ''} style={{ fontSize: 16 }}>🔥</span>
          <span style={{ fontWeight: 700, letterSpacing: 1 }}>LIVE PROMPT</span>
        </span>
        <span style={{
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s'
        }}>▼</span>
      </button>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: expanded ? '1px solid rgba(255,255,255,0.05)' : 'none'
      }}>
        <div style={{ 
          padding: '10px', textAlign: 'center', 
          borderRight: '1px solid rgba(255,255,255,0.05)' 
        }}>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#00d4ff' }}>
            {lineCount}
          </div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>ZEILEN</div>
        </div>
        <div style={{ 
          padding: '10px', textAlign: 'center', 
          borderRight: '1px solid rgba(255,255,255,0.05)' 
        }}>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#f59e0b' }}>
            {charCount}
          </div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>ZEICHEN</div>
        </div>
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#d946ef' }}>
            ~{tokenEstimate}
          </div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>TOKENS</div>
        </div>
      </div>

      {expanded && (
        <div className="data-stream" style={{
          padding: 14,
          maxHeight: 250,
          overflowY: 'auto',
          background: 'rgba(0,0,0,0.3)'
        }}>
          <pre style={{
            margin: 0,
            fontSize: 10,
            fontFamily: 'monospace',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: '#00d4ff'
          }}>
            {wrapperContent || 'Wähle einen Wrapper...'}
          </pre>
        </div>
      )}
    </div>
  );
}
