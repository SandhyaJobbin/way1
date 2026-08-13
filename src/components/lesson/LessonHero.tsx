import { motion } from 'framer-motion';
import { WayoAvatar } from '../../components/WayoAvatar';

export function LessonHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <div className="flex items-center gap-6">
        <WayoAvatar emotion="curious" size={96} />
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
            Autonomous Vehicle Foundations
          </span>
          <h1 className="text-3xl font-display font-bold text-slate-900 mt-2">
            State AV Rules &amp; Hazard Training
          </h1>
          <p className="text-slate-600 mt-1 text-sm">
            Master California and Arizona state policies before taking the Zone
            simulator challenge.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 min-w-[200px]">
        <div className="text-right">
          <div className="text-xs text-slate-500 font-medium">
            Estimated Time
          </div>
          <div className="text-lg font-bold text-slate-900">15 Mins</div>
        </div>
        <div className="h-8 w-px bg-slate-200" />
        <div>
          <div className="text-xs text-slate-500 font-medium">Modules</div>
          <div className="text-lg font-bold text-accent">3 / 3</div>
        </div>
      </div>
    </motion.div>
  );
}
