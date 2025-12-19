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
  format?: string;
  language?: 'de' | 'en';
  include_terminology?: boolean;
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

// ═══════════════════════════════════════════════════════════════════════════
// 📋 FORMAT TYPES - SYNTX OUTPUT FORMATE
// ═══════════════════════════════════════════════════════════════════════════

/** Format Field - Einzelnes Feld in einem Format */
/** Format Field - Einzelnes Feld in einem Format (Backend Schema) */
export interface FormatField {
  name: string;
  weight?: number;
  description?: { de?: string; en?: string } | string;
  keywords?: { de?: string[]; en?: string[] };
  headers?: { de?: string[]; en?: string[] };
  validation?: {
    min_length?: number;
    max_length?: number;
    required?: boolean;
  };
}

/** Format - Basis-Struktur */
export interface Format {
  name: string;
  description: string;
  version: string;
  fields: FormatField[];
  template?: string;
  language: 'de' | 'en' | 'both';
  created_at: string;
  updated_at: string;
  usage_count: number;
  score?: FormatScore;
}

/** Format Score - Qualitätsbewertung */
export interface FormatScore {
  overall: number;
  field_coverage: number;
  consistency: number;
  clarity: number;
  last_scored: string;
}

/** Format List Response */
export interface FormatListResponse {
  formats: Format[];
  total: number;
  active_format?: string;
}

/** Format Detail Response */
export interface FormatDetailResponse extends Format {
  content: string;
  raw_template: string;
}

/** Format Create Request - Full */
export interface FormatCreateRequest {
  name: string;
  description: string;
  fields: FormatField[];
  template: string;
  language?: 'de' | 'en' | 'both';
  version?: string;
}

/** Format Quick Create Request */
/** Format Quick Create Request - ⚡ SCHNELL-GEBURT */
export interface FormatQuickCreateRequest {
  name: string;                      // Format-Name
  description_de: string;            // Deutsche Beschreibung
  description_en?: string;           // Englische Beschreibung (optional)
  field_names: string[];             // Array der Feldnamen
  wrapper?: string;                  // Empfohlener Wrapper (optional)
}

/** Format Update Request */
export interface FormatUpdateRequest {
  description?: string | { de?: string; en?: string };
  fields?: FormatField[];
  template?: string;
  language?: 'de' | 'en' | 'both';
  version?: string;
}

/** Format Scan Request */
/** Format Scan Request - 🔍 RESPONSE SCANNEN */
export interface FormatScanRequest {
  format: string;                    // Format-Name (nicht format_name!)
  response: string;                  // Die zu scannende Response
}

/** Format Scan Response */
/** Format Scan Response - 🔍 SCAN ERGEBNIS */
export interface FormatScanResponse {
  format: string;                    // Format-Name
  fields_expected: number;           // Erwartete Felder
  fields_found: number;              // Gefundene Felder
  missing_fields: string[];          // Fehlende Felder
  low_quality_fields: {              // Felder mit niedriger Qualität
    field: string;
    score: number;
    reasons: string[];
  }[];
  coherence_score: number;           // Kohärenz-Score (0-100)
  recommendations: string[];         // Empfehlungen
}

/** Format Clone Request */
/** Format Clone Request - 🧬 FORMAT KLONEN */
export interface FormatCloneRequest {
  source: string;                    // Quell-Format (nicht source_format!)
  target: string;                    // Ziel-Name (nicht target_name!)
  modifications?: {                  // Optionale Modifikationen
    fields?: string[];               // Nur bestimmte Felder übernehmen
    wrapper?: string;                // Anderen Wrapper setzen
    description_de?: string;         // Neue Beschreibung
  };
}

/** Format Score Request */
/** Format Score Request - 📊 FORMAT BEWERTEN */
export interface FormatScoreRequest {
  format: string;                    // Format-Name (nicht format_name!)
}

/** Format Score Response */
/** Format Score Response - 📊 BEWERTUNGS-ERGEBNIS */
export interface FormatScoreResponse {
  format: string;                    // Format-Name
  semantic_clarity: number;          // Wie sprechend sind Feldnamen? (0-100)
  redundancy: number;                // Keyword-Überlappung (0 = gut)
  field_balance: 'EXCELLENT' | 'OK' | 'CRITICAL';  // Gewichtungs-Verteilung
  i18n_score: number;                // Internationalisierung (0-100)
  risk_zones: string[];              // Felder mit Problemen
  overall: number;                   // Gesamtscore (0-100)
  meta: {
    fields_analyzed: number;         // Anzahl analysierter Felder
    languages: string[];             // Verfügbare Sprachen
  };
}

/** Format Delete Response */
export interface FormatDeleteResponse {
  status: 'success';
  message: string;
  deleted: {
    name: string;
    had_usage: boolean;
  };
}
