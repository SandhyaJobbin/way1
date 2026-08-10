# 4-Hour Sprint — Combined Demo Plan

## Hour 1: Assets + GlowRing + Core Layout (60 min)

### Phase 1A: Asset Procurement List (User Action)
See `ASSETS_TO_PROCURE.md` — generate/source these in parallel while I build.

### Phase 1B: GlowRing Component (20 min)
- Create `src/components/GlowRing.tsx`
- Animated gradient border, state-driven colors
- Pulse animation synced to speech

### Phase 1C: AIGuide Reposition (15 min)
- Move AIGuide to bottom-center
- Wrap video in GlowRing
- Connect SpeechBubble upward from ring

### Phase 1D: SpeechBubble Reconnect (15 min)
- Reposition above Wayo
- Downward-pointing arrow toward ring
- Wider max-width (500px)

### Phase 1E: CSS Keyframes (10 min)
- Glow ring rotation animation
- State color transitions
- Pulse keyframes

**Checkpoint:** `npm run build` ✓, Wayo centered with ring, speech connected

---

## Hour 2: Lesson Scene Restructures (50 min)

### Phase 2A: SceneL1 — Title Above Wayo (10 min)
- Title `top-[15%]` centered above Wayo
- Subtitle/tagline below title
- "Begin Lesson" CTA beside speech area

### Phase 2B: SceneL2 — Behavior Cards Grid (25 min)
- Remove cramped right-column layout
- 5 cards in staggered grid: 3 top row + 2 bottom row
- Cards: glass-panel, icon + name + confidence %
- Expand on click with description
- Speech bubble explains concept map

### Phase 2C: SceneZ1 — Scenario Setup (15 min)
- Scenario info card: center-upper area
- Phoenix intersection details
- Wayo narrating from bottom-center
- "Begin Investigation" CTA

**Checkpoint:** `npm run build` ✓, L1/L2/Z1 layouts correct

---

## Hour 3: Zone Scene Restructures (50 min)

### Phase 3A: SceneZ2 — TriageConsole + Narrator (20 min)
- TriageConsole: upper 65% of screen
- Wayo bottom-center narrating over overlay
- Speech: "Look at the sensor data — can you identify the threat?"
- Timeline scrubber stays within TriageConsole

### Phase 3B: SceneZ3 — Decision Cards Above Wayo (15 min)
- 3 decision cards spread in upper 50%
- Horizontal or staggered layout
- Glass-panel, large touch targets
- Wayo reacts to selection

### Phase 3C: SceneZ4 — Scorecard + Celebration (15 min)
- Scorecard: center-upper area
- Foundation badge: prominent, centered
- Wayo smaller, celebratory state
- "Next: Proficient Level" locked CTA

**Checkpoint:** `npm run build` ✓, all 7 scenes navigate correctly

---

## Hour 4: Polish + Demo Prep (60 min)

### Phase 4A: Visual Polish (20 min)
- Behavior icons: swap emojis for custom icons (if assets ready)
- Hover states on all interactive elements
- Transition animations between scenes
- Responsive check (1920×1080 primary)

### Phase 4B: Content Verification (10 min)
- All 5 behaviors present in L2 with correct data
- Quiz questions accurate in L3
- Scenario narrative correct in Z1
- Scorecard dimensions match RFP in Z4

### Phase 4C: Build Standalone (15 min)
- `npm run build` produces `dist/`
- Test open in browser from `dist/index.html`
- Verify no console errors

### Phase 4D: Demo Rehearsal (15 min)
- Walk through: L1→L2→L3→Z1→Z2→Z3→Z4
- Time each scene (target: 25-30 min total demo)
- Identify any last-minute fixes

---

## Phase Summary

| Phase | Focus | Time | Deliverable |
|-------|-------|------|-------------|
| 1 | GlowRing + Core Layout | 60 min | Wayo centered with ring, speech connected |
| 2 | Lesson Scenes | 50 min | L1/L2/Z1 restructured |
| 3 | Zone Scenes | 50 min | Z2/Z3/Z4 restructured |
| 4 | Polish + Demo | 60 min | Build verified, demo ready |

**Total: 220 min (3h 40min)** — 20 min buffer for unexpected issues

---

## Anti-Patterns (DO NOT)
- No SCORM wrapper
- No new scenes/behaviors beyond existing 5
- No UI framework changes (keep Tailwind)
- No auth/backend
- No new dependencies unless critical

## Demo Flow
L1 (Intro) → L2 (Concept Map) → L3 (Quiz) → Z1 (Scenario Setup) → Z2 (AV Overlay) → Z3 (Decision) → Z4 (Scorecard)

**Demo emphasis:** AV overlay (Z2), operator decision (Z3), scorecard (Z4), gamification (Foundation badge)
