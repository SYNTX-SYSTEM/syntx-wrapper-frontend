'use client';

import React from 'react';
import { ORACLE_COLORS } from './constants';

type Props = {
  isActive: boolean;
  scores: any;
};

export function OracleVisualization({ isActive, scores }: Props) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 500,
    }}>
      <div style={{
        width: 300,
        height: 300,
        borderRadius: '50%',
        border: `3px solid ${ORACLE_COLORS.primary}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 0 50px ${ORACLE_COLORS.primary}80`,
        animation: isActive ? 'pulse 2s infinite' : 'none',
      }}>
        <div style={{
          fontSize: 80,
          filter: `drop-shadow(0 0 20px ${ORACLE_COLORS.primary})`,
        }}>
          👁️
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
