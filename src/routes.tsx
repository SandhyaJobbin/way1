import { lazy, Suspense } from 'react';
import { SCENE_ORDER } from './types';
import type { SceneId } from './types';

const Scene01 = lazy(() => import('./views/Scene01'));
const Scene02 = lazy(() => import('./views/Scene02'));
const Scene03 = lazy(() => import('./views/Scene03'));
const Scene16 = lazy(() => import('./views/Scene16'));
const Scene17 = lazy(() => import('./views/Scene17'));
const Scene19 = lazy(() => import('./views/Scene19'));
const Scene20 = lazy(() => import('./views/Scene20'));
const Scene22 = lazy(() => import('./views/Scene22'));
const SceneSeam = lazy(() => import('./views/SceneSeam'));

const sceneComponents: Record<SceneId, React.ComponentType> = {
  '01': Scene01,
  '02': Scene02,
  '03': Scene03,
  '16': Scene16,
  '17': Scene17,
  '19': Scene19,
  '20': Scene20,
  '22': Scene22,
  'seam': SceneSeam,
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