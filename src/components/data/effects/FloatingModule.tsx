"use client";
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FloatingModuleProps {
  children: ReactNode;
  title: string;
  icon?: string;
  glowColor?: string;
  delay?: number;
  tiltX?: number;
  tiltY?: number;
}

export function FloatingModule({ 
  children, 
  title, 
  icon, 
  glowColor = '#00d4ff',
  delay = 0,
  tiltX = 0,
  tiltY = 0
}: FloatingModuleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 0, rotateY: 0 }}
      animate={{ 
        opacity: 1, 
        y: [0, -5, 0],
        rotateX: tiltX,
        rotateY: tiltY
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotateX: { duration: 0.6 },
        rotateY: { duration: 0.6 }
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 30px ${glowColor}99`,
        transition: { duration: 0.2, type: "spring", stiffness: 300 }
      }}
      style={{
        position: 'relative',
        background: 'rgba(10, 26, 46, 0.6)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${glowColor}40`,
        borderRadius: 16,
        padding: '20px',
        boxShadow: `0 0 20px ${glowColor}30, inset 0 0 20px rgba(0,212,255,0.05)`,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {/* Title Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
        paddingBottom: 12,
        borderBottom: `1px solid ${glowColor}20`
      }}>
        {icon && (
          <motion.span
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: 18 }}
          >
            {icon}
          </motion.span>
        )}
        <h3 style={{
          margin: 0,
          fontSize: 13,
          fontWeight: 600,
          color: glowColor,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontFamily: 'monospace',
          textShadow: `0 0 10px ${glowColor}80`
        }}>
          {title}
        </h3>
        
        {/* Pulse Indicator */}
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            marginLeft: 'auto',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: glowColor,
            boxShadow: `0 0 10px ${glowColor}`
          }}
        />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>

      {/* Corner Glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 60,
        height: 60,
        background: `radial-gradient(circle at top right, ${glowColor}20, transparent)`,
        pointerEvents: 'none',
        borderRadius: '0 16px 0 0'
      }} />
    </motion.div>
  );
}
