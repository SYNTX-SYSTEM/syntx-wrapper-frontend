'use client';

import React from 'react';
import { ORACLE_COLORS } from '../constants';
import { DragNode } from './DragNode';
import { NavigationButtons } from './NavigationButtons';

interface EntityWeightsStepProps {
  data: Record<string, number>;
  onChange: (entity: string, weight: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function EntityWeightsStep({ data, onChange, onNext, onBack }: EntityWeightsStepProps) {
  const entities = Object.entries(data);

  return (
    <div style={{ width: '100%', maxWidth: 600, textAlign: 'center' }}>
      <div style={{
        fontSize: 24,
        fontWeight: 900,
        color: ORACLE_COLORS.secondary,
        fontFamily: 'monospace',
        letterSpacing: 2,
        marginBottom: 40,
      }}>
        🎯 ENTITY WEIGHT FLOW
      </div>

      <div style={{
        fontSize: 14,
        color: ORACLE_COLORS.secondary + '60',
        fontFamily: 'monospace',
        marginBottom: 40,
      }}>
        Click and drag to adjust entity scoring weight
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 50,
        alignItems: 'center',
        marginBottom: 60,
      }}>
        {entities.map(([key, weight]) => (
          <div key={key} style={{ width: '100%', maxWidth: 300 }}>
            <DragNode
              value={weight}
              label={key.toUpperCase().replace(/_/g, ' ')}
              color={ORACLE_COLORS.secondary}
              min={0}
              max={5}
              onChange={(newWeight) => onChange(key, newWeight)}
            />
            
            <div style={{
              marginTop: 20,
              fontSize: 48,
              animation: 'entityFloat 3s ease-in-out infinite',
            }}>
              🤖
            </div>
          </div>
        ))}
      </div>

      <NavigationButtons onNext={onNext} onBack={onBack} />

      <style jsx>{`
        @keyframes entityFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
