'use client';

import { motion } from 'framer-motion';
import { useScoringStore } from '../store';

interface ProfilePlanetProps {
  profile: any;
}

export default function ProfilePlanet({ profile }: ProfilePlanetProps) {
  const coherence = useScoringStore((state) => state.coherence);
  const instability = useScoringStore((state) => state.instability);
  const nextProfile = useScoringStore((state) => state.nextProfile);
  const prevProfile = useScoringStore((state) => state.prevProfile);
  
  const pulseRate = 1.6 - (profile.weight / 100) * 0.4;
  const isStable = instability < 0.1;
  const componentsCount = Object.keys(profile.components || {}).length;
  
  return (
    <div 
      onClick={nextProfile}
      onDoubleClick={(e) => {
        e.stopPropagation();
        prevProfile();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      <div style={{
        position: 'relative',
        width: 180,
        height: 180,
        cursor: 'pointer',
        pointerEvents: 'auto',
      }}>
        {/* AURA */}
        <motion.div
          animate={{
            opacity: isStable ? [0.4, 0.6, 0.4] : [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${isStable ? 'rgba(0,255,136,0.2)' : 'rgba(255,204,0,0.2)'}, transparent 70%)`,
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />
        
        {/* MANTEL */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `
              radial-gradient(circle at 25% 25%, rgba(157,0,255,0.6), transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(0,212,255,0.5), transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(157,0,255,0.4), transparent 70%)
            `,
            opacity: 0.6,
            pointerEvents: 'none',
          }}
        />
        
        {/* KERN */}
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{
            duration: pulseRate,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1]
          }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 30%, rgba(157,0,255,1), rgba(0,212,255,0.8), rgba(10,14,39,0.95))`,
            border: `3px solid ${isStable ? 'rgba(0,255,136,0.8)' : 'rgba(255,204,0,0.8)'}`,
            boxShadow: `
              0 0 40px ${isStable ? 'rgba(0,255,136,0.6)' : 'rgba(255,204,0,0.6)'},
              0 0 80px ${isStable ? 'rgba(0,255,136,0.3)' : 'rgba(255,204,0,0.3)'},
              inset 0 0 40px rgba(157,0,255,0.4)
            `,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <div style={{
            color: '#ffffff',
            fontSize: '16px',
            fontFamily: 'monospace',
            fontWeight: 900,
            textShadow: '0 0 15px rgba(255,255,255,1), 0 0 30px rgba(157,0,255,0.8)',
            textAlign: 'center',
            letterSpacing: '1px',
            lineHeight: '1.2',
            maxWidth: '140px',
          }}>
            {profile.label || profile.name}
          </div>
          
          <div style={{
            color: '#00d4ff',
            fontSize: '10px',
            fontFamily: 'monospace',
            fontWeight: 700,
            textShadow: '0 0 10px rgba(0,212,255,1)',
            textAlign: 'center',
            opacity: 0.9,
            maxWidth: '150px',
          }}>
            {profile.strategy}
          </div>
          
          <div style={{
            display: 'flex',
            gap: '10px',
            marginTop: '4px',
          }}>
            <div style={{
              background: 'rgba(0,0,0,0.8)',
              padding: '3px 8px',
              borderRadius: '10px',
              border: '1px solid rgba(157,0,255,0.6)',
              color: '#9d00ff',
              fontSize: '8px',
              fontFamily: 'monospace',
              fontWeight: 700,
            }}>
              W: {profile.weight}
            </div>
            
            <div style={{
              background: 'rgba(0,0,0,0.8)',
              padding: '3px 8px',
              borderRadius: '10px',
              border: '1px solid rgba(0,212,255,0.6)',
              color: '#00d4ff',
              fontSize: '8px',
              fontFamily: 'monospace',
              fontWeight: 700,
            }}>
              C: {componentsCount}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
