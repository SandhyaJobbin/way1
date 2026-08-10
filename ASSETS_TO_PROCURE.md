# Assets to Procure/Generate

These are assets you need to source or generate while I build the code. Most can be AI-generated or sourced from free asset libraries.

---

## Priority 1: Behavior Icons (5 icons)
Replace emoji-based icons in L2 concept map with custom SVG/PNG icons.

| Behavior | Current Emoji | Needed Asset | Suggested Style |
|----------|---------------|--------------|-----------------|
| Right-Turn-on-Red | 🔴→✅ | `icon-rtor.png` | Green arrow turning right, red light |
| Four-Way Stop | 🛑 | `icon-4way.png` | 4-way intersection with stop signs |
| School Bus | 🚌 | `icon-schoolbus.png` | Yellow bus with stop arm extended |
| Jaywalking | 🚶 | `icon-jaywalk.png` | Pedestrian crossing mid-block |
| Aggressive Lane Change | 🚗💨 | `icon-lanechange.png` | Car merging aggressively with motion lines |

**Size:** 64×64px PNG with transparent background
**Location:** `src/assets/` (imported in scenario-data.ts)
**Time to generate:** ~15 min with AI image tool

---

## Priority 2: Frame Sequence (30 images) — OPTIONAL for demo
Used by CanvasSequence.tsx for AV overlay timeline scrubber in Z2.

| File | Description |
|------|-------------|
| `public/frames/f0001.jpg` | Frame 1 — intersection approach |
| `public/frames/f0002.jpg` | Frame 2 — closer to intersection |
| ... | ... |
| `public/frames/f0030.jpg` | Frame 30 — post-incident |

**Size:** 640×360px JPEG
**Content:** Simulated AV camera view of Phoenix intersection, objects appearing across frames
**Note:** TriageConsole currently uses CSS/SVG placeholders — frame sequence is for enhanced visual only. Can skip for initial demo if time-constrained.

---

## Priority 3: Title Card Image — OPTIONAL
Splash image for L1 intro scene.

| File | Description |
|------|-------------|
| `src/assets/title-card.png` | AV training module title card with module name |

**Size:** 1200×600px PNG
**Style:** Dark tech aesthetic, AV/sensor imagery, clean typography
**Note:** Current L1 uses text-only title — image adds polish but isn't critical

---

## Assets That Already Exist (No Action Needed)

| Asset | Location | Status |
|-------|----------|--------|
| AI Guide idle video | `src/assets/wayo-idle.png` + video | ✅ Ready |
| AI Guide curious | `src/assets/wayo-curious.png` + video | ✅ Ready |
| AI Guide thinking | `src/assets/wayo-thinking.png` + video | ✅ Ready |
| AI Guide concerned | `src/assets/wayo-concerned.png` + video | ✅ Ready |
| AI Guide alert | `src/assets/wayo-alert.png` + video | ✅ Ready |
| AI Guide happy | `src/assets/wayo-happy.png` + video | ✅ Ready |
| Lesson background | `src/assets/bg-act1.png` | ✅ Ready |
| Zone background | `src/assets/bg-zone1.png` | ✅ Ready |
| Zone background 2 | `src/assets/bg-zone2.png` | ✅ Ready |

---

## Generation Recommendations

**For behavior icons:** Use DALL-E, Midjourney, or Stable Diffusion with prompt:
> "Flat icon, [behavior description], dark background, tech aesthetic, clean lines, 64x64"

**For frame sequence:** Use AI video generation or manually create in Figma/Canva:
> "Simulated AV camera feed, Phoenix intersection, bounding boxes, LiDAR overlay, dark tech UI"

**Time estimate:** Priority 1 (15 min) + Priority 2 (30 min) + Priority 3 (10 min) = ~55 min total

---

## How to Add Generated Assets

1. Place PNGs in `src/assets/`
2. Place frame JPEGs in `public/frames/`
3. Import in `scenario-data.ts`:
   ```typescript
   import iconRtor from '../assets/icon-rtor.png';
   ```
4. Update behavior objects:
   ```typescript
   { id: 'rtor', name: 'Right-Turn-on-Red', icon: iconRtor, ... }
   ```
