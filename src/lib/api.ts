const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';

class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new APIError(res.status, `API Error: ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  // 1. Health
  getHealth: () => fetchAPI<import('@/types/api').HealthResponse>('/resonanz/health'),

  // 2. Config - GET
  getConfig: () => fetchAPI<import('@/types/api').ConfigResponse>('/resonanz/config/default-wrapper'),

  // 3. Config - PUT
  setConfig: (wrapperName: string) =>
    fetchAPI<import('@/types/api').ConfigResponse>(
      `/resonanz/config/default-wrapper?wrapper_name=${wrapperName}`,
      { method: 'PUT' }
    ),

  // 4. Wrappers - List
  getWrappers: () => fetchAPI<import('@/types/api').WrapperListResponse>('/resonanz/wrappers'),

  // 5. Wrappers - Active Only
  getActiveWrapper: () =>
    fetchAPI<import('@/types/api').WrapperListResponse>('/resonanz/wrappers?active=true'),

  // 6. Wrapper - Detail
  getWrapper: (name: string) =>
    fetchAPI<import('@/types/api').WrapperDetailResponse>(`/resonanz/wrapper/${name}`),

  // 7. Wrapper - Activate
  activateWrapper: (name: string) =>
    fetchAPI<{ status: string; message: string; active_wrapper: string }>(
      `/resonanz/wrappers/${name}/activate`,
      { method: 'POST' }
    ),

  // 8. Wrapper - Upload
  uploadWrapper: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/resonanz/upload`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },

  // 9. Wrapper - Upload with Metadata
  uploadWrapperMeta: async (file: File, meta: { description?: string; author?: string; version?: string; tags?: string }) => {
    const formData = new FormData();
    formData.append('file', file);
    if (meta.description) formData.append('description', meta.description);
    if (meta.author) formData.append('author', meta.author);
    if (meta.version) formData.append('version', meta.version);
    if (meta.tags) formData.append('tags', meta.tags);
    const res = await fetch(`${API_BASE}/resonanz/upload-metadata`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },

  // 10. Stream
  getStream: (limit = 20, stage = 'all') =>
    fetchAPI<import('@/types/api').StreamResponse>(`/resonanz/strom?limit=${limit}&stage=${stage}`),

  // 11. Training Data
  getTraining: (limit = 100, wrapper = 'all', successOnly = false) =>
    fetchAPI<import('@/types/api').TrainingResponse>(
      `/resonanz/training?limit=${limit}&wrapper=${wrapper}&success_only=${successOnly}`
    ),

  // 12. Stats
  getStats: () => fetchAPI<import('@/types/api').StatsResponse>('/resonanz/stats'),

  // 13. Wrapper Stats
  getWrapperStats: (name: string) =>
    fetchAPI<import('@/types/api').WrapperStatsResponse>(`/resonanz/stats/wrapper/${name}`),

  // 14. Chat
  chat: (request: import('@/types/api').ChatRequest) =>
    fetchAPI<import('@/types/api').ChatResponse>('/resonanz/chat', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  // 15. History
  getHistory: (requestId: string) =>
    fetchAPI<import('@/types/api').HistoryResponse>(`/resonanz/history/${requestId}`),
};

export { APIError };
