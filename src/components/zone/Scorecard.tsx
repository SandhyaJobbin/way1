import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSimulatorStore } from '../../lib/simulatorStore';
import {
  calculateScore,
  reportScoreToSCORM,
  type FinalScore,
} from '../../lib/scoring';
import { scenarios } from '../../content';
import {
  Target,
  Timer,
  AlertTriangle,
  Shield,
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
} from 'lucide-react';
import { WayoAvatar } from '../WayoAvatar';

/* ─── Circular Score Gauge ─── */
const ScoreGauge: React.FC<{ score: number; size?: number }> = ({
  score,
  size = 160,
}) => {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const strokeColor = score >= 70 ? '#22C55E' : score >= 40 ? '#F59E0B' : '#EF4444';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={10}
        />
        {/* Score arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-slate-900">{score}</span>
        <span className="text-xs text-slate-400 font-medium">/ 100</span>
      </div>
    </div>
  );
};

/* ─── Stat Metric Card ─── */
const StatCard: React.FC<{
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accentColor: string;
}> = ({ label, value, icon, accentColor }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow min-w-0">
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${accentColor} flex-shrink-0`}
    >
      {icon}
    </div>
    <div className="text-2xl font-bold text-slate-900 mb-1 truncate w-full">{value}</div>
    <div className="text-xs text-slate-400 font-medium truncate w-full">{label}</div>
  </div>
);

/* ─── Animated Category Bar ─── */
const CategoryBar: React.FC<{
  label: string;
  value: number;
  delay: number;
}> = ({ label, value, delay }) => {
  const barColor =
    value >= 80
      ? 'bg-emerald-500'
      : value >= 60
        ? 'bg-[#4285F4]'
        : value >= 40
          ? 'bg-amber-500'
          : 'bg-red-500';

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-slate-600 font-medium">{label}</span>
        <span className="font-bold text-slate-900">{value}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

/* ─── Main Scorecard ─── */
export const Scorecard: React.FC = () => {
  const { activeRun, resetRun } = useSimulatorStore();
  const [score, setScore] = useState<FinalScore | null>(null);

  useEffect(() => {
    if (activeRun.completed) {
      const scenario = scenarios.length > 0 ? scenarios[0] : null;
      if (!scenario) return;

      const results = {
        hazards: scenario.hazards.map((h) => {
          const found = activeRun.hazards.find(
            (ah) => ah.hazardId === h.hazardId
          );
          return {
            hazardId: h.hazardId,
            category: h.category,
            detected: !!found,
            reactionMs: found ? found.reactionMs : null,
            points: h.points,
          };
        }),
        falseClicks: activeRun.falseClicks,
      };

      const final = calculateScore(results);
      setScore(final);
      reportScoreToSCORM(final.compositeScore, final.passed);
    }
  }, [activeRun.completed, activeRun.hazards, activeRun.falseClicks]);

  if (!activeRun.completed || !score) return null;

  const accuracy =
    score.totalHazards > 0
      ? Math.round((score.totalSpotted / score.totalHazards) * 100)
      : 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-500/30 backdrop-blur-sm p-4 md:p-8 overflow-y-auto">
      <motion.div
        className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ─── Header: Gauge + Badge ─── */}
        <div className="p-8 md:p-10 flex flex-col items-center gap-4 border-b border-slate-100">
          {/* Wayo reacts to pass/fail */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {score.passed ? (
              <WayoAvatar emotion="happy" size={80} animate={true} />
            ) : (
              <WayoAvatar emotion="concerned" size={80} />
            )}
          </motion.div>

          <ScoreGauge score={score.compositeScore} />

          {/* Pass/Fail Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase ${
              score.passed
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {score.passed ? (
              <CheckCircle size={18} />
            ) : (
              <XCircle size={18} />
            )}
            {score.passed ? 'Challenge Passed' : 'Challenge Failed'}
          </motion.div>
        </div>

        {/* ─── Stat Cards Row ─── */}
        <div className="px-8 md:px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Hazards Spotted"
            value={`${score.totalSpotted}/${score.totalHazards}`}
            icon={<Shield size={20} className="text-[#4285F4]" />}
            accentColor="bg-[#4285F4]/10"
          />
          <StatCard
            label="Reaction Time"
            value={`${score.medianReactionMs}ms`}
            icon={<Timer size={20} className="text-amber-500" />}
            accentColor="bg-amber-500/10"
          />
          <StatCard
            label="False Clicks"
            value={score.falseClicks}
            icon={<AlertTriangle size={20} className="text-red-500" />}
            accentColor="bg-red-500/10"
          />
          <StatCard
            label="Accuracy"
            value={`${accuracy}%`}
            icon={<Target size={20} className="text-emerald-500" />}
            accentColor="bg-emerald-500/10"
          />
        </div>

        {/* ─── Category Bars ─── */}
        <div className="px-8 md:px-10 pb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-5">
              Technical Assessment
            </h3>
            <CategoryBar
              label="Driving & State Knowledge"
              value={score.categories.drivingAndStateKnowledge}
              delay={0.3}
            />
            <CategoryBar
              label="Intent Prediction"
              value={score.categories.intentPrediction}
              delay={0.45}
            />
            <CategoryBar
              label="Spatial / Occlusion Reasoning"
              value={score.categories.spatialOcclusionReasoning}
              delay={0.6}
            />
            <CategoryBar
              label="Risk Recognition"
              value={score.categories.riskRecognition}
              delay={0.75}
            />
            <CategoryBar
              label="Complex Decision-Making"
              value={score.categories.complexDecisionMaking}
              delay={0.9}
            />
          </div>
        </div>

        {/* ─── Footer Buttons ─── */}
        <div className="px-8 md:px-10 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
          <button
            onClick={resetRun}
            className="px-6 py-3 rounded-pill border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-colors text-sm flex items-center gap-2 shadow-sm"
          >
            <RotateCcw size={16} />
            Retry Challenge
          </button>
          <button className="px-6 py-3 rounded-pill bg-[#4285F4] text-white font-semibold hover:bg-[#3367D6] transition-colors text-sm shadow-lg shadow-[#4285F4]/20 flex items-center gap-2">
            <Trophy size={16} />
            Review Mistakes
          </button>
        </div>
      </motion.div>
    </div>
  );
};
