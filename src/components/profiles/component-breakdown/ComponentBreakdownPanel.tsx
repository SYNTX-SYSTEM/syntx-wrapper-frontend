"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PatternMolecule from './PatternMolecule';
import { getProfileComponentBreakdown } from '@/lib/api-profiles';

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
  weight: number;
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
      // USE COMPONENT BREAKDOWN ENDPOINT
      const data = await getProfileComponentBreakdown(profileId);
      
      const extractedComponents: Component[] = [];
      
      if (data.components) {
        data.components.forEach((comp: any) => {
          const patterns: Pattern[] = [];
          
          if (comp.patterns) {
            comp.patterns.forEach((pat: any) => {
              patterns.push({
                term: pat.pattern,
                frequency: Math.round(pat.score), // Already percentage from backend
                contribution: pat.match_count || 0
              });
            });
          }
          
          const group = COMPONENT_TO_CLUSTER[comp.name] || 'precision_cluster';
          
          extractedComponents.push({
            name: comp.name,
            weight: comp.weight || 1.0,
            patterns: patterns,
            group: group
          });
        });
      }
      
      setComponents(extractedComponents);
    } catch (error) {
      console.error('Failed to fetch components:', error);
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
                  WEIGHT: {(component.weight * 100).toFixed(0)}% | PATTERNS: {component.patterns.length}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: 24, fontWeight: 800, color: 'white', fontFamily: 'monospace' }}
                >
{component.patterns.filter(p => p.frequency > 0).length}
                </motion.div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', letterSpacing: 1 }}>
                  ACTIVE
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
