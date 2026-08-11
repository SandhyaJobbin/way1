import React, { useEffect, useState } from 'react';
import { useSimulatorStore } from '../../lib/simulatorStore';
import { calculateScore, reportScoreToSCORM, FinalScore } from '../../lib/scoring';
import { scenarios } from '../../content';

export const Scorecard: React.FC = () => {
  const { activeRun, selectedTier, resetRun } = useSimulatorStore();
  const [score, setScore] = useState<FinalScore | null>(null);

  useEffect(() => {
    if (activeRun.completed) {
      const scenario = scenarios.length > 0 ? scenarios[0] : null;
      if (!scenario) return;

      // Ensure we pass the total possible hazards to the calculation
      // The store's activeRun just has what we clicked.
      // We pass the full run state to the scorer.
      const results = {
        hazards: scenario.hazards.map(h => {
          const found = activeRun.hazards.find(ah => ah.category === h.category); // simplistic match for demo
          return {
            hazardId: h.category, // fallback if no ID
            category: h.category,
            detected: !!found,
            reactionMs: found ? found.reactionMs : null,
            points: h.points,
          };
        }),
        falseClicks: activeRun.falseClicks,
      };

      const final = calculateScore(results, selectedTier);
      setScore(final);
      reportScoreToSCORM(final.compositeScore, final.passed);
    }
  }, [activeRun.completed, activeRun.hazards, activeRun.falseClicks, selectedTier]);

  if (!activeRun.completed || !score) return null;

  return (
    <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl text-navy-900 font-bold mb-8">Performance Scorecard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Stats */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-navy-900">Run Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Hazards Spotted</span>
                <span className="text-lg font-medium">{score.totalSpotted} / {score.totalHazards}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Median Reaction Time</span>
                <span className="text-lg font-medium">{score.medianReactionMs} ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">False Clicks</span>
                <span className="text-lg font-medium text-red-500">{score.falseClicks}</span>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <div className="flex justify-between items-end">
                  <span className="text-gray-800 font-semibold text-lg">Composite Score</span>
                  <div className="text-right">
                    <span className={`text-4xl font-bold ${score.passed ? 'text-teal-500' : 'text-red-500'}`}>
                      {score.compositeScore}%
                    </span>
                    <div className="text-sm text-gray-500">{score.passed ? 'PASSED' : 'FAILED'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Categories */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 text-navy-900">Technical Assessment</h3>
            
            <CategoryBar label="3D Spatial Rotation" value={score.categories.spatialRotation} />
            <CategoryBar label="Telemetry Interpretation" value={score.categories.telemetryInterpretation} />
            <CategoryBar label="Occlusion Reasoning" value={score.categories.occlusionReasoning} />
            <CategoryBar label="Complex Decision-Making" value={score.categories.complexDecisionMaking} />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button 
            onClick={resetRun}
            className="px-6 py-2 rounded-full border border-gray-300 text-navy-900 hover:bg-gray-50 transition-colors"
          >
            Retry Challenge
          </button>
          <button className="px-6 py-2 rounded-full bg-accent text-white hover:bg-opacity-90 transition-colors">
            Review Mistakes
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoryBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-700">{label}</span>
      <span className="font-medium text-navy-900">{value}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div 
        className="bg-accent h-2 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);
