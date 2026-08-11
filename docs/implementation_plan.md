# AV Training Module — Demo Restructure (4-Hour Sprint)

## Background

The client wants a **gamified training module** for offshore AV operators covering **US driving behavior recognition** — specifically right-turn-on-red, four-way-stop etiquette, school-bus mandates, jaywalking norms, and aggressive lane-change dynamics — with simulated **AV-perspective overlays** (bounding boxes, LiDAR-style point clouds, sensor confidence indicators), scoped to **Phoenix and San Francisco**.

The current build has **9 scenes** spread across multiple loose zones that are partially wired and feel disconnected. The user wants to consolidate to **one lesson + one zone** for a focused, shippable demo.
*Note: As per user feedback, all branding will be generic (no Waymo/Wayo specific names). Existing assets will be reused.*

---

## Simplification Direction

> **One Lesson. One Zone. One story arc.**

| Old structure | Demo structure |
|---|---|
| act1 → zone1 → zone2 → zone3 (many scenes) | **Lesson** (3 scenes: intro + concept + knowledge-check) → **Zone** (4 scenes: scenario → decision → console → scorecard) |
| Generic triage/construction zone content | US driving behavior recognition (e.g. right-turn-on-red Phoenix intersection) |
| `zone1`, `zone2`, `zone3`, `lessonA/B/C` types | `lesson` + `zone` types only |

---

## Proposed Scene Flow (7 scenes total)

```
Scene L1 — Lesson: Intro         [zone: lesson]
Scene L2 — Lesson: Concept Map   [zone: lesson]
Scene L3 — Lesson: Quick Check   [zone: lesson]
       ↓ (transition beat)
Scene Z1 — Zone: Scenario Setup   [zone: zone]
Scene Z2 — Zone: AV Overlay View  [zone: zone]
Scene Z3 — Zone: Decision Point    [zone: zone]
Scene Z4 — Zone: Scorecard         [zone: zone]
```

### Scene Descriptions

#### L1 — Lesson: Intro
- AI Guide greets the learner: *"You're training to read US roads the way an AV does."*
- Title card: **"US Driving Behavior Recognition"** — Phoenix & SF
- Generic dark theme branding
- "Begin Lesson" CTA

#### L2 — Lesson: Concept Map
- AI Guide walks through **5 key behaviors** with animated AV-overlay icons:
  1. Right-turn-on-red (🔴 → ✅)
  2. Four-way-stop etiquette (4-way arrival sequence)
  3. School-bus mandates (stop arm + flashing lights)
  4. Jaywalking norms (pedestrian detection confidence)
  5. Aggressive lane-change dynamics (sudden cut-in telemetry)
- Each card shows a **sensor confidence bar** and a 1-line description
- Learner taps each to expand; "Continue" unlocks after all 5 reviewed

#### L3 — Lesson: Quick Check (3-question MCQ)
- 3 rapid multiple-choice questions testing the 5 behaviors
- Example: *"At a four-way stop, two cars arrive simultaneously. The AV is on the right. Who has right of way?"*
- Score saved to store (feeds scorecard in Z4)
- "Enter the Zone" CTA on pass (≥ 2/3)

---

#### Z1 — Zone: Scenario Setup
- Title: **"Intersection · E Camelback Rd, Phoenix"**
- Brief narrative from AI Guide: *"The AV detected an unusual pattern. Confidence flagged at 0.31. Let's look at what the sensors captured."*
- AV-perspective overlay intro: bounding boxes appear over a stylized SVG intersection
- One animated "incoming alert" card: `PHX-4471-RTOR · Right-Turn-on-Red anomaly`

#### Z2 — Zone: AV Overlay View  *(replaces TriageConsole)*
- The **key interactive scene** for the demo
- Full-screen AV sensor view:
  - **Left panel**: LiDAR point cloud (existing `LidarCloud` / `LidarSVGFallback`, re-skinned)
  - **Center**: Stylized intersection bird's-eye with bounding boxes on pedestrian + vehicle. Jog-dial scrubs the 3-second window
  - **Right**: Sensor confidence timeline — camera, LiDAR, radar, V2X bars
- AI Guide narrates: *"The pedestrian stepped off the curb. The AV flagged intent uncertainty. What does the sensor data tell you?"*

#### Z3 — Zone: Decision Point
- Three behavior recognition choices (branching decision):
  1. **"Pedestrian jaywalking — intent unclear"** *(correct)*
  2. **"Pedestrian at crosswalk — legal crossing"**
  3. **"Stationary pedestrian — no action needed"**
- On correct: green confirmation, AI Guide says *"Exactly. Low confidence on legal-status forces the AV to yield and flag."*
- On wrong: AI Guide explains why, shows correct — then continues (no penalty loop in demo)
- Decision stored in store for scorecard

#### Z4 — Zone: Scorecard  *(replaces SceneSeam / end state)*
- **Technical Scorecard Snapshot** mapped to client's 4 categories:
  | Dimension | Score |
  |---|---|
  | 3D Spatial Rotation | ★★★☆☆ |
  | Telemetry Interpretation | ★★★★☆ |
  | Occlusion Reasoning | ★★☆☆☆ |
  | Complex Decision-Making | ★★★★☆ |
- Lesson Quick-Check score feeds into "Complex Decision-Making"
- Zone decision (correct/incorrect) feeds "Telemetry Interpretation" + "Occlusion Reasoning"
- "Foundation Level — Complete" badge (since it's the first level)
- "Continue to Proficient" CTA (disabled in demo, shows as locked)

---

## Files to Create / Modify

### [MODIFY] [types.ts](file:///C:/My-workspace/Projects/Work/Waymo/src/types.ts)
- Simplify `Zone` to `'lesson' | 'zone'`
- Simplify `SceneId` to `'L1' | 'L2' | 'L3' | 'Z1' | 'Z2' | 'Z3' | 'Z4'`
- Update `SCENE_REGISTRY` and `SCENE_ORDER`

### [MODIFY] [scenario-data.ts](file:///C:/My-workspace/Projects/Work/Waymo/src/content/scenario-data.ts)
- Replace existing narrative arrays with US driving behavior content:
  - `LESSON_BEHAVIORS` (5 behavior cards)
  - `LESSON_QUIZ` (3 MCQ questions)
  - `ZONE_INCIDENT` (PHX-4471-RTOR)
  - `ZONE_NARRATIVE` (AI Guide's zone speech lines)
  - `SCORECARD_DIMENSIONS` (4 technical dimensions)

### [MODIFY] [routes.tsx](file:///C:/My-workspace/Projects/Work/Waymo/src/routes.tsx)
- Swap in new scene components L1–L3, Z1–Z4

### [MODIFY] [useStore.ts](file:///C:/My-workspace/Projects/Work/Waymo/src/store/useStore.ts)
- Add `quizScore`, `zoneDecisionCorrect` fields
- Update camera targets: `lesson` → `hub`, `zone` → `zone1`
- Keep `nextScene`, `navigateTo` logic

### [NEW] [SceneL1.tsx](file:///C:/My-workspace/Projects/Work/Waymo/src/views/SceneL1.tsx)
- Intro / landing scene

### [NEW] [SceneL2.tsx](file:///C:/My-workspace/Projects/Work/Waymo/src/views/SceneL2.tsx)
- 5-behavior concept map with expandable cards

### [NEW] [SceneL3.tsx](file:///C:/My-workspace/Projects/Work/Waymo/src/views/SceneL3.tsx)
- 3-question MCQ quick check

### [NEW] [SceneZ1.tsx](file:///C:/My-workspace/Projects/Work/Waymo/src/views/SceneZ1.tsx)
- Zone scenario setup / Phoenix intersection intro

### [NEW] [SceneZ2.tsx](file:///C:/My-workspace/Projects/Work/Waymo/src/views/SceneZ2.tsx)
- AV overlay view (LiDAR + bounding boxes + sensor confidence)

### [NEW] [SceneZ3.tsx](file:///C:/My-workspace/Projects/Work/Waymo/src/views/SceneZ3.tsx)
- Decision point / behavior identification choice

### [NEW] [SceneZ4.tsx](file:///C:/My-workspace/Projects/Work/Waymo/src/views/SceneZ4.tsx)
- Technical scorecard snapshot + level badge

### [DELETE] Old scenes no longer needed:
- `Scene01.tsx`, `Scene02.tsx`, `Scene03.tsx`, `Scene16.tsx`, `Scene17.tsx`, `Scene19.tsx`, `Scene20.tsx`, `Scene22.tsx`, `SceneSeam.tsx`

---

## Phased Execution (4 hours)

| Phase | Duration | Deliverable |
|---|---|---|
| **Phase 1** — Data + Types | 30 min | `types.ts`, `scenario-data.ts`, `useStore.ts`, `routes.tsx` updated. App wires new scenes without crashing. |
| **Phase 2** — Lesson Scenes (L1, L2, L3) | 60 min | Full lesson flow working end-to-end with quiz scoring |
| **Phase 3** — Zone Scenes (Z1, Z2, Z3) | 75 min | Zone interactive flow: AV overlay, jog-dial, decision branching |
| **Phase 4** — Scorecard (Z4) | 30 min | Scorecard with dimension breakdown, badge, locked CTA |
| **Phase 5** — Polish + QA | 45 min | Generic branding colors/fonts verified, AI Guide animations, progress dots, transitions smooth |
