import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useSimulatorStore } from '../../lib/simulatorStore';
import { scenarios } from '../../content';

// Find the single scenario (assuming one for v1 demo)
const scenario = scenarios.length > 0 ? scenarios[0] : null;

export const Simulator: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { 
    isPlaying, setPlaying, setCurrentTime, currentTime,
    setDuration,
    recordHazardClick, recordMiss, recordFalseClick, finishRun, activeRun
  } = useSimulatorStore();

  const [clicks, setClicks] = useState<{ id: number, x: number, y: number, hit: boolean }[]>([]);
  const [missedHazard, setMissedHazard] = useState<{ id: string, category: string, explanation: string, hitRegion: {x: number, y: number, w: number, h: number} } | null>(null);
  const [missTimer, setMissTimer] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (missTimer !== null && missTimer > 0) {
      const timer = setTimeout(() => setMissTimer(prev => prev! - 1), 1000);
      return () => clearTimeout(timer);
    } else if (missTimer === 0) {
      setMissedHazard(null);
      setPlaying(true);
      setMissTimer(null);
    }
  }, [missTimer]);

  // Sync video play/pause with store
  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.play().catch(() => setPlaying(false));
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, setPlaying]);

  // Handle time update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    // Missed hazard logic
    if (scenario && isPlaying) {
      scenario.hazards.forEach((hazard) => {
        const hazardId = hazard.hazardId;
        if (time > hazard.window[1]) {
          const isClicked = activeRun.hazards.some(h => h.hazardId === hazardId);
          if (!isClicked && !activeRun.misses.includes(hazardId)) {
            setPlaying(false);
            recordMiss(hazardId);
            setMissedHazard({ id: hazardId, category: hazard.category, explanation: hazard.explanation, hitRegion: hazard.hitRegion });
            setMissTimer(10);
          }
        }
      });
    }
  };

  const handleEnded = () => {
    setPlaying(false);
    finishRun();
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    if (!containerRef.current || !scenario || !isPlaying) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100; // % x
    const y = ((e.clientY - rect.top) / rect.height) * 100; // % y

    // Add click feedback ID
    const clickId = Date.now();

    // Check if click is inside any active hazard hit-region
    let hit = false;
    scenario.hazards.forEach((hazard) => {
      // Check window
      if (currentTime >= hazard.window[0] && currentTime <= hazard.window[1]) {
        // Check region
        const { x: hX, y: hY, w: hW, h: hH } = hazard.hitRegion;
        if (x >= hX && x <= hX + hW && y >= hY && y <= hY + hH) {
          hit = true;
          // Calculate reaction ms based on hazard start time (t)
          const reactionMs = Math.max(0, (currentTime - hazard.t) * 1000);
          recordHazardClick(hazard.hazardId, hazard.category, hazard.points, reactionMs);
        }
      }
    });

    if (!hit) {
      recordFalseClick();
    }

    setClicks(prev => [...prev, { id: clickId, x, y, hit }]);
    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== clickId));
    }, 1000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  if (!scenario) {
    return <div className="p-8 text-center bg-gray-100 rounded-lg">No scenario data available.</div>;
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-black overflow-hidden"
      style={{ cursor: 'none' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={scenario.clip.src || ''}
        poster={scenario.clip.poster}
        className="w-full h-full object-cover pointer-events-none"
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onEnded={handleEnded}
        playsInline
        /* Removed controls to prevent native click-to-pause behavior */
      />
      
      {/* HUD (Heads Up Display) for Scores */}
      <div className="absolute top-4 right-4 z-20 flex gap-4 pointer-events-none">
        <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/10 flex flex-col items-center">
          <span className="text-xs text-white/70 font-semibold uppercase tracking-wider">Score</span>
          <span className="text-xl font-bold">{Math.max(0, activeRun.hazards.reduce((sum, h) => sum + h.points, 0) - (activeRun.falseClicks * 5))}</span>
        </div>
        <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/10 flex flex-col items-center">
          <span className="text-xs text-white/70 font-semibold uppercase tracking-wider">Spotted</span>
          <span className="text-xl font-bold">{activeRun.hazards.length}</span>
        </div>
        <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/10 flex flex-col items-center">
          <span className="text-xs text-white/70 font-semibold uppercase tracking-wider">False Clicks</span>
          <span className="text-xl font-bold text-red-400">{activeRun.falseClicks}</span>
        </div>
      </div>

      {/* Mouse-following crosshair cursor */}
      {mousePos && (
        <div 
          className="absolute pointer-events-none"
          style={{ 
            left: mousePos.x, 
            top: mousePos.y, 
            zIndex: 25,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
            <line x1="24" y1="0" x2="24" y2="18" stroke="white" strokeWidth="2" strokeOpacity="0.9" />
            <line x1="24" y1="30" x2="24" y2="48" stroke="white" strokeWidth="2" strokeOpacity="0.9" />
            <line x1="0" y1="24" x2="18" y2="24" stroke="white" strokeWidth="2" strokeOpacity="0.9" />
            <line x1="30" y1="24" x2="48" y2="24" stroke="white" strokeWidth="2" strokeOpacity="0.9" />
            <circle cx="24" cy="24" r="6" stroke="white" strokeWidth="1.5" strokeOpacity="0.9" fill="none" />
            <circle cx="24" cy="24" r="1.5" fill="white" fillOpacity="0.9" />
          </svg>
        </div>
      )}

      {/* Invisible overlay to capture clicks safely - highest z-index to catch clicks */}
      <div 
        className="absolute inset-0 z-30" 
      style={{ cursor: missedHazard ? 'auto' : 'none' }}
        onClick={handleVideoClick} 
      />

      {/* Click Animations */}
      <AnimatePresence>
        {clicks.map(click => (
          <motion.div
            key={click.id}
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-4 pointer-events-none z-20 flex items-center justify-center ${click.hit ? 'border-emerald-400 bg-emerald-400/30' : 'border-red-500 bg-red-500/20'}`}
            style={{ left: `${click.x}%`, top: `${click.y}%` }}
          >
            {click.hit && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-full h-full text-emerald-400 flex items-center justify-center"
              >
                <CheckCircle className="w-1/2 h-1/2" strokeWidth={3} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Missed Hazard Highlight Box */}
      <AnimatePresence>
        {missedHazard && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute border-4 border-red-500 bg-red-500/30 z-10 pointer-events-none shadow-[0_0_20px_rgba(239,68,68,0.8)]"
            style={{
              left: `${missedHazard.hitRegion.x}%`,
              top: `${missedHazard.hitRegion.y}%`,
              width: `${missedHazard.hitRegion.w}%`,
              height: `${missedHazard.hitRegion.h}%`
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Dev UI for playback, assuming custom controls in the demo */}
      <div className="absolute bottom-4 left-4 z-20">
        <button 
          onClick={(e) => { e.stopPropagation(); setPlaying(!isPlaying); }}
          className="bg-white text-ink px-4 py-2 rounded-full font-medium border border-line"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      {/* Missed Hazard Modal */}
      <AnimatePresence>
        {missedHazard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                ⚠️
              </div>
              <h3 className="text-2xl font-display font-semibold text-ink mb-2">
                Missed Hazard
              </h3>
              <p className="text-ink/80 mb-6">
                You missed a hazard: <strong className="capitalize">{missedHazard.category}</strong>. <br/><br/>
                {missedHazard.explanation}
              </p>
              <button
                onClick={() => {
                  setMissedHazard(null);
                  setPlaying(true);
                  setMissTimer(null);
                }}
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-pill transition-colors flex items-center justify-center gap-2"
              >
                <span>Resume</span>
                {missTimer !== null && <span className="opacity-75">({missTimer}s)</span>}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
