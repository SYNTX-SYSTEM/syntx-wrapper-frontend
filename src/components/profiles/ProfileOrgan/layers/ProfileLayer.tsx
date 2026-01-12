'use client';

import { useOrganStore, PREVIEW_THRESHOLD, COMMIT_THRESHOLD } from '../store';
import { useOrbitPhysics } from '../hooks/useOrbitPhysics';
import { useState, useEffect } from 'react';

export default function ProfileLayer() {
  const snapshot = useOrganStore((state) => state.snapshot);
  const nodes = useOrganStore((state) => state.nodes);
  const hoverProfileId = useOrganStore((state) => state.hoverProfileId);
  const focusProfileId = useOrganStore((state) => state.focusProfileId);
  const draggingProfileId = useOrganStore((state) => state.draggingProfileId);
  const editProfileId = useOrganStore((state) => state.editProfileId);
  const setHover = useOrganStore((state) => state.setHover);
  const setFocus = useOrganStore((state) => state.setFocus);
  const setDragging = useOrganStore((state) => state.setDragging);
  const setEdit = useOrganStore((state) => state.setEdit);
  const updateNodePosition = useOrganStore((state) => state.updateNodePosition);
  const setBindingPreview = useOrganStore((state) => state.setBindingPreview);

  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [profileStrategies, setProfileStrategies] = useState<Record<string, string>>({});
  const [profileLabels, setProfileLabels] = useState<Record<string, string>>({});
  const [strategyColors, setStrategyColors] = useState<Record<string, string>>({});

  useOrbitPhysics();

  useEffect(() => {
    fetch('https://dev.syntx-system.com/resonanz/profiles/crud')
      .then(res => res.json())
      .then(data => {
        const strategies: Record<string, string> = {};
        const labels: Record<string, string> = {};
        const uniqueStrategies = new Set<string>();
        
        Object.entries(data.profiles).forEach(([id, profile]: [string, any]) => {
          const strat = profile.strategy || 'unknown';
          strategies[id] = strat;
          labels[id] = profile.label || profile.name || id;
          uniqueStrategies.add(strat);
        });
        
        setProfileStrategies(strategies);
        setProfileLabels(labels);
        
        // GENERATE DYNAMIC COLORS FOR EACH UNIQUE STRATEGY
        const colorPalette = [
          '#00d4ff', // cyan
          '#9d00ff', // purple
          '#ff6600', // orange
          '#10b981', // green
          '#f59e0b', // amber
          '#ef4444', // red
          '#8b5cf6', // violet
          '#ec4899', // pink
          '#06b6d4', // teal
          '#84cc16', // lime
        ];
        
        const colors: Record<string, string> = {};
        Array.from(uniqueStrategies).forEach((strat, idx) => {
          colors[strat] = colorPalette[idx % colorPalette.length];
        });
        
        setStrategyColors(colors);
      });
  }, []);

  if (!snapshot) return null;

  const getFormatPosition = (name: string, total: number, index: number) => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;
    const angle = (index / total) * Math.PI * 2;
    const radius = Math.min(w, h) * 0.45;
    return { x: w / 2 + Math.cos(angle) * radius, y: h / 2 + Math.sin(angle) * radius };
  };

  const getProfileColor = (bindingCount: number) => {
    if (bindingCount === 0) return { from: 'rgba(100,100,120,0.9)', to: 'rgba(70,70,90,0.85)', glow: 'rgba(100,100,120,0.6)' };
    if (bindingCount === 1) return { from: 'rgba(0,255,179,0.95)', to: 'rgba(14,165,233,0.9)', glow: 'rgba(0,255,179,0.7)' };
    if (bindingCount === 2) return { from: 'rgba(14,165,233,0.95)', to: 'rgba(157,0,255,0.9)', glow: 'rgba(14,165,233,0.8)' };
    if (bindingCount >= 3) return { from: 'rgba(157,0,255,0.95)', to: 'rgba(255,0,100,0.92)', glow: 'rgba(157,0,255,0.85)' };
    return { from: 'rgba(255,215,0,0.95)', to: 'rgba(255,140,0,0.9)', glow: 'rgba(255,215,0,0.7)' };
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    const node = nodes[id];
    if (!node) return;
    setDragStart({ x: e.clientX - node.position.x, y: e.clientY - node.position.y });
    setDragging(id);
    e.stopPropagation();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingProfileId || !dragStart) return;
    const newPos = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y };
    updateNodePosition(draggingProfileId, newPos);

    const closestResult = snapshot.formats.reduce<{ name: string; distance: number } | null>((closest, format, idx) => {
      const formatPos = getFormatPosition(format.name, snapshot.formats.length, idx);
      const dist = Math.hypot(newPos.x - formatPos.x, newPos.y - formatPos.y);
      if (!closest || dist < closest.distance) {
        return { name: format.name, distance: dist };
      }
      return closest;
    }, null);

    if (closestResult && closestResult.distance < PREVIEW_THRESHOLD) {
      setBindingPreview({ profileId: draggingProfileId, formatName: closestResult.name, distance: closestResult.distance });
    } else {
      setBindingPreview(null);
    }
  };

  const handleMouseUp = async () => {
    const preview = useOrganStore.getState().bindingPreview;
    if (preview && preview.distance < COMMIT_THRESHOLD) {
      try {
        await fetch(`https://dev.syntx-system.com/resonanz/formats/${preview.formatName}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile_reference: preview.profileId }),
        });
      } catch (err) {
        console.error('Binding failed:', err);
      }
    }
    setDragging(null);
    setDragStart(null);
    setBindingPreview(null);
  };

  const handleClick = (id: string) => {
    if (draggingProfileId) return;
    if (focusProfileId === id) {
      setEdit(id);
    } else {
      setFocus(id);
    }
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 10 }} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      {snapshot.profiles.map((profile) => {
        const node = nodes[profile.id];
        if (!node) return null;
        const isFocused = focusProfileId === profile.id;
        const isHovered = hoverProfileId === profile.id;
        const isDragging = draggingProfileId === profile.id;
        const bindingCount = snapshot.bindings.filter(b => b.profileId === profile.id).length;
        const colors = getProfileColor(bindingCount);
        const strategy = profileStrategies[profile.id] || 'unknown';
        const ringColor = strategyColors[strategy] || '#606080';
        const displayLabel = profileLabels[profile.id] || profile.label;
        const radius = 42;

        return (
          <div key={profile.id} onMouseDown={(e) => handleMouseDown(e, profile.id)} onMouseEnter={() => setHover(profile.id)} onMouseLeave={() => setHover(null)} onClick={() => handleClick(profile.id)} style={{ position: 'absolute', left: node.position.x - radius, top: node.position.y - radius, width: radius * 2, height: radius * 2, cursor: isDragging ? 'grabbing' : 'grab', transform: `scale(${isFocused ? 1.2 : 1})`, transition: isDragging ? 'none' : 'transform 0.2s', zIndex: isDragging ? 1000 : (isFocused ? 100 : 10) }}>
            
            {/* NEON GLOW NAME ABOVE */}
            <div style={{ position: 'absolute', top: -35, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', color: '#00d4ff', fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace', textShadow: `0 0 20px ${ringColor}, 0 0 40px ${ringColor}, 0 0 60px ${ringColor}80, 0 4px 15px rgba(0,0,0,0.8)`, letterSpacing: '1.5px', filter: 'blur(0.3px)', pointerEvents: 'none' }}>
              {displayLabel}
            </div>

            {/* SATURN RING - ORBITAL (TILTED) - DYNAMIC COLOR */}
            <div style={{ position: 'absolute', left: '50%', top: '50%', width: radius * 2.8, height: radius * 1.4, border: `3px solid ${ringColor}`, borderRadius: '50%', opacity: 0.8, transform: 'translate(-50%, -50%) rotateX(75deg)', animation: 'saturnOrbit 12s linear infinite', boxShadow: `0 0 20px ${ringColor}`, transformStyle: 'preserve-3d' }} />

            {/* OUTER GLOW */}
            <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`, filter: 'blur(15px)', opacity: 1 }} />
            
            {/* MAIN BUBBLE */}
            <div style={{ position: 'absolute', inset: 4, borderRadius: '50%', background: `radial-gradient(circle at 30% 30%, ${colors.from}, ${colors.to} 70%, rgba(0,0,0,0.6))`, border: `3px solid ${isFocused ? '#0ea5e9' : isHovered ? '#00d4ff' : 'rgba(14,165,233,0.5)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: 'bold', fontFamily: 'monospace', boxShadow: isFocused ? '0 0 30px rgba(14,165,233,1)' : '0 0 18px rgba(0,0,0,0.4)', overflow: 'hidden', position: 'relative' }}>
              
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(45deg, transparent 30%, ${colors.from.replace(/0\.\d+/, '0.7')} 50%, transparent 70%)`, animation: 'gradientFlow 3.5s ease-in-out infinite' }} />
              
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 20% 80%, ${colors.glow} 2px, transparent 2px), radial-gradient(circle at 80% 20%, ${colors.glow} 1.5px, transparent 1.5px), radial-gradient(circle at 50% 50%, ${colors.glow} 1px, transparent 1px)`, backgroundSize: '40px 40px, 30px 30px, 25px 25px', opacity: 0.4, animation: 'particleFloat 8s ease-in-out infinite' }} />
              
              <span style={{ position: 'relative', zIndex: 1, fontSize: '24px', opacity: 0.7, textShadow: '0 0 8px rgba(255,255,255,0.5)' }}>
                {profile.id.substring(0, 1).toUpperCase()}
              </span>
            </div>

            {profile.active && !isDragging && <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #0ea5e9', animation: 'pulseRing 2s ease-out infinite' }} />}
            
            {bindingCount > 0 && <div style={{ position: 'absolute', top: -10, right: -10, width: 24, height: 24, borderRadius: '50%', background: '#9d00ff', color: '#fff', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '3px solid #0a0e27', boxShadow: '0 0 15px rgba(157,0,255,1)' }}>{bindingCount}</div>}
          </div>
        );
      })}
      <style jsx>{`
        @keyframes pulseRing { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.8); opacity: 0; } }
        @keyframes saturnOrbit { from { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(0deg); } to { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(360deg); } }
        @keyframes gradientFlow { 0%, 100% { transform: translateX(-60%) rotate(0deg); } 50% { transform: translateX(60%) rotate(180deg); } }
        @keyframes particleFloat { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(5px, -5px); } }
      `}</style>
    </div>
  );
}
