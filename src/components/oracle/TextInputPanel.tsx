// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   📝 TEXT INPUT PANEL - USER INPUT FOR SCORING                            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { useState } from 'react';
import { ORACLE_COLORS } from './constants';

type Props = {
  onSubmit: (text: string) => void;
  loading: boolean;
  disabled: boolean;
};

export function TextInputPanel({ onSubmit, loading, disabled }: Props) {
  const [text, setText] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text);
  };

  const sampleTexts = [
    "This is a comprehensive analysis of semantic field theory and its applications in natural language processing.",
    "The quantum mechanics drift pattern shows significant resonance in the field measurement data.",
    "Advanced machine learning algorithms demonstrate strong coherence in pattern recognition tasks.",
  ];

  const loadSample = (sample: string) => {
    setText(sample);
    setExpanded(true);
  };

  return (
    <div style={{
      padding: 20,
      background: ORACLE_COLORS.bgLight,
      borderRadius: 14,
      border: `1px solid ${ORACLE_COLORS.tertiary}40`,
      marginTop: 20,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <div style={{
          fontSize: 14,
          fontWeight: 800,
          color: ORACLE_COLORS.tertiary,
          letterSpacing: 2,
          fontFamily: 'monospace',
        }}>
          TEXT INPUT
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'transparent',
            border: `1px solid ${ORACLE_COLORS.tertiary}40`,
            borderRadius: 6,
            padding: '4px 8px',
            color: ORACLE_COLORS.tertiary,
            fontSize: 10,
            cursor: 'pointer',
            fontFamily: 'monospace',
          }}
        >
          {expanded ? '▼' : '▶'}
        </button>
      </div>

      {expanded && (
        <>
          {/* Textarea */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to score..."
            disabled={disabled}
            style={{
              width: '100%',
              height: 150,
              padding: 12,
              background: ORACLE_COLORS.bg,
              border: `2px solid ${ORACLE_COLORS.tertiary}60`,
              borderRadius: 8,
              color: ORACLE_COLORS.text,
              fontSize: 12,
              fontFamily: 'monospace',
              resize: 'vertical',
              outline: 'none',
              marginBottom: 12,
            }}
          />

          {/* Character Count */}
          <div style={{
            fontSize: 10,
            color: ORACLE_COLORS.textDim,
            marginBottom: 12,
            fontFamily: 'monospace',
          }}>
            {text.length} characters
          </div>

          {/* Sample Texts */}
          <div style={{
            marginBottom: 12,
          }}>
            <div style={{
              fontSize: 10,
              color: ORACLE_COLORS.textDim,
              marginBottom: 8,
              letterSpacing: 1,
              fontFamily: 'monospace',
            }}>
              QUICK SAMPLES:
            </div>
            {sampleTexts.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => loadSample(sample)}
                disabled={disabled || loading}
                style={{
                  width: '100%',
                  padding: 8,
                  marginBottom: 6,
                  background: `${ORACLE_COLORS.bg}80`,
                  border: `1px solid ${ORACLE_COLORS.tertiary}40`,
                  borderRadius: 6,
                  color: ORACLE_COLORS.textDim,
                  fontSize: 10,
                  textAlign: 'left',
                  cursor: disabled || loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'monospace',
                  transition: 'all 0.2s',
                  opacity: disabled || loading ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!disabled && !loading) {
                    e.currentTarget.style.borderColor = ORACLE_COLORS.tertiary;
                    e.currentTarget.style.color = ORACLE_COLORS.tertiary;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${ORACLE_COLORS.tertiary}40`;
                  e.currentTarget.style.color = ORACLE_COLORS.textDim;
                }}
              >
                Sample {idx + 1}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || disabled || loading}
            style={{
              width: '100%',
              padding: 14,
              background: text.trim() && !disabled && !loading 
                ? `linear-gradient(135deg, ${ORACLE_COLORS.tertiary}40, ${ORACLE_COLORS.tertiary}20)`
                : `${ORACLE_COLORS.bg}80`,
              border: `2px solid ${text.trim() && !disabled && !loading ? ORACLE_COLORS.tertiary : ORACLE_COLORS.tertiary}40`,
              borderRadius: 10,
              color: text.trim() && !disabled && !loading ? ORACLE_COLORS.tertiary : ORACLE_COLORS.textDim,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 2,
              cursor: text.trim() && !disabled && !loading ? 'pointer' : 'not-allowed',
              fontFamily: 'monospace',
              transition: 'all 0.2s',
              boxShadow: text.trim() && !disabled && !loading ? `0 0 20px ${ORACLE_COLORS.tertiary}30` : 'none',
            }}
          >
            {loading ? '⚡ SCORING...' : '🚀 SCORE THIS TEXT'}
          </button>
        </>
      )}
    </div>
  );
}
