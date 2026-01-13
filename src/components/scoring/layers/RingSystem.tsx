'use client';

import { motion } from 'framer-motion';
import { useScoringStore } from '../store';
import { RING_COLORS, stromPosition } from '../utils/stroeme';

interface RingSystemProps {
  components: Record<string, any>;
}

export default function RingSystem({ components }: RingSystemProps) {
  const instability = useScoringStore((state) => state.instability);
  const componentsList = Object.entries(components);
  const isStable = instability < 0.1;
  
  return (
    <div style={{ 
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none', 
      zIndex: 90,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        position: 'relative',
        width: 0,
        height: 0,
      }}>
        {componentsList.map(([name, comp], idx) => {
          const weight = comp.weight || 0;
          const radius = stromPosition(weight, idx);
          const colorConfig = RING_COLORS[idx % RING_COLORS.length];
          const rotationDuration = 25 - weight * 15;
          const isClockwise = idx % 2 === 0;
          
          return (
            <div key={name}>
              {/* RING */}
              <motion.div
                animate={{
                  rotate: isClockwise ? 360 : -360,
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
                  left: -radius,
                  top: -radius,
                  width: radius * 2,
                  height: radius * 2,
                  borderRadius: '50%',
                  border: `4px solid ${colorConfig.color}`,
                  boxShadow: `
                    0 0 25px ${colorConfig.glow}, 
                    inset 0 0 25px ${colorConfig.glow}
                  `,
                  opacity: isStable ? 0.9 : 0.7,
                  transition: 'left 0.5s ease-out, top 0.5s ease-out, width 0.5s ease-out, height 0.5s ease-out',
                }}
              />
              
              {/* ORBITAL PARTICLES */}
              {[0, 90, 180, 270].map((angle) => (
                <motion.div
                  key={angle}
                  animate={{
                    rotate: isClockwise ? 360 : -360,
                  }}
                  transition={{
                    duration: rotationDuration,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: angle / 360
                  }}
                  style={{
                    position: 'absolute',
                    left: -radius,
                    top: -radius,
                    width: radius * 2,
                    height: radius * 2,
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
                    background: colorConfig.color,
                    boxShadow: `0 0 12px ${colorConfig.glow}`,
                  }} />
                </motion.div>
              ))}
              
              {/* SPACESHIP */}
              <motion.div
                animate={{
                  rotate: isClockwise ? 360 : -360,
                }}
                transition={{
                  duration: rotationDuration,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  position: 'absolute',
                  left: -radius,
                  top: -radius,
                  width: radius * 2,
                  height: radius * 2,
                }}
              >
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: -10,
                  transform: 'translate(-50%, -45px)',
                }}>
                  <motion.div
                    animate={{
                      rotate: isClockwise ? -360 : 360,
                    }}
                    transition={{
                      duration: rotationDuration,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                    style={{
                      background: 'rgba(0,0,0,0.95)',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      border: `2px solid ${colorConfig.color}`,
                      boxShadow: `0 0 15px ${colorConfig.glow}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <div style={{ fontSize: '14px' }}>🛸</div>
                    <div style={{
                      color: colorConfig.color,
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      fontWeight: 900,
                      textShadow: `0 0 10px ${colorConfig.glow}`,
                      letterSpacing: '0.5px',
                    }}>
                      {name.toUpperCase()}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
