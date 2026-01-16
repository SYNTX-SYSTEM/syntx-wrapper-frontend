'use client';

import React from 'react';
import { ORACLE_COLORS } from './constants';

type Props = {
  scores: any;
};

export function SpaceLegend({ scores }: Props) {
  return (
    <div style={{
      padding: 20,
      background: ORACLE_COLORS.bgLight,
      borderRadius: 14,
      border: `2px solid ${ORACLE_COLORS.tertiary}60`,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ORACLE_COLORS.tertiary}60, ${ORACLE_COLORS.tertiary}20)`,
          border: `2px solid ${ORACLE_COLORS.tertiary}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          boxShadow: `0 0 20px ${ORACLE_COLORS.tertiary}80`,
        }}>
          🌌
        </div>
        <div>
          <div style={{
            fontSize: 14,
            fontWeight: 900,
            color: ORACLE_COLORS.tertiary,
            letterSpacing: 2,
            fontFamily: 'monospace',
          }}>
            SPACE LEGEND
          </div>
          <div style={{
            fontSize: 9,
            color: ORACLE_COLORS.textDim,
            letterSpacing: 1,
            fontFamily: 'monospace',
          }}>
            REALTIME METRICS
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
      }}>
        <div style={{
          padding: 12,
          background: ORACLE_COLORS.bg,
          borderRadius: 8,
          border: `1px solid ${ORACLE_COLORS.tertiary}40`,
        }}>
          <div style={{
            fontSize: 10,
            color: ORACLE_COLORS.textDim,
            marginBottom: 4,
            fontFamily: 'monospace',
          }}>
            AVG SCORE
          </div>
          <div style={{
            fontSize: 20,
            fontWeight: 800,
            color: ORACLE_COLORS.tertiary,
            fontFamily: 'monospace',
          }}>
            {scores ? `${(scores.overall * 100).toFixed(1)}%` : '0.0%'}
          </div>
        </div>

        <div style={{
          padding: 12,
          background: ORACLE_COLORS.bg,
          borderRadius: 8,
          border: `1px solid ${ORACLE_COLORS.tertiary}40`,
        }}>
          <div style={{
            fontSize: 10,
            color: ORACLE_COLORS.textDim,
            marginBottom: 4,
            fontFamily: 'monospace',
          }}>
            MAX SCORE
          </div>
          <div style={{
            fontSize: 20,
            fontWeight: 800,
            color: ORACLE_COLORS.tertiary,
            fontFamily: 'monospace',
          }}>
            0.0%
          </div>
        </div>

        <div style={{
          padding: 12,
          background: ORACLE_COLORS.bg,
          borderRadius: 8,
          border: `1px solid ${ORACLE_COLORS.tertiary}40`,
        }}>
          <div style={{
            fontSize: 10,
            color: ORACLE_COLORS.textDim,
            marginBottom: 4,
            fontFamily: 'monospace',
          }}>
            MIN SCORE
          </div>
          <div style={{
            fontSize: 20,
            fontWeight: 800,
            color: ORACLE_COLORS.tertiary,
            fontFamily: 'monospace',
          }}>
            0.0%
          </div>
        </div>

        <div style={{
          padding: 12,
          background: ORACLE_COLORS.bg,
          borderRadius: 8,
          border: `1px solid ${ORACLE_COLORS.tertiary}40`,
        }}>
          <div style={{
            fontSize: 10,
            color: ORACLE_COLORS.textDim,
            marginBottom: 4,
            fontFamily: 'monospace',
          }}>
            FIELDS
          </div>
          <div style={{
            fontSize: 20,
            fontWeight: 800,
            color: ORACLE_COLORS.tertiary,
            fontFamily: 'monospace',
          }}>
            6
          </div>
        </div>
      </div>
    </div>
  );
}
