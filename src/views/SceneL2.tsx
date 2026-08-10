import { motion, AnimatePresence } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { ContinueArrow } from '../components/ContinueArrow';
import { useStore } from '../store/useStore';
import { LESSON_BEHAVIORS } from '../content/scenario-data';
import { useState } from 'react';

export default function SceneL2() {
  const nextScene = useStore((s) => s.nextScene);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  const handleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
    setViewed((prev) => new Set(prev).add(id));
  };

  const allViewed = viewed.size === LESSON_BEHAVIORS.length;

  return (
    <SceneShell zone="lesson" guideState="curious" guidePosition="center">
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 z-30 flex flex-col gap-3 w-[480px] max-w-[90vw]">
        <h3 className="font-display text-3xl text-white/90 mb-1 text-center">Core Behaviors</h3>
        <p className="text-xs text-white/40 font-body mb-1 text-center">Tap each to explore</p>
        {LESSON_BEHAVIORS.map((behavior, i) => (
          <motion.div
            key={behavior.id}
            className={`glass-panel px-5 py-4 cursor-pointer transition-all ${expanded === behavior.id ? 'ring-2 ring-sky-400/40 bg-white/10' : 'hover:bg-white/8'}`}
            onClick={() => handleExpand(behavior.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                {'iconUrl' in behavior && behavior.iconUrl ? (
                  <img src={behavior.iconUrl} alt={behavior.title} className="w-10 h-10 object-contain rounded" />
                ) : (
                  <span className="text-2xl">{behavior.icon}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm font-semibold text-white/90">{behavior.title}</div>
                <AnimatePresence>
                  {expanded === behavior.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-white/60 mt-2 font-body leading-relaxed">{behavior.desc}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-sky-400/60"
                            initial={{ width: 0 }}
                            animate={{ width: `${behavior.confidenceLevel}%` }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                          />
                        </div>
                        <span className="text-[10px] text-white/40 font-data shrink-0">{behavior.confidenceLevel}%</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {viewed.has(behavior.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center shrink-0"
                >
                  <span className="text-green-400 text-[10px]">✓</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {allViewed && <ContinueArrow onClick={nextScene} label="Quick Check" />}
    </SceneShell>
  );
}
