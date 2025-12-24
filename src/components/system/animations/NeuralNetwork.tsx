"use client";

import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// 🌊 NEURAL NETWORK CANVAS - ULTRA CYBER
// ═══════════════════════════════════════════════════════════════

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  pulsePhase: number;
}

interface NeuralNetworkProps {
  particleCount?: number;
  connectionDistance?: number;
  colors?: string[];
  speed?: number;
  opacity?: number;
}

export function NeuralNetwork({
  particleCount = 50,
  connectionDistance = 150,
  colors = ['#00d4ff', '#d946ef', '#10b981', '#f59e0b'],
  speed = 0.3,
  opacity = 0.6
}: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Responsive canvas
    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    
    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * 2.5 + 1,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
    
    // Animation loop
    let animationId: number;
    let frame = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      
      // Update and draw particles
      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Keep in bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
        
        // Pulse effect
        p.pulsePhase += 0.05;
        const pulse = Math.sin(p.pulsePhase) * 0.5 + 0.5;
        
        // Draw particle with glow
        const color = colors[i % colors.length];
        const particleOpacity = (0.6 + pulse * 0.4) * opacity;
        
        ctx.fillStyle = color + Math.floor(particleOpacity * 255).toString(16).padStart(2, '0');
        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + pulse * 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const connectionOpacity = (1 - distance / connectionDistance) * 0.4 * opacity;
            const color = colors[i % colors.length];
            
            ctx.strokeStyle = color + Math.floor(connectionOpacity * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateSize);
    };
  }, [particleCount, connectionDistance, colors, speed, opacity]);
  
  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
}
