'use client';

import React, { useState, useEffect } from 'react';
import { ORACLE_COLORS } from './constants';

type Props = {
  profileId: string | null;
  format: string | null;
  reloadTrigger: number;
};

export function ScoringViewer({ profileId, format, reloadTrigger }: Props) {
  const [scoringData, setScoringData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (format && profileId) {
      loadScoringWeights(format);
    } else {
      setScoringData(null);
    }
  }, [format, profileId, reloadTrigger]);

  const loadScoringWeights = async (formatName: string) => {
    setLoading(true);
    try {
      const AUTH = btoa('syntx:ekv2xp73zdEUEH5u9fVu');
      
      const response = await fetch(
        `https://dev.syntx-system.com/scoring/bindings/get_binding_by_format/${formatName}`,
        {
          headers: { 'Authorization': `Basic ${AUTH}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const profile = data.profile_complete;
        
        const scoringWeights = {
          field_scoring_methods: profile?.field_scoring_methods || {},
          entity_weights: profile?.entity_weights || {},
          thresholds: profile?.thresholds || {},
          drift_thresholds: profile?.drift_thresholds || {},
        };
        
        setScoringData(scoringWeights);
      }
    } catch (error) {
      console.error('Failed to load scoring weights:', error);
      setScoringData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (scoringData) {
      const jsonString = JSON.stringify(scoringData, null, 2);
      navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!format || !profileId) {
    return (
      <div style={{
        width: '100%',
        padding: 20,
        background: ORACLE_COLORS.bgLight,
        borderRadius: 14,
        border: `2px solid ${ORACLE_COLORS.tertiary}60`,
      }}>
        <div style={{
          fontSize: 12,
          color: ORACLE_COLORS.textDim,
          fontFamily: 'monospace',
          textAlign: 'center',
        }}>
          Select format & profile to view scoring weights
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      maxHeight: 500,
      background: `linear-gradient(135deg, ${ORACLE_COLORS.bgLight}f0, ${ORACLE_COLORS.bg}f0)`,
      borderRadius: 14,
      border: `2px solid ${ORACLE_COLORS.tertiary}80`,
      boxShadow: `0 0 30px ${ORACLE_COLORS.tertiary}20`,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header with Copy Button */}
      <div style={{
        padding: 16,
        borderBottom: `1px solid ${ORACLE_COLORS.tertiary}40`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            fontSize: 12,
            fontWeight: 800,
            color: ORACLE_COLORS.tertiary,
            letterSpacing: 2,
            fontFamily: 'monospace',
            marginBottom: 4,
          }}>
            ⚡ SCORING WEIGHTS
          </div>
          <div style={{
            fontSize: 9,
            color: ORACLE_COLORS.textDim,
            fontFamily: 'monospace',
            letterSpacing: 1,
          }}>
            Real-time calibration data
          </div>
        </div>

        {/* Copy Button */}
        {scoringData && (
          <button
            onClick={handleCopy}
            style={{
              padding: '8px 16px',
              background: copied 
                ? `linear-gradient(135deg, ${ORACLE_COLORS.tertiary}, ${ORACLE_COLORS.primary})`
                : `${ORACLE_COLORS.tertiary}20`,
              border: `2px solid ${ORACLE_COLORS.tertiary}`,
              borderRadius: 8,
              color: copied ? '#fff' : ORACLE_COLORS.tertiary,
              fontSize: 10,
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'monospace',
              letterSpacing: 1,
              boxShadow: copied ? `0 0 20px ${ORACLE_COLORS.tertiary}80` : 'none',
              transition: 'all 0.2s',
            }}
          >
            {copied ? '✅ COPIED!' : '📋 COPY'}
          </button>
        )}
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: 16,
      }}>
        {loading ? (
          <div style={{
            textAlign: 'center',
            color: ORACLE_COLORS.textDim,
            fontSize: 11,
            fontFamily: 'monospace',
          }}>
            Loading...
          </div>
        ) : scoringData ? (
          <pre style={{
            margin: 0,
            fontSize: 9,
            fontFamily: 'monospace',
            color: ORACLE_COLORS.text,
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {JSON.stringify(scoringData, null, 2)}
          </pre>
        ) : (
          <div style={{
            textAlign: 'center',
            color: ORACLE_COLORS.textDim,
            fontSize: 11,
            fontFamily: 'monospace',
          }}>
            No scoring data
          </div>
        )}
      </div>
    </div>
  );
}
