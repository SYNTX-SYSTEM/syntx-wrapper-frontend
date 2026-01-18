import { create } from 'zustand';
import type { SystemSnapshot, ProfileNodeState, Vector2, BindingPreview, Profile } from '@/types/profile-organ';
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
  bindingRefreshTrigger: number;
  profileBindings: Map<string, string>; // profileId -> formatName
  
  setSnapshot: (snapshot: SystemSnapshot) => void;
  updateNodePosition: (id: string, position: Vector2) => void;
  updateNodeVelocity: (id: string, velocity: Vector2) => void;
  setHover: (id: string | null) => void;
  setHoverFormat: (name: string | null) => void;
  setFocus: (id: string | null) => void;
  setDragging: (id: string | null) => void;
  setEdit: (id: string | null) => void;
  setBindingPreview: (preview: BindingPreview | null) => void;
  bindProfile: (profileId: string, formatName: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  unbindProfile: (formatName: string) => Promise<{ success: boolean; error?: string }>;
}

export const useOrganStore = create<OrganState>((set: any) => ({
  snapshot: null,
  nodes: {},
  hoverProfileId: null,
  hoverFormatName: null,
  focusProfileId: null,
  draggingProfileId: null,
  editProfileId: null,
  bindingPreview: null,
  bindingRefreshTrigger: 0,
  profileBindings: new Map(),
  
  setSnapshot: (snapshot: any) => set((state: any) => {
    const existingNodes = state.nodes;
    const newNodes: Record<string, ProfileNodeState> = {};
    
    snapshot.profiles.forEach((profile: Profile, index: number) => {
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
  
  updateNodePosition: (id, position: any) => set((state: any) => ({
    nodes: {
      ...state.nodes,
      [id]: { ...state.nodes[id], position }
    }
  })),
  
  updateNodeVelocity: (id, velocity: any) => set((state: any) => ({
    nodes: {
      ...state.nodes,
      [id]: { ...state.nodes[id], velocity }
    }
  })),
  
  setHover: (id: any) => set({ hoverProfileId: id }),
  setHoverFormat: (name: any) => set({ hoverFormatName: name }),
  setFocus: (id: any) => set({ focusProfileId: id }),
  setDragging: (id: any) => set({ draggingProfileId: id }),
  setEdit: (id: any) => set({ editProfileId: id }),
  setBindingPreview: (preview: any) => set({ bindingPreview: preview }),

  
  unbindProfile: async (formatName: any) => {
    try {
      const deleteUrl = `https://dev.syntx-system.com/mapping/formats/${formatName}/loesche-format-profil-binding`;
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        return { success: false, error: 'UNBIND FAILED' };
      }
      
      // Update store - remove binding
      const currentSnapshot = useOrganStore.getState().snapshot;
      if (currentSnapshot) {
        const newBindings = currentSnapshot.bindings.filter((b: any) => b.formatName !== formatName);
        useOrganStore.getState().setSnapshot({
          ...currentSnapshot,
          bindings: newBindings,
          timestamp: Date.now(),
        });
      }
      
      // Remove from cache
      const profile = useOrganStore.getState().snapshot?.profiles.find(p => 
        useOrganStore.getState().snapshot?.bindings.some((b: any) => 
          b.profileId === p.id && b.formatName === formatName
        )
      );
      if (profile) {
        const newBindings = new Map(useOrganStore.getState().profileBindings);
        newBindings.delete(profile.id);
        useOrganStore.setState({ profileBindings: newBindings });
        console.log('🗑️  Removed from cache:', profile.id);
      }
      
      return { success: true };
    } catch (err) {
      console.error('unbindProfile error:', err);
      return { success: false, error: 'NETWORK ERROR' };
    }
  },
  bindProfile: async (profileId, formatName: any) => {
    try {
      // 0. Check if profile already has a binding - UNBIND OLD FIRST! 🔥
      const existingSnapshot = useOrganStore.getState().snapshot;
      if (existingSnapshot) {
        const existingBinding = existingSnapshot.bindings.find(b => b.profileId === profileId);
        if (existingBinding && existingBinding.formatName !== formatName) {
          console.log('🗑️  Unbinding old format:', existingBinding.formatName);
          await useOrganStore.getState().unbindProfile(existingBinding.formatName);
        }
      }
      
      // 1. PUT - Bind it
      const putUrl = `https://dev.syntx-system.com/mapping/formats/${formatName}/kalibriere-format-profil?profile_id=${profileId}`;
      const putResponse = await fetch(putUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!putResponse.ok) {
        const errorData = await putResponse.json().catch(() => ({}));
        return { success: false, error: errorData.message || 'BINDING FAILED' };
      }

      const putData = await putResponse.json();
      
      // 2. GET - Fetch complete binding data back
      const getUrl = `https://dev.syntx-system.com/mapping/formats/${formatName}/stroeme-profil-fuer-format`;
      const getResponse = await fetch(getUrl);
      
      if (!getResponse.ok) {
        return { success: true, data: putData }; // Binding worked, but couldn't fetch details
      }
      
      const getData = await getResponse.json();
      
      // 3. Update store snapshot with new binding
      const updatedSnapshot = useOrganStore.getState().snapshot;
      if (updatedSnapshot) {
        const newBindings = [
          ...updatedSnapshot.bindings.filter((b: any) => b.formatName !== formatName),
          { profileId: profileId, formatName: formatName }
        ];
        
        useOrganStore.getState().setSnapshot({
          ...updatedSnapshot,
          bindings: newBindings,
          timestamp: Date.now(),
        });
      }
      
      // Return complete data
      // Cache binding and increment refresh trigger
      const newTrigger = useOrganStore.getState().bindingRefreshTrigger + 1;
      const newBindings = new Map(useOrganStore.getState().profileBindings);
      newBindings.set(profileId, formatName);
      
      console.log('🔄 STORE: Cached binding:', profileId, '→', formatName);
      console.log('🔄 STORE: Incrementing bindingRefreshTrigger:', useOrganStore.getState().bindingRefreshTrigger, '→', newTrigger);
      
      useOrganStore.setState({ 
        bindingRefreshTrigger: newTrigger,
        profileBindings: newBindings,
      });
      
      return { 
        success: true, 
        data: {
          put: putData,
          get: getData,
          binding: getData.binding
        }
      };
    } catch (err) {
      console.error('bindProfile error:', err);
      return { success: false, error: 'NETWORK ERROR' };
    }
  },
}));
