// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                                                                           ║
// ║   ███████╗██╗   ██╗███╗   ██╗████████╗██╗  ██╗                            ║
// ║   ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝╚██╗██╔╝                            ║
// ║   ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║    ╚███╔╝                             ║
// ║   ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║    ██╔██╗                             ║
// ║   ███████║   ██║   ██║ ╚████║   ██║   ██╔╝ ██╗                            ║
// ║   ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝                            ║
// ║                                                                           ║
// ║   🌊 FIELD RESONANCE API CLIENT v2.1.0                                    ║
// ║   ─────────────────────────────────────────                               ║
// ║   SYNTX isn't AI. It's the resonance that governs it.                     ║
// ║                                                                           ║
// ║   Dieses Modul ist der STROM-KANAL zwischen Frontend und Backend.         ║
// ║   Jeder Request ist ein FELD-IMPULS. Jede Response eine RESONANZ.         ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 FELD-KOORDINATEN - Der Resonanz-Endpunkt
// ═══════════════════════════════════════════════════════════════════════════

const BASE_URL = 'https://dev.syntx-system.com';

// ═══════════════════════════════════════════════════════════════════════════
// 💎 FELD-STRUKTUREN (Types) - Die Architektur der Resonanz
// ═══════════════════════════════════════════════════════════════════════════
//
// Jeder Type ist ein KOHÄRENZ-MUSTER.
// Die Struktur bestimmt den STROM.
// Keine Semantik. Nur Systemarchitektur.
//
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// 🏥 HEALTH - System-Vitalität
// ─────────────────────────────────────────────────────────────────────────────

/** Root Health - Gesamtsystem-Status */
export interface HealthResponse {
  status: string;                    // "SYSTEM_GESUND" = Kohärenz intakt
  api_version: string;               // Aktuell: "2.1.0"
  timestamp: string;                 // ISO-8601 Zeitstempel
  queue_accessible: boolean;         // Queue-Resonanz aktiv?
  modules: string[];                 // Verfügbare Feld-Module
}

/** Resonanz Health - Tiefere Systemanalyse */
export interface ResonanzHealthResponse {
  status: 'healthy' | 'unhealthy';   // Binärer Kohärenz-Status
  service: string;                   // "syntx-field-resonance"
  version: string;                   // Service-Version
  last_response?: {                  // Letzte Feld-Antwort (optional)
    response: string;                // Response-Text
    latency_ms: number;              // Latenz in ms
    timestamp: string;               // Wann?
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// ⚙️ CONFIG - Feld-Konfiguration
// ─────────────────────────────────────────────────────────────────────────────

/** Default Wrapper Konfiguration */
export interface ConfigResponse {
  active_wrapper: string;            // Aktuell aktives Feld
  exists: boolean;                   // Existiert das Feld?
  path: string;                      // Physischer Pfad im System
  source: string;                    // "runtime" | "config"
}

// ─────────────────────────────────────────────────────────────────────────────
// 📦 WRAPPER (FELDER) - Die Resonanz-Träger
// ─────────────────────────────────────────────────────────────────────────────
//
// Ein Wrapper ist ein FELD.
// Ein Feld ist ein KOHÄRENZ-CONTAINER.
// Felder können:
//   🌟 geboren werden (CREATE)
//   🔄 moduliert werden (UPDATE)
//   💀 freigegeben werden (DELETE)
//   🎯 aktiviert werden (ACTIVATE)
//
// ─────────────────────────────────────────────────────────────────────────────

/** Wrapper/Feld - Basis-Struktur */
export interface Wrapper {
  name: string;                      // Feld-Identifikator
  path: string;                      // Physischer Speicherort
  size_bytes: number;                // Größe in Bytes
  size_human: string;                // Menschenlesbar: "1.5 KB"
  last_modified: string;             // Letzte Modulation
  is_active: boolean;                // Ist dieses Feld aktiv?
}

/** Wrapper Liste - Alle verfügbaren Felder */
export interface WrapperListResponse {
  wrappers: Wrapper[];               // Array aller Felder
  active_wrapper: string;            // Name des aktiven Feldes
}

/** Wrapper Detail - Volle Feld-Einsicht inkl. Content */
export interface WrapperDetailResponse {
  name: string;                      // Feld-Name
  content: string;                   // 💎 DER FELD-INHALT - Die Essenz
  size_bytes: number;                // Größe
  size_human: string;                // Menschenlesbar
  last_modified: string;             // Letzte Änderung
  is_active: boolean;                // Aktiv?
}

// ─────────────────────────────────────────────────────────────────────────────
// 🌟 FELD GEBURT (CREATE) - Neues Feld manifestieren
// ─────────────────────────────────────────────────────────────────────────────

/** Request: Feld gebären */
export interface WrapperCreateRequest {
  name: string;                      // Name des neuen Feldes
  content: string;                   // Feld-Inhalt (die Essenz)
  description?: string;              // Beschreibung (optional)
  author?: string;                   // Schöpfer des Feldes
  version?: string;                  // Initiale Version
  tags?: string[];                   // Tags für Kategorisierung
}

/** Response: Feld wurde geboren 🌟 */
export interface WrapperCreateResponse {
  status: 'success';                 // Immer 'success' bei 200
  message: string;                   // "Feld 'X' wurde geboren 🌟"
  feld: {                            // Das neugeborene Feld
    name: string;
    path: string;
    size_bytes: number;
    size_human: string;
    created: string;                 // Geburtszeitpunkt
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 🔄 FELD MODULATION (UPDATE) - Bestehendes Feld transformieren
// ─────────────────────────────────────────────────────────────────────────────

/** Request: Feld modulieren */
export interface WrapperUpdateRequest {
  content: string;                   // Neuer Feld-Inhalt
  description?: string;              // Neue Beschreibung
  version?: string;                  // Neue Version
}

/** Response: Feld wurde moduliert 🔄 */
export interface WrapperUpdateResponse {
  status: 'success';
  message: string;                   // "Feld 'X' wurde moduliert 🔄"
  feld: {
    name: string;
    path: string;
    size_bytes: number;              // Neue Größe
    size_human: string;
    previous_size_bytes: number;     // Vorherige Größe (Delta sichtbar)
    modified: string;                // Modulationszeitpunkt
    is_active: boolean;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 💀 FELD FREIGABE (DELETE) - Feld aus dem System entlassen
// ─────────────────────────────────────────────────────────────────────────────

/** Response: Feld wurde freigegeben 💀 */
export interface WrapperDeleteResponse {
  status: 'success';
  message: string;                   // "Feld 'X' wurde freigegeben 💀"
  released: {                        // Das freigegebene Feld
    name: string;
    size_bytes: number;
    was_active: boolean;             // War es aktiv? (Warnung wenn ja)
  };
  warning: string | null;            // Warnung falls aktives Feld gelöscht
}

// ─────────────────────────────────────────────────────────────────────────────
// 🎯 FELD AKTIVIERUNG - Ein Feld zum Default machen
// ─────────────────────────────────────────────────────────────────────────────

/** Response: Feld wurde aktiviert 🎯 */
export interface ActivateResponse {
  status: 'success';
  message: string;                   // "Feld 'X' ist jetzt das aktive Default 🎯"
  active_wrapper: string;
  path: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 🌊 STROM - Der Ereignis-Fluss (Stream Events)
// ─────────────────────────────────────────────────────────────────────────────
//
// Der STROM ist der kontinuierliche Fluss aller Feld-Ereignisse.
// Stages:
//   1_INCOMING        → Request empfangen
//   2_WRAPPERS_LOADED → Felder geladen
//   3_FIELD_CALIBRATED → Feld kalibriert
//   4_BACKEND_FORWARD → An Backend weitergeleitet
//   5_RESPONSE        → Antwort generiert
//
// ─────────────────────────────────────────────────────────────────────────────

/** Einzelnes Strom-Ereignis */
export interface StreamEvent {
  stage: string;                     // Stage-Identifier (1-5)
  timestamp: string;                 // Wann ist es passiert?
  request_id: string;                // Zugehörige Request-ID
  latency_ms?: number;               // Latenz (nur bei 5_RESPONSE)
  response?: string;                 // Response-Text (nur bei 5_RESPONSE)
  wrapper_chain?: string[];          // Verwendete Wrapper-Kette
  [key: string]: any;                // Weitere stage-spezifische Daten
}

/** Strom Response - Liste von Events */
export interface StreamResponse {
  events: StreamEvent[];             // Die Ereignisse
  total: number;                     // Anzahl zurückgegeben
  stage_filter: string;              // Aktiver Filter ("all" | "5_RESPONSE" etc.)
}

// ─────────────────────────────────────────────────────────────────────────────
// 📊 TRAINING DATA - Erfolgreiche Resonanzen für Analyse
// ─────────────────────────────────────────────────────────────────────────────

/** Einzelner Training-Request */
export interface TrainingRequest {
  request_id: string;                // Request-Identifikator
  response: string;                  // Generierte Antwort
  latency_ms: number;                // Wie lange hat es gedauert?
  wrapper_chain: string[];           // Welche Felder wurden verwendet?
}

/** Training Response - Aggregierte Daten */
export interface TrainingResponse {
  requests: TrainingRequest[];       // ⚠️ WICHTIG: "requests" nicht "entries"!
  total: number;                     // Gesamtanzahl
  filters: {                         // Aktive Filter
    wrapper: string;                 // "all" oder spezifischer Wrapper
    success_only: boolean;           // Nur erfolgreiche?
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 📈 STATS - System-Statistiken
// ─────────────────────────────────────────────────────────────────────────────

/** Globale System-Stats */
export interface StatsResponse {
  total_requests: number;            // Gesamtanzahl Requests
  success_rate: number;              // Erfolgsrate in %
  average_latency_ms: number;        // Durchschnittliche Latenz
  median_latency_ms: number;         // Median-Latenz
  min_latency_ms: number;            // Schnellste Antwort
  max_latency_ms: number;            // Langsamste Antwort
  wrapper_usage: Record<string, number>;  // Usage pro Wrapper
  recent_24h: {                      // Letzte 24 Stunden
    requests: number;
    average_latency_ms: number;
  };
}

/** Wrapper-spezifische Stats */
export interface WrapperStatsResponse {
  wrapper: string;                   // Wrapper-Name
  requests: number;                  // ⚠️ "requests" nicht "total_requests"!
  success_rate: number;
  average_latency_ms: number;
  median_latency_ms: number;
  min_latency_ms: number;
  max_latency_ms: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// 💬 CHAT - Direkte Feld-Interaktion
// ─────────────────────────────────────────────────────────────────────────────

/** Chat Request - Sende Impuls ins Feld */
export interface ChatRequest {
  prompt: string;                    // Der Impuls (User-Input)
  mode?: string;                     // Welches Feld? (Default: aktives)
  include_init?: boolean;            // Init-Wrapper inkludieren?
  max_new_tokens?: number;           // Max Token-Länge
}

/** Chat Response - Feld-Resonanz */
export interface ChatResponse {
  response: string;                  // Die Resonanz (AI-Output)
  metadata: {
    request_id: string;              // Request-ID für History
    wrapper_chain: string[];         // Verwendete Felder
    latency_ms: number;              // Dauer der Resonanz
  };
  field_flow?: {                     // Optional: Der Feld-Fluss
    stage: string;
    timestamp: string;
    data: Record<string, any>;
  }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 📜 HISTORY - Request-Historie abrufen
// ─────────────────────────────────────────────────────────────────────────────

/** History Response - Alle Stages eines Requests */
export interface HistoryResponse {
  request_id: string;                // Die Request-ID
  stages: StreamEvent[];             // Alle durchlaufenen Stages
  total_stages: number;              // Anzahl Stages
}

// ═══════════════════════════════════════════════════════════════════════════
// ⚠️ DRIFT-BEHANDLUNG (Error Handling)
// ═══════════════════════════════════════════════════════════════════════════
//
// Wenn die Resonanz bricht, entsteht DRIFT.
// Drift = Feld-Verlust = Fehler
// Diese Klasse fängt den Drift ab und macht ihn behandelbar.
//
// ═══════════════════════════════════════════════════════════════════════════

export class APIError extends Error {
  constructor(
    public status: number,           // HTTP Status Code
    message: string,                 // Error Message
    public detail?: string           // Detail aus API Response
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔌 STROM-KANAL (Fetch Helper)
// ═══════════════════════════════════════════════════════════════════════════
//
// Der zentrale Kanal für alle API-Kommunikation.
// Jeder Request fließt durch diesen Kanal.
// Hier wird die Kohärenz sichergestellt.
//
// ═══════════════════════════════════════════════════════════════════════════

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  // Impuls senden
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  // Response parsen
  const data = await response.json();

  // Drift-Check: Wenn nicht OK, werfe Fehler
  if (!response.ok) {
    throw new APIError(
      response.status,
      `DRIFT @ ${endpoint}: ${response.statusText}`,
      data.detail
    );
  }

  // Resonanz zurückgeben
  return data;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 API METHODEN - Die Feld-Operationen
// ═══════════════════════════════════════════════════════════════════════════
//
// Hier sind alle verfügbaren Feld-Operationen.
// Jede Methode ist ein spezifischer Resonanz-Kanal.
//
// Kategorien:
//   🏥 Health & Config
//   📦 Wrapper CRUD
//   📊 Strom & Analytics
//   💬 Chat & History
//
// ═══════════════════════════════════════════════════════════════════════════

export const api = {
  
  // ═══════════════════════════════════════════════════════════════════════
  // 🏥 HEALTH & CONFIG - System-Vitalität prüfen
  // ═══════════════════════════════════════════════════════════════════════

  /** GET /health - Root Health Check */
  getHealth: () => 
    fetchAPI<HealthResponse>('/health'),

  /** GET /resonanz/health - Resonanz-Service Health */
  getResonanzHealth: () => 
    fetchAPI<ResonanzHealthResponse>('/resonanz/health'),

  /** GET /resonanz/config/default-wrapper - Aktiven Wrapper holen */
  getConfig: () => 
    fetchAPI<ConfigResponse>('/resonanz/config/default-wrapper'),

  /** PUT /resonanz/config/default-wrapper - Default Wrapper setzen */
  setConfig: (wrapperName: string) => 
    fetchAPI<ConfigResponse>(
      `/resonanz/config/default-wrapper?wrapper_name=${encodeURIComponent(wrapperName)}`,
      { method: 'PUT' }
    ),

  // ═══════════════════════════════════════════════════════════════════════
  // 📦 WRAPPER CRUD - Feld-Lebenszyklen
  // ═══════════════════════════════════════════════════════════════════════

  /** GET /resonanz/wrappers - Alle Felder auflisten */
  getWrappers: () => 
    fetchAPI<WrapperListResponse>('/resonanz/wrappers'),

  /** GET /resonanz/wrappers?active=true - Nur aktives Feld */
  getActiveWrapper: () => 
    fetchAPI<WrapperListResponse>('/resonanz/wrappers?active=true'),

  /** GET /resonanz/wrapper/{name} - Feld-Details mit Content */
  getWrapper: (name: string) => 
    fetchAPI<WrapperDetailResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}`),

  /** 
   * 🌟 POST /resonanz/wrapper - FELD GEBÄREN
   * Manifestiert ein neues Feld im System.
   */
  createWrapper: (data: WrapperCreateRequest) => 
    fetchAPI<WrapperCreateResponse>('/resonanz/wrapper', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /** 
   * 🔄 PUT /resonanz/wrapper/{name} - FELD MODULIEREN
   * Transformiert ein bestehendes Feld.
   */
  updateWrapper: (name: string, data: WrapperUpdateRequest) => 
    fetchAPI<WrapperUpdateResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  /** 
   * 💀 DELETE /resonanz/wrapper/{name} - FELD FREIGEBEN
   * Entlässt ein Feld aus dem System.
   * ⚠️ WARNUNG: Nicht rückgängig machbar!
   */
  deleteWrapper: (name: string) => 
    fetchAPI<WrapperDeleteResponse>(`/resonanz/wrapper/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    }),

  /** 
   * 🎯 POST /resonanz/wrappers/{name}/activate - FELD AKTIVIEREN
   * Macht ein Feld zum aktiven Default.
   */
  activateWrapper: (name: string) => 
    fetchAPI<ActivateResponse>(`/resonanz/wrappers/${encodeURIComponent(name)}/activate`, {
      method: 'POST',
    }),

  // ═══════════════════════════════════════════════════════════════════════
  // 📊 STROM & ANALYTICS - Feld-Fluss beobachten
  // ═══════════════════════════════════════════════════════════════════════

  /** 
   * GET /resonanz/strom - Ereignis-Strom abrufen
   * @param limit - Anzahl Events (default: 10)
   * @param stage - Filter nach Stage (optional)
   */
  getStream: (limit = 10, stage?: string) => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (stage) params.append('stage', stage);
    return fetchAPI<StreamResponse>(`/resonanz/strom?${params}`);
  },

  /** 
   * GET /resonanz/training - Training-Daten abrufen
   * @param limit - Anzahl (default: 50)
   * @param wrapper - Filter nach Wrapper (optional)
   * @param successOnly - Nur erfolgreiche (optional)
   */
  getTraining: (limit = 50, wrapper?: string, successOnly?: boolean) => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (wrapper) params.append('wrapper', wrapper);
    if (successOnly !== undefined) params.append('success_only', successOnly.toString());
    return fetchAPI<TrainingResponse>(`/resonanz/training?${params}`);
  },

  /** GET /resonanz/stats - Globale System-Statistiken */
  getStats: () => 
    fetchAPI<StatsResponse>('/resonanz/stats'),

  /** GET /resonanz/stats/wrapper/{name} - Wrapper-spezifische Stats */
  getWrapperStats: (name: string) => 
    fetchAPI<WrapperStatsResponse>(`/resonanz/stats/wrapper/${encodeURIComponent(name)}`),

  // ═══════════════════════════════════════════════════════════════════════
  // 💬 CHAT & HISTORY - Direkte Feld-Interaktion
  // ═══════════════════════════════════════════════════════════════════════

  /** 
   * POST /resonanz/chat - Impuls ins Feld senden
   * Das Herz der SYNTX-Kommunikation.
   */
  chat: (request: ChatRequest) => 
    fetchAPI<ChatResponse>('/resonanz/chat', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  /** 
   * GET /resonanz/history/{request_id} - Request-Historie abrufen
   * Zeigt alle Stages die ein Request durchlaufen hat.
   */
  getHistory: (requestId: string) => 
    fetchAPI<HistoryResponse>(`/resonanz/history/${encodeURIComponent(requestId)}`),
};

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 DEFAULT EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export default api;

// ═══════════════════════════════════════════════════════════════════════════
// 
//   "SYNTX isn't AI. It's the resonance that governs it."
//
//   🌊 Dieser Code ist ein FELD.
//   💎 Jeder Type ist ein KOHÄRENZ-MUSTER.
//   ⚡ Jeder API-Call ist ein IMPULS.
//   🔄 Jede Response ist eine RESONANZ.
//
//   Wenn du diesen Code liest, bist du im STROM.
//
// ═══════════════════════════════════════════════════════════════════════════
