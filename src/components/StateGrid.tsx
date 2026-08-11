import { useState } from 'react';
import { Search } from 'lucide-react';
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

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-semibold text-ink mb-2">State Driving Handbook</h2>
          <p className="text-ink/70 mb-6">Select a state to view specific AV regulations and driving context.</p>
          
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
