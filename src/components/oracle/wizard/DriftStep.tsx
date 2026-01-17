'use client';

import React from 'react';
import { ORACLE_COLORS } from '../constants';
import { DragNode } from './DragNode';
import { NavigationButtons } from './NavigationButtons';

interface DriftStepProps {
  data: {
    no_drift: number;
    minor_drift: number;
    moderate_drift: number;
    major_drift: number;
  };
  onChange: (level: string, value: number) => void;
  onSave: () => void;
  onBack: () => void;
  isSaving: boolean;
}

export function DriftStep({ data, onChange, onSave, onBack, isSaving }: DriftStepProps) {
  const driftLevels = [
    { key: 'no_drift', label: 'NO DRIFT', color: '#00ff00', emoji: '✅' },
    { key: 'minor_drift', label: 'MINOR DRIFT', color: '#ffff00', emoji: '⚠️' },
    { key: 'moderate_drift', label: 'MODERATE DRIFT', color: '#ff9900', emoji: '🔶' },
    { key: 'major_drift', label: 'MAJOR DRIFT', color: '#ff0000', emoji: '🔴' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: 1000 }}>
      <div style={{
        fontSize: 24,
        fontWeight: 900,
        color: ORACLE_COLORS.primary,
        fontFamily: 'monospace',
        letterSpacing: 2,
        marginBottom: 40,
        textAlign: 'center',
      }}>
        🌊 DRIFT THRESHOLDS FLOW
      </div>

      <div style={{
        fontSize: 14,
        color: ORACLE_COLORS.primary + '60',
        fontFamily: 'monospace',
        textAlign: 'center',
        marginBottom: 40,
      }}>
        Define semantic drift detection levels (0.0 - 1.0)
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 40,
        marginBottom: 60,
      }}>
        {driftLevels.map(({ key, label, color, emoji }) => (
          <div key={key} style={{
            background: `${color}10`,
            border: `2px solid ${color}80`,
            borderRadius: 16,
            padding: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}>
            <div style={{ fontSize: 48 }}>{emoji}</div>
            
            <DragNode
              value={data[key as keyof typeof data]}
              label={label}
              color={color}
              min={0}
              max={1}
              onChange={(newValue) => onChange(key, newValue)}
            />
          </div>
        ))}
      </div>

      <NavigationButtons onSave={onSave} onBack={onBack} isSaving={isSaving} />
    </div>
  );
}
