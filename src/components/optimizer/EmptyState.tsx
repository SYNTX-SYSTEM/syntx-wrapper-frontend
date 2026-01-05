"use client";
import { motion } from "framer-motion";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="cyber-card"
      style={{
        padding: '60px 40px',
        borderRadius: 16,
        background: 'linear-gradient(145deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
        border: '1px solid rgba(16,185,129,0.3)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'visible'
      }}
    >
      <motion.div
        className="float"
        style={{
          fontSize: 80,
          marginBottom: 20,
          filter: 'drop-shadow(0 0 30px rgba(16,185,129,0.6))'
        }}
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        ✨
      </motion.div>
      
      <h3 className="glow-text" style={{
        fontSize: 24,
        fontWeight: 900,
        color: '#10b981',
        fontFamily: 'monospace',
        marginBottom: 12,
        letterSpacing: 2
      }}>
        SYSTEM OPTIMIZED
      </h3>
      
      <p style={{
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
        fontFamily: 'monospace',
        lineHeight: 1.6
      }}>
        No suggestions pending • Run analysis to discover improvements
      </p>
    </motion.div>
  );
}
