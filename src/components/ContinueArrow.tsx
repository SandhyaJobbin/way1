import { motion } from 'framer-motion';

interface ContinueArrowProps {
  onClick: () => void;
  label?: string;
}

export function ContinueArrow({ onClick, label = 'Continue' }: ContinueArrowProps) {
  return (
    <motion.button
      className="absolute bottom-[8%] right-[8%] z-30 flex items-center gap-2 px-6 py-3 rounded-full
                 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90
                 font-display text-sm font-semibold tracking-wide
                 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{label}</span>
      <motion.div
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        →
      </motion.div>
    </motion.button>
  );
}