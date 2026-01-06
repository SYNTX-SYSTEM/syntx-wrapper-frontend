// ═══════════════════════════════════════════════════════════════════════════
// 🌊 PROFILES PANEL - SYNTX CONSCIOUSNESS ORCHESTRATOR
// ═══════════════════════════════════════════════════════════════════════════

'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProfileListSidebar } from './ProfileListSidebar';
import { ProfileDetailsPanel } from './ProfileDetailsPanel';
import { ProfileFormModal } from './ProfileFormModal';
import { getProfiles } from '@/lib/api';
import { getAllProfileAnalytics } from '@/lib/api-profiles';
import { useProfileMutations, ProfileFormData } from '@/hooks/useProfileMutations';

export function ProfilesPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string, detail?: string} | null>(null);
  const [pulseEffect, setPulseEffect] = useState(false);
  
  const { createProfile, loading: mutating, error, success, resetState } = useProfileMutations();

  const loadProfiles = async () => {
    setLoading(true);
    try {
      const [profilesRes, analyticsRes] = await Promise.all([
        getProfiles(),
        getAllProfileAnalytics(7)
      ]);
      
      const profileList = Object.keys(profilesRes.profiles || {}).map(id => {
        const profile = profilesRes.profiles[id];
        const analytics = analyticsRes[id] || {
          total_uses: 0,
          avg_score: 0,
          status: 'UNUSED'
        };
        
        return {
          id,
          name: profile.label || profile.name || id,
          totalUses: analytics.total_uses,
          avgScore: analytics.avg_score,
          status: analytics.status
        };
      });
      
      setProfiles(profileList);
      
      const urlProfile = searchParams.get('profile');
      if (urlProfile && profileList.some(p => p.id === urlProfile)) {
        setSelectedProfileId(urlProfile);
      } else if (profileList.length > 0 && !selectedProfileId) {
        setSelectedProfileId(profileList[0].id);
      }
      
    } catch (error) {
      console.error('Failed to load profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfiles();
  }, [searchParams]);

  useEffect(() => {
    if (success) {
      setModalOpen(false);
      setPulseEffect(true);
      setNotification({
        type: 'success',
        message: 'PROFILE CREATED',
        detail: 'New consciousness layer initialized in system'
      });
      resetState();
      
      // Reload profiles immediately
      loadProfiles().then(() => {
        setPulseEffect(false);
      });
      
      // Hide notification after 4s
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setNotification({
        type: 'error',
        message: 'RESONANCE FAILURE',
        detail: error
      });
      
      setTimeout(() => {
        setNotification(null);
        resetState();
      }, 6000);
    }
  }, [error]);

  const handleSelectProfile = (profileId: string) => {
    setSelectedProfileId(profileId);
    router.push(`?profile=${profileId}`, { scroll: false });
  };

  const handleCreateProfile = async (data: ProfileFormData) => {
    try {
      await createProfile(data);
    } catch (err: any) {
      console.error('Profile creation failed:', err);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 400,
        fontFamily: 'monospace',
        color: '#00d4ff',
        fontSize: 14,
        letterSpacing: '0.15em'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 60,
            height: 60,
            border: '3px solid rgba(0,212,255,0.3)',
            borderTop: '3px solid #00d4ff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <div>LOADING SYSTEM ORGANS...</div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 16, minHeight: 500 }}>
        {/* Left Sidebar */}
        <div style={{ 
          width: 300, 
          background: pulseEffect ? 'rgba(0,212,255,0.1)' : 'rgba(0,0,0,0.3)', 
          borderRadius: 12, 
          border: pulseEffect ? '1px solid rgba(0,212,255,0.8)' : '1px solid rgba(0,212,255,0.3)',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          transition: 'all 0.6s ease-out',
          boxShadow: pulseEffect ? '0 0 40px rgba(0,212,255,0.4)' : 'none'
        }}>
          {/* NEW PROFILE BUTTON */}
          <button
            onClick={() => {
              setModalMode('create');
              setModalOpen(true);
            }}
            style={{
              width: '100%',
              padding: 14,
              background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(217,70,239,0.3))',
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
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 0 20px rgba(0,212,255,0.3)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.5)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: 18 }}>+</span>
            NEW PROFILE
          </button>

          <ProfileListSidebar
            profiles={profiles}
            selectedId={selectedProfileId}
            onSelect={handleSelectProfile}
          />
        </div>

        {/* Right Panel */}
        <div style={{ 
          flex: 1, 
          background: 'rgba(0,0,0,0.3)', 
          borderRadius: 12, 
          border: '1px solid rgba(0,212,255,0.3)',
          padding: 24
        }}>
          {selectedProfileId ? (
            <ProfileDetailsPanel profileId={selectedProfileId} />
          ) : (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              minHeight: 400,
              fontFamily: 'monospace',
              color: 'rgba(255,255,255,0.4)',
              fontSize: 13,
              letterSpacing: '0.1em'
            }}>
              NO PROFILE SELECTED
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <ProfileFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          resetState();
        }}
        onSubmit={handleCreateProfile}
        mode={modalMode}
      />

      {/* SLEEK NOTIFICATION */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            minWidth: 400,
            background: notification.type === 'success' 
              ? 'rgba(16,185,129,0.15)' 
              : 'rgba(239,68,68,0.15)',
            backdropFilter: 'blur(12px)',
            border: notification.type === 'success'
              ? '1px solid rgba(16,185,129,0.5)'
              : '1px solid rgba(239,68,68,0.5)',
            borderLeft: notification.type === 'success'
              ? '4px solid #10b981'
              : '4px solid #ef4444',
            borderRadius: 12,
            padding: '16px 20px',
            boxShadow: notification.type === 'success'
              ? '0 8px 32px rgba(16,185,129,0.3)'
              : '0 8px 32px rgba(239,68,68,0.3)',
            zIndex: 10000,
            animation: 'slideInRight 0.4s ease-out',
            display: 'flex',
            gap: 16,
            alignItems: 'start'
          }}
        >
          {/* ICON */}
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: notification.type === 'success'
              ? 'rgba(16,185,129,0.2)'
              : 'rgba(239,68,68,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            flexShrink: 0
          }}>
            {notification.type === 'success' ? '✓' : '✕'}
          </div>

          {/* CONTENT */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'monospace',
              fontSize: 13,
              fontWeight: 700,
              color: notification.type === 'success' ? '#10b981' : '#ef4444',
              marginBottom: 4,
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              {notification.message}
            </div>
            <div style={{
              fontFamily: 'monospace',
              fontSize: 12,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.4
            }}>
              {notification.detail}
            </div>
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setNotification(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.5)',
              fontSize: 20,
              cursor: 'pointer',
              padding: 0,
              width: 24,
              height: 24,
              flexShrink: 0
            }}
          >
            ×
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(500px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
