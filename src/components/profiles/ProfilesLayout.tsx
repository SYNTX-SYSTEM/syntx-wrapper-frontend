"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import FieldStream from './field-stream/FieldStream';
import ResonanceStream from './resonance-stream/ResonanceStream';
import ResonanceFooter from './resonance-footer/ResonanceFooter';

export default function ProfilesLayout() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>('dynamic_language_v1');
  const [modified, setModified] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'valid' | 'invalid' | 'checking'>('valid');

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(4,10,18,1) 0%, rgba(8,24,42,1) 100%)', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid rgba(14,165,233,0.2)',
          background: 'rgba(8,24,42,0.8)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ width: 32, height: 32, position: 'relative' }}
          >
            <Image src="/logo_original.png" alt="SYNTX" width={32} height={32} style={{ filter: 'drop-shadow(0 0 8px rgba(14,165,233,0.5))' }} />
          </motion.div>
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>SYNTX</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0ea5e9', fontFamily: 'monospace', letterSpacing: 1 }}>
              PROFILES {selectedProfile && `> ${selectedProfile}`}
            </div>
          </div>
        </div>
        <button className="cyber-btn" style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'monospace', cursor: 'pointer' }}>
          ⚙️ SETTINGS
        </button>
      </motion.header>

      {/* SPLIT VIEW */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '30% 70%', gap: 0, overflow: 'hidden' }}>
        {/* LEFT: FIELD STREAM */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            borderRight: '1px solid rgba(14,165,233,0.15)',
            background: 'rgba(0,0,0,0.3)',
            overflowY: 'auto',
            padding: '16px'
          }}
        >
          <FieldStream onSelectProfile={setSelectedProfile} selectedProfile={selectedProfile} />
        </motion.div>

        {/* RIGHT: RESONANCE STREAM */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            overflowY: 'auto',
            padding: '16px 24px'
          }}
        >
          {selectedProfile ? (
            <ResonanceStream profileId={selectedProfile} onModify={() => setModified(true)} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
              Select a profile from the field stream
            </div>
          )}
        </motion.div>
      </div>

      {/* FOOTER */}
      <ResonanceFooter
        modified={modified}
        validationStatus={validationStatus}
        onDeploy={() => {
          console.log('Deploy triggered');
          setModified(false);
        }}
      />
    </div>
  );
}
