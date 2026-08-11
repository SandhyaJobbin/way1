# Requirements: v1 — US Driving Context & AV Rules Training

## v1 Requirements

### SHELL — Brand Shell & Navigation
- [ ] **SHELL-01**: App shell matches waymo.com design language — off-white #F5F7FA background, navy #1E2340 rounded geometric sans display type, Waymo blue #0080FF + teal #00E59B accents, circular motifs, dotted radial patterns, thin circular outline buttons.
- [ ] **SHELL-02**: Landing/start screen explicitly states this is training for the Autonomous Vehicle industry; includes start gate for browser autoplay policy.
- [ ] **SHELL-03**: HashRouter SPA navigation between Lesson and Zone with dot-timeline scrubber pattern and cinematic transitions (no hard page loads), SCORM-compatible.
- [ ] **SHELL-04**: Global route-path progress visualization (waymo.com green/blue dot-timeline metaphor) with checkpoint badge slots.
- [ ] **SHELL-05**: Audit-grade visual polish, desktop-first responsive — must not look like a generic e-learning template.
- [ ] **SHELL-06**: RFP-neutral branding: module UI, content, and code must not reference Waymo or use any Waymo trademarks/logos/footage. Neutral working brand with swap-ready branding layer (client branding applied only post-award). Design language may be inspired by reference sites without copying protected assets.

### LESSON — The Lesson: US Driving Context + AV Rules
- [ ] **LESN-01**: One video-driven lesson teaching US driving norms: right-turn-on-red, four-way-stop etiquette, school-bus mandates, jaywalking norms, aggressive lane-change dynamics, plus at least 3 additional US nuances (e.g., zipper merge, emergency vehicle yielding, unprotected left turns, highway on/off-ramp merging, railroad crossings).
- [ ] **LESN-02**: Each nuance pairs human driving behavior with how an AV platform perceives and handles it (AV rules perspective) — vendor-neutral phrasing.
- [ ] **LESN-03**: Media is video-led: placeholder video slots styled after official AV scenario videos; actual embeds/footage must be licensed or client-approved (no vendor-branded footage in the RFP demo). Blog-style media sections modeled on reference-site layouts.
- [ ] **LESN-04**: Two world contexts — Phoenix and San Francisco — each presenting relevant nuances, recreating the reference-site "how an AV navigates real world scenarios" video style with neutral branding.
- [ ] **LESN-05**: Interactive media inside the lesson (tap-to-reveal, step-through diagrams, dot-scrubber media timelines) — no passive video walls.
- [ ] **LESN-06**: Lesson completion tracked; Zone access gated or guided by lesson progress (final gate behavior decided in plan phase).

### ZONE — The Zone: Mixed Scenario Challenges
- [ ] **ZONE-01**: One Zone of mixed scenario challenges weaving multiple US nuances per scenario (not one module per nuance).
- [ ] **ZONE-02**: Dark audit-console UI: deep-navy canvas, BEV top-down view with magenta bounding boxes, camera strips, lidar-style point representations, sensor confidence indicators.
- [ ] **ZONE-03**: Three difficulty tiers inside the Zone — Foundation, Proficient, Advanced — all open to the learner.
- [ ] **ZONE-04**: Scenarios include video clips and AV-perspective overlays (bounding boxes, lidar-style points, sensor confidence indicators) for data realism.
- [ ] **ZONE-05**: Recognition-based challenges only — identify / predict / decide what happens and what the AV does; no annotation or labeling tasks.
- [ ] **ZONE-06**: Scenarios, tiers, and overlays are data-driven from the typed JSON content pipeline.

### ASSESS — Assessment, Scorecard, Gamification
- [ ] **ASSESS-01**: Every challenge scores and maps to technical scorecard categories: 3D spatial rotation, telemetry interpretation, occlusion reasoning, complex decision-making.
- [ ] **ASSESS-02**: Scorecard SNAPSHOT screen toward the end — per-category breakdown plus overall result.
- [ ] **ASSESS-03**: Pass threshold at ~80% accuracy with documented justification delivered alongside implementation.
- [ ] **ASSESS-04**: Gamification via route-path progress + checkpoint badges (Waymo route metaphor, not arcade) and retry-with-feedback loops.
- [ ] **ASSESS-05**: SCORM completion/status/score reporting hooks (cmi.core.score, lesson_status) for Reach 360.

### CONT — Content Pipeline
- [ ] **CONT-01**: Typed JSON content architecture with Zod schemas: lesson content, scenarios, worlds, difficulty tiers, scorecard mappings.
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
| Self-hosted video pipeline | YouTube embeds sufficient |
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

*Last updated: 2026-08-11 after client pivot ("New requirements.docx")*
