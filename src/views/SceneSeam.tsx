import { motion } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { SpeechBubble } from '../components/SpeechBubble';
import { ContinueArrow } from '../components/ContinueArrow';
import { useStore } from '../store/useStore';
import { TRIAGE_INCIDENT } from '../content/scenario-data';
import { useEffect, useState } from 'react';

export default function SceneSeam() {
  const nextScene = useStore((s) => s.nextScene);
  const seamPayload = useStore((s) => s.seamPayload);
  const setWayoState = useStore((s) => s.setWayoState);
  const [showQueue, setShowQueue] = useState(false);
  const [showIncoming, setShowIncoming] = useState(false);
  const [itemLanded, setItemLanded] = useState(false);

  const payload = seamPayload || {
    incidentId: TRIAGE_INCIDENT.id,
    reasonCode: 'ANNOTATE',
    selectedLabel: 'Annotation Team',
  };

  useEffect(() => {
    setWayoState('curious');
    const t1 = setTimeout(() => setShowQueue(true), 600);
    const t2 = setTimeout(() => setShowIncoming(true), 1400);
    const t3 = setTimeout(() => setItemLanded(true), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [setWayoState]);

  return (
    <SceneShell zone="zone2" wayoState="curious" wayoPosition="left">
      {/* Zone 3 preview panel — Annotation Workbench */}
      <motion.div
        className="absolute top-[12%] right-[5%] w-72 z-30"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: showQueue ? 1 : 0, x: showQueue ? 0 : 40 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-panel p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="font-data text-xs text-white/60 uppercase tracking-wider">Zone 3 · Annotation Workbench</span>
          </div>

          {/* Queue slots */}
          <div className="space-y-2">
            {/* Incoming item — animated slide */}
            <div className="relative h-14 overflow-hidden">
              {showIncoming && (
                <motion.div
                  className="absolute inset-0 rounded-lg border flex items-center px-3 gap-3"
                  style={{
                    backgroundColor: 'rgba(79, 195, 247, 0.08)',
                    borderColor: 'rgba(79, 195, 247, 0.25)',
                  }}
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: itemLanded ? 0 : -200, opacity: itemLanded ? 1 : 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 120 }}
                >
                  <div className="w-2 h-2 rounded-full bg-yellow-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-data text-xs text-white/90 truncate">{payload.incidentId}</div>
                    <div className="font-data text-[10px] text-white/40">{payload.selectedLabel}</div>
                  </div>
                  <div className="font-data text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/50 shrink-0">
                    {payload.reasonCode}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Empty queue slots */}
            {[
              { label: 'Waiting…', color: 'rgba(255,255,255,0.03)' },
              { label: 'Waiting…', color: 'rgba(255,255,255,0.03)' },
            ].map((slot, i) => (
              <div
                key={i}
                className="h-10 rounded-lg border border-dashed flex items-center px-3"
                style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: slot.color }}
              >
                <span className="font-data text-[10px] text-white/20">{slot.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Connection line visual */}
      <motion.div
        className="absolute top-[38%] left-[40%] w-[20%] z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: showIncoming ? 0.6 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <svg viewBox="0 0 120 2" className="w-full">
          <motion.line
            x1="0" y1="1" x2="120" y2="1"
            stroke="var(--c-triage-timeline)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </svg>
      </motion.div>

      <SpeechBubble
        show={true}
        text="Your routing decision now feeds the annotation queue — this is the ecosystem in action."
        position="top-left"
      />

      <ContinueArrow onClick={nextScene} label="Enter Zone 3" />
    </SceneShell>
  );
}
