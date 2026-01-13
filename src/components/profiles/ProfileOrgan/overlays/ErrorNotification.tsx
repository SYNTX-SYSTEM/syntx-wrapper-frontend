'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ErrorNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function ErrorNotification({ message, isVisible, onClose }: ErrorNotificationProps) {
  const [pixels, setPixels] = useState<Array<{ x: number; y: number; vx: number; vy: number }>>([]);

  useEffect(() => {
    if (!isVisible) return;

    // AUTO CLOSE AFTER 5 SECONDS
    const timer = setTimeout(() => {
      // GENERATE PIXELS FOR DISSOLUTION
      const newPixels = Array.from({ length: 50 }, (_, i) => ({
        x: Math.random() * 400,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
      }));
      setPixels(newPixels);
      
      setTimeout(onClose, 1000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 99999,
            maxWidth: 400,
            pointerEvents: 'none',
          }}
        >
          {/* MAIN ERROR BOX */}
          <motion.div
            animate={pixels.length > 0 ? { opacity: 0 } : {}}
            style={{
              background: 'linear-gradient(135deg, rgba(255,0,100,0.95), rgba(200,0,80,0.9))',
              border: '3px solid rgba(255,0,100,0.8)',
              borderRadius: '16px',
              padding: '20px 24px',
              boxShadow: '0 0 40px rgba(255,0,100,0.6), inset 0 0 20px rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* ANIMATED BORDER GLOW */}
            <motion.div
              animate={{ 
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  '0 0 20px rgba(255,0,100,0.5)',
                  '0 0 40px rgba(255,0,100,0.9)',
                  '0 0 20px rgba(255,0,100,0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                inset: -3,
                borderRadius: '16px',
                border: '3px solid rgba(255,0,100,0.8)',
                pointerEvents: 'none',
              }}
            />

            {/* HEADER */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 12,
              position: 'relative',
              zIndex: 1,
            }}>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{
                  fontSize: '24px',
                  filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))',
                }}
              >
                ⚠️
              </motion.div>
              <div style={{
                color: '#fff',
                fontSize: '18px',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                textShadow: '0 0 10px rgba(255,255,255,0.8)',
                letterSpacing: '1px',
              }}>
                BINDING ERROR
              </div>
            </div>

            {/* MESSAGE */}
            <div style={{
              color: '#fff',
              fontSize: '14px',
              fontFamily: 'monospace',
              lineHeight: 1.6,
              textShadow: '0 0 5px rgba(255,255,255,0.5)',
              position: 'relative',
              zIndex: 1,
            }}>
              {message}
            </div>

            {/* GLITCH LINES */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: ['-100%', '200%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: 'linear',
                }}
                style={{
                  position: 'absolute',
                  top: 20 + i * 30,
                  left: 0,
                  width: '100%',
                  height: 2,
                  background: 'rgba(255,255,255,0.5)',
                  filter: 'blur(1px)',
                }}
              />
            ))}
          </motion.div>

          {/* PIXEL DISSOLUTION */}
          {pixels.map((pixel, i) => (
            <motion.div
              key={i}
              initial={{ x: pixel.x, y: pixel.y, opacity: 1, scale: 1 }}
              animate={{
                x: pixel.x + pixel.vx * 100,
                y: pixel.y + pixel.vy * 100,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: 4,
                height: 4,
                background: i % 2 === 0 ? '#ff0064' : '#fff',
                borderRadius: '50%',
                boxShadow: `0 0 8px ${i % 2 === 0 ? '#ff0064' : '#fff'}`,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
