import { create } from 'zustand';
import type { SystemSnapshot, ProfileNodeState, Vector2, BindingPreview } from '@/types/profile-organ';

export const PREVIEW_THRESHOLD = 150;
export const COMMIT_THRESHOLD = 100;

interface OrganState {
  snapshot: SystemSnapshot | null;
  nodes: Record<string, ProfileNodeState>;
  hoverProfileId: string | null;
  hoverFormatName: string | null;
  focusProfileId: string | null;
  draggingProfileId: string | null;
  editProfileId: string | null;
  bindingPreview: BindingPreview | null;
  
  setSnapshot: (snapshot: SystemSnapshot) => void;
  updateNodePosition: (id: string, position: Vector2) => void;
  updateNodeVelocity: (id: string, velocity: Vector2) => void;
  setHover: (id: string | null) => void;
  setHoverFormat: (name: string | null) => void;
  setFocus: (id: string | null) => void;
  setDragging: (id: string | null) => void;
  setEdit: (id: string | null) => void;
  setBindingPreview: (preview: BindingPreview | null) => void;
}

export const useOrganStore = create<OrganState>((set) => ({
  snapshot: null,
  nodes: {},
  hoverProfileId: null,
  hoverFormatName: null,
  focusProfileId: null,
  draggingProfileId: null,
  editProfileId: null,
  bindingPreview: null,
  
  setSnapshot: (snapshot) => set((state) => {
    const existingNodes = state.nodes;
    const newNodes: Record<string, ProfileNodeState> = {};
    
    snapshot.profiles.forEach((profile, index) => {
      if (existingNodes[profile.id]) {
        newNodes[profile.id] = existingNodes[profile.id];
      } else {
        const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const h = typeof window !== 'undefined' ? window.innerHeight : 800;
        const angle = (index / snapshot.profiles.length) * Math.PI * 2;
        const radius = Math.min(w, h) * 0.3;
        
        newNodes[profile.id] = {
          id: profile.id,
          position: {
            x: w / 2 + Math.cos(angle) * radius,
            y: h / 2 + Math.sin(angle) * radius,
          },
          velocity: { x: 0, y: 0 },
          radius: 40,
          pulsePhase: Math.random() * Math.PI * 2,
        };
      }
    });
    
    return { snapshot, nodes: newNodes };
  }),
  
  updateNodePosition: (id, position) => set((state) => ({
    nodes: {
      ...state.nodes,
      [id]: { ...state.nodes[id], position }
    }
  })),
  
  updateNodeVelocity: (id, velocity) => set((state) => ({
    nodes: {
      ...state.nodes,
      [id]: { ...state.nodes[id], velocity }
    }
  })),
  
  setHover: (id) => set({ hoverProfileId: id }),
  setHoverFormat: (name) => set({ hoverFormatName: name }),
  setFocus: (id) => set({ focusProfileId: id }),
  setDragging: (id) => set({ draggingProfileId: id }),
  setEdit: (id) => set({ editProfileId: id }),
  setBindingPreview: (preview) => set({ bindingPreview: preview }),
}));
