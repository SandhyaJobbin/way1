import { motion } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { SpeechBubble } from '../components/SpeechBubble';
import { ContinueArrow } from '../components/ContinueArrow';
import { useStore } from '../store/useStore';
import { ACT1_NARRATIVE } from '../content/scenario-data';
import { useEffect, useState } from 'react';
import type { WayoState } from '../types';

const [line0, line1] = ACT1_NARRATIVE;

export default function Scene02() {
  const nextScene = useStore((s) => s.nextScene);
  const setWayoState = useStore((s) => s.setWayoState);
  const [speechIndex, setSpeechIndex] = useState(0);
  const [wayoState, setWayoStateLocal] = useState<WayoState>(line0.wayoState);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setWayoStateLocal(line0.wayoState);
      setWayoState(line0.wayoState);
    }, 200);
    const t2 = setTimeout(() => {
      setSpeechIndex(1);
      setWayoStateLocal(line1.wayoState);
      setWayoState(line1.wayoState);
    }, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [setWayoState]);

  const speechLines = [line0.text, line1.text];

  return (
    <SceneShell zone="act1" wayoState={wayoState} wayoPosition="left">
      {/* Three glowing zones */}
      <div className="absolute bottom-[30%] inset-x-0 z-10">
        <div className="flex justify-center gap-[20%]">
          {[
            { label: 'Z1', color: 'rgba(255, 183, 77, 0.6)', x: '-20%' },
            { label: 'Z2', color: 'rgba(79, 195, 247, 0.6)', x: '0%' },
            { label: 'Z3', color: 'rgba(102, 187, 106, 0.6)', x: '20%' },
          ].map((zone, i) => (
            <motion.div
              key={zone.label}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.3, duration: 0.6 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: zone.color, boxShadow: `0 0 16px ${zone.color}` }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              />
              <span className="font-data text-xs text-white/60">{zone.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <SpeechBubble show={true} position="top-left" key={speechIndex}>
        {speechLines[speechIndex]}
      </SpeechBubble>

      <ContinueArrow onClick={nextScene} label="Enter Zone 1" />
    </SceneShell>
  );
}
