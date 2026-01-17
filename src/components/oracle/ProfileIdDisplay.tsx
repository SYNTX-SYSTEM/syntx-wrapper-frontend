'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ORACLE_COLORS } from './constants';

interface ProfileIdDisplayProps {
  profileName: string;
  formatName: string;
}

export function ProfileIdDisplay({ profileName, formatName }: ProfileIdDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: 'relative',
        padding: '20px 30px',
        background: `linear-gradient(135deg, ${ORACLE_COLORS.primary}15, ${ORACLE_COLORS.secondary}15)`,
        border: `2px solid ${ORACLE_COLORS.primary}`,
        borderRadius: 12,
        marginBottom: 20,
        overflow: 'hidden',
      }}
    >
      {/* Scanning Line */}
      <motion.div
        animate={{ x: [-100, 400] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: 100,
          background: `linear-gradient(90deg, transparent, ${ORACLE_COLORS.primary}60, transparent)`,
          pointerEvents: 'none',
        }}
      />

      {/* Grid Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${ORACLE_COLORS.primary}10 1px, transparent 1px),
          linear-gradient(90deg, ${ORACLE_COLORS.primary}10 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        opacity: 0.3,
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}>
        {/* Icon */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            fontSize: 32,
            filter: `drop-shadow(0 0 10px ${ORACLE_COLORS.primary})`,
          }}
        >
          🎯
        </motion.div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 11,
            color: ORACLE_COLORS.primary + '80',
            fontFamily: 'monospace',
            letterSpacing: 2,
            marginBottom: 5,
          }}>
            ACTIVE SCORING PROFILE
          </div>

          <motion.div
            animate={{
              textShadow: [
                `0 0 10px ${ORACLE_COLORS.secondary}`,
                `0 0 20px ${ORACLE_COLORS.secondary}`,
                `0 0 10px ${ORACLE_COLORS.secondary}`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: ORACLE_COLORS.secondary,
              fontFamily: 'monospace',
              letterSpacing: 2,
            }}
          >
            {profileName}
          </motion.div>

          <div style={{
            fontSize: 11,
            color: ORACLE_COLORS.tertiary,
            fontFamily: 'monospace',
            marginTop: 5,
          }}>
            FORMAT: {formatName.toUpperCase()}
          </div>
        </div>

        {/* Pulse Indicator */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: ORACLE_COLORS.primary,
            boxShadow: `0 0 20px ${ORACLE_COLORS.primary}`,
          }}
        />
      </div>
    </motion.div>
  );
}
