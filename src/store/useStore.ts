import { create } from 'zustand';
import type { SceneId, WayoState } from '../types';
import { SCENE_ORDER } from '../types';

interface StoreState {
  currentSceneIndex: number;
  wayoState: WayoState;
  accessedScenes: Set<SceneId>;
  jogPos: number;
  navigateTo: (sceneId: SceneId) => void;
  nextScene: () => void;
  setWayoState: (state: WayoState) => void;
  setJogPos: (v: number) => void;
  markAccessed: (sceneId: SceneId) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  currentSceneIndex: 0,
  wayoState: 'idle',
  accessedScenes: new Set<SceneId>(['01']),
  jogPos: 0,

  navigateTo: (sceneId) => {
    const index = SCENE_ORDER.indexOf(sceneId);
    if (index !== -1) {
      const accessed = new Set(get().accessedScenes);
      accessed.add(sceneId);
      set({ currentSceneIndex: index, accessedScenes: accessed });
    }
  },

  nextScene: () => {
    const next = Math.min(get().currentSceneIndex + 1, SCENE_ORDER.length - 1);
    const accessed = new Set(get().accessedScenes);
    accessed.add(SCENE_ORDER[next]);
    set({ currentSceneIndex: next, accessedScenes: accessed });
  },

  setWayoState: (state) => set({ wayoState: state }),

  setJogPos: (v) => set({ jogPos: v }),

  markAccessed: (sceneId) => {
    const accessed = new Set(get().accessedScenes);
    accessed.add(sceneId);
    set({ accessedScenes: accessed });
  },
}));