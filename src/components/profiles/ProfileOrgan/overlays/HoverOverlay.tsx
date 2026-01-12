'use client';

import { useOrganStore } from '../store';

export default function HoverOverlay() {
  const snapshot = useOrganStore((state) => state.snapshot);
  const nodes = useOrganStore((state) => state.nodes);
  const hoverProfileId = useOrganStore((state) => state.hoverProfileId);
  const draggingProfileId = useOrganStore((state) => state.draggingProfileId);
  const editProfileId = useOrganStore((state) => state.editProfileId);

  if (!hoverProfileId || draggingProfileId || editProfileId || !snapshot) return null;

  const profile = snapshot.profiles.find(p => p.id === hoverProfileId);
  const node = nodes[hoverProfileId];
  if (!profile || !node) return null;

  const bindingCount = snapshot.bindings.filter(b => b.profileId === profile.id).length;
  const fields = [
    { name: 'DRIFT', value: 0.15, color: '#ff4444' },
    { name: 'TIEFE', value: 0.8, color: '#0ea5e9' },
    { name: 'DRUCK', value: 0.4, color: '#f59e0b' },
    { name: 'WIRKUNG', value: 0.75, color: '#10b981' },
    { name: 'KLARTEXT', value: 0.6, color: '#8b5cf6' },
    { name: 'HINTERGRUND', value: 0.9, color: '#06b6d4' },
  ];

  return (
    <div style={{
      position: 'absolute',
      left: node.position.x + 60,
      top: node.position.y - 120,
      background: 'rgba(10,14,39,0.98)',
      border: '2px solid rgba(14,165,233,0.6)',
      borderRadius: '10px',
      padding: '16px 20px',
      minWidth: 320,
      zIndex: 500,
      backdropFilter: 'blur(15px)',
      boxShadow: '0 0 30px rgba(14,165,233,0.4)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid rgba(14,165,233,0.3)', paddingBottom: 12 }}>
        <div>
          <div style={{ color: '#0ea5e9', fontSize: '16px', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: 4 }}>{profile.label}</div>
          <div style={{ color: '#00d4ff', fontSize: '10px', fontFamily: 'monospace', opacity: 0.7 }}>ID: {profile.id.substring(0, 12)}...</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#9d00ff', fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace' }}>W: {profile.weight}</div>
          <div style={{ color: '#00ffb3', fontSize: '10px', fontFamily: 'monospace' }}>{bindingCount} BINDINGS</div>
        </div>
      </div>

      {fields.map((field) => (
        <div key={field.name} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ color: field.color, fontSize: '11px', fontFamily: 'monospace', fontWeight: 'bold' }}>{field.name}</div>
            <div style={{ color: '#fff', fontSize: '10px', fontFamily: 'monospace' }}>{(field.value * 100).toFixed(0)}%</div>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${field.value * 100}%`,
              background: `linear-gradient(90deg, ${field.color}, ${field.color}dd)`,
              borderRadius: 3,
              boxShadow: `0 0 10px ${field.color}80`,
            }} />
          </div>
        </div>
      ))}

      {profile.tags.length > 0 && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(14,165,233,0.2)' }}>
          <div style={{ color: '#00d4ff', fontSize: '9px', fontFamily: 'monospace', marginBottom: 6, opacity: 0.7 }}>TAGS:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {profile.tags.map(tag => (
              <div key={tag} style={{ background: 'rgba(14,165,233,0.2)', border: '1px solid rgba(14,165,233,0.4)', borderRadius: '4px', padding: '3px 8px', fontSize: '9px', color: '#00d4ff', fontFamily: 'monospace' }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
