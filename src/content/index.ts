import { z } from 'zod';
import { ScenarioSchema, TierSchema, BrandingSchema, NuanceSchema, StateSchema } from './schemas';

import scenariosRaw from './scenarios.json';
import tiersRaw from './tiers.json';
import brandingRaw from '../config/branding.json';
import nuancesRaw from './nuances.json';
import statesRaw from './states.json';

const scenariosResult = z.array(ScenarioSchema).safeParse(scenariosRaw);
if (!scenariosResult.success) {
  throw new Error(`Content pipeline invalid (scenarios): ${scenariosResult.error.message}`);
}
export const scenarios = scenariosResult.data;

const tiersResult = z.array(TierSchema).safeParse(tiersRaw);
if (!tiersResult.success) {
  throw new Error(`Content pipeline invalid (tiers): ${tiersResult.error.message}`);
}
export const tiers = tiersResult.data;

const brandingResult = BrandingSchema.safeParse(brandingRaw);
if (!brandingResult.success) {
  throw new Error(`Content pipeline invalid (branding): ${brandingResult.error.message}`);
}
export const brand = brandingResult.data;

const nuancesResult = z.array(NuanceSchema).safeParse(nuancesRaw);
if (!nuancesResult.success) {
  throw new Error(`Content pipeline invalid (nuances): ${nuancesResult.error.message}`);
}
export const nuances = nuancesResult.data;

const statesResult = z.array(StateSchema).safeParse(statesRaw);
if (!statesResult.success) {
  throw new Error(`Content pipeline invalid (states): ${statesResult.error.message}`);
}
export const states = statesResult.data;
