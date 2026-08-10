import { motion, AnimatePresence } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { SpeechBubble } from '../components/SpeechBubble';
import { ContinueArrow } from '../components/ContinueArrow';
import { useStore } from '../store/useStore';
import { TRIAGE_INCIDENT, TRIAGE_ROUTING_OPTIONS, ZONE2_NARRATIVE } from '../content/scenario-data';
import { useEffect, useState } from 'react';

export default function Scene22() {
  const nextScene = useStore((s) => s.nextScene);
  const confirmRouting = useStore((s) => s.confirmRouting);
  const selectedRouting = useStore((s) => s.selectedRouting);
  const setWayoState = useStore((s) => s.setWayoState);
  const [showCard, setShowCard] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showOrbitalMap, setShowOrbitalMap] = useState(false);

  const routingOption = selectedRouting
    ? TRIAGE_ROUTING_OPTIONS.find((o) => o.id === selectedRouting.id)
    : TRIAGE_ROUTING_OPTIONS[1]; // fallback to annotation

  useEffect(() => {
    setWayoState(ZONE2_NARRATIVE[ZONE2_NARRATIVE.length - 1].wayoState);
    const t1 = setTimeout(() => setShowCard(true), 600);
    const t2 = setTimeout(() => setFlipped(true), 1400);
    const t3 = setTimeout(() => {
      confirmRouting();
      setShowConfirmation(true);
    }, 2200);
    const t4 = setTimeout(() => setShowOrbitalMap(true), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [confirmRouting, setWayoState]);

  return (
    <SceneShell zone="zone2" wayoState={ZONE2_NARRATIVE[ZONE2_NARRATIVE.length - 1].wayoState} wayoPosition="left">
      {/* Card flip */}
      <AnimatePresence mode="wait">
        {showCard && !flipped && (
          <motion.div
            key="face-down"
            className="absolute top-[30%] left-[38%] z-30"
            style={{ perspective: 800 }}
            initial={{ opacity: 0, rotateY: 0 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="w-48 h-32 rounded-xl border flex items-center justify-center"
              style={{
                backgroundColor: 'var(--c-triage-cards)',
                borderColor: 'rgba(79, 195, 247, 0.2)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              }}
            >
              <div className="font-data text-sm text-white/50">Triage Decision</div>
            </div>
          </motion.div>
        )}

        {showCard && flipped && (
          <motion.div
            key="face-up"
            className="absolute top-[30%] left-[38%] z-30"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="w-48 h-32 rounded-xl border flex flex-col items-center justify-center p-4"
              style={{
                backgroundColor: 'var(--c-triage-cards)',
                borderColor: 'rgba(79, 195, 247, 0.4)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              }}
            >
              <div className="text-2xl mb-1">{routingOption?.icon}</div>
              <div className="font-data text-xs text-white/90">{routingOption?.label}</div>
              <div className="font-data text-[10px] text-white/40 mt-1">{routingOption?.description}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation card */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="absolute top-[52%] left-[35%] z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-panel px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="font-data text-xs text-white/90">Routed → {routingOption?.label}</span>
              </div>
              <div className="font-data text-[10px] text-white/40 mt-1">{TRIAGE_INCIDENT.id}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orbital map overlay */}
      <AnimatePresence>
        {showOrbitalMap && (
          <motion.div
            className="absolute top-[20%] right-[5%] w-48 h-48 z-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-panel p-3 h-full">
              <div className="font-data text-[10px] text-white/40 mb-2">SEAM MAP</div>
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="15" fill="none"
                        stroke="rgba(79, 195, 247, 0.2)" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" fill="none"
                        stroke="rgba(79, 195, 247, 0.15)" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="45" fill="none"
                        stroke="rgba(79, 195, 247, 0.1)" strokeWidth="0.5" />
                {/* Zone 2 token — active */}
                <motion.circle
                  cx="50" cy="35" r="4"
                  fill="var(--c-triage-glow)"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Seam path to Zone 3 */}
                <motion.path
                  d="M50,35 Q65,25 70,50"
                  fill="none"
                  stroke="var(--c-triage-timeline)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                {/* Zone 3 token — destination */}
                <motion.circle
                  cx="70" cy="50" r="3"
                  fill="var(--c-triage-timeline)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.7] }}
                  transition={{ duration: 1, delay: 1.8 }}
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SpeechBubble
        show={true}
        text={ZONE2_NARRATIVE[ZONE2_NARRATIVE.length - 1].text}
        position="top-left"
      />

      <ContinueArrow onClick={nextScene} label="Proceed to Zone 3" />
    </SceneShell>
  );
}
