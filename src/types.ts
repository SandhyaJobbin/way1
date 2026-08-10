export type GuideState = 'idle' | 'curious' | 'thinking' | 'concerned' | 'alert' | 'happy';

export type Zone = 'lesson' | 'zone';

export type SceneId = 'L1' | 'L2' | 'L3' | 'Z1' | 'Z2' | 'Z3' | 'Z4';

export interface SceneMeta {
  id: SceneId;
  zone: Zone;
  guideState: GuideState | GuideState[];
  title?: string;
}

export interface SceneDefinition {
  id: SceneId;
  zone: Zone;
  guideStates: GuideState[];
  component: React.ComponentType;
}

export const SCENE_REGISTRY: SceneMeta[] = [
  { id: 'L1', zone: 'lesson', guideState: 'idle', title: 'Intro' },
  { id: 'L2', zone: 'lesson', guideState: 'curious', title: 'Concept Map' },
  { id: 'L3', zone: 'lesson', guideState: 'thinking', title: 'Quick Check' },
  { id: 'Z1', zone: 'zone', guideState: 'alert', title: 'Scenario Setup' },
  { id: 'Z2', zone: 'zone', guideState: 'curious', title: 'AV Overlay View' },
  { id: 'Z3', zone: 'zone', guideState: 'thinking', title: 'Decision Point' },
  { id: 'Z4', zone: 'zone', guideState: 'happy', title: 'Scorecard' },
];

export const ZONE_ORDER: Zone[] = ['lesson', 'zone'];

export const SCENE_ORDER: SceneId[] = ['L1', 'L2', 'L3', 'Z1', 'Z2', 'Z3', 'Z4'];