"use client";
import React from 'react';
import { motion } from 'framer-motion';

export function NeuralBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Galaxy Particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50]
          }}
          transition={{ 
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${['#00d4ff', '#d946ef', '#10b981'][i % 3]}, transparent)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 ${4 + Math.random() * 8}px ${['#00d4ff', '#d946ef', '#10b981'][i % 3]}`,
          }}
        />
      ))}
      
      {/* Flowing Light Streams */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.15 }}>
        <defs>
          <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0"/>
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={`stream-${i}`}
            d={`M ${i * 20} 0 Q ${50 + i * 20} ${50 + i * 10}, ${100 + i * 20} 100`}
            stroke="url(#streamGrad)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
          />
        ))}
      </svg>
      
      {/* Grid Overlay */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.03 }}>
        <defs>
          <pattern id="neuralGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00d4ff" strokeWidth="0.5"/>
            <circle cx="0" cy="0" r="1.5" fill="#00d4ff"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neuralGrid)" />
      </svg>
    </div>
  );
}
