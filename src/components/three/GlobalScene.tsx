import { useStore } from '../../store/useStore';
import { CameraRig } from './CameraRig';
import { HubOrbitMap } from './HubOrbitMap';

export function GlobalScene() {
  const cameraTarget = useStore((s) => s.cameraTarget);

  return (
    <>
      <ambientLight intensity={0.15} />
      <CameraRig />
      {cameraTarget === 'hub' && <HubOrbitMap />}
    </>
  );
}
