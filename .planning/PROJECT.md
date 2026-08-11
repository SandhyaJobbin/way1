# Waymo US Driving Context & AV Rules Training Module

## What This Is
A gamified interactive training module (RFP demo, neutral branding) that teaches offshore AV operators native US driving context and AV rules — how real US road behavior (right-turn-on-red, four-way stops, school buses, jaywalking, aggressive lane changes) is read and handled by an autonomous vehicle platform. Structured as exactly **1 Lesson + 1 Zone**, delivered as a standalone HTML experience with an optional SCORM 1.2 package for LMS (Reach 360). Target client branding is applied only post-award via a swap-ready branding config.

## Core Value
Close the US driving-context gap for offshore operators through recognition-based training (not annotation/labeling) with the design language of a top-tier AV company's public site — a professional audit-grade tool, not a generic e-learning course. Learners finish able to recognize US road nuances from an AV perspective and pass a scored mixed-scenario challenge.

## Business Context
- Client recruits US-Returned talent (expats/US-educated) as Team Leads, QA, and Senior MPCI cultural translators; this module is their onboarding instrument.
- Two-section product vision: a one-time **Onboarding** module (v1 = this build) and a recurring **edge-case resurfacing** section fed by root-cause analysis (v2).
- Must explicitly state it is training for the Autonomous Vehicle industry.

## Requirements

### Validated
- Content pivot to US traffic/vehicle policy + AV rules per client doc ("New requirements.docx").
- Exactly 1 Lesson + 1 Zone in v1 (client asked for less generic, higher-impact scope).
- Lesson is video-driven (Waymo YouTube embeds + blog-style media); Zone includes video and rich media.
- Worlds: Phoenix + San Francisco only now (recreate "See how Waymo navigates real world scenarios" video style); other metros later.
- Three difficulty tiers — Foundation, Proficient, Advanced — open to all, inside the single Zone.
- Assessment maps to technical scorecard categories: 3D spatial rotation, telemetry interpretation, occlusion reasoning, complex decision-making; scorecard SNAPSHOT shown toward the end.
- Gamification mechanics + pass threshold delegated to us with justification (~80% accuracy gate suggested).
- Scenarios include simulated AV-perspective overlays: bounding boxes, lidar-style point representations, sensor confidence indicators.
- Mixed scenario challenges (nuances woven together), not 5 separate modules.
- Look/feel of the client's public site design language — but RFP demo ships with neutral branding (client identity post-award).
- Standalone HTML/interactive + SCORM package option for LMS.

### Active
- Add more US driving nuances beyond the named five, woven into mixed challenges.
- Justified gamification + pass-threshold spec (deliver rationale doc alongside implementation).
- Content pipeline must let new scenarios ship without code changes (typed JSON + Zod).

### Out of Scope (v1)
- Annotation/labeling workflow training (recognition only).
- Recurring edge-case resurfacing section (v2).
- Worlds beyond Phoenix + San Francisco.
- Multi-lesson / multi-zone structure (retired by pivot).
- Wayo SVG narrator character, jog dial, 3-role diegetic console (MCPI/Triage/Annotation) — retired.

## Context
- Brownfield pivot: existing React 19 + Vite + TS + Tailwind v4 app with 3D hub, lesson zones, and scenario zones exists; pivot replaces content model and UI language, keeps delivery plumbing.
- Design references: waymo.com, waymo.com/blog/2026/06/reference-driver/, waymo.com/blog/2025/06/safe-to-deploy/, plus 8 client screenshots. Design language captured: off-white #F5F7FA shell, navy #1E2340 rounded geometric display type, Waymo blue #0080FF + teal #00E59B accents, isometric 3D city + thick rounded gradient route paths, circular outline buttons, dot-timeline scrubbers; dark audit console = deep-navy canvas, BEV top-down with magenta bounding boxes, camera strips, lidar point cloud, route paths with labeled checkpoint nodes + circular check badges.

## Constraints
- Tech stack unchanged: React 19, Vite, TypeScript, Tailwind v4, Framer Motion, Zustand; R3F where needed.
- SCORM 1.2 via simple-scorm-packager + pipwerks (Reach 360, new-window launch); Vite base './' for static hosting.
- Video = placeholder slots wired to config; actual footage only if licensed/client-approved. No self-hosted video pipeline.
- **RFP neutrality**: module UI, content, and code must not reference the target client or use any client trademarks/logos/footage. Neutral working brand + swap-ready branding config; client identity applied only post-award. Design tokens may be inspired by reference sites without copying protected assets.

## Key Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Structure | 1 Lesson + 1 Zone | Client pivot: focused, high-impact, less generic |
| Lesson format | Video-driven + interactive media | Zone "must have videos and everything"; audit-grade feel |
| Difficulty | 3 tiers inside one Zone | Foundation/Proficient/Advanced open to all |
| Assessment | Scorecard snapshot + ~80% pass gate | Maps to client's technical categories; threshold justified in spec |
| Gamification | Route-path progress + badges | Waymo route metaphor; not arcade |
| Retired elements | Wayo, jog dial, 3-role console | Replaced by waymo.com patterns (dot scrubber, clean brand voice) |
| Edge-case section | v2 | Typed-JSON pipeline keeps it a content change, not code |
| Delivery | Standalone HTML + SCORM 1.2 | Client requirement; Reach 360 |
| Branding | Neutral working brand, swap-ready config | RFP demo — client trademarks only post-award |

## Evolution
- v0 (prior): 25-min diegetic 3-role ecosystem module (MCPI/Triage/Annotators, Wayo narrator, jog dial, lidar hero).
- v1 (current): pivot to US driving context + AV rules, 1 Lesson + 1 Zone, waymo.com design language, audit-grade UI.
- v2 (planned): recurring edge-case resurfacing section from root-cause analysis; additional metro worlds.

*Last updated: 2026-08-11 after client pivot ("New requirements.docx")*
