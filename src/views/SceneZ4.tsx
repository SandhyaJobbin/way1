import { motion } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { SpeechBubble } from '../components/SpeechBubble';
import { useStore } from '../store/useStore';
import { SCORECARD_DIMENSIONS } from '../content/scenario-data';

export default function SceneZ4() {
  const quizScore = useStore((s) => s.quizScore);
  const zoneDecisionCorrect = useStore((s) => s.zoneDecisionCorrect);

  const getScore = (dimensionName: string) => {
    switch (dimensionName) {
      case 'Complex Decision-Making':
        return Math.max(1, Math.round((quizScore / 3) * 5));
      case 'Telemetry Interpretation':
      case 'Occlusion Reasoning':
        return zoneDecisionCorrect ? 5 : 3;
      default:
        return 4;
    }
  };

  return (
    <SceneShell zone="zone" guideState="happy" guidePosition="center">
      <motion.div
        className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[520px] max-w-[90vw] z-30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="glass-panel p-8">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl text-white/90">Technical Scorecard</h2>
            <div className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 text-xs font-data mt-3 border border-green-500/30">
              Foundation Level — Complete
            </div>
          </div>

          <div className="space-y-4 mb-10">
            {SCORECARD_DIMENSIONS.map((dim, i) => {
              const score = getScore(dim.name);
              return (
                <motion.div 
                  key={dim.name}
                  className="flex items-center justify-between border-b border-white/5 pb-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <span className="font-body text-white/80">{dim.name}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= score ? 'text-amber-400' : 'text-white/20'}>
                        ★
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <button className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 cursor-not-allowed font-display">
              Continue to Proficient (Locked)
            </button>
          </div>
        </div>
      </motion.div>

      <SpeechBubble show={true} position="above-wayo">
        {zoneDecisionCorrect
          ? "Excellent triage work! Your sensor analysis and decision-making are at Foundation level. Ready for Proficient challenges?"
          : "Good attempt — review the telemetry patterns. Every correct triage builds your AV operator instincts."}
      </SpeechBubble>
    </SceneShell>
  );
}
