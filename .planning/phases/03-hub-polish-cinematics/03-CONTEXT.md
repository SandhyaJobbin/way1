# Phase 3: Hub & Polish (Cinematics) - Context

**Gathered:** 2026-08-10
**Status:** Ready/Scaffolded
**Source:** Project brief + DESIGN-SPEC.md

<domain>
## Phase Boundary
This phase focuses on connecting the interactive AV lifecycle components with an ecosystem orbital map (Hub) nested in a global R3F Canvas. It adds a professional broadcast aesthetic through a post-processing stack (vignette, noise, bloom, ACES tone mapping), smooth camera dolly transitions between coordinates (Hub and selected Zones), and a cohesive narrative Speech Bubble overlay for the Wayo character.

</domain>

<decisions>
## Implementation Decisions

### 1. Global Canvas & Hub
- **Orbital Map Geometry:** Concentric circles representing clock speed (Live -> Response -> Learning) with Wayo at center.
- **R3F Integration:** Nest existing LidarCloud and the new orbital map inside a persistent global canvas to allow continuous rendering.
- **Incident Token:** A pulsing token visual representing the construction zone incident that moves between orbital zones.

### 2. Post-processing & Aesthetic
- **Visual Feel:** F1 broadcast style, near-black space theme.
- **Post-processing Suite:** ACES Filmic Tone Mapping, subtle Bloom, Vignette, Noise/Film Grain via `@react-three/postprocessing` (or shader fallback to keep bundles lightweight if needed).
- **Tone Mapping:** Ensure color contrast conforms to readability requirements when tone mapping is active.

### 3. Camera Dolly Transitions
- **Logic:** Coordinate interpolation rather than layout shifts. Smooth camera travel from Hub coordinates to Zone coordinate focus.
- **Physics:** interpolation driven by `react-spring` or Framer Motion values synced to route status.

### 4. Speech Bubble & Narrative system
- **Mechanic:** CSS HUD-style speech overlay for Wayo. Directional bubble pointing (left, center, or right) depending on screen location.
- **Text reveal:** Animated type-on character flow (`aria-live="polite"` for screen readers).

</decisions>

<canonical_refs>
## Canonical References
- `waymo-lifecycle-module-brief.md`
- `.planning/DESIGN-SPEC.md`
- `.planning/ROADMAP.md`
</canonical_refs>

<specifics>
## Specific Ideas
- The Hub concentric rings use specific theme accents: Live (#FF6B2B), Response (#E8E8E8 / #CC0000), Learning (#4A90E2 / #7B61FF).
- The transition from Hub to Zone must look like a camera zooming in/out of a radar track (dolly in).
</specifics>

<deferred>
## Deferred Ideas
- Offline SCORM packaging (deferred to Phase 7).
- Advanced audio/sound effects integrations (deferred to Phase 5/7).
</deferred>
