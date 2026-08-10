import { useState, useEffect, useRef } from 'react';

interface TypewriterResult {
  displayedText: string;
  isComplete: boolean;
}

export function useTypewriter(text: string, charsPerSecond = 30): TypewriterResult {
  const [displayedChars, setDisplayedChars] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setDisplayedChars(0);
    if (!text) return;

    const intervalMs = 1000 / charsPerSecond;
    intervalRef.current = setInterval(() => {
      setDisplayedChars((prev) => {
        if (prev >= text.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return prev;
        }
        return prev + 1;
      });
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, charsPerSecond]);

  return {
    displayedText: text.slice(0, displayedChars),
    isComplete: displayedChars >= text.length,
  };
}
