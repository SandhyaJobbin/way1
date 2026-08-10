import { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';
import type { GuideState } from '../types';
import { GlowRing } from './GlowRing';
import wayoIdle from '../assets/wayo-idle.png';
import wayoCurious from '../assets/wayo-curious.png';
import wayoThinking from '../assets/wayo-thinking.png';
import wayoConcerned from '../assets/wayo-concerned.png';
import wayoAlert from '../assets/wayo-alert.png';
import wayoHappy from '../assets/wayo-happy.png';
import introVid from '../assets/Intro.mp4';
import warmVid from '../assets/Warming-up.mp4';
import alertVid from '../assets/Alert.mp4';
import happyVid from '../assets/Happy.mp4';

const mediaSources: Record<GuideState, { video: string; poster: string }> = {
  idle: { video: introVid, poster: wayoIdle },
  curious: { video: warmVid, poster: wayoCurious },
  thinking: { video: warmVid, poster: wayoThinking },
  concerned: { video: alertVid, poster: wayoConcerned },
  alert: { video: alertVid, poster: wayoAlert },
  happy: { video: happyVid, poster: wayoHappy },
};

const springConfig = { stiffness: 80, damping: 12 };

const bodyVariants: Record<GuideState, TargetAndTransition> = {
  idle: {
    y: [0, -8, 0],
    rotate: [0, 0.5, 0],
    transition: {
      y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
      rotate: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
    },
  },
  concerned: {
    scale: [1, 1.02, 1],
    rotate: [0, -1, 0.5, 0],
    transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
  },
  curious: {
    rotate: [0, 2, -1, 2, 0],
    transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
  },
  thinking: {
    y: [0, -5, 0],
    rotate: [0, 1, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
  alert: {
    y: [0, -12, 0],
    rotate: [0, -2, 0],
    transition: {
      y: { duration: 0.4, repeat: Infinity, ease: 'easeOut' },
      rotate: { duration: 0.5, repeat: Infinity },
    },
  },
  happy: {
    y: [0, -10, 0, -12, 0],
    rotate: [0, 1, -1, 1, 0],
    transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
  },
};

interface GuideProps {
  state: GuideState;
  size?: number;
  position?: 'left' | 'center' | 'right';
  animate?: boolean;
}

export function AIGuide({ state, size = 260, position = 'center', animate = true }: GuideProps) {
  const media = mediaSources[state];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [-6, 6]);
  const parallaxY = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [-4, 4]);
  const parallaxRotate = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [-2, 2]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  const positionClasses = {
    left: 'left-[6%]',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-[6%]',
  };

  return (
    <motion.div
      className={`absolute bottom-[4%] ${positionClasses[position]} z-20`}
      initial={animate ? { y: 60, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 60, opacity: 0 }}
      transition={animate ? springConfig : { duration: 0 }}
      key={state}
    >
      <motion.div
        animate={bodyVariants[state] ?? bodyVariants.idle}
        style={{ x: parallaxX, y: parallaxY, rotate: parallaxRotate }}
      >
        <GlowRing state={state} size={size}>
          <video
            src={media.video}
            poster={media.poster}
            autoPlay
            loop
            muted
            playsInline
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            className="bg-transparent mix-blend-screen"
          />
        </GlowRing>
      </motion.div>
    </motion.div>
  );
}
