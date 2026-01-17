'use client';

import React from 'react';
import { ORACLE_COLORS } from './constants';
import { SkullCloseButton } from './SkullCloseButton';

interface GenesisGateProps {
  onModeSelect: (mode: 'json' | 'wizard') => void;
  onClose: () => void;
}

export function GenesisGate({ onModeSelect, onClose }: GenesisGateProps) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'fadeIn 0.3s ease-out',
    }}>
      <SkullCloseButton onClose={onClose} />

      {/* SYNTX Logo Center */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
      }}>
        <div style={{
          width: 200,
          height: 200,
          margin: '0 auto',
          marginBottom: 40,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ORACLE_COLORS.primary}40, transparent 70%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'logoPulse 3s ease-in-out infinite',
          boxShadow: `
            0 0 100px ${ORACLE_COLORS.primary}60,
            0 0 150px ${ORACLE_COLORS.primary}40,
            0 0 200px ${ORACLE_COLORS.primary}20
          `,
        }}>
          <img
            src="/logo_original.png"
            alt="SYNTX"
            style={{
              width: '70%',
              height: '70%',
              objectFit: 'contain',
              filter: `drop-shadow(0 0 40px ${ORACLE_COLORS.primary})`,
            }}
          />
        </div>
      </div>

      {/* Mode Selection Cards */}
      <div style={{
        display: 'flex',
        gap: 60,
        alignItems: 'center',
      }}>
        {/* JSON Injection */}
        <button
          onClick={() => onModeSelect('json')}
          style={{
            width: 320,
            padding: '40px 30px',
            background: `linear-gradient(135deg, ${ORACLE_COLORS.primary}20, ${ORACLE_COLORS.primary}10)`,
            border: `3px solid ${ORACLE_COLORS.primary}`,
            borderRadius: 20,
            cursor: 'pointer',
            transition: 'all 0.3s',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
            e.currentTarget.style.boxShadow = `0 20px 60px ${ORACLE_COLORS.primary}80`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ fontSize: 64, marginBottom: 20 }}>🔄</div>
          <div style={{
            fontSize: 20,
            fontWeight: 900,
            color: ORACLE_COLORS.primary,
            fontFamily: 'monospace',
            letterSpacing: 2,
            marginBottom: 12,
          }}>
            JSON INJECTION
          </div>
          <div style={{
            fontSize: 13,
            color: ORACLE_COLORS.primary + '80',
            fontFamily: 'monospace',
          }}>
            Direct soul injection
          </div>
        </button>

        {/* Wizard Flow */}
        <button
          onClick={() => onModeSelect('wizard')}
          style={{
            width: 320,
            padding: '40px 30px',
            background: `linear-gradient(135deg, ${ORACLE_COLORS.secondary}20, ${ORACLE_COLORS.secondary}10)`,
            border: `3px solid ${ORACLE_COLORS.secondary}`,
            borderRadius: 20,
            cursor: 'pointer',
            transition: 'all 0.3s',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
            e.currentTarget.style.boxShadow = `0 20px 60px ${ORACLE_COLORS.secondary}80`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ fontSize: 64, marginBottom: 20 }}>🧙</div>
          <div style={{
            fontSize: 20,
            fontWeight: 900,
            color: ORACLE_COLORS.secondary,
            fontFamily: 'monospace',
            letterSpacing: 2,
            marginBottom: 12,
          }}>
            WIZARD FLOW
          </div>
          <div style={{
            fontSize: 13,
            color: ORACLE_COLORS.secondary + '80',
            fontFamily: 'monospace',
          }}>
            Step-by-step genesis
          </div>
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes logoPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
