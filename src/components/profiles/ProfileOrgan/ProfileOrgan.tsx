'use client';

import { useEffect, useState } from 'react';
import { useOrganStore } from './store';
import NeuralBackground from './layers/NeuralBackground';
import LogoCenter from './layers/LogoCenter';
import FieldLayer from './layers/FieldLayer';
import BindingLayer from './layers/BindingLayer';
import FormatLayer from './layers/FormatLayer';
import FormatLegend from './overlays/FormatLegend';
import BindingSuccessNotification from './overlays/BindingSuccessNotification';
import ProfileLayer from './layers/ProfileLayer';
import PlanetBirthWizard from './overlays/PlanetBirthWizard';
import BindingFlash from './overlays/BindingFlash';
import ErrorNotification from './overlays/ErrorNotification';

export default function ProfileOrgan() {
  const setSnapshot = useOrganStore((state) => state.setSnapshot);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [showFlash, setShowFlash] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [bindingNotification, setBindingNotification] = useState<{
    profileId: string;
    profileLabel: string;
    profileStrategy: string;
    formatName: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profilesRes, formatsRes] = await Promise.all([
          fetch('https://dev.syntx-system.com/resonanz/profiles/crud'),
          fetch('https://dev.syntx-system.com/resonanz/formats'),
        ]);

        const profilesData = await profilesRes.json();
        const formatsData = await formatsRes.json();

        const profiles = Object.entries(profilesData.profiles).map(([id, data]: [string, any]) => ({
          id,
          name: data.name || id,
          label: data.label || data.name || id,
          active: data.active ?? true,
          weight: data.weight || 50,
          tags: data.tags || [],
          patterns: data.patterns || [],
          updated_at: data.updated_at || new Date().toISOString(),
        }));

        const formats = formatsData.formats.map((f: any) => ({
          name: f.name,
          fields: f.fields || [],
          profile_reference: f.profile_reference || null,
        }));

        // GET BINDINGS FROM MAPPING (NOT FROM FORMATS!)
        const mappingResponse = await fetch('https://dev.syntx-system.com/mapping/formats');
        const mappingData = await mappingResponse.json();
        
        const bindings = Object.entries(mappingData.mappings || {})
          .filter(([_, mapping]: any) => mapping.profile_id)
          .map(([formatName, mapping]: any) => ({
            profileId: mapping.profile_id,
            formatName: formatName,
          }));

        setSnapshot({
          profiles,
          formats,
          bindings,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.error('Failed to fetch system data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [setSnapshot]);

  const handleBindingCreated = (profileId: string, formatName: string) => {
    setFlashMessage(`✅ ${profileId} → ${formatName}`);
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 3000);
    
    // Show molecule animation
    const snapshot = useOrganStore.getState().snapshot;
    if (snapshot) {
      const profile = snapshot.profiles.find(p => p.id === profileId);
      if (profile) {
        setBindingNotification({
          profileId: profileId,
          profileLabel: profile.label || profileId,
          profileStrategy: profile.strategy || 'unknown',
          formatName: formatName,
        });
      }
    }
  };

  const handleBindingError = (error: string) => {
    setErrorMessage(error);
    setShowError(true);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#0a0e27' }}>
      <NeuralBackground />
      <LogoCenter onCreateClick={() => setIsWizardOpen(true)} />
      <FieldLayer />
      <BindingLayer />
      <FormatLayer />
      <BindingSuccessNotification
        isVisible={!!bindingNotification}
        profileId={bindingNotification?.profileId || ''}
        profileLabel={bindingNotification?.profileLabel || ''}
        profileStrategy={bindingNotification?.profileStrategy || 'unknown'}
        formatName={bindingNotification?.formatName || ''}
        onComplete={() => setBindingNotification(null)}
      />
      
      <ProfileLayer onBindingCreated={handleBindingCreated} onBindingError={handleBindingError} />
      <PlanetBirthWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
      <BindingFlash isVisible={showFlash} message={flashMessage} />
      <ErrorNotification 
        message={errorMessage}
        isVisible={showError}
        onClose={() => setShowError(false)}
      />
    </div>
  );
}
