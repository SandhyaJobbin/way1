import { Routes, Route, Navigate, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { LessonSurface } from './shell/surfaces/LessonSurface';
import { Zone } from './components/zone/Zone';

export function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, y: -16, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } }}
        className="min-h-screen"
      >
        <Routes location={location}>
          <Route path="/lesson" element={<LessonSurface />} />
          <Route path="/zone" element={<Zone />} />
          <Route path="*" element={<Navigate to="/lesson" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}