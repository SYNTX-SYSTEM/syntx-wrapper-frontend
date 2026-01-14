"use client";

import React, { useEffect, useRef } from 'react';

/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                                                                           ║
 * ║   🔥💎⚡ SYNTX NEURAL FIELD BACKGROUND ⚡💎🔥                             ║
 * ║                                                                           ║
 * ║   Pure Field Resonance - No Random, Only Flow                            ║
 * ║                                                                           ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // SYNTX Field Configuration
    const updateSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // SYNTX Node System - Calibrated Grid
    interface FieldNode {
      x: number;
      y: number;
      phase: number;
      frequency: number;
      amplitude: number;
      color: string;
    }

    const nodes: FieldNode[] = [];
    const gridSize = 8; // 8x8 grid of nodes
    const spacing = canvas.width / (gridSize + 1);

    // SYNTX Colors - Pure Resonance
    const fieldColors = [
      '#00d4ff', // Cyan - Primary Field
      '#d946ef', // Purple - Secondary Field
      '#10b981', // Green - Tertiary Field
      '#f59e0b', // Orange - Quaternary Field
    ];

    // Generate Calibrated Grid
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const colorIndex = (row + col) % fieldColors.length;
        nodes.push({
          x: spacing * (col + 1),
          y: spacing * (row + 1),
          phase: (row * gridSize + col) * 0.1,
          frequency: 0.001 + (colorIndex * 0.0002),
          amplitude: 3 + (colorIndex * 0.5),
          color: fieldColors[colorIndex],
        });
      }
    }

    // Field Animation
    let time = 0;
    let animationId: number;

    const animate = () => {
      time += 0.016; // ~60fps

      // Clear with trail effect
      ctx.fillStyle = 'rgba(10, 14, 39, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Field Connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Calculate field position (sine wave motion)
        const offsetX = node.amplitude * Math.sin(time * node.frequency + node.phase);
        const offsetY = node.amplitude * Math.cos(time * node.frequency * 1.3 + node.phase);
        const currentX = node.x + offsetX;
        const currentY = node.y + offsetY;

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const otherOffsetX = other.amplitude * Math.sin(time * other.frequency + other.phase);
          const otherOffsetY = other.amplitude * Math.cos(time * other.frequency * 1.3 + other.phase);
          const otherX = other.x + otherOffsetX;
          const otherY = other.y + otherOffsetY;

          const dx = currentX - otherX;
          const dy = currentY - otherY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Connection threshold
          if (distance < spacing * 2) {
            const opacity = (1 - distance / (spacing * 2)) * 0.3;
            
            // SYNTX Gradient Line
            const gradient = ctx.createLinearGradient(
              currentX, currentY,
              otherX, otherY
            );
            
            gradient.addColorStop(0, `${node.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, `${other.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(currentX, currentY);
            ctx.lineTo(otherX, otherY);
            ctx.stroke();
          }
        }

        // Draw Field Node
        const pulsePhase = time * node.frequency * 2 + node.phase;
        const pulse = 0.7 + 0.3 * Math.sin(pulsePhase);
        
        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          currentX, currentY, 0,
          currentX, currentY, 8 * pulse
        );
        glowGradient.addColorStop(0, `${node.color}80`);
        glowGradient.addColorStop(1, `${node.color}00`);
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 8 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Core node
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = node.color;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 1.5 * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.35,
      }}
    />
  );
}
