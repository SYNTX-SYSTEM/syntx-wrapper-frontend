'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlanetBirthWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

type WizardStep = 'name' | 'label' | 'description' | 'strategy' | 'weight' | 'complete';

export default function PlanetBirthWizard({ isOpen, onClose }: PlanetBirthWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>('name');
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [strategy, setStrategy] = useState('custom');
  const [weight, setWeight] = useState(50);
  const [availableStrategies, setAvailableStrategies] = useState<string[]>([]);
  const [isStabilizing, setIsStabilizing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch('https://dev.syntx-system.com/resonanz/profiles/crud')
        .then(res => res.json())
        .then(data => {
          const strategies = new Set<string>();
          Object.values(data.profiles).forEach((profile: any) => {
            if (profile.strategy) strategies.add(profile.strategy);
          });
          setAvailableStrategies(Array.from(strategies));
        });
    } else {
      setCurrentStep('name');
      setName('');
      setLabel('');
      setDescription('');
      setStrategy('custom');
      setWeight(50);
    }
  }, [isOpen]);

  const stepOrder: WizardStep[] = ['name', 'label', 'description', 'strategy', 'weight', 'complete'];
  const currentStepIndex = stepOrder.indexOf(currentStep);
  const progress = (currentStepIndex + 1) / stepOrder.length;
  const planetSize = 80 + progress * 220;

  const canProceed = () => {
    switch (currentStep) {
      case 'name': return name.length > 0;
      case 'label': return label.length > 0;
      case 'description': return description.length > 0;
      case 'strategy': return strategy.length > 0;
      case 'weight': return true;
      default: return false;
    }
  };

  const nextStep = () => {
    if (!canProceed()) return;
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < stepOrder.length) {
      setCurrentStep(stepOrder[nextIndex]);
    }
  };

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(stepOrder[prevIndex]);
    }
  };

  const handleStabilize = async () => {
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
        onClose();
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (error) {
      console.error('Failed to create profile:', error);
    } finally {
      setIsStabilizing(false);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'name': return 'PROFILE ID';
      case 'label': return 'DISPLAY NAME';
      case 'description': return 'DESCRIPTION';
      case 'strategy': return 'STRATEGY';
      case 'weight': return 'WEIGHT';
      case 'complete': return 'BIRTH COMPLETE';
      default: return '';
    }
  };

  const InputWrapper = ({ children }: { children: React.ReactNode }) => (
    <div style={{ position: 'relative' }}>
      {/* GALAXY BACKGROUND IN INPUT */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '14px',
        overflow: 'hidden',
        opacity: 0.15,
      }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
            }}
            animate={{ 
              x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              position: 'absolute',
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              borderRadius: '50%',
              background: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#9d00ff' : '#fff',
              boxShadow: `0 0 ${Math.random() * 8 + 4}px ${i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#9d00ff' : '#fff'}`,
            }}
          />
        ))}
      </div>

      {/* ANIMATED GLOW BORDER */}
      <motion.div
        animate={{ 
          opacity: [0.4, 1, 0.4],
          boxShadow: [
            '0 0 20px rgba(0,212,255,0.5), inset 0 0 20px rgba(0,212,255,0.3)',
            '0 0 40px rgba(0,212,255,0.8), inset 0 0 30px rgba(0,212,255,0.5)',
            '0 0 20px rgba(0,212,255,0.5), inset 0 0 20px rgba(0,212,255,0.3)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          inset: -3,
          borderRadius: '14px',
          border: '3px solid rgba(0,212,255,0.6)',
          background: 'linear-gradient(45deg, rgba(0,212,255,0.2), rgba(157,0,255,0.2))',
          filter: 'blur(4px)',
        }}
      />

      {/* CORNER DECORATIONS */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: -2,
          left: -2,
          width: 20,
          height: 20,
          borderTop: '3px solid #00d4ff',
          borderLeft: '3px solid #00d4ff',
          borderTopLeftRadius: '14px',
          boxShadow: '0 0 10px rgba(0,212,255,0.8)',
        }}
      />
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        style={{
          position: 'absolute',
          top: -2,
          right: -2,
          width: 20,
          height: 20,
          borderTop: '3px solid #9d00ff',
          borderRight: '3px solid #9d00ff',
          borderTopRightRadius: '14px',
          boxShadow: '0 0 10px rgba(157,0,255,0.8)',
        }}
      />
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        style={{
          position: 'absolute',
          bottom: -2,
          left: -2,
          width: 20,
          height: 20,
          borderBottom: '3px solid #9d00ff',
          borderLeft: '3px solid #9d00ff',
          borderBottomLeftRadius: '14px',
          boxShadow: '0 0 10px rgba(157,0,255,0.8)',
        }}
      />
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
        style={{
          position: 'absolute',
          bottom: -2,
          right: -2,
          width: 20,
          height: 20,
          borderBottom: '3px solid #00d4ff',
          borderRight: '3px solid #00d4ff',
          borderBottomRightRadius: '14px',
          boxShadow: '0 0 10px rgba(0,212,255,0.8)',
        }}
      />

      {children}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* GALAXY BACKGROUND */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(10,14,39,0.95) 0%, rgba(0,0,0,0.98) 100%)',
              zIndex: 9997,
            }}
          >
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: Math.random() * 0.5 + 0.5,
                  opacity: Math.random() * 0.7 + 0.3
                }}
                animate={{ 
                  opacity: [Math.random() * 0.3, Math.random() * 0.8, Math.random() * 0.3],
                  scale: [1, Math.random() * 1.5 + 1, 1]
                }}
                transition={{ 
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  position: 'absolute',
                  width: 2,
                  height: 2,
                  borderRadius: '50%',
                  background: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#9d00ff' : '#fff',
                  boxShadow: `0 0 ${Math.random() * 10 + 5}px ${i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#9d00ff' : '#fff'}`,
                }}
              />
            ))}

            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ rotate: { duration: 120, repeat: Infinity, ease: 'linear' }, scale: { duration: 20, repeat: Infinity } }}
              style={{
                position: 'absolute',
                top: '20%',
                right: '10%',
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(157,0,255,0.15), transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.15, 1] }}
              transition={{ rotate: { duration: 100, repeat: Infinity, ease: 'linear' }, scale: { duration: 18, repeat: Infinity } }}
              style={{
                position: 'absolute',
                bottom: '15%',
                left: '15%',
                width: 500,
                height: 500,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,212,255,0.12), transparent 70%)',
                filter: 'blur(70px)',
              }}
            />
          </motion.div>

          <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9998, cursor: 'pointer' }} />

          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 50,
            pointerEvents: 'none',
          }}>
            {/* PLANET */}
            <motion.div
              animate={{ 
                width: planetSize, 
                height: planetSize,
                boxShadow: `0 0 ${planetSize * 0.6}px rgba(0,212,255,${0.4 + progress * 0.5})`
              }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{
                borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, rgba(0,212,255,${0.5 + progress * 0.4}), rgba(157,0,255,${0.4 + progress * 0.5}), rgba(10,14,39,0.95))`,
                border: `4px solid rgba(0,212,255,${0.6 + progress * 0.4})`,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'visible',
                cursor: 'pointer',
                pointerEvents: 'auto',
              }}
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={{ rotate: [0, 90, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  fontSize: planetSize * 0.3,
                  color: '#00d4ff',
                  textShadow: '0 0 30px rgba(0,212,255,1)',
                  fontWeight: 'bold',
                  zIndex: 2,
                }}
              >
                ×
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  width: planetSize * 0.5,
                  height: planetSize * 0.5,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,212,255,0.9), transparent)',
                  filter: 'blur(25px)',
                }}
              />

              {[...Array(Math.floor(progress * 40))].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    x: [Math.random() * planetSize - planetSize/2, Math.random() * planetSize - planetSize/2],
                    y: [Math.random() * planetSize - planetSize/2, Math.random() * planetSize - planetSize/2],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
                  style={{
                    position: 'absolute',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: i % 2 === 0 ? '#00d4ff' : '#9d00ff',
                    boxShadow: `0 0 12px ${i % 2 === 0 ? '#00d4ff' : '#9d00ff'}`,
                  }}
                />
              ))}

              <div style={{
                position: 'absolute',
                bottom: '15%',
                color: '#fff',
                fontSize: Math.max(14, planetSize * 0.08),
                fontWeight: 'bold',
                fontFamily: 'monospace',
                textShadow: '0 0 25px rgba(0,212,255,1)',
                zIndex: 1,
              }}>
                {(progress * 100).toFixed(0)}%
              </div>

              {progress > 0.3 && [...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: 1, rotate: 360 }}
                  transition={{ rotate: { duration: 15 + i * 5, repeat: Infinity, ease: 'linear' } }}
                  style={{
                    position: 'absolute',
                    width: planetSize * (1.5 + i * 0.3),
                    height: planetSize * (0.75 + i * 0.15),
                    border: `2px solid rgba(0,212,255,${0.4 - i * 0.1})`,
                    borderRadius: '50%',
                    transform: 'rotateX(70deg)',
                  }}
                />
              ))}
            </motion.div>

            {/* INPUT CARD */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  width: 480,
                  background: 'linear-gradient(135deg, rgba(10,14,39,0.98), rgba(18,23,48,0.95))',
                  border: '3px solid rgba(0,212,255,0.6)',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 0 50px rgba(0,212,255,0.4), inset 0 0 30px rgba(0,212,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  pointerEvents: 'auto',
                }}
              >
                <motion.div
                  animate={{ textShadow: ['0 0 20px rgba(0,212,255,0.8)', '0 0 40px rgba(0,212,255,1)', '0 0 20px rgba(0,212,255,0.8)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    color: '#00d4ff',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    marginBottom: 24,
                    textAlign: 'center',
                    letterSpacing: '2px',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  ◆ {getStepTitle()}
                </motion.div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {currentStep === 'name' && (
                    <InputWrapper>
                      <motion.input
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        autoFocus
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s/g, '_'))}
                        onKeyPress={(e) => e.key === 'Enter' && canProceed() && nextStep()}
                        placeholder="profile_name"
                        style={{
                          position: 'relative',
                          width: '100%',
                          background: 'rgba(0,0,0,0.85)',
                          border: 'none',
                          borderRadius: '14px',
                          padding: '16px 20px',
                          color: '#00d4ff',
                          fontSize: '18px',
                          fontFamily: 'monospace',
                          fontWeight: 600,
                          outline: 'none',
                          textShadow: '0 0 10px rgba(0,212,255,0.7)',
                          zIndex: 2,
                        }}
                      />
                    </InputWrapper>
                  )}

                  {currentStep === 'label' && (
                    <InputWrapper>
                      <motion.input
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        autoFocus
                        type="text"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && canProceed() && nextStep()}
                        placeholder="Display Name"
                        style={{
                          position: 'relative',
                          width: '100%',
                          background: 'rgba(0,0,0,0.85)',
                          border: 'none',
                          borderRadius: '14px',
                          padding: '16px 20px',
                          color: '#00d4ff',
                          fontSize: '18px',
                          fontFamily: 'monospace',
                          fontWeight: 600,
                          outline: 'none',
                          textShadow: '0 0 10px rgba(0,212,255,0.7)',
                          zIndex: 2,
                        }}
                      />
                    </InputWrapper>
                  )}

                  {currentStep === 'description' && (
                    <InputWrapper>
                      <motion.textarea
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        autoFocus
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Profile description..."
                        rows={4}
                        style={{
                          position: 'relative',
                          width: '100%',
                          background: 'rgba(0,0,0,0.85)',
                          border: 'none',
                          borderRadius: '14px',
                          padding: '16px 20px',
                          color: '#00d4ff',
                          fontSize: '16px',
                          fontFamily: 'monospace',
                          outline: 'none',
                          resize: 'none',
                          textShadow: '0 0 10px rgba(0,212,255,0.7)',
                          zIndex: 2,
                        }}
                      />
                    </InputWrapper>
                  )}

                  {currentStep === 'strategy' && (
                    <InputWrapper>
                      <motion.select
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        value={strategy}
                        onChange={(e) => setStrategy(e.target.value)}
                        style={{
                          position: 'relative',
                          width: '100%',
                          background: 'rgba(0,0,0,0.85)',
                          border: 'none',
                          borderRadius: '14px',
                          padding: '16px 20px',
                          color: '#00d4ff',
                          fontSize: '18px',
                          fontFamily: 'monospace',
                          fontWeight: 600,
                          outline: 'none',
                          cursor: 'pointer',
                          zIndex: 2,
                        }}
                      >
                        <option value="custom">Custom (New Strategy)</option>
                        {availableStrategies.map(strat => (
                          <option key={strat} value={strat}>{strat}</option>
                        ))}
                      </motion.select>
                    </InputWrapper>
                  )}

                  {currentStep === 'weight' && (
                    <div>
                      <motion.div
                        animate={{ textShadow: ['0 0 20px rgba(0,212,255,0.8)', '0 0 50px rgba(0,212,255,1)', '0 0 20px rgba(0,212,255,0.8)'] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ 
                          color: '#00d4ff', 
                          fontSize: '48px', 
                          fontWeight: 'bold', 
                          fontFamily: 'monospace',
                          textAlign: 'center',
                          marginBottom: 20,
                        }}
                      >
                        {weight}
                      </motion.div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={weight}
                        onChange={(e) => setWeight(parseInt(e.target.value))}
                        style={{ 
                          width: '100%',
                          height: 12,
                          borderRadius: 6,
                          outline: 'none',
                          background: `linear-gradient(to right, rgba(0,212,255,0.8) ${weight}%, rgba(255,255,255,0.1) ${weight}%)`,
                          cursor: 'pointer',
                        }}
                      />
                    </div>
                  )}

                  {currentStep === 'complete' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ textAlign: 'center', padding: '40px 20px' }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                        transition={{ rotate: { duration: 2, repeat: Infinity, ease: 'linear' }, scale: { duration: 1.5, repeat: Infinity } }}
                        style={{ fontSize: '80px', marginBottom: 20 }}
                      >
                        ✨
                      </motion.div>
                      <div style={{
                        color: '#00ffb3',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                        textShadow: '0 0 20px rgba(0,255,179,1)',
                      }}>
                        READY TO BIRTH
                      </div>
                    </motion.div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 16, marginTop: 32, position: 'relative', zIndex: 1 }}>
                  {currentStepIndex > 0 && currentStep !== 'complete' && (
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(157,0,255,0.6)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={prevStep}
                      style={{
                        flex: 1,
                        background: 'rgba(157,0,255,0.2)',
                        border: '2px solid rgba(157,0,255,0.5)',
                        borderRadius: '12px',
                        padding: '14px',
                        color: '#9d00ff',
                        fontSize: '16px',
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      ← BACK
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: !canProceed() ? 1 : 1.05, boxShadow: !canProceed() ? 'none' : '0 0 35px rgba(0,212,255,0.8)' }}
                    whileTap={{ scale: !canProceed() ? 1 : 0.98 }}
                    onClick={currentStep === 'complete' ? handleStabilize : nextStep}
                    disabled={!canProceed() && currentStep !== 'complete'}
                    style={{
                      flex: 1,
                      background: !canProceed() && currentStep !== 'complete' ? 'rgba(100,100,120,0.2)' : 'linear-gradient(135deg, rgba(0,212,255,0.5), rgba(157,0,255,0.5))',
                      border: `3px solid ${!canProceed() && currentStep !== 'complete' ? 'rgba(100,100,120,0.3)' : 'rgba(0,212,255,0.8)'}`,
                      borderRadius: '12px',
                      padding: '14px',
                      color: !canProceed() && currentStep !== 'complete' ? '#606080' : '#fff',
                      fontSize: '16px',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      cursor: !canProceed() && currentStep !== 'complete' ? 'not-allowed' : 'pointer',
                      opacity: !canProceed() && currentStep !== 'complete' ? 0.4 : 1,
                      boxShadow: !canProceed() && currentStep !== 'complete' ? 'none' : '0 0 30px rgba(0,212,255,0.5)',
                    }}
                  >
                    {isStabilizing ? 'BIRTHING...' : currentStep === 'complete' ? '🌟 BIRTH PLANET' : 'NEXT →'}
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
