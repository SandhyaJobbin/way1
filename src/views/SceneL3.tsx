import { motion, AnimatePresence } from 'framer-motion';
import { SceneShell } from '../components/SceneShell';
import { SpeechBubble } from '../components/SpeechBubble';
import { ContinueArrow } from '../components/ContinueArrow';
import { useStore } from '../store/useStore';
import { LESSON_QUIZ } from '../content/scenario-data';
import { useState } from 'react';

export default function SceneL3() {
  const nextScene = useStore((s) => s.nextScene);
  const setQuizScore = useStore((s) => s.setQuizScore);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizDone, setQuizDone] = useState(false);

  const question = LESSON_QUIZ[qIndex];

  const handleAnswer = (index: number) => {
    if (selected !== null) return; // prevent multiple clicks
    setSelected(index);
    
    const isCorrect = index === question.answerIndex;
    if (isCorrect) setScore((s) => s + 1);
    
    setShowResult(true);
    
    setTimeout(() => {
      if (qIndex < LESSON_QUIZ.length - 1) {
        setQIndex((i) => i + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setQuizScore(score + (isCorrect ? 1 : 0));
        setQuizDone(true);
      }
    }, 1500);
  };

  return (
    <SceneShell zone="lesson" guideState={quizDone ? (score >= 2 ? 'happy' : 'concerned') : 'thinking'} guidePosition="center">
      <AnimatePresence mode="wait">
        {!quizDone ? (
          <motion.div
            key={qIndex}
            className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[460px] max-w-[90vw] z-30"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            <div className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-xs text-white/40 font-data">Question {qIndex + 1}/{LESSON_QUIZ.length}</div>
                <div className="flex-1 h-px bg-white/10" />
                <div className="flex gap-1">
                  {LESSON_QUIZ.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < qIndex ? 'bg-sky-400/60' : i === qIndex ? 'bg-white/60' : 'bg-white/15'}`} />
                  ))}
                </div>
              </div>
              <div className="font-display text-lg text-white/90 mb-6 leading-relaxed">{question.question}</div>

              <div className="space-y-3">
                {question.options.map((opt, i) => {
                  let bgColor = 'bg-white/5';
                  let borderColor = 'border-white/10';

                  if (showResult) {
                    if (i === question.answerIndex) {
                      bgColor = 'bg-emerald-500/20';
                      borderColor = 'border-emerald-500/50';
                    } else if (i === selected) {
                      bgColor = 'bg-red-500/20';
                      borderColor = 'border-red-500/50';
                    }
                  } else if (selected === i) {
                    bgColor = 'bg-white/15';
                  }

                  return (
                    <motion.button
                      key={i}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-colors cursor-pointer ${bgColor} ${borderColor}`}
                      onClick={() => handleAnswer(i)}
                      whileHover={{ scale: selected === null ? 1.02 : 1 }}
                      whileTap={{ scale: selected === null ? 0.98 : 1 }}
                    >
                      <span className="font-body text-sm text-white/80">{opt}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            className="absolute top-[20%] left-1/2 -translate-x-1/2 w-80 z-30 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="glass-panel p-8">
              <h2 className="font-display text-2xl text-white/90 mb-2">Quick Check Complete</h2>
              <div className="text-3xl text-white/70 font-data my-4">{score} / {LESSON_QUIZ.length}</div>
              <div className="text-xs text-white/40 font-body">
                {score >= 2 ? 'Great instinct. Ready for the zone.' : 'The zone will sharpen this. Let\'s go.'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SpeechBubble show={!quizDone} position="above-wayo">
        Let's quickly check your intuition on US driving norms.
      </SpeechBubble>

      {quizDone && <ContinueArrow onClick={nextScene} label="Enter the Zone" />}
    </SceneShell>
  );
}
