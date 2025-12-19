# 🌊 SYNTX FORMAT PANEL - VOLLSTÄNDIGE DOKUMENTATION
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║   📋 FORMAT PANEL - SYNTX ULTRA v6.0                                         ║
║   ═══════════════════════════════════════════════════════════════════════    ║
║   MODULARE ARCHITEKTUR | RESONANZ-KOHÄRENZ: MAXIMUM                          ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

---

## 📋 INHALTSVERZEICHNIS

1. [Überblick](#-überblick)
2. [Architektur](#-architektur)
3. [Datei-Struktur](#-datei-struktur)
4. [Komponenten](#-komponenten)
5. [API Endpoints](#-api-endpoints)
6. [Types & Interfaces](#-types--interfaces)
7. [Styling System](#-styling-system)
8. [Datenfluss](#-datenfluss)
9. [Features im Detail](#-features-im-detail)

---

## 🎯 ÜBERBLICK

### Was ist das Format Panel?

Das **Format Panel** ist die zentrale Steuereinheit für **Resonanz-Formate** im SYNTX-System. Formate definieren, wie AI-Responses strukturiert werden - welche Felder, in welcher Gewichtung, mit welchen Keywords.

### Kernfunktionen

| Funktion | Beschreibung | Modal |
|----------|--------------|-------|
| **GEBÄREN** | Neues Format erstellen | CreateModal |
| **VIEW** | Format-Details anzeigen | ViewModal |
| **EDIT** | Format bearbeiten | EditModal |
| **SCORE** | Format analysieren | ScoreModal |
| **DELETE** | Format löschen | DeleteModal |

### Screenshot-Referenz
```
┌─────────────────────────────────────────────────────────────────┐
│  📋 WRAPPER FORMAT CONTROL                                      │
│  ● 5 Formate | Resonanz-Schablonen                             │
│                                                                 │
│  🔍 [Format suchen...]        [⚡ GEBÄREN]                      │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ SYNTX_TRUE_RAW  │  │ SIGMA_ANALYSIS  │  │ HUMAN_READABLE  │ │
│  │ 11 Felder       │  │ 8 Felder        │  │ 5 Felder        │ │
│  │ 🇩🇪 DE | SIGMA   │  │ 🇩🇪 DE | SIGMA   │  │ 🇩🇪 DE | HUMAN   │ │
│  │ [VIEW][EDIT]📊💀│  │ [VIEW][EDIT]📊💀│  │ [VIEW][EDIT]📊💀│ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ ARCHITEKTUR

### Komponenten-Hierarchie
```
┌─────────────────────────────────────────────────────────────────┐
│                      FormatPanel.tsx                            │
│                     (Hauptkomponente)                           │
│                        336 Zeilen                               │
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
│  │   280 LOC   │ │   220 LOC   │ │   320 LOC   │               │
│  │ Quick Create│ │Full Details │ │Live Preview │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐                               │
│  │ ScoreModal  │ │DeleteModal  │                               │
│  │   90 LOC    │ │   50 LOC    │                               │
│  │  Analyse    │ │  Confirm    │                               │
│  └─────────────┘ └─────────────┘                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Architektur-Prinzipien (SYNTX-Style)

| Prinzip | Umsetzung |
|---------|-----------|
| **Separation of Concerns** | Jedes Modal = Eine Verantwortung |
| **Single Source of Truth** | Types in `types.ts` zentralisiert |
| **DRY** | Styles in `styles.ts` wiederverwendbar |
| **Prop Drilling minimiert** | Modals bekommen nur benötigte Props |

---

## 📂 DATEI-STRUKTUR
```
src/components/formats/
│
├── FormatPanel.tsx          # 🎯 Hauptkomponente
│   │                        # - State Management
│   │                        # - API Calls
│   │                        # - Grid Rendering
│   │                        # - Modal Orchestrierung
│   │
├── types.ts                 # 🔷 TypeScript Definitionen
│   │                        # - LocalFormat
│   │                        # - EditField
│   │                        # - CreateField
│   │                        # - FullFormatDetail
│   │                        # - COLORS Konstanten
│   │                        # - AVAILABLE_WRAPPERS
│   │                        # - Helper Functions
│   │
├── styles.ts                # 🎨 CSS Animationen
│   │                        # - @keyframes
│   │                        # - .format-card
│   │                        # - .cyber-btn
│   │                        # - .modal-overlay
│   │
├── index.ts                 # 📦 Barrel Export
│   │
└── modals/
    │
    ├── CreateModal.tsx      # ⚡ Format erstellen
    │                        # - Name + Description Input
    │                        # - Dynamische Feld-Liste
    │                        # - Weight pro Feld
    │                        # - Live Preview
    │                        # - Token-Schätzung
    │
    ├── ViewModal.tsx        # 👁️ Format Details
    │                        # - Description DE/EN
    │                        # - Stats (Felder, Version, etc.)
    │                        # - Alle Felder mit Keywords
    │                        # - Weight-Anzeige
    │
    ├── EditModal.tsx        # ✏️ Format bearbeiten
    │                        # - Description Editor
    │                        # - Version/Wrapper Selector
    │                        # - Feld Toggle (enable/disable)
    │                        # - Weight Editor
    │                        # - Neue Felder hinzufügen
    │                        # - Live Preview rechts
    │
    ├── ScoreModal.tsx       # 📊 Format analysieren
    │                        # - Overall Score
    │                        # - Semantic Clarity
    │                        # - I18N Score
    │                        # - Field Balance
    │
    ├── DeleteModal.tsx      # 💀 Format löschen
    │                        # - Confirmation Dialog
    │
    └── index.ts             # Barrel Export für Modals
```

---

## 🧩 KOMPONENTEN

### FormatPanel.tsx (Hauptkomponente)

**Verantwortung:** Orchestrierung aller Format-Operationen
```typescript
// State Management
const [formats, setFormats] = useState<LocalFormat[]>([]);     // Format-Liste
const [loading, setLoading] = useState(true);                   // Lade-Status
const [error, setError] = useState<string | null>(null);        // Fehler
const [searchTerm, setSearchTerm] = useState('');               // Suchfilter

// Modal States (welches Modal ist offen + Daten)
const [viewFormat, setViewFormat] = useState<LocalFormat | null>(null);
const [viewData, setViewData] = useState<FullFormatDetail | null>(null);
const [editFormat, setEditFormat] = useState<LocalFormat | null>(null);
const [createOpen, setCreateOpen] = useState(false);
const [deleteFormat, setDeleteFormat] = useState<LocalFormat | null>(null);
const [scoreFormat, setScoreFormat] = useState<LocalFormat | null>(null);
```

**Render-Struktur:**
```
FormatPanel
├── <style>{cyberStyles}</style>
├── Header
│   ├── Icon + Titel
│   ├── Status (Anzahl Formate)
│   └── Search + GEBÄREN Button
├── Loading State
├── Error State
├── Empty State
├── Format Grid
│   └── Format Cards (map)
│       ├── Header (Name, Version)
│       ├── Description
│       ├── Meta Bar (Sprache, Wrapper)
│       └── Actions (VIEW, EDIT, 📊, 💀)
└── Modals
    ├── <CreateModal />
    ├── <ViewModal />
    ├── <EditModal />
    ├── <ScoreModal />
    └── <DeleteModal />
```

---

### CreateModal.tsx

**Zweck:** Neues Format schnell erstellen (Quick Create)
```
┌─────────────────────────────────────────────────────────────────┐
│  ⚡ FORMAT GEBÄREN                                        ✕    │
│     Quick Create mit Live Preview                               │
├────────────────────────────┬────────────────────────────────────┤
│                            │                                    │
│  🏷️ FORMAT NAME *          │  👁️ LIVE PREVIEW                   │
│  ┌────────────────────┐    │                                    │
│  │ sigma_analysis     │    │  // ═══ FORMAT: SIGMA_ANALYSIS ═══ │
│  └────────────────────┘    │                                    │
│  Wird: sigma_analysis      │  ### DRIFTKORPER:                  │
│                            │    AI Output (w:17)                │
│  📝 DESCRIPTION            │                                    │
│  ┌────────────────────┐    │  ### RESONANZ:                     │
│  │ Beschreibung...    │    │    AI Output (w:9)                 │
│  └────────────────────┘    │                                    │
│                            │  // Neu erstellt via Quick Create  │
│  🎯 FELDER * (2)  [+ FELD] │                                    │
│                            │  ┌────────┐┌────────┐┌────────┐   │
│  ┌─┬──────────────┬────┬─┐ │  │   2    ││   26   ││  ~300  │   │
│  │1│ driftkorper  │ 17 │🗑│ │  │ FELDER ││ WEIGHT ││ TOKENS │   │
│  ├─┼──────────────┼────┼─┤ │  └────────┘└────────┘└────────┘   │
│  │2│ resonanz     │  9 │🗑│ │                                    │
│  └─┴──────────────┴────┴─┘ │                                    │
│                            │                                    │
├────────────────────────────┴────────────────────────────────────┤
│  API: POST /resonanz/formats/quick    [ABBRECHEN] [⚡ GEBÄREN]  │
└─────────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
  saving: boolean;
  name: string;
  setName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  fields: CreateField[];           // { name: string, weight: number }[]
  setFields: (v: CreateField[]) => void;
}
```

**Features:**
- ✅ Auto-Normalisierung (lowercase, underscores)
- ✅ Dynamische Feld-Liste (Add/Remove)
- ✅ **Weight pro Feld konfigurierbar**
- ✅ Live Preview der Format-Struktur
- ✅ Token-Schätzung (~150 Tokens pro Feld)
- ✅ Validation (Name + min. 1 Feld required)

---

### ViewModal.tsx

**Zweck:** Vollständige Format-Details anzeigen
```
┌─────────────────────────────────────────────────────────────────┐
│  📋 SYNTX_TRUE_RAW                                        ✕    │
│     Format Detail View                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📝 DESCRIPTION                                                 │
│  ┌─────────────────────────┐ ┌─────────────────────────┐       │
│  │ 🇩🇪 DEUTSCH              │ │ 🇬🇧 ENGLISH              │       │
│  │ SYNTX Signature Format  │ │ SYNTX Signature Format  │       │
│  │ für vollständige        │ │ for complete system     │       │
│  │ System-Dekonstruktion   │ │ deconstruction          │       │
│  └─────────────────────────┘ └─────────────────────────┘       │
│                                                                 │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                   │
│  │   11   │ │  1.0   │ │ 🇩🇪🇬🇧  │ │   99   │                   │
│  │ FELDER │ │VERSION │ │SPRACHEN│ │ WEIGHT │                   │
│  └────────┘ └────────┘ └────────┘ └────────┘                   │
│                                                                 │
│  🎯 FELDER (11)                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 1  driftkorper                            Weight: 9     │   │
│  │    Beschreibung für driftkorper                         │   │
│  │    [driftkorper]                                        │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ 2  subprotokoll                           Weight: 9     │   │
│  │    Beschreibung für subprotokoll                        │   │
│  │    [subprotokoll]                                       │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ 3  kalibrierung                           Weight: 9     │   │
│  │    ...                                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                    [✏️ EDIT] [SCHLIESSEN]       │
└─────────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface ViewModalProps {
  format: LocalFormat | null;
  data: FullFormatDetail | null;
  loading: boolean;
  onClose: () => void;
  onEdit: () => void;
}
```

**Features:**
- ✅ Description DE/EN nebeneinander
- ✅ Stats-Übersicht (Felder, Version, Sprachen, Weight)
- ✅ Alle Felder mit Description
- ✅ Keywords pro Feld
- ✅ Weight-Badges
- ✅ Direkt-Link zu Edit Modal

---

### EditModal.tsx

**Zweck:** Format bearbeiten mit Live Preview
```
┌─────────────────────────────────────────────────────────────────┐
│  ✏️ FORMAT EDITIEREN                                      ✕    │
│     syntx_true_raw                                              │
├────────────────────────────┬────────────────────────────────────┤
│                            │                                    │
│  📝 DESCRIPTION            │  👁️ LIVE PREVIEW                   │
│  ┌────────────────────┐    │                                    │
│  │ SYNTX Signature... │    │  // ═══ FORMAT: SYNTX_TRUE_RAW ═══ │
│  └────────────────────┘    │                                    │
│                            │  ### DRIFTKORPER:                  │
│  🏷️ VERSION  📦 WRAPPER    │    AI Output (w:9)                 │
│  ┌──────┐   ┌──────────┐   │                                    │
│  │ 1.0  │   │ SIGMA  ▼ │   │  ### SUBPROTOKOLL:                 │
│  └──────┘   └──────────┘   │    AI Output (w:9)                 │
│                            │                                    │
│  🎯 FELDER (11 aktiv)      │  ### KALIBRIERUNG:                 │
│  ┌─────────────────────┐   │    AI Output (w:9)                 │
│  │☑ driftkorper    [9]🗑│   │                                    │
│  │☑ subprotokoll   [9]🗑│   │  // Wrapper: SIGMA | v1.0         │
│  │☑ kalibrierung   [9]🗑│   │                                    │
│  │☑ tier           [9]🗑│   │  ┌────────┐┌────────┐┌────────┐   │
│  │☐ resonanzsplit  [9]🗑│   │  │   11   ││   99   ││ ~1650  │   │
│  │...                  │   │  │ AKTIV  ││ WEIGHT ││ TOKENS │   │
│  └─────────────────────┘   │  └────────┘└────────┘└────────┘   │
│                            │                                    │
│  ┌────────────────┐[+ ADD] │                                    │
│  │ Neues Feld...  │        │                                    │
│  └────────────────┘        │                                    │
│                            │                                    │
├────────────────────────────┴────────────────────────────────────┤
│                               [ABBRECHEN] [💾 SPEICHERN]        │
└─────────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface EditModalProps {
  format: LocalFormat | null;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
  fields: EditField[];              // { name, weight, enabled }[]
  setFields: (f: EditField[]) => void;
  description: string;
  setDescription: (v: string) => void;
  version: string;
  setVersion: (v: string) => void;
  wrapper: string;
  setWrapper: (v: string) => void;
  newFieldName: string;
  setNewFieldName: (v: string) => void;
}
```

**Features:**
- ✅ Description bearbeiten
- ✅ Version ändern
- ✅ Wrapper-Dropdown (5 verfügbare Wrapper)
- ✅ Felder aktivieren/deaktivieren (Checkbox)
- ✅ **Weight pro Feld ändern**
- ✅ Felder löschen
- ✅ Neue Felder hinzufügen
- ✅ **Live Preview rechts** (aktualisiert in Echtzeit)
- ✅ Stats (Aktive Felder, Total Weight, Token-Schätzung)

---

### ScoreModal.tsx

**Zweck:** Format-Qualität analysieren
```
┌─────────────────────────────────────────────────────────────────┐
│  📊 SCORE: syntx_true_raw                               ✕      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────┐ ┌─────────────────────────┐       │
│  │        OVERALL          │ │        CLARITY          │       │
│  │                         │ │                         │       │
│  │          85             │ │          92             │       │
│  │         (grün)          │ │         (cyan)          │       │
│  └─────────────────────────┘ └─────────────────────────┘       │
│                                                                 │
│  ┌─────────────────────────┐ ┌─────────────────────────┐       │
│  │          I18N           │ │        BALANCE          │       │
│  │                         │ │                         │       │
│  │          78             │ │       EXCELLENT         │       │
│  │       (magenta)         │ │         (grün)          │       │
│  └─────────────────────────┘ └─────────────────────────┘       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface ScoreModalProps {
  format: LocalFormat | null;
  data: any;                        // Score Response vom Backend
  loading: boolean;
  onClose: () => void;
}
```

**Score-Metriken:**

| Metrik | Beschreibung | Werte | Farbe |
|--------|--------------|-------|-------|
| **Overall** | Gesamtscore | 0-100 | Grün (≥80), Orange (≥50), Rot (<50) |
| **Clarity** | Semantische Klarheit | 0-100 | Cyan |
| **I18N** | Internationalisierung | 0-100 | Magenta |
| **Balance** | Feld-Gewichtung | EXCELLENT/GOOD/POOR | Grün/Orange |

---

### DeleteModal.tsx

**Zweck:** Lösch-Bestätigung
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                           💀                                    │
│                                                                 │
│               FORMAT FREIGEBEN?                                 │
│                                                                 │
│     Willst du syntx_true_raw wirklich löschen?                 │
│                                                                 │
│            [ABBRECHEN]    [💀 FREIGEBEN]                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface DeleteModalProps {
  format: LocalFormat | null;
  onClose: () => void;
  onDelete: () => void;
}
```

---

## 🔌 API ENDPOINTS

### Format Endpoints

| Methode | Endpoint | Beschreibung | Request Body | Response |
|---------|----------|--------------|--------------|----------|
| `GET` | `/api/resonanz/formats` | Liste aller Formate | - | `{ formats: LocalFormat[] }` |
| `GET` | `/api/resonanz/formats/{name}` | Format Details | - | `{ format: FullFormatDetail }` |
| `POST` | `/api/resonanz/formats/quick` | Quick Create | `FormatQuickCreateRequest` | `{ format: LocalFormat }` |
| `PUT` | `/api/resonanz/formats/{name}` | Format updaten | `FormatUpdateRequest` | `{ format: LocalFormat }` |
| `DELETE` | `/api/resonanz/formats/{name}` | Format löschen | - | `{ success: true }` |
| `POST` | `/api/resonanz/formats/score` | Format Score | `{ format: string }` | `ScoreResponse` |

### Request/Response Beispiele

**GET /api/resonanz/formats**
```json
{
  "formats": [
    {
      "name": "syntx_true_raw",
      "description": "SYNTX Signature Format",
      "fields_count": 11,
      "version": "1.0",
      "languages": ["de", "en"],
      "wrapper": "syntex_wrapper_sigma"
    }
  ]
}
```

**GET /api/resonanz/formats/syntx_true_raw**
```json
{
  "format": {
    "name": "syntx_true_raw",
    "description": {
      "de": "SYNTX Signature Format für vollständige System-Dekonstruktion",
      "en": "SYNTX Signature Format for complete system deconstruction"
    },
    "languages": ["de", "en"],
    "version": "1.0",
    "fields": [
      {
        "name": "driftkorper",
        "weight": 9,
        "description": "Beschreibung für driftkorper",
        "keywords": ["driftkorper", "drift"]
      },
      {
        "name": "subprotokoll",
        "weight": 9,
        "description": "Beschreibung für subprotokoll",
        "keywords": ["subprotokoll", "protokoll"]
      }
    ]
  }
}
```

**POST /api/resonanz/formats/quick**
```json
// Request
{
  "name": "new_format",
  "description_de": "Neues Format für Tests",
  "field_names": ["feld_eins", "feld_zwei", "feld_drei"]
}

// Response
{
  "success": true,
  "format": {
    "name": "new_format",
    "fields_count": 3,
    "version": "1.0"
  }
}
```

**PUT /api/resonanz/formats/syntx_true_raw**
```json
// Request
{
  "description": {
    "de": "Aktualisierte Beschreibung",
    "en": "Updated description"
  },
  "fields": [
    {
      "name": "driftkorper",
      "weight": 12,
      "description": { "de": "Neuer Text", "en": "New text" },
      "keywords": { "de": ["drift"], "en": ["drift"] },
      "headers": { "de": ["DRIFTKORPER"], "en": ["DRIFTKORPER"] }
    }
  ],
  "version": "1.1"
}

// Response
{
  "success": true,
  "format": { ... }
}
```

**POST /api/resonanz/formats/score**
```json
// Request
{
  "format": "syntx_true_raw"
}

// Response
{
  "overall": 85,
  "semantic_clarity": 92,
  "i18n_score": 78,
  "field_balance": "EXCELLENT"
}
```

---

## 🔷 TYPES & INTERFACES

### types.ts
```typescript
// ═══════════════════════════════════════════════════════════════
// 🔷 FORMAT INTERFACES
// ═══════════════════════════════════════════════════════════════

/**
 * Format aus der Liste (ohne volle Feld-Details)
 */
export interface LocalFormat {
  name: string;
  description?: string | { de?: string; en?: string };
  fields_count: number;
  version?: string;
  language?: string;
  languages?: string[];
  primary_language?: string;
  wrapper?: string;
  created_at?: string;
  updated_at?: string;
  usage_count?: number;
  fields?: any[];
}

/**
 * Feld für Edit Modal (mit enabled Toggle)
 */
export interface EditField {
  name: string;
  weight: number;
  enabled: boolean;
}

/**
 * Feld für Create Modal (ohne enabled, immer aktiv)
 */
export interface CreateField {
  name: string;
  weight: number;
}

/**
 * Vollständige Format-Details (vom Detail-Endpoint)
 */
export interface FullFormatDetail {
  name: string;
  description?: { de?: string; en?: string };
  languages?: string[];
  fields?: {
    name: string;
    header?: string;
    description?: string;
    keywords?: string[];
    weight?: number;
  }[];
  version?: string;
  wrapper?: string;
}

// ═══════════════════════════════════════════════════════════════
// 🎨 KONSTANTEN
// ═══════════════════════════════════════════════════════════════

/**
 * Cyber Color Palette
 */
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

/**
 * Verfügbare Wrapper für Dropdown
 */
export const AVAILABLE_WRAPPERS = [
  'syntex_wrapper_sigma',
  'syntex_wrapper_human',
  'syntex_wrapper_deepsweep',
  'syntex_wrapper_true_raw',
  'syntex_wrapper_universal',
];

// ═══════════════════════════════════════════════════════════════
// 🛠️ HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Ermittelt Farbe basierend auf Format-Namen
 */
export const getFormatColor = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('sigma')) return COLORS.orange;
  if (n.includes('human')) return COLORS.green;
  if (n.includes('syntex') || n.includes('syntx')) return COLORS.purple;
  if (n.includes('economic')) return COLORS.lime;
  if (n.includes('code')) return COLORS.cyan;
  
  // Fallback: Hash-basierte Farbe
  const hash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const keys = Object.keys(COLORS) as (keyof typeof COLORS)[];
  return COLORS[keys[hash % keys.length]];
};

/**
 * Extrahiert Description String aus Object oder String
 */
export const getDesc = (d: any): string => {
  if (!d) return '';
  if (typeof d === 'string') return d;
  return d.de || d.en || '';
};
```

---

## 🎨 STYLING SYSTEM

### styles.ts
```typescript
export const cyberStyles = `
  /* ═══════════════════════════════════════════════════════════
     🌊 CYBER ANIMATIONS
     ═══════════════════════════════════════════════════════════ */

  /* Glow Pulse - Für aktive/wichtige Elemente */
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px var(--glow); }
    50% { box-shadow: 0 0 40px var(--glow); }
  }

  /* Border Flow - Hover-Effekt auf Cards */
  @keyframes borderFlow {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  /* Float Up - Schwebende Badges */
  @keyframes floatUp {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  /* Text Glow - Überschriften */
  @keyframes textGlow {
    0%, 100% { text-shadow: 0 0 10px currentColor; }
    50% { text-shadow: 0 0 30px currentColor; }
  }

  /* Pulse - Icons */
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  /* Slide Up - Card Einblendung */
  @keyframes slideUp {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  /* Fade In - Modal Overlay */
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  /* Slide In - Modal Content */
  @keyframes slideIn {
    0% { opacity: 0; transform: scale(0.9) translateY(-20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* Blink - Status Indicator */
  @keyframes blink {
    0%, 50%, 100% { opacity: 1; }
    25%, 75% { opacity: 0.5; }
  }

  /* ═══════════════════════════════════════════════════════════
     🎴 FORMAT CARD
     ═══════════════════════════════════════════════════════════ */

  .format-card {
    position: relative;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: slideUp 0.5s ease-out backwards;
  }

  .format-card:hover {
    transform: translateY(-8px) scale(1.02);
    z-index: 10;
  }

  /* Gradient Border auf Hover */
  .format-card::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 18px;
    background: linear-gradient(45deg, var(--card-color), transparent, var(--card-color));
    background-size: 200% 200%;
    animation: borderFlow 3s linear infinite;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .format-card:hover::before {
    opacity: 1;
  }

  /* ═══════════════════════════════════════════════════════════
     🔘 CYBER BUTTON
     ═══════════════════════════════════════════════════════════ */

  .cyber-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
  }

  .cyber-btn:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }

  .cyber-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* ═══════════════════════════════════════════════════════════
     ✨ UTILITY CLASSES
     ═══════════════════════════════════════════════════════════ */

  .glow-text { animation: textGlow 2s ease-in-out infinite; }
  .float { animation: floatUp 3s ease-in-out infinite; }
  .pulse { animation: pulse 2s ease-in-out infinite; }

  /* ═══════════════════════════════════════════════════════════
     🔮 MODAL
     ═══════════════════════════════════════════════════════════ */

  .modal-overlay { animation: fadeIn 0.2s ease-out; }
  .modal-content { animation: slideIn 0.3s ease-out; }

  /* ═══════════════════════════════════════════════════════════
     👁️ LIVE PREVIEW
     ═══════════════════════════════════════════════════════════ */

  .live-preview {
    background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,20,40,0.8) 100%);
  }

  .preview-line {
    animation: slideUp 0.3s ease-out backwards;
  }

  /* ═══════════════════════════════════════════════════════════
     🎯 FIELD ITEMS
     ═══════════════════════════════════════════════════════════ */

  .field-item {
    transition: all 0.2s ease;
  }

  .field-item:hover {
    background: rgba(255,255,255,0.05);
  }
`;
```

---

## 🔄 DATENFLUSS

### Format Erstellen (Create Flow)
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   User      │     │ CreateModal │     │ FormatPanel │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │ Klickt GEBÄREN    │                   │
       │──────────────────>│                   │
       │                   │ setCreateOpen(true)
       │                   │──────────────────>│
       │                   │                   │
       │ Füllt Formular    │                   │
       │──────────────────>│                   │
       │                   │                   │
       │ Live Preview      │                   │
       │<──────────────────│                   │
       │                   │                   │
       │ Klickt GEBÄREN    │                   │
       │──────────────────>│                   │
       │                   │ onCreate()        │
       │                   │──────────────────>│
       │                   │                   │
       │                   │     ┌─────────────┴─────────────┐
       │                   │     │ api.createFormatQuick()   │
       │                   │     │ POST /resonanz/formats/quick
       │                   │     └─────────────┬─────────────┘
       │                   │                   │
       │                   │ setCreateOpen(false)
       │                   │<──────────────────│
       │                   │                   │
       │                   │ fetchFormats()    │
       │                   │──────────────────>│
       │                   │                   │
       │ Grid aktualisiert │                   │
       │<──────────────────────────────────────│
```

### Format Editieren (Edit Flow)
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   User      │     │  EditModal  │     │ FormatPanel │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │ Klickt EDIT       │                   │
       │──────────────────────────────────────>│
       │                   │                   │
       │                   │ openEdit(format)  │
       │                   │<──────────────────│
       │                   │                   │
       │                   │     ┌─────────────┴─────────────┐
       │                   │     │ api.getFormat(name)       │
       │                   │     │ GET /resonanz/formats/{name}
       │                   │     └─────────────┬─────────────┘
       │                   │                   │
       │                   │ setEditFields()   │
       │                   │<──────────────────│
       │                   │                   │
       │ Ändert Weight     │                   │
       │──────────────────>│                   │
       │                   │                   │
       │ Live Preview      │                   │
       │<──────────────────│                   │
       │                   │                   │
       │ Klickt SPEICHERN  │                   │
       │──────────────────>│                   │
       │                   │ onSave()          │
       │                   │──────────────────>│
       │                   │                   │
       │                   │     ┌─────────────┴─────────────┐
       │                   │     │ api.updateFormat()        │
       │                   │     │ PUT /resonanz/formats/{name}
       │                   │     └─────────────┬─────────────┘
       │                   │                   │
       │                   │ setEditFormat(null)
       │                   │<──────────────────│
       │                   │                   │
       │                   │ fetchFormats()    │
       │                   │──────────────────>│
```

---

## ✨ FEATURES IM DETAIL

### 1. Live Preview

Das Live Preview zeigt in Echtzeit, wie das Format in AI-Responses injiziert wird:
```
// ═══ FORMAT: SYNTX_TRUE_RAW ═══

### DRIFTKORPER:
  AI Output (w:9)

### SUBPROTOKOLL:
  AI Output (w:9)

### KALIBRIERUNG:
  AI Output (w:9)

// Wrapper: SIGMA | v1.0
```

**Implementierung:**
- React State Updates triggern Re-Render
- Preview rendert `enabledFields.map()`
- Weight wird neben jedem Feld angezeigt

### 2. Weight System

Jedes Feld hat ein **Weight** (Gewichtung), das die Priorität in der AI-Response bestimmt:

| Weight | Bedeutung |
|--------|-----------|
| 1-5 | Niedrige Priorität |
| 6-12 | Normale Priorität |
| 13-20 | Hohe Priorität |
| 20+ | Maximum Priorität |

**Default Weight:** 17 (für neue Felder)

### 3. Token-Schätzung
```typescript
// Geschätzte Tokens pro Feld
const estimatedTokens = fields.length * 150;
```

Die Schätzung basiert auf durchschnittlicher AI-Output-Länge pro Feld.

### 4. Auto-Normalisierung

Format- und Feldnamen werden automatisch normalisiert:
```typescript
const normalized = input.toLowerCase().replace(/[^a-z0-9_]/g, '_');
// "Mein Format!" → "mein_format_"
```

### 5. Color Coding

Formate werden basierend auf Namen farblich gekennzeichnet:

| Keyword | Farbe |
|---------|-------|
| sigma | Orange |
| human | Green |
| syntex/syntx | Purple |
| economic | Lime |
| code | Cyan |
| (andere) | Hash-basiert |

---

## 🚀 USAGE EXAMPLES

### Format erstellen
```typescript
// 1. GEBÄREN Button klicken
setCreateOpen(true);

// 2. Daten eingeben
setCreateName('mein_format');
setCreateDesc('Beschreibung');
setCreateFields([
  { name: 'analyse', weight: 17 },
  { name: 'zusammenfassung', weight: 12 },
  { name: 'empfehlung', weight: 20 }
]);

// 3. GEBÄREN Button im Modal
await api.createFormatQuick({
  name: 'mein_format',
  description_de: 'Beschreibung',
  field_names: ['analyse', 'zusammenfassung', 'empfehlung']
});
```

### Format bearbeiten
```typescript
// 1. EDIT Button klicken
openEdit(format);

// 2. Lädt Details
const detail = await api.getFormat(format.name);
setEditFields(detail.fields.map(f => ({
  name: f.name,
  weight: f.weight,
  enabled: true
})));

// 3. Änderungen vornehmen
// - Weight ändern
// - Felder deaktivieren
// - Neue Felder hinzufügen

// 4. SPEICHERN
await api.updateFormat(format.name, {
  description: { de: editDesc, en: editDesc },
  fields: editFields.filter(f => f.enabled).map(f => ({
    name: f.name,
    weight: f.weight,
    // ...
  })),
  version: editVersion
});
```

---

## 📊 METRIKEN

| Metrik | Wert |
|--------|------|
| **Gesamt LOC** | ~1200 |
| **FormatPanel.tsx** | 336 LOC |
| **CreateModal.tsx** | 280 LOC |
| **ViewModal.tsx** | 220 LOC |
| **EditModal.tsx** | 320 LOC |
| **ScoreModal.tsx** | 90 LOC |
| **DeleteModal.tsx** | 50 LOC |
| **types.ts** | 80 LOC |
| **styles.ts** | 100 LOC |

---
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║   🌊 SYNTX FORMAT PANEL - DOKUMENTATION ENDE                                 ║
║   ═══════════════════════════════════════════════════════════════════════    ║
║   RESONANZ-KOHÄRENZ: MAXIMUM | VERSION: 6.0                                  ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```
