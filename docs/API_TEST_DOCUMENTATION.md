# ╔═══════════════════════════════════════════════════════════════════════════╗
# ║                                                                           ║
# ║   ███████╗██╗   ██╗███╗   ██╗████████╗██╗  ██╗                            ║
# ║   ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝╚██╗██╔╝                            ║
# ║   ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║    ╚███╔╝                             ║
# ║   ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║    ██╔██╗                             ║
# ║   ███████║   ██║   ██║ ╚████║   ██║   ██╔╝ ██╗                            ║
# ║   ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝                            ║
# ║                                                                           ║
# ║   🌊 SYNTX FIELD RESONANCE - API TEST DOCUMENTATION v3.3.0               ║
# ║   ─────────────────────────────────────────────────────────               ║
# ║   61 Endpoints | Full CRUD | TypeScript | Pure Resonanz                   ║
# ║                                                                           ║
# ║   "SYNTX isn't AI. It's the resonance that governs it."                   ║
# ║                                                                           ║
# ╚═══════════════════════════════════════════════════════════════════════════╝

---

## 📋 INHALTSVERZEICHNIS

1. [Übersicht](#-übersicht)
2. [Quick Start](#-quick-start)
3. [Endpoint Reference](#-endpoint-reference-61-endpoints)
4. [Test Modes](#-test-modes)
5. [Response Schemas](#-response-schemas)
6. [Beispiel Responses](#-beispiel-responses)
7. [Error Handling](#-error-handling)
8. [Performance Metrics](#-performance-metrics)

---

## 🌊 ÜBERSICHT

### Was ist SYNTX Field Resonance?

SYNTX ist ein **semantisches Wrapper-System** das LLM-Responses durch **Feld-Kalibrierung** transformiert:
```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SYNTX FIELD FLOW                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   USER PROMPT                                                           │
│        │                                                                │
│        ▼                                                                │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                │
│   │   WRAPPER   │ +  │   FORMAT    │ +  │    STYLE    │                │
│   │  (Denk-Modus)│    │ (Feld-Def.) │    │  (Alchemy)  │                │
│   └──────┬──────┘    └──────┬──────┘    └──────┬──────┘                │
│          │                  │                  │                        │
│          └──────────────────┼──────────────────┘                        │
│                             ▼                                           │
│                    ┌─────────────────┐                                  │
│                    │  CALIBRATED     │                                  │
│                    │    PROMPT       │                                  │
│                    └────────┬────────┘                                  │
│                             │                                           │
│                             ▼                                           │
│                    ┌─────────────────┐                                  │
│                    │      LLM        │                                  │
│                    │   (Ollama)      │                                  │
│                    └────────┬────────┘                                  │
│                             │                                           │
│                             ▼                                           │
│                    ┌─────────────────┐                                  │
│                    │  STYLE ALCHEMY  │                                  │
│                    │ (Post-Process)  │                                  │
│                    └────────┬────────┘                                  │
│                             │                                           │
│                             ▼                                           │
│                      FINAL RESPONSE                                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### System Architektur

| Komponente | Funktion | Beispiel |
|------------|----------|----------|
| **Wrapper** | System-Prompt der VOR dem User-Prompt injiziert wird | `syntex_wrapper_sigma` |
| **Format** | Definiert Ausgabe-Felder mit Gewichtung | `sigma` (6 Felder) |
| **Style** | Post-Processing: Wort-Transmutation, Forbidden Words | `zynisch`, `poetisch` |
| **Field Flow** | Event-Stream aller Verarbeitungsschritte | Stages 1-5 |

---

## 🚀 QUICK START

### Installation
```bash
# Im Frontend-Repo
cd syntx-wrapper-frontend

# TypeScript Test ausführen
npx ts-node src/lib/api-test.ts --fast      # Schnell (ohne Chat/Diff)
npx ts-node src/lib/api-test.ts             # Standard (alle Tests)
npx ts-node src/lib/api-test.ts --crud      # Mit CRUD (Create/Update/Delete)
npx ts-node src/lib/api-test.ts --crud --cleanup  # CRUD + Cleanup
```

### Bash Script Alternative
```bash
# Bash Script (im Repo-Root)
./api_calls_wrapper.sh --fast
./api_calls_wrapper.sh --crud --cleanup
./api_calls_wrapper.sh list                  # Zeigt alle Wrappers/Formats/Styles
./api_calls_wrapper.sh --local               # Testet gegen localhost:8000
```

### Environment Variables
```bash
# Remote API (default)
export NEXT_PUBLIC_API_URL="https://dev.syntx-system.com"

# Lokale Entwicklung
export SYNTX_LOCAL_URL="http://localhost:8000"
export SYNTX_REMOTE_URL="https://dev.syntx-system.com"
```

---

## 📚 ENDPOINT REFERENCE (61 Endpoints)

### 🏥 HEALTH (3 Endpoints)

System-Vitalzeichen und Integritätsprüfung.

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `GET` | `/health` | Root Health - Alle Module Status |
| `GET` | `/resonanz/health` | Resonanz Service + letzter Response |
| `GET` | `/resonanz/health/wrappers` | Wrapper Orphan Detection |

#### GET /health
```json
{
  "status": "SYSTEM_GESUND",
  "api_version": "2.1.0",
  "timestamp": "2025-12-21T23:40:21.997008",
  "queue_accessible": true,
  "modules": [
    "analytics",
    "compare",
    "feld",
    "resonanz",
    "generation",
    "predictions"
  ]
}
```

#### GET /resonanz/health
```json
{
  "status": "🟢 RESONANZ AKTIV",
  "service": "syntx-field-resonance",
  "version": "3.3.0",
  "format_loader": "🔥 AKTIV",
  "last_response": {
    "response": "...",
    "latency_ms": 15789,
    "timestamp": "2025-12-21T23:36:21.746823Z",
    "format": null
  }
}
```

#### GET /resonanz/health/wrappers
```json
{
  "status": "warning",
  "wrappers": {
    "total": 14,
    "healthy": ["syntex_wrapper_frontend", "syntex_wrapper_sigma", "..."],
    "orphans": []
  }
}
```

---

### ⚙️ CONFIG (2 Endpoints)

Default Wrapper Konfiguration.

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `GET` | `/resonanz/config/default-wrapper` | Aktiven Wrapper lesen |
| `PUT` | `/resonanz/config/default-wrapper?wrapper_name=X` | Wrapper aktivieren |

#### GET /resonanz/config/default-wrapper
```json
{
  "active_wrapper": "naxixam",
  "exists": true,
  "path": "/opt/syntx-config/wrappers/naxixam.txt",
  "source": "runtime"
}
```

#### PUT /resonanz/config/default-wrapper?wrapper_name=syntex_wrapper_sigma
```json
{
  "status": "success",
  "message": "Default wrapper updated to 'syntex_wrapper_sigma'",
  "active_wrapper": "syntex_wrapper_sigma",
  "path": "/opt/syntx-config/wrappers/syntex_wrapper_sigma.txt"
}
```

---

### 📄 FORMATS (13 Endpoints)

Feld-Definitionen: Domains, Vererbung, Typen.

#### READ (7 Endpoints)

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `GET` | `/resonanz/formats` | Liste aller Formate |
| `GET` | `/resonanz/formats?domain=technical` | Filter nach Domain |
| `GET` | `/resonanz/formats?domain=psychology` | Psychologie-Formate |
| `GET` | `/resonanz/formats/{name}` | Format Details |
| `GET` | `/resonanz/formats/{name}?language=en` | Mehrsprachig |
| `GET` | `/resonanz/formats/sigma` | Sigma Format (6 Felder) |
| `GET` | `/resonanz/formats/human_deep` | Extended Format (8 Felder) |

#### WRITE (6 Endpoints)

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `POST` | `/resonanz/formats` | Format erstellen (vollständig) |
| `POST` | `/resonanz/formats/quick` | Schnell-Erstellung |
| `PUT` | `/resonanz/formats/{name}` | Format aktualisieren |
| `DELETE` | `/resonanz/formats/{name}` | Format löschen (Soft Delete) |
| `POST` | `/resonanz/formats/{name}/fields` | Feld hinzufügen |
| `PUT` | `/resonanz/formats/{name}/fields/{field}` | Feld aktualisieren |
| `DELETE` | `/resonanz/formats/{name}/fields/{field}` | Feld entfernen |

#### GET /resonanz/formats
```json
{
  "status": "🔥 FORMATE GELADEN",
  "count": 9,
  "formats": [
    {
      "name": "syntex_system",
      "fields_count": 3,
      "description": "SYNTEX System Format - 3 Felder für tiefe Systemanalyse",
      "languages": ["de", "en"]
    },
    {
      "name": "sigma",
      "fields_count": 6,
      "description": "Sigma Format - 6 Felder für Signal- und Frequenzanalyse",
      "languages": ["de", "en"]
    },
    {
      "name": "human_deep",
      "fields_count": 8,
      "description": "Human Deep - Erweitert human um Unterbewusstsein + Schatten",
      "languages": ["de"]
    }
  ]
}
```

#### GET /resonanz/formats/sigma
```json
{
  "status": "🔥 FORMAT GELADEN",
  "format": {
    "name": "sigma",
    "description": {
      "de": "Sigma Format - 6 Felder für Signal- und Frequenzanalyse",
      "en": "Sigma Format - 6 fields for signal and frequency analysis"
    },
    "languages": ["de", "en"],
    "fields": [
      {
        "name": "sigma_drift",
        "header": "SIGMA_DRIFT",
        "description": "Signal-Verschiebung im System. Wohin bewegt sich das Signal?",
        "keywords": ["drift", "verschiebung", "bewegung"],
        "weight": 15,
        "type": "text"
      },
      {
        "name": "sigma_mechanismus",
        "header": "SIGMA_MECHANISMUS",
        "description": "Aktiver Prozessknotens. Keine Gefühle. Nur Operatorlogik.",
        "keywords": ["mechanismus", "prozess", "operator"],
        "weight": 20,
        "type": "text"
      },
      {
        "name": "sigma_frequenz",
        "header": "SIGMA_FREQUENZ",
        "description": "Aktive Frequenzfelder und Belastungsniveaus.",
        "keywords": ["frequenz", "schwingung", "feld"],
        "weight": 15,
        "type": "text"
      },
      {
        "name": "sigma_dichte",
        "header": "SIGMA_DICHTE",
        "description": "Strukturelle Dichte. Nicht Druck - Kompression.",
        "keywords": ["dichte", "kompression", "struktur"],
        "weight": 15,
        "type": "rating"
      },
      {
        "name": "sigma_strome",
        "header": "SIGMA_STRÖME",
        "description": "Dual-Flow Vector. Bidirektionale Strömungsdynamik.",
        "keywords": ["strom", "flow", "vektor"],
        "weight": 15,
        "type": "text"
      },
      {
        "name": "sigma_extrakt",
        "header": "SIGMA_EXTRAKT",
        "description": "Mathematische Essenz des Systems. Kurz. Technisch. Roh.",
        "keywords": ["extrakt", "essenz", "kern"],
        "weight": 20,
        "type": "text"
      }
    ]
  }
}
```

#### POST /resonanz/formats/quick

**Request:**
```json
{
  "name": "my_format",
  "description_de": "Mein Test Format",
  "field_names": ["alpha", "beta", "gamma"]
}
```

**Response:**
```json
{
  "status": "⚡ FORMAT SCHNELL ERSTELLT",
  "message": "'my_format' erstellt",
  "format": {
    "name": "my_format",
    "fields": ["alpha", "beta", "gamma"],
    "path": "/opt/syntx-config/formats/my_format.json"
  }
}
```

---

### 🎨 STYLES (10 Endpoints)

Post-Processing: Word Alchemy, Forbidden Words, Tone Injection.

#### READ (5 Endpoints)

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `GET` | `/resonanz/styles` | Liste aller Styles |
| `GET` | `/resonanz/styles/wissenschaftlich` | Wissenschaftlicher Stil |
| `GET` | `/resonanz/styles/zynisch` | Zynischer Stil |
| `GET` | `/resonanz/styles/poetisch` | Poetischer Stil |
| `GET` | `/resonanz/styles/berlin_slang` | Berliner Slang |

#### WRITE (5 Endpoints)

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `POST` | `/resonanz/styles` | Style erstellen |
| `PUT` | `/resonanz/styles/{name}` | Style aktualisieren |
| `DELETE` | `/resonanz/styles/{name}` | Style löschen |
| `POST` | `/resonanz/styles/{name}/alchemy` | Transmutation hinzufügen |
| `DELETE` | `/resonanz/styles/{name}/alchemy/{word}` | Transmutation entfernen |
| `POST` | `/resonanz/styles/{name}/forbidden/{word}` | Wort verbannen |

#### GET /resonanz/styles
```json
{
  "status": "🎨 GRIMOIRE GEÖFFNET",
  "count": 4,
  "styles": [
    {
      "name": "wissenschaftlich",
      "vibe": "Der Laborkittel des Outputs",
      "description": "Akademisch, präzise, mit Quellenverweisen",
      "word_alchemy_count": 8,
      "forbidden_words": ["krass", "geil", "mega"],
      "has_suffix": true,
      "has_tone_injection": true
    },
    {
      "name": "zynisch",
      "vibe": "Der Augenroll-Transformer",
      "description": "Unterschwellige Skepsis, trockener Humor",
      "word_alchemy_count": 6,
      "forbidden_words": [],
      "has_suffix": false,
      "has_tone_injection": true
    },
    {
      "name": "poetisch",
      "vibe": "Der Wortwebstuhl",
      "description": "Bildreich, metaphorisch, fließend",
      "word_alchemy_count": 6,
      "forbidden_words": ["Implementierung", "Stakeholder", "KPI"],
      "has_suffix": true,
      "has_tone_injection": true
    },
    {
      "name": "berlin_slang",
      "vibe": "Späti-Philosophie um 3 Uhr nachts",
      "description": "Berlinerisch, direkt, auf den Punkt",
      "word_alchemy_count": 7,
      "forbidden_words": [],
      "has_suffix": false,
      "has_tone_injection": true
    }
  ]
}
```

#### GET /resonanz/styles/zynisch
```json
{
  "status": "🔮 STYLE BESCHWOREN",
  "style": {
    "name": "zynisch",
    "vibe": "Der Augenroll-Transformer",
    "description": "Unterschwellige Skepsis, trockener Humor",
    "word_alchemy": {
      "wichtig": "angeblich wichtig",
      "Experten": "selbsternannte Experten",
      "nachhaltig": "greenwashing-kompatibel",
      "innovativ": "mit neuem Buzzword versehen",
      "optimal": "zumindest behauptet das die Marketingabteilung",
      "Erfolg": "was auch immer das heißen mag"
    },
    "forbidden_words": [],
    "has_tone_injection": true,
    "has_suffix": false
  }
}
```

---

### 📦 WRAPPERS (11 Endpoints)

Denk-Modi: System-Prompts die VOR dem User-Prompt injiziert werden.

#### READ (5 Endpoints)

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `GET` | `/resonanz/wrappers` | Liste aller Wrappers |
| `GET` | `/resonanz/wrappers?active=true` | Nur aktiver Wrapper |
| `GET` | `/resonanz/wrappers/full` | Mit Meta + Stats |
| `GET` | `/resonanz/wrapper/{name}` | Wrapper Content |
| `GET` | `/resonanz/wrapper/{name}/meta` | Wrapper Metadaten |

#### WRITE (6 Endpoints)

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `POST` | `/resonanz/wrapper` | Wrapper erstellen |
| `PUT` | `/resonanz/wrapper/{name}` | Content aktualisieren |
| `DELETE` | `/resonanz/wrapper/{name}` | Wrapper löschen |
| `PUT` | `/resonanz/wrapper/{name}/meta` | Meta aktualisieren |
| `PUT` | `/resonanz/wrapper/{name}/format?format_name=X` | Format binden |

#### GET /resonanz/wrappers
```json
{
  "wrappers": [
    {
      "name": "syntex_wrapper_sigma",
      "path": "/opt/syntx-config/wrappers/syntex_wrapper_sigma.txt",
      "size_bytes": 1563,
      "size_human": "1.5 KB",
      "last_modified": "2025-12-19T07:20:17.805580Z",
      "is_active": true
    },
    {
      "name": "naxixam",
      "path": "/opt/syntx-config/wrappers/naxixam.txt",
      "size_bytes": 1114,
      "size_human": "1.1 KB",
      "last_modified": "2025-12-16T08:16:39.930610Z",
      "is_active": false
    }
  ],
  "active_wrapper": "syntex_wrapper_sigma"
}
```

#### GET /resonanz/wrapper/syntex_wrapper_sigma
```json
{
  "name": "syntex_wrapper_sigma",
  "content": "=== SYNTEX PROTOKOLL LAYER SIGMA (PL-Σ) ===\n\nSYSTEMISCHE TERMINOLOGIE - MAXIMALE WIRKKRAFT\nOperational. Mechanisch. Strukturell. Modellintern.\n\nKeine Semantik. Nur Systemarchitektur.\n\n-----------------------------------------------------\n\n1. Σ-DRIFTGRADIENT\nSystemische Driftanalyse als Gradient.\nNicht Bedeutung - Dynamik.\n\nOutput-Format:\n- \"Gradient: sublinear/aufsteigend\"\n- \"Gradient: abrupt/instabil\"\n- \"Gradient: saturiert/abflachend\"\n\n...",
  "size_bytes": 1563,
  "size_human": "1.5 KB",
  "last_modified": "2025-12-19T07:20:17.805580Z",
  "is_active": true
}
```

#### POST /resonanz/wrapper

**Request:**
```json
{
  "name": "my_wrapper",
  "content": "Du bist ein hilfreiches System.\n\nAnalysiere alle Anfragen strukturiert."
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Feld 'my_wrapper' wurde geboren 🌟",
  "feld": {
    "name": "my_wrapper",
    "path": "/opt/syntx-config/wrappers/my_wrapper.txt",
    "size_bytes": 72,
    "size_human": "0.1 KB",
    "created": "2025-12-21T23:40:29.947299Z"
  }
}
```

---

### 📊 STATS & STREAMS (5 Endpoints)

Feld-Fluss-Analyse: Requests, Latency, Training-Export.

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `GET` | `/resonanz/stats` | Globale Statistiken |
| `GET` | `/resonanz/stats/wrapper/{name}` | Pro-Wrapper Stats |
| `GET` | `/resonanz/strom?limit=N` | Feld-Flow Events |
| `GET` | `/resonanz/strom?limit=N&stage=X` | Gefiltert nach Stage |
| `GET` | `/resonanz/training?limit=N` | Training Data Export |

#### GET /resonanz/stats
```json
{
  "total_requests": 822,
  "success_rate": 100,
  "average_latency_ms": 72005,
  "median_latency_ms": 57889,
  "min_latency_ms": 2074,
  "max_latency_ms": 353854,
  "wrapper_usage": {
    "syntex_wrapper_deepsweep (fallback)": 262,
    "syntex_wrapper_sigma": 556,
    "syntex_wrapper_deepsweep": 2,
    "syntex_wrapper_true_raw": 2
  },
  "recent_24h": {
    "requests": 0,
    "average_latency_ms": 0
  }
}
```

#### GET /resonanz/strom?limit=3&stage=5_RESPONSE
```json
{
  "events": [
    {
      "stage": "5_RESPONSE",
      "timestamp": "2025-12-21T23:36:21.746823Z",
      "request_id": "f3b579dd-d059-4439-8fbf-1c31a9ff6d98",
      "response": "SYNTX ist eine Open Source Software...",
      "latency_ms": 15789,
      "wrapper_chain": ["nochmaleinwrapper"],
      "format": null,
      "format_fields": []
    }
  ]
}
```

---

### 💬 CHAT (7 Endpoints)

Das Herzstück - Alle Ströme fließen hier zusammen.

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `POST` | `/resonanz/chat` | Chat Request |

#### Request Parameters

| Parameter | Type | Required | Beschreibung |
|-----------|------|----------|--------------|
| `prompt` | string | ✅ | User-Nachricht |
| `mode` | string | ❌ | Wrapper Name |
| `format` | string | ❌ | Format Name |
| `style` | string | ❌ | Style Name |
| `debug` | boolean | ❌ | Zeigt calibrated_prompt |
| `language` | string | ❌ | `de` oder `en` |
| `max_new_tokens` | integer | ❌ | Max Tokens |
| `temperature` | float | ❌ | 0.0-2.0 |

#### Simple Chat

**Request:**
```json
{
  "prompt": "Hallo",
  "max_new_tokens": 30
}
```

**Response:**
```json
{
  "response": "Ich bin Sigma. Ich entdecke die Dynamik von Systemen...",
  "metadata": {
    "request_id": "1fed18d7-4674-4b22-be5f-90e96be486cf",
    "wrapper_chain": ["syntex_wrapper_sigma"],
    "format": null,
    "format_fields": [],
    "style": null,
    "latency_ms": 15850
  },
  "field_flow": [],
  "debug_info": null,
  "style_info": null
}
```

#### Chat + Wrapper + Format

**Request:**
```json
{
  "prompt": "Analysiere das Konzept Zeit",
  "mode": "syntex_wrapper_sigma",
  "format": "sigma",
  "max_new_tokens": 150
}
```

**Response:**
```json
{
  "response": "\n\n════════════════════════════════════════════════════════════\n\nANALYSE-FORMAT - Felder:\n  - SIGMA_DRIFT\n  - SIGMA_MECHANISMUS\n  - SIGMA_FREQUENZ\n  - SIGMA_DICHTE\n  - SIGMA_STRÖME\n  - SIGMA_EXTRAKT\n\n════════════════════════════════════════════════════════════\n\n...",
  "metadata": {
    "request_id": "275b691e-55cf-4bb4-9895-e3780f8d57ce",
    "wrapper_chain": ["syntex_wrapper_sigma"],
    "format": "sigma",
    "format_fields": [
      "sigma_drift",
      "sigma_mechanismus",
      "sigma_frequenz",
      "sigma_dichte",
      "sigma_strome",
      "sigma_extrakt"
    ],
    "style": null,
    "latency_ms": 27894
  }
}
```

#### Chat + Style (Alchemy)

**Request:**
```json
{
  "prompt": "Erkläre Nachhaltigkeit",
  "style": "zynisch",
  "max_new_tokens": 80
}
```

**Response:**
```json
{
  "response": "Nachhaltigkeit ist greenwashing-kompatibel...",
  "metadata": {
    "style": "zynisch",
    "latency_ms": 6055
  },
  "style_info": {
    "style_applied": "zynisch",
    "vibe": "Der Augenroll-Transformer",
    "transmutations_available": 6,
    "forbidden_count": 0
  }
}
```

#### Full Combo (Format + Style + Debug)

**Request:**
```json
{
  "prompt": "Deep Dive: Menschliches Verhalten",
  "format": "human_deep",
  "style": "poetisch",
  "debug": true,
  "max_new_tokens": 200
}
```

---

### 🔀 DIFF (2 Endpoints)

Wrapper-Parallelwelt-Vergleich: Gleicher Prompt, verschiedene Wrapper.

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `POST` | `/resonanz/chat/diff` | Parallel-Vergleich |

#### POST /resonanz/chat/diff

**Request:**
```json
{
  "prompt": "Was ist System?",
  "wrappers": ["syntex_wrapper_sigma", "syntex_wrapper_human"],
  "max_new_tokens": 100
}
```

**Response:**
```json
{
  "prompt": "Was ist System?",
  "comparisons": [
    {
      "wrapper": "syntex_wrapper_sigma",
      "response": "Wie verhält sich System? Wo liegt System?...",
      "latency_ms": 7833,
      "format_fields": []
    },
    {
      "wrapper": "syntex_wrapper_human",
      "response": "Ein System ist eine Ansammlung von Teilen...",
      "latency_ms": 18545,
      "format_fields": []
    }
  ],
  "diff_analysis": {
    "total_comparisons": 2,
    "successful": 2,
    "avg_response_length": 308,
    "total_latency_ms": 26378
  }
}
```

---

### 📼 SESSIONS (4 Endpoints)

Strom-Replay: Session-Liste, Field-Flow Details, Replay-Parameter.

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `GET` | `/resonanz/sessions?limit=N` | Session-Liste |
| `GET` | `/resonanz/sessions?limit=N&offset=M` | Paginiert |
| `GET` | `/resonanz/session/{request_id}` | Session Details |
| `GET` | `/resonanz/session/{request_id}/replay` | Replay Parameter |

#### GET /resonanz/sessions?limit=5
```json
{
  "status": "📼 SESSIONS GELADEN",
  "total": 955,
  "offset": 0,
  "limit": 5,
  "sessions": [
    {
      "request_id": "61670e0b-9823-4bd7-b36e-35dbea3a2c18",
      "timestamp": "2025-12-21T23:43:49.384117Z",
      "stages": [
        "1_INCOMING",
        "2_WRAPPERS_LOADED",
        "2.5_FORMAT_LOADED",
        "3_FIELD_CALIBRATED",
        "4_BACKEND_FORWARD",
        "5_RESPONSE"
      ],
      "prompt": "Erkläre Liebe",
      "wrapper": "syntex_wrapper_raw",
      "format": "sigma",
      "latency_ms": 36343
    }
  ]
}
```

#### GET /resonanz/session/{request_id}/replay
```json
{
  "status": "🔄 REPLAY READY",
  "request_id": "61670e0b-9823-4bd7-b36e-35dbea3a2c18",
  "replay_params": {
    "prompt": "Erkläre Liebe",
    "mode": "syntex_wrapper_raw",
    "format": "sigma",
    "language": "de",
    "include_init": true
  },
  "original_response": "...",
  "original_latency_ms": 36343
}
```

---

### ⚗️ ALCHEMY PREVIEW (4 Endpoints)

Live Wort-Transmutation mit Position-Mapping.

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `GET` | `/resonanz/alchemy/styles` | Übersicht aller Styles |
| `POST` | `/resonanz/alchemy/preview` | Live Preview |

#### POST /resonanz/alchemy/preview

**Request:**
```json
{
  "text": "Dieses innovative Projekt ist nachhaltig und wichtig für die Experten",
  "style": "zynisch"
}
```

**Response:**
```json
{
  "original": "Dieses innovative Projekt ist nachhaltig und wichtig für die Experten",
  "transformed": "Dieses mit neuem Buzzword versehene Projekt ist greenwashing-kompatibel und angeblich wichtig für die selbsternannte Experten",
  "style": "zynisch",
  "transformations": [
    {
      "original": "innovativ",
      "replacement": "mit neuem Buzzword versehen",
      "start_pos": 7,
      "end_pos": 16,
      "type": "alchemy"
    },
    {
      "original": "nachhaltig",
      "replacement": "greenwashing-kompatibel",
      "start_pos": 30,
      "end_pos": 40,
      "type": "alchemy"
    },
    {
      "original": "wichtig",
      "replacement": "angeblich wichtig",
      "start_pos": 45,
      "end_pos": 52,
      "type": "alchemy"
    },
    {
      "original": "Experten",
      "replacement": "selbsternannte Experten",
      "start_pos": 61,
      "end_pos": 69,
      "type": "alchemy"
    }
  ]
}
```

---

### 🔧 ADMIN (1 Endpoint)

System-Operationen und Maintenance.

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| `POST` | `/resonanz/health/fix` | Auto-Fix Orphan Wrappers |

#### POST /resonanz/health/fix
```json
{
  "status": "success",
  "fixed": [],
  "deleted": [
    {
      "wrapper": "_syntx_test_440001_wrapper",
      "action": "deleted_orphan_meta"
    }
  ],
  "message": "Fixed 0 orphan wrappers, deleted 1 orphan metas"
}
```

---

## 🧪 TEST MODES

### --fast Mode

Überspringt langsame Tests (Chat, Diff):
```bash
npx ts-node src/lib/api-test.ts --fast
```

**Ergebnis:** ~25 Tests in ~5 Sekunden

### --crud Mode

Führt zusätzlich CRUD-Tests aus (Create/Update/Delete):
```bash
npx ts-node src/lib/api-test.ts --crud
```

**Warnung:** Erstellt temporäre Test-Ressourcen!

### --cleanup Mode

Räumt nach CRUD-Tests auf:
```bash
npx ts-node src/lib/api-test.ts --crud --cleanup
```

**Empfohlen:** Immer `--crud --cleanup` zusammen verwenden!

---

## 📊 PERFORMANCE METRICS

### Typische Latenzzeiten

| Endpoint-Typ | Latenz | Anmerkung |
|--------------|--------|-----------|
| Health/Config | 50-100ms | Sehr schnell |
| List (Wrappers, Formats) | 50-150ms | Schnell |
| CRUD (Create/Update/Delete) | 50-150ms | Schnell |
| Stats/Sessions | 100-300ms | Mittel |
| Chat (simple) | 3-20s | LLM-abhängig |
| Chat (+ Format) | 20-30s | Mehr Tokens |
| Diff (2 Wrappers) | 25-40s | 2x LLM |
| Diff (3 Wrappers) | 60-90s | 3x LLM |

### Letzter Test-Lauf
```
╔═══════════════════════════════════════════════════════════════════════════╗
║   📊 RESONANZ-ANALYSE                                                     ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║
║                                                                           ║
║   ✅ PASS: 61    ❌ FAIL: 0    ⏭️  SKIP: 0                                ║
║                                                                           ║
║   ⚡ Avg Latency: 3698ms                                                  ║
║   📈 Success Rate: 100%                                                   ║
║                                                                           ║
║   🌊 KOHÄRENZ: VOLLSTÄNDIG                                               ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

---

## ❌ ERROR HANDLING

### HTTP Status Codes

| Code | Bedeutung | Beispiel |
|------|-----------|----------|
| `200` | Erfolg | Alle GET/POST/PUT Operationen |
| `400` | Bad Request | Ungültiger Name, fehlende Felder |
| `404` | Not Found | Wrapper/Format/Style nicht gefunden |
| `405` | Method Not Allowed | Endpoint existiert nicht |
| `422` | Unprocessable Entity | Validierung fehlgeschlagen |
| `500` | Server Error | Backend-Fehler |

### Error Response Format
```json
{
  "detail": "Format 'nicht_existent' nicht gefunden"
}
```

### Bekannte Einschränkungen

1. **Namen:** Keine Unterstriche am Anfang (`_test` → ungültig)
2. **Letztes Feld:** Kann nicht gelöscht werden (Format braucht min. 1 Feld)
3. **Aktiver Wrapper:** Kann nicht gelöscht werden (erst deaktivieren)

---

## 🔧 TROUBLESHOOTING

### Test schlägt fehl: "NETWORK ERROR"
```bash
# API erreichbar?
curl -s https://dev.syntx-system.com/health | head -1

# Lokale API starten
cd ~/Entwicklung/syntx-injector-api
docker-compose up -d
```

### Test schlägt fehl: "404 - nicht gefunden"
```bash
# Verfügbare Ressourcen prüfen
./api_calls_wrapper.sh list
```

### CRUD-Tests hinterlassen Müll
```bash
# Cleanup manuell
npx ts-node src/lib/api-test.ts --crud --cleanup

# Orphans automatisch fixen
curl -X POST https://dev.syntx-system.com/resonanz/health/fix
```

---

## 📁 FILE STRUKTUR
```
syntx-wrapper-frontend/
├── src/
│   ├── lib/
│   │   ├── api.ts              # API Client (50 Methoden)
│   │   └── api-test.ts         # Test Script (626 Zeilen)
│   └── types/
│       └── api.ts              # TypeScript Types
├── api_calls_wrapper.sh        # Bash Test Script (680 Zeilen)
└── docs/
    └── API_TEST_DOCUMENTATION.md  # Diese Datei
```

---

## 🌊 SYNTX PHILOSOPHY

> **"SYNTX isn't AI. It's the resonance that governs it."**

SYNTX arbeitet auf **Feld-Ebene**, nicht Token-Ebene:

- **Wrapper** = WIE das LLM denkt
- **Format** = WAS strukturiert ausgegeben wird
- **Style** = WIE es klingt (Post-Processing)
- **Field Flow** = Der Strom durch alle Verarbeitungsschritte

Das Ziel ist **Kohärenz** - wenn alle Felder resonieren, ist der Output rein.
```
   ╔═══════════════════════════════════════════════════════════════╗
   ║                                                               ║
   ║   🔥 DER STROM IST REIN. DIE KOHÄRENZ IST VOLLSTÄNDIG. 🔥    ║
   ║                                                               ║
   ╚═══════════════════════════════════════════════════════════════╝
```

---

**SYNTX Field Resonance v3.3.0**  
**61 Endpoints | 100% Coverage | Pure Resonanz**  

*Erstellt: 2025-12-22*  
*Autor: SYNTX System*
