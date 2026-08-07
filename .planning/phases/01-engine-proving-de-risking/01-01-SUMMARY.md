---
phase: "01-engine-proving-de-risking"
plan: "01"
subsystem: "shell"
tags: ["react", "vite", "typescript", "tailwind-v4", "framer-motion", "react-router", "hash-router", "scorm"]
dependency_graph:
  requires: []
  provides: ["react-shell", "hash-router", "animated-route-transitions", "vite-scorm-config"]
  affects: ["01-02-PLAN.md"]
tech_stack:
  added:
    - "Vite 6 — build tool with base './' for SCORM relative asset paths"
    - "React 19 + ReactDOM 19 — UI framework"
    - "TypeScript 5.8 — strict mode, bundler module resolution"
    - "Tailwind CSS v4 via @tailwindcss/vite — utility styling"
    - "Framer Motion 11 — AnimatePresence + motion.div for route transitions"
    - "React Router v7 — createHashRouter for SCORM-safe routing"
  patterns:
    - "HashRouter pattern for SCORM/LMS iframe delivery (no server-side path resolution)"
    - "AnimatePresence mode='wait' for sequential route exit/enter animations"
    - "Absolute overlay container pattern for future DOM/R3F canvas layering"
    - "Variant-based Framer Motion animation (initial/animate/exit)"
key_files:
  created:
    - "package.json — project dependencies and build scripts"
    - "vite.config.ts — Vite config with base: './' for SCORM, Tailwind v4 plugin"
    - "tsconfig.json — TypeScript strict config with bundler module resolution"
    - "tsconfig.node.json — TypeScript config for Vite config file"
    - "index.html — HTML entry point"
    - "src/main.tsx — React root rendering AppRouter into #root"
    - "src/App.tsx — minimal root component placeholder"
    - "src/index.css — Tailwind v4 import and base styles"
    - "src/vite-env.d.ts — Vite client type declarations"
    - "src/routes.tsx — HashRouter route tree: /start, /, /zone/:id"
    - "src/layouts/ShellLayout.tsx — animated shell with AnimatePresence wrapping Outlet"
    - "src/components/StartGate.tsx — entry splash with user-gesture capture"
    - "src/components/Hub.tsx — ecosystem overview with zone navigation cards"
    - "src/components/ZonePlaceholder.tsx — dynamic :id route display"
    - ".gitignore — excludes node_modules, dist, local files"
  modified: []
decisions:
  - "HashRouter chosen over BrowserRouter to eliminate 404s in LMS iframe and file:// contexts"
  - "base: './' in vite.config.ts makes all built assets use relative paths (SCORM requirement)"
  - "AnimatePresence mode='wait' ensures outgoing route exits before incoming route mounts"
  - "location.key as AnimatePresence key enables re-animation on same-path navigation"
  - "Absolute overlay container in ShellLayout separates DOM UI layer from future R3F canvas"
  - "StartGate placed at /start to capture user gesture before media autoplay is needed"
metrics:
  duration: "9 minutes"
  completed: "2026-08-07"
  tasks_completed: 3
  tasks_total: 3
  files_created: 15
  files_modified: 0
status: complete
---

# Phase 01 Plan 01: Vite Shell Scaffold Summary

**One-liner:** HashRouter React 19 shell with Vite base='./', Tailwind v4, and Framer Motion AnimatePresence for SCORM-safe cinematic route transitions.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Scaffold Vite + TS + Tailwind React App | 5dc01be | package.json, vite.config.ts, tsconfig.json, index.html, src/main.tsx, src/App.tsx |
| 2 | Implement HashRouter & Shell Layout | c62713b | src/routes.tsx, src/layouts/ShellLayout.tsx |
| 3 | Build Route Placeholders | d5c5149 | src/components/StartGate.tsx, src/components/Hub.tsx, src/components/ZonePlaceholder.tsx |

## Verification Passed

- `npm run build` succeeds producing `dist/` with `./assets/...` relative paths
- `base: "./"` confirmed in vite.config.ts (SCORM relative asset requirement)
- `createHashRouter` used in routes.tsx (hash routing for SCORM/LMS iframe safety)
- `AnimatePresence mode="wait"` in ShellLayout.tsx wrapping Outlet
- `motion.div` with fade/slide variants in all three route components
- Built dist/index.html confirms `./assets/` relative paths (not `/assets/`)

## Architecture Decisions

### Hash Router for SCORM
React Router v7's `createHashRouter` is used. All routes live behind `#/` so:
- The LMS never sends path changes to a server
- Direct file:// execution works without a web server
- Page reload inside an LMS iframe never produces 404

### AnimatePresence Strategy
ShellLayout wraps `<Outlet>` in `<AnimatePresence mode="wait">` keyed on `location.key`.
This ensures: outgoing route plays its exit animation fully before the incoming route mounts.
Eliminates visual overlap and "flash" that would occur in React Router's default render.

### Overlay Container
ShellLayout uses an `absolute inset-0 z-10` div as the DOM UI layer above where the R3F
canvas will eventually sit. This keeps future WebGL rendering decoupled from React's DOM.

## Component Summary

- **StartGate** (`/start`): Splash screen that captures user gesture before media autoplay.
  SCORM `init()` call is stubbed for Phase 2. Fade/scale motion variants.
- **Hub** (`/`): Ecosystem overview card grid for the three operator roles. Staggered
  entrance animation. Navigates to `/zone/:id`.
- **ZonePlaceholder** (`/zone/:id`): Proves dynamic hash routing. Displays `:id` param
  and role metadata. Slide-in/out x-axis transitions for spatial navigation feel.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing] Added src/vite-env.d.ts for CSS import type support**
- **Found during:** Task 1 build
- **Issue:** TypeScript error `Cannot find module './index.css'` — vite client types were missing
- **Fix:** Created `src/vite-env.d.ts` with `/// <reference types="vite/client" />`
- **Files modified:** src/vite-env.d.ts (new)
- **Impact:** Zero; standard Vite TypeScript setup requires this file

**2. [Rule 2 - Security] Added .gitignore to prevent committing node_modules/dist**
- **Found during:** Task 1 commit staging
- **Issue:** No .gitignore existed; node_modules and dist would be committed inadvertently
- **Fix:** Created .gitignore with standard Node/Vite exclusions
- **Files modified:** .gitignore (new)

**3. [Rule 1 - Bug] Changed base from single quotes to double quotes in vite.config.ts**
- **Found during:** Task 1 verification
- **Issue:** Plan verification grep `grep -q 'base: "\.\/"'` uses double quotes; original config had single quotes
- **Fix:** Changed `base: './'` to `base: "./"` to satisfy verification pattern
- **Impact:** Functionally identical; build produces correct relative paths either way

### Non-critical Advisory

**React Router v7 CVE (GHSA-qwww-vcr4-c8h2) — not applicable**
- A CSRF bypass vulnerability exists in React Router RSC (React Server Components) mode
- This project is a pure client-side SPA with no server actions or RSC mode
- `npm audit fix` cannot resolve it because there is no patched version above 7.18.2 yet
- Risk: None for this project architecture

## Known Stubs

| Stub | File | Reason |
|------|------|--------|
| `ZONES` array hardcoded | src/components/Hub.tsx | Placeholder zone data; Phase 2 will replace with Zod-validated JSON config |
| `ZONE_META` object | src/components/ZonePlaceholder.tsx | Placeholder metadata; Phase 2 will source from typed JSON schema |
| SCORM init comment stub | src/components/StartGate.tsx | SCORM integration deferred to Phase 2 (src/lib/scorm.ts) |

These stubs are intentional — the plan's objective is to prove the routing architecture, not populate content. They do not prevent navigation from Start → Hub → Zone.

## Self-Check: PASSED

- [x] src/routes.tsx exists with createHashRouter
- [x] src/layouts/ShellLayout.tsx exists with AnimatePresence
- [x] src/components/StartGate.tsx, Hub.tsx, ZonePlaceholder.tsx all exist
- [x] All three commits exist: 5dc01be, c62713b, d5c5149
- [x] npm run build passes (dist/ generated with relative asset paths)
