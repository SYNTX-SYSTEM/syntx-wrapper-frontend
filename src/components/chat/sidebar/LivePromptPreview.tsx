"use client";

import React, { useState } from 'react';

interface LivePromptPreviewProps {
  wrapperContent: string;
  loading?: boolean;
  onOpenModal?: () => void;
}

export function LivePromptPreview({ wrapperContent, loading = false, onOpenModal }: LivePromptPreviewProps) {
  const [expanded, setExpanded] = useState(false);

  const lines = wrapperContent.split('\n').length;
  const chars = wrapperContent.length;
  const tokens = Math.round(chars / 4);
  const preview = wrapperContent.slice(0, 200);

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
      }}>
        <div style={{
          fontSize: 10,
          fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          🔥 LIVE PROMPT
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* MODAL ICON */}
          {onOpenModal && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal();
              }}
              style={{
                fontSize: 16,
                color: '#00d4ff',
                cursor: 'pointer',
                transition: 'all 0.3s',
                filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.6))',
              }}
              className="pulse"
              title="Im Modal öffnen"
            >
              🔍
            </div>
          )}

          {/* EXPAND ICON */}
          <div
            onClick={() => setExpanded(!expanded)}
            style={{
              fontSize: 18,
              color: expanded ? '#00d4ff' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              filter: expanded ? 'drop-shadow(0 0 8px rgba(0,212,255,0.6))' : 'none',
            }}
            className="pulse"
          >
            {expanded ? '▼' : '▶'}
          </div>
        </div>
      </div>

      {expanded && (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
            marginBottom: 12
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#00d4ff', fontFamily: 'monospace' }}>
                {lines}
              </div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>ZEILEN</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#f59e0b', fontFamily: 'monospace' }}>
                {chars}
              </div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>ZEICHEN</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#d946ef', fontFamily: 'monospace' }}>
                ~{tokens}
              </div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>TOKENS</div>
            </div>
          </div>

          <div style={{
            maxHeight: 200,
            overflow: 'auto',
            padding: 12,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.7)',
            whiteSpace: 'pre-wrap'
          }}>
            {loading ? 'Loading...' : (wrapperContent || 'Kein Content')}
          </div>
        </>
      )}
    </div>
  );
}
