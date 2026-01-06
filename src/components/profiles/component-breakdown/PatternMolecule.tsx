"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  term: string;
  frequency: number;
  intensity: number;
  group: 'motion_cluster' | 'energy_cluster' | 'feedback_cluster' | 'precision_cluster';
  contribution: number;
  index: number;
  onMirror: (term: string) => void;
}

const CLUSTER_CONFIG = {
  motion_cluster: {
    gradient: 'from-cyan-400 via-blue-500 to-cyan-600',
    glowColor: 'rgba(6, 182, 212, 0.6)',
    icon: '🌀',
    name: 'MOTION',
    particleColor: '#06b6d4'
  },
  energy_cluster: {
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    glowColor: 'rgba(249, 115, 22, 0.6)',
    icon: '⚡',
    name: 'ENERGY',
    particleColor: '#f97316'
  },
  feedback_cluster: {
    gradient: 'from-purple-400 via-pink-500 to-purple-600',
    glowColor: 'rgba(168, 85, 247, 0.6)',
    icon: '🔄',
    name: 'FEEDBACK',
    particleColor: '#a855f7'
  },
  precision_cluster: {
    gradient: 'from-green-400 via-emerald-500 to-green-600',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    icon: '🎯',
    name: 'PRECISION',
    particleColor: '#10b981'
  }
};

export default function PatternMolecule({ term, frequency, intensity, group, contribution, index, onMirror }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const config = CLUSTER_CONFIG[group];

  const particles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    angle: (360 / 8) * i,
    distance: 70
  }));

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={{ 
        scale: 1, 
        rotate: 0,
        opacity: 1,
        y: [0, -10, 0]
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.06,
        y: {
          repeat: Infinity,
          duration: 3 + (index * 0.2),
          ease: "easeInOut"
        }
      }}
      whileHover={{ 
        scale: 1.15,
        rotate: [0, -3, 3, 0],
        transition: { duration: 0.4 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ 
        position: 'relative',
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* ORBIT PARTICLES */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          animate={{
            rotate: isHovered ? 360 : 0,
            opacity: isHovered ? 1 : 0.4
          }}
          transition={{
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            },
            opacity: { duration: 0.3 }
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: config.particleColor,
            boxShadow: `0 0 8px ${config.particleColor}`,
            transform: `translate(-50%, -50%) rotate(${particle.angle}deg) translateX(${particle.distance}px)`,
            zIndex: -1
          }}
        />
      ))}

      {/* PULSING GLOW */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          opacity: isHovered ? [0.3, 0.6, 0.3] : 0.2
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 70%)`,
          filter: 'blur(20px)',
          zIndex: -1
        }}
      />

      {/* MAIN CARD - BIGGER! 120x120 */}
      <motion.div
        className="relative rounded-2xl border overflow-hidden"
        animate={{
          rotateY: isHovered ? [0, 10, 0] : 0,
          rotateX: isHovered ? [0, 10, 0] : 0
        }}
        transition={{ duration: 0.6 }}
        style={{
          width: 120,
          height: 120,
          background: `linear-gradient(135deg, ${config.glowColor}, rgba(0,0,0,0.5))`,
          borderColor: 'rgba(255,255,255,0.3)',
          boxShadow: isHovered 
            ? `0 0 30px ${config.glowColor}, 0 0 50px ${config.glowColor}`
            : `0 0 20px ${config.glowColor}`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* SCAN LINE */}
        <motion.div
          className="absolute inset-0"
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)',
            height: '20%',
            pointerEvents: 'none'
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-3">
          {/* ICON - BIGGER */}
          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? [1, 1.2, 1] : 1
            }}
            transition={{
              rotate: { duration: 2, ease: "easeInOut" },
              scale: { duration: 0.6, repeat: isHovered ? Infinity : 0 }
            }}
            style={{ fontSize: 40, marginBottom: 6 }}
          >
            {config.icon}
          </motion.div>

          {/* TERM - READABLE! */}
          <div 
            className="text-white font-bold text-center font-mono tracking-wider"
            style={{ fontSize: 13, lineHeight: 1.1, marginBottom: 4 }}
          >
            {term}
          </div>

          {/* STATS - BIGGER */}
          <div className="text-[11px] text-white/80 font-mono font-bold">
            {frequency}%
          </div>

          {/* CLUSTER BADGE */}
          <div className="mt-2">
            <span 
              className="text-[7px] px-2 py-1 rounded-full font-mono tracking-widest font-bold"
              style={{
                background: 'rgba(0,0,0,0.5)',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              {config.name}
            </span>
          </div>
        </div>

        {/* CORNER ACCENT */}
        <div 
          className="absolute top-0 right-0 w-10 h-10"
          style={{
            background: `linear-gradient(135deg, ${config.glowColor}, transparent)`,
            clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
          }}
        />
      </motion.div>

      {/* MIRROR BUTTON */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onMirror(term);
        }}
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        animate={{ opacity: isHovered ? 1 : 0.7 }}
        style={{
          padding: '5px 14px',
          borderRadius: 14,
          background: 'rgba(0,0,0,0.9)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: 'white',
          fontSize: 9,
          fontFamily: 'monospace',
          fontWeight: 700,
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}
      >
        🔍 MIRROR
      </motion.button>
    </motion.div>
  );
}
