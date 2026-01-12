'use client';

import { useOrganStore, PREVIEW_THRESHOLD, COMMIT_THRESHOLD } from '../store';
import { useProfilePhysics } from '../hooks/useProfilePhysics';
import { useState } from 'react';

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

  useProfilePhysics();

  if (!snapshot) return null;

  const getFormatPosition = (name: string, total: number, index: number) => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;
    const angle = (index / total) * Math.PI * 2;
    const radius = Math.min(w, h) * 0.45;
    return { x: w / 2 + Math.cos(angle) * radius, y: h / 2 + Math.sin(angle) * radius };
  };

  const getProfileColor = (weight: number, bindingCount: number) => {
    if (bindingCount === 0) return { from: 'rgba(100,100,120,0.6)', to: 'rgba(80,80,100,0.5)' };
    if (weight > 70) return { from: 'rgba(157,0,255,0.7)', to: 'rgba(255,0,100,0.6)' };
    if (weight > 40) return { from: 'rgba(14,165,233,0.7)', to: 'rgba(157,0,255,0.5)' };
    return { from: 'rgba(0,255,179,0.6)', to: 'rgba(14,165,233,0.5)' };
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
    <div 
      style={{ position: 'absolute', inset: 0, zIndex: 10 }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {snapshot.profiles.map((profile) => {
        const node = nodes[profile.id];
        if (!node) return null;

        const isFocused = focusProfileId === profile.id;
        const isHovered = hoverProfileId === profile.id;
        const isDragging = draggingProfileId === profile.id;
        const bindingCount = snapshot.bindings.filter(b => b.profileId === profile.id).length;
        const colors = getProfileColor(profile.weight, bindingCount);

        return (
          <div
            key={profile.id}
            onMouseDown={(e) => handleMouseDown(e, profile.id)}
            onMouseEnter={() => setHover(profile.id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => handleClick(profile.id)}
            style={{
              position: 'absolute',
              left: node.position.x - node.radius,
              top: node.position.y - node.radius,
              width: node.radius * 2,
              height: node.radius * 2,
              cursor: isDragging ? 'grabbing' : 'grab',
              transform: `scale(${isFocused ? 1.2 : 1})`,
              transition: isDragging ? 'none' : 'transform 0.2s',
              zIndex: isDragging ? 1000 : (isFocused ? 100 : 10),
            }}
          >
            <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: `radial-gradient(circle, ${colors.from.replace('0.', '0.3')} 0%, transparent 70%)`, filter: 'blur(8px)', opacity: 0.8 }} />
            <div style={{
              position: 'absolute',
              inset: 2,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
              border: `2px solid ${isFocused ? '#0ea5e9' : isHovered ? '#00d4ff' : 'rgba(14,165,233,0.4)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '10px',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              boxShadow: isFocused ? '0 0 20px rgba(14,165,233,0.8)' : 'none',
            }}>
              {profile.label.substring(0, 4).toUpperCase()}
            </div>
            {profile.active && !isDragging && <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid #0ea5e9', animation: 'pulseRing 2s ease-out infinite' }} />}
            {bindingCount > 0 && <div style={{ position: 'absolute', top: -6, right: -6, width: 16, height: 16, borderRadius: '50%', background: '#9d00ff', color: '#fff', fontSize: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '2px solid #0a0e27' }}>{bindingCount}</div>}
          </div>
        );
      })}
      <style jsx>{`@keyframes pulseRing { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(1.6); opacity: 0; } }`}</style>
    </div>
  );
}
