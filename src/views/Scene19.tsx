import { motion } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { SpeechBubble } from '../components/SpeechBubble';
import { ContinueArrow } from '../components/ContinueArrow';
import { useStore } from '../store/useStore';
import { TRIAGE_INCIDENT, ZONE2_NARRATIVE } from '../content/scenario-data';
import { useEffect, useState } from 'react';

export default function Scene19() {
  const nextScene = useStore((s) => s.nextScene);
  const setWayoState = useStore((s) => s.setWayoState);
  const [showCard, setShowCard] = useState(false);
  const [speechIndex, setSpeechIndex] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setShowCard(true), 800);
    const t2 = setTimeout(() => {
      setWayoState(ZONE2_NARRATIVE[0].wayoState);
    }, 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [setWayoState]);

  return (
    <SceneShell zone="zone2" wayoState={ZONE2_NARRATIVE[0].wayoState} wayoPosition="left">
      {/* Incident notification card */}
      <motion.div
        className="absolute top-[18%] right-[8%] z-30"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: showCard ? 1 : 0, x: showCard ? 0 : 50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-panel px-6 py-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--c-triage-glow)' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div>
              <div className="font-data text-sm text-white/90">{TRIAGE_INCIDENT.id}</div>
              <div className="font-data text-xs text-white/40 mt-0.5">In queue · 04m</div>
            </div>
          </div>
        </div>
      </motion.div>

      <SpeechBubble
        show={speechIndex >= 0}
        text={ZONE2_NARRATIVE[0].text}
        position="top-left"
        onComplete={() => {
          if (speechIndex < ZONE2_NARRATIVE.length - 1) {
            setTimeout(() => {
              const next = speechIndex + 1;
              setSpeechIndex(next);
              setWayoState(ZONE2_NARRATIVE[next].wayoState);
            }, ZONE2_NARRATIVE[speechIndex].delay || 400);
          }
        }}
      />

      <ContinueArrow onClick={nextScene} label="Approach console" />
    </SceneShell>
  );
}
