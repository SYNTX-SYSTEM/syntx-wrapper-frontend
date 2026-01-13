'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFormatColor, getProfileColor } from '@/lib/tooltips';

interface BindingSuccessNotificationProps {
  isVisible: boolean;
  profileId: string;
  profileLabel: string;
  profileStrategy: string;
  formatName: string;
  onComplete: () => void;
}

export default function BindingSuccessNotification({
  isVisible,
  profileId,
  profileLabel,
  profileStrategy,
  formatName,
  onComplete,
}: BindingSuccessNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onComplete, 4000); // Auto-hide after 4s
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  const profileColor = getProfileColor(profileStrategy);
  const formatColor = getFormatColor(formatName);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: -100 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          zIndex: 999999,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={{
            boxShadow: [
              `0 0 60px ${formatColor.glow}, 0 0 120px ${profileColor.glow}`,
              `0 0 100px ${formatColor.glow}, 0 0 200px ${profileColor.glow}`,
              `0 0 60px ${formatColor.glow}, 0 0 120px ${profileColor.glow}`,
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(0,20,40,0.95))',
            backdropFilter: 'blur(30px)',
            border: `3px solid ${formatColor.primary}`,
            borderRadius: '24px',
            padding: '32px 40px',
            minWidth: '500px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* HEXAGON GRID */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(30deg, ${formatColor.primary}10 12%, transparent 12.5%, transparent 87%, ${formatColor.primary}10 87.5%),
              linear-gradient(150deg, ${formatColor.primary}10 12%, transparent 12.5%, transparent 87%, ${formatColor.primary}10 87.5%)
            `,
            backgroundSize: '30px 52px',
            opacity: 0.5,
          }} />

          {/* SUCCESS HEADER */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              textAlign: 'center',
              marginBottom: '24px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div
              animate={{
                textShadow: [
                  `0 0 20px #00ff00, 0 0 40px #00ff00`,
                  `0 0 40px #00ff00, 0 0 80px #00ff00`,
                  `0 0 20px #00ff00, 0 0 40px #00ff00`,
                ]
              }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                color: '#00ff00',
                fontSize: '24px',
                fontWeight: 900,
                fontFamily: 'monospace',
                letterSpacing: '4px',
              }}
            >
              ⚡ BINDING SUCCESS ⚡
            </motion.div>
          </motion.div>

          {/* MOLECULE ANIMATION */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            marginBottom: '24px',
            position: 'relative',
            height: '120px',
          }}>
            {/* PROFILE ATOM */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ position: 'relative' }}
            >
              {/* ORBITS */}
              {[0, 60, 120].map((rotation, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: rotation + 360 }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    width: '80px',
                    height: '80px',
                    border: `2px solid ${profileColor.primary}40`,
                    borderRadius: '50%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
              
              {/* NUCLEUS */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    `0 0 30px ${profileColor.glow}`,
                    `0 0 60px ${profileColor.glow}`,
                    `0 0 30px ${profileColor.glow}`,
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: profileColor.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 900,
                  fontFamily: 'monospace',
                  color: '#000',
                  position: 'relative',
                }}
              >
                P
              </motion.div>
            </motion.div>

            {/* CONNECTION LINE */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{
                width: '80px',
                height: '4px',
                background: `linear-gradient(to right, ${profileColor.primary}, ${formatColor.primary})`,
                position: 'relative',
              }}
            >
              {/* PARTICLES TRAVELING */}
              {[0, 0.5, 1].map((delay) => (
                <motion.div
                  key={delay}
                  animate={{
                    x: [-10, 90],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 1.2 + delay,
                    repeat: Infinity,
                  }}
                  style={{
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: '0 0 15px #fff',
                    top: '-2px',
                  }}
                />
              ))}
            </motion.div>

            {/* FORMAT ATOM */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ position: 'relative' }}
            >
              {/* ORBITS */}
              {[0, 60, 120].map((rotation, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: rotation - 360 }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    width: '80px',
                    height: '80px',
                    border: `2px solid ${formatColor.primary}40`,
                    borderRadius: '50%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
              
              {/* NUCLEUS */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    `0 0 30px ${formatColor.glow}`,
                    `0 0 60px ${formatColor.glow}`,
                    `0 0 30px ${formatColor.glow}`,
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: formatColor.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 900,
                  fontFamily: 'monospace',
                  color: '#000',
                  position: 'relative',
                }}
              >
                F
              </motion.div>
            </motion.div>
          </div>

          {/* NAMES */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <motion.span
                animate={{
                  textShadow: [
                    `0 0 10px ${profileColor.glow}`,
                    `0 0 20px ${profileColor.glow}`,
                    `0 0 10px ${profileColor.glow}`,
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  color: profileColor.primary,
                  fontSize: '18px',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  letterSpacing: '2px',
                }}
              >
                {profileLabel}
              </motion.span>
              
              <span style={{ color: '#666', fontSize: '18px' }}>⟷</span>
              
              <motion.span
                animate={{
                  textShadow: [
                    `0 0 10px ${formatColor.glow}`,
                    `0 0 20px ${formatColor.glow}`,
                    `0 0 10px ${formatColor.glow}`,
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  color: formatColor.primary,
                  fontSize: '18px',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  letterSpacing: '2px',
                }}
              >
                {formatName}
              </motion.span>
            </div>

            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                textAlign: 'center',
                color: '#00ff00',
                fontSize: '14px',
                fontFamily: 'monospace',
                letterSpacing: '2px',
                textShadow: '0 0 10px #00ff00',
              }}
            >
              ▸ NEURAL LINK ESTABLISHED ▸
            </motion.div>
          </motion.div>

          {/* BOTTOM GLOW */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(to right, transparent, ${formatColor.primary}, ${profileColor.primary}, transparent)`,
              boxShadow: `0 0 20px ${formatColor.glow}`,
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
