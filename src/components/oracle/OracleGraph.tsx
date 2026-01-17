'use client';

import React from 'react';
import { ORACLE_COLORS } from './constants';

export function OracleGraph() {
  return (
    <div style={{
      marginTop: 60,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 400,
    }}>
      <div style={{
        padding: 40,
        background: `${ORACLE_COLORS.bgLight}80`,
        border: `2px solid ${ORACLE_COLORS.primary}40`,
        borderRadius: 16,
        color: ORACLE_COLORS.textDim,
        fontFamily: 'monospace',
        fontSize: 14,
      }}>
        Oracle Graph Placeholder
      </div>
    </div>
  );
}
