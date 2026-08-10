---
plan: 02-03
status: complete
commit: d80d07a
---

# Summary: 02-03 Lidar R3F — Point-Cloud Shader + SVG Fallback

## What was built

### LidarSVGFallback.tsx (40 lines)
- Static SVG top-down lidar scene — 40 teal dots in road + pedestrian scatter
- Two perspective road lines, dark `#0a0e1a` background, label at bottom
- Pure SVG — zero three.js / R3F runtime imports on this path

### LidarCloud.tsx (79 lines)
- R3F `<Canvas>` with custom GLSL point-cloud shader:
  - **Vertex shader**: `reveal` step gated by `uProgress` (drives jogPos reveal), time-based shimmer
  - **Fragment shader**: circular points with alpha falloff (`#4db8ff` teal)
- `CloudScene` reads jogPos from prop via `useFrame` closure — **no `useStore` subscription inside R3F** (frame loop never triggers React renders)
- Outer `LidarCloud` is the only component that subscribes to store (`useStore(s => s.jogPos)`)
- `hasWebGL()` feature-detect: falls back to `LidarSVGFallback` when unavailable (no three.js evaluated at runtime for that path)
- `gl={{ powerPreference: 'default', antialias: false }}` — SCORM LMS compatibility
- Parent div `style={{ minHeight: 200 }}` — prevents zero-height invisible canvas (R2 from RESEARCH.md)

## Self-Check: PASSED
- `npx tsc --noEmit` exits 0 ✓
- `npm run build` exits 0 (14.87s) ✓
- `CloudScene` reads jogPos via prop, not store ✓
- `LidarSVGFallback`: 40 lines (< 60) ✓; `LidarCloud`: 79 lines (< 110) ✓

## Deviations
- Removed unused `import * as THREE from 'three'` (plan included it but the R3F JSX API means no direct `THREE.*` reference in this file)
- `bufferAttribute` uses `args={[positions, 3]}` instead of `array`/`itemSize`/`count` props — required by R3F v9's typed JSX API. Plan text predates R3F v9; functionally equivalent (R3F constructs the `BufferAttribute` from the same data).

## Key files
- `src/components/LidarCloud.tsx`
- `src/components/LidarSVGFallback.tsx`