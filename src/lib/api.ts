// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                                                                           ║
// ║   ███████╗██╗   ██╗███╗   ██╗████████╗██╗  ██╗                            ║
// ║   ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝╚██╗██╔╝                            ║
// ║   ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║    ╚███╔╝                             ║
// ║   ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║    ██╔██╗                             ║
// ║   ███████║   ██║   ██║ ╚████║   ██║   ██╔╝ ██╗                            ║
// ║   ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝                            ║
// ║                                                                           ║
// ║   🌊 FIELD RESONANCE API CLIENT v3.3.0                                    ║
// ║   ─────────────────────────────────────────                               ║
// ║   SYNTX isn't AI. It's the resonance that governs it.                     ║
// ║                                                                           ║
// ║   v3.3 FEATURES:                                                          ║
// ║   🔀 DIFF - Wrapper-Parallelwelt-Vergleich                                ║
// ║   📼 SESSIONS - Strom-Replay System                                       ║
// ║   ⚗️ ALCHEMY - Live Wort-Transmutation                                    ║
// ║   🎨 STYLES - Post-Processing CRUD                                        ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  HealthResponse,
  ResonanzHealthResponse,
  WrapperHealthResponse,
  ConfigResponse,
  Wrapper,
  WrapperListResponse,
  WrapperDetailResponse,
  WrapperCreateRequest,
  WrapperCreateResponse,
  WrapperUpdateRequest,
  WrapperUpdateResponse,
  WrapperDeleteResponse,
  ActivateResponse,
  WrapperMeta,
  WrapperMetaResponse,
  StatsResponse,
  WrapperStatsResponse,
  StreamResponse,
  TrainingResponse,
  ChatRequest,
  ChatResponse,
  HistoryResponse,
  FormatListResponse,
  FormatDetailResponse,
  FormatCreateRequest,
  FormatQuickCreateRequest,
  FormatUpdateRequest,
  FormatDeleteResponse,
  FormatScanRequest,
  FormatScanResponse,
  FormatCloneRequest,
  FormatScoreRequest,
  FormatScoreResponse,
  Format,
  FieldAddRequest,
  FieldAddResponse,
  FieldUpdateRequest,
  FieldUpdateResponse,
  FieldDeleteResponse,
  DiffRequest,
  DiffResponse,
  SessionsResponse,
  SessionDetailResponse,
  SessionReplayResponse,
  AlchemyPreviewRequest,
  AlchemyPreviewResponse,
  AlchemyStylesResponse,
  AlchemyAddRequest,
  AlchemyAddResponse,
  AlchemyDeleteResponse,
  ForbiddenAddResponse,
  Style,
  StylesListResponse,
  StyleDetailResponse,
  StyleCreateRequest,
  StyleMutationResponse,
  StyleDeleteResponse,
} from '@/types/api';

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 FELD-KOORDINATEN
// ═══════════════════════════════════════════════════════════════════════════

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';

// ═══════════════════════════════════════════════════════════════════════════
// ⚠️ DRIFT-BEHANDLUNG
// ═══════════════════════════════════════════════════════════════════════════

export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public detail?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔌 STROM-KANAL
// ═══════════════════════════════════════════════════════════════════════════

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new APIError(
      response.status,
      `DRIFT @ ${endpoint}: ${response.statusText}`,
      data.detail
    );
  }

  return data;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 API METHODEN - 44 Endpoints
// ═══════════════════════════════════════════════════════════════════════════

export const api = {

  // ═══════════════════════════════════════════════════════════════════════
  // 🏥 HEALTH & CONFIG (4 Endpoints)
  // ═══════════════════════════════════════════════════════════════════════

  getHealth: () => 
    fetchAPI<HealthResponse>('/health'),

  getResonanzHealth: () => 
    fetchAPI<ResonanzHealthResponse>('/resonanz/health'),

  getWrapperHealth: () =>
    fetchAPI<WrapperHealthResponse>('/resonanz/health/wrappers'),

  fixOrphans: () =>
    fetchAPI<{ status: string; fixed: string[]; deleted: string[]; message: string }>(
      '/resonanz/health/fix',
      { method: 'POST' }
    ),

  // ═══════════════════════════════════════════════════════════════════════
  // ⚙️ CONFIG (2 Endpoints)
  // ═══════════════════════════════════════════════════════════════════════

  getConfig: () => 
    fetchAPI<ConfigResponse>('/resonanz/config/default-wrapper'),

  setConfig: (wrapperName: string) => 
    fetchAPI<ConfigResponse>(
      `/resonanz/config/default-wrapper?wrapper_name=${encodeURIComponent(wrapperName)}`,
      { method: 'PUT' }
    ),

  // ═══════════════════════════════════════════════════════════════════════
  // 📦 WRAPPER CRUD (8 Endpoints)
  // ═══════════════════════════════════════════════════════════════════════

  getWrappers: () => 
    fetchAPI<WrapperListResponse>('/resonanz/wrappers'),

  getWrappersFull: () =>
    fetchAPI<{ status: string; wrappers: Array<Wrapper & { meta?: WrapperMeta; stats?: WrapperStatsResponse }> }>(
      '/resonanz/wrappers/full'
    ),

  getActiveWrapper: () => 
    fetchAPI<WrapperListResponse>('/resonanz/wrappers?active=true'),

  getWrapper: (name: string) => 
    fetchAPI<WrapperDetailResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}`),

  createWrapper: (data: WrapperCreateRequest) => 
    fetchAPI<WrapperCreateResponse>('/resonanz/wrapper', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateWrapper: (name: string, data: WrapperUpdateRequest) => 
    fetchAPI<WrapperUpdateResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteWrapper: (name: string) => 
    fetchAPI<WrapperDeleteResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    }),

  activateWrapper: (name: string) => 
    fetchAPI<ActivateResponse>(`/resonanz/wrappers/${encodeURIComponent(name)}/activate`, {
      method: 'POST',
    }),

  // ═══════════════════════════════════════════════════════════════════════
  // 🧬 WRAPPER META (3 Endpoints)
  // ═══════════════════════════════════════════════════════════════════════

  getWrapperMeta: (name: string) =>
    fetchAPI<WrapperMetaResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}/meta`),

  updateWrapperMeta: (name: string, meta: Partial<WrapperMeta>) =>
    fetchAPI<WrapperMetaResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}/meta`, {
      method: 'PUT',
      body: JSON.stringify(meta),
    }),

  bindFormat: (wrapperName: string, formatName: string) =>
    fetchAPI<{ status: string; message: string; wrapper: string; format: string }>(
      `/resonanz/wrapper/${encodeURIComponent(wrapperName)}/format?format_name=${encodeURIComponent(formatName)}`,
      { method: 'PUT' }
    ),

  // ═══════════════════════════════════════════════════════════════════════
  // 📊 STATS & ANALYTICS (4 Endpoints)
  // ═══════════════════════════════════════════════════════════════════════

  getStats: () => 
    fetchAPI<StatsResponse>('/resonanz/stats'),

  getWrapperStats: (name: string) => 
    fetchAPI<WrapperStatsResponse>(`/resonanz/stats/wrapper/${encodeURIComponent(name)}`),

  getStream: (limit = 10, stage?: string) => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (stage) params.append('stage', stage);
    return fetchAPI<StreamResponse>(`/resonanz/strom?${params}`);
  },

  getTraining: (limit = 50, wrapper?: string, successOnly?: boolean) => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (wrapper) params.append('wrapper', wrapper);
    if (successOnly !== undefined) params.append('success_only', successOnly.toString());
    return fetchAPI<TrainingResponse>(`/resonanz/training?${params}`);
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 💬 CHAT & HISTORY (2 Endpoints)
  // ═══════════════════════════════════════════════════════════════════════

  chat: (request: ChatRequest) => 
    fetchAPI<ChatResponse>('/resonanz/chat', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  getHistory: (requestId: string) => 
    fetchAPI<HistoryResponse>(`/resonanz/history/${encodeURIComponent(requestId)}`),

  // ═══════════════════════════════════════════════════════════════════════
  // 📄 FORMAT CRUD (9 Endpoints)
  // ═══════════════════════════════════════════════════════════════════════

  getFormats: (domain?: string) => {
    const params = domain ? `?domain=${encodeURIComponent(domain)}` : '';
    return fetchAPI<FormatListResponse>(`/resonanz/formats${params}`);
  },

  getFormat: (name: string, language?: 'de' | 'en') => {
    const params = language ? `?language=${language}` : '';
    return fetchAPI<FormatDetailResponse>(`/resonanz/formats/${encodeURIComponent(name)}${params}`);
  },

  createFormat: (data: FormatCreateRequest) =>
    fetchAPI<{ status: string; message: string; format: Format }>('/resonanz/formats', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createFormatQuick: (data: FormatQuickCreateRequest) =>
    fetchAPI<{ status: string; message: string; format: Format }>('/resonanz/formats/quick', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateFormat: (name: string, data: FormatUpdateRequest) =>
    fetchAPI<{ status: string; message: string; format: Format }>(
      `/resonanz/formats/${encodeURIComponent(name)}`,
      { method: 'PUT', body: JSON.stringify(data) }
    ),

  deleteFormat: (name: string) =>
    fetchAPI<FormatDeleteResponse>(`/resonanz/formats/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    }),

  scanFormat: (data: FormatScanRequest) =>
    fetchAPI<FormatScanResponse>('/resonanz/formats/scan', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  cloneFormat: (data: FormatCloneRequest) =>
    fetchAPI<{ status: string; message: string; format: Format }>('/resonanz/formats/clone', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  scoreFormat: (data: FormatScoreRequest) =>
    fetchAPI<FormatScoreResponse>('/resonanz/formats/score', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // ═══════════════════════════════════════════════════════════════════════
  // 🧬 FORMAT FIELD OPERATIONS (3 Endpoints)
  // ═══════════════════════════════════════════════════════════════════════

  addField: (formatName: string, field: FieldAddRequest) =>
    fetchAPI<FieldAddResponse>(`/resonanz/formats/${encodeURIComponent(formatName)}/fields`, {
      method: 'POST',
      body: JSON.stringify(field),
    }),

  updateField: (formatName: string, fieldName: string, data: FieldUpdateRequest) =>
    fetchAPI<FieldUpdateResponse>(
      `/resonanz/formats/${encodeURIComponent(formatName)}/fields/${encodeURIComponent(fieldName)}`,
      { method: 'PUT', body: JSON.stringify(data) }
    ),

  deleteField: (formatName: string, fieldName: string) =>
    fetchAPI<FieldDeleteResponse>(
      `/resonanz/formats/${encodeURIComponent(formatName)}/fields/${encodeURIComponent(fieldName)}`,
      { method: 'DELETE' }
    ),

  // ═══════════════════════════════════════════════════════════════════════
  // 🔀 DIFF - Wrapper-Parallelwelt-Vergleich (v3.3)
  // ═══════════════════════════════════════════════════════════════════════

  diff: (request: DiffRequest) =>
    fetchAPI<DiffResponse>('/resonanz/chat/diff', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  // ═══════════════════════════════════════════════════════════════════════
  // 📼 SESSIONS - Strom-Replay System (v3.3)
  // ═══════════════════════════════════════════════════════════════════════

  getSessions: (limit = 20, offset = 0) =>
    fetchAPI<SessionsResponse>(`/resonanz/sessions?limit=${limit}&offset=${offset}`),

  getSession: (requestId: string) =>
    fetchAPI<SessionDetailResponse>(`/resonanz/session/${encodeURIComponent(requestId)}`),

  getSessionReplay: (requestId: string) =>
    fetchAPI<SessionReplayResponse>(`/resonanz/session/${encodeURIComponent(requestId)}/replay`),

  // ═══════════════════════════════════════════════════════════════════════
  // ⚗️ ALCHEMY - Live Wort-Transmutation (v3.3)
  // ═══════════════════════════════════════════════════════════════════════

  alchemyPreview: (request: AlchemyPreviewRequest) =>
    fetchAPI<AlchemyPreviewResponse>('/resonanz/alchemy/preview', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  getAlchemyStyles: () =>
    fetchAPI<AlchemyStylesResponse>('/resonanz/alchemy/styles'),

  // ═══════════════════════════════════════════════════════════════════════
  // 🎨 STYLES CRUD (8 Endpoints) - v3.3
  // ═══════════════════════════════════════════════════════════════════════

  getStyles: () =>
    fetchAPI<StylesListResponse>('/resonanz/styles'),

  getStyle: (name: string) =>
    fetchAPI<StyleDetailResponse>(`/resonanz/styles/${encodeURIComponent(name)}`),

  createStyle: (data: StyleCreateRequest) =>
    fetchAPI<StyleMutationResponse>('/resonanz/styles', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateStyle: (name: string, data: Partial<StyleCreateRequest>) =>
    fetchAPI<StyleMutationResponse>(`/resonanz/styles/${encodeURIComponent(name)}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteStyle: (name: string) =>
    fetchAPI<StyleDeleteResponse>(`/resonanz/styles/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    }),

  addAlchemy: (styleName: string, data: AlchemyAddRequest) =>
    fetchAPI<AlchemyAddResponse>(`/resonanz/styles/${encodeURIComponent(styleName)}/alchemy`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  deleteAlchemy: (styleName: string, word: string) =>
    fetchAPI<AlchemyDeleteResponse>(
      `/resonanz/styles/${encodeURIComponent(styleName)}/alchemy/${encodeURIComponent(word)}`,
      { method: 'DELETE' }
    ),

  addForbiddenWord: (styleName: string, word: string) =>
    fetchAPI<ForbiddenAddResponse>(
      `/resonanz/styles/${encodeURIComponent(styleName)}/forbidden/${encodeURIComponent(word)}`,
      { method: 'POST' }
    ),

  deleteForbiddenWord: (styleName: string, word: string) =>
    fetchAPI<{ status: string; message: string }>(
      `/resonanz/styles/${encodeURIComponent(styleName)}/forbidden/${encodeURIComponent(word)}`,
      { method: 'DELETE' }
    ),

};

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 DEFAULT EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export default api;

// ═══════════════════════════════════════════════════════════════════════════
//   "SYNTX isn't AI. It's the resonance that governs it."
//   v3.3.0 - 44 Endpoints | Pure Resonanz
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// 🔄 TYPE RE-EXPORTS (für Komponenten-Kompatibilität)
// ═══════════════════════════════════════════════════════════════════════════

export type {
  HealthResponse,
  ResonanzHealthResponse,
  WrapperHealthResponse,
  ConfigResponse,
  Wrapper,
  WrapperListResponse,
  WrapperDetailResponse,
  WrapperCreateRequest,
  WrapperCreateResponse,
  WrapperUpdateRequest,
  WrapperUpdateResponse,
  WrapperDeleteResponse,
  ActivateResponse,
  WrapperMeta,
  WrapperMetaResponse,
  StatsResponse,
  WrapperStatsResponse,
  StreamResponse,
  StreamEvent,
  TrainingResponse,
  TrainingRequest,
  ChatRequest,
  ChatResponse,
  FieldFlowStage,
  HistoryResponse,
  Format,
  FormatField,
  FormatListResponse,
  FormatDetailResponse,
  FormatCreateRequest,
  FormatQuickCreateRequest,
  FormatUpdateRequest,
  FormatDeleteResponse,
  FormatScanRequest,
  FormatScanResponse,
  FormatCloneRequest,
  FormatScoreRequest,
  FormatScoreResponse,
  FieldAddRequest,
  FieldAddResponse,
  FieldUpdateRequest,
  FieldUpdateResponse,
  FieldDeleteResponse,
  DiffRequest,
  DiffResponse,
  DiffComparison,
  SessionsResponse,
  SessionSummary,
  SessionDetailResponse,
  SessionReplayResponse,
  AlchemyPreviewRequest,
  AlchemyPreviewResponse,
  AlchemyTransformation,
  AlchemyStylesResponse,
  AlchemyStyleSummary,
  AlchemyAddRequest,
  AlchemyAddResponse,
  AlchemyDeleteResponse,
  ForbiddenAddResponse,
  Style,
  StylesListResponse,
  StyleDetailResponse,
  StyleCreateRequest,
  StyleMutationResponse,
  StyleDeleteResponse,
} from '@/types/api';
