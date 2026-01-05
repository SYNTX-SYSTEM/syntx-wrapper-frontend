"use client";
import { motion } from "framer-motion";

interface Props {
  onOpenAnalytics: () => void;
  onOpenLogs: () => void;
  pendingSuggestions: number;
}

export default function QuickActionsBar({ onOpenAnalytics, onOpenLogs, pendingSuggestions }: Props) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 12,
      marginBottom: 20
    }}>
      <motion.button
        onClick={onOpenAnalytics}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="cyber-btn"
        style={{
          padding: '16px 20px',
          borderRadius: 14,
          border: '1px solid rgba(245,158,11,0.4)',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))',
          color: '#f59e0b',
          fontFamily: 'monospace',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          boxShadow: '0 0 20px rgba(245,158,11,0.1)'
        }}
      >
        <span style={{ fontSize: 20 }}>📈</span>
        ANALYTICS
      </motion.button>

      <motion.button
        onClick={onOpenLogs}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="cyber-btn"
        style={{
          padding: '16px 20px',
          borderRadius: 14,
          border: '1px solid rgba(0,212,255,0.4)',
          background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))',
          color: '#00d4ff',
          fontFamily: 'monospace',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          boxShadow: '0 0 20px rgba(0,212,255,0.1)'
        }}
      >
        <span style={{ fontSize: 20 }}>📋</span>
        LOGS
      </motion.button>

      <motion.div
        className="cyber-card"
        style={{
          padding: '16px 20px',
          borderRadius: 14,
          border: '1px solid rgba(217,70,239,0.4)',
          background: 'linear-gradient(135deg, rgba(217,70,239,0.15), rgba(217,70,239,0.05))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          position: 'relative'
        }}
        animate={{
          boxShadow: pendingSuggestions > 0 
            ? [
                '0 0 20px rgba(217,70,239,0.2)',
                '0 0 40px rgba(217,70,239,0.4)',
                '0 0 20px rgba(217,70,239,0.2)'
              ]
            : '0 0 20px rgba(217,70,239,0.1)'
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span style={{ fontSize: 20 }}>🎯</span>
        <span style={{
          color: '#d946ef',
          fontFamily: 'monospace',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 1
        }}>
          {pendingSuggestions} PENDING
        </span>
      </motion.div>
    </div>
  );
}
