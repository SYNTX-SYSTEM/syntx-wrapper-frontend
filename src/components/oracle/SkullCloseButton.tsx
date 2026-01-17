'use client';

import React from 'react';
import { ORACLE_COLORS } from './constants';

interface SkullCloseButtonProps {
  onClose: () => void;
  position?: 'top-right' | 'top-left';
}

export function SkullCloseButton({ onClose, position = 'top-right' }: SkullCloseButtonProps) {
  const [isHovering, setIsHovering] = React.useState(false);

  const positionStyles = position === 'top-right' 
    ? { top: 20, right: 20 }
    : { top: 20, left: 20 };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        position: 'absolute',
        ...positionStyles,
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: isHovering 
          ? `linear-gradient(135deg, #ff0000, #ff6b6b)`
          : `rgba(255, 0, 0, 0.2)`,
        border: `3px solid ${isHovering ? '#ff0000' : '#ff000080'}`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 32,
        transition: 'all 0.3s',
        boxShadow: isHovering
          ? `0 0 40px #ff0000, 0 0 80px #ff000080`
          : `0 0 20px #ff000060`,
        animation: isHovering ? 'skullPulse 0.5s ease-in-out infinite' : 'none',
        zIndex: 10000,
        outline: 'none',
      }}
      title="Close"
    >
      <span style={{
        filter: isHovering ? 'drop-shadow(0 0 10px #ff0000)' : 'none',
        transform: isHovering ? 'scale(1.2) rotate(10deg)' : 'scale(1)',
        transition: 'all 0.3s',
        display: 'inline-block',
      }}>
        💀
      </span>

      <style jsx>{`
        @keyframes skullPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </button>
  );
}
