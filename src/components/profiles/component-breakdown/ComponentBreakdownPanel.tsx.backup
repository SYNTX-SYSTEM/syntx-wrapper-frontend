"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PatternMolecule from './PatternMolecule';
import { getProfile } from '@/lib/api';

interface Props {
  profileId: string;
}

interface Pattern {
  term: string;
  frequency: number;
  contribution: number;
}

interface Component {
  name: string;
  score: number;
  weight: number;
  weighted: number;
  patterns: Pattern[];
  group: 'motion_cluster' | 'energy_cluster' | 'feedback_cluster' | 'precision_cluster';
}

// Map component names to cluster groups
const COMPONENT_TO_CLUSTER: Record<string, Component['group']> = {
  dynamic_patterns: 'motion_cluster',
  movement_core: 'motion_cluster',
  drift_patterns: 'motion_cluster',
  resonance_core: 'feedback_cluster',
  feedback_loops: 'feedback_cluster',
  coherence_field: 'feedback_cluster',
  energy_flow: 'energy_cluster',
  intensity_patterns: 'energy_cluster',
  precision_core: 'precision_cluster',
  accuracy_patterns: 'precision_cluster'
};

export default function ComponentBreakdownPanel({ profileId }: Props) {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);

  useEffect(() => {
    fetchComponents();
  }, [profileId]);

  const fetchComponents = async () => {
    setLoading(true);
    try {
      // Fetch profile data
      const profileData = await getProfile(profileId);
      
      // Extract components from profile
      const extractedComponents: Component[] = [];
      
      if (profileData.profile?.components) {
        Object.entries(profileData.profile.components).forEach(([componentName, componentData]: [string, any]) => {
          // Extract patterns from component
          const patterns: Pattern[] = [];
          
          if (componentData.patterns) {
            Object.entries(componentData.patterns).forEach(([patternName, patternValue]: [string, any]) => {
              // Handle different pattern structures
              let frequency = 0;
              if (typeof patternValue === 'object' && patternValue !== null) {
                frequency = Math.round((patternValue.weight || patternValue.value || 0) * 100);
              } else if (typeof patternValue === 'number') {
                frequency = Math.round(patternValue * 100);
              }
              
              patterns.push({
                term: patternName,
                frequency: frequency,
                contribution: frequency / 100
              });
            });
          }
          
          // Sort patterns by frequency
          patterns.sort((a, b) => b.frequency - a.frequency);
          
          // Determine cluster group
          const group = COMPONENT_TO_CLUSTER[componentName] || 'precision_cluster';
          
          // Calculate component score
          const score = componentData.weight || componentData.score || 0.8;
          const weight = componentData.weight || 0.5;
          
          extractedComponents.push({
            name: componentName,
            score: score,
            weight: weight,
            weighted: score * weight,
            patterns: patterns.slice(0, 8), // Max 8 patterns per component
            group: group
          });
        });
      }
      
      // If no components found, use fallback mock data
      if (extractedComponents.length === 0) {
        console.warn('No components found in profile, using mock data');
        extractedComponents.push(
          {
            name: 'dynamic_patterns',
            score: 0.82,
            weight: 0.6,
            weighted: 0.49,
            group: 'motion_cluster',
            patterns: [
              { term: 'wandert', frequency: 92, contribution: 0.92 },
              { term: 'gleitet', frequency: 88, contribution: 0.88 },
              { term: 'fließt', frequency: 76, contribution: 0.76 }
            ]
          }
        );
      }
      
      setComponents(extractedComponents);
    } catch (error) {
      console.error('Failed to fetch components:', error);
      
      // Fallback to mock data on error
      setComponents([
        {
          name: 'dynamic_patterns',
          score: 0.82,
          weight: 0.6,
          weighted: 0.49,
          group: 'motion_cluster',
          patterns: [
            { term: 'wandert', frequency: 92, contribution: 0.92 },
            { term: 'gleitet', frequency: 88, contribution: 0.88 },
            { term: 'fließt', frequency: 76, contribution: 0.76 }
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleMirror = (term: string) => {
    setSelectedPattern(term);
    console.log('🔍 Mirror:', term);
  };

  // Hexagonal grid positioning
  const getHexPosition = (index: number, total: number) => {
    const cols = Math.ceil(Math.sqrt(total));
    const row = Math.floor(index / cols);
    const col = index % cols;
    const offsetX = row % 2 === 1 ? 90 : 0;
    return {
      x: col * 180 + offsetX,
      y: row * 140
    };
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 80, paddingBottom: 80 }}>
        <motion.div
          style={{ position: 'relative' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div style={{ width: 80, height: 80, border: '4px solid rgba(6,182,212,0.2)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', inset: 0, width: 80, height: 80, border: '4px solid transparent', borderTopColor: '#06b6d4', borderRadius: '50%' }} />
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* MATRIX RAIN */}
      <div style={{ position: 'fixed', inset: 0, opacity: 0.05, pointerEvents: 'none' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: ['0%', '100%'] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 3
            }}
            style={{
              position: 'absolute',
              left: `${(i / 20) * 100}%`,
              width: 2,
              height: '20%',
              background: 'linear-gradient(to bottom, transparent, #0ea5e9, transparent)',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* COMPONENTS */}
      {components.map((component, idx) => (
        <motion.div
          key={component.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          style={{ marginBottom: 48 }}
        >
          {/* CYBER HEADER */}
          <div style={{ 
            marginBottom: 32,
            padding: 12,
            borderRadius: 8,
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(14,165,233,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="scan-line" style={{ '--scan-color': '#0ea5e9' } as React.CSSProperties} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ fontSize: 18 }}
              >
                ⚙️
              </motion.div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: 14, 
                  fontWeight: 800, 
                  color: '#0ea5e9', 
                  fontFamily: 'monospace',
                  letterSpacing: 1.5
                }}>
                  {component.name}
                </div>
                <div style={{ 
                  fontSize: 10, 
                  color: 'rgba(255,255,255,0.4)', 
                  fontFamily: 'monospace',
                  marginTop: 2
                }}>
                  WEIGHT: {(component.weight * 100).toFixed(0)}% | SCORE: {(component.score * 100).toFixed(0)}%
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: 24, fontWeight: 800, color: 'white', fontFamily: 'monospace' }}
                >
                  {(component.weighted * 100).toFixed(1)}%
                </motion.div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', letterSpacing: 1 }}>
                  WEIGHTED
                </div>
              </div>
            </div>
          </div>

          {/* HEXAGONAL GRID */}
          <div style={{ 
            position: 'relative',
            minHeight: Math.ceil(component.patterns.length / Math.ceil(Math.sqrt(component.patterns.length))) * 140 + 120,
            paddingLeft: 60,
            paddingRight: 60
          }}>
            {component.patterns.map((pattern, pIdx) => {
              const pos = getHexPosition(pIdx, component.patterns.length);
              return (
                <div
                  key={pattern.term}
                  style={{
                    position: 'absolute',
                    left: pos.x,
                    top: pos.y
                  }}
                >
                  <PatternMolecule
                    term={pattern.term}
                    frequency={pattern.frequency}
                    intensity={pattern.contribution}
                    group={component.group}
                    contribution={pattern.contribution}
                    index={pIdx}
                    onMirror={handleMirror}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* FLOATING STATS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          padding: 16,
          borderRadius: 12,
          background: 'rgba(0,0,0,0.9)',
          border: '1px solid rgba(14,165,233,0.3)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 700, letterSpacing: 1.2, color: '#0ea5e9', marginBottom: 8 }}>
          SYSTEM STATUS
        </div>
        <div style={{ fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div>
            Components: <span style={{ color: 'white', fontWeight: 700 }}>{components.length}</span>
          </div>
          <div>
            Patterns: <span style={{ color: 'white', fontWeight: 700 }}>
              {components.reduce((acc, c) => acc + c.patterns.length, 0)}
            </span>
          </div>
          {selectedPattern && (
            <div>
              Selected: <span style={{ color: '#0ea5e9', fontWeight: 700 }}>{selectedPattern}</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
