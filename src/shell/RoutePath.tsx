import { motion } from 'framer-motion';
import { useProgressStore } from '../store/progressStore';
import { Check } from 'lucide-react';

export function RoutePath() {
  const { checkpoints } = useProgressStore();
  
  if (checkpoints.length === 0) return null;

  const totalSegments = checkpoints.length - 1;
  const activeIndex = checkpoints.findIndex(c => c.status === 'active');
  const completeCount = checkpoints.filter(c => c.status === 'complete').length;
  
  let progress = 0;
  if (totalSegments > 0) {
    if (activeIndex >= 0) progress = activeIndex / totalSegments;
    else progress = completeCount / totalSegments;
  } else {
    progress = completeCount > 0 ? 1 : 0;
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:block h-[400px]">
      <div className="relative h-full flex flex-col items-center">
        {/* Background track */}
        <div className="absolute top-4 bottom-4 w-2 bg-ink/8 rounded-full" />
        
        {/* SVG Progress Track */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 32 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" />
              <stop offset="100%" stopColor="var(--color-accent-2)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 16 16 L 16 384"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        {/* Checkpoint nodes */}
        <div className="relative w-full h-full flex flex-col justify-between items-center py-4">
          {checkpoints.map((checkpoint) => (
            <div key={checkpoint.id} className="relative flex flex-col items-center group">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 relative z-10 ${
                  checkpoint.status === 'locked' ? 'bg-white border border-line' :
                  checkpoint.status === 'active' ? 'bg-white border-2 border-accent' :
                  'bg-accent-2'
                }`}
                aria-label={`Checkpoint: ${checkpoint.label} — ${checkpoint.status}`}
              >
                {checkpoint.status === 'complete' && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                {checkpoint.status === 'active' && (
                  <div className="absolute inset-[-4px] rounded-full border border-accent/30 animate-[pulse_2s_ease-in-out_infinite]" />
                )}
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-12 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-surface/90 px-3 py-1 rounded-sm shadow-sm backdrop-blur-sm">
                <span className="text-sm font-semibold text-ink">{checkpoint.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
