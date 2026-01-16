'use client';

import React from 'react';
import { ORACLE_COLORS } from './constants';

export function OracleHeader() {
  return (
    <div style={{
      textAlign: 'center',
      marginBottom: 60,
      position: 'relative',
    }}>
      {/* Eye Icon */}
      <div style={{
        fontSize: 80,
        marginBottom: 20,
        filter: `drop-shadow(0 0 30px ${ORACLE_COLORS.primary}80)`,
      }}>
        👁️
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: 64,
        fontWeight: 900,
        background: `linear-gradient(135deg, ${ORACLE_COLORS.primary}, ${ORACLE_COLORS.secondary}, ${ORACLE_COLORS.tertiary})`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: 8,
        margin: 0,
        marginBottom: 10,
        fontFamily: 'monospace',
        textTransform: 'uppercase',
      }}>
        THE ORACLE
      </h1>

      {/* Subtitle */}
      <div style={{
        fontSize: 14,
        color: ORACLE_COLORS.textDim,
        letterSpacing: 6,
        fontFamily: 'monospace',
        textTransform: 'uppercase',
      }}>
        SEMANTIC SCORING SYSTEM
      </div>
    </div>
  );
}
