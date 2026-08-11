import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type CheckpointStatus = 'locked' | 'active' | 'complete';

interface ProgressState {
  checkpoints: { id: string; label: string; status: CheckpointStatus }[];
  gestureCaptured: boolean;
  captureGesture: () => void;
  setCheckpoint: (id: string, status: CheckpointStatus) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      checkpoints: [
        { id: 'lesson', label: 'Lesson', status: 'active' },
        { id: 'zone', label: 'Zone', status: 'locked' },
      ],
      gestureCaptured: false,
      captureGesture: () => set({ gestureCaptured: true }),
      setCheckpoint: (id, status) =>
        set((s) => ({ checkpoints: s.checkpoints.map((c) => (c.id === id ? { ...c, status } : c)) })),
    }),
    {
      name: 'av-context-trainer-progress',
      storage: createJSONStorage(() => {
        try {
          return localStorage;
        } catch {
          // Fallback for file:// or strict LMS webviews where localStorage throws
          let inMemoryStorage: Record<string, string> = {};
          return {
            getItem: (name) => inMemoryStorage[name] ?? null,
            setItem: (name, value) => { inMemoryStorage[name] = value; },
            removeItem: (name) => { delete inMemoryStorage[name]; },
          };
        }
      }),
      partialize: (s) => ({ checkpoints: s.checkpoints, gestureCaptured: s.gestureCaptured }),
    }
  )
);
