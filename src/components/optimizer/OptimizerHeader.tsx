"use client";
import { motion } from "framer-motion";

export default function OptimizerHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="cyber-card"
      style={{
        padding: '20px 24px',
        borderRadius: 16,
        background: 'linear-gradient(145deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
        border: '1px solid rgba(0,212,255,0.3)',
        position: 'relative',
        overflow: 'visible',
        marginBottom: 20
      }}
    >
      <div className="scan-line" style={{ '--scan-color': '#00d4ff' } as React.CSSProperties} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <motion.div
          className="float pulse"
          style={{
            fontSize: 48,
            filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.6))'
          }}
        >
          🤖
        </motion.div>
        
        <div style={{ flex: 1 }}>
          <h2 className="glow-text" style={{
            fontSize: 28,
            fontWeight: 900,
            color: '#00d4ff',
            fontFamily: 'monospace',
            letterSpacing: 3,
            margin: 0,
            textShadow: '0 0 20px rgba(0,212,255,0.8)'
          }}>
            AUTONOMOUS OPTIMIZER
          </h2>
          <p style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'monospace',
            margin: '6px 0 0 0',
            letterSpacing: 1
          }}>
            System learns • Self-evolves • Field optimization
          </p>
        </div>

        <motion.div
          className="cyber-card"
          style={{
            padding: '12px 20px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))',
            border: '1px solid rgba(16,185,129,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(16,185,129,0.3)',
              '0 0 40px rgba(16,185,129,0.5)',
              '0 0 20px rgba(16,185,129,0.3)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 15px rgba(16,185,129,0.8)'
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="neon" style={{
            fontSize: 11,
            color: '#10b981',
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: 2
          }}>
            LEARNING
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
