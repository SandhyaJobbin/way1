import { z } from 'zod';

export const TierSchema = z.object({
  id: z.enum(['foundation', 'proficient', 'advanced']),
  label: z.string(),
  overlay: z.enum(['none', 'perception', 'bev-telemetry']),
});

export const ScenarioSchema = z.object({
  id: z.string(),
  worldId: z.enum(['phoenix', 'san-francisco', 'stub']),
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

export const BrandingSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  wordmark: z.object({
    mode: z.enum(['text', 'image']),
    src: z.string().optional()
  }),
  logoSlot: z.string().nullable(),
  colorOverrides: z.object({
    accentPrimary: z.string().nullable(),
    accentSecondary: z.string().nullable(),
    surface: z.string().nullable(),
    ink: z.string().nullable(),
  })
});

export const NuanceSchema = z.object({
  id: z.string(),
  title: z.string(),
  humanBehavior: z.string(),
  avHandling: z.string(),
  videoSlot: z.string(),
});

export const StateSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  type: z.enum(['deep', 'stub']),
  rules: z.array(z.string()).optional(),
  avContext: z.string().optional(),
  nextScenarioId: z.string().optional(),
});
