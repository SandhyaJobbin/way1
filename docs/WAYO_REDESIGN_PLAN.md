# Wayo Narrator Redesign — Implementation Plan

## Vision
Wayo becomes the central narrator with a glowing ring, speech expanding upward, content in the upper half. Cinematic, connected, alive.

## Architecture Changes

### 1. New Component: `GlowRing.tsx`
Wraps AIGuide's video/poster with animated gradient border.

```
src/components/GlowRing.tsx (NEW)
```

- CSS `conic-gradient` border with `@keyframes` rotation
- State-driven color: idle→blue (#3b82f6), thinking→amber (#f59e0b), alert→red (#ef4444), happy→green (#22c55e)
- Inner shadow glow matching state color
- Pulse animation synced to speech (subtle scale 1.0→1.02)
- Size: 280px × 280px (slightly larger than current 260px default)

### 2. Reposition: `AIGuide.tsx`
Move from `bottom-[8%] left-[6%]` to bottom-center.

Changes:
- Container: `absolute bottom-[4%] left-1/2 -translate-x-1/2`
- Wrap video in `<GlowRing>` 
- SpeechBubble rendered above the ring (not separate floating)

### 3. Redesign: `SpeechBubble.tsx`
Connect to Wayo's glow ring, grow upward.

Changes:
- Position: `absolute bottom-[calc(4%+300px)] left-1/2 -translate-x-1/2` (above Wayo)
- Max-width: 500px (wider than current)
- Arrow points downward toward Wayo's ring
- Glass-panel with softer opacity
- Text typewriter-expands from center

### 4. Scene Layout Restructures

#### SceneL1.tsx
- Title: `absolute top-[15%] left-1/2 -translate-x-1/2` (above Wayo)
- Subtitle/tagline below title
- Wayo bottom-center narrating
- "Begin Lesson" CTA: `absolute bottom-[calc(4%+310px)] right-[8%]` (beside speech area)

#### SceneL2.tsx  
- Wayo bottom-center with ring
- Behavior cards: 5 cards in a staggered grid in upper 60% of screen
- Cards use glass-panel, arranged 3 top + 2 bottom row
- Each card: icon + name + confidence %, expandable
- Speech bubble above Wayo explaining the concept map

#### SceneZ1.tsx
- Wayo bottom-center narrating scenario setup
- Scenario info card: center-upper area with Phoenix intersection details
- "Begin Investigation" CTA

#### SceneZ2.tsx
- TriageConsole: upper 65% of screen (left-aligned or full-width)
- Wayo bottom-center with ring, narrating over the overlay
- Speech bubble: "Look at the sensor data — can you identify the threat?"
- Timeline scrubber stays at bottom of TriageConsole

#### SceneZ3.tsx
- Wayo bottom-center with ring
- Decision cards: 3 cards spread in upper 50% (horizontal or staggered)
- Speech bubble above Wayo: reacts to selection
- Cards: glass-panel, large touch targets

#### SceneZ4.tsx
- Wayo bottom-left or bottom-center (smaller, celebratory)
- Scorecard: center-upper area, glass-panel
- Foundation badge: prominent, centered
- "Next: Proficient Level" locked CTA

## File Change Summary

| File | Action | Est. Time |
|------|--------|-----------|
| `src/components/GlowRing.tsx` | CREATE | 20 min |
| `src/components/AIGuide.tsx` | EDIT — reposition + wrap in GlowRing | 15 min |
| `src/components/SpeechBubble.tsx` | EDIT — reconnect to Wayo, grow upward | 15 min |
| `src/views/SceneL1.tsx` | EDIT — reposition title above Wayo | 10 min |
| `src/views/SceneL2.tsx` | EDIT — restructure behavior cards grid | 20 min |
| `src/views/SceneZ1.tsx` | EDIT — center scenario info | 10 min |
| `src/views/SceneZ2.tsx` | EDIT — TriageConsole upper, Wayo narrates | 15 min |
| `src/views/SceneZ3.tsx` | EDIT — decision cards above Wayo | 15 min |
| `src/views/SceneZ4.tsx` | EDIT — scorecard above, Wayo smaller | 15 min |
| `src/index.css` | EDIT — glow ring keyframes, updated glass-panel | 10 min |
| **TOTAL** | | **~145 min** |

## Verification
- `npm run build` after each scene restructure
- Visual check: Wayo centered at bottom, ring visible, speech connected
- All 7 scenes navigate correctly
- No content clipping or overflow
