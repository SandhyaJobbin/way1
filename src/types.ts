export type WayoState = 'idle' | 'curious' | 'thinking' | 'concerned' | 'alert' | 'happy';

export type Zone =
  | 'act1'
  | 'lessonA'
  | 'lessonB'
  | 'lessonC'
  | 'zone1'
  | 'zone2'
  | 'zone3'
  | 'act4';

export type SceneId = '01' | '02' | '03' | '16' | '17' | '19' | '20' | '22' | 'seam';

export interface SceneMeta {
  id: SceneId;
  zone: Zone;
  wayoState: WayoState | WayoState[];
  title?: string;
}

export interface SceneDefinition {
  id: SceneId;
  zone: Zone;
  wayoStates: WayoState[];
  component: React.ComponentType;
}

export const SCENE_REGISTRY: SceneMeta[] = [
  { id: '01', zone: 'act1', wayoState: 'idle', title: 'One intersection. Three decisions.' },
  { id: '02', zone: 'act1', wayoState: ['idle', 'curious'] },
  { id: '03', zone: 'act1', wayoState: ['curious', 'concerned'] },
  { id: '16', zone: 'zone1', wayoState: 'alert' },
  { id: '17', zone: 'zone1', wayoState: 'idle' },
  { id: '19', zone: 'zone2', wayoState: 'curious' },
  { id: '20', zone: 'zone2', wayoState: 'idle' },
  { id: '22', zone: 'zone2', wayoState: 'happy' },
  { id: 'seam', zone: 'zone2', wayoState: 'curious', title: 'The Seam' },
];

export const ZONE_ORDER: Zone[] = ['act1', 'lessonA', 'lessonB', 'lessonC', 'zone1', 'zone2', 'zone3', 'act4'];

export const SCENE_ORDER: SceneId[] = ['01', '02', '03', '16', '17', '19', '20', '22', 'seam'];