/**
 * Content Architecture — Zod Schemas
 *
 * Defines the typed data architecture for the Waymo Lifecycle Interactive
 * Training Module. All static JSON imports (zones.json, etc.) are validated
 * against these schemas at app startup to fail fast on malformed content.
 *
 * Schema hierarchy:
 *   Ecosystem
 *     └─ Ring[]            (e.g. "Live Operations", "Response Operations")
 *         └─ Zone[]        (e.g. "MCPI Agent", "Triage Ops", "Annotators")
 *             └─ Incident[] (individual learning scenarios)
 */

import { z } from 'zod'

// ── Color Theme ─────────────────────────────────────────────────────────────

/**
 * Visual color theming for each zone/ring.
 * Uses Tailwind CSS class names or hex values for flexibility.
 */
export const ColorThemeSchema = z.object({
  /** Primary brand color (e.g. '#00C2FF' or 'sky-400') */
  primary: z.string(),
  /** Darker accent color for borders, backgrounds */
  accent: z.string(),
  /** Tailwind text utility class for readable contrast */
  text: z.string().optional(),
})

export type ColorTheme = z.infer<typeof ColorThemeSchema>

// ── Incident ─────────────────────────────────────────────────────────────────

/**
 * A single learning scenario / edge case in the Waymo ecosystem.
 * Incidents pass through all three operator roles in sequence.
 */
export const IncidentSchema = z.object({
  /** Unique machine-readable identifier */
  id: z.string(),
  /** Human-readable title shown in the UI */
  title: z.string(),
  /** Short descriptive summary for learner context */
  description: z.string(),
  /** Optional duration hint in seconds for scrubber mapping */
  durationSeconds: z.number().positive().optional(),
  /** Tags for categorization and filtering */
  tags: z.array(z.string()).default([]),
})

export type Incident = z.infer<typeof IncidentSchema>

// ── Zone ─────────────────────────────────────────────────────────────────────

/**
 * A Zone represents a single operator role learning environment.
 * Zones are the primary navigation destinations from the Hub.
 * Each Zone contains one or more Incidents to work through.
 */
export const ZoneSchema = z.object({
  /** Unique identifier used in React Router path: /zone/:id */
  id: z.string(),
  /** Display title for the Zone card in the Hub */
  title: z.string(),
  /**
   * Short subtitle shown beneath the title.
   * Should name the operator role (e.g. "MCPI Agent").
   */
  subtitle: z.string().optional(),
  /** Longer description explaining the zone's focus */
  description: z.string(),
  /** Visual theming colors for this zone's UI */
  colorTheme: ColorThemeSchema,
  /** Ordered list of incidents/scenarios in this zone */
  incidents: z.array(IncidentSchema).default([]),
  /**
   * Ordering index within its parent Ring.
   * Lower numbers appear first in navigation.
   */
  order: z.number().int().nonnegative().default(0),
  /** Whether the zone is unlocked/available to the learner */
  unlocked: z.boolean().default(true),
})

export type Zone = z.infer<typeof ZoneSchema>

// ── Ring ─────────────────────────────────────────────────────────────────────

/**
 * A Ring groups related Zones into an operational phase.
 * Based on the Waymo lifecycle: Live Operations → Response Operations.
 * Rings are displayed as concentric bands on the ecosystem map.
 */
export const RingSchema = z.object({
  /** Unique identifier */
  id: z.string(),
  /** Display name (e.g. "Live Operations", "Response Operations") */
  name: z.string(),
  /** Brief explanation of what this ring covers */
  description: z.string().optional(),
  /** Visual theming for this ring */
  colorTheme: ColorThemeSchema,
  /** Ordered zones within this ring */
  zones: z.array(ZoneSchema),
  /**
   * Concentric order: 1 = innermost ring (closest to AV core).
   * Higher numbers = outer rings.
   */
  order: z.number().int().positive().default(1),
})

export type Ring = z.infer<typeof RingSchema>

// ── Ecosystem ────────────────────────────────────────────────────────────────

/**
 * The top-level Ecosystem object representing the entire Waymo AV lifecycle.
 * This is the root data structure for the training module.
 * Imported from zones.json and validated at startup.
 */
export const EcosystemSchema = z.object({
  /** Schema version for forward-compatibility checks */
  version: z.string().default('1.0'),
  /** Display title for the Hub overview screen */
  title: z.string(),
  /** Subtitle / tagline shown under the title */
  subtitle: z.string().optional(),
  /** Ordered rings in the ecosystem (innermost to outermost) */
  rings: z.array(RingSchema),
  /** Metadata for LMS tracking */
  meta: z
    .object({
      /** SCORM lesson title */
      scormTitle: z.string().optional(),
      /** Total estimated learning time in minutes */
      estimatedMinutes: z.number().positive().optional(),
    })
    .optional(),
})

export type Ecosystem = z.infer<typeof EcosystemSchema>

// ── Convenience re-exports ────────────────────────────────────────────────────

/**
 * Validate and parse a raw object as an Ecosystem.
 * Throws a ZodError with detailed messages if validation fails.
 *
 * Usage:
 *   import rawData from '../data/zones.json'
 *   const ecosystem = parseEcosystem(rawData)
 */
export function parseEcosystem(raw: unknown): Ecosystem {
  return EcosystemSchema.parse(raw)
}

/**
 * Safe (non-throwing) variant. Returns `{ success, data }` or `{ success, error }`.
 */
export function safeParseEcosystem(raw: unknown) {
  return EcosystemSchema.safeParse(raw)
}
