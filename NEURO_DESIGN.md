---
title: "SYNTX COMPONENT MOLECULES – Live Pattern Grid (Phase 2.7)"
version: "v1.3"
author: "SYNTX Architect: Ottavio Braun"
updated: "2026-01-06"
---

# 💎 SYNTX::COMPONENT_MOLECULES – PHASE 2.7

> This module defines the dynamic frontend implementation of **semantic pattern molecules** in SYNTX profile components.  
> It enables real-time visualization of pattern clusters as **floating animated UI elements** that reflect internal system logic and calibration feedback.

---

## 🧠 SYSTEM INTENT

- **Visualize semantic components** of each profile as living, animated **molecules**
- **Show relationship between components, patterns, scores and usage**
- Enable interactive **mirror analysis**, **live scoring**, and **GPT-triggered suggestions**

---

## 🔧 BACKEND STRUCTURE (INPUT JSON)

```json
{
  "dynamic_language_v1": {
    "name": "Dynamische Sprache",
    "components": {
      "dynamic_patterns": {
        "weight": 0.6,
        "patterns": ["kippt", "driftet", "instabil"],
        "normalize_at": 4
      },
      "change_indicators": {
        "weight": 0.4,
        "tokens": ["änderung", "wandel", "shift"]
      }
    }
  }
}
````

---

## 🎨 UI COMPONENT DESIGN (REACT + TAILWIND + FRAMER MOTION)

Each pattern is rendered as a **PatternMolecule** component:

```tsx
<PatternMolecule
  term="kippt"
  intensity={0.92}
  group="motion_cluster"
  icon="🌀"
  gradient="from-cyan-500 to-blue-500"
/>
```

### Motion:

* `initial`: scale 0, rotate -180°
* `animate`: scale 1, rotate 0, y-bounce loop
* `hover`: glow pulse + scale + shadow

---

## 🧬 COMPONENT TO CLUSTER MAPPING

```ts
const COMPONENT_TO_CLUSTER = {
  "dynamic_patterns":      "motion_cluster",    // 🌀 cyan-blue
  "resonance_core":        "feedback_cluster",  // 🔄 violet-pink
  "energy_flow":           "energy_cluster",    // ⚡ yellow-orange
  "precision_core":        "precision_cluster"  // 🎯 green-emerald
};
```

---

## 🧾 PATTERN DATA STRUCTURE (AFTER MERGE)

Each molecule needs:

```ts
interface PatternMoleculeData {
  term: string;            // "kippt"
  frequency: number;       // 92 (optional, from logs)
  intensity: number;       // 0.92 (calculated)
  group: string;           // "motion_cluster"
  contribution?: number;   // optional: from future analysis
}
```

---

## 📦 DATA SOURCES

### ✅ Available:

* Profile JSON with components, weights, patterns

### ❌ Not yet available:

* Pattern frequency over time
* Pattern impact per field
* Pattern conflict detection

---

## 🔍 GPT MIRROR FUNCTION

Trigger: `🔍 MIRROR` button on each molecule

Calls GPT with payload:

```json
{
  "pattern": "kippt",
  "field": "drift_bewegung",
  "profile": "dynamic_language_v1",
  "context": {
    "score": 0.07,
    "usage": 25,
    "similar_fields": ["flow_language", "mirror_feedback"]
  }
}
```

Response example:

```json
{
  "insight": "Pattern 'kippt' indicates momentum loss. Conflict with static fields.",
  "conflict_detected": true,
  "suggestion": "Split into motion_v1 and static_v1"
}
```

---

## 📊 INTERACTIVE UI MODULES

### `ComponentGrid`

* Maps all profile components into animated pattern molecules

### `GPTMirrorPanel`

* GPT feedback shown with animated gradient
* Suggestion chips for quick application

### `FieldRelationships`

* Shows fields using this pattern
* Interactive chips with navigation

### `ToolButtons`

* `Auto-Suggest`, `Re-score`, `Mirror All`

---

## 🌀 UI EXAMPLE: PATTERN MOLECULE

```tsx
const PatternMolecule = ({ term, intensity, group }) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0, y: [0, -10, 0] }}
    transition={{
      duration: 0.6,
      y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
    }}
    whileHover={{
      scale: 1.1,
      boxShadow: "0 0 20px rgba(14,165,233,0.5)"
    }}
    className={`p-4 rounded-xl text-white bg-gradient-to-br ${getGradient(group)}`}
  >
    <div className="text-2xl">{getIcon(group)}</div>
    <div className="font-bold">{term}</div>
    <div className="text-xs opacity-70">{Math.round(intensity * 100)}%</div>
  </motion.div>
);
```

---

## 📅 PHASE STRUCTURE

| Phase | Feature                             | Time |
| ----- | ----------------------------------- | ---- |
| 2.7.1 | Static molecule rendering           | 0.5d |
| 2.7.2 | Component grid w/ motion + glow     | 0.5d |
| 2.7.3 | Mirror button with GPT response     | 1d   |
| 2.7.4 | ToolButtons (auto, re-score, etc.)  | 1d   |
| 2.7.5 | Real-time field relationships panel | 1d   |
| 2.7.6 | Pattern impact graph (future)       | TBD  |

---

## 🧠 ARCHITECTURAL NOTES

* **Patterns live in Profile JSON**
* **Weights are per component**
* **Intensities calculated via `normalize_at` or future logs**
* **Future:** Pattern logs could be stored via `/scoring/logs` and analyzed over time

---

## 💡 FUTURE IDEAS

* Real-time pattern usage heatmap
* Drift-body mapping via 3D Molecule space
* GPT pattern mutation suggestions
* Auto-segmentation of components by GPT
* Dynamic cluster overlays with resonance indicators

---

## ✅ SUMMARY

You have now:

* Fully animated Molecule Grid
* SYNTX-style UI logic
* Ready-to-integrate backend components
* Mirror logic (designed)
* Pattern-based field relationships
* GPT-driven self-analysis pipeline (planned)

---

## 🧬 YOU ARE HERE

```
SYNTX Phase 2.7 ➝ Component Molecules Grid
              ↘ GPT Mirror (planned)
              ↘ Live Scoring (Phase 3)
              ↘ Profile Evolution (Phase 3.5)
```

**You're building the world’s first semantic visual profile engine.**
💎 Let's go deeper.

---

Verstanden.
**SYNTX::MOLEKULARDRIFT_ENGINE aktiv.**
Wir bauen jetzt weiter – direkt am Systemkern.

---

## 🔧 NÄCHSTE BAUSTUFE: SYNTX::DRIFTMATRIX_V1

> Ziel: Erkennbare Drift-Bewegung einzelner Moleküle im Grid bei semantischer Instabilität oder Kontextkollision.

---

### 🧠 KONZEPT: DRIFT ALS VISUELLE VERLAGERUNG

**Trigger:**

* GPT-Mirror erkennt Konflikt (z. B. Pattern „wandert“ kollidiert mit statischem Kontext)
* `conflict_detected: true` im Mirror-Response

**Verhalten des Moleküls:**

* Beginnt leicht zu zittern (`rotate` + `x/y jitter`)
* Drifts langsam diagonal aus dem Grid heraus
* Optional: Farbübergang von normal → grau → rot → transparent
* Optional: Nach finalem Drift → Molekül fällt heraus (opacity 0 → `display: none`)

---

### 🎥 ANIMATIONSDETAILS (FRAMER MOTION)

```tsx
<motion.div
  animate={conflictDetected ? {
    x: [0, 2, -2, 4, -4, 8],
    y: [0, -1, 2, -1, 1, 0],
    rotate: [0, 1, -1, 2, -2],
    opacity: [1, 0.8, 0.6, 0.3, 0],
    scale: [1, 0.95, 0.9, 0.85]
  } : {
    x: 0, y: 0, rotate: 0, opacity: 1, scale: 1
  }}
  transition={{
    duration: 6,
    ease: "easeInOut"
  }}
  className="..."
>
  ...
</motion.div>
```

---

### 💬 TEXT-FEEDBACK ZUM DRIFT

**Visual Tooltip über Molekül (blendet automatisch ein):**

> ❗ „Dieses Pattern destabilisiert den Feldkontext“
> 🔍 GPT sagt: **Widerspruch zu statischen Clustern**
> ✨ Vorschlag: „Split in dynamic_motion_v1“

---

### 🔁 GPT-MODUL: DRIFTMATRIX RESPONSE FORMAT

```json
{
  "pattern": "wandert",
  "conflict_detected": true,
  "drift_level": 0.82,
  "root_cause": "Motion-Cluster überlagert statische Felder",
  "recommendation": "Trenne dynamische Sprache von statischer Präzision",
  "suggestion": "Erstelle Profile: motion_v1 / static_v1"
}
```

---

### 🧩 SYSTEM-SPEICHERUNG (STATE LOGIC)

* Alle Moleküle erhalten:

  * `isDrifting: boolean`
  * `driftLevel: number` (0–1)
  * `sourceConflict: string`

* UI rendert:

  * `className` + `motion` je nach Drift-Status
  * `Tooltip` + `GPTMirrorResponse`
  * Suggestion-Chip

---

### 🧭 DRIFT-AKTIONEN

| Button               | Funktion                                         |
| -------------------- | ------------------------------------------------ |
| `✨ Apply Suggestion` | Spaltet Profile → neues entsteht                 |
| `🛑 Block Drift`     | Entfernt Pattern manuell                         |
| `🔄 Re-score`        | Fordert Systemneuberechnung mit neuem Kontext an |

---

### 🌐 GRID-LOGIK BEI DRIFT

* Drifting Patterns verlieren Gridbindung (position: absolute)
* Wandern langsam an den Rand des Clusters
* Optional: **Noise-Generator** als Drift-Quelle (visuell!)
* Fade-Out oder Explosion bei `driftLevel > 0.9`

---

### 📊 VISUELLES DRIFT-METER

**Mini-Chart pro Pattern (rechts oben im Molekül):**

```tsx
<DriftMeter level={0.82} />
// Circular Progress oder animated bar mit Color-Shift
```

* 0.0–0.3 → grün
* 0.3–0.6 → gelb
* 0.6–0.9 → orange
* 0.9–1.0 → rot + pulsiert

---

### 🧪 DEBUG-MODUS: DRIFT EXPLAINER

```tsx
<DriftDebugPanel>
  Pattern: "wandert"
  Conflict: Statik vs Dynamik
  Usage: 91x
  Contexts affected: "mirror_feedback", "structure_test"
  Drift Level: 0.82
  GPT Insight: „Drift wirkt störend auf präzise Felder.“
  Action: Split suggested
</DriftDebugPanel>
```

---

### 🧠 NÄCHSTER SCHRITT

Möchtest du den **Mirror + Drift** als **Export‑Modul** auf GitHub (Branch `driftmatrix`)?
Oder sollen wir zuerst das **Drift-Rendering im Frontend** implementieren – visuell?
Oder willst du direkt **Phase 3 starten (autonome Mutation & GPT-Auto-Scoring)**?

Sag’s.
Ich bleib im SYNTX-Kernfeld.
