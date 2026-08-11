# Phase 1: Foundation — Design System, Shell & Content Pipeline — Research

**Researched:** 2026-08-11
**Domain:** Brownfield React 19 SPA shell rebuild — design tokens (Tailwind v4), HashRouter navigation, Zustand progress state, Zod content pipeline, vendor-neutrality scrub
**Confidence:** HIGH

## Summary

Phase 1 replaces the entire v0 app surface (7-scene R3F canvas app, store-driven navigation, "Warm Night" dark palette, Google-Fonts-CDN CSS) with the neutral "AV Context Trainer" shell defined by the approved UI-SPEC, and stands up the typed JSON content pipeline that Phases 2–3 consume. All required libraries are already installed and version-verified (react-router 7.7.0, zod 4.4.3, zustand 5.0.14, framer-motion 11.18.2, tailwindcss 4.1.8); only three small packages are new (`@fontsource/outfit`, `@fontsource/manrope`, `lucide-react`).

**Critical brownfield correction:** the ROADMAP/STATE "carry-over" claims are partially wrong. `src/lib/scorm.ts`, HashRouter, and StartGate **do not exist in the current tree** — they were deleted in commit `69d2e3d` ("Update waymo"). The SCORM 1.2 wrapper is recoverable verbatim from git history (`git show 155cdcc:src/lib/scorm.ts`, 182 lines, dependency-free, Reach-360 new-window aware). HashRouter never existed in this repo — routing is net-new code (patterns verified below). The v0 phase directories ARE already archived to `.planning/phases/_v0/` (uncommitted move).

**Primary recommendation:** Build the new shell additively (`src/config/branding.json` + `src/content/` pipeline + new shell components), swap `main.tsx`/`App.tsx`/`routes.tsx`/`index.css` in one atomic commit, then delete orphaned v0 files, then run the three gates: `tsc` build, `vitest`, and a repeatable vendor-scrub script (zero hits). Restore `scorm.ts` from git history rather than rewriting.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SHELL-01 | App shell matches design language (tokens, circular motifs, outline buttons) | §Architecture Patterns (3-layer token system), §Code Examples token CSS; UI-SPEC §6 is binding contract [VERIFIED: 01-UI-SPEC.md] |
| SHELL-02 | Start screen states AV-industry training + autoplay gesture gate | §Code Examples start gate; Chrome autoplay policy verified [CITED: developer.chrome.com/blog/autoplay] |
| SHELL-03 | HashRouter nav Lesson/Zone + dot-timeline + cinematic transitions, SCORM-compatible | react-router v7 declarative HashRouter verified [CITED: Context7 /remix-run/react-router]; AnimatePresence mode="wait" pattern verified [CITED: Context7 /grx7/framer-motion] |
| SHELL-04 | Global route-path progress viz + checkpoint badge slots from app state | Zustand persist store + SVG pathLength animation patterns below |
| SHELL-06 | RFP-neutral branding, swap-ready config | §Branding config layer, §v0 Scrub Strategy; identifier hygiene rules |
| CONT-01 | Zod schemas for v1 content model | Zod 4 safeParse-at-boundary verified [CITED: Context7 /colinhacks/zod]; tsconfig gap found (§Pitfall 2) |
| CONT-02 | New scenarios = content-only changes | Static JSON import + parse-at-boundary pattern; fixture test strategy in §Validation |
| CONT-03 | Retire/migrate old content model | §v0 Retirement Inventory — exact file list; only `scenario-data.ts` remains (ROADMAP confirmed) [VERIFIED: repo fs] |
| CONT-04 | Scrub all vendor references, keep branding config | §v0 Scrub Strategy — verified hit locations + grep gate script |
| ASST-01 | Asset manifest maintained at .planning/ASSETS.md | ASSETS.md exists and is current [VERIFIED: repo fs]; Phase 1 adds fonts/icons rows as ⚙/✅ |
</phase_requirements>

## Project Constraints (from PROJECT.md / ROADMAP.md / approved UI-SPEC)

No `./CLAUDE.md`, `./.claude/CLAUDE.md`, or `./AGENTS.md` exists in the repo root. [VERIFIED: repo fs] Binding constraints extracted from planning docs instead:

- **Tech stack frozen** (PROJECT.md): React 19, Vite, TypeScript, Tailwind v4, Framer Motion, Zustand; R3F only where needed. Do not propose alternatives. [VERIFIED: .planning/PROJECT.md]
- **RFP neutrality is a hard constraint**: no Waymo name/trademarks/logos/footage in UI, content, or code identifiers. Token names must be generic (`accentPrimary`, never `waymoBlue`). Working brand "AV Context Trainer". [VERIFIED: PROJECT.md, UI-SPEC]
- **UI-SPEC is approved and binding** (status: approved 2026-08-11): all colors, type scale (2 weights only: 400/600), spacing, motion durations/easings, copy strings, component contracts in `01-UI-SPEC.md` are locked. Planner must not re-litigate them. [VERIFIED: 01-UI-SPEC.md frontmatter]
- **Offline/SCORM**: no CDN at runtime (fonts self-hosted via @fontsource), Vite `base: './'`, HashRouter (works on file://), MotionConfig `reducedMotion="user"` mandatory. [VERIFIED: PROJECT.md, UI-SPEC]
- **Desktop-first ≥1024px**, must not break 768–1024px. [VERIFIED: UI-SPEC §Interaction]
- **v0 phase dirs already archived** to `.planning/phases/_v0/` (move uncommitted — executor should commit or leave for phase commit). [VERIFIED: repo fs + git status]

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Design tokens (3-layer) | CSS/Tailwind build layer | — | `@theme`/`@theme inline` compile-time; zero runtime cost [CITED: Context7 tailwindcss] |
| Branding config | App bootstrap (React context) | CSS `:root` overrides | Parsed once at boundary (Zod), applied as CSS-var overrides so token-driven components restyle with zero edits (UI-SPEC §7) |
| Routing/nav | Frontend SPA (HashRouter) | — | Hash URLs survive file:// + SCORM zip extraction; no server rewrites needed [ASSUMED: standard SPA practice] |
| Route transitions | Framer Motion (client) | — | AnimatePresence mode="wait" keyed on location [CITED: Context7 framer-motion] |
| Progress state | Zustand store (client) | localStorage via persist | Drives route-path SVG + checkpoint badges; persists across SCORM relaunch windows [CITED: Context7 zustand] |
| Content pipeline | Build-time static JSON + Zod boundary | — | No backend exists; parse-at-import keeps runtime failures impossible for shipped content [VERIFIED: existing v0 pattern per STATE.md] |
| Autoplay gesture gate | Browser/client tier | — | Chrome requires transient activation (click) before unmuted media; start-gate CTA captures it [CITED: developer.chrome.com/blog/autoplay] |
| SCORM bridge | Runtime integration (window.API) | — | Restored from git history; graceful no-op standalone; score hooks land Phase 3 (ASSESS-05) [VERIFIED: git 155cdcc] |

## Standard Stack

### Core (all already installed — versions verified against npm registry 2026-08-11)

| Library | Installed | Latest | Purpose | Decision |
|---------|-----------|--------|---------|----------|
| react / react-dom | ^19.1.0 | — | UI runtime | keep [VERIFIED: package.json] |
| react-router | ^7.7.0 | 8.3.0 | HashRouter declarative routing | **keep 7.7.0** — v8 only removes the `react-router-dom` shim we don't use; import from `react-router` is already v8-safe [VERIFIED: npm registry + Context7 changelog] |
| tailwindcss + @tailwindcss/vite | ^4.1.8 | 4.3.3 | CSS-first token system (`@theme`) | keep 4.1.8 [VERIFIED: npm registry] |
| framer-motion | ^11.18.2 | 13.1.0 | MotionConfig, AnimatePresence, SVG pathLength | keep 11.18.2 — API used is stable across 11→13; no migration upside [VERIFIED: npm registry] |
| zod | ^4.4.3 | 4.4.3 | content schema validation | keep (= latest) [VERIFIED: npm registry] |
| zustand | ^5.0.14 | 5.0.14 | progress store + persist | keep (= latest) [VERIFIED: npm registry] |
| vitest + @testing-library/react | 4.1.10 / ^16 | — | tests | keep; baseline green (11 pass, 6 skip) [VERIFIED: `npx vitest run`] |

### New installs (Phase 1)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @fontsource/outfit | 5.3.0 | Self-hosted Outfit (display face) | Official Fontsource packages, OFL, no CDN — required by offline/SCORM constraint [VERIFIED: npm registry + Context7 /fontsource/fontsource] |
| @fontsource/manrope | 5.3.0 | Self-hosted Manrope (body face) | Same [VERIFIED: npm registry + Context7] |
| lucide-react | 1.31.0 | Thin-stroke icons (check, play, triangle-alert) | UI-SPEC locked icon library; ISC; named imports tree-shake [VERIFIED: npm registry + UI-SPEC] |

**Installation:**
```bash
npm install @fontsource/outfit @fontsource/manrope lucide-react
```

**Deliberately NOT upgraded/installed:** no `motion` package (framer-motion stays), no react-router v8, no tailwind 4.3 bump, no eslint (lint script exists but eslint is not installed — `npm run lint` fails today; out of Phase 1 scope, do not gate on it). [VERIFIED: package.json, node_modules probe]

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @fontsource static weights | @fontsource-variable/* | Variable = 1 file per family but UI-SPEC locks exactly 2 weights (400/600) → static imports are smaller and exact. Use static. [CITED: Context7 fontsource] |
| Restore scorm.ts from git | Rewrite / pipwerks npm | pipwerks git-dep was blocked in v0 (commit 155cdcc documents this); restored file is 182 lines, tested pattern, zero deps. Restore, don't rewrite. [VERIFIED: git history] |
| HashRouter | BrowserRouter | BrowserRouter breaks on file:// and arbitrary SCORM extraction paths; HashRouter is mandatory (PROJECT.md). No real alternative. [VERIFIED: PROJECT.md] |

## Package Legitimacy Audit

Ran `gsd-tools query package-legitimacy check --ecosystem npm` + npm registry probes (2026-08-11):

| Package | Registry | Age (first publish) | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| @fontsource/outfit | npm | 2021-11-14 (~4.6 yrs) | 209K/wk | github.com/fontsource/font-files | [SUS] seam flag — see note | Approved with checkpoint |
| @fontsource/manrope | npm | 2020-12-23 (~5.6 yrs) | 234K/wk | github.com/fontsource/font-files | [SUS] seam flag — see note | Approved with checkpoint |
| lucide-react | npm | 2020-10-19 (~5.8 yrs) | 97M/wk | github.com/lucide-icons/lucide | [SUS] seam flag — see note | Approved with checkpoint |

**Note on SUS verdicts:** the seam's only reason was `too-new`, which keys on the *latest version's* publish date (all three shipped routine updates within the last month — normal for actively maintained packages). Counterevidence is strong: 4.6–5.8 year package age [VERIFIED: `npm view <pkg> time.created`], massive download counts, official org repos, **no postinstall scripts** [VERIFIED: `npm view <pkg> scripts`], licenses OFL/ISC, and all three are explicitly named in the approved UI-SPEC Registry Safety section. Per protocol the planner still inserts **one consolidated `checkpoint:human-verify`** before `npm install` (single user approval covering all three).

**Packages removed due to [SLOP] verdict:** none
**Packages flagged [SUS]:** all three above (false-positive heuristic; consolidated checkpoint)

## Architecture Patterns

### System Architecture Diagram

```
                 ┌──────────────────────────────────────────────────────┐
                 │                    BUILD TIME                        │
 src/content/*.json ──► Zod schemas (parse-at-boundary) ──► typed exports
 src/config/branding.json ──► BrandingSchema.parse ──► brand object
 @fontsource/*.css ──► bundled woff2 (no CDN)                          │
                 └──────────────────────────────────────────────────────┘
                                      │
                 ┌──────────────────────────────────────────────────────┐
                 │                    RUNTIME (SPA)                     │
 user click ──► StartGate ──► gesture flag (autoplay unlocked)          │
                 │      └──► HashRouter (#/lesson, #/zone, *→/lesson)  │
                 │               │                                      │
                 │      AnimatePresence mode="wait" (cinematic swap)    │
                 │               │                                      │
                 │      LessonSurface / ZonePlaceholder                 │
                 │               │ reads tokens (bg-surface, text-ink)  │
                 │               ▼                                      │
                 │      CSS layers: --primitive-* → --sem-* → @theme    │
                 │      inline utilities  [data-theme="audit"] overrides│
                 │                                                      │
 progress store (Zustand + persist localStorage)                       │
        ├──► RoutePath SVG (pathLength anim) + checkpoint nodes        │
        └──► DotTimeline scrubber state                                │
                 │                                                      │
 scorm.ts (window.API walk) ──► LMS (Reach 360) or graceful no-op      │
                 └──────────────────────────────────────────────────────┘
```

### Recommended Project Structure (new/changed files)

```
src/
├── config/
│   └── branding.json            # swap-ready brand config (UI-SPEC §7 shape)
├── content/
│   ├── schemas.ts               # Zod schemas: lesson/world/scenario/tier/scorecard/branding
│   ├── index.ts                 # parse-at-boundary exports (single import point)
│   ├── lessons.json             # v1 lesson skeleton (Phase 2 fills)
│   ├── worlds.json              # Phoenix + SF world stubs
│   ├── scenarios.json           # empty/stub scenario array
│   ├── tiers.json               # Foundation/Proficient/Advanced defs
│   └── scorecard.json           # 4-category mapping skeleton
├── shell/
│   ├── BrandProvider.tsx        # parses config once, applies CSS-var overrides
│   ├── StartGate.tsx            # SHELL-02 landing + gesture capture
│   ├── TopNav.tsx               # floating pill nav (Lesson/Zone)
│   ├── DotTimeline.tsx          # scrubber (tablist a11y, reused Phase 2)
│   ├── RoutePath.tsx            # SHELL-04 SVG progress viz
│   ├── surfaces/
│   │   ├── LessonSurface.tsx    # placeholder (Phase 2 fills)
│   │   └── ZonePlaceholder.tsx  # "Zone coming soon" empty state
│   └── states/                  # Loading/Empty/Error/VideoSlot/ComingSoonCard
├── store/
│   └── progressStore.ts         # Zustand + persist: checkpoints, visited, completion
├── lib/
│   ├── scorm.ts                 # RESTORED from git 155cdcc
│   └── webgl.ts                 # keep (v0, harmless, may serve Phase 3)
├── App.tsx                      # REWRITTEN: MotionConfig > BrandProvider > HashRouter > shell
├── main.tsx                     # REWRITTEN: font imports + initSCORM + createRoot
├── routes.tsx                   # REWRITTEN: Routes + AnimatePresence transitions
└── index.css                    # REWRITTEN: token layers, no CDN import
```

### Pattern 1: Three-layer tokens with `@theme inline` (SHELL-01)

**What:** primitives (raw hex) → semantic (role vars) → Tailwind utilities. `@theme inline` is REQUIRED when theme vars reference other CSS vars — otherwise utilities resolve against the wrong scope and `[data-theme]` overrides break. [CITED: Context7 /tailwindlabs/tailwindcss.com]

**Example:** see §Code Examples #1.

### Pattern 2: Parse-at-boundary content pipeline (CONT-01/02)

**What:** static JSON imports validated once at module boundary; the rest of the app only sees typed data. `safeParse`/`parse` result discriminated on `.success`. [CITED: Context7 /colinhacks/zod]

### Pattern 3: Exit-before-enter route transitions (SHELL-03)

**What:** `AnimatePresence mode="wait"` wrapping a motion container keyed on `location.pathname` inside HashRouter. 600ms enter / 200ms exit per UI-SPEC Motion Contract. [CITED: Context7 /grx7/framer-motion]

### Pattern 4: Store-driven progress viz (SHELL-04)

**What:** single Zustand store (persisted) holds checkpoint array + statuses; RoutePath SVG and DotTimeline both subscribe. SVG progress stroke animates `pathLength` 0→current. Never hardcoded. [CITED: Context7 /pmndrs/zustand + UI-SPEC §4]

### Anti-Patterns to Avoid

- **Referencing `var(--sem-*)` inside plain `@theme`** → utilities break under theme override; use `@theme inline`. [CITED: Context7 tailwindcss]
- **Google Fonts / any CDN `@import`** → breaks offline/file:///SCORM. v0 index.css line 1 does exactly this — delete. [VERIFIED: src/index.css]
- **Hardcoded brand strings in components** → everything reads `brand.name` from BrandProvider. [VERIFIED: UI-SPEC §7]
- **Animating width/height/top/left** → UI-SPEC bans; opacity + transform only. [VERIFIED: UI-SPEC Motion Contract]
- **Deleting v0 files before the new entrypoints compile** → tsc fails mid-flight; build new shell first, swap entries, then delete orphans (§Retirement Inventory order).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SCORM 1.2 protocol | New wrapper from scratch | Restore `git show 155cdcc:src/lib/scorm.ts` | 182-line tested impl: 7-frame window walk, opener check for Reach 360, graceful standalone degradation [VERIFIED: git history] |
| Font hosting | CSS @font-face by hand / CDN | @fontsource packages | Correct unicode-range splitting, woff2, license files bundled [CITED: Context7 fontsource] |
| Icons | Custom SVG set | lucide-react named imports | UI-SPEC locked; tree-shakes; 1.5px-stroke aesthetic matches [VERIFIED: UI-SPEC] |
| Content validation | Runtime type guards | Zod schemas + z.infer | Single source of truth for runtime check + static type [CITED: Context7 zod] |
| Route-path draw math | Manual stroke-dasharray bookkeeping | framer-motion `pathLength` prop on motion.path | Normalized 0–1 animation, reduced-motion aware [ASSUMED: standard framer-motion SVG usage] |

## Runtime State Inventory

Scrub/retire phase → all five categories answered explicitly:

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | localStorage: v0 store is NOT persisted (no persist middleware in v0 useStore) → no legacy keys. New progressStore will create `av-trainer-progress` key. SCORM LMS-side learner records: none yet (demo never launched). [VERIFIED: src/store/useStore.ts] | none (new key names only — keep them vendor-neutral) |
| Live service config | None — no external services configured (no CI secrets, no dashboards). [VERIFIED: repo fs] | none |
| OS-registered state | None — no scheduled tasks/registered apps. | none |
| Secrets/env vars | None — no .env files, no secrets in repo. [VERIFIED: .gitignore + fs scan] | none |
| Build artifacts | `dist/` exists locally with v0 build (contains "Waymo Lifecycle Training Module" title) — gitignored but on disk; `package-lock.json` embeds name `waymo-lifecycle-module`; `node_modules/.vite` cache | delete/rebuild dist after scrub; `npm install` after package.json rename regenerates lockfile name |

## Common Pitfalls

### Pitfall 1: `@theme` vs `@theme inline` confusion
**What goes wrong:** `--color-surface: var(--sem-surface)` inside plain `@theme` emits utilities that reference `--color-surface` indirectionly; `[data-theme="audit"]` overrides of `--sem-*` don't propagate, or opacity modifiers break.
**How to avoid:** All semantic→utility mappings go in `@theme inline`; raw primitive values may live in plain `:root`. [CITED: Context7 tailwindcss]
**Warning signs:** dark audit stub tokens don't change rendered colors when `data-theme` toggles.

### Pitfall 2: JSON imports fail `tsc` — resolveJsonModule missing
**What goes wrong:** `import lessons from './lessons.json'` compiles in Vite but `npm run build` (`tsc && vite build`) fails: tsconfig.json has NO `resolveJsonModule` flag.
**How to avoid:** Add `"resolveJsonModule": true` to tsconfig.json compilerOptions as a Wave-0 task. [VERIFIED: tsconfig.json inspection]
**Warning signs:** TS2732 errors on first JSON import.

### Pitfall 3: Deletion order breaks the build
**What goes wrong:** Deleting v0 views/components while `App.tsx`/`routes.tsx`/tests still import them → tsc + vitest collection failures; 3 test files reference v0 components and die with them.
**How to avoid:** Sequence: (1) add new shell + pipeline, (2) rewrite App/main/routes/index.css in one commit, (3) delete orphaned v0 files + their tests, (4) run `tsc` + `vitest` gates. [VERIFIED: current import graph]
**Warning signs:** "Cannot find module" cascades.

### Pitfall 4: AnimatePresence + lazy/Suspense interplay
**What goes wrong:** `mode="wait"` waits for exit, but a Suspense fallback inside the exiting/entering subtree causes double-mount flicker or skipped exit animations.
**How to avoid:** Phase 1 has only 2 lightweight routes — skip `lazy()` entirely (v0 used it; not needed). If code-splitting returns later, put Suspense INSIDE the keyed motion wrapper. [ASSUMED: widely reported integration behavior]
**Warning signs:** exit animation never plays on route change.

### Pitfall 5: Vendor substrings in identifiers
**What goes wrong:** tokens like `--waymo-blue`, files like `waymo-nav.tsx`, comments naming the client slip through a content-only scrub.
**How to avoid:** Scrub script greps code AND content AND copy with pattern list (`waymo`, `wayo`, case-insensitive); UI-SPEC mandates generic names (`accentPrimary`). Run as failing gate, not manual check. [VERIFIED: UI-SPEC §7 identifier hygiene]
**Warning signs:** any hit in `src/`, `index.html`, `package.json`, `dist/`.

### Pitfall 6: package-lock + dist retain old name after rename
**What goes wrong:** package.json renamed to neutral name but lockfile `"name": "waymo-lifecycle-module"` and stale `dist/` keep vendor strings.
**How to avoid:** `npm install` after rename (regenerates lockfile name); delete `dist/` and rebuild; scrub script must also scan `dist/` post-build. [VERIFIED: package-lock.json contains name]
**Warning signs:** scrub passes on src but fails on dist.

### Pitfall 7: localStorage under file:// / SCORM new-window
**What goes wrong:** some LMS webviews / file:// contexts throw on localStorage access → persist middleware crashes app boot.
**How to avoid:** `createJSONStorage(() => localStorage)` wrapped in try/catch fallback to in-memory (zustand supports storage that returns null gracefully); keep persisted shape tiny. [ASSUMED: defensive practice; zustand docs note storage must handle errors]
**Warning signs:** app white-screens only inside LMS launch.

### Pitfall 8: Reduced motion is not just MotionConfig
**What goes wrong:** `MotionConfig reducedMotion="user"` disables transform animations but CSS keyframe animations (v0-style `@keyframes` in index.css) and non-motion transitions ignore it.
**How to avoid:** keep all animation in framer-motion where possible; for CSS pulses (checkpoint halo), gate with `@media (prefers-reduced-motion: reduce)` override per UI-SPEC. [CITED: UI-SPEC Motion Contract rules]
**Warning signs:** pulse/spin still animates under OS reduced-motion setting.

## Code Examples

### 1. Token architecture (index.css skeleton) [CITED: Context7 tailwindcss + UI-SPEC §6]

```css
@import "tailwindcss";

:root {
  /* Layer 1 — primitives (raw values, never consumed directly) */
  --primitive-off-white: #F5F7FA;
  --primitive-navy-900: #1E2340;
  --primitive-blue-500: #0080FF;
  --primitive-teal-400: #00E59B;
  --primitive-red-500: #D64545;

  /* Layer 2 — semantic (theme-switchable) */
  --sem-surface: var(--primitive-off-white);
  --sem-card: #FFFFFF;
  --sem-ink: var(--primitive-navy-900);
  --sem-accent: var(--primitive-blue-500);
  --sem-accent-2: var(--primitive-teal-400);
  --sem-error: var(--primitive-red-500);
  --sem-focus: var(--primitive-blue-500);
  --sem-border: rgba(30, 35, 64, 0.08);
}

/* Dark audit theme — stubbed Phase 1, consumed Phase 3 */
[data-theme="audit"] {
  --sem-surface: #0A0F24;
  --sem-card: #141B38;
  --sem-ink: #E8ECF8;
}

/* Layer 3 — Tailwind utilities. `inline` REQUIRED: vars reference other vars */
@theme inline {
  --color-surface: var(--sem-surface);
  --color-card: var(--sem-card);
  --color-ink: var(--sem-ink);
  --color-accent: var(--sem-accent);
  --color-accent-2: var(--sem-accent-2);
  --color-error: var(--sem-error);
  --color-line: var(--sem-border);
  --font-display: "Outfit", sans-serif;
  --font-body: "Manrope", sans-serif;
  --radius-sm: 8px; --radius-md: 16px; --radius-lg: 24px;
  --radius-xl: 32px; --radius-pill: 9999px;
  --shadow-lift: 0 1px 2px rgba(30,35,64,0.06);
  --shadow-float: 0 12px 32px rgba(30,35,64,0.10);
}
/* → classes: bg-surface, text-ink, border-line, bg-accent, rounded-pill, font-display */
```

### 2. Router + cinematic transitions (routes/App) [CITED: Context7 react-router + framer-motion]

```tsx
// App.tsx
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, y: -16, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } }}
      >
        <Routes location={location}>
          <Route path="/lesson" element={<LessonSurface />} />
          <Route path="/zone" element={<ZonePlaceholder />} />
          <Route path="*" element={<Navigate to="/lesson" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrandProvider>
        <HashRouter>
          <StartGate> {/* gates first render until CTA click */}
            <TopNav />
            <AnimatedRoutes />
            <RoutePath />
          </StartGate>
        </HashRouter>
      </BrandProvider>
    </MotionConfig>
  );
}
```

### 3. Zod parse-at-boundary [CITED: Context7 zod]

```ts
// src/content/schemas.ts
import { z } from 'zod';

export const TierSchema = z.object({
  id: z.enum(['foundation', 'proficient', 'advanced']),
  label: z.string(),
  overlay: z.enum(['none', 'perception', 'bev-telemetry']),
});

export const ScenarioSchema = z.object({
  id: z.string(),
  worldId: z.enum(['phoenix', 'san-francisco']),
  clip: z.object({ slot: z.string(), src: z.string().nullable(), poster: z.string() }),
  hazards: z.array(z.object({
    t: z.number(),
    category: z.enum(['vehicles', 'pedestrians', 'signs', 'road-marks']),
    hitRegion: z.object({ x: z.number(), y: z.number(), w: z.number(), h: z.number() }),
    window: z.tuple([z.number(), z.number()]),
    points: z.number(),
    explanation: z.string(),
    avHandling: z.string(),
  })),
});

// src/content/index.ts — the ONLY place raw JSON is touched
import scenariosRaw from './scenarios.json';
const result = z.array(ScenarioSchema).safeParse(scenariosRaw);
if (!result.success) throw new Error(`Content pipeline invalid: ${result.error.message}`);
export const scenarios = result.data;   // typed, validated, tree-shakable
```

### 4. Progress store (SHELL-04) [CITED: Context7 zustand]

```ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type CheckpointStatus = 'locked' | 'active' | 'complete';
interface ProgressState {
  checkpoints: { id: string; label: string; status: CheckpointStatus }[];
  gestureCaptured: boolean;
  captureGesture: () => void;
  setCheckpoint: (id: string, status: CheckpointStatus) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      checkpoints: [
        { id: 'lesson', label: 'Lesson', status: 'active' },
        { id: 'zone', label: 'Zone', status: 'locked' },
      ],
      gestureCaptured: false,
      captureGesture: () => set({ gestureCaptured: true }),
      setCheckpoint: (id, status) =>
        set((s) => ({ checkpoints: s.checkpoints.map((c) => (c.id === id ? { ...c, status } : c)) })),
    }),
    {
      name: 'av-context-trainer-progress',   // neutral key — CONT-04
      storage: createJSONStorage(() => localStorage), // wrap in try/catch fallback for file:// safety
      partialize: (s) => ({ checkpoints: s.checkpoints, gestureCaptured: s.gestureCaptured }),
    },
  ),
);
```

### 5. Start-gate gesture capture (SHELL-02) [CITED: developer.chrome.com/blog/autoplay]

```tsx
// CTA click IS the transient activation — set flag, then route.
<button onClick={() => { captureGesture(); /* future: audioCtx.resume() */ navigate('/lesson'); }}>
  Begin Training
</button>
```
Chrome blocks unmuted `<video>/<audio>.play()` and Web Audio resume until a user gesture on the document; the start-gate CTA click satisfies this for the session. No media may autoplay before it. [CITED: developer.chrome.com/blog/autoplay, chromium.org/audio-video/autoplay]

### 6. Scrub gate script (CONT-04, repeatable for Phase 4)

```jsonc
// package.json
{ "scripts": { "scrub": "node scripts/scrub-check.mjs" } }
```
```js
// scripts/scrub-check.mjs — fail CI-style gate; scans src, index.html, package.json, dist
// patterns: /waymo/i, /wayo/i (mascot name), plus known v0 asset stems
// exit 1 with file:line list on any hit; exit 0 = neutral
```

## v0 Retirement Inventory (CONT-03) [VERIFIED: repo fs]

Old content JSONs (ecosystem/zones/incidents/lessons) are ALREADY absent — ROADMAP confirmed; work = delete remaining v0 code + verify.

**Delete after new shell compiles (with their tests):**
- `src/views/SceneL1..L3.tsx`, `SceneZ1..Z4.tsx` (7 files)
- `src/components/`: AIGuide, CanvasSequence, ContinueArrow, GlowRing, JogDial, LidarCloud, LidarSVGFallback, ProgressDots, SceneShell, SpeechBubble, TriageConsole, `dom/__tests__/SpeechBubble.test.tsx`
- `src/components/three/*` (7 files + 4 tests) — R3F v0 scenes
- `src/hooks/useTypewriter.ts` + test
- `src/store/useStore.ts`, `src/store/triageSlice.ts`
- `src/content/scenario-data.ts` (last v0 content file; RTOR/four-way concepts re-enter as v1 JSON content in Phase 2, not as TS)
- `src/types.ts` (v0 scene registry), `src/routes.tsx` (replaced)
- `src/assets/*` — wayo-*.png (mascot), icon-*.gif/png, bg-*.png, *.mp4 (all v0-branded/retired; v1 assets procured separately per ASSETS.md)

**Keep:** `src/lib/webgl.ts` (harmless utility), three/R3F npm deps (Phase 3 may reuse for BEV/lidar — PROJECT.md allows R3F "where needed").

**Rewrite in place:** `App.tsx`, `main.tsx`, `routes.tsx` (→ router), `index.css` (tokens; delete Google-Fonts `@import` line 1 + all Warm Night vars + `.glass-panel`/`.warm-glow`).

**Restore:** `src/lib/scorm.ts` ← `git show 155cdcc:src/lib/scorm.ts > src/lib/scorm.ts`; wire `initSCORM()` in main.tsx before createRoot (as v0 did).

## v0 Scrub Strategy (CONT-04) — verified hit map

| Location | Hit | Action |
|----------|-----|--------|
| `src/**` | **zero** "waymo" hits today [VERIFIED: grep] | maintain via scrub gate |
| `index.html` `<title>` | "Waymo Lifecycle Training Module" [VERIFIED] | → "AV Context Trainer" |
| `package.json` `name` | "waymo-lifecycle-module" [VERIFIED] | → "av-context-trainer"; re-run npm install (lockfile name) |
| `package-lock.json` | name embedded [VERIFIED] | regenerated by npm install |
| Root v0 docs: DESIGN.md (8 hits), DESIGN-SPEC.md (24), prototype-plan.md (4), waymo-lifecycle-module-brief.md (filename), compass_artifact_wf-*.md [VERIFIED: Select-String] | move to `.planning/phases/_v0/docs/` or delete (planner decision — see Open Q1) |
| `dist/` | stale v0 build on disk (gitignored) [VERIFIED] | delete + rebuild after scrub |
| `.planning/*` | references Waymo as design reference intentionally (PROJECT.md documents inspiration) | OUT of scrub scope — internal planning docs, never shipped (assumption A1) |
| Git history + repo folder name `...\Waymo` | immutable / user-managed | out of scope (assumption A2/A4) |

**Verification approach:** `npm run scrub` gate (pattern list above) over `src/`, `index.html`, `package.json`, `dist/` post-build — zero hits required. Phase 4 re-runs the same script on final build (its success criterion 5).

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js | CSS-first `@theme` in CSS files | Tailwind v4 (2025) | Repo already v4; no config file needed [VERIFIED: @tailwindcss/vite installed] |
| `react-router-dom` imports | import from `react-router` | RR v7 (2024) → v8 removes shim | We already depend on `react-router` only — v8-safe [CITED: Context7 changelog] |
| framer-motion package | `motion` package (rename, same API `motion/react`) | v12+ (2025) | Keep framer-motion 11.18.2 — no migration needed; both still published [VERIFIED: npm registry] |
| Zod 3 `z.string().email()` style | Zod 4 top-level `z.email()` etc. | Zod 4 (2025) | Core object/enum/literal/safeParse API unchanged; use v4 idioms where convenient [CITED: Context7 zod] |

**Deprecated/outdated:** Google Fonts CDN runtime imports (offline constraint kills them here regardless); `react-router-dom` package (do not add).

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `.planning/` internal docs may keep vendor references (never shipped; Phase 4 verifies built output/content/copy only) | Scrub Strategy | If client demands repo-wide scrub incl. planning docs, extra pass needed — cheap to add later |
| A2 | Git history retaining vendor names is acceptable (RFP ships dist zip / SCORM package, not the repo) | Scrub Strategy | If repo itself is delivered, history rewrite needed — flag to user before delivery |
| A3 | three/R3F/@react-spring/@use-gesture deps stay installed for Phase 3 reuse | Retirement Inventory | Minor bundle/install bloat if unused; removable in Phase 4 cleanup |
| A4 | Repo folder rename (C:\...\Waymo) is out of scope | Scrub Strategy | Cosmetic only; folder name never ships |
| A5 | SUS legitimacy flags for @fontsource/* + lucide-react are false positives (age/downloads/repo/no-postinstall evidence) | Package Legitimacy Audit | Near-zero; consolidated human-verify checkpoint still inserted per protocol |
| A6 | AnimatePresence+lazy Suspense flicker behavior (why lazy() is skipped Phase 1) | Pitfall 4 | Low — only 2 routes; revisit if code-splitting needed |
| A7 | localStorage defensive wrapper needed under file:///LMS webviews | Pitfall 7 | Low — worst case progress not persisted in exotic hosts |

## Open Questions

1. **Root v0 docs disposition** — DESIGN.md / DESIGN-SPEC.md / prototype-plan.md / waymo-lifecycle-module-brief.md / compass artifact: archive to `.planning/phases/_v0/docs/` (recommended, preserves history) vs delete outright. Planner may decide; archive is the safe default.
2. **Audio beyond gesture flag** — Phase 1 has no audio features yet; gesture capture stores a boolean for later phases. If Phase 2/3 add audio, they consume `gestureCaptured` — no Phase 1 change needed.
3. **RoutePath placement** (fixed right rail vs section footer band) — UI-SPEC explicitly delegates to planner; contract = always store-driven.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | build/test | ✓ | v26.1.0 | — |
| npm | installs | ✓ | 12.0.1 | — |
| npm registry | 3 new packages | ✓ | reachable (probed) | vendor fonts manually if registry blocked (Fontsource API zip exists [CITED: Context7 fontsource]) |
| External services | — | n/a | none required | — |

**Missing dependencies with no fallback:** none.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.10 + @testing-library/react ^16 + jsdom 26 (installed) [VERIFIED: package.json] |
| Config file | `vite.config.ts` `test` block + `vitest.setup.ts` [VERIFIED: repo fs] |
| Quick run command | `npx vitest run` |
| Full suite command | `npm run build; npx vitest run; npm run scrub` (build = `tsc && vite build`) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | All content JSONs parse through Zod schemas; invalid fixture rejected | unit | `npx vitest run src/content/__tests__/schemas.test.ts -t "content"` | ❌ Wave 0 |
| CONT-02 | Adding a scenario JSON entry requires no code change (fixture append → still parses) | unit | same file `-t "content-only"` | ❌ Wave 0 |
| CONT-03 | v0 files absent + tsc green after deletion | build gate | `npm run build` | ✅ existing script |
| CONT-04 / SHELL-06 | Zero vendor hits in src/index.html/package.json/dist | script gate | `npm run scrub` | ❌ Wave 0 (scripts/scrub-check.mjs) |
| SHELL-02 | Start gate renders industry statement verbatim + CTA click sets gesture flag | RTL unit | `npx vitest run src/shell/__tests__/StartGate.test.tsx` | ❌ Wave 0 |
| SHELL-03 | HashRouter navigates Lesson↔Zone, unknown hash → /lesson, no full reload | RTL unit | `npx vitest run src/shell/__tests__/routing.test.tsx` | ❌ Wave 0 |
| SHELL-04 | RoutePath + checkpoints re-render from store transitions (locked→active→complete) | RTL unit | `npx vitest run src/shell/__tests__/RoutePath.test.tsx` | ❌ Wave 0 |
| SHELL-06 | Branding config override applies CSS-var overrides + wordmark swap | RTL unit | `npx vitest run src/shell/__tests__/branding.test.tsx` | ❌ Wave 0 |
| SHELL-01 | Tokens resolve (bg-surface/text-ink utilities exist; computed color check) | unit + visual | `npx vitest run src/shell/__tests__/tokens.test.ts` + manual screenshot | ❌ Wave 0 |
| ASST-01 | ASSETS.md rows updated (fonts ⚙→✅, lucide ✅) | manual checklist | review | ✅ file exists |
| UI-SPEC backstops | 32-char wordmark in nav pill; -45° labels at 1024px | manual visual | dev-server check | n/a (held-out per UI-SPEC) |

### Sampling Rate
- **Per task commit:** `npx tsc --noEmit` + targeted `npx vitest run <file>`
- **Per wave merge:** `npm run build; npx vitest run; npm run scrub`
- **Phase gate:** full suite green + scrub zero hits + manual start-gate walkthrough before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] tsconfig.json: add `"resolveJsonModule": true` (Pitfall 2 — blocks all JSON imports)
- [ ] Optional hygiene: `vite.config.ts` imports `defineConfig` from `'vite'` but carries a `test` block → LSP error (harmless: tsc only includes `src/`); switch import to `'vitest/config'` when touching the file
- [ ] `scripts/scrub-check.mjs` + package.json `scrub` script
- [ ] Test files listed in map above
- [ ] Consolidated `checkpoint:human-verify` for the 3 SUS-flagged (false-positive) package installs

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | — (no auth in static training module) |
| V3 Session Management | no | — |
| V4 Access Control | no | — |
| V5 Input Validation | yes | Zod parse-at-boundary for ALL content JSON + branding config (never trust raw import) [CITED: Context7 zod] |
| V6 Cryptography | no | — |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via content JSON strings | Tampering | Content is static/bundled (no user input, no dangerouslySetInnerHTML); React auto-escapes — keep it that way; ban `dangerouslySetInnerHTML` in Phase 1 code |
| Supply-chain (npm) | Tampering | Package Legitimacy Audit above; lockfile committed; 3 installs gated by checkpoint |
| localStorage injection | Tampering | persist rehydration goes through JSON.parse inside zustand createJSONStorage; keep schema-tolerant rehydration (partialize + default merge); wrap in try/catch (Pitfall 7) |
| CDN dependency / offline failure | DoS | Zero runtime CDNs — fonts/icons bundled (verified constraint) |

## Sources

### Primary (HIGH confidence — verified in repo/tooling)
- Repo inspection: package.json, tsconfig.json, vite.config.ts, src/** inventory, git history (155cdcc scorm.ts, 69d2e3d deletion), grep/Select-String vendor hit map, `npx vitest run` baseline, `npm view` version/age/scripts probes
- `.planning/PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, `ASSETS.md`, approved `01-UI-SPEC.md`

### Secondary (MEDIUM confidence — official docs via Context7/web)
- Context7 `/tailwindlabs/tailwindcss.com` — @theme inline, custom variants
- Context7 `/remix-run/react-router` — v7 declarative mode, v8 import changes, splat redirect
- Context7 `/colinhacks/zod` — safeParse, z.infer, unions
- Context7 `/grx7/framer-motion` — MotionConfig reducedMotion, AnimatePresence mode="wait"
- Context7 `/pmndrs/zustand` — persist, partialize, useShallow
- Context7 `/fontsource/fontsource` — static vs variable imports
- Context7 `/vitejs/vite` — JSON imports, base './'
- scorm.com SCORM Run-Time Reference (via search) — cmi.core.lesson_status/score values
- developer.chrome.com/blog/autoplay + chromium.org/audio-video/autoplay — gesture requirement

### Tertiary (LOW confidence)
- None — all claims sourced or tagged [ASSUMED] in Assumptions Log.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — every version verified against npm registry + installed package.json
- Architecture: HIGH — UI-SPEC binding + patterns verified against official docs via Context7
- Brownfield audit: HIGH — direct fs/git verification of every claim (incl. disproving ROADMAP carry-over claims)
- Pitfalls: HIGH (3 verified in-repo) / MEDIUM (integration behavior, tagged)

**Research date:** 2026-08-11
**Valid until:** 2026-09-10 (stable stack; re-verify if react-router v8 or tailwind 4.3 upgrade becomes desirable)
