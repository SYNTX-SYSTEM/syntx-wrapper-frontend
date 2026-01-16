'use client';

import React from 'react';
import { ORACLE_COLORS } from './constants';

export function OracleHeader() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 60,
      position: 'relative',
    }}>
      {/* Mega Eye with SYNTX Logo */}
      <div style={{
        position: 'relative',
        marginBottom: 30,
      }}>
        {/* Eye Glow Background */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ORACLE_COLORS.primary}40, transparent 70%)`,
          animation: 'eyeGlow 3s ease-in-out infinite',
          filter: 'blur(20px)',
        }} />

        {/* SYNTX Logo Inside Eye */}
        <div style={{
          position: 'relative',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `
            radial-gradient(circle at center, ${ORACLE_COLORS.bg}ff 20%, ${ORACLE_COLORS.bgLight}f0 50%, ${ORACLE_COLORS.primary}30)
          `,
          border: `3px solid ${ORACLE_COLORS.primary}`,
          boxShadow: `
            0 0 40px ${ORACLE_COLORS.primary}ff,
            0 0 60px ${ORACLE_COLORS.primary}80,
            0 0 80px ${ORACLE_COLORS.primary}40,
            inset 0 0 30px ${ORACLE_COLORS.primary}20
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'eyePulse 2s ease-in-out infinite',
          overflow: 'hidden',
        }}>
          {/* Iris Ring */}
          <div style={{
            position: 'absolute',
            width: 50,
            height: 50,
            borderRadius: '50%',
            border: `2px solid ${ORACLE_COLORS.secondary}60`,
            animation: 'irisRotate 8s linear infinite',
          }} />

          {/* SYNTX Logo */}
          <img
            src="/logo_original.png"
            alt="SYNTX"
            style={{
              width: '70%',
              height: '70%',
              objectFit: 'contain',
              filter: `
                drop-shadow(0 0 15px ${ORACLE_COLORS.primary})
                drop-shadow(0 0 25px ${ORACLE_COLORS.primary}80)
              `,
              animation: 'logoPulse 2s ease-in-out infinite',
              zIndex: 10,
            }}
          />
        </div>
      </div>

      {/* Title */}
      <div style={{
        fontSize: 72,
        fontWeight: 900,
        background: `linear-gradient(135deg, ${ORACLE_COLORS.primary}, ${ORACLE_COLORS.secondary})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: 8,
        fontFamily: 'monospace',
        textShadow: `
          0 0 40px ${ORACLE_COLORS.primary}80,
          0 0 80px ${ORACLE_COLORS.primary}40
        `,
        marginBottom: 8,
        animation: 'titleGlow 3s ease-in-out infinite',
      }}>
        THE ORACLE
      </div>

      {/* Subtitle */}
      <div style={{
        fontSize: 14,
        color: ORACLE_COLORS.textDim,
        letterSpacing: 6,
        fontFamily: 'monospace',
        fontWeight: 600,
      }}>
        SEMANTIC SCORING SYSTEM
      </div>

      <style jsx>{`
        @keyframes eyeGlow {
          0%, 100% { 
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
        @keyframes eyePulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 
              0 0 40px ${ORACLE_COLORS.primary}ff,
              0 0 60px ${ORACLE_COLORS.primary}80,
              0 0 80px ${ORACLE_COLORS.primary}40;
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 
              0 0 50px ${ORACLE_COLORS.primary}ff,
              0 0 80px ${ORACLE_COLORS.primary}ff,
              0 0 100px ${ORACLE_COLORS.primary}80;
          }
        }
        @keyframes irisRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes logoPulse {
          0%, 100% { 
            opacity: 0.8;
            transform: scale(1);
            filter: 
              drop-shadow(0 0 15px ${ORACLE_COLORS.primary})
              drop-shadow(0 0 25px ${ORACLE_COLORS.primary}80);
          }
          50% { 
            opacity: 1;
            transform: scale(1.1);
            filter: 
              drop-shadow(0 0 25px ${ORACLE_COLORS.primary})
              drop-shadow(0 0 40px ${ORACLE_COLORS.primary}ff)
              drop-shadow(0 0 60px ${ORACLE_COLORS.primary}80);
          }
        }
        @keyframes titleGlow {
          0%, 100% { 
            filter: drop-shadow(0 0 40px ${ORACLE_COLORS.primary}80);
          }
          50% { 
            filter: drop-shadow(0 0 60px ${ORACLE_COLORS.primary}ff);
          }
        }
      `}</style>
    </div>
  );
}
