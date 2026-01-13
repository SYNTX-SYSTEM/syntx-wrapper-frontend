'use client';

import { useOrganStore, PREVIEW_THRESHOLD, COMMIT_THRESHOLD } from '../store';
import { useOrbitPhysics } from '../hooks/useOrbitPhysics';
import { useState, useEffect } from 'react';

interface ProfileLayerProps {
  onBindingCreated?: (profileId: string, formatName: string) => void;
  onBindingError?: (error: string) => void;
}

export default function ProfileLayer({ onBindingCreated, onBindingError }: ProfileLayerProps) {
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
        
        const colorPalette = [
          '#00d4ff', '#9d00ff', '#ff6600', '#10b981', '#f59e0b',
          '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16',
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
    if (bindingCount >= 2) return { from: 'rgba(157,0,255,0.95)', to: 'rgba(255,0,100,0.92)', glow: 'rgba(157,0,255,0.85)' };
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
        const url = 'https://dev.syntx-system.com/mapping/formats/' + preview.formatName + '/kalibriere-format-profil?profile_id=' + preview.profileId;
        const response = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
          // UPDATE STORE DIRECTLY - NO RELOAD! 💎
          const currentSnapshot = useOrganStore.getState().snapshot;
          if (currentSnapshot) {
            const newBindings = [
              ...currentSnapshot.bindings.filter(b => b.formatName !== preview.formatName),
              { profileId: preview.profileId, formatName: preview.formatName }
            ];
            useOrganStore.getState().setSnapshot({
              ...currentSnapshot,
              bindings: newBindings,
              timestamp: Date.now(),
            });
          }
          
          if (onBindingCreated) {
            onBindingCreated(preview.profileId, preview.formatName);
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          if (onBindingError) {
            onBindingError(errorData.message || 'BINDING FAILED');
          }
        }
      } catch (err) {
        console.error('Binding failed:', err);
        if (onBindingError) {
          onBindingError('NETWORK ERROR - BINDING FAILED');
        }
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
        
        const radius = 50;
        const isFocused = focusProfileId === profile.id;
        const isHovered = hoverProfileId === profile.id;
        
        // ORBITAL RINGS DATA 🌊
        const orbitalRings = [
          { offset: 25, speed: 0.0008, opacity: 0.18, dashArray: '3 10' },
          { offset: 42, speed: 0.0005, opacity: 0.12, dashArray: '2 12' },
          { offset: 58, speed: 0.0003, opacity: 0.08, dashArray: '1 14' },
        ];
        const isDragging = draggingProfileId === profile.id;
        const bindingCount = snapshot.bindings.filter(b => b.profileId === profile.id).length;
        const colors = getProfileColor(bindingCount);
        const strategy = profileStrategies[profile.id] || 'unknown';
        const ringColor = strategyColors[strategy] || '#606080';
        const displayLabel = profileLabels[profile.id] || profile.label;

        // RAINDROP RIPPLE EFFECT 💧
        const time = Date.now() * 0.001;
        const ripplePhase = (time * 0.6 + profile.id.length * 0.3) % 2; // 0 to 2 loop
        
        // Create ripple wave: transparent → solid → transparent
        let rippleOpacity;
        if (ripplePhase < 1) {
          // First half: fade in (0 → 1)
          rippleOpacity = ripplePhase;
        } else {
          // Second half: fade out (1 → 0)
          rippleOpacity = 2 - ripplePhase;
        }
        
        // Smooth the transition with ease curve
        rippleOpacity = Math.sin(rippleOpacity * Math.PI / 2);
        
        // Final opacity: 0.3 (transparent) → 1.0 (solid)
        const finalOpacity = 0.3 + rippleOpacity * 0.7;
        
        const baseScale = isFocused ? 1.3 : isHovered ? 1.15 : isDragging ? 1.1 : 1;

        return (
          <div
            key={profile.id}
            onMouseDown={(e) => handleMouseDown(e, profile.id)}
            onMouseEnter={() => setHover(profile.id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => handleClick(profile.id)}
            style={{
              position: 'absolute',
              left: node.position.x - radius,
              top: node.position.y - radius,
              width: radius * 2,
              height: radius * 2,
              cursor: isDragging ? 'grabbing' : 'grab',
              transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
              transform: `scale(${baseScale})`,
              opacity: finalOpacity,
              zIndex: isDragging ? 1000 : isFocused ? 100 : isHovered ? 50 : 10,
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${colors.from}, ${colors.to})`,
              boxShadow: `0 0 ${isHovered || isDragging ? 40 : 20}px ${colors.glow}, inset 0 0 ${isHovered || isDragging ? 30 : 15}px rgba(0,0,0,0.5)`,
              border: `3px solid ${ringColor}`,
              position: 'relative',
              overflow: 'visible',
            }}>
              {/* ORBITAL SATURN RINGS 🪐 */}
              {orbitalRings.map((ring, idx) => {
                const rotation = (time * ring.speed + idx * 0.5) % (Math.PI * 2);
                const rotationDeg = (rotation * 180 / Math.PI);
                
                return (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: `${100 + ring.offset * 2}%`,
                      height: `${100 + ring.offset * 2}%`,
                      transform: `translate(-50%, -50%) rotate(${rotationDeg}deg)`,
                      borderRadius: '50%',
                      border: `2px solid ${ringColor}`,
                      borderStyle: 'dashed',
                      borderSpacing: ring.dashArray,
                      opacity: ring.opacity,
                      pointerEvents: 'none',
                    }}
                  />
                );
              })}
              
              {/* HORIZONTAL RING */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotateX(75deg)',
                width: '140%',
                height: '70%',
                border: `4px solid ${ringColor}`,
                borderRadius: '50%',
                opacity: 0.6,
                boxShadow: `0 0 15px ${ringColor}`,
              }} />

            </div>
            
            {/* RIPPLE WAVES FROM INSIDE OUT 🌊 */}
            {[1, 2, 3, 4].map((waveIdx) => {
              const waveDelay = waveIdx * 0.25;
              const wavePhase = (time * 0.8 + profile.id.length * 0.2 + waveDelay) % 2;
              
              // Wave expands from inside out
              let waveScale, waveOpacity;
              if (wavePhase < 1) {
                // Expanding from center outward
                waveScale = 0.3 + wavePhase * 1.2; // 0.3 → 1.5
                waveOpacity = (1 - wavePhase) * 0.5; // 0.5 → 0 (fades as expands)
              } else {
                // Reset/invisible
                waveScale = 0.3;
                waveOpacity = 0;
              }
              
              return (
                <div
                  key={`wave-${waveIdx}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    transform: `translate(-50%, -50%) scale(${waveScale})`,
                    borderRadius: '50%',
                    border: `2px solid ${ringColor}`,
                    opacity: waveOpacity,
                    pointerEvents: 'none',
                    boxShadow: `0 0 ${10 * waveOpacity}px ${ringColor}`,
                  }}
                />
              );
            })}
            
            {/* LABEL OUTSIDE PLANET 💎 */}
            <div style={{
              position: 'absolute',
              bottom: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              color: ringColor,
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: '"Orbitron", "Rajdhani", "Space Mono", monospace',
              letterSpacing: '1.5px',
              textShadow: `0 0 12px ${ringColor}, 0 0 24px ${ringColor}`,
              pointerEvents: 'none',
              opacity: isHovered || isDragging ? 1 : 0.85,
            }}>
              {displayLabel}
            </div>
          </div>
        );
      })}
    </div>
  );
}
