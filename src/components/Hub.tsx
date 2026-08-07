import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

// Placeholder zone data — will be replaced by Zod-validated JSON config in Phase 2
const ZONES = [
  { id: 'zone-1', label: 'Zone 1', role: 'MCPI Agent', color: '#3b82f6' },
  { id: 'zone-2', label: 'Zone 2', role: 'Triage Ops', color: '#8b5cf6' },
  { id: 'zone-3', label: 'Zone 3', role: 'Annotators', color: '#10b981' },
]

// Hub — the ecosystem overview screen.
//
// This is the primary navigation nexus showing the three operator roles
// and their relationship in the Waymo AV ecosystem. Clicking a zone card
// navigates to the zone's simulation placeholder.

export default function Hub() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="pointer-events-auto flex flex-col items-center justify-center w-full h-full gap-10 px-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div className="flex flex-col items-center gap-2 text-center" variants={itemVariants}>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium">
          Ecosystem Map
        </p>
        <h2 className="text-3xl font-bold text-white">
          Waymo AV Operations Hub
        </h2>
        <p className="text-slate-400 text-sm max-w-md leading-relaxed">
          Select a role zone below to begin its simulation chapter.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl"
        variants={containerVariants}
      >
        {ZONES.map((zone) => (
          <motion.button
            key={zone.id}
            type="button"
            onClick={() => navigate(`/zone/${zone.id}`)}
            className="group relative flex flex-col items-start gap-3 p-6 bg-white/[0.04] border border-white/[0.08] rounded-lg text-left transition-all duration-200 hover:bg-white/[0.07] hover:border-white/[0.15] active:scale-[0.98]"
            variants={itemVariants}
            aria-label={`Enter ${zone.role} simulation`}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: zone.color }}
              aria-hidden="true"
            />
            <div>
              <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-1">
                {zone.label}
              </p>
              <p className="text-white font-semibold text-lg">{zone.role}</p>
            </div>
            <span
              className="absolute bottom-4 right-4 text-slate-600 text-xs transition-colors group-hover:text-slate-400"
              aria-hidden="true"
            >
              Enter &rarr;
            </span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  )
}
