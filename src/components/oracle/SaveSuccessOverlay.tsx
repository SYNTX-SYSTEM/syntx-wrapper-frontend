'use client';

import React, { useEffect, useState } from 'react';
import { ORACLE_COLORS } from './constants';

type Props = {
  show: boolean;
  modifications: Array<{ property: string; oldValue: number; newValue: number }>;
  profileId: string;
  onClose: () => void;
};

export function SaveSuccessOverlay({ show, modifications, profileId, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show && !visible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 9999,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.3s',
    }}>
      <div style={{
        width: 500,
        background: `linear-gradient(135deg, ${ORACLE_COLORS.bgLight}f5, ${ORACLE_COLORS.bg}f5)`,
        borderRadius: 20,
        border: `3px solid ${ORACLE_COLORS.primary}`,
        boxShadow: `
          0 0 50px ${ORACLE_COLORS.primary}80,
          0 0 100px ${ORACLE_COLORS.secondary}40,
          inset 0 0 50px ${ORACLE_COLORS.primary}10
        `,
        padding: 32,
        animation: visible ? 'slideIn 0.3s ease-out' : 'none',
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 24,
        }}>
          <div style={{
            fontSize: 48,
            marginBottom: 12,
            filter: `drop-shadow(0 0 20px ${ORACLE_COLORS.primary})`,
            animation: 'pulse 1s ease-in-out infinite',
          }}>
            ⚡
          </div>
          <div style={{
            fontSize: 24,
            fontWeight: 900,
            color: ORACLE_COLORS.primary,
            fontFamily: 'monospace',
            letterSpacing: 3,
            textShadow: `0 0 20px ${ORACLE_COLORS.primary}`,
            marginBottom: 8,
          }}>
            SCORING MATRIX UPDATED
          </div>
          <div style={{
            fontSize: 11,
            color: ORACLE_COLORS.textDim,
            fontFamily: 'monospace',
            letterSpacing: 2,
          }}>
            SYNCHRONIZED WITH BACKEND
          </div>
        </div>

        {/* Modifications */}
        <div style={{
          marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 800,
            color: ORACLE_COLORS.secondary,
            fontFamily: 'monospace',
            letterSpacing: 2,
            marginBottom: 12,
          }}>
            🌌 MODIFIED PARAMETERS:
          </div>
          <div style={{
            background: `${ORACLE_COLORS.bgLight}80`,
            borderRadius: 12,
            padding: 16,
            border: `1px solid ${ORACLE_COLORS.secondary}40`,
          }}>
            {modifications.map((mod, i) => (
              <div
                key={i}
                style={{
                  fontSize: 10,
                  fontFamily: 'monospace',
                  color: ORACLE_COLORS.text,
                  marginBottom: 8,
                  paddingLeft: 12,
                  borderLeft: `2px solid ${ORACLE_COLORS.tertiary}`,
                  animation: `fadeIn 0.3s ease-out ${i * 0.1}s both`,
                }}
              >
                <span style={{ color: ORACLE_COLORS.tertiary }}>⟫</span>{' '}
                <span style={{ color: ORACLE_COLORS.primary }}>{mod.property}</span>:{' '}
                <span style={{ color: ORACLE_COLORS.textDim }}>{mod.oldValue.toFixed(3)}</span>{' '}
                <span style={{ color: ORACLE_COLORS.secondary }}>→</span>{' '}
                <span style={{ color: ORACLE_COLORS.tertiary, fontWeight: 800 }}>
                  {mod.newValue.toFixed(3)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 12,
          background: `${ORACLE_COLORS.primary}20`,
          borderRadius: 10,
          border: `1px solid ${ORACLE_COLORS.primary}40`,
        }}>
          <div style={{
            fontSize: 9,
            fontFamily: 'monospace',
            color: ORACLE_COLORS.textDim,
          }}>
            💎 PROFILE: {profileId}
          </div>
          <div style={{
            fontSize: 9,
            fontFamily: 'monospace',
            color: ORACLE_COLORS.primary,
            fontWeight: 800,
          }}>
            ⚡ STATUS: SYNCHRONIZED
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
