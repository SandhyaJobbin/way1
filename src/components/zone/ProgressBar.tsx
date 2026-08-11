import React from 'react';
import { useSimulatorStore } from '../../lib/simulatorStore';
import { scenarios } from '../../content';

// Find the single scenario (assuming one for v1 demo)
const scenario = scenarios.length > 0 ? scenarios[0] : null;

export const ProgressBar: React.FC = () => {
  const { currentTime, duration, activeRun } = useSimulatorStore();

  if (!scenario || duration <= 0) return null;

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="w-full mt-4 bg-ink/10 h-6 rounded-full relative overflow-hidden group">
      {/* Progress Fill */}
      <div 
        className="absolute top-0 left-0 h-full bg-primary/40 transition-all duration-300 ease-linear"
        style={{ width: `${progressPercentage}%` }}
      />
      
      {/* Hazard Markers */}
      {scenario.hazards.map((hazard, idx) => {
        const hazardId = idx.toString();
        const markerPercentage = (hazard.t / duration) * 100;
        
        // Determine status
        const isPassed = currentTime > hazard.window[1];
        const isClicked = activeRun.hazards.some(h => h.hazardId === hazardId);
        
        let markerColor = "bg-white/50"; // upcoming
        if (isPassed) {
          if (isClicked) {
            markerColor = "bg-accent shadow-[0_0_10px_rgba(0,255,163,0.8)]"; // success
          } else {
            markerColor = "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"; // missed
          }
        } else if (isClicked) {
            markerColor = "bg-accent shadow-[0_0_10px_rgba(0,255,163,0.8)]"; // success early
        } else if (currentTime >= hazard.window[0] && currentTime <= hazard.window[1]) {
            markerColor = "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]"; // active window
        }

        return (
          <div
            key={hazardId}
            className={`absolute top-0 h-full w-2 -ml-1 rounded-full ${markerColor} transition-colors duration-300`}
            style={{ left: `${markerPercentage}%` }}
            title={`Hazard ${idx + 1}: ${hazard.category}`}
          />
        );
      })}
    </div>
  );
};
