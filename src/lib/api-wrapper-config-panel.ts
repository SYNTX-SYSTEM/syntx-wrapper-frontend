// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                                                                           ║
// ║   🔥💎⚡ SYNTX WRAPPER CONFIG PANEL - API CLIENT v6.1 ⚡💎🔥              ║
// ║                                                                           ║
// ║                    FINALE VERSION MIT MAPPING SUPPORT                     ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  Wrapper,
  WrapperDetailResponse,
  WrapperMetaResponse,
  WrapperStatsResponse,
  ChatRequest,
  ChatResponse,
} from '@/types/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';

// [SAME TYPES AS BEFORE - COPY FROM PREVIOUS VERSION]

export interface FormatMapping {
  mistral_wrapper: string;
  gpt_wrapper: string;
  drift_scoring: {
    enabled: boolean;
    threshold: number;
  };
  resonanz_score: number;
  profile_id: string;
  metadata?: Record<string, any>;
}

export interface MappingsResponse {
  erfolg: boolean;
  version: string;
  total_formats: number;
  total_profiles: number;
  mappings: Record<string, FormatMapping>;
  available_profiles: Record<string, string>;
  drift_templates: Record<string, any>;
  stats: Record<string, any>;
}

export interface FormatField {
  name: string;
  weight: number;
  description: { de: string; en: string };
  keywords?: { de: string[]; en: string[] };
  headers?: { de: string[]; en: string[] };
  validation?: {
    min_length?: number;
    max_length?: number;
    required?: boolean;
  };
}

export interface FormatDetails {
  name: string;
  version: string;
  description: { de: string; en: string };
  author: string;
  created: string;
  updated: string;
  tags: string[];
  languages: string[];
  primary_language: string;
  wrapper: string;
  fields: FormatField[];
}

export interface FormatResponse {
  status: string;
  format: FormatDetails;
  field_count: number;
  language: string;
}

export interface CompletePanelData {
  format_name: string;
  mapping: FormatMapping;
  mistral_wrapper: WrapperDetailResponse;
  gpt_wrapper_name: string;
  format_details: FormatDetails;
  stats: WrapperStatsResponse;
  drift_scoring_enabled: boolean;
}

export class PanelAPIError extends Error {
  constructor(
    public status: number,
    message: string,
    public detail?: string
  ) {
    super(message);
    this.name = 'PanelAPIError';
  }
}

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
    throw new PanelAPIError(
      response.status,
      `API Error @ ${endpoint}: ${response.statusText}`,
      data.detail
    );
  }

  return data;
}

export const panelAPI = {

  async getWrappersList(): Promise<Wrapper[]> {
    const data = await fetchAPI<{ wrappers: Wrapper[] }>('/resonanz/wrappers/full');
    return data.wrappers || [];
  },

  async getWrapperDetail(name: string): Promise<WrapperDetailResponse> {
    return fetchAPI<WrapperDetailResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}`);
  },

  async getWrapperMeta(name: string): Promise<WrapperMetaResponse> {
    return fetchAPI<WrapperMetaResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}/meta`);
  },

  async getWrapperStats(name: string): Promise<WrapperStatsResponse> {
    return fetchAPI<WrapperStatsResponse>(`/resonanz/stats/wrapper/${encodeURIComponent(name)}`);
  },

  async getMappings(): Promise<MappingsResponse> {
    return fetchAPI<MappingsResponse>('/mapping/formats');
  },

  async getMappingForFormat(format: string): Promise<FormatMapping | null> {
    const mappings = await this.getMappings();
    return mappings.mappings[format] || null;
  },

  async getFormatDetails(format: string): Promise<FormatResponse> {
    return fetchAPI<FormatResponse>(`/resonanz/formats/${encodeURIComponent(format)}`);
  },

  /**
   * Load ALL data needed for the panel
   * 
   * WICHTIG: Benutzt den URSPRÜNGLICHEN Wrapper Namen,
   * nicht den aus dem Mapping!
   * 
   * Weil: User wählt "naxixam" → das ist der echte Wrapper
   * Mapping sagt "syntex_wrapper_review" → das ist ein Standard-Name der nicht existiert!
   */
  async loadCompletePanelData(wrapperName: string): Promise<CompletePanelData> {
    // STEP 1: Get wrapper meta to find format
    const meta = await this.getWrapperMeta(wrapperName);
    const formatName = meta.meta?.format;

    if (!formatName) {
      throw new PanelAPIError(400, 'Wrapper has no format binding', 'meta.format is null');
    }

    // STEP 2: Get mapping (hat GPT wrapper + drift config)
    const mapping = await this.getMappingForFormat(formatName);

    if (!mapping) {
      throw new PanelAPIError(404, `No mapping for format: ${formatName}`, 'Format not in mappings');
    }

    // STEP 3: Load everything in parallel
    // WICHTIG: Benutze wrapperName (der echte!), nicht mapping.mistral_wrapper!
    const [mistralWrapper, formatDetails, stats] = await Promise.all([
      this.getWrapperDetail(wrapperName),  // ← DER ECHTE WRAPPER NAME!
      this.getFormatDetails(formatName),
      this.getWrapperStats(wrapperName),
    ]);

    // STEP 4: Return everything!
    return {
      format_name: formatName,
      mapping: mapping,
      mistral_wrapper: mistralWrapper,
      gpt_wrapper_name: mapping.gpt_wrapper,
      format_details: formatDetails.format,
      stats: stats,
      drift_scoring_enabled: mapping.drift_scoring.enabled,
    };
  },

  async sendChat(request: ChatRequest): Promise<ChatResponse> {
    return fetchAPI<ChatResponse>('/resonanz/chat', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

};
