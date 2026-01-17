'use client';

import React, { useState } from 'react';
import { OracleEye } from './OracleEye';
import { GenesisGate } from './GenesisGate';
import { JsonInjectPortal } from './JsonInjectPortal';
import { WizardFlow } from './wizard';
import { ORACLE_COLORS } from './constants';

interface BirthTriggerProps {
  profile?: any;
  selectedFormat?: string | null;
  onPropertyChange?: (propertyId: string, newValue: number) => void;
  onBirthComplete?: (data: any) => void;
}

export function BirthTrigger({ profile, selectedFormat, onPropertyChange, onBirthComplete }: BirthTriggerProps) {
  const [birthMode, setBirthMode] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleBirthComplete = (data: any) => {
    console.log('🌊 BIRTH COMPLETE:', data);
    setBirthMode(null);
    onBirthComplete?.(data);
  };

  const handleModeSelect = (mode: 'json' | 'wizard') => {
    if (!selectedFormat) {
      alert('⚠️ Please select a format first!');
      return;
    }
    setBirthMode(mode);
  };

  const handleBirthClick = () => {
    if (!selectedFormat) {
      alert('⚠️ Please select a format first!');
      return;
    }
    setBirthMode('gate');
  };

  return (
    <div 
      style={{ 
        position: 'relative', 
        display: 'inline-block',
      }}
    >
      {/* Oracle Eye */}
      <OracleEye 
        profile={profile}
        onPropertyChange={onPropertyChange}
      />

      {/* BIRTH BUTTON */}
      {!birthMode && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 80,
            height: 80,
            zIndex: 200,
            pointerEvents: 'all',
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleBirthClick();
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: isHovering 
                ? `linear-gradient(135deg, ${ORACLE_COLORS.secondary}, ${ORACLE_COLORS.tertiary})`
                : `${ORACLE_COLORS.secondary}40`,
              border: `3px solid ${ORACLE_COLORS.secondary}`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              fontWeight: 900,
              color: isHovering ? '#000' : ORACLE_COLORS.secondary,
              boxShadow: isHovering
                ? `0 0 40px ${ORACLE_COLORS.secondary}, 0 0 80px ${ORACLE_COLORS.secondary}80`
                : `0 0 20px ${ORACLE_COLORS.secondary}80`,
              transition: 'all 0.3s',
              animation: isHovering ? 'birthPulse 1s ease-in-out infinite' : 'none',
              outline: 'none',
            }}
            title={selectedFormat ? '🌙 Click to create new scoring' : '⚠️ Select format first'}
          >
            +
          </button>

          {isHovering && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: 12,
              padding: '6px 16px',
              background: `${ORACLE_COLORS.secondary}40`,
              border: `2px solid ${ORACLE_COLORS.secondary}`,
              borderRadius: 8,
              color: ORACLE_COLORS.secondary,
              fontSize: 11,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: 2,
              whiteSpace: 'nowrap',
              boxShadow: `0 0 20px ${ORACLE_COLORS.secondary}80`,
              pointerEvents: 'none',
              animation: 'labelFade 0.3s ease-out',
            }}>
              {selectedFormat ? '🌙 NEW BIRTH' : '⚠️ SELECT FORMAT'}
            </div>
          )}
        </div>
      )}

      {/* Birth Overlays */}
      {birthMode === 'gate' && (
        <GenesisGate
          onModeSelect={handleModeSelect}
          onClose={() => setBirthMode(null)}
        />
      )}

      {birthMode === 'json' && (
        <JsonInjectPortal
          onInject={handleBirthComplete}
          onClose={() => setBirthMode(null)}
        />
      )}

      {birthMode === 'wizard' && selectedFormat && (
        <WizardFlow
          selectedFormat={selectedFormat}
          onComplete={handleBirthComplete}
          onClose={() => setBirthMode(null)}
        />
      )}

      <style jsx>{`
        @keyframes birthPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes labelFade {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
