// ═══════════════════════════════════════════════════════════════════════════
// 🌌 PROFILE EDIT VIEW V2 - NEURO-CYBER EDITION
// Ultra-responsive, real-time, holographic interface
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState, useEffect } from 'react';

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
  const [hoverField, setHoverField] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: profile.label || profile.name || profileId,
    description: profile.description || '',
    weight: profile.weight ?? 50,
    active: profile.active ?? true,
    tags: Array.isArray(profile.tags) ? profile.tags : []
  });
  
  const [tagInput, setTagInput] = useState('');

  // Sync formData when profile changes
  useEffect(() => {
    setFormData({
      name: profile.label || profile.name || profileId,
      description: profile.description || '',
      weight: profile.weight ?? 50,
      active: profile.active ?? true,
      tags: Array.isArray(profile.tags) ? profile.tags : []
    });
  }, [profile, profileId]);

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
      setNotification({type: 'success', message: '✅ PROFILE SYNCHRONIZED'});
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({type: 'error', message: '❌ SYNC FAILED'});
      setTimeout(() => setNotification(null), 5000);
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

  const getWeightColor = (weight: number) => {
    if (weight < 33) return '#ef4444';
    if (weight < 66) return '#f59e0b';
    return '#10b981';
  };

  return (
    <>
      {/* HOLOGRAPHIC CONTAINER */}
      <div style={{ 
        position: 'relative',
        padding: 0,
        borderRadius: 20,
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,212,255,0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 0 60px rgba(0,212,255,0.05)',
        overflow: 'hidden'
      }}>
        {/* ANIMATED SCAN LINES */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.03) 2px, rgba(0,212,255,0.03) 4px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* CORNER ACCENTS */}
        {[
          {top: -1, left: -1, borderTop: '2px solid #00d4ff', borderLeft: '2px solid #00d4ff'},
          {top: -1, right: -1, borderTop: '2px solid #d946ef', borderRight: '2px solid #d946ef'},
          {bottom: -1, left: -1, borderBottom: '2px solid #d946ef', borderLeft: '2px solid #d946ef'},
          {bottom: -1, right: -1, borderBottom: '2px solid #00d4ff', borderRight: '2px solid #00d4ff'}
        ].map((corner, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 30,
            height: 30,
            ...corner,
            zIndex: 2
          }} />
        ))}

        {/* HEADER */}
        <div style={{
          padding: '24px 32px',
          background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(217,70,239,0.1))',
          borderBottom: '1px solid rgba(0,212,255,0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 3
        }}>
          {/* TITLE */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16
          }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: editing ? '#f59e0b' : '#10b981',
              boxShadow: `0 0 20px ${editing ? '#f59e0b' : '#10b981'}`,
              animation: 'pulse 2s infinite'
            }} />
            <div style={{
              fontSize: 18,
              fontWeight: 800,
              color: editing ? '#f59e0b' : '#00d4ff',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              textShadow: `0 0 20px ${editing ? 'rgba(245,158,11,0.5)' : 'rgba(0,212,255,0.5)'}`
            }}>
              {editing ? '⚡ EDIT MODE' : '📡 PROFILE CONFIG'}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: 'flex', gap: 12 }}>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05))',
                  border: '1px solid rgba(0,212,255,0.5)',
                  borderRadius: 8,
                  color: '#00d4ff',
                  fontFamily: 'monospace',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 15px rgba(0,212,255,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,212,255,0.1))';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 25px rgba(0,212,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05))';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,212,255,0.2)';
                }}
              >
                ✏️ EDIT
              </button>
            )}

            <button
              onClick={() => setShowDeleteConfirm(true)}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))',
                border: '1px solid rgba(239,68,68,0.5)',
                borderRadius: 8,
                color: '#ef4444',
                fontFamily: 'monospace',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(239,68,68,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(239,68,68,0.1))';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(239,68,68,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(239,68,68,0.2)';
              }}
            >
              🗑️ DELETE
            </button>
          </div>
        </div>

        {/* FIELDS GRID */}
        <div style={{ 
          padding: 32, 
          display: 'grid',
          gap: 24,
          position: 'relative',
          zIndex: 3
        }}>
          
          {/* NAME FIELD */}
          <div
            onMouseEnter={() => setHoverField('name')}
            onMouseLeave={() => setHoverField(null)}
            style={{
              padding: 20,
              background: hoverField === 'name' 
                ? 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(217,70,239,0.08))'
                : 'rgba(0,0,0,0.2)',
              border: `1px solid ${hoverField === 'name' ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 12,
              transition: 'all 0.3s',
              boxShadow: hoverField === 'name' ? '0 4px 20px rgba(0,212,255,0.2)' : 'none'
            }}
          >
            <label style={{
              display: 'block',
              fontSize: 10,
              color: 'rgba(0,212,255,0.7)',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: 12,
              fontWeight: 700
            }}>
              ▸ PROFILE NAME
            </label>
            {editing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  background: 'rgba(0,212,255,0.05)',
                  border: '1px solid rgba(0,212,255,0.3)',
                  borderRadius: 8,
                  color: '#00d4ff',
                  fontFamily: 'monospace',
                  fontSize: 18,
                  fontWeight: 700,
                  outline: 'none',
                  transition: 'all 0.3s',
                  boxShadow: '0 0 0 0 rgba(0,212,255,0.5)'
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid rgba(0,212,255,0.6)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(0,212,255,0.3)';
                  e.target.style.boxShadow = '0 0 0 0 rgba(0,212,255,0.5)';
                }}
              />
            ) : (
              <div style={{
                padding: '14px 18px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                color: 'white',
                fontFamily: 'monospace',
                fontSize: 18,
                fontWeight: 700
              }}>
                {formData.name}
              </div>
            )}
          </div>

          {/* DESCRIPTION FIELD */}
          <div
            onMouseEnter={() => setHoverField('description')}
            onMouseLeave={() => setHoverField(null)}
            style={{
              padding: 20,
              background: hoverField === 'description'
                ? 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(217,70,239,0.08))'
                : 'rgba(0,0,0,0.2)',
              border: `1px solid ${hoverField === 'description' ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 12,
              transition: 'all 0.3s',
              boxShadow: hoverField === 'description' ? '0 4px 20px rgba(0,212,255,0.2)' : 'none'
            }}
          >
            <label style={{
              display: 'block',
              fontSize: 10,
              color: 'rgba(0,212,255,0.7)',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: 12,
              fontWeight: 700
            }}>
              ▸ DESCRIPTION
            </label>
            {editing ? (
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  background: 'rgba(0,212,255,0.05)',
                  border: '1px solid rgba(0,212,255,0.3)',
                  borderRadius: 8,
                  color: 'white',
                  fontFamily: 'monospace',
                  fontSize: 14,
                  outline: 'none',
                  resize: 'vertical',
                  lineHeight: 1.6,
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid rgba(0,212,255,0.6)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(0,212,255,0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            ) : (
              <div style={{
                padding: '14px 18px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                color: 'rgba(255,255,255,0.85)',
                fontFamily: 'monospace',
                fontSize: 14,
                lineHeight: 1.6,
                minHeight: 60
              }}>
                {formData.description || <span style={{color: 'rgba(255,255,255,0.4)'}}>No description</span>}
              </div>
            )}
          </div>

          {/* WEIGHT SLIDER - HOLOGRAPHIC */}
          <div
            onMouseEnter={() => setHoverField('weight')}
            onMouseLeave={() => setHoverField(null)}
            style={{
              padding: 20,
              background: hoverField === 'weight'
                ? 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(217,70,239,0.08))'
                : 'rgba(0,0,0,0.2)',
              border: `1px solid ${hoverField === 'weight' ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 12,
              transition: 'all 0.3s',
              boxShadow: hoverField === 'weight' ? '0 4px 20px rgba(0,212,255,0.2)' : 'none'
            }}
          >
            <label style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 10,
              color: 'rgba(0,212,255,0.7)',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: 16,
              fontWeight: 700
            }}>
              <span>▸ SEMANTIC WEIGHT</span>
              <div style={{
                padding: '6px 16px',
                background: `linear-gradient(135deg, ${getWeightColor(formData.weight)}30, ${getWeightColor(formData.weight)}10)`,
                border: `1px solid ${getWeightColor(formData.weight)}80`,
                borderRadius: 8,
                color: getWeightColor(formData.weight),
                fontSize: 20,
                fontWeight: 900,
                textShadow: `0 0 20px ${getWeightColor(formData.weight)}`,
                letterSpacing: '0.05em'
              }}>
                {formData.weight}%
              </div>
            </label>
            
            {/* CUSTOM SLIDER */}
            <div style={{ position: 'relative', height: 12 }}>
              {/* TRACK */}
              <div style={{
                position: 'absolute',
                top: 2,
                left: 0,
                right: 0,
                height: 8,
                background: 'rgba(0,0,0,0.4)',
                borderRadius: 4,
                overflow: 'hidden'
              }}>
                {/* FILL */}
                <div style={{
                  height: '100%',
                  width: `${formData.weight}%`,
                  background: `linear-gradient(90deg, #00d4ff, ${getWeightColor(formData.weight)})`,
                  boxShadow: `0 0 20px ${getWeightColor(formData.weight)}`,
                  transition: 'all 0.3s'
                }} />
              </div>
              
              {/* INPUT */}
              <input
                type="range"
                min="0"
                max="100"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                disabled={!editing}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: 12,
                  opacity: 0,
                  cursor: editing ? 'pointer' : 'not-allowed'
                }}
              />
            </div>
          </div>

          {/* ACTIVE TOGGLE */}
          <div
            onMouseEnter={() => setHoverField('active')}
            onMouseLeave={() => setHoverField(null)}
            style={{
              padding: 20,
              background: formData.active
                ? 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))'
                : 'linear-gradient(135deg, rgba(107,114,128,0.15), rgba(107,114,128,0.05))',
              border: `1px solid ${formData.active ? 'rgba(16,185,129,0.4)' : 'rgba(107,114,128,0.4)'}`,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              cursor: editing ? 'pointer' : 'default',
              transition: 'all 0.3s',
              boxShadow: formData.active ? '0 4px 20px rgba(16,185,129,0.2)' : 'none'
            }}
            onClick={() => editing && setFormData({ ...formData, active: !formData.active })}
          >
            {/* CUSTOM CHECKBOX */}
            <div style={{
              width: 50,
              height: 28,
              borderRadius: 14,
              background: formData.active ? 'rgba(16,185,129,0.3)' : 'rgba(107,114,128,0.3)',
              border: `2px solid ${formData.active ? '#10b981' : '#6b7280'}`,
              position: 'relative',
              transition: 'all 0.3s',
              boxShadow: formData.active ? '0 0 20px rgba(16,185,129,0.4)' : 'none'
            }}>
              <div style={{
                position: 'absolute',
                top: 2,
                left: formData.active ? 24 : 2,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: formData.active ? '#10b981' : '#6b7280',
                boxShadow: `0 0 15px ${formData.active ? '#10b981' : '#6b7280'}`,
                transition: 'all 0.3s'
              }} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 14,
                fontWeight: 800,
                color: formData.active ? '#10b981' : '#6b7280',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textShadow: formData.active ? '0 0 20px rgba(16,185,129,0.5)' : 'none'
              }}>
                {formData.active ? '● ACTIVE' : '○ INACTIVE'}
              </div>
              <div style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'monospace',
                marginTop: 4,
                letterSpacing: '0.05em'
              }}>
                System participation status
              </div>
            </div>
          </div>

          {/* TAGS */}
          <div
            onMouseEnter={() => setHoverField('tags')}
            onMouseLeave={() => setHoverField(null)}
            style={{
              padding: 20,
              background: hoverField === 'tags'
                ? 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(217,70,239,0.08))'
                : 'rgba(0,0,0,0.2)',
              border: `1px solid ${hoverField === 'tags' ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 12,
              transition: 'all 0.3s',
              boxShadow: hoverField === 'tags' ? '0 4px 20px rgba(0,212,255,0.2)' : 'none'
            }}
          >
            <label style={{
              display: 'block',
              fontSize: 10,
              color: 'rgba(0,212,255,0.7)',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: 16,
              fontWeight: 700
            }}>
              ▸ SEMANTIC TAGS
            </label>
            
            {editing && (
              <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tag..."
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    background: 'rgba(0,212,255,0.05)',
                    border: '1px solid rgba(0,212,255,0.3)',
                    borderRadius: 8,
                    color: 'white',
                    fontFamily: 'monospace',
                    fontSize: 13,
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid rgba(0,212,255,0.6)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(0,212,255,0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  onClick={addTag}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,212,255,0.1))',
                    border: '1px solid rgba(0,212,255,0.5)',
                    borderRadius: 8,
                    color: '#00d4ff',
                    fontFamily: 'monospace',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s',
                    boxShadow: '0 0 20px rgba(0,212,255,0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.4), rgba(0,212,255,0.2))';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,212,255,0.1))';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  ADD
                </button>
              </div>
            )}
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {formData.tags.length === 0 ? (
                <div style={{
                  padding: '10px 16px',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'monospace',
                  fontSize: 12,
                  fontStyle: 'italic'
                }}>
                  No tags defined
                </div>
              ) : (
                formData.tags.map((tag: string) => (
                  <span
                    key={tag}
                    style={{
                      padding: '10px 16px',
                      background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(217,70,239,0.2))',
                      border: '1px solid rgba(0,212,255,0.4)',
                      borderRadius: 20,
                      color: '#00d4ff',
                      fontFamily: 'monospace',
                      fontSize: 12,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      boxShadow: '0 0 15px rgba(0,212,255,0.2)',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 0 25px rgba(0,212,255,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(0,212,255,0.2)';
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
                          fontSize: 18,
                          padding: 0,
                          lineHeight: 1,
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#ef4444';
                          e.currentTarget.style.transform = 'rotate(90deg)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                          e.currentTarget.style.transform = 'rotate(0deg)';
                        }}
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* SAVE/CANCEL BUTTONS */}
          {editing && (
            <div style={{ 
              display: 'flex', 
              gap: 16, 
              marginTop: 8,
              padding: '20px 0 0 0',
              borderTop: '1px solid rgba(0,212,255,0.2)'
            }}>
              <button
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    name: profile.label || profile.name || profileId,
                    description: profile.description || '',
                    weight: profile.weight ?? 50,
                    active: profile.active ?? true,
                    tags: Array.isArray(profile.tags) ? profile.tags : []
                  });
                }}
                disabled={saving}
                style={{
                  flex: 1,
                  padding: 18,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 10,
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: 'monospace',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  transition: 'all 0.3s',
                  opacity: saving ? 0.5 : 1
                }}
                onMouseEnter={(e) => !saving && (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                onMouseLeave={(e) => !saving && (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              >
                CANCEL
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  flex: 1,
                  padding: 18,
                  background: saving
                    ? 'rgba(128,128,128,0.3)'
                    : 'linear-gradient(135deg, rgba(0,212,255,0.4), rgba(217,70,239,0.4))',
                  border: '2px solid rgba(0,212,255,0.6)',
                  borderRadius: 10,
                  color: saving ? 'rgba(255,255,255,0.4)' : 'white',
                  fontFamily: 'monospace',
                  fontSize: 14,
                  fontWeight: 900,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  boxShadow: saving ? 'none' : '0 8px 32px rgba(0,212,255,0.4)',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => !saving && (
                  e.currentTarget.style.transform = 'translateY(-2px)',
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,212,255,0.6)'
                )}
                onMouseLeave={(e) => !saving && (
                  e.currentTarget.style.transform = 'translateY(0)',
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,212,255,0.4)'
                )}
              >
                {saving ? 'SYNCHRONIZING...' : '💾 SAVE CHANGES'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DELETE CONFIRMATION - ULTRA CYBER */}
      {showDeleteConfirm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(20px)',
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
              background: 'rgba(0,0,0,0.98)',
              border: '2px solid rgba(239,68,68,0.6)',
              borderRadius: 20,
              padding: 40,
              maxWidth: 550,
              boxShadow: '0 0 100px rgba(239,68,68,0.5), inset 0 0 60px rgba(239,68,68,0.1)',
              animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* DANGER CORNERS */}
            {[
              {top: -2, left: -2, borderTop: '4px solid #ef4444', borderLeft: '4px solid #ef4444'},
              {top: -2, right: -2, borderTop: '4px solid #ef4444', borderRight: '4px solid #ef4444'},
              {bottom: -2, left: -2, borderBottom: '4px solid #ef4444', borderLeft: '4px solid #ef4444'},
              {bottom: -2, right: -2, borderBottom: '4px solid #ef4444', borderRight: '4px solid #ef4444'}
            ].map((corner, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: 40,
                height: 40,
                ...corner,
                animation: 'pulse 2s infinite'
              }} />
            ))}

            {/* TITLE */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              marginBottom: 30
            }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'rgba(239,68,68,0.2)',
                border: '3px solid rgba(239,68,68,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                flexShrink: 0,
                boxShadow: '0 0 40px rgba(239,68,68,0.4)',
                animation: 'pulse 2s infinite'
              }}>
                ⚠️
              </div>
              <div>
                <div style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: '#ef4444',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  textShadow: '0 0 30px rgba(239,68,68,0.6)'
                }}>
                  CONFIRM DELETION
                </div>
                <div style={{
                  fontSize: 11,
                  color: 'rgba(239,68,68,0.7)',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  marginTop: 6
                }}>
                  IRREVERSIBLE ACTION
                </div>
              </div>
            </div>
            
            {/* MESSAGE */}
            <div style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.9)',
              fontFamily: 'monospace',
              lineHeight: 1.8,
              marginBottom: 32,
              padding: 24,
              background: 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(239,68,68,0.05))',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 12,
              boxShadow: 'inset 0 0 30px rgba(239,68,68,0.1)'
            }}>
              Delete profile <strong style={{ 
                color: '#00d4ff',
                textShadow: '0 0 15px rgba(0,212,255,0.6)',
                fontSize: 17
              }}>{formData.name}</strong>?
              <br /><br />
              <span style={{ 
                color: '#ef4444', 
                fontWeight: 900,
                textShadow: '0 0 15px rgba(239,68,68,0.6)'
              }}>⚡ WARNING:</span> This action <strong style={{ 
                color: '#ef4444',
                textShadow: '0 0 10px rgba(239,68,68,0.6)'
              }}>CANNOT BE UNDONE</strong>.
              <br />
              Profile will be permanently removed from system.
            </div>

            {/* BUTTONS */}
            <div style={{ display: 'flex', gap: 16 }}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  flex: 1,
                  padding: '18px 28px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderRadius: 12,
                  color: 'rgba(255,255,255,0.8)',
                  fontFamily: 'monospace',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  onDelete();
                }}
                style={{
                  flex: 1,
                  padding: '18px 28px',
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.4), rgba(239,68,68,0.2))',
                  border: '2px solid rgba(239,68,68,0.6)',
                  borderRadius: 12,
                  color: '#ef4444',
                  fontFamily: 'monospace',
                  fontSize: 14,
                  fontWeight: 900,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  boxShadow: '0 8px 32px rgba(239,68,68,0.4)',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239,68,68,0.5), rgba(239,68,68,0.3))';
                  e.currentTarget.style.boxShadow = '0 12px 48px rgba(239,68,68,0.6)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239,68,68,0.4), rgba(239,68,68,0.2))';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(239,68,68,0.4)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                🗑️ DELETE PROFILE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATION */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          padding: '20px 32px',
          background: notification.type === 'success' 
            ? 'linear-gradient(135deg, rgba(16,185,129,0.98), rgba(5,150,105,0.98))'
            : 'linear-gradient(135deg, rgba(239,68,68,0.98), rgba(220,38,38,0.98))',
          border: `2px solid ${notification.type === 'success' ? '#10b981' : '#ef4444'}`,
          borderRadius: 16,
          color: 'white',
          fontFamily: 'monospace',
          fontSize: 15,
          fontWeight: 800,
          boxShadow: notification.type === 'success'
            ? '0 12px 48px rgba(16,185,129,0.6)'
            : '0 12px 48px rgba(239,68,68,0.6)',
          zIndex: 10001,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          animation: 'slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          <span style={{ fontSize: 24 }}>
            {notification.type === 'success' ? '✅' : '❌'}
          </span>
          {notification.message}
        </div>
      )}

      {/* ANIMATIONS */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.98); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100px) scale(0.9); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
