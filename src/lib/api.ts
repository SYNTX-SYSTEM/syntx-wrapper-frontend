// ═══════════════════════════════════════════════════════════════
// SYNTX API CLIENT - Alle 16 Endpoints
// Base URL: https://dev.syntx-system.com
// ═══════════════════════════════════════════════════════════════

const BASE_URL = 'https://dev.syntx-system.com';

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

export interface HealthResponse {
  status: 'healthy' | 'unhealthy';
  version: string;
  timestamp: string;
}

export interface ConfigResponse {
  default_wrapper: string;
}

export interface Wrapper {
  name: string;
  size: number;
  size_human: string;
  last_modified: string;
  is_active: boolean;
}

export interface WrapperListResponse {
  wrappers: Wrapper[];
  count: number;
  active_wrapper: string;
}

export interface WrapperDetailResponse {
  name: string;
  content: string;
  size: number;
  last_modified: string;
  is_active: boolean;
}

export interface ActivateResponse {
  success: boolean;
  message: string;
  active_wrapper: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  wrapper_name: string;
  size: number;
}

export interface StreamEvent {
  stage: string;
  timestamp: string;
  request_id: string;
  latency_ms?: number;
  [key: string]: any;
}

export interface StreamResponse {
  events: StreamEvent[];
  count: number;
}

export interface TrainingEntry {
  timestamp: string;
  request_id: string;
  prompt: string;
  response: string;
  mode: string;
  wrapper_chain: string[];
  latency_ms: number;
  success: boolean;
}

export interface TrainingResponse {
  entries: TrainingEntry[];
  count: number;
  total: number;
}

export interface StatsResponse {
  total_requests: number;
  success_rate: number;
  average_latency_ms: number;
  median_latency_ms: number;
  wrapper_usage: Record<string, number>;
}

export interface WrapperStatsResponse {
  wrapper_name: string;
  total_requests: number;
  success_rate: number;
  average_latency_ms: number;
  median_latency_ms: number;
}

export interface ChatRequest {
  prompt: string;
  mode?: string;
  include_init?: boolean;
  max_new_tokens?: number;
}

export interface ChatResponse {
  response: string;
  metadata: {
    request_id: string;
    wrapper_chain: string[];
    latency_ms: number;
  };
  field_flow?: StreamEvent[];
}

export interface HistoryResponse {
  request_id: string;
  prompt: string;
  response: string;
  mode: string;
  wrapper_chain: string[];
  latency_ms: number;
  timestamp: string;
  field_flow: StreamEvent[];
}

// ═══════════════════════════════════════════════════════════════
// API ERROR
// ═══════════════════════════════════════════════════════════════

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

// ═══════════════════════════════════════════════════════════════
// FETCH HELPER
// ═══════════════════════════════════════════════════════════════

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new APIError(response.status, `API Error: ${response.statusText}`);
  }

  return response.json();
}

// ═══════════════════════════════════════════════════════════════
// API METHODS - Alle 16 Endpoints
// ═══════════════════════════════════════════════════════════════

export const api = {
  // ─────────────────────────────────────────────────────────────
  // HEALTH & CONFIG
  // ─────────────────────────────────────────────────────────────
  
  /** GET /resonanz/health - System Health Check */
  getHealth: () => 
    fetchAPI<HealthResponse>('/resonanz/health'),

  /** GET /resonanz/config/default-wrapper - Get default wrapper */
  getConfig: () => 
    fetchAPI<ConfigResponse>('/resonanz/config/default-wrapper'),

  /** PUT /resonanz/config/default-wrapper - Set default wrapper */
  setConfig: (wrapperName: string) => 
    fetchAPI<ConfigResponse>('/resonanz/config/default-wrapper', {
      method: 'PUT',
      body: JSON.stringify({ default_wrapper: wrapperName }),
    }),

  // ─────────────────────────────────────────────────────────────
  // WRAPPERS
  // ─────────────────────────────────────────────────────────────
  
  /** GET /resonanz/wrappers - List all wrappers */
  getWrappers: () => 
    fetchAPI<WrapperListResponse>('/resonanz/wrappers'),

  /** GET /resonanz/wrappers?active=true - Get active wrapper */
  getActiveWrapper: () => 
    fetchAPI<WrapperListResponse>('/resonanz/wrappers?active=true'),

  /** GET /resonanz/wrapper/{name} - Get wrapper details */
  getWrapper: (name: string) => 
    fetchAPI<WrapperDetailResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}`),

  /** POST /resonanz/wrappers/{name}/activate - Activate wrapper */
  activateWrapper: (name: string) => 
    fetchAPI<ActivateResponse>(`/resonanz/wrappers/${encodeURIComponent(name)}/activate`, {
      method: 'POST',
    }),

  /** POST /resonanz/upload - Upload new wrapper */
  uploadWrapper: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${BASE_URL}/resonanz/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new APIError(response.status, `Upload failed: ${response.statusText}`);
    }
    
    return response.json();
  },

  /** POST /resonanz/upload-metadata - Upload wrapper with metadata */
  uploadWrapperMeta: async (
    file: File, 
    metadata: { name?: string; frequency?: string; description?: string }
  ): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));
    
    const response = await fetch(`${BASE_URL}/resonanz/upload-metadata`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new APIError(response.status, `Upload failed: ${response.statusText}`);
    }
    
    return response.json();
  },

  // ─────────────────────────────────────────────────────────────
  // STROM & ANALYTICS
  // ─────────────────────────────────────────────────────────────
  
  /** GET /resonanz/strom - Get field flow events */
  getStream: (limit: number = 10, stage?: string) => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (stage) params.append('stage', stage);
    return fetchAPI<StreamResponse>(`/resonanz/strom?${params}`);
  },

  /** GET /resonanz/training - Get training data */
  getTraining: (limit: number = 50, wrapper?: string, successOnly?: boolean) => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (wrapper) params.append('wrapper', wrapper);
    if (successOnly !== undefined) params.append('success_only', successOnly.toString());
    return fetchAPI<TrainingResponse>(`/resonanz/training?${params}`);
  },

  /** GET /resonanz/stats - Get system statistics */
  getStats: () => 
    fetchAPI<StatsResponse>('/resonanz/stats'),

  /** GET /resonanz/stats/wrapper/{name} - Get stats for specific wrapper */
  getWrapperStats: (name: string) => 
    fetchAPI<WrapperStatsResponse>(`/resonanz/stats/wrapper/${encodeURIComponent(name)}`),

  // ─────────────────────────────────────────────────────────────
  // CHAT & HISTORY
  // ─────────────────────────────────────────────────────────────
  
  /** POST /resonanz/chat - Send chat request */
  chat: (request: ChatRequest) => 
    fetchAPI<ChatResponse>('/resonanz/chat', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  /** GET /resonanz/history/{request_id} - Get request history */
  getHistory: (requestId: string) => 
    fetchAPI<HistoryResponse>(`/resonanz/history/${encodeURIComponent(requestId)}`),
};

export default api;
