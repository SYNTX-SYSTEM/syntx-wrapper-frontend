'use client';

import React from 'react';
import { ORACLE_COLORS } from '../constants';
import { NavigationButtons } from './NavigationButtons';

interface WelcomeStepProps {
  profileName: string;
  formatName: string;
  onNext: () => void;
}

export function WelcomeStep({ profileName, formatName, onNext }: WelcomeStepProps) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 600 }}>
      <div style={{
        fontSize: 120,
        marginBottom: 30,
        animation: 'eyePulse 2s ease-in-out infinite',
      }}>
        👁️
      </div>

      <div style={{
        fontSize: 32,
        fontWeight: 900,
        color: ORACLE_COLORS.primary,
        fontFamily: 'monospace',
        letterSpacing: 3,
        marginBottom: 20,
      }}>
        PROFILE PULSE
      </div>

      <div style={{
        fontSize: 16,
        color: ORACLE_COLORS.primary + '80',
        fontFamily: 'monospace',
        lineHeight: 1.8,
        marginBottom: 40,
      }}>
        Tune the semantic resonance of your scoring profile.
        <br />
        Adjust weights, thresholds, and drift levels.
        <br />
        <br />
        <strong style={{ color: ORACLE_COLORS.secondary }}>
          {profileName}
        </strong>
        <br />
        <span style={{ fontSize: 14, color: ORACLE_COLORS.tertiary }}>
          Format: {formatName.toUpperCase()}
        </span>
      </div>

      <button
        onClick={onNext}
        style={{
          padding: '20px 60px',
          background: `linear-gradient(135deg, ${ORACLE_COLORS.primary}, ${ORACLE_COLORS.secondary})`,
          border: 'none',
          borderRadius: 12,
          color: '#000',
          fontSize: 16,
          fontWeight: 900,
          fontFamily: 'monospace',
          letterSpacing: 2,
          cursor: 'pointer',
          boxShadow: `0 0 40px ${ORACLE_COLORS.primary}80`,
          transition: 'all 0.3s',
          outline: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = `0 0 60px ${ORACLE_COLORS.primary}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = `0 0 40px ${ORACLE_COLORS.primary}80`;
        }}
      >
        BEGIN CALIBRATION →
      </button>

      <style jsx>{`
        @keyframes eyePulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
