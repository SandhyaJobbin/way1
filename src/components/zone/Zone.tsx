import React, { useEffect } from 'react';
import { Simulator } from './Simulator';
import { Overlay } from './Overlay';
import { Scorecard } from './Scorecard';
import { useSimulatorStore } from '../../lib/simulatorStore';

export const Zone: React.FC = () => {
  const { selectedTier, setTier, resetRun } = useSimulatorStore();

  // Reset run when unmounting or changing tiers
  useEffect(() => {
    resetRun();
  }, [selectedTier, resetRun]);

  return (
    <div className="w-full min-h-screen bg-surface flex flex-col items-center justify-center pt-24 pb-12 px-6 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent opacity-[0.15] blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-accent-2 opacity-[0.1] blur-[100px]" />
      </div>

      {/* Header / Tier Selector */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-white text-3xl font-display font-semibold drop-shadow-md">Hazard Perception Assessment</h1>
          <p className="text-ink-muted mt-1 text-sm tracking-wide">Test your situational awareness against the AV platform.</p>
        </div>
        
        <div className="flex glass-panel-dark rounded-xl p-1 shadow-lift">
          {(['foundation', 'proficient', 'advanced'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setTier(tier)}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all duration-300 ${
                selectedTier === tier
                  ? 'bg-accent text-white shadow-[0_0_15px_rgba(0,128,255,0.4)]'
                  : 'text-ink-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Container */}
      <div className="relative z-10 w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden glass-panel-dark p-2">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <Simulator />
          <Overlay />
          <Scorecard />
        </div>
      </div>

      {/* Helper text */}
      <div className="relative z-10 w-full max-w-6xl mt-6 text-center text-ink-muted text-sm glass-panel-dark py-3 px-6 rounded-pill inline-block">
        <span className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Click directly on developing hazards in the video as soon as you identify them.
        </span>
      </div>
    </div>
  );
};
