import React from 'react';
import { useSimulatorStore } from '../../lib/simulatorStore';
import { scenarios } from '../../content';

export const Overlay: React.FC = () => {
  const { activeRun, currentTime, duration, isPlaying, setPlaying } = useSimulatorStore();
  const scenario = scenarios.length > 0 ? scenarios[0] : null;

  if (!scenario) {
    return null; // Clean POV, no overlay
  }

  // Find active hazards to render bounding boxes/overlays
  const activeHazards = scenario.hazards.filter(
    (h) => currentTime >= h.window[0] && currentTime <= h.window[1]
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      {selectedTier === 'proficient' && activeHazards.map((hazard, idx) => (
        <div
          key={idx}
          className="absolute border-2 border-teal-400 bg-teal-400/20 transition-all duration-100"
          style={{
            left: `${hazard.hitRegion.x}%`,
            top: `${hazard.hitRegion.y}%`,
            width: `${hazard.hitRegion.w}%`,
            height: `${hazard.hitRegion.h}%`,
          }}
        >
          {/* Confidence Indicator */}
          <div className="absolute -top-6 left-0 bg-teal-900/80 text-teal-300 text-xs px-2 py-0.5 rounded shadow">
            {hazard.category.toUpperCase()} 92%
          </div>
        </div>
      ))}

      {selectedTier === 'advanced' && (
        <div className="absolute inset-0 bg-navy-900/30">
          {/* BEV Telemetry mockup layer */}
          <div className="absolute bottom-4 right-4 w-64 h-64 bg-black/80 border border-teal-500/30 rounded-full flex items-center justify-center">
            <div className="text-teal-500/50 text-sm">BEV Radar Active</div>
            {activeHazards.map((hazard, idx) => (
              <div 
                key={`bev-${idx}`}
                className="absolute w-3 h-3 bg-red-500 rounded-full animate-ping"
                style={{
                  // Simplistic mapping of screen coords to mini-map for demo
                  left: `${50 + (hazard.hitRegion.x - 50) * 0.5}%`,
                  top: `${50 + (hazard.hitRegion.y - 50) * 0.5}%`,
                }}
              />
            ))}
          </div>
          {/* Also show bounding boxes but styled differently for advanced */}
          {activeHazards.map((hazard, idx) => (
            <div
              key={idx}
              className="absolute border border-blue-500 bg-blue-500/10"
              style={{
                left: `${hazard.hitRegion.x}%`,
                top: `${hazard.hitRegion.y}%`,
                width: `${hazard.hitRegion.w}%`,
                height: `${hazard.hitRegion.h}%`,
              }}
            >
              <div className="absolute -top-6 left-0 bg-blue-900/80 text-blue-300 text-[10px] px-1 font-mono">
                OBJ_{idx} | VEL: 12mph
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
