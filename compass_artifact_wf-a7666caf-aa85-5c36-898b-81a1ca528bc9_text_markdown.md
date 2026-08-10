# Breakthrough-Quality Browser Training: A Technique-Level Playbook for the Waymo Lifecycle Module

## TL;DR
- The "gauntloop" reference is Matt Shumer's **Gauntlet Loop** — an agentic prompting method (a lead agent sets a hard external quality bar, splits work among builder subagents, and uses independent blind-A/B critic agents that loop until the bar is beaten). The transferable insight is the *workflow*, not any single game: set a real reference (F1 broadcasts, Awwwards sites), decompose per-zone, and never let the builder grade its own work.
- Your stack (R3F + drei + postprocessing + Rive + use-gesture + Howler) can genuinely hit award-level polish. The highest-leverage moves: a custom-shader lidar point cloud colored by intensity/height, a selective-bloom + film-grain + chromatic-aberration post stack, a physically satisfying jog-dial driven by @use-gesture + spring detents, and a Rive talking car with viseme-based lip sync.
- The single biggest de-risking finding: **Reach 360 DOES accept third-party SCORM 1.2 zips directly (up to 5 GB) and launches them full-screen in a new window** — so you do NOT need to nest inside Rise. Package your app as the SCO's own index.html; that also solves the SCORM API-discovery problem.

## Key Findings

1. **Reference identified with high confidence.** "Gauntloop loop videos of people creating games" = Matt Shumer's Gauntlet Loop (somethingbig.ai), the method behind "Claude of Duty." A large community of builders has shipped browser-playable games with it, many racing/kart titles directly relevant to your F1 aesthetic.
2. **WebGL is now the default for award-winning web**, not an enhancement layer. ~97% of browsers support WebGL2; heavy background video has collapsed to under 8% of 2026 Awwwards winners. Your instinct to go 3D/shader-driven is correct and current.
3. **Lidar authenticity is achievable with synthetic data.** Waymo Open Dataset, nuScenes, and KITTI are all strictly non-commercial — unusable for a corporate/paid training deliverable. You must generate a synthetic point cloud and color it by intensity/height via a custom ShaderMaterial.
4. **The jog dial is the signature interaction.** @use-gesture/react + react-spring gives you drag→rotation math, inertia, and spring-based detents; the Vibration API adds haptics on mobile.
5. **Frame-accurate scrubbing**: `requestVideoFrameCallback` reached Baseline "newly available" on 2024-10-29 across current Chrome, Edge, Safari **and Firefox (v132+)**, but the spec still does not guarantee frame accuracy; for a fixed incident replay, an **image sequence on canvas (Apple's technique)** remains the most reliable approach.
6. **Rive is the right call for the talking car** — tiny WASM runtime, state machines, viseme lip sync driven from JS, and a $9/mo Cadet plan that ships production .riv files with no runtime fee.
7. **AI asset pipeline (2026)**: Veo 3.1 (native audio), Kling 3.0 (cheapest premium), fal.ai/Replicate as multi-model gateways; Meshy/Tripo for 3D; ElevenLabs for license-clean SFX/voice/music.
8. **SCORM/Reach 360**: direct third-party SCORM 1.2 import works; use pipwerks for completion reporting; watch autoplay, X-Frame-Options, and mobile responsiveness.

## Details

### 1. The Gauntlet Loop reference — what it is and what to steal

The phrase almost certainly refers to **Matt Shumer's "Gauntlet Loop"** (published July 27, 2026 at somethingbig.ai), the prompting methodology behind his viral "Claude of Duty" demo — a Call-of-Duty-style browser FPS (Three.js r180 / WebGL2, ~55,000 lines, 11 subsystems, zero external models/HDRIs/image/audio files) that Claude Opus 5 generated from a single prompt, producing every texture, mesh, animation, and sound procedurally. The original clip (posted July 25) drew over a million views; Shumer later clarified it was "zero-shot," not literally "one-shot." The community has since shipped many browser-playable games with the method, a large share of them racing/kart titles (Kart Royale, Speed Racer, Sunset Circuit, Claude for Speed) that map directly to your F1/racing-game reference feel. (The exact community game count is promoted on somethingbig.ai but not independently verified — treat headline counts as marketing.)

Do not confuse this with **Gauntlet AI** (gauntletai.com), the separate Austin-based AI-engineering fellowship — a plausible-but-wrong candidate given the "training" context of your project.

**The method (transferable to your build):**
- **Give the agent the goal, not the implementation.** Shumer's entire prompt was roughly "build a AAA FPS in Three.js, split work among subagents, put every piece through a harsh visual critic vs. real Call of Duty, keep improving."
- **Set a real, external bar.** "Make it amazing" is not a bar. Real CoD screenshots were. For you: real F1 broadcast frames, specific Awwwards/FWA sites, and racing-game HUD screenshots.
- **Decompose into the smallest independently-judgeable pieces** — for you: the car character, the jog dial, the point cloud, each zone's HUD, scene transitions, audio.
- **Never let the builder grade itself** — spawn a fresh critic agent with the reference and the artifact only (blind A/B), identify the single biggest gap, send back, repeat.
- **Run it in an agentic harness** — "You need to run it inside an agentic harness such as Claude Code or Codex," and Shumer recommends enabling maximum effort ("type /effort and select ultracode").
- **Watch via a live progress HTML page** the agent updates, so you don't interrupt.

This is a production *workflow* you should adopt directly: point a Gauntlet Loop at each of your components with the right reference bar.

### 2. Award-level web technique (and what's realistic in R3F)

Studios to reference: Active Theory, Resn, Immersive Garden, Lusion, Unseen Studio, Bruno Simon, Chipsa. Confirmed 2026 winners worth deconstructing: Unseen Studio's Hubtown (a Three.js hero object with a mouse-reveal interaction — proving a "boring" B2B subject can carry a flagship 3D experience) and Lusion's mock cork-coaster product launch (Awwwards Site of the Month + Developer Award).

**Concrete techniques, mapped to your stack:**
- **Post-processing stack** via `@react-three/postprocessing` (wraps the `postprocessing` library; uses a single fullscreen triangle + WebGL2 MSAA). Import `EffectComposer`, `Bloom`, `DepthOfField`, `Noise` (film grain), `Vignette`, `ChromaticAberration`, and end with `ToneMapping` (ACES Filmic). **Selective bloom is free**: set `luminanceThreshold` to ~1.0–1.1 and push emissive materials' colors above the 0–1 range so only chosen objects glow (perfect for glowing HUD elements and hot lidar points).
- **GPGPU particle systems**: WebGL2 FBO ping-pong simulations run 65k particles at 60fps at 1080p (per the public creativedev.particles R3F/React 19 project). drei's `Points`/`Instances`/`Instance` handle instancing; for custom sim, use render-to-texture with a `useFBO` (drei) and a simulation shader.
- **Custom shaders**: drei's `shaderMaterial` helper creates typed, tree-shakeable `ShaderMaterial`s with auto uniforms. This is how you build the point-cloud material and any particle systems.
- **Scene transitions / camera moves**: drei `CameraControls`, `PerspectiveCamera` + animated `makeDefault`, and Framer Motion values driving camera targets. Device-tier detection (serve fewer particles / disable effects on weak GPUs via `<EffectComposer enabled={!lowTier}>`) is standard practice.

**Realism note:** All of the above are achievable solo in R3F. The risk is scope, not feasibility — budget the post stack and one hero shader effect, not five.

### 3. Lidar / point cloud on the web

**Licensing — decisive:** The **Waymo Open Dataset** is governed by the "Waymo Dataset License Agreement for Non-Commercial Use" (current version March 2025). Its terms state you "must not use or deploy the Dataset... (iii) for any other primarily commercial purposes," and define non-commercial purposes as research/teaching/scientific-publication/personal-experimentation that "does not include purposes primarily intended for or directed towards commercial advantage or monetary compensation." **nuScenes** is "free to use strictly for non-commercial purposes" (CC BY-NC-SA 4.0; commercial requires contacting Motional). **KITTI/SemanticKITTI** is also non-commercial (CC BY-NC-SA). **A paid corporate training deliverable for Sutherland/Waymo is a commercial use — do not ship real dataset points.** (You may reference their existence/look for study.) The safe path is a **synthetic, procedurally generated point cloud**.

**Rendering approach:**
- For 25k–500k points, **skip Potree** (Potree is for millions of streamed points via octree LOD; overkill and heavy). Use a single `THREE.Points` with a `BufferGeometry` and a **custom `ShaderMaterial`** (via drei `shaderMaterial`).
- **Color by intensity/height**: upload a scalar attribute per point and map to color via a 1D LUT texture in the fragment shader, or compute on CPU. Broadcast/engineering convention is blue = low intensity → red = high intensity (USGS uses exactly this). Render points as discs using `gl_PointCoord` and apply `sizeAttenuation`.
- **Performance**: recenter data near origin (float precision), use typed arrays, avoid per-frame buffer rebuilds. A million points with XYZ+RGB is ~24 MB minimum, so keep your scene in the tens-of-thousands for a rotating car-scan hero.
- **Authenticity tricks for synthetic data**: sample points off a car glTF's surface + a ground plane, add ring patterns (lidar scan lines), radial falloff of density with distance, small gaussian noise on positions, intensity varying by surface normal vs. sensor and by material. Add a slow rotation and a "scanning" sweep.

**Formats**: PLY/PCD load via three's `PLYLoader`/`PCDLoader`; for larger/streamed data, `@loaders.gl` + `deck.gl`'s point-cloud layer. For your case, generate points in-code — no file format needed.

### 4. The physical-control UI (jog dial / lever)

**Rotation mechanics with @use-gesture/react + react-spring:**
- Bind `useDrag`; during drag, compute angle from pointer position relative to the dial center (`Math.atan2`), and `api.set()` the rotation directly for 1:1 responsiveness.
- On release, project an end position from the drag **velocity** and `api.start()` to animate momentum (inertia). Note the known quirk: use-gesture velocity is px/ms and doesn't map directly into react-spring's velocity — wrap it.
- **Detents/snapping**: define snap points (frame markers / chapter points); on release, pick the snap target based on position + inertia and let the spring settle into it (the react-interactable pattern). This gives the satisfying "notched" feel of an EVS/jog wheel.
- **Always set `touchAction: 'none'`** on the draggable element to prevent mobile scroll glitches.
- **Haptics**: `navigator.vibrate()` (Vibration API) on each detent crossing for tactile feedback on Android; iOS Safari does not support it — degrade gracefully.

**Professional reference behavior**: broadcast replay controllers (EVS) and NLE jog/shuttle wheels distinguish a **jog** (fine, 1:1, frame-by-frame near center) from a **shuttle** (spring-loaded, speed proportional to deflection). Consider a jog dial (scrub) plus a spring-return shuttle lever (variable-speed play) — that duality is what makes it read as "pro gear."

**F1 broadcast / racing HUD design language (implementable specifics):**
- **Bright red** as the signature accent; red lines/boxes highlight key data (F1's actual system — F2 uses light blue, F3 silver to signal series).
- **Status bar across the top**: lap/timer, flags, race-control messages. Replicate as your incident status bar (incident ID, timestamp, severity flag).
- **Condensed/mono numeric typography**, tight grids, high data density, and consistent layout modules. Color-coded tyre/flag states (yellow/green/red/blue) → map to your incident-state color coding.
- References: mattbirkett.co.uk's F1 TV Graphics breakdown; the TiE73/sab-f1-ui React project that recreates F1 broadcast graphics in TS/React/CSS; Game UI Database for racing HUD screenshots.

### 5. Frame-accurate media scrubbing

- **`requestVideoFrameCallback` (rVFC)** reached **Baseline "newly available" on 2024-10-29** — it works in current Chrome, Edge, Safari, **and Firefox (shipped in Firefox 132, also 2024-10-29)**; it is expected to reach Baseline "widely available" around 2027-04-29. It provides per-frame `mediaTime` metadata, but the spec explicitly warns it does **not guarantee frame-accurate seeking** and may be one vsync late.
- **WebCodecs** is the only path to true frame accuracy; combine with `mp4box.js`/demuxing to decode specific frames. This is heavier to build and adds risk inside SCORM.
- **Image sequence on canvas (the Apple product-page technique)** is the most reliable for a *fixed* incident replay: pre-render frames, preload them, draw the frame matching scrub position to a `<canvas>`. Apple's AirPods page stretches ~65 frames over 1200px. Use WebP/AVIF, cap devicePixelRatio, and show a static first frame on low-end/reduced-motion. This sidesteps codec/seek unreliability entirely and gives perfect scrub-to-position mapping with your jog dial — **recommended default**.
- Tradeoff: image sequences cost bandwidth/memory (dozens–hundreds of frames); video is smaller but scrubs unreliably backward. For a short incident (5–15s), image sequence wins.

### 6. Character animation for the talking car — Rive in depth

**Recommendation: Rive.** It beats Lottie (playback-only, no true interactivity), rigged-SVG-via-Framer-Motion (works but you hand-build every state, and complex faces get unwieldy), and a full glTF/morph-target 3D car (heaviest, most production time) for an *expressive, reactive 2D character* that must run offline in a small package.

- **Runtime**: `@rive-app/react-canvas` wraps the WebAssembly engine; the .riv format is a tiny binary, far lighter than equivalent video/GIF, and runs natively cross-platform.
- **State machines**: drive emotional states (idle, happy, concerned, explaining) via named inputs (Boolean `is_speaking`, Number `emotion`, Triggers for gestures). Transitions are handled inside Rive, not your React code.
- **Lip sync**: build ~10 viseme states (mouth shapes) with a single Number input (`phoneme`/`viseme`); drive it at runtime from JS. **Pair with ElevenLabs**, which returns timestamp/viseme alignment metadata you convert into a viseme timeline — but sync updates to actual audio time (via Howler's `seek()`), not naive `setTimeout`. Total pipeline latency for real-time lip sync is ~44–74ms, under the ~100ms perception threshold; for pre-scripted narration you can bake the timeline exactly.
- **Eye tracking / life**: a subtle fake-3D parallax on the head/eyes (follow pointer) keeps the character alive when idle — a documented Rive technique. Your "eyes in the windshield" concept maps perfectly.
- **Pricing/licensing**: Free to create in the editor; the **Cadet plan is $9/mo (annual) / $17/mo monthly** and unlocks unlimited .riv exports for production. Voyager is $32/seat/mo; Enterprise is quote-based. Crucially, per Rive's own announcement: **"No runtime fee — your exports keep working forever,"** and the runtimes are free/open — so a shipped .riv inside a SCORM package has no ongoing license dependency and works fully offline.

### 7. AI asset generation pipeline (2026)

**Video** (for cinematic B-roll of the AV ecosystem, incident dramatizations, zone intros):
- **Veo 3.1** — the only tier shipping **native synchronized audio**; best lip-sync, up to 4K. Roughly $0.15/sec Fast, ~$0.40–0.75/sec Standard. Access via Gemini API / Vertex AI (gated by region/tier — you have Gemini Pro).
- **Kling 3.0** — cheapest premium (~$0.10/sec), strong multi-shot subject consistency; good for character-driven or repeated-subject shots.
- **Runway Gen-4.5** — best creative-control/editing tools, credit-based subscription.
- **Gateways**: **fal.ai** (600+ models incl. Kling, Veo, Sora, Wan) and **Replicate** are the practical multi-model APIs for a solo builder; **OpenRouter is primarily an LLM router** — verify current video-model availability there before relying on it, and treat fal.ai/Replicate as the real video path. Draft in a cheap model (Wan 2.6 ~$0.05/sec) before final renders; disable audio generation when unneeded to save 30–50%.
- **Workflow discipline**: budget 2–3 iterations per usable clip.

**3D models** (the car, sensors, props):
- **Meshy 6** — most balanced (text/image→3D, PBR textures, topology controls, broad exports); the safe default.
- **Tripo AI** — fastest, cleanest low-poly topology (~2s Smart Mesh vs. minutes for competitors), strong auto-rigging incl. non-humanoid, stylized styles; best for game-ready props and iteration.
- **Rodin (Hyper3D)** — highest fidelity (10B-param Gen-2, 4K textures) when quality trumps cost.
- **Hunyuan3D** — best open-source/self-host option.
- For a stylized Pixar-"Cars" look, generate a base mesh in Tripo/Meshy, then hand-refine in Blender; export glTF for R3F.

**Audio / voice / SFX / music:**
- **ElevenLabs** — license-clean commercial terms **from the Starter plan (~$6/mo)**, unifying voice (character dialogue for the car), sound effects, and Eleven Music. This matters: Suno/Udio have unsettled commercial licensing (RIAA suits/settlements) — **prefer ElevenLabs or Stable Audio for a corporate deliverable**. ElevenLabs Music runs about $0.80/min via API; MiniMax Music via fal.ai (~$0.035/gen) is a cheap alternative.
- Use ElevenLabs voice + its viseme timestamps to drive the Rive lip sync (Section 6).

**Textures/materials**: Adobe Express Premium and Canva Pro cover 2D UI assets, icons, and quick texture work; Gemini Pro (Nano Banana-class image gen) for concept frames and textures.

### 8. SCORM / Articulate Reach 360 constraints (the delivery reality)

**The key finding reverses a common assumption:** Reach 360 **does accept third-party SCORM 1.2 (and 2004) zips directly.** Articulate's own KB ("Reach 360: Import Third-Party Training") states verbatim: *"Reach 360 supports content exported using SCORM 1.2 or any edition of SCORM 2004,"* and *"Only one course can be imported at a time and course packages can't be larger than 5GB."* Import via Manage → Courses → Add Courses → Import course. So you can upload your self-contained WebGL/React app as its own SCORM package; you do NOT need to nest inside Rise.

**Critical behaviors & gotchas:**
- **Imported courses launch in a NEW WINDOW.** Pop-up blockers (esp. Safari) can block this — learners may need to allow pop-ups. Plan onboarding copy for this.
- **The URL is fixed to `learn.riseusercontent.com`** and content can't be edited in Reach (re-import to update; updating maintains enrollments but resets learner progress).
- **Reporting**: question-level reporting is NOT available for imported third-party SCORM; SCORM 1.2 truncates question/answer text. Report completion/score via **pipwerks** (`SCORM.set('cmi.core.lesson_status','completed')`, `cmi.core.score.raw`). Use `@ecode-by-dwayne/react-scorm-provider` (Context + `useScorm` hook wrapping pipwerks) and **`simple-scorm-packager`** to build the zip.
- **API discovery**: because Reach launches in a new window, your app must walk both the parent frame hierarchy AND `window.opener` — pipwerks' `SCORM.API.find()` already does this. **Packaging your app as the SCO's own index.html (not double-nested in a Rise iframe) is what makes discovery reliable.** If you ever embed cross-origin in Rise instead, `window.parent.API` breaks on same-origin policy and you'd need a `postMessage` relay — avoid this.
- **Autoplay**: browsers block audio/video autoplay without a user gesture (Chrome/Edge/Safari). Your Howler audio and any video MUST start after a click — build a "Start" gate. This is a browser policy, not Articulate-specific.
- **X-Frame-Options / mixed content**: if you host anything externally (CDN), don't send `X-Frame-Options: SAMEORIGIN/DENY`, serve over HTTPS, and set permissive `frame-ancestors`. A self-contained SCORM zip avoids most of this.
- **Mobile/tablet**: Rise's responsive player shrinks embedded iframes and breaks them on mobile portrait (an acknowledged issue in Articulate's community) — another reason a **direct SCORM upload (full-screen new window) renders more reliably on tablets** than a Rise-embedded iframe.
- **xAPI**: Rise 360 can *export* xAPI/cmi5 to external LMSs, but **Reach 360's importer is documented as SCORM 1.2/2004 only** — treat xAPI-into-Reach as unsupported; use SCORM 1.2 for this deliverable. If richer analytics are needed later, SCORM Cloud Dispatch can wrap xAPI as SCORM.
- **Always validate in SCORM Cloud** (Rustici's free test engine) before delivery — Articulate itself recommends this for troubleshooting.
- **Package-size discipline**: 5 GB is the hard ceiling but you want fast load — code-split with Vite, compress textures (KTX2/Basis via drei), lazy-load per-zone assets, and keep the Rive/point-cloud/audio budget tight. HashRouter is correct for a file-served SCORM SCO.

### 9. Differentiators — what makes this breakthrough, not just good e-learning

Concrete, opinionated moves that are rare in corporate training but standard in high-end interactive work:
1. **A diegetic UI.** Don't build "an e-learning course with a 3D bit." Build a convincing *investigation console* where the whole interface — status bar, telemetry type, jog dial, point cloud — is the F1/EVS operator's actual tool. The learner role-plays the job, not "clicks through slides."
2. **The jog dial + shuttle as the primary verb.** Scrubbing a real incident replay with a physically satisfying, haptic, detented control is a tactile hook no Storyline course has. Make it the thing people show their colleagues.
3. **A shader-driven lidar hero moment.** A rotating, intensity-colored, scanning synthetic point cloud with selective bloom reads as "this cost a fortune" — and it's procedurally generated, so it's free and license-clean.
4. **A character with genuine emotional state**, not a mascot that plays one loop. Rive state machines + audio-synced visemes + idle eye parallax make the car feel alive across the whole narrative.
5. **A cohesive post-processing "film" look** (ACES tone mapping, subtle grain, vignette, chromatic aberration on transitions) applied consistently — the single fastest way to make a browser scene look cinematic rather than "WebGL demo."
6. **Cinematic scene transitions between zones** (camera moves + a shader wipe/dissolve), treating each zone entry like a broadcast cut.
7. **Physically-modeled motion** — spring physics (react-spring) on every control and transition instead of linear CSS easings; weight and inertia are what separate "expensive" from "template."
8. **Author it with the Gauntlet Loop** — run each component against a real reference bar with a blind critic, so the quality ceiling is set by F1 broadcasts and Awwwards sites, not by e-learning norms.

## Recommendations

**Stage 1 — De-risk the delivery pipeline first (Week 1).** Before building anything pretty, package a trivial R3F "hello cube" as a SCORM 1.2 zip (simple-scorm-packager + pipwerks), import it into Reach 360, and confirm: it launches, WebGL renders, audio plays after a click gate, and completion reports. This validates the single highest-risk assumption. **Benchmark to proceed:** completion status reaches Reach's reporting and the cube renders on a tablet.

**Stage 2 — Build the three signature interactions as isolated prototypes (Weeks 2–4):** (a) the jog-dial + image-sequence scrubber, (b) the synthetic shader point cloud, (c) the Rive talking car with one full lip-synced line. Each gets its own Gauntlet Loop against a named reference. **Benchmark:** each prototype holds 60fps on a mid-tier laptop and feels good blind-tested against its reference.

**Stage 3 — Assemble the shell and one complete zone (Weeks 5–7):** the car intro → branch → Triage Ops zone end-to-end, with the post-processing look and one scene transition locked. Ship this as the client/management demo. **Benchmark:** a stakeholder can complete the Triage zone unaided and it reports completion in Reach.

**Stage 4 — Replicate to the other two zones and harden (Weeks 8+):** MCPI and Annotators reuse the shell; focus remaining budget on asset polish (AI video/3D/audio), device-tier fallbacks, and load-time optimization.

**Thresholds that change the plan:**
- If Stage 1 fails (Reach won't launch/report the raw SCORM), fall back to hosting on GitHub Pages and embedding via a Rise web object/iframe + `postMessage` relay — accept the mobile-responsiveness risk.
- If frame budget can't hold 60fps with the point cloud + post stack, drop selective bloom first, then reduce point count, then serve a static fallback on low-tier GPUs.
- If Veo/Kling access or cost proves impractical, lean on Gemini image gen + the shader/point-cloud work for the "wow," and use AI video only for short zone-intro B-roll.

## Caveats
- **Non-commercial dataset licensing is a hard legal line.** Waymo Open Dataset, nuScenes, and KITTI cannot be used in a paid corporate deliverable. Generate synthetic point clouds. This is stated plainly but is easy to get wrong under deadline.
- **Suno/Udio commercial licensing is unsettled** (RIAA litigation/settlements); use ElevenLabs or Stable Audio for any shipped audio.
- **`requestVideoFrameCallback` is now cross-browser** (including Firefox 132+) but is still not a frame-accuracy guarantee per its own spec; the image-sequence approach avoids the whole issue and remains the recommended default for the incident replay.
- **The xAPI-into-Reach conclusion is an inference** from the absence of xAPI in Articulate's official import documentation; verify directly with Articulate if richer analytics become a requirement.
- **AI video/3D/audio pricing and model availability move monthly**; the figures here are 2026 snapshots, and several exact per-second/per-minute numbers come from secondary aggregator sites rather than primary vendor pages — confirm on provider pages before committing budget.
- **Scope is the real risk, not feasibility.** Every technique here is individually achievable solo; attempting all of them at full fidelity across three zones is not. The staged plan exists to protect against this.