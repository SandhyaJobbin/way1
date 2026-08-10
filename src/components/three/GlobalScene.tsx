import { CameraRig } from './CameraRig';

export function GlobalScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <CameraRig />
    </>
  );
}
