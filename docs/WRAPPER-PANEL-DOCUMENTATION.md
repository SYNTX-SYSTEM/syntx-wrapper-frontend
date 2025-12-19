# 📦 SYNTX WRAPPER PANEL - VOLLSTÄNDIGE DOKUMENTATION
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║   📦 WRAPPER PANEL - SYNTX ULTRA v7.0                                        ║
║   ═══════════════════════════════════════════════════════════════════════    ║
║   SEMANTIC INJECTION OS | FORMAT FUSION | LIVE PROMPT PREVIEW                ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

---

## 📋 INHALTSVERZEICHNIS

1. [Überblick](#-überblick)
2. [Architektur](#-architektur)
3. [Datei-Struktur](#-datei-struktur)
4. [Komponenten](#-komponenten)
5. [Format Fusion Editor](#-format-fusion-editor)
6. [API Endpoints](#-api-endpoints)
7. [Types & Interfaces](#-types--interfaces)
8. [Datenfluss](#-datenfluss)
9. [Features im Detail](#-features-im-detail)

---

## 🎯 ÜBERBLICK

### Was ist das Wrapper Panel?

Das **Wrapper Panel** ist die zentrale Steuereinheit für **semantische Injektionsmodule** im SYNTX-System. Wrapper definieren das **Verhalten** der AI - wie sie antwortet, in welchem Stil, mit welcher Tiefe.

### Das SYNTX Prinzip
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   WRAPPER (Verhalten) + FORMAT (Struktur) = FINALER PROMPT     │
│        📦                   📋                   🔥              │
│                                                                 │
│   "Du bist ein rekursives    "### DRIFTKORPER:    Was die AI   │
│    Diagnosesystem..."    +    ### KALIBRIERUNG:"  = wirklich   │
│                               ### STROMUNG:"        sieht      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Kernfunktionen

| Funktion | Beschreibung | Modal |
|----------|--------------|-------|
| **GEBÄREN** | Neuen Wrapper erstellen | CreateModal |
| **VIEW** | Wrapper-Details + Content | ViewModal |
| **EDIT** | Wrapper bearbeiten + Format Fusion | EditModal |
| **STATS** | Wrapper Statistiken | StatsModal |
| **AKTIV** | Wrapper live schalten | Inline |
| **DELETE** | Wrapper löschen | DeleteModal |

### Screenshot-Referenz
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  📦 WRAPPER CONTROL                                                        │
│  ● 14 Wrapper  │  ● 1 aktiv  │  ⚡ 15.2 KB total                           │
│                                                                             │
│  🔍 [Wrapper suchen...]                              [🌟 GEBÄREN]          │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐ │
│  │ 📦 SIGMA              │  │ 📦 DEEPSWEEP          │  │ 📦 HUMAN        │ │
│  │    1.5 KB | 1,536 bytes│  │    2.0 KB | 2,048 bytes│  │    1.3 KB      │ │
│  │                       │  │                       │  │                 │ │
│  │ ┌─────────────────┐   │  │ ┌─────────────────┐   │  │ ┌─────────────┐ │ │
│  │ │📋 SIGMA_ANALYSIS│   │  │ │📋 SYNTX_TRUE_RAW│   │  │ │📋 HUMAN_READ│ │ │
│  │ │     LINKED      │   │  │ │     LINKED      │   │  │ │   LINKED    │ │ │
│  │ └─────────────────┘   │  │ └─────────────────┘   │  │ └─────────────┘ │ │
│  │                       │  │                       │  │                 │ │
│  │ 📅 Mod: 3.12.2025     │  │ 📅 Mod: 7.12.2025     │  │ 📅 Mod: 3.12.25│ │
│  │ ⚡ ~375 tokens        │  │ ⚡ ~512 tokens        │  │ ⚡ ~325 tokens  │ │
│  │                       │  │                       │  │                 │ │
│  │[VIEW][STATS][EDIT]    │  │[VIEW][STATS][EDIT]    │  │[VIEW][STATS]   │ │
│  │[🎯 AKTIV]        [💀] │  │[🎯 AKTIV]        [💀] │  │[EDIT][AKTIV]💀│ │
│  │                       │  │                       │  │                 │ │
│  │ 🔥 | 🎯 | 📋 | ⚡     │  │ 🔥 | 💤 | 📋 | ⚡     │  │ ✅ | 💤 | 📋 |⚡│ │
│  └───────────────────────┘  └───────────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ ARCHITEKTUR

### Komponenten-Hierarchie
```
┌─────────────────────────────────────────────────────────────────┐
│                      WrapperPanel.tsx                           │
│                     (Hauptkomponente)                           │
│                        280 Zeilen                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │ types.ts    │ │ styles.ts   │ │ index.ts    │               │
│  │ Interfaces  │ │ Animations  │ │ Exports     │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                        modals/                                  │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │CreateModal  │ │ ViewModal   │ │ EditModal   │               │
│  │   126 LOC   │ │   92 LOC    │ │   250 LOC   │               │
│  │Live Preview │ │Content View │ │FORMAT FUSION│               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐                               │
│  │ StatsModal  │ │DeleteModal  │                               │
│  │   84 LOC    │ │   76 LOC    │                               │
│  │  Latency    │ │  Confirm    │                               │
│  └─────────────┘ └─────────────┘                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Architektur-Prinzipien (SYNTX-Style)

| Prinzip | Umsetzung |
|---------|-----------|
| **Separation of Concerns** | Jedes Modal = Eine Verantwortung |
| **Format Fusion** | Wrapper + Format = Finaler Prompt |
| **Live Preview** | Echtzeit-Vorschau was AI sieht |
| **Semantic Binding** | Wrapper kennt sein Format |

---

## 📂 DATEI-STRUKTUR
```
src/components/wrappers/
│
├── WrapperPanel.tsx         # 🎯 Hauptkomponente
│   │                        # - State Management
│   │                        # - API Calls
│   │                        # - Grid Rendering
│   │                        # - Modal Orchestrierung
│   │                        # - Format Binding Logic
│   │
├── types.ts                 # 🔷 TypeScript Definitionen
│   │                        # - Wrapper
│   │                        # - WrapperDetail
│   │                        # - WrapperStats
│   │                        # - COLORS Konstanten
│   │                        # - Helper Functions
│   │
├── styles.ts                # 🎨 CSS Animationen
│   │                        # - @keyframes
│   │                        # - .wrapper-card
│   │                        # - .cyber-btn
│   │                        # - .scan-line
│   │
├── index.ts                 # 📦 Barrel Export
│   │
└── modals/
    │
    ├── CreateModal.tsx      # 🌟 Wrapper erstellen
    │                        # - Name + Content Input
    │                        # - Author + Description
    │                        # - Live Preview (2-Spalten)
    │                        # - Size/Lines/KB Stats
    │
    ├── ViewModal.tsx        # 👁️ Wrapper Details
    │                        # - Full Content Preview
    │                        # - Stats (Size, Lines, Date)
    │                        # - Quick Actions (Edit, Activate)
    │
    ├── EditModal.tsx        # 🔥 FORMAT FUSION EDITOR
    │                        # - 3-Spalten Layout
    │                        # - Wrapper Content Editor
    │                        # - Format Dropdown
    │                        # - Feld Toggle + Weights
    │                        # - Preview Modes (Wrapper/Format/Combined)
    │                        # - FINALER PROMPT Preview
    │                        # - Token-Schätzung
    │
    ├── StatsModal.tsx       # 📊 Wrapper Statistiken
    │                        # - Total Requests
    │                        # - Success Rate
    │                        # - Latency (Min/Median/Max)
    │                        # - Performance Rating
    │
    ├── DeleteModal.tsx      # 💀 Wrapper löschen
    │                        # - Name Confirmation
    │                        # - Active Warning
    │
    └── index.ts             # Barrel Export für Modals
```

---

## 🧩 KOMPONENTEN

### WrapperPanel.tsx (Hauptkomponente)

**Verantwortung:** Orchestrierung aller Wrapper-Operationen
```typescript
// State Management
const [wrappers, setWrappers] = useState<Wrapper[]>([]);
const [activeWrapper, setActiveWrapper] = useState<string>('');
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState('');

// Format Binding
const [wrapperFormats, setWrapperFormats] = useState<Record<string, string>>({});

// Modal States
const [createOpen, setCreateOpen] = useState(false);
const [viewWrapper, setViewWrapper] = useState<WrapperDetail | null>(null);
const [editWrapper, setEditWrapper] = useState<WrapperDetail | null>(null);
const [statsWrapper, setStatsWrapper] = useState<Wrapper | null>(null);
const [deleteWrapper, setDeleteWrapper] = useState<Wrapper | null>(null);
```

**Render-Struktur:**
```
WrapperPanel
├── <style>{cyberStyles}</style>
├── Header
│   ├── Icon + Titel
│   ├── Status (Anzahl, Aktiv, Total Size)
│   └── Search + GEBÄREN Button
├── Loading/Error/Empty States
├── Wrapper Grid
│   └── Wrapper Cards (map)
│       ├── Header (Name, Size, Bytes)
│       ├── FORMAT BINDING Box (NEU!)
│       ├── Meta Bar (Datum, Tokens)
│       ├── Actions (VIEW, STATS, EDIT, AKTIV, 💀)
│       └── Quick Stats Bar (Size/Status/Format/Ready)
└── Modals
    ├── <CreateModal />
    ├── <ViewModal />
    ├── <EditModal />  ← FORMAT FUSION!
    ├── <StatsModal />
    └── <DeleteModal />
```

---

## 🔥 FORMAT FUSION EDITOR

### Das Herzstück: EditModal mit 3-Spalten Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🔄 WRAPPER MODULIEREN                              [Wrapper|Format|🔥Combined]
│     syntex_wrapper_deepsweep                                           ✕    │
├───────────────────────────┬─────────────────────┬───────────────────────────┤
│                           │                     │                           │
│  📦 WRAPPER CONTENT       │  📋 FORMAT INJECTION│  🔥 FINALER PROMPT        │
│  ─────────────────────    │  ─────────────────  │  ─────────────────────    │
│                           │                     │                           │
│  # DEEPSWEEP WRAPPER      │  [▼ SYNTX_TRUE_RAW ]│  # DEEPSWEEP WRAPPER      │
│                           │                     │  (cyan)                   │
│  Du bist ein rekursives   │  🎯 FELDER (3/11)   │                           │
│  semantisches Diagnose-   │                     │  Du bist ein rekursives   │
│  system, das Driftkörper  │  ☑ driftkorper [33]│  semantisches Diagnose... │
│  auf allen TIER-Ebenen    │  ☑ kalibrierung[34]│                           │
│  analysiert.              │  ☑ stromung    [33]│  // ═══════════════════   │
│                           │  ☐ tier        [17]│  // 📋 FORMAT INJECTION   │
│  WICHTIG: Deine Antwort   │  ☐ resonanz    [17]│  // ═══════════════════   │
│  MUSS EXAKT in diesem     │  ...               │  (magenta)                │
│  Format sein:             │                     │                           │
│                           │  ┌───────┬───────┐ │  WICHTIG: Deine Antwort   │
│  ### Driftkörperanalyse:  │  │  893  │  100  │ │  MUSS EXAKT in diesem     │
│                           │  │ CHARS │WEIGHT │ │  Format sein:             │
│  **TIER-1 (Oberfläche):** │  └───────┴───────┘ │                           │
│  ...                      │                     │  ### DRIFTKORPER:         │
│                           │                     │  [Analyse...] (w:33)      │
│  18 Zeilen                │                     │                           │
│                           │                     │  ### KALIBRIERUNG:        │
│                           │                     │  [Analyse...] (w:34)      │
│                           │                     │                           │
│                           │                     │  ┌────┬────┬────┬─────┐   │
│                           │                     │  │ 18 │ 3  │ 35 │~223 │   │
│                           │                     │  │WRAP│FELD│TOT │TOKEN│   │
│                           │                     │  └────┴────┴────┴─────┘   │
├───────────────────────────┴─────────────────────┴───────────────────────────┤
│  📦 0.5 KB → 0.5 KB  │  📋 SYNTX_TRUE_RAW (3 Felder)  [ABBRECHEN][🔄 MODULIEREN]
└─────────────────────────────────────────────────────────────────────────────┘
```

### Preview Modes

| Mode | Zeigt | Farbe |
|------|-------|-------|
| **Wrapper** | Nur Wrapper Content | Cyan |
| **Format** | Nur Format Injection | Magenta |
| **Combined** | 🔥 FINALER PROMPT - Was AI wirklich sieht | Grün |

### Format Injection Generator
```typescript
const generateFormatInjection = () => {
  let injection = '\n\n// ═══════════════════════════════════════\n';
  injection += `// 📋 FORMAT INJECTION: ${selectedFormat.toUpperCase()}\n`;
  injection += '// ═══════════════════════════════════════\n\n';
  injection += 'WICHTIG: Deine Antwort MUSS EXAKT in diesem Format sein:\n\n';
  
  enabledFields.forEach(field => {
    injection += `### ${field.name.toUpperCase()}:\n`;
    injection += `[Deine Analyse zu ${field.name}... (Weight: ${field.weight})]\n\n`;
  });
  
  return injection;
};

const getCombinedPrompt = () => {
  return wrapperContent + generateFormatInjection();
};
```

---

## 🔌 API ENDPOINTS

### Wrapper Endpoints

| Methode | Endpoint | Beschreibung | Request | Response |
|---------|----------|--------------|---------|----------|
| `GET` | `/api/resonanz/wrappers` | Liste aller Wrapper | - | `WrapperListResponse` |
| `GET` | `/api/resonanz/wrapper/{name}` | Wrapper Details + Content | - | `WrapperDetailResponse` |
| `POST` | `/api/resonanz/wrapper` | Wrapper erstellen | `WrapperCreateRequest` | `WrapperResponse` |
| `PUT` | `/api/resonanz/wrapper/{name}` | Wrapper updaten | `WrapperUpdateRequest` | `WrapperResponse` |
| `DELETE` | `/api/resonanz/wrapper/{name}` | Wrapper löschen | - | `DeleteResponse` |
| `POST` | `/api/resonanz/wrappers/{name}/activate` | Wrapper aktivieren | - | `ActivateResponse` |
| `GET` | `/api/resonanz/stats/wrapper/{name}` | Wrapper Stats | - | `WrapperStatsResponse` |

### Request/Response Beispiele

**GET /api/resonanz/wrappers**
```json
{
  "wrappers": [
    {
      "name": "syntex_wrapper_sigma",
      "path": "/wrappers/sigma.txt",
      "size_bytes": 1536,
      "size_human": "1.5 KB",
      "last_modified": "2025-12-03T14:30:00Z",
      "is_active": true
    }
  ],
  "active_wrapper": "syntex_wrapper_sigma"
}
```

**GET /api/resonanz/wrapper/syntex_wrapper_sigma**
```json
{
  "name": "syntex_wrapper_sigma",
  "content": "# SIGMA WRAPPER\n\nDu bist ein SIGMA-Analysesystem...",
  "size_bytes": 1536,
  "size_human": "1.5 KB",
  "last_modified": "2025-12-03T14:30:00Z",
  "is_active": true
}
```

**POST /api/resonanz/wrapper**
```json
// Request
{
  "name": "my_new_wrapper",
  "content": "# MY WRAPPER\n\nDu bist...",
  "description": "Beschreibung",
  "author": "SYNTX"
}

// Response
{
  "success": true,
  "wrapper": {
    "name": "my_new_wrapper",
    "size_bytes": 512,
    "size_human": "0.5 KB"
  }
}
```

**GET /api/resonanz/stats/wrapper/syntex_wrapper_sigma**
```json
{
  "wrapper": "syntex_wrapper_sigma",
  "requests": 1250,
  "success_rate": 98.5,
  "average_latency_ms": 245,
  "median_latency_ms": 220,
  "min_latency_ms": 89,
  "max_latency_ms": 1250
}
```

---

## 🔷 TYPES & INTERFACES

### types.ts
```typescript
// ═══════════════════════════════════════════════════════════════
// 🔷 WRAPPER INTERFACES
// ═══════════════════════════════════════════════════════════════

export interface Wrapper {
  name: string;
  path?: string;
  size_bytes: number;
  size_human: string;
  last_modified: string;
  is_active: boolean;
  description?: string;
  author?: string;
}

export interface WrapperDetail {
  name: string;
  content: string;
  size_bytes: number;
  size_human: string;
  last_modified: string;
  is_active: boolean;
  description?: string;
  author?: string;
}

export interface WrapperStats {
  wrapper: string;
  requests: number;
  success_rate: number;
  average_latency_ms: number;
  median_latency_ms: number;
  min_latency_ms: number;
  max_latency_ms: number;
}

// ═══════════════════════════════════════════════════════════════
// 🎨 KONSTANTEN
// ═══════════════════════════════════════════════════════════════

export const COLORS = {
  cyan: '#00d4ff',
  magenta: '#d946ef',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
  teal: '#14b8a6',
  pink: '#ec4899',
  lime: '#84cc16',
  yellow: '#eab308',
} as const;

// ═══════════════════════════════════════════════════════════════
// 🛠️ HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export const getWrapperColor = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('human')) return COLORS.green;
  if (n.includes('sigma')) return COLORS.orange;
  if (n.includes('deepsweep')) return COLORS.magenta;
  if (n.includes('true_raw')) return COLORS.red;
  if (n.includes('universal')) return COLORS.purple;
  if (n.includes('frontend')) return COLORS.cyan;
  if (n.includes('backend')) return COLORS.teal;
  // Hash-basiert für andere
  const hash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const keys = Object.keys(COLORS) as (keyof typeof COLORS)[];
  return COLORS[keys[hash % keys.length]];
};

export const formatDate = (dateStr: string): string => {
  try {
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  } catch { return dateStr; }
};
```

---

## 🔄 DATENFLUSS

### Wrapper Editieren mit Format Fusion
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   User      │     │  EditModal  │     │ WrapperPanel│
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │ Klickt EDIT       │                   │
       │──────────────────────────────────────>│
       │                   │                   │
       │                   │ openEdit(wrapper) │
       │                   │<──────────────────│
       │                   │                   │
       │                   │ api.getWrapper()  │
       │                   │ api.getFormats()  │
       │                   │──────────────────>│ (parallel)
       │                   │                   │
       │ Modal öffnet      │                   │
       │<──────────────────│                   │
       │                   │                   │
       │ Wählt Format      │                   │
       │──────────────────>│                   │
       │                   │                   │
       │                   │ loadFormatFields()│
       │                   │──────────────────>│
       │                   │                   │
       │ Toggles Felder    │                   │
       │──────────────────>│                   │
       │                   │                   │
       │ Live Preview      │                   │
       │ (FINALER PROMPT)  │                   │
       │<──────────────────│                   │
       │                   │                   │
       │ Klickt MODULIEREN │                   │
       │──────────────────>│                   │
       │                   │ onSave(content)   │
       │                   │──────────────────>│
       │                   │                   │
       │                   │ api.updateWrapper()
       │                   │──────────────────>│
       │                   │                   │
       │ Modal schließt    │ fetchWrappers()   │
       │<──────────────────│──────────────────>│
```

---

## ✨ FEATURES IM DETAIL

### 1. Format Binding auf Cards

Jede Wrapper Card zeigt das **gebundene Format**:
```
┌─────────────────────────────────┐
│ 📋 GEBUNDENES FORMAT            │
│ SIGMA_ANALYSIS          LINKED  │
└─────────────────────────────────┘
```

### 2. Token-Schätzung
```typescript
// Geschätzte Tokens = Bytes / 4
const estimatedTokens = Math.round(wrapper.size_bytes / 4);
```

### 3. Quick Stats Bar

Visuelle Icons für schnelle Übersicht:

| Icon | Bedeutung |
|------|-----------|
| 🔥 | Großer Wrapper (>1.5KB) |
| ✅ | Mittlerer Wrapper (>0.8KB) |
| 💡 | Kleiner Wrapper |
| 🎯 | Aktiv |
| 💤 | Inaktiv |
| 📋 | Hat Format Binding |
| ⚡ | Ready |

### 4. Performance Rating (Stats Modal)
```typescript
const rating = stats.success_rate >= 95 
  ? '🔥 EXCELLENT PERFORMANCE' 
  : stats.success_rate >= 80 
    ? '✅ GOOD PERFORMANCE' 
    : '⚠️ NEEDS ATTENTION';
```

### 5. Delete Confirmation

Erfordert Eingabe des exakten Wrapper-Namens:
```
Tippe "syntex_wrapper_sigma" zur Bestätigung
┌────────────────────────────────────┐
│ syntex_wrapper_sigma               │
└────────────────────────────────────┘
```

---

## 📊 METRIKEN

| Metrik | Wert |
|--------|------|
| **Gesamt LOC** | ~900 |
| **WrapperPanel.tsx** | 280 LOC |
| **CreateModal.tsx** | 126 LOC |
| **ViewModal.tsx** | 92 LOC |
| **EditModal.tsx** | 250 LOC |
| **StatsModal.tsx** | 84 LOC |
| **DeleteModal.tsx** | 76 LOC |
| **types.ts** | 70 LOC |
| **styles.ts** | 26 LOC |

---

## 🔥 DAS SYNTX PRINZIP
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║   "Du hast ein visuelles Injektionsbetriebssystem für Sprachmodelle gebaut"  ║
║                                                                               ║
║   WRAPPER (Verhalten)  +  FORMAT (Struktur)  =  FINALER PROMPT               ║
║        📦                      📋                     🔥                      ║
║                                                                               ║
║   • Semantische Protokolle (Formate)                                         ║
║   • Feldbasierte Kontrollstrukturen (Wrapper)                                ║
║   • KI-taugliche Maschinen-Frames (Promptmaps)                               ║
║   • Echtzeitsteuerung für Modulation, Switch, Tokenlast                      ║
║                                                                               ║
║   Du klickst auf "AKTIV" und schaltest das Sprachsystem um.                  ║
║   Wie andere Leute Tabs.                                                     ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

---
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║   📦 WRAPPER PANEL - DOKUMENTATION ENDE                                      ║
║   ═══════════════════════════════════════════════════════════════════════    ║
║   SEMANTIC INJECTION OS | VERSION 7.0 | RESONANZ: MAXIMUM                    ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```
