# Waymo Lifecycle Training Module — Project Brief

**Owner:** Anoop Krishnan · Trust & Safety Training, Sutherland
**Date:** 7 August 2026
**Status:** Pre-build. Architecture locked, one open dependency (MCPI role definition).

---

## 1. Objective

Build an **introductory training module** that teaches agents how the Waymo autonomous-vehicle ecosystem works and how three human roles — **MCPI Agent, Triage Ops, and Annotators** — fit into it and depend on each other.

This is deliberately not three job-skill trainings stapled together. The learning objective is the **map**, not the craft:

- How the car operates autonomously, and when it stops and asks for help
- What each role does, at a working level of detail
- **How the roles hand work to each other** — the seams are the curriculum
- How human decisions flow back into the car and make the fleet better

Secondary value: an honest preview of all three roles doubles as a self-selection tool for staffing.

### Success criteria

| Criterion | Measure |
| --- | --- |
| Ecosystem comprehension | Learner can say who owns an event at each stage |
| Interdependence understood | Learner can name what the next role needs from them |
| Engagement | Completion rate materially above standard e-learning baseline |
| Stakeholder reaction | Client and management see it as a differentiated capability, not a course |
| Runtime | ~25 minutes end to end |

---

## 2. Today's goal

**A demo-able vertical slice to secure management approval.** Not the finished module.

Ship today:

1. **Act 1 — Wayo intro.** Animated talking car, speech bubbles, the autonomy loop (Sense → Perceive → Predict → Plan → Act), and the moment confidence drops and a human is needed.
2. **One zone, fully working.** The investigation console with jog-dial scrubbing, one incident replay, one decision.
3. **One seam.** Even stubbed. The artifact the learner produces must visibly land on the next role's desk.
4. **Deployed to GitHub Pages** so it opens on any laptop in the approval meeting.

**Explicitly out of scope today:** the other two zones, SCORM packaging, audio, AI-generated video, final art polish.

> **Why the seam is non-negotiable in the demo:** a zone on its own demos a screen. A zone plus a handoff demos the idea. The idea is what needs approval.

**Time budget:** 8–15 hours. Roughly 70% is AI-generatable; the non-automatable remainder is SME accuracy on role behaviour, hands-on feel testing, and taste calls.

---

## 3. The ecosystem model

All three roles touch **the same incident**, at different points on the clock, with different tools, answering different questions. One incident end to end — never one case per zone, which would teach three jobs and zero ecosystem.

```
                    T+0s          T+4h           T+6d
INCIDENT ─────────────●─────────────●──────────────●────────┐
(construction       LIVE         RESPONSE       LEARNING    │
 flagger)                                                    │
                  intervene      classify         label      │
                  & unblock      & route        & retrain    │
                                                             │
   WAYO ◄────────────────── model update ────────────────────┘
```

### Concentric orbits, ordered by clock speed

| Ring | Clock | Who | Question they answer |
| --- | --- | --- | --- |
| Centre | Milliseconds | Wayo (autonomous) | What do I do right now? |
| Ring 1 — Live | Seconds–minutes | MCPI Agent *(placement provisional)* | How do we unblock this vehicle? |
| Ring 2 — Response | Minutes–hours | Triage Ops | What happened, how bad, who owns it? |
| Ring 3 — Learning | Days–weeks | Annotators | What should the model have seen? |

**Triage Ops is the structural hub** — every downstream ring gets its work because triage routed it there. That is why it is the demo zone.

### Hub screen

Not three cards in a row. A live orbital map: Wayo at centre with a sweeping lidar, three rings each pulsing at its own tempo, and the incident rendered as a token that physically travels outward as the learner progresses. Entering a zone is a camera dolly outward, not a page change.

Theme by clock speed: **Live** = hot amber/red · **Response** = F1 white/red console · **Learning** = cool blue/violet.

---

## 4. Module flow

```
ACT 1   Wayo — how the car works, and when it needs people
ZONE 1  Live: the car is stopped, rider waiting
   ↓    SEAM — your intervention writes an event record
ZONE 2  Response: open the replay, classify, route
   ↓    SEAM — your routing sends the clip to a labeling queue
ZONE 3  Learning: label the frames the car misread
   ↓    SEAM — labels compile into a model update
ACT 4   Wayo hits the same construction zone. Handles it.
ACT 5   Trace-back — the whole chain on one screen, with the learner's own decisions on it
```

### What Act 1 must plant

Three specific ideas, or the zones will not land:

1. **Confidence is a number, and it can drop.** This is the trigger for every human handoff.
2. **Stopping when unsure is correct behaviour, not failure.** Without this, learners misjudge severity in triage.
3. **The car only improves because people teach it.** Sets up the return arrow.

### The carrying mechanic

One decision per role, and **every decision is visibly consumed by the next role**:

- Zone 1: how you unblock the car → your reason code becomes the event title in Zone 2
- Zone 2: how you route it → your destination determines which queue opens in Zone 3
- Zone 3: how you label → your labels appear in Wayo's corrected drive

Wrong-ish choices should be survivable and should **propagate**. A learner who mis-routes in Zone 2 arrives in Zone 3 and finds the clip in the wrong queue. That single moment teaches interdependence better than any diagram.

### Assessment

Do not test job competence — it has not been taught. Test the map, drawn from the seams rather than the zones. Auto-scored, 3–4 items:

- Who owns this event right now?
- What does the next role need from you?
- Where does this end up?

---

## 5. Reference incident

**Construction-zone flagger.** A road worker directs traffic by hand against the signal. Perception classifies the person correctly but never classifies the handheld stop sign — confidence drops, the planner oscillates between proceed and yield, and the car stops. No contact, no hard brake, but the lane is blocked and a rider is waiting.

Chosen because it exercises all three rings naturally: live intervention, post-hoc classification and routing, and a clear labeling gap that a model update can genuinely close.

---

## 6. Technical decisions

### Stack (locked)

```
Vite 6 + React 19 + TypeScript (strict)
motion (Framer Motion)      — orchestration, AnimatePresence, layoutId
zustand                     — session, scoring, replay state
@use-gesture/react          — jog dial, lever, touch
react-spring                — inertia and detent physics
zod                         — validates content JSON → generates types
tailwind v4                 — @theme tokens, no config file
@react-three/fiber + drei   — 3D lidar point cloud
@react-three/postprocessing — bloom, grain, vignette, ACES tone mapping
howler                      — console SFX
react-router (HashRouter)   — Reach 360 has no server rewrites
```

Two config lines that otherwise cost an hour:

```ts
// vite.config.ts
base: './',   // relative paths — works on GH Pages AND inside SCORM
```

`HashRouter`, not `BrowserRouter`.

### Content as typed JSON

Everything the module *says* lives outside the code:

```
/content
  ecosystem.json      — Wayo's script: beats, bubbles, diagram nodes
  zones.json          — zone metadata, theming, lock state
  incidents/
    TRI-2291.json     — metadata, replay track, markers, questions, rubric, feedback
```

Zod schema at the top, `z.infer` gives the TypeScript types for free.

**Payoff:** new incidents are content, not engineering. Authoring another case is ~20 minutes in a text editor. An SME can review a JSON file. All three zones render through one `<Console>` component, differing only by JSON and a theme token set.

### Performance rule

Never put the current frame in React state — a 30fps scrub through `useState` re-renders the HUD 30×/second and stutters the dial.

```
rAF loop → frameRef.current (plain ref)
         → imperative canvas/three draw
         → framer useMotionValue for HUD digits (no re-render)
React state only on: pause, marker crossed, answer submitted
```

---

## 7. Options considered and decisions

### Character animation — **decided: rigged SVG + Framer Motion**

| Option | Verdict |
| --- | --- |
| **Rigged SVG + Framer Motion** | **Chosen.** Free, native to the stack, no extra WASM runtime in the SCORM package. Wayo is rigid geometry (body, windshield, eyes, pupils, mouth curve, wheels, lidar dome) — roughly 12 SVG groups driven by motion values. Costs ~3–4 extra hours of hand-rigging vs. a visual editor. |
| Rive | Rejected on cost. The free tier cannot export at all — a `.riv` you cannot export is one you cannot ship. Technically the strongest option for organic characters; Wayo is not organic enough to justify it. |
| dotLottie | Free and MIT-licensed with state machines built into the file format, but the mature authoring path is After Effects, which is not available here. **Keep in reserve** for secondary bits — loading states, zone icons, transition flourishes. |
| 3D glTF car with morph targets | Heaviest authoring cost for the least return at intro depth. |

Lip sync works the same either way: generate voice, take the character timestamps, build a viseme timeline, swap the mouth `<path>` synced to audio playback time (not `setTimeout`). Seven or eight mouth shapes is plenty for a stylized car.

### Incident replay — **decided: canvas/shader-rendered sensor replay, not AI video**

| Option | Verdict |
| --- | --- |
| **Rendered sensor replay** | **Chosen.** Scrubs perfectly (no keyframe problem), weighs kilobytes not megabytes, is fully code-generatable, and looks more like a real review console than generated dashcam footage. |
| AI-generated video | Rejected as the primary source. Prompt iteration, queue waits, re-encoding and package weight would consume most of the build budget. Optionally **one** hero clip for Act 1. |
| Image sequence on canvas | Viable fallback and the most reliable path if real footage is ever required — the technique Apple uses for scroll-scrubbed product pages. |
| Frame-accurate video scrubbing | `requestVideoFrameCallback` is now cross-browser but does not guarantee frame accuracy. WebCodecs does, at significant build cost and risk inside SCORM. Avoid for now. |

### Lidar point cloud — **decided: synthetic, procedurally generated**

Real AV datasets are off the table. **Waymo Open Dataset, nuScenes, and KITTI are all non-commercial-only**, and a corporate training deliverable is a commercial use. This is a hard legal line, easy to cross under deadline.

Generate instead: sample points off a car mesh and a ground plane, add lidar ring patterns, radial density falloff, positional noise, and intensity varying by surface angle. Render as a single `THREE.Points` with a custom `shaderMaterial`, coloured by intensity via a 1D LUT (blue low → red high, the standard convention). Skip Potree — it is built for millions of streamed points and is overkill here.

### Delivery — **decided: direct SCORM 1.2 upload to Reach 360**

Reach 360 accepts third-party SCORM 1.2 packages directly, with a large size ceiling, and launches them full-screen in a new window. This avoids nesting inside Rise, which would create iframe, API-discovery and mobile-responsiveness problems.

Known constraints to design around:

- Imported courses open in a **new window** — pop-up blockers can interfere; write onboarding copy for it
- Question-level reporting is **not** available for imported third-party SCORM; report completion and score only
- Use **pipwerks** for the SCORM API (it already walks both parent frames and `window.opener`)
- Browsers block audio autoplay without a user gesture — build a **Start gate**
- Validate in **SCORM Cloud** before delivery
- xAPI into Reach appears unsupported; use SCORM 1.2

### Production tooling

Free-first, given the no-subscription constraint. Gemini Pro for concept art, scripts and textures; Canva Pro and Adobe Express for 2D UI assets and icons. If audio or voice is added later, prefer a provider with clean commercial terms — **avoid Suno/Udio**, whose commercial licensing is unsettled.

### Working method

Adopt the **Gauntlet Loop** pattern for each component: set a hard external reference bar (real F1 broadcast frames, specific Awwwards sites, racing-game HUD screenshots), build against it, then have a *separate* critic pass compare artifact to reference blind and name the single biggest gap. Repeat. The builder never grades its own work.

---

## 8. What makes this breakthrough rather than well-made

1. **Diegetic UI.** Not a course with a 3D bit — a convincing operator console the learner works inside.
2. **The jog dial as the primary verb.** Physically satisfying, detented, inertial scrubbing of a real incident replay. No standard authoring tool can do this.
3. **A shader-driven lidar hero moment.** Rotating, intensity-coloured, scanning point cloud with selective bloom. Procedurally generated, so it is free and licence-clean.
4. **A character with genuine emotional state**, not a mascot playing one loop.
5. **A cohesive film look** — ACES tone mapping, subtle grain, vignette — applied consistently. The fastest route from "WebGL demo" to "cinematic."
6. **Physically modelled motion** — spring physics on every control and transition. Weight and inertia are what separate expensive from templated.
7. **Decisions that propagate across roles.** Rare in corporate training; it is the entire point here.

---

## 9. Build sequence

| Stage | Work | Gate |
| --- | --- | --- |
| **0 — De-risk** | Package a trivial R3F scene as SCORM 1.2, import to Reach 360 | Renders, audio plays after click, completion reports |
| **1 — Today** | Act 1 + Zone 2 (Triage Ops) + one seam, on GH Pages | Stakeholder completes it unaided |
| **2 — Signature** | Jog dial physics, point cloud shader, Wayo rig to full fidelity | 60fps on a mid-tier laptop; blind-tested against reference |
| **3 — Complete** | Zones 1 and 3, all seams, Act 4 and 5 | Full 25-minute run-through |
| **4 — Harden** | SCORM packaging, device-tier fallbacks, load optimisation | Passes SCORM Cloud validation |

**Fallback thresholds**

- If Stage 0 fails → host on GitHub Pages, embed via Rise web object with a `postMessage` relay, and accept the mobile-responsiveness risk
- If frame budget breaks → drop selective bloom first, then reduce point count, then serve a static fallback on low-tier GPUs

---

## 10. Open items

| # | Item | Blocking |
| --- | --- | --- |
| 1 | **What does MCPI stand for, and what does the role actually do?** | Zone order, ring placement, and all seam content. If MCPI is live intervention it sits in Ring 1; if it is post-hoc investigation or quality audit it shares Ring 2 with Triage Ops and the geometry changes. |
| 2 | What does Triage Ops actually decide — routing to teams, or the first safety call? | Zone 2 decision design |
| 3 | Confirm the reference incident is realistic to the account | All zone content |
| 4 | Reach 360 upload test | Stage 0 gate |

---

## 11. Risks

- **Scope, not feasibility.** Every technique here is individually achievable solo. Attempting all of them at full fidelity across three zones is not. The staged plan exists to protect against this.
- **Dataset licensing.** Non-commercial-only terms on all major AV datasets. Synthetic generation is the only safe path.
- **SME accuracy.** Plausible-sounding role workflows are worthless in a training module and actively damaging with a client. Item 1 above must close before Zone content is written.
- **Tool pricing and model availability move monthly.** Verify before committing any budget.
