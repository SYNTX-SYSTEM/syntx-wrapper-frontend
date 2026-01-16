'use client';

import React, { useState } from 'react';

type Props = {
  name: string;
  value: number;
  color: string;
  position: { x: number; y: number };
  onDrag: (newPosition: { x: number; y: number }, newValue: number) => void;
};

export function Spaceball({ name, value, color, position, onDrag }: Props) {
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

    // Calculate distance from center (eye position)
    const centerX = 700; // Approximate center
    const centerY = 400;
    const distance = Math.sqrt(
      Math.pow(newX - centerX, 2) + Math.pow(newY - centerY, 2)
    );

    // Map distance to value change
    const maxDistance = 400;
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    const newValue = value + (normalizedDistance * 0.5);

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
      }}
    >
      {/* Connection Arrow Line */}
      <div style={{
        position: 'absolute',
        width: 2,
        height: Math.sqrt(
          Math.pow(700 - position.x, 2) + Math.pow(400 - position.y, 2)
        ),
        background: `${color}60`,
        transformOrigin: 'top',
        transform: `rotate(${Math.atan2(
          400 - position.y,
          700 - position.x
        ) - Math.PI / 2}rad)`,
        left: '50%',
        top: '50%',
        marginLeft: -1,
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
          inset 0 0 20px ${color}40
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: isDragging ? 'none' : 'all 0.3s',
        animation: 'float 3s ease-in-out infinite',
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
