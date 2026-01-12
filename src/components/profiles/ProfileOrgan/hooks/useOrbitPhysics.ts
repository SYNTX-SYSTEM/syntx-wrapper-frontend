'use client';

import { useEffect, useRef } from 'react';
import { useOrganStore } from '../store';

export function useOrbitPhysics() {
  const nodes = useOrganStore((state) => state.nodes);
  const draggingProfileId = useOrganStore((state) => state.draggingProfileId);
  const editProfileId = useOrganStore((state) => state.editProfileId);
  const updateNodePosition = useOrganStore((state) => state.updateNodePosition);

  const angleRef = useRef<Record<string, number>>({});
  const animationRef = useRef<number | undefined>(undefined);
  const wasDraggingRef = useRef<string | null>(null);

  useEffect(() => {
    Object.keys(nodes).forEach((id, i) => {
      if (!angleRef.current[id]) {
        angleRef.current[id] = (i / Object.keys(nodes).length) * Math.PI * 2;
      }
    });

    const orbit = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const h = typeof window !== 'undefined' ? window.innerHeight : 800;
      const centerX = w / 2;
      const centerY = h / 2;
      const orbitRadius = Math.min(w, h) * 0.3;

      Object.values(nodes).forEach((node) => {
        if (draggingProfileId === node.id || editProfileId === node.id) {
          wasDraggingRef.current = node.id;
          return;
        }

        // SNAP BACK TO ORBIT AFTER DRAG
        if (wasDraggingRef.current === node.id) {
          const dx = node.position.x - centerX;
          const dy = node.position.y - centerY;
          angleRef.current[node.id] = Math.atan2(dy, dx);
          wasDraggingRef.current = null;
        }

        angleRef.current[node.id] += 0.0008;

        const newX = centerX + Math.cos(angleRef.current[node.id]) * orbitRadius;
        const newY = centerY + Math.sin(angleRef.current[node.id]) * orbitRadius;

        updateNodePosition(node.id, { x: newX, y: newY });
      });

      animationRef.current = requestAnimationFrame(orbit);
    };

    animationRef.current = requestAnimationFrame(orbit);

    return () => {
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes, draggingProfileId, editProfileId, updateNodePosition]);
}
