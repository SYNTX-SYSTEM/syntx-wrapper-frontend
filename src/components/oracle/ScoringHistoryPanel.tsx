// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   📜 SCORING HISTORY PANEL - SEMANTIC MEMORY                              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { useState, useEffect } from 'react';
import { ORACLE_COLORS } from './constants';

type ScoringEntry = {
  id: string;
  timestamp: string;
  format: string;
  profile: string;
  overall_score: number;
  field_count: number;
  scores: Record<string, any>;
  favorite?: boolean;
};

type Props = {
  format: string | null;
  profile: string | null;
  onSelect: (scoring: ScoringEntry) => void;
  selectedId: string | null;
};

export function ScoringHistoryPanel({ format, profile, onSelect, selectedId }: Props) {
  const [scorings, setScorings] = useState<ScoringEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    if (format && profile) {
      loadHistory();
    }
  }, [format, profile]);

  const loadHistory = async () => {
    if (!format || !profile) return;
    
    setLoading(true);
    try {
      // TODO: Replace with real API call
      // const response = await fetch(`/api/scoring/history?format=${format}&profile=${profile}`);
      // const data = await response.json();
      
      // Mock data for now
      const mockData: ScoringEntry[] = [
        {
          id: '1',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          format,
          profile,
          overall_score: 0.73,
          field_count: 6,
          scores: {},
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          format,
          profile,
          overall_score: 0.68,
          field_count: 6,
          scores: {},
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          format,
          profile,
          overall_score: 0.81,
          field_count: 6,
          scores: {},
          favorite: true,
        },
      ];
      
      setScorings(mockData);
    } catch (error) {
      console.error('Failed to load scoring history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (iso: string) => {
    const date = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return ORACLE_COLORS.tertiary;
    if (score >= 0.6) return ORACLE_COLORS.primary;
    return ORACLE_COLORS.secondary;
  };

  if (!format || !profile) {
    return (
      <div style={{
        padding: 20,
        background: ORACLE_COLORS.bgLight,
        borderRadius: 14,
        border: `1px solid ${ORACLE_COLORS.primary}40`,
        marginTop: 20,
      }}>
        <div style={{
          fontSize: 12,
          color: ORACLE_COLORS.textDim,
          textAlign: 'center',
          fontFamily: 'monospace',
        }}>
          Select Format & Profile
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: 20,
      background: ORACLE_COLORS.bgLight,
      borderRadius: 14,
      border: `1px solid ${ORACLE_COLORS.primary}40`,
      marginTop: 20,
      maxHeight: 400,
      overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{
        fontSize: 14,
        fontWeight: 800,
        color: ORACLE_COLORS.primary,
        marginBottom: 16,
        letterSpacing: 2,
        fontFamily: 'monospace',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span>SCORING HISTORY</span>
        {scorings.length > 0 && (
          <span style={{ fontSize: 10, color: ORACLE_COLORS.textDim }}>
            {scorings.length} entries
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{
          fontSize: 12,
          color: ORACLE_COLORS.textDim,
          fontFamily: 'monospace',
        }}>
          Loading history...
        </div>
      )}

      {/* Entries */}
      {!loading && scorings.map((scoring, idx) => {
        const isSelected = scoring.id === selectedId;
        const isHovered = hoverIndex === idx;
        const scoreColor = getScoreColor(scoring.overall_score);

        return (
          <div
            key={scoring.id}
            onClick={() => onSelect(scoring)}
            onMouseEnter={() => setHoverIndex(idx)}
            onMouseLeave={() => setHoverIndex(null)}
            style={{
              padding: 12,
              marginBottom: 8,
              background: isSelected 
                ? `${ORACLE_COLORS.primary}20` 
                : isHovered 
                ? `${ORACLE_COLORS.primary}10`
                : `${ORACLE_COLORS.bg}80`,
              border: `2px solid ${isSelected ? ORACLE_COLORS.primary : ORACLE_COLORS.primary}40`,
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: 'relative',
            }}
          >
            {/* Favorite Star */}
            {scoring.favorite && (
              <div style={{
                position: 'absolute',
                top: 8,
                right: 8,
                fontSize: 14,
              }}>
                ⭐
              </div>
            )}

            {/* Timestamp */}
            <div style={{
              fontSize: 10,
              color: ORACLE_COLORS.textDim,
              marginBottom: 6,
              fontFamily: 'monospace',
            }}>
              {formatTimestamp(scoring.timestamp)}
            </div>

            {/* Score Display */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 8,
            }}>
              <div style={{
                fontSize: 24,
                fontWeight: 900,
                color: scoreColor,
                fontFamily: 'monospace',
              }}>
                {(scoring.overall_score * 100).toFixed(0)}%
              </div>
              <div style={{
                flex: 1,
                height: 6,
                background: `${ORACLE_COLORS.bg}80`,
                borderRadius: 3,
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${scoring.overall_score * 100}%`,
                  height: '100%',
                  background: scoreColor,
                  transition: 'width 0.3s ease-out',
                }} />
              </div>
            </div>

            {/* Meta Info */}
            <div style={{
              fontSize: 10,
              color: ORACLE_COLORS.textDim,
              fontFamily: 'monospace',
            }}>
              {scoring.field_count} fields • {scoring.profile}
            </div>

            {/* Mini Preview on Hover */}
            {isHovered && (
              <div style={{
                marginTop: 8,
                paddingTop: 8,
                borderTop: `1px solid ${ORACLE_COLORS.primary}20`,
                fontSize: 9,
                color: ORACLE_COLORS.textDim,
                fontFamily: 'monospace',
              }}>
                Click to load full scoring
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
