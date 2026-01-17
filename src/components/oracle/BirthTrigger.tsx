'use client';

import React, { useState } from 'react';
import { OracleEye } from './OracleEye';
import { GenesisGate } from './GenesisGate';
import { JsonInjectPortal } from './JsonInjectPortal';
import { WizardFlow } from './WizardFlow';
import { ORACLE_COLORS } from './constants';

interface BirthTriggerProps {
  profile?: any;
  onPropertyChange?: (propertyId: string, newValue: number) => void;
  onBirthComplete?: (data: any) => void;
}

export function BirthTrigger({ profile, onPropertyChange, onBirthComplete }: BirthTriggerProps) {
  const [birthMode, setBirthMode] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleBirthComplete = (data: any) => {
    console.log('🌊 BIRTH COMPLETE:', data);
    setBirthMode(null);
    onBirthComplete?.(data);
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

      {/* BIRTH BUTTON - Fixed position over Eye center */}
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
              setBirthMode('gate');
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
            title="🌙 Click to create new scoring"
          >
            +
          </button>

          {/* Label */}
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
              🌙 NEW BIRTH
            </div>
          )}
        </div>
      )}

      {/* Birth Overlays */}
      {birthMode === 'gate' && (
        <GenesisGate
          onModeSelect={(mode) => setBirthMode(mode)}
          onClose={() => setBirthMode(null)}
        />
      )}

      {birthMode === 'json' && (
        <JsonInjectPortal
          onInject={handleBirthComplete}
          onClose={() => setBirthMode(null)}
        />
      )}

      {birthMode === 'wizard' && (
        <WizardFlow
          onComplete={handleBirthComplete}
          onClose={() => setBirthMode(null)}
        />
      )}

      <style jsx>{`
        @keyframes birthPulse {
          0%, 100% { 
            transform: scale(1);
          }
          50% { 
            transform: scale(1.1);
          }
        }
        
        @keyframes labelFade {
          from { 
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
