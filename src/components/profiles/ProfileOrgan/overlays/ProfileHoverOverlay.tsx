'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProfileTooltipData, type ProfileTooltipData } from '@/lib/tooltips';
import { getFormatColor } from '@/lib/tooltips';
import { useOrganStore } from '../store';

interface ProfileHoverOverlayProps {
  isVisible: boolean;
  position: { x: number; y: number };
  profileId: string | null;
  profileLabel?: string;
}

export default function ProfileHoverOverlay({ isVisible, position, profileId }: ProfileHoverOverlayProps) {
  const bindingRefreshTrigger = useOrganStore((state) => state.bindingRefreshTrigger);
  const profileBindings = useOrganStore((state) => state.profileBindings);
  
  const [data, setData] = useState<ProfileTooltipData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isVisible || !profileId) {
      setData(null);
      setError(false);
      return;
    }

    setLoading(true);
    setError(false);

    getProfileTooltipData(profileId)
      .then((tooltipData) => {
        if (tooltipData) {
          const cachedFormat = profileBindings.get(profileId);
          if (cachedFormat) {
            console.log('📦 Using cached binding:', profileId, '→', cachedFormat);
            tooltipData.boundFormats = [cachedFormat];
          }
          setData(tooltipData);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [isVisible, profileId, bindingRefreshTrigger, profileBindings]);

  if (!isVisible || !profileId) return null;

  const color = data?.profileColor.primary || '#00ffff';
  const glow = data?.profileColor.glow || 'rgb(0, 255, 255)';

  // DYNAMIC POSITION
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const isBottom = position.y > screenHeight * 0.7;
  const isTop = position.y < screenHeight * 0.3;
  
  let tooltipX = position.x + 25;
  let tooltipY = position.y + 25;
  let initialY = 50;
  
  if (isBottom) {
    tooltipY = position.y - 400;
    initialY = 50;
  } else if (isTop) {
    tooltipY = position.y + 25;
    initialY = -50;
  } else {
    tooltipY = position.y - 150;
    initialY = 50;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotateX: -20, y: initialY }}
        animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0.7, rotateX: 20, y: isBottom ? 50 : -50 }}
        transition={{ 
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1]
        }}
        style={{
          position: 'fixed',
          left: tooltipX,
          top: tooltipY,
          zIndex: 9999999,
          pointerEvents: 'none',
          perspective: '1000px',
        }}
      >
        {/* TRIPLE BLACK BACKGROUND LAYERS - NOTHING SHINES THROUGH! */}
        <div style={{
          position: 'absolute',
          inset: -20,
          background: '#000000',
          zIndex: 1,
          borderRadius: '20px',
        }} />
        <div style={{
          position: 'absolute',
          inset: -10,
          background: '#000000',
          zIndex: 2,
          borderRadius: '18px',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#000000',
          zIndex: 3,
          borderRadius: '16px',
        }} />

        <motion.div
          animate={{
            boxShadow: [
              `0 0 40px ${glow}, 0 0 80px ${glow}`,
              `0 0 60px ${glow}, 0 0 120px ${glow}`,
              `0 0 40px ${glow}, 0 0 80px ${glow}`,
            ],
            rotateY: [0, 2, 0, -2, 0],
          }}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity },
            rotateY: { duration: 6, repeat: Infinity }
          }}
          style={{
            background: '#000000', // SOLID BLACK
            border: `3px solid ${color}`,
            borderRadius: '16px',
            overflow: 'hidden',
            width: '380px',
            position: 'relative',
            zIndex: 100,
            boxShadow: `0 20px 80px rgb(0, 0, 0), inset 0 0 100px rgb(0, 0, 0)`,
          }}
        >
          {/* ANOTHER SOLID BLACK LAYER */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: '#000000',
            zIndex: 10,
          }} />

          {/* HEXAGON GRID - ON BLACK */}
          <motion.div
            animate={{
              backgroundPosition: ['0px 0px', '40px 70px'],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(30deg, ${color}15 12%, #000000 12.5%, #000000 87%, ${color}15 87.5%),
                linear-gradient(150deg, ${color}15 12%, #000000 12.5%, #000000 87%, ${color}15 87.5%)
              `,
              backgroundSize: '40px 70px',
              backgroundColor: '#000000',
              zIndex: 11,
            }}
          />

          {/* SCANLINES - ON BLACK */}
          <motion.div
            animate={{ backgroundPosition: ['0% 0%', '0% 200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: `repeating-linear-gradient(0deg, #000000, #000000 2px, ${color}08 2px, ${color}08 4px)`,
              backgroundColor: '#000000',
              pointerEvents: 'none',
              zIndex: 12,
            }}
          />

          <div style={{ 
            position: 'relative', 
            zIndex: 100,
            background: '#000000',
          }}>
            {loading && (
              <div style={{ padding: '30px', textAlign: 'center', background: '#000000' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: '30px',
                    height: '30px',
                    margin: '0 auto 15px',
                    border: `3px solid ${color}`,
                    borderTop: '3px solid #000000',
                    borderRadius: '50%',
                    filter: `drop-shadow(0 0 15px ${glow})`,
                  }}
                />
                <span style={{
                  color: color,
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textShadow: `0 0 15px ${glow}`,
                }}>
                  LOADING...
                </span>
              </div>
            )}

            {error && !loading && (
              <div style={{ padding: '30px', textAlign: 'center', background: '#000000' }}>
                <span style={{
                  color: '#ff0066',
                  fontSize: '16px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  textShadow: '0 0 20px rgb(255, 0, 102)',
                }}>
                  CONNECTION LOST
                </span>
              </div>
            )}

            {data && !loading && !error && (
              <>
                {/* HEADER */}
                <motion.div
                  initial={{ x: -30 }}
                  animate={{ x: 0 }}
                  style={{
                    padding: '20px',
                    borderBottom: '2px solid #00ffff60',
                    background: '#000000',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <motion.h3
                      animate={{
                        textShadow: [
                          '0 0 15px rgb(0, 255, 255)',
                          '0 0 25px rgb(0, 255, 255)',
                          '0 0 15px rgb(0, 255, 255)',
                        ],
                        x: [0, 2, 0, -2, 0],
                      }}
                      transition={{ 
                        textShadow: { duration: 2, repeat: Infinity },
                        x: { duration: 5, repeat: Infinity }
                      }}
                      style={{
                        color: '#00ffff',
                        fontSize: '20px',
                        fontWeight: 900,
                        margin: 0,
                        letterSpacing: '1px',
                        fontFamily: 'monospace',
                        textTransform: 'uppercase',
                      }}
                    >
                      {data.profileLabel}
                    </motion.h3>
                    
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: '2px solid #00ffff',
                        background: '#000000',
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.8, 1],
                        }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: data.profileActive ? '#00ffff' : '#666',
                          boxShadow: data.profileActive ? '0 0 15px rgb(0, 255, 255)' : 'none',
                        }}
                      />
                      <span style={{
                        color: '#00ffff',
                        fontSize: '11px',
                        fontWeight: 900,
                        fontFamily: 'monospace',
                        letterSpacing: '1px',
                      }}>
                        {data.profileActive ? 'ON' : 'OFF'}
                      </span>
                    </motion.div>
                  </div>

                  <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#00ffff80' }}>
                    ID: {data.profileName}
                  </div>
                </motion.div>

                {/* CONFIG */}
                <motion.div
                  initial={{ x: 30 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    padding: '20px',
                    borderBottom: '2px solid #9d00ff60',
                    background: '#000000',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <span style={{ color: '#666', fontSize: '10px', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>
                        STRATEGY
                      </span>
                      <motion.div
                        animate={{
                          textShadow: [
                            '0 0 10px rgb(157, 0, 255)',
                            '0 0 20px rgb(157, 0, 255)',
                            '0 0 10px rgb(157, 0, 255)',
                          ],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                          color: '#9d00ff',
                          fontSize: '16px',
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          fontFamily: 'monospace',
                        }}
                      >
                        {data.profileStrategy}
                      </motion.div>
                    </div>
                    
                    <div>
                      <span style={{ color: '#666', fontSize: '10px', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>
                        WEIGHT
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <motion.span
                          animate={{ 
                            scale: [1, 1.15, 1],
                            rotate: [0, 5, 0, -5, 0],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{
                            color: '#9d00ff',
                            fontSize: '16px',
                            fontWeight: 900,
                            fontFamily: 'monospace',
                            textShadow: '0 0 12px rgb(157, 0, 255)',
                          }}
                        >
                          {data.profileWeight}
                        </motion.span>
                        <div style={{ flex: 1, height: '6px', background: '#000000', borderRadius: '3px', overflow: 'hidden', border: '1px solid #9d00ff40' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ 
                              width: `${data.profileWeight}%`,
                              boxShadow: [
                                '0 0 10px rgb(157, 0, 255)',
                                '0 0 20px rgb(157, 0, 255)',
                                '0 0 10px rgb(157, 0, 255)',
                              ]
                            }}
                            transition={{ 
                              width: { duration: 1, ease: 'easeOut' },
                              boxShadow: { duration: 2, repeat: Infinity }
                            }}
                            style={{
                              height: '100%',
                              background: '#9d00ff',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* BOUND FORMAT */}
                <motion.div
                  initial={{ y: 30 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ padding: '25px 20px', background: '#000000' }}
                >
                  <motion.div
                    animate={{ 
                      x: [0, 3, 0, -3, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ 
                      fontSize: '12px',
                      fontFamily: 'monospace',
                      fontWeight: 900,
                      letterSpacing: '2px',
                      color: '#00ff00',
                      textShadow: '0 0 12px rgb(0, 255, 0)',
                      marginBottom: '15px',
                      textAlign: 'center',
                    }}
                  >
                    ▸ BOUND FORMAT ▸
                  </motion.div>

                  {data.boundFormats.length > 0 ? (
                    data.boundFormats.slice(0, 1).map((formatName) => {
                      const formatColor = getFormatColor(formatName);
                      return (
                        <motion.div
                          key={formatName}
                          initial={{ opacity: 0, scale: 0.8, rotateX: -25 }}
                          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                          transition={{
                            delay: 0.3,
                            type: 'spring',
                            stiffness: 150,
                          }}
                          style={{
                            padding: '25px 20px',
                            background: '#000000',
                            border: `3px solid ${formatColor.primary}`,
                            borderRadius: '14px',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: `0 0 40px ${formatColor.glow}, inset 0 0 40px rgb(0, 0, 0)`,
                          }}
                        >
                          {/* SOLID BLACK BASE */}
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: '#000000',
                            zIndex: 1,
                          }} />

                          {/* CORNER LIGHTS */}
                          {[
                            { top: '5px', left: '5px', rotate: 0 },
                            { top: '5px', right: '5px', rotate: 90 },
                            { bottom: '5px', right: '5px', rotate: 180 },
                            { bottom: '5px', left: '5px', rotate: 270 }
                          ].map((pos, i) => (
                            <motion.div
                              key={i}
                              animate={{
                                scale: [1, 1.3, 1],
                                rotate: [pos.rotate, pos.rotate + 180, pos.rotate],
                              }}
                              transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                              style={{
                                position: 'absolute',
                                ...pos,
                                width: '12px',
                                height: '12px',
                                background: formatColor.primary,
                                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                                boxShadow: `0 0 15px ${formatColor.glow}`,
                                zIndex: 2,
                              }}
                            />
                          ))}

                          {/* MEGA PARTICLES */}
                          {[...Array(18)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{
                                x: [
                                  Math.random() * 300 - 150,
                                  Math.random() * 300 - 150,
                                  Math.random() * 300 - 150,
                                ],
                                y: [
                                  Math.random() * 150 - 75,
                                  Math.random() * 150 - 75,
                                  Math.random() * 150 - 75,
                                ],
                                scale: [0, 1.2, 1.5, 0],
                              }}
                              transition={{
                                duration: 3 + Math.random() * 2,
                                delay: i * 0.15,
                                repeat: Infinity,
                              }}
                              style={{
                                position: 'absolute',
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: formatColor.primary,
                                boxShadow: `0 0 20px ${formatColor.glow}`,
                                left: '50%',
                                top: '50%',
                                zIndex: 2,
                              }}
                            />
                          ))}

                          {/* FORMAT NAME */}
                          <motion.div
                            animate={{
                              textShadow: [
                                `0 0 25px ${formatColor.glow}, 0 0 50px ${formatColor.glow}`,
                                `0 0 40px ${formatColor.glow}, 0 0 80px ${formatColor.glow}`,
                                `0 0 25px ${formatColor.glow}, 0 0 50px ${formatColor.glow}`,
                              ],
                              scale: [1, 1.05, 1],
                              y: [0, -2, 0, 2, 0],
                            }}
                            transition={{ 
                              textShadow: { duration: 2, repeat: Infinity },
                              scale: { duration: 2, repeat: Infinity },
                              y: { duration: 4, repeat: Infinity }
                            }}
                            style={{
                              color: formatColor.primary,
                              fontSize: '28px',
                              fontWeight: 900,
                              fontFamily: 'monospace',
                              letterSpacing: '2px',
                              textTransform: 'uppercase',
                              textAlign: 'center',
                              marginBottom: '15px',
                              position: 'relative',
                              zIndex: 10,
                            }}
                          >
                            {formatName}
                          </motion.div>

                          {/* LINKED BADGE */}
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                              boxShadow: [
                                `0 0 20px ${formatColor.glow}`,
                                `0 0 35px ${formatColor.glow}`,
                                `0 0 20px ${formatColor.glow}`,
                              ],
                              rotateY: [0, 360],
                            }}
                            transition={{ 
                              scale: { duration: 1.5, repeat: Infinity },
                              boxShadow: { duration: 1.5, repeat: Infinity },
                              rotateY: { duration: 6, repeat: Infinity, ease: 'linear' }
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '10px',
                              padding: '10px 20px',
                              background: '#000000',
                              border: `3px solid ${formatColor.primary}`,
                              borderRadius: '20px',
                              margin: '0 auto',
                              maxWidth: 'fit-content',
                              position: 'relative',
                              zIndex: 10,
                            }}
                          >
                            <motion.div
                              animate={{ 
                                rotate: 360,
                                scale: [1, 1.2, 1],
                              }}
                              transition={{ 
                                rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                                scale: { duration: 1, repeat: Infinity }
                              }}
                              style={{ width: '20px', height: '20px' }}
                            >
                              <div style={{
                                width: '100%',
                                height: '100%',
                                background: formatColor.primary,
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                boxShadow: `0 0 20px ${formatColor.glow}`,
                              }} />
                            </motion.div>
                            <motion.span
                              animate={{
                                letterSpacing: ['2px', '3px', '2px'],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              style={{
                                color: formatColor.primary,
                                fontSize: '16px',
                                fontFamily: 'monospace',
                                fontWeight: 900,
                              }}
                            >
                              LINKED
                            </motion.span>
                          </motion.div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div style={{
                      color: '#666',
                      fontSize: '16px',
                      fontFamily: 'monospace',
                      textAlign: 'center',
                      padding: '30px 0',
                      letterSpacing: '2px',
                    }}>
                      NO LINK
                    </div>
                  )}
                </motion.div>

                {/* BOTTOM GLOW */}
                <motion.div
                  animate={{
                    background: [
                      'linear-gradient(to right, #000000, #00ff00, #000000)',
                      'linear-gradient(to right, #000000, #00ffff, #000000)',
                      'linear-gradient(to right, #000000, #9d00ff, #000000)',
                      'linear-gradient(to right, #000000, #00ff00, #000000)',
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  style={{
                    height: '4px',
                    boxShadow: '0 0 20px rgb(0, 255, 0)',
                  }}
                />
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
