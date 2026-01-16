// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   ⚡ KALIBRIEREN BUTTON - SCORING PROFILE ASSIGNMENT                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { useState } from 'react';
import { ORACLE_COLORS } from './constants';

type Props = {
  scoring: any;
  currentProfile: string | null;
  onCalibrate: (profileName: string) => void;
  disabled?: boolean;
};

export function KalibrierenButton({ scoring, currentProfile, onCalibrate, disabled }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!scoring) return null;

  const handleCalibrate = async () => {
    if (!currentProfile) {
      alert('Please select a profile first!');
      return;
    }

    setLoading(true);
    try {
      // TODO: Call actual API to assign scoring to profile
      await new Promise(resolve => setTimeout(resolve, 500));
      onCalibrate(currentProfile);
      setIsOpen(false);
    } catch (error) {
      console.error('Calibration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'relative',
    }}>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || !scoring}
        style={{
          width: '100%',
          padding: '16px 20px',
          background: `linear-gradient(135deg, ${ORACLE_COLORS.tertiary}40, ${ORACLE_COLORS.secondary}40)`,
          border: `3px solid ${ORACLE_COLORS.tertiary}`,
          borderRadius: 12,
          color: ORACLE_COLORS.tertiary,
          fontSize: 14,
          fontWeight: 900,
          letterSpacing: 3,
          cursor: disabled || !scoring ? 'not-allowed' : 'pointer',
          fontFamily: 'monospace',
          transition: 'all 0.3s',
          boxShadow: `0 0 30px ${ORACLE_COLORS.tertiary}40`,
          textTransform: 'uppercase',
          position: 'relative',
          overflow: 'hidden',
          opacity: disabled || !scoring ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          if (!disabled && scoring) {
            e.currentTarget.style.boxShadow = `0 0 50px ${ORACLE_COLORS.tertiary}80`;
            e.currentTarget.style.transform = 'scale(1.02)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 0 30px ${ORACLE_COLORS.tertiary}40`;
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(90deg, transparent, ${ORACLE_COLORS.tertiary}20, transparent)`,
          animation: 'slide 2s infinite',
        }} />
        
        <span style={{ position: 'relative', zIndex: 1 }}>
          ⚡ KALIBRIEREN
        </span>

        <style jsx>{`
          @keyframes slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </button>

      {/* Confirmation Modal */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: -140,
          left: 0,
          right: 0,
          padding: 16,
          background: `linear-gradient(135deg, ${ORACLE_COLORS.bgLight}f0, ${ORACLE_COLORS.bg}f0)`,
          backdropFilter: 'blur(20px)',
          border: `2px solid ${ORACLE_COLORS.tertiary}`,
          borderRadius: 12,
          boxShadow: `0 0 40px ${ORACLE_COLORS.tertiary}60`,
          zIndex: 1000,
        }}>
          <div style={{
            fontSize: 12,
            color: ORACLE_COLORS.text,
            marginBottom: 12,
            fontFamily: 'monospace',
            lineHeight: 1.6,
          }}>
            <div style={{ marginBottom: 8, color: ORACLE_COLORS.tertiary, fontWeight: 700 }}>
              KALIBRIERUNG BESTÄTIGEN
            </div>
            <div style={{ fontSize: 10, color: ORACLE_COLORS.textDim }}>
              Assign this scoring to:
              <div style={{ color: ORACLE_COLORS.secondary, marginTop: 4 }}>
                {currentProfile || 'No profile selected'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setIsOpen(false)}
              disabled={loading}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: `${ORACLE_COLORS.bg}80`,
                border: `2px solid ${ORACLE_COLORS.textDim}40`,
                borderRadius: 8,
                color: ORACLE_COLORS.textDim,
                fontSize: 11,
                fontWeight: 700,
                cursor: loading ? 'wait' : 'pointer',
                fontFamily: 'monospace',
              }}
            >
              CANCEL
            </button>
            <button
              onClick={handleCalibrate}
              disabled={loading || !currentProfile}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: `${ORACLE_COLORS.tertiary}30`,
                border: `2px solid ${ORACLE_COLORS.tertiary}`,
                borderRadius: 8,
                color: ORACLE_COLORS.tertiary,
                fontSize: 11,
                fontWeight: 700,
                cursor: loading || !currentProfile ? 'wait' : 'pointer',
                fontFamily: 'monospace',
              }}
            >
              {loading ? '⚡ PROCESSING...' : '✓ CONFIRM'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
