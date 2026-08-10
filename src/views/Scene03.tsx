import { motion } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { SpeechBubble } from '../components/SpeechBubble';
import { ContinueArrow } from '../components/ContinueArrow';
import { useStore } from '../store/useStore';
import { ACT1_NARRATIVE } from '../content/scenario-data';
import { useEffect, useState } from 'react';
import type { WayoState } from '../types';

const pipeline = ['Sense', 'Perceive', 'Predict', 'Plan', 'Act'];
const [line2, line3, line4] = ACT1_NARRATIVE.slice(2);

export default function Scene03() {
  const nextScene = useStore((s) => s.nextScene);
  const setWayoState = useStore((s) => s.setWayoState);
  const [wayoState, setWayoStateLocal] = useState<WayoState>(line2.wayoState);
  const [speechIndex, setSpeechIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [confidence, setConfidence] = useState(0);

  const speechLines = [line2.text, line3.text, line4.text];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Set initial wayo state
    timers.push(setTimeout(() => {
      setWayoStateLocal(line2.wayoState);
      setWayoState(line2.wayoState);
    }, 200));

    // Animate pipeline steps
    pipeline.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveStep(i), 1500 + i * 800));
    });

    // Speech progression
    timers.push(setTimeout(() => {
      setSpeechIndex(1);
      setWayoStateLocal(line3.wayoState);
      setWayoState(line3.wayoState);
    }, 4000));

    timers.push(setTimeout(() => {
      setSpeechIndex(2);
      setWayoStateLocal(line4.wayoState);
      setWayoState(line4.wayoState);
    }, 8000));

    // Confidence drop
    timers.push(setTimeout(() => {
      setWayoStateLocal(line3.wayoState);
      setWayoState(line3.wayoState);
    }, 6000));

    timers.push(setTimeout(() => {
      const interval = setInterval(() => {
        setConfidence((c) => Math.min(c + 0.02, 0.17));
      }, 50);
      return () => clearInterval(interval);
    }, 2000));

    return () => timers.forEach(clearTimeout);
  }, [setWayoState]);

  return (
    <SceneShell zone="act1" wayoState={wayoState} wayoPosition="left">
      {/* Pipeline visualization */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center gap-3 md:gap-4">
          {pipeline.map((step, i) => (
            <motion.div
              key={step}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: i <= activeStep ? 1 : 0.3,
                y: 0,
                scale: i === activeStep ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              <div
                className={`glass-panel px-4 py-2 ${i === activeStep ? 'border-white/40' : ''}`}
                style={{
                  boxShadow: i === activeStep ? '0 0 20px rgba(232, 213, 183, 0.3)' : 'none',
                }}
              >
                <span className="font-display text-sm font-semibold text-white/90">{step}</span>
              </div>
              {i < pipeline.length - 1 && (
                <motion.div
                  className="text-white/30 text-sm"
                  animate={{ opacity: i < activeStep ? 0.6 : 0.15 }}
                >
                  →
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Confidence ring */}
      <motion.div
        className="absolute top-[35%] left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: activeStep >= 2 ? 1 : 0 }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
              <circle
                cx="40" cy="40" r="36" fill="none"
                stroke="var(--c-headlight-concerned)" strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 36}`}
                strokeDashoffset={`${2 * Math.PI * 36 * (1 - confidence)}`}
                style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-data text-xs text-white/70">{(confidence * 100).toFixed(0)}%</span>
            </div>
          </div>
          <span className="font-data text-xs text-white/40">confidence</span>
        </div>
      </motion.div>

      <SpeechBubble show={true} position="bottom-left" key={speechIndex}>
        {speechLines[speechIndex]}
      </SpeechBubble>

      <ContinueArrow onClick={nextScene} label="Enter Zone 1" />
    </SceneShell>
  );
}
