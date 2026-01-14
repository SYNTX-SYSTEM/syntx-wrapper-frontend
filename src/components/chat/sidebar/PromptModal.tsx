"use client";

import React from 'react';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  wrapperName: string;
  content: string;
}

export function PromptModal({ isOpen, onClose, wrapperName, content }: PromptModalProps) {
  if (!isOpen) return null;

  const lines = content.split('\n').length;
  const chars = content.length;
  const tokens = Math.round(chars / 4);

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        animation: 'slideIn 0.2s ease-out'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: 900,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, rgba(10,25,47,0.95) 0%, rgba(0,0,0,0.98) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: 16,
          border: '1px solid rgba(0,212,255,0.3)',
          boxShadow: '0 0 60px rgba(0,212,255,0.3), inset 0 0 40px rgba(0,212,255,0.05)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* GLOW BORDER TOP */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
          opacity: 0.8
        }} />

        {/* HEADER - EXAKT WIE CARD */}
        <div style={{
          padding: 16,
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
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

            <button
              onClick={onClose}
              style={{
                width: 32, height: 32,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 20,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
              }}
              className="cyber-btn"
            >
              ×
            </button>
          </div>

          {/* METRICS - EXAKT WIE CARD */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12
          }}>
            <div className="float" style={{ 
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05))',
              border: '1px solid rgba(0,212,255,0.4)',
              borderRadius: 10,
              padding: '14px 8px',
              boxShadow: '0 0 15px rgba(0,212,255,0.2)'
            }}>
              <div style={{ 
                fontSize: 24, fontWeight: 900, color: '#00d4ff', 
                fontFamily: 'monospace',
                textShadow: '0 0 15px rgba(0,212,255,0.8)'
              }}
              className="glow-text"
              >
                {lines}
              </div>
              <div style={{ 
                fontSize: 8, color: 'rgba(255,255,255,0.5)', 
                marginTop: 6, letterSpacing: 1,
                fontWeight: 600
              }}>
                ZEILEN
              </div>
            </div>

            <div className="float" style={{ 
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))',
              border: '1px solid rgba(245,158,11,0.4)',
              borderRadius: 10,
              padding: '14px 8px',
              boxShadow: '0 0 15px rgba(245,158,11,0.2)',
              animationDelay: '0.1s'
            }}>
              <div style={{ 
                fontSize: 24, fontWeight: 900, color: '#f59e0b', 
                fontFamily: 'monospace',
                textShadow: '0 0 15px rgba(245,158,11,0.8)'
              }}
              className="glow-text"
              >
                {chars}
              </div>
              <div style={{ 
                fontSize: 8, color: 'rgba(255,255,255,0.5)', 
                marginTop: 6, letterSpacing: 1,
                fontWeight: 600
              }}>
                ZEICHEN
              </div>
            </div>

            <div className="float" style={{ 
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(217,70,239,0.2), rgba(217,70,239,0.05))',
              border: '1px solid rgba(217,70,239,0.4)',
              borderRadius: 10,
              padding: '14px 8px',
              boxShadow: '0 0 15px rgba(217,70,239,0.2)',
              animationDelay: '0.2s'
            }}>
              <div style={{ 
                fontSize: 24, fontWeight: 900, color: '#d946ef', 
                fontFamily: 'monospace',
                textShadow: '0 0 15px rgba(217,70,239,0.8)'
              }}
              className="glow-text"
              >
                ~{tokens}
              </div>
              <div style={{ 
                fontSize: 8, color: 'rgba(255,255,255,0.5)', 
                marginTop: 6, letterSpacing: 1,
                fontWeight: 600
              }}>
                TOKENS
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT - SCROLLABLE */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: 20,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 13,
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.85)',
          whiteSpace: 'pre-wrap',
          background: 'rgba(0,0,0,0.2)'
        }}>
          {content}
        </div>
      </div>
    </div>
  );
}
