// Health
export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  last_response?: {
    response: string;
    latency_ms: number;
    timestamp: string;
  };
}

// Config
export interface ConfigResponse {
  active_wrapper: string;
  exists: boolean;
  path: string;
  source: string;
}

// Wrapper
export interface Wrapper {
  name: string;
  path: string;
  size_bytes: number;
  size_human: string;
  last_modified: string;
  is_active: boolean;
}

export interface WrapperListResponse {
  wrappers: Wrapper[];
  active_wrapper: string;
}

export interface WrapperDetailResponse {
  name: string;
  content: string;
  size_bytes: number;
  size_human: string;
  last_modified: string;
  is_active: boolean;
}

// Stats
export interface StatsResponse {
  total_requests: number;
  success_rate: number;
  average_latency_ms: number;
  median_latency_ms: number;
  min_latency_ms: number;
  max_latency_ms: number;
  wrapper_usage: Record<string, number>;
  recent_24h: {
    requests: number;
    average_latency_ms: number;
  };
}

export interface WrapperStatsResponse {
  wrapper: string;
  requests: number;
  success_rate: number;
  average_latency_ms: number;
  median_latency_ms: number;
  min_latency_ms: number;
  max_latency_ms: number;
}

// Stream
export interface StreamEvent {
  stage: string;
  timestamp: string;
  request_id: string;
  response?: string;
  latency_ms?: number;
  wrapper_chain?: string[];
  prompt?: string;
  mode?: string;
  backend_url?: string;
  params?: Record<string, unknown>;
}

export interface StreamResponse {
  events: StreamEvent[];
  total: number;
  stage_filter: string;
}

// Training
export interface TrainingRequest {
  request_id: string;
  response: string;
  latency_ms: number;
  wrapper_chain: string[];
}

export interface TrainingResponse {
  requests: TrainingRequest[];
  total: number;
  filters: {
    wrapper: string;
    success_only: boolean;
  };
}

// Chat
export interface ChatRequest {
  prompt: string;
  mode?: string;
  max_new_tokens?: number;
  temperature?: number;
  top_p?: number;
}

export interface FieldFlowStage {
  stage: string;
  timestamp: string;
  prompt?: string;
  mode?: string;
  chain?: string[];
  wrapper_text?: string;
  calibrated_field?: string;
  backend_url?: string;
  params?: Record<string, unknown>;
  response?: string;
  latency_ms?: number;
  wrapper_chain?: string[];
}

export interface ChatResponse {
  response: string;
  metadata: {
    request_id: string;
    wrapper_chain: string[];
    latency_ms: number;
  };
  field_flow: FieldFlowStage[];
}

// History
export interface HistoryResponse {
  request_id: string;
  stages: FieldFlowStage[];
  total_stages: number;
}
