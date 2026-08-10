import { motion } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { SpeechBubble } from '../components/SpeechBubble';
import { useStore } from '../store/useStore';
import { useEffect, useState } from 'react';
import type { SceneId } from '../types';

const choices = [
  { id: 'radio', label: 'Grab radio handset', icon: '📻', desc: 'Direct line to construction crew' },
  { id: 'sign', label: 'Hold up caution sign', icon: '⚠', desc: 'Manual traffic control' },
  { id: 'phone', label: 'Call dispatch', icon: '📞', desc: 'Remote escalation path' },
];

export default function Scene16() {
  const navigateTo = useStore((s) => s.navigateTo);
  const [showBubble, setShowBubble] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 800);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (id: string) => {
    setSelected(id);
    setTimeout(() => navigateTo('17' as SceneId), 800);
  };

  return (
    <SceneShell zone="zone1" wayoState="alert" wayoPosition="left">
      {/*Three choices */}
      <div className="absolute top-[20%] right-[5%] z-30 flex flex-col gap-3">
        {choices.map((choice) => (
          <motion.button
            key={choice.id}
            className={`glass-panel px-5 py-4 text-left w-72 transition-all cursor-pointer
                        ${selected === choice.id ? 'ring-2 ring-white/60 scale-105' : ''}
                        ${selected && selected !== choice.id ? 'opacity-40' : ''}`}
            onClick={() => handleSelect(choice.id)}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + choices.indexOf(choice) * 0.2, duration: 0.5 }}
            whileHover={{ scale: selected ? 1 : 1.03 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{choice.icon}</span>
              <div>
                <div className="font-display text-sm font-semibold text-white/90">{choice.label}</div>
                <div className="text-xs text-white/40 font-body">{choice.desc}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <SpeechBubble show={showBubble} position="top-left">
        The construction zone ahead needs intervention.
        Wayo needs your help—what should the safety operator do?
      </SpeechBubble>
    </SceneShell>
  );
}