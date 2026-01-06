// ═══════════════════════════════════════════════════════════════════════════
// 🪟 PROFILE FORM MODAL - Cyberpunk Wrapper
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import React, { useEffect } from 'react';
import { ProfileForm } from './ProfileForm';
import { ProfileFormData } from '@/hooks/useProfileMutations';

interface ProfileFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  initialData?: Partial<ProfileFormData>;
  mode: 'create' | 'edit';
}

export function ProfileFormModal({ isOpen, onClose, onSubmit, initialData, mode }: ProfileFormModalProps) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 600,
          background: 'rgba(0,0,0,0.95)',
          border: '1px solid rgba(0,212,255,0.3)',
          borderRadius: 16,
          boxShadow: '0 0 60px rgba(0,212,255,0.3)',
          padding: 32,
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 8,
            color: 'rgba(255,255,255,0.6)',
            fontSize: 18,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
          }}
        >
          ×
        </button>

        {/* HEADER */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{
            fontSize: 24,
            fontWeight: 900,
            background: 'linear-gradient(135deg, #00d4ff 0%, #d946ef 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 8
          }}>
            {mode === 'create' ? '+ NEW PROFILE' : '✏️ EDIT PROFILE'}
          </h2>
          <div style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'monospace'
          }}>
            {mode === 'create' 
              ? 'Create new system consciousness profile' 
              : 'Modify existing profile configuration'}
          </div>
        </div>

        {/* FORM */}
        <ProfileForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onClose}
          mode={mode}
        />
      </div>
    </div>
  );
}
