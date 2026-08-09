# Project State & Memory

## Context
- **Domain**: Automated Vehicle (AV) Operations (Waymo via Sutherland)
- **Goal**: Build a highly polished, interactive training module showing the ecosystem mapping between MCPI, Triage Ops, and Annotators.
- **Vibe/Reference**: "Gauntlet Loop" high-bar development, F1 broadcast tools, tactile "pro gear" feel.

## Current Position
- **Phase**: 01-engine-proving-de-risking
- **Plan**: 02 — COMPLETE
- **Next Plan**: 01-03

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

## Performance Metrics
| Phase | Plan | Duration | Tasks | Files |
|-------|------|----------|-------|-------|
| 01    | 01   | 9 min    | 3/3   | 15    |
| 01    | 02   | 11 min   | 3/3   | 8     |

## Last Session
- **Timestamp**: 2026-08-09
- **Stopped At**: Phase 1 complete. REQUIREMENTS, ROADMAP, DESIGN-SPEC updated with 3 educational lessons + 3 audit-interface scenario zones. Open Design screen inventory written (32 screens, 7 demo-priority). OmniRoute model routing captured in DESIGN-SPEC.md.
- **Resume File**: `/gsd-plan-phase 2` to plan Phase 2 (Core Components — Jog Dial, Lidar shader, Wayo rig)
