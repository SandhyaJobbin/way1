import { motion } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { useStore } from '../store/useStore';

export default function Scene01() {
  const nextScene = useStore((s) => s.nextScene);

  return (
    <SceneShell zone="act1" wayoState="idle" wayoPosition="center">
      {/* Title */}
      <motion.div
        className="absolute top-[18%] left-1/2 -translate-x-1/2 z-30 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h1 className="font-display text-4xl md:text-5xl text-white/95 warm-glow leading-tight">
          One intersection.
        </h1>
        <h1 className="font-display text-4xl md:text-5xl text-white/95 warm-glow leading-tight">
          Three decisions.
        </h1>
      </motion.div>

      {/* Begin button */}
      <motion.button
        className="absolute top-[42%] left-1/2 -translate-x-1/2 z-30
                   px-10 py-3 rounded-full
                   bg-white/15 backdrop-blur-md border border-white/20
                   font-display text-base font-semibold text-white/90
                   hover:bg-white/25 hover:text-white transition-colors cursor-pointer"
        onClick={nextScene}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Begin
      </motion.button>
    </SceneShell>
  );
}