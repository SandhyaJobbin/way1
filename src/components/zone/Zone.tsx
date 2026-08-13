import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Simulator } from './Simulator';
import { HazardRings } from './HazardRings';
import { Scorecard } from './Scorecard';
import { useSimulatorStore } from '../../lib/simulatorStore';

export const Zone: React.FC = () => {
  const { resetRun, setPlaying } = useSimulatorStore();
  const [hasStarted, setHasStarted] = useState(false);
  const [showWayoTooltip, setShowWayoTooltip] = useState(true);

  useEffect(() => {
    resetRun();
    setHasStarted(false);
    setShowWayoTooltip(true);
  }, [resetRun]);

  const handleEnterZone = () => {
    setHasStarted(true);
    setTimeout(() => setPlaying(true), 100);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center pt-24 pb-12 px-6 relative">
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          /* ─── Intro Modal ─── */
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 p-12 flex flex-col items-center text-center mx-auto my-auto"
          >
            <img
              src="/wayo-idle.png"
              alt="Wayo"
              className="w-40 h-40 object-contain mb-8"
            />
            <h1 className="text-4xl font-bold text-slate-900 mb-6 font-['Inter',sans-serif]">
              Hazard Perception Simulator
            </h1>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed max-w-lg font-['Inter',sans-serif]">
              Test your situational awareness against the AV platform. Watch the
              video carefully. Your goal is to spot potential hazards early.
              <br />
              <br />
              When you see a hazard (pedestrian, vehicle, or sign),{' '}
              <strong className="text-slate-700">click on it immediately</strong>.
              Correct clicks earn points, while missed hazards will pause the
              simulation.
            </p>
            <button
              onClick={handleEnterZone}
              className="w-full max-w-sm bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold py-4 px-8 rounded-pill text-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-[#4285F4]/20"
            >
              Enter Zone
            </button>
          </motion.div>
        ) : (
          /* ─── Active Simulation ─── */
          <motion.div
            key="simulator"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-[75vw] flex flex-col items-center"
          >
            {/* ─── Simulator Container ─── */}
            <div className="w-full">
              <div className="grid grid-cols-[180px_1fr] gap-4 w-full items-stretch">
                {/* Left Sidebar: Hazard Rings */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-4 flex flex-col">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">
                    Hazard Rings
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <HazardRings />
                  </div>
                </div>

                {/* Right: Simulator */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                  <Simulator />
                </div>
              </div>
            </div>

            {/* ─── Helper Text ─── */}
            <div className="w-full mt-6 text-center">
              <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-500 text-sm py-3 px-6 rounded-pill">
                <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse" />
                Click directly on developing hazards in the video as soon as you
                identify them.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Wayo Tooltip ─── */}
      <AnimatePresence>
        {hasStarted && showWayoTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 z-50 max-w-xs"
          >
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-4 relative">
              <button
                onClick={() => setShowWayoTooltip(false)}
                className="absolute top-2 right-3 text-slate-300 hover:text-slate-500 text-xs"
              >
                ✕
              </button>
              <div className="flex items-start gap-3">
                <img
                  src="/wayo-avatar.png"
                  alt="Wayo"
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900 mb-1">
                    Wayo says:
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Watch for pedestrians near crosswalks and vehicles changing
                    lanes. Click hazards the moment you spot them!
                  </p>
                </div>
              </div>
              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-slate-200 transform rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scorecard overlay */}
      <Scorecard />
    </div>
  );
};
