import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router'

// ShellLayout — the root container for all animated route views.
//
// Design decisions:
// - `position: relative` with 100% w/h ensures this container fills the viewport
//   and serves as the stacking context for future DOM overlays and the R3F canvas.
// - `AnimatePresence mode="wait"` ensures outgoing routes complete their exit
//   animation before incoming routes begin mounting — prevents DOM overlap and
//   visual "flash" that would occur with default concurrent mode.
// - `location.key` is used as the AnimatePresence key so every navigation creates
//   a fresh animation cycle, even navigating to the same path.

export default function ShellLayout() {
  const location = useLocation()

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0a0a0f' }}
    >
      {/*
        Future: R3F Canvas mount point will be positioned absolutely here,
        behind the DOM overlay layer below.
      */}

      {/* DOM Overlay Layer — sits above the 3D canvas */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Route content with pointer-events restored inline on route components */}
        <AnimatePresence mode="wait">
          <Outlet key={location.key} />
        </AnimatePresence>
      </div>
    </div>
  )
}
