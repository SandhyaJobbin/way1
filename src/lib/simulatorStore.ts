import { create } from 'zustand';
import { HazardResult } from './scoring';

interface SimulatorState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  hasSeenTutorial: boolean;
  activeRun: {
    hazards: HazardResult[];
    misses: string[];
    falseClicks: number;
    completed: boolean;
  };
  
  // Actions
  setPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setTutorialSeen: (seen: boolean) => void;
  
  // Interaction Actions
  recordHazardClick: (hazardId: string, category: HazardResult['category'], points: number, reactionMs: number) => void;
  recordMiss: (hazardId: string) => void;
  recordFalseClick: () => void;
  finishRun: () => void;
  resetRun: () => void;
}

export const useSimulatorStore = create<SimulatorState>((set) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 1,
  hasSeenTutorial: false,
  
  activeRun: {
    hazards: [],
    misses: [],
    falseClicks: 0,
    completed: false,
  },
  
  setPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setTutorialSeen: (seen) => set({ hasSeenTutorial: seen }),
  
  recordHazardClick: (hazardId, category, points, reactionMs) => set((state) => {
    // Only record once per hazard
    const alreadyClicked = state.activeRun.hazards.some(h => h.hazardId === hazardId);
    if (alreadyClicked) return state;

    return {
      activeRun: {
        ...state.activeRun,
        hazards: [
          ...state.activeRun.hazards,
          { hazardId, category, detected: true, reactionMs, points }
        ]
      }
    };
  }),
  
  recordMiss: (hazardId) => set((state) => {
    if (state.activeRun.misses.includes(hazardId)) return state;
    return {
      activeRun: {
        ...state.activeRun,
        misses: [...state.activeRun.misses, hazardId]
      }
    };
  }),

  recordFalseClick: () => set((state) => ({
    activeRun: {
      ...state.activeRun,
      falseClicks: state.activeRun.falseClicks + 1
    }
  })),
  
  finishRun: () => set((state) => ({
    activeRun: {
      ...state.activeRun,
      completed: true
    },
    isPlaying: false
  })),
  
  resetRun: () => set(() => ({
    activeRun: {
      hazards: [],
      misses: [],
      falseClicks: 0,
      completed: false
    },
    currentTime: 0,
    isPlaying: false
  }))
}));
