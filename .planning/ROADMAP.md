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

- Global R3F Canvas and ecosystem orbital map (Hub).
- Post-processing stack (ACES tone mapping, subtle bloom, vignette, noise).
- Camera Dolly transitions between Hub and Zones.
- Wayo speech-bubble system + directional facing.

## Phase 4: Educational Lessons (3 Didactic Zones) — NEW

**Goal:** Build the three Wayo-led lessons that teach the ecosystem fundamentals before scenario zones.

- **Lesson A — "What the Car Has"**: Interactive 3D top-down car with sensor rings (lidar, cameras, radar, GPS/IMU). Tap-to-reveal sensor coverage. ~4 min.
- **Lesson B — "How the Model Works"**: Animated perception→prediction→planning pipeline sourced from the Waymo CEO video. Step-through with the construction-flagger incident tracked through each stage. ~6 min.
- **Lesson C — "Why All Three Rings Matter"**: "Remove a role" interactive toggle that animates consequences across the ecosystem chain. ~4 min.

All three reuse the Wayo rig, the shared `<Console>` theme wrapper, and the Zod-typed content architecture under `/content/lessons/`.

## Phase 5: Triage Ops Vertical Slice (The Demo)

**Goal:** Ship a playable, end-to-end slice of one zone for stakeholder approval.

- Act 1: Wayo Intro sequence content (autonomy loop + low-confidence trigger).
- Zone 2: Triage Ops audit console UI and interaction (jog dial, lidar viewport, routing menu).
- The Seam: Decision state propagation — routing choice visibly generates Zone 3's input queue.
- Deploy to GitHub Pages.

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
