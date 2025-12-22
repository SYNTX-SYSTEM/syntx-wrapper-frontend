# 🌊 FLOW PANEL DOKUMENTATION

> **"Der Strom macht die Drift sichtbar. Nicht durch Worte - durch FELDER."**

---

## 🎯 WAS IST DAS FLOW PANEL?

Das Flow Panel ist die **visuelle Manifestation des SYNTX Field Flows** - es zeigt jeden Request als **5-stufigen Resonanz-Strom** von INCOMING bis RESPONSE.

**1139 Sessions. 5 Stages pro Flow. Jeder Strom dokumentiert.**

Das ist nicht einfach ein Log-Viewer. Das ist ein **Feldfluss-Visualisierer**.

---

## 💎 WARUM EXISTIERT ES?

### Das Problem (Token-Denken)
Traditionelle Logging zeigt:
- Timestamps
- Request/Response Text
- Fehler-Codes
- **Tote Daten. Keine Resonanz.**

### Die Lösung (Feld-Denken)
SYNTX Flow zeigt:
- **5 Stages als Timeline** (visuell, klickbar)
- **Wrapper Chain** (welche Felder wurden geladen?)
- **Calibrated Length** (wie viel Kontext wurde gebaut?)
- **Backend Forward** (wohin fließt der Strom?)
- **Response mit Latency** (wie lange brauchte die Resonanz?)

**Du siehst nicht WAS passiert ist. Du siehst WIE der Strom geflossen ist.**

---

## 🔥 DIE 5 STAGES
```
📥 INCOMING        → Der rohe User-Input trifft ein
    │
    ▼
📦 WRAPPERS_LOADED → Wrapper Chain wird aktiviert
    │
    ▼
⚡ FIELD_CALIBRATED → Kontext wird kalibriert (Prompt-Länge)
    │
    ▼
🚀 BACKEND_FORWARD → Request geht an Ollama/Mistral
    │
    ▼
✅ RESPONSE        → Antwort kommt zurück
```

### Stage-Farben (SYNTX Color System)

| Stage | Farbe | Hex | Bedeutung |
|-------|-------|-----|-----------|
| INCOMING | Cyan | `#00d4ff` | Eingang, Anfang |
| WRAPPERS | Purple | `#8b5cf6` | Meta-Layer, Wrapper |
| CALIBRATED | Orange | `#f59e0b` | Energie, Kalibrierung |
| BACKEND | Magenta | `#d946ef` | Transformation |
| RESPONSE | Green | `#10b981` | Erfolg, Abschluss |

---

## 🏗️ KOMPONENTEN-ARCHITEKTUR
```
FlowPanel.tsx (617 Zeilen)
├── COLORS & CONFIG
│   ├── COLORS Object (7 Farben)
│   └── STAGE_CONFIG (5 Stages mit color, icon, label)
│
├── INTERFACES
│   ├── Session (Liste)
│   └── SessionDetail (mit field_flow Array)
│
├── COMPONENTS
│   ├── StageTimeline (klickbare 5-Stage Visualisierung)
│   └── SessionDetailModal (Full-Screen Detail View)
│
└── MAIN FLOW PANEL
    ├── Header (Titel, Stats, Search)
    ├── Sessions Grid (Liste aller Sessions)
    ├── Pagination
    └── Modal Trigger
```

---

## 🔌 API ENDPOINTS

### Sessions Liste
```typescript
GET /resonanz/sessions?limit={n}&offset={n}

Response:
{
  "status": "📊 SESSIONS GELADEN",
  "total": 1139,
  "sessions": [
    {
      "request_id": "a129877a-3b6a-4cdc-...",
      "timestamp": "2025-12-22T17:38:09Z",
      "stages": ["1_INCOMING", "2_WRAPPERS_LOADED", ...],
      "prompt": "# DEEPSWEEP WRAPPER...",
      "wrapper": "syntex_wrapper_sigma",
      "format": null,
      "latency_ms": 121481
    }
  ]
}
```

### Session Detail
```typescript
GET /resonanz/session/{request_id}

Response:
{
  "status": "🔍 SESSION DETAILS",
  "request_id": "a129877a-...",
  "summary": {
    "prompt": "...",
    "wrapper": "syntex_wrapper_sigma",
    "format": null,
    "latency_ms": 121481,
    "timestamp": "2025-12-22T17:38:09Z"
  },
  "field_flow": [
    {
      "stage": "1_INCOMING",
      "timestamp": "2025-12-22T17:38:09.922576Z",
      "prompt": "..."
    },
    {
      "stage": "2_WRAPPERS_LOADED",
      "chain": ["syntex_wrapper_sigma"]
    },
    {
      "stage": "3_FIELD_CALIBRATED",
      "total_length": 5537
    },
    {
      "stage": "4_BACKEND_FORWARD",
      "backend_url": "http://127.0.0.1:11434/api/generate",
      "model": "mistral-uncensored"
    },
    {
      "stage": "5_RESPONSE",
      "response": "...",
      "latency_ms": 121481
    }
  ]
}
```

### Session Replay
```typescript
GET /resonanz/session/{request_id}/replay

Response:
{
  "status": "🔄 REPLAY READY",
  "replay_params": {
    "prompt": "...",
    "mode": "syntex_wrapper_sigma",
    "format": null,
    "language": "de"
  },
  "original_response": "...",
  "original_latency_ms": 121481
}
```

---

## 🎨 UI FEATURES

### Sessions Liste

Jede Session-Zeile zeigt:
- **Timestamp** (Datum + Uhrzeit, Cyan)
- **Stage Dots** (5 farbige Kreise mit Icons)
- **Wrapper Badge** (z.B. "SIGMA", Purple)
- **Prompt Preview** (erste 80 chars, grau)
- **Latency Badge** (z.B. "⚡ 121.5s", Orange)
- **Arrow** (→ zeigt Klickbarkeit)

### Session Detail Modal

Öffnet sich bei Klick auf Session:
- **Header**: Request ID, Replay Button, Close Button
- **4 Summary Cards**: Wrapper, Format, Latency, Timestamp
- **Stage Timeline**: Horizontale 5-Stage Visualisierung
- **Stage Detail Panel**: Zeigt Daten der ausgewählten Stage

### Stage Timeline Interaction
```
Klick auf Stage-Node
        │
        ▼
activeStage State ändert sich
        │
        ▼
Stage Detail Panel zeigt neue Daten
        │
        ▼
Timeline highlightet aktive Stage (größer, Glow)
        │
        ▼
Connector Lines zeigen Fortschritt (farbig bis zur aktiven Stage)
```

---

## 🔧 STATE MANAGEMENT
```typescript
// Main Panel States
const [sessions, setSessions] = useState<Session[]>([]);
const [totalSessions, setTotalSessions] = useState(0);
const [loading, setLoading] = useState(true);
const [selectedSession, setSelectedSession] = useState<string | null>(null);
const [page, setPage] = useState(0);
const [filter, setFilter] = useState('');

// Modal States (in SessionDetailModal)
const [detail, setDetail] = useState<SessionDetail | null>(null);
const [activeStage, setActiveStage] = useState(0);
const [replay, setReplay] = useState<any>(null);
```

---

## 🌊 ANIMATIONS
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Wo werden sie genutzt?
| Animation | Verwendung |
|-----------|------------|
| `pulse` | Header Icon, Loading State |
| `blink` | Live Indicator Dot |
| `fadeIn` | Session Rows (gestaffelt mit delay) |

---

## 📊 PAGINATION
```typescript
const limit = 20;  // Sessions pro Seite
const totalPages = Math.ceil(totalSessions / limit);

// Navigation
<button onClick={() => setPage(p => Math.max(0, p - 1))}>← ZURÜCK</button>
<button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}>WEITER →</button>
```

**1139 Sessions ÷ 20 = 57 Seiten**

---

## 🔍 FILTER
```typescript
const filteredSessions = sessions.filter(s => 
  !filter || 
  s.wrapper?.toLowerCase().includes(filter.toLowerCase()) ||
  s.prompt?.toLowerCase().includes(filter.toLowerCase())
);
```

**Filtert nach:**
- Wrapper Name (z.B. "sigma", "naxixam")
- Prompt Inhalt (Freitext-Suche)

---

## 🚀 REPLAY FEATURE

Der Replay Button ist vorbereitet:
```typescript
const handleReplay = (params: any) => {
  console.log('REPLAY:', params);
  // TODO: Navigate to Chat with prefilled params
};
```

**Geplante Funktion:**
1. Replay Button klicken
2. Chat Tab öffnet sich
3. Prompt ist vorausgefüllt
4. Wrapper ist vorausgewählt
5. User kann erneut senden und vergleichen

---

## 💎 DESIGN PRINZIPIEN

### 1. Cyber Brutalism
```css
background: linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95));
border: 1px solid rgba(255,255,255,0.1);
box-shadow: 0 0 30px ${color}20;  /* Glow */
```

### 2. Information Density
- Viele Daten auf einen Blick
- Aber nicht überladen
- Klare visuelle Hierarchie
- Farben als Bedeutungsträger

### 3. Interaktivität
```typescript
onMouseEnter={e => {
  e.currentTarget.style.border = `1px solid ${COLORS.cyan}50`;
  e.currentTarget.style.boxShadow = `0 0 30px ${COLORS.cyan}20`;
}}
onMouseLeave={e => {
  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
  e.currentTarget.style.boxShadow = 'none';
}}
```

### 4. Monospace Typography
```css
fontFamily: 'monospace'
letterSpacing: 2-8px (je nach Wichtigkeit)
```

---

## 📁 DATEISTRUKTUR
```
src/components/flow/
├── FlowPanel.tsx           (617 Zeilen - Hauptkomponente)
├── FlowPanel.tsx.backup    (Backup vor Rewrite)
├── FieldFlowVisualizer.tsx (Legacy - nicht mehr aktiv genutzt)
└── index.ts                (Exports)
```

---

## 🔮 SYNTX PHILOSOPHIE

Das Flow Panel verkörpert die SYNTX Grundprinzipien:

| Prinzip | Umsetzung im Flow Panel |
|---------|------------------------|
| **Felder statt Token** | Stages zeigen Feldfluss, nicht rohen Text |
| **Ströme statt Objekte** | Timeline als fließende Visualisierung |
| **Resonanz sichtbar** | Jede Stage resoniert mit der nächsten |
| **Drift erkennbar** | Latency zeigt wo Drift entsteht |

### Der Strom erklärt
```
User Input
    │
    ▼ FELD: Raw Semantic
📥 INCOMING
    │
    ▼ FELD: Wrapper Context
📦 WRAPPERS_LOADED
    │
    ▼ FELD: Calibrated Prompt
⚡ FIELD_CALIBRATED (5537 chars = tiefes Feld)
    │
    ▼ FELD: Backend Transform
🚀 BACKEND_FORWARD (Mistral-uncensored)
    │
    ▼ FELD: Response Stream
✅ RESPONSE (121s = intensive Resonanz)
```

**Je länger die Latency, desto tiefer die Resonanz.**

---

## ⚡ PERFORMANCE OPTIMIERUNGEN

1. **Lazy Loading**: Sessions werden seitenweise geladen
2. **Pagination**: Nur 20 Sessions gleichzeitig im DOM
3. **useCallback**: fetchSessions ist memoized
4. **Conditional Rendering**: Modal nur wenn selectedSession existiert
5. **Gestaffelte Animation**: fadeIn mit index * 0.05s delay

---

## 📊 STATISTIKEN
```
Sessions Total:     1139
Seiten:             57
Sessions pro Seite: 20
Stages pro Session: 5
Unique Wrappers:    4 (sigma: 93, naxixam: 4, nochmaleinwrapper: 2, backend: 1)
```

---

**DAS IST FLOW. DAS IST DER STROM. DAS IST SYNTX.** 🌊⚡💎

---

*Dokumentation erstellt: 22.12.2025*
*SYNTX System v2.1.0*
*FlowPanel.tsx: 617 Zeilen*
