'use client';

import { create } from 'zustand';

interface FieldState {
  focus: 'idle' | 'scoring';
  profiles: any[];
  activeProfileIndex: number;
  activeProfile: any | null;
  energy: number;
  coherence: number;
  instability: number;
  bindings: Record<string, number>;
  
  setProfiles: (profiles: any[]) => void;
  setActiveProfileIndex: (index: number) => void;
  nextProfile: () => void;
  prevProfile: () => void;
  setFocus: (focus: 'idle' | 'scoring') => void;
  increaseEnergy: () => void;
  setCoherence: (value: number) => void;
  increaseInstability: () => void;
  resetInstability: () => void;
  updateComponentWeight: (componentName: string, delta: number) => void;
}

export const useScoringStore = create<FieldState>((set, get) => ({
  focus: 'idle',
  profiles: [],
  activeProfileIndex: 0,
  activeProfile: null,
  energy: 0,
  coherence: 0,
  instability: 0,
  bindings: {},
  
  setProfiles: (profiles) => {
    set({ profiles, activeProfile: profiles[0] || null });
  },
  
  setActiveProfileIndex: (index) => {
    const profiles = get().profiles;
    set({ 
      activeProfileIndex: index,
      activeProfile: profiles[index] || null 
    });
  },
  
  nextProfile: () => {
    const { profiles, activeProfileIndex } = get();
    const nextIndex = (activeProfileIndex + 1) % profiles.length;
    get().setActiveProfileIndex(nextIndex);
  },
  
  prevProfile: () => {
    const { profiles, activeProfileIndex } = get();
    const prevIndex = activeProfileIndex === 0 ? profiles.length - 1 : activeProfileIndex - 1;
    get().setActiveProfileIndex(prevIndex);
  },
  
  setFocus: (focus) => set({ focus }),
  increaseEnergy: () => set((state) => ({ energy: Math.min(state.energy + 0.1, 1) })),
  setCoherence: (value) => set({ coherence: value }),
  increaseInstability: () => set((state) => ({ instability: state.instability + 0.1 })),
  resetInstability: () => set({ instability: 0 }),
  
  updateComponentWeight: (componentName: string, delta: number) => {
    const { activeProfile } = get();
    if (!activeProfile) return;
    
    const components = { ...activeProfile.components };
    const componentsList = Object.entries(components);
    
    // Find component
    const targetComponent = components[componentName];
    if (!targetComponent) return;
    
    // Update weight
    const newWeight = Math.max(0, Math.min(1, targetComponent.weight + delta));
    components[componentName].weight = newWeight;
    
    // Calculate remaining weight for other components
    const otherComponents = componentsList.filter(([name]) => name !== componentName);
    const totalOtherWeight = otherComponents.reduce((sum, [_, comp]) => sum + comp.weight, 0);
    const remainingWeight = 1.0 - newWeight;
    
    // Distribute remaining weight proportionally
    otherComponents.forEach(([name, comp]) => {
      const proportion = totalOtherWeight > 0 ? comp.weight / totalOtherWeight : 1 / otherComponents.length;
      components[name].weight = remainingWeight * proportion;
    });
    
    // Update profile
    const updatedProfile = { ...activeProfile, components };
    const updatedProfiles = [...get().profiles];
    updatedProfiles[get().activeProfileIndex] = updatedProfile;
    
    set({ 
      profiles: updatedProfiles,
      activeProfile: updatedProfile 
    });
    
    // Check stability
    const sum = Object.values(components).reduce((s: number, c: any) => s + c.weight, 0);
    if (Math.abs(sum - 1.0) > 0.001) {
      get().increaseInstability();
    } else {
      get().resetInstability();
    }
  },
}));
