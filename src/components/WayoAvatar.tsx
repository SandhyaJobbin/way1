import { motion } from 'framer-motion';

export type WayoEmotion = 'idle' | 'curious' | 'thinking' | 'alert' | 'happy' | 'concerned';

interface WayoAvatarProps {
  emotion: WayoEmotion;
  size?: number;
  className?: string;
  animate?: boolean;
}

const EMOTION_ASSETS: Record<WayoEmotion, { static: string; animated?: string }> = {
  idle:      { static: '/wayo-idle.png' },
  curious:   { static: '/wayo-curious.png' },
  thinking:  { static: '/wayo-thinking.png', animated: '/wayo-thinking.gif' },
  alert:     { static: '/wayo-alert.png',    animated: '/wayo-alert.gif' },
  happy:     { static: '/wayo-happy.png',    animated: '/wayo-happy.gif' },
  concerned: { static: '/wayo-concerned.png' },
};

export function WayoAvatar({ emotion, size = 96, className, animate = false }: WayoAvatarProps) {
  const asset = EMOTION_ASSETS[emotion];
  const src = animate && asset.animated ? asset.animated : asset.static;

  return (
    <motion.div
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      <img
        key={emotion}
        src={src}
        alt={`Wayo — ${emotion}`}
        style={{ width: size, height: size }}
        className="object-contain"
      />
    </motion.div>
  );
}
