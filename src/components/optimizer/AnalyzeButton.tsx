"use client";
import { motion } from "framer-motion";

interface Props {
  analyzing: boolean;
  onAnalyze: () => void;
}

export default function AnalyzeButton({ analyzing, onAnalyze }: Props) {
  return (
    <motion.button
      onClick={onAnalyze}
      disabled={analyzing}
      whileHover={{ scale: analyzing ? 1 : 1.02, y: analyzing ? 0 : -2 }}
      whileTap={{ scale: analyzing ? 1 : 0.98 }}
      className="cyber-btn"
      style={{
        width: '100%',
        padding: '20px 32px',
        borderRadius: 16,
        border: 'none',
        background: analyzing 
          ? 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(217,70,239,0.3))'
          : 'linear-gradient(135deg, #00d4ff, #d946ef)',
        color: analyzing ? 'rgba(255,255,255,0.5)' : '#030b15',
        fontFamily: 'monospace',
        fontSize: 18,
        fontWeight: 900,
        letterSpacing: 3,
        cursor: analyzing ? 'not-allowed' : 'pointer',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: analyzing 
          ? 'none'
          : '0 10px 40px rgba(0,212,255,0.4), 0 0 60px rgba(217,70,239,0.3)',
        marginBottom: 20
      }}
    >
      {!analyzing && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
          }}
          animate={{ left: ['100%', '-100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      )}
      
      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
      }}>
        {analyzing ? (
          <>
            <motion.div
              style={{
                width: 20,
                height: 20,
                border: '3px solid rgba(255,255,255,0.3)',
                borderTopColor: 'rgba(255,255,255,0.8)',
                borderRadius: '50%'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            ANALYZING LOGS...
          </>
        ) : (
          <>
            🔍 ANALYZE LOGS
          </>
        )}
      </div>
    </motion.button>
  );
}
