---
kind: design-system
role: brand-foundation
description: Waymo Training Module — Cinematic Design System
---

# Brand Vision

A Pixar-style short film disguised as a training module.
One warm, inhabited world. One expressive character. One incident, seen six ways.
The learner doesn't navigate — they discover. Each moment is a composed scene.
Wayo is always there, reacting. One tap moves to the next moment.
The feel is "animated short meets interactive storybook," not "dashboard meets slide deck."

---

# Typography

- **Display / Headlines:** `Baloo 2` (warm, rounded, characterful — Google Fonts, free)
- **UI / Body:** `Nunito Sans` (friendly, highly readable, pairs with Baloo 2)
- **Data / Technical:** `JetBrains Mono` (only for sensor readouts, timelines, frame counters)

---

# Color Palette

## Background — Warm Night
| Token | Value | Use |
|---|---|---|
| **Sky (top)** | `#1a1a2e` | Deep night sky, gradient top |
| **Sky (horizon)** | `#16213e` | Mid sky |
| **City glow** | `#0f3460` | Warm city light bleed at horizon |
| **Road** | `#2d2d44` | Dark asphalt, not pure black |
| **Warm light** | `#e8d5b7` | Streetlamp pools, soft warmth |

## Wayo
| Token | Value | Use |
|---|---|---|
| **Wayo body** | `#ffffff` | Clean white, recognisable Waymo silhouette |
| **Wayo sensor dome** | `#f0f0f0` | Slightly grey, sits on roof |
| **Wayo stripe** | `#cc0000` | Waymo red accent stripe |
| **Headlight glow (idle)** | `#e8f4fd` | Soft white-blue, calm |
| **Headlight glow (thinking)** | `#ffe0b2` | Warm amber, curious |
| **Headlight glow (low-confidence)** | `#ffcc80` | Deeper amber, uncertain |
| **Headlight glow (alert)** | `#ff8a65` | Alert orange |
| **Headlight glow (happy)** | `#a5d6a7` | Soft green, success |

Waymo's headlights are its eyes. All expression flows through headlight colour + subtle body lean.
No cartoon mouth. No windshield face. This is the real car, gently anthropomorphised through motion and light.

## Environments — One Per Zone

### Lesson A — The Garage
| Token | Value |
|---|---|
| Floor | `#3a3a5c` |
| Walls | `#2a2a4a` with warm tool-cabinet red `#8b2500` |
| Accent | `#ffd54f` (warm overhead lights) |
| Tech panels | `#1e3a5f` (diagnostic screens) |

### Lesson B — The Lab / Control Room
| Token | Value |
|---|---|
| Walls | `#263238` (blue-grey) |
| Screens | `#37474f` with data glow `#4fc3f7` |
| Accent | `#e0e0e0` (clean white light) |
| Pipeline glow | `#ffb74d` (amber, thinking/processing) |

### Lesson C — The City Overlook
| Token | Value |
|---|---|
| Sky | `#0d1b2a` → `#1b2838` → `#415a77` (night gradient) |
| City lights | `#ffd54f` scattered (distant windows) |
| Road | `#37474f` |
| Accent | `#e8d5b7` (streetlamp pools) |

### Zone 1 — Live Incident (Roadside)
| Token | Value |
|---|---|
| Sky | `#1a1a2e` (night) |
| Scene | Construction zone lit by work lights `#ffb74d` |
| Flagger vest | `#ffeb3b` (hi-vis yellow) |
| Alert accent | `#ff5252` (red strobe) |
| Wayo headlights | `#ff8a65` (alert orange) |

### Zone 2 — Triage Console (Investigation Room)
| Token | Value |
|---|---|
| Room | `#1c2833` (dark, focused) |
| Console surface | `#2c3e50` |
| Screen glow | `#4fc3f7` (data blue) |
| Timeline accent | `#ffb74d` (scrub marker) |
| Evidence cards | `#34495e` with `#ecf0f1` text |

### Zone 3 — Annotation Studio (Clean Room)
| Token | Value |
|---|---|
| Room | `#e8eaf0` (light, clean — opposite of night) |
| Work surface | `#ffffff` |
| Label swatches | Person `#66bb6a`, Vehicle `#42a5f5`, Sign `#ffee58`, Flagger `#ff7043` |
| Frame border | `#90a4ae` |
| Submit glow | `#66bb6a` (green, positive) |

### Act 4 — Same Intersection, Day
| Token | Value |
|---|---|
| Sky | `#64b5f6` → `#e3f2fd` (bright day) |
| Road | `#546e7a` |
| Confidence glow | `#66bb6a` (green, confident) |

---

# Wayo Character — Stylised Real Waymo Car

**Design approach:** The actual Waymo vehicle silhouette, gently anthropomorphised. Headlights are the expressive element — no cartoon face, no mouth on the windshield. Personality comes through:
1. Headlight colour/intensity (emotion mapped to light)
2. Subtle body lean (forward = curious, back = uncertain, slight bounce = happy)
3. Sensor dome spin speed (idle slow, alert fast)
4. Position in frame (drives in, parks, observes)

## Required States (6 SVG variants + motion overlays)

| # | State | Headlights | Body | When |
|---|---|---|---|---|
| 1 | `wayo-idle` | Soft white-blue glow | Neutral, slight suspension bob | Hub, waiting |
| 2 | `wayo-curious` | Warm amber, slight brighten | Lean forward 2° | Introducing a lesson |
| 3 | `wayo-thinking` | Amber, slow pulse | Slight tilt, sensor dome slow-spin | Pipeline explanation |
| 4 | `wayo-concerned` | Deep amber-orange, flicker | Lean back 1°, low stance | Low confidence moment |
| 5 | `wayo-alert` | Orange-red, fast strobe | Low, tense, dome fast-spin | Live incident active |
| 6 | `wayo-happy` | Soft green, steady warm glow | Slight bounce, raised stance | Corrected drive, success |

**Motion spec:** All states driven by Framer Motion `animate` props. Transitions between states use `type: "spring", stiffness: 80, damping: 12` — feels physical, not snappy. Headlight glow is a CSS `box-shadow` + `filter: blur()` animated via `useMotionValue`.

**Technical:** Pure SVG, zero external runtime. Each state is ~2KB. Positioned absolutely in scene compositions. Wayo drives in from left, parks, observes, drives out right on scene transitions.

---

# Scene Architecture — "Little Moments, Big World"

Each screen is a full-viewport composed scene, not a UI layout.

## Scene Structure (every screen follows this)

```
┌──────────────────────────────────────────┐
│                                          │
│         ENVIRONMENT (full bleed)         │
│                                          │
│     [Waymo, positioned in the world]     │
│                                          │
│  ┌──────────────────────────────┐        │
│  │  Speech bubble / interaction │        │
│  └──────────────────────────────┘        │
│                                          │
│              [Continue →]                │
│                                          │
└──────────────────────────────────────────┘
```

## Transition Language

Between moments: Wayo drives out right → new scene slides in from right → Wayo drives in from left. Feels like a camera pan, not a page load. Duration: 600ms, spring easing.

Between zones: Full scene crossfade (800ms) with a "location card" overlay (1.5s) showing the zone name. Wayo is not visible during the crossfade — they arrive in the new scene.

---

# Interaction Rules

1. **One primary action per scene.** Usually "Continue →" — never two CTAs competing.
2. **Within zones (the audit scenarios):** the learner interacts with the scene itself — drag the timeline, tap the bounding box, choose the routing option. These are physical interactions, not form fields.
3. **Decision moments:** Three options presented as physical objects in the scene (e.g., three levers, three buttons on a console, three routing cards). The unchosen options dim slightly. Wayo's headlights react to hesitation.
4. **Wrong path survives:** if the learner makes a suboptimal choice, the next scene acknowledges it. Wayo's reaction carries the emotional weight — not a red X or error toast.
5. **No back button. No hamburger menu. No nav bar.** The module is a linear journey. Progress is shown as streetlights passed (bottom strip, subtle dots).
6. **Assessment:** 3 questions woven into Act 5, not a separate quiz screen. Wayo asks them. Learner answers by tapping one of three objects in the scene.

---

# Visual Rules

1. Depth through parallax, not through heavy UI panels. Foreground (Waymo) / midground (environment) / background (sky, city).
2. Warm light pools everywhere. Even the "dark" scenes have warmth. Nothing feels cold or corporate.
3. No sharp rectangles. Panels (when needed) have 16px radius, soft shadows tinted to the ambient light colour.
4. Data readouts (when shown) use JetBrains Mono at 14px, mono-spaced, on a subtle dark glass panel — but minimally. This is not a dashboard.
5. Typography hierarchy: Display (Baloo 2, large, rounded) → Body (Nunito Sans, friendly) → Data (JetBrains Mono, small, technical).
6. Wayo is never cropped or partially offscreen unintentionally. If Wayo is leaving frame, it's a deliberate exit animation.
