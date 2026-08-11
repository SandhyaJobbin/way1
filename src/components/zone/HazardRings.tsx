import React from 'react';
import { useSimulatorStore } from '../../lib/simulatorStore';
import { scenarios } from '../../content';

export const HazardRings: React.FC = () => {
  const { activeRun, currentTime } = useSimulatorStore();
  const scenario = scenarios.length > 0 ? scenarios[0] : null;

  if (!scenario) return null;

  return (
    <div className="flex flex-col justify-center items-center gap-6 py-8 px-4 h-full bg-black/40 rounded-xl backdrop-blur-md border border-white/10 shadow-xl">
      {scenario.hazards.map((hazard, index) => {
        // Determine status
        const isHit = activeRun.hazards.some(h => h.hazardId === hazard.hazardId);
        const isMissed = activeRun.misses.includes(hazard.hazardId);
        
        // A ring starts out gray/dim (unreached)
        let ringColorClass = "border-white/20";
        let innerColorClass = "bg-transparent";

        if (isHit) {
          ringColorClass = "border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5)]";
          innerColorClass = "bg-green-400";
        } else if (isMissed) {
          ringColorClass = "border-red-400 shadow-[0_0_15px_rgba(248,113,113,0.5)]";
          innerColorClass = "bg-red-400";
        } else if (currentTime >= hazard.window[0] && currentTime <= hazard.window[1]) {
          // currently active
          ringColorClass = "border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]";
          innerColorClass = "bg-blue-400/80 animate-pulse";
        }

        return (
          <div key={hazard.hazardId} className="relative flex items-center group">
            <div 
              className={`w-12 h-12 rounded-full border-[3px] flex items-center justify-center transition-all duration-500 ${ringColorClass}`}
            >
              <div className={`w-4 h-4 rounded-full transition-all duration-500 ${innerColorClass}`} />
            </div>
            {/* Tooltip on hover */}
            <div className="absolute left-16 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white font-medium text-xs px-3 py-1.5 rounded-md whitespace-nowrap pointer-events-none z-10 border border-white/20">
              Hazard {index + 1}
            </div>
          </div>
        );
      })}
    </div>
  );
};
