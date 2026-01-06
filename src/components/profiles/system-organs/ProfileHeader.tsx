// ═══════════════════════════════════════════════════════════════════════════
// 👑 PROFILE HEADER - ULTRA CYBERPUNK EDITION
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState } from 'react';

interface ProfileHeaderProps {
  profileId: string;
  name: string;
  status: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ProfileHeader({ profileId, name, status, onEdit, onDelete }: ProfileHeaderProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  
  const statusColor = 
    status === 'ACTIVE' ? '#10b981' :
    status === 'TENSIONED' ? '#f59e0b' :
    status === 'DORMANT' ? '#6b7280' :
    '#8b5cf6';

  return (
    <>
      <div style={{ 
        marginBottom: 32,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* SCAN LINE EFFECT */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
          animation: 'scanline 3s linear infinite',
          pointerEvents: 'none',
          opacity: 0.5
        }} />

        {/* HEADER CONTENT */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: 24,
          position: 'relative'
        }}>
          {/* LEFT: TITLE & STATUS */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* TITLE WITH GLITCH */}
            <h1 
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: '#fff',
                textShadow: glitchActive
                  ? '0 0 30px rgba(0,212,255,0.8), 0 0 60px rgba(217,70,239,0.6)'
                  : '0 2px 20px rgba(217,70,239,0.5)',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 12,
                transition: 'all 0.3s',
                position: 'relative'
              }}
              onMouseEnter={() => setGlitchActive(true)}
              onMouseLeave={() => setGlitchActive(false)}
            >
              {name}
              
              {/* GLITCH OVERLAY */}
              {glitchActive && (
                <>
                  <span style={{
                    position: 'absolute',
                    top: 0,
                    left: 2,
                    color: '#ff0080',
                    opacity: 0.7,
                    mixBlendMode: 'screen',
                    animation: 'glitch1 0.3s infinite'
                  }}>
                    {name}
                  </span>
                  <span style={{
                    position: 'absolute',
                    top: 0,
                    left: -2,
                    color: '#00d4ff',
                    opacity: 0.7,
                    mixBlendMode: 'screen',
                    animation: 'glitch2 0.3s infinite'
                  }}>
                    {name}
                  </span>
                </>
              )}
            </h1>
            
            {/* STATUS & ID ROW */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 16,
              flexWrap: 'wrap'
            }}>
              {/* ID CHIP */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(0,212,255,0.3)',
                borderRadius: 8,
                fontSize: 11,
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                <div style={{
                  width: 4,
                  height: 4,
                  background: '#00d4ff',
                  borderRadius: '50%',
                  boxShadow: '0 0 8px #00d4ff'
                }} />
                ID: {profileId}
              </div>
              
              {/* STATUS BADGE */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 16px',
                background: `${statusColor}15`,
                border: `1px solid ${statusColor}80`,
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                color: statusColor,
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: `0 0 20px ${statusColor}30`
              }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: statusColor,
                  boxShadow: `0 0 12px ${statusColor}`,
                  animation: status === 'ACTIVE' ? 'pulse 2s infinite' : 'none'
                }} />
                {status}
              </div>
            </div>
          </div>

          {/* RIGHT: ACTION BUTTONS */}
          <div style={{ 
            display: 'flex', 
            gap: 12,
            flexShrink: 0
          }}>
            {/* EDIT BUTTON */}
            {onEdit && (
              <button
                onClick={onEdit}
                style={{
                  position: 'relative',
                  padding: '14px 24px',
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05))',
                  border: '1px solid rgba(0,212,255,0.5)',
                  borderRadius: 10,
                  color: '#00d4ff',
                  fontFamily: 'monospace',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  transition: 'all 0.3s',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,212,255,0.1))';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,212,255,0.4)';
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05))';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)';
                }}
              >
                <span style={{ fontSize: 16 }}>✏️</span>
                EDIT
              </button>
            )}

            {/* DELETE BUTTON */}
            {onDelete && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                style={{
                  position: 'relative',
                  padding: '14px 24px',
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))',
                  border: '1px solid rgba(239,68,68,0.5)',
                  borderRadius: 10,
                  color: '#ef4444',
                  fontFamily: 'monospace',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  transition: 'all 0.3s',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(239,68,68,0.1))';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(239,68,68,0.4)';
                  e.currentTarget.style.borderColor = 'rgba(239,68,68,0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)';
                }}
              >
                <span style={{ fontSize: 16 }}>🗑️</span>
                DELETE
              </button>
            )}
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL - ULTRA CYBERPUNK */}
      {showDeleteConfirm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(12px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            animation: 'fadeIn 0.3s'
          }}
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            style={{
              position: 'relative',
              background: 'rgba(0,0,0,0.95)',
              border: '2px solid rgba(239,68,68,0.6)',
              borderRadius: 16,
              padding: 40,
              maxWidth: 550,
              boxShadow: '0 0 80px rgba(239,68,68,0.4), inset 0 0 40px rgba(239,68,68,0.1)',
              animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* DANGER CORNERS */}
            <div style={{
              position: 'absolute',
              top: -1,
              left: -1,
              width: 30,
              height: 30,
              borderTop: '3px solid #ef4444',
              borderLeft: '3px solid #ef4444'
            }} />
            <div style={{
              position: 'absolute',
              bottom: -1,
              right: -1,
              width: 30,
              height: 30,
              borderBottom: '3px solid #ef4444',
              borderRight: '3px solid #ef4444'
            }} />

            {/* TITLE */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 24
            }}>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: 'rgba(239,68,68,0.2)',
                border: '2px solid rgba(239,68,68,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                flexShrink: 0,
                boxShadow: '0 0 30px rgba(239,68,68,0.3)'
              }}>
                ⚠️
              </div>
              <div>
                <div style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: '#ef4444',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  CONFIRM DELETION
                </div>
                <div style={{
                  fontSize: 11,
                  color: 'rgba(239,68,68,0.7)',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginTop: 4
                }}>
                  IRREVERSIBLE ACTION
                </div>
              </div>
            </div>
            
            {/* MESSAGE */}
            <div style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.85)',
              fontFamily: 'monospace',
              lineHeight: 1.7,
              marginBottom: 32,
              padding: 20,
              background: 'rgba(239,68,68,0.05)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 8
            }}>
              Delete profile <strong style={{ 
                color: '#00d4ff',
              }}>{name}</strong>?
              <br /><br />
              <span style={{ color: '#ef4444', fontWeight: 700 }}>⚡ WARNING:</span> This action <strong style={{ color: '#ef4444' }}>CANNOT BE UNDONE</strong>.
              <br />
              Profile will be permanently removed from system.
            </div>

            {/* BUTTONS */}
            <div style={{ display: 'flex', gap: 16 }}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 10,
                  color: 'rgba(255,255,255,0.8)',
                  fontFamily: 'monospace',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }}
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  onDelete?.();
                }}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(239,68,68,0.15))',
                  border: '2px solid rgba(239,68,68,0.6)',
                  borderRadius: 10,
                  color: '#ef4444',
                  fontFamily: 'monospace',
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  boxShadow: '0 4px 24px rgba(239,68,68,0.3)',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239,68,68,0.4), rgba(239,68,68,0.2))';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(239,68,68,0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(239,68,68,0.15))';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(239,68,68,0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                🗑️ DELETE PROFILE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>{`
        @keyframes scanline {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.9); }
        }
        @keyframes glitch1 {
          0%, 100% { transform: translateX(0); }
          33% { transform: translateX(-2px); }
          66% { transform: translateX(2px); }
        }
        @keyframes glitch2 {
          0%, 100% { transform: translateX(0); }
          33% { transform: translateX(2px); }
          66% { transform: translateX(-2px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
