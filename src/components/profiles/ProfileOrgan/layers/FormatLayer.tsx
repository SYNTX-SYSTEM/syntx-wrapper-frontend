'use client';

import { useOrganStore } from '../store';

export default function FormatLayer() {
  const snapshot = useOrganStore((state) => state.snapshot);
  const nodes = useOrganStore((state) => state.nodes);
  const bindingPreview = useOrganStore((state) => state.bindingPreview);

  if (!snapshot) return null;

  const getFormatPosition = (index: number, total: number) => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;
    const angle = (index / total) * Math.PI * 2;
    const radius = Math.min(w, h) * 0.45;
    return { x: w / 2 + Math.cos(angle) * radius, y: h / 2 + Math.sin(angle) * radius };
  };

  return (
    <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
      {snapshot.formats.map((format, index) => {
        const pos = getFormatPosition(index, snapshot.formats.length);
        const binding = snapshot.bindings.find(b => b.formatName === format.name);
        const profileNode = binding ? nodes[binding.profileId] : null;
        const isPreview = bindingPreview?.formatName === format.name;

        return (
          <g key={format.name}>
            <circle cx={pos.x} cy={pos.y} r="20" fill="rgba(157,0,255,0.2)" stroke={isPreview ? '#00d4ff' : '#9d00ff'} strokeWidth={isPreview ? 3 : 2} opacity={isPreview ? 1 : 0.6} style={{ animation: isPreview ? 'formatPulse 1s ease-in-out infinite' : 'none' }} />
            <text x={pos.x} y={pos.y + 4} fill="#fff" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{format.name.substring(0, 6)}</text>
            {profileNode && !isPreview && (
              <line x1={profileNode.position.x} y1={profileNode.position.y} x2={pos.x} y2={pos.y} stroke="rgba(14,165,233,0.4)" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
            )}
            {isPreview && bindingPreview && (
              <line x1={nodes[bindingPreview.profileId]?.position.x || 0} y1={nodes[bindingPreview.profileId]?.position.y || 0} x2={pos.x} y2={pos.y} stroke="#00d4ff" strokeWidth="2" opacity="0.8" style={{ animation: 'flowLine 1s ease-in-out infinite' }} />
            )}
          </g>
        );
      })}
      <defs>
        <style>{`
          @keyframes formatPulse { 0%, 100% { r: 20; } 50% { r: 24; } }
          @keyframes flowLine { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        `}</style>
      </defs>
    </svg>
  );
}
