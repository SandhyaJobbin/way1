import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { GuideState } from '../types';

const ringColors: Record<GuideState, string> = {
  idle: 'from-sky-400 via-cyan-300 to-sky-500',
  curious: 'from-amber-300 via-yellow-200 to-amber-400',
  thinking: 'from-amber-400 via-orange-300 to-amber-500',
  concerned: 'from-orange-400 via-red-300 to-orange-500',
  alert: 'from-red-500 via-orange-400 to-red-600',
  happy: 'from-green-400 via-emerald-300 to-green-500',
};

const glowShadows: Record<GuideState, string> = {
  idle: '0 0 20px rgba(56, 189, 248, 0.4), 0 0 60px rgba(56, 189, 248, 0.15)',
  curious: '0 0 20px rgba(251, 191, 36, 0.4), 0 0 60px rgba(251, 191, 36, 0.15)',
  thinking: '0 0 20px rgba(251, 191, 36, 0.4), 0 0 60px rgba(251, 191, 36, 0.15)',
  concerned: '0 0 20px rgba(249, 115, 22, 0.4), 0 0 60px rgba(249, 115, 22, 0.15)',
  alert: '0 0 24px rgba(239, 68, 68, 0.5), 0 0 80px rgba(239, 68, 68, 0.2)',
  happy: '0 0 20px rgba(74, 222, 128, 0.4), 0 0 60px rgba(74, 222, 128, 0.15)',
};

interface GlowRingProps {
  state: GuideState;
  size: number;
  children: ReactNode;
}

export function GlowRing({ state, size, children }: GlowRingProps) {
  const borderWidth = 3;
  const outerSize = size + borderWidth * 2 + 8;

  return (
    <div className="relative" style={{ width: outerSize, height: outerSize }}>
      {/* Glow aura behind ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: glowShadows[state],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          boxShadow: { duration: 0.6 },
        }}
      />

      {/* Rotating conic gradient border */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${ringColors[state].includes('sky') ? 'rgba(56,189,248,0.8)' : ringColors[state].includes('amber') || ringColors[state].includes('yellow') ? 'rgba(251,191,36,0.8)' : ringColors[state].includes('red') || ringColors[state].includes('orange') ? 'rgba(239,68,68,0.8)' : 'rgba(74,222,128,0.8)'}, transparent)`,
          padding: borderWidth,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Inner content (the video/image) */}
      <div
        className="absolute rounded-full overflow-hidden flex items-center justify-center"
        style={{
          top: borderWidth + 4,
          left: borderWidth + 4,
          width: size,
          height: size,
        }}
      >
        {children}
      </div>
    </div>
  );
}
