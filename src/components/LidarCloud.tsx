import { useStore } from '../store/useStore';
import { CloudScene } from './three/CloudScene';
import { LidarSVGFallback } from './LidarSVGFallback';
import { hasWebGL } from '../lib/webgl';

export function LidarCloud({ className }: { className?: string }) {
  const jogPos = useStore((s) => s.jogPos);
  if (!hasWebGL()) return <LidarSVGFallback className={className} />;
  return <CloudScene jogPos={jogPos} />;
}
