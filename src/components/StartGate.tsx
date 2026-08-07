import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

// Framer Motion variants — gentle fade-in for the start gate,
// fast fade-out to respect the user's intent to enter the simulation.
const variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 1.02, transition: { duration: 0.3, ease: 'easeIn' } },
}

// StartGate — the splash entry screen.
//
// Purpose: Capture a valid DOM user interaction before routing into the main Hub.
// This is critical for browser autoplay policies — video and audio can only
// begin after a genuine user gesture. Clicking this button satisfies that requirement.
//
// SCORM note: In a future iteration, the SCORM initialization call (scorm.init())
// will live here so it fires on user intent, not on module load.

export default function StartGate() {
  const navigate = useNavigate()

  const handleEnter = () => {
    // Future: initialize SCORM connection here before navigating
    // scorm.init()
    navigate('/')
  }

  return (
    <motion.div
      className="pointer-events-auto flex items-center justify-center w-full h-full"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex flex-col items-center gap-8 text-center px-4">
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium">
            Waymo Operations Training
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Lifecycle Module
          </h1>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
            An interactive investigation into how MCPI Agents, Triage Ops,
            and Annotators collaborate to handle edge cases and improve the system.
          </p>
        </div>

        <button
          type="button"
          onClick={handleEnter}
          className="group relative px-8 py-4 bg-white text-black font-semibold text-sm tracking-widest uppercase rounded-sm transition-all duration-200 hover:bg-slate-100 active:scale-[0.98]"
          aria-label="Enter the simulation"
        >
          <span>Enter Simulation</span>
          <span
            className="absolute inset-0 rounded-sm ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-200"
            aria-hidden="true"
          />
        </button>

        <p className="text-[11px] text-slate-600 max-w-xs">
          Estimated time: 25 minutes &middot; Headphones recommended
        </p>
      </div>
    </motion.div>
  )
}
