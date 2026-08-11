# Phase 3: Hub & Polish (Cinematics) - Research

**Researched:** 2026-08-10
**Domain:** R3F Global Canvas Architecture, Post-processing Pipeline, Camera Animation, Speech UI
**Confidence:** HIGH

## Summary

Phase 3 introduces a persistent global R3F Canvas that wraps the entire application underneath the DOM overlay (ShellLayout). This canvas hosts the orbital ecosystem map (Hub), absorbs the existing LidarCloud's WebGL content, and applies a broadcast-grade post-processing stack (ACES Filmic, Bloom, Vignette, Noise). Camera dolly transitions animate between Hub and Zone focus coordinates. A CSS HUD-style speech bubble overlays the DOM with typewriter text and aria-live accessibility.

**Primary recommendation:** Use a single global `<Canvas>` wrapping App.tsx children, migrate LidarCloud's `CloudScene` into it, add `EffectComposer` for post-processing, use `CameraControls` (drei) with `react-spring` for dolly transitions, and keep Wayo/SpeechBubble in the DOM overlay.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Global 3D Canvas | Browser / Client | — | WebGL rendering is purely client-side; R3F runs in the browser |
| Post-processing pipeline | Browser / Client | — | GPU shader effects run on client GPU via WebGL |
| Orbital map rendering | Browser / Client | — | 3D geometry rendered in WebGL via R3F |
| Camera transitions | Browser / Client | — | Camera animation handled by R3F frame loop + react-spring |
| Speech bubble UI | Browser / Client | — | DOM overlay, CSS positioned, no server involvement |
| Typewriter animation | Browser / Client | — | Client-side interval/timer + aria-live for screen readers |
| Scene routing | Browser / Client | — | HashRouter + Zustand store, no server routes |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @react-three/fiber | ^9.7.0 | React renderer for Three.js | Already installed; de facto standard for React+Three.js [VERIFIED: npm registry] |
| @react-three/drei | ^10.7.8 | Helper abstractions for R3F (CameraControls, etc.) | Already installed; official pmndrs companion library [VERIFIED: npm registry] |
| three | ^0.185.1 | 3D engine (TorusGeometry, MathUtils, etc.) | Already installed; only production 3D lib for web [VERIFIED: npm registry] |
| @react-three/postprocessing | ^3.0.5 | Post-processing effect wrapper for R3F | Official pmndrs package; wraps `postprocessing` lib [VERIFIED: npm registry] |
| postprocessing | ^6.39.4 | Post-processing engine (peer dep of react-postprocessing) | Required by @react-three/postprocessing; 860K/wk downloads [VERIFIED: npm registry] |
| @react-spring/three | ^10.1.2 | Declarative spring animations for Three.js objects | @react-spring/web already installed; @react-spring/three adds Three.js target [VERIFIED: npm registry] |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| framer-motion | ^11.18.2 | DOM animations (Wayo, SpeechBubble, route transitions) | Already installed; stays for DOM overlay layer |
| @react-spring/web | ^10.1.2 | DOM spring animations (JogDial) | Already installed; JogDial use case |
| zustand | ^5.0.14 | Global state (camera target, zone transitions) | Already installed; extend for camera/transition state |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @react-three/postprocessing | Manual shader passes | Shader approach avoids 211KB gzipped but requires hand-rolling EffectComposer, multipass rendering, gamma correction — 200+ LOC. Not worth it for this phase. |
| CameraControls (drei) | Manual useFrame lerp | `useFrame` lerp is simpler but lacks easing curves, boundary clamping, and event callbacks. CameraControls provides `setLookAt` with built-in smooth transitions. |
| TorusGeometry rings | Custom shader rings | Shader rings are thinner on GPU but harder to animate pulsing/color. TorusGeometry + MeshStandardMaterial gives easy color/scale animation via react-spring. Use TorusGeometry for dev speed; swap to shader if performance issues arise on low-end devices. |

**Installation:**
```bash
npm install @react-three/postprocessing@^3.0.5 postprocessing@^6.39.4 @react-spring/three@^10.1.2
```

## Package Legitimacy Audit

> All pmndrs packages flagged "SUS" due to recency of publish (< 30 days), not due to suspicious provenance. All are from the well-established `github.com/pmndrs` organization with millions of weekly downloads. Treat as approved.

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| @react-three/postprocessing | npm | 1 day | 678K/wk | github.com/pmndrs/react-postprocessing | SUS (too-new) | Approved — pmndrs org, high downloads |
| postprocessing | npm | 14 days | 860K/wk | github.com/pmndrs/postprocessing | SUS (too-new) | Approved — pmndrs org, high downloads |
| @react-three/drei | npm | 5 days | 3.8M/wk | github.com/pmndrs/drei | SUS (too-new) | Approved — already installed |
| @react-three/fiber | npm | 10 days | 5.0M/wk | github.com/pmndrs/react-three-fiber | SUS (too-new) | Approved — already installed |
| three | npm | ~40 days | 14.2M/wk | github.com/mrdoob/three.js | OK | Approved |
| @react-spring/three | npm | ~47 days | 2.0M/wk | github.com/pmndrs/react-spring | OK | Approved |

**Packages removed due to SLOP verdict:** None
**Packages flagged as suspicious:** 4 (all "too-new" from pmndrs — treated as approved given organizational provenance)

## Architecture Patterns

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      App.tsx                             │
│  ┌───────────────────────────────────────────────────┐  │
│  │          Global R3F Canvas (z-0, fullscreen)       │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │  GlobalScene                                 │  │  │
│  │  │  ├── CameraRig (CameraControls + spring)     │  │  │
│  │  │  ├── HubOrbitMap (conditional: route=hub)    │  │  │
│  │  │  │   ├── WayoToken (center pulse)            │  │  │
│  │  │  │   ├── RingLive (innermost, amber)         │  │  │
│  │  │  │   ├── RingResponse (middle, F1 red/white) │  │  │
│  │  │  │   ├── RingLearning (outer, blue-violet)   │  │  │
│  │  │  │   └── IncidentToken (animated path dot)   │  │  │
│  │  │  ├── LidarCloud (extracted CloudScene)       │  │  │
│  │  │  ├── ZoneFocusMarkers (per-zone camera pts)  │  │  │
│  │  │  └── EffectComposer                          │  │  │
│  │  │       ├── ToneMapping (ACES_FILMIC)          │  │  │
│  │  │       ├── Bloom (subtle)                     │  │  │
│  │  │       ├── Vignette                           │  │  │
│  │  │       └── Noise (film grain)                 │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │      DOM Overlay (z-10, ShellLayout, absolute)    │  │
│  │  ├── SceneShell (background + Wayo + children)    │  │
│  │  ├── SpeechBubble (CSS HUD, typewriter, aria-live)│  │
│  │  ├── ProgressDots                                 │  │
│  │  └── Scene views (per-route content)              │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Data flow:**
1. User navigates (hash route change or store `navigateTo`)
2. Zustand store updates `currentSceneIndex` + `cameraTarget` (Hub or Zone preset)
3. Global `CameraRig` component reads `cameraTarget` → `CameraControls.setLookAt(x,y,z, tx,ty,tz, true)` with smooth transition
4. `HubOrbitMap` conditionally renders based on route zone type (visible on hub, hidden on zone detail)
5. `SpeechBubble` reads speech content from zone context, renders typewriter text
6. `EffectComposer` applies post-processing uniformly to all 3D content

### Recommended Project Structure
```
src/
├── components/
│   ├── three/                    # NEW: 3D components inside global canvas
│   │   ├── GlobalScene.tsx       # Root scene with CameraRig, conditional render
│   │   ├── CameraRig.tsx         # CameraControls + react-spring dolly
│   │   ├── HubOrbitMap.tsx       # Concentric rings + incident token
│   │   ├── OrbitRing.tsx         # Single animated ring (TorusGeometry)
│   │   ├── IncidentToken.tsx     # Animated dot moving along ring paths
│   │   ├── CloudScene.tsx        # EXTRACTED from LidarCloud.tsx (no Canvas wrap)
│   │   └── PostProcessing.tsx    # EffectComposer with all passes
│   ├── dom/                      # RENAMED: DOM overlay components
│   │   ├── Wayo.tsx              # (moved) Framer Motion Wayo character
│   │   ├── SpeechBubble.tsx      # (enhanced) typewriter + directional pointing
│   │   ├── SceneShell.tsx        # (existing) background + Wayo wrapper
│   │   ├── ShellLayout.tsx       # (NEW) z-10 DOM overlay container
│   │   └── ...                   # existing DOM components
├── hooks/
│   ├── useTypewriter.ts          # NEW: typewriter animation hook
│   ├── useCameraTransition.ts    # NEW: camera target ↔ spring bridge
│   └── ...
├── content/
│   ├── speech-data.ts            # NEW: Wayo speech text per zone
│   └── ...
├── store/
│   └── useStore.ts               # EXTEND: cameraTarget, transitionPhase
├── App.tsx                        # MODIFIED: add global Canvas wrapper
```

### Pattern 1: Single Global Canvas Architecture

**What:** A single persistent R3F `<Canvas>` wrapping all routes, positioned behind the DOM overlay. All 3D content (orbital map, lidar cloud, zone markers) renders as children of this canvas. The canvas element persists across route changes — only its children re-render.

**Why NOT multiple Canvases:**
- Each `<Canvas>` creates a separate WebGL context (browser limit: ~8-16). Multiple contexts = GPU memory fragmentation.
- Post-processing (EffectComposer) must run in the same context as the scene it processes. Multiple canvases = multiple EffectComposers = 2x GPU cost.
- Camera transitions CANNOT cross between separate WebGL contexts. A dolly from Hub to Zone must happen within a single canvas.
- The R3F Canvas already persists its WebGL context across child re-renders via `if(!root.current) createRoot(canvas)` [CITED: pmndrs/react-three-fiber Canvas.tsx source].

**Implementation:**
```tsx
// App.tsx
import { Canvas } from '@react-three/fiber';
import { GlobalScene } from './components/three/GlobalScene';

export default function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* z-0: Global 3D canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 14, 0], fov: 55, up: [0, 0, -1] }}
          gl={{ powerPreference: 'high-performance', antialias: false }}
          style={{ width: '100%', height: '100%' }}
        >
          <GlobalScene />
        </Canvas>
      </div>
      {/* z-10: DOM overlay (existing ShellLayout pattern) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="pointer-events-auto w-full h-full">
          <AnimatePresence mode="wait">
            <SceneRenderer key={sceneId} sceneId={sceneId} />
          </AnimatePresence>
        </div>
        <ProgressDots />
      </div>
    </div>
  );
}
```

### Pattern 2: Camera Dolly Transitions

**What:** Smooth camera animation between preset positions using drei's `CameraControls.setLookAt()` with `smooth=true`, bridged through Zustand state.

**Camera presets:**
| Position | Camera XYZ | LookAt XYZ | Route |
|----------|-----------|------------|-------|
| Hub (top-down) | (0, 14, 0) | (0, 0, 0) | Scene 02 |
| Hub (angled) | (0, 10, -6) | (0, 0, -2) | Scene 02 alt |
| Zone 1 (Live) | (4, 3, -8) | (6, 0, -2) | Scene 16/17 |
| Zone 2 (Response) | (-3, 4, -12) | (-2, 0, -4) | Scene 19/20/22 |
| Zone 3 (Learning) | (-8, 5, -16) | (-4, 0, -6) | Future |

**Implementation:**
```tsx
// CameraRig.tsx [CITED: /pmndrs/drei docs - CameraControls]
import { CameraControls } from '@react-three/drei';
import { useStore } from '../../store/useStore';
import { useRef, useEffect } from 'react';

const CAMERA_PRESETS = {
  hub:    { pos: [0, 14, 0],   target: [0, 0, 0] },
  zone1:  { pos: [4, 3, -8],   target: [6, 0, -2] },
  zone2:  { pos: [-3, 4, -12], target: [-2, 0, -4] },
  zone3:  { pos: [-8, 5, -16], target: [-4, 0, -6] },
} as const;

export function CameraRig() {
  const controlsRef = useRef<CameraControls>(null);
  const cameraTarget = useStore((s) => s.cameraTarget);

  useEffect(() => {
    const preset = CAMERA_PRESETS[cameraTarget];
    if (preset && controlsRef.current) {
      controlsRef.current.setLookAt(
        ...preset.pos, ...preset.target, true // smooth=true
      );
    }
  }, [cameraTarget]);

  return <CameraControls ref={controlsRef} makeDefault />;
}
```

**Duration tuning:** `CameraControls` default smooth duration is ~1.2s. Adjust via `controlsRef.current.setLookAt(..., ..., true)` and configure `smoothTime` prop. Target: 1.5-2.0s for cinematic feel matching the "radar track dolly" spec from CONTEXT.md.

### Pattern 3: Orbital Map (Concentric Rings)

**What:** Three concentric `TorusGeometry` rings with react-spring animated pulse effects, rendered flat (rotated 90° on X-axis to lay horizontal). A pulsing `IncidentToken` (sphere + point light) moves along ring paths.

**Ring geometry approach:** Use Three.js `TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments)` — not custom shader rings. Rationale:
- TorusGeometry is GPU-cheap (few hundred vertices) with built-in normal calculation
- MeshStandardMaterial with `emissive` gives glow without post-processing dependency
- react-spring can animate `scale`, `material-emissiveIntensity`, and `material-opacity` directly
- Shader rings would be ~50 lines of GLSL with less flexible animation control

**Ring specs:**
| Ring | Radius | Color | emissiveIntensity (pulse) | Zone |
|------|--------|-------|--------------------------|------|
| Live | 3.5 | #FF6B2B | 0.3 → 0.8 | Zone 1 |
| Response | 7.0 | #E8E8E8 / #CC0000 | 0.2 → 0.6 | Zone 2 |
| Learning | 10.5 | #4A90E2 / #7B61FF | 0.2 → 0.5 | Zone 3 |

```tsx
// OrbitRing.tsx [ASSUMED — TorusGeometry API from three.js docs]
import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/three';
import type { Mesh } from 'three';

interface OrbitRingProps {
  radius: number;
  color: string;
  active: boolean;
  pulseIntensity?: number;
}

export function OrbitRing({ radius, color, active, pulseIntensity = 1 }: OrbitRingProps) {
  const meshRef = useRef<Mesh>(null);
  const { emissiveIntensity, scale } = useSpring({
    emissiveIntensity: active ? 0.6 * pulseIntensity : 0.15,
    scale: active ? [1, 1, 1.02] : [1, 1, 1],
    config: { tension: 60, friction: 8 },
  });

  return (
    <animated.mesh
      ref={meshRef}
      rotation={[Math.PI / 2, 0, 0]}  // lay flat
      position={[0, 0.01, 0]}
      scale={scale}
    >
      <torusGeometry args={[radius, 0.08, 16, 100]} />
      <animated.meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        transparent
        opacity={0.85}
        toneMapped={false}
      />
    </animated.mesh>
  );
}
```

### Pattern 4: Post-processing Stack

**What:** `EffectComposer` wrapping all 3D content inside the global Canvas. Uses the `postprocessing` library's efficient single-pass effect merging (single triangle fullscreen render, not quad).

**Effect chain (in order):**
1. **ToneMapping** (ACES_FILMIC) — F1 broadcast look, maps HDR→LDR with cinematic curve
2. **Bloom** — subtle glow on emissive materials (ring accents, incident token)
3. **Vignette** — darkens edges, draws eye to center
4. **Noise** — film grain texture, low opacity for broadcast feel

```tsx
// PostProcessing.tsx [CITED: /pmndrs/react-postprocessing docs]
import { EffectComposer, ToneMapping, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';

export function PostProcessing() {
  return (
    <EffectComposer multisampling={0}>  {/* MSAA handled by EffectComposer */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        intensity={0.4}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.15} darkness={0.6} />
      <Noise opacity={0.015} />
    </EffectComposer>
  );
}
```

**Performance fallback:** If device is low-GPU, reduce `resolutionScale={0.5}` on EffectComposer and disable Bloom. Detect via `gl.capabilities.maxTextures` or user-agent based tier.

**Important:** EffectComposer forces `renderer.toneMapping = NoToneMapping`. Materials can still use `toneMapped={true}` individually. Our emissive ring materials use `toneMapped={false}` to preserve color accuracy since ACES handles the full pipeline.

### Pattern 5: Speech Bubble (Typewriter + aria-live)

**What:** DOM-based CSS HUD overlay with typewriter animation and accessibility.

```tsx
// SpeechBubble.tsx (enhanced) [ASSUMED — pattern from common React a11y patterns]
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SpeechBubbleProps {
  text: string;
  show: boolean;
  direction?: 'left' | 'center' | 'right';
  charsPerSecond?: number;
  onComplete?: () => void;
}

export function SpeechBubble({
  text, show, direction = 'left',
  charsPerSecond = 30, onComplete,
}: SpeechBubbleProps) {
  const [displayedChars, setDisplayedChars] = useState(0);
  const liveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show || !text) { setDisplayedChars(0); return; }
    setDisplayedChars(0);
    const interval = setInterval(() => {
      setDisplayedChars((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          onComplete?.();
          return prev;
        }
        return prev + 1;
      });
    }, 1000 / charsPerSecond);
    return () => clearInterval(interval);
  }, [text, show, charsPerSecond]);

  const arrowClasses = {
    left: 'left-4 border-l-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-4 border-r-0',
  };

  return show ? (
    <motion.div
      className={`absolute bottom-[35%] ${arrowClasses[direction]} z-30 max-w-md`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {/* Directional arrow */}
      <div className={`w-0 h-0 border-8 border-transparent border-b-white/10
        ${direction === 'left' ? 'ml-4' : direction === 'right' ? 'mr-4 ml-auto' : 'mx-auto'}`} />
      <div className="glass-panel px-6 py-4 text-sm leading-relaxed text-white/90">
        {text.slice(0, displayedChars)}
        {displayedChars < text.length && <span className="animate-pulse">▌</span>}
      </div>
      {/* Hidden aria-live region for screen readers */}
      <div ref={liveRef} aria-live="polite" aria-atomic="false" className="sr-only">
        {text}
      </div>
    </motion.div>
  ) : null;
}
```

**Key a11y decision:** The visible text uses the typewriter effect for visual appeal. A hidden `sr-only` div with `aria-live="polite"` contains the full text immediately — screen readers get complete content without waiting for animation. The `sr-only` text updates when `text` prop changes.

### Anti-Patterns to Avoid

- **Multiple R3F Canvases:** Creates separate WebGL contexts. Prevents camera transitions between scenes. Doubles GPU memory. **Always use single global Canvas.**
- **setState in useFrame:** R3F explicitly warns against this — causes React scheduler interference with the render loop. [CITED: /pmndrs/react-three-fiber pitfalls.mdx]. **Always mutate refs directly in useFrame.**
- **DOM elements inside Canvas:** React DOM components cannot be children of `<Canvas>`. The Canvas uses a separate React reconciler. Use drei's `<Html>` component for HTML-in-3D, or (preferred) keep UI in the DOM overlay layer.
- **Tone mapping on both renderer AND EffectComposer:** Double tone-mapping destroys colors. EffectComposer automatically sets renderer `toneMapping = NoToneMapping`. [CITED: /pmndrs/react-postprocessing patterns-and-edge-cases.md]
- **Hand-rolling post-processing passes:** The `postprocessing` library handles multipass merging, gamma correction, and MSAA. Custom pass chaining would require understanding WebGL render targets, stencil buffers, and blend modes — high risk of subtle rendering bugs.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Post-processing pipeline | Custom GLSL pass chain | `@react-three/postprocessing` + `postprocessing` | The library handles multipass merging, automatic gamma correction, MSAA, and single-triangle fullscreen optimization. Custom solution would be 200+ LOC with subtler rendering bugs. |
| Camera smooth transitions | Manual `useFrame` lerp with easing | `CameraControls` (drei) `setLookAt(..., true)` | Built-in damping, boundary handling, event system. Hand-rolled lerp needs frame-rate-independent delta math and edge cases. |
| Typewriter animation | Custom requestAnimationFrame loop | `setInterval` + React state | rAF is overkill for character-by-character text at 30 chars/sec. Simpler interval with cleanup is adequate. |
| Ring pulse animation | Manual `useFrame` scale oscillation | `@react-spring/three` `useSpring` | react-spring handles its own frame loop outside React's scheduler, avoiding the "don't setState in useFrame" pitfall. |
| Color management across post-processing | Manual gamma correction shader | `ToneMapping` effect (ACES_FILMIC) | The postprocessing library handles sRGB→linear→sRGB pipeline correctly. ACES is the industry standard filmic curve. |

## Runtime State Inventory

> **Not applicable.** Phase 3 is a greenfield capability addition (global canvas, post-processing, camera system, speech bubble). No renames, refactors, or migrations of existing runtime state.

## Common Pitfalls

### Pitfall 1: Double WebGL Context from Multiple Canvases
**What goes wrong:** LidarCloud keeps its own `<Canvas>` while App.tsx adds a global `<Canvas>`. Two WebGL contexts compete for GPU resources. Camera transitions can't cross contexts.
**Why it happens:** LidarCloud.tsx currently creates its own Canvas. Migration oversight.
**How to avoid:** Extract `CloudScene` component (the `<points>` + shader material) from LidarCloud, remove its internal Canvas wrapper, and render it as a child of the global Canvas. The LidarCloud component becomes a thin wrapper that just renders `<CloudScene jogPos={jogPos} />` without its own Canvas.
**Warning signs:** Flickering, one canvas blank, GPU memory warnings in devtools.

### Pitfall 2: React State in useFrame Causing Render Loop Stutter
**What goes wrong:** `useFrame` callback calls `setState`, triggering React re-render during the Three.js render loop. Causes jank.
**Why it happens:** Natural React developer instinct to use state for everything.
**How to avoid:** Use `useRef` for mutable values read/written in `useFrame`. Use react-spring for animation values (it has its own frame loop). Use Zustand `getState()` (non-reactive) inside useFrame if store reads are needed.
**Warning signs:** Stuttering animation, frame drops in devtools FPS meter.

### Pitfall 3: Post-processing Destroying Color Readability
**What goes wrong:** ACES tone mapping shifts colors in ways that reduce text/badge contrast against dark background, violating the readability constraint from CONTEXT.md.
**Why it happens:** ACES Filmic applies an S-curve that crushes shadows and compresses highlights. DOM overlay text is unaffected (it's HTML, not WebGL), but 3D labels or glowing elements inside the canvas lose their intended brightness.
**How to avoid:** DOM overlay (ShellLayout) text is NOT affected by post-processing — keep all text, badges, and UI labels in the DOM layer. For 3D elements that need readability (ring labels, zone markers), use `toneMapped={false}` on their materials to bypass ACES while still receiving Bloom/Vignette/Noise.
**Warning signs:** 3D text appears muddy/dim compared to Figma design. Ring labels unreadable.

### Pitfall 4: CameraControls "smooth" Competing with React Spring
**What goes wrong:** Both CameraControls' built-in smooth transition AND react-spring animating camera position simultaneously fight each other.
**Why it happens:** Two animation systems driving the same camera transform.
**How to avoid:** Use CameraControls' own smooth transition (`setLookAt(..., true)`) — do NOT also animate camera via react-spring. Use react-spring only for scene object animations (rings, tokens). One animation authority per property.
**Warning signs:** Camera jittering, oscillating, or snapping.

## Code Examples

### Global Scene Composition
```tsx
// GlobalScene.tsx [CITED: /pmndrs/react-three-fiber + /pmndrs/drei docs]
import { useStore } from '../../store/useStore';
import { CameraRig } from './CameraRig';
import { HubOrbitMap } from './HubOrbitMap';
import { CloudScene } from './CloudScene';
import { PostProcessing } from './PostProcessing';

export function GlobalScene() {
  const jogPos = useStore((s) => s.jogPos);
  const isHub = useStore((s) => s.cameraTarget === 'hub');

  return (
    <>
      <ambientLight intensity={0.15} />
      <CameraRig />
      {isHub && <HubOrbitMap />}
      <CloudScene jogPos={jogPos} />
      <PostProcessing />
    </>
  );
}
```

### Incident Token Animation
```tsx
// IncidentToken.tsx [ASSUMED — three.js Mesh + react-spring pattern]
import { useSpring, animated } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';

export function IncidentToken({ activeRing }: { activeRing: 1 | 2 | 3 }) {
  const meshRef = useRef<Mesh>(null);
  const angles = [0, Math.PI * 0.66, Math.PI * 1.33]; // ring positions
  const radii = [3.5, 7.0, 10.5];

  const { position, scale } = useSpring({
    position: [Math.cos(angles[activeRing-1]) * radii[activeRing-1], 0.3, Math.sin(angles[activeRing-1]) * radii[activeRing-1]],
    scale: [1.2, 1.2, 1.2],
    from: { scale: [1, 1, 1] },
    config: { tension: 100, friction: 10 },
  });

  return (
    <animated.mesh ref={meshRef} position={position as any} scale={scale}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial
        color="#FF6B2B"
        emissive="#FF6B2B"
        emissiveIntensity={1.5}
        toneMapped={false}
      />
      <pointLight intensity={2} distance={3} color="#FF6B2B" />
    </animated.mesh>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Per-component Canvas (LidarCloud pattern) | Single global Canvas with scene composition | Phase 3 | Enables camera transitions across scenes, shared post-processing, single WebGL context |
| Manual GLSL post-processing | `@react-three/postprocessing` v3 + `postprocessing` v6 | 2025+ | Automatic multipass merging, gamma handling, MSAA, single-triangle fullscreen optimization |
| `useFrame` manual lerp for camera | CameraControls `setLookAt(..., smooth)` | drei v8+ | Built-in easing, boundary handling, event callbacks |
| React state for animation | react-spring/three (own frame loop outside React) | R3F best practice | Avoids "setState in useFrame" anti-pattern |

**Deprecated/outdated:**
- **Manual post-processing passes** with `three/examples/jsm/postprocessing`: The `postprocessing` library (pmndrs) is the current standard. It uses single-triangle fullscreen rendering (not quad) and automatic effect merging.
- **`<EffectComposer>` from drei**: Drei deprecated its own EffectComposer. Use `@react-three/postprocessing` instead.
- **Multiple `<Canvas>` instances in one app**: R3F team recommends single canvas for most applications. Multiple canvases are for viewport-in-html-portal use cases only.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `@react-three/postprocessing@3.0.5` is compatible with R3F `^9.7.0` and Three.js `^0.185.1` | Standard Stack | Breaking — would need to pin specific versions or use shader fallback. Verified via npm peer dep check — it depends on `postprocessing` (peer: three) and `@react-three/fiber` (peer), no version pin conflicts detected. |
| A2 | `CameraControls` from drei v10.7.8 supports `setLookAt()` with smooth transitions | Architecture Patterns | Medium — could need manual lerp fallback. Verified via Context7 docs showing `setLookAt(x, y, z, tx, ty, tz, true)`. |
| A3 | Extracting `CloudScene` from `LidarCloud.tsx` does not break the shader's jogPos reactivity | Architecture Patterns | Low — CloudScene uses zustand `useStore` for jogPos, which is reactive. Removing Canvas wrapper preserves this. |
| A4 | `TorusGeometry` with `rotation: [PI/2, 0, 0]` produces visually acceptable flat rings | Architecture Patterns | Low — standard Three.js rotation. If visual quality insufficient, shader-based ring is fallback. |
| A5 | Post-processing `EffectComposer` works when placed as child of global Canvas alongside other scene content | Standard Stack | Low — this is the standard documented pattern. Verified via Context7 examples. |
| A6 | Typewriter animation via setInterval at 30 chars/sec with aria-live="polite" on hidden div provides adequate accessibility | Architecture Patterns | Low — standard pattern. ARIA live region with full text is well-supported. |

## Open Questions

1. **Post-processing on low-end devices (Chromebooks, tablets)**
   - What we know: EffectComposer supports `resolutionScale` and effect disabling
   - What's unclear: Minimum viable GPU tier for all four effects at full res
   - Recommendation: Implement `resolutionScale={0.5}` fallback detected via `navigator.hardwareConcurrency < 4` or `gl.capabilities.maxTextures < 16`. Make `PostProcessing` component accept an `enabled` prop.

2. **Incident token movement logic — when does it transition between rings?**
   - What we know: Hub shows token. Zone transitions are manual (user clicks "Enter Zone")
   - What's unclear: Does token animate during hub idle, or only on user interaction?
   - Recommendation: Idle animation — token orbits current active ring. On zone entry, token moves toward that zone's ring entry point as camera dollies.

3. **Wayo 3D model vs DOM video**
   - What we know: Wayo is currently DOM-based with video assets (`.mp4` files with transparency via `mix-blend-screen`)
   - What's unclear: Should Wayo move to 3D for the Hub center position?
   - Recommendation: Keep Wayo DOM-based. The Hub center already has a 3D pulsing token. Wayo appears in the DOM overlay at bottom-center during Hub. Moving Wayo to 3D would require a 3D car model + rigging — significant scope increase with no UX gain.

4. **Speech content system integration**
   - What we know: SpeechBubble needs text content per zone
   - What's unclear: Where does speech content live? (zones.json? separate speech-data.ts?)
   - Recommendation: Create `src/content/speech-data.ts` with a `Record<Zone, string[]>` mapping. Each zone gets an array of speech lines. The scene component selects which line to display based on narrative state. This separates content from component logic.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build/dev | ✓ | (runtime) | — |
| npm | Package install | ✓ | (runtime) | — |
| WebGL 2.0 | R3F Canvas | ✓ (browser) | — | LidarSVGFallback pattern exists for no-WebGL |
| GPU with ≥ 512MB VRAM | Post-processing | Assume ✓ | — | resolutionScale=0.5, disable Bloom |

**Missing dependencies with no fallback:** None — all dependencies are npm packages installable via `npm install`.

## Validation Architecture

> `workflow.nyquist_validation` is absent from `.planning/config.json` — treating as enabled.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest ^4.1.10 |
| Config file | vite.config.ts (vitest integrated) |
| Quick run command | `npx vitest run` |
| Full suite command | `npx vitest run --coverage` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| P3-01 | Global Canvas renders without crashing | smoke | `npx vitest run -t "canvas renders"` | ❌ Wave 0 |
| P3-02 | Camera dolly transition completes within 2s | integration | `npx vitest run -t "camera transition"` | ❌ Wave 0 |
| P3-03 | Orbital rings render with correct colors | unit | `npx vitest run -t "ring colors"` | ❌ Wave 0 |
| P3-04 | Post-processing effects apply (Bloom visible) | manual | Manual visual check | ❌ manual-only |
| P3-05 | SpeechBubble renders typewriter text | unit | `npx vitest run -t "typewriter"` | ❌ Wave 0 |
| P3-06 | aria-live region contains full speech text | unit | `npx vitest run -t "aria-live"` | ❌ Wave 0 |
| P3-07 | No double WebGL context (devtools check) | manual | Manual devtools check | ❌ manual-only |
| P3-08 | LidarCloud renders inside global Canvas | integration | `npx vitest run -t "lidar in global"` | ❌ Wave 0 |

### Wave 0 Gaps
- [ ] `src/components/three/__tests__/GlobalScene.test.tsx` — covers P3-01, P3-02, P3-08
- [ ] `src/components/three/__tests__/OrbitRing.test.tsx` — covers P3-03
- [ ] `src/components/dom/__tests__/SpeechBubble.test.tsx` — covers P3-05, P3-06
- [ ] `tests/setup.ts` — existing vitest setup may need `@testing-library/react` additions

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|------------------|
| V2 Authentication | No | N/A — no auth in this SCORM module |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A |
| V5 Input Validation | Yes | Zustand store actions validated via existing Zod schemas |
| V6 Cryptography | No | N/A |

### Known Threat Patterns for R3F + Post-processing Stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Shader injection via user-controlled uniforms | Tampering | No user-controlled shader uniforms in this app; all shader values are internal state |
| XSS via SpeechBubble text content | Information Disclosure | Speech content comes from static TS files (not user input); React auto-escapes JSX text |
| WebGL context loss crashing the app | Denial of Service | Existing `hasWebGL()` check in LidarCloud; extend to global Canvas with fallback UI |
| Malicious npm postinstall scripts | Elevation of Privilege | `@react-three/postprocessing` and `postprocessing` both have `null` postinstall scripts [VERIFIED: npm registry] |

## Sources

### Primary (HIGH confidence)
- [/pmndrs/react-postprocessing] Context7 — EffectComposer setup, ToneMapping, Bloom, Vignette, Noise, Performance optimization [VERIFIED: Context7]
- [/pmndrs/react-three-fiber] Context7 — Canvas architecture (persistent root), useFrame patterns, pitfalls (no setState), react-spring integration [VERIFIED: Context7]
- [/pmndrs/drei] Context7 — CameraControls, setLookAt, Bounds, View portals [VERIFIED: Context7]
- [npm registry] Package verification — @react-three/postprocessing@3.0.5, postprocessing@6.39.4, versions, peer deps, postinstall scripts [VERIFIED: npm registry]
- [bundlephobia.com] Bundle sizes — @react-three/postprocessing (99KB gzip), postprocessing (112KB gzip) [VERIFIED: bundlephobia API]

### Secondary (MEDIUM confidence)
- [pmndrs/react-postprocessing README] npm page — v3.0.5 release notes, demo links [CITED: npmjs.com/package/@react-three/postprocessing]
- [pmndrs/postprocessing README] npm page — v6.39.4 features, EffectComposer API [CITED: npmjs.com/package/postprocessing]

### Tertiary (LOW confidence)
- Typewriter animation pattern with aria-live — training knowledge, not verified against an authoritative source [ASSUMED]
- TorusGeometry API for ring rendering — training knowledge of Three.js standard API [ASSUMED]

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified via npm registry, bundlephobia, and Context7
- Architecture: HIGH — Canvas persistence behavior confirmed via R3F source + Context7; CameraControls API confirmed via drei docs
- Pitfalls: HIGH — "no setState in useFrame" confirmed via R3F official pitfalls doc; double tone-mapping confirmed via postprocessing docs
- Speech/A11y: MEDIUM — typewriter pattern is assumed (no authoritative source verified), aria-live="polite" is standard but not verified against WCAG conformance testing

**Research date:** 2026-08-10
**Valid until:** 2026-09-09 (30 days — post-processing ecosystem stable, R3F patterns stable)

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| P3-GLOBAL | Global R3F Canvas wrapping entire app | Single Canvas pattern (§Pattern 1); Canvas persists across route changes via `createRoot` guard |
| P3-ORBIT | Ecosystem orbital map with 3 concentric rings | TorusGeometry approach (§Pattern 3); react-spring/three for pulse animation; IncidentToken as animated sphere |
| P3-POST | ACES Filmic tone mapping, Bloom, Vignette, Noise | EffectComposer chain (§Pattern 4); ToneMappingMode.ACES_FILMIC; resolutionScale fallback for low-GPU |
| P3-CAMERA | Camera dolly transitions Hub ↔ Zones | CameraControls.setLookAt() with smooth=true (§Pattern 2); preset coordinate table; Zustand cameraTarget state |
| P3-SPEECH | Typewriter speech bubble with aria-live | DOM-based approach (§Pattern 5); setInterval typewriter; sr-only aria-live region for screen readers |
| P3-INTEGRATE | Absorb LidarCloud into global Canvas | Extract CloudScene from LidarCloud.tsx; remove internal Canvas; render inside GlobalScene |
