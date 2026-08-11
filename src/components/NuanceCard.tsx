import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { z } from 'zod';
import { NuanceSchema } from '../content/schemas';

type Nuance = z.infer<typeof NuanceSchema>;

interface NuanceCardProps {
  nuance: Nuance;
}

export function NuanceCard({ nuance }: NuanceCardProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-line overflow-hidden mb-6">
      {/* Video Placeholder Area */}
      <div className="relative w-full h-48 bg-ink/5 flex items-center justify-center border-b border-line group cursor-pointer overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
        <PlayCircle className="w-12 h-12 text-ink/40 group-hover:text-primary transition-colors z-10" strokeWidth={1} />
        <div className="absolute bottom-4 left-4 z-10 text-xs font-semibold text-ink/60 uppercase tracking-widest">
          {nuance.videoSlot}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-display font-semibold text-ink mb-4">{nuance.title}</h3>
        
        <div className="space-y-4">
          <div className="bg-ink/5 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-ink/60 uppercase tracking-wider mb-2">Human Driver</h4>
            <p className="text-ink/90 leading-relaxed text-sm">{nuance.humanBehavior}</p>
          </div>

          <AnimatePresence initial={false} mode="wait">
            {!revealed ? (
              <motion.button
                key="reveal-button"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onClick={() => setRevealed(true)}
                className="w-full py-4 border-2 border-dashed border-primary/30 rounded-lg text-primary font-semibold hover:bg-primary/5 hover:border-primary/50 transition-colors"
              >
                Reveal AV Handling
              </motion.button>
            ) : (
              <motion.div
                key="av-handling"
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                className="bg-primary/10 p-4 rounded-lg border border-primary/20"
              >
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">AV Platform</h4>
                <p className="text-ink leading-relaxed text-sm">{nuance.avHandling}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
