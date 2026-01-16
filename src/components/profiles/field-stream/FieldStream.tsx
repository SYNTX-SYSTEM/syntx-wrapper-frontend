"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Moon } from 'lucide-react';
import { api } from '@/lib/api';
import { getProfileAnalytics } from '@/lib/api-profiles';

interface Props {
  onSelectProfile: (profileId: string) => void;
  selectedProfile: string | null;
}

interface ProfileData {
  id: string;
  name: string;
  description: string;
  status: string;
  avgScore: number;
  uses: number;
  tier: number;
}

export default function FieldStream({ onSelectProfile, selectedProfile }: Props) {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<number | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const [profilesData, analyticsData] = await Promise.all([
        api.getProfiles(),
        getProfileAnalytics(7)
      ]);
      
      const profilesList: ProfileData[] = Object.entries(profilesData.profiles).map(([id, profile]: [string, any]) => {
        const analytics = analyticsData.profiles[id];
        
        return {
          id,
          name: profile.name,
          description: profile.description,
          status: analytics ? 'active' : 'unused',
          avgScore: analytics ? Math.round(analytics.avg_score * 100) : 0,
          uses: analytics ? analytics.total_usage : 0,
          tier: id.includes('default') ? 1 : 2
        };
      });
      
      setProfiles(profilesList);
      if (profilesList.length > 0 && !selectedProfile) {
        onSelectProfile(profilesList[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = profiles.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchTier = tierFilter === null || f.tier === tierFilter;
    return matchSearch && matchTier;
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <motion.div
          style={{ width: 35, height: 35, border: '3px solid rgba(14,165,233,0.2)', borderTopColor: '#0ea5e9', borderRadius: '50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: '#0ea5e9', fontFamily: 'monospace', letterSpacing: 1.2, marginBottom: 4 }}>
        FIELD STREAM
      </div>

      <div style={{ position: 'relative' }}>
        <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(14,165,233,0.5)' }} />
        <input
          type="text"
          placeholder="Search profiles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 10px 8px 32px',
            borderRadius: 8,
            border: '1px solid rgba(14,165,233,0.3)',
            background: 'rgba(0,0,0,0.5)',
            color: '#fff',
            fontSize: 11,
            fontFamily: 'monospace',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {[1, 2, 3].map(tier => (
          <button
            key={tier}
            onClick={() => setTierFilter(tierFilter === tier ? null : tier)}
            style={{
              padding: '4px 8px',
              borderRadius: 5,
              border: tierFilter === tier ? '1px solid rgba(14,165,233,0.5)' : '1px solid rgba(255,255,255,0.15)',
              background: tierFilter === tier ? 'rgba(14,165,233,0.15)' : 'rgba(255,255,255,0.05)',
              color: tierFilter === tier ? '#0ea5e9' : 'rgba(255,255,255,0.5)',
              fontSize: 9,
              fontFamily: 'monospace',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            TIER-{tier}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((profile, idx) => (
          <ProfileCard
            key={`${profile.id}-${profile.avgScore}-${profile.uses}`}
            profile={profile}
            isSelected={selectedProfile === profile.id}
            onClick={() => onSelectProfile(profile.id)}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}

function ProfileCard({ profile, isSelected, onClick, index }: any) {
  const statusConfig = {
    active: { icon: Zap, color: '#10b981', label: 'ACTIVE' },
    unused: { icon: Moon, color: '#6b7280', label: 'UNUSED' }
  };

  const config = statusConfig[profile.status as keyof typeof statusConfig];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ x: 4, scale: 1.01 }}
      onClick={onClick}
      style={{
        padding: 10,
        borderRadius: 8,
        background: isSelected ? 'rgba(14,165,233,0.1)' : 'rgba(0,0,0,0.5)',
        border: isSelected ? '1px solid rgba(14,165,233,0.4)' : '1px solid rgba(255,255,255,0.1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {isSelected && <div className="scan-line" style={{ '--scan-color': '#0ea5e9' } as React.CSSProperties} />}
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <Icon size={14} style={{ color: config.color }} />
        <div style={{ flex: 1, fontSize: 11, fontWeight: 700, color: '#0ea5e9', fontFamily: 'monospace' }}>
          {profile.name}
        </div>
        <span style={{
          padding: '2px 6px',
          borderRadius: 4,
          background: `${config.color}20`,
          border: `1px solid ${config.color}40`,
          color: config.color,
          fontSize: 7,
          fontFamily: 'monospace',
          fontWeight: 700
        }}>
          {config.label}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
        <div>Score: <span style={{ color: profile.avgScore >= 50 ? '#10b981' : '#f59e0b', fontWeight: 700 }}>{profile.avgScore}%</span></div>
        <div>Uses: <span style={{ color: '#8b5cf6', fontWeight: 700 }}>{profile.uses}</span></div>
      </div>
    </motion.div>
  );
}
