// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   🌌 SPACE LEGEND - CYBER NEON VALUE DISPLAY                              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { useState, useEffect } from 'react';
import { ResonanzNode } from './types';
import { ORACLE_COLORS } from './constants';

type Props = {
  nodes: ResonanzNode[];
  activeProfile?: string;
  selectedNode: string | null;
  hoverNode: string | null;
};

export function SpaceLegend({ nodes, activeProfile, selectedNode, hoverNode }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  // Get node to display
  const displayNode = nodes.find(n => n.id === (hoverNode || selectedNode));

  // Calculate stats
  const fieldNodes = nodes.filter(n => n.type === 'field');
  const avgScore = fieldNodes.reduce((sum, n) => sum + (n.fieldScore || 0), 0) / (fieldNodes.length || 1);
  const maxScore = Math.max(...fieldNodes.map(n => n.fieldScore || 0));
  const minScore = Math.min(...fieldNodes.map(n => n.fieldScore || 0));

  return (
    <div
      style={{
        position: 'fixed',
        top: 100,
        right: 24,
        width: 320,
        background: `linear-gradient(135deg, ${ORACLE_COLORS.bgLight}dd, ${ORACLE_COLORS.bg}dd)`,
        backdropFilter: 'blur(20px)',
        border: `2px solid ${ORACLE_COLORS.primary}60`,
        borderRadius: 16,
        padding: 20,
        boxShadow: `0 0 40px ${ORACLE_COLORS.primary}40`,
        transform: `translateX(${visible ? 0 : 400}px)`,
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        fontFamily: 'monospace',
        zIndex: 1000,
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: `1px solid ${ORACLE_COLORS.primary}40`,
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ORACLE_COLORS.primary}60, ${ORACLE_COLORS.primary}20)`,
          border: `2px solid ${ORACLE_COLORS.primary}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          boxShadow: `0 0 20px ${ORACLE_COLORS.primary}80`,
          animation: 'pulse 3s ease-in-out infinite',
        }}>
          🌌
        </div>
        <div>
          <div style={{
            fontSize: 16,
            fontWeight: 900,
            color: ORACLE_COLORS.primary,
            letterSpacing: 2,
          }}>
            SPACE LEGEND
          </div>
          <div style={{
            fontSize: 10,
            color: ORACLE_COLORS.textDim,
            letterSpacing: 1,
          }}>
            REALTIME METRICS
          </div>
        </div>
      </div>

      {/* Profile Info */}
      {activeProfile && (
        <div style={{
          marginBottom: 16,
          padding: 12,
          background: `${ORACLE_COLORS.secondary}15`,
          borderRadius: 8,
          border: `1px solid ${ORACLE_COLORS.secondary}40`,
        }}>
          <div style={{
            fontSize: 10,
            color: ORACLE_COLORS.textDim,
            marginBottom: 4,
            letterSpacing: 1,
          }}>
            ACTIVE PROFILE
          </div>
          <div style={{
            fontSize: 14,
            fontWeight: 700,
            color: ORACLE_COLORS.secondary,
            letterSpacing: 1,
          }}>
            {activeProfile}
          </div>
        </div>
      )}

      {/* Node Details (on Hover/Select) */}
      {displayNode && (
        <div style={{
          marginBottom: 16,
          padding: 12,
          background: `${ORACLE_COLORS.primary}15`,
          borderRadius: 8,
          border: `2px solid ${ORACLE_COLORS.primary}60`,
          animation: 'slideIn 0.3s ease-out',
        }}>
          <div style={{
            fontSize: 10,
            color: ORACLE_COLORS.textDim,
            marginBottom: 6,
            letterSpacing: 1,
          }}>
            SELECTED NODE
          </div>
          <div style={{
            fontSize: 16,
            fontWeight: 800,
            color: ORACLE_COLORS.primary,
            marginBottom: 8,
            letterSpacing: 1,
          }}>
            {displayNode.label}
          </div>

          {displayNode.fieldScore !== undefined && (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8,
              }}>
                <div style={{
                  flex: 1,
                  height: 8,
                  background: `${ORACLE_COLORS.bg}80`,
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: `1px solid ${ORACLE_COLORS.primary}40`,
                }}>
                  <div style={{
                    width: `${displayNode.fieldScore * 100}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${ORACLE_COLORS.primary}, ${ORACLE_COLORS.tertiary})`,
                    boxShadow: `0 0 10px ${ORACLE_COLORS.primary}`,
                    transition: 'width 0.5s ease-out',
                  }} />
                </div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: ORACLE_COLORS.primary,
                  minWidth: 50,
                }}>
                  {(displayNode.fieldScore * 100).toFixed(1)}%
                </div>
              </div>

              {displayNode.metrics && (
                <div style={{ fontSize: 10, color: ORACLE_COLORS.textDim }}>
                  <div>Presence: {(displayNode.metrics.presence * 100).toFixed(0)}%</div>
                  <div>Coverage: {(displayNode.metrics.keyword_coverage * 100).toFixed(0)}%</div>
                  <div>Complete: {(displayNode.metrics.completeness * 100).toFixed(0)}%</div>
                  <div>Coherence: {(displayNode.metrics.semantic_coherence * 100).toFixed(0)}%</div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Global Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
      }}>
        <StatBox label="AVG SCORE" value={`${(avgScore * 100).toFixed(1)}%`} color={ORACLE_COLORS.primary} />
        <StatBox label="MAX SCORE" value={`${(maxScore * 100).toFixed(1)}%`} color={ORACLE_COLORS.tertiary} />
        <StatBox label="MIN SCORE" value={`${(minScore * 100).toFixed(1)}%`} color={ORACLE_COLORS.secondary} />
        <StatBox label="FIELDS" value={fieldNodes.length.toString()} color={ORACLE_COLORS.primary} />
      </div>

      {/* Pulse Animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px ${ORACLE_COLORS.primary}80; }
          50% { transform: scale(1.05); box-shadow: 0 0 30px ${ORACLE_COLORS.primary}ff; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// Stat Box Component
function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      padding: 10,
      background: `${color}10`,
      border: `1px solid ${color}40`,
      borderRadius: 8,
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: 9,
        color: ORACLE_COLORS.textDim,
        marginBottom: 4,
        letterSpacing: 1,
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 18,
        fontWeight: 900,
        color: color,
        letterSpacing: 1,
      }}>
        {value}
      </div>
    </div>
  );
}
