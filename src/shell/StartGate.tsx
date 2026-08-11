import { ReactNode, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgressStore } from '../store/progressStore';
import { useBrand } from './BrandProvider';

export function StartGate({ children }: { children: ReactNode }) {
  const { gestureCaptured, captureGesture } = useProgressStore();
  const brand = useBrand();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  const handleStart = () => {
    captureGesture();
  };

  return (
    <>
      <AnimatePresence>
        {!gestureCaptured && (
          <motion.div
            key="start-gate"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            {/* Background Video */}
            <video 
              ref={videoRef}
              src="https://pub-b1b0557032a74a409a9b355726a8e00a.r2.dev/arizona-road.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            
            {/* Gradient Overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

            {/* Glassmorphism Panel */}
            <div className="relative z-10 flex flex-col items-center max-w-[640px] px-10 py-12 text-center glass-panel-dark rounded-xl">
              {brand.wordmark.mode === 'text' && (
                <div className="text-sm font-semibold uppercase tracking-[0.1em] text-accent-2 mb-4">
                  {brand.name}
                </div>
              )}
              {brand.wordmark.mode === 'image' && brand.wordmark.src && (
                <img src={brand.wordmark.src} alt={brand.name} className="h-8 mb-6 object-contain drop-shadow-md" />
              )}
              
              <h1 className="text-[clamp(32px,4vw,56px)] leading-[1.1] font-display font-semibold tracking-[-0.01em] text-white mb-8 drop-shadow-lg">
                Training for the <br/> Autonomous Vehicle Industry
              </h1>
              
              <button
                onClick={handleStart}
                className="group relative h-[56px] px-10 rounded-pill bg-accent text-base font-semibold text-white overflow-hidden transition-all duration-300 ease-out hover:bg-accent-2 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95 shadow-[0_0_20px_rgba(0,128,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,163,0.6)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Initialize Training
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: gestureCaptured ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="h-full"
      >
        {gestureCaptured && children}
      </motion.div>
    </>
  );
}
