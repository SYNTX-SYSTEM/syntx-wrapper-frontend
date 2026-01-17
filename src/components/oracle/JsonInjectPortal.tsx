'use client';

import React, { useState } from 'react';
import { ORACLE_COLORS } from './constants';

interface JsonInjectPortalProps {
  onInject: (json: any) => void;
  onClose: () => void;
}

export function JsonInjectPortal({ onInject, onClose }: JsonInjectPortalProps) {
  const [jsonText, setJsonText] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [isInjecting, setIsInjecting] = useState(false);

  const validateJson = (text: string) => {
    if (!text.trim()) {
      setIsValid(null);
      setError('');
      return;
    }

    try {
      JSON.parse(text);
      setIsValid(true);
      setError('');
    } catch (e: any) {
      setIsValid(false);
      setError(e.message);
    }
  };

  const handleInject = () => {
    if (!isValid) return;
    
    setIsInjecting(true);
    
    setTimeout(() => {
      const parsed = JSON.parse(jsonText);
      onInject(parsed);
    }, 1500);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.98)',
      backdropFilter: 'blur(15px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10001,
      animation: 'portalOpen 0.5s ease-out',
    }}>
      {/* Cosmic Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${ORACLE_COLORS.primary}20 1px, transparent 1px),
          linear-gradient(90deg, ${ORACLE_COLORS.primary}20 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.3,
      }} />

      {/* Portal Container */}
      <div style={{
        position: 'relative',
        width: '90%',
        maxWidth: 900,
        display: 'flex',
        flexDirection: 'column',
        gap: 30,
      }}>
        {/* Title */}
        <div style={{
          textAlign: 'center',
          fontSize: 32,
          fontWeight: 700,
          color: ORACLE_COLORS.primary,
          fontFamily: 'monospace',
          letterSpacing: 4,
          textShadow: `0 0 40px ${ORACLE_COLORS.primary}`,
        }}>
          🔁 JSON SOUL INJECTION
        </div>

        {/* JSON Portal */}
        <div style={{
          position: 'relative',
          background: ORACLE_COLORS.bg,
          border: `3px solid ${isValid === null ? ORACLE_COLORS.primary + '60' : isValid ? ORACLE_COLORS.primary : '#ef4444'}`,
          borderRadius: 16,
          padding: 24,
          boxShadow: `
            0 0 60px ${isValid === null ? ORACLE_COLORS.primary + '40' : isValid ? ORACLE_COLORS.primary + '80' : '#ef444440'},
            inset 0 0 40px ${ORACLE_COLORS.primary}10
          `,
          transition: 'all 0.3s',
        }}>
          <textarea
            value={jsonText}
            onChange={e => {
              setJsonText(e.target.value);
              validateJson(e.target.value);
            }}
            placeholder='{"format_name": "ultra130", "fields": {...}}'
            disabled={isInjecting}
            style={{
              width: '100%',
              height: 400,
              background: `${ORACLE_COLORS.bgLight}80`,
              border: 'none',
              borderRadius: 8,
              padding: 20,
              color: ORACLE_COLORS.text,
              fontFamily: 'monospace',
              fontSize: 14,
              lineHeight: 1.6,
              resize: 'none',
              outline: 'none',
            }}
          />

          {/* Validation Status */}
          {isValid !== null && (
            <div style={{
              position: 'absolute',
              top: 32,
              right: 32,
              padding: '8px 16px',
              background: isValid ? `${ORACLE_COLORS.primary}20` : '#ef444420',
              border: `2px solid ${isValid ? ORACLE_COLORS.primary : '#ef4444'}`,
              borderRadius: 8,
              color: isValid ? ORACLE_COLORS.primary : '#ef4444',
              fontSize: 12,
              fontFamily: 'monospace',
              fontWeight: 600,
              boxShadow: `0 0 20px ${isValid ? ORACLE_COLORS.primary : '#ef4444'}40`,
            }}>
              {isValid ? '✓ VALID' : '✗ INVALID'}
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div style={{
            padding: 16,
            background: '#ef444420',
            border: '2px solid #ef4444',
            borderRadius: 8,
            color: '#ef4444',
            fontSize: 13,
            fontFamily: 'monospace',
            boxShadow: '0 0 20px #ef444440',
          }}>
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: 20,
          justifyContent: 'center',
        }}>
          <button
            onClick={onClose}
            disabled={isInjecting}
            style={{
              padding: '16px 48px',
              background: 'transparent',
              border: `2px solid ${ORACLE_COLORS.textDim}`,
              borderRadius: 8,
              color: ORACLE_COLORS.textDim,
              fontSize: 16,
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: 2,
              cursor: isInjecting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              opacity: isInjecting ? 0.5 : 1,
            }}
          >
            CANCEL
          </button>

          <button
            onClick={handleInject}
            disabled={!isValid || isInjecting}
            style={{
              padding: '16px 48px',
              background: isValid && !isInjecting ? `${ORACLE_COLORS.primary}20` : 'transparent',
              border: `2px solid ${isValid && !isInjecting ? ORACLE_COLORS.primary : ORACLE_COLORS.textDim}`,
              borderRadius: 8,
              color: isValid && !isInjecting ? ORACLE_COLORS.primary : ORACLE_COLORS.textDim,
              fontSize: 16,
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: 2,
              cursor: isValid && !isInjecting ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s',
              boxShadow: isValid && !isInjecting ? `0 0 30px ${ORACLE_COLORS.primary}60` : 'none',
              animation: isInjecting ? 'injecting 1.5s ease-in-out infinite' : 'none',
            }}
          >
            {isInjecting ? '⚡ INJECTING...' : '🔁 INJECT SOUL'}
          </button>
        </div>

        {/* Injecting Animation */}
        {isInjecting && (
          <div style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.9)',
            zIndex: 1,
          }}>
            <div style={{
              fontSize: 72,
              animation: 'birthPulse 1.5s ease-in-out infinite',
              filter: `drop-shadow(0 0 60px ${ORACLE_COLORS.primary})`,
            }}>
              👁️
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes portalOpen {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes injecting {
          0%, 100% { box-shadow: 0 0 30px ${ORACLE_COLORS.primary}60; }
          50% { box-shadow: 0 0 60px ${ORACLE_COLORS.primary}ff; }
        }
        @keyframes birthPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
