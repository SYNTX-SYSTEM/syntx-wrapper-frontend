'use client';

import { useEffect, useRef } from 'react';
import { useOrganStore } from '../store';

export function useProfilePhysics() {
  const nodes = useOrganStore((state: any) => state.nodes);
  const draggingProfileId = useOrganStore((state: any) => state.draggingProfileId);
  const editProfileId = useOrganStore((state: any) => state.editProfileId);
  const updateNodePosition = useOrganStore((state: any) => state.updateNodePosition);
  const updateNodeVelocity = useOrganStore((state: any) => state.updateNodeVelocity);

  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const breathe = () => {
      Object.values(nodes).forEach((node: any) => {
        if (draggingProfileId === node.id || editProfileId === node.id) return;

        const drift = {
          x: (Math.random() - 0.5) * 0.4,
          y: (Math.random() - 0.5) * 0.4,
        };

        const newVelocity = {
          x: node.velocity.x * 0.95 + drift.x,
          y: node.velocity.y * 0.95 + drift.y,
        };

        const newPosition = {
          x: node.position.x + newVelocity.x,
          y: node.position.y + newVelocity.y,
        };

        updateNodeVelocity(node.id, newVelocity);
        updateNodePosition(node.id, newPosition);
      });

      animationRef.current = requestAnimationFrame(breathe);
    };

    animationRef.current = requestAnimationFrame(breathe);
    return () => {
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes, draggingProfileId, editProfileId, updateNodePosition, updateNodeVelocity]);
}
