import { useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';

export function CanvasSequence({
  width = 640,
  height = 360,
  frameCount = 30,
  className,
}: {
  width?: number;
  height?: number;
  frameCount?: number;
  className?: string;
}) {
  const jogPos = useStore((s) => s.jogPos);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/frames/f${String(i).padStart(4, '0')}.jpg`;
      imgs.push(img);
    }
    framesRef.current = imgs;
  }, [frameCount]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      const idx = Math.floor(jogPos * (frameCount - 1));
      const img = framesRef.current[idx];
      if (img?.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 0, 0, width, height);
      } else {
        ctx.fillStyle = '#0a0e1a';
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = '#1a2a3a';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(width * 0.4, height); ctx.lineTo(width * 0.45, height * 0.5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(width * 0.6, height); ctx.lineTo(width * 0.55, height * 0.5); ctx.stroke();
        ctx.fillStyle = '#4db8ff';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`FRAME ${idx + 1} / ${frameCount}`, width / 2, height - 16);
        ctx.fillStyle = 'rgba(77,184,255,0.15)';
        ctx.fillRect(0, height - 4, width * jogPos, 4);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [jogPos, frameCount, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      style={{ display: 'block' }}
    />
  );
}