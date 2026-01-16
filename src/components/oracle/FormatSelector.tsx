// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   👁️ FORMAT SELECTOR - WITH CORRECT FIELD COUNT                          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { ORACLE_COLORS } from './constants';

type Format = {
  name: string;
  description: string;
  field_count?: number;
  fields?: Array<any>;
};

type Props = {
  formats: Format[];
  activeFormat: string | null;
  onChange: (formatName: string) => void;
  loading: boolean;
};

export function FormatSelector({ formats, activeFormat, onChange, loading }: Props) {
  // Calculate field count for each format
  const getFieldCount = (format: Format) => {
    return format.fields?.length || format.field_count || 0;
  };

  return (
    <div style={{
      padding: 20,
      background: ORACLE_COLORS.bgLight,
      borderRadius: 14,
      border: `1px solid ${ORACLE_COLORS.primary}40`,
      marginBottom: 20,
    }}>
      <div style={{
        fontSize: 14,
        fontWeight: 800,
        color: ORACLE_COLORS.primary,
        marginBottom: 12,
        letterSpacing: 2,
        fontFamily: 'monospace',
      }}>
        FORMAT SELECTOR
      </div>

      {loading ? (
        <div style={{ color: ORACLE_COLORS.textDim, fontSize: 12 }}>
          Loading formats...
        </div>
      ) : (
        <select
          value={activeFormat || ''}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: ORACLE_COLORS.bg,
            border: `2px solid ${ORACLE_COLORS.primary}60`,
            borderRadius: 8,
            color: ORACLE_COLORS.text,
            fontSize: 13,
            fontFamily: 'monospace',
            fontWeight: 600,
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="">Select Format...</option>
          {formats.map(format => {
            const fieldCount = getFieldCount(format);
            return (
              <option key={format.name} value={format.name}>
                {format.name} ({fieldCount} fields)
              </option>
            );
          })}
        </select>
      )}

      {activeFormat && (
        <div style={{
          marginTop: 12,
          padding: 12,
          background: `${ORACLE_COLORS.primary}10`,
          borderRadius: 8,
          fontSize: 11,
          color: ORACLE_COLORS.textDim,
          fontFamily: 'monospace',
        }}>
          Active: <span style={{ color: ORACLE_COLORS.primary, fontWeight: 700 }}>
            {activeFormat}
          </span>
        </div>
      )}
    </div>
  );
}
