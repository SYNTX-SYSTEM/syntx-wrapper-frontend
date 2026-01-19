"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { getWrapperColor } from '@/lib/colorUtils';

interface SemanticConstellationProps {
  data: Array<{
    name: string;
    value: number;
    fullName: string;
  }>;
}

export function SemanticConstellation({ data }: SemanticConstellationProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="100%" height="100%" viewBox="0 0 300 300">
        <defs>
          {data.map((entry, i) => {
            const color = getWrapperColor(entry.fullName);
            return (
              <radialGradient key={`planet-${i}`} id={`planetGrad-${i}`}>
                <stop offset="0%" stopColor={color} stopOpacity="1"/>
                <stop offset="100%" stopColor={color} stopOpacity="0.3"/>
              </radialGradient>
            );
          })}
        </defs>

        {/* Central Core */}
        <motion.circle
          cx="150"
          cy="150"
          r="20"
          fill="url(#coreGrad)"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <defs>
          <radialGradient id="coreGrad">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="1"/>
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0.5"/>
          </radialGradient>
        </defs>

        {/* Planets (Wrappers) */}
        {data.map((entry, i) => {
          const angle = (i / data.length) * 2 * Math.PI;
          const radius = 80;
          const size = 10 + (entry.value / total) * 30;
          const x = 150 + radius * Math.cos(angle);
          const y = 150 + radius * Math.sin(angle);
          const color = getWrapperColor(entry.fullName);

          return (
            <g key={i}>
              {/* Orbit Line */}
              <motion.line
                x1="150"
                y1="150"
                x2={x}
                y2={y}
                stroke={color}
                strokeWidth="1"
                strokeDasharray="3 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1,
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ 
                  pathLength: { duration: 1, delay: i * 0.1 },
                  opacity: { duration: 2, repeat: Infinity }
                }}
              />

              {/* Planet */}
              <motion.circle
                cx={x}
                cy={y}
                r={size}
                fill={`url(#planetGrad-${i})`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1,
                  opacity: 1,
                  cx: [x, x + 5, x],
                  cy: [y, y - 5, y]
                }}
                transition={{
                  scale: { duration: 0.5, delay: i * 0.1 },
                  cx: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                  cy: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                  filter: `drop-shadow(0 0 10px ${color})`,
                  cursor: 'pointer'
                }}
              />

              {/* Label */}
              <motion.text
                x={x}
                y={y + size + 15}
                textAnchor="middle"
                fill={color}
                fontSize="10"
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {entry.name}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
