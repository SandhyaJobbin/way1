import { lazy, Suspense } from 'react';
import { SCENE_ORDER } from './types';
import type { SceneId } from './types';

const SceneL1 = lazy(() => import('./views/SceneL1'));
const SceneL2 = lazy(() => import('./views/SceneL2'));
const SceneL3 = lazy(() => import('./views/SceneL3'));
const SceneZ1 = lazy(() => import('./views/SceneZ1'));
const SceneZ2 = lazy(() => import('./views/SceneZ2'));
const SceneZ3 = lazy(() => import('./views/SceneZ3'));
const SceneZ4 = lazy(() => import('./views/SceneZ4'));

const sceneComponents: Record<SceneId, React.ComponentType> = {
  'L1': SceneL1,
  'L2': SceneL2,
  'L3': SceneL3,
  'Z1': SceneZ1,
  'Z2': SceneZ2,
  'Z3': SceneZ3,
  'Z4': SceneZ4,
};

export function SceneRenderer({ sceneId }: { sceneId: SceneId }) {
  const Component = sceneComponents[sceneId];
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
}

export { SCENE_ORDER };