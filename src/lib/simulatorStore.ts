import { create } from 'zustand';
import { HazardResult } from './scoring';

export type TierLevel = 'foundation' | 'proficient' | 'advanced';

interface SimulatorState {
  isPlaying: boolean;
  currentTime: number;
  selectedTier: TierLevel;
  hasSeenTutorial: boolean;
  activeRun: {
    hazards: HazardResult[];
    falseClicks: number;
    completed: boolean;
  };
  
  // Actions
  setPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setTier: (tier: TierLevel) => void;
  setTutorialSeen: (seen: boolean) => void;
  
  // Interaction Actions
  recordHazardClick: (hazardId: string, category: HazardResult['category'], points: number, reactionMs: number) => void;
  recordFalseClick: () => void;
  finishRun: () => void;
  resetRun: () => void;
}

export const useSimulatorStore = create<SimulatorState>((set) => ({
  isPlaying: false,
  currentTime: 0,
  selectedTier: 'foundation',
  hasSeenTutorial: false,
  
  activeRun: {
    hazards: [],
    falseClicks: 0,
    completed: false,
  },
  
  setPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setTier: (tier) => set({ selectedTier: tier }),
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
      falseClicks: 0,
      completed: false
    },
    currentTime: 0,
    isPlaying: false
  }))
}));
