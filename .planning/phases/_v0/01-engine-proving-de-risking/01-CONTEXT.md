# Phase 1: Engine & Proving (De-risking) - Context

## Domain Boundary
This phase delivers the foundational interactive shell and proves the riskiest technical elements of the Waymo Lifecycle Interactive Training Module. It establishes the infrastructure for routing, state management, 3D visually syncing to 2D inputs, and SCORM tracking. We are building a "vertical empty shell" containing necessary integrations before fleshing out content.

## Canonical Refs
- ROADMAP.md

## Implementation Decisions

### 1. MVP Scope & Boundaries
- **Scope:** Vertical empty shell (Recommended) — A shell with the Hub, empty placeholders for zones, and basic routing to prove the architecture.
- **Routing:** React Router v7 (Recommended) — Using HashRouter for SCORM compatibility.
- **Zod Schema:** Define upfront (Recommended) — Use dummy data to drive dynamic rendering and prove the data architecture immediately.

### 2. Infrastructure & Delivery
- **SCORM wrapper:** pipwerks (Recommended) — Industry standard SCORM 1.2 client-side communication.
- **LMS Mocking:** Console fallbacks (Recommended) — Console.log dummy calls locally, check real SCORM objects only when running inside the LMS/Reach 360 preview.
- **Env vars:** Relative base (Recommended) — Only `base: './'` configuration in Vite, since SCORM packages run out of a local relative path.
- **Start Gate:** Distinct route (Recommended) — A specific `/start` route the user clicks through before Hub (`/`) to ensure media can auto-play.

### 3. Jog Dial & Video Scrubbing (The Interactions)
- **Visual Driver:** video and sensor data scrubbing
- **Syncing:** Zustand Global State (Recommended) — A global `progress` state (0-1) that both the video element and the R3F canvas subscribe to.
- **Interactions:** use-gesture + react-spring (Recommended) — Handling drag events, friction, and snapping.
- **Performance:** Spring Values / Ref (Recommended) — Store progress as a `MotionValue` or Spring value directly, bypassing React state to avoid full tree re-renders.
- **Video Perf:** Pre-process video with frequent keyframes (Recommended) — Required to prevent lag when scrubbing `<video>` backwards.
- **Scrub Scope:** Absolute / Normalized 0-1 (Recommended) — Good for isolated events mapped to progress.
- **Data coupling:** Decoupled mapping hook (Recommended) — Custom Hook `useSyncScrubber` binds the 0-1 value over specific domain spaces (e.g., video time).
- **Handoffs (Seam crossing):** Hard boundaries (Recommended) — Lock scrubber progress to exact segment boundaries unless a specific condition is met.
- **Momentum:** Spring clamp with bounce (Recommended) — Produces a subtle bounce back when hitting absolute start (0) or end (1).

### 4. Interactive UI & Accessibility
- **Transitions:** Framer Motion (Recommended) — Using `<AnimatePresence>` for component mounting/unmounting.
- **Jog UI / Overlays:** HTML/SVG Overlays (Recommended) — Crisp, accessible markers over the slider.
- **Dial UI (Visually):** Continuous physical rotation (Recommended) — Feels infinite physically even if data stops.
- **Mobile Interaction:** Horizontal only (Recommended) — Avoid conflicts with standard scrolling.
- **Keyboard A11y:** Keyboard bindings (Left/Right) (Recommended) — Mimicking standard media controls.
- **General A11y:** Standard A11y (Recommended) — Keyboard navigation, ARIA labels, color contrast check for the demo slice.
- **Text A11y:** aria-live="polite" (Recommended) — For screen readers to gracefully read type-on text.

### 5. Wayo Character Rigging
- **Format:** SVGR Component Import (Recommended) — Allows targeting `<path>`s directly.
- **DOM Placement:** DOM Overlay (Recommended) — Rendered on top of the R3F canvas for accessibility and easy Framer Motion integration.
- **Screen Pos:** Absolute fixed (Recommended) — Can float consistently over all transitions.
- **Responsive:** CSS viewport scaling (Recommended) — Using CSS clamp() or dynamic scale transform.
- **Shadows:** CSS drop-shadow (Recommended) — Dynamic contouring to his shape.
- **Animations:** Framer Motion SVG parts (Recommended) — Direct manipulation of SVG paths using variants.
- **Lip Sync:** Random pulsing while typing (Recommended) — Bound to the duration of text typing out.
- **Parallax:** Global mouse tracking (Recommended) — Simple transforms tied to mouse position.
- **State logic:** Dedicated Controller Hook (Recommended) — Bridges logical "emotion" state to physical SVG transforms.
- **Context Sync:** Zustand Subscription (Recommended) — Reads current emotion/message state globally.
- **Voice/Text:** Type-on Speech Bubble (Recommended) — Using Framer Motion.
- **Speech Bubbles:** Dynamic directional (Recommended) — Pointing left/right depending on Wayo's position to prevent cutoff.
- **State transitions:** Wait before enter (Recommended) — `AnimatePresence mode="wait"` to prevent overlap.

### 6. Lidar Shader & 3D Environment
- **Lidar Approach:** Procedural WebGL Shader (Recommended) — Custom GLSL `shaderMaterial` generating points procedurally based on time/progress.
- **Animation Sync:** Pass progress to Uniforms (Recommended) — Scene stays perfectly locked to the Jog Dial's Zustand state.
- **Post-Processing:** R3F postprocessing (Recommended) — EffectComposer applied globally for ACES tone mapping, grain, and bloom.
- **Camera Controls:** Locked OrbitControls with parallax (Recommended) — Allowed slight parallax rotation tied to mouse movement, but no open panning/zooming.

### 7. Tech Stack Conventions
- **Data Layer:** Static Imports (Recommended) — `import zones from './data/zones.json'`.
- **Styling:** Tailwind v4 (Recommended) — Used exclusively for styling the non-3D console UI.
- **Testing:** Vitest (Logic Only) (Recommended) — Unit testing pure functions and schemas; manual QA for R3F/visual heavy elements.
D-11: Throttle heavy side effects in Zustand, particularly around scrubbing (Recommended)
