import { motion } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { SpeechBubble } from '../components/SpeechBubble';
import { ContinueArrow } from '../components/ContinueArrow';
import { useStore } from '../store/useStore';

export default function SceneL1() {
  const nextScene = useStore((s) => s.nextScene);

  return (
    <SceneShell zone="lesson" guideState="idle" guidePosition="center">
      <motion.div
        className="absolute top-[14%] left-1/2 -translate-x-1/2 z-30 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h1 className="font-display text-5xl md:text-6xl text-white/95 warm-glow leading-tight">
          US Driving Behavior Recognition
        </h1>
        <h2 className="font-body text-xl text-white/60 mt-3 tracking-wide">
          Phoenix & San Francisco
        </h2>
      </motion.div>

      <SpeechBubble show={true} position="above-wayo">
        You're training to read US roads the way an AV does.
      </SpeechBubble>

      <ContinueArrow onClick={nextScene} label="Begin Lesson" />
    </SceneShell>
  );
}
