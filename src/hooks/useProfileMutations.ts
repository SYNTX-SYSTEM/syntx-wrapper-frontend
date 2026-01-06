// ═══════════════════════════════════════════════════════════════════════════
// 🔄 PROFILE MUTATIONS HOOK - System Truth Layer
// ═══════════════════════════════════════════════════════════════════════════

import { useState } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';

export interface ProfileFormData {
  name: string;
  label: string;
  description: string;
  active: boolean;
  weight: number;
  tags?: string[];
  patterns?: string[];
  strategy?: string;
  components?: Record<string, any>;
}

interface MutationState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useProfileMutations() {
  const [state, setState] = useState<MutationState>({
    loading: false,
    error: null,
    success: false
  });

  const createProfile = async (data: ProfileFormData) => {
    setState({ loading: true, error: null, success: false });
    
    try {
      const response = await fetch(`${BASE_URL}/resonanz/profiles/crud`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP ${response.status}`);
      }
      
      const result = await response.json();
      setState({ loading: false, error: null, success: true });
      return result;
    } catch (error: any) {
      setState({ loading: false, error: error.message, success: false });
      throw error;
    }
  };

  const updateProfile = async (id: string, data: ProfileFormData) => {
    setState({ loading: true, error: null, success: false });
    
    try {
      const response = await fetch(`${BASE_URL}/resonanz/profiles/crud/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP ${response.status}`);
      }
      
      const result = await response.json();
      setState({ loading: false, error: null, success: true });
      return result;
    } catch (error: any) {
      setState({ loading: false, error: error.message, success: false });
      throw error;
    }
  };

  const deleteProfile = async (id: string) => {
    setState({ loading: true, error: null, success: false });
    
    try {
      const response = await fetch(`${BASE_URL}/resonanz/profiles/crud/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP ${response.status}`);
      }
      
      setState({ loading: false, error: null, success: true });
      return true;
    } catch (error: any) {
      setState({ loading: false, error: error.message, success: false });
      throw error;
    }
  };

  return {
    createProfile,
    updateProfile,
    deleteProfile,
    loading: state.loading,
    error: state.error,
    success: state.success,
    resetState: () => setState({ loading: false, error: null, success: false })
  };
}
