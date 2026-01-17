'use client';

import React from 'react';
import { ORACLE_COLORS } from '../constants';

interface NavigationButtonsProps {
  onNext?: () => void;
  onBack?: () => void;
  onSave?: () => void;
  isSaving?: boolean;
  nextLabel?: string;
}

export function NavigationButtons({ 
  onNext, 
  onBack, 
  onSave, 
  isSaving = false,
  nextLabel = 'NEXT →'
}: NavigationButtonsProps) {
  return (
    <div style={{
      display: 'flex',
      gap: 20,
      justifyContent: 'center',
      marginTop: 40,
    }}>
      {onBack && (
        <button
          onClick={onBack}
          disabled={isSaving}
          style={{
            padding: '16px 40px',
            background: ORACLE_COLORS.bgLight,
            border: `2px solid ${ORACLE_COLORS.primary}40`,
            borderRadius: 12,
            color: ORACLE_COLORS.primary,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'monospace',
            letterSpacing: 1,
            cursor: isSaving ? 'not-allowed' : 'pointer',
            opacity: isSaving ? 0.5 : 1,
            transition: 'all 0.3s',
            outline: 'none',
          }}
        >
          ← BACK
        </button>
      )}

      {onNext && (
        <button
          onClick={onNext}
          style={{
            padding: '16px 60px',
            background: `linear-gradient(135deg, ${ORACLE_COLORS.primary}, ${ORACLE_COLORS.secondary})`,
            border: 'none',
            borderRadius: 12,
            color: '#000',
            fontSize: 14,
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
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {nextLabel}
        </button>
      )}

      {onSave && (
        <button
          onClick={onSave}
          disabled={isSaving}
          style={{
            padding: '16px 60px',
            background: isSaving 
              ? ORACLE_COLORS.bgLight
              : `linear-gradient(135deg, ${ORACLE_COLORS.primary}, ${ORACLE_COLORS.secondary})`,
            border: 'none',
            borderRadius: 12,
            color: isSaving ? ORACLE_COLORS.primary : '#000',
            fontSize: 14,
            fontWeight: 900,
            fontFamily: 'monospace',
            letterSpacing: 2,
            cursor: isSaving ? 'not-allowed' : 'pointer',
            boxShadow: isSaving ? 'none' : `0 0 40px ${ORACLE_COLORS.primary}80`,
            transition: 'all 0.3s',
            outline: 'none',
            animation: isSaving ? 'pulse 1s ease-in-out infinite' : 'none',
          }}
        >
          {isSaving ? '💾 SAVING...' : '💾 SAVE & APPLY'}
        </button>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
