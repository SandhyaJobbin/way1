# Requirements: MVP Release

## 1. Shell & Navigation
- Single-page React app with HashRouter for SCORM compatibility.
- 3D Hub screen mapping the ecosystem concentric rings (Live, Response, Learning).
- Smooth, cinematic camera transitions between zones (no hard page loads).
- Start Gate screen (to satisfy browser autoplay media policies).

## 2. Shared Interactive Components
- **Console Layout**: Themed UI wrapping all zones (Live: Amber/Red, Response: F1 White/Red, Learning: Blue/Violet).
- **Incident Scrubber (Jog Dial)**: A tactile drag control with inertia and detents, bound to a canvas image-sequence or sensor-data replay.
- **Wayo Character**: Rigged SVG character (idle parallax, emotion states, lip sync ready via Framer Motion). Wayo is the guide/narrator for ALL zones and lesson transitions.

## 3. Zones & Content (The Demo Slice)
- **Act 1 (Intro)**: Wayo explains the autonomy loop and the trigger for human intervention (low confidence).
- **Zone 2 (Triage Ops hub)**: Learner scrubs the construction flagger incident, classifies it, and routes it.
- **Seam 1**: The routing decision from Zone 2 visibly generates the work item/queue for Zone 3.

## 4. Educational Lesson Zones (NEW — 3 Lessons)

Three didactic zones taught by Wayo before the scenario-based interactive zones. Each is a self-contained "lesson" with light interaction (tap-to-reveal, scroll-through, animated diagram).

### Lesson A — "What the Car Has" (Sensors)
- Learning objective: Name the sensor types on a Waymo vehicle and what each one does.
- Content: Lidar, cameras, radar, GPS/IMU — rendered over an interactive 3D top-down car silhouette.
- Interaction: Tap each sensor ring → zooms label card + animated coverage radius.
- Wayo delivers: "This is how I see the world."

### Lesson B — "How the Model Works" (Perception → Prediction → Planning)
- Source: Waymo CEO video (https://www.youtube.com/watch?v=Gp4zrV3-6N8&t=1109s)
- Learning objective: Understand the perception stack — sense, classify, predict, plan, act — and where confidence scoring enters.
- Content: Animated pipeline diagram. Each stage has a short description, an example from the construction-flagger incident, and a confidence score indicator.
- Interaction: Step-through (Next button each stage). The same incident (construction flagger) reappears at each stage so the learner tracks one event through the whole model.
- Wayo delivers the pipeline narration.

### Lesson C — "Why All Three Rings Matter" (Ecosystem Interdependence)
- Learning objective: Understand why removing any one of the three human roles breaks the improvement loop.
- Content: The concentric-ring orbital map with animated "what-if" — remove MCPI → car never unblocks → no incident record → no improvement. Remove Triage Ops → no routing → annotators get wrong clips. Remove Annotators → model never updates → Wayo never improves.
- Interaction: Three toggle buttons ("Remove a role") each trigger an animated break in the chain with a consequence callout.
- Wayo delivers: "Here's why you're part of the loop."

## 5. Scenario-Based Interactive Zones (NEW — Audit Interface)

Three zones that simulate the real operator console. Learner receives sensor data, video/lidar replay, and must interpret/decide. Interface looks and feels like a professional audit dashboard.

### Zone 1 — MCPI Live Intervention (Audit Console)
- **Interface elements**: Live feed panel (camera view), alert queue sidebar, radio communication log, intervention timer.
- **Decision**: Choose the correct intervention action (hold, remote assist, escalate to safety driver) given the sensor state.
- **Consequence propagation**: Decision choice writes an event-reason code that visibly appears in Zone 2's incident header.
- Theme: Hot amber/red, urgency aesthetic.

### Zone 2 — Triage Ops (Incident Review Console) ← Demo priority
- **Interface elements**: Jog Dial scrubber, lidar point-cloud viewport, camera feeds (3 angles), incident metadata panel, routing menu.
- **Decision**: Classify the incident (severity + root cause) and route it (Annotation queue / Safety review / Archive).
- **Consequence propagation**: Routing decision determines which queue opens in Zone 3 (wrong routing = wrong queue in Zone 3).
- Theme: F1 white/red console.

### Zone 3 — Annotation (Labeling Workbench)
- **Interface elements**: Frame-scrubber timeline, bounding-box draw overlay on camera frame, label taxonomy panel, confidence score readout, submit queue.
- **Decision**: Draw/confirm bounding boxes on the construction-flagger and the handheld stop sign; assign correct labels.
- **Consequence propagation**: Correct labels → Wayo's Act 4 corrected drive. Wrong labels → subtle difference in Act 4 narration ("…this is what I learned, though it wasn't perfect").
- Theme: Cool blue/violet.

## 6. Delivery & Infrastructure
- Complete content architecture (ecosystem.json, zones.json, incidents/TRI-2291.json, lessons/lesson-a.json, lessons/lesson-b.json, lessons/lesson-c.json) validated with Zod.
- Vite build configured for relative paths (`base: './'`).
- SCORM 1.2 packaging wrapper (pipwerks) that sends completion status back to Reach 360 LMS.
