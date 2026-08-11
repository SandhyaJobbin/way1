import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, AlertTriangle, ShieldCheck, FileText } from 'lucide-react';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { StateSchema } from '../content/schemas';
import { useProgressStore } from '../store/progressStore';

type StateData = z.infer<typeof StateSchema>;

interface StatePolicyModalProps {
  stateData: StateData | null;
  onClose: () => void;
}

export function StatePolicyModal({ stateData, onClose }: StatePolicyModalProps) {
  const navigate = useNavigate();
  const { setCheckpoint } = useProgressStore();

  if (!stateData) return null;

  const handleProceed = () => {
    setCheckpoint('lesson', 'complete');
    setCheckpoint('zone', 'active');
    navigate('/zone');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-8 border-b border-line bg-surface">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/50 hover:bg-white flex items-center justify-center transition-colors border border-line"
            >
              <X className="w-5 h-5 text-ink/60" />
            </button>
            
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center font-display font-bold text-2xl text-white">
                {stateData.code}
              </div>
              <div>
                <h2 className="text-3xl font-display font-semibold text-ink leading-tight">
                  {stateData.name}
                </h2>
                <div className="text-sm font-semibold text-primary uppercase tracking-widest">
                  Driving Policy Handbook
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto">
            {stateData.type === 'deep' ? (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-ink flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-accent-secondary" />
                    State Rules & Quirks
                  </h3>
                  <ul className="space-y-3">
                    {stateData.rules?.map((rule, i) => (
                      <li key={i} className="flex gap-3 text-ink/80 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary mt-2 shrink-0" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                  <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5" />
                    AV Context
                  </h3>
                  <p className="text-ink/90 text-sm leading-relaxed mb-4">
                    {stateData.avContext}
                  </p>
                  {stateData.handbookUrl && (
                    <a
                      href={stateData.handbookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-primary/20 text-primary font-medium hover:bg-primary/5 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Read Official State Handbook
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-ink/5 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8 text-ink/20" />
                </div>
                <h3 className="text-xl font-semibold text-ink mb-2">Module Coming Soon</h3>
                <p className="text-ink/60 max-w-sm">
                  Deep AV context and driving policy for {stateData.name} is currently in development and will be available in a future update.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-line bg-surface flex justify-end">
            {stateData.type === 'deep' ? (
              <button
                onClick={handleProceed}
                className="flex items-center gap-2 px-8 py-4 rounded-pill bg-primary text-white font-semibold hover:bg-primary/90 hover:shadow-lg transition-all"
              >
                Proceed to Simulator
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-pill border border-line font-semibold text-ink hover:bg-ink/5 transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
