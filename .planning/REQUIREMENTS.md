# Requirements: v1 — US Driving Context & AV Rules Training

## v1 Requirements

### SHELL — Brand Shell & Navigation
- [ ] **SHELL-01**: App shell matches waymo.com design language — off-white #F5F7FA background, navy #1E2340 rounded geometric sans display type, Waymo blue #0080FF + teal #00E59B accents, circular motifs, dotted radial patterns, thin circular outline buttons.
- [ ] **SHELL-02**: Landing/start screen explicitly states this is training for the Autonomous Vehicle industry; includes start gate for browser autoplay policy.
- [ ] **SHELL-03**: HashRouter SPA navigation between Lesson and Zone with dot-timeline scrubber pattern and cinematic transitions (no hard page loads), SCORM-compatible.
- [ ] **SHELL-04**: Global route-path progress visualization (waymo.com green/blue dot-timeline metaphor) with checkpoint badge slots.
- [ ] **SHELL-05**: Audit-grade visual polish, desktop-first responsive — must not look like a generic e-learning template.
- [ ] **SHELL-06**: RFP-neutral branding: module UI, content, and code must not reference Waymo or use any Waymo trademarks/logos/footage. Neutral working brand with swap-ready branding layer (client branding applied only post-award). Design language may be inspired by reference sites without copying protected assets.

### LESSON — The Lesson: US Driving Essentials + State Handbook
- [ ] **LESN-01**: Lesson Part 1 — US driving essentials first ("major things to know" nationwide): right-turn-on-red, four-way-stop etiquette, school-bus mandates, jaywalking norms, aggressive lane-change dynamics, plus at least 3 additional US nuances (e.g., zipper merge, emergency vehicle yielding, unprotected left turns, highway on/off-ramp merging, railroad crossings).
- [ ] **LESN-02**: Each nuance pairs human driving behavior with how an AV platform perceives and handles it (AV rules perspective) — vendor-neutral phrasing.
- [ ] **LESN-03**: Lesson Part 2 — DMV-handbook-style state picker grid: ALL 50 states + DC displayed with a symbol/emblem, two-letter code, and state name (searchable); clicking a state opens its driving policy page; the flow then leads to the simulator (Zone).
- [ ] **LESN-04**: State pages v1: Arizona and California have deep content only (state rules, enforcement quirks, AV-relevant notes — CA autonomous-vehicle regulations vs AZ light-touch regime) and link forward to matching simulator scenarios; every other state renders as a data-driven "coming soon" stub, addable as content-only changes later.
- [ ] **LESN-05**: Interactive, media-rich material: video-driven nuance cards (placeholder video slots wired to config; footage only if licensed/client-approved — no vendor-branded footage in the RFP demo), tap-to-reveals, step-through diagrams, dot-scrubber media timelines — no passive video walls.
- [ ] **LESN-06**: Lesson completion tracked; Zone access gated or guided by lesson progress (final gate behavior decided in plan phase).

### ZONE — The Zone: Hazard Perception Simulator
- [ ] **ZONE-01**: One Zone = hazard perception simulator: a single dashcam-style POV video plays and the learner clicks DEVELOPING hazards (situations requiring speed/direction change) across four clickable categories — Vehicles, Pedestrians, Signs, Road marks — with mixed scenarios weaving multiple US nuances in the video.
- [ ] **ZONE-02**: Three AV-overlay difficulty tiers inside the Zone — Foundation (clean POV, spot like a driver), Proficient (POV + perception overlay: bounding boxes, confidence indicators), Advanced (BEV + telemetry view with confidence drops) — all open to the learner; tiers map to the client's technical scorecard categories.
- [ ] **ZONE-03**: Results screen per run: hazards spotted X/N, reaction speed (median ms), false clicks, and a composite hazard score % (detection accuracy + reaction time + false clicks); review-mistakes reveal cards (what a human should see + how an AV platform handles it) and retry-with-feedback.
- [ ] **ZONE-04**: Tutorial mode on first run: opening hazards highlighted with hints, then unassisted play; a single scenario video with simulated AV-perspective overlays (bounding boxes, lidar-style points, sensor confidence indicators) for data realism.
- [ ] **ZONE-05**: Recognition-based challenges only — spot / identify / decide; no annotation or labeling tasks.
- [ ] **ZONE-06**: Single video clip, hazard timelines (`{t, category, hitRegion, window, points, explanation, avHandling}`), tiers, and overlays are data-driven from the typed JSON content pipeline; dashcam-style POV footage uses the single provided video.

### ASSESS — Assessment, Scorecard, Gamification
- [ ] **ASSESS-01**: Hazard-sim performance scores and maps to technical scorecard categories: 3D spatial rotation, telemetry interpretation, occlusion reasoning, complex decision-making (tier + hazard attributes drive the mapping).
- [ ] **ASSESS-02**: Scorecard SNAPSHOT screen toward the end — per-category breakdown plus overall hazard score.
- [ ] **ASSESS-03**: Pass threshold at ~80% composite score with documented justification delivered alongside implementation.
- [ ] **ASSESS-04**: Gamification via route-path progress + checkpoint badges (route metaphor, not arcade) and retry-with-feedback loops.
- [ ] **ASSESS-05**: SCORM completion/status/score reporting hooks (cmi.core.score, lesson_status) for Reach 360.

### CONT — Content Pipeline
- [ ] **CONT-01**: Typed JSON content architecture with Zod schemas: lesson content, US nuances, state handbook entries (51 states, deep AZ/CA + stubs), simulator clips, hazard timelines, difficulty tiers, scorecard mappings.
- [ ] **CONT-02**: New scenarios/worlds/nuances shippable as content-only changes (no code changes).
- [ ] **CONT-03**: Retire or migrate the old content model (ecosystem.json, zones.json, incidents/TRI-2291.json, lessons/lesson-a|b|c.json).
- [ ] **CONT-04**: Scrub all vendor references (Waymo names, logos, branded footage) from code identifiers, content files, and UI copy; keep a branding config so client identity can be applied post-award.

### DLVR — Delivery
- [ ] **DLVR-01**: Standalone HTML/interactive build, static hosting, Vite `base: './'`.
- [ ] **DLVR-02**: SCORM 1.2 package option via simple-scorm-packager + pipwerks for Reach 360 (new-window launch).
- [ ] **DLVR-03**: Build scripts for both standalone and SCORM targets.

### ASST — Asset Procurement
- [ ] **ASST-01**: Asset procurement manifest maintained at `.planning/ASSETS.md` — lists every icon, image, video, 3D asset, and audio needed, with source, license note, and status (in-repo / to-procure / code-generated / YouTube embed).

## v2 (Deferred)
- Recurring edge-case resurfacing section fed by root-cause analysis.
- Metro worlds beyond Phoenix + San Francisco.
- Additional lessons/zones expansion.

## Out of Scope

| Item | Reason |
|---|---|
| Annotation/labeling workflow training | Client: recognition only |
| Wayo SVG narrator, jog dial, 3-role diegetic console | Retired by pivot |
| Self-hosted video pipeline | Placeholder slots / embeds sufficient |
| Deep handbook content for states beyond AZ + CA | v1 scope: stubs, content-only additions later |
| Multi-lesson / multi-zone structure | Client: 1 Lesson + 1 Zone |

## Traceability

| Requirement | Phase |
|---|---|
| SHELL-01 | Phase 1 |
| SHELL-02 | Phase 1 |
| SHELL-03 | Phase 1 |
| SHELL-04 | Phase 1 |
| SHELL-05 | Phase 4 |
| SHELL-06 | Phase 1 |
| LESN-01 | Phase 2 |
| LESN-02 | Phase 2 |
| LESN-03 | Phase 2 |
| LESN-04 | Phase 2 |
| LESN-05 | Phase 2 |
| LESN-06 | Phase 2 |
| ZONE-01 | Phase 3 |
| ZONE-02 | Phase 3 |
| ZONE-03 | Phase 3 |
| ZONE-04 | Phase 3 |
| ZONE-05 | Phase 3 |
| ZONE-06 | Phase 3 |
| ASSESS-01 | Phase 3 |
| ASSESS-02 | Phase 3 |
| ASSESS-03 | Phase 3 |
| ASSESS-04 | Phase 3 |
| ASSESS-05 | Phase 3 |
| CONT-01 | Phase 1 |
| CONT-02 | Phase 1 |
| CONT-03 | Phase 1 |
| CONT-04 | Phase 1 |
| DLVR-01 | Phase 4 |
| DLVR-02 | Phase 4 |
| DLVR-03 | Phase 4 |
| ASST-01 | Phase 1 |

Coverage check: Phase 1 = 10 · Phase 2 = 6 · Phase 3 = 11 · Phase 4 = 4 — **31/31 mapped, each exactly once, zero gaps**.

## Coverage
- SHELL: 6 · LESSON: 6 · ZONE: 6 · ASSESS: 5 · CONT: 4 · DLVR: 3 · ASST: 1 — total 31 requirements.

*Last updated: 2026-08-11 after manager pivot — Lesson = DMV-handbook style (US essentials + state picker, AZ/CA deep), Zone = hazard perception simulator with AV-overlay tiers*
