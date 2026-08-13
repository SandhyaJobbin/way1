import { useState } from 'react';
import { Search, BookOpen, Shield, MapPin, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { StateSchema } from '../content/schemas';
import { states } from '../content';
import { StatePolicyModal } from './StatePolicyModal';

type StateData = z.infer<typeof StateSchema>;

export function StateGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<StateData | null>(null);

  const filteredStates = states.filter(
    s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deepStates = states.filter(s => s.type === 'deep').length;

  return (
    <div className="w-full">
      {/* ─── StateBook Hero Card ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 bg-white border border-line rounded-2xl shadow-md overflow-hidden"
      >
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold text-ink leading-tight">
                    StateBook
                  </h2>
                  <p className="text-sm font-semibold text-primary uppercase tracking-widest">
                    AV Driving Policy Handbook
                  </p>
                </div>
              </div>
              <p className="text-ink/70 text-lg leading-relaxed mb-6 max-w-2xl">
                Your comprehensive guide to state-by-state autonomous vehicle regulations, 
                driving quirks, and hazard perception contexts. Master the rules before 
                entering the simulator.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-ink/60">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>{deepStates} states with full AV context & rules</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-ink/60">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>State-specific hazard scenarios</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-ink/60">
                  <Zap className="w-4 h-4 text-primary" />
                  <span>Real-world AV operational guidance</span>
                </div>
              </div>
              <p className="text-sm text-ink/50 flex items-center gap-1">
                <span className="font-medium text-ink/70">Requirement:</span> Select a state below to review its handbook and unlock the Zone simulator.
              </p>
            </div>
            <div className="hidden md:block w-64 h-64 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-2/5 rounded-xl" />
              <img
                src="/wayo-idle.png"
                alt="Wayo reviewing StateBook"
                className="relative w-full h-full object-contain opacity-80"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Search & Grid ─── */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="text-xl font-display font-semibold text-ink mb-2">Select a State</h3>
          <p className="text-ink/70 mb-4">Choose a state to view its specific AV regulations and driving context.</p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
            <input
              type="text"
              placeholder="Search by state name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-pill border border-line bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-ink"
            />
          </div>
        </div>
        <a
          href="/handbook.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-pill bg-primary text-white font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 whitespace-nowrap self-start md:self-auto"
        >
          Review Full PDF
        </a>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {filteredStates.map((state) => (
          <button
            key={state.id}
            onClick={() => setSelectedState(state)}
            className={`
              flex flex-col items-center justify-center p-4 rounded-xl border transition-all
              ${state.type === 'deep' 
                ? 'bg-white border-primary/20 hover:border-primary hover:shadow-md cursor-pointer' 
                : 'bg-ink/5 border-transparent opacity-70 hover:opacity-100 cursor-pointer'
              }
            `}
          >
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg mb-2
              ${state.type === 'deep' ? 'bg-primary/10 text-primary' : 'bg-ink/10 text-ink/60'}
            `}>
              {state.code}
            </div>
            <span className="text-xs font-semibold text-ink/80 text-center truncate w-full">
              {state.name}
            </span>
            {state.type === 'stub' && (
              <span className="text-[10px] text-ink/40 uppercase tracking-widest mt-1">
                Coming Soon
              </span>
            )}
          </button>
        ))}
      </div>

      <StatePolicyModal
        stateData={selectedState}
        onClose={() => setSelectedState(null)}
      />
    </div>
  );
}
