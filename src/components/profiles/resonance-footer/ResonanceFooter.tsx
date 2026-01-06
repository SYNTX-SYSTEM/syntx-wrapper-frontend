"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  profileId: string | null;
}

export default function ResonanceFooter({ profileId }: Props) {
  const [loading, setLoading] = useState(false);

  const handleAutoSuggest = async () => {
    if (!profileId) return;
    setLoading(true);
    try {
      // TODO: Call autonomous/analyze endpoint
      console.log('🛠️ Auto-Suggest for:', profileId);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Auto-suggest failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReScore = async () => {
    if (!profileId) return;
    setLoading(true);
    try {
      // TODO: Call re-score endpoint
      console.log('🔁 Re-Score for:', profileId);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      gap: 12,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* TOOLS */}
      <div style={{ display: 'flex', gap: 8 }}>
        <motion.button
          onClick={handleAutoSuggest}
          disabled={!profileId || loading}
          whileHover={{ scale: profileId ? 1.05 : 1 }}
          whileTap={{ scale: profileId ? 0.95 : 1 }}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            border: '1px solid rgba(14,165,233,0.3)',
            background: profileId 
              ? 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(59,130,246,0.2))'
              : 'rgba(0,0,0,0.3)',
            color: profileId ? '#0ea5e9' : 'rgba(255,255,255,0.3)',
            fontSize: 11,
            fontFamily: 'monospace',
            fontWeight: 700,
            cursor: profileId ? 'pointer' : 'not-allowed',
            letterSpacing: 1.2,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s'
          }}
        >
          💡 AUTO-SUGGEST
          {loading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 12,
                height: 12,
                border: '2px solid rgba(14,165,233,0.3)',
                borderTopColor: '#0ea5e9',
                borderRadius: '50%'
              }}
            />
          )}
        </motion.button>

        <motion.button
          onClick={handleReScore}
          disabled={!profileId || loading}
          whileHover={{ scale: profileId ? 1.05 : 1 }}
          whileTap={{ scale: profileId ? 0.95 : 1 }}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            border: '1px solid rgba(239,68,68,0.3)',
            background: profileId
              ? 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(220,38,38,0.2))'
              : 'rgba(0,0,0,0.3)',
            color: profileId ? '#ef4444' : 'rgba(255,255,255,0.3)',
            fontSize: 11,
            fontFamily: 'monospace',
            fontWeight: 700,
            cursor: profileId ? 'pointer' : 'not-allowed',
            letterSpacing: 1.2,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s'
          }}
        >
          🔴 RE-SCORE
        </motion.button>
      </div>

      {/* STATUS */}
      <div style={{
        fontSize: 10,
        fontFamily: 'monospace',
        color: 'rgba(255,255,255,0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: profileId ? '#10b981' : '#6b7280'
          }}
        />
        {profileId ? (
          <span>PROFILE: <span style={{ color: '#0ea5e9', fontWeight: 700 }}>{profileId}</span></span>
        ) : (
          <span>NO PROFILE SELECTED</span>
        )}
      </div>
    </div>
  );
}
