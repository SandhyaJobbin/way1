import React, { useRef, useEffect } from 'react';
import { useSimulatorStore } from '../../lib/simulatorStore';
import { scenarios } from '../../content';

// Find the single scenario (assuming one for v1 demo)
const scenario = scenarios.length > 0 ? scenarios[0] : null;

export const Simulator: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { 
    isPlaying, setPlaying, setCurrentTime, currentTime,
    hasSeenTutorial, setTutorialSeen,
    recordHazardClick, recordFalseClick, finishRun
  } = useSimulatorStore();

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
    
    // Tutorial logic: pause at first hazard if not seen
    if (!hasSeenTutorial && scenario && scenario.hazards.length > 0) {
      const firstHazard = scenario.hazards[0];
      if (time >= firstHazard.t && time < firstHazard.t + 0.1) {
        setPlaying(false);
        setTutorialSeen(true);
        // Dispatch some tutorial UI event or rely on Zone to render a tooltip
      }
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

    // Check if click is inside any active hazard hit-region
    let hit = false;
    scenario.hazards.forEach((hazard, idx) => {
      // Check window
      if (currentTime >= hazard.window[0] && currentTime <= hazard.window[1]) {
        // Check region
        const { x: hX, y: hY, w: hW, h: hH } = hazard.hitRegion;
        if (x >= hX && x <= hX + hW && y >= hY && y <= hY + hH) {
          hit = true;
          // Calculate reaction ms based on hazard start time (t)
          const reactionMs = Math.max(0, (currentTime - hazard.t) * 1000);
          recordHazardClick(idx.toString(), hazard.category, hazard.points, reactionMs);
        }
      }
    });

    if (!hit) {
      recordFalseClick();
    }
  };

  if (!scenario) {
    return <div className="p-8 text-center bg-gray-100 rounded-lg">No scenario data available.</div>;
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-black overflow-hidden cursor-crosshair group"
      onClick={handleVideoClick}
    >
      <video
        ref={videoRef}
        src={scenario.clip.src || ''}
        poster={scenario.clip.poster}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        playsInline
        controls
      />
      
      {/* Dev UI for playback, assuming custom controls in the demo */}
      <div className="absolute bottom-4 left-4 z-10">
        <button 
          onClick={(e) => { e.stopPropagation(); setPlaying(!isPlaying); }}
          className="bg-white text-navy-900 px-4 py-2 rounded-full font-medium border border-gray-300"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      
      {/* Crosshair element following mouse could be added here */}
    </div>
  );
};
