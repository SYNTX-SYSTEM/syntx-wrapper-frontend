"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function NebularHeader() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, type: "spring" }}
      style={{ 
        marginBottom: 40, 
        textAlign: 'center',
        position: 'relative',
        padding: '40px 0'
      }}
    >
      {/* Nebula Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 30% 50%, rgba(0,212,255,0.2), transparent 50%)',
              'radial-gradient(circle at 70% 50%, rgba(217,70,239,0.2), transparent 50%)',
              'radial-gradient(circle at 30% 50%, rgba(0,212,255,0.2), transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            position: 'absolute',
            width: '200%',
            height: '200%',
            top: '-50%',
            left: '-50%'
          }}
        />
      </div>

      {/* Title with Logo */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 40,
        position: 'relative',
        zIndex: 2
      }}>
        {/* Left Wave */}
        <motion.span
          animate={{ 
            textShadow: [
              '0 0 20px #00d4ff80, 0 0 40px #00d4ff40',
              '0 0 40px #00d4ff, 0 0 60px #00d4ff80',
              '0 0 20px #00d4ff80, 0 0 40px #00d4ff40'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            fontSize: 42,
            fontWeight: 700,
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          🌊 SYNTX
        </motion.span>

        {/* Central Logo Orb */}
        <div style={{ position: 'relative', width: 100, height: 100 }}>
          {/* Outer Glow Rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              animate={{
                scale: [1, 2.5 + i, 3.5 + i],
                opacity: [0.5, 0.2, 0],
                rotate: [0, 180]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.2,
                ease: "easeOut"
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 100,
                height: 100,
                borderRadius: '50%',
                border: `2px solid ${i % 2 === 0 ? '#00d4ff' : '#d946ef'}`,
                pointerEvents: 'none'
              }}
            />
          ))}

          {/* Rotating Nebula Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              inset: -20,
              background: 'conic-gradient(from 0deg, transparent 0%, #00d4ff40 25%, transparent 50%, #d946ef40 75%, transparent 100%)',
              borderRadius: '50%',
              filter: 'blur(10px)'
            }}
          />

          {/* Main Logo */}
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{
              scale: 1.15,
              transition: { duration: 0.3, type: "spring", stiffness: 300 }
            }}
            style={{
              position: 'relative',
              width: 100,
              height: 100,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid rgba(0,212,255,0.8)',
              background: 'rgba(10, 26, 46, 0.95)',
              cursor: 'pointer',
              boxShadow: '0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(217,70,239,0.4), inset 0 0 30px rgba(0,212,255,0.2)'
            }}
          >
            <Image
              src="/logo_original.png"
              alt="SYNTX"
              width={100}
              height={100}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* Scanning Light */}
            <motion.div
              animate={{ 
                rotate: 360,
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                opacity: { duration: 2, repeat: Infinity }
              }}
              style={{
                position: 'absolute',
                top: -50,
                left: -50,
                right: -50,
                bottom: -50,
                background: 'linear-gradient(90deg, transparent 40%, rgba(0,212,255,0.6) 50%, transparent 60%)',
                pointerEvents: 'none'
              }}
            />
          </motion.div>

          {/* Particle Burst */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * 2 * Math.PI;
            return (
              <motion.div
                key={`particle-${i}`}
                animate={{
                  x: [0, Math.cos(angle) * 60, 0],
                  y: [0, Math.sin(angle) * 60, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: i % 2 === 0 ? '#00d4ff' : '#d946ef',
                  boxShadow: `0 0 10px ${i % 2 === 0 ? '#00d4ff' : '#d946ef'}`,
                  pointerEvents: 'none'
                }}
              />
            );
          })}
        </div>

        {/* Right Wave */}
        <motion.span
          animate={{ 
            textShadow: [
              '0 0 20px #d946ef80, 0 0 40px #d946ef40',
              '0 0 40px #d946ef, 0 0 60px #d946ef80',
              '0 0 20px #d946ef80, 0 0 40px #d946ef40'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          style={{
            fontSize: 42,
            fontWeight: 700,
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            background: 'linear-gradient(135deg, #d946ef, #9933cc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          NEURAL FIELD 🌊
        </motion.span>
      </div>

      {/* Subtitle with Energy Line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: 20, position: 'relative', zIndex: 2 }}
      >
        <motion.div
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, #00d4ff, #d946ef, transparent)',
            marginBottom: 10,
            transformOrigin: 'center'
          }}
        />
        <p style={{ 
          fontSize: 13, 
          color: 'rgba(255,255,255,0.6)',
          fontFamily: 'monospace',
          margin: 0,
          textShadow: '0 0 10px rgba(0,212,255,0.3)'
        }}>
          Real-Time Data Organism • Live Stream Analytics
        </p>
      </motion.div>
    </motion.div>
  );
}
