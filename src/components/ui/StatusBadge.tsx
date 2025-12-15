'use client';

interface StatusBadgeProps {
  status: 'healthy' | 'warning' | 'error' | 'loading';
  label?: string;
  pulse?: boolean;
}

export function StatusBadge({ status, label, pulse = true }: StatusBadgeProps) {
  const colors = {
    healthy: 'bg-syntx-green border-syntx-green/50 text-syntx-green',
    warning: 'bg-syntx-yellow border-syntx-yellow/50 text-syntx-yellow',
    error: 'bg-syntx-red border-syntx-red/50 text-syntx-red',
    loading: 'bg-syntx-cyan border-syntx-cyan/50 text-syntx-cyan',
  };

  const glows = {
    healthy: 'shadow-[0_0_10px_rgba(0,255,136,0.5)]',
    warning: 'shadow-[0_0_10px_rgba(255,215,0,0.5)]',
    error: 'shadow-[0_0_10px_rgba(255,71,87,0.5)]',
    loading: 'shadow-[0_0_10px_rgba(0,212,255,0.5)]',
  };

  return (
    <div className={`
      inline-flex items-center gap-2 px-3 py-1.5 rounded-full
      border bg-opacity-10 ${colors[status]}
    `}>
      <span className={`
        relative w-2 h-2 rounded-full bg-current ${glows[status]}
        ${pulse ? 'animate-pulse' : ''}
      `}>
        <span className="absolute inset-0 rounded-full bg-current animate-ping opacity-75" />
      </span>
      {label && (
        <span className="text-xs font-mono uppercase tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
}
