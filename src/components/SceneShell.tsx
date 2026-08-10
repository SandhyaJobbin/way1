import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { Zone, GuideState } from '../types';
import { AIGuide } from './AIGuide';

// Assuming user will provide these backgrounds in src/assets
import bgAct1 from '../assets/bg-act1.png';
import bgZone1 from '../assets/bg-zone1.png';

const zoneBackgrounds: Record<Zone, string> = {
  lesson: bgAct1,
  zone: bgZone1,
};

interface SceneShellProps {
  zone: Zone;
  children: ReactNode;
  showGuide?: boolean;
  guideState?: GuideState;
  guidePosition?: 'left' | 'center' | 'right';
  bgImage?: string;
}

export function SceneShell({ zone, children, showGuide = true, guideState = 'idle', guidePosition = 'center', bgImage }: SceneShellProps) {
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
        {showGuide && <AIGuide state={guideState} position={guidePosition} />}
      </div>
    </motion.div>
  );
}