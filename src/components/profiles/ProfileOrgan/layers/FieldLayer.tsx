'use client';

export default function FieldLayer() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, rgba(14,165,233,0.02) 1px, transparent 1px), linear-gradient(rgba(14,165,233,0.02) 1px, transparent 1px)`, backgroundSize: '60px 60px', animation: 'pulse 8s ease-in-out infinite' }} />
      <style jsx>{`@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }`}</style>
    </div>
  );
}
