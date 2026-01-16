// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   📊 SCORE JSON VIEWER - CYBER NEON DISPLAY                               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { useState } from 'react';
import { ORACLE_COLORS } from './constants';

type Props = {
  data: any;
  visible: boolean;
  onClose?: () => void;
};

export function ScoreJsonViewer({ data, visible, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  if (!visible || !data) return null;

  const jsonString = JSON.stringify(data, null, 2);
  const lines = jsonString.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Syntax highlighting
  const highlightJson = (line: string, lineNum: number) => {
    let highlighted = line;
    
    // Keys
    highlighted = highlighted.replace(
      /"([^"]+)":/g,
      `<span style="color: ${ORACLE_COLORS.primary}; font-weight: 700;">"$1"</span>:`
    );
    
    // String values
    highlighted = highlighted.replace(
      /: "([^"]*)"/g,
      `: <span style="color: ${ORACLE_COLORS.tertiary};">"$1"</span>`
    );
    
    // Numbers
    highlighted = highlighted.replace(
      /: ([\d.]+)/g,
      `: <span style="color: ${ORACLE_COLORS.secondary}; font-weight: 700;">$1</span>`
    );
    
    // Booleans & null
    highlighted = highlighted.replace(
      /: (true|false|null)/g,
      `: <span style="color: ${ORACLE_COLORS.secondary};">$1</span>`
    );

    return highlighted;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 500,
      right: 24,
      width: 320,
      maxHeight: 'calc(100vh - 520px)',
      background: `linear-gradient(135deg, ${ORACLE_COLORS.bg}ee, #000000ee)`,
      backdropFilter: 'blur(20px)',
      border: `2px solid ${ORACLE_COLORS.primary}60`,
      borderRadius: 16,
      boxShadow: `0 0 40px ${ORACLE_COLORS.primary}40`,
      fontFamily: 'monospace',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: `1px solid ${ORACLE_COLORS.primary}40`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${ORACLE_COLORS.primary}60, ${ORACLE_COLORS.primary}20)`,
            border: `2px solid ${ORACLE_COLORS.primary}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            boxShadow: `0 0 20px ${ORACLE_COLORS.primary}80`,
          }}>
            📊
          </div>
          <div>
            <div style={{
              fontSize: 14,
              fontWeight: 900,
              color: ORACLE_COLORS.primary,
              letterSpacing: 2,
            }}>
              JSON VIEWER
            </div>
            <div style={{
              fontSize: 9,
              color: ORACLE_COLORS.textDim,
              letterSpacing: 1,
            }}>
              SCORING DATA
            </div>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          style={{
            background: copied ? `${ORACLE_COLORS.tertiary}20` : `${ORACLE_COLORS.primary}20`,
            border: `2px solid ${copied ? ORACLE_COLORS.tertiary : ORACLE_COLORS.primary}`,
            borderRadius: 8,
            padding: '6px 12px',
            color: copied ? ORACLE_COLORS.tertiary : ORACLE_COLORS.primary,
            fontSize: 10,
            fontWeight: 800,
            cursor: 'pointer',
            fontFamily: 'monospace',
            letterSpacing: 1,
          }}
        >
          {copied ? '✓ COPIED' : '📋 COPY'}
        </button>
      </div>

      {/* JSON Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 12px',
        fontSize: 11,
        lineHeight: 1.6,
      }}>
        {lines.map((line, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              gap: 12,
              paddingLeft: 8,
            }}
          >
            {/* Line Number */}
            <div style={{
              minWidth: 30,
              textAlign: 'right',
              color: ORACLE_COLORS.textDim,
              opacity: 0.4,
              userSelect: 'none',
            }}>
              {idx + 1}
            </div>

            {/* Code Line */}
            <div
              style={{
                flex: 1,
                color: ORACLE_COLORS.text,
              }}
              dangerouslySetInnerHTML={{
                __html: highlightJson(line, idx),
              }}
            />
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div style={{
        padding: '12px 20px',
        borderTop: `1px solid ${ORACLE_COLORS.primary}40`,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 10,
        color: ORACLE_COLORS.textDim,
      }}>
        <span>{lines.length} lines</span>
        <span>{(jsonString.length / 1024).toFixed(1)} KB</span>
      </div>

      {/* Scrollbar Styling */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: ${ORACLE_COLORS.bg};
        }
        div::-webkit-scrollbar-thumb {
          background: ${ORACLE_COLORS.primary}60;
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: ${ORACLE_COLORS.primary};
        }
      `}</style>
    </div>
  );
}
