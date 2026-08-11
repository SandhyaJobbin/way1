---
plan: 02-02
status: complete
commit: 7db75a4
---

# Summary: 02-02 Gesture + Canvas — JogDial and CanvasSequence

## What was built

### JogDial.tsx (63 lines)
- `useDrag` from `@use-gesture/react` with horizontal axis binding, `rubberband: true`, bounds `[0, MAX_DRAG_PX]`
- `useSpring` from `@react-spring/web` drives `rotate` of the dial face
- On release (`last=true`): snaps to nearest detent, then decays via `config: { decay: true }` + settling spring
- Only writes to store via `setJogPos` — no `jogPos` subscription (no re-render loop)
- Animated dark radial-gradient circle with teal tick indicator

### CanvasSequence.tsx (65 lines)
- Subscribes to `jogPos` from store
- Preloads `public/frames/f0000.jpg`… on mount (`useEffect([], [])`)
- `useEffect([jogPos])` wraps all paint in `requestAnimationFrame` — no synchronous drawImage
- Procedural fallback: dark background, two road perspective lines, frame counter text, teal progress bar at bottom

## Self-Check: PASSED
- Both files export named exports ✓
- `npx tsc --noEmit` exits 0 ✓
- `npm run build` exits 0 (4.10s) ✓
- JogDial only calls setJogPos — no store.jogPos subscription ✓
- Canvas paint is wrapped in requestAnimationFrame ✓
- JogDial: 63 lines (< 100) ✓; CanvasSequence: 65 lines (< 90) ✓

## Key files
- `src/components/JogDial.tsx`
- `src/components/CanvasSequence.tsx`
