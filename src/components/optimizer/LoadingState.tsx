"use client";
import { motion } from "framer-motion";

export default function LoadingState() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 400,
      gap: 20
    }}>
      <motion.div
        style={{
          width: 80,
          height: 80,
          border: '4px solid rgba(0,212,255,0.2)',
          borderTopColor: '#00d4ff',
          borderRadius: '50%',
          boxShadow: '0 0 40px rgba(0,212,255,0.4)'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      
      <div style={{ display: 'flex', gap: 10 }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00d4ff, #d946ef)',
              boxShadow: '0 0 15px rgba(0,212,255,0.6)'
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
      
      <motion.p
        className="glow-text"
        style={{
          fontSize: 14,
          color: '#00d4ff',
          fontFamily: 'monospace',
          letterSpacing: 2,
          fontWeight: 700
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        LOADING...
      </motion.p>
    </div>
  );
}
