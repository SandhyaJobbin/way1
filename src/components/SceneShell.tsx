import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { Zone, WayoState } from '../types';
import { Wayo } from './Wayo';

// Assuming user will provide these backgrounds in src/assets
import bgAct1 from '../assets/bg-act1.png';
import bgZone1 from '../assets/bg-zone1.png';
import bgZone2 from '../assets/bg-zone2.png';

const zoneBackgrounds: Record<Zone, string> = {
  act1: bgAct1,
  lessonA: bgAct1,
  lessonB: bgAct1,
  lessonC: bgAct1,
  zone1: bgZone1,
  zone2: bgZone2,
  zone3: bgZone2,
  act4: bgAct1,
};

interface SceneShellProps {
  zone: Zone;
  children: ReactNode;
  showWayo?: boolean;
  wayoState?: WayoState;
  wayoPosition?: 'left' | 'center' | 'right';
  bgImage?: string;
}

export function SceneShell({ zone, children, showWayo = true, wayoState = 'idle', wayoPosition = 'left', bgImage }: SceneShellProps) {
  const bg = bgImage || zoneBackgrounds[zone];

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div className="relative w-full h-full">
        {children}
        {showWayo && <Wayo state={wayoState} position={wayoPosition} />}
      </div>
    </motion.div>
  );
}