import { animated, useSpring } from '@react-spring/three';
import { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { OrbitRing } from './OrbitRing';
import { IncidentToken } from './IncidentToken';

function cameraTargetToRingIndex(target: string): 1 | 2 | 3 {
  switch (target) {
    case 'zone1': return 1;
    case 'zone2': return 2;
    case 'zone3': return 3;
    default: return 1;
  }
}

export function HubOrbitMap() {
  const cameraTarget = useStore((s) => s.cameraTarget);
  const activeRingIndex = cameraTargetToRingIndex(cameraTarget);

  const [centerSpring, centerApi] = useSpring(() => ({
    emissiveIntensity: 0.1,
    config: { tension: 80, friction: 14 },
  }));

  useEffect(() => {
    centerApi.start({
      emissiveIntensity: 0.5,
      loop: { reverse: true },
    });
  }, [centerApi]);

  return (
    <group>
      <OrbitRing
        radius={3.5}
        color="#FF6B2B"
        active={activeRingIndex === 1}
      />
      <OrbitRing
        radius={7.0}
        color="#E8E8E8"
        active={activeRingIndex === 2}
      />
      <OrbitRing
        radius={10.5}
        color="#4A90E2"
        active={activeRingIndex === 3}
      />
      <IncidentToken activeRing={activeRingIndex} />
      <animated.mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <animated.meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={centerSpring.emissiveIntensity}
          toneMapped={false}
        />
      </animated.mesh>
    </group>
  );
}
