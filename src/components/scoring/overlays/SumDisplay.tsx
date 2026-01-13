'use client';

import { motion } from 'framer-motion';

interface SumDisplayProps {
  components: Record<string, any>;
}

export default function SumDisplay({ components }: SumDisplayProps) {
  const componentsList = Object.entries(components);
  const totalWeight = componentsList.reduce((sum, [_, comp]) => sum + (comp.weight || 0), 0);
  const isStable = Math.abs(totalWeight - 1.0) < 0.001;
  
  return (
    <motion.div
      animate={isStable ? {} : {
        scale: [1, 1.03, 1],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
      }}
      style={{
        position: 'fixed',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.95)',
        padding: '12px 40px',
        borderRadius: '28px',
        border: `3px solid ${isStable ? '#00ff88' : '#ffcc00'}`,
        boxShadow: `0 0 25px ${isStable ? 'rgba(0,255,136,0.8)' : 'rgba(255,204,0,0.8)'}`,
        zIndex: 150,
      }}
    >
      <div style={{
        color: isStable ? '#00ff88' : '#ffcc00',
        fontSize: '18px',
        fontFamily: 'monospace',
        fontWeight: 900,
        textShadow: `0 0 20px ${isStable ? 'rgba(0,255,136,1)' : 'rgba(255,204,0,1)'}`,
        textAlign: 'center',
      }}>
        SUM: {totalWeight.toFixed(3)} {isStable ? '✅' : '⚠️'}
      </div>
      
      <div style={{
        color: isStable ? '#00ff88' : '#ffcc00',
        fontSize: '9px',
        fontFamily: 'monospace',
        opacity: 0.7,
        textAlign: 'center',
        marginTop: '4px',
        letterSpacing: '0.5px',
      }}>
        {isStable ? 'SYSTEM STABLE' : 'ADJUST WEIGHTS'}
      </div>
    </motion.div>
  );
}
