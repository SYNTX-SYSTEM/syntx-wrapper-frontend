'use client';

import { useOrganStore } from '../store';

export default function FieldLayer() {
  const snapshot = useOrganStore((state) => state.snapshot);
  if (!snapshot) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, rgba(14,165,233,0.02) 1px, transparent 1px), linear-gradient(rgba(14,165,233,0.02) 1px, transparent 1px)`, backgroundSize: '60px 60px', animation: 'pulse 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: 20, left: 20, color: '#0ea5e9', fontFamily: 'monospace', fontSize: '10px', lineHeight: '1.6', background: 'rgba(0,0,0,0.5)', padding: '6px 10px', borderRadius: '4px', border: '1px solid rgba(14,165,233,0.2)' }}>
        <div>PROFILES: {snapshot.profiles.length}</div>
        <div>BINDINGS: {snapshot.bindings.length}</div>
        <div>WEIGHT: {snapshot.profiles.reduce((s, p) => s + p.weight, 0).toFixed(1)}</div>
      </div>
      <style jsx>{`@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }`}</style>
    </div>
  );
}
