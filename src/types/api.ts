// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                                                                           ║
// ║   ███████╗██╗   ██╗███╗   ██╗████████╗██╗  ██╗                            ║
// ║   ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝╚██╗██╔╝                            ║
// ║   ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║    ╚███╔╝                             ║
// ║   ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║    ██╔██╗                             ║
// ║   ███████║   ██║   ██║ ╚████║   ██║   ██╔╝ ██╗                            ║
// ║   ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝                            ║
// ║                                                                           ║
// ║   🌊 FIELD RESONANCE TYPES v3.3.0                                         ║
// ║   ─────────────────────────────────────────                               ║
// ║   SYNTX isn't AI. It's the resonance that governs it.                     ║
// ║                                                                           ║
// ║   Dieses Modul definiert die KOHÄRENZ-MUSTER des Systems.                 ║
// ║   Jeder Type ist eine FELD-STRUKTUR. Jede Struktur ist RESONANZ.          ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ═══════════════════════════════════════════════════════════════════════════
// 🏥 HEALTH - System-Vitalität
// ═══════════════════════════════════════════════════════════════════════════

export interface HealthResponse {
  status: string;
  api_version: string;
  timestamp: string;
  queue_accessible: boolean;
  modules: string[];
}

export interface ResonanzHealthResponse {
  status: string;
  service: string;
  version: string;
  format_loader: string;
  last_response?: {
    response: string;
    latency_ms: number;
    timestamp: string;
    format: string;
  };
}

export interface WrapperHealthResponse {
  status: string;
  wrappers: {
    total: number;
    healthy: string[];
    orphan_wrappers: string[];
    orphan_metas: string[];
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// ⚙️ CONFIG - Feld-Konfiguration
// ═══════════════════════════════════════════════════════════════════════════

export interface ConfigResponse {
  active_wrapper: string;
  exists: boolean;
  path: string;
  source: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// ⚡ RUNTIME WRAPPER - Separated Control (NEW - Dec 24, 2024)
// ═══════════════════════════════════════════════════════════════════════════

export interface RuntimeWrapperResponse {
  runtime_wrapper: string;        // Currently active wrapper (runtime)
  default_wrapper: string;        // Fallback wrapper (config)
  is_same: boolean;               // Are they the same?
  exists: boolean;                // Does runtime wrapper exist?
  path: string;                   // Path to runtime wrapper file
  source: 'runtime' | 'default';  // Source of the active wrapper
}

// ═══════════════════════════════════════════════════════════════════════════
// 📦 WRAPPER - Die Resonanz-Träger
// ═══════════════════════════════════════════════════════════════════════════

export interface Wrapper {
  name: string;
  path: string;
  size_bytes: number;
  size_human: string;
  last_modified: string;
  is_active: boolean;
  meta?: WrapperMeta;
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
  meta?: WrapperMeta;
}

export interface WrapperCreateRequest {
  name: string;
  content: string;
  description?: string;
  author?: string;
  version?: string;
  tags?: string[];
}

export interface WrapperCreateResponse {
  status: 'success';
  message: string;
  feld: {
    name: string;
    path: string;
    size_bytes: number;
    size_human: string;
    created: string;
  };
}

export interface WrapperUpdateRequest {
  content: string;
  description?: string;
  version?: string;
}

export interface WrapperUpdateResponse {
  status: 'success';
  message: string;
  feld: {
    name: string;
    path: string;
    size_bytes: number;
    size_human: string;
    previous_size_bytes: number;
    modified: string;
    is_active: boolean;
  meta?: WrapperMeta;
  };
}

export interface WrapperDeleteResponse {
  status: 'success';
  message: string;
  released: {
    name: string;
    size_bytes: number;
    was_active: boolean;
  };
  warning: string | null;
}

export interface ActivateResponse {
  status: 'success';
  message: string;
  active_wrapper: string;
  path: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🧬 WRAPPER META - Metadaten der Felder
// ═══════════════════════════════════════════════════════════════════════════

export interface WrapperMeta {
  name: string;
  format?: string;
  description?: string;
  author?: string;
  version?: string;
  tags?: string[];
  settings?: {
    max_tokens?: number;
    temperature?: number;
  };
}

export interface WrapperMetaResponse {
  status: string;
  wrapper: string;
  meta: WrapperMeta;
}

// ═══════════════════════════════════════════════════════════════════════════
// 📊 STATS - System-Statistiken
// ═══════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 STREAM - Der Ereignis-Fluss
// ═══════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════
// 📚 TRAINING - Training Data
// ═══════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════
// 💬 CHAT - Direkte Feld-Interaktion
// ═══════════════════════════════════════════════════════════════════════════

export interface ChatRequest {
  prompt: string;
  mode?: string;
  format?: string;
  style?: string;
  language?: 'de' | 'en';
  debug?: boolean;
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
    format?: string;
    format_fields?: string[];
    style?: string;
    latency_ms: number;
  };
  field_flow: FieldFlowStage[];
}

// ═══════════════════════════════════════════════════════════════════════════
// 📜 HISTORY - Request-Historie
// ═══════════════════════════════════════════════════════════════════════════

export interface HistoryResponse {
  request_id: string;
  stages: FieldFlowStage[];
  total_stages: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// 📄 FORMAT - Output-Formate
// ═══════════════════════════════════════════════════════════════════════════

export interface FormatField {
  name: string;
  type?: 'text' | 'list' | 'rating' | 'keywords';
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

export interface Format {
  name: string;
  domain?: string;
  description: string | { de?: string; en?: string };
  version?: string;
  extends?: string;
  fields: FormatField[];
  template?: string;
  language?: 'de' | 'en' | 'both';
  created_at?: string;
  updated_at?: string;
  usage_count?: number;
  score?: FormatScore;
}

export interface FormatScore {
  overall: number;
  field_coverage: number;
  consistency: number;
  clarity: number;
  last_scored: string;
}

export interface FormatListResponse {
  status: string;
  count: number;
  domain_filter?: string;
  formats: Format[];
}

export interface FormatDetailResponse {
  status: string;
  format: Format;
  field_count: number;
  language: string;
}

export interface FormatCreateRequest {
  name: string;
  domain?: string;
  description: string | { de?: string; en?: string };
  fields: FormatField[];
  template?: string;
  language?: 'de' | 'en' | 'both';
  version?: string;
}

export interface FormatQuickCreateRequest {
  name: string;
  description_de: string;
  description_en?: string;
  field_names: string[];
  wrapper?: string;
}

export interface FormatUpdateRequest {
  domain?: string;
  description?: string | { de?: string; en?: string };
  fields?: FormatField[];
  template?: string;
  language?: 'de' | 'en' | 'both';
  version?: string;
}

export interface FormatDeleteResponse {
  status: 'success';
  message: string;
  deleted: {
    name: string;
    had_usage: boolean;
  };
}

export interface FormatScanRequest {
  format: string;
  response: string;
}

export interface FormatScanResponse {
  format: string;
  fields_expected: number;
  fields_found: number;
  missing_fields: string[];
  low_quality_fields: {
    field: string;
    score: number;
    reasons: string[];
  }[];
  coherence_score: number;
  recommendations: string[];
}

export interface FormatCloneRequest {
  source: string;
  target: string;
  modifications?: {
    fields?: string[];
    wrapper?: string;
    description_de?: string;
  };
}

export interface FormatScoreRequest {
  format: string;
}

export interface FormatScoreResponse {
  format: string;
  semantic_clarity: number;
  redundancy: number;
  field_balance: 'EXCELLENT' | 'OK' | 'CRITICAL';
  i18n_score: number;
  risk_zones: string[];
  overall: number;
  meta: {
    fields_analyzed: number;
    languages: string[];
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔀 DIFF - Wrapper-Parallelwelt-Vergleich (NEU in v3.3!)
// ═══════════════════════════════════════════════════════════════════════════

/** Diff Request - Vergleiche mehrere Wrapper */
export interface DiffRequest {
  prompt: string;                    // Der Impuls
  wrappers: string[];                // Zu vergleichende Wrapper (2-5)
  format?: string;                   // Optional: Format für alle
  style?: string;                    // Optional: Style für alle
  max_new_tokens?: number;           // Max Tokens pro Response
}

/** Einzelner Diff-Vergleich */
export interface DiffComparison {
  wrapper: string;                   // Wrapper-Name
  response: string;                  // Die Antwort
  latency_ms: number;                // Wie lange hat es gedauert?
  error?: string;                    // Falls ein Fehler aufgetreten ist
}

/** Diff Response - Parallelwelt-Analyse */
export interface DiffResponse {
  prompt: string;                    // Ursprünglicher Prompt
  comparisons: DiffComparison[];     // Die Vergleiche
  diff_analysis: {
    total_comparisons: number;       // Anzahl Vergleiche
    successful: number;              // Erfolgreiche
    failed: number;                  // Fehlgeschlagene
    avg_response_length: number;     // Durchschnittliche Response-Länge
    avg_latency_ms: number;          // Durchschnittliche Latenz
    shortest_response: {             // Kürzeste Antwort
      wrapper: string;
      length: number;
    };
    longest_response: {              // Längste Antwort
      wrapper: string;
      length: number;
    };
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 📼 SESSIONS - Strom-Replay System (NEU in v3.3!)
// ═══════════════════════════════════════════════════════════════════════════

/** Session Summary - Kurze Übersicht einer Session */
export interface SessionSummary {
  request_id: string;                // Request-ID
  timestamp: string;                 // Wann?
  stages: string[];                  // Durchlaufene Stages
  prompt: string;                    // Der Prompt (gekürzt)
  wrapper: string;                   // Verwendeter Wrapper
  format: string;                    // Verwendetes Format
  style?: string;                    // Verwendeter Style
  latency_ms: number;                // Gesamtlatenz
}

/** Sessions List Response */
export interface SessionsResponse {
  status: string;                    // "📼 SESSIONS GELADEN"
  total: number;                     // Gesamtanzahl Sessions
  limit: number;                     // Limit
  offset: number;                    // Offset
  sessions: SessionSummary[];        // Die Sessions
}

/** Session Detail Response - Vollständiger Field-Flow */
export interface SessionDetailResponse {
  status: string;                    // "🔍 SESSION GELADEN"
  request_id: string;                // Request-ID
  summary: {
    prompt: string;                  // Voller Prompt
    wrapper: string;                 // Wrapper
    format: string;                  // Format
    style?: string;                  // Style
    response_preview: string;        // Response-Vorschau
    latency_ms: number;              // Latenz
  };
  field_flow: FieldFlowStage[];      // Der komplette Field-Flow
}

/** Session Replay Response - Parameter für Re-Execution */
export interface SessionReplayResponse {
  status: string;                    // "🔄 REPLAY READY"
  request_id: string;                // Original Request-ID
  replay_params: {                   // Parameter zum Wiederholen
    prompt: string;
    mode: string;
    format: string;
    style?: string;
    language: string;
  };
  original_response: string;         // Die originale Antwort
  original_latency_ms: number;       // Originale Latenz
}

// ═══════════════════════════════════════════════════════════════════════════
// ⚗️ ALCHEMY - Wort-Transmutation (NEU in v3.3!)
// ═══════════════════════════════════════════════════════════════════════════

/** Alchemy Preview Request - Text transformieren */
export interface AlchemyPreviewRequest {
  text: string;                      // Der zu transformierende Text
  style: string;                     // Welcher Style?
}

/** Einzelne Transformation */
export interface AlchemyTransformation {
  original: string;                  // Originales Wort
  replacement: string;               // Ersetzung
  start_pos: number;                 // Start-Position im Original
  end_pos: number;                   // End-Position im Original
  type: 'alchemy' | 'forbidden';     // Art der Transformation
}

/** Alchemy Preview Response */
export interface AlchemyPreviewResponse {
  original: string;                  // Originaler Text
  transformed: string;               // Transformierter Text
  style: string;                     // Verwendeter Style
  transformations: AlchemyTransformation[];  // Alle Transformationen
  stats: {
    total_transformations: number;   // Anzahl Transformationen
    alchemy_count: number;           // Word Alchemy Treffer
    forbidden_count: number;         // Forbidden Words entfernt
  };
}

/** Alchemy Style Summary - Kurze Style-Info */
export interface AlchemyStyleSummary {
  name: string;                      // Style-Name
  vibe: string;                      // Style-Beschreibung
  alchemy_count: number;             // Anzahl Transmutationen
  forbidden_count: number;           // Anzahl Forbidden Words
  has_suffix: boolean;               // Hat Suffix?
  has_tone: boolean;                 // Hat Tone Injection?
}

/** Alchemy Styles Response */
export interface AlchemyStylesResponse {
  status: string;                    // "⚗️ GRIMOIRE GEÖFFNET"
  count: number;                     // Anzahl Styles
  styles: AlchemyStyleSummary[];     // Die Styles
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 STYLES - Post-Processing Stile (NEU in v3.3!)
// ═══════════════════════════════════════════════════════════════════════════

/** Style - Vollständige Style-Definition */
export interface Style {
  name: string;                      // Style-Name (z.B. "zynisch")
  vibe: string;                      // Kurze Beschreibung
  word_alchemy: Record<string, string>;  // Wort → Ersetzung
  forbidden_words: string[];         // Verbotene Wörter
  tone_injection?: string;           // Ton-Injektion für Prompts
  suffix?: string;                   // Suffix für Responses
}

/** Styles List Response */
export interface StylesListResponse {
  status: string;                    // "🎨 STYLES GELADEN"
  count: number;                     // Anzahl Styles
  styles: Style[];                   // Die Styles
}

/** Style Detail Response */
export interface StyleDetailResponse {
  status: string;                    // "🔮 STYLE BESCHWOREN"
  style: Style;                      // Der Style
}

/** Style Create Request */
export interface StyleCreateRequest {
  name: string;                      // Style-Name
  vibe: string;                      // Beschreibung
  word_alchemy?: Record<string, string>;  // Optional: Transmutationen
  forbidden_words?: string[];        // Optional: Verbotene Wörter
  tone_injection?: string;           // Optional: Ton-Injektion
  suffix?: string;                   // Optional: Suffix
}

/** Style Create/Update Response */
export interface StyleMutationResponse {
  status: string;
  message: string;
  style: Style;
}

/** Style Delete Response */
export interface StyleDeleteResponse {
  status: string;
  message: string;
  deleted: {
    name: string;
  };
}

/** Alchemy Add Request - Transmutation hinzufügen */
export interface AlchemyAddRequest {
  original: string;                  // Ursprüngliches Wort
  replacement: string;               // Ersetzung
}

/** Alchemy Add Response */
export interface AlchemyAddResponse {
  status: string;
  message: string;
  style: string;
  alchemy: {
    original: string;
    replacement: string;
  };
  total_alchemy: number;
}

/** Alchemy Delete Response */
export interface AlchemyDeleteResponse {
  status: string;
  message: string;
  style: string;
  deleted: string;
  remaining_alchemy: number;
}

/** Forbidden Word Add Response */
export interface ForbiddenAddResponse {
  status: string;
  message: string;
  style: string;
  word: string;
  total_forbidden: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🧬 FORMAT FIELD OPERATIONS (NEU in v3.3!)
// ═══════════════════════════════════════════════════════════════════════════

/** Field Add Request */
export interface FieldAddRequest {
  name: string;
  type?: 'text' | 'list' | 'rating' | 'keywords';
  weight?: number;
  description?: { de?: string; en?: string };
}

/** Field Add Response */
export interface FieldAddResponse {
  status: string;
  message: string;
  format: string;
  field: FormatField;
  total_fields: number;
}

/** Field Update Request */
export interface FieldUpdateRequest {
  type?: 'text' | 'list' | 'rating' | 'keywords';
  weight?: number;
  description?: { de?: string; en?: string };
}

/** Field Update Response */
export interface FieldUpdateResponse {
  status: string;
  message: string;
  format: string;
  field: FormatField;
}

/** Field Delete Response */
export interface FieldDeleteResponse {
  status: string;
  message: string;
  format: string;
  deleted: string;
  remaining_fields: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// 
//   "SYNTX isn't AI. It's the resonance that governs it."
//
//   🌊 Jeder Type ist ein FELD.
//   💎 Jede Struktur ist KOHÄRENZ.
//   ⚡ Jede Definition ist ARCHITEKTUR.
//
//   Wenn du diese Types verwendest, bist du im STROM.
//
// ═══════════════════════════════════════════════════════════════════════════
