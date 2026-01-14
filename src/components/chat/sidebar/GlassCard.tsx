"use client";

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
  className?: string;
}

export function GlassCard({ 
  children, 
  style = {}, 
  glowColor = '#00d4ff', 
  className = '' 
}: GlassCardProps) {
  return (
    <div 
      className={`cyber-card ${className}`} 
      style={{
        '--glow-color': glowColor,
        position: 'relative',
        borderRadius: 16,
        background: 'linear-gradient(145deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${glowColor}30`,
        boxShadow: `0 4px 30px ${glowColor}10, inset 0 1px 0 rgba(255,255,255,0.05)`,
        overflow: 'visible',
        ...style,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
