---
phase: 03-hub-polish-cinematics
plan: "05"
timestamp: "2026-08-10T17:25:00Z"
commit: a40bcbc
status: completed
summary_type: execute
---

# Plan 03-05 Summary: LidarCloud Extraction

## What was built
Extracted CloudScene (points + shader material) from LidarCloud.tsx, removed its Canvas wrapper, and wired it into the global Canvas. The lidar point cloud now renders alongside the orbital map rings and receives post-processing effects in a single WebGL context.

## Files changed (9 files, +113/-92)
| File | Action |
|------|--------|
| `src/lib/webgl.ts` | **Created** — hasWebGL() utility extracted from LidarCloud |
| `src/components/three/CloudScene.tsx` | **Created** — CloudScene + generateCloud + shaders, no Canvas |
| `src/components/LidarCloud.tsx` | **Modified** — thin wrapper (no Canvas), re-exports CloudScene |
| `src/App.tsx` | **Modified** — hasWebGL gate around Canvas, LidarSVGFallback on no WebGL |
| `src/components/three/GlobalScene.tsx` | **Modified** — wires CloudScene between HubOrbitMap and PostProcessing |
| `src/components/dom/__tests__/SpeechBubble.test.tsx` | **Fixed** — removed unused render import for TS build |
| `src/components/three/__tests__/CameraRig.test.tsx` | **Fixed** — removed unused render import for TS build |
| `src/components/three/__tests__/CloudScene.test.tsx` | **Fixed** — removed unused render import for TS build |
| `src/components/three/__tests__/GlobalScene.test.tsx` | **Fixed** — removed unused imports for TS build |

## Architecture
```
App.tsx
├── z-0: hasWebGL() ? <Canvas><GlobalScene/></Canvas> : <LidarSVGFallback/>
│   └── GlobalScene
│       ├── ambientLight
│       ├── CameraRig
│       ├── HubOrbitMap (conditional)
│       ├── CloudScene (always visible)      ← lidar inside global Canvas
│       └── PostProcessing                   ← affects CloudScene too
└── z-10: DOM overlay (SceneRenderer + ProgressDots)
```

## Verification
- **vitest:** 6 passed, 8 skipped (no regressions)
- **tsc:** Clean (only pre-existing scaffold `it.skip` blocks)
- **build:** Passes (Vite bundle 1,393KB JS)
- **Backward compat:** LidarCloud wrapper still renders CloudScene for existing consumers

## Deviations
- Fixed 4 scaffold test files (removed unused imports) to unblock production build — tsc was rejecting due to `noUnusedLocals: true`
