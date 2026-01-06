// ═══════════════════════════════════════════════════════════════════════════
// ✏️ PROFILE EDIT VIEW - Ultra Cyberpunk Inline Editor
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState } from 'react';

interface ProfileEditViewProps {
  profile: any;
  profileId: string;
  onSave: (data: any) => Promise<void>;
  onDelete: () => Promise<void>;
}

export function ProfileEditView({ profile, profileId, onSave, onDelete }: ProfileEditViewProps) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  const [formData, setFormData] = useState({
    name: profile.label || profile.name || profileId,
    description: profile.description || 'No description available',
    weight: profile.weight ?? 50,
    active: profile.active ?? true,
    tags: Array.isArray(profile.tags) ? profile.tags : []
  });
  
  // Update formData when profile changes
  React.useEffect(() => {
    setFormData({
      name: profile.label || profile.name || profileId,
      description: profile.description || 'No description available',
      weight: profile.weight ?? 50,
      active: profile.active ?? true,
      tags: Array.isArray(profile.tags) ? profile.tags : []
    });
  }, [profile, profileId]);
  
  const [tagInput, setTagInput] = useState('');

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({
        name: formData.name,
        label: formData.name,
        description: formData.description,
        weight: formData.weight,
        active: formData.active,
        tags: formData.tags
      });
      setEditing(false);
      setNotification({type: 'success', message: 'PROFILE UPDATED'});
      setTimeout(() => setNotification(null), 4000);
    } catch (error) {
      setNotification({type: 'error', message: 'UPDATE FAILED'});
      setTimeout(() => setNotification(null), 6000);
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t: string) => t !== tag)
    });
  };

  return (
    <div style={{ 
      padding: 32,
      background: 'rgba(0,0,0,0.3)',
      borderRadius: 16,
      border: '1px solid rgba(0,212,255,0.2)'
    }}>
      {/* HEADER WITH ACTIONS */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32
      }}>
        <div style={{
          fontSize: 20,
          fontWeight: 700,
          color: '#00d4ff',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          {editing ? '✏️ EDIT MODE' : '📋 PROFILE CONFIG'}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05))',
                border: '1px solid rgba(0,212,255,0.5)',
                borderRadius: 8,
                color: '#00d4ff',
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,212,255,0.1))';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05))';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ✏️ EDIT
            </button>
          )}

          <button
            onClick={() => setShowDeleteConfirm(true)}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))',
              border: '1px solid rgba(239,68,68,0.5)',
              borderRadius: 8,
              color: '#ef4444',
              fontFamily: 'monospace',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(239,68,68,0.1))';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            🗑️ DELETE
          </button>
        </div>
      </div>

      {/* FIELDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* NAME */}
        <div>
          <label style={{
            display: 'block',
            fontSize: 11,
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: 8
          }}>
            PROFILE NAME
          </label>
          {editing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                padding: 14,
                background: 'rgba(0,212,255,0.05)',
                border: '1px solid rgba(0,212,255,0.3)',
                borderRadius: 8,
                color: '#00d4ff',
                fontFamily: 'monospace',
                fontSize: 16,
                fontWeight: 600,
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.border = '1px solid rgba(0,212,255,0.6)'}
              onBlur={(e) => e.target.style.border = '1px solid rgba(0,212,255,0.3)'}
            />
          ) : (
            <div style={{
              padding: 14,
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              color: 'white',
              fontFamily: 'monospace',
              fontSize: 16,
              fontWeight: 600
            }}>
              {formData.name}
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label style={{
            display: 'block',
            fontSize: 11,
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: 8
          }}>
            DESCRIPTION
          </label>
          {editing ? (
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              style={{
                width: '100%',
                padding: 14,
                background: 'rgba(0,212,255,0.05)',
                border: '1px solid rgba(0,212,255,0.3)',
                borderRadius: 8,
                color: 'white',
                fontFamily: 'monospace',
                fontSize: 14,
                outline: 'none',
                resize: 'vertical'
              }}
              onFocus={(e) => e.target.style.border = '1px solid rgba(0,212,255,0.6)'}
              onBlur={(e) => e.target.style.border = '1px solid rgba(0,212,255,0.3)'}
            />
          ) : (
            <div style={{
              padding: 14,
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'monospace',
              fontSize: 14,
              lineHeight: 1.6
            }}>
              {formData.description}
            </div>
          )}
        </div>

        {/* WEIGHT SLIDER */}
        <div>
          <label style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 11,
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: 12
          }}>
            <span>SEMANTIC WEIGHT</span>
            <span style={{ 
              color: '#00d4ff', 
              fontSize: 20, 
              fontWeight: 800,
              textShadow: '0 0 20px rgba(0,212,255,0.5)'
            }}>
              {formData.weight}%
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
            disabled={!editing}
            style={{
              width: '100%',
              height: 8,
              background: `linear-gradient(90deg, #00d4ff ${formData.weight}%, rgba(255,255,255,0.1) ${formData.weight}%)`,
              borderRadius: 4,
              outline: 'none',
              cursor: editing ? 'pointer' : 'not-allowed',
              opacity: editing ? 1 : 0.5
            }}
          />
        </div>

        {/* ACTIVE TOGGLE */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: 16,
          background: formData.active ? 'rgba(16,185,129,0.1)' : 'rgba(107,114,128,0.1)',
          border: `1px solid ${formData.active ? 'rgba(16,185,129,0.3)' : 'rgba(107,114,128,0.3)'}`,
          borderRadius: 8
        }}>
          <input
            type="checkbox"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            disabled={!editing}
            style={{
              width: 24,
              height: 24,
              cursor: editing ? 'pointer' : 'not-allowed'
            }}
          />
          <div>
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              color: formData.active ? '#10b981' : '#6b7280',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {formData.active ? '● ACTIVE' : '○ INACTIVE'}
            </div>
            <div style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              marginTop: 4
            }}>
              System participation status
            </div>
          </div>
        </div>

        {/* TAGS */}
        <div>
          <label style={{
            display: 'block',
            fontSize: 11,
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: 12
          }}>
            SEMANTIC TAGS
          </label>
          
          {editing && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add tag..."
                style={{
                  flex: 1,
                  padding: 12,
                  background: 'rgba(0,212,255,0.05)',
                  border: '1px solid rgba(0,212,255,0.3)',
                  borderRadius: 6,
                  color: 'white',
                  fontFamily: 'monospace',
                  fontSize: 13,
                  outline: 'none'
                }}
              />
              <button
                onClick={addTag}
                style={{
                  padding: '12px 20px',
                  background: 'rgba(0,212,255,0.2)',
                  border: '1px solid rgba(0,212,255,0.4)',
                  borderRadius: 6,
                  color: '#00d4ff',
                  fontFamily: 'monospace',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                ADD
              </button>
            </div>
          )}
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {formData.tags.map((tag: string) => (
              <span
                key={tag}
                style={{
                  padding: '8px 14px',
                  background: 'rgba(0,212,255,0.15)',
                  border: '1px solid rgba(0,212,255,0.3)',
                  borderRadius: 12,
                  color: '#00d4ff',
                  fontFamily: 'monospace',
                  fontSize: 12,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                {tag}
                {editing && (
                  <button
                    onClick={() => removeTag(tag)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.6)',
                      cursor: 'pointer',
                      fontSize: 16,
                      padding: 0,
                      lineHeight: 1
                    }}
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* SAVE/CANCEL BUTTONS (only in edit mode) */}
        {editing && (
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button
              onClick={() => setEditing(false)}
              disabled={saving}
              style={{
                flex: 1,
                padding: 16,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 8,
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'monospace',
                fontSize: 14,
                fontWeight: 600,
                cursor: saving ? 'not-allowed' : 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              CANCEL
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                flex: 1,
                padding: 16,
                background: saving
                  ? 'rgba(128,128,128,0.3)'
                  : 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(217,70,239,0.3))',
                border: '1px solid rgba(0,212,255,0.5)',
                borderRadius: 8,
                color: saving ? 'rgba(255,255,255,0.4)' : '#00d4ff',
                fontFamily: 'monospace',
                fontSize: 14,
                fontWeight: 800,
                cursor: saving ? 'not-allowed' : 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                boxShadow: saving ? 'none' : '0 4px 24px rgba(0,212,255,0.3)'
              }}
            >
              {saving ? 'SAVING...' : '💾 SAVE CHANGES'}
            </button>
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION */}
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
            padding: 20
          }}
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            style={{
              background: 'rgba(0,0,0,0.95)',
              border: '2px solid rgba(239,68,68,0.6)',
              borderRadius: 16,
              padding: 32,
              maxWidth: 500,
              boxShadow: '0 0 60px rgba(239,68,68,0.4)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              fontSize: 20,
              fontWeight: 900,
              color: '#ef4444',
              fontFamily: 'monospace',
              marginBottom: 16
            }}>
              ⚠️ CONFIRM DELETION
            </div>
            <div style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'monospace',
              lineHeight: 1.6,
              marginBottom: 24
            }}>
              Delete profile <strong style={{ color: '#00d4ff' }}>{formData.name}</strong>?
              <br /><br />
              This action <strong style={{ color: '#ef4444' }}>CANNOT BE UNDONE</strong>.
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  flex: 1,
                  padding: 14,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 8,
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: 'monospace',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                CANCEL
              </button>
              <button
                onClick={async () => {
                  setShowDeleteConfirm(false);
                  await onDelete();
                }}
                style={{
                  flex: 1,
                  padding: 14,
                  background: 'rgba(239,68,68,0.2)',
                  border: '1px solid rgba(239,68,68,0.5)',
                  borderRadius: 8,
                  color: '#ef4444',
                  fontFamily: 'monospace',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATION */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          padding: '16px 24px',
          background: notification.type === 'success' 
            ? 'linear-gradient(135deg, rgba(16,185,129,0.95), rgba(5,150,105,0.95))'
            : 'linear-gradient(135deg, rgba(239,68,68,0.95), rgba(220,38,38,0.95))',
          border: `2px solid ${notification.type === 'success' ? '#10b981' : '#ef4444'}`,
          borderRadius: 12,
          color: 'white',
          fontFamily: 'monospace',
          fontSize: 14,
          fontWeight: 700,
          boxShadow: notification.type === 'success'
            ? '0 8px 32px rgba(16,185,129,0.4)'
            : '0 8px 32px rgba(239,68,68,0.4)',
          zIndex: 10001,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          animation: 'slideIn 0.3s ease-out'
        }}>
          <span style={{ fontSize: 20 }}>
            {notification.type === 'success' ? '✅' : '❌'}
          </span>
          {notification.message}
        </div>
      )}
    </div>
  );
}
