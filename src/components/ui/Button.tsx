'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  glow?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  glow = true,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: `
      bg-gradient-to-r from-syntx-cyan to-syntx-cyan-dim
      text-syntx-dark font-bold
      hover:from-syntx-cyan-dim hover:to-syntx-cyan
      ${glow ? 'shadow-glow-cyan hover:shadow-glow-cyan-lg' : ''}
    `,
    secondary: `
      bg-transparent border-2 border-syntx-cyan/50
      text-syntx-cyan
      hover:bg-syntx-cyan/10 hover:border-syntx-cyan
      ${glow ? 'hover:shadow-glow-cyan' : ''}
    `,
    ghost: `
      bg-transparent text-syntx-muted
      hover:text-syntx-cyan hover:bg-syntx-cyan/5
    `,
    danger: `
      bg-gradient-to-r from-syntx-red to-red-600
      text-white font-bold
      hover:from-red-600 hover:to-syntx-red
      shadow-[0_0_20px_rgba(255,71,87,0.3)]
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <button
      className={`
        relative overflow-hidden rounded-lg
        font-mono uppercase tracking-wider
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shine Effect */}
      <span className="absolute inset-0 overflow-hidden">
        <span className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine" />
      </span>
      
      <span className="relative flex items-center justify-center gap-2">
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </span>
    </button>
  );
}
