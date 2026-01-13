'use client';

import { motion } from 'framer-motion';

interface LogoCenterProps {
  onCreateClick: () => void;
}

export default function LogoCenter({ onCreateClick }: LogoCenterProps) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20, pointerEvents: 'none' }}>
      {/* ORBIT RINGS */}
      {[300, 350, 400].map((radius, idx) => (
        <motion.div
          key={radius}
          style={{
            position: 'absolute',
            width: radius,
            height: radius,
            borderRadius: '50%',
            border: '1px solid rgba(0,255,100,0.2)',
            animation: `rotate${idx} ${60 + idx * 20}s linear infinite`,
          }}
        />
      ))}

      {/* LOGO PLANET - CLICKABLE */}
      <motion.div
        onClick={onCreateClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        style={{
          position: 'relative',
          width: 240,
          height: 240,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(0,255,100,0.3), rgba(0,150,50,0.2))',
          border: '3px solid rgba(0,255,100,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 60px rgba(0,255,100,0.4), inset 0 0 40px rgba(0,255,100,0.1)',
          cursor: 'pointer',
          pointerEvents: 'auto',
        }}
      >
        {/* SHIMMER */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)', animation: 'shimmer 4s ease-in-out infinite' }} />
        
        {/* SCAN LINE */}
        <motion.div 
          style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden' }}
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        >
          <div style={{ width: '100%', height: '4px', background: 'linear-gradient(90deg, transparent, rgba(0,255,100,0.6), transparent)' }} />
        </motion.div>

        {/* LOGO IMAGE */}
        <img src="/Logo1_trans.png" alt="SYNTX" style={{ width: 180, height: 180, position: 'relative', zIndex: 1 }} />
        
        {/* PULSE INDICATOR */}
        <motion.div
          style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: '2px solid rgba(0,255,100,0.6)' }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      <style jsx>{`
        @keyframes rotate0 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes rotate1 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes rotate2 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shimmer { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(180deg); } }
      `}</style>
    </div>
  );
}
