import React, { useEffect, useState } from 'react';
import { useSimulatorStore } from '../../lib/simulatorStore';
import { calculateScore, reportScoreToSCORM, FinalScore } from '../../lib/scoring';
import { scenarios } from '../../content';

export const Scorecard: React.FC = () => {
  const { activeRun, resetRun } = useSimulatorStore();
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
          const found = activeRun.hazards.find(ah => ah.hazardId === h.hazardId); 
          return {
            hazardId: h.hazardId,
            category: h.category,
            detected: !!found,
            reactionMs: found ? found.reactionMs : null,
            points: h.points,
          };
        }),
        falseClicks: activeRun.falseClicks,
      };

      const final = calculateScore(results);
      setScore(final);
      reportScoreToSCORM(final.compositeScore, final.passed);
    }
  }, [activeRun.completed, activeRun.hazards, activeRun.falseClicks]);

  if (!activeRun.completed || !score) return null;

  return (
    <div className="fixed inset-0 bg-navy-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-8 md:p-12 bg-navy-900 text-white flex justify-between items-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Performance Scorecard</h2>
          <div className="text-right">
            <div className="text-sm font-semibold uppercase tracking-wider text-accent mb-1">Composite Score</div>
            <div className={`text-5xl font-bold ${score.passed ? 'text-teal-400' : 'text-red-400'}`}>
              {score.compositeScore}%
            </div>
            <div className="text-sm text-gray-300 mt-2 font-medium tracking-wide">{score.passed ? 'PASSED' : 'FAILED'}</div>
          </div>
        </div>
        
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Main Stats */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6 border-b pb-4 text-navy-900">Run Summary</h3>
            
            <div className="grid grid-cols-2 gap-4">
               <StatBox label="Hazards Spotted" value={`${score.totalSpotted} / ${score.totalHazards}`} />
               <StatBox label="Median Reaction" value={`${score.medianReactionMs} ms`} />
               <StatBox label="False Clicks" value={score.falseClicks} isNegative={score.falseClicks > 0} />
               <StatBox label="Missed Hazards" value={score.totalHazards - score.totalSpotted} isNegative={(score.totalHazards - score.totalSpotted) > 0} />
            </div>
          </div>

          {/* Technical Categories */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6 border-b pb-4 text-navy-900">Technical Assessment</h3>
            <div className="space-y-6">
              <CategoryBar label="Driving & State Knowledge" value={score.categories.drivingAndStateKnowledge} />
              <CategoryBar label="Intent Prediction" value={score.categories.intentPrediction} />
              <CategoryBar label="Spatial / Occlusion Reasoning" value={score.categories.spatialOcclusionReasoning} />
              <CategoryBar label="Risk Recognition" value={score.categories.riskRecognition} />
              <CategoryBar label="Complex Decision-Making" value={score.categories.complexDecisionMaking} />
            </div>
          </div>
        </div>

        <div className="px-8 md:px-12 py-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
          <button 
            onClick={resetRun}
            className="px-8 py-3 rounded-full border-2 border-gray-200 text-navy-900 font-semibold hover:bg-gray-100 transition-colors"
          >
            Retry Challenge
          </button>
          <button className="px-8 py-3 rounded-full bg-accent text-white font-semibold hover:bg-opacity-90 transition-colors shadow-lg shadow-accent/30">
            Review Mistakes
          </button>
        </div>
      </div>
    </div>
  );
};

const StatBox: React.FC<{ label: string; value: string | number, isNegative?: boolean }> = ({ label, value, isNegative }) => (
  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center items-center text-center shadow-sm">
    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{label}</div>
    <div className={`text-3xl font-bold ${isNegative ? 'text-red-500' : 'text-navy-900'}`}>{value}</div>
  </div>
);

const CategoryBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div>
    <div className="flex justify-between text-sm mb-2">
      <span className="text-gray-700 font-medium">{label}</span>
      <span className="font-bold text-navy-900">{value}%</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
      <div 
        className="bg-accent h-3 rounded-full transition-all duration-1000 ease-out relative"
        style={{ width: `${value}%` }}
      >
        <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)', backgroundSize: '1rem 1rem'}} />
      </div>
    </div>
  </div>
);
