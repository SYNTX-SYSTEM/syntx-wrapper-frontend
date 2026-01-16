// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   👁️ CONTROLS PANEL - INTERACTION CONTROLS                               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { ORACLE_COLORS } from './constants';

type Props = {
  onRecalculateLayout: () => void;
  onResetView: () => void;
  onTriggerScoring: () => void;
  loading: boolean;
};

export function ControlsPanel({
  onRecalculateLayout,
  onResetView,
  onTriggerScoring,
  loading,
}: Props) {
  const buttonStyle = (color: string) => ({
    width: '100%',
    padding: '12px 16px',
    background: `${color}20`,
    border: `2px solid ${color}`,
    borderRadius: 8,
    color: color,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1.5,
    cursor: loading ? 'wait' : 'pointer',
    fontFamily: 'monospace',
    marginBottom: 10,
    transition: 'all 0.2s',
    opacity: loading ? 0.5 : 1,
  });

  return (
    <div style={{
      padding: 20,
      background: ORACLE_COLORS.bgLight,
      borderRadius: 14,
      border: `1px solid ${ORACLE_COLORS.secondary}40`,
      marginTop: 20,
    }}>
      <div style={{
        fontSize: 14,
        fontWeight: 800,
        color: ORACLE_COLORS.secondary,
        marginBottom: 16,
        letterSpacing: 2,
        fontFamily: 'monospace',
      }}>
        CONTROLS
      </div>

      <button
        onClick={onTriggerScoring}
        disabled={loading}
        style={buttonStyle(ORACLE_COLORS.primary)}
      >
        ⚡ TRIGGER SCORING
      </button>

      <button
        onClick={onRecalculateLayout}
        disabled={loading}
        style={buttonStyle(ORACLE_COLORS.secondary)}
      >
        🔄 RECALCULATE LAYOUT
      </button>

      <button
        onClick={onResetView}
        disabled={loading}
        style={buttonStyle(ORACLE_COLORS.tertiary)}
      >
        🎯 RESET VIEW
      </button>

      <div style={{
        marginTop: 16,
        padding: 12,
        background: `${ORACLE_COLORS.secondary}10`,
        borderRadius: 8,
        fontSize: 10,
        color: ORACLE_COLORS.textDim,
        fontFamily: 'monospace',
        lineHeight: 1.6,
      }}>
        <div>• <strong>Shift + Drag</strong>: Pan Canvas</div>
        <div>• <strong>Mouse Wheel</strong>: Zoom In/Out</div>
        <div>• <strong>Drag Node</strong>: Reposition</div>
        <div>• <strong>Click Node</strong>: Select</div>
      </div>
    </div>
  );
}
