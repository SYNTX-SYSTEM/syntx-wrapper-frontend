'use client';

import { useOrganStore } from '../store';
import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function HoverOverlay() {
  const snapshot = useOrganStore((state) => state.snapshot);
  const nodes = useOrganStore((state) => state.nodes);
  const hoverProfileId = useOrganStore((state) => state.hoverProfileId);
  const draggingProfileId = useOrganStore((state) => state.draggingProfileId);
  const editProfileId = useOrganStore((state) => state.editProfileId);

  const [manifestation, setManifestation] = useState(0);
  const [profileData, setProfileData] = useState<any>(null);
  const [formatData, setFormatData] = useState<any>(null);

  const x = useSpring(0, { stiffness: 40, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 40, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (!hoverProfileId) {
      setManifestation(0);
      setProfileData(null);
      setFormatData(null);
      return;
    }

    fetch(`https://dev.syntx-system.com/resonanz/profiles/crud`)
      .then(res => res.json())
      .then(data => {
        const profile = data.profiles[hoverProfileId];
        if (profile) {
          setProfileData(profile);
          if (profile.format_reference) {
            fetch(`https://dev.syntx-system.com/resonanz/formats/${profile.format_reference}`)
              .then(res => res.json())
              .then(formatRes => setFormatData(formatRes.format));
          }
        }
      });

    const timer = setTimeout(() => setManifestation(1), 150);
    return () => clearTimeout(timer);
  }, [hoverProfileId]);

  if (!hoverProfileId || draggingProfileId || editProfileId || !snapshot) return null;

  const profile = snapshot.profiles.find(p => p.id === hoverProfileId);
  const node = nodes[hoverProfileId];
  if (!profile || !node || !profileData) return null;

  const bindingCount = snapshot.bindings.filter(b => b.profileId === profile.id).length;

  const strategy = profileData.strategy || 'unknown';
  const components = profileData.components || {};
  const componentKeys = Object.keys(components);
  const formatFields = formatData?.fields || [];

  const avgWeight = componentKeys.length > 0 
    ? componentKeys.reduce((sum, key) => sum + (components[key].weight || 0), 0) / componentKeys.length 
    : 0.5;
  
  const drift = 1 - avgWeight;
  const tiefe = avgWeight;
  const kohaerenz = 1 - drift;

  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 600;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;
  const angleFromCenter = Math.atan2(node.position.y - centerY, node.position.x - centerX);
  const offsetDistance = 110;
  
  const baseX = node.position.x + Math.cos(angleFromCenter) * offsetDistance;
  const baseY = node.position.y + Math.sin(angleFromCenter) * offsetDistance - 140;

  const driftOffsetX = Math.sin(Date.now() * 0.0012) * drift * 2;
  const driftOffsetY = Math.cos(Date.now() * 0.0018) * drift * 2;

  x.set(baseX + driftOffsetX);
  y.set(baseY + driftOffsetY);

  const scale = 0.97 + tiefe * 0.08;
  const blur = tiefe > 0.7 ? 14 : 10;
  const opacity = manifestation * (0.97 + kohaerenz * 0.03);

  return (
    <motion.div
      style={{ position: 'absolute', left: 0, top: 0, x, y, scale, opacity, zIndex: 500, pointerEvents: 'none' }}
      initial={{ opacity: 0, scale: 0.88, y: baseY + 40 }}
      animate={{ opacity, scale }}
      exit={{ opacity: 0, scale: 0.94, y: y.get() + 30 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <div style={{
        background: `linear-gradient(135deg, rgba(6,10,25,0.98) 0%, rgba(12,18,38,0.96) 100%)`,
        border: `3px solid rgba(0,212,255,${0.45 + kohaerenz * 0.35})`,
        borderRadius: '18px',
        padding: '28px 32px',
        minWidth: 460,
        maxWidth: 550,
        backdropFilter: `blur(${blur}px) saturate(1.4)`,
        boxShadow: `0 0 ${35 + tiefe * 35}px rgba(0,212,255,${0.25 + tiefe * 0.35}), inset 0 0 ${25 + tiefe * 30}px rgba(0,212,255,${0.04 + tiefe * 0.1}), 0 10px 40px rgba(0,0,0,0.7)`,
      }}>
        
        <div style={{ position: 'absolute', top: 0, left: 0, width: 55, height: 55, borderTop: '4px solid rgba(0,212,255,0.85)', borderLeft: '4px solid rgba(0,212,255,0.85)', borderTopLeftRadius: '18px', opacity: kohaerenz }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 55, height: 55, borderBottom: '4px solid rgba(157,0,255,0.75)', borderRight: '4px solid rgba(157,0,255,0.75)', borderBottomRightRadius: '18px', opacity: kohaerenz }} />

        <motion.div 
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3 }}
          animate={{ background: ['linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.75) 50%, transparent 100%)', 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.95) 50%, transparent 100%)', 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.75) 50%, transparent 100%)'], x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 26, paddingBottom: 22, borderBottom: `2px solid rgba(0,212,255,${0.22 + kohaerenz * 0.2})` }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#00d4ff', fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace', textShadow: `0 0 ${10 + tiefe * 10}px rgba(0,212,255,${0.45 + tiefe * 0.45}), 0 3px 6px rgba(0,0,0,0.6)`, marginBottom: 12, letterSpacing: '1px' }}>{profile.label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, background: 'linear-gradient(135deg, rgba(0,255,179,0.12), rgba(0,255,179,0.06))', padding: '8px 14px', borderRadius: '8px', border: '2px solid rgba(0,255,179,0.35)', boxShadow: '0 0 15px rgba(0,255,179,0.2)' }}>
              <span style={{ color: 'rgba(0,255,179,0.95)', fontSize: '12px', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '1px' }}>STRATEGY</span>
              <span style={{ color: 'rgba(255,255,255,0.95)', fontSize: '13px', fontFamily: 'monospace', fontWeight: 600 }}>{strategy}</span>
            </div>
            <div style={{ color: 'rgba(14,165,233,0.7)', fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.7px', marginTop: 6 }}>ID: {profile.id.substring(0, 20)}...</div>
          </div>
          <div style={{ textAlign: 'right', background: 'linear-gradient(135deg, rgba(157,0,255,0.18), rgba(157,0,255,0.1))', border: '2px solid rgba(157,0,255,0.5)', borderRadius: '12px', padding: '14px 18px', boxShadow: '0 0 25px rgba(157,0,255,0.35)' }}>
            <div style={{ color: '#9d00ff', fontSize: '22px', fontWeight: 'bold', fontFamily: 'monospace', textShadow: '0 0 14px rgba(157,0,255,0.9), 0 3px 6px rgba(0,0,0,0.6)' }}>W:{profile.weight}</div>
            <div style={{ color: '#00ffb3', fontSize: '11px', fontFamily: 'monospace', marginTop: 5, letterSpacing: '1px', fontWeight: 600 }}>{bindingCount} BIND</div>
          </div>
        </div>

        {/* COMPONENTS SECTION */}
        {componentKeys.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: 'rgba(0,212,255,0.9)', fontSize: '13px', fontFamily: 'monospace', fontWeight: 700, marginBottom: 16, letterSpacing: '2px', textTransform: 'uppercase', textShadow: '0 0 8px rgba(0,212,255,0.5)' }}>◆ Scoring Components</div>
            {componentKeys.map((key, idx) => {
              const comp = components[key];
              const value = comp.weight || 0;
              const color = getColorForComponent(key);
              
              return (
                <motion.div 
                  key={key} 
                  style={{ marginBottom: 18, background: 'rgba(255,255,255,0.02)', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: '16px' }}>{getIconForComponent(key)}</span>
                      <span style={{ color, fontSize: '14px', fontFamily: 'monospace', fontWeight: 'bold', textShadow: `0 0 ${7 + value * 7}px ${color}85, 0 2px 4px rgba(0,0,0,0.5)`, letterSpacing: '0.6px' }}>{key.replace(/_/g, ' ').toUpperCase()}</span>
                    </div>
                    <div style={{ color: '#fff', fontSize: '14px', fontFamily: 'monospace', background: 'rgba(255,255,255,0.12)', padding: '5px 14px', borderRadius: '7px', fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{(value * 100).toFixed(0)}%</div>
                  </div>
                  <div style={{ height: 10, background: 'rgba(0,0,0,0.3)', borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }}>
                    <motion.div
                      style={{ height: '100%', background: `linear-gradient(90deg, ${color}, ${color}dd)`, borderRadius: 6, boxShadow: `0 0 16px ${color}60, inset 0 0 12px ${color}40`, position: 'relative' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${value * 100}%`, x: [0, 10, 0] }}
                      transition={{ width: { duration: 0.7, delay: idx * 0.12 }, x: { duration: 2.2 + value * 0.8, repeat: Infinity, ease: 'easeInOut' } }}
                    >
                      <motion.div 
                        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)' }}
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                      />
                    </motion.div>
                  </div>
                  {comp.description && (
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontFamily: 'monospace', marginTop: 6, lineHeight: '1.4', fontStyle: 'italic' }}>{comp.description}</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* FORMAT FIELDS SECTION */}
        {formatFields.length > 0 && (
          <div style={{ marginTop: 24, paddingTop: 24, borderTop: `2px solid rgba(157,0,255,${0.22 + kohaerenz * 0.2})` }}>
            <div style={{ color: 'rgba(157,0,255,0.9)', fontSize: '13px', fontFamily: 'monospace', fontWeight: 700, marginBottom: 16, letterSpacing: '2px', textTransform: 'uppercase', textShadow: '0 0 8px rgba(157,0,255,0.5)' }}>◆ Semantic Fields</div>
            {formatFields.map((field: any, idx: number) => {
              const fieldColor = getColorForField(field.name);
              
              return (
                <motion.div 
                  key={field.name} 
                  style={{ marginBottom: 16, background: 'rgba(255,255,255,0.02)', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: (componentKeys.length * 0.12) + (idx * 0.12), ease: [0.23, 1, 0.32, 1] }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: '16px' }}>{getIconForField(field.name)}</span>
                      <div>
                        <div style={{ color: fieldColor, fontSize: '14px', fontFamily: 'monospace', fontWeight: 'bold', textShadow: `0 0 8px ${fieldColor}85, 0 2px 4px rgba(0,0,0,0.5)`, letterSpacing: '0.6px', marginBottom: 2 }}>{field.header || field.name}</div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', fontFamily: 'monospace', fontStyle: 'italic' }}>{field.name}</div>
                      </div>
                    </div>
                    <div style={{ color: '#fff', fontSize: '13px', fontFamily: 'monospace', background: 'rgba(255,255,255,0.12)', padding: '4px 12px', borderRadius: '7px', fontWeight: 700 }}>{field.weight}%</div>
                  </div>
                  {field.description && (
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontFamily: 'monospace', marginTop: 8, lineHeight: '1.5', background: 'rgba(0,0,0,0.2)', padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>{field.description}</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* DESCRIPTION */}
        {profileData.description && (
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(0,212,255,0.18)', color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontFamily: 'monospace', lineHeight: '1.6', fontStyle: 'italic', background: 'rgba(0,0,0,0.15)', padding: '12px', borderRadius: '8px' }}>
            {profileData.description}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function getColorForComponent(key: string): string {
  const colors: Record<string, string> = {
    keyword_density: '#0ea5e9',
    context_presence: '#10b981',
    semantic_depth: '#8b5cf6',
    coherence: '#00d4ff',
    impact: '#f59e0b',
    drift: '#ff4444',
  };
  return colors[key] || '#06b6d4';
}

function getIconForComponent(key: string): string {
  const icons: Record<string, string> = {
    keyword_density: '🔑',
    context_presence: '🌊',
    semantic_depth: '🧠',
    coherence: '✓',
    impact: '⚡',
    drift: '⚠',
  };
  return icons[key] || '◆';
}

function getColorForField(name: string): string {
  const colors: Record<string, string> = {
    driftkorper: '#ff6b6b',
    kalibrierung: '#4ecdc4',
    stromung: '#45b7d1',
    tiefe: '#5f27cd',
    wirkung: '#00d2d3',
  };
  return colors[name] || '#00d4ff';
}

function getIconForField(name: string): string {
  const icons: Record<string, string> = {
    driftkorper: '⚡',
    kalibrierung: '🎯',
    stromung: '🌊',
    tiefe: '🧠',
    wirkung: '💥',
  };
  return icons[name] || '◆';
}
