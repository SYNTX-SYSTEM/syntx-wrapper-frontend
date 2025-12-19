# 🌊 SYNTX WRAPPER FRONTEND - VOLLSTÄNDIGE ANALYSE
Generated: $(date)

## 📁 PROJEKT-STRUKTUR
```
./src/app/api/auth/login/route.ts
./src/app/api/auth/logout/route.ts
./src/app/layout.tsx
./src/app/login/page.tsx
./src/app/page.tsx
./src/components/analytics/FieldStream.tsx
./src/components/analytics/index.ts
./src/components/analytics/StatsPanel.tsx
./src/components/analytics/SystemStats.tsx
./src/components/chat/ChatInterface.tsx
./src/components/chat/ChatPanel.tsx
./src/components/chat/index.ts
./src/components/data/DataPanel.tsx
./src/components/flow/FieldFlowVisualizer.tsx
./src/components/flow/FlowPanel.tsx
./src/components/flow/index.ts
./src/components/graphs/GraphsPanel.tsx
./src/components/health/HealthStatus.tsx
./src/components/health/index.ts
./src/components/layout/Header.tsx
./src/components/layout/index.ts
./src/components/layout/MainLayout.tsx
./src/components/layout/ParticleBackground.tsx
./src/components/system/SystemPanel.tsx
./src/components/ui/Button.tsx
./src/components/ui/Card.tsx
./src/components/ui/ExportButton.tsx
./src/components/ui/FilterBar.tsx
./src/components/ui/FilterDropdown.tsx
./src/components/ui/GlassCard.tsx
./src/components/ui/index.ts
./src/components/ui/Input.tsx
./src/components/ui/LiveBadge.tsx
./src/components/ui/Pagination.tsx
./src/components/ui/ParticleField.tsx
./src/components/ui/ProgressBar.tsx
./src/components/ui/SearchBar.tsx
./src/components/ui/Skeleton.tsx
./src/components/ui/SortHeader.tsx
./src/components/ui/StatusBadge.tsx
./src/components/ui/Toast.tsx
./src/components/ui/Tooltip.tsx
./src/components/wrappers/CreateWrapperModal.tsx
./src/components/wrappers/index.ts
./src/components/wrappers/WrapperControl.tsx
./src/components/wrappers/WrapperList.tsx
./src/hooks/useApi.ts
./src/hooks/useExport.ts
./src/hooks/useFilter.ts
./src/hooks/usePagination.ts
./src/hooks/useRealtime.ts
./src/lib/api.ts
./src/middleware.ts
./src/types/api.ts
./tailwind.config.ts
```

---

## 📦 PACKAGE.JSON
```json
{
  "name": "syntx-wrapper-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "framer-motion": "^12.23.26",
    "next": "16.0.10",
    "react": "19.2.1",
    "react-dom": "19.2.1",
    "recharts": "^3.6.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.0.10",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## 🔌 API CLIENT (src/lib/api.ts)
```typescript
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
```

---

## 📋 TYPES (src/types/api.ts)
```typescript
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
```

---

## 🏠 MAIN PAGE (src/app/page.tsx)
```typescript
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import WrapperControl from "@/components/wrappers/WrapperControl";
import CreateWrapperModal from "@/components/wrappers/CreateWrapperModal";
import StatsPanel from "@/components/analytics/StatsPanel";
import FlowPanel from "@/components/flow/FlowPanel";
import ChatPanel from "@/components/chat/ChatPanel";
import GraphsPanel from "@/components/graphs/GraphsPanel";
import SystemPanel from "@/components/system/SystemPanel";
import DataPanel from "@/components/data/DataPanel";
import LiveBadge from "@/components/ui/LiveBadge";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import { useRealtime, useRealtimeHealth } from "@/hooks/useRealtime";
import { api } from "@/lib/api";

type TabId = "data" | "system" | "chat" | "graphs" | "wrappers" | "analytics" | "flow";

const TABS = [
  { id: "data", label: "DATA", icon: "📊", color: "#8b5cf6" },
  { id: "system", label: "SYSTEM", icon: "🖥️", color: "#10b981" },
  { id: "chat", label: "CHAT", icon: "💬", color: "#00d4ff" },
  { id: "graphs", label: "GRAPHS", icon: "📈", color: "#d946ef" },
  { id: "wrappers", label: "WRAPPERS", icon: "📦", color: "#f59e0b" },
  { id: "analytics", label: "ANALYTICS", icon: "📊", color: "#00d4ff" },
  { id: "flow", label: "FLOW", icon: "🌊", color: "#10b981" },
] as const;

function HeroSection({ onEnter }: { onEnter: () => void }) {
  const [visible, setVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (textIndex < 3) setTextIndex(textIndex + 1);
    }, 800);
    return () => clearTimeout(timer);
  }, [textIndex]);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      background: "linear-gradient(180deg, #030b15 0%, #0a1628 50%, #030b15 100%)",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{
        position: "absolute",
        top: "20%",
        left: "30%",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)",
        filter: "blur(60px)",
      }} />

      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s ease",
      }}>
        <div style={{ marginBottom: 40 }}>
          <img src="/logo.png" alt="SYNTX" width={120} height={120} style={{ filter: "drop-shadow(0 0 30px rgba(0,212,255,0.5))" }} />
        </div>

        <h1 style={{
          fontSize: 72,
          fontWeight: 900,
          margin: 0,
          marginBottom: 32,
          letterSpacing: 12,
          background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #d946ef 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: textIndex >= 1 ? 1 : 0,
          transition: "all 0.8s ease",
        }}>
          SYNTX
        </h1>

        <p style={{
          fontSize: 32,
          fontWeight: 700,
          margin: 0,
          marginBottom: 16,
          color: "white",
          opacity: textIndex >= 2 ? 1 : 0,
          transition: "all 0.8s ease",
        }}>
          SYNTX isn't AI.
        </p>

        <p style={{
          fontSize: 24,
          margin: 0,
          marginBottom: 60,
          fontStyle: "italic",
          background: "linear-gradient(90deg, #00d4ff, #10b981)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: textIndex >= 3 ? 1 : 0,
          transition: "all 0.8s ease",
        }}>
          It's the resonance that governs it
        </p>

        <button
          onClick={onEnter}
          style={{
            padding: "16px 48px",
            fontSize: 14,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: 4,
            color: "#030b15",
            background: "linear-gradient(135deg, #00d4ff, #00a8cc)",
            border: "none",
            borderRadius: 12,
            cursor: "pointer",
            boxShadow: "0 0 40px rgba(0,212,255,0.5)",
            opacity: textIndex >= 3 ? 1 : 0,
            transition: "all 0.8s ease",
          }}
        >
          ENTER SYSTEM
        </button>
      </div>

      <div style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        fontSize: 10,
        fontFamily: "monospace",
        color: "rgba(255,255,255,0.2)",
      }}>
        v1.0.0 // FIELD RESONANCE SYSTEM
      </div>
    </div>
  );
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("system");
  const [modalOpen, setModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showHero, setShowHero] = useState(false);
  
  const { isLive, pulse, lastUpdate, newEventCount, hasNewData } = useRealtime(5000);
  const { isOnline } = useRealtimeHealth(10000);

  const handleTabChange = (tab: TabId) => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 150);
  };

  const handleCreateWrapper = async (data: { name: string; level: string; content: string }) => {
    try {
      // Neuer CRUD-Weg: createWrapper statt File-Upload
      await api.createWrapper({ name: data.name, content: data.content, description: data.level });
      // 🌟 Feld geboren!
      setModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  if (showHero) {
    return <HeroSection onEnter={() => setShowHero(false)} />;
  }

  return (
    <main style={{ minHeight: "100vh", padding: 32, fontFamily: "system-ui", color: "white" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div onClick={() => setShowHero(true)} style={{ cursor: "pointer", width: 50, height: 50, borderRadius: 12, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(0,212,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/logo.png" alt="SYNTX" width={35} height={35} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, background: "linear-gradient(135deg, #00d4ff, #d946ef)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SYNTX</h1>
            <p style={{ opacity: 0.4, margin: 0, fontSize: 10, fontFamily: "monospace", fontStyle: "italic" }}>The resonance that governs AI</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <LiveBadge 
            isLive={isLive && isOnline} 
            pulse={pulse} 
            lastUpdate={lastUpdate} 
            newCount={hasNewData ? newEventCount : 0} 
          />
          {activeTab === "wrappers" && (
            <button onClick={() => setModalOpen(true)} style={{ padding: "12px 24px", borderRadius: 10, background: "linear-gradient(135deg, #00d4ff, #00a8cc)", color: "#030b15", fontWeight: 700, fontFamily: "monospace", border: "none", cursor: "pointer", boxShadow: "0 0 30px rgba(0,212,255,0.4)" }}>+ NEU</button>
          )}
        </div>
      </header>

      <nav style={{ display: "flex", gap: 6, marginBottom: 24, padding: 6, background: "rgba(0,0,0,0.3)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.05)" }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as TabId)}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: 10,
              border: "none",
              background: activeTab === tab.id ? `linear-gradient(135deg, ${tab.color}20, ${tab.color}10)` : "transparent",
              color: activeTab === tab.id ? tab.color : "rgba(255,255,255,0.4)",
              fontFamily: "monospace",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              position: "relative",
              boxShadow: activeTab === tab.id ? `0 0 20px ${tab.color}30` : "none",
            }}
          >
            {activeTab === tab.id && <div style={{ position: "absolute", bottom: 0, left: "20%", right: "20%", height: 2, background: tab.color, borderRadius: 2 }} />}
            <span style={{ fontSize: 16 }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      <section style={{ opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? "translateY(10px)" : "translateY(0)", transition: "all 0.15s ease" }}>
        {activeTab === "data" && <DataPanel />}
        {activeTab === "system" && <SystemPanel />}
        {activeTab === "chat" && <ChatPanel />}
        {activeTab === "graphs" && <GraphsPanel />}
        {activeTab === "wrappers" && <WrapperControl />}
        {activeTab === "analytics" && <StatsPanel />}
        {activeTab === "flow" && <FlowPanel />}
      </section>

      <CreateWrapperModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleCreateWrapper} />
    </main>
  );
}

export default function Page() {
  const [showHero, setShowHero] = useState(true);

  if (showHero) {
    return <HeroSection onEnter={() => setShowHero(false)} />;
  }

  return (
    <ToastProvider>
      <Dashboard />
    </ToastProvider>
  );
}
```

---

## 📦 WRAPPER CONTROL (src/components/wrappers/WrapperControl.tsx)
```typescript
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                                                                           ║
// ║   📦 WRAPPER CONTROL - FELD-LEBENSZYKLEN                                  ║
// ║   ─────────────────────────────────────────                               ║
// ║   🌟 Geboren  │  🔄 Moduliert  │  💀 Freigegeben  │  🎯 Aktiviert         ║
// ║                                                                           ║
// ║   ⚡ ULTRA CYBER EDITION v2 - MIT WRAPPER STATS ⚡                         ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { api, Wrapper, WrapperDetailResponse } from '@/lib/api';
import { useExport } from '@/hooks/useExport';
import ExportButton from '@/components/ui/ExportButton';
import SearchBar from '@/components/ui/SearchBar';

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 FELD-FARBEN
// ═══════════════════════════════════════════════════════════════════════════

const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef', 
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
};

const getWrapperColor = (name: string): string => {
  if (name.includes('human')) return COLORS.green;
  if (name.includes('sigma')) return COLORS.orange;
  if (name.includes('deepsweep')) return COLORS.magenta;
  if (name.includes('true_raw')) return COLORS.red;
  if (name.includes('universal')) return COLORS.purple;
  return COLORS.cyan;
};

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 CYBER ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════

const cyberStyles = `
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px var(--glow-color); }
    50% { box-shadow: 0 0 40px var(--glow-color), 0 0 60px var(--glow-color); }
  }
  @keyframes borderFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes scanLine {
    0% { transform: translateY(-100%); opacity: 0; }
    50% { opacity: 0.5; }
    100% { transform: translateY(100%); opacity: 0; }
  }
  @keyframes floatUp {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes textGlow {
    0%, 100% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
    50% { text-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor; }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  @keyframes particleFloat {
    0%, 100% { transform: translate(0, 0); opacity: 0.3; }
    50% { transform: translate(-5px, -40px); opacity: 0.5; }
    100% { transform: translate(0, -80px); opacity: 0; }
  }
  @keyframes slideUp {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes countUp {
    0% { opacity: 0; transform: scale(0.5); }
    100% { opacity: 1; transform: scale(1); }
  }
  .cyber-card {
    position: relative;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .cyber-card:hover {
    transform: translateY(-8px) scale(1.02);
    z-index: 10;
  }
  .cyber-card::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 18px;
    background: linear-gradient(45deg, var(--card-color), transparent, var(--card-color));
    background-size: 200% 200%;
    animation: borderFlow 3s ease infinite;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .cyber-card:hover::before { opacity: 1; }
  .cyber-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .cyber-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s ease;
  }
  .cyber-btn:hover::before { left: 100%; }
  .cyber-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px var(--btn-glow);
  }
  .glow-text { animation: textGlow 2s ease-in-out infinite; }
  .float-animation { animation: floatUp 4s ease-in-out infinite; }
  .scan-line {
    position: absolute;
    left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--scan-color), transparent);
    animation: scanLine 2s linear infinite;
    pointer-events: none;
  }
  .stat-number { animation: countUp 0.6s ease-out forwards; }
`;

// ═══════════════════════════════════════════════════════════════════════════
// 📊 WRAPPER STATS TYPE
// ═══════════════════════════════════════════════════════════════════════════

interface WrapperStats {
  wrapper: string;
  requests: number;
  success_rate: number;
  average_latency_ms: number;
  median_latency_ms: number;
  min_latency_ms: number;
  max_latency_ms: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌟 CREATE MODAL
// ═══════════════════════════════════════════════════════════════════════════

function CreateModal({ open, onClose, onSuccess }: { open: boolean; onClose: () => void; onSuccess: () => void; }) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name.trim() || !content.trim()) { setError('Name und Content sind Pflichtfelder!'); return; }
    setLoading(true); setError(null);
    try {
      await api.createWrapper({ name: name.trim(), content, description: description || undefined, author: author || undefined });
      onSuccess(); onClose();
      setName(''); setContent(''); setDescription(''); setAuthor('');
    } catch (e: any) { setError(e.detail || e.message || 'Fehler'); }
    finally { setLoading(false); }
  };

  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (<div key={i} style={{ position: 'absolute', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 4, height: 4, borderRadius: '50%', background: COLORS.green, animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`, animationDelay: `${Math.random() * 2}s` }} />))}
      </div>
      <div style={{ width: '100%', maxWidth: 700, maxHeight: '90vh', background: 'linear-gradient(135deg, rgba(10,26,46,0.98), rgba(5,11,20,0.99))', borderRadius: 24, border: '2px solid rgba(16,185,129,0.6)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 0 80px rgba(16,185,129,0.4)', position: 'relative' }}>
        <div style={{ '--scan-color': COLORS.green } as any} className="scan-line" />
        <div style={{ padding: '28px 32px', background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.05))', borderBottom: '1px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, background: 'rgba(16,185,129,0.2)', border: '2px solid rgba(16,185,129,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: '0 0 30px rgba(16,185,129,0.4)', animation: 'pulse 2s ease-in-out infinite' }}>🌟</div>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 22, color: COLORS.green, letterSpacing: 3 }} className="glow-text">FELD GEBÄREN</h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Manifestiere ein neues Feld</p>
          </div>
        </div>
        <div style={{ flex: 1, padding: 32, display: 'flex', flexDirection: 'column', gap: 24, overflow: 'auto' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'monospace', color: COLORS.green, marginBottom: 10, letterSpacing: 2 }}><span style={{ width: 8, height: 8, background: COLORS.green, borderRadius: 2 }} />FELD-NAME *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="mein_neues_feld" style={{ width: '100%', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(16,185,129,0.4)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 15, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 10, display: 'block', letterSpacing: 2 }}>AUTOR</label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="SYNTX" style={{ width: '100%', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 15, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 10, display: 'block', letterSpacing: 2 }}>BESCHREIBUNG</label>
              <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Beschreibung..." style={{ width: '100%', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 15, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'monospace', color: COLORS.green, marginBottom: 10, letterSpacing: 2 }}><span style={{ width: 8, height: 8, background: COLORS.green, borderRadius: 2 }} />FELD-CONTENT *</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="=== SYNTX WRAPPER ===" style={{ flex: 1, minHeight: 200, width: '100%', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(16,185,129,0.4)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 14, fontFamily: 'monospace', outline: 'none', resize: 'vertical', lineHeight: 1.7, boxSizing: 'border-box' }} />
          </div>
          {error && <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.5)', color: COLORS.red, fontSize: 13, fontFamily: 'monospace' }}>⚠️ {error}</div>}
          <div style={{ display: 'flex', gap: 16 }}>
            <button onClick={onClose} className="cyber-btn" style={{ '--btn-glow': 'rgba(255,255,255,0.2)', flex: 1, padding: '16px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace', fontSize: 13, cursor: 'pointer' } as any}>ABBRECHEN</button>
            <button onClick={handleSubmit} disabled={loading} className="cyber-btn" style={{ '--btn-glow': 'rgba(16,185,129,0.5)', flex: 2, padding: '16px 24px', borderRadius: 12, border: 'none', background: loading ? 'rgba(16,185,129,0.3)' : 'linear-gradient(135deg, #10b981, #059669)', color: '#030b15', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, letterSpacing: 3, cursor: loading ? 'wait' : 'pointer' } as any}>{loading ? '⏳ MANIFESTIERE...' : '🌟 FELD GEBÄREN'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔄 EDIT MODAL - FIXED: Nur Content in großem Feld!
// ═══════════════════════════════════════════════════════════════════════════

function EditModal({ wrapper, onClose, onSuccess }: { wrapper: WrapperDetailResponse; onClose: () => void; onSuccess: () => void; }) {
  const [content, setContent] = useState(wrapper.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const color = getWrapperColor(wrapper.name);

  const handleSubmit = async () => {
    if (!content.trim()) { setError('Content darf nicht leer sein!'); return; }
    setLoading(true); setError(null);
    try {
      await api.updateWrapper(wrapper.name, { content });
      onSuccess(); onClose();
    } catch (e: any) { setError(e.detail || e.message || 'Fehler'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(15)].map((_, i) => (<div key={i} style={{ position: 'absolute', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 3, height: 3, borderRadius: '50%', background: color, animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`, animationDelay: `${Math.random() * 2}s` }} />))}
      </div>
      <div style={{ width: '100%', maxWidth: 1000, height: '85vh', background: 'linear-gradient(135deg, rgba(10,26,46,0.98), rgba(5,11,20,0.99))', borderRadius: 24, border: `2px solid ${color}60`, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: `0 0 80px ${color}40`, position: 'relative' }}>
        <div style={{ '--scan-color': color } as any} className="scan-line" />
        <div style={{ padding: '20px 28px', background: `linear-gradient(135deg, ${color}25, ${color}05)`, borderBottom: `1px solid ${color}40`, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: `${color}20`, border: `2px solid ${color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: `0 0 30px ${color}40`, animation: 'pulse 2s ease-in-out infinite' }}>🔄</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, color, letterSpacing: 3 }} className="glow-text">FELD MODULIEREN</h2>
            <p style={{ margin: '6px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{wrapper.name} • {wrapper.size_human}</p>
          </div>
          <div style={{ padding: '8px 16px', borderRadius: 10, background: wrapper.is_active ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.1)', border: `1px solid ${wrapper.is_active ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.2)'}`, fontSize: 11, fontFamily: 'monospace', color: wrapper.is_active ? COLORS.green : 'rgba(255,255,255,0.5)' }}>{wrapper.is_active ? '🎯 AKTIV' : 'INAKTIV'}</div>
        </div>
        <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'monospace', color, marginBottom: 12, letterSpacing: 2 }}><span style={{ width: 8, height: 8, background: color, borderRadius: 2, boxShadow: `0 0 10px ${color}` }} />FELD-CONTENT BEARBEITEN</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{ flex: 1, width: '100%', padding: 20, borderRadius: 16, border: `2px solid ${color}40`, background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.95)', fontSize: 14, fontFamily: 'monospace', outline: 'none', resize: 'none', lineHeight: 1.8, boxSizing: 'border-box' }} onFocus={(e) => { e.target.style.borderColor = color; e.target.style.boxShadow = `0 0 30px ${color}30`; }} onBlur={(e) => { e.target.style.borderColor = `${color}40`; e.target.style.boxShadow = 'none'; }} />
          {error && <div style={{ marginTop: 16, padding: '14px 18px', borderRadius: 12, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.5)', color: COLORS.red, fontSize: 13, fontFamily: 'monospace' }}>⚠️ {error}</div>}
        </div>
        <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', display: 'flex', gap: 16 }}>
          <button onClick={onClose} className="cyber-btn" style={{ '--btn-glow': 'rgba(255,255,255,0.2)', flex: 1, padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace', fontSize: 13, cursor: 'pointer' } as any}>ABBRECHEN</button>
          <button onClick={handleSubmit} disabled={loading} className="cyber-btn" style={{ '--btn-glow': `${color}50`, flex: 2, padding: '16px 20px', borderRadius: 12, border: 'none', background: loading ? `${color}30` : `linear-gradient(135deg, ${color}, ${color}cc)`, color: '#030b15', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, letterSpacing: 3, cursor: loading ? 'wait' : 'pointer', boxShadow: `0 0 40px ${color}50` } as any}>{loading ? '⏳ MODULIERE...' : '🔄 FELD MODULIEREN'}</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 💀 DELETE MODAL
// ═══════════════════════════════════════════════════════════════════════════

function DeleteModal({ wrapper, onClose, onSuccess }: { wrapper: Wrapper; onClose: () => void; onSuccess: () => void; }) {
  const [confirmName, setConfirmName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (confirmName !== wrapper.name) { setError('Name stimmt nicht überein!'); return; }
    setLoading(true); setError(null);
    try { await api.deleteWrapper(wrapper.name); onSuccess(); onClose(); }
    catch (e: any) { setError(e.detail || e.message || 'Fehler'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(12)].map((_, i) => (<div key={i} style={{ position: 'absolute', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 4, height: 4, borderRadius: '50%', background: COLORS.red, animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`, animationDelay: `${Math.random() * 2}s` }} />))}
      </div>
      <div style={{ width: '100%', maxWidth: 520, background: 'linear-gradient(135deg, rgba(26,10,10,0.98), rgba(10,5,5,0.99))', borderRadius: 24, border: '2px solid rgba(239,68,68,0.6)', overflow: 'hidden', boxShadow: '0 0 80px rgba(239,68,68,0.4)', position: 'relative' }}>
        <div style={{ '--scan-color': COLORS.red } as any} className="scan-line" />
        <div style={{ padding: '28px 32px', background: 'linear-gradient(135deg, rgba(239,68,68,0.25), rgba(239,68,68,0.05))', borderBottom: '1px solid rgba(239,68,68,0.4)', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, background: 'rgba(239,68,68,0.2)', border: '2px solid rgba(239,68,68,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, animation: 'pulse 1.5s ease-in-out infinite' }}>💀</div>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 22, color: COLORS.red, letterSpacing: 3 }} className="glow-text">FELD FREIGEBEN</h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>⚠️ UNWIDERRUFLICH!</p>
          </div>
        </div>
        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ padding: 24, borderRadius: 16, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <span style={{ fontSize: 24 }}>📦</span>
              <span style={{ fontFamily: 'monospace', fontSize: 18, color: 'white', fontWeight: 700 }}>{wrapper.name}</span>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', display: 'flex', gap: 20 }}>
              <span>📊 {wrapper.size_human}</span>
              {wrapper.is_active && <span style={{ color: COLORS.green }}>🎯 AKTIV</span>}
            </div>
          </div>
          {wrapper.is_active && <div style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.5)', color: COLORS.orange, fontSize: 13, fontFamily: 'monospace' }}>⚠️ WARNUNG: Dies ist das aktive Default-Feld!</div>}
          <div>
            <label style={{ display: 'block', fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>Tippe "<span style={{ color: COLORS.red, fontWeight: 700 }}>{wrapper.name}</span>" zur Bestätigung</label>
            <input value={confirmName} onChange={(e) => setConfirmName(e.target.value)} placeholder={wrapper.name} style={{ width: '100%', padding: '16px 20px', borderRadius: 12, border: `1px solid ${confirmName === wrapper.name ? 'rgba(239,68,68,0.8)' : 'rgba(239,68,68,0.3)'}`, background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 15, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          {error && <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(239,68,68,0.2)', color: COLORS.red, fontSize: 13, fontFamily: 'monospace' }}>⚠️ {error}</div>}
          <div style={{ display: 'flex', gap: 16 }}>
            <button onClick={onClose} className="cyber-btn" style={{ '--btn-glow': 'rgba(255,255,255,0.2)', flex: 1, padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace', fontSize: 13, cursor: 'pointer' } as any}>ABBRECHEN</button>
            <button onClick={handleDelete} disabled={loading || confirmName !== wrapper.name} className="cyber-btn" style={{ '--btn-glow': 'rgba(239,68,68,0.5)', flex: 2, padding: '16px 20px', borderRadius: 12, border: 'none', background: (loading || confirmName !== wrapper.name) ? 'rgba(239,68,68,0.3)' : 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, cursor: (loading || confirmName !== wrapper.name) ? 'not-allowed' : 'pointer', opacity: (loading || confirmName !== wrapper.name) ? 0.6 : 1 } as any}>{loading ? '⏳...' : '💀 FREIGEBEN'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 📊 STATS MODAL - NEUER ENDPOINT!
// ═══════════════════════════════════════════════════════════════════════════

function StatsModal({ wrapper, onClose }: { wrapper: Wrapper; onClose: () => void; }) {
  const [stats, setStats] = useState<WrapperStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const color = getWrapperColor(wrapper.name);

  useEffect(() => {
    api.getWrapperStats(wrapper.name)
      .then(setStats)
      .catch((e: any) => setError(e.message || 'Keine Stats'))
      .finally(() => setLoading(false));
  }, [wrapper.name]);

  const StatBox = ({ label, value, unit, icon }: { label: string; value: number | string; unit?: string; icon: string }) => (
    <div style={{ padding: 20, borderRadius: 16, background: `${color}10`, border: `1px solid ${color}30` }}>
      <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{icon} {label}</div>
      <div style={{ fontSize: 28, fontFamily: 'monospace', color, fontWeight: 700 }} className="stat-number">
        {typeof value === 'number' ? value.toLocaleString() : value}{unit && <span style={{ fontSize: 14, opacity: 0.7, marginLeft: 4 }}>{unit}</span>}
      </div>
    </div>
  );

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(15)].map((_, i) => (<div key={i} style={{ position: 'absolute', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 3, height: 3, borderRadius: '50%', background: color, animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`, animationDelay: `${Math.random() * 2}s` }} />))}
      </div>
      <div style={{ width: '100%', maxWidth: 700, background: 'linear-gradient(135deg, rgba(10,26,46,0.98), rgba(5,11,20,0.99))', borderRadius: 24, border: `2px solid ${color}60`, overflow: 'hidden', boxShadow: `0 0 80px ${color}40`, position: 'relative' }}>
        <div style={{ '--scan-color': color } as any} className="scan-line" />
        <div style={{ padding: '24px 28px', background: `linear-gradient(135deg, ${color}25, ${color}05)`, borderBottom: `1px solid ${color}40`, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: `${color}20`, border: `2px solid ${color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: `0 0 30px ${color}40`, animation: 'pulse 2s ease-in-out infinite' }}>📊</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, color, letterSpacing: 3 }} className="glow-text">FELD STATISTIKEN</h2>
            <p style={{ margin: '6px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{wrapper.name}</p>
          </div>
          <button onClick={onClose} className="cyber-btn" style={{ '--btn-glow': 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, padding: '10px 18px', color: 'white', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12 } as any}>✕</button>
        </div>
        <div style={{ padding: 28 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ fontSize: 48, marginBottom: 20, animation: 'pulse 1.5s ease-in-out infinite' }}>📊</div>
              <div style={{ fontFamily: 'monospace', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Lade Statistiken...</div>
            </div>
          ) : error || !stats ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>📭</div>
              <div style={{ fontFamily: 'monospace', fontSize: 16, color: 'rgba(255,255,255,0.5)' }}>Keine Statistiken verfügbar</div>
              <div style={{ fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 10 }}>Dieses Feld wurde noch nicht verwendet</div>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                <StatBox label="TOTAL REQUESTS" value={stats.requests} icon="📨" />
                <StatBox label="SUCCESS RATE" value={stats.success_rate.toFixed(1)} unit="%" icon="✅" />
                <StatBox label="AVG LATENCY" value={Math.round(stats.average_latency_ms)} unit="ms" icon="⚡" />
              </div>
              <div style={{ padding: 20, borderRadius: 16, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>⏱️ LATENCY DETAILS</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                  <div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>MIN</div><div style={{ fontSize: 18, fontFamily: 'monospace', color: COLORS.green }}>{stats.min_latency_ms.toLocaleString()} ms</div></div>
                  <div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>MEDIAN</div><div style={{ fontSize: 18, fontFamily: 'monospace', color: COLORS.cyan }}>{stats.median_latency_ms.toLocaleString()} ms</div></div>
                  <div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>MAX</div><div style={{ fontSize: 18, fontFamily: 'monospace', color: COLORS.orange }}>{stats.max_latency_ms.toLocaleString()} ms</div></div>
                </div>
              </div>
              <div style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>PERFORMANCE</span>
                  <span style={{ fontSize: 11, fontFamily: 'monospace', color }}>{stats.success_rate >= 95 ? '🔥 EXCELLENT' : stats.success_rate >= 80 ? '✅ GOOD' : '⚠️ ATTENTION'}</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  <div style={{ width: `${stats.success_rate}%`, height: '100%', borderRadius: 4, background: `linear-gradient(90deg, ${color}, ${color}cc)`, boxShadow: `0 0 20px ${color}50` }} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 📋 VIEW MODAL
// ═══════════════════════════════════════════════════════════════════════════

function ViewModal({ wrapper, onClose, onEdit, onStats }: { wrapper: Wrapper; onClose: () => void; onEdit: (d: WrapperDetailResponse) => void; onStats: () => void; }) {
  const [detail, setDetail] = useState<WrapperDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const color = getWrapperColor(wrapper.name);

  useEffect(() => { api.getWrapper(wrapper.name).then(setDetail).catch(console.error).finally(() => setLoading(false)); }, [wrapper.name]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(10)].map((_, i) => (<div key={i} style={{ position: 'absolute', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 3, height: 3, borderRadius: '50%', background: color, animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`, animationDelay: `${Math.random() * 2}s` }} />))}
      </div>
      <div style={{ width: '100%', maxWidth: 950, maxHeight: '90vh', background: 'linear-gradient(135deg, rgba(10,26,46,0.98), rgba(5,11,20,0.99))', borderRadius: 24, border: `2px solid ${color}60`, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: `0 0 80px ${color}40`, position: 'relative' }}>
        <div style={{ '--scan-color': color } as any} className="scan-line" />
        <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 50, height: 50, borderRadius: 12, background: `${color}20`, border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📦</div>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 18, color }} className="glow-text">{wrapper.name}</h2>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{wrapper.size_human}{wrapper.is_active && <span style={{ color: COLORS.green, marginLeft: 10 }}>• 🎯 AKTIV</span>}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onStats} className="cyber-btn" style={{ '--btn-glow': `${COLORS.purple}40`, background: `${COLORS.purple}15`, border: `1px solid ${COLORS.purple}40`, borderRadius: 10, padding: '10px 18px', color: COLORS.purple, cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, fontWeight: 600 } as any}>📊 STATS</button>
            {detail && <button onClick={() => onEdit(detail)} className="cyber-btn" style={{ '--btn-glow': `${COLORS.cyan}40`, background: `${COLORS.cyan}15`, border: `1px solid ${COLORS.cyan}40`, borderRadius: 10, padding: '10px 18px', color: COLORS.cyan, cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, fontWeight: 600 } as any}>🔄 EDIT</button>}
            <button onClick={onClose} className="cyber-btn" style={{ '--btn-glow': 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, padding: '10px 18px', color: 'white', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12 } as any}>✕</button>
          </div>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 28 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 80, color: 'rgba(255,255,255,0.4)' }}>
              <div style={{ fontSize: 48, marginBottom: 20, animation: 'pulse 1.5s ease-in-out infinite' }}>🌊</div>
              <div style={{ fontFamily: 'monospace', fontSize: 14 }}>Lade Content...</div>
            </div>
          ) : (
            <pre style={{ margin: 0, padding: 24, background: 'rgba(0,0,0,0.5)', borderRadius: 16, border: `1px solid ${color}20`, fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.9)', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace' }}>{detail?.content}</pre>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 📦 WRAPPER CARD
// ═══════════════════════════════════════════════════════════════════════════

function WrapperCard({ wrapper, onView, onEdit, onDelete, onActivate, onStats, isActivating }: { wrapper: Wrapper; onView: () => void; onEdit: () => void; onDelete: () => void; onActivate: () => void; onStats: () => void; isActivating: boolean; }) {
  const color = getWrapperColor(wrapper.name);
  const displayName = wrapper.name.replace('syntex_wrapper_', '').replace('syntx_', '').replace(/_/g, ' ');
  const [hovered, setHovered] = useState(false);

  return (
    <div className="cyber-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ '--card-color': color, '--glow-color': `${color}40`, background: `linear-gradient(135deg, ${color}10, ${color}03)`, border: `1px solid ${color}${hovered ? '80' : '30'}`, borderRadius: 20, padding: 24, position: 'relative', overflow: 'hidden', animation: hovered ? 'glowPulse 2s ease-in-out infinite' : 'none' } as any}>
      <div style={{ position: 'absolute', top: -60, right: -60, width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${color}${hovered ? '30' : '15'}, transparent 70%)`, pointerEvents: 'none' }} />
      {hovered && <div style={{ '--scan-color': color } as any} className="scan-line" />}
      <div style={{ position: 'absolute', top: 8, left: 8, width: 16, height: 16, borderTop: `2px solid ${color}${hovered ? '80' : '40'}`, borderLeft: `2px solid ${color}${hovered ? '80' : '40'}` }} />
      <div style={{ position: 'absolute', bottom: 8, right: 8, width: 16, height: 16, borderBottom: `2px solid ${color}${hovered ? '80' : '40'}`, borderRight: `2px solid ${color}${hovered ? '80' : '40'}` }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${color}30, ${color}10)`, border: `2px solid ${color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: hovered ? `0 0 25px ${color}50` : 'none' }}>📦</div>
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 15, color, fontWeight: 700, letterSpacing: 2, textShadow: hovered ? `0 0 20px ${color}` : 'none' }}>{displayName.toUpperCase()}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontFamily: 'monospace' }}>{wrapper.size_human}</div>
          </div>
        </div>
        {wrapper.is_active && <div style={{ padding: '6px 12px', borderRadius: 8, fontSize: 10, fontFamily: 'monospace', background: 'rgba(16,185,129,0.2)', color: COLORS.green, border: '1px solid rgba(16,185,129,0.5)', display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.green }} />AKTIV</div>}
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 20, fontFamily: 'monospace', position: 'relative', zIndex: 1 }}>• Modulation: {new Date(wrapper.last_modified).toLocaleDateString('de-DE')}</div>
      <div style={{ display: 'flex', gap: 8, position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
        <button onClick={onView} className="cyber-btn" style={{ '--btn-glow': `${color}50`, flex: 1, minWidth: 60, padding: '10px 12px', borderRadius: 10, border: `1px solid ${color}50`, background: `${color}15`, color, fontFamily: 'monospace', fontSize: 10, cursor: 'pointer', fontWeight: 600 } as any}>👁️ VIEW</button>
        <button onClick={onStats} className="cyber-btn" style={{ '--btn-glow': `${COLORS.purple}40`, flex: 1, minWidth: 60, padding: '10px 12px', borderRadius: 10, border: `1px solid ${COLORS.purple}50`, background: `${COLORS.purple}15`, color: COLORS.purple, fontFamily: 'monospace', fontSize: 10, cursor: 'pointer', fontWeight: 600 } as any}>📊 STATS</button>
        <button onClick={onEdit} className="cyber-btn" style={{ '--btn-glow': `${COLORS.cyan}40`, flex: 1, minWidth: 60, padding: '10px 12px', borderRadius: 10, border: `1px solid ${COLORS.cyan}50`, background: `${COLORS.cyan}15`, color: COLORS.cyan, fontFamily: 'monospace', fontSize: 10, cursor: 'pointer', fontWeight: 600 } as any}>🔄 EDIT</button>
        {!wrapper.is_active && <button onClick={onActivate} disabled={isActivating} className="cyber-btn" style={{ '--btn-glow': `${COLORS.green}40`, flex: 1, minWidth: 60, padding: '10px 12px', borderRadius: 10, border: `1px solid ${COLORS.green}50`, background: `${COLORS.green}15`, color: COLORS.green, fontFamily: 'monospace', fontSize: 10, cursor: isActivating ? 'wait' : 'pointer', opacity: isActivating ? 0.5 : 1, fontWeight: 600 } as any}>🎯 AKTIV</button>}
        <button onClick={onDelete} className="cyber-btn" style={{ '--btn-glow': `${COLORS.red}40`, padding: '10px 12px', borderRadius: 10, border: `1px solid ${COLORS.red}50`, background: `${COLORS.red}15`, color: COLORS.red, fontFamily: 'monospace', fontSize: 10, cursor: 'pointer', fontWeight: 600 } as any}>💀</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function WrapperControl() {
  const [wrappers, setWrappers] = useState<Wrapper[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activating, setActivating] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [viewWrapper, setViewWrapper] = useState<Wrapper | null>(null);
  const [editWrapper, setEditWrapper] = useState<WrapperDetailResponse | null>(null);
  const [deleteWrapper, setDeleteWrapper] = useState<Wrapper | null>(null);
  const [statsWrapper, setStatsWrapper] = useState<Wrapper | null>(null);
  const { exportJSON, exportCSV } = useExport();

  useEffect(() => {
    const styleId = 'cyber-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = cyberStyles;
      document.head.appendChild(style);
    }
  }, []);

  const fetchWrappers = useCallback(async () => {
    try { const data = await api.getWrappers(); setWrappers(data.wrappers || []); }
    catch (e) { console.error('Failed:', e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchWrappers(); }, [fetchWrappers]);

  const handleActivate = async (name: string) => {
    setActivating(name);
    try { await api.activateWrapper(name); await fetchWrappers(); }
    catch (e) { console.error('Activation failed:', e); }
    finally { setActivating(null); }
  };

  const filtered = wrappers.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));
  const activeCount = wrappers.filter(w => w.is_active).length;
  const handleExportJSON = () => exportJSON(filtered, 'syntx_wrappers');
  const handleExportCSV = () => exportCSV(filtered, 'syntx_wrappers', [{ key: 'name', label: 'Name' }, { key: 'size_human', label: 'Size' }, { key: 'last_modified', label: 'Modified' }, { key: 'is_active', label: 'Active' }]);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div className="float-animation" style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, rgba(217,70,239,0.25), rgba(217,70,239,0.08))', border: '2px solid rgba(217,70,239,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: '0 0 40px rgba(217,70,239,0.4)' }}>📦</div>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 24, color: COLORS.magenta, letterSpacing: 4 }} className="glow-text">WRAPPER CONTROL</h2>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.cyan, boxShadow: `0 0 10px ${COLORS.cyan}` }} />{wrappers.length} Felder</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.green, boxShadow: `0 0 10px ${COLORS.green}` }} />{activeCount} aktiv</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Feld suchen..." />
          <ExportButton onExportJSON={handleExportJSON} onExportCSV={handleExportCSV} disabled={filtered.length === 0} color={COLORS.magenta} />
          <button onClick={() => setCreateOpen(true)} className="cyber-btn" style={{ '--btn-glow': 'rgba(16,185,129,0.5)', padding: '14px 28px', borderRadius: 12, background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: '#030b15', fontWeight: 700, fontFamily: 'monospace', fontSize: 13, letterSpacing: 3, cursor: 'pointer', boxShadow: '0 0 40px rgba(16,185,129,0.5)' } as any}>🌟 GEBÄREN</button>
        </div>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 100, color: 'rgba(255,255,255,0.4)' }}>
          <div style={{ fontSize: 64, marginBottom: 20, animation: 'pulse 1.5s ease-in-out infinite' }}>🌊</div>
          <div style={{ fontFamily: 'monospace', fontSize: 16 }}>LADE FELDER...</div>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 100, color: 'rgba(255,255,255,0.4)' }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>📦</div>
          <div style={{ fontFamily: 'monospace', fontSize: 16 }}>KEINE FELDER</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {filtered.map((w, i) => (
            <div key={w.name} style={{ animation: `slideUp 0.5s ease ${i * 0.05}s both` }}>
              <WrapperCard wrapper={w} onView={() => setViewWrapper(w)} onEdit={() => { api.getWrapper(w.name).then(setEditWrapper).catch(console.error); }} onDelete={() => setDeleteWrapper(w)} onActivate={() => handleActivate(w.name)} onStats={() => setStatsWrapper(w)} isActivating={activating === w.name} />
            </div>
          ))}
        </div>
      )}
      <CreateModal open={createOpen} onClose={() => setCreateOpen(false)} onSuccess={fetchWrappers} />
      {viewWrapper && <ViewModal wrapper={viewWrapper} onClose={() => setViewWrapper(null)} onEdit={(d) => { setViewWrapper(null); setEditWrapper(d); }} onStats={() => { setViewWrapper(null); setStatsWrapper(viewWrapper); }} />}
      {editWrapper && <EditModal wrapper={editWrapper} onClose={() => setEditWrapper(null)} onSuccess={fetchWrappers} />}
      {deleteWrapper && <DeleteModal wrapper={deleteWrapper} onClose={() => setDeleteWrapper(null)} onSuccess={fetchWrappers} />}
      {statsWrapper && <StatsModal wrapper={statsWrapper} onClose={() => setStatsWrapper(null)} />}
    </div>
  );
}
```

---

## 💬 CHAT PANEL (src/components/chat/ChatPanel.tsx)
```typescript
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { api, Wrapper } from '@/lib/api';

// ═══════════════════════════════════════════════════════════════
// MOBILE DETECTION HOOK
// ═══════════════════════════════════════════════════════════════
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  
  return isMobile;
}

// ═══════════════════════════════════════════════════════════════
// GLASS CARD
// ═══════════════════════════════════════════════════════════════
function GlassCard({ children, style = {}, glowColor = '#00d4ff' }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
}) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: 16,
      background: 'linear-gradient(135deg, rgba(10,26,46,0.95), rgba(6,13,24,0.98))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'visible',
      ...style,
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${glowColor}50, transparent)`,
      }} />
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TYPING INDICATOR
// ═══════════════════════════════════════════════════════════════
function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 6, padding: '12px 16px' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: '#00d4ff', animation: `typingBounce 1.4s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
      <style>{`@keyframes typingBounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-8px); opacity: 1; } }`}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MESSAGE BUBBLE (RESPONSIVE)
// ═══════════════════════════════════════════════════════════════
function MessageBubble({ message, isUser, wrapper, latency, timestamp, isMobile }: {
  message: string;
  isUser: boolean;
  wrapper?: string;
  latency?: number;
  timestamp: Date;
  isMobile: boolean;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: isMobile ? 12 : 16,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.3s ease',
      padding: isMobile ? '0 4px' : 0,
    }}>
      <div style={{
        maxWidth: isMobile ? '88%' : '75%',
        padding: isMobile ? '12px 14px' : '14px 18px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isUser 
          ? 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.1))'
          : 'linear-gradient(135deg, rgba(217,70,239,0.15), rgba(217,70,239,0.05))',
        border: isUser ? '1px solid rgba(0,212,255,0.3)' : '1px solid rgba(217,70,239,0.3)',
        boxShadow: isUser ? '0 0 20px rgba(0,212,255,0.15)' : '0 0 20px rgba(217,70,239,0.15)',
      }}>
        {!isUser && wrapper && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 8,
            padding: '3px 8px', background: 'rgba(0,0,0,0.3)', borderRadius: 6,
            fontSize: isMobile ? 9 : 10, fontFamily: 'monospace', color: '#d946ef', letterSpacing: 1,
          }}>
            <span>📦</span>{wrapper.replace('syntex_wrapper_', '').toUpperCase()}
          </div>
        )}
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: isMobile ? 13 : 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {message}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: isMobile ? 9 : 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', flexWrap: 'wrap' }}>
          <span>{timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
          {latency && <span style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '2px 6px', borderRadius: 4 }}>⚡ {(latency / 1000).toFixed(1)}s</span>}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// WRAPPER SELECTOR (RESPONSIVE)
// ═══════════════════════════════════════════════════════════════
function WrapperSelector({ wrappers, selected, onSelect, isMobile }: {
  wrappers: Wrapper[];
  selected: string;
  onSelect: (name: string) => void;
  isMobile: boolean;
}) {
  const [open, setOpen] = useState(false);
  const getColor = (name: string) => {
    if (name.includes('human')) return '#10b981';
    if (name.includes('sigma')) return '#f59e0b';
    if (name.includes('deepsweep')) return '#d946ef';
    if (name.includes('true_raw')) return '#ef4444';
    return '#00d4ff';
  };

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={() => setOpen(!open)} style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: isMobile ? '12px 14px' : '10px 16px',
        background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10, cursor: 'pointer',
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: getColor(selected), boxShadow: `0 0 10px ${getColor(selected)}` }} />
        <span style={{ fontFamily: 'monospace', fontSize: isMobile ? 11 : 12, color: getColor(selected), fontWeight: 600, flex: 1 }}>
          {selected.replace('syntex_wrapper_', '').toUpperCase()}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 250 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute',
            top: '100%', left: 0, right: 0, marginTop: 4,
            background: 'linear-gradient(135deg, rgba(10,26,46,0.98), rgba(6,13,24,0.98))',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
            overflow: 'hidden', zIndex: 300, maxHeight: isMobile ? 250 : 300, overflowY: 'auto',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          }}>
            {wrappers.map(w => (
              <div key={w.name} onClick={() => { onSelect(w.name); setOpen(false); }} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: isMobile ? '14px 14px' : '12px 16px', cursor: 'pointer',
                background: w.name === selected ? 'rgba(0,212,255,0.1)' : 'transparent',
                borderLeft: w.name === selected ? '3px solid #00d4ff' : '3px solid transparent',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: getColor(w.name) }} />
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: w.name === selected ? '#00d4ff' : 'rgba(255,255,255,0.7)', flex: 1 }}>
                  {w.name.replace('syntex_wrapper_', '').toUpperCase()}
                </span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{w.size_human}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MOBILE SETTINGS DRAWER
// ═══════════════════════════════════════════════════════════════
function MobileDrawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 500, backdropFilter: 'blur(4px)' }} />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 501,
        background: 'linear-gradient(135deg, rgba(10,26,46,0.98), rgba(6,13,24,0.99))',
        borderRadius: '24px 24px 0 0',
        border: '1px solid rgba(255,255,255,0.1)',
        borderBottom: 'none',
        padding: '8px 0 24px',
        maxHeight: '70vh', overflowY: 'auto',
        animation: 'slideUp 0.3s ease',
      }}>
        <div style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.3)', borderRadius: 2, margin: '0 auto 16px' }} />
        {children}
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// MOBILE STATS BAR
// ═══════════════════════════════════════════════════════════════
function MobileStatsBar({ messages, onOpenSettings }: { messages: Message[]; onOpenSettings: () => void }) {
  const responses = messages.filter(m => !m.isUser).length;
  const avgLatency = messages.filter(m => m.latency).length > 0 
    ? (messages.filter(m => m.latency).reduce((sum, m) => sum + (m.latency || 0), 0) / messages.filter(m => m.latency).length / 1000).toFixed(1)
    : '0';

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
      background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>💬</span>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#00d4ff' }}>{responses}</span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>|</span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>⚡</span>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#f59e0b' }}>{avgLatency}s</span>
      </div>
      <button onClick={onOpenSettings} style={{
        background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)',
        borderRadius: 8, padding: '6px 12px', color: '#00d4ff',
        fontFamily: 'monospace', fontSize: 10, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        ⚙️ Settings
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN CHAT PANEL
// ═══════════════════════════════════════════════════════════════
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  wrapper?: string;
  latency?: number;
  timestamp: Date;
  requestId?: string;
}

export default function ChatPanel() {
  const isMobile = useIsMobile();
  const [wrappers, setWrappers] = useState<Wrapper[]>([]);
  const [selectedWrapper, setSelectedWrapper] = useState<string>('syntex_wrapper_sigma');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [maxTokens, setMaxTokens] = useState(500);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    api.getWrappers().then(data => {
      setWrappers(data.wrappers);
      const active = data.wrappers.find(w => w.is_active);
      if (active) setSelectedWrapper(active.name);
    });
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage: Message = { id: Date.now().toString(), content: input.trim(), isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const response = await api.chat({ prompt: userMessage.content, mode: selectedWrapper, max_new_tokens: maxTokens });
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(), content: response.response, isUser: false,
        wrapper: selectedWrapper, latency: response.metadata.latency_ms, timestamp: new Date(), requestId: response.metadata.request_id,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), content: `Error: ${err.message}`, isUser: false, timestamp: new Date() }]);
    } finally { setLoading(false); }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
  const clearChat = () => setMessages([]);

  // ═══════════════════════════════════════════════════════════════
  // MOBILE LAYOUT
  // ═══════════════════════════════════════════════════════════════
  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)', minHeight: 400 }}>
        <GlassCard style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 12 }} glowColor="#d946ef">
          {/* Mobile Header */}
          <div style={{
            padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>💬</span>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 12, color: '#00d4ff' }}>SYNTX CHAT</h2>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={clearChat} style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 8, padding: '6px 10px', color: '#ef4444', fontFamily: 'monospace', fontSize: 10, cursor: 'pointer',
              }}>🗑️</button>
            </div>
          </div>

          {/* Mobile Stats Bar */}
          <MobileStatsBar messages={messages} onOpenSettings={() => setDrawerOpen(true)} />

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px', display: 'flex', flexDirection: 'column' }}>
            {messages.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: 20 }}>
                <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.5 }}>🌊</div>
                <div style={{ fontFamily: 'monospace', fontSize: 12, marginBottom: 6 }}>SYNTX FIELD RESONANCE</div>
                <div style={{ fontSize: 11, maxWidth: 250 }}>Tippe auf Settings um einen Wrapper zu wählen</div>
              </div>
            ) : (
              <>
                {messages.map(msg => (
                  <MessageBubble key={msg.id} message={msg.content} isUser={msg.isUser} wrapper={msg.wrapper} latency={msg.latency} timestamp={msg.timestamp} isMobile={true} />
                ))}
                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
                    <div style={{ padding: '12px 14px', borderRadius: '18px 18px 18px 4px', background: 'linear-gradient(135deg, rgba(217,70,239,0.15), rgba(217,70,239,0.05))', border: '1px solid rgba(217,70,239,0.3)' }}>
                      <TypingIndicator />
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Mobile Input */}
          <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nachricht..."
                disabled={loading}
                style={{
                  flex: 1, padding: '12px 14px', borderRadius: 20,
                  border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,0,0,0.4)',
                  color: 'white', fontSize: 15, fontFamily: 'system-ui, sans-serif',
                  resize: 'none', minHeight: 44, maxHeight: 100, outline: 'none',
                }}
                rows={1}
              />
              <button onClick={sendMessage} disabled={loading || !input.trim()} style={{
                width: 48, height: 48, borderRadius: '50%', border: 'none',
                background: loading || !input.trim() ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #00d4ff, #00a8cc)',
                color: loading || !input.trim() ? 'rgba(255,255,255,0.3)' : '#030b15',
                fontWeight: 700, fontSize: 18, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: loading || !input.trim() ? 'none' : '0 0 20px rgba(0,212,255,0.4)',
              }}>
                {loading ? '...' : '→'}
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Mobile Settings Drawer */}
        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <div style={{ padding: '0 20px' }}>
            <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginBottom: 12, letterSpacing: 1 }}>📦 WRAPPER</div>
            <WrapperSelector wrappers={wrappers} selected={selectedWrapper} onSelect={(w) => { setSelectedWrapper(w); }} isMobile={true} />
            
            <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', margin: '24px 0 12px', letterSpacing: 1 }}>⚙️ MAX TOKENS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input type="range" min={50} max={2000} value={maxTokens} onChange={(e) => setMaxTokens(parseInt(e.target.value))} style={{ flex: 1, accentColor: '#00d4ff' }} />
              <span style={{ fontFamily: 'monospace', fontSize: 14, color: '#00d4ff', minWidth: 50 }}>{maxTokens}</span>
            </div>

            <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', margin: '24px 0 12px', letterSpacing: 1 }}>📊 SESSION STATS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#00d4ff', fontFamily: 'monospace' }}>{messages.filter(m => !m.isUser).length}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Responses</div>
              </div>
              <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#f59e0b', fontFamily: 'monospace' }}>
                  {(messages.filter(m => m.latency).reduce((sum, m) => sum + (m.latency || 0), 0) / 1000).toFixed(1)}s
                </div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Total</div>
              </div>
              <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#10b981', fontFamily: 'monospace' }}>
                  {messages.filter(m => m.latency).length > 0 ? (messages.filter(m => m.latency).reduce((sum, m) => sum + (m.latency || 0), 0) / messages.filter(m => m.latency).length / 1000).toFixed(1) : '0'}s
                </div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Avg</div>
              </div>
            </div>

            <button onClick={clearChat} style={{
              width: '100%', marginTop: 24, padding: '14px 20px', borderRadius: 12,
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444', fontFamily: 'monospace', fontSize: 12, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>🗑️ Chat löschen</button>
          </div>
        </MobileDrawer>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // DESKTOP LAYOUT
  // ═══════════════════════════════════════════════════════════════
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, height: 'calc(100vh - 200px)', minHeight: 600 }}>
      {/* Main Chat Area */}
      <GlassCard style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }} glowColor="#d946ef">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>💬</span>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: '#00d4ff' }}>SYNTX CHAT</h2>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{messages.length} Nachrichten</div>
            </div>
          </div>
          <button onClick={clearChat} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '8px 14px', color: '#ef4444', cursor: 'pointer', fontFamily: 'monospace', fontSize: 11 }}>🗑️ Clear</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column' }}>
          {messages.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: 16, opacity: 0.5 }}>🌊</div>
              <div style={{ fontFamily: 'monospace', fontSize: 14, marginBottom: 8 }}>SYNTX FIELD RESONANCE</div>
              <div style={{ fontSize: 12, maxWidth: 300 }}>Wähle einen Wrapper und starte die Konversation</div>
            </div>
          ) : (
            <>
              {messages.map(msg => (
                <MessageBubble key={msg.id} message={msg.content} isUser={msg.isUser} wrapper={msg.wrapper} latency={msg.latency} timestamp={msg.timestamp} isMobile={false} />
              ))}
              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 16 }}>
                  <div style={{ padding: '14px 18px', borderRadius: '18px 18px 18px 4px', background: 'linear-gradient(135deg, rgba(217,70,239,0.15), rgba(217,70,239,0.05))', border: '1px solid rgba(217,70,239,0.3)' }}>
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nachricht eingeben... (Enter zum Senden)"
              disabled={loading}
              style={{ flex: 1, padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: 14, fontFamily: 'system-ui, sans-serif', resize: 'none', minHeight: 50, maxHeight: 150, outline: 'none', boxShadow: input ? '0 0 20px rgba(0,212,255,0.2)' : 'none' }}
              rows={1}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} style={{
              padding: '14px 24px', borderRadius: 12, border: 'none',
              background: loading || !input.trim() ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #00d4ff, #00a8cc)',
              color: loading || !input.trim() ? 'rgba(255,255,255,0.3)' : '#030b15',
              fontWeight: 700, fontFamily: 'monospace', fontSize: 14,
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              boxShadow: loading || !input.trim() ? 'none' : '0 0 30px rgba(0,212,255,0.4)',
            }}>
              {loading ? '...' : '→'}
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GlassCard style={{ padding: 16, overflow: 'visible', position: 'relative', zIndex: 200 }}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 12, letterSpacing: 1 }}>📦 WRAPPER</div>
          <WrapperSelector wrappers={wrappers} selected={selectedWrapper} onSelect={setSelectedWrapper} isMobile={false} />
        </GlassCard>

        <GlassCard style={{ padding: 16 }}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 12, letterSpacing: 1 }}>⚙️ SETTINGS</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Max Tokens: <span style={{ color: '#00d4ff' }}>{maxTokens}</span></div>
            <input type="range" min={50} max={2000} value={maxTokens} onChange={(e) => setMaxTokens(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#00d4ff' }} />
          </div>
        </GlassCard>

        <GlassCard style={{ padding: 16, flex: 1 }}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginBottom: 12, letterSpacing: 1 }}>📊 SESSION</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#00d4ff', fontFamily: 'monospace' }}>{messages.filter(m => !m.isUser).length}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Responses</div>
            </div>
            <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#f59e0b', fontFamily: 'monospace' }}>{(messages.filter(m => m.latency).reduce((sum, m) => sum + (m.latency || 0), 0) / 1000).toFixed(1)}s</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Total Time</div>
            </div>
            <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#10b981', fontFamily: 'monospace' }}>
                {messages.filter(m => m.latency).length > 0 ? (messages.filter(m => m.latency).reduce((sum, m) => sum + (m.latency || 0), 0) / messages.filter(m => m.latency).length / 1000).toFixed(1) : '0'}s
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Avg Latency</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
```

---

## 📊 DATA PANEL (src/components/data/DataPanel.tsx)
```typescript
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useExport } from '@/hooks/useExport';
import ExportButton from '@/components/ui/ExportButton';
import { api, StatsResponse, StreamEvent } from '@/lib/api';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Scatter
} from 'recharts';

const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
};

const WRAPPER_COLORS: Record<string, string> = {
  'syntex_wrapper_sigma': '#f59e0b',
  'syntex_wrapper_human': '#10b981',
  'syntex_wrapper_deepsweep': '#d946ef',
  'syntex_wrapper_true_raw': '#ef4444',
  'syntex_wrapper_frontend': '#00d4ff',
};

function DataBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.02 }}>
        <defs>
          <pattern id="dataGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00d4ff" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dataGrid)" />
      </svg>
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4, height: 4,
          borderRadius: '50%',
          background: ['#00d4ff', '#d946ef', '#10b981'][i % 3],
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0.3,
          animation: `float ${8 + Math.random() * 10}s ease-in-out infinite`,
        }} />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}

function GlassCard({ children, title, icon, glowColor = '#00d4ff', span = 1, height }: any) {
  return (
    <div style={{
      gridColumn: `span ${span}`,
      borderRadius: 20,
      background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
      height: height || 'auto',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)` }} />
      {title && (
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,0.2)' }}>
          {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
          <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 11, color: glowColor, letterSpacing: 2 }}>{title}</h3>
        </div>
      )}
      <div style={{ padding: 20, height: height ? 'calc(100% - 60px)' : 'auto' }}>{children}</div>
    </div>
  );
}

function StatBox({ label, value, icon, color, suffix = '' }: any) {
  return (
    <div style={{
      padding: 20,
      background: `linear-gradient(135deg, ${color}10, ${color}05)`,
      border: `1px solid ${color}30`,
      borderRadius: 16,
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${color}15, transparent)` }} />
      <span style={{ fontSize: 28 }}>{icon}</span>
      <div style={{ fontSize: 36, fontWeight: 800, color, fontFamily: 'monospace', margin: '12px 0 6px' }}>{value}{suffix}</div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', letterSpacing: 1 }}>{label}</div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'rgba(10,26,46,0.98)', border: '1px solid rgba(0,212,255,0.4)', borderRadius: 12, padding: '14px 18px', boxShadow: '0 0 30px rgba(0,212,255,0.3)' }}>
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: 3, background: p.color }} />
          <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'white' }}>{p.name}: <strong style={{ color: p.color }}>{typeof p.value === 'number' ? p.value.toFixed(2) : p.value}</strong></span>
        </div>
      ))}
    </div>
  );
}

function ActivityHeatmap({ events }: { events: StreamEvent[] }) {
  const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const activity = React.useMemo(() => {
    const grid: number[][] = Array(7).fill(null).map(() => Array(24).fill(0));
    events.forEach(e => {
      const d = new Date(e.timestamp);
      grid[(d.getDay() + 6) % 7][d.getHours()]++;
    });
    return grid;
  }, [events]);
  const maxVal = Math.max(...activity.flat(), 1);

  return (
    <div style={{ display: 'flex', gap: 4 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 8 }}>
        {days.map(d => <div key={d} style={{ height: 16, fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }}>{d}</div>)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {activity.map((row, di) => (
          <div key={di} style={{ display: 'flex', gap: 2 }}>
            {row.map((val, hi) => (
              <div key={hi} style={{ width: 16, height: 16, borderRadius: 3, background: val === 0 ? 'rgba(255,255,255,0.03)' : `rgba(0, 212, 255, ${0.2 + (val / maxVal) * 0.8})` }} title={`${days[di]} ${hi}:00 - ${val}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveFeed({ events }: { events: StreamEvent[] }) {
  return (
    <div style={{ maxHeight: 300, overflow: 'auto' }}>
      {events.slice(0, 10).map((event, i) => (
        <div key={event.request_id + i} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
          background: i === 0 ? 'rgba(0,212,255,0.05)' : 'transparent',
          borderLeft: `3px solid ${WRAPPER_COLORS[event.wrapper_chain?.[0] as keyof typeof WRAPPER_COLORS] || '#00d4ff'}`,
          marginBottom: 4, borderRadius: '0 8px 8px 0',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: event.latency_ms ? '#10b981' : '#f59e0b' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'white' }}>{event.stage}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{event.request_id.slice(0, 8)}...</div>
          </div>
          {event.latency_ms && <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#f59e0b' }}>{(event.latency_ms / 1000).toFixed(1)}s</div>}
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>{new Date(event.timestamp).toLocaleTimeString('de-DE')}</div>
        </div>
      ))}
    </div>
  );
}

export default function DataPanel() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [statsData, streamData] = await Promise.all([api.getStats(), api.getStream(200)]);
      setStats(statsData);
      setEvents(streamData.events || []);
      setLastUpdate(new Date());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const latencyTimeline = React.useMemo(() => {
    const grouped = events.reduce((acc, event) => {
      if (!acc[event.request_id]) acc[event.request_id] = { id: event.request_id.slice(0, 8), timestamp: new Date(event.timestamp), latency: 0, wrapper: event.wrapper_chain?.[0] || 'unknown' };
      if (event.latency_ms) acc[event.request_id].latency = event.latency_ms / 1000;
      return acc;
    }, {} as Record<string, any>);
    return Object.values(grouped).sort((a: any, b: any) => a.timestamp - b.timestamp).slice(-20).map((d: any) => ({ ...d, time: d.timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) }));
  }, [events]);

  const wrapperPieData = React.useMemo(() => {
    if (!stats?.wrapper_usage) return [];
    return Object.entries(stats.wrapper_usage).map(([name, value]) => ({ name: name.replace('syntex_wrapper_', '').toUpperCase(), value, fullName: name }));
  }, [stats]);

  const latencyByWrapper = React.useMemo(() => {
    const grouped = latencyTimeline.reduce((acc: any, d: any) => {
      const name = d.wrapper?.replace('syntex_wrapper_', '').toUpperCase() || 'UNKNOWN';
      if (!acc[name]) acc[name] = { name, total: 0, count: 0 };
      acc[name].total += d.latency; acc[name].count += 1;
      return acc;
    }, {});
    return Object.values(grouped).map((d: any) => ({ name: d.name, avg: d.total / d.count, count: d.count }));
  }, [latencyTimeline]);

  const radarData = React.useMemo(() => latencyByWrapper.map(w => ({ wrapper: w.name, speed: Math.max(0, 100 - (w.avg * 2)), volume: w.count * 10 })), [latencyByWrapper]);

  const stageDistribution = React.useMemo(() => {
    const stages: Record<string, number> = {};
    events.forEach(e => { stages[e.stage] = (stages[e.stage] || 0) + 1; });
    return Object.entries(stages).map(([name, value]) => ({ name: name.replace(/^\d_/, ''), value }));
  }, [events]);

  if (loading) return <div style={{ position: 'relative', minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DataBackground /><div style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>LOADING...</div></div>;

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <DataBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, padding: '16px 20px', background: 'rgba(0,0,0,0.3)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 32 }}>📊</div>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 18, color: '#8b5cf6', letterSpacing: 3 }}>DATA COMMAND CENTER</h2>
              <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>Real-time Field Resonance Analytics</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ padding: '8px 16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#10b981' }}>LIVE</span>
            </div>
            {lastUpdate && <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>Updated: {lastUpdate.toLocaleTimeString('de-DE')}</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
          <StatBox label="Total Requests" value={stats?.total_requests || 0} icon="📡" color={COLORS.cyan} />
          <StatBox label="Success Rate" value={stats?.success_rate || 0} suffix="%" icon="✅" color={COLORS.green} />
          <StatBox label="Avg Latency" value={((stats?.average_latency_ms || 0) / 1000).toFixed(1)} suffix="s" icon="⚡" color={COLORS.orange} />
          <StatBox label="Wrappers" value={Object.keys(stats?.wrapper_usage || {}).length} icon="📦" color={COLORS.magenta} />
          <StatBox label="Events" value={events.length} icon="🌊" color={COLORS.purple} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
          <GlassCard title="Latency Timeline" icon="📈" glowColor={COLORS.cyan} height={350}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={latencyTimeline}>
                <defs><linearGradient id="latencyGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.4}/><stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickFormatter={(v) => `${v}s`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="latency" stroke={COLORS.cyan} strokeWidth={2} fill="url(#latencyGrad)" name="Latency (s)" />
                <Scatter dataKey="latency" fill={COLORS.cyan} />
              </ComposedChart>
            </ResponsiveContainer>
          </GlassCard>
          <GlassCard title="Wrapper Distribution" icon="🍩" glowColor={COLORS.magenta} height={350}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={wrapperPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={4} dataKey="value" stroke="none">
                  {wrapperPieData.map((entry, i) => <Cell key={i} fill={WRAPPER_COLORS[entry.fullName] || COLORS.cyan} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" formatter={(v) => <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', fontSize: 10 }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 24 }}>
          <GlassCard title="Latency by Wrapper" icon="📊" glowColor={COLORS.orange} height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latencyByWrapper} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="avg" name="Avg (s)" radius={[0, 8, 8, 0]}>{latencyByWrapper.map((e, i) => <Cell key={i} fill={WRAPPER_COLORS[`syntex_wrapper_${e.name.toLowerCase()}`] || COLORS.cyan} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
          <GlassCard title="Wrapper Performance" icon="🎯" glowColor={COLORS.purple} height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="wrapper" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                <Radar name="Speed" dataKey="speed" stroke={COLORS.cyan} fill={COLORS.cyan} fillOpacity={0.3} />
                <Radar name="Volume" dataKey="volume" stroke={COLORS.magenta} fill={COLORS.magenta} fillOpacity={0.3} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </GlassCard>
          <GlassCard title="Pipeline Stages" icon="🔄" glowColor={COLORS.green} height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={8} angle={-45} textAnchor="end" height={60} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Count" fill={COLORS.green} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          <GlassCard title="Activity Heatmap" icon="🗓️" glowColor={COLORS.cyan}><ActivityHeatmap events={events} /></GlassCard>
          <GlassCard title="Live Event Feed" icon="📡" glowColor={COLORS.green}><LiveFeed events={events} /></GlassCard>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
    </div>
  );
}```

---

## 🌊 FLOW PANEL (src/components/flow/FlowPanel.tsx)
```typescript
"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { api, StreamEvent } from '@/lib/api';
import { usePagination } from '@/hooks/usePagination';
import { useFilter } from '@/hooks/useFilter';
import { useExport } from '@/hooks/useExport';
import Pagination from '@/components/ui/Pagination';
import SortHeader from '@/components/ui/SortHeader';
import FilterBar from '@/components/ui/FilterBar';
import ExportButton from '@/components/ui/ExportButton';

const COLORS = { cyan: '#00d4ff', magenta: '#d946ef', green: '#10b981', orange: '#f59e0b', red: '#ef4444' };
const STAGE_CONFIG: Record<string, { color: string; icon: string }> = {
  '1_INCOMING': { color: COLORS.cyan, icon: '📥' },
  '2_WRAPPERS_LOADED': { color: COLORS.green, icon: '📦' },
  '3_FIELD_CALIBRATED': { color: COLORS.orange, icon: '⚡' },
  '4_BACKEND_FORWARD': { color: COLORS.magenta, icon: '🚀' },
  '5_RESPONSE': { color: COLORS.green, icon: '✅' },
};

interface RequestGroup {
  request_id: string;
  timestamp: Date;
  latency_ms: number;
  wrapper: string;
  stages: string[];
  prompt?: string;
  response?: string;
}

function FlowDetailModal({ requestId, onClose }: { requestId: string; onClose: () => void }) {
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.getHistory(requestId).then(setDetail).catch(console.error).finally(() => setLoading(false)); }, [requestId]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 900, maxHeight: '90vh', background: 'linear-gradient(135deg, #0a1a2e, #050b14)', borderRadius: 20, border: '1px solid rgba(0,212,255,0.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>🌊</span>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: COLORS.cyan }}>FIELD FLOW DETAIL</h2>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontFamily: 'monospace' }}>{requestId}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '8px 16px', color: 'white', cursor: 'pointer', fontFamily: 'monospace' }}>✕ CLOSE</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {loading ? <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.4)' }}>Loading...</div> : detail?.stages?.map((stage: any) => {
            const config = STAGE_CONFIG[stage.stage] || { color: COLORS.cyan, icon: '●' };
            return (
              <div key={stage.stage} style={{ marginBottom: 16, padding: 16, background: `${config.color}10`, border: `1px solid ${config.color}30`, borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>{config.icon}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 12, color: config.color, fontWeight: 700 }}>{stage.stage}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{new Date(stage.timestamp).toLocaleString('de-DE')}</span>
                </div>
                {stage.prompt && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 12, marginBottom: 8 }}><strong>Prompt:</strong> {stage.prompt}</div>}
                {stage.backend_url && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 12, marginBottom: 8 }}><strong>Backend:</strong> <span style={{ color: COLORS.magenta }}>{stage.backend_url}</span></div>}
                {stage.response && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 12, maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap' }}>{stage.response}</div>}
                {stage.latency_ms && <div style={{ marginTop: 8, fontSize: 11, color: COLORS.orange }}>⚡ {(stage.latency_ms/1000).toFixed(2)}s</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function FlowPanel() {
  const [allEvents, setAllEvents] = useState<StreamEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const { exportJSON, exportCSV } = useExport();

  const fetchData = useCallback(async () => {
    try { const data = await api.getStream(500); setAllEvents(data.events || []); } 
    catch (e) { console.error(e); } 
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); const interval = setInterval(fetchData, 10000); return () => clearInterval(interval); }, [fetchData]);

  const requestGroups = useMemo(() => {
    const grouped: Record<string, RequestGroup> = {};
    allEvents.forEach(event => {
      if (!grouped[event.request_id]) {
        grouped[event.request_id] = { request_id: event.request_id, timestamp: new Date(event.timestamp), latency_ms: 0, wrapper: event.wrapper_chain?.[0] || 'unknown', stages: [] };
      }
      if (!grouped[event.request_id].stages.includes(event.stage)) grouped[event.request_id].stages.push(event.stage);
      if (event.latency_ms) grouped[event.request_id].latency_ms = event.latency_ms;
      if (event.stage === '1_INCOMING' && event.prompt) grouped[event.request_id].prompt = event.prompt;
      if (event.stage === '5_RESPONSE' && event.response) grouped[event.request_id].response = event.response;
    });
    return Object.values(grouped);
  }, [allEvents]);

  const wrapperOptions = useMemo(() => [
    { value: 'all', label: 'All Wrappers' },
    ...[...new Set(requestGroups.map(r => r.wrapper))].map(w => ({ value: w, label: w.replace('syntex_wrapper_', '') }))
  ], [requestGroups]);

  const { filteredItems, searchQuery, setSearchQuery, filters, setFilter, clearFilters, activeFilterCount } = useFilter(requestGroups, { searchFields: ['prompt', 'response', 'request_id', 'wrapper'] });
  const finalFiltered = filteredItems.filter(r => !filters.wrapper || filters.wrapper === 'all' || r.wrapper === filters.wrapper);
  const { items: paginatedRequests, pagination, sorting, setPage, setPageSize, toggleSort } = usePagination(finalFiltered, 10, { key: 'timestamp', direction: 'desc' });

  const handleExportJSON = () => exportJSON(finalFiltered.map(r => ({ ...r, timestamp: r.timestamp.toISOString() })), 'syntx_flow');
  const handleExportCSV = () => exportCSV(finalFiltered.map(r => ({ ...r, timestamp: r.timestamp.toISOString(), stages: r.stages.join(', ') })), 'syntx_flow', [
    { key: 'request_id', label: 'Request ID' },
    { key: 'timestamp', label: 'Timestamp' },
    { key: 'wrapper', label: 'Wrapper' },
    { key: 'latency_ms', label: 'Latency (ms)' },
    { key: 'prompt', label: 'Prompt' },
    { key: 'response', label: 'Response' },
    { key: 'stages', label: 'Stages' },
  ]);

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>Loading Field Flow...</div>;

  return (
    <div style={{ background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🌊</span>
          <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 16, color: COLORS.cyan }}>FIELD FLOW</h2>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{requestGroups.length} Requests</span>
        </div>
        <ExportButton onExportJSON={handleExportJSON} onExportCSV={handleExportCSV} disabled={finalFiltered.length === 0} color={COLORS.cyan} />
      </div>

      <FilterBar searchQuery={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Search prompts, responses, IDs..." filters={[{ key: 'wrapper', label: 'Wrapper', options: wrapperOptions }]} filterValues={filters} onFilterChange={setFilter} onClear={clearFilters} activeCount={activeFilterCount} color={COLORS.cyan} />

      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 120px 100px 80px', gap: 8, padding: '12px 24px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <SortHeader label="Zeit" sortKey="timestamp" currentSort={sorting as any} onSort={toggleSort as any} />
        <SortHeader label="Prompt" sortKey="prompt" currentSort={sorting as any} onSort={toggleSort as any} />
        <SortHeader label="Wrapper" sortKey="wrapper" currentSort={sorting as any} onSort={toggleSort as any} />
        <SortHeader label="Latency" sortKey="latency_ms" currentSort={sorting as any} onSort={toggleSort as any} color={COLORS.orange} />
        <div style={{ padding: '8px 12px', fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>STAGES</div>
      </div>

      <div style={{ maxHeight: 500, overflow: 'auto' }}>
        {paginatedRequests.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>{activeFilterCount > 0 ? 'No results matching filters' : 'No requests yet'}</div>
        ) : paginatedRequests.map((req) => (
          <div key={req.request_id} onClick={() => setSelectedRequest(req.request_id)} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 120px 100px 80px', gap: 8, padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,212,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)' }}>{req.timestamp.toLocaleTimeString('de-DE')}</div>
            <div style={{ fontSize: 12, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{req.prompt || req.request_id.slice(0, 12) + '...'}</div>
            <div style={{ fontSize: 10, fontFamily: 'monospace', padding: '4px 8px', borderRadius: 6, background: COLORS.magenta + '20', color: COLORS.magenta, width: 'fit-content' }}>{req.wrapper.replace('syntex_wrapper_', '')}</div>
            <div style={{ fontSize: 12, fontFamily: 'monospace', color: COLORS.orange }}>{req.latency_ms ? `${(req.latency_ms / 1000).toFixed(1)}s` : '-'}</div>
            <div style={{ display: 'flex', gap: 4 }}>{req.stages.sort().map(s => <div key={s} style={{ width: 8, height: 8, borderRadius: '50%', background: STAGE_CONFIG[s]?.color || COLORS.cyan }} title={s} />)}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 24px 16px' }}><Pagination page={pagination.page} totalPages={pagination.totalPages} totalItems={pagination.totalItems} pageSize={pagination.pageSize} onPageChange={setPage} onPageSizeChange={setPageSize} /></div>
      {selectedRequest && <FlowDetailModal requestId={selectedRequest} onClose={() => setSelectedRequest(null)} />}
    </div>
  );
}
```

---

## 📈 STATS PANEL (src/components/analytics/StatsPanel.tsx)
```typescript
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useExport } from '@/hooks/useExport';
import ExportButton from '@/components/ui/ExportButton';
import { api, StatsResponse, StreamEvent, TrainingRequest } from '@/lib/api';
import { usePagination } from '@/hooks/usePagination';
import Pagination from '@/components/ui/Pagination';
import SortHeader from '@/components/ui/SortHeader';

const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
};

// ═══════════════════════════════════════════════════════════════
// FLOW DETAIL MODAL
// ═══════════════════════════════════════════════════════════════
function FlowDetailModal({ requestId, onClose }: { requestId: string; onClose: () => void }) {
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHistory(requestId).then(setDetail).catch(console.error).finally(() => setLoading(false));
  }, [requestId]);

  const STAGE_CONFIG: Record<string, { color: string; icon: string }> = {
    '1_INCOMING': { color: COLORS.cyan, icon: '📥' },
    '2_WRAPPERS_LOADED': { color: COLORS.green, icon: '📦' },
    '3_FIELD_CALIBRATED': { color: COLORS.orange, icon: '⚡' },
    '4_BACKEND_FORWARD': { color: COLORS.magenta, icon: '🚀' },
    '5_RESPONSE': { color: COLORS.green, icon: '✅' },
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 900, maxHeight: '90vh', background: 'linear-gradient(135deg, #0a1a2e, #050b14)', borderRadius: 20, border: '1px solid rgba(0,212,255,0.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>🌊</span>
            <div>
              <h2 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: COLORS.cyan }}>FIELD FLOW DETAIL</h2>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontFamily: 'monospace' }}>{requestId}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '8px 16px', color: 'white', cursor: 'pointer', fontFamily: 'monospace' }}>✕ CLOSE</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {loading ? <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.4)' }}>Loading...</div> : detail?.stages?.map((stage: any) => {
            const config = STAGE_CONFIG[stage.stage] || { color: COLORS.cyan, icon: '●' };
            return (
              <div key={stage.stage} style={{ marginBottom: 16, padding: 16, background: `${config.color}10`, border: `1px solid ${config.color}30`, borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>{config.icon}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 12, color: config.color, fontWeight: 700 }}>{stage.stage}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{new Date(stage.timestamp).toLocaleString('de-DE')}</span>
                </div>
                {stage.prompt && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 12, marginBottom: 8 }}><strong>Prompt:</strong> {stage.prompt}</div>}
                {stage.backend_url && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 12, marginBottom: 8 }}><strong>Backend:</strong> <span style={{ color: COLORS.magenta }}>{stage.backend_url}</span></div>}
                {stage.params && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 11, marginBottom: 8 }}><strong>Params:</strong> <pre style={{ margin: '8px 0 0', color: COLORS.cyan }}>{JSON.stringify(stage.params, null, 2)}</pre></div>}
                {stage.response && <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, fontSize: 12, maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap' }}>{stage.response}</div>}
                {stage.latency_ms && <div style={{ marginTop: 8, fontSize: 11, color: COLORS.orange }}>⚡ {(stage.latency_ms/1000).toFixed(2)}s</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function StatsPanel() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [streamEvents, setStreamEvents] = useState<StreamEvent[]>([]);
  const [trainingData, setTrainingData] = useState<TrainingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'stream' | 'training'>('stream');

  const fetchData = useCallback(async () => {
    try {
      const [statsData, streamData, training] = await Promise.all([
        api.getStats(),
        api.getStream(200),
        api.getTraining(200),
      ]);
      setStats(statsData);
      setStreamEvents(streamData.events || []);
      setTrainingData(training.requests || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Pagination for stream events
  const streamPagination = usePagination(streamEvents, 10, { key: 'timestamp' as keyof StreamEvent, direction: 'desc' });
  
  // Pagination for training data
  const trainingPagination = usePagination(trainingData, 10);

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Total Requests', value: stats?.total_requests || 0, icon: '📡', color: COLORS.cyan },
          { label: 'Success Rate', value: `${stats?.success_rate || 0}%`, icon: '✅', color: COLORS.green },
          { label: 'Avg Latency', value: `${((stats?.average_latency_ms || 0) / 1000).toFixed(1)}s`, icon: '⚡', color: COLORS.orange },
          { label: 'Active Wrappers', value: Object.keys(stats?.wrapper_usage || {}).length, icon: '📦', color: COLORS.magenta },
        ].map((stat) => (
          <div key={stat.label} style={{
            padding: 20,
            background: `linear-gradient(135deg, ${stat.color}10, ${stat.color}05)`,
            border: `1px solid ${stat.color}30`,
            borderRadius: 16,
          }}>
            <span style={{ fontSize: 28 }}>{stat.icon}</span>
            <div style={{ fontSize: 32, fontWeight: 800, color: stat.color, fontFamily: 'monospace', margin: '12px 0 6px' }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Section Toggle */}
      <div style={{ display: 'flex', gap: 8 }}>
        {(['stream', 'training'] as const).map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              border: `1px solid ${activeSection === section ? COLORS.cyan : 'rgba(255,255,255,0.1)'}`,
              background: activeSection === section ? COLORS.cyan + '20' : 'transparent',
              color: activeSection === section ? COLORS.cyan : 'rgba(255,255,255,0.5)',
              fontFamily: 'monospace',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            {section === 'stream' ? '🌊 FIELD STREAM' : '📚 TRAINING DATA'}
          </button>
        ))}
      </div>

      {/* Stream Events Section */}
      {activeSection === 'stream' && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>🌊</span>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: COLORS.cyan }}>FIELD STREAM</h3>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{streamEvents.length} events</span>
            </div>
          </div>
          
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '100px 100px 1fr 100px', gap: 8, padding: '12px 24px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <SortHeader label="Zeit" sortKey="timestamp" currentSort={streamPagination.sorting as any} onSort={streamPagination.toggleSort as any} />
            <SortHeader label="Stage" sortKey="stage" currentSort={streamPagination.sorting as any} onSort={streamPagination.toggleSort as any} />
            <div style={{ padding: '8px 12px', fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>REQUEST ID</div>
            <SortHeader label="Latency" sortKey="latency_ms" currentSort={streamPagination.sorting as any} onSort={streamPagination.toggleSort as any} color={COLORS.orange} />
          </div>

          {/* Rows */}
          <div style={{ maxHeight: 400, overflow: 'auto' }}>
            {streamPagination.items.map((event, i) => (
              <div
                key={event.request_id + event.stage + i}
                onClick={() => setSelectedRequest(event.request_id)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 100px 1fr 100px',
                  gap: 8,
                  padding: '12px 24px',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,212,255,0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>
                  {new Date(event.timestamp).toLocaleTimeString('de-DE')}
                </div>
                <div style={{ fontSize: 10, fontFamily: 'monospace', color: COLORS.green }}>{event.stage}</div>
                <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {event.request_id.slice(0, 20)}...
                </div>
                <div style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.orange }}>
                  {event.latency_ms ? `${(event.latency_ms / 1000).toFixed(1)}s` : '-'}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '0 24px 16px' }}>
            <Pagination
              page={streamPagination.pagination.page}
              totalPages={streamPagination.pagination.totalPages}
              totalItems={streamPagination.pagination.totalItems}
              pageSize={streamPagination.pagination.pageSize}
              onPageChange={streamPagination.setPage}
              onPageSizeChange={streamPagination.setPageSize}
            />
          </div>
        </div>
      )}

      {/* Training Data Section */}
      {activeSection === 'training' && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>📚</span>
              <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: 14, color: COLORS.magenta }}>TRAINING DATA</h3>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{trainingData.length} entries</span>
            </div>
          </div>

          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 100px', gap: 8, padding: '12px 24px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <SortHeader label="Wrapper" sortKey="wrapper_chain" currentSort={trainingPagination.sorting as any} onSort={trainingPagination.toggleSort as any} color={COLORS.magenta} />
            <div style={{ padding: '8px 12px', fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>RESPONSE</div>
            <SortHeader label="Latency" sortKey="latency_ms" currentSort={trainingPagination.sorting as any} onSort={trainingPagination.toggleSort as any} color={COLORS.orange} />
          </div>

          {/* Rows */}
          <div style={{ maxHeight: 400, overflow: 'auto' }}>
            {trainingPagination.items.map((entry, i) => (
              <div
                key={entry.request_id + i}
                onClick={() => setSelectedRequest(entry.request_id)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr 100px',
                  gap: 8,
                  padding: '14px 24px',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(217,70,239,0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  fontSize: 10,
                  fontFamily: 'monospace',
                  padding: '4px 8px',
                  borderRadius: 6,
                  background: COLORS.magenta + '20',
                  color: COLORS.magenta,
                  width: 'fit-content',
                }}>
                  {entry.wrapper_chain?.[0]?.replace('syntex_wrapper_', '') || 'unknown'}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {entry.response?.slice(0, 100)}...
                </div>
                <div style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.orange }}>
                  {entry.latency_ms ? `${(entry.latency_ms / 1000).toFixed(1)}s` : '-'}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '0 24px 16px' }}>
            <Pagination
              page={trainingPagination.pagination.page}
              totalPages={trainingPagination.pagination.totalPages}
              totalItems={trainingPagination.pagination.totalItems}
              pageSize={trainingPagination.pagination.pageSize}
              onPageChange={trainingPagination.setPage}
              onPageSizeChange={trainingPagination.setPageSize}
            />
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedRequest && (
        <FlowDetailModal requestId={selectedRequest} onClose={() => setSelectedRequest(null)} />
      )}
    </div>
  );
}
```

---

## 🔄 REALTIME HOOK (src/hooks/useRealtime.ts)
```typescript
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { api, StreamEvent, StatsResponse } from '@/lib/api';

interface RealtimeState {
  events: StreamEvent[];
  stats: StatsResponse | null;
  lastUpdate: Date | null;
  isLive: boolean;
  newEventCount: number;
  hasNewData: boolean;
}

export function useRealtime(interval = 5000) {
  const [state, setState] = useState<RealtimeState>({
    events: [],
    stats: null,
    lastUpdate: null,
    isLive: false,
    newEventCount: 0,
    hasNewData: false,
  });
  
  const prevEventsRef = useRef<string[]>([]);
  const [pulse, setPulse] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [streamData, statsData] = await Promise.all([
        api.getStream(50),
        api.getStats(),
      ]);

      const newEvents = streamData.events || [];
      const newEventIds = newEvents.map(e => e.request_id);
      
      // Check for new events
      const brandNewCount = newEventIds.filter(
        id => !prevEventsRef.current.includes(id)
      ).length;

      if (brandNewCount > 0 && prevEventsRef.current.length > 0) {
        setPulse(true);
        setTimeout(() => setPulse(false), 1000);
      }

      prevEventsRef.current = newEventIds;

      setState(prev => ({
        events: newEvents,
        stats: statsData,
        lastUpdate: new Date(),
        isLive: true,
        newEventCount: brandNewCount,
        hasNewData: brandNewCount > 0,
      }));

    } catch (error) {
      console.error('Realtime fetch error:', error);
      setState(prev => ({ ...prev, isLive: false }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, interval);
    return () => clearInterval(timer);
  }, [fetchData, interval]);

  return { ...state, pulse, refresh: fetchData };
}

export function useRealtimeHealth(interval = 10000) {
  const [health, setHealth] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const data = await api.getHealth();
        setHealth(data);
        setIsOnline(data?.status?.includes('GESUND') || data?.status === 'healthy');
      } catch {
        setIsOnline(false);
      }
    };
    
    check();
    const timer = setInterval(check, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return { health, isOnline };
}
```

---

## 📊 STATISTIKEN

Total TSX/TS Files: 55
Total Lines of Code:   7600 total
