import { Canvas } from '@react-three/fiber';
import { AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
import { SCENE_ORDER } from './types';
import { SceneRenderer } from './routes';
import { ProgressDots } from './components/ProgressDots';
import { GlobalScene } from './components/three/GlobalScene';

export default function App() {
  const currentSceneIndex = useStore((s) => s.currentSceneIndex);
  const sceneId = SCENE_ORDER[currentSceneIndex];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* z-0: Global 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 14, 0], fov: 55, up: [0, 0, -1] }}
          gl={{ powerPreference: 'high-performance', antialias: false }}
          style={{ width: '100%', height: '100%' }}
        >
          <GlobalScene />
        </Canvas>
      </div>
      {/* z-10: DOM overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="pointer-events-auto w-full h-full">
          <AnimatePresence mode="wait">
            <SceneRenderer key={sceneId} sceneId={sceneId} />
          </AnimatePresence>
          <ProgressDots />
        </div>
      </div>
    </div>
  );
}
