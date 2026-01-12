'use client';

import { useOrganStore } from '../store';
import { useEffect } from 'react';

export default function EditOverlay() {
  const snapshot = useOrganStore((state) => state.snapshot);
  const editProfileId = useOrganStore((state) => state.editProfileId);
  const setEdit = useOrganStore((state) => state.setEdit);
  const stabilize = useOrganStore((state) => state.stabilize);
  const markDirty = useOrganStore((state) => state.markDirty);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setEdit(null);
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        stabilize();
        setEdit(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setEdit, stabilize]);

  if (!editProfileId || !snapshot) return null;

  const profile = snapshot.profiles.find(p => p.id === editProfileId);
  if (!profile) return null;

  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 900, backdropFilter: 'blur(3px)' }} onClick={() => setEdit(null)} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(10,14,39,0.98)', border: '2px solid #0ea5e9', borderRadius: '8px', padding: '20px 24px', minWidth: 400, zIndex: 1000, boxShadow: '0 0 40px rgba(14,165,233,0.5)' }}>
        <div style={{ color: '#0ea5e9', fontSize: '16px', fontWeight: 'bold', marginBottom: 16, fontFamily: 'monospace' }}>EDIT: {profile.label}</div>
        <div style={{ color: '#fff', fontSize: '12px', fontFamily: 'monospace', marginBottom: 12 }}>Weight: {profile.weight}</div>
        <div style={{ color: '#00d4ff', fontSize: '11px', fontFamily: 'monospace', marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(14,165,233,0.3)' }}>
          <div>ESC = Cancel</div>
          <div>CMD+S = Save</div>
        </div>
      </div>
    </>
  );
}
