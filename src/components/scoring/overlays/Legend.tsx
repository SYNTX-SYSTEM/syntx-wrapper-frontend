'use client';

import { motion } from 'framer-motion';
import { RING_COLORS } from '../utils/ringCalculations';

interface LegendProps {
  components: Record<string, any>;
}

export default function Legend({ components }: LegendProps) {
  const componentsList = Object.entries(components);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 20,
        left: 20,
        background: 'rgba(0,0,0,0.95)',
        border: '2px solid rgba(157,0,255,0.6)',
        borderRadius: '16px',
        padding: '16px 20px',
        boxShadow: '0 0 25px rgba(157,0,255,0.4)',
        zIndex: 200,
        minWidth: 280,
      }}
    >
      <div style={{
        color: '#9d00ff',
        fontSize: '14px',
        fontFamily: 'monospace',
        fontWeight: 900,
        marginBottom: '16px',
        textShadow: '0 0 10px rgba(157,0,255,1)',
        letterSpacing: '1px',
      }}>
        COMPONENTS
      </div>
      
      {componentsList.map(([name, comp], idx) => {
        const colorConfig = RING_COLORS[idx % RING_COLORS.length];
        
        return (
          <div
            key={name}
            style={{
              marginBottom: idx < componentsList.length - 1 ? '14px' : 0,
              paddingBottom: idx < componentsList.length - 1 ? '14px' : 0,
              borderBottom: idx < componentsList.length - 1 ? `1px solid rgba(157,0,255,0.2)` : 'none',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '6px',
            }}>
              <div style={{
                fontSize: '16px',
              }}>
                🛸
              </div>
              
              <div style={{
                color: colorConfig.color,
                fontSize: '12px',
                fontFamily: 'monospace',
                fontWeight: 900,
                textShadow: `0 0 8px ${colorConfig.glow}`,
                flex: 1,
              }}>
                {name.toUpperCase()}
              </div>
              
              <div style={{
                color: colorConfig.color,
                fontSize: '16px',
                fontFamily: 'monospace',
                fontWeight: 900,
              }}>
                {(comp.weight * 100).toFixed(0)}%
              </div>
            </div>
            
            {Object.entries(comp)
              .filter(([key]) => key !== 'weight' && key !== 'description')
              .map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    color: colorConfig.color,
                    fontSize: '9px',
                    fontFamily: 'monospace',
                    opacity: 0.7,
                    marginLeft: '24px',
                  }}
                >
                  {key}: {String(value)}
                </div>
              ))}
          </div>
        );
      })}
    </motion.div>
  );
}
