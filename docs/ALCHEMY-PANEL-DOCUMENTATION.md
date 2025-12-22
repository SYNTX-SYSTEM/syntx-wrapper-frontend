# ⚗️ ALCHEMY PANEL DOKUMENTATION

> **"Worte sind nur die Oberfläche. Alchemy transformiert die FELDER."**

---

## 🎯 WAS IST DAS ALCHEMY PANEL?

Das Alchemy Panel ist der **Wort-Transmutations-Arbeitsplatz** - hier werden Texte durch Style-spezifische Regeln transformiert.

**4 Styles. Unendliche Transmutationen. Ein Grimoire.**

Das ist kein Text-Replacer. Das ist **Feld-Alchemie**.

---

## 💎 WARUM EXISTIERT ES?

### Das Problem (Token-Denken)
- Text wird 1:1 verarbeitet
- Output klingt generisch
- Keine Persönlichkeit
- **Tote Worte. Keine Seele.**

### Die Lösung (Feld-Denken)
- **Styles** definieren Persönlichkeit
- **Word Alchemy** transformiert Ausdrücke
- **Forbidden Words** werden entfernt
- **Tone Injection** fügt Vibe hinzu

**Du schreibst nicht Text. Du transmutierst Felder.**

---

## 🔥 DIE 4 STYLES

### 🍺 BERLIN SLANG
```
Vibe: "Späti-Philosophie um 3 Uhr nachts"
Beschreibung: Berlinerisch, direkt, auf den Punkt

Transmutationen:
- "Das ist" → "Dit is"
- "Das" → "Dit"
- ... (7 Regeln)

Forbidden Words: keine
Tone Injection: aktiv
```

### 🙄 ZYNISCH
```
Vibe: "Der Augenroll-Transformer"
Beschreibung: Unterschwellige Skepsis, trockener Humor

Transmutationen: 6 Regeln
Forbidden Words: keine
Tone Injection: aktiv
```

### 🔬 WISSENSCHAFTLICH
```
Vibe: "Der Laborkittel des Outputs"
Beschreibung: Akademisch, präzise, mit Quellenverweisen

Transmutationen:
- "ist" → "stellt dar"
- ... (8 Regeln)

Forbidden Words: 
- ❌ krass
- ❌ geil
- ❌ mega
- ❌ echt
- ❌ halt

Suffix: [Dieser Beitrag basiert auf der aktuellen Forschungslage.]
Tone Injection: aktiv
```

### 🌸 POETISCH
```
Vibe: "Der Wortwebstuhl"
Beschreibung: Bildreich, metaphorisch, fließend

Transmutationen: 6 Regeln

Forbidden Words:
- ❌ Implementierung
- ❌ Stakeholder
- ❌ KPI

Tone Injection: aktiv
```

---

## 🏗️ KOMPONENTEN-ARCHITEKTUR
```
AlchemyPanel.tsx (468 Zeilen)
├── COLORS & CONFIG
│   ├── COLORS Object (8 Farben inkl. gold)
│   ├── STYLE_COLORS (Style → Farbe Mapping)
│   └── STYLE_ICONS (Style → Emoji Mapping)
│
├── INTERFACES
│   ├── Style (Backend Style Definition)
│   └── AlchemyResult (Transformation Response)
│
├── COMPONENTS
│   └── StyleCard (einzelne Style-Karte)
│
├── EFFECTS STATES
│   ├── isShaking (Shake Animation)
│   ├── particles (Particle Array)
│   └── glowIntensity (Glow Stärke)
│
└── MAIN ALCHEMY PANEL
    ├── Header (Titel, Stats)
    ├── Style Grid (4 Style Cards)
    └── Transmutation Zone
        ├── Input Textarea
        ├── Transform Button
        ├── Result Display
        ├── Stats Cards
        └── Transformations List
```

---

## 🔌 API ENDPOINTS

### Styles Liste
```typescript
GET /resonanz/styles

Response:
{
  "status": "🎨 GRIMOIRE GEÖFFNET",
  "count": 4,
  "styles": [
    {
      "name": "berlin_slang",
      "vibe": "Späti-Philosophie um 3 Uhr nachts",
      "description": "Berlinerisch, direkt, auf den Punkt",
      "word_alchemy_count": 7,
      "forbidden_words": [],
      "has_suffix": false,
      "has_tone_injection": true
    },
    // ... weitere Styles
  ]
}
```

### Alchemy Preview (Live Transmutation)
```typescript
POST /resonanz/alchemy/preview
Content-Type: application/json

Request:
{
  "text": "Das ist ein krass geiler Test",
  "style": "wissenschaftlich"
}

Response:
{
  "original": "Das ist ein krass geiler Test",
  "transformed": "Das stellt dar ein er Test für...",
  "style": "wissenschaftlich",
  "transformations": [
    {
      "original": "ist",
      "replacement": "stellt dar",
      "start_pos": 4,
      "end_pos": 7,
      "type": "alchemy"
    },
    {
      "original": "krass",
      "replacement": "[ENTFERNT]",
      "start_pos": 12,
      "end_pos": 17,
      "type": "forbidden"
    }
  ],
  "stats": {
    "alchemy_count": 1,
    "forbidden_count": 2,
    "original_length": 29,
    "transformed_length": 115,
    "has_suffix": true,
    "has_tone_injection": true
  }
}
```

---

## 🎨 UI FEATURES

### Style Cards
- **Icon** (Style-spezifisches Emoji)
- **Name** (BERLIN SLANG, ZYNISCH, etc.)
- **Vibe** (Kurzbeschreibung in Anführungszeichen)
- **Description** (Längere Erklärung)
- **Stats Badges**:
  - ⚗️ X Transmutationen
  - 🚫 X Verboten (wenn vorhanden)
  - 💉 Tone Injection (wenn aktiv)
- **Forbidden Words Liste** (durchgestrichen)
- **Selection State** (Glow + Border wenn aktiv)

### Transmutation Zone
- **Style Indicator** (zeigt aktuellen Style)
- **Input Textarea** (Original Text)
- **Transform Button** (mit Shake Animation)
- **Result Box** (transformierter Text)
- **Stats Cards**:
  - Transmutationen Count
  - Zeichen (vorher → nachher)
  - Entfernt Count (wenn > 0)
- **Transformations Detail List**:
  - Original (durchgestrichen, rot)
  - → Pfeil
  - Replacement (grün)
  - Type Badge (alchemy/forbidden)

---

## 🔧 STATE MANAGEMENT
```typescript
// Data States
const [styles, setStyles] = useState<Style[]>([]);
const [selectedStyle, setSelectedStyle] = useState<string>('berlin_slang');
const [inputText, setInputText] = useState('Das ist ein krass geiler Test...');
const [result, setResult] = useState<AlchemyResult | null>(null);

// UI States
const [loading, setLoading] = useState(true);
const [transforming, setTransforming] = useState(false);
const [showResult, setShowResult] = useState(false);

// Effect States
const [isShaking, setIsShaking] = useState(false);
const [particles, setParticles] = useState<Array<{id: number; x: number; y: number}>>([]);
const [glowIntensity, setGlowIntensity] = useState(0);
```

---

## ⚡ EFFECTS & ANIMATIONS

### Shake Effect
```typescript
// Beim Klick auf TRANSMUTIEREN
setIsShaking(true);
setTimeout(() => setIsShaking(false), 500);
```
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
```

### Glow Effect
```typescript
setGlowIntensity(100);
setTimeout(() => setGlowIntensity(0), 1000);

// Applied as:
boxShadow: glowIntensity > 0 
  ? `0 0 ${60 + glowIntensity}px ${color}80`
  : `0 0 60px ${color}20`
```

### Particle Effect
```typescript
const newParticles = Array.from({length: 20}, (_, i) => ({
  id: Date.now() + i,
  x: Math.random() * 100,  // % position
  y: Math.random() * 100
}));
setParticles(newParticles);
setTimeout(() => setParticles([]), 2000);
```
```css
@keyframes particleFly {
  0% { opacity: 1; transform: translate(0, 0) scale(1); }
  100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); }
}
```

### Result Reveal
```css
@keyframes resultReveal {
  0% { opacity: 0; transform: translateY(20px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
```

---

## 🔄 TRANSFORM FLOW
```
1. User klickt TRANSMUTIEREN
   │
   ▼
2. Effects starten
   ├── setIsShaking(true)
   ├── setGlowIntensity(100)
   └── setParticles([...20 particles])
   │
   ▼
3. API Call
   POST /resonanz/alchemy/preview
   { text: inputText, style: selectedStyle }
   │
   ▼
4. Response verarbeiten
   ├── setShowResult(false)
   ├── setTimeout → setResult(data)
   └── setTimeout → setShowResult(true)
   │
   ▼
5. Effects enden
   ├── setTimeout(500ms) → setIsShaking(false)
   ├── setTimeout(1000ms) → setGlowIntensity(0)
   └── setTimeout(2000ms) → setParticles([])
   │
   ▼
6. Result erscheint mit Animation
   animation: resultReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

## 🎨 STYLE CARD SELECTION
```typescript
// Click Handler
onSelect={() => setSelectedStyle(style.name)}

// Visual Feedback
isSelected ? {
  background: `linear-gradient(135deg, ${color}30, ${color}10)`,
  border: `2px solid ${color}`,
  boxShadow: `0 0 40px ${color}30`,
  transform: 'scale(1.02)'
} : {
  background: 'linear-gradient(135deg, rgba(10,26,46,0.9), rgba(6,13,24,0.95))',
  border: '1px solid rgba(255,255,255,0.1)'
}
```

---

## 📊 STATS DISPLAY

### Transmutationen Card
```jsx
<div style={{ background: `${COLORS.gold}20` }}>
  <div style={{ fontSize: 24, color: COLORS.gold }}>
    {result.stats.alchemy_count}
  </div>
  <div>Transmutationen</div>
</div>
```

### Zeichen Card
```jsx
<div style={{ background: `${COLORS.cyan}20` }}>
  <div style={{ fontSize: 24, color: COLORS.cyan }}>
    {result.stats.original_length} → {result.stats.transformed_length}
  </div>
  <div>Zeichen</div>
</div>
```

### Entfernt Card (conditional)
```jsx
{result.stats.forbidden_count > 0 && (
  <div style={{ background: `${COLORS.red}20` }}>
    <div style={{ fontSize: 24, color: COLORS.red }}>
      {result.stats.forbidden_count}
    </div>
    <div>Entfernt</div>
  </div>
)}
```

---

## 💎 DESIGN PRINZIPIEN

1. **Alchemie-Ästhetik**
   - Gold-Akzente für Transmutationen
   - Magenta als Haupt-Highlight
   - Mystischer, aber technischer Look

2. **Feedback-Reich**
   - Shake beim Transformieren
   - Glow während der Verarbeitung
   - Particles für "magischen" Effekt
   - Result Reveal Animation

3. **Informativ**
   - Jede Transformation sichtbar
   - Stats auf einen Blick
   - Forbidden Words klar markiert

4. **Interaktiv**
   - Style Cards klickbar
   - Sofortiges visuelles Feedback
   - Hover Effects

---

## 📁 DATEISTRUKTUR
```
src/components/alchemy/
├── AlchemyPanel.tsx   (468 Zeilen - Hauptkomponente)
└── index.ts           (Export)
```

---

## 🔮 SYNTX PHILOSOPHIE

Das Alchemy Panel verkörpert SYNTX Feld-Transformation:

| Prinzip | Umsetzung |
|---------|-----------|
| **Felder statt Token** | Styles sind Feld-Konfigurationen |
| **Transformation** | Worte werden auf Feld-Ebene geändert |
| **Resonanz** | Style resoniert mit Text |
| **Sichtbarkeit** | Jede Änderung ist transparent |

### Das Geheimnis der Alchemy
```
Text-Ebene:    "Das ist krass geil"
                    │
                    ▼
Feld-Ebene:    [Umgangssprache] [Intensität] [Jugend]
                    │
                    ▼
Style Filter:  wissenschaftlich = formal, präzise
                    │
                    ▼
Feld-Trans:    [ENTFERNT] [ENTFERNT] [neutral]
                    │
                    ▼
Neuer Text:    "Das stellt dar"
```

**Du siehst die Transformation. Du verstehst das Feld.**

---

## ⚡ PERFORMANCE

- **Styles gecached**: Einmal laden, immer nutzen
- **Debouncing**: Kein Auto-Transform (bewusste Entscheidung)
- **Conditional Rendering**: Result nur wenn vorhanden
- **Animation Cleanup**: Timeouts räumen Effects auf

---

## 🚀 FUTURE FEATURES

### Geplant:
1. **Style Editor** - Eigene Styles erstellen
2. **Batch Transform** - Mehrere Texte auf einmal
3. **Alchemy History** - Vergangene Transformationen
4. **Export** - Transformierte Texte exportieren

### API-Ready aber nicht implementiert:
- `POST /resonanz/style` - Style erstellen
- `PUT /resonanz/style/{name}` - Style bearbeiten
- `POST /resonanz/style/{name}/alchemy` - Regel hinzufügen

---

**DAS IST ALCHEMY. DAS IST TRANSFORMATION. DAS IST SYNTX.** ⚗️🔮💎

---

*Dokumentation erstellt: 22.12.2025*
*SYNTX System v2.1.0*
