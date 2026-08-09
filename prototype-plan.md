# Wayo Ecosystem Navigator — Prototype Build Plan (Cinematic)

> **Design pivot (2026-08-10):** Moved from "dark console UI" to Pixar-style cinematic short film.
> Source of truth: `DESIGN.md` (cinematic brand tokens) · `DESIGN-SPEC.md` (28-scene inventory).
> Wayo is now a stylised real Waymo car — headlights = eyes, personality through motion and light.

---

## Intent (one paragraph)

A Pixar-style interactive short film about how a self-driving car sees the world, when it gets stuck, and how three human teams work together to make it smarter. A single incident (a construction flagger holding a hand-held STOP sign) passes through all three rings. The learner discovers the ecosystem by moving through physical spaces — a garage, a control room, a city overlook, an investigation room, a clean annotation studio — with Wayo, the car, as guide and emotional anchor. The feel is "animated short meets interactive storybook," not "dashboard meets slide deck."

## Locked Design System

Visual system locked from `DESIGN.md`. No raw hex, no console chrome.

- **Type:** `Baloo 2` (display/headlines) · `Nunito Sans` (body) · `JetBrains Mono` (data only)
- **World:** Warm nighttime palette. Each zone has a distinct environment (garage, control room, city overlook, construction zone, investigation room, annotation studio, day intersection).
- **Wayo:** Stylised real Waymo car (white body, sensor dome, red stripe). Headlight colour = emotion. 6 states (idle, curious, thinking, concerned, alert, happy). No cartoon face.
- **One accent per scene, derived from the environment. No purple-gradient wash, no emoji-as-icons, one primary action per scene.**
- **Transition language:** Scenes crossfade. Wayo drives out right → new scene slides in → Wayo drives in left. Between zones: full crossfade + location card overlay.

> DONE(design-pivot): DESIGN.md + DESIGN-SPEC.md rewritten for cinematic vision.
> DONE(wayo-design): Stylised real Waymo car — 6 headlight states, SVG + Framer Motion.

## Module Structure (28 scenes)

1. **Act 1 — Welcome** (01-03): Title card → Hub (city overlook) → Autonomy loop dialogue (with confidence drop)
2. **Lesson A — The Garage** (04-06): Intro → Sensor map (top-down, interactive) → Sensor detail
3. **Lesson B — The Lab** (07-11): Intro → Sense → Perceive (confidence drop) → Predict/Plan (oscillation) → Act (stop + help)
4. **Lesson C — The Overlook** (12-15): Intro → All rings healthy → Remove MCPI → Remove Triage Ops
5. **Zone 1 — Live Incident** (16-18): Construction zone entry → Decision (physical objects) → Seam 1 (token travel)
6. **Zone 2 — Investigation** (19-22): Investigation room entry → Triage console (scrub, classify) → Mid-scrub → Decision + Seam 2
7. **Zone 3 — Annotation Studio** (23-25): Studio entry → Workbench → Labels complete + Act 4 preview
8. **Acts 4-5 — Outcome** (26-28): Corrected drive (day) → Trace-back chain + assessment → Results + completion

## Scene Rules

- **Every scene is full-viewport composed environment.** No UI panels, no nav chrome.
- **Wayo is present in every scene** — foreground, reacting. Size and position vary by scene.
- **One primary action per scene.** Usually "Continue →" or an interaction within the zone.
- **Decisions are physical objects in the world** (radio handset, routing cards, bounding boxes), not buttons or dropdowns.
- **Assessment is woven into Act 5** — 3 questions asked by Wayo during the trace-back, not a separate quiz screen.
- **Wrong path survives.** Suboptimal choices don't error — Wayo's reaction carries the emotional weight.
- **No back button, no hamburger menu, no nav bar.** Linear journey. Progress = streetlights passed (bottom strip, subtle dots).

## Component & State Requirements

- **Waymo character** — 6 states driven by headlight colour + body lean. All animation via Framer Motion springs (`stiffness: 80, damping: 12`). Headlight glow via CSS `box-shadow` + `filter: blur()` animated.
- **Scene shell** — Full-viewport container. Background image/svg, Wayo positioned absolutely, speech bubble overlay, continue tap target. Handles crossfade transitions.
- **Sensor map (Lesson A)** — Top-down car with four concentric rings. Tap-to-expand interaction.
- **Pipeline header (Lesson B)** — Five icons (eye, magnifying glass, branching path, steering wheel, checkmark). Active icon lit, others dim.
- **Timeline scrubber (Zone 2)** — Physical drag handle, frame counter, marker flags. `use-gesture` + `react-spring` for inertia and detents. Not a slider — a physical object.
- **Bounding box tool (Zone 3)** — Draw rectangles on a camera frame. Crosshair cursor. Labels assigned from taxonomy panel.
- **Routing cards (Zone 2)** — Three face-down cards. Tap to flip. Chosen card glows, others dim.
- **Token animation (Seams)** — Glowing dot travelling between rings on the city overlook. CSS animated path or Framer Motion `motion.div`.
- **Interaction states** — `:focus-visible` rings on all interactive elements. Hover = subtle glow/brighten. Tap = physical press (scale 0.97 + spring back).

## Data / Content Model

- **Incident anchor:** `TRI-2291` · "Intersection 4B" · flagger + handheld STOP sign · stop-sign confidence 0.17 · 3m range
- **Reason code chain:** MCPI choice → `TRI-2291-RA` (Remote Assist) → Triage routing → Annotation labels → Model update → Corrected confidence 0.89
- **Assessment:** 3 items woven into Act 5 trace-back. Pass = understanding the loop, not a hard threshold.
- **Content for lessons:** Sensor specs, pipeline narration, role-toggle consequence copy. Sourced from `DESIGN-SPEC.md` prompt-hint text.

## Acceptance Checks

- [ ] Demo set (01, 02, 03, 16, 17, 19, 20, 22) builds as self-contained semantic HTML files.
- [ ] A stakeholder can walk the full 8-scene demo and never leave the incident thread.
- [ ] Brand tokens bound verbatim from `DESIGN.md`. No raw hex outside token definitions.
- [ ] Every scene has exactly one primary action visible.
- [ ] Wayo's headlight state is correct on each scene (idle/curious/concerned/alert/happy).
- [ ] Data fields render in JetBrains Mono. Scene text in Nunito Sans. Display text in Baloo 2.
- [ ] No accidental overlaps, clipped text, orphaned words. Wayo is never unintentionally cropped.
- [ ] All interactive elements have `:focus-visible` ring. Hover/active states preserve or improve contrast.
- [ ] Scene transitions feel like camera pans, not page loads. Crossfade 600-800ms, spring easing.
- [ ] Screen position persists in `localStorage`.

## Scope

**Demo build order (8 scenes):** 01, 02, 03, 16, 17, 19, 20, 22.

Plus one shared scene shell. Full module (28 scenes) deferred until demo set is approved.

## Next Step

**Open Design:** Load `DESIGN.md` tokens + `DESIGN-SPEC.md` prompts. Generate foundation assets (Wayo 6 states + 4 environment backgrounds). Then generate demo scenes 01, 02, 03, 16, 19, 20 in order.
