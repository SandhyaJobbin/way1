import { useStore } from '../../store/useStore';
import { CameraRig } from './CameraRig';
import { CloudScene } from './CloudScene';
import { HubOrbitMap } from './HubOrbitMap';
import { PostProcessing } from './PostProcessing';

export function GlobalScene() {
  const cameraTarget = useStore((s) => s.cameraTarget);
  const jogPos = useStore((s) => s.jogPos);

  return (
    <>
      <ambientLight intensity={0.15} />
      <CameraRig />
      {cameraTarget === 'hub' && <HubOrbitMap />}
      <CloudScene jogPos={jogPos} />
      <PostProcessing />
    </>
  );
}
