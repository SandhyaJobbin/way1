import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Simulator } from './Simulator';
import { HazardRings } from './HazardRings';
import { Scorecard } from './Scorecard';
import { useSimulatorStore } from '../../lib/simulatorStore';

export const Zone: React.FC = () => {
  const { resetRun, setPlaying } = useSimulatorStore();
  const [hasStarted, setHasStarted] = useState(false);

  // Reset run when unmounting
  useEffect(() => {
    resetRun();
    setHasStarted(false);
  }, [resetRun]);

  return (
    <div className="w-full min-h-screen bg-surface flex flex-col items-center justify-center pt-24 pb-12 px-6 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent opacity-[0.15] blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-accent-2 opacity-[0.1] blur-[100px]" />
      </div>

      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            key="guidelines"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-12 flex flex-col items-center text-center mx-auto my-auto"
          >
            <img src="/wayo-idle.png" alt="Wayo" className="w-40 h-40 object-contain mb-8" />
            <h1 className="text-4xl font-display font-bold text-ink mb-6">
              Hazard Perception Simulator
            </h1>
            <p className="text-ink/80 text-lg mb-8 leading-relaxed max-w-lg">
              Test your situational awareness against the AV platform. Watch the video carefully. Your goal is to spot potential hazards early. 
              <br/><br/>
              When you see a hazard (pedestrian, vehicle, or sign), <strong>click on it immediately</strong>. Correct clicks earn points, while missed hazards will pause the simulation.
            </p>
            <button
              onClick={() => {
                setHasStarted(true);
                setTimeout(() => setPlaying(true), 100);
              }}
              className="w-full max-w-sm bg-accent hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-pill text-lg transition-all transform hover:scale-[1.02]"
            >
              Enter Zone
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="simulator"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-[75vw] flex flex-col items-center"
          >
            {/* Header */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div>
                <h1 className="text-white text-3xl font-display font-semibold drop-shadow-md">Hazard Perception Simulator</h1>
                <p className="text-ink-muted mt-1 text-sm tracking-wide">Test your situational awareness against the AV platform.</p>
              </div>
            </div>

            {/* Simulator Container */}
            <div className="w-full">
              <div className="grid grid-cols-[100px_1fr] gap-6 bg-black rounded-2xl overflow-hidden glass-panel-dark p-4 w-full items-stretch shadow-2xl">
                
                {/* Left Side: Hazard Rings */}
                <div className="flex justify-center h-full">
                  <HazardRings />
                </div>
                
                {/* Right Side: Simulator */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-inner">
                  <Simulator />
                </div>
                
              </div>
            </div>

            {/* Helper text */}
            <div className="w-full mt-6 text-center text-ink-muted text-sm glass-panel-dark py-3 px-6 rounded-pill inline-block">
              <span className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Click directly on developing hazards in the video as soon as you identify them.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Scorecard />
    </div>
  );
};
