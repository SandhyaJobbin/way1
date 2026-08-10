import { motion } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { SpeechBubble } from '../components/SpeechBubble';
import { ContinueArrow } from '../components/ContinueArrow';
import { TriageConsole } from '../components/TriageConsole';
import { useStore } from '../store/useStore';
import { ZONE_INCIDENT, ZONE_NARRATIVE } from '../content/scenario-data';
import { useEffect, useState } from 'react';

export default function SceneZ2() {
  const nextScene = useStore((s) => s.nextScene);
  const [showConsole, setShowConsole] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowConsole(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <SceneShell zone="zone" guideState={ZONE_NARRATIVE[1].guideState} guidePosition="center">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: showConsole ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <TriageConsole
          incident={ZONE_INCIDENT}
          showScrubber={true}
          showRoutingCards={false}
        />
      </motion.div>

      <SpeechBubble show={showConsole} position="above-wayo">
        {ZONE_NARRATIVE[1].text}
      </SpeechBubble>

      {showConsole && <ContinueArrow onClick={nextScene} label="Make Decision" />}
    </SceneShell>
  );
}
