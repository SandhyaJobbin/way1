import { motion } from 'framer-motion';

export type DotState = 'locked' | 'visited' | 'complete' | 'current';

export interface TimelineItem {
  id: string;
  label: string;
  state: DotState;
}

export interface DotTimelineProps {
  items: TimelineItem[];
  onSelect?: (id: string) => void;
}

export function DotTimeline({ items, onSelect }: DotTimelineProps) {
  return (
    <div className="relative flex items-center h-[120px]" role="tablist">
      {/* Background track */}
      <div className="absolute left-0 right-0 h-[2px] bg-ink/12 top-1/2 -translate-y-1/2" />
      
      {/* Progress track */}
      <div className="absolute left-0 h-[2px] bg-gradient-to-r from-accent to-accent-2 top-1/2 -translate-y-1/2" style={{
         width: items.length > 1 ? `${(items.findIndex(i => i.state === 'current') / (items.length - 1)) * 100}%` : '0%'
      }} />

      <div className="relative w-full flex justify-between">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={item.state === 'current'}
            aria-label={`${item.label} — ${item.state}`}
            className="relative group focus-visible:outline-none"
            onClick={() => onSelect?.(item.id)}
            disabled={item.state === 'locked'}
          >
            {/* Hit area */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44px] h-[44px]" />
            
            {/* The Dot */}
            <motion.div
              layout
              className={`relative z-10 rounded-full transition-colors duration-150 group-hover:scale-115 group-active:scale-97 group-focus-visible:ring-2 group-focus-visible:ring-focus group-focus-visible:ring-offset-2 flex items-center justify-center ${
                item.state === 'locked' ? 'w-3 h-3 bg-ink/12' :
                item.state === 'current' ? 'w-4 h-4 bg-white border-2 border-accent' :
                'w-3 h-3 bg-accent-2'
              }`}
            >
              {item.state === 'current' && (
                <div className="absolute inset-0 rounded-full bg-accent/15 scale-[2.5]" />
              )}
            </motion.div>
            
            {/* Label */}
            <div className="absolute top-[24px] left-1/2 origin-top-left -rotate-45 lg:rotate-0 lg:-translate-x-1/2 mt-2 whitespace-nowrap lg:max-w-[120px] lg:overflow-hidden lg:text-ellipsis">
              <span className={`text-sm font-semibold ${item.state === 'current' ? 'text-ink' : 'text-ink/60'}`}>
                {item.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
