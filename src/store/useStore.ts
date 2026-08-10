import { create } from 'zustand';
import type { SceneId, WayoState } from '../types';
import { SCENE_ORDER, SCENE_REGISTRY } from '../types';

type CameraTarget = 'hub' | 'zone1' | 'zone2' | 'zone3';
type TransitionPhase = 'idle' | 'transitioning' | 'complete';

function computeInitialCameraTarget(): CameraTarget {
  const sceneId = SCENE_ORDER[0];
  const meta = SCENE_REGISTRY.find((s) => s.id === sceneId);
  if (!meta) return 'hub';
  switch (meta.zone) {
    case 'zone1': return 'zone1';
    case 'zone2': return 'zone2';
    case 'zone3': return 'zone3';
    default: return 'hub';
  }
}

interface StoreState {
  currentSceneIndex: number;
  wayoState: WayoState;
  accessedScenes: Set<SceneId>;
  jogPos: number;
  cameraTarget: CameraTarget;
  transitionPhase: TransitionPhase;
  navigateTo: (sceneId: SceneId) => void;
  nextScene: () => void;
  setWayoState: (state: WayoState) => void;
  setJogPos: (v: number) => void;
  markAccessed: (sceneId: SceneId) => void;
  setCameraTarget: (target: CameraTarget) => void;
  setTransitionPhase: (phase: TransitionPhase) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  currentSceneIndex: 0,
  wayoState: 'idle',
  accessedScenes: new Set<SceneId>(['01']),
  jogPos: 0,
  cameraTarget: computeInitialCameraTarget(),
  transitionPhase: 'idle' as const,

  navigateTo: (sceneId) => {
    const index = SCENE_ORDER.indexOf(sceneId);
    if (index === -1) return;
    const accessed = new Set(get().accessedScenes);
    accessed.add(sceneId);

    const meta = SCENE_REGISTRY.find((s) => s.id === sceneId);
    let cameraTarget: CameraTarget = 'hub';
    if (meta) {
      if (meta.zone === 'zone1') cameraTarget = 'zone1';
      else if (meta.zone === 'zone2') cameraTarget = 'zone2';
    }

    set({
      currentSceneIndex: index,
      accessedScenes: accessed,
      cameraTarget,
      transitionPhase: 'transitioning',
    });
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

  setCameraTarget: (target) => set({ cameraTarget: target, transitionPhase: 'transitioning' }),

  setTransitionPhase: (phase) => set({ transitionPhase: phase }),
}));
