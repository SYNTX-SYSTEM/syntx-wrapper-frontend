'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useOrganStore } from '../store';

interface CreateSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateSidebar({ isOpen, onClose }: CreateSidebarProps) {
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [strategy, setStrategy] = useState('custom');
  const [weight, setWeight] = useState(50);
  const [isStabilizing, setIsStabilizing] = useState(false);
  const [availableStrategies, setAvailableStrategies] = useState<string[]>([]);

  const x = useSpring(400, { stiffness: 300, damping: 30 });

  useEffect(() => {
    x.set(isOpen ? 0 : 400);
  }, [isOpen, x]);

  useEffect(() => {
    // LOAD STRATEGIES FROM RUNTIME
    fetch('https://dev.syntx-system.com/resonanz/profiles/crud')
      .then(res => res.json())
      .then(data => {
        const strategies = new Set<string>();
        Object.values(data.profiles).forEach((profile: any) => {
          if (profile.strategy) strategies.add(profile.strategy);
        });
        setAvailableStrategies(Array.from(strategies));
        if (strategies.size > 0 && !strategy) {
          setStrategy(Array.from(strategies)[0]);
        }
      });
  }, []);

  const handleStabilize = async () => {
    if (!name || !label) return;
    
    setIsStabilizing(true);
    
    try {
      const response = await fetch('https://dev.syntx-system.com/resonanz/profiles/crud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          label,
          description,
          strategy,
          components: {},
          active: true,
          weight,
          tags: [],
          patterns: [],
        }),
      });

      if (response.ok) {
        setName('');
        setLabel('');
        setDescription('');
        setStrategy('custom');
        setWeight(50);
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to create profile:', error);
    } finally {
      setIsStabilizing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
        }}
      />

      <motion.div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          width: 400,
          x,
          background: 'linear-gradient(135deg, rgba(10,14,39,0.98), rgba(18,23,48,0.96))',
          borderLeft: '3px solid rgba(0,212,255,0.5)',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.8)',
          zIndex: 1000,
          padding: '32px 28px',
          overflowY: 'auto',
        }}
      >
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: '#00d4ff', fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace', textShadow: '0 0 12px rgba(0,212,255,0.6)', marginBottom: 8 }}>
            NEW PROFILE
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontFamily: 'monospace' }}>
            Birth a new resonance body
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <label style={{ color: 'rgba(0,212,255,0.8)', fontSize: '11px', fontFamily: 'monospace', fontWeight: 600, marginBottom: 8, display: 'block', letterSpacing: '1px' }}>
              NAME (ID)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s/g, '_'))}
              placeholder="profile_name"
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '2px solid rgba(0,212,255,0.3)',
                borderRadius: '8px',
                padding: '12px 14px',
                color: '#fff',
                fontSize: '14px',
                fontFamily: 'monospace',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ color: 'rgba(0,212,255,0.8)', fontSize: '11px', fontFamily: 'monospace', fontWeight: 600, marginBottom: 8, display: 'block', letterSpacing: '1px' }}>
              LABEL (DISPLAY)
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Profile Label"
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '2px solid rgba(0,212,255,0.3)',
                borderRadius: '8px',
                padding: '12px 14px',
                color: '#fff',
                fontSize: '14px',
                fontFamily: 'monospace',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ color: 'rgba(0,212,255,0.8)', fontSize: '11px', fontFamily: 'monospace', fontWeight: 600, marginBottom: 8, display: 'block', letterSpacing: '1px' }}>
              DESCRIPTION
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the profile..."
              rows={4}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '2px solid rgba(0,212,255,0.3)',
                borderRadius: '8px',
                padding: '12px 14px',
                color: '#fff',
                fontSize: '14px',
                fontFamily: 'monospace',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ color: 'rgba(0,212,255,0.8)', fontSize: '11px', fontFamily: 'monospace', fontWeight: 600, marginBottom: 8, display: 'block', letterSpacing: '1px' }}>
              STRATEGY
            </label>
            <select
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '2px solid rgba(0,212,255,0.3)',
                borderRadius: '8px',
                padding: '12px 14px',
                color: '#fff',
                fontSize: '14px',
                fontFamily: 'monospace',
                outline: 'none',
              }}
            >
              <option value="custom">Custom (New Strategy)</option>
              {availableStrategies.map(strat => (
                <option key={strat} value={strat}>{strat}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ color: 'rgba(0,212,255,0.8)', fontSize: '11px', fontFamily: 'monospace', fontWeight: 600, marginBottom: 8, display: 'block', letterSpacing: '1px' }}>
              WEIGHT: {weight}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '12px',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            CANCEL
          </button>
          <button
            onClick={handleStabilize}
            disabled={!name || !label || isStabilizing}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(157,0,255,0.3))',
              border: '2px solid rgba(0,212,255,0.6)',
              borderRadius: '8px',
              padding: '12px',
              color: '#fff',
              fontSize: '14px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              cursor: !name || !label || isStabilizing ? 'not-allowed' : 'pointer',
              opacity: !name || !label || isStabilizing ? 0.5 : 1,
              boxShadow: '0 0 20px rgba(0,212,255,0.4)',
            }}
          >
            {isStabilizing ? 'STABILIZING...' : 'STABILIZE'}
          </button>
        </div>

        <div style={{ marginTop: 24, padding: '16px', background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '8px' }}>
          <div style={{ color: 'rgba(0,212,255,0.8)', fontSize: '10px', fontFamily: 'monospace', marginBottom: 8 }}>
            PREVIEW RESONANCE:
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, rgba(0,212,255,${weight/100}), rgba(157,0,255,${weight/100}))`, border: '2px solid rgba(0,212,255,0.5)', boxShadow: `0 0 ${weight/5}px rgba(0,212,255,0.6)` }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontSize: '12px', fontFamily: 'monospace', fontWeight: 'bold' }}>{label || 'Unnamed'}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontFamily: 'monospace' }}>{strategy}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
