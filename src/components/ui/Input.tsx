'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-xs font-mono uppercase tracking-wider text-syntx-muted">
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 rounded-lg
              bg-syntx-dark/80 border border-syntx-border/50
              text-syntx-text placeholder-syntx-muted/50
              font-mono text-sm
              transition-all duration-300
              focus:outline-none focus:border-syntx-cyan/60 focus:shadow-glow-cyan
              hover:border-syntx-border
              ${error ? 'border-syntx-red/50 focus:border-syntx-red' : ''}
              ${className}
            `}
            {...props}
          />
          {/* Bottom glow line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-syntx-cyan group-focus-within:w-full transition-all duration-300" />
        </div>
        {error && (
          <p className="text-xs text-syntx-red font-mono">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
