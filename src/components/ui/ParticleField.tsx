// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   ✨ PARTICLE FIELD - SYNTX AMBIENT BACKGROUND                            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React, { useEffect, useState, useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
  delay: number;
}

interface ParticleFieldProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'up' | 'down' | 'random';
  className?: string;
  style?: React.CSSProperties;
}

const COLORS = ['#00d4ff', '#d946ef', '#10b981', '#8b5cf6', '#f59e0b'];

export default function ParticleField({
  count = 30,
  colors = COLORS,
  minSize = 2,
  maxSize = 6,
  speed = 'normal',
  direction = 'up',
  className = '',
  style = {},
}: ParticleFieldProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const speedMultiplier = speed === 'slow' ? 1.5 : speed === 'fast' ? 0.5 : 1;

  const particles = useMemo(() => {
    if (!mounted) return [];
    return [...Array(count)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      opacity: 0.1 + Math.random() * 0.5,
      speed: (3 + Math.random() * 5) * speedMultiplier,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
    }));
  }, [mounted, count, colors, minSize, maxSize, speedMultiplier]);

  if (!mounted) return null;

  const getAnimation = (particle: Particle) => {
    const duration = particle.speed;
    switch (direction) {
      case 'up':
        return `particleUp ${duration}s ease-in-out infinite`;
      case 'down':
        return `particleDown ${duration}s ease-in-out infinite`;
      default:
        return `particleRandom ${duration}s ease-in-out infinite`;
    }
  };

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    >
      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animation: getAnimation(p),
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Ambient Glow Orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'float 20s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '30%',
        right: '15%',
        width: 250,
        height: 250,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217, 70, 239, 0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'float 25s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '50%',
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'float 18s ease-in-out infinite',
        animationDelay: '5s',
      }} />

      {/* Inline Keyframes */}
      <style>{`
        @keyframes particleUp {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: var(--particle-opacity, 0.5); }
          90% { opacity: var(--particle-opacity, 0.5); }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @keyframes particleDown {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: var(--particle-opacity, 0.5); }
          90% { opacity: var(--particle-opacity, 0.5); }
          100% { transform: translateY(100vh) translateX(-20px); opacity: 0; }
        }
        @keyframes particleRandom {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          25% { transform: translate(30px, -50px) rotate(90deg); opacity: 0.5; }
          50% { transform: translate(-20px, -100px) rotate(180deg); opacity: 0.3; }
          75% { transform: translate(40px, -150px) rotate(270deg); opacity: 0.5; }
          100% { transform: translate(0, -200px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Preset Variations
export function MatrixRain({ intensity = 'normal' }: { intensity?: 'light' | 'normal' | 'heavy' }) {
  const count = intensity === 'light' ? 15 : intensity === 'heavy' ? 60 : 30;
  return (
    <ParticleField
      count={count}
      colors={['#10b981', '#34d399', '#059669']}
      minSize={1}
      maxSize={3}
      speed="fast"
      direction="down"
    />
  );
}

export function CosmicDust() {
  return (
    <ParticleField
      count={50}
      colors={['#00d4ff', '#d946ef', '#8b5cf6', '#ffffff']}
      minSize={1}
      maxSize={4}
      speed="slow"
      direction="random"
    />
  );
}

export function FireEmbers() {
  return (
    <ParticleField
      count={25}
      colors={['#f59e0b', '#ef4444', '#fbbf24']}
      minSize={2}
      maxSize={5}
      speed="normal"
      direction="up"
    />
  );
}
