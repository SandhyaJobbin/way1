import { motion } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { SpeechBubble } from '../components/SpeechBubble';
import { ContinueArrow } from '../components/ContinueArrow';
import { TriageConsole } from '../components/TriageConsole';
import { useStore } from '../store/useStore';
import { TRIAGE_INCIDENT, TRIAGE_ROUTING_OPTIONS, ZONE2_NARRATIVE } from '../content/scenario-data';
import { useEffect, useState } from 'react';

export default function Scene20() {
  const nextScene = useStore((s) => s.nextScene);
  const setWayoState = useStore((s) => s.setWayoState);
  const selectRouting = useStore((s) => s.selectRouting);
  const selectedRouting = useStore((s) => s.selectedRouting);
  const [showConsole, setShowConsole] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [speechIndex, setSpeechIndex] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setShowConsole(true), 400);
    const t2 = setTimeout(() => {
      setWayoState(ZONE2_NARRATIVE[0].wayoState);
    }, 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [setWayoState]);

  useEffect(() => {
    const t = setTimeout(() => setShowCards(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const handleRoutingSelect = (id: string) => {
    const option = TRIAGE_ROUTING_OPTIONS.find((o) => o.id === id);
    if (option) selectRouting(option);
  };

  return (
    <SceneShell zone="zone2" wayoState={ZONE2_NARRATIVE[0].wayoState} wayoPosition="left">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: showConsole ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <TriageConsole
          incident={TRIAGE_INCIDENT}
          showScrubber={true}
          showRoutingCards={showCards}
          selectedRoutingId={selectedRouting?.id || null}
          onRoutingSelect={handleRoutingSelect}
        />
      </motion.div>

      <SpeechBubble
        show={showConsole}
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

      {selectedRouting && (
        <ContinueArrow onClick={nextScene} label="Confirm routing" />
      )}
    </SceneShell>
  );
}
