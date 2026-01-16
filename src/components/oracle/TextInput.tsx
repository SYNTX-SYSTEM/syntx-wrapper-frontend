'use client';

import React from 'react';
import { ORACLE_COLORS } from './constants';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
};

export function TextInput({ value, onChange, onSubmit, disabled }: Props) {
  return (
    <div style={{
      padding: 20,
      background: ORACLE_COLORS.bgLight,
      borderRadius: 14,
      border: `2px solid ${ORACLE_COLORS.primary}40`,
    }}>
      <div style={{
        fontSize: 14,
        fontWeight: 800,
        color: ORACLE_COLORS.primary,
        marginBottom: 12,
        letterSpacing: 2,
        fontFamily: 'monospace',
      }}>
        TEXT INPUT
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Enter text to score..."
        style={{
          width: '100%',
          minHeight: 150,
          padding: 16,
          background: ORACLE_COLORS.bg,
          border: `2px solid ${ORACLE_COLORS.primary}60`,
          borderRadius: 8,
          color: ORACLE_COLORS.text,
          fontSize: 14,
          fontFamily: 'monospace',
          resize: 'vertical',
          outline: 'none',
        }}
      />

      <button
        onClick={onSubmit}
        disabled={disabled || !value}
        style={{
          marginTop: 12,
          padding: '12px 24px',
          background: disabled || !value
            ? ORACLE_COLORS.bgLight
            : `linear-gradient(135deg, ${ORACLE_COLORS.primary}, ${ORACLE_COLORS.secondary})`,
          border: 'none',
          borderRadius: 8,
          color: disabled || !value ? ORACLE_COLORS.textDim : '#fff',
          fontSize: 12,
          fontWeight: 800,
          cursor: disabled || !value ? 'not-allowed' : 'pointer',
          fontFamily: 'monospace',
          letterSpacing: 2,
        }}
      >
        ⚡ SCORE
      </button>
    </div>
  );
}
