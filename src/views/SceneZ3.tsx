import { motion, AnimatePresence } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { SpeechBubble } from '../components/SpeechBubble';
import { ContinueArrow } from '../components/ContinueArrow';
import { useStore } from '../store/useStore';
import { ZONE_NARRATIVE } from '../content/scenario-data';
import { useState } from 'react';

const DECISIONS = [
  { id: 'correct', label: 'Pedestrian jaywalking — intent unclear' },
  { id: 'wrong1', label: 'Pedestrian at crosswalk — legal crossing' },
  { id: 'wrong2', label: 'Stationary pedestrian — no action needed' },
];

export default function SceneZ3() {
  const nextScene = useStore((s) => s.nextScene);
  const setZoneDecisionCorrect = useStore((s) => s.setZoneDecisionCorrect);
  const [selected, setSelected] = useState<string | null>(null);

  const handleDecision = (id: string) => {
    if (selected !== null) return;
    setSelected(id);
    setZoneDecisionCorrect(id === 'correct');
  };

  return (
    <SceneShell 
      zone="zone" 
      guideState={selected === 'correct' ? ZONE_NARRATIVE[2].guideState : (selected ? ZONE_NARRATIVE[3].guideState : ZONE_NARRATIVE[1].guideState)} 
      guidePosition="center"
    >
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[460px] max-w-[90vw] z-30 space-y-4">
        <h3 className="font-display text-2xl text-white/90 mb-4 text-center">Identify the Behavior</h3>
        
        {DECISIONS.map((dec, i) => {
          let bgColor = 'bg-white/5';
          let borderColor = 'border-white/10';
          
          if (selected) {
            if (dec.id === 'correct') {
              bgColor = 'bg-green-500/20';
              borderColor = 'border-green-500/50';
            } else if (selected === dec.id) {
              bgColor = 'bg-amber-500/20';
              borderColor = 'border-amber-500/50';
            }
          }
          
          return (
            <motion.button
              key={dec.id}
              className={`w-full text-left px-5 py-4 rounded-lg border transition-all cursor-pointer ${bgColor} ${borderColor}`}
              onClick={() => handleDecision(dec.id)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: selected === null ? 1.02 : 1 }}
              whileTap={{ scale: selected === null ? 0.98 : 1 }}
            >
              <span className="font-body text-sm text-white/90">{dec.label}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <SpeechBubble 
          key={selected || 'none'} 
          show={true} 
          position="above-wayo"
        >
          {selected === 'correct' ? ZONE_NARRATIVE[2].text : (selected ? ZONE_NARRATIVE[3].text : ZONE_NARRATIVE[1].text)}
        </SpeechBubble>
      </AnimatePresence>

      {selected && <ContinueArrow onClick={nextScene} label="View Scorecard" />}
    </SceneShell>
  );
}
