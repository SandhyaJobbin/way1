# Waymo Lifecycle Interactive Training Module

## Vision
Build a breakthrough 25-minute introductory interactive training module that teaches agents the map of the Waymo autonomous-vehicle ecosystem and how three human roles — MCPI Agent, Triage Ops, and Annotators — depend on each other to handle edge cases and improve the system.

Instead of a traditional e-learning course, this will be a "diegetic UI" — the learner role-plays the job inside an investigation console. The module uses a single incident (a construction zone flagger) passing through all three roles to demonstrate the seams and handoffs between them.

## Key Elements
1. **Interactive Jog Dial**: A tactile, physically modelled control (react-spring) for scrubbing incident replays.
2. **Synthetic Lidar Hero**: A 3D procedural point cloud shader replicating sensor data authentically.
3. **Wayo (The Car)**: An animated, responsive SVG character that acts as the narrator and subject.
4. **Cinematic Polish**: ACES tone mapping, grain, and bloom post-processing for a broadcast/F1 aesthetic.
5. **Propagating Decisions**: Choices made in one role (e.g., Triage Ops routing) visibly affect the queue and context in the next role (Annotators).

## Technical Foundation
- React 19, Vite, TypeScript, Tailwind v4
- Framer Motion, Zustand, @use-gesture/react, react-spring
- React Three Fiber (`@react-three/fiber`, `drei`, `@react-three/postprocessing`)
- SCORM 1.2 delivery via `simple-scorm-packager` and `pipwerks`, designed for direct upload to Reach 360 (new window launch).
- Content architecture via typed JSON (Zod).
- Static deployment target (GitHub Pages for demo, LMS for prod).

## Success Criteria
- **Learner outcomes**: Can name who owns an event at each stage and what the next role needs.
- **Engagement**: Differentiated, tactile experience that feels like using pro gear.
- **Demo Target**: Act 1 (intro), Zone 2 (Triage Ops), and one handoff seam deployed to GitHub pages.
