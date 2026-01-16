'use client';

import React from 'react';
import { ORACLE_COLORS } from './constants';

type Props = {
  stats: {
    avgScore: number;
    maxScore: number;
    minScore: number;
    fieldCount: number;
  };
};

export function SpaceLegend({ stats }: Props) {
  return (
    <div style={{
      padding: 24,
      background: `
        radial-gradient(circle at top right, ${ORACLE_COLORS.primary}30, transparent 60%),
        radial-gradient(circle at bottom left, ${ORACLE_COLORS.secondary}30, transparent 60%),
        linear-gradient(135deg, ${ORACLE_COLORS.bgLight}f5, ${ORACLE_COLORS.bg}f5)
      `,
      borderRadius: 16,
      border: `2px solid ${ORACLE_COLORS.tertiary}60`,
      boxShadow: `
        0 0 40px ${ORACLE_COLORS.tertiary}30,
        inset 0 0 60px ${ORACLE_COLORS.primary}10
      `,
      backdropFilter: 'blur(10px)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: `1px solid ${ORACLE_COLORS.tertiary}40`,
      }}>
        <div style={{
          fontSize: 32,
          filter: `drop-shadow(0 0 10px ${ORACLE_COLORS.tertiary})`,
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
            textShadow: `0 0 10px ${ORACLE_COLORS.tertiary}80`,
          }}>
            SPACE LEGEND
          </div>
          <div style={{
            fontSize: 10,
            color: ORACLE_COLORS.textDim,
            letterSpacing: 1,
            fontFamily: 'monospace',
          }}>
            REALTIME METRICS
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        marginBottom: 20,
      }}>
        <MetricCard
          label="AVG WEIGHT"
          value={stats.avgScore.toFixed(2)}
          color={ORACLE_COLORS.primary}
        />
        <MetricCard
          label="MAX WEIGHT"
          value={stats.maxScore.toFixed(2)}
          color={ORACLE_COLORS.secondary}
        />
        <MetricCard
          label="MIN WEIGHT"
          value={stats.minScore.toFixed(2)}
          color={ORACLE_COLORS.tertiary}
        />
        <MetricCard
          label="FIELDS"
          value={stats.fieldCount.toString()}
          color={ORACLE_COLORS.primary}
        />
      </div>

      {/* Entity Legend */}
      <div style={{
        padding: 16,
        background: `${ORACLE_COLORS.primary}10`,
        borderRadius: 12,
        border: `1px solid ${ORACLE_COLORS.primary}30`,
      }}>
        <div style={{
          fontSize: 10,
          fontWeight: 800,
          color: ORACLE_COLORS.primary,
          marginBottom: 12,
          letterSpacing: 1,
          fontFamily: 'monospace',
        }}>
          SCORING ENTITIES
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <LegendItem color={ORACLE_COLORS.primary} label="GPT-4" />
          <LegendItem color={ORACLE_COLORS.secondary} label="Thresholds" />
          <LegendItem color={ORACLE_COLORS.tertiary} label="Field Weights" />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      padding: 12,
      background: `${color}15`,
      borderRadius: 10,
      border: `1px solid ${color}40`,
      boxShadow: `0 0 15px ${color}20`,
    }}>
      <div style={{
        fontSize: 9,
        color: ORACLE_COLORS.textDim,
        marginBottom: 4,
        letterSpacing: 1,
        fontFamily: 'monospace',
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 20,
        fontWeight: 900,
        color,
        fontFamily: 'monospace',
        textShadow: `0 0 10px ${color}80`,
      }}>
        {value}
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    }}>
      <div style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 10px ${color}80`,
      }} />
      <div style={{
        fontSize: 11,
        color: ORACLE_COLORS.text,
        fontFamily: 'monospace',
      }}>
        {label}
      </div>
    </div>
  );
}
