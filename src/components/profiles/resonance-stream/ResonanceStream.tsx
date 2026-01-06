"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProfile } from '@/lib/api';
import ComponentBreakdownPanel from '../component-breakdown/ComponentBreakdownPanel';

interface Props {
  profileId: string | null;
}

export default function ResonanceStream({ profileId }: Props) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'components' | 'changelog' | 'tools'>('components');

  useEffect(() => {
    if (profileId) {
      fetchProfile();
    }
  }, [profileId]);

  const fetchProfile = async () => {
    if (!profileId) return;
    setLoading(true);
    try {
      const data = await getProfile(profileId);
      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!profileId) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        flexDirection: 'column',
        gap: 16
      }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ fontSize: 48 }}
        >
          🌀
        </motion.div>
        <div style={{ 
          fontSize: 14, 
          color: 'rgba(14,165,233,0.6)', 
          fontFamily: 'monospace',
          letterSpacing: 2
        }}>
          SELECT PROFILE TO BEGIN
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <motion.div
          style={{ 
            width: 60, 
            height: 60, 
            border: '4px solid rgba(14,165,233,0.2)', 
            borderTopColor: '#0ea5e9', 
            borderRadius: '50%' 
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: 20,
          borderBottom: '1px solid rgba(14,165,233,0.2)',
          background: 'rgba(0,0,0,0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <motion.div
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ fontSize: 24 }}
          >
            ⚡
          </motion.div>
          <div>
            <div style={{ 
              fontSize: 18, 
              fontWeight: 800, 
              color: '#0ea5e9', 
              fontFamily: 'monospace',
              letterSpacing: 1.5
            }}>
              {profileId}
            </div>
            <div style={{ 
              fontSize: 11, 
              color: 'rgba(255,255,255,0.4)', 
              fontFamily: 'monospace',
              marginTop: 2
            }}>
              {profile?.description || 'Loading...'}
            </div>
          </div>
        </div>

        {/* METADATA */}
        {profile && (
          <div style={{ 
            display: 'flex', 
            gap: 16, 
            fontSize: 10, 
            fontFamily: 'monospace',
            color: 'rgba(255,255,255,0.5)',
            marginTop: 12
          }}>
            <div>
              VERSION: <span style={{ color: '#0ea5e9', fontWeight: 700 }}>{profile.version || '1.3.2'}</span>
            </div>
            <div>
              UPDATED: <span style={{ color: '#0ea5e9', fontWeight: 700 }}>
                {profile.last_updated || '2025-01-05'}
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* TABS */}
      <div style={{ 
        display: 'flex', 
        gap: 8, 
        padding: '16px 20px',
        borderBottom: '1px solid rgba(14,165,233,0.2)',
        background: 'rgba(0,0,0,0.2)'
      }}>
        {(['components', 'changelog', 'tools'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '6px 16px',
              borderRadius: 6,
              border: activeTab === tab 
                ? '1px solid rgba(14,165,233,0.5)' 
                : '1px solid rgba(255,255,255,0.1)',
              background: activeTab === tab 
                ? 'rgba(14,165,233,0.15)' 
                : 'rgba(0,0,0,0.3)',
              color: activeTab === tab ? '#0ea5e9' : 'rgba(255,255,255,0.5)',
              fontSize: 11,
              fontFamily: 'monospace',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: 1.2,
              transition: 'all 0.2s'
            }}
          >
            {tab === 'components' && '🧩 '}
            {tab === 'changelog' && '📝 '}
            {tab === 'tools' && '🛠️ '}
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: 20,
        background: 'rgba(0,0,0,0.1)'
      }}>
        {activeTab === 'components' && (
          <ComponentBreakdownPanel profileId={profileId} />
        )}

        {activeTab === 'changelog' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              textAlign: 'center', 
              padding: 40,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'monospace',
              fontSize: 12
            }}
          >
            📝 CHANGELOG COMING SOON
          </motion.div>
        )}

        {activeTab === 'tools' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              textAlign: 'center', 
              padding: 40,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'monospace',
              fontSize: 12
            }}
          >
            🛠️ TOOLS COMING SOON
          </motion.div>
        )}
      </div>

      {/* SCAN LINE EFFECT */}
      <motion.div
        animate={{
          y: ['0%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.5), transparent)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
