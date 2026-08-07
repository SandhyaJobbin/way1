# Requirements: MVP Release

## 1. Shell & Navigation
- Single-page React app with HashRouter for SCORM compatibility.
- 3D Hub screen mapping the ecosystem concentric rings (Live, Response, Learning).
- Smooth, cinematic camera transitions between zones (no hard page loads).
- Start Gate screen (to satisfy browser autoplay media policies).

## 2. Shared Interactive Components
- **Console Layout**: Themed UI wrapping all zones (Live: Amber/Red, Response: F1 White/Red, Learning: Blue/Violet).
- **Incident Scrubber (Jog Dial)**: A tactile drag control with inertia and detents, bound to a canvas image-sequence or sensor-data replay.
- **Wayo Character**: Rigged SVG character (idle parallax, emotion states, lip sync ready via Framer Motion).

## 3. Zones & Content (The Demo Slice)
- **Act 1 (Intro)**: Wayo explains the autonomy loop and the trigger for human intervention (low confidence).
- **Zone 2 (Triage Ops hub)**: Learner scrubs the construction flagger incident, classifies it, and routes it.
- **Seam 1**: The routing decision from Zone 2 visibly generates the work item/queue for Zone 3.

## 4. Delivery & Infrastructure
- Complete content architecture (ecosystem.json, zones.json, incidents/TRI-2291.json) validated with Zod.
- Vite build configured for relative paths (`base: './'`).
- SCORM 1.2 packaging wrapper (pipwerks) that sends completion status back to Reach 360 LMS.
