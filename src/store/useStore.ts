import { create } from 'zustand';
import type { SceneId, GuideState } from '../types';
import { SCENE_ORDER, SCENE_REGISTRY } from '../types';
import type { RoutingOption } from '../content/scenario-data';

type CameraTarget = 'hub' | 'zone1';
type TransitionPhase = 'idle' | 'transitioning' | 'complete';

function computeInitialCameraTarget(): CameraTarget {
  const sceneId = SCENE_ORDER[0];
  const meta = SCENE_REGISTRY.find((s) => s.id === sceneId);
  if (!meta) return 'hub';
  switch (meta.zone) {
    case 'zone': return 'zone1';
    default: return 'hub';
  }
}

interface StoreState {
  currentSceneIndex: number;
  guideState: GuideState;
  accessedScenes: Set<SceneId>;
  jogPos: number;
  cameraTarget: CameraTarget;
  transitionPhase: TransitionPhase;
  selectedRouting: RoutingOption | null;
  triageComplete: boolean;
  seamPayload: { incidentId: string; reasonCode: string; selectedLabel: string } | null;
  quizScore: number;
  zoneDecisionCorrect: boolean | null;
  
  navigateTo: (sceneId: SceneId) => void;
  nextScene: () => void;
  setGuideState: (state: GuideState) => void;
  setJogPos: (v: number) => void;
  markAccessed: (sceneId: SceneId) => void;
  setCameraTarget: (target: CameraTarget) => void;
  setTransitionPhase: (phase: TransitionPhase) => void;
  selectRouting: (option: RoutingOption) => void;
  confirmRouting: () => void;
  resetTriage: () => void;
  setQuizScore: (score: number) => void;
  setZoneDecisionCorrect: (correct: boolean) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  currentSceneIndex: 0,
  guideState: 'idle',
  accessedScenes: new Set<SceneId>(['L1']),
  jogPos: 0,
  cameraTarget: computeInitialCameraTarget(),
  transitionPhase: 'idle' as const,
  selectedRouting: null,
  triageComplete: false,
  seamPayload: null,
  quizScore: 0,
  zoneDecisionCorrect: null,

  navigateTo: (sceneId) => {
    const index = SCENE_ORDER.indexOf(sceneId);
    if (index === -1) return;
    const accessed = new Set(get().accessedScenes);
    accessed.add(sceneId);

    const meta = SCENE_REGISTRY.find((s) => s.id === sceneId);
    let cameraTarget: CameraTarget = 'hub';
    if (meta) {
      if (meta.zone === 'zone') cameraTarget = 'zone1';
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

  setGuideState: (state) => set({ guideState: state }),

  setJogPos: (v) => set({ jogPos: v }),

  markAccessed: (sceneId) => {
    const accessed = new Set(get().accessedScenes);
    accessed.add(sceneId);
    set({ accessedScenes: accessed });
  },

  setCameraTarget: (target) => set({ cameraTarget: target, transitionPhase: 'transitioning' }),

  setTransitionPhase: (phase) => set({ transitionPhase: phase }),

  selectRouting: (option) => set({ selectedRouting: option }),

  confirmRouting: () => {
    const { selectedRouting } = get();
    if (!selectedRouting) return;
    set({
      triageComplete: true,
      seamPayload: {
        incidentId: 'PHX-4471-RTOR',
        reasonCode: selectedRouting.reasonCode,
        selectedLabel: selectedRouting.label,
      },
    });
  },

  resetTriage: () =>
    set({
      selectedRouting: null,
      triageComplete: false,
      seamPayload: null,
      quizScore: 0,
      zoneDecisionCorrect: null,
    }),
    
  setQuizScore: (score) => set({ quizScore: score }),
  
  setZoneDecisionCorrect: (correct) => set({ zoneDecisionCorrect: correct }),
}));
