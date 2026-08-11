---
phase: 1
slug: foundation-design-system-shell-content-pipeline
# Status lifecycle: draft (seeded by plan-phase) → validated (validate-phase §6).
# audit-milestone distinguishes NOT-VALIDATED drafts from PARTIAL validated+nyquist_compliant:false (#2117).
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-08-11
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

## Test Infrastructure

| Item | Value |
|------|-------|
| Framework | Vitest 4.1.10 + @testing-library/react ^16 + jsdom 26 (installed, verified) |
| Config file | `vite.config.ts` test block + `vitest.setup.ts` |
| Quick run command | `npx vitest run` |
| Full suite command | `npm run build; npx vitest run; npm run scrub` (build = `tsc && vite build`) |
| Estimated runtime | ~10s quick / ~60s full incl. build |

## Sampling Rate

- After every **task commit**: run quick feedback — `npx tsc --noEmit` + targeted vitest file(s) for the touched requirement.
- After every **plan wave**: run full suite (`npm run build; npx vitest run; npm run scrub`).
- Before **/gsd-verify-work**: full suite green + scrub zero vendor hits + manual start-gate walkthrough.
- Max feedback latency: 60 seconds (full suite budget).

## Per-Task Verification Map

> Task IDs seeded per requirement; planner assigns concrete Task IDs. Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky.

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| TBD | 01 | W0 | CONT-01 | — | Zod parse-at-boundary for all content JSON | unit | `npx vitest run -t "content"` (schemas.test.ts: valid parse + invalid fixture rejected) | ❌ Wave 0 | ⬜ |
| TBD | 01 | W0 | CONT-02 | — | Content-only scenario addition, no code change | unit | `npx vitest run -t "content-only"` (schemas.test.ts) | ❌ Wave 0 | ⬜ |
| TBD | 01 | W1 | CONT-03 | — | v0 content retired; build still green | build gate | `npm run build` | ✅ existing script | ⬜ |
| TBD | 01 | W1 | CONT-04 | — | Zero vendor/client identifiers in code+content | script gate | `npm run scrub` (scripts/scrub-check.mjs) | ❌ Wave 0 | ⬜ |
| TBD | 01 | W2 | SHELL-02 | — | Verbatim AV-industry statement + CTA gesture capture | component | `npx vitest run StartGate.test.tsx` | ❌ Wave 0 | ⬜ |
| TBD | 01 | W2 | SHELL-03 | — | HashRouter Lesson↔Zone, unknown hash → /lesson, no full reload | component | `npx vitest run routing.test.tsx` | ❌ Wave 0 | ⬜ |
| TBD | 01 | W2 | SHELL-04 | — | Route path renders store transitions locked→active→complete | component | `npx vitest run RoutePath.test.tsx` | ❌ Wave 0 | ⬜ |
| TBD | 01 | W2 | SHELL-06 | — | Branding config CSS-var overrides + wordmark swap; no dangerouslySetInnerHTML; no runtime CDNs | unit | `npx vitest run branding.test.tsx` | ❌ Wave 0 | ⬜ |
| TBD | 01 | W1 | SHELL-01 | — | Token system: primitives→semantic→component layers | unit + manual | `npx vitest run tokens.test.ts` + visual screenshot check | ❌ Wave 0 | ⬜ |
| TBD | 01 | W1 | ASST-01 | — | Procurement manifest rows updated as assets land | manual checklist | Review `.planning/ASSETS.md` status column | ✅ file exists | ⬜ |

## Wave 0 Requirements

- [ ] `tsconfig.json`: add `"resolveJsonModule": true` (Pitfall 2 — JSON content imports fail tsc without it)
- [ ] `vite.config.ts`: switch test-config import to `vitest/config` when touching the file (optional hygiene)
- [ ] `scripts/scrub-check.mjs` + `package.json` `"scrub"` script (vendor-identifier gate for CONT-04 / SHELL-06, reused in Phase 4)
- [ ] Test files: `schemas.test.ts`, `StartGate.test.tsx`, `routing.test.tsx`, `RoutePath.test.tsx`, `branding.test.tsx`, `tokens.test.ts`
- [ ] Consolidated `checkpoint:human-verify` for the 3 SUS-flagged (false-positive "too-new") package installs: @fontsource/outfit, @fontsource/manrope, lucide-react

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Token visual fidelity (colors, radius, shadows match UI-SPEC) | SHELL-01 | Pixel-level visual judgment | Dev server; screenshot start gate + nav; compare against UI-SPEC token table |
| 32-char wordmark fits nav pill (UI-SPEC backstop) | SHELL-06 | Held-out UI-state visual test per UI-SPEC | Set branding config name to 32 chars; inspect nav pill at 1024px |
| -45° scrubber labels don't collide at 1024px (UI-SPEC backstop) | SHELL-03 | Held-out UI-state visual test per UI-SPEC | 6+ sections in scrubber; inspect at 1024–1280px widths |
| Procurement manifest currency | ASST-01 | Documentation state, not code | Check `.planning/ASSETS.md` rows reflect procured assets |

## Validation Sign-Off

- [ ] Every task has automated verification or an explicit Wave-0 dependency
- [ ] No 3 consecutive tasks without automated verification
- [ ] Wave 0 covers all MISSING test-file references in the map
- [ ] No watch-mode flags in any automated command
- [ ] Feedback latency < 60s (full suite budget)
- [ ] `nyquist_compliant: true` set once all above hold

**Approval:** pending
