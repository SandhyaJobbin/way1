import { useRef, useEffect, useCallback } from 'react';
import { CameraControls } from '@react-three/drei';
import { useStore } from '../../store/useStore';

const CAMERA_PRESETS = {
  hub:   { pos: [0, 14, 0],   target: [0, 0, 0] },
  zone1: { pos: [4, 3, -8],   target: [6, 0, -2] },
  zone2: { pos: [-3, 4, -12], target: [-2, 0, -4] },
  zone3: { pos: [-8, 5, -16], target: [-4, 0, -6] },
} as const;

export function CameraRig() {
  const controlsRef = useRef<CameraControls>(null);
  const cameraTarget = useStore((s) => s.cameraTarget);

  const handleRest = useCallback(() => {
    useStore.getState().setTransitionPhase('complete');
  }, []);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.addEventListener('rest', handleRest);
    return () => {
      controls.removeEventListener('rest', handleRest);
    };
  }, [handleRest]);

  useEffect(() => {
    if (!controlsRef.current) return;
    const preset = CAMERA_PRESETS[cameraTarget];
    const [px, py, pz] = preset.pos;
    const [tx, ty, tz] = preset.target;
    controlsRef.current.setLookAt(px, py, pz, tx, ty, tz, true);
  }, [cameraTarget]);

  return <CameraControls ref={controlsRef} makeDefault smoothTime={1.8} />;
}
