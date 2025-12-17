// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   💬 TOOLTIP - SYNTX CYBER EDITION                                        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React, { useState, useRef, useEffect } from 'react';

type Position = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: Position;
  delay?: number;
  color?: string;
  maxWidth?: number;
}

export default function Tooltip({ 
  content, 
  children, 
  position = 'top', 
  delay = 200,
  color = '#00d4ff',
  maxWidth = 300,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  useEffect(() => {
    if (visible && triggerRef.current && tooltipRef.current) {
      const trigger = triggerRef.current.getBoundingClientRect();
      const tooltip = tooltipRef.current.getBoundingClientRect();
      
      let x = 0, y = 0;
      const gap = 12;

      switch (position) {
        case 'top':
          x = trigger.left + trigger.width / 2 - tooltip.width / 2;
          y = trigger.top - tooltip.height - gap;
          break;
        case 'bottom':
          x = trigger.left + trigger.width / 2 - tooltip.width / 2;
          y = trigger.bottom + gap;
          break;
        case 'left':
          x = trigger.left - tooltip.width - gap;
          y = trigger.top + trigger.height / 2 - tooltip.height / 2;
          break;
        case 'right':
          x = trigger.right + gap;
          y = trigger.top + trigger.height / 2 - tooltip.height / 2;
          break;
      }

      // Keep in viewport
      x = Math.max(10, Math.min(x, window.innerWidth - tooltip.width - 10));
      y = Math.max(10, Math.min(y, window.innerHeight - tooltip.height - 10));

      setCoords({ x, y });
    }
  }, [visible, position]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getArrowStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    };

    switch (position) {
      case 'top':
        return { ...base, bottom: -8, left: '50%', transform: 'translateX(-50%)', borderWidth: '8px 8px 0 8px', borderColor: `${color}40 transparent transparent transparent` };
      case 'bottom':
        return { ...base, top: -8, left: '50%', transform: 'translateX(-50%)', borderWidth: '0 8px 8px 8px', borderColor: `transparent transparent ${color}40 transparent` };
      case 'left':
        return { ...base, right: -8, top: '50%', transform: 'translateY(-50%)', borderWidth: '8px 0 8px 8px', borderColor: `transparent transparent transparent ${color}40` };
      case 'right':
        return { ...base, left: -8, top: '50%', transform: 'translateY(-50%)', borderWidth: '8px 8px 8px 0', borderColor: `transparent ${color}40 transparent transparent` };
    }
  };

  return (
    <>
      <div 
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>

      {visible && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            left: coords.x,
            top: coords.y,
            zIndex: 9999,
            padding: '12px 18px',
            maxWidth,
            background: 'rgba(5, 13, 24, 0.98)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${color}40`,
            borderRadius: 12,
            boxShadow: `0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px ${color}20`,
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.5,
            animation: 'scaleIn 0.2s ease-out',
            pointerEvents: 'none',
          }}
        >
          {/* Glow Effect */}
          <div style={{
            position: 'absolute',
            inset: -1,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${color}30, transparent, ${color}20)`,
            zIndex: -1,
            filter: 'blur(8px)',
          }} />
          
          {/* Arrow */}
          <div style={getArrowStyle()} />
          
          {/* Content */}
          {content}
        </div>
      )}
    </>
  );
}
