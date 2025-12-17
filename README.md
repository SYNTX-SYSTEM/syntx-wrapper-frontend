<!-- 
╔═══════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                                   ║
║   ███████╗██╗   ██╗███╗   ██╗████████╗██╗  ██╗    ███████╗██████╗  ██████╗ ███╗   ██╗████████╗   ║
║   ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝╚██╗██╔╝    ██╔════╝██╔══██╗██╔═══██╗████╗  ██║╚══██╔══╝   ║
║   ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║    ╚███╔╝     █████╗  ██████╔╝██║   ██║██╔██╗ ██║   ██║      ║
║   ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║    ██╔██╗     ██╔══╝  ██╔══██╗██║   ██║██║╚██╗██║   ██║      ║
║   ███████║   ██║   ██║ ╚████║   ██║   ██╔╝ ██╗    ██║     ██║  ██║╚██████╔╝██║ ╚████║   ██║      ║
║   ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝      ║
║                                                                                                   ║
║   🌊 FIELD RESONANCE DASHBOARD                                                                    ║
║   "SYNTX isn't AI. It's the resonance that governs it."                                          ║
║                                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════╝
-->

<div align="center">

# 🌊 SYNTX WRAPPER FRONTEND

### *The resonance that governs AI*

[![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

**Field Resonance Dashboard für das SYNTX Wrapper System**

[Installation](#-installation) • [Tabs](#-tabs--panels) • [API](#-api-integration) • [Components](#-komponenten) • [Design System](#-design-system)

---

</div>

## 📋 ÜBERSICHT

Das **SYNTX Wrapper Frontend** ist das zentrale Dashboard zur Steuerung und Überwachung des SYNTX Field Resonance Systems. Es ermöglicht die Verwaltung von Wrappern (semantischen Feldern), die Analyse von Resonanzströmen und die direkte Interaktion mit dem Backend-LLM.
```
┌─────────────────────────────────────────────────────────────────────┐
│                         SYNTX ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐          │
│   │   FRONTEND  │────▶│  INJECTOR   │────▶│   BACKEND   │          │
│   │  Dashboard  │     │     API     │     │    (LLM)    │          │
│   └─────────────┘     └─────────────┘     └─────────────┘          │
│         │                    │                    │                 │
│         │              ┌─────┴─────┐              │                 │
│         │              │  WRAPPERS │              │                 │
│         └─────────────▶│  (Fields) │◀─────────────┘                 │
│                        └───────────┘                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 INSTALLATION

### Voraussetzungen

- **Node.js** ≥ 18.0
- **npm** oder **yarn**
- Laufende **SYNTX Injector API** (Backend)

### Setup
```bash
# Repository klonen
git clone https://github.com/SYNTX-SYSTEM/syntx-wrapper-frontend.git
cd syntx-wrapper-frontend

# Dependencies installieren
npm install

# Environment konfigurieren
cp .env.example .env.local
# AUTH_USER=syntx eintragen

# Development Server starten
npm run dev
```

### Build & Deploy
```bash
# Production Build
npm run build

# Production Server
npm start

# Vercel Deployment
vercel --prod
```

---

## 🎯 TABS & PANELS

Das Dashboard besteht aus **7 Haupttabs**, die unterschiedliche Aspekte des SYNTX Systems abdecken:

### 📊 DATA Tab
**Komponente:** `DataPanel.tsx`

Real-time Event Stream mit allen Resonanz-Events:
- **Live Stream** aller eingehenden Requests
- **Stage Filtering** (1_INCOMING → 5_RESPONSE)
- **Request Details** mit Latency und Wrapper Chain
- **Klickbare Events** für Detail-Ansicht
```
┌─────────────────────────────────────────────────────────────┐
│ 📊 DATA STREAM                                   LIVE 🟢    │
├─────────────────────────────────────────────────────────────┤
│ ▸ 5_RESPONSE   │ b8d4fc75... │ 23509ms │ sigma      │ ✓    │
│ ▸ 4_BACKEND    │ b8d4fc75... │ -       │ sigma      │ →    │
│ ▸ 3_CALIBRATED │ b8d4fc75... │ -       │ sigma      │ ⚡   │
│ ▸ 2_WRAPPERS   │ b8d4fc75... │ -       │ sigma      │ 📦   │
│ ▸ 1_INCOMING   │ b8d4fc75... │ -       │ sigma      │ 📡   │
└─────────────────────────────────────────────────────────────┘
```

---

### 🖥️ SYSTEM Tab
**Komponente:** `SystemPanel.tsx`

System Health und Konfiguration:
- **API Health Status** (SYSTEM_GESUND / OFFLINE)
- **Aktiver Wrapper** Anzeige
- **Quick Stats** (Requests, Latency, Success Rate)
- **System Configuration**

---

### 💬 CHAT Tab
**Komponente:** `ChatPanel.tsx` / `ChatInterface.tsx`

Direkte Interaktion mit dem LLM durch das Wrapper System:
- **Wrapper-Auswahl** für jeden Request
- **Real-time Response** Streaming
- **Field Flow Visualization** pro Request
- **Latency Tracking**
```
┌─────────────────────────────────────────────────────────────┐
│ 💬 SYNTX CHAT                              SIGMA aktiv 🎯   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   USER: Was ist SYNTX?                                      │
│                                                             │
│   SYNTX: SYNTX ist eine interdisziplinäre                   │
│   Systemarchitektur, die sich auf Prozesse und              │
│   Strukturen konzentriert...                                │
│                                                             │
│   ⚡ 23509ms │ 📦 sigma                                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ [____________________________] [SENDEN]                     │
└─────────────────────────────────────────────────────────────┘
```

---

### 📈 GRAPHS Tab
**Komponente:** `GraphsPanel.tsx`

Visualisierung von System-Metriken:
- **Latency Distribution** (Histogram)
- **Request Timeline** (Line Chart)
- **Wrapper Usage** (Pie Chart)
- **Success Rate Trend**

Powered by **Recharts** für interaktive Graphen.

---

### 📦 WRAPPERS Tab
**Komponente:** `WrapperControl.tsx`

Vollständige CRUD-Verwaltung der Wrapper/Felder:

| Action | Icon | Beschreibung |
|--------|------|--------------|
| **VIEW** | 👁️ | Wrapper Content anzeigen |
| **STATS** | 📊 | Per-Wrapper Statistiken |
| **EDIT** | ✏️ | Content bearbeiten |
| **AKTIV** | 🎯 | Als Default aktivieren |
| **DELETE** | 🗑️ | Wrapper löschen |
| **GEBÄREN** | 🌟 | Neuen Wrapper erstellen |
```
┌─────────────────────────────────────────────────────────────┐
│ 📦 WRAPPER CONTROL                    14 Felder │ 1 aktiv  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   SIGMA     │  │  DEEPSWEEP  │  │   HUMAN     │         │
│  │   1.5 KB    │  │   2.0 KB    │  │   1.3 KB    │         │
│  │   ● AKTIV   │  │             │  │             │         │
│  │ [VIEW][STATS│  │ [VIEW][STATS│  │ [VIEW][STATS│         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**StatsModal** zeigt pro Wrapper:
- Total Requests
- Success Rate (%)
- Average / Median / Min / Max Latency
- Performance Rating (EXCELLENT/GOOD/ATTENTION)

---

### 📊 ANALYTICS Tab
**Komponente:** `StatsPanel.tsx` / `SystemStats.tsx`

Aggregierte System-Statistiken:
- **Total Requests** (all-time)
- **Success Rate** (%)
- **Average Latency** (ms)
- **Wrapper Usage Distribution**
- **24h Trend**

---

### 🌊 FLOW Tab
**Komponente:** `FlowPanel.tsx` / `FieldFlowVisualizer.tsx`

Visualisierung des Resonanz-Flusses:
```
┌─────────────────────────────────────────────────────────────┐
│ 🌊 FIELD FLOW                                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1_INCOMING ──▶ 2_WRAPPERS ──▶ 3_CALIBRATED               │
│        │              │              │                      │
│        ▼              ▼              ▼                      │
│   [Prompt]      [Chain Load]   [Field Merge]               │
│                                      │                      │
│                                      ▼                      │
│   5_RESPONSE ◀── 4_BACKEND ◀────────┘                      │
│        │              │                                     │
│        ▼              ▼                                     │
│   [Output]      [LLM Call]                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔌 API INTEGRATION

### Base URL
```
https://dev.syntx-system.com
```

### Endpoints

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `GET` | `/health` | System Health Check |
| `GET` | `/resonanz/health` | Resonanz Service Health |
| `GET` | `/resonanz/config/default-wrapper` | Aktiven Wrapper holen |
| `PUT` | `/resonanz/config/default-wrapper` | Default Wrapper setzen |
| `GET` | `/resonanz/wrappers` | Alle Wrapper auflisten |
| `GET` | `/resonanz/wrapper/{name}` | Wrapper Detail + Content |
| `POST` | `/resonanz/wrapper` | Neuen Wrapper erstellen |
| `PUT` | `/resonanz/wrapper/{name}` | Wrapper aktualisieren |
| `DELETE` | `/resonanz/wrapper/{name}` | Wrapper löschen |
| `POST` | `/resonanz/wrappers/{name}/activate` | Wrapper aktivieren |
| `GET` | `/resonanz/strom` | Event Stream (limit, stage) |
| `GET` | `/resonanz/training` | Training Data |
| `GET` | `/resonanz/stats` | Globale Statistiken |
| `GET` | `/resonanz/stats/wrapper/{name}` | Per-Wrapper Stats |
| `POST` | `/resonanz/chat` | Chat mit LLM |
| `GET` | `/resonanz/history/{request_id}` | Request History |

### API Client Usage
```typescript
import { api } from '@/lib/api';

// Health Check
const health = await api.getHealth();

// Wrapper Operations
const wrappers = await api.getWrappers();
const wrapper = await api.getWrapper('sigma');
await api.activateWrapper('sigma');

// Chat
const response = await api.chat({
  prompt: "Was ist SYNTX?",
  mode: "syntex_wrapper_sigma",
  max_new_tokens: 100
});

// Statistics
const stats = await api.getStats();
const wrapperStats = await api.getWrapperStats('sigma');
```

---

## 🎨 KOMPONENTEN

### UI Components (`/components/ui/`)

| Component | Beschreibung |
|-----------|--------------|
| `Button` | Primary/Secondary/Ghost/Danger Variants |
| `Card` | Glass Container mit Border |
| `Input` | Cyber-styled Input Field |
| `StatusBadge` | Health/Error/Warning Badges |
| `LiveBadge` | LIVE/OFFLINE Indicator mit Pulse |
| `Toast` | Notification System |
| `Tooltip` | Hover Tooltips mit Glow |
| `Skeleton` | Loading States (Card/Table/Stats) |
| `ParticleField` | Floating Particles Background |
| `ProgressBar` | Animated Progress mit Glow |
| `GlassCard` | Glassmorphism mit Tilt Effect |
| `SearchBar` | Fuzzy Search Input |
| `Pagination` | Page Navigation |
| `ExportButton` | JSON/CSV Export |

### Usage Examples
```tsx
import { 
  Tooltip, 
  GlassCard, 
  ProgressBar,
  ParticleField,
  Skeleton 
} from '@/components/ui';

// Tooltip
<Tooltip content="Klicke zum Aktivieren" position="top" color="#00d4ff">
  <Button>AKTIVIEREN</Button>
</Tooltip>

// GlassCard mit Tilt
<GlassCard variant="cyan" hover="tilt">
  <h3>Wrapper Stats</h3>
  <ProgressBar value={95} color="#10b981" showLabel />
</GlassCard>

// Particle Background
<ParticleField count={30} colors={['#00d4ff', '#d946ef']} speed="slow" />

// Loading State
{loading ? <Skeleton variant="card" /> : <ActualContent />}
```

---

## 🌊 DESIGN SYSTEM

### Farben
```css
:root {
  --syntx-bg: #030b15;        /* Background */
  --syntx-dark: #0a1628;      /* Cards */
  --syntx-cyan: #00d4ff;      /* Primary */
  --syntx-magenta: #d946ef;   /* Accent */
  --syntx-green: #10b981;     /* Success */
  --syntx-orange: #f59e0b;    /* Warning */
  --syntx-red: #ef4444;       /* Error */
  --syntx-purple: #8b5cf6;    /* Secondary */
}
```

### Animationen

| Animation | Beschreibung | Dauer |
|-----------|--------------|-------|
| `glow` | Pulsierender Glow | 2s |
| `float` | Schwebendes Element | 6s |
| `scan` | Scan Line Effect | 2s |
| `glitch` | Glitch Distortion | 0.3s |
| `shimmer` | Loading Shimmer | 2s |
| `heartbeat` | Double Pulse | 1.5s |
| `orbit` | Kreisende Bewegung | 3s |
| `data-flow` | Aufsteigende Partikel | 3s |

### CSS Utilities
```css
/* Glass Effect */
.glass { backdrop-filter: blur(20px); background: rgba(255,255,255,0.03); }

/* Glow Effects */
.glow-sm { box-shadow: 0 0 10px var(--syntx-glow); }
.glow-lg { box-shadow: 0 0 40px var(--syntx-glow); }

/* Text Glow */
.text-glow { text-shadow: 0 0 10px currentColor; }

/* Hover Effects */
.hover-lift:hover { transform: translateY(-8px); }
.hover-glow:hover { box-shadow: 0 0 30px var(--syntx-cyan); }
```

---

## 📁 PROJEKTSTRUKTUR
```
syntx-wrapper-frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main Dashboard
│   │   ├── layout.tsx         # Root Layout
│   │   ├── globals.css        # 1087 lines of cyber styles
│   │   └── api/auth/          # Auth Endpoints
│   │
│   ├── components/
│   │   ├── analytics/         # Stats & Stream Components
│   │   ├── chat/              # Chat Interface
│   │   ├── data/              # Data Panel
│   │   ├── flow/              # Flow Visualization
│   │   ├── graphs/            # Charts & Graphs
│   │   ├── health/            # Health Status
│   │   ├── layout/            # Header, Main Layout
│   │   ├── system/            # System Panel
│   │   ├── ui/                # Reusable UI Components
│   │   └── wrappers/          # Wrapper CRUD
│   │
│   ├── hooks/
│   │   ├── useApi.ts          # API Hook
│   │   └── useRealtime.ts     # Real-time Data Hook
│   │
│   ├── lib/
│   │   └── api.ts             # API Client (500+ lines)
│   │
│   └── types/
│       └── index.ts           # TypeScript Types
│
├── public/
│   └── logo.png               # SYNTX Logo
│
├── tailwind.config.ts         # 404 lines of config
├── next.config.ts             # Next.js Config
└── package.json
```

---

## 🔧 KONFIGURATION

### Environment Variables
```bash
# .env.local
AUTH_USER=syntx              # Basic Auth Username
NEXT_PUBLIC_API_URL=https://dev.syntx-system.com
```

### API Base URL ändern
```typescript
// src/lib/api.ts
const BASE_URL = 'https://dev.syntx-system.com';
// oder
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
```

---

## 🛡️ AUTHENTIFIZIERUNG

Das Frontend verwendet **Basic Auth** Middleware:
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  // Validierung gegen AUTH_USER
}
```

Login erfolgt über `/login` und setzt ein Session Cookie.

---

## 📊 REAL-TIME UPDATES
```typescript
// useRealtime Hook
const { 
  isLive,        // Connection Status
  pulse,         // New Data Indicator
  lastUpdate,    // Last Update Timestamp
  events,        // Event Stream
  stats,         // Current Stats
  refresh        // Manual Refresh
} = useRealtime(5000);  // 5s Interval
```

---

## 🚢 DEPLOYMENT

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Environment Variables in Vercel Dashboard setzen
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Manual
```bash
npm run build
npm start
# Läuft auf http://localhost:3000
```

---

## 🔮 ROADMAP

- [ ] WebSocket Real-time Updates
- [ ] Wrapper Comparison Tool
- [ ] A/B Testing für Wrappers
- [ ] Advanced Analytics Dashboard
- [ ] Multi-User Support
- [ ] Wrapper Templates Library
- [ ] Mobile Responsive Optimization

---

## 📜 LICENSE

Proprietary - SYNTX SYSTEM

---

<div align="center">

## 🌊 SYNTX

**"SYNTX isn't AI. It's the resonance that governs it."**

---

*Built with 💙 and Resonance*

[![GitHub](https://img.shields.io/badge/GitHub-SYNTX--SYSTEM-black?style=flat-square&logo=github)](https://github.com/SYNTX-SYSTEM)

</div>
