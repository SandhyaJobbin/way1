---
plan: 02-04
status: complete
commit: 24a04c7
---

# Summary: 02-04 Rig + Integration — Wayo Variants and Phase2Demo Smoke Test

## What was built

### Wayo.tsx — extended (75 lines)
- Added `bodyVariants: Record<WayoState, TargetAndTransition>` with all 6 emotion states
- Added `useMotionValue` (mouseX, mouseY) + `useTransform` (parallaxX, parallaxY, parallaxRotate) for subtle pointer-tracking parallax
- `window.mousemove` listener wired in `useEffect` with cleanup
- Inner `motion.div` now drives `animate={bodyVariants[state]}` + `style={{ x: parallaxX, y: parallaxY, rotate: parallaxRotate }}`
- Outer slide-in `motion.div` (key/initial/exit/transition) unchanged ✓
- `<video>` element unchanged (same src/poster/autoPlay/loop/muted/playsInline) ✓

### Phase2Demo.tsx — created (72 lines)
- Dark full-screen layout, 2-column grid
- Left: JogDial (160px, 10 detents) + CanvasSequence (320×180, 30 frames)
- Right: LidarCloud in 280px container + Wayo in 280px container
- Header shows live `jogPos.toFixed(3)` from store
- **Not registered in src/routes.tsx** ✓

### Integration verification
- Build with Phase2Demo wired into App.tsx: clean ✓
- App.tsx reverted: `Phase2Demo NOT in App.tsx` ✓
- Final build: clean (4.30s, 314kB main bundle) ✓

## Self-Check: PASSED
- `npx tsc --noEmit` exits 0 ✓
- `npm run build` exits 0 ✓
- Outer Wayo motion.div unchanged ✓
- Phase2Demo not in routes ✓
- App.tsx reverted ✓
- Wayo.tsx: 75 lines (< 120) ✓; Phase2Demo.tsx: 72 lines (< 80) ✓

## Human verification items (requires `npm run dev`)
- All 4 panels render: JogDial, CanvasSequence, LidarCloud, Wayo
- Drag JogDial → `jogPos: X.XXX` in header updates in real-time
- CanvasSequence frame number advances as dial moves
- LidarCloud renders (R3F canvas or SVG fallback — no blank panel)
- Wayo renders with body-float animation + mouse parallax

## Key files
- `src/components/Wayo.tsx` — emotion variants + parallax
- `src/views/Phase2Demo.tsx` — integration smoke-test harness