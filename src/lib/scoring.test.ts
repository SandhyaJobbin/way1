import { describe, it, expect, vi, beforeEach } from 'vitest';
import { calculateScore, reportScoreToSCORM, RunResults } from './scoring';
import { SCORM } from './scorm';

// Mock the SCORM module
vi.mock('./scorm', () => ({
  SCORM: {
    isConnected: true,
    set: vi.fn(),
    save: vi.fn(),
  }
}));

describe('scoring logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calculates perfect score correctly', () => {
    const results: RunResults = {
      hazards: [
        { hazardId: 'h1', category: 'vehicles', detected: true, reactionMs: 500, points: 10 },
        { hazardId: 'h2', category: 'pedestrians', detected: true, reactionMs: 600, points: 10 },
      ],
      falseClicks: 0
    };

    const final = calculateScore(results, 'foundation');
    
    expect(final.totalSpotted).toBe(2);
    expect(final.medianReactionMs).toBe(600);
    expect(final.compositeScore).toBe(100);
    expect(final.passed).toBe(true);
  });

  it('applies false click penalties', () => {
    const results: RunResults = {
      hazards: [
        { hazardId: 'h1', category: 'vehicles', detected: true, reactionMs: 500, points: 10 },
      ],
      falseClicks: 3 // 3 * 5 = 15 penalty
    };

    const final = calculateScore(results, 'foundation');
    
    expect(final.compositeScore).toBe(85); // 100 - 15
    expect(final.passed).toBe(true); // 85 >= 80
  });

  it('applies reaction time penalties', () => {
    const results: RunResults = {
      hazards: [
        { hazardId: 'h1', category: 'vehicles', detected: true, reactionMs: 1800, points: 10 },
      ],
      falseClicks: 0
    };

    const final = calculateScore(results, 'foundation');
    
    // 1800ms > 1500ms by 300ms. 300 / 100 = 3 point penalty
    expect(final.compositeScore).toBe(97);
  });

  it('fails if below threshold', () => {
    const results: RunResults = {
      hazards: [
        { hazardId: 'h1', category: 'vehicles', detected: false, reactionMs: null, points: 10 },
        { hazardId: 'h2', category: 'pedestrians', detected: false, reactionMs: null, points: 10 },
      ],
      falseClicks: 5 // 25 penalty
    };

    const final = calculateScore(results, 'foundation');
    
    // 0% spotted - 25 penalty = 0 (clamped to 0)
    expect(final.compositeScore).toBe(0);
    expect(final.passed).toBe(false);
  });

  it('reports score to SCORM', () => {
    reportScoreToSCORM(85, true);

    expect(SCORM.set).toHaveBeenCalledWith('cmi.core.score.raw', '85');
    expect(SCORM.set).toHaveBeenCalledWith('cmi.core.lesson_status', 'passed');
    expect(SCORM.save).toHaveBeenCalled();
  });
});
