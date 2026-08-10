# Execution Roadmap

> **Module flow** (per brief): Act 1 (Wayo intro) → Lesson A (sensors) → Lesson B (model) → Lesson C (interdependence) → Zone 1 (MCPI Live) → Zone 2 (Triage Ops) → Zone 3 (Annotation) → Act 4 (corrected drive) → Act 5 (trace-back).
> Demo priority = Act 1 + Zone 2 + one seam (Phase 4). Lessons and Zones 1/3 are full-module scope.

## Phase 1: Engine & Proving (De-risking)

**Goal:** Prove the riskiest technical bets and set up the foundation.
**Plans:** 2/2 plans complete
**Wave 1**

- [x] 01-01-PLAN.md — Initialize the vertical empty shell including Vite, TS, Tailwind v4, HashRouter, and Framer Motion for cinematic route transitions. *(Complete — 2026-08-07, 3/3 tasks)*

**Wave 2**

- [x] 01-02-PLAN.md — Setup the SCORM 1.2 connection wrapper with local fallback, initialize the Zustand global app store, and define upfront Zod validation schemas for the ecosystem/zone content. *(Complete — 2026-08-07, 3/3 tasks, 27 tests passing)*

## Phase 2: Core Components (The Tactile Feel)

**Goal:** Build the signature interactions that define the module's quality level.

- Implement the Jog Dial (`use-gesture` + `react-spring`).
- Build the Canvas Image Sequence replay synchronised to the Jog Dial.
- Implement the procedural Lidar point-cloud shader in R3F.
- Rig the Wayo SVG character with basic Framer Motion states — idle, talking, parallax, emotion states.

## Phase 3: Hub & Polish (Cinematics)

**Goal:** Connect the pieces with high-end broadcast aesthetic.
**Plans:** 1/6 plans executed (0/6 complete)
**Requirements:** P3-GLOBAL, P3-ORBIT, P3-POST, P3-CAMERA, P3-SPEECH, P3-INTEGRATE
**Packages:** @react-three/postprocessing@^3.0.5, postprocessing@^6.39.4, @react-spring/three@^10.1.2

**Wave 1** (infrastructure — no deps)

- [x] 03-01-PLAN.md — Install Phase 3 packages, extend Zustand store with cameraTarget/transitionPhase, reconfigure Vitest for jsdom, scaffold 5 test files *(3 tasks)*

**Wave 2** (depends on 03-01)

- [ ] 03-02-PLAN.md — [TRACER] Global Canvas wrapper in App.tsx, GlobalScene composition, CameraRig with CameraControls dolly to hub preset *(2 tasks)*

**Wave 3** (depends on 03-02)

- [ ] 03-03-PLAN.md — Orbital map: OrbitRing (TorusGeometry + react-spring pulse), HubOrbitMap (3 rings), IncidentToken (orbiting sphere + pointLight) *(3 tasks)*

**Wave 4** (depends on 03-02)

- [ ] 03-04-PLAN.md — Post-processing stack: ACES Filmic tone mapping, Bloom, Vignette, Noise via EffectComposer + GPU fallback for low-tier devices *(2 tasks)*

**Wave 5** (depends on 03-02)

- [ ] 03-05-PLAN.md — Extract CloudScene from LidarCloud.tsx, remove internal Canvas, move hasWebGL gate to App.tsx, wire CloudScene into GlobalScene *(3 tasks)*

**Wave 6** (depends on 03-02, 03-03)

- [ ] 03-06-PLAN.md — Speech system (useTypewriter hook + speech-data.ts), enhance SpeechBubble with typewriter + aria-live, wire camera transitions to scene navigation, end-to-end integration checkpoint *(4 tasks)*

## Phase 4: Educational Lessons (3 Didactic Zones) — NEW

**Goal:** Build the three Wayo-led lessons that teach the ecosystem fundamentals before scenario zones.

- **Lesson A — "What the Car Has"**: Interactive 3D top-down car with sensor rings (lidar, cameras, radar, GPS/IMU). Tap-to-reveal sensor coverage. ~4 min.
- **Lesson B — "How the Model Works"**: Animated perception→prediction→planning pipeline sourced from the Waymo CEO video. Step-through with the construction-flagger incident tracked through each stage. ~6 min.
- **Lesson C — "Why All Three Rings Matter"**: "Remove a role" interactive toggle that animates consequences across the ecosystem chain. ~4 min.

All three reuse the Wayo rig, the shared `<Console>` theme wrapper, and the Zod-typed content architecture under `/content/lessons/`.

## Phase 5: Triage Ops Vertical Slice (The Demo)

**Goal:** Ship a playable, end-to-end slice of one zone for stakeholder approval.
**Plans:** 0/3 plans executed

**Wave 1** (data layer — no UI deps)

- [ ] 05-01-PLAN.md — Scenario content & Zustand triage slice (incident data, routing options, speech content, triageSlice)

**Wave 2** (depends on 05-01)

- [ ] 05-02-PLAN.md — Act 1 narrative intro scenes + Zone 2 triage console rebuild (JogDial ↔ scrubber, routing cards, lidar viewport, metadata panel)

**Wave 3** (depends on 05-02)

- [ ] 05-03-PLAN.md — The Seam scene (decision propagation to Zone 3 queue) + GitHub Pages deploy

## Phase 6: Full Audit-Interface Scenarios (Zones 1 & 3) — NEW

**Goal:** Complete the scenario-based operator console for the remaining two rings.

- **Zone 1 — MCPI Live Intervention**: Live-feed + alert-queue + radio-log + intervention-timer console. Decision: hold / remote assist / escalate. Propagates reason code to Zone 2 header.
- **Zone 3 — Annotation Workbench**: Frame-timeline scrubber, bounding-box draw overlay, label taxonomy panel. Decision: correct bounding boxes + labels. Propagates to Act 4 corrected drive.
- **Act 4 — Corrected Drive**: Wayo navigates the same construction zone cleanly, acknowledging labels received.
- **Act 5 — Trace-back**: Single screen showing the whole chain with the learner's own decisions on it.

## Phase 7: Harden & SCORM Packaging

**Goal:** Production-ready SCORM 1.2 package deployable to Reach 360.

- simple-scorm-packager build pipeline.
- Device-tier fallbacks (low-GPU point-cloud reduction).
- SCORM Cloud validation gate.
- Completion + score reporting to Reach 360.
