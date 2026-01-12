'use client';

export default function LogoCenter() {
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 5 }}>
      {/* ORBIT LINES (MULTIPLE) */}
      <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 800, pointerEvents: 'none' }}>
        <circle cx="400" cy="400" r="300" fill="none" stroke="rgba(0,255,100,0.2)" strokeWidth="1" strokeDasharray="8,8" style={{ animation: 'orbitRotate 60s linear infinite' }} />
        <circle cx="400" cy="400" r="350" fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="1" style={{ animation: 'orbitRotate 80s linear infinite reverse' }} />
        <circle cx="400" cy="400" r="400" fill="none" stroke="rgba(157,0,255,0.1)" strokeWidth="1" strokeDasharray="4,8" style={{ animation: 'orbitRotate 100s linear infinite' }} />
      </svg>

      {/* MASSIVE GREEN GLOW */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,100,0.4) 0%, rgba(0,212,255,0.2) 40%, transparent 70%)', filter: 'blur(60px)', animation: 'planetPulse 5s ease-in-out infinite' }} />

      {/* LOGO PLANET */}
      <div style={{ position: 'relative', width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(10,14,39,1) 0%, rgba(15,25,50,0.98) 100%)', border: '3px solid rgba(0,255,100,0.8)', boxShadow: '0 0 100px rgba(0,255,100,0.6), inset 0 0 80px rgba(0,255,100,0.2), 0 0 150px rgba(0,212,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="/Logo1_trans.png" alt="SYNTX" style={{ width: 160, height: 160, filter: 'drop-shadow(0 0 40px rgba(0,255,100,0.9)) brightness(1.3) contrast(1.1)' }} />
        
        {/* SUBTLE ROTATING SHIMMER */}
        <div style={{ position: 'absolute', inset: -30, background: 'conic-gradient(from 0deg, transparent 0%, rgba(0,255,100,0.3) 5%, transparent 15%, transparent 85%, rgba(0,255,100,0.3) 95%, transparent 100%)', borderRadius: '50%', animation: 'shimmerRotate 4s linear infinite', opacity: 0.6 }} />
        
        {/* SCAN LINE */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(0,255,100,0.25) 50%, transparent 100%)', animation: 'scanLine 5s ease-in-out infinite', opacity: 0.5 }} />
      </div>

      <style jsx>{`
        @keyframes orbitRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes planetPulse { 0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); } }
        @keyframes scanLine { 0%, 100% { top: -120%; opacity: 0; } 40% { opacity: 0.5; } 60% { opacity: 0.5; } 100% { top: 120%; opacity: 0; } }
        @keyframes shimmerRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
