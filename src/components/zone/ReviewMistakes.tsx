import React from 'react';
import { useSimulatorStore } from '../../lib/simulatorStore';
import { scenarios } from '../../content';

export const ReviewMistakes: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { activeRun } = useSimulatorStore();
  const scenario = scenarios.length > 0 ? scenarios[0] : null;

  if (!scenario) return null;

  // Find hazards that were NOT detected
  const missedHazards = scenario.hazards.filter(
    h => !activeRun.hazards.some(ah => ah.category === h.category)
  );

  if (missedHazards.length === 0) {
    return (
      <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-50 flex items-center justify-center p-8">
        <div className="max-w-xl text-center">
          <h2 className="text-3xl text-navy-900 font-bold mb-4">Perfect Perception</h2>
          <p className="text-gray-600 mb-8">You successfully identified all developing hazards in this scenario.</p>
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600"
          >
            Back to Scorecard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col p-8 overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl text-navy-900 font-bold">Review Mistakes</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-navy-900"
          >
            Close
          </button>
        </div>

        <div className="space-y-6">
          {missedHazards.map((hazard, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex gap-6">
              <div className="w-1/3 aspect-video bg-gray-100 rounded-lg relative overflow-hidden flex-shrink-0">
                {/* Thumbnail placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Time: {hazard.t}s
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  Missed: {hazard.category}
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Human Perspective</h4>
                  <p className="text-navy-900">{hazard.explanation}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">AV Handling</h4>
                  <p className="text-navy-900">{hazard.avHandling}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
