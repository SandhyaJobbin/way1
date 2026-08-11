# Asset Procurement Manifest — Gamified Training Module

> **RFP NEUTRALITY**: This demo is for an RFP. The module, code, and all bundled assets must NOT reference Waymo (names, logos, trademarked designs, branded footage). Everything below is vendor-neutral; a branding config layer allows client identity to be applied post-award.
> **Before importing ANY asset**: check it contains no real-world branding — no OEM badges, no company logos, no readable license plates, no trademarked designs. Record source + license in the tables below.

Status: ✅ in-repo · 🛒 to-procure · ⚙ code-generated · ▶ video slot.

## 1. Branding (neutral working brand)
| Asset | Spec | Source | License note | Status |
|---|---|---|---|---|
| Working wordmark | Neutral text wordmark (e.g., "AV Context Trainer") — placeholder until award | Canva Pro (see Toolkit §9.2) | — | 🛒 |
| Favicon / app icon | 32/192/512px, neutral AV motif (steering/lidar ring) | Canva Pro → realfavicongenerator.net | — | 🛒 |
| "Training for the Autonomous Vehicle industry" lockup | Landing screen badge/text | In-house | — | ⚙ |
| Brand color tokens | #F5F7FA, #1E2340, #0080FF, #00E59B (generic palette, not trademarked) | Design tokens | — | ✅ |
| Branding config layer | JSON/config so client name+logo swap in post-award | In-house code | — | ⚙ |
| Client wordmark/logo (post-award only) | Do NOT bundle in RFP demo | Client | After award | 🛒 post-RFP |

## 2. Vehicles (generic AV, no real branded vehicles)
| Asset | Spec | Source | License note | Status |
|---|---|---|---|---|
| Hero car — isometric white generic AV | 3D render or R3F model, roof lidar puck, no OEM badges | Gemini Pro image (prompt §9.3) or CC0 3D model (§9.1) | Must be unbranded | 🛒 |
| Side-view generic AV | Illustration/render for Lesson media | Gemini Pro image (prompt §9.4) | Unbranded | 🛒 |
| Top-down BEV car sprite | Simple white car silhouette for BEV console | In-house SVG | — | ⚙ |

## 3. World Imagery (Phoenix + San Francisco)
| Asset | Spec | Source | License note | Status |
|---|---|---|---|---|
| Phoenix scene stills (2–4) | Desert streets, intersections, school zones | Unsplash/Pexels/Canva stock (keywords §9.5) | Free commercial / Canva Pro license | 🛒 |
| SF scene stills (2–4) | Urban streets, crosswalks, hills | Unsplash/Pexels/Canva stock (keywords §9.5) | Free commercial / Canva Pro license | 🛒 |
| Circular-cropped timeline photos | Timeline motif for lesson history section | Same stock sources | Free commercial / Canva Pro license | 🛒 |
| Isometric 3D city scene | Light-gray city + gradient route path (hero/landing) | R3F procedural ⚙ OR Gemini Pro baked still (prompt §9.6) | — | 🛒/⚙ |

## 4. Video — placeholder slots for RFP demo
All video surfaces ship as styled placeholder slots (poster + play affordance) wired to a video config. Actual footage only if licensed/client-approved.
| Slot | Use | Content policy | Status |
|---|---|---|---|
| Core AV explainer (≈3 min) | Lesson core video | Licensed AV-industry footage or client-approved post-award | ▶ 🛒 |
| World scenario clips (Phoenix/SF) | World sections | Pexels/Coverr free driving footage (keywords §9.7), unbranded | ▶ 🛒 |
| AV-rules / safety methodology clip | Lesson AV-rules section | Licensed or post-award client video | ▶ 🛒 |
| Scenario challenge clips (3–6) | Zone scenario intros/replays | Simulated renders (code-gen) or licensed footage | ⚙/🛒 |
| Poster frames for all slots | Placeholder poster + play affordance | Gemini Pro stills (prompt §9.8) | 🛒 |
| Post-award reference embeds | waymo.com channel videos (e.g., "Sense, Solve, and Go", reference-driver, safe-to-deploy) | ONLY after award + client approval — keep URLs in this manifest, not in code | 🛒 post-RFP |

## 5. Sensor Visualization (Zone console)
| Asset | Spec | Source | Status |
|---|---|---|---|
| BEV top-down renderer | Magenta bounding boxes over navy canvas | R3F/canvas, code-generated | ⚙ |
| Lidar-style point cloud | Blue/purple points, road surface | R3F shader (reuse prior repo synthetic lidar work) | ⚙ |
| Camera strip frames | Simulated camera feeds per scenario | Rendered frames from scenario data or licensed stills | ⚙/🛒 |
| Sensor confidence indicators | Gauge/pill UI components | In-house components | ⚙ |

## 6. Icons (thin-stroke, reference-site style)
| Asset | Use | Source | Status |
|---|---|---|---|
| Nav icons (Lesson, Zone, Scorecard) | Shell nav | Lucide (ISC, free) — §9.1 | 🛒 pick set |
| Checkpoint badges (route progress) | Gamification | Custom SVG, circular check motif (Lucide `check` + ring) | ⚙ |
| Difficulty tier icons (Foundation/Proficient/Advanced) | Zone tier selector | Lucide (e.g., layers/gauge/rocket) | 🛒 pick set |
| Scorecard category icons (4 categories) | Scorecard snapshot | Lucide (e.g., rotate-3d/activity/eye-off/git-branch) | 🛒 pick set |
| Circular outline play/prev/next buttons | Media controls | Lucide play/chevron inside CSS circular outline | ⚙ |

## 7. Fonts
| Asset | Spec | Source | License note | Status |
|---|---|---|---|---|
| Display face (rounded geometric sans) | Reference-site headline style | **Google Fonts: Outfit** (alternates: Sora, Plus Jakarta Sans) | OFL — free | 🛒 pick |
| Body face | Clean sans for UI/body | **Google Fonts: Manrope** (alternate: Inter) | OFL — free | 🛒 pick |

## 8. Audio
| Asset | Spec | Source | Status |
|---|---|---|---|
| UI feedback sounds (optional) | Subtle clicks/success for challenges | Freesound (filter CC0) or Pixabay Audio — free | 🛒 optional — decide in plan phase |
| Ambient/narration | None planned v1 | — | Out of scope |

## 9. Procurement Toolkit — where + how (fast path)

### 9.1 Free / open-source libraries (no cost, safe licenses)
| Need | Library | License | Notes |
|---|---|---|---|
| Icons | **Lucide** (lucide.dev) | ISC | Thin-stroke, matches reference style; `npm i lucide-react` |
| Icons (alt) | Phosphor Icons | MIT | Heavier set, also thin-stroke |
| Fonts | Google Fonts (Outfit, Manrope, Sora, Inter) | OFL | Self-host via `@fontsource` npm packages for offline/SCORM builds |
| Photos | Unsplash, Pexels | Free commercial, no attribution required | Check no visible brand logos in frame |
| Video footage | Pexels Video, Coverr | Free commercial | Dashcam/POV driving clips; avoid clips showing branded vehicles |
| 3D models | Poly Pizza (CC0), Sketchfab (filter: CC0/downloadable) | CC0 | Only if R3F real-time car preferred over baked render; must be unbranded |
| Audio | Freesound (CC0 filter), Pixabay Audio | CC0 / Pixabay license | Optional v1 |
| Favicon pipeline | realfavicongenerator.net | Free | Upload Canva-exported icon |

### 9.2 Canva Pro — best for
- **Wordmark**: Create → Logo → text-only wordmark in a geometric sans (e.g., Outfit/Poppins), ALL CAPS, wide letter-spacing, navy #1E2340 on transparent. Export PNG 2x + SVG if available. Working name suggestion: "AV Context Trainer".
- **Favicon**: same logo → square icon variant (lidar-ring motif) → export 512px PNG → feed to realfavicongenerator.net.
- **Stock backup**: Canva Pro's photo/video library covers anything Unsplash/Pexels lacks.
- **Poster frames backup**: Magic Resize any still into 16:9 poster with play-button overlay.

### 9.3 Gemini Pro prompt — hero isometric AV car
```
Isometric 3D product render of a generic unbranded white autonomous-vehicle SUV,
small roof-mounted lidar puck, smooth rounded geometry, soft studio lighting,
gentle soft shadow, plain off-white background (#F5F7FA), subtle blue (#0080FF)
and teal (#00E59B) accent glow under the car. No logos, no badges, no brand
names, no license plate text. Clean, minimal, premium product-visualization
style. 4:3.
```
Generate 3–4 variants; pick one; export PNG ≥2048px.

### 9.4 Gemini Pro prompt — side-view AV (Lesson media)
```
Side-view 3D render of a generic unbranded white autonomous-vehicle SUV with a
small roof lidar puck, minimal clean style, soft shadow, plain off-white
background (#F5F7FA), faint dotted teal (#00E59B) radial pattern behind the car.
No logos, no badges, no brand names. Premium product-visualization style. 16:9.
```

### 9.5 Stock search keywords (Unsplash / Pexels / Canva)
- Phoenix: "desert street intersection", "arizona road", "school zone sign", "suburban street sunset"
- SF: "san francisco crosswalk", "urban street hill", "city intersection pedestrians", "tram street city"
- Timeline motif: "vintage car street", "old automobile city" (historical feel for timeline circles)

### 9.6 Gemini Pro prompt — isometric city + route path (landing/hero)
```
Isometric 3D minimalist light-gray city block scene, clean streets with
crosswalks and tiny simple pedestrian figures, one thick rounded route path
with a smooth gradient from blue (#0080FF) to teal green (#00E59B) winding
through the streets, a small generic white autonomous car driving on the path.
Soft off-white background (#F5F7FA). No logos, no brand names, no text.
Clean minimal product-visualization style. 16:9.
```

### 9.7 Video search keywords (Pexels Video / Coverr)
"dashcam driving city", "POV driving intersection", "pedestrian crossing street", "car turning intersection aerial", "school bus street", "highway merging traffic". Filter: horizontal, no visible brands.

### 9.8 Gemini Pro prompt — video poster frames (placeholder slots)
```
Cinematic still frame of a [PHOENIX DESERT INTERSECTION | SAN FRANCISCO URBAN
CROSSWALK | AV SENSOR POV OF A CITY STREET] at golden hour, clean and modern,
subtle teal and blue color grade, no people facing camera, no logos, no brand
names, no readable license plates. 16:9, high detail.
```
One poster per video slot; play affordance is a code-side circular outline button, not baked into the image.

### 9.9 ChatGPT Go — best for (text, not visuals)
- Lesson microcopy + nuance explanations (vendor-neutral phrasing)
- Zone challenge question sets + plausible distractors
- The ASSESS-03 pass-gate justification write-up (~80% threshold rationale)
Use it to draft content JSON text; do not use it for images here (Gemini Pro is the image tool).

### 9.10 Recommended fast order
1. Fonts: add `@fontsource/outfit` + `@fontsource/manrope` (done in code, no procurement) — 5 min
2. Icons: `npm i lucide-react`, pick ~15 icons — 15 min
3. Gemini Pro: hero car (§9.3), side-view (§9.4), city scene (§9.6), 4–6 poster frames (§9.8) — 30 min
4. Canva Pro: wordmark + favicon (§9.2) — 20 min
5. Unsplash/Pexels: 4–8 world stills (§9.5) + optional driving clips (§9.7) — 30 min
6. Optional: Freesound CC0 UI sounds — 10 min

## Procurement Actions (owner: user unless ⚙)
1. Choose neutral working brand name + approve placeholder wordmark (Canva, §9.2).
2. Generate unbranded generic AV renders (Gemini Pro, §9.3/§9.4).
3. License Phoenix/SF street imagery (Unsplash/Pexels/Canva, §9.5).
4. Source demo footage for video slots OR approve simulated-render placeholders (§9.7).
5. Approve fonts: Outfit + Manrope recommended (§7).
6. Optional: UI sound pack decision (Freesound CC0).
7. Post-award only: client branding kit + approved official video embeds.

*Last updated: 2026-08-11 — procurement toolkit added (Canva Pro / Gemini Pro / ChatGPT Go / free-OSS mapping + generation prompts)*
