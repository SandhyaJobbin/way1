import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

interface SpeechBubbleProps {
  show: boolean;
  children?: ReactNode;
  text?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left';
  direction?: 'left' | 'center' | 'right';
  charsPerSecond?: number;
  onComplete?: () => void;
}

export function SpeechBubble({
  show,
  children,
  text,
  position = 'top-left',
  direction = 'left',
  charsPerSecond = 30,
  onComplete,
}: SpeechBubbleProps) {
  const { displayedText, isComplete } = useTypewriter(text ?? '', charsPerSecond);

  useEffect(() => {
    if (onComplete && isComplete && text) {
      onComplete();
    }
  }, [isComplete, text, onComplete]);

  const positionClasses = {
    'top-left': 'top-[12%] left-[5%]',
    'top-right': 'top-[12%] right-[5%]',
    'bottom-left': 'bottom-[35%] left-[5%]',
  };

  const arrowClasses = {
    left: 'before:absolute before:left-4 before:bottom-[-6px] before:w-0 before:h-0 before:border-l-[8px] before:border-r-[8px] before:border-t-[8px] before:border-l-transparent before:border-r-transparent before:border-t-white/10 before:backdrop-blur-sm',
    center: 'before:absolute before:left-1/2 before:bottom-[-6px] before:-translate-x-1/2 before:w-0 before:h-0 before:border-l-[8px] before:border-r-[8px] before:border-t-[8px] before:border-l-transparent before:border-r-transparent before:border-t-white/10',
    right: 'before:absolute before:right-4 before:bottom-[-6px] before:w-0 before:h-0 before:border-l-[8px] before:border-r-[8px] before:border-t-[8px] before:border-l-transparent before:border-r-transparent before:border-t-white/10',
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`absolute ${positionClasses[position]} z-30 max-w-md`}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div
            className={`glass-panel px-6 py-4 text-sm leading-relaxed text-white/90 relative ${arrowClasses[direction]}`}
          >
            {text ? (
              <>
                <span>{displayedText}</span>
                {!isComplete && (
                  <span className="inline-block w-[2px] h-4 bg-white/70 ml-0.5 align-middle animate-pulse" />
                )}
              </>
            ) : (
              children
            )}
            {text && (
              <div className="sr-only" aria-live="polite" role="status">
                {text}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
