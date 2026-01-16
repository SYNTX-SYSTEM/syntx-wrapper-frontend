'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { ORACLE_COLORS } from './constants';

type Format = {
  name: string;
  field_count?: number;
  description?: string;
};

type Props = {
  activeFormat: string | null;
  onChange: (format: string) => void;
  loading: boolean;
};

export function FormatSelector({ activeFormat, onChange, loading }: Props) {
  const [formats, setFormats] = useState<Format[]>([]);
  const [loadingFormats, setLoadingFormats] = useState(false);

  useEffect(() => {
    loadFormats();
  }, []);

  const loadFormats = async () => {
    setLoadingFormats(true);
    try {
      const response = await api.getFormats();
      setFormats(response.formats || []);
    } catch (error) {
      console.error('Failed to load formats:', error);
      setFormats([]);
    } finally {
      setLoadingFormats(false);
    }
  };

  const getFieldCount = (format: Format): number => {
    return format.field_count || 0;
  };

  return (
    <div style={{
      padding: 20,
      background: `linear-gradient(135deg, ${ORACLE_COLORS.bgLight}f0, ${ORACLE_COLORS.bg}f0)`,
      borderRadius: 14,
      border: `2px solid ${ORACLE_COLORS.primary}80`,
      boxShadow: `0 0 30px ${ORACLE_COLORS.primary}20`,
    }}>
      {/* Header */}
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

      {loadingFormats ? (
        <div style={{
          color: ORACLE_COLORS.textDim,
          fontSize: 12,
          fontFamily: 'monospace',
          textAlign: 'center',
          padding: 20,
        }}>
          Loading formats...
        </div>
      ) : (
        <>
          {/* Dropdown */}
          <select
            value={activeFormat || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={loading || formats.length === 0}
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
              cursor: loading || formats.length === 0 ? 'not-allowed' : 'pointer',
              outline: 'none',
            }}
          >
            <option value="">Select Format...</option>
            {(formats || []).map(format => (
              <option key={format.name} value={format.name}>
                {format.name} ({getFieldCount(format)} fields)
              </option>
            ))}
          </select>

          {/* Active Format Display */}
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
              Active: <span style={{
                color: ORACLE_COLORS.primary,
                fontWeight: 700,
              }}>
                {activeFormat}
              </span>
            </div>
          )}

          {/* No Formats Message */}
          {formats.length === 0 && !loadingFormats && (
            <div style={{
              marginTop: 12,
              padding: 12,
              background: `${ORACLE_COLORS.primary}10`,
              borderRadius: 8,
              fontSize: 11,
              color: ORACLE_COLORS.textDim,
              fontFamily: 'monospace',
              textAlign: 'center',
            }}>
              No formats available
            </div>
          )}
        </>
      )}
    </div>
  );
}
