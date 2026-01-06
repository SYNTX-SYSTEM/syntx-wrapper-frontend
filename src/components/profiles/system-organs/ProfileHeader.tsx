// ═══════════════════════════════════════════════════════════════════════════
// 👑 PROFILE HEADER - ULTIMATE CYBERPUNK EDITION
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ProfileHeaderProps {
  profileName: string;
  profileId: string;
  totalPatterns: number;
  lastUsed: string | null;
  status: 'ACTIVE' | 'UNUSED';
  totalUses: number;
}

export function ProfileHeader({
  profileName,
  profileId,
  totalPatterns,
  lastUsed,
  status,
  totalUses
}: ProfileHeaderProps) {
  
  const [pulse, setPulse] = useState(0);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // NEURAL NETWORK ANIMATION
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles: Array<{x: number, y: number, vx: number, vy: number}> = [];
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8
      });
    }
    
    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.4;
            ctx.strokeStyle = `rgba(0,212,255,${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
        
        ctx.fillStyle = 'rgba(0,212,255,0.8)';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00d4ff';
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }, []);
  
  // PULSE + ROTATION
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
      setRotation(r => (r + 0.5) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);
  
  const glowIntensity = Math.sin(pulse * 0.1) * 0.5 + 0.5;
  const floatY = Math.sin(pulse * 0.08) * 8;
  
  return (
    <div style={{ 
      marginBottom: 40,
      position: 'relative',
      minHeight: 280
    }}>
      {/* NEURAL NETWORK CANVAS */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: -60,
          left: -60,
          right: -60,
          width: 'calc(100% + 120px)',
          height: 320,
          pointerEvents: 'none',
          opacity: 0.7
        }}
      />
      
      {/* MEGA GRADIENT BACKGROUND */}
      <div style={{
        position: 'absolute',
        top: -40,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120%',
        height: 280,
        background: `radial-gradient(ellipse at center, rgba(0,212,255,${0.25 * glowIntensity}) 0%, rgba(217,70,239,${0.15 * glowIntensity}) 40%, transparent 70%)`,
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      
      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        textAlign: 'center',
        transform: `translateY(${floatY}px)`,
        transition: 'transform 0.3s ease-out'
      }}>
        
        {/* LOGO - ROTATING */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 20
        }}>
          <div style={{
            width: 80,
            height: 80,
            position: 'relative',
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.3s linear'
          }}>
            <img 
              src="/logo.png" 
              alt="SYNTX"
              style={{
                width: '100%',
                height: '100%',
                filter: `drop-shadow(0 0 ${20 + glowIntensity * 30}px rgba(0,212,255,0.8))`,
                opacity: 0.9
              }}
            />
            
            {/* ROTATING RINGS */}
            <div style={{
              position: 'absolute',
              top: -10,
              left: -10,
              right: -10,
              bottom: -10,
              border: '2px solid rgba(0,212,255,0.3)',
              borderRadius: '50%',
              transform: `rotate(${-rotation * 2}deg)`,
              borderTopColor: 'rgba(0,212,255,0.8)',
              borderRightColor: 'transparent'
            }} />
            <div style={{
              position: 'absolute',
              top: -20,
              left: -20,
              right: -20,
              bottom: -20,
              border: '1px solid rgba(217,70,239,0.2)',
              borderRadius: '50%',
              transform: `rotate(${rotation * 1.5}deg)`,
              borderBottomColor: 'rgba(217,70,239,0.6)',
              borderLeftColor: 'transparent'
            }} />
          </div>
        </div>
        
        {/* MAIN TITLE - CENTERED */}
        <div style={{ marginBottom: 16, position: 'relative' }}>
          <h1 style={{ 
            fontSize: 56, 
            fontWeight: 900, 
            background: 'linear-gradient(135deg, #00d4ff 0%, #d946ef 50%, #00d4ff 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradient 3s ease infinite',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 12,
            fontFamily: 'monospace',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            filter: `drop-shadow(0 0 ${25 + glowIntensity * 25}px rgba(0,212,255,0.8))`,
            position: 'relative',
            display: 'inline-block'
          }}>
            {profileName}
            
            {/* SCAN LINES */}
            <div style={{
              position: 'absolute',
              top: `${(pulse * 3) % 100}%`,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.9), transparent)',
              boxShadow: '0 0 15px rgba(0,212,255,1)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              top: `${((pulse * 3) + 30) % 100}%`,
              left: 0,
              right: 0,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(217,70,239,0.7), transparent)',
              boxShadow: '0 0 10px rgba(217,70,239,0.8)',
              pointerEvents: 'none'
            }} />
          </h1>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12,
            justifyContent: 'center'
          }}>
            <div style={{ 
              fontSize: 11, 
              color: 'rgba(255,255,255,0.5)', 
              fontFamily: 'monospace',
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}>
              ID: {profileId}
            </div>
            
            <div style={{ 
              width: 4, 
              height: 4, 
              borderRadius: '50%', 
              background: 'rgba(0,212,255,0.5)' 
            }} />
            
            {/* ANIMATED STATUS */}
            <div style={{
              padding: '6px 18px',
              borderRadius: 20,
              fontSize: 10,
              fontFamily: 'monospace',
              fontWeight: 700,
              background: status === 'ACTIVE' 
                ? `linear-gradient(135deg, rgba(16,185,129,${0.4 + glowIntensity * 0.3}), rgba(16,185,129,0.15))` 
                : 'rgba(128,128,128,0.2)',
              border: status === 'ACTIVE' 
                ? `1px solid rgba(16,185,129,${0.6 + glowIntensity * 0.4})` 
                : '1px solid rgba(128,128,128,0.3)',
              color: status === 'ACTIVE' ? '#10b981' : 'rgba(255,255,255,0.4)',
              boxShadow: status === 'ACTIVE' ? `0 0 ${25 + glowIntensity * 20}px rgba(16,185,129,0.5)` : 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <span style={{ position: 'relative', zIndex: 1 }}>● {status}</span>
              
              {status === 'ACTIVE' && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 120,
                  height: 120,
                  background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)',
                  transform: `translate(-50%, -50%) scale(${(pulse % 60) / 60})`,
                  opacity: 1 - (pulse % 60) / 60,
                  pointerEvents: 'none'
                }} />
              )}
            </div>
          </div>
        </div>
        
        {/* STATS GRID */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 20,
          marginTop: 32,
          maxWidth: 900,
          margin: '32px auto 0'
        }}>
          {[
            { label: 'PATTERNS', value: totalPatterns, color: '#00d4ff', delay: 0 },
            { label: 'TOTAL USES', value: totalUses, color: '#d946ef', delay: 0.33 },
            { label: 'LAST USED', value: lastUsed ? new Date(lastUsed).toLocaleDateString() : 'NEVER', color: '#10b981', delay: 0.66 }
          ].map((stat, i) => {
            const offset = Math.sin(pulse * 0.06 + stat.delay * Math.PI * 2) * 5;
            
            return (
              <div 
                key={i}
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14,
                  padding: 20,
                  position: 'relative',
                  overflow: 'hidden',
                  transform: `translateY(${offset}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: `${(pulse * 2 + i * 30) % 100}%`,
                  width: '40%',
                  height: 3,
                  background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                  boxShadow: `0 0 15px ${stat.color}`,
                  transform: 'translateX(-50%)'
                }} />
                
                <div style={{
                  position: 'absolute',
                  top: -30,
                  right: -30,
                  width: 80,
                  height: 80,
                  background: `radial-gradient(circle, ${stat.color}40 0%, transparent 70%)`,
                  filter: 'blur(25px)',
                  opacity: glowIntensity
                }} />
                
                <div style={{ 
                  color: 'rgba(255,255,255,0.5)', 
                  marginBottom: 10,
                  fontFamily: 'monospace',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {stat.label}
                </div>
                <div style={{ 
                  color: stat.color, 
                  fontFamily: 'monospace', 
                  fontWeight: 900,
                  fontSize: 28,
                  filter: `drop-shadow(0 0 10px ${stat.color})`,
                  position: 'relative',
                  zIndex: 1
                }}>
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
