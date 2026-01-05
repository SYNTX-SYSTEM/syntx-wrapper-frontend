"use client";
import { motion } from 'framer-motion';

interface Props {
  modified: boolean;
  validationStatus: 'valid' | 'invalid' | 'checking';
  onDeploy: () => void;
}

export default function ResonanceFooter({ modified, validationStatus, onDeploy }: Props) {
  const statusConfig = {
    valid: { icon: '✅', text: 'Schema Valid', color: '#10b981' },
    invalid: { icon: '⚠️', text: 'Invalid Pattern', color: '#ef4444' },
    checking: { icon: '⏳', text: 'Validating...', color: '#f59e0b' }
  };

  const config = statusConfig[validationStatus];

  return (
    <motion.footer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        padding: '12px 24px',
        borderTop: '1px solid rgba(14,165,233,0.2)',
        background: 'rgba(8,24,42,0.9)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 14 }}>{config.icon}</span>
          <span style={{ fontSize: 10, color: config.color, fontFamily: 'monospace', fontWeight: 700 }}>
            {config.text}
          </span>
        </div>
        {modified && (
          <span style={{ fontSize: 9, color: '#f59e0b', fontFamily: 'monospace' }}>
            Modified • Not Deployed
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>Confidence:</span>
          <div style={{ width: 100, height: 8, borderRadius: 4, background: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '82%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #10b981, #0ea5e9)', borderRadius: 4 }}
            />
          </div>
          <span style={{ fontSize: 10, color: '#0ea5e9', fontFamily: 'monospace', fontWeight: 700 }}>82%</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDeploy}
          className="cyber-btn"
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '2px solid rgba(14,165,233,0.5)',
            background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(6,182,212,0.2))',
            color: '#0ea5e9',
            fontSize: 11,
            fontFamily: 'monospace',
            fontWeight: 900,
            cursor: 'pointer',
            letterSpacing: 1
          }}
        >
          🧠 DEPLOY
        </motion.button>
      </div>
    </motion.footer>
  );
}
