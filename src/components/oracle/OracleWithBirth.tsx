'use client';

import React, { useState } from 'react';
import { OracleHeader } from './OracleHeader';
import { OracleGraph } from './OracleGraph';
import { GenesisGate } from './GenesisGate';
import { JsonInjectPortal } from './JsonInjectPortal';
import { WizardFlow } from './WizardFlow';
import { ORACLE_COLORS } from './constants';

export function OracleWithBirth() {
  const [birthMode, setBirthMode] = useState<string | null>(null);

  console.log('🔄 OracleWithBirth RENDER - birthMode:', birthMode);

  return (
    <div style={{
      minHeight: '100vh',
      background: ORACLE_COLORS.bg,
      color: ORACLE_COLORS.text,
      position: 'relative',
      padding: 40,
    }}>
      {/* BIG VISIBLE TEST BUTTON - TOP CENTER */}
      <div style={{
        position: 'fixed',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999999,
        display: 'flex',
        gap: 20,
      }}>
        <button
          onClick={() => {
            console.log('🔥 TEST BUTTON CLICKED!');
            alert('TEST BUTTON WORKS!');
            setBirthMode('gate');
          }}
          style={{
            padding: '20px 60px',
            background: 'red',
            color: 'white',
            border: '3px solid white',
            borderRadius: 12,
            fontSize: 24,
            fontWeight: 900,
            cursor: 'pointer',
            fontFamily: 'monospace',
            boxShadow: '0 0 40px rgba(255,0,0,0.8)',
          }}
        >
          🔥 CLICK ME - OPEN GATE
        </button>

        <button
          onClick={() => {
            console.log('❌ CLOSE CLICKED');
            setBirthMode(null);
          }}
          style={{
            padding: '20px 40px',
            background: 'orange',
            color: 'white',
            border: '3px solid white',
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 900,
            cursor: 'pointer',
            fontFamily: 'monospace',
          }}
        >
          ❌ CLOSE
        </button>
      </div>

      {/* Header */}
      <OracleHeader />

      {/* Graph */}
      <OracleGraph />

      {/* Birth Mode Status */}
      <div style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        padding: 20,
        background: 'rgba(0,255,255,0.2)',
        border: '2px solid cyan',
        borderRadius: 8,
        color: 'cyan',
        fontFamily: 'monospace',
        fontSize: 16,
        zIndex: 999998,
      }}>
        BIRTH MODE: {birthMode || 'null'}
      </div>

      {/* Birth Overlays */}
      {birthMode === 'gate' && (
        <GenesisGate
          onModeSelect={(mode) => {
            console.log('🎯 MODE SELECTED:', mode);
            setBirthMode(mode);
          }}
          onClose={() => {
            console.log('❌ GATE CLOSED');
            setBirthMode(null);
          }}
        />
      )}

      {birthMode === 'json' && (
        <JsonInjectPortal
          onInject={(data) => {
            console.log('🌊 JSON INJECTED:', data);
            alert('JSON INJECTED!');
            setBirthMode(null);
          }}
          onClose={() => {
            console.log('❌ JSON PORTAL CLOSED');
            setBirthMode(null);
          }}
        />
      )}

      {birthMode === 'wizard' && (
        <WizardFlow
          onComplete={(data) => {
            console.log('🌊 WIZARD COMPLETE:', data);
            alert('WIZARD COMPLETE!');
            setBirthMode(null);
          }}
          onClose={() => {
            console.log('❌ WIZARD CLOSED');
            setBirthMode(null);
          }}
        />
      )}
    </div>
  );
}
