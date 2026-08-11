## Research: Phase 2 Core Components

### 1. Jog Dial (use-gesture + react-spring)

**Neither `@use-gesture/react` nor `react-spring` is installed.** Both must be added.

```
npm install @use-gesture/react @react-spring/web
```

- `@use-gesture/react` latest stable: 10.x. Core hook: `useDrag`. Returns `bind()` — spread onto the element's props. `state.offset[0]` gives cumulative X-delta in pixels since drag began.
- `@react-spring/web` latest: 9.x. `useSpring` + `animated.div` gives GPU-accelerated spring physics on the `rotate` value derived from drag offset.

**Jog Dial implementation pattern:**

```tsx
const [{ rotate }, api] = useSpring(() => ({ rotate: 0 }));
const dialRef = useRef<HTMLDivElement>(null);
const posRef = useRef(0); // 0–1 normalized position

const bind = useDrag(({ offset: [ox], velocity: [vx], last }) => {
  const degrees = ox * 0.5; // px → °, tune sensitivity
  api.start({ rotate: degrees, config: { tension: 120, friction: 18 } });
  posRef.current = Math.max(0, Math.min(1, ox / MAX_DRAG_PX));
  setStore({ jogPos: posRef.current }); // write to Zustand on every frame
  if (last) {
    // snap to nearest detent (every 1/N of full range)
    const snapped = snapToDetent(posRef.current, DETENT_COUNT);
    api.start({ rotate: snapped * MAX_DEGREES, config: { tension: 200, friction: 26 } });
    setStore({ jogPos: snapped });
  }
}, { axis: 'x', bounds: { left: 0, right: MAX_DRAG_PX }, rubberband: true });
```

**Detents**: compute `Math.round(pos * N) / N` on pointer-up and spring-animate back. `rubberband: true` in useDrag gives slight over-drag elasticity at limits.

**Inertia**: use-gesture's `rubberband` is not inertia. For flywheel feel, intercept `velocity[0]` on drag-end, call `api.start({ rotate: targetDeg + vel * factor, config: { decay: true } })` using react-spring's `config.decay = true` mode.

**Performance**: The spring value lives in `react-spring`'s frame loop (not React state). As long as `setStore({ jogPos })` is called with Zustand's `setState` (which does not trigger re-renders unless subscribed), there is no React render per animation frame. Canvas frame lookup and lidar shader uniform update must be driven by a `useEffect(() => {...}, [jogPos])` or a RAF loop reading the spring value directly via `rotate.get()`.

**Zustand integration**: Add `jogPos: number` (0–1) and `setJogPos: (v: number) => void` to `useStore`. Keep the setter as a non-reactive primitive — components that need to read it can subscribe; the dial writer never subscribes.

**CSS**: Render the dial knob as a `<animated.div style={{ rotate }}>` containing tick-mark SVG. A `touch-action: none` CSS rule on the drag target is required to prevent browser scroll interference on touch.

**Gotcha — React 19 + @use-gesture v10**: React 19 concurrent mode is fully compatible with use-gesture v10. No extra config needed.

---

### 2. Canvas Image Sequence

**No additional library needed.** Native `<canvas>` + HTML `Image` preload.

**Pattern:**

```tsx
// preload all frames at mount
const frames = useRef<HTMLImageElement[]>([]);
useEffect(() => {
  FRAME_SRCS.forEach((src, i) => {
    const img = new Image();
    img.src = src;
    frames.current[i] = img;
  });
}, []);

// paint whenever jogPos changes
const canvasRef = useRef<HTMLCanvasElement>(null);
useEffect(() => {
  const idx = Math.floor(jogPos * (frames.current.length - 1));
  const img = frames.current[idx];
  if (!img?.complete || !canvasRef.current) return;
  const ctx = canvasRef.current.getContext('2d')!;
  ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
}, [jogPos]);
```

**SCORM + Vite asset bundling**: Frame images must be in `src/assets/frames/` and either statically imported in an array (Vite bundles them with content-hash names) or placed in `public/frames/` with a known path pattern. For a demo slice the `public/` approach is simpler — no import array needed, just `Array.from({ length: N }, (_, i) => \`/frames/f${String(i).padStart(4, '0')}.jpg\`)`. For SCORM offline delivery they must be in `public/` and the Vite `base: './'` setting ensures relative paths in the built package.

**Performance**: Paint only on jogPos change (not every frame). `requestAnimationFrame` batching is not needed because `useEffect` on a state value fires once per commit. If jogPos updates at 60Hz via react-spring, wrap the paint in `requestAnimationFrame` to avoid jank from synchronous canvas writes inside effects:

```tsx
useEffect(() => {
  const raf = requestAnimationFrame(() => paintFrame(jogPos));
  return () => cancelAnimationFrame(raf);
}, [jogPos]);
```

**Fallback for missing assets**: Guard `img?.complete && img.naturalWidth > 0` before drawImage. For Phase 2 without real frames, render a procedural SVG placeholder on canvas showing frame index.

**Integration with Jog Dial**: The dial calls `setStore({ jogPos })`. The canvas subscribes to `useStore(s => s.jogPos)`. One-way data flow; no prop threading needed.

---

### 3. Lidar Point-Cloud Shader (R3F)

**`@react-three/fiber` and `@react-three/drei` are not installed.** Both must be added.

```
npm install @react-three/fiber @react-three/drei three
npm install -D @types/three
```

Versions as of Aug 2026: R3F 8.x (React 19 compatible via `@react-three/fiber@8`), drei 9.x, three 0.168+.

**Approach — procedural vertex shader on `<Points>`:**

```tsx
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate synthetic point cloud matching incident geometry
function LidarCloud({ jogPos }: { jogPos: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => generateCloud(jogPos), [/* static; update via uniform */]);

  const uniforms = useRef({ uTime: { value: 0 }, uProgress: { value: 0 } });

  useFrame(({ clock }) => {
    uniforms.current.uTime.value = clock.elapsedTime;
    uniforms.current.uProgress.value = jogPos; // driven externally
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
```

**Vertex shader** (GLSL ES 3.0 via Three r152+):

```glsl
uniform float uTime;
uniform float uProgress;
attribute vec3 position;

void main() {
  // subtle idle drift + progress-gated reveal
  vec3 pos = position;
  float reveal = step(length(pos.xz), uProgress * 120.0); // radial sweep reveal
  pos.y += sin(uTime * 1.2 + pos.x * 0.5) * 0.05 * reveal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = max(1.0, 3.0 - length(pos) * 0.01) * reveal;
}
```

**Fragment shader:**

```glsl
void main() {
  // soft disc point shape
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(0.31, 0.76, 0.97, (1.0 - d * 2.0) * 0.8); // triage glow teal
}
```

**Data source**: For Phase 2, generate a synthetic top-down road+flagger point cloud procedurally (no real sensor data needed). ~2000–4000 points is sufficient for visual fidelity without GPU pressure.

**R3F Canvas placement**: Render R3F inside the existing DOM layout as a sized `<div>` container (not a global overlay). The SCORM delivery constraint means no separate WebGL context per-scene — one `<Canvas>` should live in the Triage console panel for Zone 2. The existing `SceneShell` uses `absolute inset-0`; nest `<Canvas>` inside the lidar panel `<div>` with `className="w-full h-full"`.

**Performance / SCORM fallback**: On low-GPU devices reduce point count. Gate R3F behind a `<Suspense>` with a CSS SVG fallback (the existing SVG lidar view in Scene20 is the fallback). Use `gl={{ powerPreference: 'default', antialias: false }}` on `<Canvas>` for SCORM delivery.

**React 19 + R3F 8 compatibility**: R3F 8 supports React 19. No extra config beyond standard setup.

**Gotcha — R3F inside a non-fullscreen div**: Set explicit `width`/`height` or `style={{ width: '100%', height: '100%' }}` on `<Canvas>`. R3F reads the parent's computed dimensions. If the parent has `height: 0`, the canvas will be invisible.

---

### 4. Wayo SVG Rig (Framer Motion)

**Framer Motion 11.18.2 is already installed.** No new dependencies needed.

**Current state of `Wayo.tsx`**: Uses video+poster swap per state, not SVG. The ROADMAP calls for a "rigged SVG character." The Phase 2 deliverable is to layer Framer Motion animation states on top of the existing video-based Wayo while also preparing SVG rig groundwork.

**Approach — extend `Wayo.tsx` with named variants for each animation state:**

```tsx
const idleVariant = {
  y: [0, -8, 0],
  rotate: [0, 0.5, 0],
  transition: { y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } }
};

const talkingVariant = {
  y: [0, -4, 0, -6, 0],
  rotate: [0, 1, -0.5, 0.5, 0],
  transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
};

const parallaxVariant = (mouseX: number, mouseY: number) => ({
  x: mouseX * 0.02,
  y: mouseY * 0.015,
  rotate: mouseX * 0.005,
  transition: { type: 'spring', stiffness: 60, damping: 20 }
});
```

**Parallax-on-mouse**: Add `useMotionValue` + `useTransform` to map `clientX/clientY` (from a `mousemove` listener on the root container) into subtle x/y/rotate transforms on Wayo's wrapper `motion.div`. This is zero-dependency — Framer Motion already provides the tools.

```tsx
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);
const rotateX = useTransform(mouseY, [-300, 300], [3, -3]);
const rotateY = useTransform(mouseX, [-400, 400], [-4, 4]);

// on window mousemove: mouseX.set(e.clientX - window.innerWidth/2)
```

**Emotion states** (`idle | curious | thinking | concerned | alert | happy`): All six already modelled in `WayoState` type and `mediaSources` map. The Framer Motion layer adds body-language variants on top of the video swap. The `key={state}` on the outer `motion.div` already triggers exit/enter animations on state change — no structural change needed.

**SVG rig groundwork**: DESIGN-SPEC lists `wayo-idle.svg`, `wayo-talking.svg`, etc. These don't exist yet. For Phase 2 the SVG assets are a dependency of the full rig. Strategy: keep video+poster as the render layer, add SVG overlay paths for lip-sync and eye blink in a later sub-phase when assets arrive. Phase 2 delivers the animation variant system and mouse parallax.

**Talking animation (lip-sync ready)**: Export a `mouth` `<motion.path>` as a named element in the SVG. Drive `d` attribute via `useTransform` on an `audioLevel` motion value. For Phase 2, drive it from a `useInterval` simulated pulse keyed to `state === 'talking'`. Real audio analysis (Web Audio API AnalyserNode) is a Phase 3+ concern.

**Files**: Modify `src/components/Wayo.tsx` only. All animation state changes happen through the existing `state` prop. No new files needed for the rig layer.

---

### 5. Integration Architecture

```
useStore
  ├── jogPos: number (0–1)         ← written by JogDial on every drag frame
  ├── setJogPos(v)                 ← exposed setter, no re-render for writers
  ├── wayoState: WayoState         ← drives Wayo variants
  └── currentSceneIndex            ← existing navigation

JogDial (src/components/JogDial.tsx)
  ├── reads: nothing from store
  ├── writes: store.setJogPos(0–1) on drag + snap-on-release
  └── visual: react-spring animated.div → rotate

CanvasSequence (src/components/CanvasSequence.tsx)
  ├── reads: store.jogPos
  ├── paints: frames[Math.floor(jogPos * frameCount)] onto <canvas>
  └── no writes

LidarCloud (src/components/LidarCloud.tsx)
  ├── reads: store.jogPos via prop or useStore
  ├── updates: shaderMaterial uniform uProgress per frame (useFrame)
  └── lives inside: <Canvas> in Zone 2 lidar panel div

Wayo (src/components/Wayo.tsx)
  ├── reads: wayoState prop (passed from SceneShell)
  ├── owns: mouse parallax via window mousemove + useMotionValue
  └── no store writes

Zone 2 scene (Scene20/21 replacements)
  └── composes: JogDial + CanvasSequence + LidarCloud + Wayo
```

**Data flow is strictly one-way.** JogDial writes; Canvas and Lidar read. Wayo is independent of the scrubber.

**Store extension**: Add to `useStore`:
```ts
jogPos: number;         // 0–1, default 0
setJogPos: (v: number) => void;
```

This is the minimal addition — Zustand's `setState` is synchronous and doesn't batch with React, so high-frequency updates (60Hz drag) are safe as long as components that read `jogPos` don't re-render on every change. Use `useStore(s => s.jogPos)` only in components that must re-render (CanvasSequence). LidarCloud reads via `useFrame` ref instead of React subscription.

---

### 6. Risks & Mitigations

**R1 — Missing dependencies are the biggest blocker.**
`@use-gesture/react`, `@react-spring/web`, `@react-three/fiber`, `@react-three/drei`, `three` are all absent from `package.json`. Plan execution must start with `npm install` of all five. Verify React 19 peer-dep compatibility before coding. R3F 8 and react-spring 9 both declare `"react": ">=18"` which React 19 satisfies.

**R2 — R3F canvas sizing inside constrained panels.**
The existing lidar panel in Scene20 is a `glass-panel` div with `h-full`. R3F `<Canvas>` requires the parent to have an explicit non-zero height. Always set `style={{ minHeight: '200px' }}` or use `className="w-full h-full"` and ensure the parent chain has a computed height. Symptom of failure: invisible canvas with no error.

**R3 — High-frequency Zustand writes from drag.**
Calling `store.setJogPos` inside useDrag fires at pointer-event rate (~60Hz). If any React component subscribes to `jogPos` it re-renders at 60Hz — acceptable only for the canvas component (which is lightweight). The LidarCloud must read via `useFrame`'s closure/ref pattern, not `useStore`. Audit all `useStore(s => s.jogPos)` subscriptions at implementation time.

**R4 — SCORM packaging of WebGL.**
Some older LMS iframe sandboxes block WebGL. The `<Canvas>` must be wrapped in a feature-detect: `if (!WebGLRenderingContext) return <SVGFallback />`. The existing SVG lidar view in Scene20 is the ready-made fallback — extract it into `<LidarSVGFallback>` alongside `<LidarCloud>`.

**R5 — Frame assets for CanvasSequence don't exist yet.**
The construction-flagger incident frames are not in the repo. Phase 2 can deliver the CanvasSequence component with a procedural canvas fallback (draw frame number as text + a placeholder road silhouette) so the mechanism is validated before real assets arrive. Gate real-frame paint behind `frames.length > 0` check.

---

### 7. Files to Create / Modify

**New files:**
- `src/components/JogDial.tsx` — drag control, react-spring rotation, detent snap, writes jogPos to store
- `src/components/CanvasSequence.tsx` — reads jogPos, paints image frames on `<canvas>`, procedural fallback
- `src/components/LidarCloud.tsx` — R3F `<Canvas>` + `<Points>` with vertex/fragment shaders, reads jogPos
- `src/components/LidarSVGFallback.tsx` — extract existing SVG lidar from Scene20 as standalone component

**Modified files:**
- `src/store/useStore.ts` — add `jogPos: number`, `setJogPos: (v: number) => void`
- `src/components/Wayo.tsx` — add animation variants (talking, parallax-on-mouse), keep video layer intact
- `package.json` — add `@use-gesture/react`, `@react-spring/web`, `@react-three/fiber`, `@react-three/drei`, `three` (+ `@types/three` dev)

**No new views needed in Phase 2.** Components are wired into Zone 2 scenes (Scene20/21) in Phase 5. Phase 2 delivers the components in isolation, testable via a throwaway dev harness or directly dropped into Scene20 for smoke-testing.

## RESEARCH COMPLETE
