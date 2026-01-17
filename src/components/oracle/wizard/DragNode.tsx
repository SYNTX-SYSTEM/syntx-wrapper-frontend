'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DragNodeProps {
  value: number;
  label: string;
  color?: string;
  min?: number;
  max?: number;
  onChange: (newValue: number) => void;
}

export function DragNode({ 
  value, 
  label, 
  color = '#00ffff',
  min = 0,
  max = 5,
  onChange 
}: DragNodeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [waves, setWaves] = useState<number[]>([]);
  const dragStartY = useRef(0);
  const dragStartValue = useRef(0);
  const waveIdCounter = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartValue.current = value;
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaY = dragStartY.current - e.clientY;
    const sensitivity = 0.01;
    const newValue = Math.max(min, Math.min(max, dragStartValue.current + deltaY * sensitivity));
    
    // Trigger wave on value change
    if (Math.abs(newValue - value) > 0.05) {
      triggerWave();
    }
    
    onChange(newValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const triggerWave = () => {
    const waveId = waveIdCounter.current++;
    setWaves(prev => [...prev, waveId]);
    setTimeout(() => {
      setWaves(prev => prev.filter(id => id !== waveId));
    }, 1500);
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
  }, [isDragging, value]);

  // Dynamic color based on value
  const getGlowColor = () => {
    const normalized = (value - min) / (max - min);
    if (normalized > 0.7) return '#00ffff'; // Cyan - High
    if (normalized > 0.4) return '#ff00ff'; // Purple - Mid
    return '#ffaa00'; // Orange - Low
  };

  const glowColor = getGlowColor();
  const ringSpeed = Math.max(2, 8 - (value / max) * 6);
  const pulseIntensity = 0.5 + (value / max) * 0.5;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 15,
    }}>
      {/* Label */}
      <motion.div 
        animate={{ 
          textShadow: isDragging 
            ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}` 
            : `0 0 10px ${glowColor}80`,
        }}
        style={{
          fontSize: 12,
          color: glowColor,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: 2,
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </motion.div>

      {/* Stromball Container */}
      <div style={{ position: 'relative' }}>
        {/* Neural Network Background */}
        <svg
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            left: -40,
            top: -40,
            pointerEvents: 'none',
            opacity: 0.3,
          }}
        >
          {/* Network Connections */}
          {[...Array(8)].map((_, i) => {
            const angle1 = (i / 8) * Math.PI * 2;
            const angle2 = ((i + 1) / 8) * Math.PI * 2;
            const x1 = 100 + Math.cos(angle1) * 80;
            const y1 = 100 + Math.sin(angle1) * 80;
            const x2 = 100 + Math.cos(angle2) * 80;
            const y2 = 100 + Math.sin(angle2) * 80;
            
            return (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={glowColor}
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  pathLength: { duration: 2, delay: i * 0.1 },
                  opacity: { duration: 2, repeat: Infinity, delay: i * 0.2 },
                }}
              />
            );
          })}
          
          {/* Network Nodes */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x = 100 + Math.cos(angle) * 80;
            const y = 100 + Math.sin(angle) * 80;
            
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill={glowColor}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  r: [2, 4, 2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            );
          })}
        </svg>

        {/* Wave Ripples */}
        <AnimatePresence>
          {waves.map((waveId) => (
            <motion.div
              key={waveId}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{
                position: 'absolute',
                width: 120,
                height: 120,
                borderRadius: '50%',
                border: `2px solid ${glowColor}`,
                top: 0,
                left: 0,
                pointerEvents: 'none',
              }}
            />
          ))}
        </AnimatePresence>

        {/* Outer Rotating Ring */}
        <motion.div
          animate={{ 
            rotate: 360,
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            rotate: { duration: ringSpeed, repeat: Infinity, ease: "linear" },
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            position: 'absolute',
            width: 140,
            height: 140,
            left: -10,
            top: -10,
            borderRadius: '50%',
            border: `2px dashed ${glowColor}`,
            filter: 'blur(2px)',
            pointerEvents: 'none',
          }}
        />

        {/* Particle Sparks */}
        {isDragging && [...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: Math.cos((i / 12) * Math.PI * 2) * 60,
              y: Math.sin((i / 12) * Math.PI * 2) * 60,
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.08,
            }}
            style={{
              position: 'absolute',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: glowColor,
              left: '50%',
              top: '50%',
              boxShadow: `0 0 10px ${glowColor}`,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Main Stromball */}
        <motion.div
          onMouseDown={handleMouseDown}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          whileHover={{ scale: 1.1 }}
          animate={{
            boxShadow: isDragging
              ? `0 0 60px ${glowColor}, 0 0 100px ${glowColor}80, inset 0 0 40px ${glowColor}40`
              : `0 0 40px ${glowColor}80, inset 0 0 20px ${glowColor}20`,
          }}
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${glowColor}40, ${glowColor}10, #000000)`,
            border: `3px solid ${glowColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 900,
            color: '#ffffff',
            fontFamily: 'monospace',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          {/* Value Display */}
          <motion.div
            animate={{
              textShadow: isDragging
                ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`
                : `0 0 10px ${glowColor}80`,
              scale: isDragging ? 1.1 : 1,
            }}
            style={{
              position: 'relative',
              zIndex: 2,
            }}
          >
            {value.toFixed(2)}
          </motion.div>

          {/* Inner Glow Pulse */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [pulseIntensity, pulseIntensity * 0.5, pulseIntensity],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: 'absolute',
              inset: 10,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${glowColor}30, transparent 70%)`,
              filter: 'blur(10px)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>

        {/* Drag Indicator */}
        {isHovering && !isDragging && (
          <motion.div
            animate={{
              y: [-5, 5, -5],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: 'absolute',
              top: -40,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 24,
              pointerEvents: 'none',
            }}
          >
            ↕️
          </motion.div>
        )}
      </div>

      {/* Hint Text */}
      {isHovering && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: 10,
            color: `${glowColor}80`,
            fontFamily: 'monospace',
            textAlign: 'center',
          }}
        >
          DRAG UP/DOWN
        </motion.div>
      )}
    </div>
  );
}
