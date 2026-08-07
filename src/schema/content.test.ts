/**
 * Schema validation tests for content architecture.
 *
 * Tests:
 *  1. Validates zones.json passes all schema checks (data contract)
 *  2. Validates intentionally malformed data is rejected by Zod
 *  3. Spot-checks individual sub-schemas for regression safety
 */

import { describe, it, expect } from 'vitest'
import {
  ZoneSchema,
  RingSchema,
  IncidentSchema,
  ColorThemeSchema,
  parseEcosystem,
  safeParseEcosystem,
} from './content'
import zonesData from '../data/zones.json'

// ── ColorTheme ────────────────────────────────────────────────────────────────

describe('ColorThemeSchema', () => {
  it('accepts a valid color theme with primary and accent', () => {
    const result = ColorThemeSchema.safeParse({
      primary: '#00C2FF',
      accent: '#005F8A',
    })
    expect(result.success).toBe(true)
  })

  it('accepts a color theme with optional text field', () => {
    const result = ColorThemeSchema.safeParse({
      primary: '#FF6B35',
      accent: '#C4450F',
      text: 'text-orange-50',
    })
    expect(result.success).toBe(true)
  })

  it('rejects a color theme missing required primary field', () => {
    const result = ColorThemeSchema.safeParse({
      accent: '#005F8A',
    })
    expect(result.success).toBe(false)
  })

  it('rejects a color theme missing required accent field', () => {
    const result = ColorThemeSchema.safeParse({
      primary: '#00C2FF',
    })
    expect(result.success).toBe(false)
  })
})

// ── Incident ─────────────────────────────────────────────────────────────────

describe('IncidentSchema', () => {
  it('accepts a minimal valid incident', () => {
    const result = IncidentSchema.safeParse({
      id: 'test-incident',
      title: 'Test Incident',
      description: 'A test scenario for validation',
    })
    expect(result.success).toBe(true)
  })

  it('accepts a full incident with all optional fields', () => {
    const result = IncidentSchema.safeParse({
      id: 'construction-flagger',
      title: 'Construction Zone Flagger',
      description: 'An AV encounters a human flagger',
      durationSeconds: 180,
      tags: ['construction', 'edge-case'],
    })
    expect(result.success).toBe(true)
  })

  it('provides default empty array for tags when omitted', () => {
    const result = IncidentSchema.safeParse({
      id: 'test',
      title: 'Test',
      description: 'Test description',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.tags).toEqual([])
    }
  })

  it('rejects an incident with negative durationSeconds', () => {
    const result = IncidentSchema.safeParse({
      id: 'bad-incident',
      title: 'Bad',
      description: 'Bad description',
      durationSeconds: -10,
    })
    expect(result.success).toBe(false)
  })

  it('rejects an incident missing required id', () => {
    const result = IncidentSchema.safeParse({
      title: 'No ID Incident',
      description: 'Missing the id field',
    })
    expect(result.success).toBe(false)
  })

  it('rejects an incident missing required title', () => {
    const result = IncidentSchema.safeParse({
      id: 'no-title',
      description: 'Missing the title field',
    })
    expect(result.success).toBe(false)
  })
})

// ── Zone ─────────────────────────────────────────────────────────────────────

describe('ZoneSchema', () => {
  const validZone = {
    id: 'triage-ops',
    title: 'Triage Ops',
    description: 'Incident routing and prioritization zone',
    colorTheme: {
      primary: '#FF6B35',
      accent: '#C4450F',
    },
  }

  it('accepts a minimal valid zone', () => {
    const result = ZoneSchema.safeParse(validZone)
    expect(result.success).toBe(true)
  })

  it('provides sensible defaults for optional fields', () => {
    const result = ZoneSchema.safeParse(validZone)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.incidents).toEqual([])
      expect(result.data.order).toBe(0)
      expect(result.data.unlocked).toBe(true)
    }
  })

  it('rejects a zone with missing required id', () => {
    const { id: _id, ...withoutId } = validZone
    const result = ZoneSchema.safeParse(withoutId)
    expect(result.success).toBe(false)
  })

  it('rejects a zone with missing required description', () => {
    const { description: _desc, ...withoutDesc } = validZone
    const result = ZoneSchema.safeParse(withoutDesc)
    expect(result.success).toBe(false)
  })

  it('rejects a zone with missing required colorTheme', () => {
    const { colorTheme: _ct, ...withoutTheme } = validZone
    const result = ZoneSchema.safeParse(withoutTheme)
    expect(result.success).toBe(false)
  })

  it('rejects a zone with negative order index', () => {
    const result = ZoneSchema.safeParse({ ...validZone, order: -1 })
    expect(result.success).toBe(false)
  })
})

// ── Ring ─────────────────────────────────────────────────────────────────────

describe('RingSchema', () => {
  const validRing = {
    id: 'live-operations',
    name: 'Live Operations',
    order: 1,
    colorTheme: {
      primary: '#00C2FF',
      accent: '#0088B3',
    },
    zones: [],
  }

  it('accepts a valid ring with an empty zone list', () => {
    const result = RingSchema.safeParse(validRing)
    expect(result.success).toBe(true)
  })

  it('rejects a ring with order = 0 (must be positive integer)', () => {
    const result = RingSchema.safeParse({ ...validRing, order: 0 })
    expect(result.success).toBe(false)
  })

  it('rejects a ring missing required name', () => {
    const { name: _name, ...withoutName } = validRing
    const result = RingSchema.safeParse(withoutName)
    expect(result.success).toBe(false)
  })
})

// ── Ecosystem (zones.json integration test) ───────────────────────────────────

describe('EcosystemSchema — zones.json validation', () => {
  it('validates zones.json passes the full schema without errors', () => {
    const result = safeParseEcosystem(zonesData)
    if (!result.success) {
      // Surface detailed validation errors in the test output
      console.error('Schema validation errors:', result.error.issues)
    }
    expect(result.success).toBe(true)
  })

  it('parseEcosystem returns a typed Ecosystem object from zones.json', () => {
    const ecosystem = parseEcosystem(zonesData)
    expect(ecosystem.title).toBe('Waymo AV Lifecycle Ecosystem')
    expect(ecosystem.rings).toHaveLength(2)
  })

  it('Live Operations ring has the MCPI zone', () => {
    const ecosystem = parseEcosystem(zonesData)
    const liveOps = ecosystem.rings.find((r) => r.id === 'live-operations')
    expect(liveOps).toBeDefined()
    const mcpi = liveOps?.zones.find((z) => z.id === 'mcpi')
    expect(mcpi).toBeDefined()
    expect(mcpi?.title).toBe('MCPI Agent')
  })

  it('Response Operations ring has both Triage Ops and Annotators zones', () => {
    const ecosystem = parseEcosystem(zonesData)
    const responseOps = ecosystem.rings.find((r) => r.id === 'response-operations')
    expect(responseOps).toBeDefined()
    const zoneIds = responseOps?.zones.map((z) => z.id)
    expect(zoneIds).toContain('triage-ops')
    expect(zoneIds).toContain('annotators')
  })

  it('incidents in zones match the IncidentSchema structure', () => {
    const ecosystem = parseEcosystem(zonesData)
    const mcpi = ecosystem.rings[0].zones[0]
    expect(mcpi.incidents).toHaveLength(1)
    const incident = mcpi.incidents[0]
    expect(incident.id).toBe('incident-construction-flagger')
    expect(incident.durationSeconds).toBe(180)
    expect(Array.isArray(incident.tags)).toBe(true)
  })

  it('rejects an ecosystem with a missing title', () => {
    const { title: _title, ...withoutTitle } = zonesData
    const result = safeParseEcosystem(withoutTitle)
    expect(result.success).toBe(false)
  })

  it('rejects an ecosystem where rings is not an array', () => {
    const result = safeParseEcosystem({ ...zonesData, rings: 'not-an-array' })
    expect(result.success).toBe(false)
  })

  it('rejects an ecosystem where a zone has an invalid colorTheme', () => {
    const corrupted = {
      ...zonesData,
      rings: [
        {
          ...zonesData.rings[0],
          zones: [
            {
              ...zonesData.rings[0].zones[0],
              colorTheme: { primary: '#FFF' }, // missing 'accent'
            },
          ],
        },
      ],
    }
    const result = safeParseEcosystem(corrupted)
    expect(result.success).toBe(false)
  })
})
