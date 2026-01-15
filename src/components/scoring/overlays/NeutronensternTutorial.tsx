'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface NeutronensternTutorialProps {
  autoShow?: boolean;
}

export default function NeutronensternTutorial({ autoShow = true }: NeutronensternTutorialProps) {
  const [visible, setVisible] = useState(autoShow);
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!autoShow) return;
    
    const timer = setTimeout(() => {
      setVisible(false);
    }, 20000);
    
    return () => clearTimeout(timer);
  }, [autoShow]);
  
  const steps = [
    {
      title: "🌟 NEUTRONENSTERN-ANLEITUNG",
      text: "Ich bin ein Neutronenstern und zeige dir, wie SYNTX Scoring funktioniert!",
      position: { top: '20%', left: '50%' }
    },
    {
      title: "🖱️ MAUSRAD = ÄUSSERER RING",
      text: "Scroll UP → Äußerster Ring wächst | Scroll DOWN → Äußerster Ring schrumpft",
      position: { top: '30%', right: '25%' }
    },
    {
      title: "🌍 PLANET-CLICK",
      text: "Click auf Planet → Äußerster Component weight++ | Double-Click → Innerster Component weight++",
      position: { top: '50%', left: '50%' }
    },
    {
      title: "⚖️ AUTO-BALANCE",
      text: "Andere Components passen sich automatisch an. Sum bleibt immer 1.000!",
      position: { bottom: '25%', left: '50%' }
    }
  ];
  
  const currentStep = steps[step % steps.length];
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            pointerEvents: 'none',
          }}
        >
          <motion.div
            animate={{
              ...currentStep.position,
              rotate: [0, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              left: { duration: 1.5, ease: 'easeOut' },
              right: { duration: 1.5, ease: 'easeOut' },
              top: { duration: 1.5, ease: 'easeOut' },
              bottom: { duration: 1.5, ease: 'easeOut' },
            }}
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #ffffff, #00d4ff, #9d00ff)',
              boxShadow: '0 0 40px rgba(255,255,255,1), 0 0 80px rgba(0,212,255,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
            }}
          >
            ⭐
          </motion.div>
          
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              ...currentStep.position,
              transform: currentStep.position.left === '50%' 
                ? 'translate(-50%, calc(-50% + 80px))' 
                : currentStep.position.right 
                  ? 'translate(50%, calc(-50% + 80px))'
                  : 'translate(-50%, calc(-50% + 80px))',
              background: 'rgba(0,0,0,0.95)',
              border: '3px solid #00d4ff',
              borderRadius: '20px',
              padding: '16px 24px',
              maxWidth: '380px',
              boxShadow: '0 0 30px rgba(0,212,255,0.6)',
              pointerEvents: 'auto',
            }}
          >
            <div style={{
              color: '#00d4ff',
              fontSize: '14px',
              fontFamily: 'monospace',
              fontWeight: 900,
              marginBottom: '8px',
              textShadow: '0 0 10px rgba(0,212,255,1)',
            }}>
              {currentStep.title}
            </div>
            
            <div style={{
              color: '#ffffff',
              fontSize: '12px',
              fontFamily: 'monospace',
              lineHeight: '1.6',
              marginBottom: '12px',
            }}>
              {currentStep.text}
            </div>
            
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <button
                onClick={() => setStep((s) => (s - 1 + steps.length) % steps.length)}
                style={{
                  background: 'rgba(0,212,255,0.2)',
                  border: '2px solid #00d4ff',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  color: '#00d4ff',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                ← ZURÜCK
              </button>
              
              <div style={{
                color: '#00d4ff',
                fontSize: '10px',
                fontFamily: 'monospace',
              }}>
                {step + 1} / {steps.length}
              </div>
              
              <button
                onClick={() => setStep((s) => (s + 1) % steps.length)}
                style={{
                  background: 'rgba(0,212,255,0.2)',
                  border: '2px solid #00d4ff',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  color: '#00d4ff',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                WEITER →
              </button>
            </div>
            
            <button
              onClick={() => setVisible(false)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'transparent',
                border: 'none',
                color: '#ff3355',
                fontSize: '16px',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
