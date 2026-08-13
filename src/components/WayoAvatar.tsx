import { motion } from 'framer-motion';

export type WayoEmotion = 'idle' | 'curious' | 'thinking' | 'alert' | 'happy' | 'concerned';

interface WayoAvatarProps {
  emotion: WayoEmotion;
  size?: number;
  className?: string;
  animate?: boolean;
}

const base = import.meta.env.BASE_URL;
const EMOTION_ASSETS: Record<WayoEmotion, { static: string; animated?: string }> = {
  idle:      { static: `${base}wayo-idle.png` },
  curious:   { static: `${base}wayo-curious.png` },
  thinking:  { static: `${base}wayo-thinking.png`, animated: `${base}wayo-thinking.gif` },
  alert:     { static: `${base}wayo-alert.png`,    animated: `${base}wayo-alert.gif` },
  happy:     { static: `${base}wayo-happy.png`,    animated: `${base}wayo-happy.gif` },
  concerned: { static: `${base}wayo-concerned.png` },
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
