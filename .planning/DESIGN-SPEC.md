# Waymo Training Module — Open Design Screen Inventory

> **Tool**: Open Design (`od-design` combo via OmniRoute · multimodal Sonnet)
> **Repo**: https://github.com/nexu-io/open-design
> **Total screens to generate**: 32
> **Generation order**: foundations first, then screens in module flow order.

---

## How to use this file

1. Open Open Design and point its Claude Code adapter at `http://localhost:20128` (uses the `od-design` combo — vision-capable, brand-extraction ready).
2. Generate a **DESIGN.md** brand file from this document first — it becomes the token source for every screen.
3. Generate screens in the order listed below. Each screen entry specifies:
   - **Purpose** — what it teaches/shows
   - **Key UI elements** — what must appear
   - **Prompt hint** — the description to paste into Open Design's generation prompt

---

## Brand & Token Foundation (generate this first)

### Design language
| Token | Value | Notes |
|---|---|---|
| **Typeface** | `Inter` (UI) · `JetBrains Mono` (data/sensor readouts) | Free, web-safe |
| **Live ring accent** | `#FF6B2B` amber-orange | Hot urgency |
| **Response ring accent** | `#E8E8E8` / `#CC0000` | F1 white/red console |
| **Learning ring accent** | `#4A90E2` / `#7B61FF` | Blue/violet cool |
| **Background** | `#0A0A0F` near-black | Deep space feel |
| **Surface 1** | `#131320` | Panel background |
| **Surface 2** | `#1C1C2E` | Sidebar / card |
| **Wayo body** | `#FFFFFF` with `#CC0000` stripe | Car silhouette |
| **Data green** | `#00E676` | Confidence score high |
| **Data amber** | `#FFB300` | Confidence score mid |
| **Data red** | `#FF1744` | Confidence score low |
| **Border** | `rgba(255,255,255,0.08)` | Subtle panel separation |

### Wayo character states to asset-export
Generate Wayo as a flat SVG car character (side view, cartoon proportions). Export each state:
1. `wayo-idle.svg` — neutral, eyes forward, slight lean
2. `wayo-talking.svg` — mouth partially open, eyebrows raised
3. `wayo-thinking.svg` — eyes squinted, question-mark glyph near antenna
4. `wayo-happy.svg` — wide eyes, upward mouth curve
5. `wayo-surprised.svg` — very wide eyes, vertical mouth line
6. `wayo-low-confidence.svg` — half-closed eyes, yellow/amber glow from headlights

---

## Act 1 — Wayo Introduction (3 screens)

### Screen 01 — Start Gate
**Purpose**: Entry splash. Captures user gesture for audio autoplay.
**Key elements**: Wayo centered, animated idle loop, "Begin" button, Waymo wordmark, SCORM-safe single CTA.
**Prompt hint**: "A cinematic startup screen for a high-tech AV training module. Deep space background (#0A0A0F), centered SVG car character 'Wayo' with subtle idle breathing animation, a single 'Begin your mission' CTA button in amber (#FF6B2B), Waymo wordmark top-right. Feels like launching a flight sim, not a training course."

---

### Screen 02 — Hub (Ecosystem Orbital Map)
**Purpose**: The central navigation screen. Shows the three rings. Learner returns here between zones.
**Key elements**: Concentric ring diagram (Live/Response/Learning), Wayo at centre with spinning lidar sweep indicator, animated token dot showing current position, zone entry points on each ring, ring labels, lock/unlock state per zone.
**Prompt hint**: "An orbital top-down map of a self-driving car ecosystem. Dark deep-space background. Three concentric glowing rings — innermost amber (Live), middle F1 red/white (Response), outer blue-violet (Learning). Wayo (small car icon) at dead centre. Pulsing glow on active ring. Zone entry portals at 12 o'clock on each ring. Looks like a NASA mission control overlay."

---

### Screen 03 — Act 1 Dialogue (Wayo Narrates the Autonomy Loop)
**Purpose**: Wayo explains Sense → Perceive → Predict → Plan → Act and the confidence-drop moment.
**Key elements**: Wayo large left side, speech bubble right, pipeline diagram (5-node horizontal flow), confidence score meter dropping in real time, "Next" button bottom right.
**Prompt hint**: "A cinematic conversation screen. Left 60%: large Wayo character in talking state with soft drop shadow. Right 40%: a dark panel with a speech bubble (styled like a HUD overlay, not a cartoon bubble) containing two lines of text. Bottom center: a horizontal 5-node pipeline (Sense, Perceive, Predict, Plan, Act) with the current stage highlighted in amber. Below that: a circular confidence score meter dropping from 0.87 to 0.21, colour shifting green→amber→red."

---

## Lesson A — "What the Car Has" (3 screens)

### Screen 04 — Lesson A Title Card
**Purpose**: Transition into lesson. Wayo introduces the topic.
**Key elements**: Lesson badge "Lesson 1 of 3", Wayo talking pose, speech bubble "Let me show you how I see the world", dark panel with sensor icon strip preview.
**Prompt hint**: "A lesson intro card. Top-left badge: 'Lesson 1 · Sensors'. Center: Wayo in talking pose with speech bubble. Background shows a subtle ghost of sensor rings (faint lidar arcs). Progress bar at bottom showing lesson 1 of 6 total steps."

---

### Screen 05 — Sensor Map (Interactive — default state)
**Purpose**: Top-down car silhouette with labelled sensor rings. Default: no selection.
**Key elements**: Top-down Wayo silhouette (car body), four concentric dashed sensor rings (lidar outer, camera mid, radar inner, GPS/IMU marker), four label callouts (tap targets), info panel right side (empty/placeholder).
**Prompt hint**: "A technical interactive diagram. Top-down view of a sleek autonomous vehicle (white car silhouette on dark background). Four concentric dashed rings radiating outward: outermost = lidar (teal), cameras (amber arcs at 8 points), radar (short red arcs), GPS/IMU dot at centre. Four tap-target labels float at ring intersections. Right panel: empty with 'Select a sensor to learn more' placeholder text in JetBrains Mono."

---

### Screen 06 — Sensor Detail (Lidar selected)
**Purpose**: Shows what happens when a sensor is tapped — expanded info card.
**Key elements**: Same top-down map but lidar ring glows brighter, info panel right filled with: sensor name, range spec, what it detects, example image, "How it helped / failed in the incident" callout box.
**Prompt hint**: "Same top-down car diagram but lidar ring is now highlighted teal with full opacity. Right panel now filled: header 'Lidar · 360° · 200m range', body text, a small wireframe point-cloud thumbnail, and a yellow callout box 'Saw the flagger but missed the stop sign at 3m'. Next/Previous arrow at panel bottom."

---

## Lesson B — "How the Model Works" (5 screens)

### Screen 07 — Lesson B Title Card
**Purpose**: Transition into lesson. Wayo introduces the perception pipeline.
**Key elements**: Lesson badge "Lesson 2 of 3", Wayo thinking pose, pipeline icon strip, speech bubble referencing the incident.
**Prompt hint**: "Lesson 2 intro card. Badge top-left: 'Lesson 2 · How I Think'. Wayo in thinking pose center-left. Speech bubble: 'Every decision I make starts with a question: what am I looking at?'. Behind: faint horizontal arrow pipeline. Progress bar bottom: step 2 of 6."

---

### Screen 08 — Pipeline Step: Sense
**Purpose**: Stage 1 of 5 in the perception pipeline. Raw sensor data.
**Key elements**: Highlighted "Sense" node on 5-step pipeline header, main area showing raw lidar point cloud + camera feed thumbnails (from construction flagger incident), Wayo speech bubble, stage counter "1/5".
**Prompt hint**: "An AV perception pipeline walkthrough screen. Top: 5 horizontal nodes (Sense, Perceive, Predict, Plan, Act), leftmost 'Sense' node highlighted amber. Main area: two-column split — left: a lidar point cloud wireframe top-down view of a road with a figure; right: three small camera thumbnail frames (front, left, right cameras). Bottom-left: Wayo talking. Bottom-right: speech bubble 'I'm receiving raw data from 29 sensors simultaneously.' Stage counter top-right '1 / 5'."

---

### Screen 09 — Pipeline Step: Perceive (Confidence Drop)
**Purpose**: Classification stage. Shows where confidence drops on the stop sign.
**Key elements**: "Perceive" node highlighted, detection bounding boxes on camera frame (person = 0.98, stop sign = 0.17), confidence score display for each detection, Wayo low-confidence state.
**Prompt hint**: "Perception stage screen. Top pipeline: 'Perceive' node highlighted red-amber. Main area: camera feed frame with drawn bounding boxes overlaid — green box around a construction worker (label: 'Person 0.98'), weak dashed red box around a handheld STOP sign (label: '??? 0.17'). Right panel: a table of detections with confidence scores, the stop-sign row highlighted red. Wayo bottom-left in low-confidence state. Speech bubble: 'I see the person. But that sign...' with a trailing ellipsis."

---

### Screen 10 — Pipeline Step: Predict → Plan (Decision Oscillation)
**Purpose**: Shows the planner oscillating between PROCEED and YIELD because of the low-confidence detection.
**Key elements**: "Predict" + "Plan" nodes both partially lit (co-active), animated decision graph (oscillating bar between yield/proceed), Wayo speech bubble explaining the oscillation.
**Prompt hint**: "AV planner decision screen. Pipeline nodes 'Predict' and 'Plan' both lit amber. Main area split: left = a path prediction diagram with two overlapping trajectory fans (one yielding, one proceeding); right = a real-time oscillating bar chart labelled 'Decision: Yield 0.48 ↔ Proceed 0.52' with the bar bouncing between two near-equal values. Wayo: slightly anxious state. Speech bubble: 'I can't commit. The data isn't clear enough.'"

---

### Screen 11 — Pipeline Step: Act (Stop + Human Request)
**Purpose**: Car initiates minimal-risk stop and sends a human-assist request.
**Key elements**: "Act" node highlighted, car icon on map showing stopped position, alert broadcast icon, Wayo relieved/neutral state, speech bubble "I stopped and asked for help. That's not failure — that's the design."
**Prompt hint**: "AV action stage screen. 'Act' pipeline node lit blue-white. Main area: top-down map showing Wayo (car) stopped at intersection, a pulsing amber alert beacon above the car icon, dashed 'minimal-risk position' zone. Right: a broadcast alert card — 'Incident TRI-2291 · Low-confidence object · Human assist requested'. Wayo: calm, neutral state. Speech bubble: 'I pulled over and asked for help. Stopping safely is always the right call.'"

---

## Lesson C — "Why All Three Rings Matter" (4 screens)

### Screen 12 — Lesson C Title Card
**Purpose**: Transition. Wayo introduces the interdependence concept.
**Prompt hint**: "Lesson 3 intro card. Badge: 'Lesson 3 · The Loop'. Wayo in happy/proud pose. Speech bubble: 'Every role in this orbit exists because of me — and I only get better because of them.' Background: faint three-ring orbital graphic. Progress bar: step 3 of 6."

---

### Screen 13 — All-Rings Healthy (Default State)
**Purpose**: Full ecosystem map with all three rings active and the incident flowing outward.
**Key elements**: Three-ring map, animated incident token flowing from centre outward, all rings glowing, flow labels (MCPI → Triage Ops → Annotators → Model Update → Wayo). "Remove a role" buttons under each ring label.
**Prompt hint**: "Full ecosystem orbital map showing all three rings active. An animated orange dot (incident token) moves from centre outward through each ring. Each ring has a small role icon and text label. Three 'Remove role' buttons below each ring label styled as destructive/warning buttons. Everything glowing, healthy, flowing."

---

### Screen 14 — "Remove MCPI" State
**Purpose**: Shows what breaks when Ring 1 is disabled.
**Key elements**: Ring 1 (Live) dims/breaks, animated consequence cascade — incident token stalls at centre, "Car remains blocked" callout, rings 2 and 3 fade to idle.
**Prompt hint**: "Same orbital map but the innermost ring (Live) is greyed out with a broken-chain icon overlay. The incident token is stuck at the centre with a blinking red dot. A consequence callout card floats: 'No human intervention → car stays stopped → no incident record → no routing.' Rings 2 and 3 show idle/dim state. 'Restore role' button glows amber."

---

### Screen 15 — "Remove Triage Ops" State
**Purpose**: Shows what breaks when Ring 2 is disabled.
**Key elements**: Ring 2 (Response) breaks, incident stalls between Ring 1 and 3, annotators idle, Wayo never gets data.
**Prompt hint**: "Same map. Middle ring (Response) greyed, broken-chain overlay. Incident token is between ring 1 and ring 3 with no path forward. Callout: 'No triage → annotators receive wrong clips → model trains on bad data.' Ring 3 shows idle state. Restore button."

---

## Zone 1 — MCPI Live Intervention Console (4 screens)

### Screen 16 — Zone 1 Entry / Zone Ident
**Purpose**: Zone introduction. Wayo hands off to the learner.
**Prompt hint**: "Zone entry screen. Header badge: 'Zone 1 · Live Intervention'. Wayo facing right (about to exit frame). Speech bubble: 'This is happening right now. The car is stopped and a rider is waiting. You're on.' Amber/red urgent background. Large 'Enter Console' CTA."

---

### Screen 17 — MCPI Console (Default — incident active)
**Purpose**: Main audit interface for Zone 1. Simulate real MCPI workstation.
**Key elements**: Top bar — incident ID, location, elapsed time timer (counting up). Left panel — live camera feed (construction zone, wide angle). Center — vehicle status panel (speed: 0, heading, GPS pin). Right — alert queue with 3 items stacked. Bottom bar — three action buttons: HOLD, REMOTE ASSIST, ESCALATE TO SAFETY DRIVER.
**Prompt hint**: "A professional emergency operations console design. Hot amber/red theme (#0A0A0F base, #FF6B2B accents). Top bar: 'TRI-2291 · Intersection 4B · 01:42 elapsed'. Left 40%: simulated camera feed (static image of construction zone, wide shot). Center 30%: vehicle telemetry panel (MPH: 0, heading arrow, alert status 'STOPPED · AWAITING INPUT'). Right 30%: incident queue with three items. Bottom: three large CTA buttons — HOLD (grey), REMOTE ASSIST (amber), ESCALATE (red). JetBrains Mono for all data fields."

---

### Screen 18 — MCPI Decision Made (Remote Assist chosen)
**Purpose**: Shows consequence of choosing Remote Assist — event record created.
**Key elements**: Console dims slightly, success notification "Event record created: Reason — Remote Guidance Initiated", event reason code visible (TRI-2291-RA), "This code will follow the incident to Triage" tooltip.
**Prompt hint**: "Same console screen, slightly dimmed. A success overlay card in the center: 'Event logged · TRI-2291-RA · Remote Assistance Initiated · 01:58'. Below: 'Your reason code is now the incident title in Triage Ops.' Subtle green border pulse around the event card. Continue button bottom right."

---

### Screen 19 — Seam 1 Visualization
**Purpose**: Animated handoff — shows the event record physically traveling from Ring 1 to Ring 2.
**Key elements**: Simplified orbital map, animated token moving from Ring 1 to Ring 2, Wayo narrating, incident title shown on token.
**Prompt hint**: "Simplified orbital map (two rings visible). An amber token dot labeled 'TRI-2291-RA' moves with a glowing trail from the inner ring to the middle ring. Wayo bottom-left: 'Your intervention just became someone else's workload. Watch.' Middle ring pulses as token arrives. 'Continue to Triage Ops →' button."

---

## Zone 2 — Triage Ops Audit Console (4 screens) ← DEMO PRIORITY

### Screen 20 — Zone 2 Entry
**Purpose**: Zone intro. Incident arrives in Triage queue.
**Prompt hint**: "Zone entry screen. Header badge: 'Zone 2 · Triage Ops'. F1 white/red console aesthetic. Wayo: calm, professional pose. Speech bubble: 'The incident just landed in your queue. Scrub the replay, classify what happened, and route it.' 'Open Console' CTA."

---

### Screen 21 — Triage Console (Default — incident loaded)
**Purpose**: Main audit interface. Central Zone 2 screen — demo priority.
**Key elements**: Wayo small top-right (observing). Top: incident header "TRI-2291-RA · Remote Assistance Initiated · In queue 04m". Left 50%: lidar point-cloud viewport (top-down 3D point cloud, rotating). Right-top 50%: three camera feed thumbnails (front, left, right). Right-bottom: Jog Dial control + frame counter + "Scrub the incident replay" instruction. Bottom: Classify panel (severity dropdown, root-cause dropdown, routing destination picker). "Submit Routing" button.
**Prompt hint**: "A professional incident review console. Dark F1 aesthetic (white panels, red accents on dark). Top header: incident ID, reason code from Zone 1, timestamp, queue position. Left 45%: a lidar point-cloud panel showing a top-down road scene with a figure (the construction flagger). Right-top 30%: three small camera thumbnails in a vertical stack. Right-bottom 25%: a large circular jog dial control (physical dial appearance with tick marks) and a frame scrubber timeline below it. Bottom strip: three form fields — Severity (dropdown), Root Cause (dropdown), Route To (radio: Annotation / Safety Review / Archive). Large 'Submit Routing' button. All data fields in JetBrains Mono."

---

### Screen 22 — Triage Console (Jog Dial Active — mid-scrub state)
**Purpose**: Shows the interface during active incident scrubbing.
**Key elements**: Lidar point cloud advanced to mid-replay, camera thumbnails updated, frame counter changed, jog dial rotated, marker line on scrubber timeline showing current position, a moment marker callout "Construction flagger enters frame" highlighted.
**Prompt hint**: "Same triage console, mid-scrub state. The lidar viewport shows a different frame (figure now closer, stop sign visible as a faint cluster of points). Camera thumbnails updated. Jog dial physically rotated ~45° clockwise. Frame counter reads '0847 / 2200'. A yellow marker flag on the timeline labeled 'Object enters confidence threshold'. The point cloud has one cluster highlighted in amber."

---

### Screen 23 — Triage Decision Made + Seam 2
**Purpose**: Routing submitted → consequence visible.
**Key elements**: Success state. Decision shown: Routed to Annotation queue. Confirmation card. Seam animation starts — event token moving to Ring 3.
**Prompt hint**: "Triage console post-submit success state. Center overlay card: 'Routed · TRI-2291-RA → Annotation Queue · Priority: High'. Below: 'Your routing just opened a clip in the Annotation workbench.' Orbital map inset bottom-right showing token moving from Ring 2 to Ring 3. 'Continue to Annotation →' button."

---

## Zone 3 — Annotation Workbench (4 screens)

### Screen 24 — Zone 3 Entry
**Prompt hint**: "Zone entry screen. Header: 'Zone 3 · Annotation'. Blue-violet theme. Wayo: curious/focused pose. Speech bubble: 'These are the frames I couldn't parse correctly. Your labels will teach me what I should have seen.' 'Open Workbench' CTA."

---

### Screen 25 — Annotation Workbench (Default)
**Purpose**: Main labeling interface. Simulates professional annotation tool.
**Key elements**: Top: frame from camera feed (construction zone still). Bounding box overlay tool active. Left: label taxonomy panel (Person, Vehicle, Sign, Flagger, Unknown). Right: label list (current session). Bottom: timeline scrubber (frame-level, narrower than Zone 2 dial). "Draw box" toggle + "Submit Labels" button.
**Prompt hint**: "A professional video annotation workstation. Blue-violet cool theme. Center 60%: a camera frame (road, construction zone, day). Bounding box drawing tool overlay (crosshair cursor visible). Left 20%: label taxonomy panel with 8 label categories, each with a colour swatch (Person: green, Vehicle: blue, Sign: yellow, Flagger: orange). Right 20%: session label list (currently empty — 'No labels yet'). Bottom: fine-grained frame scrubber timeline with frame number readout. 'Draw Bounding Box' toggle button active. 'Submit Labels' button bottom-right."

---

### Screen 26 — Annotation in Progress
**Purpose**: Shows two drawn bounding boxes with labels assigned.
**Key elements**: Camera frame with two boxes drawn — green box on construction worker (labeled "Flagger #1"), yellow dashed box on handheld stop sign (labeled "Sign · Regulatory"), confidence preview indicator.
**Prompt hint**: "Same annotation workbench. Camera frame now has two drawn bounding boxes: a solid green box around a construction worker labeled 'Flagger #1', a dashed yellow box around a small hand-held stop sign labeled 'Sign · Regulatory'. Right panel: two label rows filled in with color indicators. Confidence impact preview: 'These labels will raise STOP sign detection from 0.17 → est. 0.82'. Timeline shows current frame highlighted."

---

### Screen 27 — Labels Submitted + Act 4 Preview
**Purpose**: Consequence state — labels sent to model update queue, preview of corrected drive.
**Prompt hint**: "Annotation workbench post-submit. Center success card: 'Labels submitted · 2 objects tagged · Queued for model update cycle'. Below: a small preview frame inset showing Wayo at the same intersection but now proceeding confidently (green confidence ring around the car). Caption: 'Next training cycle: Wayo will see what you saw.' 'Continue to Outcome →' button."

---

## Acts 4 & 5 — Outcome (3 screens)

### Screen 28 — Act 4 — Corrected Drive
**Purpose**: Wayo navigates the same construction zone correctly.
**Key elements**: Camera/lidar replay of the intersection, bounding boxes visible on stop sign (now high confidence 0.89), Wayo character happy state, speech bubble "I see the sign now. I know what to do."
**Prompt hint**: "Outcome cinematic screen. Split: left = camera replay frame with bounding boxes, new STOP sign detection at 0.89 confidence (green box). Right = top-down lidar with confident trajectory arc proceeding through the zone. Wayo: happy, confident state. Speech bubble: 'Same intersection. I see it now. Your work did this.' Subtle green glow overlay."

---

### Screen 29 — Act 5 — Trace-back (Full Chain)
**Purpose**: Shows the whole decision chain from the learner's session.
**Key elements**: Horizontal timeline from left to right: MCPI decision (Remote Assist, reason code) → Triage routing (Annotation, priority High) → Annotation labels (Flagger, Sign) → Model update → Corrected drive confidence. Learner's actual choices embedded in the chain.
**Prompt hint**: "A final retrospective screen. Full-width horizontal chain diagram: five nodes connected by glowing arrows. Node 1: 'You intervened · Remote Assist · TRI-2291-RA'. Node 2: 'You routed → Annotation · High Priority'. Node 3: 'You labeled · Flagger + Sign'. Node 4: 'Model update queued'. Node 5: 'Wayo: 0.89 confidence next pass'. Each node glows with its ring color. Wayo stands at Node 5 in happy state. Above: 'Your decisions. One incident. The whole loop.'"

---

### Screen 30 — Assessment (3–4 items)
**Purpose**: Auto-scored knowledge check (tests the map, not job skill).
**Key elements**: 3 multiple-choice questions, one per role handoff. Clean card layout, no score shown until submit.
**Prompt hint**: "A clean assessment screen. White surface cards on dark background. Question 1 of 3: 'Who owns the incident at T+0 seconds?' with four radio options. Progress dots across top. No score visible. 'Check Answer' button. Wayo small, observing pose, top-right."

---

### Screen 31 — Results / Completion
**Purpose**: Score display + SCORM completion trigger.
**Key elements**: Score (e.g., 2/3), badge/certificate graphic, Wayo celebrating, completion message, "Return to Hub" button.
**Prompt hint**: "Completion screen. Dark background, accent glow. Center: a circular badge graphic 'Ecosystem Navigator' with a Wayo icon. Score: '2 / 3 correct · Ecosystem Comprehension'. Below: two lines of feedback. Wayo: happy, jumping or celebrating pose. 'Return to Hub' and 'Retake' buttons. Feels like a mission debrief, not a grade."

---

### Screen 32 — Hub (Post-Module Unlocked State)
**Purpose**: Return to Hub after completion — all zones now show unlocked/visited state.
**Key elements**: Same as Screen 02 but all ring portals marked "Visited", incident token now at the outer edge, Hub shows completion aura, "Explore again" invitation.
**Prompt hint**: "Orbital map, post-completion. All three rings glowing fully. Zone entry portals show a small checkmark. Incident token dot now resting at the outer edge of Ring 3 with a subtle glow. Overall scene has a warmer, satisfied tone. Wayo at center has a calm/proud animation state. 'Explore again' text floats softly."

---

## Generation Order Summary

| # | Screen | Act/Zone | Priority |
|---|---|---|---|
| Foundation | DESIGN.md brand tokens + Wayo SVG states | — | **1st** |
| 01 | Start Gate | Act 1 | Demo |
| 02 | Hub (default) | Nav | Demo |
| 03 | Act 1 Dialogue | Act 1 | Demo |
| 20 | Zone 2 Entry | Zone 2 | **Demo** |
| 21 | Triage Console (default) | Zone 2 | **Demo** |
| 22 | Triage mid-scrub | Zone 2 | **Demo** |
| 23 | Triage decision + seam | Zone 2 | **Demo** |
| 04 | Lesson A title | Lesson A | Full |
| 05 | Sensor Map (default) | Lesson A | Full |
| 06 | Sensor Detail (lidar) | Lesson A | Full |
| 07 | Lesson B title | Lesson B | Full |
| 08–11 | Pipeline steps 1–4 | Lesson B | Full |
| 12–15 | Lesson C + role toggles | Lesson C | Full |
| 16–19 | Zone 1 MCPI console | Zone 1 | Full |
| 24–27 | Zone 3 Annotation | Zone 3 | Full |
| 28–32 | Acts 4–5, Assessment, Results, Hub-end | Outro | Full |

**Demo-priority screens (minimum viable set for stakeholder approval):** 01, 02, 03, 20, 21, 22, 23 = **7 screens + brand foundation.**
**Full module:** 32 screens.

---

## Model routing for Open Design work

| Task | Combo | Why |
|---|---|---|
| Generate brand DESIGN.md from screenshots/refs | `od-design` | Vision extraction — needs multimodal |
| Generate screen layouts | `od-design` | Same — iterates against visual references |
| Write lesson JSON content (bulk) | `bulk-gen` | 5 varied models produce variants, then normalise |
| Classify/tag sensor types for Lesson A JSON | `classify` | Fixed-bucket labelling, needs determinism |
| Architecture / schema decisions | `cc-deep` (deliberately) | One question, shapes everything; don't use during coding |
| All implementation coding | `cc-main` (current session) | Default — stay here |

> **Stay in `cc-main` for all coding work.** Switch to `od-design` only in the Open Design adapter, not in Claude Code directly. Never route design generation through `cc-deep` (no vision and burns Opus on typing).