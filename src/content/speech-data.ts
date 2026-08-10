import type { Zone } from '../types';
import { ACT1_NARRATIVE, ZONE2_NARRATIVE } from './scenario-data';

export { ACT1_NARRATIVE, ZONE2_NARRATIVE } from './scenario-data';

export const SPEECH_DATA: Record<Zone, string[]> = {
  act1: ACT1_NARRATIVE.map((line) => line.text),
  lessonA: [],
  lessonB: [],
  lessonC: [],
  zone1: [
    'Zone One: The intersection.',
    'One event. Three possible paths.',
    'Your decisions here shape the outcome.',
  ],
  zone2: ZONE2_NARRATIVE.map((line) => line.text),
  zone3: [],
  act4: [],
};
