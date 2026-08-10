import { motion } from 'framer-motion';
import { SCENE_ORDER } from '../types';
import { useStore } from '../store/useStore';

export function ProgressDots() {
  const currentSceneIndex = useStore((s) => s.currentSceneIndex);
  const accessedScenes = useStore((s) => s.accessedScenes);

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
      {SCENE_ORDER.map((sceneId, i) => (
        <motion.div
          key={sceneId}
          className="w-2 h-2 rounded-full"
          initial={false}
          animate={{
            backgroundColor: i === currentSceneIndex
              ? 'rgba(232, 213, 183, 1)'
              : accessedScenes.has(sceneId)
                ? 'rgba(232, 213, 183, 0.4)'
                : 'rgba(255, 255, 255, 0.15)',
            scale: i === currentSceneIndex ? 1.3 : 1,
          }}
          transition={{ duration: 0.4 }}
        />
      ))}
    </div>
  );
}