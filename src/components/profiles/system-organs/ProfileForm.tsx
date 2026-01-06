// ═══════════════════════════════════════════════════════════════════════════
// 📝 PROFILE FORM - CRUD Input Fields
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState } from 'react';
import { ProfileFormData } from '@/hooks/useProfileMutations';

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

export function ProfileForm({ initialData, onSubmit, onCancel, mode }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: initialData?.name || '',
    label: initialData?.label || '',
    description: initialData?.description || '',
    active: initialData?.active ?? true,
    weight: initialData?.weight || 50,
    tags: initialData?.tags || [],
    patterns: initialData?.patterns || []
  });
  
  const [tagInput, setTagInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter(t => t !== tag)
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      
      {/* LABEL */}
      <div>
        <label style={{ 
          display: 'block', 
          fontSize: 11, 
          color: 'rgba(255,255,255,0.6)', 
          marginBottom: 8,
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          LABEL (NAME) *
        </label>
        <input
          type="text"
          value={formData.label}
          onChange={(e) => setFormData({ ...formData, label: e.target.value, name: e.target.value })}
          required
          style={{
            width: '100%',
            padding: 12,
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(0,212,255,0.3)',
            borderRadius: 8,
            color: '#00d4ff',
            fontFamily: 'monospace',
            fontSize: 14,
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.border = '1px solid rgba(0,212,255,0.6)'}
          onBlur={(e) => e.target.style.border = '1px solid rgba(0,212,255,0.3)'}
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label style={{ 
          display: 'block', 
          fontSize: 11, 
          color: 'rgba(255,255,255,0.6)', 
          marginBottom: 8,
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          DESCRIPTION *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={3}
          style={{
            width: '100%',
            padding: 12,
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(0,212,255,0.3)',
            borderRadius: 8,
            color: 'white',
            fontFamily: 'monospace',
            fontSize: 13,
            outline: 'none',
            resize: 'vertical'
          }}
          onFocus={(e) => e.target.style.border = '1px solid rgba(0,212,255,0.6)'}
          onBlur={(e) => e.target.style.border = '1px solid rgba(0,212,255,0.3)'}
        />
      </div>

      {/* WEIGHT SLIDER */}
      <div>
        <label style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 11, 
          color: 'rgba(255,255,255,0.6)', 
          marginBottom: 8,
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          <span>WEIGHT (SYSTEM AMPLIFICATION)</span>
          <span style={{ color: '#00d4ff', fontSize: 16, fontWeight: 700 }}>{formData.weight}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
          style={{
            width: '100%',
            height: 6,
            background: `linear-gradient(90deg, #00d4ff ${formData.weight}%, rgba(255,255,255,0.1) ${formData.weight}%)`,
            borderRadius: 3,
            outline: 'none',
            cursor: 'pointer'
          }}
        />
      </div>

      {/* ACTIVE TOGGLE */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <input
          type="checkbox"
          checked={formData.active}
          onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
          style={{
            width: 20,
            height: 20,
            cursor: 'pointer'
          }}
        />
        <label style={{ 
          fontSize: 13, 
          color: 'rgba(255,255,255,0.8)', 
          fontFamily: 'monospace',
          cursor: 'pointer'
        }}>
          ACTIVE (System Participation)
        </label>
      </div>

      {/* TAGS */}
      <div>
        <label style={{ 
          display: 'block', 
          fontSize: 11, 
          color: 'rgba(255,255,255,0.6)', 
          marginBottom: 8,
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          TAGS (Semantic Groups)
        </label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Add tag..."
            style={{
              flex: 1,
              padding: 10,
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: 6,
              color: 'white',
              fontFamily: 'monospace',
              fontSize: 12,
              outline: 'none'
            }}
          />
          <button
            type="button"
            onClick={addTag}
            style={{
              padding: '10px 16px',
              background: 'rgba(0,212,255,0.2)',
              border: '1px solid rgba(0,212,255,0.4)',
              borderRadius: 6,
              color: '#00d4ff',
              fontFamily: 'monospace',
              fontSize: 12,
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            ADD
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {(formData.tags || []).map(tag => (
            <span
              key={tag}
              style={{
                padding: '6px 12px',
                background: 'rgba(0,212,255,0.15)',
                border: '1px solid rgba(0,212,255,0.3)',
                borderRadius: 12,
                color: '#00d4ff',
                fontFamily: 'monospace',
                fontSize: 11,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: 14
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          style={{
            flex: 1,
            padding: 14,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 8,
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'monospace',
            fontSize: 13,
            fontWeight: 600,
            cursor: submitting ? 'not-allowed' : 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          CANCEL
        </button>
        <button
          type="submit"
          disabled={submitting}
          style={{
            flex: 1,
            padding: 14,
            background: submitting 
              ? 'rgba(128,128,128,0.3)' 
              : 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(217,70,239,0.3))',
            border: '1px solid rgba(0,212,255,0.5)',
            borderRadius: 8,
            color: submitting ? 'rgba(255,255,255,0.4)' : '#00d4ff',
            fontFamily: 'monospace',
            fontSize: 13,
            fontWeight: 700,
            cursor: submitting ? 'not-allowed' : 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            boxShadow: submitting ? 'none' : '0 0 20px rgba(0,212,255,0.3)'
          }}
        >
          {submitting ? 'SAVING...' : mode === 'create' ? 'CREATE PROFILE' : 'UPDATE PROFILE'}
        </button>
      </div>
    </form>
  );
}
