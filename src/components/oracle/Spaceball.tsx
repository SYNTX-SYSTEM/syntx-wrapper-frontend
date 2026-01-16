'use client';

import React, { useState } from 'react';

type Props = {
  name: string;
  value: number;
  color: string;
  position: { x: number; y: number };
  centerPosition: { x: number; y: number };
  onDrag: (newPosition: { x: number; y: number }, newValue: number) => void;
};

export function Spaceball({ name, value, color, position, centerPosition, onDrag }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Calculate distance from center
    const distance = Math.sqrt(
      Math.pow(newX - centerPosition.x, 2) + Math.pow(newY - centerPosition.y, 2)
    );

    // Map distance to value change
    const maxDistance = 400;
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    const newValue = value * (1 + (normalizedDistance * 0.5));

    onDrag({ x: newX, y: newY }, newValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  // Calculate arrow angle and length
  const dx = centerPosition.x - position.x;
  const dy = centerPosition.y - position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        zIndex: 5,
      }}
    >
      {/* Connection Arrow Line */}
      <div style={{
        position: 'absolute',
        width: distance,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${color}60)`,
        transformOrigin: 'left center',
        transform: `rotate(${angle}deg)`,
        left: '50%',
        top: '50%',
        pointerEvents: 'none',
        boxShadow: `0 0 10px ${color}80`,
      }} />

      {/* Spaceball */}
      <div style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${color}ff, ${color}80)`,
        border: `3px solid ${color}`,
        boxShadow: `
          0 0 20px ${color}80,
          0 0 40px ${color}40,
          inset 0 0 20px ${color}40
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: isDragging ? 'none' : 'all 0.3s',
        animation: isDragging ? 'none' : 'float 3s ease-in-out infinite',
      }}>
        <div style={{
          fontSize: 9,
          fontWeight: 800,
          color: '#fff',
          fontFamily: 'monospace',
          textAlign: 'center',
          marginBottom: 4,
          textShadow: `0 0 10px ${color}`,
        }}>
          {name}
        </div>
        <div style={{
          fontSize: 16,
          fontWeight: 900,
          color: '#fff',
          fontFamily: 'monospace',
          textShadow: `0 0 10px ${color}`,
        }}>
          {value.toFixed(2)}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
