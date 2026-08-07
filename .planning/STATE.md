# Project State & Memory

## Context
- **Domain**: Automated Vehicle (AV) Operations (Waymo via Sutherland)
- **Goal**: Build a highly polished, interactive training module showing the ecosystem mapping between MCPI, Triage Ops, and Annotators.
- **Vibe/Reference**: "Gauntlet Loop" high-bar development, F1 broadcast tools, tactile "pro gear" feel.

## Current Position
- **Phase**: 01-engine-proving-de-risking
- **Plan**: 01 — COMPLETE
- **Next Plan**: 01-02

## Decisions Made
- **HashRouter over BrowserRouter**: createHashRouter chosen for SCORM/LMS iframe compatibility — eliminates 404 on reload inside LMS.
- **base: './' in vite.config.ts**: All built assets use relative paths for SCORM zip packaging requirement.
- **AnimatePresence mode='wait'**: Sequential exit/enter for route transitions — prevents DOM overlap and visual flash.
- **StartGate at /start**: Dedicated splash route to capture user gesture before media autoplay is required.
- **Absolute overlay container**: ShellLayout's z-10 overlay separates DOM UI from future R3F canvas layer.

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

## Performance Metrics
| Phase | Plan | Duration | Tasks | Files |
|-------|------|----------|-------|-------|
| 01    | 01   | 9 min    | 3/3   | 15    |

## Last Session
- **Timestamp**: 2026-08-07T11:38:05Z
- **Stopped At**: Completed 01-01-PLAN.md — all tasks done, build passes
- **Resume File**: .planning/phases/01-engine-proving-de-risking/01-02-PLAN.md
