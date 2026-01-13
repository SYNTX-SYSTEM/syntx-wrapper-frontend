# 🌊 PROFILE ORGAN - USER GUIDE (SYNTX STYLE) 💎⚡

**YO DIGGA, WILLKOMMEN IM RESONANZ-UNIVERSUM!**

Das ist das **ProfileOrgan** - das **Herz des SYNTX Systems**. Hier passiert die **Magie der semantischen Kalibrierung**. Du siehst ein lebendiges, atmendes **3D-Universum** voller **Bubbles** und **Stationen**. Aber was zum Henker ist das alles? **LOS GEHT'S!** 🔥

---

## 🔥 WAS IST DAS ÜBERHAUPT?

Stell dir vor, du bist der **DJ eines riesigen semantischen Clubs**. Die **Profile** (die bunten Bubbles) sind deine **DJs mit verschiedenen Styles**. Die **Formats** (die Hexagon-Stationen) sind die **Decks** - verschiedene Musik-Genres oder Kommunikationskanäle.

**Deine Mission:** Die richtigen DJs an die richtigen Decks stellen. Wenn ein **aggressiver DJ** (z.B. "Feedback & Loops") auf ein **deep format** wie `human_deep` trifft, dann **knallt** die **Resonanz** und die **Kommunikation wird lit!** 🔥

---

## 💎 DIE MAIN COMPONENTS

### 1. DAS ZENTRALE LOGO (Der Geburtskanal) 🌌

**Was siehst du:**
- Ein **grün glühendes Planet** in der Mitte
- **3 rotierende Orbit-Ringe** drumherum
- Das **SYNTX Logo** drin
- **Shimmer-Effekt** läuft drüber
- **Scan-Line** bewegt sich

**Was kannst du tun:**
- **KLICK DRAUF!** → Öffnet den **Planet Birth Wizard**

**Was passiert dann:**
Der **Wizard** öffnet sich - ein **Fullscreen Overlay** mit einem **pulsierenden lila Planet** oben. Hier kannst du einen **neuen Profile-Bubble kreieren**!

**Der Wizard Flow:**
1. **Display Name** eingeben (z.B. "Ottis Mega Style")
2. **Strategy wählen** (balanced, aggressive, defensive, creative, analytical)
3. **Weight slider** (0-100) - wie stark soll das Profil sein?
4. **Tags hinzufügen** (z.B. "flexible", "emotional", "technical")
5. **Klick "BIRTH PLANET"** → **BOOM!** 💥

Der neue Bubble spawnt dann im Orbit und schwebt majestätisch durch den Space!

---

### 2. DIE PROFILE BUBBLES (Die DJs) 💫

**Was siehst du:**
- **Bunte, glühende Kugeln** die im Kreis schweben
- Verschiedene **Farben** (cyan, purple, green, orange)
- **Puls-Animationen** (atmen, glühen)
- **Labels** unter den Bubbles (z.B. "Dynamische Sprache", "Otti Test Profile")

**Was sind die Farben?**
- **Cyan** (#00ffff) → Balanced Strategy
- **Purple** (#9d00ff) → Aggressive oder Analytical Strategy
- **Green** (#00ff00) → Defensive Strategy
- **Orange** (#ff9d00) → Creative Strategy

**Was kannst du tun:**

**A) HOVER DRÜBER:**
→ **MEGA TOOLTIP** erscheint!

Das Tooltip ist ein **Ghost in the Shell Style Modal** mit:
- **Header (Cyan):** Profile Name, ID, ONLINE/OFFLINE Status
- **Config (Purple):** Strategy (uppercase!), Weight (mit Fortschrittsbalken)
- **Bound Format (Green accent):** Zeigt das gebundene Format
  - **Riesiger Format-Name** (28px, mega glow!)
  - **Particles fliegen rum** (18 Stück!)
  - **Corner diamond lights** (pulsieren in den Ecken)
  - **Rotating hexagon badge** mit "LINKED" Text
  - Wenn **kein binding:** "NO LINK" in grau

**Tooltip Position:**
- **Unten am Screen?** → Öffnet nach **OBEN**
- **Oben am Screen?** → Öffnet nach **UNTEN**
- **Mitte?** → Öffnet **ZENTRIERT**

Das Tooltip hat **ZERO TRANSPARENCY** - komplett schwarz, damit das Logo nicht durchscheint! 🔥

**B) DRAG & DROP:**
→ **DIE HAUPTAKTION!**

1. **KLICK & HOLD** auf einen Bubble
2. Der Bubble wird **transparent** (0.5 opacity)
3. Ein **grüner Kreis** mit pulsierendem Ring erscheint an deinem Cursor
4. **ZIEH DEN BUBBLE** zu einer **Hexagon-Station** (Format)
5. Wenn du **näher als 100px** kommst:
   - **Grüne gepunktete Linie** erscheint zwischen Bubble und Station
   - **Binding Preview** wird aktiv
6. **LASS LOS** wenn du nah genug bist (< 100px):
   - **BINDING ERFOLGT!** 🎉
   - **Molekül-Animation** erscheint unten rechts (siehe unten)
   - **Flash Message** oben: "✅ profile_id → format_name"
   - **Feste Linie** wird zwischen Bubble und Station gezogen

**Was passiert im Hintergrund:**
- API Call: `PUT /mapping/formats/{format}/kalibriere-format-profil?profile_id={profile}`
- Wenn das Profil **schon ein anderes Format** hatte → **unbind zuerst!**
- Dann: **bind zum neuen Format**
- Store wird updated
- Tooltip wird refreshed (zeigt sofort das neue binding!)

---

### 3. DIE FORMAT STATIONS (Die Decks) 🔷

**Was siehst du:**
- **Hexagon-förmige Stationen** im Orbit
- Verschiedene **Farben** (cyan, magenta, yellow, green, orange, purple)
- **Pulse-Animationen** (scale, glow)
- **Labels** daneben (z.B. "human_deep", "syntx_true_raw", "frontend")

**Was sind die Farben?**
Jedes Format hat eine **eigene Farbe** basierend auf seinem Namen (Hash-basiert). Das sorgt für **Konsistenz** - `human_deep` ist immer die gleiche Farbe!

**Was kannst du tun:**

**A) HOVER DRÜBER:**
→ **Format Tooltip** erscheint (cyan style)

Zeigt:
- **Format Name** (groß, cyan glow)
- **Description** (wenn vorhanden)
- **Field Count** (wie viele Felder hat das Format)
- **Bound Profile** (welcher Bubble ist gebunden, wenn überhaupt)

**B) DROP TARGET:**
Wenn du einen **Profile Bubble** drauf **droppst**, passiert das **Binding** (siehe oben)!

---

### 4. DIE CONNECTION LINES (Die Kabel) ⚡

**Was siehst du:**
- **Kurvige, gepunktete Linien** zwischen Bubbles und Stations
- **Glühende Farben** (cyan, purple, etc.)
- **Animierte Dashes** (bewegen sich entlang der Linie)

**Was bedeuten sie:**
Jede Linie ist ein **aktives Binding** - ein Profile ist mit einem Format verbunden! Die **Kommunikation fließt**! 🌊

**Wie werden sie gezeichnet:**
- **Quadratic Bezier Curves** (smooth!)
- **Animated stroke-dasharray** (particles fließen)
- **Dynamic colors** basierend auf Profile-Farbe

---

### 5. FORMAT LEGEND (Die Sidebar) 📋

**Was siehst du:**
Links am Screen, eine **scrollbare Liste** mit allen Formats:
- **Format Name** (z.B. "human_deep")
- **Field Count** (z.B. "Fields: 12")
- **Glowing dot** (pulsiert)
- **Traveling star** (4px glühender Punkt fährt von links nach rechts)

**Was ist das:**
Eine **Übersicht** aller verfügbaren Formats. Die **Farben** sind die gleichen wie bei den Hexagon-Stations - so kannst du schnell sehen welches Format wo ist!

**Features:**
- **Scrollbar** (wenn mehr als 10 Formats)
- **Staggered fade-in** (jedes Item erscheint nacheinander, 0.05s delay)
- **Pulse rings** um jedes Icon
- **Glassmorphism** (leicht durchsichtig, blur)

**Warum ist das cool:**
Du kannst schnell sehen welche Formats existieren ohne durchs ganze Universum zu scrollen!

---

### 6. BINDING SUCCESS NOTIFICATION (Die Molekül-Explosion) 💥

**Wann erscheint sie:**
Nach jedem erfolgreichen **Bind** zwischen Profile und Format!

**Wo erscheint sie:**
**Unten rechts** am Screen, **4 Sekunden lang**.

**Was siehst du:**
**Eine MEGA Molekül-Animation!**
```
   Profile Atom               Format Atom
       (P)    →→→ particles →→→    (F)
    /  |  \                    /  |  \
  orbit orbit orbit        orbit orbit orbit
```

**Im Detail:**
1. **Linker Atom (P):**
   - **3 rotierende Orbits** (unterschiedliche Geschwindigkeiten)
   - **Nucleus:** 50px Kreis mit "P" (Profile color)
   - **Pulsierender Glow**

2. **Connection Line:**
   - **80px breites Band** zwischen den Atomen
   - **Gradient:** Profile color → Format color
   - **3 traveling particles** (8px glühende Punkte fliegen von links nach rechts)

3. **Rechter Atom (F):**
   - **3 rotierende Orbits** (gegen-rotierend!)
   - **Nucleus:** 50px Kreis mit "F" (Format color)
   - **Pulsierender Glow**

4. **Text unten:**
   - **Profile Label** (glühend, bouncing)
   - **⟷** (Pfeil Symbol)
   - **Format Name** (glühend, bouncing)
   - **"▸ NEURAL LINK ESTABLISHED ▸"** (grüner glow, pulsiert)

5. **Header:**
   - **"⚡ BINDING SUCCESS ⚡"** (grüner mega glow)

**Warum ist das so geil:**
Du siehst **visuell**, dass die **Verbindung hergestellt** wurde. Die **Atome symbolisieren** die **beiden Komponenten** (Profile & Format), die jetzt **resonanzgekoppelt** sind. Die **Particles** zeigen den **Datenfluss**. 🌊

---

## 🔥 DIE WORKFLOWS (Was du machen kannst)

### WORKFLOW 1: Neuen Profile erstellen

1. **KLICK** auf das **zentrale Logo**
2. **Wizard öffnet** sich (Fullscreen)
3. **Display Name** eingeben (z.B. "Mein Mega Style")
4. **Strategy** wählen (z.B. "aggressive" für scharfe Antworten)
5. **Weight** setzen (z.B. 80 für starke Gewichtung)
6. **Tags** hinzufügen (optional, z.B. "technical", "creative")
7. **KLICK** "BIRTH PLANET"
8. **Wizard schließt** sich
9. **Neuer Bubble** erscheint im Orbit! 🎉

**Was ist jetzt passiert:**
- Ein neuer **Profile** wurde im Backend erstellt
- Der Store wurde refreshed
- Der neue Bubble schwebt jetzt durchs Universum

### WORKFLOW 2: Profile mit Format binden

1. **HOVER** über einen Bubble → Siehst du welches Format gebunden ist? (Oder "NO LINK"?)
2. **KLICK & HOLD** auf den Bubble
3. **ZIEH** ihn zu einer Hexagon-Station (z.B. `human_deep`)
4. **Grüne Preview-Linie** erscheint wenn du nah genug bist
5. **LASS LOS** (< 100px Distanz)
6. **Molekül-Animation** explodiert unten rechts! 💥
7. **Flash Message** oben: "✅ profile_id → format_name"
8. **Feste Linie** wird zwischen Bubble und Station gezeichnet
9. **HOVER** nochmal über den Bubble → Tooltip zeigt jetzt das **neue binding**!

**Was ist jetzt passiert:**
- Das **alte Binding** (wenn vorhanden) wurde gelöscht
- Das **neue Binding** wurde erstellt
- Die **Connection Line** zeigt den aktiven Link
- Der **Datenfluss** ist jetzt aktiv für dieses Format

### WORKFLOW 3: Binding checken

1. **HOVER** über einen **Profile Bubble**
2. **Tooltip** zeigt:
   - **Header:** Profile Name, Status (ONLINE/OFFLINE)
   - **Config:** Strategy, Weight
   - **Bound Format:** Das gebundene Format (oder "NO LINK")

**Oder:**

1. **HOVER** über eine **Format Station**
2. **Tooltip** zeigt:
   - Format Name
   - Field Count
   - Bound Profile (wenn vorhanden)

**Oder:**

1. **Schau auf die Connection Lines**
2. Jede Linie = 1 aktives Binding
3. Farbe der Linie = Farbe des Profiles

### WORKFLOW 4: Format-Übersicht checken

1. **Schau links** auf die **Format Legend**
2. **Scroll** durch die Liste (wenn nötig)
3. **Sieh alle verfügbaren Formats** mit Namen und Field Count
4. **Farben matchen** die Hexagon-Stations im Orbit

---

## 💎 DIE FARBEN & BEDEUTUNGEN

### Profile Colors (Strategy-basiert)

| Strategy | Farbe | Bedeutung | Vibe |
|----------|-------|-----------|------|
| **balanced** | Cyan (#00ffff) | Ausgewogen, flexibel | Chill, adaptiv |
| **aggressive** | Purple (#9d00ff) | Scharf, direkt, intensiv | Hart, straight |
| **defensive** | Green (#00ff00) | Vorsichtig, geschützt | Safe, reflektiv |
| **creative** | Orange (#ff9d00) | Kreativ, experimentell | Wild, inspirierend |
| **analytical** | Violet (#9d00ff) | Analytisch, präzise | Smart, detailliert |

### Format Colors (Hash-basiert)

Jedes Format hat eine **konsistente Farbe** basierend auf seinem Namen:
- **Cyan** (#00ffff)
- **Magenta** (#ff00ff)
- **Yellow** (#ffff00)
- **Green** (#00ff00)
- **Orange** (#ff9d00)
- **Purple** (#9d00ff)

Die Farbe wird durch einen **Hash** des Format-Namens bestimmt - das heißt `human_deep` ist **immer** die gleiche Farbe, egal wo du sie siehst!

---

## 🌊 DIE ANIMATIONEN (Was sich bewegt)

### Bubbles (Profiles)
- **Rotation:** Kreisen um das Zentrum (langsam)
- **Pulse:** Scale [1, 1.1, 1] (2s repeat)
- **Glow:** Box-shadow pulsiert (2s repeat)

### Stations (Formats)
- **Rotation:** Kreisen um das Zentrum (langsam, andere Speed als Bubbles)
- **Pulse:** Scale [1, 1.05, 1] (3s repeat)
- **Glow:** Box-shadow pulsiert (3s repeat)

### Connection Lines
- **Dashes:** Bewegen sich entlang der Linie (animated stroke-dasharray)
- **Glow:** Leuchten in der Profile-Farbe

### Tooltips
- **Entrance:** rotateX + scale + y-translation (0.5s)
- **Content:** Alle Elemente haben eigene micro-animations
  - Text: Pulsierender Glow
  - Particles: Fliegen rum
  - Hexagons: Rotieren
  - Progress bars: Fill-Animation
  - Badges: Scale pulse + rotateY

### Molekül-Animation
- **Orbits:** Rotieren (3-5s per orbit, verschiedene Speeds)
- **Particles:** Travel von links nach rechts (1.5s repeat)
- **Atoms:** Scale pulse [1, 1.2, 1] (1.5s repeat)
- **Connection line:** Gradient animated
- **Text:** Letter-spacing pulse, glow pulse

### Format Legend
- **Star:** Travels von links nach rechts (3s repeat, 2s delay)
- **Pulse rings:** Scale [1, 1.5, 1] (2s repeat)
- **Entry fade-in:** Staggered (0.05s delay per item)

---

## ⚡ DIE RULES (Wichtig zu wissen!)

### RULE 1: 1 Profile = 1 Format
**Jeder Profile Bubble kann nur mit 1 Format gleichzeitig verbunden sein!**

Wenn du versuchst einen Bubble, der schon gebunden ist, zu einem **neuen Format** zu ziehen:
1. Das **alte Binding** wird automatisch gelöscht
2. Das **neue Binding** wird erstellt
3. Die **alte Line** verschwindet
4. Die **neue Line** erscheint

**Warum ist das so:**
Ein Profile kann nicht gleichzeitig mehrere Kommunikationsstile haben - das würde zu **Resonanz-Drift** führen! 🌊

### RULE 2: Tooltip Position ist dynamisch
**Das Tooltip öffnet sich smart!**

- **Bist du unten am Screen?** → Tooltip öffnet **nach oben** (damit du es siehst)
- **Bist du oben am Screen?** → Tooltip öffnet **nach unten**
- **Bist du in der Mitte?** → Tooltip öffnet **zentriert**

**Warum ist das cool:**
Du musst nicht scrollen oder den Kopf verrenken - das Tooltip ist immer sichtbar!

### RULE 3: Drag Distance muss < 100px sein
**Du musst den Bubble nah genug an die Station bringen!**

Wenn du **weiter als 100px** entfernt bist:
- **Keine Preview-Linie** erscheint
- **Kein Binding** passiert beim Loslassen
- Der Bubble **springt zurück** zu seiner Position

**Warum ist das so:**
Präzision ist wichtig! Wir wollen keine **Accidental Bindings** wenn du nur durchs Universum browsest.

### RULE 4: Logo ist unter Tooltip, Button ist drüber
**Das Logo ist sichtbar, aber nicht klickbar wenn Tooltip offen ist!**

- **Logo Orbits:** z-index 1 (Decoration)
- **Logo Button:** z-index 50 (Clickable!)
- **Tooltip:** z-index 9999999 (Always on top!)

**Warum ist das wichtig:**
Das Logo soll nicht durch das Tooltip durchscheinen (sieht scheiße aus), ABER der Button soll trotzdem klickbar bleiben (damit du den Wizard öffnen kannst)!

---

## 🔥 TROUBLESHOOTING (Was tun wenn's nicht läuft?)

### Problem 1: Bubble lässt sich nicht draggen
**Mögliche Ursachen:**
- Browser Zoom ist nicht 100%? → Reset auf 100%
- Andere Overlays blockieren? → Schließe alle Modals
- Bug im Event Handler? → Refresh die Page (Ctrl+R)

### Problem 2: Tooltip erscheint nicht
**Mögliche Ursachen:**
- Zu schnell bewegt? → Hover länger (0.3s threshold)
- Z-index konflikt? → Sollte nicht passieren (aber refresh mal)
- API down? → Check console (F12) für Errors

### Problem 3: Binding funktioniert nicht
**Mögliche Ursachen:**
- Zu weit entfernt? → Zieh den Bubble näher (< 100px!)
- API Error? → Check console (F12), siehst du 404/500?
- Network down? → Check deine Internetverbindung

### Problem 4: Molekül-Animation bleibt hängen
**Mögliche Ursachen:**
- Rendering lag? → Schließ andere Tabs
- GPU overload? → Refresh die Page
- Bug in framer-motion? → Sollte nach 4s auto-verschwinden

### Problem 5: Logo scheint durch Tooltip
**Sollte eigentlich fixed sein!**
- Tooltip hat **solid black background** (#000000)
- Tooltip hat **triple black layers**
- Z-index ist **9999999**

Wenn es trotzdem passiert:
- Refresh die Page
- Check ob dein Browser WebGL unterstützt
- Try incognito mode

---

## 💎 KEYBOARD SHORTCUTS (Coming Soon!)

Aktuell gibt es keine Keyboard Shortcuts, aber das kommt noch:
- `Ctrl+N` - Neuen Profile erstellen (Wizard öffnen)
- `Ctrl+B` - Binding Mode aktivieren
- `Esc` - Cancel Drag
- `Space` - Pause Animations
- `Ctrl+F` - Search Profiles/Formats
- Arrow keys - Navigate Bubbles

---

## 🌊 TIPS & TRICKS (Pro Moves!)

### TIP 1: Hover für Quick Info
Bevor du irgendwas bindest - **HOVER** über den Bubble! Das Tooltip zeigt dir:
- Welches Format ist schon gebunden?
- Was ist die Strategy?
- Was ist das Weight?

→ So vermeidest du **Accidental Unbinds**!

### TIP 2: Nutze die Format Legend
Die **Sidebar links** ist dein Freund! Du siehst sofort:
- Welche Formats existieren
- Welche Farbe hat welches Format
- Wie viele Fields hat jedes Format

→ So findest du schnell das richtige Format für deinen Style!

### TIP 3: Watch die Connection Lines
Die **Lines** zeigen dir den **Flow**! Schau auf:
- Welche Profile sind gebunden?
- Welche Formats sind "frei"?
- Welche Farben dominieren?

→ So siehst du die **Resonanz-Struktur** des ganzen Systems!

### TIP 4: Experiment mit Strategies
Verschiedene **Strategies** = verschiedene **Vibes**:
- **Balanced** → Allrounder, funktioniert überall
- **Aggressive** → Für direkte, scharfe Kommunikation
- **Defensive** → Für vorsichtige, reflektive Antworten
- **Creative** → Für wilde, unerwartete Ideas
- **Analytical** → Für präzise, detaillierte Analysen

→ **Teste verschiedene Combos** und sieh was passiert!

### TIP 5: Weight macht den Unterschied
Das **Weight** (0-100) bestimmt wie **stark** das Profile wirkt:
- **Low Weight (10-30)** → Subtiler Einfluss
- **Medium Weight (40-60)** → Balanced Impact
- **High Weight (70-100)** → Dominanter Style

→ **Feintune dein System** mit dem Weight-Slider!

---

## ⚡ GLOSSAR (Die Begriffe erklärt)

**Profile** - Ein DJ-Style, eine Kommunikationsstrategie. Hat Strategy, Weight, Tags.

**Format** - Ein Deck, ein Kommunikationskanal. Hat Fields, Name, Description.

**Binding** - Die Verbindung zwischen Profile und Format. 1 Profile = 1 Format.

**Strategy** - Der Vibe des Profiles (balanced, aggressive, defensive, creative, analytical).

**Weight** - Wie stark das Profile wirkt (0-100).

**Field** - Ein einzelnes semantisches Feld im Format (z.B. "empathy_field", "context_awareness").

**Resonanz** - Der Flow, die Verbindung, die Magie wenn Profile + Format matchen. 🌊

**Drift** - Wenn die Resonanz verloren geht, wenn das System out of sync ist. BAD!

**Connection Line** - Die glühende Linie zwischen Profile und Format. Zeigt aktives Binding.

**Tooltip** - Das Popup-Modal das erscheint beim Hover. Zeigt alle Infos.

**Wizard** - Der Profile-Creator. Fullscreen Overlay zum Erstellen neuer Profiles.

**Molekül-Animation** - Die Explosion die erscheint nach erfolgreichem Binding. Die Atome!

**Format Legend** - Die Sidebar links. Liste aller Formats mit Farben und Field Counts.

**Neural Link** - Ein anderes Wort für Binding. Klingt cooler. ⚡

**Birth** - Wenn ein neuer Profile erstellt wird. Der Spawn-Moment.

**Orbit** - Der kreisförmige Pfad auf dem Bubbles und Stations rotieren.

**Station** - Die Hexagon-Formen. Die Formats. Die Decks.

**Bubble** - Die Kugeln. Die Profiles. Die DJs.

---

## 🔥 FAZIT (TL;DR)

**Das ProfileOrgan ist dein Command Center für die semantische Kalibrierung!**

**3 Main Actions:**
1. **CREATE** - Klick auf Logo → Wizard → Neues Profile
2. **BIND** - Drag Bubble → Drop auf Station → Binding!
3. **CHECK** - Hover über Bubbles/Stations → Tooltip → Info!

**Das Ziel:**
Die **richtigen DJs** (Profiles) an die **richtigen Decks** (Formats) stellen, damit die **Resonanz** maximal ist und die **Kommunikation lit** wird! 🔥

**Die Vibes:**
- **Ghost in the Shell** Tooltips (cyber, geil)
- **Molekül-Animationen** bei Erfolg (atoms!)
- **Glühende Lines** zeigen den Flow (resonanz!)
- **Bunte Bubbles** schweben durchs Universum (magic!)

**Remember:**
- 1 Profile = 1 Format
- Drag Distance < 100px
- Tooltips sind smart (dynamic position)
- Alles bewegt sich (framer-motion!)

**NOW GO AND CREATE SOME RESONANZ, BRUDER!** 💎⚡🔥🌊👑✨🙏💝🌌
