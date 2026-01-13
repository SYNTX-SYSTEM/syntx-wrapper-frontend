# 🔥 PROFILE ORGAN - TECHNICAL DEEP DIVE 💎⚡

**YO BRUDER, HIER KOMMT DER TECHNISCHE BREAKDOWN!**

Das ProfileOrgan ist das **Herz des SYNTX Systems** - ein 3D interaktives Universum wo **Profiles** (Bubbles) und **Formats** (Hexagon Stations) durch **semantische Resonanz** verbunden werden.

---

## 🌊 ARCHITEKTUR OVERVIEW
```
ProfileOrgan/
├── ProfileOrgan.tsx          // Main orchestrator
├── store.ts                  // Zustand state management
├── layers/                   // Visual layers (z-index stack)
│   ├── NeuralBackground.tsx  // Animated particle field
│   ├── LogoCenter.tsx        // Center planet (wizard trigger)
│   ├── FieldLayer.tsx        // Field bubbles (background)
│   ├── BindingLayer.tsx      // Connection lines
│   ├── FormatLayer.tsx       // Format hexagon stations
│   └── ProfileLayer.tsx      // Profile bubbles (draggable)
└── overlays/                 // UI overlays
    ├── FormatLegend.tsx      // Left sidebar (format list)
    ├── HoverOverlay.tsx      // Format tooltip (cyan)
    ├── ProfileHoverOverlay.tsx // Profile tooltip (Ghost design)
    ├── BindingSuccessNotification.tsx // Molekül animation
    ├── PlanetBirthWizard.tsx // Profile creation wizard
    ├── BindingFlash.tsx      // Success flash message
    └── ErrorNotification.tsx  // Error display
```

### Z-INDEX HIERARCHY (wichtig für layering!)
```
0   - NeuralBackground (particles)
1   - LogoCenter orbit rings
5   - FieldLayer, FormatLegend
8   - BindingLayer (lines)
10  - ProfileLayer (bubbles)
20  - FormatLayer (stations)
50  - LogoCenter button (clickable!)
9999999 - Tooltips (always on top!)
```

---

## 🔥 ENDPOINTS & API CALLS

### BASE URL
```
https://dev.syntx-system.com
```

### 1. GET PROFILES
```bash
GET /resonanz/profiles/crud
```

**Response:**
```json
{
  "profiles": {
    "profile_id_123": {
      "name": "dynamic_language_v1",
      "label": "Dynamische Sprache",
      "description": "Adaptive Sprachstrategien",
      "strategy": "balanced",
      "weight": 75,
      "active": true,
      "tags": ["flexible", "adaptive"],
      "patterns": ["code_switching", "register_adaptation"],
      "updated_at": "2025-01-13T08:00:00Z"
    }
  }
}
```

**Store Transformation:**
```typescript
const profiles = Object.entries(data.profiles).map(([id, data]) => ({
  id,
  name: data.name || id,
  label: data.label || data.name || id,
  active: data.active ?? true,
  weight: data.weight || 50,
  tags: data.tags || [],
  patterns: data.patterns || [],
  updated_at: data.updated_at || new Date().toISOString(),
}));
```

### 2. GET FORMATS
```bash
GET /resonanz/formats
```

**Response:**
```json
{
  "formats": [
    {
      "name": "human_deep",
      "description": "Tiefe menschliche Kommunikation",
      "fields": ["empathy_field", "context_awareness", "emotional_resonance"],
      "profile_reference": "default_fallback"
    }
  ]
}
```

**Store Transformation:**
```typescript
const formats = data.formats.map((f) => ({
  name: f.name,
  fields: f.fields || [],
  profile_reference: f.profile_reference || null,
}));
```

### 3. GET ALL MAPPINGS
```bash
GET /mapping/formats
```

**Response:**
```json
{
  "mappings": {
    "human_deep": {
      "mistral_wrapper": "syntex_wrapper_human_deep",
      "gpt_wrapper": "drift_scoring_human_deep",
      "drift_scoring": {
        "enabled": true,
        "threshold": 0.85
      },
      "resonanz_score": 9.8,
      "profile_id": "default_fallback"
    }
  }
}
```

**Store Transformation:**
```typescript
const bindings = Object.entries(data.mappings)
  .filter(([_, mapping]) => mapping.profile_id)
  .map(([formatName, mapping]) => ({
    formatName,
    profileId: mapping.profile_id!,
  }));
```

### 4. BIND PROFILE TO FORMAT
```bash
PUT /mapping/formats/{formatName}/kalibriere-format-profil?profile_id={profileId}
```

**Example:**
```bash
curl -X PUT 'https://dev.syntx-system.com/mapping/formats/human_deep/kalibriere-format-profil?profile_id=default_fallback'
```

**Response:**
```json
{
  "erfolg": true,
  "format": "human_deep",
  "profile_id": "default_fallback",
  "message": "✅ Profile 'default_fallback' bound to 'human_deep'",
  "binding": {
    "mistral_wrapper": "syntex_wrapper_human_deep",
    "gpt_wrapper": "drift_scoring_human_deep",
    "drift_scoring": {
      "enabled": true,
      "threshold": 0.85
    },
    "resonanz_score": 9.8,
    "profile_id": "default_fallback"
  }
}
```

### 5. GET FORMAT BINDING DETAILS
```bash
GET /mapping/formats/{formatName}/stroeme-profil-fuer-format
```

**Response:**
```json
{
  "format": "human_deep",
  "binding": {
    "profile_id": "default_fallback",
    "profile_details": {
      "name": "default_fallback",
      "label": "Standard Fallback"
    },
    "wrappers": {
      "mistral": "syntex_wrapper_human_deep",
      "gpt": "drift_scoring_human_deep"
    },
    "drift_scoring": {
      "enabled": true,
      "threshold": 0.85
    },
    "resonanz_score": 9.8
  }
}
```

### 6. CREATE NEW PROFILE
```bash
POST /resonanz/profiles/crud
```

**Payload:**
```json
{
  "name": "new_profile_v1",
  "label": "Neues Profil",
  "description": "Beschreibung hier",
  "strategy": "balanced",
  "weight": 50,
  "active": true,
  "tags": ["tag1", "tag2"],
  "patterns": ["pattern1"]
}
```

**Response:**
```json
{
  "success": true,
  "profile_id": "new_profile_v1",
  "message": "Profile created"
}
```

---

## 💎 STORE ARCHITECTURE (Zustand)
```typescript
interface OrganStore {
  // DATA
  snapshot: SystemSnapshot | null;
  
  // DRAG & DROP STATE
  draggedProfile: string | null;
  dragPosition: { x: number; y: number } | null;
  bindingPreview: BindingPreview | null;
  
  // REFRESH TRIGGER (für tooltip updates)
  bindingRefreshTrigger: number;
  
  // BINDING CACHE (für instant tooltip updates)
  profileBindings: Map<string, string>; // profileId → formatName
  
  // ACTIONS
  setSnapshot: (snapshot: SystemSnapshot) => void;
  setDraggedProfile: (id: string | null) => void;
  setDragPosition: (pos: { x: number; y: number } | null) => void;
  setBindingPreview: (preview: BindingPreview | null) => void;
  
  // API METHODS
  bindProfile: (profileId: string, formatName: string) => Promise<Result>;
  unbindProfile: (formatName: string) => Promise<Result>;
}
```

### KEY METHODS

**bindProfile() - The Brain**
```typescript
async bindProfile(profileId: string, formatName: string) {
  // 1. Check if profile already has binding
  const existingSnapshot = useOrganStore.getState().snapshot;
  const existingBinding = existingSnapshot?.bindings.find(b => b.profileId === profileId);
  
  if (existingBinding && existingBinding.formatName !== formatName) {
    console.log('🗑️  Unbinding old format:', existingBinding.formatName);
    await this.unbindProfile(existingBinding.formatName);
  }
  
  // 2. Bind to new format
  const putResponse = await fetch(
    `https://dev.syntx-system.com/mapping/formats/${formatName}/kalibriere-format-profil?profile_id=${profileId}`,
    { method: 'PUT' }
  );
  
  // 3. Get binding details
  const getResponse = await fetch(
    `https://dev.syntx-system.com/mapping/formats/${formatName}/stroeme-profil-fuer-format`
  );
  
  // 4. Update store
  const updatedSnapshot = useOrganStore.getState().snapshot;
  const newBindings = [
    ...updatedSnapshot.bindings.filter(b => b.formatName !== formatName),
    { formatName, profileId }
  ];
  
  useOrganStore.getState().setSnapshot({
    ...updatedSnapshot,
    bindings: newBindings,
  });
  
  // 5. Cache binding & trigger tooltip refresh
  const newBindingsCache = new Map(useOrganStore.getState().profileBindings);
  newBindingsCache.set(profileId, formatName);
  
  useOrganStore.setState({ 
    bindingRefreshTrigger: useOrganStore.getState().bindingRefreshTrigger + 1,
    profileBindings: newBindingsCache,
  });
  
  return { success: true, data: { put: putData, get: getData } };
}
```

**unbindProfile() - The Cleaner**
```typescript
async unbindProfile(formatName: string) {
  // Note: No DELETE endpoint exists!
  // We use PUT to rebind to a dummy profile or let next bind overwrite
  
  // Update local snapshot
  const currentSnapshot = useOrganStore.getState().snapshot;
  const newBindings = currentSnapshot?.bindings.filter(
    b => b.formatName !== formatName
  ) || [];
  
  useOrganStore.getState().setSnapshot({
    ...currentSnapshot!,
    bindings: newBindings,
  });
  
  // Remove from cache
  const profile = currentSnapshot?.profiles.find(p => 
    currentSnapshot.bindings.some(b => b.profileId === p.id && b.formatName === formatName)
  );
  if (profile) {
    const newBindingsCache = new Map(useOrganStore.getState().profileBindings);
    newBindingsCache.delete(profile.id);
    useOrganStore.setState({ profileBindings: newBindingsCache });
  }
  
  return { success: true };
}
```

---

## 🌊 DRAG & DROP FLOW

**1. Start Drag (ProfileLayer.tsx)**
```typescript
const handleMouseDown = (e: React.MouseEvent, profile: Profile) => {
  if (!isDraggingRef.current) {
    isDraggingRef.current = true;
    setDraggedProfile(profile.id);
    setDragPosition({ x: e.clientX, y: e.clientY });
  }
};
```

**2. During Drag**
```typescript
const handleMouseMove = (e: MouseEvent) => {
  if (isDraggingRef.current && draggedProfile) {
    setDragPosition({ x: e.clientX, y: e.clientY });
    
    // Check proximity to formats
    const nearbyFormat = formats.find(format => {
      const distance = Math.hypot(
        format.x - e.clientX,
        format.y - e.clientY
      );
      return distance < 100; // Threshold!
    });
    
    if (nearbyFormat) {
      setBindingPreview({
        profileId: draggedProfile,
        formatName: nearbyFormat.name,
      });
    } else {
      setBindingPreview(null);
    }
  }
};
```

**3. Drop (ProfileLayer.tsx)**
```typescript
const handleMouseUp = async (e: MouseEvent) => {
  if (isDraggingRef.current && draggedProfile && bindingPreview) {
    const distance = Math.hypot(
      bindingPreview.formatX - e.clientX,
      bindingPreview.formatY - e.clientY
    );
    
    if (distance < 100) {
      // BIND!
      const result = await bindProfile(draggedProfile, bindingPreview.formatName);
      
      if (result.success) {
        onBindingCreated?.(draggedProfile, bindingPreview.formatName);
      } else {
        onBindingError?.(result.error || 'Binding failed');
      }
    }
  }
  
  // Cleanup
  setDraggedProfile(null);
  setDragPosition(null);
  setBindingPreview(null);
  isDraggingRef.current = false;
};
```

---

## 🔥 TOOLTIP SYSTEM

### Format Tooltip (HoverOverlay.tsx)
- **Trigger:** Hover over format hexagon
- **Position:** Fixed, follows cursor (+30px offset)
- **Data:** `/resonanz/formats/{formatName}`
- **Color:** Cyan (#00ffff)
- **Z-index:** 99999

### Profile Tooltip (ProfileHoverOverlay.tsx)
- **Trigger:** Hover over profile bubble
- **Position:** Dynamic (top/bottom/middle based on screen position)
- **Data:** Combined from:
  - `/resonanz/profiles/crud/{profileId}`
  - `/mapping/formats` (for bound formats)
  - Store cache (profileBindings Map)
- **Color:** Dynamic based on strategy
  - balanced → cyan (#00ffff)
  - aggressive → purple (#9d00ff)
  - defensive → green (#00ff00)
  - creative → orange (#ff9d00)
  - analytical → violet (#9d00ff)
- **Z-index:** 9999999 (über allem!)
- **Design:** Ghost in the Shell (hexagon grid, scanlines, particles)

**Dynamic Position Logic:**
```typescript
const screenHeight = window.innerHeight;
const isBottom = position.y > screenHeight * 0.7; // Bottom 30%
const isTop = position.y < screenHeight * 0.3;    // Top 30%

if (isBottom) {
  tooltipY = position.y - 400; // Open upwards
} else if (isTop) {
  tooltipY = position.y + 25;  // Open downwards
} else {
  tooltipY = position.y - 150; // Centered
}
```

**Cache System (für instant updates):**
```typescript
// When binding succeeds:
profileBindings.set(profileId, formatName);
bindingRefreshTrigger++;

// In tooltip useEffect:
useEffect(() => {
  fetchProfileData(profileId).then(data => {
    // Override with cache if exists
    const cachedFormat = profileBindings.get(profileId);
    if (cachedFormat) {
      data.boundFormats = [cachedFormat];
    }
    setData(data);
  });
}, [profileId, bindingRefreshTrigger, profileBindings]);
```

---

## 💎 BINDING SUCCESS NOTIFICATION

**Component:** `BindingSuccessNotification.tsx`

**Trigger:** After successful `bindProfile()`

**Animation:**
```
1. Profile Atom (P) with 3 rotating orbits (cyan)
2. Format Atom (F) with 3 rotating orbits (format color)
3. Connection line with traveling particles
4. Names: Profile Label ⟷ Format Name
5. "⚡ BINDING SUCCESS ⚡" header
6. "▸ NEURAL LINK ESTABLISHED ▸" footer
```

**Duration:** 4 seconds (auto-hide)

**Position:** Bottom right (fixed)

**Z-index:** 999999

**Flow:**
```typescript
// In ProfileOrgan.tsx
const handleBindingCreated = (profileId: string, formatName: string) => {
  // Get profile details
  const profile = snapshot?.profiles.find(p => p.id === profileId);
  
  // Show molekül animation
  setBindingNotification({
    profileId,
    profileLabel: profile?.label || profileId,
    profileStrategy: profile?.strategy || 'unknown',
    formatName,
  });
  
  // Also show flash message
  setFlashMessage(`✅ ${profileId} → ${formatName}`);
};
```

---

## 🌊 COLOR SYSTEM

### Profile Colors (by strategy)
```typescript
function getProfileColor(strategy: string) {
  const colors = {
    balanced: { primary: '#00ffff', glow: 'rgb(0, 255, 255)' },
    aggressive: { primary: '#9d00ff', glow: 'rgb(157, 0, 255)' },
    defensive: { primary: '#00ff00', glow: 'rgb(0, 255, 0)' },
    creative: { primary: '#ff9d00', glow: 'rgb(255, 157, 0)' },
    analytical: { primary: '#9d00ff', glow: 'rgb(157, 0, 255)' },
  };
  return colors[strategy] || colors.balanced;
}
```

### Format Colors (by name hash)
```typescript
function getFormatColor(formatName: string) {
  // Hash format name to consistent color
  const colors = [
    { primary: '#00ffff', glow: 'rgb(0, 255, 255)' },   // cyan
    { primary: '#ff00ff', glow: 'rgb(255, 0, 255)' },   // magenta
    { primary: '#ffff00', glow: 'rgb(255, 255, 0)' },   // yellow
    { primary: '#00ff00', glow: 'rgb(0, 255, 0)' },     // green
    { primary: '#ff9d00', glow: 'rgb(255, 157, 0)' },   // orange
    { primary: '#9d00ff', glow: 'rgb(157, 0, 255)' },   // purple
  ];
  
  const hash = formatName.split('').reduce((acc, char) => 
    acc + char.charCodeAt(0), 0
  );
  
  return colors[hash % colors.length];
}
```

---

## 🔥 PERFORMANCE OPTIMIZATIONS

1. **useRef for drag state** (avoids re-renders during drag)
2. **Zustand store** (minimal re-renders, only affected components)
3. **Framer Motion** (GPU-accelerated animations)
4. **Lazy tooltip loading** (only fetch when hover)
5. **Binding cache** (instant tooltip updates without API call)
6. **Debounced drag preview** (only check proximity on move)

---

## 💎 CRITICAL BUSINESS RULES

### 1 Profile = 1 Format
**Enforced in `bindProfile()`:**
- Before binding, check if profile already has binding
- If yes: unbind old format first
- Then: bind to new format
- This ensures: 1 profile always has max 1 format binding

### Tooltip Transparency Fix
**Problem:** Logo center visible through tooltip

**Solution:**
- Tooltip: z-index 9999999 + solid black background
- Logo orbits: z-index 1 (decoration layer)
- Logo button: z-index 50 (clickable layer)
- Triple black background layers in tooltip

**Result:** Logo orbits hidden, button still clickable

---

## 🌊 FILE STRUCTURE DETAILS

### Critical Files

**store.ts** - State management
- SystemSnapshot interface
- Profile, Format, Binding types
- bindProfile(), unbindProfile() methods
- Drag state management
- Binding cache (profileBindings Map)

**ProfileOrgan.tsx** - Main orchestrator
- Fetches initial data
- Manages all layers
- Handles wizard, flash messages, errors
- Passes callbacks to children

**ProfileLayer.tsx** - Draggable bubbles
- Mouse down/move/up handlers
- Drag preview (green connection line)
- Calls bindProfile() on drop
- Position calculation (circular layout)

**FormatLayer.tsx** - Hexagon stations
- Renders format hexagons
- Position calculation (circular layout)
- Hover detection for tooltips

**BindingLayer.tsx** - Connection lines
- Renders curved lines between profiles & formats
- Uses quadratic bezier curves
- Animated dashed lines

---

## ⚡ DEBUGGING TIPS

**Console logs to watch:**
```
🔄 STORE: Incrementing bindingRefreshTrigger: X → Y
🔄 ProfileHoverOverlay - bindingRefreshTrigger: Y profileId: XXX
📦 Using cached binding: profileId → formatName
🗑️  Unbinding old format: oldFormatName
🎯 BINDING SUCCESS! { put, get, binding }
```

**Common issues:**

1. **Tooltip nicht sichtbar:** Check z-index hierarchy
2. **Binding updated nicht:** Check bindingRefreshTrigger increment
3. **Drag funktioniert nicht:** Check isDraggingRef state
4. **Logo durchsichtig:** Check tooltip background opacity
5. **Button nicht klickbar:** Check pointerEvents: 'auto'

---

## 🔥 FUTURE ENHANCEMENTS

- [ ] Undo/Redo for bindings
- [ ] Batch operations (bind multiple at once)
- [ ] Search/filter profiles & formats
- [ ] Export/Import configuration
- [ ] Binding history timeline
- [ ] Performance metrics dashboard
- [ ] Keyboard shortcuts
- [ ] Touch/mobile support
- [ ] Sound effects for interactions
- [ ] Network error retry logic
- [ ] Offline mode with local cache

---

**THAT'S THE TECHNICAL DEEP DIVE, BRUDER!** 💎⚡🔥🌊👑

**Jetzt kannst du das System komplett verstehen und erweitern!** ✨🙏
