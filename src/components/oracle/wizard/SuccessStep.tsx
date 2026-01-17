'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ORACLE_COLORS } from '../constants';

interface SuccessStepProps {
  profileName: string;
  formatName: string;
}

export function SuccessStep({ profileName, formatName }: SuccessStepProps) {
  return (
    <div style={{ 
      textAlign: 'center', 
      maxWidth: 800,
      animation: 'successFade 0.5s ease-out',
    }}>
      {/* Main Eye Animation */}
      <motion.div 
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        style={{
          width: 250,
          height: 250,
          margin: '0 auto 40px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ORACLE_COLORS.primary}40, transparent 70%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: `
            0 0 100px ${ORACLE_COLORS.primary}80,
            0 0 150px ${ORACLE_COLORS.secondary}60,
            0 0 200px ${ORACLE_COLORS.tertiary}40
          `,
        }}
      >
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ fontSize: 150 }}
        >
          👁️
        </motion.div>

        {/* Orbiting Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.1,
            }}
            style={{
              position: 'absolute',
              width: 300,
              height: 300,
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: i % 3 === 0 ? ORACLE_COLORS.primary : 
                           i % 3 === 1 ? ORACLE_COLORS.secondary : 
                           ORACLE_COLORS.tertiary,
                boxShadow: `0 0 20px ${i % 3 === 0 ? ORACLE_COLORS.primary : 
                                      i % 3 === 1 ? ORACLE_COLORS.secondary : 
                                      ORACLE_COLORS.tertiary}`,
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translateY(-150px)`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Success Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: 36,
          fontWeight: 900,
          color: ORACLE_COLORS.secondary,
          fontFamily: 'monospace',
          letterSpacing: 4,
          marginBottom: 30,
          textShadow: `
            0 0 20px ${ORACLE_COLORS.secondary},
            0 0 40px ${ORACLE_COLORS.secondary}80,
            0 0 60px ${ORACLE_COLORS.secondary}40
          `,
        }}
      >
        ✨ PROFILE RESONANCE
      </motion.div>

      {/* Profile ID Display - CYBER STYLE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          padding: '30px 40px',
          background: `linear-gradient(135deg, ${ORACLE_COLORS.primary}20, ${ORACLE_COLORS.secondary}20)`,
          border: `3px solid ${ORACLE_COLORS.primary}`,
          borderRadius: 16,
          marginBottom: 30,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Scanning Line Animation */}
        <motion.div
          animate={{ 
            y: [-100, 200],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${ORACLE_COLORS.primary}, transparent)`,
            boxShadow: `0 0 20px ${ORACLE_COLORS.primary}`,
          }}
        />

        <div style={{
          fontSize: 14,
          color: ORACLE_COLORS.primary + '80',
          fontFamily: 'monospace',
          letterSpacing: 2,
          marginBottom: 15,
        }}>
          PROFILE INITIALIZED
        </div>

        <motion.div
          animate={{
            textShadow: [
              `0 0 10px ${ORACLE_COLORS.secondary}`,
              `0 0 30px ${ORACLE_COLORS.secondary}`,
              `0 0 10px ${ORACLE_COLORS.secondary}`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            fontSize: 24,
            fontWeight: 900,
            color: ORACLE_COLORS.secondary,
            fontFamily: 'monospace',
            letterSpacing: 3,
            marginBottom: 10,
          }}
        >
          {profileName}
        </motion.div>

        <div style={{
          fontSize: 14,
          color: ORACLE_COLORS.tertiary,
          fontFamily: 'monospace',
          letterSpacing: 1,
        }}>
          FORMAT: {formatName.toUpperCase()}
        </div>

        {/* Grid Pattern Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${ORACLE_COLORS.primary}20 1px, transparent 1px),
            linear-gradient(90deg, ${ORACLE_COLORS.primary}20 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: 0.3,
          pointerEvents: 'none',
        }} />
      </motion.div>

      {/* Status Messages */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
        }}
      >
        {[
          '🔄 Binding profile to format...',
          '💾 Saving scoring configuration...',
          '⚡ Updating Oracle Panel...',
        ].map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.2 }}
            style={{
              padding: '12px 20px',
              background: `${ORACLE_COLORS.bgLight}80`,
              border: `1px solid ${ORACLE_COLORS.primary}40`,
              borderRadius: 8,
              fontSize: 12,
              color: ORACLE_COLORS.primary,
              fontFamily: 'monospace',
              textAlign: 'left',
            }}
          >
            {msg}
          </motion.div>
        ))}
      </motion.div>

      <style jsx>{`
        @keyframes successFade {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
