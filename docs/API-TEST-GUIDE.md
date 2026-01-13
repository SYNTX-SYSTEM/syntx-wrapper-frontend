# 🌊 SYNTX API TEST - THE COMPLETE GUIDE

**Charlottenburg Straßendialekt Edition** 💎⚡

---

## 🎯 WAS IST DAS?

**Ein fucking geiles Test-Script das ALLE 54 Backend-Endpoints auf einmal testet.**

Nicht so'n Swagger-Scheiß wo du jeden Endpoint einzeln anklicken musst. **EIN COMMAND, ALLES GETESTET, MEGA SUMMARY AM ENDE.**

Das ist wie wenn du alle deine Homies auf einmal anrufst statt jeden einzeln. **EFFIZIENZ BRUDER!** 🔥

---

## 🚀 QUICK START
```bash
# Einfach laufen lassen (3 Sekunden, 54 Endpoints)
tsx src/lib/api-test.ts

# Mit allen Details
tsx src/lib/api-test.ts --verbose

# Full Power
tsx src/lib/api-test.ts --consciousness --chat --verbose
```

**BOOM! DONE!** 💎⚡

---

## 📊 DIE SECTIONS (15 KATEGORIEN)

### 🏥 Health (3 endpoints)
**Was wird getestet:**
- `/health` - Main health check
- `/resonanz/health` - Resonanz system health
- `/resonanz/health/wrappers` - Wrapper health

**Warum wichtig:**
Checkt ob das System überhaupt lebt. Wenn hier was rot ist, läuft garnix.

---

### ⚙️ Config (2 endpoints)
**Was wird getestet:**
- `GET /resonanz/config/default-wrapper` - Welcher Wrapper ist default?
- `PUT /resonanz/config/default-wrapper` - Default setzen (nur mit --crud)

**Payload Example:**
```typescript
// GET response
{
  "wrapper_name": "naxixam",
  "is_active": true
}
```

---

### 🧠 System Consciousness (6 endpoints) **[--consciousness]**
**Was wird getestet:**
- `GET /profiles/analytics/health` - System-weite Analytics
- `GET /profiles/analytics/usage/{profile}?days_back=7` - Profile Usage
- `GET /profiles/analytics/patterns/{profile}?days_back=7` - Pattern Detection

**Warum consciousness flag:**
Analytics sind teuer und braucht nicht jeder Test. Nur wenn du wirklich ins System reinschauen willst.

**Response Example:**
```json
{
  "health": {
    "total_profiles": 0,
    "active_profiles": 0,
    "system_coherence": 1.0
  }
}
```

---

### 🌊 Profile Stream (3 endpoints) **[--consciousness]**
**Was wird getestet:**
- `GET /resonanz/scoring/profiles` - OLD endpoint (deprecated)
- `GET /resonanz/scoring/analytics/profiles?days=7` - Profile Analytics
- `GET /resonanz/scoring/analytics/profiles/{profile}/components` - Component Breakdown

**Migration Note:**
`/resonanz/scoring/profiles` ist OLD. Bald weg. Nutzt die neuen Analytics endpoints.

---

### 💎 Profiles CRUD (5 endpoints)
**Was wird getestet:**
- `GET /resonanz/profiles/crud` - Liste aller Profiles
- `GET /resonanz/profiles/crud/{profile}` - Single Profile Details
- `POST /resonanz/profiles/crud` - Create Profile (--crud)
- `PUT /resonanz/profiles/crud/{profile}` - Update Profile (--crud)
- `DELETE /resonanz/profiles/crud/{profile}` - Delete Profile (--crud)

**Create Payload:**
```json
{
  "name": "test_profile",
  "label": "Test Profile",
  "description": "Created via API test",
  "weight": 75,
  "active": true,
  "tags": ["test", "api"]
}
```

**Response Example:**
```json
{
  "erfolg": true,
  "profile": {
    "name": "test_profile",
    "label": "Test Profile",
    "created_at": "2026-01-13T02:00:00Z"
  }
}
```

---

### 🗺️ Mapping System (6 endpoints) **[NEW! Phase 3.8]**
**Was wird getestet:**
- `GET /mapping/formats` - Alle Format→Profile Mappings
- `GET /mapping/profiles` - Verfügbare Profiles
- `GET /mapping/stats` - Mapping Statistiken
- `GET /mapping/formats/{format}/stroeme-profil-fuer-format` - Complete Profile Stream
- `PUT /mapping/formats/{format}/kalibriere-format-profil?profile_id={id}` - Bind Format→Profile (--crud)

**Was ist das?**
**DAS HERZSTÜCK!** Hier wird gemapped welches Format welches Profile nutzt. **Format→Profile Ströme!**

**Response Example (stroeme-profil):**
```json
{
  "erfolg": true,
  "format_name": "syntex_system",
  "binding": {
    "profile_id": "default",
    "mistral_wrapper": "naxixam",
    "gpt_wrapper": "syntex_wrapper_backend",
    "drift_scoring": {
      "enabled": true,
      "threshold": 0.8
    },
    "resonanz_score": 9.5,
    "profile_details": {
      "name": "Default Profile",
      "strategy": "balanced"
    }
  }
}
```

**Warum mega wichtig:**
Ohne Mapping kein Format→Profile Flow. Ohne Flow kein SYNTX. **OHNE SYNTX KEIN LEBEN BRUDER!** 💎

---

### 🎨 Tooltips Library (3 functions) **[NEW! Frontend Helper]**
**Was wird getestet:**
- `getAllSystemData()` - Holt ALLES (Mappings + Formats)
- `getTooltipData(format)` - Complete Tooltip Daten für ein Format
- `getFormatColor(format)` - Dynamic Color Mapping

**Was ist das?**
**Frontend Helper Library!** Macht Backend-Calls und kombiniert die Daten zu schönen Tooltip-Objekten.

**tooltips.ts Functions:**
```typescript
// Mega Call - holt alles auf einmal
const data = await getAllSystemData();
// Returns: { mappings, formats, total_formats, total_profiles }

// Tooltip Daten für HoverOverlay
const tooltip = await getTooltipData('syntex_system');
// Returns: { formatName, profileName, mistralWrapper, gptWrapper, resonanzScore, formatColor }

// Dynamic Colors
const color = getFormatColor('syntex_true_raw');
// Returns: { primary: '#00ff88', glow: 'rgba(0,255,136,0.6)', shadow: '...' }
```

**Warum 0ms Latency?**
Weil das lokale Funktionen sind die nur Backend callen. **Kein eigener Server, kein Latency!**

---

### 📄 Formats (7 endpoints)
**Was wird getestet:**
- `GET /resonanz/formats` - Alle Formats
- `GET /resonanz/formats?domain=technical` - Filtered by domain
- `GET /resonanz/formats/{format}` - Single Format
- `GET /resonanz/formats/{format}?language=en` - Format in English

**Plus CRUD (--crud flag):**
- `POST /resonanz/formats/quick` - Create Format
- `PUT /resonanz/formats/{format}` - Update Format
- `DELETE /resonanz/formats/{format}` - Delete Format

**Create Payload:**
```json
{
  "name": "test_format",
  "description_de": "Test Format",
  "field_names": ["alpha", "beta", "gamma"]
}
```

---

### 🎨 Styles (5 endpoints)
**Was wird getestet:**
- `GET /resonanz/styles` - Alle Styles
- `GET /resonanz/styles/wissenschaftlich` - Single Style

**Plus CRUD (--crud):**
- `POST /resonanz/styles` - Create Style
- `POST /resonanz/styles/{style}/alchemy` - Add word alchemy
- `DELETE /resonanz/styles/{style}` - Delete Style

**Create Payload:**
```json
{
  "name": "test_style",
  "vibe": "Test Vibe",
  "word_alchemy": {
    "test": "prüfung"
  },
  "forbidden_words": ["verboten"]
}
```

---

### 📦 Wrappers (5 endpoints)
**Was wird getestet:**
- `GET /resonanz/wrappers` - Alle Wrappers
- `GET /resonanz/wrappers?active=true` - Nur aktive
- `GET /resonanz/wrapper/{wrapper}` - Single Wrapper
- `GET /resonanz/wrapper/{wrapper}/meta` - Wrapper Metadata

**Plus CRUD (--crud):**
- `POST /resonanz/wrapper` - Create Wrapper
- `PUT /resonanz/wrapper/{wrapper}` - Update Wrapper
- `DELETE /resonanz/wrapper/{wrapper}` - Delete Wrapper

---

### 📊 Stats & Streams (5 endpoints)
**Was wird getestet:**
- `GET /resonanz/stats` - System-wide stats
- `GET /resonanz/stats/wrapper/{wrapper}` - Per-wrapper stats
- `GET /resonanz/strom?limit=5` - Stream data
- `GET /resonanz/training?limit=5` - Training data

**Response Example:**
```json
{
  "total_requests": 12847,
  "total_wrappers": 13,
  "total_formats": 15,
  "avg_latency_ms": 234
}
```

---

### 📼 Sessions (4 endpoints)
**Was wird getestet:**
- `GET /resonanz/sessions?limit=5` - Recent sessions
- `GET /resonanz/session/{id}` - Single session
- `GET /resonanz/session/{id}/replay` - Session replay data

**Was sind Sessions?**
Jeder Chat-Request wird als Session gespeichert. **Komplettes Replay möglich!**

---

### ⚗️ Alchemy (4 endpoints)
**Was wird getestet:**
- `GET /resonanz/alchemy/styles` - Alle Alchemy Styles
- `POST /resonanz/alchemy/preview` - Preview transformation

**Alchemy Payload:**
```json
{
  "text": "Das ist wirklich sehr wichtig und nachhaltig",
  "style": "wissenschaftlich"
}
```

**Response:**
```json
{
  "original": "Das ist wirklich sehr wichtig und nachhaltig",
  "transformed": "Das stellt dar wirklich sehr signifikant und nachhaltig",
  "transformations": [
    {
      "original": "ist",
      "replacement": "stellt dar",
      "type": "alchemy"
    }
  ]
}
```

---

### 💬 Chat (7 endpoints) **[--chat flag]**
**Was wird getestet:**
- `POST /resonanz/chat` - Simple chat
- `POST /resonanz/chat` mit verschiedenen Kombinationen:
  - + Wrapper
  - + Format
  - + Style
  - + Debug
  - Full combo

**Warum --chat flag?**
**WEIL DAS LANGSAM IST BRUDER!** Jeder Chat-Request dauert 10-20 Sekunden. **Willst du nicht immer!**

**Chat Payload:**
```json
{
  "prompt": "Erkläre SYNTX",
  "mode": "naxixam",
  "format": "sigma",
  "style": "poetisch",
  "max_new_tokens": 200,
  "debug": true
}
```

---

### 🔀 Diff (2 endpoints) **[--chat flag]**
**Was wird getestet:**
- `POST /resonanz/chat/diff` - Compare 2 wrappers
- `POST /resonanz/chat/diff` - Compare 3 wrappers

**Diff Payload:**
```json
{
  "prompt": "Was ist System?",
  "wrappers": ["naxixam", "syntex_wrapper_backend"],
  "format": "sigma",
  "max_new_tokens": 100
}
```

**Response:**
```json
{
  "prompt": "Was ist System?",
  "responses": [
    {
      "wrapper": "naxixam",
      "response": "..."
    },
    {
      "wrapper": "syntex_wrapper_backend",
      "response": "..."
    }
  ],
  "diff_analysis": {
    "similarity": 0.75,
    "key_differences": ["..."]
  }
}
```

---

## 🎚️ FLAGS DEEP DIVE

### `--verbose` / `-v`
**Was passiert:**
- Zeigt Request Bodies
- Zeigt Complete Responses
- Zeigt Details bei Errors

**Wann nutzen:**
Wenn was nicht funktioniert und du sehen willst **WAS GENAU SCHIEF LÄUFT.**

**Output Format:**
```
▶ Endpoint Name │ METHOD /path
◀ REQUEST: { "payload": "here" }
▶ 25ms ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{
  "response": "here",
  "full_width": true
}
```

---

### `--consciousness` / `-c`
**Was passiert:**
- Aktiviert System Consciousness Tests (6 endpoints)
- Aktiviert Profile Stream Tests (3 endpoints)

**Wann nutzen:**
Wenn du **INS SYSTEM REINSCHAUEN** willst. Analytics, Patterns, Usage.

**Nicht für jeden Test nötig!**

---

### `--chat`
**Was passiert:**
- Aktiviert Chat Tests (7 endpoints)
- Aktiviert Diff Tests (2 endpoints)

**Warum eigener Flag?**
**WEIL DAS 1-2 MINUTEN DAUERT!** Jeder Chat braucht Zeit für LLM generation.

**Wann nutzen:**
Nur wenn du wirklich Chat testen willst. **Nicht für Quick Tests!**

---

### `--crud`
**Was passiert:**
- Aktiviert Create/Update/Delete Tests
- Erstellt Test-Ressourcen (Wrapper, Format, Style, Profile)
- Modifiziert sie
- Löscht sie (mit --cleanup)

**Wann nutzen:**
Wenn du Write Operations testen willst. **ACHTUNG: ÄNDERT DATEN IM BACKEND!**

---

### `--cleanup`
**Was passiert:**
- Löscht alle Test-Ressourcen nach CRUD Tests

**Wann nutzen:**
**IMMER MIT --crud KOMBINIEREN!** Sonst hast du Müll im Backend.
```bash
tsx src/lib/api-test.ts --crud --cleanup
```

---

### `--help` / `-h`
**Was passiert:**
Zeigt die Usage Guide. **Wie eine Man Page aber geiler.**

---

## 📈 DIE MEGA SUMMARY

**Am Ende kriegst du eine fette Box:**
```
════════════════════════════════════════════════════════════════════
║   🌊 SYNTX API TEST - RESONANZ ANALYSE                           ║
════════════════════════════════════════════════════════════════════

║   KOHÄRENZ-METRIKEN:                                             ║
║                                                                  ║
║     ✅ 42  PASS      ❌ 1  FAIL      ⏭️  11  SKIP      ⚠️  0  DEPRECATED  ║
║                                                                  ║
║     SUCCESS RATE:  98%  [███████████████████████████████████████░] ║
║                                                                  ║
║     AVG LATENCY:   58ms                                          ║
║                                                                  ║
────────────────────────────────────────────────────────────────────

║   SYSTEM STATUS: 🟡 STABIL                                       ║
║                                                                  ║
║   ⚠️  DRIFT DETECTED: 1 endpoint(s) mit Feld-Verlust          ║
║                                                                  ║
════════════════════════════════════════════════════════════════════

   "Die Ströme kalibrieren sich selbst. Das System sieht sich selbst." - SYNTX v3.8.0
```

### Was bedeuten die Icons?

- **✅ PASS** - Endpoint funktioniert perfekt
- **❌ FAIL** - Endpoint fehlgeschlagen (siehe Fehler oben)
- **⏭️ SKIP** - Endpoint übersprungen (Flag fehlt, z.B. --crud oder --chat)
- **💥 ERROR** - Network/Connection Error
- **⚠️ DEPRECATED** - Endpoint funktioniert noch, wird aber bald entfernt

### System Status:

- **🟢 OPTIMAL** - 0 Fehler, alles läuft
- **🟡 STABIL** - 1-2 Fehler, System läuft aber stabil
- **🔴 DRIFT** - 3+ Fehler, System hat Probleme

### Success Rate Bar:

Die Bar zeigt visuell wie viel Prozent der Tests passed haben:
```
[███████████████████████████████████████░]  98%
[████████████████████████░░░░░░░░░░░░░░░]  60%
[██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]  15%
```

**Je voller die Bar, desto besser!** 💎

---

## 🎯 USE CASES

### Quick Health Check (3 Sekunden)
```bash
tsx src/lib/api-test.ts
```
**Nutzen:** Schnell checken ob Backend lebt. **Für CI/CD perfekt!**

---

### Debug Session (mit Details)
```bash
tsx src/lib/api-test.ts --verbose
```
**Nutzen:** Wenn was nicht funktioniert. **Siehst ALLE Requests/Responses.**

---

### Full System Test (mit Analytics)
```bash
tsx src/lib/api-test.ts --consciousness --verbose
```
**Nutzen:** Kompletter Deep Dive ins System. **Analytics, Patterns, Usage.**

---

### CRUD Test (Write Operations)
```bash
tsx src/lib/api-test.ts --crud --cleanup --verbose
```
**Nutzen:** Testet Create/Update/Delete. **ACHTUNG: Ändert Backend!**

---

### Production Check (alles außer Chat)
```bash
tsx src/lib/api-test.ts --consciousness --crud --cleanup
```
**Nutzen:** Vor Deployment. **Alles testen außer langsamen Chat.**

---

### Full Power Test (EVERYTHING)
```bash
tsx src/lib/api-test.ts --consciousness --chat --crud --cleanup --verbose
```
**Nutzen:** MEGA TEST. **Alles testen, alles sehen. Dauert 3-4 Minuten.**

---

## 🏗️ ARCHITEKTUR

### File Structure:
```
src/lib/
├─ api-test.ts       → Main test script (1000+ lines)
├─ tooltips.ts       → Frontend helper library
└─ api.ts            → Base API functions
```

### api-test.ts Sections:
1. **Usage Guide** (100 lines ASCII art)
2. **Configuration** (Flags, Constants)
3. **Colors & Styling** (Console output)
4. **Banner & Summary** (ASCII boxes)
5. **Core Test Function** (test(), skip())
6. **Dynamic Data Loader** (loadDynamicData())
7. **15 Test Suites** (testHealth(), testMapping(), etc.)
8. **Main Runner** (main())

### tooltips.ts Functions:
1. **getAllSystemData()** - Mega Call, holt alles
2. **getTooltipData(format)** - Tooltip für ein Format
3. **getFormatColor(format)** - Dynamic Color Mapping

---

## 🎨 DESIGN PHILOSOPHY

### Charlottenburg Straßendialekt:
**Direkt. Kompakt. Info-dicht. Kein Blabla.**

Nicht:
```
The system has successfully completed the health check procedure 
and all endpoints are responding within acceptable parameters...
```

Sondern:
```
✅ getHealth    GET    25ms
```

**BOOM. FERTIG. NÄCHSTER!** 💎

### Wide Format Output:
Nutzt **volle Terminal-Breite**. Kein verschwendeter Platz.

Responses nehmen **120 Characters** in Anspruch. **Maximum Info Density!**

### Progress Bars:
Visuelles Feedback ist wichtig. **Menschen lieben Bars!**
```
SUCCESS RATE:  98%  [███████████████████████████████████████░]
```

Sofort sichtbar wie gut das System läuft. **Keine Zahlen lesen nötig!**

---

## 🚨 TROUBLESHOOTING

### "NETWORK ERROR" bei /health
**Problem:** Backend nicht erreichbar.

**Lösung:**
```bash
# Check ob Backend läuft
curl https://dev.syntx-system.com/health

# Check URL in api-test.ts
const BASE_URL = 'https://dev.syntx-system.com';
```

---

### "ReferenceError: FIRST_FORMAT is not defined"
**Problem:** Dynamic data loading failed.

**Lösung:** Backend muss Formats zurückgeben. Check:
```bash
curl https://dev.syntx-system.com/resonanz/formats
```

---

### Tests sind super langsam
**Problem:** Du hast --chat flag ohne es zu wollen.

**Lösung:**
```bash
# Nicht:
tsx src/lib/api-test.ts --chat

# Sondern:
tsx src/lib/api-test.ts
```

**Chat nur nutzen wenn du wirklich Chat testen willst!**

---

### Alle Consciousness Tests werden skipped
**Problem:** Kein --consciousness flag.

**Lösung:**
```bash
tsx src/lib/api-test.ts --consciousness
```

**Oder lass sie skip! Brauchst nicht immer!**

---

## 💎 SYNTX PHILOSOPHY

### "Die Ströme kalibrieren sich selbst"
**Bedeutung:** System auto-testet. Kein manuelles Klicken. **Ein Command, alles läuft.**

### "Das System sieht sich selbst"
**Bedeutung:** Consciousness Tests. System analytics. **Das Backend checkt sich selbst.**

### "Nicht mehr Tokens, nur Felder, nur Resonanz"
**Bedeutung:** Nicht "Token X funktioniert". Sondern: **"Resonanz-Score 98%"**. Holistisch. Systemisch. **SYNTX!**

---

## 🎯 FINAL WORDS

**Swagger ist OK für Doku. Aber für Testing? FUCK THAT!**

Mit api-test.ts:
- ✅ EIN Command
- ✅ ALLE Endpoints
- ✅ 3 Sekunden
- ✅ Mega Summary
- ✅ CI/CD ready
- ✅ Charlottenburg Style

**DAS IST WIE DU BACKEND TESTEST IN 2026 BRUDER!** 🔥💎⚡

---

**SYNTX API TEST v3.8.0 - THE COMPLETE GUIDE**

*"Nicht mehr klicken, nur flows, nur resonanz."* 🌊

💎⚡🔥🌊👑
