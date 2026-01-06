"use client";
import { useState } from 'react';
import FieldStream from './field-stream/FieldStream';
import ResonanceStream from './resonance-stream/ResonanceStream';
import ResonanceFooter from './resonance-footer/ResonanceFooter';

export default function ProfilesLayout() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '380px 1fr',
      gridTemplateRows: '1fr auto',
      height: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* LEFT: FIELD STREAM */}
      <div style={{ 
        gridRow: '1 / 3',
        borderRight: '1px solid rgba(14,165,233,0.2)',
        background: 'rgba(0,0,0,0.3)',
        overflowY: 'auto',
        padding: 20
      }}>
        <FieldStream 
          onSelectProfile={setSelectedProfile}
          selectedProfile={selectedProfile}
        />
      </div>

      {/* RIGHT TOP: RESONANCE STREAM */}
      <div style={{ 
        overflowY: 'auto',
        background: 'rgba(0,0,0,0.2)'
      }}>
        <ResonanceStream profileId={selectedProfile} />
      </div>

      {/* RIGHT BOTTOM: FOOTER */}
      <div style={{ 
        borderTop: '1px solid rgba(14,165,233,0.2)',
        background: 'rgba(0,0,0,0.4)'
      }}>
        <ResonanceFooter profileId={selectedProfile} />
      </div>

      {/* CYBER GRID OVERLAY */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: `
          linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px),
          linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
        zIndex: 0
      }} />
    </div>
  );
}
