"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function SyntxLogo() {
  return (
    <div style={{
      position: 'absolute',
      top: "50%",
      left: "50%", transform: "translate(-50%, -50%)",
      zIndex: 5
    }}>
      {/* Outer Echo Rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`echo-${i}`}
          initial={{ scale: 1, opacity: 0 }}
          animate={{
            scale: [1, 2 + i * 0.5, 3 + i],
            opacity: [0.6, 0.3, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: '2px solid #00d4ff',
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* Glow Layer */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 60px #00d4ff',
            '0 0 30px #d946ef, 0 0 60px #d946ef, 0 0 90px #d946ef',
            '0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 60px #00d4ff'
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.3), transparent)',
          pointerEvents: 'none'
        }}
      />

      {/* Logo Container */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: 1, 
          rotate: 0,
          y: [0, -3, 0]
        }}
        transition={{
          scale: { duration: 0.8, type: "spring", stiffness: 200 },
          rotate: { duration: 0.8 },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{
          scale: 1.1,
          rotate: [0, 5, -5, 0],
          transition: { duration: 0.5 }
        }}
        style={{
          position: 'relative',
          width: 60,
          height: 60,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid #00d4ff',
          background: 'rgba(10, 26, 46, 0.9)',
          cursor: 'pointer',
          boxShadow: '0 0 30px rgba(0,212,255,0.5), inset 0 0 20px rgba(0,212,255,0.2)'
        }}
      >
        <Image
          src="/logo_original.png"
          alt="SYNTX"
          width={60}
          height={60}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* Rotating Highlight */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            top: -10,
            left: -10,
            right: -10,
            bottom: -10,
            background: 'linear-gradient(45deg, transparent 30%, rgba(0,212,255,0.4) 50%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />
      </motion.div>

      {/* Particle Burst on Hover */}
      <motion.div
        whileHover="burst"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      >
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * 2 * Math.PI;
          return (
            <motion.div
              key={`particle-${i}`}
              variants={{
                burst: {
                  x: Math.cos(angle) * 40,
                  y: Math.sin(angle) * 40,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }
              }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'absolute',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: '#00d4ff',
                boxShadow: '0 0 10px #00d4ff'
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
