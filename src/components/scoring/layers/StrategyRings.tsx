'use client';

import { motion } from 'framer-motion';
import { useScoringStore } from '../store';

interface StrategyRingsProps {
  components: Record<string, any>;
}

export default function StrategyRings({ components }: StrategyRingsProps) {
  const componentsList = Object.entries(components);
  const totalWeight = componentsList.reduce((sum, [_, comp]) => sum + (comp.weight || 0), 0);
  const isStable = Math.abs(totalWeight - 1.0) < 0.001;

  const ringConfigs = [
    { 
      color: '#00d4ff',
      glow: 'rgba(0,212,255,0.6)',
      smooth: true,
      labelAngle: -45,
    },
    { 
      color: '#9d00ff',
      glow: 'rgba(157,0,255,0.6)',
      smooth: false,
      labelAngle: 135,
    },
  ];

  return (
    <div style={{ 
      position: 'absolute', 
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none', 
      zIndex: 90 
    }}>
      {componentsList.map(([name, comp], idx) => {
        const radius = 240 + idx * 120;
        const weight = comp.weight || 0;
        const config = ringConfigs[idx] || ringConfigs[0];
        const rotationDuration = 25 - weight * 15;
        
        const labelAngleRad = (config.labelAngle * Math.PI) / 180;
        const labelX = Math.cos(labelAngleRad) * (radius + 60);
        const labelY = Math.sin(labelAngleRad) * (radius + 60);
        
        return (
          <div key={name}>
            {/* RING */}
            <motion.div
              animate={config.smooth ? {
                rotate: 360,
              } : {
                rotate: -360,
                x: isStable ? 0 : [0, 3, -3, 0],
              }}
              transition={{
                rotate: {
                  duration: rotationDuration,
                  repeat: Infinity,
                  ease: 'linear'
                },
                x: {
                  duration: 0.6,
                  repeat: Infinity,
                }
              }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: radius * 2,
                height: radius * 2,
                borderRadius: '50%',
                border: `4px solid ${config.color}`,
                boxShadow: `
                  0 0 25px ${config.glow}, 
                  inset 0 0 25px ${config.glow}
                `,
                opacity: isStable ? 0.9 : 0.7,
              }}
            />
            
            {/* ORBITAL PARTICLES */}
            {[0, 90, 180, 270].map((angle) => (
              <motion.div
                key={angle}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: rotationDuration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: angle / 360
                }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: radius * 2,
                  height: radius * 2,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  transform: 'translate(-50%, -50%)',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: config.color,
                  boxShadow: `0 0 12px ${config.glow}`,
                }} />
              </motion.div>
            ))}
            
            {/* SATELLITEN-LABEL (FIXED POSITION) */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${labelX}px), calc(-50% + ${labelY}px))`,
            }}>
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  background: 'rgba(0,0,0,0.95)',
                  padding: '10px 18px',
                  borderRadius: '20px',
                  border: `2px solid ${config.color}`,
                  boxShadow: `0 0 20px ${config.glow}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  minWidth: '140px',
                }}
              >
                <div style={{
                  color: config.color,
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  fontWeight: 900,
                  textShadow: `0 0 12px ${config.glow}`,
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                }}>
                  {name.toUpperCase()}
                </div>
                
                <div style={{
                  color: config.color,
                  fontSize: '20px',
                  fontFamily: 'monospace',
                  fontWeight: 900,
                  textAlign: 'center',
                }}>
                  {(weight * 100).toFixed(0)}%
                </div>
                
                {comp.description && (
                  <div style={{
                    color: config.color,
                    fontSize: '8px',
                    fontFamily: 'monospace',
                    opacity: 0.6,
                    textAlign: 'center',
                    marginTop: '2px',
                    maxWidth: '120px',
                  }}>
                    {comp.description.slice(0, 40)}...
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        );
      })}
      
      {/* SUM DISPLAY */}
      <motion.div
        animate={isStable ? {} : {
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
        }}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: -400,
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.95)',
          padding: '12px 40px',
          borderRadius: '28px',
          border: `3px solid ${isStable ? '#00ff88' : '#ffcc00'}`,
          boxShadow: `0 0 25px ${isStable ? 'rgba(0,255,136,0.8)' : 'rgba(255,204,0,0.8)'}`,
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
    </div>
  );
}
