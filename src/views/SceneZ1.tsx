import { motion } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { SpeechBubble } from '../components/SpeechBubble';
import { ContinueArrow } from '../components/ContinueArrow';
import { useStore } from '../store/useStore';
import { ZONE_INCIDENT, ZONE_NARRATIVE } from '../content/scenario-data';
import { useEffect, useState } from 'react';

export default function SceneZ1() {
  const nextScene = useStore((s) => s.nextScene);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCard(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <SceneShell zone="zone" guideState={ZONE_NARRATIVE[0].guideState} guidePosition="center">
      <motion.div
        className="absolute top-[12%] left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showCard ? 1 : 0, y: showCard ? 0 : -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-panel px-8 py-5 font-data text-center">
          <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2">Live Incident Feed</div>
          <div className="w-12 h-px bg-white/20 mx-auto mb-3" />
          <div className="text-xs text-white/50 mb-1">Intersection · E Camelback Rd, Phoenix</div>
          <div className="font-display text-xl text-white/90 mt-1">{ZONE_INCIDENT.id}</div>
          <div className="text-xs text-amber-400/80 mt-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 inline-block">{ZONE_INCIDENT.type}</div>
        </div>
      </motion.div>

      <SpeechBubble show={showCard} position="above-wayo">
        {ZONE_NARRATIVE[0].text}
      </SpeechBubble>

      {showCard && <ContinueArrow onClick={nextScene} label="View AV Overlay" />}
    </SceneShell>
  );
}
