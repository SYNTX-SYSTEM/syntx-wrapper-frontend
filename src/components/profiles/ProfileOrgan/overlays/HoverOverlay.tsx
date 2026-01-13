'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface HoverOverlayProps {
  isVisible: boolean;
  position: { x: number; y: number };
  formatName: string | null;
}

export default function HoverOverlay({ isVisible, position, formatName }: HoverOverlayProps) {
  // EARLY RETURN - NO LOGGING, NO RENDER
  if (!isVisible || !formatName) {
    return null;
  }

  console.log('✅ HoverOverlay rendering!', { formatName });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed',
          left: position.x + 20,
          top: position.y + 20,
          zIndex: 99999,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.95)',
            border: '2px solid #00ffff',
            borderRadius: '12px',
            padding: '20px',
            minWidth: '300px',
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)',
          }}
        >
          <h3 style={{ color: '#00ffff', fontSize: '18px', marginBottom: '10px' }}>
            {formatName}
          </h3>
          <p style={{ color: '#ffffff', fontSize: '14px' }}>
            Format Station
          </p>
          <p style={{ color: '#888', fontSize: '12px', marginTop: '10px' }}>
            Position: {position.x}, {position.y}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
