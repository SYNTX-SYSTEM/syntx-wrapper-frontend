// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   💀 SKELETON - SYNTX SHIMMER LOADER                                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  lines?: number;
  animate?: boolean;
}

export default function Skeleton({
  width,
  height,
  borderRadius,
  className = '',
  variant = 'rectangular',
  lines = 1,
  animate = true,
}: SkeletonProps) {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'text':
        return { width: width || '100%', height: height || 16, borderRadius: borderRadius ?? 4 };
      case 'circular':
        return { width: width || 48, height: height || 48, borderRadius: '50%' };
      case 'card':
        return { width: width || '100%', height: height || 200, borderRadius: borderRadius ?? 16 };
      default:
        return { width: width || '100%', height: height || 20, borderRadius: borderRadius ?? 8 };
    }
  };

  const baseStyle: React.CSSProperties = {
    ...getVariantStyles(),
    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 100%)',
    backgroundSize: '200px 100%',
    animation: animate ? 'skeletonShimmer 1.5s ease infinite' : 'none',
    position: 'relative',
    overflow: 'hidden',
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[...Array(lines)].map((_, i) => (
          <div
            key={i}
            style={{
              ...baseStyle,
              width: i === lines - 1 ? '70%' : '100%',
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={className} style={baseStyle}>
      {/* Shimmer Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.05), transparent)',
        animation: animate ? 'shimmer 2s linear infinite' : 'none',
      }} />
    </div>
  );
}

// Preset Components
export function SkeletonCard() {
  return (
    <div style={{
      padding: 24,
      background: 'rgba(10, 22, 40, 0.6)',
      borderRadius: 20,
      border: '1px solid rgba(255, 255, 255, 0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <Skeleton variant="circular" width={48} height={48} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={18} />
          <div style={{ height: 8 }} />
          <Skeleton variant="text" width="40%" height={14} />
        </div>
      </div>
      <Skeleton variant="text" lines={3} />
      <div style={{ height: 16 }} />
      <Skeleton variant="rectangular" height={40} borderRadius={10} />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 16, padding: '12px 16px', background: 'rgba(0, 212, 255, 0.05)', borderRadius: 8 }}>
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} width={`${25 - i * 2}%`} height={16} />
        ))}
      </div>
      {/* Rows */}
      {[...Array(rows)].map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: 16, padding: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
          {[1, 2, 3, 4].map(j => (
            <Skeleton key={j} width={`${25 - j * 2}%`} height={14} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ padding: 20, background: 'rgba(10, 22, 40, 0.6)', borderRadius: 16, border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <Skeleton width={80} height={12} />
          <div style={{ height: 12 }} />
          <Skeleton width={100} height={32} />
        </div>
      ))}
    </div>
  );
}
