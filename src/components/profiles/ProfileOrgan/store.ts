import { create } from 'zustand';
import { SystemSnapshot, ProfileNodeState, BindingPreview, Vector2 } from '@/types/profile-organ';

interface OrganState {
  snapshot: SystemSnapshot | null;
  nodes: Record<string, ProfileNodeState>;
  initialized: boolean;
  hoverProfileId: string | null;
  focusProfileId: string | null;
  draggingProfileId: string | null;
  editProfileId: string | null;
  bindingPreview: BindingPreview | null;
  dirty: boolean;
  setSnapshot: (s: SystemSnapshot) => void;
  setHover: (id: string | null) => void;
  setFocus: (id: string | null) => void;
  setDragging: (id: string | null) => void;
  setEdit: (id: string | null) => void;
  setBindingPreview: (preview: BindingPreview | null) => void;
  updateNodePosition: (id: string, position: Vector2) => void;
  updateNodeVelocity: (id: string, velocity: Vector2) => void;
  markDirty: () => void;
  stabilize: () => void;
}

const PREVIEW_THRESHOLD = 150;
const COMMIT_THRESHOLD = 80;

export const useOrganStore = create<OrganState>((set) => ({
  snapshot: null,
  nodes: {},
  initialized: false,
  hoverProfileId: null,
  focusProfileId: null,
  draggingProfileId: null,
  editProfileId: null,
  bindingPreview: null,
  dirty: false,
  setSnapshot: (snapshot) => {
    set((state) => {
      if (state.initialized) return { snapshot };
      const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const h = typeof window !== 'undefined' ? window.innerHeight : 800;
      const centerX = w / 2;
      const centerY = h / 2;
      const radius = Math.min(w, h) * 0.25;
      return {
        snapshot,
        initialized: true,
        nodes: Object.fromEntries(
          snapshot.profiles.map((p, i) => {
            const angle = (i / snapshot.profiles.length) * Math.PI * 2;
            return [
              p.id,
              {
                id: p.id,
                position: { x: centerX + Math.cos(angle) * radius, y: centerY + Math.sin(angle) * radius },
                velocity: { x: 0, y: 0 },
                radius: 25 + p.weight * 0.3,
                pulsePhase: Math.random() * Math.PI * 2,
              },
            ];
          })
        ),
      };
    });
  },
  setHover: (id) => set({ hoverProfileId: id }),
  setFocus: (id) => set({ focusProfileId: id }),
  setDragging: (id) => set({ draggingProfileId: id }),
  setEdit: (id) => set({ editProfileId: id }),
  setBindingPreview: (preview) => set({ bindingPreview: preview }),
  updateNodePosition: (id, position) => set((state) => ({ nodes: { ...state.nodes, [id]: { ...state.nodes[id], position } } })),
  updateNodeVelocity: (id, velocity) => set((state) => ({ nodes: { ...state.nodes, [id]: { ...state.nodes[id], velocity } } })),
  markDirty: () => set({ dirty: true }),
  stabilize: () => set({ dirty: false }),
}));

export { PREVIEW_THRESHOLD, COMMIT_THRESHOLD };
