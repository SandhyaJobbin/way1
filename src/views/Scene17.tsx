import { motion } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { ContinueArrow } from '../components/ContinueArrow';
import { useStore } from '../store/useStore';
import { useEffect, useState } from 'react';

export default function Scene17() {
  const nextScene = useStore((s) => s.nextScene);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCard(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <SceneShell zone="zone1" wayoState="idle" wayoPosition="left">
      {/* Radio handset glow */}
      <motion.div
        className="absolute top-[22%] right-[12%] z-30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: 'rgba(255, 213, 79, 0.3)' }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="glass-panel px-8 py-6 text-center relative z-10">
            <div className="text-3xl mb-1">📻</div>
            <div className="font-display text-sm text-white/90 font-semibold">Radio handset</div>
            <div className="text-xs text-white/40 mt-1">Connected to crew</div>
          </div>
        </div>
      </motion.div>

      {/* Dimmed alternatives */}
      <div className="absolute top-[45%] right-[5%] z-20 opacity-25">
        <div className="flex gap-3">
          <div className="glass-panel px-4 py-3 text-center">
            <div className="text-xl">⚠</div>
            <div className="text-xs text-white/60 mt-1">Caution sign</div>
          </div>
          <div className="glass-panel px-4 py-3 text-center">
            <div className="text-xl">📞</div>
            <div className="text-xs text-white/60 mt-1">Dispatch</div>
          </div>
        </div>
      </div>

      {/* Event card */}
      <motion.div
        className="absolute top-[15%] left-[8%] z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showCard ? 1 : 0, y: showCard ? 0 : -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-panel px-5 py-3 font-data">
          <div className="text-xs text-white/40 uppercase tracking-wider">Event logged</div>
          <div className="text-base text-white/90 mt-1">TRI-2291-RA</div>
          <div className="text-xs text-white/50 mt-1">Construction zone · Radio action</div>
        </div>
      </motion.div>

      <ContinueArrow onClick={nextScene} label="Next" />
    </SceneShell>
  );
}