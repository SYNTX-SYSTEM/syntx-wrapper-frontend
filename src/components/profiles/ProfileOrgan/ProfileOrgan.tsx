'use client';

// ═══════════════════════════════════════════════════════════════════════════
// 👑 PROFILE ORGAN - Living System (SYNTX)
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect } from 'react';
import { useOrganStore } from './store';
import { useSystemSnapshot } from './hooks/useSystemSnapshot';
import FieldLayer from './layers/FieldLayer';
import ProfileLayer from './layers/ProfileLayer';
import FormatLayer from './layers/FormatLayer';
import HoverOverlay from './overlays/HoverOverlay';
import EditOverlay from './overlays/EditOverlay';

export default function ProfileOrgan() {
  const { data: snapshot, error, isLoading } = useSystemSnapshot();
  const setSnapshot = useOrganStore((state) => state.setSnapshot);
  const dirty = useOrganStore((state) => state.dirty);
  const stabilize = useOrganStore((state) => state.stabilize);
  const editProfileId = useOrganStore((state) => state.editProfileId);

  useEffect(() => {
    if (snapshot) setSnapshot(snapshot);
  }, [snapshot, setSnapshot]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's' && !editProfileId) {
        e.preventDefault();
        if (dirty) {
          stabilize();
          console.log('⚡ SYSTEM STABILIZED');
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [dirty, stabilize, editProfileId]);

  if (isLoading) {
    return (
      <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)', color: '#00d4ff', fontFamily: 'monospace', fontSize: '14px' }}>
        ⚡ LOADING SYSTEM...
      </div>
    );
  }

  if (error || !snapshot) {
    return (
      <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)', color: '#ff4444', fontFamily: 'monospace', fontSize: '14px' }}>
        ❌ ERROR: {error?.message || 'NO SNAPSHOT'}
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)' }}>
      {/* EBENE 1: FELD */}
      <FieldLayer />

      {/* EBENE 2: FORMATE */}
      <FormatLayer />

      {/* EBENE 3: PROFILE */}
      <ProfileLayer />

      {/* EBENE 4: HOVER OVERLAY */}
      <HoverOverlay />

      {/* EBENE 5: EDIT OVERLAY */}
      <EditOverlay />

      {/* STABILIZE BUTTON */}
      {dirty && !editProfileId && (
        <button
          onClick={stabilize}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            padding: '10px 20px',
            background: 'rgba(14,165,233,0.2)',
            border: '2px solid #0ea5e9',
            borderRadius: '6px',
            color: '#0ea5e9',
            fontFamily: 'monospace',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            zIndex: 1000,
            animation: 'stabilizePulse 2s ease-in-out infinite',
            boxShadow: '0 0 20px rgba(14,165,233,0.5)',
          }}
        >
          ⚡ STABILIZE (CMD+S)
        </button>
      )}

      <style jsx>{`
        @keyframes stabilizePulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
