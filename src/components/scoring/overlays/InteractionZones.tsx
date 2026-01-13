'use client';

import { useScoringStore } from '../store';
import { zwischenraumGrenzen } from '../utils/stroeme';
import { useRef } from 'react';

interface InteractionZonesProps {
  components: Record<string, any>;
}

export default function InteractionZones({ components }: InteractionZonesProps) {
  const updateComponentWeight = useScoringStore((state) => state.updateComponentWeight);
  const componentsList = Object.entries(components);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clickCountRef = useRef(0);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    clickCountRef.current += 1;
    
    // Warte 300ms ob Double-Click kommt
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    clickTimeoutRef.current = setTimeout(() => {
      if (clickCountRef.current === 1) {
        // SINGLE CLICK → Ring wächst
        processClick(e, 0.01);
      } else if (clickCountRef.current === 2) {
        // DOUBLE CLICK → Ring schrumpft
        processClick(e, -0.01);
      }
      clickCountRef.current = 0;
    }, 300);
  };
  
  const processClick = (e: React.MouseEvent, delta: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    const dx = clickX - centerX;
    const dy = clickY - centerY;
    const distanz = Math.sqrt(dx * dx + dy * dy);
    
    componentsList.forEach(([name], idx) => {
      const grenzen = zwischenraumGrenzen(idx, componentsList);
      
      if (distanz >= grenzen.innen && distanz <= grenzen.aussen) {
        updateComponentWeight(name, delta);
      }
    });
  };
  
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    // Äußerster Ring = letzter in Liste
    const aeusstesterRing = componentsList[componentsList.length - 1];
    if (!aeusstesterRing) return;
    
    const [name] = aeusstesterRing;
    
    // Scroll UP → Ring wächst
    // Scroll DOWN → Ring schrumpft
    const delta = e.deltaY < 0 ? 0.01 : -0.01;
    updateComponentWeight(name, delta);
  };
  
  return (
    <div
      onClick={handleClick}
      onWheel={handleWheel}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 105,
        cursor: 'pointer',
      }}
    />
  );
}
