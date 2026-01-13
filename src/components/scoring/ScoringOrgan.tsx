'use client';

import { useEffect, useState, useRef } from 'react';
import { useScoringStore } from './store';
import ScoringNeuralBackground from './layers/ScoringNeuralBackground';
import ProfilePlanet from './layers/ProfilePlanet';
import RingSystem from './layers/RingSystem';
import Legend from './overlays/Legend';
import InteractionZones from './overlays/InteractionZones';
import SumDisplay from './overlays/SumDisplay';
import NeutronensternTutorial from './overlays/NeutronensternTutorial';

const API_BASE = 'https://dev.syntx-system.com';

export default function ScoringOrgan() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const profiles = useScoringStore((state) => state.profiles);
  const activeProfile = useScoringStore((state) => state.activeProfile);
  const setProfiles = useScoringStore((state) => state.setProfiles);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(`${API_BASE}/resonanz/profiles/crud`);
        if (!response.ok) throw new Error('Failed to fetch profiles');
        
        const data = await response.json();
        const profilesList = Object.entries(data.profiles).map(([id, profile]: [string, any]) => ({
          id,
          ...profile
        }));
        
        setProfiles(profilesList);
        setLoading(false);
        
        // Show tutorial on first load
        const hasSeenTutorial = localStorage.getItem('syntx-scoring-tutorial-seen');
        if (!hasSeenTutorial) {
          setShowTutorial(true);
          localStorage.setItem('syntx-scoring-tutorial-seen', 'true');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [setProfiles]);

  useEffect(() => {
    if (!activeProfile) return;

    const saveProfile = async () => {
      try {
        const response = await fetch(`${API_BASE}/resonanz/profiles/crud/${activeProfile.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(activeProfile),
        });
        
        if (!response.ok) throw new Error('Failed to update profile');
        console.log('💎 Profile saved:', activeProfile.id);
      } catch (err) {
        console.error('❌ Save error:', err);
      }
    };

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    
    saveTimerRef.current = setTimeout(saveProfile, 500);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [activeProfile]);

  // Keyboard shortcut: Press "?" to show tutorial
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?') {
        setShowTutorial(true);
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        position: 'fixed', 
        inset: 0, 
        background: '#0a0e27',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9d00ff',
        fontSize: '24px',
        fontFamily: 'monospace',
        fontWeight: 900,
        textShadow: '0 0 20px rgba(157,0,255,1)'
      }}>
        💎 LOADING SCORING ORGAN...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        position: 'fixed', 
        inset: 0, 
        background: '#0a0e27',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        color: '#ff3355',
        fontSize: '18px',
        fontFamily: 'monospace',
        fontWeight: 900,
        textShadow: '0 0 20px rgba(255,51,85,1)'
      }}>
        <div>❌ ERROR</div>
        <div style={{ fontSize: '14px', opacity: 0.8 }}>{error}</div>
      </div>
    );
  }

  if (!activeProfile) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0a0e27', overflow: 'hidden' }}>
      <ScoringNeuralBackground />
      <Legend components={activeProfile.components || {}} />
      <ProfilePlanet profile={activeProfile} />
      <RingSystem components={activeProfile.components || {}} />
      <InteractionZones components={activeProfile.components || {}} />
      <SumDisplay components={activeProfile.components || {}} />
      
      {showTutorial && (
        <NeutronensternTutorial autoShow={showTutorial} />
      )}
      
      {/* HELP BUTTON */}
      <button
        onClick={() => setShowTutorial(true)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: 'rgba(0,212,255,0.2)',
          border: '2px solid #00d4ff',
          borderRadius: '50%',
          width: 50,
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00d4ff',
          fontSize: '24px',
          fontWeight: 900,
          cursor: 'pointer',
          boxShadow: '0 0 20px rgba(0,212,255,0.4)',
          zIndex: 200,
        }}
      >
        ?
      </button>
    </div>
  );
}
