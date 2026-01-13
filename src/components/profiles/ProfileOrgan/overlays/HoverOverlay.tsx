'use client';

import { useOrganStore } from '../store';
import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface FullProfileData {
  name: string;
  description?: string;
  strategy: string;
  components: Record<string, any>;
  changelog?: Array<{
    timestamp: string;
    changed_by: string;
    reason: string;
    changes?: any;
  }>;
  mistral_wrapper?: string;
  gpt_wrapper?: string;
  drift_scoring?: {
    enabled: boolean;
    threshold?: number;
  };
  resonanz_score?: number;
}

export default function HoverOverlay() {
  const snapshot = useOrganStore((state) => state.snapshot);
  const nodes = useOrganStore((state) => state.nodes);
  const hoverProfileId = useOrganStore((state) => state.hoverProfileId);
  const draggingProfileId = useOrganStore((state) => state.draggingProfileId);
  const editProfileId = useOrganStore((state) => state.editProfileId);

  const [manifestation, setManifestation] = useState(0);
  const [fullProfileData, setFullProfileData] = useState<FullProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const x = useSpring(0, { stiffness: 40, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 40, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (!hoverProfileId || !snapshot) {
      setManifestation(0);
      setFullProfileData(null);
      return;
    }

    const profile = snapshot.profiles.find(p => p.id === hoverProfileId);
    if (!profile) return;

    // Find binding for this profile
    const binding = snapshot.bindings.find(b => b.profileId === profile.id);

    // If profile has binding, use stroeme-profil-fuer-format endpoint 🌊
    if (binding) {
      setIsLoading(true);
      fetch(`https://dev.syntx-system.com/mapping/formats/${binding.formatName}/stroeme-profil-fuer-format`)
        .then(res => res.json())
        .then(data => {
          if (data.erfolg) {
            setFullProfileData({
              name: data.profile_name || profile.name,
              description: data.profile_description,
              strategy: data.profile_strategy || 'unknown',
              components: data.profile_components || {},
              changelog: data.profile_changelog || [],
              mistral_wrapper: data.mistral_wrapper,
              gpt_wrapper: data.gpt_wrapper,
              drift_scoring: data.drift_scoring,
              resonanz_score: data.resonanz_score,
            });
          }
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch full profile:', err);
          setIsLoading(false);
        });
    } else {
      // Fallback to basic profile data
      fetch(`https://dev.syntx-system.com/resonanz/profiles/crud`)
        .then(res => res.json())
        .then(data => {
          const profileData = data.profiles[hoverProfileId];
          if (profileData) {
            setFullProfileData({
              name: profileData.name || profile.name,
              description: profileData.description,
              strategy: profileData.strategy || 'unknown',
              components: profileData.components || {},
              changelog: [],
            });
          }
        });
    }

    const timer = setTimeout(() => setManifestation(1), 150);
    return () => clearTimeout(timer);
  }, [hoverProfileId, snapshot]);

  if (!hoverProfileId || draggingProfileId || editProfileId || !snapshot) return null;

  const profile = snapshot.profiles.find(p => p.id === hoverProfileId);
  const node = nodes[hoverProfileId];
  if (!profile || !node) return null;

  const binding = snapshot.bindings.find(b => b.profileId === profile.id);

  const strategy = fullProfileData?.strategy || 'unknown';
  const components = fullProfileData?.components || {};
  const componentKeys = Object.keys(components);

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

  const changelog = fullProfileData?.changelog || [];
  const hasChangelog = changelog.length > 0;

  return (
    <motion.div
      style={{ 
        position: 'absolute', 
        left: 0, 
        top: 0, 
        x, 
        y, 
        scale, 
        opacity, 
        zIndex: 500, 
        pointerEvents: 'none',
        filter: `blur(${blur * (1 - manifestation)}px)`,
      }}
      initial={{ opacity: 0, scale: 0.88, y: baseY + 40 }}
      animate={{ opacity, scale, y: baseY + driftOffsetY }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{
        background: 'rgba(10, 14, 39, 0.92)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(0, 255, 255, 0.15)',
        borderRadius: '16px',
        padding: '20px 24px',
        minWidth: '340px',
        maxWidth: '420px',
        boxShadow: `
          0 0 40px rgba(0, 255, 255, ${0.08 * kohaerenz}),
          0 0 80px rgba(138, 43, 226, ${0.05 * tiefe}),
          inset 0 1px 0 rgba(255, 255, 255, 0.08)
        `,
      }}>
        {/* HEADER */}
        <div style={{ marginBottom: '16px', borderBottom: '1px solid rgba(0, 255, 255, 0.1)', paddingBottom: '12px' }}>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: 600, 
            color: '#00ffff',
            marginBottom: '6px',
            textShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
          }}>
            {fullProfileData?.name || profile.label}
          </div>
          
          {fullProfileData?.description && (
            <div style={{ 
              fontSize: '13px', 
              color: 'rgba(255, 255, 255, 0.6)',
              marginTop: '6px',
              lineHeight: '1.4',
            }}>
              {fullProfileData.description}
            </div>
          )}

          {binding && (
            <div style={{ 
              marginTop: '12px',
              padding: '12px',
              background: 'rgba(0, 0, 0, 0.6)',
              border: '2px solid rgba(0, 255, 255, 0.3)',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* LED GLOW EFFECT */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
                animation: 'ledScan 2s linear infinite',
              }} />
              
              <div style={{ 
                fontSize: '10px', 
                color: 'rgba(255, 255, 255, 0.5)',
                letterSpacing: '1px',
                marginBottom: '6px',
                fontFamily: 'monospace',
              }}>
                🔗 FORMAT BINDING
              </div>
              
              <div style={{ 
                fontSize: '16px', 
                color: '#00ffff',
                fontWeight: 700,
                fontFamily: '"Orbitron", monospace',
                letterSpacing: '2px',
                textShadow: `
                  0 0 10px #00ffff,
                  0 0 20px #00ffff,
                  0 0 30px rgba(0, 255, 255, 0.5)
                `,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#00ffff',
                  boxShadow: '0 0 10px #00ffff',
                  animation: 'ledPulse 1s ease-in-out infinite',
                }} />
                {binding.formatName}
              </div>
            </div>
          )}
        </div>

        {/* STRATEGY */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '6px', letterSpacing: '0.5px' }}>
            STRATEGY
          </div>
          <div style={{ 
            fontSize: '13px', 
            color: '#00ffff',
            fontFamily: 'monospace',
            background: 'rgba(0, 255, 255, 0.05)',
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid rgba(0, 255, 255, 0.1)',
          }}>
            {strategy}
          </div>
        </div>

        {/* WRAPPERS (if bound) */}
        {binding && fullProfileData?.mistral_wrapper && (
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '6px', letterSpacing: '0.5px' }}>
              WRAPPERS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#8a2be2', fontSize: '10px' }}>🤖 MISTRAL:</span>
                <span style={{ fontFamily: 'monospace', fontSize: '11px' }}>{fullProfileData.mistral_wrapper}</span>
              </div>
              {fullProfileData.gpt_wrapper && (
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#00ffff', fontSize: '10px' }}>🧠 GPT:</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '11px' }}>{fullProfileData.gpt_wrapper}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* RESONANZ SCORE (if available) */}
        {fullProfileData?.resonanz_score !== undefined && (
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '6px', letterSpacing: '0.5px' }}>
              RESONANZ SCORE
            </div>
            <div style={{ 
              fontSize: '20px', 
              color: '#00ffff',
              fontWeight: 600,
              textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
            }}>
              {fullProfileData.resonanz_score.toFixed(1)} / 10
            </div>
          </div>
        )}

        {/* FIELD METRICS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: hasChangelog ? '16px' : '0' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '4px' }}>DRIFT</div>
            <div style={{ 
              fontSize: '15px', 
              fontWeight: 600,
              color: drift > 0.5 ? '#ff4444' : '#00ffff',
            }}>
              {(drift * 100).toFixed(0)}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '4px' }}>TIEFE</div>
            <div style={{ 
              fontSize: '15px', 
              fontWeight: 600,
              color: '#8a2be2',
            }}>
              {(tiefe * 100).toFixed(0)}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '4px' }}>KOHÄRENZ</div>
            <div style={{ 
              fontSize: '15px', 
              fontWeight: 600,
              color: '#00ffff',
            }}>
              {(kohaerenz * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        {/* CHANGELOG (if available) 🔥 */}
        {hasChangelog && (
          <div style={{ 
            marginTop: '16px', 
            paddingTop: '16px', 
            borderTop: '1px solid rgba(0, 255, 255, 0.1)',
          }}>
            <div style={{ 
              fontSize: '11px', 
              color: 'rgba(255, 255, 255, 0.5)', 
              marginBottom: '10px', 
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span>📜</span>
              CHANGELOG ({changelog.length})
            </div>
            <div style={{ 
              maxHeight: '200px', 
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              {changelog.slice(0, 5).map((entry, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(0, 255, 255, 0.03)',
                    border: '1px solid rgba(0, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    fontSize: '11px',
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                  }}>
                    <span style={{ color: '#8a2be2', fontWeight: 600 }}>
                      {entry.changed_by}
                    </span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '10px' }}>
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.4' }}>
                    {entry.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LOADING INDICATOR */}
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#00ffff',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
            animation: 'pulse 1s infinite',
          }} />
        )}
      </div>
    </motion.div>
  );
}
