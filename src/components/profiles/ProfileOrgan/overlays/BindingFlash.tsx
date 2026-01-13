'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface BindingFlashProps {
  isVisible: boolean;
  message: string;
}

export default function BindingFlash({ isVisible, message }: BindingFlashProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* WHITE FLASH */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'white',
              zIndex: 9999,
              pointerEvents: 'none',
            }}
          />
          
          {/* MESSAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1.2, 1.2, 1], y: [0, 0, 0, -100] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#00d4ff',
              fontSize: '48px',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              textShadow: '0 0 30px rgba(0,212,255,1), 0 0 60px rgba(0,212,255,0.8)',
              zIndex: 10000,
              pointerEvents: 'none',
            }}
          >
            {message}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
