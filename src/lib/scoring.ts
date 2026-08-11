// src/lib/scoring.ts
import { SCORM } from './scorm';

export interface HazardResult {
  hazardId: string;
  category: 'vehicles' | 'pedestrians' | 'signs' | 'road-marks';
  detected: boolean;
  reactionMs: number | null;
  points: number;
}

export interface RunResults {
  hazards: HazardResult[];
  falseClicks: number;
}

export interface ScorecardCategories {
  drivingAndStateKnowledge: number;
  intentPrediction: number;
  spatialOcclusionReasoning: number;
  riskRecognition: number;
  complexDecisionMaking: number;
}

export interface FinalScore {
  totalSpotted: number;
  totalHazards: number;
  medianReactionMs: number;
  falseClicks: number;
  compositeScore: number;
  passed: boolean;
  categories: ScorecardCategories;
}

const PASS_THRESHOLD = 80;

/**
 * Calculates the composite score and maps results to the scorecard categories.
 * Note: specific math can be adjusted, but this serves as the baseline for the demo.
 */
export function calculateScore(results: RunResults): FinalScore {
  const totalHazards = results.hazards.length;
  const spottedHazards = results.hazards.filter(h => h.detected);
  const totalSpotted = spottedHazards.length;

  // Calculate median reaction time
  const reactionTimes = spottedHazards.map(h => h.reactionMs as number).sort((a, b) => a - b);
  const medianReactionMs = reactionTimes.length > 0
    ? reactionTimes[Math.floor(reactionTimes.length / 2)]
    : 0;

  // Base score: % of hazards detected
  let baseScore = totalHazards > 0 ? (totalSpotted / totalHazards) * 100 : 100;

  // Penalties
  // 1. False Clicks: -5 points per false click
  const falseClickPenalty = results.falseClicks * 5;
  
  // 2. Reaction Time: if median > 1500ms, deduct 1 point per 100ms over
  let reactionPenalty = 0;
  if (medianReactionMs > 1500) {
    reactionPenalty = Math.floor((medianReactionMs - 1500) / 100);
  }

  let compositeScore = Math.round(baseScore - falseClickPenalty - reactionPenalty);
  // Clamp between 0 and 100
  compositeScore = Math.max(0, Math.min(100, compositeScore));

  const passed = compositeScore >= PASS_THRESHOLD;

  // Map to technical categories (demo logic: simplistic mapping based on composite & tier)
  // In a real scenario, specific hazards map to specific categories.
  const categories: ScorecardCategories = {
    drivingAndStateKnowledge: Math.min(100, compositeScore + 5),
    intentPrediction: Math.min(100, compositeScore + 2),
    spatialOcclusionReasoning: Math.min(100, compositeScore + 5),
    riskRecognition: Math.min(100, compositeScore + 10),
    complexDecisionMaking: Math.min(100, compositeScore),
  };

  return {
    totalSpotted,
    totalHazards,
    medianReactionMs,
    falseClicks: results.falseClicks,
    compositeScore,
    passed,
    categories,
  };
}

/**
 * Report final score to SCORM
 */
export function reportScoreToSCORM(score: number, passed: boolean) {
  if (SCORM.isConnected) {
    SCORM.set('cmi.core.score.raw', score.toString());
    SCORM.set('cmi.core.score.min', '0');
    SCORM.set('cmi.core.score.max', '100');
    SCORM.set('cmi.core.lesson_status', passed ? 'passed' : 'failed');
    SCORM.save();
  }
}
