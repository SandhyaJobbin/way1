---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: unknown
stopped_at: Completed 03-01-PLAN.md (Infrastructure & Test Scaffold)
last_updated: "2026-08-10T11:31:10.702Z"
progress:
  total_phases: 7
  completed_phases: 2
  total_plans: 12
  completed_plans: 7
---

# Project State & Memory

## Context

- **Domain**: Automated Vehicle (AV) Operations (Waymo via Sutherland)
- **Goal**: Build a highly polished, interactive training module showing the ecosystem mapping between MCPI, Triage Ops, and Annotators.
- **Vibe/Reference**: "Gauntlet Loop" high-bar development, F1 broadcast tools, tactile "pro gear" feel.

## Current Position

- **Phase**: 03-hub-polish-cinematics
- **Plans**: 6 total (01-06)
- **Current Plan**: 02 (03-01 complete)
- **Next**: 03-02 — Tracer: Global Canvas + Post-Processing

## Decisions Made

- **HashRouter over BrowserRouter**: createHashRouter chosen for SCORM/LMS iframe compatibility — eliminates 404 on reload inside LMS.
- **base: './' in vite.config.ts**: All built assets use relative paths for SCORM zip packaging requirement.
- **AnimatePresence mode='wait'**: Sequential exit/enter for route transitions — prevents DOM overlap and visual flash.
- **StartGate at /start**: Dedicated splash route to capture user gesture before media autoplay is required.
- **Absolute overlay container**: ShellLayout's z-10 overlay separates DOM UI from future R3F canvas layer.
- **Direct SCORM 1.2 implementation**: pipwerks npm package blocked (git dep); implemented SCORM 1.2 window.API bridge directly in src/lib/scorm.ts.
- **Throttled SCORM commits (2s)**: setProgress throttles LMSCommit calls to protect LMS from animation frame rate during jog dial scrubbing.
- **Zod parse-at-boundary**: parseEcosystem() is sole validation entry point; all downstream components receive typed objects.
- **Static JSON import architecture**: zones.json bundled at build time via ES module import — no runtime fetch, safe for SCORM offline delivery.
- **[03-01] cameraTarget union type**: 'hub' | 'zone1' | 'zone2' | 'zone3' — maps SCENE_REGISTRY zone field to camera target.
- **[03-01] computeInitialCameraTarget()**: Uses SCENE_ORDER[0] scene ID mapped through SCENE_REGISTRY zone field. act1→hub, zone1→zone1, zone2→zone2.
- **[03-01] setCameraTarget atomic update**: Sets both cameraTarget AND transitionPhase='transitioning' in single Zustand set() call.
- **[03-01] Vitest jsdom environment**: Changed from 'node' to 'jsdom' for React component rendering tests in Plans 03-02..03-06.
- [Phase ?]: cameraTarget union type: 'hub' | 'zone1' | 'zone2' | 'zone3' — maps SCENE_REGISTRY zone→target. setCameraTarget sets both cameraTarget AND transitionPhase='transitioning' atomically.

## Open Questions / Blockers

- **MCPI Definition**: Need to define what MCPI stands for and its exact role to finalize ring placement (Live vs Response) and seam content. This is blocking content for Zone 1.
- **Triage Ops Details**: Confirm exact decision routing in Zone 2 to ensure the handoff to Annotators makes sense.

## Completed Steps

- Project initialized.
- Analyzed Waymo lifecycle brief and Gauntlet loop reference documents.
- Scoped requirements for the MVP demo slice.
- Structured the execution roadmap.
- **[01-01] Scaffolded Vite + TS + Tailwind v4 React app** — Commits: 5dc01be, c62713b, d5c5149
  - HashRouter shell with AnimatePresence route transitions
  - SCORM-safe relative asset build (base: './')
  - StartGate, Hub, ZonePlaceholder route placeholders
- **[01-02] SCORM wrapper, Zustand store, Zod schemas + Vitest** — Commits: 155cdcc, ca60de8, c18b547
  - Direct SCORM 1.2 wrapper (graceful local fallback)
  - Zustand global store: scormConnected, progress (throttled), currentZone
  - Zod schemas: Ecosystem > Ring > Zone > Incident hierarchy
  - zones.json dummy data: 2 rings, 3 zones, cross-zone construction-flagger incident
  - 27 Vitest unit tests — all passing
- **[03-01] Infrastructure & Test Scaffold** — Commits: 1424651, 8784e06, fd2f6fe
  - package.json: 3 R3F deps (@react-three/postprocessing, postprocessing, @react-spring/three) + 3 devDeps (@testing-library/react, @testing-library/jest-dom, jsdom)
  - Zustand store: cameraTarget, transitionPhase, setCameraTarget, setTransitionPhase
  - Vitest: jsdom environment, vitest.setup.ts with @testing-library/jest-dom
  - 5 test scaffold files with it.skip for Plans 03-02..03-06
  - ⚠️ npm install not runnable (no shell tool) — must run manually

## Active Phase 5 Plans (The Demo)

| Plan | Status | Size | Description |
|------|--------|------|-------------|
| 05-01 | READY | S | Scenario content, routing options, triageSlice, speech-data |
| 05-02 | READY | M | Act 1 narrative scenes, triage console rebuild, JogDial ↔ scrubber |
| 05-03 | READY | S | Seam scene (decision propagation), GitHub Pages deploy |

## Performance Metrics

| Phase | Plan | Duration | Tasks | Files |
|-------|------|----------|-------|-------|
| 01    | 01   | 9 min    | 3/3   | 15    |
| 01    | 02   | 11 min   | 3/3   | 8     |
| 03    | 01   | 18 min   | 3/3   | 10    |
**Per-Plan Metrics:**

| Plan | Duration | Tasks | Files |
|------|----------|-------|-------|
| Phase 03 P01 | 18min | 3 tasks | 10 files |

## Last Session

- **Timestamp**: 2026-08-10
- **Stopped At**: Completed 03-01-PLAN.md (Infrastructure & Test Scaffold)
- **Resume File**: `/gsd-execute-phase 03-hub-polish-cinematics` to continue with Plan 03-02

## Session

**Last session:** 2026-08-10T11:31:10.667Z
**Stopped at:** Completed 03-01-PLAN.md (Infrastructure & Test Scaffold)
**Resume file:** None
