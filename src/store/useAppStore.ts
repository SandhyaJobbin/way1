/**
 * Global Zustand App Store
 *
 * Central state for the Waymo Lifecycle Interactive Training Module.
 * Tracks SCORM connection, learner progress, and current zone navigation.
 *
 * Design decisions (from 01-CONTEXT.md D-11):
 *   - `progress` (0–1) represents the jog dial / scrubber position.
 *   - setProgress is throttled to prevent excessive LMS commits on each
 *     animation frame tick while the user is scrubbing. Progress writes
 *     to store state immediately (for UI reactivity), but SCORM saves
 *     are debounced via the throttled action.
 *   - Raw spring/motion values bypass the store (handled in R3F layer);
 *     this store tracks the canonical settled progress for persistence.
 */

import { create } from 'zustand'
import { SCORM } from '../lib/scorm'

// ── Types ───────────────────────────────────────────────────────────────────

export interface AppState {
  /** Whether a live SCORM 1.2 LMS API was found and initialized */
  scormConnected: boolean

  /** Normalized 0–1 scrubber progress (persisted to SCORM cmi.core.lesson_location) */
  progress: number

  /** Active zone id (e.g. 'triage-ops', 'mcpi'), null when at Hub */
  currentZone: string | null

  // ── Actions ──────────────────────────────────────────────────────────────

  /** Call once at startup after SCORM.init() resolves */
  setScormConnected: (connected: boolean) => void

  /**
   * Update scrubber progress (0–1).
   * Immediately updates store; SCORM commit is throttled to avoid
   * hammering the LMS on every animation frame during active scrubbing.
   */
  setProgress: (value: number) => void

  /** Update the active zone route (or null when returning to Hub) */
  setCurrentZone: (zoneId: string | null) => void
}

// ── Throttle helper ─────────────────────────────────────────────────────────

/**
 * Throttle a function to execute at most once per `limitMs`.
 * Used to rate-limit SCORM commit calls while scrubbing.
 */
function throttle<T extends unknown[]>(
  fn: (...args: T) => void,
  limitMs: number,
): (...args: T) => void {
  let lastCall = 0
  return (...args: T) => {
    const now = Date.now()
    if (now - lastCall >= limitMs) {
      lastCall = now
      fn(...args)
    }
  }
}

// Commit SCORM progress at most once every 2000ms during scrubbing
const throttledScormProgressSave = throttle((progress: number) => {
  if (SCORM.isConnected) {
    // Persist progress as lesson location (0–1 as string, max 255 chars)
    SCORM.set('cmi.core.lesson_location', String(Math.round(progress * 1000) / 1000))
    SCORM.save()
  }
}, 2000)

// ── Store ────────────────────────────────────────────────────────────────────

export const useAppStore = create<AppState>((set) => ({
  // ── Initial state ─────────────────────────────────────────────────────────
  scormConnected: false,
  progress: 0,
  currentZone: null,

  // ── Actions ───────────────────────────────────────────────────────────────

  setScormConnected: (connected: boolean) => {
    set({ scormConnected: connected })
  },

  setProgress: (value: number) => {
    // Clamp to [0, 1]
    const clamped = Math.max(0, Math.min(1, value))
    set({ progress: clamped })
    // Throttled SCORM commit — won't fire on every animation frame
    throttledScormProgressSave(clamped)
  },

  setCurrentZone: (zoneId: string | null) => {
    set({ currentZone: zoneId })
  },
}))

// ── Dev helpers ───────────────────────────────────────────────────────────────

// Expose store.getState() on window in development for debugging
if (import.meta.env.DEV) {
  // @ts-expect-error — intentional dev-only global
  window.__appStore = useAppStore
}
