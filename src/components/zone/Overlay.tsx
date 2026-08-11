import React from 'react';
import { useSimulatorStore } from '../../lib/simulatorStore';
import { scenarios } from '../../content';

export const Overlay: React.FC = () => {
  const { currentTime } = useSimulatorStore();
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
      {activeHazards.map((hazard, idx) => (
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
    </div>
  );
};
