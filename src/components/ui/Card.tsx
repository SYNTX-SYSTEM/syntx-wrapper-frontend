'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export function Card({ children, className = '', glow = false, hover = true }: CardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-xl
        bg-gradient-to-br from-syntx-card/80 to-syntx-dark/90
        border border-syntx-border/50
        backdrop-blur-xl
        ${glow ? 'shadow-glow-cyan border-syntx-cyan/30' : ''}
        ${hover ? 'transition-all duration-500 hover:border-syntx-cyan/50 hover:shadow-glow-cyan' : ''}
        ${className}
      `}
    >
      {/* Scan Line Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-syntx-cyan/5 to-transparent h-1/2 animate-scan opacity-0 group-hover:opacity-100" />
      </div>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-syntx-cyan/40" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-syntx-cyan/40" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-syntx-cyan/40" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-syntx-cyan/40" />
      
      <div className="relative z-10">{children}</div>
    </div>
  );
}
