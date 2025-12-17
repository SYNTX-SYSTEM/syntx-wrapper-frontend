// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   🪟 GLASS CARD - SYNTX GLASSMORPHISM                                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React, { useState, useRef } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark' | 'cyan' | 'magenta' | 'gradient';
  hover?: 'lift' | 'glow' | 'tilt' | 'none';
  padding?: number | string;
  borderRadius?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  variant = 'default',
  hover = 'lift',
  padding = 24,
  borderRadius = 20,
  className = '',
  style = {},
  onClick,
}: GlassCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>(null);

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'dark':
        return {
          background: 'rgba(0, 0, 0, 0.4)',
          borderColor: 'rgba(255, 255, 255, 0.05)',
        };
      case 'cyan':
        return {
          background: 'rgba(0, 212, 255, 0.05)',
          borderColor: 'rgba(0, 212, 255, 0.2)',
        };
      case 'magenta':
        return {
          background: 'rgba(217, 70, 239, 0.05)',
          borderColor: 'rgba(217, 70, 239, 0.2)',
        };
      case 'gradient':
        return {
          background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(217, 70, 239, 0.05))',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        };
      default:
        return {
          background: 'rgba(255, 255, 255, 0.03)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (hover !== 'tilt' || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
    });
  };

  const getHoverStyles = (): React.CSSProperties => {
    if (!isHovered) return {};
    switch (hover) {
      case 'lift':
        return { transform: 'translateY(-8px)', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' };
      case 'glow':
        return { boxShadow: '0 0 40px rgba(0, 212, 255, 0.3), 0 20px 40px rgba(0, 0, 0, 0.2)' };
      case 'tilt':
        return tiltStyle;
      default:
        return {};
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <div
      ref={cardRef}
      className={className}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        padding,
        borderRadius,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'hidden',
        ...variantStyles,
        ...getHoverStyles(),
        ...style,
      }}
    >
      {/* Animated Border Gradient on Hover */}
      {isHovered && hover !== 'none' && (
        <div style={{
          position: 'absolute',
          inset: -2,
          borderRadius: borderRadius + 2,
          background: 'linear-gradient(45deg, #00d4ff, transparent, #d946ef)',
          backgroundSize: '200% 200%',
          animation: 'borderFlow 3s ease infinite',
          zIndex: -1,
          opacity: 0.6,
        }} />
      )}

      {/* Shine Effect on Hover */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          animation: 'shine 0.8s ease forwards',
          pointerEvents: 'none',
        }} />
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>

      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}
