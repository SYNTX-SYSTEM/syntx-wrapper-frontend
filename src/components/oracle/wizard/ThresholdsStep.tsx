'use client';

import React from 'react';
import { ORACLE_COLORS } from '../constants';
import { DragNode } from './DragNode';
import { NavigationButtons } from './NavigationButtons';

interface ThresholdsStepProps {
  value: number;
  onChange: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ThresholdsStep({ value, onChange, onNext, onBack }: ThresholdsStepProps) {
  return (
    <div style={{ width: '100%', maxWidth: 600, textAlign: 'center' }}>
      <div style={{
        fontSize: 24,
        fontWeight: 900,
        color: ORACLE_COLORS.tertiary,
        fontFamily: 'monospace',
        letterSpacing: 2,
        marginBottom: 40,
      }}>
        ⚖️ PASS THRESHOLD CONTROL
      </div>

      <div style={{
        fontSize: 14,
        color: ORACLE_COLORS.tertiary + '60',
        fontFamily: 'monospace',
        marginBottom: 40,
      }}>
        Minimum score to pass scoring validation
      </div>

      <div style={{ marginBottom: 60 }}>
        <DragNode
          value={value}
          label="PASS THRESHOLD"
          color={ORACLE_COLORS.tertiary}
          min={0}
          max={10}
          onChange={onChange}
        />
      </div>

      <div style={{
        padding: 20,
        background: `${ORACLE_COLORS.tertiary}10`,
        border: `2px solid ${ORACLE_COLORS.tertiary}40`,
        borderRadius: 12,
        marginBottom: 60,
      }}>
        <div style={{
          fontSize: 12,
          color: ORACLE_COLORS.tertiary,
          fontFamily: 'monospace',
          lineHeight: 1.6,
        }}>
          <div style={{ marginBottom: 10 }}>
            <strong>CONTEXT:</strong>
          </div>
          <div>Min Score: 0.0</div>
          <div>Max Score: 10.0</div>
          <div style={{ marginTop: 10, color: ORACLE_COLORS.tertiary + '80' }}>
            Current: {value.toFixed(1)} (Recommended: 5.0-8.0)
          </div>
        </div>
      </div>

      <NavigationButtons onNext={onNext} onBack={onBack} />
    </div>
  );
}
