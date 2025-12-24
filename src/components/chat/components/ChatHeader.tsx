"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

// ═══════════════════════════════════════════════════════════════
// 🎨 CHAT HEADER - NEURAL NETWORK STYLE (wie Login Page)
// ═══════════════════════════════════════════════════════════════

interface ChatHeaderProps {
  messageCount: number;
  responseCount: number;
  isHealthy: boolean;
  onClear: () => void;
}

// ═══════════════════════════════════════════════════════════════
// 🌊 NEURAL NETWORK PARTICLES (wie Login Page)
// ═══════════════════════════════════════════════════════════════

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Responsive canvas size
    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    
    const particles: Particle[] = [];
    const particleCount = 40; // Mehr Particles für dichteres Netz
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1
      });
    }
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Keep in bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
        
        // Draw particle
        ctx.fillStyle = '#00d4ff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw connections (Neural Network style)
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) { // Connection threshold
            const opacity = (1 - distance / 120) * 0.3;
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 1;
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
        opacity: 0.5
      }}
    />
  );
}

export default function ChatHeader({ 
  messageCount, 
  responseCount, 
  isHealthy,
  onClear 
}: ChatHeaderProps) {
  return (
    <div style={{
      padding: '20px 22px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      background: 'rgba(6,13,24,0.8)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Neural Network Background */}
      <NeuralNetworkCanvas />
      
      {/* Center: Logo + Title */}
      <div style={{ 
        flex: 1,
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        gap: 10,
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo with Ring (wie Login) */}
        <div style={{
          position: 'relative',
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Ring around logo */}
          <div style={{
            position: 'absolute',
            width: 56,
            height: 56,
            border: '2px solid rgba(0,212,255,0.3)',
            borderRadius: '50%'
          }} />
          
          {/* Logo */}
          <Image 
            src="/Logo1_trans.png" 
            alt="SYNTX" 
            width={40}
            height={40}
            style={{
              filter: 'drop-shadow(0 0 10px rgba(0,212,255,0.5))'
            }}
            priority
          />
        </div>

        {/* Title */}
        <h2 style={{
          margin: 0,
          fontFamily: 'monospace',
          fontSize: 24,
          background: 'linear-gradient(135deg, #00d4ff 0%, #d946ef 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: 6,
          fontWeight: 900,
          lineHeight: 1.2,
          textTransform: 'uppercase'
        }}>
          SYNTX CHAT
        </h2>
        
        {/* Stats */}
        <div style={{ 
          fontSize: 10, 
          color: 'rgba(255,255,255,0.4)', 
          fontFamily: 'monospace',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span>{messageCount} Messages</span>
          <span>•</span>
          <span>{responseCount} AI</span>
        </div>
      </div>

      {/* Right: Health + Clear */}
      <div style={{ 
        position: 'absolute',
        top: 16,
        right: 20,
        display: 'flex', 
        alignItems: 'center', 
        gap: 10,
        zIndex: 1
      }}>
        {/* Health Badge */}
        <div style={{
          padding: '6px 12px',
          borderRadius: 16,
          background: isHealthy 
            ? 'rgba(16,185,129,0.15)'
            : 'rgba(239,68,68,0.15)',
          border: `1px solid ${isHealthy ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <span style={{ 
            fontSize: 6,
            color: isHealthy ? '#10b981' : '#ef4444'
          }}>
            ●
          </span>
          <span style={{
            fontSize: 9,
            fontFamily: 'monospace',
            fontWeight: 600,
            color: isHealthy ? '#10b981' : '#ef4444',
            letterSpacing: 0.5
          }}>
            {isHealthy ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>

        {/* Clear Button */}
        <button 
          onClick={onClear} 
          className="cyber-btn" 
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 8, 
            padding: '6px 14px',
            color: '#ef4444', 
            cursor: 'pointer',
            fontFamily: 'monospace', 
            fontSize: 10, 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          🗑️ Clear
        </button>
      </div>
    </div>
  );
}
