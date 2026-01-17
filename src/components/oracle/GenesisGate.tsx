'use client';

import React, { useState } from 'react';
import { ORACLE_COLORS } from './constants';

interface GenesisGateProps {
  onModeSelect: (mode: 'json' | 'wizard') => void;
  onClose: () => void;
}

export function GenesisGate({ onModeSelect, onClose }: GenesisGateProps) {
  const [pulsePhase, setPulsePhase] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 4);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      animation: 'gateOpen 0.5s ease-out',
    }}>
      {/* Cosmic Background Pulse */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at center, ${ORACLE_COLORS.primary}10, transparent 70%)`,
        animation: 'cosmicPulse 3s ease-in-out infinite',
      }} />

      {/* Close Portal */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 40,
          right: 40,
          background: 'transparent',
          border: `2px solid ${ORACLE_COLORS.primary}60`,
          color: ORACLE_COLORS.primary,
          padding: '12px 24px',
          borderRadius: 8,
          cursor: 'pointer',
          fontSize: 14,
          fontFamily: 'monospace',
          fontWeight: 600,
          letterSpacing: 2,
          transition: 'all 0.3s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = `${ORACLE_COLORS.primary}20`;
          e.currentTarget.style.borderColor = ORACLE_COLORS.primary;
          e.currentTarget.style.boxShadow = `0 0 20px ${ORACLE_COLORS.primary}80`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = `${ORACLE_COLORS.primary}60`;
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        ESC
      </button>

      {/* Center Eye Expansion */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 80,
      }}>
        {/* Origin Eye */}
        <div style={{
          position: 'relative',
          width: 160,
          height: 160,
        }}>
          {/* Pulse Rings */}
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: -20 * (i + 1),
                border: `2px solid ${ORACLE_COLORS.primary}`,
                borderRadius: '50%',
                opacity: pulsePhase === i ? 0.8 : 0,
                transition: 'opacity 0.8s ease-out',
                boxShadow: `0 0 40px ${ORACLE_COLORS.primary}`,
              }}
            />
          ))}

          {/* Core Eye */}
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${ORACLE_COLORS.bgLight}, ${ORACLE_COLORS.bg})`,
            border: `3px solid ${ORACLE_COLORS.primary}`,
            boxShadow: `
              0 0 60px ${ORACLE_COLORS.primary}ff,
              0 0 100px ${ORACLE_COLORS.primary}80,
              inset 0 0 40px ${ORACLE_COLORS.primary}20
            `,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src="/logo_original.png"
              alt="SYNTX"
              style={{
                width: '60%',
                height: '60%',
                objectFit: 'contain',
                filter: `drop-shadow(0 0 20px ${ORACLE_COLORS.primary})`,
                animation: 'logoBreathing 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* Mode Selection */}
        <div style={{
          display: 'flex',
          gap: 60,
          alignItems: 'center',
        }}>
          {/* JSON Injection Path */}
          <button
            onClick={() => onModeSelect('json')}
            style={{
              position: 'relative',
              width: 280,
              height: 180,
              background: `linear-gradient(135deg, ${ORACLE_COLORS.bg}, ${ORACLE_COLORS.bgLight})`,
              border: `2px solid ${ORACLE_COLORS.primary}60`,
              borderRadius: 16,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              transition: 'all 0.3s',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = ORACLE_COLORS.primary;
              e.currentTarget.style.boxShadow = `0 0 40px ${ORACLE_COLORS.primary}80`;
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = `${ORACLE_COLORS.primary}60`;
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              fontSize: 48,
              filter: `drop-shadow(0 0 20px ${ORACLE_COLORS.primary})`,
            }}>
              🔁
            </div>
            <div style={{
              fontSize: 20,
              fontWeight: 700,
              color: ORACLE_COLORS.primary,
              fontFamily: 'monospace',
              letterSpacing: 2,
            }}>
              JSON INJECTION
            </div>
            <div style={{
              fontSize: 12,
              color: ORACLE_COLORS.textDim,
              fontFamily: 'monospace',
              textAlign: 'center',
              maxWidth: '80%',
            }}>
              Direct soul injection
            </div>
          </button>

          {/* Energy Bridge */}
          <div style={{
            width: 80,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${ORACLE_COLORS.primary}, transparent)`,
            boxShadow: `0 0 20px ${ORACLE_COLORS.primary}`,
            animation: 'energyFlow 2s linear infinite',
          }} />

          {/* Wizard Flow Path */}
          <button
            onClick={() => onModeSelect('wizard')}
            style={{
              position: 'relative',
              width: 280,
              height: 180,
              background: `linear-gradient(135deg, ${ORACLE_COLORS.bg}, ${ORACLE_COLORS.bgLight})`,
              border: `2px solid ${ORACLE_COLORS.secondary}60`,
              borderRadius: 16,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              transition: 'all 0.3s',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = ORACLE_COLORS.secondary;
              e.currentTarget.style.boxShadow = `0 0 40px ${ORACLE_COLORS.secondary}80`;
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = `${ORACLE_COLORS.secondary}60`;
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              fontSize: 48,
              filter: `drop-shadow(0 0 20px ${ORACLE_COLORS.secondary})`,
            }}>
              🧙
            </div>
            <div style={{
              fontSize: 20,
              fontWeight: 700,
              color: ORACLE_COLORS.secondary,
              fontFamily: 'monospace',
              letterSpacing: 2,
            }}>
              WIZARD FLOW
            </div>
            <div style={{
              fontSize: 12,
              color: ORACLE_COLORS.textDim,
              fontFamily: 'monospace',
              textAlign: 'center',
              maxWidth: '80%',
            }}>
              Step-by-step genesis
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes gateOpen {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cosmicPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes logoBreathing {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes energyFlow {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
