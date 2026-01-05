"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Suggestion {
  suggestion_id: string;
  profile_id: string;
  field_name: string;
  confidence: number;
  patterns_to_add: string[];
  reasoning: string;
  estimated_impact: {
    patterns_before: number;
    patterns_after: number;
    new_patterns: number;
  };
}

interface Props {
  suggestion: Suggestion;
  index: number;
  onApply: () => void;
}

export default function SuggestionCard({ suggestion, index, onApply }: Props) {
  const [applying, setApplying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleApply = async () => {
    setApplying(true);
    await onApply();
  };

  const confidenceColor = suggestion.confidence >= 0.8 ? '#10b981' : suggestion.confidence >= 0.6 ? '#f59e0b' : '#ef4444';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, x: 20 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="cyber-card"
      style={{
        padding: 20,
        borderRadius: 16,
        background: 'linear-gradient(145deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
        border: '1px solid rgba(0,212,255,0.3)',
        position: 'relative',
        overflow: 'visible',
        marginBottom: 16
      }}
    >
      <div className="scan-line" style={{ '--scan-color': confidenceColor } as React.CSSProperties} />

      {/* Header Row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <motion.div
              className="pulse"
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#00d4ff',
                boxShadow: '0 0 15px rgba(0,212,255,0.8)'
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <h3 className="glow-text" style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#00d4ff',
              fontFamily: 'monospace',
              margin: 0,
              letterSpacing: 1
            }}>
              {suggestion.field_name}
            </h3>
          </div>
          <p style={{
            fontSize: 10,
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'monospace',
            margin: 0
          }}>
            {suggestion.profile_id}
          </p>
        </div>

        <motion.div
          className="cyber-card"
          style={{
            padding: '10px 16px',
            borderRadius: 12,
            background: `linear-gradient(135deg, ${confidenceColor}25, ${confidenceColor}10)`,
            border: `1px solid ${confidenceColor}50`,
            boxShadow: `0 0 20px ${confidenceColor}20`
          }}
          animate={{
            boxShadow: [
              `0 0 20px ${confidenceColor}20`,
              `0 0 30px ${confidenceColor}40`,
              `0 0 20px ${confidenceColor}20`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div style={{
            fontSize: 11,
            fontFamily: 'monospace',
            fontWeight: 700,
            color: confidenceColor,
            textAlign: 'center',
            letterSpacing: 1
          }}>
            {(suggestion.confidence * 100).toFixed(0)}%
          </div>
          <div style={{
            fontSize: 8,
            color: 'rgba(255,255,255,0.4)',
            textAlign: 'center',
            marginTop: 2
          }}>
            CONFIDENCE
          </div>
        </motion.div>
      </div>

      {/* Patterns Preview */}
      <div style={{ marginBottom: 16 }}>
        <div style={{
          fontSize: 9,
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'monospace',
          marginBottom: 10,
          letterSpacing: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <span>📝</span> PATTERNS TO ADD:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {suggestion.patterns_to_add.slice(0, 4).map((pattern, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 + idx * 0.1 }}
              className="cyber-card shimmer"
              style={{
                padding: '8px 14px',
                borderRadius: 10,
                background: 'linear-gradient(135deg, rgba(217,70,239,0.2), rgba(217,70,239,0.05))',
                border: '1px solid rgba(217,70,239,0.4)',
                color: '#d946ef',
                fontSize: 11,
                fontFamily: 'monospace',
                fontWeight: 600,
                boxShadow: '0 0 15px rgba(217,70,239,0.2)'
              }}
            >
              {pattern}
            </motion.span>
          ))}
          {suggestion.patterns_to_add.length > 4 && (
            <span style={{
              padding: '8px 14px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
              fontSize: 11,
              fontFamily: 'monospace'
            }}>
              +{suggestion.patterns_to_add.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Impact Visualization */}
      <div className="cyber-card data-stream" style={{
        padding: 16,
        borderRadius: 12,
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.1)',
        marginBottom: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>
              {suggestion.estimated_impact.patterns_before}
            </div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', marginTop: 4, letterSpacing: 1 }}>
              BEFORE
            </div>
          </div>
          
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ fontSize: 24, color: '#00d4ff' }}
          >
            →
          </motion.div>
          
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div className="glow-text" style={{ fontSize: 24, fontWeight: 900, color: '#00d4ff', fontFamily: 'monospace' }}>
              {suggestion.estimated_impact.patterns_after}
            </div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', marginTop: 4, letterSpacing: 1 }}>
              AFTER
            </div>
          </div>
          
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div className="pulse" style={{ fontSize: 24, fontWeight: 900, color: '#10b981', fontFamily: 'monospace' }}>
              +{suggestion.estimated_impact.new_patterns}
            </div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', marginTop: 4, letterSpacing: 1 }}>
              NEW
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Reasoning */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="data-stream"
            style={{
              padding: 16,
              borderRadius: 12,
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(0,212,255,0.2)',
              marginBottom: 16,
              overflow: 'hidden'
            }}
          >
            <div style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
              marginBottom: 10,
              letterSpacing: 2
            }}>
              🧠 ANALYSIS:
            </div>
            <p style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6,
              margin: 0,
              fontFamily: 'system-ui'
            }}>
              {suggestion.reasoning}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 10 }}>
        <motion.button
          onClick={handleApply}
          disabled={applying}
          whileHover={{ scale: applying ? 1 : 1.02 }}
          whileTap={{ scale: applying ? 1 : 0.98 }}
          className="cyber-btn"
          style={{
            flex: 1,
            padding: '14px 20px',
            borderRadius: 12,
            border: 'none',
            background: applying
              ? 'rgba(255,255,255,0.1)'
              : 'linear-gradient(135deg, #00d4ff, #00a8cc)',
            color: applying ? 'rgba(255,255,255,0.3)' : '#030b15',
            fontFamily: 'monospace',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 2,
            cursor: applying ? 'not-allowed' : 'pointer',
            boxShadow: applying ? 'none' : '0 0 30px rgba(0,212,255,0.4)'
          }}
        >
          {applying ? '⏳ APPLYING...' : '✓ APPLY'}
        </motion.button>
        
        <motion.button
          onClick={() => setExpanded(!expanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cyber-btn"
          style={{
            padding: '14px 20px',
            borderRadius: 12,
            border: '1px solid rgba(217,70,239,0.4)',
            background: expanded 
              ? 'linear-gradient(135deg, rgba(217,70,239,0.2), rgba(217,70,239,0.05))'
              : 'transparent',
            color: '#d946ef',
            fontFamily: 'monospace',
            fontSize: 16,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: expanded ? '0 0 20px rgba(217,70,239,0.3)' : 'none'
          }}
        >
          {expanded ? '−' : '+'}
        </motion.button>
      </div>
    </motion.div>
  );
}
