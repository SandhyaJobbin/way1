---
phase: "01-engine-proving-de-risking"
plan: "02"
subsystem: "data-layer"
tags: ["scorm", "zustand", "zod", "vitest", "state-management", "schema", "data-architecture"]
dependency_graph:
  requires: ["01-01"]
  provides: ["scorm-wrapper", "zustand-store", "zod-schemas", "zones-json", "vitest-tests"]
  affects: ["01-03-PLAN.md", "all-future-plans"]
tech_stack:
  added:
    - "zustand ^5.0.14 — global Zustand store for scormConnected/progress/currentZone"
    - "zod ^4.4.3 — Zod schemas for Ecosystem/Ring/Zone/Incident content architecture"
    - "vitest ^4.1.10 — unit testing framework for schema validation"
    - "@vitest/coverage-v8 — coverage reporting (available, not yet wired)"
  patterns:
    - "SCORM 1.2 direct bridge pattern — window chain search (7-frame max) + opener check"
    - "Graceful LMS fallback — console.warn in local dev, no app crash on missing API"
    - "Throttled SCORM commit (2s) — prevents hammering LMS on animation frame ticks"
    - "Zod parse-at-boundary pattern — validate JSON at import site, trust types downstream"
    - "Static import data architecture — zones.json imported as ES module"
key_files:
  created:
    - "src/lib/scorm.ts — Direct SCORM 1.2 wrapper (SCORM object + initSCORM() fn)"
    - "src/store/useAppStore.ts — Zustand store: scormConnected, progress, currentZone"
    - "src/schema/content.ts — Zod schemas: Ecosystem, Ring, Zone, Incident, ColorTheme"
    - "src/data/zones.json — Ecosystem static data: 2 rings, 3 zones, 1 cross-zone incident"
    - "src/schema/content.test.ts — 27 Vitest unit tests validating schemas + data"
  modified:
    - "src/main.tsx — initSCORM() called before createRoot; store seeded with result"
    - "vite.config.ts — vitest test config added (globals: true, environment: node)"
    - "package.json — zustand, zod deps; vitest devDep; test script"
decisions:
  - "Direct SCORM 1.2 implementation instead of pipwerks npm package (git dep blocked)"
  - "Throttle setProgress SCORM commits to 2s to protect LMS from animation frame rate"
  - "Zod v4 used (installed by npm) — same import surface as v3 for our use case"
  - "Vitest environment: node for schema tests (no DOM needed for pure logic)"
metrics:
  duration: "11 minutes"
  completed: "2026-08-07"
  tasks_completed: 3
  tasks_total: 3
  files_created: 5
  files_modified: 3
status: complete
---

# Phase 01 Plan 02: SCORM Wrapper, Zustand Store & Zod Schemas Summary

**One-liner:** Direct SCORM 1.2 wrapper with LMS fallback, Zustand store with throttled progress commits, and Zod-validated Ecosystem/Zone/Incident schemas proven by 27 passing Vitest tests.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | SCORM Wrapper & Zustand Store Initialization | 155cdcc | src/lib/scorm.ts, src/store/useAppStore.ts, src/main.tsx |
| 2 | Define Content Architecture (Zod Schemas) | ca60de8 | src/schema/content.ts |
| 3 | Implement Dummy Data & Validation Tests | c18b547 | src/data/zones.json, src/schema/content.test.ts, vite.config.ts, package.json |

## Verification Passed

- `npm run test` — 27 tests, 0 failures across 5 describe blocks
- `npm run build` — tsc + vite build succeeds, dist/ produced with relative asset paths
- SCORM.init() falls back gracefully locally: console.warn fires, scormConnected = false
- useAppStore.getState() accessible globally (window.__appStore in DEV mode)
- parseEcosystem(zonesData) returns typed Ecosystem object without throwing

## Architecture Decisions

### SCORM 1.2 Direct Implementation

The plan called for `pipwerks-scorm-api-wrapper` but that npm package has a transitive
git dependency (`scorm-api-wrapper: git+https://github.com/pipwerks/scorm-api-wrapper.git`)
that is blocked in this environment. Rather than installing a different package, the SCORM
1.2 browser protocol was implemented directly in `src/lib/scorm.ts` — this is actually
cleaner for our TypeScript project:

- Strongly typed: `Window['API']` interface with all SCORM 1.2 LMSxxx methods
- No git dependency risk
- Direct LMS window chain search (spec-compliant: up to 7 parent frames + opener)
- All fallbacks handled at the source

The API surface (SCORM.init/get/set/save/quit) is identical to what pipwerks exposes.

### Throttled Progress Commits (Decision D-11)

The Zustand `setProgress` action updates store state immediately (React re-renders
are fine on each UI frame tick). However, SCORM LMSCommit calls are throttled to at
most once per 2000ms. This prevents the LMS from being hammered during active jog
dial scrubbing where progress could change 60 times per second.

### Zod Parse-at-Boundary Pattern

Schemas are defined in `src/schema/content.ts` and `parseEcosystem()` is the sole
entry point for converting raw JSON → typed Ecosystem. Once validated, all downstream
React components receive typed `Ecosystem | Zone | Incident` props and can trust the
data shape without defensive null-checks.

### Static Import Data Architecture

`zones.json` is imported as an ES module (`import zonesData from '../data/zones.json'`).
Vite bundles this at build time — no runtime fetch needed. SCORM packages running
offline benefit from this: no network dependency for content data.

## Component Summary

- **SCORM.ts** (`src/lib/scorm.ts`): `SCORM` namespace with init/get/set/save/quit +
  `initSCORM()` convenience function. Finds `window.API` via frame traversal + opener.
  Gracefully degrades to console.warn when no LMS is present.

- **useAppStore.ts** (`src/store/useAppStore.ts`): Zustand store initialized with
  `scormConnected: false`, `progress: 0`, `currentZone: null`. Three actions:
  `setScormConnected`, `setProgress` (throttled SCORM commit), `setCurrentZone`.
  Dev-only `window.__appStore` for browser DevTools inspection.

- **content.ts** (`src/schema/content.ts`): Full Zod schema hierarchy with inferred
  TypeScript types exported alongside schemas. `parseEcosystem` / `safeParseEcosystem`
  convenience helpers for both throwing and safe parse patterns.

- **zones.json** (`src/data/zones.json`): Dummy ecosystem data with 2 rings (Live
  Operations, Response Operations) and 3 zones (MCPI Agent, Triage Ops, Annotators).
  The construction-zone-flagger incident appears in all three zones to model the
  cross-role handoff that is the core of this training module.

- **content.test.ts** (`src/schema/content.test.ts`): 27 Vitest unit tests covering
  happy-path validation, default value injection, field-level constraint enforcement,
  and deliberate rejection of malformed data.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Replaced blocked pipwerks npm package with direct implementation**
- **Found during:** Task 1 — `npm install pipwerks-scorm-api-wrapper` failed
- **Issue:** The package declares `scorm-api-wrapper: git+https://github.com/pipwerks/scorm-api-wrapper.git` as a dependency. Git-protocol npm installs are blocked in this environment.
- **Fix:** Implemented SCORM 1.2 protocol directly in `src/lib/scorm.ts`. The API surface exposed (SCORM.init/get/set/save/quit) is functionally identical to the pipwerks wrapper. Implementation is fully typed TypeScript and spec-compliant for SCORM 1.2 frame traversal.
- **Files modified:** src/lib/scorm.ts (new, standalone implementation)
- **Impact:** None — behavior is identical. No external runtime dependency. Safer for SCORM offline delivery.

**2. [Rule 1 - Bug] Fixed TypeScript type errors in SCORM return value comparisons**
- **Found during:** Task 1 — `npm run build` TypeScript errors
- **Issue:** Initial implementation compared `result === 'true' || result === true` — TypeScript correctly flagged `result === true` as unreachable because `LMSSetValue` returns `string`, not `boolean | string`
- **Fix:** Removed the `|| result === true` boolean branch; SCORM 1.2 spec defines string return values only
- **Files modified:** src/lib/scorm.ts (4 return value comparisons corrected)

**3. [Rule 1 - Bug] Removed unused EcosystemSchema import in test file**
- **Found during:** Task 3 — `npm run build` (tsc strict mode)
- **Issue:** `EcosystemSchema` was imported but not directly used in tests (tests use `parseEcosystem` and `safeParseEcosystem` instead)
- **Fix:** Removed `EcosystemSchema` from import list; tests use the parse helpers which internally use the schema
- **Files modified:** src/schema/content.test.ts

## Known Stubs

None — this plan's artifacts are complete implementations, not placeholders. The zones.json data is intentionally "dummy" seed data that will be expanded with content in later phases, but the schema and data structure are fully resolved.

## Threat Flags

None — this plan adds no new network endpoints, auth paths, or file access patterns. SCORM communication is client-side only (read/write to LMS API object). Zod validation is entirely client-side.

## Self-Check: PASSED

- [x] src/lib/scorm.ts exists and contains SCORM/initSCORM
- [x] src/store/useAppStore.ts exists with Zustand create() and throttled setProgress
- [x] src/schema/content.ts exists with z.object schemas for all entity types
- [x] src/data/zones.json exists with valid ecosystem structure
- [x] src/schema/content.test.ts exists with 27 passing tests
- [x] vite.config.ts has vitest test configuration
- [x] package.json has "test": "vitest run" script
- [x] All three commits exist: 155cdcc, ca60de8, c18b547
- [x] npm run test — 27/27 pass
- [x] npm run build — succeeds without TypeScript errors
