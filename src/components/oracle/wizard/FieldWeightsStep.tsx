'use client';

import React from 'react';
import { ORACLE_COLORS } from '../constants';
import { DragNode } from './DragNode';
import { NavigationButtons } from './NavigationButtons';

interface FieldWeightsStepProps {
  data: Record<string, { weight: number }>;
  onChange: (field: string, weight: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function FieldWeightsStep({ data, onChange, onNext, onBack }: FieldWeightsStepProps) {
  const fields = Object.entries(data);
  
  const getColor = (weight: number) => {
    if (weight < 0.5) return ORACLE_COLORS.primary;
    if (weight < 1.5) return ORACLE_COLORS.secondary;
    return ORACLE_COLORS.tertiary;
  };

  return (
    <div style={{ width: '100%', maxWidth: 1200 }}>
      <div style={{
        fontSize: 24,
        fontWeight: 900,
        color: ORACLE_COLORS.primary,
        fontFamily: 'monospace',
        letterSpacing: 2,
        marginBottom: 40,
        textAlign: 'center',
      }}>
        ⚡ FIELD SCORING FLOW
      </div>

      <div style={{
        fontSize: 14,
        color: ORACLE_COLORS.primary + '60',
        fontFamily: 'monospace',
        textAlign: 'center',
        marginBottom: 40,
      }}>
        Click and drag UP to increase • Drag DOWN to decrease
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 40,
        marginBottom: 60,
      }}>
        {fields.map(([key, { weight }]) => {
          const displayName = key.replace(/_/g, ' ').toUpperCase();
          const color = getColor(weight);

          return (
            <DragNode
              key={key}
              value={weight}
              label={displayName}
              color={color}
              min={0}
              max={5}
              onChange={(newWeight) => onChange(key, newWeight)}
            />
          );
        })}
      </div>

      <NavigationButtons onNext={onNext} onBack={onBack} />
    </div>
  );
}
