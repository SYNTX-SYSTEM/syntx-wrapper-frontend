'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProfileTooltipData, type ProfileTooltipData } from '@/lib/tooltips';

interface ProfileHoverOverlayProps {
  isVisible: boolean;
  position: { x: number; y: number };
  profileId: string | null;
  profileLabel?: string;
}

export default function ProfileHoverOverlay({ isVisible, position, profileId }: ProfileHoverOverlayProps) {
  const [data, setData] = useState<ProfileTooltipData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isVisible || !profileId) {
      setData(null);
      setError(false);
      return;
    }

    setLoading(true);
    setError(false);

    getProfileTooltipData(profileId)
      .then((tooltipData) => {
        if (tooltipData) {
          setData(tooltipData);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [isVisible, profileId]);

  if (!isVisible || !profileId) return null;

  const color = data?.profileColor.primary || '#9d00ff';
  const glow = data?.profileColor.glow || 'rgba(157, 0, 255, 0.6)';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed',
          left: position.x + 20,
          top: position.y + 20,
          zIndex: 99999,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${color}15, ${color}05)`,
            backdropFilter: 'blur(20px)',
            border: `2px solid ${color}`,
            borderRadius: '16px',
            overflow: 'hidden',
            minWidth: '420px',
            maxWidth: '500px',
            boxShadow: `0 0 50px ${glow}, inset 0 0 30px ${color}20`,
          }}
        >
          {/* LOADING */}
          {loading && (
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: `3px solid ${color}`,
                  borderTop: '3px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <span style={{ color: color, fontSize: '14px', fontFamily: 'monospace', fontWeight: 600 }}>
                  Loading profile data...
                </span>
              </div>
            </div>
          )}

          {/* ERROR */}
          {error && !loading && (
            <div style={{ padding: '24px' }}>
              <span style={{ color: '#ef4444', fontSize: '14px', fontFamily: 'monospace' }}>
                ⚠️ Failed to load profile
              </span>
            </div>
          )}

          {/* SUCCESS - MEGA TOOLTIP */}
          {data && !loading && !error && (
            <>
              {/* HEADER */}
              <div style={{
                padding: '20px 24px',
                borderBottom: `1px solid ${color}40`,
                background: `linear-gradient(to right, ${color}20, transparent)`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ color: color, fontSize: '20px', fontWeight: 700, margin: 0, letterSpacing: '0.5px' }}>
                      {data.profileLabel}
                    </h3>
                    <p style={{ color: '#888', fontSize: '12px', margin: '4px 0 0 0', fontFamily: 'monospace' }}>
                      {data.profileName}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: `2px solid ${color}`,
                    background: `${color}10`,
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: data.profileActive ? color : '#666',
                      boxShadow: data.profileActive ? `0 0 12px ${glow}` : 'none',
                    }} />
                    <span style={{ color: color, fontSize: '12px', fontWeight: 700, fontFamily: 'monospace' }}>
                      {data.profileActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                </div>
                {data.profileDescription && (
                  <p style={{ color: '#ccc', fontSize: '13px', margin: '12px 0 0 0', lineHeight: '1.5' }}>
                    {data.profileDescription}
                  </p>
                )}
              </div>

              {/* STRATEGY & WEIGHT */}
              <div style={{ padding: '20px 24px', borderBottom: `1px solid ${color}40` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ color: '#888', fontSize: '11px', fontFamily: 'monospace', fontWeight: 600 }}>
                    PROFILE CONFIG
                  </span>
                  <div style={{ height: '1px', flex: 1, background: `linear-gradient(to right, ${color}40, transparent)` }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <span style={{ color: '#888', fontSize: '12px', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>
                      Strategy
                    </span>
                    <span style={{ color: color, fontSize: '16px', fontWeight: 700, textTransform: 'uppercase' }}>
                      {data.profileStrategy}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: '#888', fontSize: '12px', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>
                      Weight
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ color: color, fontSize: '16px', fontWeight: 700, fontFamily: 'monospace' }}>
                        {data.profileWeight}
                      </span>
                      <div style={{ flex: 1, height: '6px', background: '#222', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${data.profileWeight}%`,
                          height: '100%',
                          background: `linear-gradient(to right, ${color}, ${color}80)`,
                          boxShadow: `0 0 8px ${glow}`,
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOUND FORMATS */}
              <div style={{ padding: '20px 24px', borderBottom: `1px solid ${color}40` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ color: '#888', fontSize: '11px', fontFamily: 'monospace', fontWeight: 600 }}>
                    BOUND FORMATS
                  </span>
                  <div style={{ height: '1px', flex: 1, background: `linear-gradient(to right, ${color}40, transparent)` }} />
                  <span style={{ color: color, fontSize: '13px', fontWeight: 700, fontFamily: 'monospace' }}>
                    {data.bindingCount}
                  </span>
                </div>
                {data.boundFormats.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {data.boundFormats.slice(0, 6).map((formatName) => (
                      <div key={formatName} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: color,
                          boxShadow: `0 0 8px ${glow}`,
                        }} />
                        <span style={{ color: '#ccc', fontSize: '13px', fontFamily: 'monospace' }}>
                          {formatName}
                        </span>
                      </div>
                    ))}
                    {data.boundFormats.length > 6 && (
                      <div style={{ color: '#666', fontSize: '12px', fontFamily: 'monospace', marginTop: '4px' }}>
                        +{data.boundFormats.length - 6} more formats
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ color: '#666', fontSize: '13px', fontStyle: 'italic' }}>
                    No formats bound yet
                  </div>
                )}
              </div>

              {/* TAGS & PATTERNS */}
              {(data.tags.length > 0 || data.patterns.length > 0) && (
                <div style={{ padding: '16px 24px' }}>
                  {data.tags.length > 0 && (
                    <div style={{ marginBottom: data.patterns.length > 0 ? '12px' : 0 }}>
                      <span style={{ color: '#888', fontSize: '11px', fontFamily: 'monospace', marginBottom: '8px', display: 'block' }}>
                        TAGS
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {data.tags.slice(0, 5).map((tag, i) => (
                          <span key={i} style={{
                            color: color,
                            fontSize: '11px',
                            fontFamily: 'monospace',
                            padding: '4px 10px',
                            background: `${color}15`,
                            border: `1px solid ${color}40`,
                            borderRadius: '12px',
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.patterns.length > 0 && (
                    <div>
                      <span style={{ color: '#888', fontSize: '11px', fontFamily: 'monospace', marginBottom: '8px', display: 'block' }}>
                        PATTERNS
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {data.patterns.slice(0, 5).map((pattern, i) => (
                          <span key={i} style={{
                            color: '#ccc',
                            fontSize: '11px',
                            fontFamily: 'monospace',
                            padding: '4px 10px',
                            background: '#222',
                            border: '1px solid #444',
                            borderRadius: '12px',
                          }}>
                            {pattern}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* GLOW BOTTOM */}
              <div style={{
                height: '3px',
                background: `linear-gradient(to right, transparent, ${glow}, transparent)`,
              }} />
            </>
          )}
        </div>

        {/* CSS KEYFRAMES FOR SPIN */}
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
