"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface Connection {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
}

export function SynapticConnections() {
  const connections: Connection[] = [
    { id: 'c1', from: { x: 15, y: 20 }, to: { x: 35, y: 20 }, color: '#00d4ff' },
    { id: 'c2', from: { x: 65, y: 20 }, to: { x: 85, y: 20 }, color: '#d946ef' },
    { id: 'c3', from: { x: 25, y: 45 }, to: { x: 50, y: 60 }, color: '#10b981' },
    { id: 'c4', from: { x: 75, y: 45 }, to: { x: 50, y: 60 }, color: '#f59e0b' },
  ];

  return (
    <svg 
      width="100%" 
      height="100%" 
      style={{ 
        position: 'absolute', 
        inset: 0, 
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      <defs>
        {connections.map((conn) => (
          <linearGradient key={`grad-${conn.id}`} id={`connGrad-${conn.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={conn.color} stopOpacity="0"/>
            <stop offset="50%" stopColor={conn.color} stopOpacity="0.8"/>
            <stop offset="100%" stopColor={conn.color} stopOpacity="0"/>
          </linearGradient>
        ))}
      </defs>

      {connections.map((conn) => (
        <g key={conn.id}>
          <motion.line
            x1={`${conn.from.x}%`}
            y1={`${conn.from.y}%`}
            x2={`${conn.to.x}%`}
            y2={`${conn.to.y}%`}
            stroke={`url(#connGrad-${conn.id})`}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: [0, 1],
              opacity: [0, 0.6, 0.6, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1]
            }}
          />
          
          {/* Particle Flow */}
          <motion.circle
            r="3"
            fill={conn.color}
            initial={{ 
              cx: `${conn.from.x}%`,
              cy: `${conn.from.y}%`,
              opacity: 0 
            }}
            animate={{
              cx: [`${conn.from.x}%`, `${conn.to.x}%`],
              cy: [`${conn.from.y}%`, `${conn.to.y}%`],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random()
            }}
            style={{
              filter: `drop-shadow(0 0 6px ${conn.color})`
            }}
          />
        </g>
      ))}
    </svg>
  );
}
