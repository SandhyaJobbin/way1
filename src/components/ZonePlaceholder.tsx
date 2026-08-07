import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router'

const variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.25, ease: 'easeIn' } },
}

const ZONE_META: Record<string, { role: string; description: string; color: string }> = {
  'zone-1': {
    role: 'MCPI Agent',
    description:
      'Monitor and respond to edge case incidents flagged by the autonomous system. Determine routing priority and initial context for Triage Ops.',
    color: '#3b82f6',
  },
  'zone-2': {
    role: 'Triage Ops',
    description:
      'Evaluate incoming incidents, classify severity, and route cases to the correct Annotator team with context-rich payloads.',
    color: '#8b5cf6',
  },
  'zone-3': {
    role: 'Annotators',
    description:
      'Process routed edge cases by labeling sensor data, creating ground truth datasets, and closing the feedback loop to improve the AV model.',
    color: '#10b981',
  },
}

// ZonePlaceholder — a placeholder route for each simulation zone.
//
// Displays the zone's :id parameter and role metadata as proof that hash-based
// dynamic routing is working correctly. Will be replaced with full zone simulations
// in Phase 2 and beyond.

export default function ZonePlaceholder() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const meta = id ? ZONE_META[id] : undefined

  return (
    <motion.div
      className="pointer-events-auto flex flex-col items-center justify-center w-full h-full gap-8 px-6"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <div
          className="px-3 py-1 rounded-full text-[11px] uppercase tracking-widest font-medium"
          style={{
            backgroundColor: meta ? `${meta.color}20` : '#ffffff10',
            color: meta ? meta.color : '#94a3b8',
          }}
        >
          {id ?? 'unknown'}
        </div>

        <h2 className="text-3xl font-bold text-white">
          {meta ? meta.role : 'Unknown Zone'}
        </h2>

        {meta && (
          <p className="text-slate-400 text-sm leading-relaxed">{meta.description}</p>
        )}

        <div className="mt-2 px-4 py-3 rounded-md bg-white/[0.04] border border-white/[0.08] text-left w-full">
          <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-1">
            Route Params
          </p>
          <code className="text-slate-300 text-sm font-mono">:id = &quot;{id}&quot;</code>
        </div>

        <p className="text-xs text-slate-600 italic mt-1">
          Zone simulation content coming in Phase 2.
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate('/')}
        className="text-sm text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-2"
        aria-label="Return to Ecosystem Hub"
      >
        &larr; Back to Hub
      </button>
    </motion.div>
  )
}
