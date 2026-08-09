# Waymo Training Module — Cinematic Scene Inventory for Open Design

> **Design pivot:** This replaces the previous 32-screen "console UI" inventory.
> The module is now a Pixar-style short film — warm nighttime world, expressive Wayo character, composed scenes, one tap to advance through moments.
> **Total scenes: 26** (down from 32 — assessment woven into Act 5, no separate screens).

---

## Generation Order

1. **Foundation:** DESIGN.md brand tokens → Wayo SVG states (6) → Environment key art (4 backgrounds)
2. **Demo Set (7 scenes):** 01 → 02 → 03 → 16 → 17 → 22 → 23
3. **Full Module (26 scenes):** All

---

## Foundation — Generate First

### Wayo Character (6 states)
Generate one base SVG car (stylised Waymo vehicle — white body, roof sensor dome, red accent stripe, soft rounded proportions, ~2:1 aspect ratio side view). Export 6 variants:

| # | File | Headlight colour | Body pose | When used |
|---|---|---|---|---|
| 1 | `wayo-idle.svg` | `#e8f4fd` (soft white-blue) | Neutral, slight suspension bob | Hub, waiting |
| 2 | `wayo-curious.svg` | `#ffe0b2` (warm amber) | Lean forward 2°, dome slight tilt | Introducing lessons |
| 3 | `wayo-thinking.svg` | `#ffe0b2` (amber, gentle pulse) | Slight tilt, dome spin-ready | Pipeline explanations |
| 4 | `wayo-concerned.svg` | `#ffcc80` (deep amber) | Lean back 1°, lowered stance | Low confidence |
| 5 | `wayo-alert.svg` | `#ff8a65` (orange-red) | Tense, dome fast | Live incident |
| 6 | `wayo-happy.svg` | `#a5d6a7` (soft green) | Slightly lifted, bounce-ready | Success/corrected drive |

**Prompt hint:** "Create a side-view SVG illustration of a Waymo self-driving car as a warm, friendly character. White body, roof-mounted sensor dome, one red accent stripe. Headlights are expressive — they glow in different colours for different emotions. Soft, slightly rounded proportions. Not cartoonish — the real car, gently anthropomorphised. Clean vector style, suitable for animation. No face on the windshield — the headlights ARE the expression."

### Environment Backgrounds (4 key art pieces)
1. `bg-garage.jpg` — Warm garage bay, overhead amber lights, tool cabinets, diagnostic screens — Lesson A
2. `bg-lab.jpg` — Clean control room, blue-grey walls, glowing data screens — Lesson B
3. `bg-city-night.jpg` — City skyline at night, warm light pools, distant windows, road in foreground — Lesson C & Hub
4. `bg-construction-zone.jpg` — Road at night, construction barriers, work lights, a distant flagger figure — Zone 1

---

## Act 1 — Welcome (3 scenes)

### Scene 01 — Title Card
**Purpose:** First impression. No UI. Just the world and Wayo.
**Composition:** Night city skyline background. Wayo (idle) parked on a quiet road, headlights softly glowing. Title text fades in: "One intersection. Three decisions." Below: "Begin."
**Wayo state:** idle
**Transition:** Tap → Wayo drives right, city crossfades to a wider view.
**Prompt hint:** "A cinematic title card. Night city skyline in warm blues and amber. A white Waymo self-driving car is parked on a quiet road in the foreground, headlights softly glowing white-blue. Car is side-view, facing right. Above, elegant rounded text: 'One intersection. Three decisions.' Below the car: a single 'Begin' button, warm amber, softly glowing. Feels like the opening shot of an animated short film. No UI chrome, no nav — just the world and the car."

### Scene 02 — Hub (City Overlook)
**Purpose:** Establish the world. Show where the journey will go. Three glowing markers in the distance.
**Composition:** Wide city overlook. Wayo (idle) parked foreground left, looking out at the city. The city below has three distinct glowing areas: a construction zone with amber work lights (Live), a building with blue screen glow (Response), a bright studio with clean white light (Learning). Wayo's speech bubble: "This city never sleeps. And sometimes, I need help keeping it moving."
**Wayo state:** idle, then curious as it "looks" at the zones
**Progress:** Three subtle dots at screen bottom — first dot lit.
**Transition:** Tap → Wayo turns, drives right, garage scene slides in.
**Prompt hint:** "A wide cinematic shot from a hillside overlooking a city at night. Warm amber and blue tones. Foreground left: a white Waymo car (side view, facing right) is parked, looking out over the city. Its headlights glow soft white-blue. Down in the city, three areas glow: left = amber construction lights, centre = blue screen glow from a building, right = bright clean white light from a studio. Speech bubble from Wayo: 'This city never sleeps. And sometimes, I need help keeping it moving.' Feels like the establishing shot of a Pixar film. Below the scene, three subtle dots — first one lit."

### Scene 03 — Act 1 Dialogue (How I Think)
**Purpose:** Wayo explains the autonomy loop — Sense → Perceive → Predict → Plan → Act — and the moment confidence drops.
**Composition:** Night road. Wayo (curious) foreground, facing the learner. Above and behind Wayo, five floating icons appear one by one as they explain: an eye (Sense), a magnifying glass (Perceive), a branching path (Predict), a steering wheel (Plan), a green check (Act). Each lights up as Wayo's speech bubble narrates. Fifth bubble: "But sometimes... I'm not sure what I'm looking at." The icons dim. A new image appears: a construction flagger holding a hand-held STOP sign, blurred, with a glowing `?` overlay and a confidence ring showing `0.17` in dim amber. Wayo's headlights shift from curious white-blue to concerned amber.
**Wayo state:** curious → concerned (headlights shift mid-scene)
**Transition:** Tap → crossfade to garage.
**Prompt hint:** "A night road scene. Foreground centre: white Waymo car (side view, facing viewer slightly), headlights glowing warm white-blue. Above the car, five small floating icons in a horizontal row, each with a soft amber glow: eye, magnifying glass, branching path, steering wheel, checkmark. Speech bubble from Wayo explaining each. As the explanation reaches 'But sometimes I'm not sure,' the icons dim and a new image fades in above: a blurry illustration of a construction flagger holding a hand-held STOP sign, with a '?' overlay and a circular gauge showing '0.17' in dim amber. Wayo's headlights shift to warm amber. Warm, cinematic, no visible UI."

---

## Lesson A — The Garage (3 scenes)

### Scene 04 — Lesson A Intro
**Purpose:** Enter the garage. Wayo introduces their sensors.
**Composition:** Warm garage interior. Wayo (curious) parked on the garage floor, facing a diagnostic bay. Tools and screens around. Speech bubble: "Before I go out there, let me show you how I see the world."
**Wayo state:** curious
**Transition:** Tap → camera "zooms" to the top-down sensor view.
**Prompt hint:** "A warm garage bay at night. Overhead amber lights. A white Waymo car parked on the clean garage floor, facing slightly right, looking toward a diagnostic bay with glowing blue screens. Tools and cables neatly arranged. The car's headlights glow warm amber. Speech bubble: 'Before I go out there, let me show you how I see the world.' Warm, inviting, slightly technical but not cold."

### Scene 05 — Sensor Map
**Purpose:** Top-down car silhouette with sensor rings. Interactive — tap each ring to learn.
**Composition:** Clean garage floor, top-down view. Wayo from above, showing four concentric sensor rings (Lidar outer teal, cameras in amber arcs, radar in short red arcs, GPS/IMU dot at centre). Four floating labels. Tap a ring → ring glows brighter, info panel slides in from right with specs and a "How it helped / how it failed" callout about the construction flagger incident.
**Wayo state:** idle (top-down view — headlights not visible, dome visible)
**Interaction:** Tap zones on screen. Default state: all rings dim, info panel shows "Tap a sensor ring to learn more."
**Prompt hint:** "Top-down view of a white Waymo car on a clean garage floor. The car has four concentric dashed rings radiating outward: outermost teal (Lidar, labelled '200m range'), middle with 8 amber arcs (Cameras), inner short red arcs (Radar), centre dot (GPS/IMU). Four floating labels at ring edges. Right side: a dark glass panel with 'Tap a sensor to learn more.' Clean, technical but warm — the garage setting keeps it grounded. When a ring is tapped, it glows brighter and the right panel fills with specs + a yellow callout box about the construction flagger incident."

### Scene 06 — Sensor Detail (Lidar, after tap)
**Purpose:** The expanded state showing what happens when Lidar is tapped.
**Composition:** Same top-down view but Lidar ring fully lit teal. Right panel filled: "Lidar · 360° · 200m range" header, body text, a small wireframe point-cloud thumbnail showing a road with a figure, and a yellow callout: "At 3 metres, the flagger's STOP sign was just a cluster of points I couldn't classify."
**Prompt hint:** "Same top-down garage scene. Lidar ring is now fully lit teal. Right glass panel now filled with content: header 'Lidar · 360° · 200m range' in JetBrains Mono, body text in Nunito Sans, a small wireframe point-cloud thumbnail showing a road with a figure, and a yellow callout box: 'At 3 metres, the flagger's STOP sign was just a cluster of points I couldn't classify.' Navigation arrows at panel bottom."

---

## Lesson B — The Lab (5 scenes)

### Scene 07 — Lesson B Intro
**Purpose:** Transition to the control room. Wayo introduces the perception pipeline.
**Composition:** Clean blue-grey control room. Wayo (curious) parked facing a wall of glowing data screens. Speech bubble: "Every decision I make follows five steps. Let me walk you through them — with the same incident you'll see later."
**Wayo state:** curious
**Prompt hint:** "A clean, calm control room. Blue-grey walls, a wall of softly glowing data screens. A white Waymo car parked facing the screens, headlights warm amber. Speech bubble: 'Every decision I make follows five steps. Let me walk you through them — with the same incident you'll see later.' Feels like a NASA control room made warm."

### Scene 08 — Pipeline: Sense
**Purpose:** Stage 1 — raw sensor data from the construction flagger incident.
**Composition:** Same control room. One screen now dominant — showing raw lidar point cloud (wireframe top-down of road + figure) and 3 small camera thumbnails. Five pipeline nodes across top, leftmost "Sense" highlighted amber. Wayo (talking) small, foreground. Stage counter "1 / 5."
**Wayo state:** curious
**Prompt hint:** "Control room interior. A white Waymo car small in foreground, headlights warm amber. Above, a dominant screen showing a lidar wireframe point-cloud (top-down road scene with a figure) and three small camera thumbnails beside it. Across the top, five small icons: eye (lit amber), magnifying glass (dim), branching path (dim), steering wheel (dim), checkmark (dim). Stage counter top-right: '1 / 5'. Speech bubble from Wayo: 'I receive raw data from 29 sensors. At this moment, I see a person. And something in their hand.'"

### Scene 09 — Pipeline: Perceive
**Purpose:** The confidence drop moment. Classification stage.
**Composition:** Screen now shows camera feed. Bounding boxes overlaid: green box on construction worker (Person 0.98), weak dashed red box on handheld STOP sign (??? 0.17). Detection table on side panel, stop-sign row highlighted. "Perceive" icon lit red-amber. Wayo's headlights shift concerned. Speech bubble: "I see the person clearly. But the thing in their hand... I don't know what it is."
**Wayo state:** concerned (headlights deep amber)
**Prompt hint:** "Same control room. Screen now shows a camera feed frame of a road at night with a construction flagger. Green bounding box on the person (label: 'Person 0.98'). Weak dashed red box on a small hand-held STOP sign (label: '??? 0.17'). Side panel shows detection table with the stop-sign row highlighted red. Top pipeline: 'Perceive' icon lit red-amber. White Waymo car foreground, headlights now deep amber (concerned). Speech bubble: 'I see the person clearly. But the thing in their hand... I don't know what it is.' Stage counter: '2 / 5'."

### Scene 10 — Pipeline: Predict → Plan
**Purpose:** The planner oscillates between yield and proceed.
**Composition:** Screen splits: left shows two overlapping trajectory fans (one yielding, one proceeding). Right shows an oscillating bar labelled "Yield ↔ Proceed." Pipeline icons Predict + Plan both half-lit amber. Wayo's headlights flicker amber. Speech bubble: "I can't decide. The numbers are too close. So I do the only safe thing."
**Wayo state:** concerned (flickering amber)
**Prompt hint:** "Control room. Screen split: left half shows a top-down road diagram with two overlapping coloured trajectory arcs — one pulling to the side (yellow, YIELD), one continuing forward (green, PROCEED). Right half shows an oscillating bar chart labelled 'Decision: Yield 0.48 ↔ Proceed 0.52' with the bar bouncing between near-equal values. Top pipeline: Predict and Plan icons both half-lit amber. White Waymo car foreground, headlights flickering amber. Speech bubble: 'I can't decide. The numbers are too close. So I do the only safe thing.'"

### Scene 11 — Pipeline: Act
**Purpose:** Car stops, asks for help.
**Composition:** Screen shows top-down map with car stopped at intersection, amber alert beacon above car icon, dashed minimal-risk zone. "Act" icon lit blue-white. Alert card on side: "TRI-2291 · Low-confidence object · Human assist requested." Wayo's headlights settle to calm amber. Speech bubble: "I stopped. I asked for help. This isn't failure — this is how I'm designed. And now... you."
**Wayo state:** calm idle (amber settling)
**Prompt hint:** "Control room. Screen shows a top-down map with the car stopped at an intersection, a pulsing amber beacon above the car icon, and a dashed box showing the minimal-risk stopping zone. 'Act' icon lit blue-white. Side: an alert card reading 'TRI-2291 · Low-confidence object · Human assist requested.' White Waymo car foreground, headlights settling to calm amber. Speech bubble: 'I stopped. I asked for help. This isn't failure — this is how I'm designed. And now... you.'"

---

## Lesson C — The Overlook (4 scenes)

### Scene 12 — Lesson C Intro
**Purpose:** Return to the city overlook. Wayo introduces the three rings.
**Composition:** Back at the city overlook. Wayo (curious) foreground. The city below now has three labelled rings overlaid: "Live · MCPI" (amber), "Response · Triage Ops" (F1 red), "Learning · Annotators" (blue-violet). Speech bubble: "Three teams catch what I miss. Each one needs the one before it. Let me show you what happens if one disappears."
**Wayo state:** curious
**Prompt hint:** "City overlook at night. White Waymo car foreground, headlights warm amber. City below has three glowing ring overlays: innermost amber ('Live · MCPI'), middle F1 red/white ('Response · Triage Ops'), outer blue-violet ('Learning · Annotators'). Speech bubble: 'Three teams catch what I miss. Each one needs the one before it. Let me show you what happens if one disappears.' Warm, cinematic."

### Scene 13 — All Rings Healthy
**Purpose:** Full ecosystem with token flowing outward.
**Composition:** Three rings all glowing. An animated orange incident token (small glowing dot) moves from centre outward, passing through each ring. Small role icons at each ring. Three buttons below: "Remove MCPI," "Remove Triage Ops," "Remove Annotators" — styled as gentle taps, not warning buttons.
**Prompt hint:** "Same city overlook. Three rings all glowing fully. A small glowing orange dot (incident token) moves from centre outward, passing through each ring one by one. Each ring has a small icon and label near it. Three gentle tap-target buttons at the bottom: 'Remove MCPI,' 'Remove Triage Ops,' 'Remove Annotators' — styled as exploration options, not danger buttons. Wayo small, observing."

### Scene 14 — Remove MCPI
**Purpose:** Shows consequence cascade when Ring 1 is missing.
**Composition:** Ring 1 (Live) breaks — greyed out with broken-chain icon. Incident token stuck at centre. Callout card: "No MCPI → car stays stopped → no incident record → no routing." Rings 2 and 3 dim. "Restore" button glows amber.
**Prompt hint:** "Same city overlook. Innermost ring (Live) is now greyed out with a broken-chain icon overlay. The incident token is stuck at centre, blinking red. A callout card floats: 'No MCPI → car stays stopped → no incident record → no routing.' The other two rings are dim. A 'Restore' button glows amber below. Wayo's headlights are dim amber."

### Scene 15 — Remove Triage Ops
**Purpose:** Shows what breaks when Ring 2 is missing.
**Composition:** Ring 2 (Response) broken. Token stuck between Ring 1 and Ring 3. Callout: "No Triage Ops → annotators get wrong clips → model trains on bad data." Restore button.
**Prompt hint:** "Same city overlook. Middle ring (Response) greyed out, broken-chain. Token stuck between ring 1 and ring 3 with no path. Callout card: 'No Triage Ops → annotators get wrong clips → model trains on bad data.' Restore button. Wayo's headlights dim amber."

---

## Zone 1 — Live Incident (3 scenes)

### Scene 16 — Zone 1 Entry
**Purpose:** Arrive at the construction zone. Wayo hands off to the learner.
**Composition:** Night road scene. Construction barriers, work lights. Wayo (alert) foreground, headlights orange-red. In the distance, a flagger figure holding a sign, blurred. Speech bubble: "This is happening right now. The car is stopped. A rider is waiting. What do you want me to do?"
**Wayo state:** alert
**Three options — physical objects in the scene, not buttons:**
1. A radio handset glowing amber → REMOTE ASSIST
2. A "HOLD" sign on a barrier → HOLD POSITION
3. A red phone → ESCALATE TO SAFETY DRIVER
**Prompt hint:** "A night road construction zone. Amber work lights. Construction barriers. A white Waymo car foreground, headlights glowing orange-red (alert). In the distance, a blurry figure of a flagger holding something. Speech bubble from Wayo: 'This is happening right now. The car is stopped. A rider is waiting. What do you want me to do?' Below, three physical objects the learner can tap: a glowing amber radio handset (REMOTE ASSIST), a yellow 'HOLD' sign on a barrier (HOLD POSITION), a red emergency phone (ESCALATE). Feels like a scene, not a form."

### Scene 17 — Decision Made (Remote Assist)
**Purpose:** Consequence of choosing Remote Assist.
**Composition:** Same scene. The radio handset glows brighter. The other two options dim. A warm confirmation glow spreads across the scene. Wayo's headlights shift to soft amber (calm). An event card slides up from the bottom: "Event logged · TRI-2291-RA · Remote Assistance Initiated." Below: "Your reason code is now the incident title in Triage Ops." Continue arrow.
**Wayo state:** calm (amber settling from alert)
**Prompt hint:** "Same construction zone scene. The radio handset glows warmly, the other two options are dimmed. A warm amber confirmation glow spreads across the scene. Wayo's headlights shift from alert orange to calm amber. A small card slides up from the bottom: 'Event logged · TRI-2291-RA · Remote Assistance Initiated.' Subtext: 'Your reason code is now the incident title in Triage Ops.' Continue arrow bottom-right. Warm, satisfying."

### Scene 18 — Seam 1 (Token Travel)
**Purpose:** Show the event travelling from Ring 1 to Ring 2.
**Composition:** Simplified two-ring overlay on the city view. An amber token dot labelled "TRI-2291-RA" travels from the inner ring to the middle ring with a glowing trail. Middle ring pulses as it arrives. Wayo small, observing. "Continue to Triage Ops →"
**Prompt hint:** "Simplified city view with two glowing rings overhead. An amber token dot labelled 'TRI-2291-RA' moves with a glowing trail from the inner ring to the middle ring. Middle ring pulses warmly as the token lands. A small white Waymo car foreground, observing. Text: 'Continue to Triage Ops →'"

---

## Zone 2 — Triage Ops (4 scenes) ← DEMO PRIORITY

### Scene 19 — Zone 2 Entry
**Purpose:** Arrive at the investigation room. Incident lands in the queue.
**Composition:** Dark, focused investigation room. Wayo (curious) small, foreground right. A large console desk dominates the room — dark surface, glowing screens. On the main screen, a notification card: "TRI-2291-RA · Remote Assistance Initiated · In queue 04m." Speech bubble: "The incident just landed. Scrub the replay. Classify what happened. Route it to the right team."
**Wayo state:** curious
**Prompt hint:** "A dark, focused investigation room. A large console desk with glowing screens dominates the scene. On the main screen, a notification card: 'TRI-2291-RA · Remote Assistance Initiated · In queue 04m.' A white Waymo car small in the foreground right, headlights warm amber, observing. Speech bubble: 'The incident just landed. Scrub the replay. Classify what happened. Route it to the right team.' Feels like entering a detective's workspace — focused, not cold."

### Scene 20 — Triage Console (Default)
**Purpose:** The investigation workspace.
**Composition:** The console desk now shows the full triage layout. Left third: a lidar wireframe point-cloud viewport (top-down road scene). Centre: three camera thumbnails in a vertical stack showing different angles of the incident. Right: an incident metadata card (ID, time, location). Below the screens, across the full width: a large physical timeline scrubber — a glowing horizontal bar with tick marks at key moments, a circular scrub handle glowing amber, and a frame counter in JetBrains Mono ("0001 / 2200"). Below the timeline: three routing cards face-down on the desk — "Annotation," "Safety Review," "Archive." They'll be flipped when the learner chooses. Wayo small, top-right, observing.
**Wayo state:** idle (observing)
**Interaction:** Learner drags the scrub handle left/right. Scrubbing updates the lidar view and camera thumbnails in real time.
**Default state:** timeline handle at far left, routing cards face-down, "Scrub the incident replay" instruction glowing softly above the timeline.
**Prompt hint:** "A dark investigation room. A large console desk fills the scene. Left: a wireframe lidar point-cloud viewport showing a top-down road with a figure. Centre: three small camera thumbnail frames stacked vertically. Right: an incident metadata card (TRI-2291, timestamp, location) in JetBrains Mono. Below the screens, full width: a large physical-looking timeline scrubber — a glowing amber bar with tick marks, a circular scrub handle, and a frame counter '0001 / 2200.' Below the timeline: three routing cards face-down on the desk: 'Annotation,' 'Safety Review,' 'Archive.' A soft glowing instruction above the timeline: 'Scrub the incident replay.' A white Waymo car small, top-right, headlights soft white-blue, observing. Feels like a real investigation workspace — physical, tactile, not a form."

### Scene 21 — Triage Mid-Scrub
**Purpose:** Timeline at the critical moment — the flagger enters the confidence threshold.
**Composition:** Same room, same console. Scrub handle now ~40% into the timeline. Frame counter reads "0847 / 2200." Lidar viewport updated — the figure is closer, a faint cluster of points now visible at the hand position (the STOP sign barely registering). Camera thumbnails updated. A yellow marker flag on the timeline at position 0847, labelled "Object enters confidence threshold." The lidar point cloud has one cluster highlighted in amber. Wayo's headlights subtly shift to amber.
**Prompt hint:** "Same investigation room, same console. The scrub handle has been dragged to about 40% across the timeline. Frame counter reads '0847 / 2200.' The lidar viewport now shows the figure closer, with a faint amber-highlighted cluster of points at the hand position. Camera thumbnails updated. A yellow flag marker on the timeline at position 0847, labelled 'Object enters confidence threshold.' Wayo's headlights now subtle amber. The scene feels tenser — this is the critical moment."

### Scene 22 — Triage Decision + Seam 2
**Purpose:** Routing submitted. Consequence visible.
**Composition:** One of the three routing cards is now face-up and glowing (Annotation). The other two are face-down, dimmed. A confirmation card slides up: "Routed · TRI-2291-RA → Annotation Queue · Priority: High." Below: "Your routing just opened a clip in the Annotation workbench." The orbital map appears as a small overlay in the top-right corner, showing the token moving from Ring 2 to Ring 3. Wayo's headlights soft green.
**Wayo state:** happy (soft green)
**Prompt hint:** "Same investigation room. One routing card is now face-up and glowing on the desk: 'Annotation.' The other two are dimmed face-down. A confirmation card slides up from bottom: 'Routed · TRI-2291-RA → Annotation Queue · Priority: High.' Subtext: 'Your routing just opened a clip in the Annotation workbench.' In the top-right corner, a small inset shows the orbital map with a token moving from Ring 2 to Ring 3. Wayo small, headlights now soft green. 'Continue to Annotation →' button. Satisfying, clear cause-and-effect."

---

## Zone 3 — Annotation Studio (3 scenes)

### Scene 23 — Zone 3 Entry
**Purpose:** Arrive at the clean annotation studio. Clip is waiting.
**Composition:** Bright, clean studio — the only light-coloured room in the module (signals: we're building something new here). Wayo (curious) foreground. A large clean work surface with a camera frame displayed on a screen. Speech bubble: "These are the frames I couldn't parse. Your labels will teach me what I should have seen."
**Wayo state:** curious
**Prompt hint:** "A bright, clean studio — white walls, soft daylight-balanced light. This room feels different from the dark night scenes — it's about building and improving. A white Waymo car foreground, headlights warm amber. On the main work surface, a large screen shows a paused camera frame (road, construction zone). Speech bubble: 'These are the frames I couldn't parse. Your labels will teach me what I should have seen.' Clean, calm, focused."

### Scene 24 — Annotation Workbench (Default)
**Purpose:** The labeling workspace.
**Composition:** Same bright studio. The central screen shows the camera frame. A bounding box drawing tool is active — subtle crosshair cursor over the frame. Left side: a vertical label taxonomy panel with coloured swatches (Person: green, Vehicle: blue, Sign: yellow, Flagger: orange). Right side: label list panel (currently showing "No labels yet"). Below: a fine-grained frame scrubber timeline with frame numbers. A "Draw Bounding Box" toggle is active. Wayo small, top-right, observing. Instruction: "Draw a box around the flagger. Then draw one around the sign."
**Wayo state:** idle (observing)
**Prompt hint:** "A bright, clean annotation studio. Centre screen shows a paused camera frame (night road, construction zone, flagger figure). A subtle crosshair cursor for drawing boxes. Left panel: label taxonomy with coloured swatches (Person: green, Vehicle: blue, Sign: yellow, Flagger: orange). Right panel: 'No labels yet' placeholder. Below: a fine frame-by-frame scrubber timeline with frame numbers. A soft 'Draw Bounding Box' toggle glowing. Small white Waymo car top-right, observing. Instruction text softly: 'Draw a box around the flagger. Then draw one around the sign.' Clean, professional, calm."

### Scene 25 — Annotation Complete + Act 4 Preview
**Purpose:** Labels submitted. Preview of what this enables.
**Composition:** Camera frame now has two drawn boxes: solid green box around flagger (labelled "Flagger #1"), dashed yellow box around hand-held STOP sign (labelled "Sign · Regulatory"). Right panel shows two completed label rows. A confidence impact preview card slides up: "STOP sign detection: 0.17 → est. 0.82." Below it, a small preview inset: the same intersection, but now in daylight. Wayo driving through confidently. Caption: "Next training cycle: Wayo will see what you saw." Wayo's headlights soft green. Submit confirmation card: "Labels submitted · 2 objects tagged."
**Wayo state:** happy (soft green)
**Prompt hint:** "Same bright annotation studio. The camera frame now has two drawn bounding boxes: solid green around the flagger (labelled 'Flagger #1'), dashed yellow around the hand-held STOP sign (labelled 'Sign · Regulatory'). Right panel shows two completed label rows with colour indicators. A confidence impact card slides up: 'STOP sign detection: 0.17 → est. 0.82.' Below it, a small preview inset showing the same intersection in daylight with a confident green trajectory arc — Wayo driving through. Caption: 'Next training cycle: Wayo will see what you saw.' Wayo's headlights soft green. Success card: 'Labels submitted · 2 objects tagged.' 'Continue →'"

---

## Acts 4 & 5 — Outcome (4 scenes)

### Scene 26 — Corrected Drive
**Purpose:** Wayo navigates the same intersection, now in daylight, with high confidence.
**Composition:** Same intersection, but bright day. Wayo (happy) driving through smoothly. Camera view shows bounding box on the STOP sign at 0.89 confidence (green box, solid). Lidar view shows a confident trajectory arc (green). Speech bubble: "Same intersection. I see the sign now. You taught me that."
**Wayo state:** happy
**Prompt hint:** "The same intersection, but in bright daylight. A white Waymo car drives through smoothly, headlights soft green. The camera view shows a solid green bounding box around the handheld STOP sign, labelled 'Sign · Regulatory · 0.89.' A top-down lidar inset shows a confident green trajectory arc through the intersection. Speech bubble: 'Same intersection. I see the sign now. You taught me that.' Warm, triumphant, earned."

### Scene 27 — Trace-back Chain (with Assessment woven in)
**Purpose:** The full decision chain, and 3 questions asked by Wayo in-scene.
**Composition:** Back at the city overlook. A full-width horizontal chain floats above the city: five nodes connected by glowing arrows. The learner's actual choices populate the nodes. Wayo (curious) foreground. As Wayo narrates each node, they pause and ask one question. Three questions total, each answered by tapping one of three objects that appear in the scene.
**Node flow:** "You intervened" → "You routed" → "You labeled" → "Model updated" → "I learned"
**Three questions woven in:**
1. At Node 1: "Who owned this incident the moment I stopped?" → Tap: MCPI badge / Triage Ops badge / Annotator badge
2. At Node 3: "What did the next team need from your labels?" → Tap: The routing decision / The bounding boxes / The timestamps
3. At Node 5: "Where does this end up?" → Tap: A report / A model update / A driver alert
**Wayo state:** curious, then happy as answers are given
**Prompt hint:** "City overlook at night. A glowing horizontal chain of five nodes floats above the city: 'You intervened' → 'You routed' → 'You labeled' → 'Model updated' → 'I learned.' Each node shows the learner's actual choice. A white Waymo car foreground, headlights warm amber. As Wayo narrates each node, a question appears with three physical object choices to tap. The scene is warm, reflective — not a quiz, a conversation. Three questions embedded in the flow."

### Scene 28 — Results + Completion
**Purpose:** Score + certificate moment.
**Composition:** Same overlook. Wayo (happy, soft green headlights) centre foreground. Above, a soft badge/certificate graphic appears: "Ecosystem Navigator" with a small Wayo icon. Score shown gently: "3 of 3" (or "2 of 3") — "You understand the loop." Two lines of feedback. A "Return to Hub" and "Experience again" option. SCORM completion fires on this scene.
**Waymo state:** happy
**Prompt hint:** "City overlook, warm and celebratory. A white Waymo car centre foreground, headlights soft green, body slightly lifted (happy). Above, a circular badge graphic floats softly: 'Ecosystem Navigator' with a small car icon. Score: '3 of 3 · You understand the loop.' Below, warm feedback text. Two options: 'Return to Hub' and 'Experience again.' Feels like the end credits of a short film — warm, earned, satisfying. No harsh 'PASS/FAIL.'"

---

## Scene Count Summary

| # | Scene | Zone | Demo? |
|---|---|---|---|
| Foundation | DESIGN.md tokens + Wayo 6 states + 4 backgrounds | — | ✓ |
| 01 | Title Card | Act 1 | ✓ |
| 02 | Hub (City Overlook) | Act 1 | ✓ |
| 03 | Act 1 Dialogue (How I Think) | Act 1 | ✓ |
| 04 | Lesson A Intro (Garage) | Lesson A | |
| 05 | Sensor Map (Top-down) | Lesson A | |
| 06 | Sensor Detail (Lidar) | Lesson A | |
| 07 | Lesson B Intro (Control Room) | Lesson B | |
| 08 | Pipeline: Sense | Lesson B | |
| 09 | Pipeline: Perceive (Confidence Drop) | Lesson B | |
| 10 | Pipeline: Predict → Plan (Oscillation) | Lesson B | |
| 11 | Pipeline: Act (Stop + Request Help) | Lesson B | |
| 12 | Lesson C Intro (Overlook) | Lesson C | |
| 13 | All Rings Healthy | Lesson C | |
| 14 | Remove MCPI | Lesson C | |
| 15 | Remove Triage Ops | Lesson C | |
| 16 | Zone 1 Entry (Construction Zone) | Zone 1 | ✓ |
| 17 | Decision Made + Seam 1 | Zone 1 | |
| 18 | Token Travel (Seam visualisation) | Seam | |
| 19 | Zone 2 Entry (Investigation Room) | Zone 2 | ✓ |
| 20 | Triage Console (Default) | Zone 2 | ✓ |
| 21 | Triage Mid-Scrub | Zone 2 | |
| 22 | Triage Decision + Seam 2 | Zone 2 | ✓ |
| 23 | Zone 3 Entry (Annotation Studio) | Zone 3 | |
| 24 | Annotation Workbench (Default) | Zone 3 | |
| 25 | Annotation Complete + Act 4 Preview | Zone 3 | |
| 26 | Corrected Drive (Day) | Act 4 | |
| 27 | Trace-back Chain + Assessment | Act 5 | |
| 28 | Results + Completion | Outro | |

**Total: 28 scenes** (down from 32). Demo set: 8 scenes (01, 02, 03, 16, 17, 19, 20, 22).

---

## Model Routing

| Task | Combo | Why |
|---|---|---|
| Generate cinematic scenes | `od-design` | Multimodal — needs to see reference, compose scenes |
| Generate Wayo SVG states | `od-design` | Character design, needs visual iteration |
| Generate environment backgrounds | `od-design` | Key art — entirely visual |
| Write lesson copy / speech bubbles | `bulk-gen` | Varied models → normalise tone |
| All implementation coding | `cc-main` | Stay here |

---

## Key Differences From Previous Version

| Old (Console UI) | New (Cinematic) |
|---|---|
| 32 screens | 28 scenes |
| Dark dashboards everywhere | One warm world, varied environments per zone |
| Wayo as UI icon | Wayo as character in the scene |
| Lessons = slide deck | Lessons = composed moments in physical spaces |
| Audit = form fields + dropdowns | Audit = physical objects in the world |
| Assessment = quiz screen | Assessment = conversation with Wayo |
| Separate screens for seams | Token animation visible in scene |
| "Next" buttons | Physical "Continue" gesture |
| Headlights = data colour | Headlights = Wayo's emotion |
