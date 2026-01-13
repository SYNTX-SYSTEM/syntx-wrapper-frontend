'use client';

import { useOrganStore } from '../store';
import { motion } from 'framer-motion';

export default function BindingLayer() {
  const snapshot = useOrganStore((state) => state.snapshot);
  const nodes = useOrganStore((state) => state.nodes);
  const hoverProfileId = useOrganStore((state) => state.hoverProfileId);
  const hoverFormatName = useOrganStore((state) => state.hoverFormatName);

  if (!snapshot) return null;

  const getFormatPosition = (name: string, total: number, index: number) => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;
    const angle = (index / total) * Math.PI * 2;
    const radius = Math.min(w, h) * 0.45;
    return { x: w / 2 + Math.cos(angle) * radius, y: h / 2 + Math.sin(angle) * radius };
  };

  return (
    <svg style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
      {snapshot.bindings.map((binding, idx) => {
        const profileNode = nodes[binding.profileId];
        const formatIndex = snapshot.formats.findIndex(f => f.name === binding.formatName);
        if (!profileNode || formatIndex === -1) return null;

        const formatPos = getFormatPosition(binding.formatName, snapshot.formats.length, formatIndex);
        
        const isProfileHovered = hoverProfileId === binding.profileId;
        const isFormatHovered = hoverFormatName === binding.formatName;
        const isActive = isProfileHovered || isFormatHovered;

        return (
          <motion.g key={`${binding.profileId}-${binding.formatName}`}>
            {/* PULSING STREAM */}
            <motion.line
              x1={profileNode.position.x}
              y1={profileNode.position.y}
              x2={formatPos.x}
              y2={formatPos.y}
              stroke="url(#bindingGradient)"
              strokeWidth={isActive ? 3 : 1.5}
              strokeDasharray="8 4"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isActive ? 0.8 : 0.3,
                strokeDashoffset: [0, -24]
              }}
              transition={{ 
                opacity: { duration: 0.3 },
                strokeDashoffset: { duration: 2, repeat: Infinity, ease: 'linear' }
              }}
            />
            
            {/* ENERGY PARTICLES */}
            {isActive && [0, 0.5].map((offset) => (
              <motion.circle
                key={offset}
                r={4}
                fill="#00d4ff"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{
                  cx: [profileNode.position.x, formatPos.x],
                  cy: [profileNode.position.y, formatPos.y],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: offset * 2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </motion.g>
        );
      })}
      
      <defs>
        <linearGradient id="bindingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#9d00ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
