import React from 'react';

interface FormatModalProps {
  isOpen: boolean;
  onClose: () => void;
  formatName: string;
  formatDetails: any;
}

export function FormatModal({ isOpen, onClose, formatName, formatDetails }: FormatModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* BLACK Background with Neural Network */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000000',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease'
        }}
      />
      
      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10000,
        width: '90%',
        maxWidth: 900,
        height: '85vh',
        background: 'linear-gradient(145deg, rgba(5,10,20,0.98), rgba(2,5,10,0.98))',
        border: '1px solid rgba(217,70,239,0.5)',
        borderRadius: 24,
        boxShadow: '0 0 100px rgba(217,70,239,0.5), 0 0 200px rgba(0,212,255,0.3)',
        animation: 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        
        {/* Neural Network INSIDE Modal Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(90deg, rgba(217,70,239,0.08) 1px, transparent 1px),
            linear-gradient(rgba(0,212,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.5,
          pointerEvents: 'none'
        }} />
        
        {/* Floating Neural Nodes */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 15% 20%, rgba(217,70,239,0.25) 0%, transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(0,212,255,0.2) 0%, transparent 25%),
            radial-gradient(circle at 50% 80%, rgba(217,70,239,0.15) 0%, transparent 30%)
          `,
          animation: 'neuralPulse 6s ease-in-out infinite',
          pointerEvents: 'none'
        }} />
        
        {/* Animated border glow */}
        <div style={{
          position: 'absolute',
          inset: -2,
          background: 'linear-gradient(45deg, #d946ef, #00d4ff, #d946ef)',
          backgroundSize: '200% 200%',
          animation: 'borderGlow 3s ease infinite',
          borderRadius: 24,
          zIndex: -1,
          opacity: 0.6
        }} />

        {/* Header */}
        <div style={{
          padding: '28px 36px',
          borderBottom: '1px solid rgba(217,70,239,0.3)',
          background: 'linear-gradient(135deg, rgba(217,70,239,0.25), rgba(0,212,255,0.1))',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            animation: 'shimmer 3s ease-in-out infinite'
          }} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <div>
              <div style={{ 
                fontSize: 28, 
                fontWeight: 900, 
                background: 'linear-gradient(135deg, #d946ef, #00d4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'monospace',
                letterSpacing: 3,
                textTransform: 'uppercase',
                marginBottom: 8
              }}>
                📋 {formatName}
              </div>
              <div style={{ 
                fontSize: 13, 
                color: 'rgba(255,255,255,0.6)', 
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <span className="pulse" style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#10b981',
                  display: 'inline-block'
                }} />
                {formatDetails?.fields?.length || 0} Active Fields
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                border: '1px solid rgba(239,68,68,0.5)',
                background: 'rgba(239,68,68,0.15)',
                color: '#ef4444',
                fontSize: 24,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                fontWeight: 700
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.3)';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          padding: '32px 36px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: 20,
          overflowY: 'auto',
          alignContent: 'start',
          position: 'relative'
        }}>
          {formatDetails?.fields?.map((field: any, index: number) => (
            <div 
              key={field.name}
              className="field-card"
              style={{
                padding: 24,
                background: `linear-gradient(145deg, rgba(217,70,239,${index % 2 === 0 ? '0.06' : '0.04'}), rgba(0,0,0,0.6))`,
                borderRadius: 16,
                border: '1px solid rgba(217,70,239,0.3)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                animation: `fieldSlideIn 0.4s ease ${index * 0.05}s backwards`
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(217,70,239,0.6)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(217,70,239,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(217,70,239,0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                position: 'absolute',
                top: -2,
                left: -2,
                right: -2,
                height: 2,
                background: 'linear-gradient(90deg, #d946ef, #00d4ff)',
                opacity: 0.5
              }} />

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: 16
              }}>
                <div style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#d946ef',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: 1
                }}>
                  {field.name}
                </div>
                <div style={{
                  padding: '8px 18px',
                  borderRadius: 10,
                  background: 'rgba(217,70,239,0.25)',
                  border: '1px solid rgba(217,70,239,0.5)',
                  fontSize: 16,
                  fontWeight: 900,
                  color: '#d946ef',
                  fontFamily: 'monospace',
                  letterSpacing: 1
                }}>
                  ⚡ {field.weight || 1.0}
                </div>
              </div>

              {field.description && (
                <div style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.7,
                  fontFamily: 'system-ui',
                  marginBottom: 12
                }}>
                  {field.description}
                </div>
              )}

              {field.enabled !== undefined && (
                <div style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  background: field.enabled ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                  border: `1px solid ${field.enabled ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 11,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: field.enabled ? '#10b981' : '#ef4444'
                }}>
                  <span className="pulse" style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: field.enabled ? '#10b981' : '#ef4444'
                  }} />
                  {field.enabled ? 'ACTIVE' : 'INACTIVE'}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '24px 36px',
          borderTop: '1px solid rgba(217,70,239,0.3)',
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'monospace'
          }}>
            SYNTX FIELD SYSTEM v3.0
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '14px 36px',
              borderRadius: 12,
              border: '1px solid rgba(217,70,239,0.5)',
              background: 'linear-gradient(135deg, rgba(217,70,239,0.3), rgba(217,70,239,0.1))',
              color: '#d946ef',
              fontSize: 14,
              fontWeight: 800,
              fontFamily: 'monospace',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: 2
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(217,70,239,0.5), rgba(217,70,239,0.25))';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(217,70,239,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(217,70,239,0.3), rgba(217,70,239,0.1))';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            CLOSE
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideIn {
          from { 
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        @keyframes fieldSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes borderGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes neuralPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.4; }
        }
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}
