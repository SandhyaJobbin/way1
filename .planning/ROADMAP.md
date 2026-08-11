# Roadmap: v1 — US Driving Context & AV Rules Training (RFP Demo)

## Overview

Brownfield pivot. v0 (diegetic 3-role ecosystem module) is retired; the existing React 19 + Vite + TS + Tailwind v4 + Framer Motion + Zustand + R3F shell and delivery plumbing (HashRouter, `base: './'`, SCORM 1.2 wrapper) carry over. v1 delivers exactly **1 Lesson + 1 Zone** teaching offshore AV operators US driving context and AV rules, in the design language of a top-tier AV company's public site, shipped as standalone HTML with an optional SCORM 1.2 package. Every phase keeps the demo client-shippable and **RFP-neutral**: no target-client names, trademarks, logos, or footage anywhere in UI, content, or code — neutral working brand with a swap-ready branding config; video surfaces are placeholder slots only.

## Context

- **Milestone**: v1 pivot — "1 Lesson + 1 Zone" RFP demo.
- **Phase numbering**: RESTARTED at 1 for v1. Prior directories in `.planning/phases/` (`01-engine-proving-de-risking`, `02-core-components-the-tactile-feel`, `03-hub-polish-cinematics`, `05`) belong to the **retired v0 milestone** and are superseded. ⚠️ Those legacy directories collide with new `01-*`…`04-*` plan naming — archive or rename them (e.g., `_v0/`) before executing v1 Phase 1.
- **Carry-over from v0** (reuse, don't rebuild): HashRouter + AnimatePresence route transitions, StartGate splash, SCORM 1.2 bridge (`src/lib/scorm.ts`), Zod parse-at-boundary pattern, static JSON import architecture, Vitest setup.
- **Hard constraint — RFP neutrality**: no phase, deliverable, plan, or copy may reference the target client by name. Design tokens may be *inspired by* reference sites; no protected assets. Video footage = placeholder slots wired to config.
- **Procurement**: 🛒 items in `.planning/ASSETS.md` (fonts, generic AV renders, Phoenix/SF stock imagery, footage decision) gate final visual fidelity; placeholder-grade assets keep every phase shippable.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation — Design System, Shell & Content Pipeline** - waymo-style token system, landing/start gate, HashRouter nav, route-path progress, neutral swap-ready branding, new Zod content model, v0 retirement + vendor scrub
- [ ] **Phase 2: The Lesson — US Driving Essentials + State Handbook** - US driving essentials first (8+ nuances paired with AV handling), DMV-handbook-style state picker (all 50 states + DC), deep AZ + CA state pages, interactive media, completion tracking
- [ ] **Phase 3: The Zone — Hazard Perception Simulator & Assessment** - POV dashcam-style clips, click developing hazards (Vehicles/Pedestrians/Signs/Road marks), 3 AV-overlay tiers, tutorial mode, hazard score + reaction ms + false clicks, scorecard snapshot, ~80% pass gate, gamification, SCORM score hooks
- [ ] **Phase 4: Delivery & Audit-Grade Polish** - Standalone HTML + SCORM 1.2 packaging for Reach 360, final polish pass, final vendor-neutrality verification

## Phase Details

### Phase 1: Foundation — Design System, Shell & Content Pipeline
**Goal**: The neutral brand shell, navigation, and typed content pipeline exist — the empty stage on which Lesson and Zone are built, with all v0 content retired and every vendor reference scrubbed.
**Depends on**: Nothing (first v1 phase)
**Requirements**: SHELL-01, SHELL-02, SHELL-03, SHELL-04, SHELL-06, CONT-01, CONT-02, CONT-03, CONT-04, ASST-01
**Success Criteria** (what must be TRUE):
  1. User lands on a start screen that explicitly states this is training for the Autonomous Vehicle industry; the start gate captures a user gesture so media autoplay is safe.
  2. User navigates between Lesson and Zone (placeholder surfaces) via HashRouter with dot-timeline scrubber pattern and cinematic transitions — no hard page loads.
  3. A global route-path progress visualization (dot-timeline metaphor) with checkpoint badge slots renders and reflects app state.
  4. All UI renders from the design-token system (off-white #F5F7FA shell, navy #1E2340 display type, #0080FF blue + #00E59B teal accents, circular motifs, thin outline buttons); a branding config layer swaps wordmark/colors/accents without code edits.
  5. New Zod schemas validate the v1 content model (lessons, worlds, scenarios, tiers, scorecard mappings); old v0 content (ecosystem/zones/incidents/lessons JSONs) is retired; a repo-wide scrub finds zero vendor/client references in code identifiers, content, and copy.
**Plans**: TBD
**UI hint**: yes

### Phase 2: The Lesson — US Driving Essentials + State Handbook
**Goal**: The learner completes a two-part lesson — US driving essentials first, then a DMV-handbook-style state picker where Arizona and California open deep state driving-policy pages that lead into the simulator.
**Depends on**: Phase 1
**Requirements**: LESN-01, LESN-02, LESN-03, LESN-04, LESN-05, LESN-06
**Success Criteria** (what must be TRUE):
  1. User progresses through US driving essentials covering the five named nuances (right-turn-on-red, four-way stops, school buses, jaywalking, aggressive lane changes) plus at least 3 additional nuances, each pairing human driving behavior with the AV platform's perception/handling rules in vendor-neutral phrasing.
  2. User sees a DMV-handbook-style state picker grid showing ALL 50 states + DC with symbol/emblem, two-letter code, and state name (searchable); clicking a state opens its driving policy page and the flow leads onward to the simulator.
  3. Arizona and California state pages ship with deep content (state rules, enforcement quirks, AV-relevant notes — CA autonomous-vehicle regulations vs AZ light-touch regime) linking forward to matching simulator scenarios; every other state renders as a data-driven "coming soon" stub.
  4. User interacts with the material — video-driven nuance cards (placeholder slots wired to config), tap-to-reveals, step-through diagrams, dot-scrubber media timelines; no passive video walls.
  5. Lesson completion is tracked and Zone access is gated or guided by lesson progress (gate behavior fixed in plan phase).
**Plans**: TBD
**UI hint**: yes

### Phase 3: The Zone — Hazard Perception Simulator & Assessment
**Goal**: The learner plays scored hazard-perception challenges — dashcam-style POV clips where they click developing hazards across four categories under three AV-overlay tiers — earns a scorecard snapshot against the four technical categories, and meets a justified pass gate, with progress gamified and scores reported to SCORM.
**Depends on**: Phase 2
**Requirements**: ZONE-01, ZONE-02, ZONE-03, ZONE-04, ZONE-05, ZONE-06, ASSESS-01, ASSESS-02, ASSESS-03, ASSESS-04, ASSESS-05
**Success Criteria** (what must be TRUE):
  1. User watches dashcam-style POV clips set in Phoenix and San Francisco worlds and clicks DEVELOPING hazards (situations requiring speed/direction change) categorized as Vehicles, Pedestrians, Signs, or Road marks — mixed scenarios weaving multiple US nuances per clip.
  2. User chooses among Foundation (clean POV), Proficient (POV + perception overlay: bounding boxes, confidence indicators), and Advanced (BEV + telemetry view with confidence drops) tiers — all open; tutorial mode highlights opening hazards with hints before unassisted play.
  3. Each run produces results: hazards spotted X/N, reaction speed (median ms), false clicks, composite hazard score % (detection accuracy + reaction time + false clicks); review-mistakes reveal cards explain what a human should see + how an AV platform handles it, with retry-with-feedback.
  4. Challenges are recognition-only and fully data-driven from the typed JSON pipeline (clips + hazard timelines `{t, category, hitRegion, window, points, explanation, avHandling}`) — adding a scenario requires no code change; footage = RFP-neutral placeholder slots (stock or simulated renders).
  5. Hazard-sim performance scores into the four scorecard categories (3D spatial rotation, telemetry interpretation, occlusion reasoning, complex decision-making); a scorecard SNAPSHOT screen shows per-category breakdown + overall result; the ~80% composite pass gate ships with its written justification; route-path checkpoint badges work; SCORM completion/status/score hooks report.
**Plans**: TBD
**UI hint**: yes

### Phase 4: Delivery & Audit-Grade Polish
**Goal**: The demo ships — standalone HTML and SCORM 1.2 package both work, the experience reads as an audit-grade product rather than an e-learning template, and final neutrality verification passes.
**Depends on**: Phase 3
**Requirements**: SHELL-05, DLVR-01, DLVR-02, DLVR-03
**Success Criteria** (what must be TRUE):
  1. The standalone build runs from static hosting (and file://) with relative asset paths (`base: './'`), no console errors, all routes reachable.
  2. The SCORM 1.2 zip (simple-scorm-packager + pipwerks) launches in Reach 360 via new-window flow and reports completion/status/score.
  3. One-command build scripts exist for both standalone and SCORM targets.
  4. A full-session walkthrough reads as audit-grade: desktop-first responsive, consistent tokens, motion, and typography — not a generic e-learning template.
  5. Final vendor-neutrality verification passes: zero client/vendor references in built output, content, and copy; branding config swap demonstrated.
**Plans**: TBD
**UI hint**: yes

## Risks & Ambiguities

- **LESN-06 gate behavior** (hard gate vs guided): explicitly deferred to Phase 2 plan phase — decide there, not here.
- **ASSESS-03 justification**: ~80% threshold needs a written rationale doc delivered alongside implementation — plan as an artifact in Phase 3.
- **Video footage (LESN-05 / ZONE-06)**: licensing unresolved; placeholder slots are the RFP-safe default (ASSETS.md action 4). Simulator needs dashcam-style POV clips (stock or simulated renders). No vendor-branded footage ever in the demo.
- **Procurement (ASST-01)**: fonts, generic AV renders, Phoenix/SF stock imagery are 🛒 to-procure — placeholder-grade assets keep phases shippable; procurement delays must not block execution.
- **CONT-03 status**: old content JSONs are already absent from `src/` (only `scenario-data.ts` remains) — phase work is verification + residual-reference scrub, not bulk deletion.
- **v0 directory collision**: legacy `.planning/phases/01-*,02-*,03-*,05` dirs must be archived before v1 Phase 1 executes.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 (decimal insertions slot between integers)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation — Design System, Shell & Content Pipeline | 0/TBD | Not started | - |
| 2. The Lesson — US Driving Essentials + State Handbook | 0/TBD | Not started | - |
| 3. The Zone — Hazard Perception Simulator & Assessment | 0/TBD | Not started | - |
| 4. Delivery & Audit-Grade Polish | 0/TBD | Not started | - |
