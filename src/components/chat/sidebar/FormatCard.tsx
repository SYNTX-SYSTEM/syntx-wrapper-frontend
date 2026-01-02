import React from 'react';
import GlassCard from '@/components/ui/GlassCard';

interface FormatCardProps {
  selectedFormat: string;
  formatDetails: any;
  onOpenModal: () => void;
}

export function FormatCard({ selectedFormat, formatDetails, onOpenModal }: FormatCardProps) {
  return (
    <GlassCard style={{ padding: 16 }} variant={selectedFormat ? "magenta" : "default"}>
      <div style={{
        fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)',
        marginBottom: 12, letterSpacing: 2,
        display: 'flex', alignItems: 'center', gap: 6
      }}>
        <span className={selectedFormat ? "pulse" : "blink"}>
          {selectedFormat ? "📋" : "⚠️"}
        </span> FORMAT
      </div>
      
      {selectedFormat ? (
        <>
          <button
            onClick={onOpenModal}
            className="cyber-btn"
            style={{
              width: '100%', padding: '14px 16px', borderRadius: 12,
              border: '1px solid rgba(217,70,239,0.5)',
              background: 'linear-gradient(135deg, rgba(217,70,239,0.20), rgba(217,70,239,0.05))',
              color: '#d946ef', fontFamily: 'monospace', fontSize: 13, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              boxShadow: '0 0 20px rgba(217,70,239,0.2)',
              transition: 'all 0.3s ease',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1
            }}
          >
            <span>{selectedFormat}</span>
            <span style={{ fontSize: 10, opacity: 0.6 }}>👁️ VIEW</span>
          </button>
          {formatDetails && (
            <div style={{ marginTop: 10, fontSize: 10, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
              {formatDetails.fields?.length || 0} Fields
            </div>
          )}
        </>
      ) : (
        <div className="blink" style={{
          padding: '16px',
          borderRadius: 12,
          border: '2px solid #ef4444',
          background: 'rgba(239,68,68,0.15)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🚨</div>
          <div style={{ fontSize: 12, color: '#ef4444', fontWeight: 700, marginBottom: 4 }}>
            KEIN FORMAT GEBUNDEN
          </div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>
            Wrapper hat kein Format!
          </div>
        </div>
      )}
    </GlassCard>
  );
}
